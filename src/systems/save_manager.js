/**
 * 存档管理器（V2 服务层）—— localStorage 3+1 槽
 *
 * 槽位设计（用户拍板）：
 *   1 / 2 / 3      手动存档槽  —— 玩家在存档界面主动写
 *   'auto'         自动存档槽  —— 每关自动保存（通关结算/章节切换时调 autosave）
 *   主页「继续游戏」= 所有槽位里 savedAt 最新的一档（含自动档）
 *
 * 存储介质抽象：默认浏览器 localStorage；Node 自测/未来换 IndexedDB、
 * 文件时注入 storageLike（只要实现 getItem/setItem/removeItem）。
 * 没有可用存储时退化成内存 Map（isPersistent=false），只保证不崩，
 * 刷新即丢——启动时会 console.warn 提醒。
 *
 * 版本策略：key 带 v2 前缀（fx_save_v2_slot_x），旧实验存档天然隔离；
 * blob 里另有 schema 字段，loadSlot 时校验 + migrate() 兼容未来升级。
 *
 * JSON 导出/导入：玩家可以导出某个槽为 .json 备份文件、或粘贴回来导入
 * —— importSaveText 只做解析+校验，不直接落槽；写哪个槽由 UI/玩家决定。
 */

import { STATE_SCHEMA, summarizeState } from './game_state.js';
import { createStash } from './stash.js';

export const MANUAL_SLOTS = [1, 2, 3];
export const ALL_SLOTS = ['auto', 1, 2, 3];
export const SLOT_LABELS = { auto: '自动存档', 1: '存档一', 2: '存档二', 3: '存档三' };

const KEY_PREFIX = 'fx_save_v2_slot_';

const storageKeyFor = (slot) => KEY_PREFIX + slot;

function resolveStorage(storageLike) {
  if (storageLike) return { storage: storageLike, isPersistent: true };
  if (typeof localStorage !== 'undefined') return { storage: localStorage, isPersistent: true };
  console.warn('[save_manager] 无可用持久存储，退化为内存存储（刷新即丢）');
  const mem = new Map();
  return {
    storage: {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => { mem.set(k, String(v)); },
      removeItem: (k) => { mem.delete(k); }
    },
    isPersistent: false
  };
}

/** blob 合法性：够不够一档（宽进严出，具体字段合法性归 game_state/registry 管） */
function isSaveableBlob(obj) {
  return !!(obj && typeof obj === 'object'
    && typeof obj.schema === 'number'
    && obj.roster && typeof obj.roster === 'object'
    && typeof obj.sceneId === 'string');
}

/** schema 升级迁移：2 → 3 补空仓；更高版本只告警不拒读（宽进） */
function migrate(blob) {
  if (blob.schema > STATE_SCHEMA) {
    console.warn('[save_manager] 存档 schema=' + blob.schema + ' 来自更新版本，可能有兼容风险');
  }
  if (blob.schema < 3) {
    // schema 3 起 gameState 带 stash；旧档没有仓库 → 补个空仓
    if (!blob.stash || !Array.isArray(blob.stash.items)) {
      blob.stash = createStash();
    }
    blob.schema = 3;
  }
  return blob;
}

/**
 * @param {Storage} [storageLike] 可注入存储（Node 自测用内存版）
 * @returns 管理器实例（所有槽位操作的方法集）
 */
export function createSaveManager(storageLike = null) {
  const { storage, isPersistent } = resolveStorage(storageLike);

  /** 写档。返回 { ok, savedAt } 或 { ok:false, error }（配额满/序列化失败） */
  function saveToSlot(slot, gameState) {
    if (!ALL_SLOTS.includes(slot)) {
      return { ok: false, error: '非法槽位: ' + slot };
    }
    if (!isSaveableBlob(gameState)) {
      return { ok: false, error: '非法存档数据（缺 schema/roster/sceneId）' };
    }
    const blob = { ...gameState, savedAt: Date.now() };
    try {
      storage.setItem(storageKeyFor(slot), JSON.stringify(blob));
      return { ok: true, savedAt: blob.savedAt, meta: summarizeState(blob) };
    } catch (e) {
      console.error('[save_manager] 写槽失败: ' + slot, e);
      return { ok: false, error: String(e && e.name || e) };
    }
  }

  const autosave = (gameState) => saveToSlot('auto', gameState);

  /** 读档。槽空/数据损坏（try-catch JSON）返回 null，不抛异常 */
  function loadSlot(slot) {
    if (!ALL_SLOTS.includes(slot)) return null;
    let raw = null;
    try { raw = storage.getItem(storageKeyFor(slot)); } catch (e) { return null; }
    if (!raw) return null;
    try {
      const blob = JSON.parse(raw);
      return isSaveableBlob(blob) ? migrate(blob) : null;
    } catch (e) {
      console.error('[save_manager] 槽 ' + slot + ' JSON 解析失败，视为空档');
      return null;
    }
  }

  function deleteSlot(slot) {
    if (!ALL_SLOTS.includes(slot)) return false;
    try { storage.removeItem(storageKeyFor(slot)); return true; }
    catch (e) { return false; }
  }

  /** 槽位总览（存档界面用）：固定 [auto,1,2,3] 顺序，空档 exists=false */
  function listSlots() {
    return ALL_SLOTS.map((slot) => {
      const state = loadSlot(slot);
      return {
        slot,
        label: SLOT_LABELS[slot],
        exists: !!state,
        meta: state ? summarizeState(state) : null
      };
    });
  }

  /** 主页「继续游戏」：所有槽（含自动档）里最新的一档 */
  function mostRecentSave() {
    let best = null;
    for (const slot of ALL_SLOTS) {
      const state = loadSlot(slot);
      if (state && (!best || (state.savedAt || 0) > (best.state.savedAt || 0))) {
        best = { slot, state };
      }
    }
    return best;
  }

  /** 有没有任何档（决定主页「继续游戏」按钮是否可点） */
  function hasAnySave() {
    return ALL_SLOTS.some((s) => loadSlot(s) !== null);
  }

  /** 导出某槽为可读 JSON 文本（玩家下载 .json 备份） */
  function exportSlot(slot) {
    const state = loadSlot(slot);
    return state ? JSON.stringify(state, null, 2) : null;
  }

  /** 导入校验：只解析+校验+迁移，不落槽（写哪个槽由调用方决定） */
  function importSaveText(text) {
    if (typeof text !== 'string' || text.trim() === '') {
      return { ok: false, error: '空内容' };
    }
    try {
      const blob = JSON.parse(text);
      if (!isSaveableBlob(blob)) return { ok: false, error: '不是有效的存档数据' };
      return { ok: true, state: migrate(blob) };
    } catch (e) {
      return { ok: false, error: 'JSON 解析失败' };
    }
  }

  /** 清空全部槽位（调试/自测用） */
  function clearAll() {
    for (const slot of ALL_SLOTS) deleteSlot(slot);
  }

  return {
    isPersistent,
    saveToSlot,
    autosave,
    loadSlot,
    deleteSlot,
    listSlots,
    mostRecentSave,
    hasAnySave,
    exportSlot,
    importSaveText,
    clearAll
  };
}
