#!/usr/bin/env node
/**
 * V2 服务层地基自测（零依赖，Node 18+）
 *
 * 运行： node scripts/selftest_foundation.mjs
 * 退出码： 0 = 全部通过；1 = 存在 FAIL（可直接挂到未来 CI / git pre-commit）。
 *
 * 覆盖范围（对应服务层五个模块）：
 *   §0 registry        配置注册中心启动自检（silent 模式拿结构化结果断言）
 *   §1 growth          经验曲线 / 升级 roll / 数值工厂
 *   §2 loot            掉落统一结算（含男主线反击击杀 bug 的回归锚点）
 *   §3 game_state      进度模型 / roster 血水合 / 剧情推进
 *   §4 save_manager    localStorage 3+1 槽（注入内存存储 + 时钟可控）
 *   §5 avatar          头像统一解析（URL 约定 / 别名 / 兜底 / fs 守门）
 *   §6 ui_kit          视觉基座（调色盘锚定 / 条形计划 / 布局几何 / 折行 / ModalBase）
 *   §7-§12             战斗演出 / 升级面板 / 仓库 / 档案 / 背包 / 行动菜单·教学 等渲染层
 *   §13-§15 M1 持久化联调：存档往返字段保真 / 存档界面双模式 / 战败不回退（D1/D3）
 *
 * 断言套路：一律「动态镜像」而不是硬编码数值——镜像从 UNITS/CLASSES/ENEMIES
 * 等配置源现场计算期望值，配置改数值不需要改测试（chenpinxuan.level 断言
 * 假设 ===1 摔跟头就是教训：她起始就是 2 级）。
 * 期望触发 console.error/warn 的路径（脏数据 / 配额满 / JSON 损坏）在
 * 局部静默以免污染输出。
 */

import { runStartupCheck } from '../src/data/registry.js';
import { UNITS } from '../src/data/units.js';
import { ENEMIES } from '../src/data/enemies.js';
import { CLASSES } from '../src/data/classes.js';
import { getGoodsById, GOODS_KINDS } from '../src/data/goods/index.js';

import {
  EXP_PER_LEVEL, LEVEL_CAP, expForKill, expForAction, expToNext,
  rollLevelUp, applyLevelUp, gainExp,
  createPlayerUnit, createEnemyUnit
} from '../src/systems/growth.js';
import {
  rollDrops, grantItems, settleLoot, summarizeLoots
} from '../src/systems/loot.js';
import {
  STATE_SCHEMA, createNewGame, serializeUnit, hydrateUnit,
  joinParty, isInParty, getPartyUnit, commitRuntimeUnit,
  setFlag, getFlag, markChapterCleared, advanceTo, tickPlaytime, summarizeState
} from '../src/systems/game_state.js';
import {
  MANUAL_SLOTS, ALL_SLOTS, SLOT_LABELS, createSaveManager
} from '../src/systems/save_manager.js';
import { existsSync } from 'node:fs';
import {
  resolvePortrait, getPortraitUrl, portraitForUnit, normalizePortraitRef, parsePortraitRef,
  registerActorStates, hasActor, listActors, listStates,
  FALLBACK_URL, PORTRAITS_DIR
} from '../src/engine/avatar.js';
import {
  PALETTE, BAR_KINDS,
  clamp01, barRatio, planBar, inRect, planModalBox, planButtonRow,
  wrapLines, planWrappedBlock, lerp, easeOutCubic, fontCss,
  ModalBase
} from '../src/ui/components/ui_kit.js';
import {
  STRIKE_TIMING, EXP_TIMING,
  planStrikeSegment, planExpSegment, exchangeViewAt, planExchangeCards,
  CombatExchange
} from '../src/ui/components/combat_exchange.js';
import {
  createStash, countItem, moveItems, deposit, withdraw,
  summarizeItems, stashSummary
} from '../src/systems/stash.js';
import {
  LEVEL_UP_TIMING, LEVEL_UP_LAYER_LEN, GROWTH_ROWS, GROWTH_BAR_MAX,
  snapshotGrowthStats, planLevelUp, levelUpViewAt, planLevelUpLayout,
  LevelUpModal
} from '../src/ui/components/level_up.js';
import { WEAPONS } from '../src/data/weapons.js';
import { SKILLS } from '../src/data/skills.js';
import {
  DETAIL_STAT_ROWS, detailSnapshotFromUnit, planDetailStatRows,
  planResourceBars, clipLines, planDetailBio, planUnitDetailLayout,
  UnitDetailModal
} from '../src/ui/components/unit_detail.js';
import {
  INVENTORY_VIEWS, INV_DEFAULT_KIND, INV_VISIBLE_ROWS,
  planInventoryRows, planKindTabs, planTradeAction, planItemActions, planInvDesc,
  planInventoryLayout, InventoryPanelModal
} from '../src/ui/components/inventory_panel.js';
import {
  ACTION_MENU_W, ACTION_MENU_ITEM_H,
  planActionMenuItems, planNextEnabledIndex, planActionMenuBox, ActionMenu
} from '../src/ui/components/action_menu.js';
import {
  normalizeTutorialSteps, planTutorialButtons, TutorialPanelModal
} from '../src/ui/components/tutorial_panel.js';
import { CH0_BATTLE1 } from '../src/data/chapters/ch0_battle1.js';
import { CH0_BATTLE2 } from '../src/data/chapters/ch0_battle2.js';
import { SaveMenuModal } from '../src/ui/components/save_menu_modal.js';

/* ══════════ 测试记录器 ══════════ */
let passed = 0;
const failed = [];
function check(msg, cond) {
  if (cond) { passed++; console.log('ok - ' + msg); }
  else { failed.push(msg); console.log('FAIL - ' + msg); }
}
/** 键序无关的深比较 */
function deepEq(a, b) {
  if (a === b) return true;
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEq(a[k], b[k]));
}
function section(title) { console.log('\n── §' + title + ' ' + '─'.repeat(Math.max(4, 58 - title.length))); }
/** 局部静默 console（只用于“期望报错”的路径），完毕恢复 */
function silenced(fn) {
  const e = console.error, w = console.warn;
  console.error = () => {}; console.warn = () => {};
  try { return fn(); } finally { console.error = e; console.warn = w; }
}

/* ══════════ §0 registry 配置自检 ══════════ */
section('0 registry 配置自检');
const reg = runStartupCheck({ silent: true });
check('启动自检 0 错误（警告 ' + reg.warnings.length + ' 条，仅提示）', reg.ok === true && reg.errors.length === 0);
check('表规模下限（职业≥7 单位≥9 敌人≥2 武器≥6）',
  reg.counts.classes >= 7 && reg.counts.units >= 9 && reg.counts.enemies >= 2 && reg.counts.weapons >= 6);
check('拉拉操队员（奶妈职业）已入表且被覃瑞怡使用',
  Object.keys(CLASSES).some((k) => /cheer/i.test(k) || String(CLASSES[k].name).includes('拉拉') || String(CLASSES[k].name).includes('啦啦'))
  && !!CLASSES[UNITS.qinruiyi.classId] && UNITS.qinruiyi.classId === 'cheerleader');

/* ══════════ §1 growth 成长服务 ══════════ */
section('1 growth 成长服务');

// —— 1.1 经验曲线 ——
check('expForKill(1,1)=30 / 高打低走到 10 下限', expForKill(1, 1) === 30 && expForKill(5, 1) === 10 && expForKill(9, 1) === 10);
check('expForKill 越级奖励 (1,3)=50 / (1,10)=120', expForKill(1, 3) === 50 && expForKill(1, 10) === 120);
check('expForAction()=12', expForAction() === 12);
check('expToNext 30→70 / 150→0 / 缺省→100', expToNext({ exp: 30 }) === 70 && expToNext({ exp: 150 }) === 0 && expToNext({}) === 100);
check('EXP_PER_LEVEL=100 / LEVEL_CAP=20', EXP_PER_LEVEL === 100 && LEVEL_CAP === 20);

// —— 1.2 数值工厂（超集形状）——
const lead = createPlayerUnit('zhangzixiao');       // 男主
const hero = createPlayerUnit('shiyunuo');          // 女主
check('createPlayerUnit 男/女主均可生成', !!lead && !!hero && lead.classId === UNITS.zhangzixiao.classId && hero.classId === UNITS.shiyunuo.classId);
check('等级/名字与 UNITS 镜像（不硬编码）', lead.level === UNITS.zhangzixiao.level && lead.name === UNITS.zhangzixiao.name);
check('stats 十维齐备（含 mov），值与职业基础镜像',
  ['maxHp', 'maxMp', 'str', 'mag', 'skl', 'spd', 'luk', 'def', 'res', 'mov'].every((k) => Number.isFinite(lead.stats[k]))
  && lead.stats.maxHp === CLASSES[UNITS.zhangzixiao.classId].base.hp);
check('满血满蓝出厂：currentHp=maxHp / currentMp=maxMp', lead.currentHp === lead.stats.maxHp && lead.currentMp === lead.stats.maxMp);
check('超集字段：personalGrowth 拷贝（非引用）', typeof lead.personalGrowth === 'object' && lead.quotes !== UNITS.zhangzixiao.quotes);
check('expOverride / hpOverride 生效', createPlayerUnit('zhangzixiao', { expOverride: 55, hpOverride: 3 }).exp === 55
  && createPlayerUnit('zhangzixiao', { hpOverride: 3 }).currentHp === 3);
check('未知 unitId → null（不抛）', createPlayerUnit('no_such_unit') === null);

// —— 1.3 升级 roll（可注入 rng 的两个边界）——
const GROWTH_KEYS = ['hp', 'mp', 'str', 'mag', 'skl', 'spd', 'luk', 'def', 'res'];
// 镜像：按公式 pct = 职业 growth + 个人 personalGrowth 现场计算期望
const mirror = (classId, pg, roll) => {
  const out = {};
  for (const k of GROWTH_KEYS) {
    const pct = (CLASSES[classId]?.growth?.[k] ?? 0) + (pg?.[k] ?? 0);
    out[k] = (roll * 100 < pct) ? 1 : 0;
  }
  return out;
};
const cpxPg = UNITS.chenpinxuan.personalGrowth;   // {spd:15, luk:10}
check('roll rng=1.0（必挂边界）：九键全 0，与镜像一致',
  deepEq(rollLevelUp(UNITS.chenpinxuan.classId, cpxPg, () => 1.0), mirror(UNITS.chenpinxuan.classId, cpxPg, 1.0))
  && Object.values(rollLevelUp(UNITS.chenpinxuan.classId, cpxPg, () => 1.0)).every((v) => v === 0));
check('roll rng=0（必涨边界）：pct>0 的键全 1，与镜像一致',
  deepEq(rollLevelUp(UNITS.chenpinxuan.classId, cpxPg, () => 0), mirror(UNITS.chenpinxuan.classId, cpxPg, 0))
  && rollLevelUp(UNITS.chenpinxuan.classId, cpxPg, () => 0).spd === 1);
check('roll 未知 classId → 九键全 0（宽默认）',
  Object.values(rollLevelUp('no_such_class', {}, () => 0)).every((v) => v === 0) && Object.keys(rollLevelUp('no_such_class', {}, () => 0)).length === 9);

// —— 1.4 applyLevelUp：部分手写 gains 不产生 NaN ——
const fake = { level: 1, currentHp: 10, currentMp: 5, stats: { maxHp: 10, maxMp: 5, str: 1, mag: 1, skl: 1, spd: 1, luk: 1, def: 1, res: 1 } };
applyLevelUp(fake, { hp: 1, str: 1 });   // 只给两键
check('applyLevelUp 部分 gains：level+1，hp/str 各+1，其余键不 NaN',
  fake.level === 2 && fake.stats.maxHp === 11 && fake.currentHp === 11 && fake.stats.str === 2
  && fake.stats.mag === 1 && fake.stats.maxMp === 5 && fake.currentMp === 5
  && GROWTH_KEYS.every((k) => Number.isFinite(fake.stats[k] || fake.currentHp)));
check('升级当级 HP 同步到当前值（currentHp=maxHp 双到位）', fake.currentHp === 11 && fake.stats.maxHp === 11);

// —— 1.5 gainExp：连锁升级 + LEVEL_CAP 冻结 ——
const u1 = createPlayerUnit('zhangzixiao');
const lv0 = u1.level;
const r1 = gainExp(u1, 1000, { rng: () => 1.0 });   // 冻结版：数量关系不依赖 roll 结果
const expectN = Math.min(10, LEVEL_CAP - lv0);
check('gainExp 1000：连锁升级 ' + expectN + ' 级（起始 ' + lv0 + '）',
  r1.levelsGained === expectN && r1.gainsByLevel.length === expectN && u1.level - lv0 === expectN && r1.fromLevel === lv0 && r1.toLevel === u1.level);
check('exp 余数 = 1000 - 100×级数', u1.exp === 1000 - 100 * expectN);
check('currentHp≡maxHp 不变量跨多级保持', u1.currentHp === u1.stats.maxHp);
const u1b = createPlayerUnit('zhangzixiao');
const r1b = gainExp(u1b, 600, { rng: () => 0 });    // 必涨版
const grewTotal = r1b.gainsByLevel.reduce((acc, g) => acc + Object.values(g).reduce((x, y) => x + y, 0), 0);
check('gainExp rng=0：至少每级 1 点成长（成长率表退化为 0 会在此暴露）',
  r1b.levelsGained >= 5 && grewTotal >= r1b.levelsGained);
const u2 = createPlayerUnit('zhangzixiao'); u2.level = 20; u2.exp = 0;
const r2 = gainExp(u2, 500, { rng: () => 0 });
check('LEVEL_CAP=20 冻结：经验照入账不涨级', r2.levelsGained === 0 && u2.level === 20 && u2.exp === 500 && r2.gainsByLevel.length === 0);
const u3 = createPlayerUnit('zhangzixiao');
const before3 = u3.exp;
check('gainExp 非法入账（0 / -50 / NaN）全忽略', gainExp(u3, 0).levelsGained === 0 && gainExp(u3, -50).levelsGained === 0
  && Number.isNaN(gainExp(u3, NaN).levelsGained) === false && u3.exp === before3);

// —— 1.6 敌方工厂 + drops 深拷贝 ——
const ev1 = createEnemyUnit('vendor', { instanceId: 'e_v1' });
check('createEnemyUnit：faction/id/enemyId/等级镜像', ev1.faction === 'enemy' && ev1.id === 'e_v1' && ev1.enemyId === 'vendor'
  && ev1.level === ENEMIES.vendor.level && ev1.drops.length === ENEMIES.vendor.drops.length);
const ev2 = createEnemyUnit('punk', { instanceId: 'e_p1', levelOverride: 9 });
ev2.drops.length = 0;   // 模拟结算清空
check('drops 深拷贝：清空单位不污染 ENEMIES 模板', ENEMIES.vendor.drops.length === 2 && ev2.drops.length === 0);
check('createEnemyUnit levelOverride=9', ev2.level === 9);
check('createEnemyUnit 未知 id → null（不抛）', createEnemyUnit('no_such_enemy', { instanceId: 'x' }) === null);

/* ════════════ §2 loot 掉落结算（对照 main.js 旧 bug 的回归锚点）════ */
// 服务层铁律见 loot.js 头注：判定基准 = 阵亡者 slainUnit（不区分它死在攻方位还是守方位）。
// main.js 里「男主线第二战反击击杀掉不了道具」的根因就是只查 defender 位——
// 联调轮替换结算入口时，本节数据层行为即为基准。
section('2 loot 掉落结算');
const playerNoDrop = createPlayerUnit('zhangzixiao');
check('我方单位阵亡不结算（faction gate）', rollDrops(null).length === 0 && rollDrops(playerNoDrop).length === 0);
const deadVendor = createEnemyUnit('vendor', { instanceId: 'd1' });
const lo1 = rollDrops(deadVendor);
check('vendor（chance 1.0）双掉落地，名称与 goods 表一致',
  lo1.length === 2 && lo1.some((l) => l.name === getGoodsById('sausage').name) && lo1.some((l) => l.name === getGoodsById('dirty_sock').name)
  && lo1.every((l) => l.iconPath === 'assets/items/' + l.itemId + '.png' && typeof l.desc === 'string'));
check('drop 快照带 stack/kind（UI 直接可用）', lo1.every((l) => Number.isFinite(l.stack) && l.stack >= 1 && !!l.kind));
check('rollDrops 幂等：二次调用回 []', rollDrops(deadVendor).length === 0 && deadVendor.drops.length === 0);
const mkUnit = (drops) => ({ faction: 'enemy', drops });
check('chance=0：rng=0 也永不掉', rollDrops(mkUnit([{ itemId: 'sausage', chance: 0 }]), { rng: () => 0 }).length === 0);
check('chance=0.5 + rng=0.9 未中（rng()<chance）', rollDrops(mkUnit([{ itemId: 'sausage', chance: 0.5 }]), { rng: () => 0.9 }).length === 0);
check('chance=0.5 + rng=0.1 命中', rollDrops(mkUnit([{ itemId: 'sausage', chance: 0.5 }]), { rng: () => 0.1 }).length === 1);
check('chance=1 与 rng 无关必掉（rng=0.999）', rollDrops(mkUnit([{ itemId: 'sausage', chance: 1 }]), { rng: () => 0.999 }).length === 1);
const ghost = silenced(() => rollDrops(mkUnit([{ itemId: 'ghost_item_x', chance: 1 }]), { rng: () => 0.5 }));
check('未注册道具走兜底快照不炸结算', ghost.length === 1 && ghost[0].name === 'ghost_item_x' && ghost[0].desc === '战利品道具。' && ghost[0].stack === 1);

// —— grantItems 叠摞规则 ——
const inv = [];
const g1 = grantItems(inv, [{ itemId: 'x', count: 20, stack: 9 }]);
check('20 个 stack=9 拆成 9/9/2 三摞', inv.length === 3 && inv[0].count === 9 && inv[1].count === 9 && inv[2].count === 2 && g1.length === 1);
const inv2 = [{ id: 'x', count: 7 }];
grantItems(inv2, [{ itemId: 'x', count: 5, stack: 9 }]);
check('先补满已有摞再开新摞（7+5→9+3）', inv2.length === 2 && inv2[0].count === 9 && inv2[1].count === 3);
const inv3 = [];
grantItems(inv3, [{ itemId: 'w', count: 3, stack: 1 }]);
check('stack=1（武器/关键道具）一件一格', inv3.length === 3 && inv3.every((s) => s.count === 1 && s.id === 'w'));
const inv4 = [{ id: 'keep', count: 1 }];
check('空清单 / count≤0 均不动背包', grantItems(inv4, []).length === 0 && grantItems(inv4, [{ itemId: 'y', count: 0, stack: 9 }]).length === 0 && inv4.length === 1);

