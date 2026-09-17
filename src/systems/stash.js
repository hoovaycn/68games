/**
 * stash —— 全队共享仓库服务（V2 服务层 · 任务 #8）
 *
 * ── 设计动机（用户需求）──────────────────────────────────
 * 角色背包是私人持有；仓库是全队共享中转站。
 * A 把道具存入仓库 → B 从仓库取走，让战术道具流转到最需要的人手里。
 *
 * ── 数据形态 ─────────────────────────────────────────────
 * 仓库与单位背包同构：{ items: [{ id, count }] }
 * （spawn / 存档 / hydrate 链路零改动，仓库直接随 state 走即可）
 * 叠加入包口径复用 loot.grantItems：同 id 先补满 goods.stack 摞子再开新摞。
 *
 * ── 原子性铁律 ───────────────────────────────────────────
 * 存/取都是「先校验、后扣减」：源侧库存不足 / count 非法 → { ok:false }
 * 双方条目表保持原样，UI 层拿到 false 直接提示，不需要回滚。
 *
 * ── 职责边界 ─────────────────────────────────────────────
 * 纯数据：不碰 DOM / 音效 / 弹窗（与 loot.js 同律）。
 * UI 联调轮由 inventory_panel 消费 summarizeItems / stashSummary。
 */

import { getGoodsById } from '../data/goods/index.js';
import { grantItems } from './loot.js';

const UI_FALLBACK_DESC = '道具。';

/* ══════════════ 1. 快照（UI 域通用，不回查表） ══════════════ */

/**
 * 单条道具 UI 快照：与 loot.snapshot 同形（itemId/count/name/desc/kind/stack/iconPath）。
 * 多带 category / use_in_battle / use_in_field 三项：inventory_panel 分类页签、
 * 行动菜单「道具」入口按 use_in_battle 过滤要用。
 */
function snapshotItem(itemId, count = 1) {
  const g = getGoodsById(itemId);
  if (!g) {
    // registry 启动自检应已拦截；此处兜底防一条脏数据炸掉整个面板
    console.warn('[stash] 存在未注册道具: ' + itemId + '（使用兜底文案）');
    return {
      itemId, count: safeCount(count),
      name: itemId, desc: UI_FALLBACK_DESC,
      kind: 'unknown', category: null, stack: 1,
      use_in_battle: null, use_in_field: null,
      iconPath: 'assets/items/' + itemId + '.png'
    };
  }
  return {
    itemId, count: safeCount(count),
    name: g.name, desc: g.desc || '',
    kind: g.kind || 'unknown', category: g.category || null,
    stack: (typeof g.stack === 'number' && g.stack >= 1) ? g.stack : 1,
    use_in_battle: !!g.use_in_battle, use_in_field: !!g.use_in_field,
    iconPath: g.icon || ('assets/items/' + itemId + '.png')
  };
}

function safeCount(v) {
  const n = Number(v);
  return (Number.isFinite(n) && n > 0) ? Math.floor(n) : 0;
}

/* ══════════════ 2. 计数与搬运（纯计算核心） ══════════════ */

/**
 * 单一道具在条目表中的现存量（跨摞累计）。
 * 垃圾条目（count 非法 / 非对象）一律记 0，不给后续步骤喂 NaN。
 */
export function countItem(items, itemId) {
  if (!Array.isArray(items)) return 0;
  let n = 0;
  for (const slot of items) {
    if (slot && slot.id === itemId) n += safeCount(slot.count);
  }
  return n;
}

/** stack 上限查询（未注册 id 兜底 1，与 grantItems 同口径） */
function stackOf(itemId) {
  const g = getGoodsById(itemId);
  return (g && typeof g.stack === 'number' && g.stack >= 1) ? g.stack : 1;
}

/**
 * 通用原子搬运：from 里扣 want 件 itemId，按摞规则合入 to。
 * - 源库存不足 / want 非法 → { ok:false, moved:0 }，from / to 双方不动
 * - 成功 → from 相应摞子按序递减（多摞时前面的先扣），to 走 grantItems 补摞
 */
export function moveItems(from, to, itemId, want = 1) {
  const n = Math.floor(Number(want));
  if (!Number.isFinite(n) || n <= 0 || typeof itemId !== 'string' || !itemId) {
    return { ok: false, moved: 0 };
  }
  if (!Array.isArray(from) || !Array.isArray(to)) return { ok: false, moved: 0 };

  const have = countItem(from, itemId);
  if (have < n) return { ok: false, moved: 0 };

  // 扣减：前面的摞先扣，count 归零的摞保留 0 占位还是删除？
  // FE 面板语义：空摞不应显示。删除更贴合——但删除会挪动数组下标，
  // UI 若按索引持有选中态会错位。选择：count=0 的摞当场移除（快照层
  // summarizeItems 也按「合并同 id」出清单，UI 选中态建立在 itemId 上，
  // 不受数组下标影响）。
  let remain = n;
  for (let i = from.length - 1; i >= 0 && remain > 0; i--) {
    const slot = from[i];
    if (!slot || slot.id !== itemId) continue;
    const take = Math.min(safeCount(slot.count), remain);
    slot.count = safeCount(slot.count) - take;
    remain -= take;
    if (slot.count <= 0) from.splice(i, 1);
  }

  // 合入：复用 loot.grantItems（同 stack 口径，形状 { itemId, count, stack }）
  grantItems(to, [{ itemId, count: n, stack: stackOf(itemId) }]);
  return { ok: true, moved: n };
}

/** 单位 → 仓库（单位无背包 / 仓库非对象 → fail，不替调用方造容器） */
export function deposit(unit, stash, itemId, count = 1) {
  const from = unit && Array.isArray(unit.inventory) ? unit.inventory : null;
  const to = stash && Array.isArray(stash.items) ? stash.items : null;
  if (!from || !to) return { ok: false, moved: 0 };
  return moveItems(from, to, itemId, count);
}

/** 仓库 → 单位（存进来的东西必须还能取出来，方向对称） */
export function withdraw(stash, unit, itemId, count = 1) {
  const from = stash && Array.isArray(stash.items) ? stash.items : null;
  const to = unit && Array.isArray(unit.inventory) ? unit.inventory : null;
  if (!from || !to) return { ok: false, moved: 0 };
  return moveItems(from, to, itemId, count);
}

/* ══════════════ 3. 建仓与 UI 清单 ══════════════ */

/** 空仓库（state 初始化 / 新档锚点用） */
export function createStash() {
  return { items: [] };
}

/**
 * 条目表 → 合并同 id 的 UI 清单（多摞合并成一行，count = 跨摞总数）。
 * 消费方：角色背包面板 / 仓库面板共用，保证两边视觉口径一致。
 */
export function summarizeItems(items) {
  if (!Array.isArray(items)) return [];
  const agg = new Map();   // itemId -> totalCount
  for (const slot of items) {
    if (!slot || typeof slot.id !== 'string') continue;
    const n = safeCount(slot.count);
    if (n <= 0) continue;
    agg.set(slot.id, (agg.get(slot.id) || 0) + n);
  }
  const out = [];
  for (const [itemId, count] of agg) out.push(snapshotItem(itemId, count));
  return out;
}

/** 仓库清单（summarizeItems 的仓库别名，语义更直白，联调轮读得更顺） */
export function stashSummary(stash) {
  return summarizeItems(stash && Array.isArray(stash.items) ? stash.items : null);
}
