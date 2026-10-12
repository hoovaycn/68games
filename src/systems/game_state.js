/**
 * 游戏进度模型（V2 服务层）
 *
 * 一局游戏（gameState）= 纯可 JSON 序列化的普通对象，是存档的唯一载体：
 * {
 *   schema: 3,
 *   route: 'male' | 'female',        // 线路：男主线(张子骁) / 女主线(石予诺)
 *   leadUnitId: 'zhangzixiao',       // 线路主角（对应 main.js selectedRoute）
 *   sceneId: 'scene_classroom',      // 当前剧情节点（读档恢复点）
 *   chapterId: null | 'ch0_battle2', // 正在进行 / 下一场战斗
 *   flags: {},                       // 剧情旗标（自由键值，供剧本分支判定）
 *   clearedChapters: [],             // 已通关章节 id 列表
 *   roster: { [unitId]: {...} },     // 队伍全员档案（成长状态全持久化）
 *   stash: { items: [] },            // 全队共享仓库（schema 3 起；跨战斗保持）
 *   playtimeSec: 0,                  // 累计游玩秒数
 *   savedAt: 0                       // 写档时间戳（save_manager 负责）
 * }
 *
 * roster 存「序列化档案」而不是运行时对象：战场专属字段（坐标/朝向/动画）
 * 不进存档；开战时用 getPartyUnit 血水合(hydrate)出运行时单位，
 * 战斗结束后由调用方显式 commitRuntimeUnit 写回——战场状态与存档之间
 * 只有一处同步点，不会互相踩。
 *
 * 纯函数约定：不碰 DOM / localStorage（那是 save_manager 的事），不 import UI。
 */

import { createPlayerUnit } from './growth.js';
import { createStash } from './stash.js';

export const STATE_SCHEMA = 3;

const deepCopy = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));

/** roster 档案白名单：战场字段（x/y/facing/isAlive/hasActed/anim*）不进存档 */
const ROSTER_FIELDS = [
  'unitId', 'name', 'title', 'bio', 'classId',
  'themeColor', 'portrait', 'walkSprite', 'quotes',
  'level', 'exp', 'personalGrowth', 'personalSkill',
  'equippedWeapon', 'equippedArmor',
  'inventory', 'stats', 'currentHp', 'currentMp'
];

/** 运行时单位 → 存档档案（白名单挑选 + 深拷贝，防引用串底） */
export function serializeUnit(unit) {
  const blob = {};
  for (const k of ROSTER_FIELDS) {
    if (unit[k] !== undefined) blob[k] = deepCopy(unit[k]);
  }
  if (!blob.unitId) blob.unitId = unit.id;   // 兜底：老运行时单位只有 id
  return blob;
}

/** 存档档案 → 运行时单位（补回战场默认值，直接可 deploy） */
export function hydrateUnit(blob) {
  return {
    ...deepCopy(blob),
    id: blob.unitId,
    faction: 'player',
    x: 0, y: 0, facing: 'right',
    isAlive: true, hasActed: false,
    animOffsetX: 0, animOffsetY: 0, isFlashing: false
  };
}

/** 新开一档。partyUnitIds 缺省 = 只带线路主角，后续 joinParty 逐个入队 */
export function createNewGame({ route = 'male', partyUnitIds = null } = {}) {
  const leadUnitId = route === 'female' ? 'shiyunuo' : 'zhangzixiao';
  const ids = partyUnitIds || [leadUnitId];
  const roster = {};
  for (const id of ids) {
    const u = createPlayerUnit(id);
    if (u) roster[id] = serializeUnit(u);
  }
  return {
    schema: STATE_SCHEMA,
    route,
    leadUnitId,
    sceneId: 'scene_classroom',
    chapterId: null,
    flags: {},
    clearedChapters: [],
    roster,
    stash: createStash(),
    playtimeSec: 0,
    savedAt: 0
  };
}

/** 剧情入队：从 UNITS 工厂造人 → 序列化入 roster。已在队则无操作 */
export function joinParty(state, unitId) {
  const UNIT_ALIASES = {
    teacher_xu: 'xu_laoshi',
    adult_liu: 'liu_laoshi'
  };
  const resolvedId = UNIT_ALIASES[unitId] || unitId;

  if (state.roster[resolvedId]) return state.roster[resolvedId];
  const u = createPlayerUnit(resolvedId);
  if (!u) {
    console.warn('[game_state] 入队失败，UNITS 里没有: ' + unitId);
    return null;
  }
  state.roster[resolvedId] = serializeUnit(u);
  return state.roster[resolvedId];
}

export function isInParty(state, unitId) {
  return !!state.roster[unitId];
}

/**
 * 取一名队友的运行时副本（开战 deploy 用）。
 * 每次返回全新拷贝：战场上的 mutation 不会污染 state.roster，
 * 战斗结束由调用方显式 commitRuntimeUnit 写回。
 */
export function getPartyUnit(state, unitId) {
  const blob = state.roster[unitId];
  return blob ? hydrateUnit(blob) : null;
}

/** 战斗结束写回：把我方运行时单位（含经验/等级/背包）同步进存档 */
export function commitRuntimeUnit(state, unit) {
  const id = unit.unitId || unit.id;
  state.roster[id] = serializeUnit(unit);
  return state.roster[id];
}

/* ── 剧情旗标 ── */
export function setFlag(state, key, value = true) {
  state.flags[key] = value;
  return state;
}
export function getFlag(state, key, defaultValue = false) {
  return key in state.flags ? state.flags[key] : defaultValue;
}

/** 通关登记（幂等），返回是否首次通关 */
export function markChapterCleared(state, chapterId) {
  if (state.clearedChapters.includes(chapterId)) return false;
  state.clearedChapters.push(chapterId);
  return true;
}

/** 推进存档锚点：传哪个更新哪个（sceneId=剧情节点 / chapterId=战斗，显式传 null 可清空对应锚点） */
export function advanceTo(state, { sceneId, chapterId } = {}) {
  if (sceneId !== undefined) state.sceneId = sceneId;
  if (chapterId !== undefined) state.chapterId = chapterId;
  return state;
}

export function tickPlaytime(state, seconds) {
  const s = Number(seconds);
  if (isFinite(s) && s > 0) state.playtimeSec += Math.floor(s);
  return state;
}

/** 存档槽位列表的展示摘要（save_manager.listSlots 用，避免其反查数据表） */
export function summarizeState(state) {
  const lead = state.roster?.[state.leadUnitId];
  const leadInfo = lead || Object.values(state.roster || {})[0] || null;
  return {
    route: state.route,
    leadName: leadInfo?.name || state.leadUnitId,
    leadLevel: leadInfo?.level || 1,
    partySize: Object.keys(state.roster || {}).length,
    sceneId: state.sceneId || null,
    chapterId: state.chapterId || null,
    clearedCount: (state.clearedChapters || []).length,
    playtimeSec: state.playtimeSec || 0,
    savedAt: state.savedAt || 0
  };
}