// —— settleLoot 编排 ——
const punkE = createEnemyUnit('punk', { instanceId: 'p_settle' });
const side = { inventory: [{ id: 'sausage', count: 1 }] };
const sl = settleLoot(punkE, side, { rng: () => 0.999 });
const totalOf = (arr, id) => arr.filter((s) => s.id === id).reduce((a, s) => a + s.count, 0);
check('settleLoot：punk 双掉落（100% 与 rng 无关）+ 名称与 goods 一致',
  sl.loots.length === 2 && sl.loots.every((l) => l.name === getGoodsById(l.itemId).name));
check('掉落全部入包且同 id 聚合计数守恒',
  sl.loots.every((l) => totalOf(side.inventory, l.itemId) === (l.count ?? 1)) && totalOf(side.inventory, 'sausage') === 1);
const corpse = createEnemyUnit('punk', { instanceId: 'p_corpse' });
const noSide = settleLoot(corpse, null);
const noBag = settleLoot(corpse, {});
check('无拾取者不判定，道具留在尸体上（搜刮钩子）', noSide.loots.length === 0 && corpse.drops.length === 2 && noBag.loots.length === 0);
check('summarizeLoots 空清单 → null；列表 → 顿号串带 xN',
  summarizeLoots([]) === null && summarizeLoots({ loots: [] }) === null
  && summarizeLoots([{ name: '烤肠', count: 2 }, { name: '臭袜子', count: 1 }]) === '烤肠 x2、臭袜子');
check('summarizeLoots 直接吃 settleLoot 结算单', summarizeLoots(sl) === sl.loots.map((l) => l.name + (l.count > 1 ? ' x' + l.count : '')).join('、'));

/* ══════════ §3 game_state 进度模型 ══════════ */
section('3 game_state 进度模型');
const st = createNewGame({ route: 'female' });
check('新档锚点：schema/线路/主角/场景/章节', st.schema === STATE_SCHEMA && STATE_SCHEMA === 3 && st.route === 'female'
  && st.leadUnitId === 'shiyunuo' && st.sceneId === 'scene_classroom' && st.chapterId === null && st.playtimeSec === 0);
check('新档带全队仓库（stash 空仓数组；两局各自独立不共享）',
  Array.isArray(st.stash.items) && st.stash.items.length === 0
  && (() => { const st2 = createNewGame({ route: 'male' }); return st2.stash !== st.stash && st2.stash.items.length === 0; })());
check('缺省队伍只含线路主角', Object.keys(st.roster).length === 1 && !!st.roster.shiyunuo && !st.roster.chenpinxuan);
const blob = st.roster.shiyunuo;
check('档案白名单：战场字段（x/y/facing/isAlive/anim*）被剥掉',
  ['x', 'y', 'facing', 'isAlive', 'hasActed', 'animOffsetX', 'animOffsetY', 'isFlashing'].every((k) => blob[k] === undefined));
check('档案保留成长/装备/背包字段', ['level', 'exp', 'personalGrowth', 'personalSkill', 'equippedWeapon', 'inventory', 'stats', 'currentHp'].every((k) => blob[k] !== undefined));
const rt = hydrateUnit(blob);
check('hydrate 补回战场默认值（faction/x/isAlive/anim*）',
  rt.faction === 'player' && rt.x === 0 && rt.isAlive === true && rt.animOffsetX === 0 && rt.id === 'shiyunuo');
rt.x = 99; rt.stats.str = 999;
check('hydrate 返回深拷贝：mutation 不回渗档案', blob.x === undefined && blob.stats.str !== 999);
check('getPartyUnit 返回全新副本（战场不污染存档）', (() => { const a = getPartyUnit(st, 'shiyunuo'); a.level = 99; return st.roster.shiyunuo.level !== 99; })());
check('getPartyUnit 未知 id → null；isInParty 布尔', getPartyUnit(st, 'nope') === null && isInParty(st, 'shiyunuo') === true && isInParty(st, 'nope') === false);
const jb = joinParty(st, 'chenpinxuan');
check('joinParty 入队：等级与 UNITS 镜像（起始 2 级），档案返回', !!jb && jb.level === UNITS.chenpinxuan.level && jb.level === 2 && isInParty(st, 'chenpinxuan'));
check('joinParty 幂等：重复入队不动 roster', joinParty(st, 'chenpinxuan') === st.roster.chenpinxuan && Object.keys(st.roster).length === 2);
check('joinParty 未知 id → null 不抛（静默告警）', silenced(() => joinParty(st, 'nope') === null));
setFlag(st, 'met_chen', true); setFlag(st, 'tasted_soda', false);
check('flags：set/get/缺省值', getFlag(st, 'met_chen') === true && getFlag(st, 'tasted_soda') === false && getFlag(st, 'never_set') === false);
check('markChapterCleared 首次 true 二次 false', markChapterCleared(st, 'ch0_battle1') === true && markChapterCleared(st, 'ch0_battle1') === false && st.clearedChapters.length === 1);
advanceTo(st, { sceneId: 'scene_before_home', chapterId: 'ch0_battle2' });
advanceTo(st, { sceneId: 'scene_corridor' });   // 只更新场景
check('advanceTo 局部更新（null 参数不动另一边）', st.sceneId === 'scene_corridor' && st.chapterId === 'ch0_battle2');
tickPlaytime(st, 1234.9); tickPlaytime(st, -5); tickPlaytime(st, NaN);
check('tickPlaytime：floor 入账 / 负数与 NaN 忽略', st.playtimeSec === 1234);
const runtime = getPartyUnit(st, 'chenpinxuan');
applyLevelUp(runtime, { hp: 1 }); runtime.currentHp = 3; runtime.equippedWeapon = 'basketball';
const committed = commitRuntimeUnit(st, runtime);
check('commitRuntimeUnit 写回：等级+装备+残血带回档案',
  committed.level === UNITS.chenpinxuan.level + 1 && committed.equippedWeapon === 'basketball' && committed.currentHp === 3);
check('写回档案同样剥战场字段', ['x', 'isAlive'].every((k) => committed[k] === undefined));
check('档案 JSON 往返无损（serialize→hydrate→serialize）', (() => {
  const b = st.roster.chenpinxuan; const again = serializeUnit(hydrateUnit(b));
  return JSON.stringify(again) === JSON.stringify(b);
})());
const meta = summarizeState(st);
check('summarizeState：槽位展示摘要形状',
  meta.route === 'female' && meta.leadName === UNITS.shiyunuo.name && meta.partySize === 2 && meta.leadLevel === UNITS.shiyunuo.level
  && meta.sceneId === 'scene_corridor' && meta.chapterId === 'ch0_battle2' && meta.clearedCount === 1 && meta.playtimeSec === 1234 && meta.savedAt === 0);

/* ══════════ §4 save_manager 3+1 槽存档 ══════════ */
section('4 save_manager 3+1 槽');
check('常量：MANUAL_SLOTS=[1,2,3] / ALL_SLOTS 含 auto / 中文标签',
  deepEq(MANUAL_SLOTS, [1, 2, 3]) && deepEq(ALL_SLOTS, ['auto', 1, 2, 3]) && SLOT_LABELS.auto === '自动存档' && SLOT_LABELS[1] === '存档一');

/* 内存存储 + 可控时钟：Date.now 打补丁让 savedAt 完全确定 */
function makeMem() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); }, _m: m };
}
const realNow = Date.now;
let clock = 1000;
Date.now = () => clock;
const mem = makeMem();
const sm = createSaveManager(mem);
let allOk = true;
try {
  check('注入存储 isPersistent=true', sm.isPersistent === true);
  const emptyList = sm.listSlots();
  check('初始空档：listSlots 4 项全 exists=false / hasAnySave=false / mostRecent=null',
    emptyList.length === 4 && emptyList.every((s) => s.exists === false) && sm.hasAnySave() === false && sm.mostRecentSave() === null);
  check('槽位顺序固定 [auto,1,2,3] 且带中文 label', deepEq(emptyList.map((s) => s.slot), ['auto', 1, 2, 3]) && emptyList[3].label === '存档三');
  const s1 = sm.saveToSlot(1, st);
  check('saveToSlot(1) ok：savedAt=可控时钟 1000 + meta 摘要', s1.ok === true && s1.savedAt === 1000 && s1.meta.leadName === UNITS.shiyunuo.name && s1.meta.playtimeSec === 1234);
  check('saveToSlot 不突变原 state（savedAt 仍 0）', st.savedAt === 0);
  check('非法槽位（字符串 1 / 9 / x）：写读删全部拒绝',
    sm.saveToSlot('1', st).ok === false && sm.loadSlot(9) === null && sm.deleteSlot('x') === false);
  check('非法数据（缺 schema/roster/sceneId）拒绝', sm.saveToSlot(1, {}).ok === false && sm.saveToSlot(1, { schema: 2 }).ok === false);
  check('写档后 hasAnySave=true；mostRecent=槽1', sm.hasAnySave() === true && sm.mostRecentSave().slot === 1);
  clock = 2000;
  const sa = sm.autosave(st);
  check('autosave 写 auto 槽：savedAt=2000', sa.ok === true && sm.loadSlot('auto').savedAt === 2000);
  check('更晚时间戳的自动档顶上 mostRecent', sm.mostRecentSave().slot === 'auto');
  clock = 3000;
  sm.saveToSlot(2, st);
  check('槽2(3000) 后来居上 mostRecent=2', sm.mostRecentSave().slot === 2);
  const l1 = sm.loadSlot(1);
  check('loadSlot 往返保持 scene/roster/等级（§3 已升级：UNITS 2 → 存档 3）',
    !!l1 && l1.sceneId === st.sceneId && l1.leadUnitId === st.leadUnitId
    && st.roster.chenpinxuan.level === UNITS.chenpinxuan.level + 1            // 先证明 st 确实升过级
    && l1.roster.chenpinxuan.level === st.roster.chenpinxuan.level            // 再证明读档原样带回
    && l1.roster.chenpinxuan.currentHp === st.roster.chenpinxuan.currentHp && l1.savedAt === 1000);
  const ls = sm.listSlots();
  check('listSlots：已有档位带 meta 摘要；空槽 meta=null', ls[0].slot === 'auto' && ls[0].exists === true && ls[0].meta !== null
    && ls[0].meta.leadName === UNITS.shiyunuo.name && ls[1].exists === true && ls[3].exists === false && ls[3].meta === null);
  // 槽2 塞入损坏 JSON、槽3 塞入“合法 JSON 但不是存档”
  mem._m.set('fx_save_v2_slot_2', '{corrupt-json');
  mem._m.set('fx_save_v2_slot_3', '{"schema":9,"route":"female"}');
  const corrupted = silenced(() => sm.loadSlot(2));
  const notSave = silenced(() => sm.loadSlot(3));
  check('损坏 JSON → null 不抛；合法 JSON 但非存档 → null',
    corrupted === null && notSave === null);
  check('槽2 损坏后 mostRecent 退回 auto(2000)', silenced(() => sm.mostRecentSave()).slot === 'auto');
  const exp1 = sm.exportSlot(1);
  const imp = sm.importSaveText(exp1);
  check('导出/导入往返：ok + 主角 + 等级与当前 st 一致（含升级与残血）',
    !!exp1 && imp.ok === true && imp.state.leadUnitId === st.leadUnitId
    && imp.state.roster.chenpinxuan.level === st.roster.chenpinxuan.level
    && imp.state.roster.chenpinxuan.equippedWeapon === st.roster.chenpinxuan.equippedWeapon);
  check('导入非法文本：乱码/空串/非存档形状 → {ok:false} 不抛',
    sm.importSaveText('garbage{{{').ok === false && sm.importSaveText('').ok === false && sm.importSaveText('{"schema":9}').ok === false);
  // v2 旧档（无 stash）读入自动升级 schema 3 + 补空仓（T1 migrate 钩子锚点）
  const legacyBlob = JSON.parse(JSON.stringify(st));
  legacyBlob.schema = 2;
  delete legacyBlob.stash;
  const v3Res = sm.importSaveText(JSON.stringify(legacyBlob));
  check('v2 旧档 migrate：升 schema 3 + 补空仓 + 数值随档保留（loadSlot 同一 migrate 管道）',
    v3Res.ok === true && v3Res.state.schema === 3
    && Array.isArray(v3Res.state.stash.items) && v3Res.state.stash.items.length === 0
    && v3Res.state.roster.chenpinxuan.level === st.roster.chenpinxuan.level
    && v3Res.state.sceneId === st.sceneId);
  mem._m.set('fx_save_v2_slot_3', JSON.stringify(legacyBlob));
  const viaLoad = sm.loadSlot(3);
  check('loadSlot 也走 migrate：盘上 v2 档读出即 schema 3 带空仓',
    !!viaLoad && viaLoad.schema === 3 && Array.isArray(viaLoad.stash.items) && viaLoad.stash.items.length === 0);
  check('migrate 不改写盘上原档（仍是原字符串），下次读档幂等',
    sm.loadSlot(3).schema === 3 && JSON.parse(mem._m.get('fx_save_v2_slot_3')).schema === 2);
  mem._m.set('fx_save_v2_slot_3', '{"schema":9,"route":"female"}');
  check('导出空槽 → null', sm.exportSlot(3) === null);
  // 配额满：setItem 恒抛 QuotaExceededError
  const quota = {
    getItem: () => null,
    setItem: () => { const e = new Error('mock'); e.name = 'QuotaExceededError'; throw e; },
    removeItem: () => {}
  };
  const smq = createSaveManager(quota);
  const qres = silenced(() => smq.saveToSlot(1, st));
  check('配额满优雅降级：{ok:false, error 含 QuotaExceededError} 不抛', qres.ok === false && /QuotaExceeded/.test(String(qres.error)));
  check('配额失败后 hasAnySave 仍为 false', smq.hasAnySave() === false);
  check('deleteSlot(2) 生效；clearAll 清光全部', sm.deleteSlot(2) === true && sm.loadSlot(2) === null && (() => { sm.clearAll(); return sm.hasAnySave() === false && sm.loadSlot(1) === null && sm.loadSlot('auto') === null; })());
  // Node 下无 localStorage → 退化内存版
  const smDef = silenced(() => createSaveManager());
  const defOk = smDef.saveToSlot(1, st);
  check('无 localStorage 环境退化内存（isPersistent=false 仍可读写）', smDef.isPersistent === false && defOk.ok === true && smDef.loadSlot(1) !== null);
  smDef.clearAll();
} finally {
  Date.now = realNow;
}
check('Date.now 已恢复原实现', Date.now === realNow);

/* ══════════ §5 avatar 头像统一解析服务 ══════════ */
section('5 avatar 头像统一解析服务');

// —— 5.0 fs 守门（必须最先跑，后续 register 的行不参与本次盘点）——
// 登记表声明的文件必须在盘上真实存在；缺图时逐条打印「按此 URL 补图」。
let missingFiles = [];
for (const actor of listActors()) {
  for (const st of listStates(actor)) {
    for (const d of ['1x', '2x']) {
      const url = getPortraitUrl(actor, { state: st, density: d });
      if (!existsSync(new URL('../' + url, import.meta.url))) missingFiles.push(url);
    }
  }
}
if (missingFiles.length > 0) {
  console.log('    缺图清单（占位图顶住画面，请按以下 URL 补图）：');
  for (const f of missingFiles) console.log('    - ' + f);
}
check('fs 守门：登记表 × state × 双密度全部在盘（缺 ' + missingFiles.length + ' 张）', missingFiles.length === 0);
check('listActors 表规模 ≥15 头', listActors().length >= 15);

// —— 5.1 URL 约定 ——
check('命名约定：' + PORTRAITS_DIR + '/{fileKey}_{state}{@2x}.png',
  getPortraitUrl('zhangzixiao') === 'assets/portraits/zhangzixiao_default.png'
  && getPortraitUrl('zhangzixiao', { density: '2x' }) === 'assets/portraits/zhangzixiao_default@2x.png'
  && getPortraitUrl('heyanxi', { state: 'corrupted' }) === 'assets/portraits/heyanxi_corrupted.png'
  && getPortraitUrl('heyanxi', { state: 'corrupted', density: '2x' }) === 'assets/portraits/heyanxi_corrupted@2x.png');
check('全局占位约定 _default（1x / 2x）',
  FALLBACK_URL === 'assets/portraits/_default.png'
  && getPortraitUrl('no_such_actor') === FALLBACK_URL
  && getPortraitUrl('no_such_actor', { density: '2x' }) === 'assets/portraits/_default@2x.png');

// —— 5.2 别名表：xu_laoshi 404 修复（回归锚点）——
check('别名 xu_laoshi → teacher_xu_default（修复 V1 静默 404，1x 与 @2x 双在盘）',
  getPortraitUrl('xu_laoshi') === 'assets/portraits/teacher_xu_default.png'
  && getPortraitUrl('xu_laoshi', { density: '2x' }) === 'assets/portraits/teacher_xu_default@2x.png'
  && hasActor('xu_laoshi') === true && hasActor('teacher_xu') === true);

// —— 5.3 兜底语义 ——
const fb = resolvePortrait('ghost_actor');
check('未登记角色 → 全局占位 + reason=unknown_actor + actor=null',
  fb.isFallback === true && fb.reason === 'unknown_actor' && fb.uri === FALLBACK_URL && fb.actor === null);
const subst = resolvePortrait('zhangzixiao', { state: 'smile' });
check('已登记角色 + 未登记 state → 落回本人 default（脸还是对的）+ substitutedState',
  subst.isFallback === false && subst.reason === 'state'
  && subst.substitutedState === 'smile' && subst.state === 'default' && subst.requestedState === 'smile'
  && subst.uri === getPortraitUrl('zhangzixiao')
  && resolvePortrait('heyanxi', { state: 'corrupted' }).substitutedState === null);
check('非法密度（3x / 缺省）按 1x 组装，不带 @2x',
  getPortraitUrl('shiyunuo', { density: '3x' }) === 'assets/portraits/shiyunuo_default.png'
  && resolvePortrait('shiyunuo', { density: '3x' }).density === '1x');

