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
