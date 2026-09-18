/**
 * 成长服务（V2 服务层）
 *
 * 三块职责：
 *  1. 经验曲线 —— 用户拍板：击杀 30+(敌等-我等)×10 下限 10；参与 12；升级恒 100
 *  2. 升级 roll —— FE 式随机成长：每项按 (职业 growth + 个人 personalGrowth)% 概率 +1
 *  3. 数值工厂 —— UNITS/ENEMIES 表条目 → 运行时单位（shapes 与 main.js 现有 spawn
 *     同名字段超集：新增 stats.maxMp/currentMp/personalGrowth 等字段对现有代码零侵入，
 *     stats.maxHp/currentHp/str/.../mov 全部保持原名，联调轮可直接替换两处 spawn）
 *
 * 纯函数约定：本模块不 import 任何 UI，不碰 DOM；rng 可注入（默认 Math.random），
 * 自测脚本用固定 rng 验证 roll 边界（0% 永不涨 / 100% 必涨）。
 */

import { UNITS } from '../data/units.js';
import { ENEMIES } from '../data/enemies.js';
import { CLASSES } from '../data/classes.js';

/* ══════════ 经验曲线常量 ══════════ */
export const EXP_PER_LEVEL = 100;   // 升级恒定（用户拍板，不做曲线）
export const LEVEL_CAP = 20;        // 满级冻结：经验照常入账，等级不再涨
export const EXP_KILL_BASE = 30;
export const EXP_KILL_PER_LEVEL = 10;
export const EXP_KILL_FLOOR = 10;
export const EXP_ACTION = 12;       // 参与奖（未击杀：出手命中/被反击 survives）

/** 击杀经验：与敌等级挂钩，下限 10 */
export function expForKill(killerLevel, victimLevel) {
  return Math.max(EXP_KILL_FLOOR, EXP_KILL_BASE + (victimLevel - killerLevel) * EXP_KILL_PER_LEVEL);
}

/** 参与经验（出手未击杀的保底） */
export function expForAction() {
  return EXP_ACTION;
}

/** 距下一级还差多少（UI 进度条用） */
export function expToNext(unit) {
  return Math.max(0, EXP_PER_LEVEL - (unit.exp ?? 0));
}

/* ══════════ 升级 roll ══════════ */
const GROWTH_KEYS = ['hp', 'mp', 'str', 'mag', 'skl', 'spd', 'luk', 'def', 'res'];

/**
 * 单次升级的全部增益：每项独立 roll，概率 = (职业 growth + 个人 personalGrowth)%。
 * 超过 100% 等效必涨（简单 roll 模型不做 FE 的"+2 余数"花活，registry 会提醒设计意图）。
 * 返回全九键对象（值为 0 或 1），调用方无需判空。
 */
export function rollLevelUp(classId, personalGrowth = {}, rng = Math.random) {
  const cls = CLASSES[classId];
  const gains = {};
  for (const key of GROWTH_KEYS) {
    const pct = (cls?.growth?.[key] ?? 0) + (personalGrowth?.[key] ?? 0);
    gains[key] = rng() * 100 < pct ? 1 : 0;
  }
  return gains;
}

/**
 * 把一次升级增益写进运行时单位（FE 惯例：当级涨的 HP/MP 立刻补到当前值上）。
 * mov 不参与成长。
 */
export function applyLevelUp(unit, gains = {}) {
  const gk = (k) => gains[k] ?? 0;   // 手写/部分 gains 缺键按 0 处理，不产生 NaN
  unit.level += 1;
  unit.stats.maxHp += gk('hp');
  unit.currentHp += gk('hp');        // 升级当回合即时生效
  unit.stats.maxMp += gk('mp');
  unit.currentMp += gk('mp');
  for (const key of ['str', 'mag', 'skl', 'spd', 'luk', 'def', 'res']) {
    unit.stats[key] += gk(key);
  }
  return unit;
}

/**
 * 经验入账 + 自动连锁升级（可能连跳多级）。
 * @returns {{levelsGained:number, fromLevel:number, toLevel:number, gainsByLevel:Array}}
 *          gainsByLevel 每元素为一层的 gains，联调轮直接喂给升级画面渲染。
 */