// —— 5.4 数据表守门：UNITS ∪ ENEMIES 全员已登记 ——
const uncovered = [...Object.keys(UNITS), ...Object.keys(ENEMIES)].filter((id) => !hasActor(id));
if (uncovered.length > 0) console.log('    下列角色未登记头像表：' + uncovered.join(', '));
check('UNITS ∪ ENEMIES 全员登记（新增角色须同步登记表，漏掉由本项抓出）', uncovered.length === 0);
check('listStates 镜像：fanwenmo 双态 / vendor 单态',
  deepEq(listStates('fanwenmo'), ['default', 'corrupted']) && deepEq(listStates('vendor'), ['default']));

// —— 5.5 registerActorStates 动态增行（在 fs 守门之后）——
registerActorStates('newkid', ['smile', 'hurt']);
check('registerActorStates 增行后立即可解析，default 恒为首位',
  listStates('newkid').includes('smile') && listStates('newkid').includes('hurt')
  && listStates('newkid')[0] === 'default'
  && getPortraitUrl('newkid', { state: 'smile' }) === 'assets/portraits/newkid_smile.png'
  && resolvePortrait('newkid', { state: 'smile' }).substitutedState === null);
check('registerActorStates 返回副本（外界改动不回渗内部表）',
  (() => { const s = registerActorStates('probe_x', []); s.push('leak'); return listStates('probe_x').length === 1; })());

// —— 5.6 战场单位入口优先级 ——
const eBattle = { id: 'punk_1', enemyId: 'punk', portrait: 'assets/art/punk_default.png' };
const pBattle = { id: 'zhangzixiao', faction: 'player' };
const legacy = { portrait: 'assets/art/heyanxi_corrupted.png' };
check('portraitForUnit 优先级：enemyId(敌方实例) / id(我方) / portrait 兜底 / 空 → 占位',
  portraitForUnit(eBattle) === 'assets/portraits/punk_default.png'
  && portraitForUnit(pBattle) === 'assets/portraits/zhangzixiao_default.png'
  && portraitForUnit(legacy) === 'assets/portraits/heyanxi_corrupted.png'
  && portraitForUnit({}) === FALLBACK_URL
  && portraitForUnit(null) === FALLBACK_URL);
check('存量 art 引用自动搬家 + 双密度重打（1x→@2x）',
  portraitForUnit(legacy, { density: '2x' }) === 'assets/portraits/heyanxi_corrupted@2x.png'
  && portraitForUnit(eBattle, { density: '2x' }) === 'assets/portraits/punk_default@2x.png');

// —— 5.7 字符串解析工具 ——
const pp = parsePortraitRef('assets/art/zhangxizhe_default@2x.png');
check('parsePortraitRef 四字段形状 / 垃圾串不匹配',
  pp.actor === 'zhangxizhe' && pp.state === 'default' && pp.density === '2x' && pp.dir === 'art'
  && parsePortraitRef('garbage') === null && parsePortraitRef(null) === null);
check('normalizePortraitRef：已登记走表 / 未登记仅搬家',
  normalizePortraitRef('assets/art/zhangxizhe_default.png') === 'assets/portraits/zhangxizhe_default.png'
  && normalizePortraitRef('assets/art/whoever_smile.png') === 'assets/portraits/whoever_smile.png'
  && normalizePortraitRef('assets/art/fanwenmo_corrupted.png') === 'assets/portraits/fanwenmo_corrupted.png');

/* ══════════ §6 ui_kit 视觉基座 ══════════ */
section('6 ui_kit 视觉基座');

// —— 6.1 调色盘 / 条形预设 / 数值工具 ——
check('PALETTE 与存量弹窗逐色锚定（羊皮纸/炭黑/亮金/亮黄字/外框/标题琥珀）',
  PALETTE.paper === '#FFFDF9' && PALETTE.ink === '#292524' && PALETTE.gold === '#FACC15'
  && PALETTE.goldText === '#fef08a' && PALETTE.frame === '#d6c8b4' && PALETTE.title === '#b45309');
check('BAR_KINDS 三语义（HP红 / EXP金 / STAT绿）各有渐变二色与标签',
  BAR_KINDS.hp.label === 'HP' && BAR_KINDS.exp.label === 'EXP' && BAR_KINDS.stat.label === ''
  && BAR_KINDS.hp.fill[0] !== BAR_KINDS.exp.fill[0]
  && [BAR_KINDS.hp, BAR_KINDS.exp, BAR_KINDS.stat].every((k) => k.fill.length === 2));
check('clamp01 全防御：负数/超界/NaN/非数字一律安全',
  clamp01(-3) === 0 && clamp01(0.42) === 0.42 && clamp01(2) === 1
  && clamp01(NaN) === 0 && clamp01('x') === 0 && clamp01(undefined) === 0 && clamp01(null) === 0);
check('barRatio：正常值 / 负血 / 除零 / 超上限 / NaN',
  Math.abs(barRatio(34, 48) - 34 / 48) < 1e-9 && barRatio(-5, 10) === 0 && barRatio(5, 0) === 0
  && barRatio(20, 10) === 1 && barRatio(NaN, 10) === 0 && barRatio(0, 10) === 0);
check('lerp / easeOutCubic 端点夹取（交战与经验动画时间轴的地基）',
  lerp(10, 20, 0.5) === 15 && lerp(20, 10, 0.5) === 15
  && easeOutCubic(0) === 0 && easeOutCubic(1) === 1 && easeOutCubic(0.5) === 0.875
  && easeOutCubic(-3) === 0 && easeOutCubic(9) === 1);
check('fontCss：中西字体栈 + 字号下限 10（Windows 微软雅黑兜底）',
  fontCss(20, 'bold') === 'bold 20px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'
  && fontCss(9).startsWith('10px ') && fontCss(9).indexOf('PingFang SC') > 0
  && fontCss(16).indexOf('Microsoft YaHei') > 0);

// —— 6.2 planBar 条形计划 ——
const bp = planBar({ x: 10, y: 20, w: 200, h: 14, kind: 'hp', ratio: -0.5, ghostRatio: 1.7, valueText: '34/48' });
check('planBar：ratio/ghost 双向 clamp + 几何原样 + valueText 透传 + 标签取预设',
  bp.ratio === 0 && bp.ghostRatio === 1 && bp.x === 10 && bp.y === 20 && bp.w === 200 && bp.h === 14
  && bp.valueText === '34/48' && bp.label === 'HP');
check('planBar：未知 kind 落 stat 不炸 / 标签显式覆盖 / 缺省 ghost 为 null',
  planBar({ kind: 'mp' }).kind === 'stat'
  && planBar({ kind: 'exp', label: '等级经验' }).label === '等级经验'
  && planBar({ ratio: 0.5 }).ghostRatio === null
  && planBar({}).label === '');

// —— 6.3 命中测试 & 弹窗盒子几何 ——
const hitRect = { x: 100, y: 200, w: 50, h: 30 };
check('inRect：四边含边界命中，外一点即 miss',
  inRect(100, 200, hitRect) && inRect(150, 230, hitRect) && inRect(125, 215, hitRect)
  && !inRect(99, 200, hitRect) && !inRect(151, 230, hitRect) && !inRect(0, 0, null));
const bx = planModalBox(1280, 720, 520, 330);
check('planModalBox 居中几何：1280×720 → 520×330 @ (380,195) + cx/cy 派生',
  bx.x === 380 && bx.y === 195 && bx.w === 520 && bx.h === 330 && bx.cx === 640 && bx.cy === 360);
const bx2 = planModalBox(400, 300, 900, 700, 24);
check('planModalBox 超大盒自动收缩到画布-margin 且仍居中',
  bx2.w === 352 && bx2.h === 252 && bx2.x === 24 && bx2.y === 24);
const bx3 = planModalBox(100, 100, 900, 700);
check('planModalBox 极小画布给最小可读尺寸（80×120）不炸',
  bx3.w === 80 && bx3.h === 120);

// —— 6.4 折行（CJK/分段/不丢字）——
const mLen = (s) => s.length * 10; // 假测量：每字符 10px 宽
check('wrapLines：CJK 按字折行且无行超宽',
  deepEq(wrapLines('一二三四五六七八九十一', mLen, 50), ['一二三四五', '六七八九十', '一']));
check('wrapLines：显式 \\n 分段且空行保留',
  deepEq(wrapLines('AAAA\n\nBB', mLen, 400), ['AAAA', '', 'BB']));
check('wrapLines：空文本/null/undefined 统一空数组',
  wrapLines('', mLen, 10).length === 0 && wrapLines(null, mLen, 10).length === 0
  && wrapLines(undefined, mLen, 10).length === 0);
check('wrapLines：单字超宽不丢字（逐字成行兜底）',
  deepEq(wrapLines('ABC', () => 100, 10), ['A', 'B', 'C']));
check('planWrappedBlock：行数组 + 行高下限 12 + 总高 = 行数×行高',
  deepEq(planWrappedBlock('一二三四五六七八九十一', mLen, 50, 22).lines, ['一二三四五', '六七八九十', '一'])
  && planWrappedBlock('一二三四五六七八九十一', mLen, 50, 22).height === 66
  && planWrappedBlock('', mLen, 50, 22).height === 0
  && planWrappedBlock('X', mLen, 50, 5).lineHeight === 12);

// —— 6.5 按钮行布局 ——
const two = planButtonRow(bx, 2);
check('planButtonRow：双按钮等宽 / 间隙恒定 / 整行水平居中 / 全部落盒内',
  two[0].w === two[1].w && two[0].y === two[1].y
  && Math.abs(two[0].x + two[0].w + 16 - two[1].x) < 1e-9
  && Math.abs(two[0].x - bx.x - (bx.x + bx.w - two[1].x - two[1].w)) < 1e-9
  && two.every((r) => inRect(r.x, r.y, bx) && inRect(r.x + r.w, r.y + r.h, bx)));
check('planButtonRow：单按钮 360 封顶 / 默认高 52 贴底留 24',
  (() => { const one = planButtonRow(bx, 1);
    return one[0].w === 360 && one[0].h === 52 && one[0].y === bx.y + bx.h - 52 - 24; })());
check('planButtonRow：显式 btnW/btnH/gap/anchorY 全部被尊重',
  (() => { const r = planButtonRow(bx, 2, { btnW: 150, btnH: 40, gap: 20, anchorY: 500 });
    return r[0].w === 150 && r[0].h === 40 && r[0].y === 500
      && r[1].x - (r[0].x + r[0].w) === 20; })());

// —— 6.6 ModalBase 弹层基类（假 canvas，不触碰真实绘制）——
const fakeCanvas = { width: 1280, height: 720, getContext: () => ({}) };
class TestModal extends ModalBase {
  constructor(canvas, cfg, onClose) { super(canvas, cfg, onClose); this.triggered = []; }
  trigger(id) { this.triggered.push(id); this.close(); }
  render() { this.renderFrame(); this.renderButtons(); }
}

