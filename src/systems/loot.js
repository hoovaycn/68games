/**
 * 掉落统一结算服务（V2 服务层）
 *
 * ── 背景（用户报的 bug，固化成服务层铁律）─────────────────────
 * 判定基准必须是「阵亡者 slainUnit」而不是「防守位 defender」：
 * 无论敌方是守方（被我方主动攻击击杀）还是攻方（敌方回合扑上来被
 * 我方反击击杀），掉落判定、入包、弹窗输入必须完全一致。
 * 旧版 main.js 只检查 defender 位才导致男主线反击击杀零掉落零弹窗。
 *
 * ── 职责边界 ──────────────────────────────────────────────────
 * 本模块只做「纯数据」三步，不碰 DOM / 音效 / 弹窗：
 *   1. rollDrops(slainUnit, {rng})    chance 判定 → 掉落清单快照
 *   2. grantItems(inventory, loots)   清单合入背包（stack 叠加规则）
 *   3. settleLoot(slainUnit, 玩家侧)  = 1 + 2 的编排（一步到位）
 * 经验结算归 growth.gainExp，弹窗队列归 UI 层，本模块不越界。
 *
 * ── 幂等性 ────────────────────────────────────────────────────
 * rollDrops 判定完会把 unit.drops 清空（drops 在 createEnemyUnit 时已
 * 深拷贝到单位身上，清空不会污染 ENEMIES 模板表），同一个阵亡单位被
 * 重复结算时第二次返回空——防御 checkBattleEnd 等路径的重入。
 *
 * rng 可注入（默认 Math.random），自测用固定 rng 验证边界：
 * chance<=0 永不掉 / chance>=1 必掉。
 */

import { getGoodsById } from '../data/goods/index.js';

const UI_FALLBACK_DESC = '战利品道具。';

/**
 * 单件掉落的 UI 快照：拿去喂 ItemModal / 胜利结算 / 升级画面，
 * 渲染层无需再查任何表。（iconPath 约定与 main.js 一致：assets/items/{id}.png）
 */
function snapshot(itemId, count = 1) {
  const g = getGoodsById(itemId);
  if (!g) {
    // registry 启动自检应已拦截；这里兜底是为了不因一条脏数据炸掉整场结算
    console.warn('[loot] 掉落表存在未注册道具: ' + itemId + '（使用兜底文案）');
    return {
      itemId, count,
      name: itemId, desc: UI_FALLBACK_DESC,
      kind: 'unknown', stack: 1,
      iconPath: 'assets/items/' + itemId + '.png'
    };
  }
  return {
    itemId, count,
    name: g.name,
    desc: g.desc || '',
    kind: g.kind,
    stack: g.stack ?? 1,
    iconPath: 'assets/items/' + itemId + '.png'
  };
}

/**
 * 掉落判定：对「阵亡敌方单位」的 drops 表逐项 roll。
 * 我方单位阵亡不结算掉落（本期没有败者掉装机制）。
 * @returns {Array<{itemId,count,name,desc,kind,stack,iconPath}>} 实际掉落清单
 */
export function rollDrops(slainUnit, { rng = Math.random } = {}) {
  if (!slainUnit || slainUnit.faction !== 'enemy' || !Array.isArray(slainUnit.drops)) {
    return [];
  }
  const loots = [];
  for (const drop of slainUnit.drops) {
    if (!drop || !drop.itemId) continue;
    const chance = Number(drop.chance ?? 0);
    const hit = chance >= 1 || (chance > 0 && rng() < chance);
    if (hit) loots.push(snapshot(drop.itemId, drop.count ?? 1));
  }
  slainUnit.drops.length = 0;   // 已判定条目清空：重入安全，且不污染模板
  return loots;
}

/**
 * 掉落清单合入背包。inventory 条目形状与 main.js 现有一致：{ id, count }。
 * 叠加规则：同 id 摞子 count 累加、不超过 goods.stack 上限；
 * 超出上限开新的一摞（武器/关键道具 stack=1，天然一件一格）。
 * @returns 与入参同结构的 granted 清单（供 UI 逐条弹 ItemModal）
 */
export function grantItems(inventory, loots) {
  const granted = [];
  if (!Array.isArray(inventory) || !Array.isArray(loots)) return granted;
  for (const loot of loots) {
    let remain = loot.count ?? 1;
    if (remain <= 0) continue;
    const stackLimit = loot.stack ?? 1;
    // 先补满已有同 id 摞子
    for (const slot of inventory) {
      if (remain <= 0) break;
      if (slot.id === loot.itemId && slot.count < stackLimit) {
        const add = Math.min(stackLimit - slot.count, remain);
        slot.count += add;
        remain -= add;
      }
    }
    // 剩余开新摞
    while (remain > 0) {
      const add = Math.min(stackLimit, remain);
      inventory.push({ id: loot.itemId, count: add });
      remain -= add;
    }
    granted.push({ ...loot });
  }
  return granted;
}

/**
 * 一步到位编排：阵亡敌方单位的掉落判定 + 合入我方单位背包。
 * 拾取者不存在（playerSide 为空或无背包）时不判定，道具留在尸体上
 * （drops 不被清空，给未来「搜刮尸体」类机制留口子）。
 * @returns {{loots:Array}} 实际入包清单，直接喂 UI 弹窗队列
 */
export function settleLoot(slainUnit, playerSide, { rng = Math.random } = {}) {
  if (!playerSide || !Array.isArray(playerSide.inventory)) return { loots: [] };
  const loots = rollDrops(slainUnit, { rng });
  if (loots.length > 0) grantItems(playerSide.inventory, loots);
  return { loots };
}

/**
 * 掉落清单 → 一行文案（胜利结算面板 lootName 用），如「烤肠、张子骁的臭袜子」。
 * 支持传入结算单 settleLoot 的返回值或裸清单。
 */
export function summarizeLoots(loots) {
  const list = Array.isArray(loots) ? loots : (loots?.loots || []);
  if (list.length === 0) return null;
  return list
    .map(l => l.name + (l.count > 1 ? ' x' + l.count : ''))
    .join('、');
}