export function gainExp(unit, amount, { rng = Math.random } = {}) {
  const fromLevel = unit.level;
  const gainsByLevel = [];
  if (!isFinite(amount) || amount <= 0) {
    return { levelsGained: 0, fromLevel, toLevel: unit.level, gainsByLevel };
  }
  unit.exp = (unit.exp ?? 0) + amount;
  while (unit.level < LEVEL_CAP && unit.exp >= EXP_PER_LEVEL) {
    unit.exp -= EXP_PER_LEVEL;
    const gains = rollLevelUp(unit.classId, unit.personalGrowth || {}, rng);
    applyLevelUp(unit, gains);
    gainsByLevel.push(gains);
  }
  return { levelsGained: unit.level - fromLevel, fromLevel, toLevel: unit.level, gainsByLevel };
}

/* ══════════ 数值工厂 ══════════ */
/**
 * 职业基础面板（十维）。单独导出给自测与特殊 spawn（剧情 NPC）用。
 */
export function computeBaseStats(classId) {
  const cls = CLASSES[classId];
  if (!cls) return null;
  const b = cls.base;
  return {
    maxHp: b.hp,
    maxMp: b.mp,
    str: b.str,
    mag: b.mag,
    skl: b.skl,
    spd: b.spd,
    luk: b.luk,
    def: b.def,
    res: b.res,
    mov: b.mov
  };
}

/** 深拷贝（与 main.js L245 同技法，零依赖） */
const deepCopy = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));

/**
 * 我方运行时单位。id 保持档案 id（= 存档 roster 键）；
 * personalGrowth/personalSkill 随单位走，存档序列化天然带上，gainExp 直接可读。
 */
export function createPlayerUnit(unitId, { x = 0, y = 0, facing = 'right', expOverride = null, hpOverride = null } = {}) {
  const tpl = UNITS[unitId];
  if (!tpl) return null;
  const stats = computeBaseStats(tpl.classId);

  // ★ 主角光环：我方单位在入队创建时，全基础属性获得额外加强，以抵消“敌众我寡”的劣势
  stats.maxHp += 5;
  stats.maxMp += 5;
  stats.str += 1;
  stats.mag += 1;
  stats.skl += 1;
  stats.spd += 1;
  stats.luk += 2;
  stats.def += 1;
  stats.res += 1;
  
  return {
    // —— 来源档案 ——
    id: unitId,
    unitId,
    name: tpl.name,
    title: tpl.title || '',
    bio: tpl.bio || '',
    classId: tpl.classId,
    themeColor: tpl.themeColor,
    portrait: tpl.portrait,
    walkSprite: tpl.walkSprite,
    quotes: tpl.quotes ? { ...tpl.quotes } : null,

    // —— 成长状态（存档核心） ——
    level: tpl.level,
    exp: expOverride ?? (tpl.exp || 0),
    personalGrowth: { ...(tpl.personalGrowth || {}) },
    personalSkill: tpl.personalSkill ?? null,

    // —— 装备与背包 ——
    equippedWeapon: tpl.equippedWeapon,
    inventory: deepCopy(tpl.inventory || []),

    // —— 战场位形 ——
    faction: 'player',
    x,
    y,
    facing,

    // —— 战斗面板（stats 子对象与 main.js 现有 spawn 同名同构） ——
    stats,
    currentHp: hpOverride ?? stats.maxHp,
    currentMp: stats.maxMp,

    // —— 运行时标志（与 main.js 现有字段一致） ——
    isAlive: true,
    hasActed: false,
    animOffsetX: 0,
    animOffsetY: 0,
    isFlashing: false
  };
}

/**
 * 敌方运行时单位。id = 战场实例 id（instanceId，同一场战斗内唯一）；
 * enemyId 指回 ENEMIES 模板（drops 已拷贝，结算时 splice 不会污染模板表）。
 */
export function createEnemyUnit(enemyId, { instanceId, x = 0, y = 0, facing = 'left', levelOverride = null } = {}) {
  const tpl = ENEMIES[enemyId];
  if (!tpl) return null;
  const stats = computeBaseStats(tpl.classId);
  const level = levelOverride ?? tpl.level;
  return {
    id: instanceId,
    enemyId,
    name: tpl.name,
    title: tpl.title || '',
    classId: tpl.classId,
    themeColor: tpl.themeColor,
    portrait: tpl.portrait,
    walkSprite: tpl.walkSprite,
    quotes: tpl.quotes ? { ...tpl.quotes } : null,

    level,
    exp: 0,
    equippedWeapon: tpl.equippedWeapon,

    ai: { ...tpl.ai },
    drops: deepCopy(tpl.drops || []),

    faction: 'enemy',
    x,
    y,
    facing,

    stats,
    currentHp: stats.maxHp,
    currentMp: stats.maxMp,

    isAlive: true,
    hasActed: false,
    animOffsetX: 0,
    animOffsetY: 0,
    isFlashing: false
  };
}
