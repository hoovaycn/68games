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
import { getGoodsById } from '../src/data/goods/index.js';

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
check('新档锚点：schema/线路/主角/场景/章节', st.schema === STATE_SCHEMA && STATE_SCHEMA === 2 && st.route === 'female'
  && st.leadUnitId === 'shiyunuo' && st.sceneId === 'scene_classroom' && st.chapterId === null && st.playtimeSec === 0);
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