let closed1 = 0;
const m1 = new TestModal(fakeCanvas, {}, () => closed1++);
m1.setupBox(520, 330);
m1.setButtons([{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]);
m1.handleKeyDown({ key: 'Enter' });
m1.handleKeyDown({ key: 'Enter' });
check('ModalBase 非 selectable：Enter 直接关闭，onClose one-shot 只回调一次',
  m1.finished === true && m1.isDone === true && closed1 === 1 && m1.triggered.length === 0);

let closed2 = 0;
const m2 = new TestModal(fakeCanvas, {}, () => closed2++);
m2.selectable = true;
m2.setupBox(520, 330);
m2.setButtons([{ id: 'atk', label: '攻击' }, { id: 'item', label: '道具' }, { id: 'wait', label: '待机' }]);
check('selectable 弹层：焦点初始 0 且按钮全部落在盒内',
  m2.focusIndex === 0
  && m2.buttons.every((b) => inRect(b.rect.x, b.rect.y, m2.box)
    && inRect(b.rect.x + b.rect.w, b.rect.y + b.rect.h, m2.box)));
m2.handleKeyDown({ key: 'ArrowDown' });
const step1 = m2.focusIndex === 1;
m2.handleKeyDown({ key: 'ArrowDown' });
m2.handleKeyDown({ key: 'ArrowDown' });
const wrapOk = m2.focusIndex === 0;
m2.handleKeyDown({ key: 'ArrowUp' });
check('↑↓ 焦点导航 0→1→2→0 循环 + ArrowUp 回绕 0→2',
  step1 && wrapOk && m2.focusIndex === 2);
const eaten = m2.handleKeyDown({ key: 'Enter' });
check('Enter 触发焦点按钮（trigger 收到 id）并关闭',
  eaten === true && deepEq(m2.triggered, ['wait']) && m2.finished === true && closed2 === 1);

let closed3 = 0;
const m3 = new TestModal(fakeCanvas, {}, () => closed3++);
m3.selectable = true;
m3.setupBox(520, 330);
m3.setButtons([{ id: 'yes', label: '确定' }, { id: 'no', label: '取消' }]);
const b3 = m3.buttons[1].rect;
m3.handleClick(b3.x + b3.w / 2, b3.y + b3.h / 2);
check('handleClick 命中按钮 → 联动焦点 + trigger + 消费事件',
  deepEq(m3.triggered, ['no']) && m3.focusIndex === 1 && m3.finished === true && closed3 === 1);

const m4 = new TestModal(fakeCanvas, {}, () => {});
m4.setupBox(520, 330);
m4.setButtons([{ id: 'x', label: 'X' }]);
check('空白处点击不被消费（交还外层）+ Escape 关闭 + 无关按键穿透',
  m4.handleClick(5, 5) === false && m4.finished === false
  && m4.handleKeyDown({ key: 'w' }) === false
  && m4.handleKeyDown({ key: 'Escape' }) === true && m4.finished === true);

check('render() 必须由子类实现（忘实现第一帧就明确报错，而不是白屏）',
  (() => { const mb = new ModalBase(fakeCanvas, {}, () => {});
    try { mb.render(); return false; } catch (e) { return /render/.test(e.message); } })());

/* ══════════ §7 combat_exchange 交战弹层 ══════════ */
section('7 combat_exchange 交战弹层');

// —— 7.1 节拍常量 / 交击计划 / 卡片几何 ——
check('STRIKE_TIMING / EXP_TIMING 节拍全量锚定（改一处时序就同步改一处断言）',
  STRIKE_TIMING.WINDUP === 170 && STRIKE_TIMING.IMPACT === 90
  && STRIKE_TIMING.DROP === 320 && STRIKE_TIMING.DROP_CRIT === 400
  && STRIKE_TIMING.SETTLE === 130 && STRIKE_TIMING.SETTLE_CRIT === 200
  && STRIKE_TIMING.DODGE === 110 && STRIKE_TIMING.SETTLE_MISS === 220
  && EXP_TIMING.CHARGE === 180 && EXP_TIMING.GROWTH === 420
  && EXP_TIMING.GROWTH_WRAP === 300 && EXP_TIMING.BANNER === 480
  && EXP_TIMING.REFILL === 320 && EXP_TIMING.SETTLE === 120);

const segMiss0 = planStrikeSegment({ isHit: false, damage: 99, dstHpBefore: 10, dstMaxHp: 48 });
const segNorm0 = planStrikeSegment({ isHit: true, damage: 7, dstHpBefore: 34, dstMaxHp: 48 }, 710);
const segCrit0 = planStrikeSegment({ srcSide: 'defender', isHit: true, isCrit: true, damage: 50, dstHpBefore: 34, dstMaxHp: 48 });
check('交击计划三型：MISS 500 / 普通 710 / 暴击 860，锚点与 src/dst 镜像齐全',
  segMiss0.duration === 500 && segMiss0.impactAt === 280
  && segMiss0.damage === 99 && segMiss0.hpAfter === 10 && segMiss0.hpBefore === 10
  && segNorm0.impactAt === 170 && segNorm0.dropAt === 260 && segNorm0.settleAt === 580
  && segNorm0.start === 710 && segNorm0.end === 1420
  && segNorm0.srcSide === 'attacker' && segNorm0.dstSide === 'defender' && segNorm0.hpAfter === 27
  && segCrit0.duration === 860 && segCrit0.settleAt === 660
  && segCrit0.srcSide === 'defender' && segCrit0.dstSide === 'attacker' && segCrit0.hpAfter === 0);
check('hpAfter 公式与 main.js 同源：伤害炸穿夹 0 / 血量超上限夹 maxHp / 负伤害归 0',
  planStrikeSegment({ isHit: true, damage: 999, dstHpBefore: 10, dstMaxHp: 48 }).hpAfter === 0
  && planStrikeSegment({ isHit: true, damage: 0, dstHpBefore: 100, dstMaxHp: 48 }).hpAfter === 48
  && planStrikeSegment({ isHit: true, damage: -5, dstHpBefore: 34, dstMaxHp: 48 }).damage === 0);

const cards0 = planExchangeCards(bx);
check('planExchangeCards 卡片几何：双卡对称 / 28 呼吸节奏 / 名级分层 / VS 徽章 / 报告行-经验区拉开净空',
  cards0.attacker.avatar.cx === 489 && cards0.defender.avatar.cx === 791
  && cards0.attacker.avatar.r === 35
  && cards0.attacker.nameY === 357 && cards0.attacker.levelY === 378
  && cards0.attacker.nameY === cards0.defender.nameY
  && cards0.attacker.hpBar.w === 198 && Math.round(cards0.attacker.hpBar.x) === 390
  && cards0.attacker.hpBar.y === 403 && cards0.attacker.hpBar.y === cards0.defender.hpBar.y
  && cards0.attacker.damageY === 451
  && cards0.vs.cx === 640 && cards0.vs.cy === 294 && cards0.vs.r === 17
  && cards0.levelUpY === 393 && cards0.reportY === 413
  && cards0.expBar.y === 446 && cards0.expBar.w === 364
  && cards0.expLabelY === 426 && cards0.expLabelY === cards0.expBar.y - 20
  && cards0.expBar.y >= cards0.reportY + 24);

// —— 7.2 经验计划 ——
const expNorm0 = planExpSegment({ amount: 18, before: 12, after: 30, maxExp: 100 });
const expUp0 = planExpSegment({ name: '张子骁', amount: 40, before: 80, after: 20, maxExp: 100, leveledUp: true, levelBefore: 1, levelAfter: 2 });
check('经验计划双型：普通 720 无横幅锚点 / 升级 1400（banner 480 / refill 960）',
  expNorm0.duration === 720 && expNorm0.bannerAt === null && expNorm0.refillAt === null
  && expUp0.duration === 1400 && expUp0.bannerAt === 480 && expUp0.refillAt === 960);
check('levelAfter 缺省 = levelBefore+1；levelBefore 缺失则级数链断为 null',
  planExpSegment({ leveledUp: true, levelBefore: 3, maxExp: 100 }).levelAfter === 4
  && planExpSegment({ levelBefore: 5, maxExp: 100 }).levelAfter === 6
  && planExpSegment({ leveledUp: true, maxExp: 100 }).levelAfter === null);
check('maxExp≤0 兜底 100 + before/after 双向夹到 [0,maxExp]',
  (() => { const z = planExpSegment({ maxExp: -3, before: 999, after: -5 });
    return z.maxExp === 100 && z.before === 100 && z.after === 0; })());

// —— 7.3 exchangeViewAt 分相位快照 ——
const sA = planStrikeSegment({ srcSide: 'attacker', srcName: '张子骁', dstName: '流动商贩', label: '先手', isHit: true, damage: 7, dstHpBefore: 34, dstMaxHp: 48 });
const sM = planStrikeSegment({ srcSide: 'attacker', srcName: '张子骁', dstName: '流动商贩', isHit: false, dstHpBefore: 34, dstMaxHp: 48 });
const init0 = { attackerHp: 40, defenderHp: 34, exp: null };
const vWind = exchangeViewAt([sA], 100, init0);
const vImp = exchangeViewAt([sA], 200, init0);
const vDrop = exchangeViewAt([sA], 420, init0);
const vSet = exchangeViewAt([sA], 650, init0);
check('strike 四相推进：windup 无字 → impact 数字先出 HP 不动 → drop 缓动掉血 → settle 定格',
  vWind.phase === 'windup' && vWind.damageText === null
  && vWind.reportText === '张子骁【先手】发起攻击' && vWind.defenderHp === 34
  && vImp.phase === 'impact' && vImp.damageText === '-7' && vImp.damageKind === 'hit' && vImp.defenderHp === 34
  && vDrop.phase === 'drop' && Math.abs(vDrop.defenderHp - 27.875) < 1e-9 && vDrop.defenderGhost === 34
  && vSet.phase === 'settle' && vSet.defenderHp === 27 && vSet.defenderGhost === 34 && vSet.attackerHp === 40);
const mWin = exchangeViewAt([sM], 100, init0);
const mMiss = exchangeViewAt([sM], 300, init0);
check('MISS 两相：windup 无伤害字 → miss 相 MISS 文案 + 不掉血',
  mWin.phase === 'windup' && mWin.damageText === null
  && mMiss.phase === 'miss' && mMiss.damageText === 'MISS' && mMiss.damageKind === 'miss'
  && mMiss.reportText === '流动商贩灵巧地闪开了' && mMiss.defenderHp === 34 && mMiss.attackerHp === 40);

const initE = { attackerHp: 40, defenderHp: 34, exp: { current: 80, maxExp: 100, level: 1 } };
const initG = { attackerHp: 40, defenderHp: 34, exp: { current: 12, maxExp: 100, level: 2 } };
const ec0 = exchangeViewAt([expUp0], 100, initE);
const eb0 = exchangeViewAt([expUp0], 700, initE);
const er0 = exchangeViewAt([expUp0], 1000, initE);
const es0 = exchangeViewAt([expUp0], 1300, initE);
const gg0 = exchangeViewAt([expNorm0], 390, initG);
const gs0 = exchangeViewAt([expNorm0], 650, initG);
check('exp 升级四相：charge→banner（满格+等级行提前跳新值）→refill（0→新值）→settle',
  ec0.phase === 'exp-charge' && ec0.expShown === 80 && ec0.expGained === 40
  && ec0.reportText === '张子骁获得40点经验'
  && eb0.phase === 'exp-banner' && eb0.expShown === 100 && eb0.expLevel === 2
  && eb0.levelUpText === '等级提升！ Lv.1 → Lv.2'
  && er0.phase === 'exp-refill' && er0.expShown > 0 && er0.expShown < 20 && er0.expLevel === 2
  && es0.phase === 'exp-settle' && es0.expShown === 20 && es0.expLevel === 2);
check('exp 普通两相：growth 中点 27.75 + ghost 残影 → settle 到 after；纯交击时间轴无 exp 快照则经验区整体隐藏',
  gg0.phase === 'exp-growth' && gg0.expShown === 27.75 && gg0.expGhost === 12
  && gs0.phase === 'exp-settle' && gs0.expShown === 30
  && exchangeViewAt([sA], 0, init0).expVisible === false
  && exchangeViewAt([sA], 0, init0).expLevel === null);

// —— 7.4 多段累计（同一时间轴：先手 → 反击 → 经验）——
const c1 = planStrikeSegment({ srcSide: 'attacker', srcName: '张子骁', dstName: '流动商贩', label: '先手', isHit: true, damage: 7, dstHpBefore: 34, dstMaxHp: 48 }, 0);
const c2 = planStrikeSegment({ srcSide: 'defender', srcName: '流动商贩', dstName: '张子骁', label: '反击', isHit: true, damage: 5, dstHpBefore: 40, dstMaxHp: 40 }, 710);
const c3 = planExpSegment({ name: '张子骁', amount: 18, before: 12, after: 30, maxExp: 100 }, 1420);
const vLink = exchangeViewAt([c1, c2], 710, init0);
check('累计效应：第二段起点处守方 HP 已吸收第一段终态（27）',
  vLink.phase === 'windup' && vLink.strikingSide === 'defender' && vLink.activeIndex === 1
  && vLink.defenderHp === 27 && vLink.attackerHp === 40
  && vLink.reportText === '流动商贩【反击】发起攻击');
const vGrowth = exchangeViewAt([c1, c2, c3], 1810, initG);
check('三段串联中段：交击终态 + exp growth 中点（27.75）双轨同时成立',
  vGrowth.phase === 'exp-growth' && vGrowth.attackerHp === 35 && vGrowth.defenderHp === 27
  && vGrowth.expShown === 27.75 && vGrowth.expGhost === 12 && vGrowth.timelineDone === false);
const vEnd = exchangeViewAt([c1, c2, c3], 2140, initG);
check('时间轴整体走完：全部终态吸收 + timelineDone=true',
  vEnd.timelineDone === true && vEnd.attackerHp === 35 && vEnd.defenderHp === 27 && vEnd.expShown === 30);

// —— 7.5 组件实例：虚拟时钟 / Promise 排队 / 输入锁（顶层 await 驱动微任务）——
let ceClosed = 0;
const ce = new CombatExchange(fakeCanvas, {
  attacker: { name: '张子骁', level: 1, hp: 40, maxHp: 40, faction: 'player' },
  defender: { name: '流动商贩', level: 1, hp: 34, maxHp: 48, faction: 'enemy' },
  playerSide: 'attacker',
  exp: { current: 80, max: 100, level: 1 },
}, () => ceClosed++);
check('组件初建：盒 760×500 / 双侧归位 / 我方经验快照挂我方侧',
  ce.box.w === 760 && ce.box.h === 500
  && ce.sides.attacker.name === '张子骁' && ce.sides.defender.maxHp === 48
  && ce.playerSide === 'attacker' && ce.initial.exp.current === 80
  && ce._pending.length === 0 && ce._sfxQueue.length === 0 && ce._vm === 0);

let strikeResolved = 0;
const pStrike = ce.playStrike({ srcSide: 'attacker', label: '先手', isHit: true, damage: 7 })
  .then(() => strikeResolved++);
ce._advanceVirtual(100);
check('交击时间轴：windup 相快照由虚拟时钟驱动（无伤害字且 HP 未动）',
  ce.view.phase === 'windup' && ce.view.defenderHp === 34 && ce.view.attackerHp === 40
  && ce.view.damageText === null && ce.view.reportText === '张子骁【先手】发起攻击');
check('虚拟时钟越点出队音效：swing 已发，命中音 170ms 处在队',
  ce._sfxQueue.length === 1 && ce._sfxQueue[0].sfx === 'sfx_hit_normal' && ce._sfxQueue[0].at === 170);
ce._advanceVirtual(125);
check('impact 帧：伤害数字先出、HP 仍未动（弹层掉血的关键顺序）',
  ce.view.phase === 'impact' && ce.view.damageText === '-7' && ce.view.damageKind === 'hit'
  && ce.view.defenderHp === 34 && ce._sfxQueue.length === 0);
ce._advanceVirtual(115);
check('drop 相：HP 沿 easeOutCubic 插值（34→27 的 25% 处 ≈ 29.95）+ ghost 残影',
  ce.view.phase === 'drop' && Math.abs(ce.view.defenderHp - 29.953125) < 1e-9
  && ce.view.defenderGhost === 34 && ce.view.attackerHp === 40);
check('时间轴未结束：弹层吞掉一切输入（点击/Enter/Escape 全不可跳过不可误关）',
  ce.handleClick(1, 1) === true && ce.handleKeyDown({ key: 'Enter' }) === true
  && ce.handleKeyDown({ key: 'Escape' }) === true && ce.finished === false
  && ce._pending.length === 1 && strikeResolved === 0);
ce._advanceVirtual(370);
await pStrike;
check('playStrike 的 Promise 过段末后 resolve（once），终态 27 落地',
  strikeResolved === 1 && ce._pending.length === 0
  && ce.view.defenderHp === 27 && ce.view.timelineDone === true);

let expResolved = 0;
const pExp = ce.playExp({ amount: 40, before: 80, after: 20, leveledUp: true, levelBefore: 1, levelAfter: 2 })
  .then(() => expResolved++);
ce._advanceVirtual(500);
check('升级 banner 相：满格定格 + 横幅文案 + 等级行提前跳新值 + 升级音效已出队',
  ce.view.phase === 'exp-banner' && ce.view.expShown === 100 && ce.view.expLevel === 2
  && ce.view.levelUpText === '等级提升！ Lv.1 → Lv.2'
  && ce._sfxQueue.length === 0 && expResolved === 0);
ce._advanceVirtual(890);
check('settle 相定格 20/100：经验终值已落条、时间轴未完时 Promise 仍在途',
  ce.view.phase === 'exp-settle' && ce.view.expShown === 20
  && ce.view.timelineDone === false && expResolved === 0 && ce._pending.length === 1);
ce._advanceVirtual(20);
await pExp;
check('exp 段播完 Promise resolve（once）+ 终态吸收 + 时间轴再次走完',
  expResolved === 1 && ce._pending.length === 0
  && ce.view.expShown === 20 && ce.view.expLevel === 2 && ce.view.timelineDone === true);
ce.finish();
ce.finish();
check('finish 幂等：出唯一"确认"按钮 + selectable 焦点 + 空白点击交还外层',
  ce._timelineEnded === true && ce.selectable === true
  && ce.buttons.length === 1 && ce.buttons[0].id === 'ok' && ce.focusIndex === 0
  && ce.handleClick(1, 1) === false);
check('finish 后输入解锁：Enter → trigger(ok) → close（onClose one-shot）',
  ce.handleKeyDown({ key: 'Enter' }) === true && ce.finished === true && ceClosed === 1);

// —— 7.6 异常与边界防御 ——
check('plan 系 null/undefined 入参不抛（退化为 MISS 500 / exp 720 defaults 语义）',
  (() => {
    const a = planStrikeSegment(null);
    const b = planStrikeSegment(undefined);
    const c = planExpSegment(null);
    const d = planExpSegment(undefined);
    return a.kind === 'strike' && a.isHit === false && a.duration === 500
      && b.duration === 500
      && c.kind === 'exp' && c.duration === 720 && c.maxExp === 100 && c.leveledUp === false
      && d.duration === 720;
  })());
check('exchangeViewAt：坏/空时间轴 → idle + timelineDone；顶层快照 null 也稳',
  exchangeViewAt([], 500).timelineDone === true && exchangeViewAt([], 500).phase === 'idle'
  && exchangeViewAt(null, 100).timelineDone === true
  && exchangeViewAt([sA], 10, null).phase === 'windup' && exchangeViewAt([sA], 10, null).defenderHp === 0);
const segNullLv = planExpSegment({ leveledUp: true, maxExp: 100 });
const vNullLv = exchangeViewAt([segNullLv], 700, initE);
check('等级数字缺失：升级横幅退化为 Lv.null 而不是抛错',
  vNullLv.phase === 'exp-banner' && vNullLv.levelUpText === '等级提升！ Lv.null → Lv.null');
check('组件极端 config：null 整包构造出 "?" 双方各 1 血的可渲染实例',
  (() => {
    const ce2 = new CombatExchange(fakeCanvas, null, null);
    return ce2.sides.attacker.name === '?' && ce2.sides.defender.name === '?'
      && ce2.sides.attacker.maxHp === 1 && ce2.initial.attackerHp === 1
      && ce2.playerSide === null && ce2.initial.exp === null
      && typeof ce2.box.w === 'number' && ce2.cards.attacker.avatar.r > 0;
  })());

/* ══════════ §8 level_up 升级明细弹层 ══════════ */
section('8 level_up 升级明细弹层');

// —— 8.1 节拍与九维表锚定 ——
check('节拍推导：单层时长 = 8×STAGGER + REVEAL + TAIL = 1360',
  LEVEL_UP_LAYER_LEN === LEVEL_UP_TIMING.ROW_STAGGER * 8 + LEVEL_UP_TIMING.REVEAL + LEVEL_UP_TIMING.TAIL
  && LEVEL_UP_LAYER_LEN === 1360);
check('九维行序完整：hp→mp→str→mag→skl→spd→luk→def→res（mov 不入成长）',
  GROWTH_ROWS.length === 9 && GROWTH_ROWS[0].key === 'hp' && GROWTH_ROWS[1].key === 'mp'
  && GROWTH_ROWS[8].key === 'res' && !GROWTH_ROWS.some(r => r.key === 'mov'));

// —— 8.2 面板快照（V1 运行时形态 → 规范九键）——
const su = { name: '张子骁', faction: 'player', stats: { maxHp: 23, maxMp: 12, str: 7, mag: 3, skl: 7, spd: 7, luk: 6, def: 5, res: 4, mov: 5 } };
const suSnap = snapshotGrowthStats(su);
check('snapshotGrowthStats：V1 stats.maxHp/maxMp 映射为规范 hp/mp 键',
  suSnap.hp === 23 && suSnap.mp === 12 && suSnap.str === 7 && suSnap.skl === 7 && suSnap.res === 4);
check('快照防御：null / 乱形状键退 0 不抛（不给行条喂 NaN）',
  (() => {
    const s = snapshotGrowthStats(null);
    const bad = snapshotGrowthStats({ stats: { maxHp: 'x' } });
    return s.hp === 0 && bad.hp === 0 && Object.keys(bad).length === 9;
  })());

// —— 8.3 计划三态：空 / 单层 / 连环 ——
check('空计划：0 层 / duration=0 / 视图层 idle 且已完',
  (() => {
    const p = planLevelUp({ fromLevel: 3, gainsByLevel: [] });
    return p.layers.length === 0 && p.duration === 0 && p.totalGain === 0
      && levelUpViewAt(p, 0).phase === 'idle' && levelUpViewAt(p, 0).timelineDone === true;
  })());
const luG1 = { hp: 1, mp: 0, str: 0, mag: 0, skl: 1, spd: 1, luk: 1, def: 0, res: 0 }; // 合计 +4
const p1 = planLevelUp({ fromLevel: 1, gainsByLevel: [luG1], statsBefore: suSnap });
check('单层计划：起拍=HEADLINE、层长、默认 toLevel=from+1、合计=+4',
  p1.layers[0].start === LEVEL_UP_TIMING.HEADLINE
  && p1.layers[0].end === LEVEL_UP_TIMING.HEADLINE + LEVEL_UP_LAYER_LEN
  && p1.duration === LEVEL_UP_TIMING.HEADLINE + LEVEL_UP_LAYER_LEN
  && p1.toLevel === 2 && p1.totalGain === 4 && p1.hasStats === true);
check('行烘焙：涨项 before=快照值/after=+1，未涨项 before=after（条仍画旧值）',
  p1.layers[0].rows[0].barBefore === 23 && p1.layers[0].rows[0].barAfter === 24
  && p1.layers[0].rows[2].barBefore === 7 && p1.layers[0].rows[2].barAfter === 7);
const luG2 = { hp: 1, skl: 1 };
const p2 = planLevelUp({ fromLevel: 1, gainsByLevel: [luG1, luG2], statsBefore: suSnap });
check('连环两层：L2 起拍 = HEADLINE + 1×(层长+SWITCH)、总长含 1 个层间 SWITCH、默认 toLevel=+2',
  p2.layers[1].start === LEVEL_UP_TIMING.HEADLINE + (LEVEL_UP_LAYER_LEN + LEVEL_UP_TIMING.SWITCH)
  && p2.duration === LEVEL_UP_TIMING.HEADLINE + 2 * LEVEL_UP_LAYER_LEN + LEVEL_UP_TIMING.SWITCH
  && p2.toLevel === 3);
check('跨层累计：L2 的 barBefore = L1 的 barAfter（24），且层等级行随层递推',
  p2.layers[1].rows[0].barBefore === 24 && p2.layers[1].rows[0].barAfter === 25
  && p2.layers[1].levelFrom === 2 && p2.layers[1].levelTo === 3
  && planLevelUp({ fromLevel: 1, toLevel: 9, gainsByLevel: [luG1, luG2] }).toLevel === 9);
check('statsBefore 缺失：纯数字模式 barBefore/barAfter 全 null、hasStats=false',
  (() => {
    const pn = planLevelUp({ fromLevel: 1, gainsByLevel: [luG1] });
    return pn.hasStats === false
      && pn.layers[0].rows.every(r => r.barBefore === null && r.barAfter === null);
  })());

// —— 8.4 视图相位：head / 层内三态行 / done ——
check('head 相（elapsed<HEADLINE）：layerIndex=-1、等级行取首层、时间轴未完',
  (() => {
    const v = levelUpViewAt(p1, 100);
    return v.phase === 'head' && v.layerIndex === -1
      && v.levelFrom === 1 && v.levelTo === 2 && v.timelineDone === false;
  })());
check('行0 揭示中点：barShown = 23 + easeOutCubic(0.5) = 23.875、ghost=旧值、文字 +1',
  (() => {
    const v = levelUpViewAt(p1, LEVEL_UP_TIMING.HEADLINE + LEVEL_UP_TIMING.REVEAL / 2);
    const r = v.rows[0];
    return v.phase === 'layer' && r.state === 'revealing'
      && Math.abs(r.barShown - 23.875) < 1e-9 && r.ghostShown === 23 && r.deltaText === '+1';
  })());
check('未涨项：flat 态、文字"——"、条定格旧值',
  (() => {
    const v = levelUpViewAt(p1, LEVEL_UP_TIMING.HEADLINE + 2 * LEVEL_UP_TIMING.ROW_STAGGER + 10);
    const r = v.rows[2];
    return r.state === 'flat' && r.deltaText === '——' && r.barShown === 7 && r.ghostShown === 7;
  })());
check('未到揭示时刻：pending 态 deltaText=null（渲染层整行不画）',
  (() => {
    const v = levelUpViewAt(p1, LEVEL_UP_TIMING.HEADLINE + 8 * LEVEL_UP_TIMING.ROW_STAGGER - 10);
    return v.rows[8].state === 'pending' && v.rows[8].deltaText === null;
  })());
check('时间轴走完：done 相、九行全 revealed 定格 barAfter、合计文案',
  (() => {
    const v = levelUpViewAt(p1, p1.end + 50);
    return v.phase === 'done' && v.timelineDone === true
      && v.rows.every(r => r.state === 'revealed')
      && v.rows[0].barShown === 24 && v.totalGainText === '合计 +4';
  })());
check('层间切换到 L2：layerIndex/levelFrom/levelTo 跟随第 2 层、其行重新从 pending 起步',
  (() => {
    const v = levelUpViewAt(p2, p2.layers[1].start + 5);
    return v.phase === 'layer' && v.layerIndex === 1
      && v.levelFrom === 2 && v.levelTo === 3 && v.rows[8].state === 'pending';
  })());
check('纯数字模式视图：行条 null（渲染层画占位线）但 +1 / "——" 语义不变',
  (() => {
    const pn = planLevelUp({ fromLevel: 2, gainsByLevel: [luG1] });
    const v = levelUpViewAt(pn, pn.end + 1);
    return v.rows.every(r => r.barShown === null && r.ghostShown === null)
      && v.rows[0].deltaText === '+1' && v.rows[2].deltaText === '——';
  })());

// —— 8.5 组件实例：虚拟时钟 / Promise / 输入锁 / finish 幂等 ——
let luClosed = 0;
const lum = new LevelUpModal(fakeCanvas, {
  unit: su, fromLevel: 1, toLevel: 2, gainsByLevel: [luG1], statsBefore: suSnap,
}, () => luClosed++);
check('组件初建：全屏盒 1280×720（任务#10 全屏改版）、计划就位、虚拟时钟 0 起步、时间轴未完吞一切输入',
  lum.box.w === 1280 && lum.box.h === 720
  && lum.plan.layers.length === 1 && lum._vm === 0 && lum._timelineEnded === false
  && lum.handleClick(1, 1) === true && lum.handleKeyDown({ key: 'Enter' }) === true);
check('布局几何：左侧数值面板卡 + 右侧 336 大立绘 + 中缝分隔线 + valueMax=GROWTH_BAR_MAX',
  (() => {
    const L = planLevelUpLayout(lum.box);
    return L.panel.w === 548 && L.panel.rowH === 30 && L.panel.barW === 236
      && L.stage.size === 336 && L.stage.cx === lum.box.x + 778
      && L.dividerX === lum.box.x + 597 && L.btn.w === 200
      && L.valueMax === GROWTH_BAR_MAX;
  })());
let luDone = 0;
const pLuDone = lum.whenDone().then(() => luDone++);
lum._advanceVirtual(LEVEL_UP_TIMING.HEADLINE + LEVEL_UP_TIMING.REVEAL + 20);
check('虚拟时钟推进中：whenDone 在途、层内视图生效（行0 已揭示完成、末行未到）',
  luDone === 0 && lum._pending.length === 1 && lum.view.phase === 'layer'
  && lum.view.rows[0].state === 'revealed' && lum.view.rows[8].state === 'pending');
lum._advanceVirtual(lum.plan.end + 100);
await pLuDone;
check('时间轴走完：whenDone resolve（once）+ 视图定 done 相',
  luDone === 1 && lum._pending.length === 0 && lum.view.timelineDone === true);
lum.finish();
lum.finish();
check('finish 幂等：唯一"确认"按钮 + 键盘焦点 + 空白点击交还外层',
  lum.buttons.length === 1 && lum.buttons[0].id === 'ok' && lum.selectable === true
  && lum.focusIndex === 0 && lum.handleClick(10, 10) === false);
check('finish 后 Enter 触发确认关闭（onClose one-shot）',
  lum.handleKeyDown({ key: 'Enter' }) === true && lum.finished === true && luClosed === 1);

// —— 8.6 growth 服务联动（升级链路端到端：快照 → 入账 roll+apply → payload → 时间轴）——
const zx = createPlayerUnit('zhangzixiao');
zx.exp = 99;
const zxBefore = snapshotGrowthStats(zx);
const zExpect = rollLevelUp(zx.classId, zx.personalGrowth, () => 0.5); // 镜像独立 roll
const zRes = gainExp(zx, 50, { rng: () => 0.5 });                     // 99+50 → 连跳 1 级剩 49
check('联动：gainExp 的 gainsByLevel 与独立 rollLevelUp 完全一致、payload 可直喂 planLevelUp',
  zRes.levelsGained === 1 && deepEq(zRes.gainsByLevel[0], zExpect)
  && (() => {
    const pLU = planLevelUp({ fromLevel: zRes.fromLevel, toLevel: zRes.toLevel,
      gainsByLevel: zRes.gainsByLevel, statsBefore: zxBefore });
    return pLU.layers.length === 1 && pLU.duration === LEVEL_UP_TIMING.HEADLINE + LEVEL_UP_LAYER_LEN
      && pLU.hasStats === true;
  })());
check('升级入库与快照对齐：apply 后面板 = 快照 + 独立 roll 镜像（当级 HP/MP 立即补到当前值）',
  zx.level === 2 && zx.stats.maxHp === zxBefore.hp + zExpect.hp
  && zx.currentHp === zxBefore.hp + zExpect.hp
  && zx.stats.maxMp === zxBefore.mp + zExpect.mp && zx.exp === 49);
const sn = createPlayerUnit('shiyunuo');
const snBefore = snapshotGrowthStats(sn);
const snRes = gainExp(sn, 250, { rng: () => 0.01 }); // 0.01 → 全键必涨：250 跨两个 100 连升 2 级
const snPlan = planLevelUp({ fromLevel: snRes.fromLevel, toLevel: snRes.toLevel,
  gainsByLevel: snRes.gainsByLevel, statsBefore: snBefore });
const snExpectTotal = snRes.gainsByLevel.reduce((a, g) => a + Object.values(g).reduce((x, y) => x + y, 0), 0);
check('连环升级端到端：250 经验 → 2 层 gains、视图两层数据齐、totalGain 与镜像累计一致',
  snRes.levelsGained === 2 && snRes.gainsByLevel.length === 2
  && snPlan.layers.length === 2 && snPlan.totalGain === snExpectTotal
  && levelUpViewAt(snPlan, snPlan.end + 1).layerCount === 2
  && levelUpViewAt(snPlan, snPlan.end + 1).totalGainText === `合计 +${snExpectTotal}`);

// —— 8.7 异常与边界防御 ——
check('null/坏形状防御：planLevelUp(null) 与 levelUpViewAt(null) 退化为空计划不抛',
  (() => {
    const pn = planLevelUp(null);
    const vn = levelUpViewAt(null, 100);
    const bad = levelUpViewAt({ layers: [{ rows: [] }] }, 10); // 层缺 start：跳过并入 done
    return pn.layers.length === 0 && vn.phase === 'idle' && bad.phase === 'done';
  })());
check('组件 null config：可构造可推进（"升级"占位名 + 空时间轴视为已完、render 一帧即出确认）',
  (() => {
    const luNull = new LevelUpModal(fakeCanvas, null, null);
    return luNull.name === '升级' && luNull.plan.layers.length === 0 && luNull._vm === 0
      && luNull.view.timelineDone === true && luNull.view.rows.length === 9;
  })());

/* ══════════ §9 stash 全队共享仓库（任务 #8：道具存取 + UI 清单） ══════════ */

// 9.1 建仓与页签常量：goods 四分类齐全是 inventory_panel 页签的地基
check('createStash 空仓：items 恒为数组；GOODS_KINDS 四页签（道具/武器/防具/重要）',
  (() => {
    const s = createStash();
    return Array.isArray(s.items) && s.items.length === 0
      && GOODS_KINDS.length === 4
      && GOODS_KINDS.map(k => k.kind).join('|') === 'consumable|weapon|armor|key_item'
      && GOODS_KINDS.every(k => typeof k.label === 'string' && k.label.length > 0);
  })());

// 9.2 countItem：跨摞累计 + 垃圾形态防御（不喂 NaN）
check('countItem：跨摞累计；非数组 0；非法 count 条目记 0 不传染',
  (() => {
    const inv = [
      { id: 'sausage', count: 5 },
      { id: 'sausage', count: 4 },
      { id: 'sausage', count: NaN },
      null,
      { id: 'sausage' }
    ];
    return countItem(inv, 'sausage') === 9
      && countItem(null, 'sausage') === 0
      && countItem('junk', 'sausage') === 0
      && countItem(inv, 'not_here') === 0;
  })());

// 9.3 deposit 成功路径：单位 → 仓库（数量贯通 + 双侧账目一致）
const stUnit = createPlayerUnit('zhangzixiao');   // 模板背包：paper_plane ×1 / white_rabbit_candy ×2
const stStash = createStash();
check('deposit 成功：1 件入仓，单位侧扣到位、仓库侧按摞可见（moved 校验）',
  (() => {
    const beforeCandy = countItem(stUnit.inventory, 'white_rabbit_candy');   // 期望 2
    const r = deposit(stUnit, stStash, 'white_rabbit_candy', 1);
    return r.ok === true && r.moved === 1
      && countItem(stUnit.inventory, 'white_rabbit_candy') === beforeCandy - 1
      && countItem(stStash.items, 'white_rabbit_candy') === 1;
  })());

// 9.4 原子性：库存不足 → 整体不动（失败不产生半个操作）
check('deposit 不足原子失败：请求 5 件仅有 2 → ok:false 双侧账目原样',
  (() => {
    const invSnap = JSON.stringify(stUnit.inventory);
    const stashSnap = JSON.stringify(stStash.items);
    const r = deposit(stUnit, stStash, 'white_rabbit_candy', 5);
    return r.ok === false && r.moved === 0
      && JSON.stringify(stUnit.inventory) === invSnap
      && JSON.stringify(stStash.items) === stashSnap;
  })());

// 9.5 非法 count / 坏容器：拒绝不抛
check('moveItems 非法入参：count 0 / -1 / NaN / 非字符串 id → 一律 fail',
  (() => {
    const a = moveItems([{ id: 'sausage', count: 9 }], [], 'sausage', 0);
    const b = moveItems([{ id: 'sausage', count: 9 }], [], 'sausage', -1);
    const c = moveItems([{ id: 'sausage', count: 9 }], [], 'sausage', NaN);
    const d = moveItems([{ id: 'sausage', count: 9 }], [], '', 1);
    return [a, b, c, d].every(r => r.ok === false && r.moved === 0);
  })());

// 9.6 跨摞扣减 + 空摞即时移除（不留 0 占位格）
check('moveItems 跨摞扣减：两摞 5+5 取 9 → 剩 1 件一摞、源数组长度收缩',
  (() => {
    const from = [{ id: 'sausage', count: 5 }, { id: 'sausage', count: 5 }];
    const to = [];
    const r = moveItems(from, to, 'sausage', 9);
    return r.ok === true && r.moved === 9
      && from.length === 1 && from[0].count === 1
      && to.length === 1 && to[0].id === 'sausage' && to[0].count === 9;
  })());

// 9.7 stack 口径贯通：grantItems 摞满即开新摞（sausage stack=9 语义镜像）
check('moveItems 合入侧按 goods.stack 补摞：9 件进 3/6 仓 → 9/9/2 断言口径复现',
  (() => {
    const from = [{ id: 'sausage', count: 20 }];
    const to = [{ id: 'sausage', count: 3 }, { id: 'sausage', count: 6 }];
    moveItems(from, to, 'sausage', 11);
    // 期望：3→9 补 6 件，6→9 补 3 件，剩 2 件开第三摞
    return to.length === 3 && to.map(s => s.count).join(',') === '9,9,2';
  })());

// 9.8 withdraw 方向对称：仓库 → 单位（存得进去也要取得出来）
check('withdraw 成功：仓库 1 → 单位 +1，双侧账目对上',
  (() => {
    const beforeStash = countItem(stStash.items, 'white_rabbit_candy');  // 期望 1
    const beforeUnit = countItem(stUnit.inventory, 'white_rabbit_candy'); // 期望 1
    const r = withdraw(stStash, stUnit, 'white_rabbit_candy', 1);
    return r.ok === true && r.moved === 1
      && beforeStash === 1 && beforeUnit === 1
      && countItem(stStash.items, 'white_rabbit_candy') === 0
      && countItem(stUnit.inventory, 'white_rabbit_candy') === 2;
  })());

// 9.9 容器缺位防御：V1 援军单位（无 inventory 字段）/ 仓库非对象 → fail 不抛
check('容器缺位防御：无背包单位 deposit fail、坏仓库 withdraw fail、不替调用方造容器',
  (() => {
    const rawUnit = { id: 'nobody', inventory: undefined };   // 援军 spawn 曾无 inventory
    const a = deposit(rawUnit, stStash, 'sausage', 1);
    const b = deposit(stUnit, null, 'sausage', 1);
    const c = withdraw(null, stUnit, 'sausage', 1);
    const d = withdraw(stStash, { id: 'nobody' }, 'sausage', 1);
    return [a, b, c, d].every(r => r.ok === false && r.moved === 0)
      && rawUnit.inventory === undefined;   // 未被偷偷补上数组
  })());

// 9.10 summarizeItems：合并同 id 摞 + 全字段快照（panel 背包页与仓库页共用口径）
check('summarizeItems：合并同 id 摞；category/use_in_battle 字段透传（sausage 可战斗用）',
  (() => {
    const inv = [{ id: 'sausage', count: 2 }, { id: 'sausage', count: 3 },
                 { id: 'white_rabbit_candy', count: 1 }];
    const list = summarizeItems(inv);
    const sausage = list.find(x => x.itemId === 'sausage');
    const candy = list.find(x => x.itemId === 'white_rabbit_candy');
    return list.length === 2
      && sausage.count === 5 && sausage.kind === 'consumable'
      && sausage.stack === 9
      && getGoodsById('sausage').use_in_battle === sausage.use_in_battle
      && candy.iconPath === 'assets/items/white_rabbit_candy.png'
      && summarizeItems(null).length === 0;
  })());

// 9.11 未注册 id 兜底：脏条目出面板快照而不是炸（与 loot 兜底同 philosophy）
check('summarizeItems 未注册 id：走[name=id]兜底 + kind=unknown 仍可渲染不抛',
  (() => {
    const warnSnap = console.warn;  // snapshotItem 的兜底走 warn，此处静默
    const warns = [];
    console.warn = (m) => warns.push(m);
    const list = summarizeItems([{ id: 'ghost_card', count: 2 }]);
    console.warn = warnSnap;
    const ghost = list[0];
    return ghost.itemId === 'ghost_card' && ghost.name === 'ghost_card'
      && ghost.kind === 'unknown' && ghost.desc.length > 0
      && warns.length === 1;
  })());

// 9.12 stashSummary 与 summarizeItems 同口径（仓库页签直接消费）
check('stashSummary = summarizeItems 的仓库别名：当前仓只剩 white_rabbit_candy 0 摞时清单为空',
  (() => {
    const viaAlias = stashSummary(stStash);
    const viaDirect = summarizeItems(stStash.items);
    return viaAlias.length === viaDirect.length
      && deepEq(viaAlias, viaDirect) === true
      && viaAlias.length === 0;   // 9.3 的 1 件已在 9.8 取走
  })());

/* ══════════ §10 unit_detail 人物详情弹层（任务 #8c） ══════════ */
section('10 unit_detail 人物详情弹层');

// 10.1 行序同源：与 level_up 九维行序引用级同一对象，改一处两弹层联动
check('DETAIL_STAT_ROWS 与 GROWTH_ROWS 同源镜像（九维 key/label 全序一致）',
  DETAIL_STAT_ROWS === GROWTH_ROWS
  && DETAIL_STAT_ROWS.length === 9
  && DETAIL_STAT_ROWS.every((r, i) => r.key === GROWTH_ROWS[i].key && r.label === GROWTH_ROWS[i].label));

// 10.2 我方快照：职业/装备/个人技三键查表镜像（期望值全部现场算，不硬编码名词）
const dLead = createPlayerUnit('zhangzixiao');
const dSnap = detailSnapshotFromUnit(dLead);
const dWpn = WEAPONS[UNITS.zhangzixiao.equippedWeapon];
check('detailSnapshotFromUnit 我方：三键查表镜像 + 满血满蓝出厂 + EXP 口径',
  dSnap.name === UNITS.zhangzixiao.name && dSnap.faction === 'player'
  && dSnap.className === CLASSES[UNITS.zhangzixiao.classId].name
  && dSnap.weaponLine === `${dWpn.name} · 威力 ${dWpn.might}`
  && dSnap.personalSkillName === SKILLS[UNITS.zhangzixiao.personalSkill].name
  && dSnap.expMax === EXP_PER_LEVEL
  && dSnap.hp.cur === dLead.stats.maxHp && dSnap.mp.cur === dLead.stats.maxMp
  && dSnap.mov === dLead.stats.mov);

// 10.3 敌方降级：createEnemyUnit 工厂不产 bio/personalSkill 键，快照自动降级不抛不糊
check('敌方快照降级：faction=enemy / 个人技 null / 简介空串 / 装备行按模板有无兜底',
  (() => {
    const e = createEnemyUnit('vendor', { instanceId: 'd_vendor' });
    const s = detailSnapshotFromUnit(e);
    const expectWeapon = ENEMIES.vendor.equippedWeapon
      ? WEAPONS[ENEMIES.vendor.equippedWeapon].name : '赤手空拳';
    return s.faction === 'enemy' && s.personalSkillName === null && s.personalSkillDesc === null
      && s.bio === '' && s.weaponName === expectWeapon && s.mov === e.stats.mov;
  })());

// 10.4 脏数据兜底：未知 classId / 无装备 / null 整包
check('脏数据兜底：未知职业→「未知职业」 / 无装备→「赤手空拳」 / null 单位→「？？？」可出快照',
  detailSnapshotFromUnit({ classId: 'no_such_class' }).className === '未知职业'
  && detailSnapshotFromUnit({}).weaponName === '赤手空拳'
  && detailSnapshotFromUnit(null).name === '？？？'
  && typeof detailSnapshotFromUnit(null).stats === 'object');

// 10.5 资源条三条：kind 序 hp/mp/exp + 出厂满血文本镜像
check('planResourceBars 三条 hp/mp/exp：HP 文本 x/x 出厂镜像、ratio 数值化',
  (() => {
    const bars = planResourceBars(dSnap);
    return bars.length === 3
      && bars.map((b) => b.kind).join(',') === 'hp,mp,exp'
      && bars[0].valueText === `${dLead.currentHp}/${dLead.stats.maxHp}`
      && bars.every((b) => typeof b.ratio === 'number' && b.ratio >= 0 && b.ratio <= 1
        && b.label === b.kind.toUpperCase());
  })());

// 10.6 满级 MAX：EXP 条钉死 ratio=1 / 文本 MAX（等级冻结名副其实）
check('满级单位（level ≥ LEVEL_CAP）EXP 条：ratio=1 + valueText=MAX（经验照入账）',
  (() => {
    const maxed = createPlayerUnit('zhangzixiao');
    maxed.level = LEVEL_CAP; maxed.exp = 42;
    const bars = planResourceBars(detailSnapshotFromUnit(maxed));
    return bars[2].ratio === 1 && bars[2].valueText === 'MAX';
  })());

// 10.7 九维行：与 snapshotGrowthStats 同映射（hp↔maxHp / mp↔maxMp / 余同名）
check('planDetailStatRows 九行：value/name 映射镜像 + ratio 以 GROWTH_BAR_MAX 为基准 + valueText 即数字',
  (() => {
    const rows = planDetailStatRows(dSnap);
    const expectVal = (k) => dLead.stats[k === 'hp' ? 'maxHp' : k === 'mp' ? 'maxMp' : k];
    return rows.length === 9
      && rows.every((r, i) => r.key === GROWTH_ROWS[i].key && r.label === GROWTH_ROWS[i].label
        && r.value === expectVal(r.key)
        && r.valueText === String(r.value)
        && r.ratio === barRatio(r.value, GROWTH_BAR_MAX));
  })());

// 10.8 clipLines：数量内原样 / 超限末行缩 1 字加… / 单字行保护 / 非数组零行
check('clipLines：未超不动 / 超限 clipping / 单字符保护换… / null 入参零行',
  (() => {
    const inner = clipLines(['一二三', '四五六'], 3);
    const over = clipLines(['一二三', '四五六七', '八'], 2);
    const single = clipLines(['一', '二'], 1);
    const bad = clipLines(null, 3);
    return inner.clipped === false && deepEq(inner.lines, ['一二三', '四五六']) === true
      && over.clipped === true && over.lines.length === 2 && over.lines[1] === '四五六…'
      && single.lines.length === 1 && single.lines[0] === '…'
      && bad.clipped === false && bad.lines.length === 0;
  })());

// 10.9 planDetailBio：measure=(s)=>s.length*15，每行 ⌊344/15⌋=22 字
check('planDetailBio：空 bio 空块 / 66 字折 3 行 height=63 / maxLines=2 超限截断',
  (() => {
    const m = (s) => s.length * 15;
    const emptyB = planDetailBio({ bio: '' }, m, 344, 5);
    const full = planDetailBio({ bio: '字'.repeat(66) }, m, 344, 5);
    const clippedB = planDetailBio({ bio: '字'.repeat(66) }, m, 344, 2);
    return emptyB.empty === true && emptyB.lines.length === 0 && emptyB.height === 0
      && full.empty === false && full.lines.length === 3 && full.height === 63 && full.clipped === false
      && clippedB.lines.length === 2 && clippedB.clipped === true
      && clippedB.lines[1].length === 22 && clippedB.lines[1].endsWith('…');
  })());

// 10.10 布局：760×500 盒内几何 + 整齐化契约 + valueMax 与 level_up 九维条同基准
check('planUnitDetailLayout：九行区/条宽/头像/简介区几何齐备 + 双列条右缘对齐/左右栏首行同高/身份行等距 + valueMax',
  (() => {
    const L = planUnitDetailLayout({ x: 100, y: 50, w: 760, h: 500 });
    const statBottom = L.statRows.y + L.statRows.count * L.statRows.rowH;
    return L.valueMax === GROWTH_BAR_MAX && L.statRows.count === 9
      && L.statBar.w === 120 && L.statBar.h === 8
      && L.bars.w === 160 && L.bars.step === 28
      && L.avatar.r === 42 && L.bio.w === 330 && L.bio.maxLines === 5
      // 整齐化契约：资源条与九维条条身右缘一列、九维数值锚点收在盒右内
      && L.bars.x + L.bars.w === L.statBar.x + L.statBar.w
      && L.statValueRight > L.statBar.x + L.statBar.w && L.dividerH.x1 >= L.statValueRight
      // 左栏首行（职业行）与九维首行中心同高；身份四行等距 24
      && L.statRows.y + L.statRows.rowH / 2 === L.classLineY
      && L.titleY - L.nameY === L.infoLine1Y - L.titleY
      && L.infoLine1Y - L.titleY === L.infoLine2Y - L.infoLine1Y
      // 分隔线：横线盖住主区跨度，纵线位于左右两栏之间且贯穿主区
      && L.dividerH.x0 <= L.bio.x && L.dividerH.x1 >= L.statValueRight
      && L.bio.x + L.bio.w < L.dividerV.x && L.dividerV.x < L.statBar.x
      && L.dividerV.y0 <= L.classLineY && L.dividerV.y1 >= statBottom;
  })());

// 10.11 组件实例（我方女主）：盒尺寸/快照/九行/三条/单按钮「关闭」全就位
let udClosed = 0;
const udm = new UnitDetailModal(fakeCanvas, { unit: createPlayerUnit('shiyunuo') }, () => udClosed++);
check('组件初建女主：盒 760×500、快照镜像 UNITS、九行三条、唯一按钮「关闭」',
  udm.box.w === 760 && udm.box.h === 500
  && udm.snapshot.name === UNITS.shiyunuo.name
  && udm.snapshot.className === CLASSES[UNITS.shiyunuo.classId].name
  && udm.statRows.length === 9 && udm.bars.length === 3
  && udm.buttons.length === 1 && udm.buttons[0].id === 'close' && udm.buttons[0].label === '关闭'
  && udm.selectable === true);

// 10.12 组件敌方与 null：两个极端 config 都可构造不抛（敌方简介降级 / null 全兜底）
check('组件敌方单位：无个人技/无简介走降级（bioBlock.empty），布局仍九行',
  (() => {
    const em = new UnitDetailModal(fakeCanvas,
      { unit: createEnemyUnit('vendor', { instanceId: 'v_d2' }) }, null);
    return em.snapshot.faction === 'enemy' && em.snapshot.personalSkillName === null
      && em.bioBlock.empty === true && em.statRows.length === 9 && em.bars.length === 3;
  })());
check('组件 null config：「？？？」+ 赤手空拳 + 赤字九行全 0，仍可安全关闭',
  (() => {
    let n = 0;
    const nm = new UnitDetailModal(fakeCanvas, null, () => n++);
    const okShape = nm.snapshot.name === '？？？' && nm.snapshot.weaponName === '赤手空拳'
      && nm.statRows.length === 9 && nm.statRows.every((r) => r.value === 0 && r.valueText === '0')
      && nm.bioBlock.empty === true;
    nm.handleKeyDown({ key: 'Enter' });   // selectable：聚焦唯一按钮，Enter 关闭
    return okShape && nm.finished === true && n === 1;
  })());

/* ══════════ §11 inventory_panel 人物道具/仓库面板（任务 #8d） ══════════ */
section('11 inventory_panel 道具与仓库');

// fixture：男主单位 + 自布置库存（覆写出厂包，断言零依赖配置库存）
// 覆盖四类 + 多摞合并 + key_item：烤肠×3 / 数学卷×2 / 出厂武器×1 / 书包 / 红领巾 / 臭袜子
const tradeUnit = createPlayerUnit('zhangzixiao');
tradeUnit.inventory = [];
const tradeWeaponId = UNITS.zhangzixiao.equippedWeapon;
grantItems(tradeUnit.inventory, [
  { itemId: 'sausage', count: 3, stack: 9 },
  { itemId: 'math_exam', count: 2, stack: 9 },
  { itemId: tradeWeaponId, count: 1, stack: WEAPONS[tradeWeaponId].stack },
  { itemId: 'school_bag', count: 1, stack: 1 },
  { itemId: 'red_scarf', count: 1, stack: 1 },
  { itemId: 'dirty_sock', count: 1, stack: 1 }
]);
const tradeStash = createStash();
const tradeEntries = summarizeItems(tradeUnit.inventory);

// 11.1 常量：双视图签 + 四分类签与 goods 表同源镜像
check('INVENTORY_VIEWS 背包/仓库双视图 + INV_DEFAULT_KIND=首个分类 + 四签序（道具/武器/防具/重要）',
  INVENTORY_VIEWS.length === 2
  && INVENTORY_VIEWS[0].view === 'unit' && INVENTORY_VIEWS[1].view === 'stash'
  && INV_DEFAULT_KIND === GOODS_KINDS[0].kind && INV_VISIBLE_ROWS === 5
  && GOODS_KINDS.map((k) => k.label).join(',') === '道具,武器,防具,重要'
  && GOODS_KINDS.length === 4);

// 11.2 纯函数：kind 过滤 + 插入序 + hint 三键查表镜像 + key_item disabled
check('planInventoryRows 按 kind 过滤保插入序：hint 镜像（回复/成长/威力/双防/剧情）+ 未知 kind 零行',
  (() => {
    const cons = planInventoryRows(tradeEntries, 'consumable');
    const wpns = planInventoryRows(tradeEntries, 'weapon');
    const arms = planInventoryRows(tradeEntries, 'armor');
    const keys = planInventoryRows(tradeEntries, 'key_item');
    const bag = getGoodsById('school_bag');
    return cons.map((r) => r.itemId).join(',') === 'sausage,math_exam'
      && cons[0].count === 3 && cons[0].countText === '×3' && cons[1].countText === '×2'
      && cons[0].hint === '回复' && cons[1].hint === '成长'
      && wpns.length === 1 && wpns[0].itemId === tradeWeaponId
      && wpns[0].hint === `威力 ${WEAPONS[tradeWeaponId].might}`
      && arms.map((r) => r.itemId).join(',') === 'school_bag,red_scarf'
      && arms[0].hint === `防 ${bag.def} 魔防 ${bag.res}`
      && keys.length === 1 && keys[0].disabled === true
      && planInventoryRows(tradeEntries, 'no_such_kind').length === 0
      && planInventoryRows(null, 'consumable').length === 0;
  })());

// 11.3 分类签：计数徽标 [2,1,2,1] + active 唯一 + 空清单全零
check('planKindTabs 四签计数徽标 2/1/2/1（按行数非件数）+ active 唯一 + 空清单全零',
  (() => {
    const tabs = planKindTabs(tradeEntries, 'armor');
    return tabs.map((t) => t.count).join(',') === '2,1,2,1'
      && tabs.filter((t) => t.active).length === 1 && tabs[2].active === true
      && planKindTabs([], 'consumable').every((t) => t.count === 0);
  })());

// 11.4 动作语义层：背包可存 / 仓库可取 / key_item 禁存 / 无行无动作
check('planTradeAction：unit 视图可存行 deposit / stash 视图 withdraw / key_item 禁存 null / 无行 null',
  (() => {
    const conRow = planInventoryRows(tradeEntries, 'consumable')[0];
    const keyRow = planInventoryRows(tradeEntries, 'key_item')[0];
    return planTradeAction('unit', conRow).id === 'deposit'
      && planTradeAction('stash', conRow).id === 'withdraw'
      && planTradeAction('unit', keyRow) === null
      && planTradeAction('unit', null) === null
      && planTradeAction('stash', null) === null
      && stashSummary(tradeStash).length === 0;
  })());

// 11.4b 动作组语义层（新交互）：武器/防具未装备[装备,存] · 装备中 null 锁定 ·
// 战场消耗品按 use_in_battle 给「使用」（growth 卷子战场仅可存）· key_item null · stash 恒[取出]
check('planItemActions：sausage[使用,存×1] / math_exam 战场仅[存×1] / 未装武器[装备,存] / 装备中武器·防具→null / key_item→null / stash→[取出×1]',
  (() => {
    const conRow = planInventoryRows(tradeEntries, 'consumable')[0];   // sausage（use_in_battle:true）
    const growRow = planInventoryRows(tradeEntries, 'consumable')[1];  // math_exam（growth，战场不可用）
    const wRow = planInventoryRows(tradeEntries, 'weapon')[0];
    const bagRow = planInventoryRows(tradeEntries, 'armor')[0];        // school_bag
    const keyRow = planInventoryRows(tradeEntries, 'key_item')[0];
    const bare = { equippedWeaponId: null, equippedArmorIds: [] };
    const eq = (arr, ids) => (arr || []).map((a) => a.id).join(',') === ids;
    return eq(planItemActions('unit', conRow, bare), 'use,deposit')
      && planItemActions('unit', growRow, bare).length === 1
      && planItemActions('unit', growRow, bare)[0].id === 'deposit'
      && eq(planItemActions('unit', wRow, bare), 'equip,deposit')
      && planItemActions('unit', wRow, bare)[0].label === '装备'
      && eq(planItemActions('unit', bagRow, bare), 'equip,deposit')
      && planItemActions('unit', wRow, { ...bare, equippedWeaponId: wRow.itemId }) === null
      && planItemActions('unit', bagRow, { ...bare, equippedArmorIds: ['school_bag'] }) === null
      && eq(planItemActions('unit', planInventoryRows(tradeEntries, 'armor')[1],
        { ...bare, equippedArmorIds: ['school_bag'] }), 'equip,deposit')   // 锁定只锁槽内那件，红领巾照常
      && planItemActions('unit', keyRow, bare) === null
      && planItemActions('unit', null, bare) === null
      && eq(planItemActions('stash', conRow, bare), 'withdraw')
      && planItemActions('stash', conRow, bare)[0].label === '取出 ×1'
      && planItemActions('stash', null, bare) === null;
  })());

// 11.5 描述块：null 行 empty / 标题=名·提示 / desc 按宽度折行 / 空 desc 零行不空块
check('planInvDesc：null 行 empty / 标题「烤肠 · 回复」/ 37 字 desc 落 1 行（680 宽 45 字兜底）',
  (() => {
    const m = (s) => s.length * 15;
    const row = planInventoryRows(tradeEntries, 'consumable')[0];
    const d = planInvDesc(row, m, 680, 2);
    const nullD = planInvDesc(null, m, 680, 2);
    return nullD.empty === true && nullD.lines.length === 0
      && d.empty === false && d.title.startsWith('烤肠 · 回复')
      && d.lines.length === 1 && d.clipped === false
      && planInvDesc({ name: 'x', hint: '', desc: '' }, m, 680, 2).lines.length === 0;
  })());

// 11.6 布局：760×500 盒内左右双列（背包/仓库）与描述区不重叠
// 任务 3 重排后：avatar.r 28→24、双列新增 headerH 26、列宽 344 + 间距 16
// 背包迭代后：可视行 7→5（压缩列表高度，杜绝 desc/帮助行/底部按钮层叠）
check('planInventoryLayout：双列 listLeft/listRight 5×26(w344·headerH26) + desc 2 行不与底部重叠',
  (() => {
    const L = planInventoryLayout({ x: 10, y: 20, w: 760, h: 500 });
    return L.listLeft.maxRows === INV_VISIBLE_ROWS
      && L.listRight.maxRows === INV_VISIBLE_ROWS
      && L.listLeft.w === 344 && L.listRight.w === 344
      && L.listRight.x - (L.listLeft.x + L.listLeft.w) === 16
      && L.kindTabs.y < L.listLeft.y
      && L.listLeft.y - L.listLeft.headerH >= L.kindTabs.y + L.kindTabs.h
      && L.listLeft.y + L.listLeft.maxRows * L.listLeft.rowH <= L.desc.y
      && L.desc.y + L.desc.maxLines * L.desc.lineH <= 20 + 500 - 76
      && L.avatar.r === 24 && L.desc.w === 680;
  })());

// 11.7 组件构造：默认背包视图 / 道具分类 / 首行选中 / 底部大按钮仅关闭 / 双视图计数
const ip = new InventoryPanelModal(fakeCanvas, { unit: tradeUnit, stash: tradeStash }, () => {});
check('组件初建：默认 unit 列 + consumable 分类 + 首行烤肠 + 底部大按钮仅关闭 + 双列行与计数准确',
  ip.box.w === 760 && ip.box.h === 500
  && ip.view === 'unit' && ip.kind === 'consumable' && ip.rowIndex === 0
  && ip.unitRows.length === 2 && ip.row.itemId === 'sausage'
  && ip.buttons.length === 1 && ip.buttons[0].id === 'close'
  && ip.viewCounts.unit === 6 && ip.viewCounts.stash === 0
  && ip.kindTabs.map((t) => t.count).join(',') === '2,1,2,1');

// 11.8 键盘两区导航（背包迭代）：取代旧 1~4 数字切分类
//   列表区：↓ 选行（末行不再循环）· 行0 ↑ 进页签区 · ←→ 背包↔仓库两列穿梭（不切分类）
//   页签区：←→ 循环切四分类 · ↓ 返回列表区 · 数字键全部废弃
check('键盘两区导航：↓ 末行不循环、行0 ↑ 进页签区、页签 ←→ 循环切分类、↓ 返回列表、列表 ←→ 背包↔仓库、数字键废弃',
  (() => {
    ip.handleKeyDown({ key: 'ArrowDown' });      // rowIndex 0→1（数学卷子）
    const downOk = ip.rowIndex === 1 && ip.row.itemId === 'math_exam' && ip.row.hint === '成长';
    ip.handleKeyDown({ key: 'ArrowDown' });      // 已在末行：不再循环
    const noWrapOk = ip.rowIndex === 1;
    ip.handleKeyDown({ key: 'ArrowUp' });        // 回行 0（烤肠）
    const upOk = ip.rowIndex === 0 && ip.row.itemId === 'sausage';
    ip.handleKeyDown({ key: 'ArrowUp' });        // 行 0 再 ↑：焦点进分类页签区
    const enterTabsOk = ip.focusArea === 'tabs';
    ip.handleKeyDown({ key: 'ArrowRight' });     // 页签区 →：道具→武器
    ip.handleKeyDown({ key: 'ArrowRight' });     // →：武器→防具
    const tabsCycleOk = ip.kind === 'armor' && ip.unitRows.length === 2;
    ip.handleKeyDown({ key: '2' });              // 数字键已废弃：任何状态都不再切分类
    const numberDeadOk = ip.kind === 'armor';
    ip.handleKeyDown({ key: 'ArrowDown' });      // 页签区 ↓：返回列表区
    const backListOk = ip.focusArea === 'list';
    ip.handleKeyDown({ key: 'ArrowRight' });     // 列表区 →：切到仓库列
    const rightOk = ip.view === 'stash' && ip.row === null; // stash 无该分类道具
    ip.handleKeyDown({ key: 'ArrowLeft' });      // 列表区 ←：切回背包列
    const leftOk = ip.view === 'unit' && ip.rowIndex === 0
      && ip.row.itemId === 'school_bag';         // 分类已随页签区切到 armor：恢复行 0
    return downOk && noWrapOk && upOk && enterTabsOk && tabsCycleOk
      && numberDeadOk && backListOk && rightOk && leftOk;
  })());

// 11.9 动作菜单交互：Enter 呼出操作浮层 → 上下选动作 → Enter 装备/存仓/取出，带反馈
check('动作菜单交互：Enter 呼出操作菜单 → 装备书包 → 再按 Enter 呼出菜单选「存入仓库」→ 切到仓库 Enter「移入背包」取回',
  (() => {
    ip.handleKeyDown({ key: 'Enter' });          // 呼出菜单 (首项为「装备」)
    const menuOpen1 = ip.activeMenu !== null && ip.activeMenu.actions[0].id === 'equip';
    ip.handleKeyDown({ key: 'Enter' });          // 执行装备
    const equipped = JSON.stringify(tradeUnit.equippedArmors) === '["school_bag"]';

    ip.handleKeyDown({ key: 'ArrowDown' });      // 选红领巾
    ip.handleKeyDown({ key: 'Enter' });          // 呼出红领巾菜单
    ip.handleKeyDown({ key: 'Enter' });          // 装备红领巾，顶替书包
    const reEquipped = JSON.stringify(tradeUnit.equippedArmors) === '["red_scarf"]';

    ip.handleKeyDown({ key: 'ArrowUp' });        // 回书包行
    ip.handleKeyDown({ key: 'Enter' });          // 呼出书包菜单（有 装备、存入仓库、丢弃）
    ip.handleKeyDown({ key: 'ArrowDown' });      // 移动到「存入仓库」
    const menuDeposit = ip.activeMenu.actions[ip.activeMenu.index].id === 'deposit';
    ip.handleKeyDown({ key: 'Enter' });          // 执行存入
    const saved = countItem(tradeUnit.inventory, 'school_bag') === 0
      && countItem(tradeStash.items, 'school_bag') === 1;

    ip.handleKeyDown({ key: 'ArrowRight' });     // 切换到 stash 列
    const inStash = ip.view === 'stash' && ip.row.itemId === 'school_bag';
    ip.handleKeyDown({ key: 'Enter' });          // 呼出仓库道具菜单（首项为「移入背包」）
    ip.handleKeyDown({ key: 'Enter' });          // 执行取出
    const backOk = countItem(tradeUnit.inventory, 'school_bag') === 1
      && countItem(tradeStash.items, 'school_bag') === 0;

    return menuOpen1 && equipped && reEquipped && menuDeposit && saved && inStash && backOk;
  })());

// 11.10 key_item 禁存入仓与丢弃：选中重要物品呼出菜单无存入与丢弃
check('key_item 禁存禁丢：重要分类下的 dirty_sock 菜单不含 deposit 与 drop 动作',
  (() => {
    ip.handleKeyDown({ key: 'ArrowLeft' });      // 回 unit 列（仍 armor 分类，行 0）
    ip.handleKeyDown({ key: 'ArrowUp' });        // 行 0 ↑：进分类页签区
    ip.handleKeyDown({ key: 'ArrowRight' });     // 页签区 →：防具→重要
    ip.handleKeyDown({ key: 'ArrowDown' });      // 页签区 ↓：返回列表区
    const guard = ip.view === 'unit' && ip.unitRows.length === 1 && ip.unitRows[0].itemId === 'dirty_sock';
    ip.handleKeyDown({ key: 'Enter' });          // 呼出菜单
    const acts = ip.activeMenu ? ip.activeMenu.actions.map((a) => a.id) : [];
    const noDepositOrDrop = !acts.includes('deposit') && !acts.includes('drop');
    ip.handleKeyDown({ key: 'Escape' });         // 关闭菜单
    return guard && noDepositOrDrop && ip.activeMenu === null;
  })());

// 11.11 空背包：零行 + Enter 不误呼出菜单 + Escape 关闭回调一次
check('空背包组件：行 0 + Enter 不误开菜单 + Escape 关闭且回调恰好一次',
  (() => {
    const fresh = createPlayerUnit('shiyunuo');
    fresh.inventory = [];
    let n = 0;
    const fm = new InventoryPanelModal(fakeCanvas, { unit: fresh, stash: createStash() }, () => n++);
    const shape = fm.rows.length === 0 && fm.row === null && fm.descBlock.empty === true;
    fm.handleKeyDown({ key: 'Enter' });
    const noMenu = fm.activeMenu === null;
    fm.handleKeyDown({ key: 'Escape' });
    return shape && noMenu && fm.finished === true && n === 1;
  })());

// 11.12 极端 config null：「？？？］持有者 + 内部空仓库 + 方向键也能安全切 + 关闭回调一次
check('null config：unit 空背包 / 内置空仓库可切视图浏览（counts 双 0）+ Escape 安全关闭',
  (() => {
    let n = 0;
    const nm = new InventoryPanelModal(fakeCanvas, null, () => n++);
    const shape = nm.rows.length === 0 && nm.viewCounts.unit === 0 && nm.viewCounts.stash === 0;
    nm.handleKeyDown({ key: 'ArrowRight' });
    const switchSafe = nm.view === 'stash' && nm.rows.length === 0;
    nm.handleKeyDown({ key: 'Escape' });
    return shape && switchSafe && nm.finished === true && n === 1;
  })());

/* ══════════ §12 action_menu 行动菜单 + tutorial_panel 教学面板 ══════════ */
section('12 action_menu + tutorial_panel');

// 12.1 常量：宽 136 / 行高 42（用户「字儿和元素都大点」基调的量化锚点）
check('12.1 行动菜单常量：ACTION_MENU_W=136 / ACTION_MENU_ITEM_H=42',
  ACTION_MENU_W === 136 && ACTION_MENU_ITEM_H === 42);

// 12.2 四项恒定结构：默认态（射程内无敌 / 背包空）攻击+道具灰显，详情+待机恒可用
check('12.2 planActionMenuItems 默认态：四项恒定 detail→attack→item→wait，仅详情/待机启用',
  (() => {
    const d = planActionMenuItems();
    const order = d.map(i => i.id).join(',') === 'detail,attack,item,wait';
    const labels = d.map(i => i.label).join(',') === '详情,攻击,道具,待机';
    const marks = d.map(i => i.enabled).join(',') === 'true,false,false,true';
    return order && labels && marks;
  })());

// 12.3 满状态：射程内有敌 + 有道具 → 四项全启用
check('12.3 planActionMenuItems 满状态：enemiesInRange>0 + hasItems → 攻击/道具亮起',
  planActionMenuItems({ enemiesInRange: 2, hasItems: true }).every(i => i.enabled === true));

// 12.4 planNextEnabledIndex 数学：双向循环跳灰 + wrap + 全灰 -1 + 空数组 -1
check('12.4 planNextEnabledIndex：跳灰循环（0→2→0 wrap）· 反向 wrap · 全灰 -1 · 空 -1',
  (() => {
    const items = [
      { enabled: true }, { enabled: false },
      { enabled: true }, { enabled: false }
    ];
    const fwd = planNextEnabledIndex(items, 0, 1) === 2
      && planNextEnabledIndex(items, 2, 1) === 0;      // 正向 wrap
    const back = planNextEnabledIndex(items, 0, -1) === 2; // 反向 wrap（0 → 2）
    const first = planNextEnabledIndex(items, -1, 1) === 0; // 构造期找首个启用项
    const none = planNextEnabledIndex(items.map(i => ({ enabled: false })), 2, 1) === -1;
    const empty = planNextEnabledIndex([], 0, 1) === -1;
    return fwd && back && first && none && empty;
  })());

// 12.5 planActionMenuBox 避让三态：右侧可放 / 右满翻左 / 垂直 clamp 进画布 + 高度公式
check('12.5 planActionMenuBox：贴右优先·右满翻左·近底 clamp 上移·h=count×行高+2pad',
  (() => {
    const ok = planActionMenuBox({ x: 400, y: 300, w: 48, h: 48 }, 1280, 720, 4);
    const right = ok.x === 400 + 48 + 8 && ok.h === 4 * 42 + 7 * 2;
    const flip = planActionMenuBox({ x: 1200, y: 300, w: 48, h: 48 }, 1280, 720, 4);
    const toLeft = flip.x === 1200 - 8 - 136;
    const low = planActionMenuBox({ x: 400, y: 650, w: 48, h: 48 }, 1280, 720, 4);
    const clamped = low.y === 720 - 6 - 182;
    return right && toLeft && clamped;
  })());

// 12.6 ActionMenu 构造：落位矩形 + 初始焦点跳到首个启用项（灰首项时落到第 2 行）
check('12.6 ActionMenu 构造：四项落位 / 初始焦点 = 首个启用项（首项灰则跳下一项）',
  (() => {
    const m = new ActionMenu({
      items: planActionMenuItems(),
      anchorRect: { x: 400, y: 300, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720
    });
    const shape = m.items.length === 4 && m.rect.w === 136 && m.selectedIndex === 0;
    const m2 = new ActionMenu({
      items: [{ id: 'a', label: '灰', enabled: false }, { id: 'b', label: '亮', enabled: true }],
      anchorRect: { x: 0, y: 0, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720
    });
    return shape && m2.selectedIndex === 1;
  })());

// 12.7 键盘导航：↓/↑ 在四项默认态（攻击道具灰）间跳灰往返 0↔3
check('12.7 键盘导航：ArrowDown 0→wait(3) 跳过攻击/道具 · ArrowUp 3→detail(0) 回跳',
  (() => {
    const m = new ActionMenu({
      items: planActionMenuItems(),
      anchorRect: { x: 400, y: 300, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720
    });
    m.handleKeyDown({ key: 'ArrowDown' });
    const down = m.selectedIndex === 3;
    m.handleKeyDown({ key: 'ArrowUp' });
    return down && m.selectedIndex === 0;
  })());

// 12.8 确认灰项：cancel 音不回调，菜单保持打开（选中态可继续移动）
check('12.8 Enter 灰项不触发：回调 0 次、菜单开着、焦点还能继续移动',
  (() => {
    const calls = [];
    const m = new ActionMenu({
      items: planActionMenuItems(),
      anchorRect: { x: 400, y: 300, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720,
      onSelect: (id) => calls.push(id)
    });
    m.selectedIndex = 1;                 // 攻击（灰）
    const noFire = m.confirm() === false && calls.length === 0;
    m.handleKeyDown({ key: 'ArrowDown' });
    return noFire && m.selectedIndex === 3 && calls.length === 0;
  })());

// 12.9 确认启用项 + 取消回调：onSelect('wait') 一次 · onCancel 恰好一次
check('12.9 Enter 亮项触发 onSelect(id) · cancel() 触发 onCancel 各恰好一次',
  (() => {
    const calls = [];
    const m = new ActionMenu({
      items: planActionMenuItems(),
      anchorRect: { x: 400, y: 300, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720,
      onSelect: (id) => calls.push('sel:' + id),
      onCancel: () => calls.push('cancel')
    });
    m.selectedIndex = 3;                 // 待机（亮）
    const fire = m.confirm() === true && calls[0] === 'sel:wait';
    m.cancel();
    return fire && calls.join(',') === 'sel:wait,cancel';
  })());

// 12.10 鼠标：盒外 false 由外层解释为取消 · 盒内灰行吃掉不触发
check('12.10 鼠标：盒外点击返回 false · 灰行点击 true 但零回调（聚焦提示不误触发）',
  (() => {
    const calls = [];
    const m = new ActionMenu({
      items: planActionMenuItems(),
      anchorRect: { x: 400, y: 300, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720,
      onSelect: (id) => calls.push(id)
    });
    const outside = m.handleClick(0, 0) === false;
    // 落位矩形：x=456 y=233 行区 [240, 408)，第 2 行(攻击,灰)中线 y≈261
    const greyRow = m.handleClick(456 + 68, 240 + 42 + 21) === true;
    return outside && greyRow && m.selectedIndex === 1 && calls.length === 0;
  })());

// 12.11 鼠标：点击启用行直接触发 · hover 联动移动焦点
check('12.11 鼠标：点启用行(待机)即触发 · hover 另一启用行联动换焦点',
  (() => {
    const calls = [];
    const m = new ActionMenu({
      items: planActionMenuItems(),
      anchorRect: { x: 400, y: 300, w: 48, h: 48 },
      canvasW: 1280, canvasH: 720,
      onSelect: (id) => calls.push(id)
    });
    // 第 4 行(待机,亮)中线 y≈240+3×42+21
    m.handleClick(456 + 68, 240 + 3 * 42 + 21);
    const clickFire = calls.join(',') === 'wait' && m.selectedIndex === 3;
    m.handleMouseMove(456 + 68, 240 + 21);                     // hover 首行(详情,亮)
    return clickFire && m.selectedIndex === 0;
  })());

// 12.12 normalizeTutorialSteps 归一：null 兜底单步 · 残条过滤 · hint 补空 · 数字标题字符串化
check('12.12 normalizeTutorialSteps：null→兜底一条 · 残条/null 过滤 · hint 补空 · 标题字符串化',
  (() => {
    const bad = normalizeTutorialSteps(null);
    const fallback = bad.length === 1 && bad[0].title === '开始行动' && bad[0].hint === '';
    const messy = normalizeTutorialSteps({ steps: [
      { title: 'A', body: 'a' },
      null,
      { body: '只有正文' },
      { title: 123 }
    ] });
    return fallback && messy.length === 3
      && messy[1].title === '操作引导' && messy[1].hint === ''
      && messy[2].title === '123';
  })());

// 12.13 planTutorialButtons 三态 + 单步特例
check('12.13 planTutorialButtons：单步[行动] · 首步[next] · 中间[prev,next] · 末步[prev,行动]',
  (() => {
    const ids = (arr) => arr.map(b => b.id).join(',');
    return ids(planTutorialButtons(0, 1)) === 'finish'
      && ids(planTutorialButtons(0, 3)) === 'next'
      && ids(planTutorialButtons(1, 3)) === 'prev,next'
      && ids(planTutorialButtons(2, 3)) === 'prev,finish';
  })());

// 12.14 TutorialPanelModal 组件：三步构造 + 首步 Enter 翻页 + 末步按钮组 + Escape 关闭回调一次
check('12.14 教学面板：三步构造 · Enter(next) 0→1 · trigger 到末步出现[上一步,开始行动] · Escape 关一次',
  (() => {
    let n = 0;
    const tp = new TutorialPanelModal(fakeCanvas, { steps: [
      { title: '选中我方人员', body: '第一步正文', hint: 'h1' },
      { title: '走近敌人', body: '第二步正文', hint: 'h2' },
      { title: '行动菜单', body: '第三步正文', hint: 'h3' }
    ] }, () => n++);
    const init = tp.steps.length === 3 && tp.stepIndex === 0
      && tp.buttons.map(b => b.id).join(',') === 'next';
    tp.handleKeyDown({ key: 'Enter' });           // 首步焦点在 next → 翻到第 2 步
    const s1 = tp.stepIndex === 1
      && tp.buttons.map(b => b.id).join(',') === 'prev,next';
    tp.trigger('next');                            // 直翻末步（焦点行为归 ModalBase §6 已测）
    const s2 = tp.stepIndex === 2
      && tp.buttons.map(b => b.id).join(',') === 'prev,finish';
    tp.handleKeyDown({ key: 'Escape' });
    return init && s1 && s2 && tp.finished === true && n === 1;
  })());

// 12.15 ch0_battle1.tutorial 配置镜像：≥3 步 · 每步三字段齐全 · 文案无主角名硬编码（男女主线共用这张图）
check('12.15 ch0_battle1.tutorial：三步引导配置 · title/body/hint 全非空 · 无主角名硬编码（双线通用）',
  (() => {
    const tut = CH0_BATTLE1.tutorial;
    const cfgOk = !!(tut && Array.isArray(tut.steps) && tut.steps.length >= 3);
    const steps = normalizeTutorialSteps(tut);
    const everyFilled = steps.every(s => s.title && s.body && s.title.length > 0 && s.body.length > 0);
    const genderNeutral = steps.every(s =>
      !s.title.includes('张子骁') && !s.body.includes('张子骁')
      && !s.title.includes('石予诺') && !s.body.includes('石予诺'));
    const hintGiven = steps.filter(s => s.hint.length > 0).length >= 2;
    return cfgOk && steps.length === tut.steps.length && everyFilled && genderNeutral && hintGiven;
  })());

/* ══════════ §13 持久化组：存档往返字段保真（M1/T7 · 文档 §9.1）══════════ */
section('13 持久化：存档往返字段保真');
const mem13 = makeMem();
const sm13 = createSaveManager(mem13);
const rt13 = createNewGame({ route: 'male' });
// 模拟一段真实进度：入队 → 战场成长（升级/换武器/残血/捡道具）commit →
// 锚点推进 → 旗标 + 通关登记 + 游玩时长 → 仓库存取，然后整档落盘再读回
joinParty(rt13, 'qinruiyi');
const u13 = getPartyUnit(rt13, 'zhangzixiao');
applyLevelUp(u13, { hp: 1 });
u13.equippedWeapon = 'basketball';
u13.currentHp = 2;
grantItems(u13.inventory, [{ itemId: 'sausage', count: 5, stack: 9 }]);
commitRuntimeUnit(rt13, u13);
deposit(rt13.roster.zhangzixiao, rt13.stash, 'sausage', 3);
setFlag(rt13, 'met_chen', true);
markChapterCleared(rt13, 'ch0_battle1');
advanceTo(rt13, { sceneId: 'scene_after_vendor', chapterId: 'ch0_battle2' });
tickPlaytime(rt13, 321.8);
const snap13 = {};
for (const id13 of Object.keys(rt13.roster)) snap13[id13] = serializeUnit(rt13.roster[id13]);

const realNow13 = Date.now;
let clock13 = 5000;
Date.now = () => clock13;
try {
  const sv13 = sm13.saveToSlot(2, rt13);
  check('13.1 落盘：ok + savedAt 走可控时钟 + meta 摘要（队伍2人/锚点/通关1章）',
    sv13.ok === true && sv13.savedAt === 5000 && sv13.meta.partySize === 2
    && sv13.meta.sceneId === 'scene_after_vendor' && sv13.meta.clearedCount === 1);
  check('13.2 落盘不突变原 state（rt13.savedAt 仍 0）', rt13.savedAt === 0);

  const ld13 = sm13.loadSlot(2);
  check('13.3 读档还原档头：schema/线路/主角/场景/章节/时长/savedAt',
    ld13.schema === 3 && ld13.route === 'male' && ld13.leadUnitId === 'zhangzixiao'
    && ld13.sceneId === 'scene_after_vendor' && ld13.chapterId === 'ch0_battle2'
    && ld13.playtimeSec === 321 && ld13.savedAt === 5000);
  check('13.4 读档还原旗标与通关章（深比较无丢失）',
    deepEq(ld13.flags, { met_chen: true }) && deepEq(ld13.clearedChapters, ['ch0_battle1']));
  check('13.5 读档还原全队档案：白名单字段逐项镜像（升级+1/换武器/残血全带回）',
    Object.keys(snap13).length === 2
    && Object.keys(snap13).every((id) => deepEq(serializeUnit(ld13.roster[id]), snap13[id]))
    && ld13.roster.zhangzixiao.level === UNITS.zhangzixiao.level + 1
    && ld13.roster.zhangzixiao.equippedWeapon === 'basketball'
    && ld13.roster.zhangzixiao.currentHp === 2);
  check('13.6 读档还原背包与仓库：主角包 2 烤肠 + 全队仓 3 烤肠（deposit 的量）',
    countItem(ld13.roster.zhangzixiao.inventory, 'sausage') === 2
    && countItem(ld13.stash.items, 'sausage') === 3
    && ld13.stash.items !== rt13.stash.items);
  ld13.roster.zhangzixiao.level = 99;    // 故意改坏读出来的档
  ld13.stash.items.length = 0;
  check('13.7 读档返回独立副本：改坏不回写（再读完好）',
    sm13.loadSlot(2).roster.zhangzixiao.level === UNITS.zhangzixiao.level + 1
    && countItem(sm13.loadSlot(2).stash.items, 'sausage') === 3);
  clock13 = 6000;
  advanceTo(rt13, { sceneId: 'scene_corridor' });
  sm13.saveToSlot(3, rt13);                          // 槽3 = 中途快照
  clock13 = 7000;
  advanceTo(rt13, { sceneId: 'scene_before_home' });
  sm13.saveToSlot(2, rt13);                          // 槽2 覆盖 = 最新
  const l2a13 = sm13.loadSlot(2), l3a13 = sm13.loadSlot(3);
  check('13.8 同槽覆盖后写顶前写；跨槽互不串；mostRecent=最新槽2',
    l2a13.sceneId === 'scene_before_home' && l2a13.savedAt === 7000
    && l3a13.sceneId === 'scene_corridor' && l3a13.savedAt === 6000
    && sm13.mostRecentSave().slot === 2);
} finally {
  Date.now = realNow13;
}
check('13.9 Date.now 已恢复原实现', Date.now === realNow13);

/* ══════════ §14 存档界面组：SaveMenuModal 双模式（M1/T5+T7）══════════ */
section('14 存档界面：SaveMenuModal 双模式');
const mem14 = makeMem();
const sm14 = createSaveManager(mem14);
const saved14 = [], loaded14 = [];
let holder14 = null;      // save 模式注入的「当前进度」
let closed14 = 0;
const smSave = new SaveMenuModal(fakeCanvas, {
  mode: 'save', saveManager: sm14,
  getState: () => holder14,
  onSaved: (slot) => saved14.push(slot),
  onClosed: () => {}
});
const smLoad = new SaveMenuModal(fakeCanvas, {
  mode: 'load', saveManager: sm14,
  onLoaded: (state, slot) => loaded14.push([state, slot]),
  onClosed: () => { closed14++; }
});

// 14.1 双模式槽位形状
check('14.1 双模式：save=[1,2,3] 不含 auto；load=[auto,1,2,3]；初始全空全反射',
  deepEq(smSave.slotList, [1, 2, 3]) && smSave.slotList.includes('auto') === false
  && deepEq(smLoad.slotList, ['auto', 1, 2, 3])
  && smSave.slotInfos.length === 3 && smLoad.slotInfos.length === 4
  && smSave.slotInfos.every((s) => s.exists === false) && smLoad.slotInfos.every((s) => s.exists === false));

// 14.2 save 模式无进度：提示不落盘不回调
smSave.activateRow(0);
check('14.2 无进度拒绝存档：提示 + 不写槽1 + onSaved 零回调',
  smSave.statusText === '当前没有可存档的进度' && sm14.loadSlot(1) === null && saved14.length === 0);

// 14.3 save 模式正常存入槽2：写盘 + 行刷新 + onSaved 恰一次 + auto 不被手动写
holder14 = createNewGame({ route: 'female' });
tickPlaytime(holder14, 777);
smSave.activateRow(1);
check('14.3 存入槽2：提示【存档二】+ 槽位刷新带 meta + onSaved(2) 恰一次 + auto 槽未动',
  smSave.statusText === '已存入【存档二】' && smSave.slotInfos[1].exists === true
  && smSave.slotInfos[1].meta.leadName === UNITS.shiyunuo.name
  && smSave.slotInfos[1].meta.playtimeSec === 777
  && saved14.join(',') === '2' && sm14.loadSlot('auto') === null);
smLoad.refreshSlots();   // 外部写入后 UI 需主动刷新快照（组件不监听存储层）

// 14.4 load 模式空槽
smLoad.activateRow(3);
check('14.4 空槽读取拒绝：提示 + onLoaded 零回调',
  smLoad.statusText === '该槽位没有存档' && loaded14.length === 0);

// 14.5 load 模式正常读档：回调带深拷贝状态 + 槽号；one-shot 只消费一次
smLoad.activateRow(2);   // 槽2
const ld14 = loaded14[0] && loaded14[0][0];
check('14.5 读档回调：onLoaded(状态, 槽=2) + 回调入参是深拷贝（改它不回写槽位）',
  loaded14.length === 1 && loaded14[0][1] === 2
  && ld14.route === 'female' && ld14.leadUnitId === 'shiyunuo' && ld14.playtimeSec === 777
  && (() => { ld14.playtimeSec = 99999; ld14.roster.shiyunuo.level = 99;
    return sm14.loadSlot(2).playtimeSec === 777 && sm14.loadSlot(2).roster.shiyunuo.level === UNITS.shiyunuo.level; })());
smLoad.activateRow(2);
check('14.5b onLoaded one-shot：二次读取不再回调（防 main.js 双触发 resume）', loaded14.length === 1);

// 14.6 load 模式损坏档：先造有效档让快照 exists=true，再把存储层写坏 → 点击时解析失败走降级分支
sm14.saveToSlot(1, holder14);
smLoad.refreshSlots();
mem14._m.set('fx_save_v2_slot_1', '{corrupt-json');
silenced(() => smLoad.activateRow(1));   // 槽1：快照说有档 → loadSlot JSON 解析失败
check('14.6 损坏存档：『读取失败』提示 + 仍零回调',
  smLoad.statusText === '读取失败：存档数据损坏' && loaded14.length === 1);
sm14.deleteSlot(1);   // 清掉坏档，后续 refreshSlots/listSlots 不再触发解析报错

// 14.7 删除（Node 无 window.confirm 守门 → 直接真删；浏览器里才有二次确认）
smLoad.deleteRow(3);
check('14.7a 空槽删除：仅提示不动作', smLoad.statusText === '该槽位没有存档' && smLoad.slotInfos[2].exists === true);
smLoad.deleteRow(2);
check('14.7b 删档：槽2 清空 + 行刷新 + 不抛',
  smLoad.slotInfos[2].exists === false && smLoad.statusText === '已删除【存档二】' && sm14.loadSlot(2) === null);

// 14.8 键盘导航 + 未识别键 + Esc one-shot
smLoad.focusIndex = 0;
const kd14 = smLoad.handleKeyDown({ key: 'ArrowUp' });
smLoad.handleKeyDown({ key: 'ArrowDown' });
smLoad.handleKeyDown({ key: 'w' });
check('14.8a ↑/↓/W 循环导航（0 →↑ 3 →↓ 0 →w 3）+ 返回 true 消费按键',
  kd14 === true && smLoad.focusIndex === 3);
check('14.8b 未识别键返回 false（透传给外层输入链）', smLoad.handleKeyDown({ key: 'x' }) === false);
smLoad.handleKeyDown({ key: 'Escape' });
const escOnce14 = closed14 === 1;
smLoad.close();
check('14.8c Esc 触发 onClosed 恰一次（重复 close 零回调，回调置 null）',
  escOnce14 && closed14 === 1 && smLoad.onClosed === null);

// 14.9 鼠标联动（rowRects/buttonRects 由 render() 每帧写入，此处镜像命中区）
smLoad.onClosed = () => { closed14++; };     // 重新武装（one-shot 语义上面已验证）
smLoad.rowRects = [0, 1, 2, 3].map((i) => ({ x: 300, y: 100 + i * 74, w: 640, h: 64 }));
smLoad.buttonRects = { close: { x: 900, y: 500, w: 108, h: 36 } };
smLoad.focusIndex = 0;
smLoad.handleMouseMove(400, 100 + 2 * 74 + 30);
const hover14 = smLoad.focusIndex === 2;
smLoad.statusText = '';
const blank14 = smLoad.handleClick(10, 10) === true && smLoad.focusIndex === 2 && smLoad.statusText === '';
smLoad.handleClick(950, 518);                // 关闭按钮
smLoad.close();
check('14.9a 鼠标：行 hover 联动换焦点 · 空白点击吞事件不穿透 · 关闭按钮触发 close（仍 one-shot）',
  hover14 && blank14 && closed14 === 2);
smLoad.focusIndex = 3;
const rowClick14 = smLoad.handleClick(400, 130) === true
  && smLoad.focusIndex === 0 && smLoad.statusText === '该槽位没有存档';
check('14.9b 鼠标：点击行先聚焦再执行主操作（空槽提示；onLoaded 已消费不再回调）', rowClick14);

// 14.10 导入/导出边界：auto 槽拒手动导入 · Node 静默 · 外部写入反射
smLoad.focusIndex = 0;
smLoad.importToRow(0);
const autoImport14 = smLoad.statusText === '自动存档槽由系统写入，请选择手动槽导入';
let importNoThrow14 = true;
try { smLoad.importToRow(2); } catch (e) { importNoThrow14 = false; }   // Node 无 window.prompt → 静默
sm14.autosave(holder14);                       // 模拟外部（A1 胜利）写入 auto 槽
smLoad.refreshSlots();
let exportNoThrow14 = true;
try { smLoad.exportRow(0); } catch (e) { exportNoThrow14 = false; }    // 有档导出：浏览器走下载，Node 降级不抛
check('14.10 导入导出边界：auto 槽拒手动导入 · 手动槽导入 Node 静默不炸 · 有档导出非浏览器降级不抛',
  autoImport14 && importNoThrow14 && exportNoThrow14);
check('14.10b 外部写入反射：refreshSlots 后 auto 槽 exists + meta 与 saveManager 同源',
  smLoad.slotInfos[0].exists === true && smLoad.slotInfos[0].meta.leadName === UNITS.shiyunuo.name);

// 14.11 anchorText：注入优先，默认兜底（章节/场景/新档）
check('14.11 anchorText 兜底：战斗·id / 剧情·id / 空 meta → 空',
  smLoad.anchorText({ chapterId: 'ch0_battle1' }) === '战斗 · ch0_battle1'
  && smLoad.anchorText({ sceneId: 'scene_corridor' }) === '剧情 · scene_corridor'
  && smLoad.anchorText(null) === '');
smSave.describeAnchor = (meta) => '锚点：' + (meta.sceneId || meta.chapterId || '?');
check('14.11b 注入 describeAnchor 优先（main.js 用章节名定制行内文案）',
  smSave.anchorText({ sceneId: 's1' }) === '锚点：s1' && smSave.anchorText({}) === '锚点：?');

/* ══════════ §15 战败不回退组：D1 零提交锚点语义（M1/T6）══════════ */
section('15 战败不回退：零提交 + 锚点重建');
const g15 = createNewGame({ route: 'male' });
const born15 = JSON.stringify(getPartyUnit(g15, 'zhangzixiao'));
const mirror15 = g15.roster.zhangzixiao;
const lv15 = mirror15.level, w15x = mirror15.equippedWeapon, hp15 = mirror15.currentHp;
const inv15 = JSON.stringify(mirror15.inventory);

// 战场副本干一票大的：升级 + 换武器 + 残血 + 移动 + 倒地 + 战场上捡道具
const f15 = getPartyUnit(g15, 'zhangzixiao');
applyLevelUp(f15, { hp: 1 });
f15.equippedWeapon = 'basketball';
f15.currentHp = 1; f15.x = 42; f15.isAlive = false;
grantItems(f15.inventory, [{ itemId: 'sausage', count: 2, stack: 9 }]);

// D1：战败/中途退出 = 什么都不 commit —— roster 从未被战场污染
check('15.1 战败零提交：等级/武器/血量/背包全部原样（战场暴走不渗档）',
  mirror15.level === lv15 && mirror15.level === UNITS.zhangzixiao.level
  && mirror15.equippedWeapon === w15x && mirror15.currentHp === hp15
  && JSON.stringify(mirror15.inventory) === inv15);
check('15.2 锚点重开（=main.js resumeFromGameState）：getPartyUnit 拿回出厂单位（含战位复位）',
  (() => { const a15 = getPartyUnit(g15, 'zhangzixiao');
    return JSON.stringify(a15) === born15 && a15.x === 0 && a15.isAlive === true; })());

// 对照组：胜利路径 commitRuntimeUnit 才落档，战场字段剥除、重复提交幂等
const c15 = commitRuntimeUnit(g15, f15);
const c15b = commitRuntimeUnit(g15, f15);
check('15.3 胜利写回：升级+1/换武器/残血/捡的道具入包 + 战场字段剥离 + 重复提交幂等',
  c15.level === lv15 + 1 && c15.equippedWeapon === 'basketball' && c15.currentHp === 1
  && countItem(c15.inventory, 'sausage') === 2
  && ['x', 'isAlive'].every((k) => c15[k] === undefined)
  && deepEq(c15b, c15));

// D3：战场仓库与档案仓库引用共享（main.js 集成方式：bs.stash = gameState.stash）
const g15b = createNewGame({ route: 'female' });
const bs15 = { stash: g15b.stash };
const carrier15 = getPartyUnit(g15b, 'shiyunuo');
grantItems(carrier15.inventory, [{ itemId: 'sausage', count: 5, stack: 9 }]);
deposit(carrier15, bs15.stash, 'sausage', 3);
check('15.4 仓库引用共享：战斗里存仓实时反映到 gameState.stash（半场仓不丢）',
  countItem(g15b.stash.items, 'sausage') === 3 && countItem(carrier15.inventory, 'sausage') === 2);

// 端到端：锚点重建与 main.js 的 CHAPTERS 查表同构（敌部署/胜利条件/接续剧情）
const CHAPTERS_15 = { ch0_battle1: CH0_BATTLE1, ch0_battle2: CH0_BATTLE2 };
advanceTo(g15b, { chapterId: 'ch0_battle1' });
const ch15 = CHAPTERS_15[g15b.chapterId];
check('15.5 锚点重建端到端：chapterId 查得到章节配置（敌部署/胜利条件/接续剧情），回本章开头重打成立',
  !!ch15 && ch15.id === 'ch0_battle1' && Array.isArray(ch15.enemyDeploy) && ch15.enemyDeploy.length >= 1
  && !!ch15.objective && ch15.nextStorySceneOnWin === 'scene_after_vendor');

// A3×D1 对偶：开战存过档 → 战败零落盘 → auto 槽仍逐字节是开战锚点
const mem15 = makeMem();
const sm15 = createSaveManager(mem15);
sm15.autosave(g15b);                       // A3：开战锚点
const snap15 = JSON.stringify(sm15.loadSlot('auto'));
const w15b = getPartyUnit(g15b, 'shiyunuo');
applyLevelUp(w15b, { hp: 1 }); w15b.currentHp = 1;   // 战场里升级残血
// ……战败：main.js 直接 resumeFromGameState —— 零 commit 零新增落盘……
check('15.6 战败不落盘：auto 槽仍是 A3 开战锚点（等级为工厂出厂值），读档 = 回本章开头',
  JSON.stringify(sm15.loadSlot('auto')) === snap15
  && sm15.loadSlot('auto').roster.shiyunuo.level === UNITS.shiyunuo.level);
// 对照：胜利路径 commit + autosave（A1）才把等级写进存档
commitRuntimeUnit(g15b, w15b);
sm15.autosave(g15b);
check('15.7 胜利对照：commit 后 autosave 等级落盘（A1），与 15.6 形成镜像',
  sm15.loadSlot('auto').roster.shiyunuo.level === UNITS.shiyunuo.level + 1
  && JSON.stringify(sm15.loadSlot('auto')) !== snap15);

/* ══════════ 汇总 ══════════ */
console.log('\n══════════════════════════════════');
console.log('selftest_foundation：' + passed + ' PASS / ' + failed.length + ' FAIL');
if (failed.length > 0) {
  console.log('失败清单：');
  for (const f of failed) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log('== ALL PASS ==');
process.exit(0);
