/**
 * inventory_panel —— 人物道具面板（任务 #8d，任务清单 #5「人物道具UI」+ #9 仓库概念）
 *
 * 用途：行动菜单「道具」入口 / 战场查看携带物。
 * 双视图：unit 背包（私人持有） ↔ stash 仓库（全队共享中转站 · deposit/withdraw 双向流转）；
 * 四分类页签：GOODS_KINDS（道具/武器/防具/重要）——顺序与 goods 表约定同源；
 * key_item（剧情道具）禁存入仓库：重要物件锁死在持有者身上，面板按钮对其置灰。
 *
 * 键盘模型（两区导航，符合玩家直觉，取代旧 1-4/Q/E 数字切页）：
 *   列表区 —— ↑↓ 选行（第一行再按 ↑ 上移进分类页签区）·
 *              ←→ 在背包/仓库两列间穿梭（此时不切分类）；
 *   页签区 —— ←→ 循环切换四分类 · ↓ 返回道具列表区 ·
 *              ↑ 已在顶行（无内容）/ Enter 无操作。
 *   Enter 打开操作子菜单 · Escape 关闭；鼠标点分类页签 = 直接切换。
 *   动作组随选中行动态变化：武器/防具→[装备,存入] · 消耗品→[使用,存入] ·
 *   使用中武器/防具→锁定（无动作） · key_item→锁定 · 仓库行→[取出]。
 * 鼠标：点分类签/行/底部按钮等效。
 *
 * 分层原则（与 ui_kit / unit_detail 一致）：
 *   INVENTORY_VIEWS / planInventoryRows / planKindTabs / planTradeAction /
 *   planItemActions / planInvDesc / planInventoryLayout —— 纯计算，Node 可单测；
 *   InventoryPanelModal.render* —— 只吃快照落笔，浏览器端才被调用。
 */
import {
  ModalBase, PALETTE, fontCss, wrapLines, inRect,
  drawAvatar, avatarFaceFor, drawWrappedLines,
} from './ui_kit.js';
import { sound } from '../../engine/sound.js';
import { CombatSystem } from '../../systems/combat.js';
import { GOODS_KINDS, getGoodsById } from '../../data/goods/index.js';
import { clipLines } from './unit_detail.js';
import {
  createStash, deposit, withdraw, summarizeItems, stashSummary,
} from '../../systems/stash.js';

/* ══════════════════════ 1. 常量 ══════════════════════ */

/** 双视图签：背包（单位私人持有） / 仓库（全队共享） */
export const INVENTORY_VIEWS = [
  { view: 'unit', label: '背包' },
  { view: 'stash', label: '仓库' },
];

/** 默认落在第一个分类（consumable「道具」），与 GOODS_KINDS 顺序同源 */
export const INV_DEFAULT_KIND = GOODS_KINDS[0].kind;

/** 列表可视行数（5 行：压缩列表高度，给描述区/提示区/关闭按钮留出净空） */
export const INV_VISIBLE_ROWS = 5;

/** 消耗品 category → 短语（growth/restore/battle 三大类） */
const CONSUMABLE_CATEGORY_LABELS = { growth: '成长', restore: '回复', battle: '战斗' };

/** 分类 icon 色块（正文色 + 单字短标，真图 iconPath 联调轮接 assetLoader） */
const KIND_COLORS = { consumable: '#2f9e44', weapon: '#e8590c', armor: '#1971c2', key_item: '#9c36b5' };
const KIND_SHORT = { consumable: '品', weapon: '武', armor: '防', key_item: '金' };

const numOr = (v, d) => (typeof v === 'number' && Number.isFinite(v)) ? v : d;

/* ══════════════════════ 2. 纯计算 ══════════════════════ */

/** 行右侧短提示：武器=威力 / 防具=双防 / 消耗品=类别短语 / 剧情道具=「剧情」 */
function hintFor(itemId, kind) {
  const g = getGoodsById(itemId);
  if (!g) return '';
  if (kind === 'weapon') return `威力 ${numOr(g.might, 0)}`;
  if (kind === 'armor') return `防 ${numOr(g.def, 0)} 魔防 ${numOr(g.res, 0)}`;
  if (kind === 'key_item') return '剧情';
  if (kind === 'consumable') return CONSUMABLE_CATEGORY_LABELS[g.category] || '道具';
  return '';
}

/**
 * 汇总清单（summarizeItems / stashSummary 产物）+ kind → 该分类行数组。
 * - 插入序保持（summarizeItems 的 Map 保序），不二次排序，UI 与数据顺序永远一致；
 * - disabled：key_item 禁存仓库（取出不受限）；count 非法/为 0 的行直接不显示；
 * - 未注册 kind（脏数据）天然被过滤——goods/index 约定的「其他」签留到联调轮再议。
 * 行形状：{ itemId, kind, name, count, countText, hint, desc, disabled }
 */
export function planInventoryRows(entries, kind) {
  const list = Array.isArray(entries) ? entries : [];
  const rows = [];
  for (const e of list) {
    if (!e || e.kind !== kind) continue;
    const count = numOr(e.count, 0);
    if (!(count > 0)) continue;
    rows.push({
      itemId: e.itemId,
      kind: e.kind,
      name: e.name || e.itemId || '？？？',
      count,
      countText: count > 1 ? '×' + count : '',
      hint: hintFor(e.itemId, e.kind),
      desc: e.desc || '',
      disabled: e.kind === 'key_item',
    });
  }
  return rows;
}

/** 汇总清单 → 四分类签数据（count=该分类行数；active 唯一） */
export function planKindTabs(entries, activeKind) {
  const list = Array.isArray(entries) ? entries : [];
  return GOODS_KINDS.map(({ kind, label }) => ({
    kind, label,
    count: list.reduce((n, e) => n + (e && e.kind === kind ? 1 : 0), 0),
    active: kind === activeKind,
  }));
}

/**
 * 「当前视图 + 选中行 → 可执行动作」的语义层（行动菜单/外层脚本也能用同一套判定）。
 * - unit 视图：可存行 → {id:'deposit'}；key_item（disabled）→ null（面板按钮置灰）；
 * - stash 视图：有行即可取（能进仓库的都能出）；
 * - 无行 → null。
 */
export function planTradeAction(view, row) {
  if (!row) return null;
  if (view === 'unit') return row.disabled ? null : { id: 'deposit', label: '存入仓库' };
  return { id: 'withdraw', label: '从仓库取出' };
}

/**
 * 「当前视图 + 选中行 + 装备快照」→ 可执行动作序列（存入只是并列选项之一）。
 * - unit 视图：
 *     装备中的武器/防具 → null（槽位锁定：换装后才可存/换）；
 *     未装备 weapon / armor → 前插 {id:'equip'}；
 *     consumable → use_in_battle=true（本面板只在战场弹出）→ 前插 {id:'use'}，
 *       growth 类卷子（use_in_battle:false，地图专用）战场不给 use；
 *     key_item → null（剧情道具锁死在持有者身上）；
 *   上述可用行一律附带 {id:'deposit'} 存入选项。
 * - stash 视图 → [{id:'withdraw'}]（能进仓库的都能出）；
 * - 无行 → null。
 * 与 planTradeAction（单动作旧契约，外部脚本/旧断言仍消费）并行存在。
 */
export function planItemActions(view, row, opts = {}) {
  if (!row) return null;
  if (view !== 'unit') return [{ id: 'withdraw', label: '取出 ×1' }];
  if (row.disabled) return null;
  const equippedWeaponId = opts.equippedWeaponId || null;
  const equippedArmorIds = Array.isArray(opts.equippedArmorIds) ? opts.equippedArmorIds : [];
  const acts = [];
  if (row.kind === 'weapon') {
    if (equippedWeaponId === row.itemId) return null;
    acts.push({ id: 'equip', label: '装备' });
  } else if (row.kind === 'armor') {
    if (equippedArmorIds.includes(row.itemId)) return null;
    acts.push({ id: 'equip', label: '装备' });
  } else if (row.kind === 'consumable') {
    const g = getGoodsById(row.itemId);
    if (g && g.use_in_battle) acts.push({ id: 'use', label: '使用' });
  }
  acts.push({ id: 'deposit', label: '存入仓库 ×1' });
  return acts;
}

/**
 * 选中行 → 描述区内容（title = 名·提示；lines = desc 折行）。
 * row 为 null → empty（渲染层画操作提示）；行在但 desc 空 → title 照画 + 0 行。
 */
export function planInvDesc(row, measure, maxWidth, maxLines = 2) {
  if (!row) return { title: '', lines: [], empty: true, clipped: false };
  const title = row.name + (row.hint ? ' · ' + row.hint : '');
  const text = row.desc || '';
  if (!text) return { title, lines: [], empty: false, clipped: false };
  const clip = clipLines(wrapLines(text, measure, maxWidth), maxLines);
  return { title, lines: clip.lines, empty: false, clipped: clip.clipped };
}

/**
 * 盒 760×500（与 unit_detail / level_up 同尺寸，视觉统一）。
 * 垂直分区（列表压缩为 5 行，消除描述/提示/按钮的层叠重叠）：
 *   标题 y+42 → 持有人行（头像/名字/双仓计数）58~106 →
 *   分类页签 112~140 → 列头文字 ~159 → 双列清单 172~302（5 行 × 26）→
 *   描述/反馈框 322~370 → 帮助提示 388 → 底部关闭按钮 424~476
 * 主体：左右双列（左列背包 w344 / 右列仓库 w344，gap16），5 行 × 26
 */
export function planInventoryLayout(box) {
  const colW = 344;
  const colGap = 16;
  const leftX = box.x + 28;
  const rightX = leftX + colW + colGap;
  const listY = box.y + 172;
  const rowH = 30;

  return {
    avatar: { cx: box.x + 62, cy: box.y + 82, r: 24 },
    nameX: box.x + 100, nameY: box.y + 72,
    subY: box.y + 98,
    // 分类页签整行水平居中（4×160 + 3×10 = 670）
    kindTabs: { x: box.x + 45, y: box.y + 112, w: 160, h: 28, gap: 10 },
    list: { x: leftX, y: listY, w: box.w - 56, rowH: 30, maxRows: INV_VISIBLE_ROWS },
    listLeft: { x: leftX, y: listY, w: colW, rowH, maxRows: INV_VISIBLE_ROWS, headerH: 26 },
    listRight: { x: rightX, y: listY, w: colW, rowH, maxRows: INV_VISIBLE_ROWS, headerH: 26 },
    iconSize: 18,
    desc: { x: box.x + 28, y: box.y + 330, w: 680, lineH: 20, maxLines: 2 },
    helpY: box.y + 388,
  };
}

/* ══════════════════════ 3. 组件 ══════════════════════ */

/** 假 canvas / 无 measureText 环境的字宽估算（与 unit_detail 同口径） */
function fallbackMeasure(s) { return String(s).length * 15; }

/** 圆角矩形 path（签 / 选中行底用；ui_kit 的 pathRoundRect 未导出，此处内联同款） */
function rrPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * config: { unit, stash } ——
 *   unit  运行时单位（V1/V2 形态均可；null → 「？？？」持有者，背包恒空）
 *   stash 仓库对象 { items:[] }（null / 缺省 → 内部空仓库，仓库签零行但可安全浏览）
 * 左右双列分栏交互：左背包、右仓库，方向键平滑切换，回车呼出操作菜单，底部大按钮仅有关闭。
 */
export class InventoryPanelModal extends ModalBase {
  constructor(canvas, config, onClose) {
    super(canvas, config, onClose);
    this.box = this.setupBox(760, 500);
    this.layout = planInventoryLayout(this.box);

    const cfg = config || {};
    this.unit = cfg.unit || null;
    this.stash = (cfg.stash && Array.isArray(cfg.stash.items)) ? cfg.stash : createStash();

    this.view = 'unit';                 // 'unit' | 'stash' (当前光标所在列)
    this.kind = INV_DEFAULT_KIND;       // GOODS_KINDS 之一
    this.rowIndices = { unit: 0, stash: 0 };
    this.focusArea = 'list';            // 'list' 道具列表区 | 'tabs' 分类页签区（键盘两区导航）
    this.activeMenu = null;             // 操作子菜单 { col, row, actions, focusIndex }
    this.feedback = null;               // 实时操作反馈 Toast { text, time }

    const ctx = this.ctx;
    if (typeof ctx.measureText === 'function') {
      ctx.font = fontCss(14);
      this.measure = (s) => ctx.measureText(s).width;
    } else {
      this.measure = fallbackMeasure;
    }

    this.selectable = true;
    this._applyButtons();
    this._refresh();
  }

  get rowIndex() {
    return this.rowIndices[this.view] || 0;
  }

  set rowIndex(val) {
    this.rowIndices[this.view] = Math.max(0, val);
  }

  get rows() {
    return this.view === 'unit' ? (this.unitRows || []) : (this.stashRows || []);
  }

  get row() {
    const list = this.rows;
    return list[this.rowIndex] || null;
  }

  render() {
    this.renderFrame('道具与仓库');
    this._renderOwner();
    this._renderKindTabs();
    this._renderColumns();
    this._renderDescAndFeedback();
    this._renderHelpHint();
    this.renderButtons();
    if (this.activeMenu) {
      this._renderActionMenu();
    }
  }

  /* ---------- 视图 / 分类 / 行（状态变更唯一入口 _refresh） ---------- */

  /** 双侧清单 + 分类行 + 选中行 + 描述块，一次算齐（幂等，可反复调用） */
  _refresh() {
    const unitEntries = summarizeItems(this.unit && this.unit.inventory);
    const stashEntries = stashSummary(this.stash);
    this.viewCounts = { unit: unitEntries.length, stash: stashEntries.length };
    
    this.unitRows = planInventoryRows(unitEntries, this.kind);
    this.stashRows = planInventoryRows(stashEntries, this.kind);

    // 计算当前分类下双侧合计总数做页签计数
    this.kindTabs = GOODS_KINDS.map(({ kind, label }) => {
      const uCount = unitEntries.filter((e) => e && e.kind === kind).length;
      const sCount = stashEntries.filter((e) => e && e.kind === kind).length;
      return {
        kind, label,
        count: uCount + sCount,
        unitCount: uCount,
        stashCount: sCount,
        active: kind === this.kind,
      };
    });

    // clamp 行索引
    if (this.rowIndices.unit >= this.unitRows.length) {
      this.rowIndices.unit = Math.max(0, this.unitRows.length - 1);
    }
    if (this.rowIndices.stash >= this.stashRows.length) {
      this.rowIndices.stash = Math.max(0, this.stashRows.length - 1);
    }

    this.descBlock = planInvDesc(
      this.row, this.measure, this.layout.desc.w, this.layout.desc.maxLines);
    this._applyButtons();
  }

  /**
   * 底部大按钮遵循需求第 8 条：只需要是「关闭」
   */
  _applyButtons() {
    this.setButtons([{ id: 'close', label: '关闭 (ESC)' }]);
    this.focusIndex = 0;
  }

  _setView(view) {
    if (this.view === view) return;
    this.view = view;
    this._refresh();
  }

  _setKind(kind) {
    if (this.kind === kind) return;
    this.kind = kind;
    this.rowIndices.unit = 0;
    this.rowIndices.stash = 0;
    this._refresh();
  }

  /** 区内平移选中行（到顶/到底不再循环；从行 0 上移/切换区域的判定由 handleKeyDown 处理） */
  _moveRow(delta) {
    const list = this.rows;
    if (!list.length) return false;
    const n = list.length;
    const next = Math.max(0, Math.min(n - 1, (this.rowIndex || 0) + delta));
    if (next === (this.rowIndex || 0)) return false;
    this.rowIndex = next;
    this._refresh();
    return true;
  }

  _cycleKind(delta) {
    const kinds = GOODS_KINDS.map((k) => k.kind);
    const i = kinds.indexOf(this.kind);
    this.kind = kinds[((i + delta) % kinds.length + kinds.length) % kinds.length];
    this.rowIndices.unit = 0;
    this.rowIndices.stash = 0;
    this._refresh();
    return true;
  }

  setFeedback(text, type = 'success') {
    this.feedback = { text, time: Date.now(), type };
  }

  /* ---------- 动作交互菜单（Action Popover） ---------- */

  _openActionMenu() {
    const row = this.row;
    if (!row) return;
    const isUnit = this.view === 'unit';
    const isEquipped = this._isRowEquipped(row);
    const acts = [];

    if (isUnit) {
      // 背包内的物品
      if (row.kind === 'consumable') {
        const g = getGoodsById(row.itemId);
        if (g && g.use_in_battle) {
          acts.push({ id: 'use', label: '使用' });
        }
      } else if (row.kind === 'weapon' || row.kind === 'armor') {
        if (isEquipped) {
          acts.push({ id: 'unequip', label: '卸下' });
        } else {
          acts.push({ id: 'equip', label: '装备' });
        }
      }

      if (!row.disabled) {
        acts.push({ id: 'deposit', label: '移入仓库' });
      }

      if (row.kind !== 'key_item') {
        acts.push({ id: 'drop', label: '丢弃' });
      }
    } else {
      // 仓库内的物品
      acts.push({ id: 'withdraw', label: '移入背包' });
      acts.push({ id: 'drop', label: '丢弃' });
    }

    acts.push({ id: 'cancel', label: '取消' });

    this.activeMenu = {
      col: this.view,
      row,
      actions: acts,
      focusIndex: 0,
      get index() { return this.focusIndex; },
      set index(v) { this.focusIndex = v; },
    };
    sound.playSfx('sfx_cursor');
  }

  _closeActionMenu() {
    this.activeMenu = null;
  }

  _executeMenuAction(actId) {
    if (!this.activeMenu) return;
    const { row, col } = this.activeMenu;
    this.activeMenu = null;

    if (actId === 'cancel') return;

    if (actId === 'use') {
      if (!this.unit) return;
      const res = CombatSystem.useItem(this.unit, row.itemId);
      if (res && res.success) {
        sound.playSfx('sfx_confirm');
        if (typeof this.config.onUseItem === 'function') {
          this.close();
          this.config.onUseItem(this.unit, row, res);
          return;
        }
        this.setFeedback(`使用【${row.name}】：${res.msg || '使用成功！'}`);
      } else {
        this.setFeedback(`使用失败：${res ? res.msg : '无法使用'}`);
      }
      this._refresh();
      return;
    }

    if (actId === 'equip') {
      if (!this.unit) return;
      if (row.kind === 'weapon') {
        this.unit.equippedWeapon = row.itemId;
      } else if (row.kind === 'armor') {
        this.unit.equippedArmors = [row.itemId];
      }
      sound.playSfx('sfx_confirm');
      this.setFeedback(`已为【${this.unit.name || '角色'}】装备【${row.name}】！`);
      this._refresh();
      return;
    }

    if (actId === 'unequip') {
      if (!this.unit) return;
      if (row.kind === 'weapon' && this.unit.equippedWeapon === row.itemId) {
        this.unit.equippedWeapon = null;
      } else if (row.kind === 'armor') {
        this.unit.equippedArmors = (this.unit.equippedArmors || []).filter(id => id !== row.itemId);
      }
      sound.playSfx('sfx_confirm');
      this.setFeedback(`已卸下【${row.name}】。`);
      this._refresh();
      return;
    }

    if (actId === 'deposit') {
      if (row.disabled) {
        this.setFeedback(`【${row.name}】是重要物品，无法存入仓库！`);
        return;
      }
      const res = deposit(this.unit, this.stash, row.itemId, 1);
      if (res.ok) {
        sound.playSfx('sfx_confirm');
        this.setFeedback(`已将【${row.name}】×1 存入全队仓库。`);
        this._refresh();
      }
      return;
    }

    if (actId === 'withdraw') {
      const res = withdraw(this.stash, this.unit, row.itemId, 1);
      if (res.ok) {
        sound.playSfx('sfx_confirm');
        this.setFeedback(`已从仓库取出【${row.name}】×1 放入背包。`);
        this._refresh();
      }
      return;
    }

    if (actId === 'drop') {
      if (col === 'unit' && this.unit && Array.isArray(this.unit.inventory)) {
        const slot = this.unit.inventory.find(i => i && i.id === row.itemId);
        if (slot) {
          slot.count -= 1;
          if (slot.count <= 0) {
            this.unit.inventory = this.unit.inventory.filter(i => i.id !== row.itemId);
          }
          sound.playSfx('sfx_confirm');
          this.setFeedback(`已丢弃【${row.name}】×1。`);
          this._refresh();
        }
      } else if (col === 'stash' && this.stash && Array.isArray(this.stash.items)) {
        const slot = this.stash.items.find(i => i && i.id === row.itemId);
        if (slot) {
          slot.count -= 1;
          if (slot.count <= 0) {
            this.stash.items = this.stash.items.filter(i => i.id !== row.itemId);
          }
          sound.playSfx('sfx_confirm');
          this.setFeedback(`已从仓库丢弃【${row.name}】×1。`);
          this._refresh();
        }
      }
    }
  }

  /* ---------- ModalBase 覆写：键盘与鼠标交互 ---------- */

  trigger(id) {
    if (id === 'close') {
      this.close();
      return;
    }
    this.close();
  }

  handleKeyDown(e) {
    const k = e && e.key;
    if (!k) return false;

    // 若动作子菜单打开中
    if (this.activeMenu) {
      const menu = this.activeMenu;
      if (k === 'ArrowUp') {
        menu.focusIndex = (menu.focusIndex - 1 + menu.actions.length) % menu.actions.length;
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (k === 'ArrowDown') {
        menu.focusIndex = (menu.focusIndex + 1) % menu.actions.length;
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (k === 'Enter' || k === ' ') {
        const act = menu.actions[menu.focusIndex];
        if (act) this._executeMenuAction(act.id);
        return true;
      }
      if (k === 'Escape') {
        this._closeActionMenu();
        sound.playSfx('sfx_cancel');
        return true;
      }
      return true;
    }

    // ===== 分类页签区（focusArea='tabs'）：←→ 循环切分类 · ↓ 返回列表 =====
    if (this.focusArea === 'tabs') {
      if (k === 'ArrowLeft') {
        this._cycleKind(-1);
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (k === 'ArrowRight') {
        this._cycleKind(1);
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (k === 'ArrowDown') {
        this.focusArea = 'list';
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (k === 'ArrowUp') return true;            // 已在顶行，上方无内容
      if (k === 'Enter' || k === ' ') return true; // 页签区无确认操作，也不打开行菜单
    }

    // ===== 道具列表区（focusArea='list'） =====
    // ← →：在左列（背包）与右列（仓库）之间穿梭（此时不切分类）
    if (k === 'ArrowLeft') {
      if (this.view === 'stash') {
        this._setView('unit');
        sound.playSfx('sfx_cursor');
        return true;
      }
      return false;
    }
    if (k === 'ArrowRight') {
      if (this.view === 'unit') {
        this._setView('stash');
        sound.playSfx('sfx_cursor');
        return true;
      }
      return false;
    }

    // ↑：当前列已是最上一行 → 键盘焦点上移进分类页签区
    if (k === 'ArrowUp') {
      if ((this.rowIndex || 0) === 0) {
        this.focusArea = 'tabs';
        sound.playSfx('sfx_cursor');
        return true;
      }
      this._moveRow(-1);
      sound.playSfx('sfx_cursor');
      return true;
    }

    // ↓：区内下移（到底不再循环）
    if (k === 'ArrowDown') {
      const moved = this._moveRow(1);
      if (moved) sound.playSfx('sfx_cursor');
      return true;
    }

    // Enter / 空格：打开操作菜单
    if (k === 'Enter' || k === ' ') {
      if (this.row) {
        this._openActionMenu();
      }
      return true;
    }

    // Escape：退出关闭
    if (k === 'Escape') {
      this.close();
      return true;
    }

    return false;
  }

  handleClick(px, py) {
    // 1) 动作子菜单激活时的点击
    if (this.activeMenu) {
      const menu = this.activeMenu;
      const box = this._calcMenuRect();
      if (inRect(px, py, box)) {
        const itemH = 34;
        const relY = py - (box.y + 36);
        const idx = Math.floor(relY / itemH);
        if (idx >= 0 && idx < menu.actions.length) {
          this._executeMenuAction(menu.actions[idx].id);
          return true;
        }
      } else {
        this._closeActionMenu();
        return true;
      }
    }

    // 2) 底部按钮（关闭）
    const btn = this.hitButton(px, py);
    if (btn) {
      this.trigger(btn.id);
      return true;
    }

    // 3) 分类页签点击
    for (let i = 0; i < this.kindTabs.length; i++) {
      if (inRect(px, py, this._kindTabRect(i))) {
        this._setKind(this.kindTabs[i].kind);
        sound.playSfx('sfx_cursor');
        return true;
      }
    }

    // 4) 左列（背包）列表点击
    const leftIdx = this._rowAtCol(px, py, this.layout.listLeft, this.unitRows);
    if (leftIdx >= 0) {
      this.view = 'unit';
      this.rowIndices.unit = leftIdx;
      this.focusArea = 'list';
      this._refresh();
      this._openActionMenu();
      return true;
    }

    // 5) 右列（仓库）列表点击
    const rightIdx = this._rowAtCol(px, py, this.layout.listRight, this.stashRows);
    if (rightIdx >= 0) {
      this.view = 'stash';
      this.rowIndices.stash = rightIdx;
      this.focusArea = 'list';
      this._refresh();
      this._openActionMenu();
      return true;
    }

    return false;
  }

  /* ---------- 几何与辅助 ---------- */

  _kindTabRect(i) {
    const kt = this.layout.kindTabs;
    return { x: kt.x + i * (kt.w + kt.gap), y: kt.y, w: kt.w, h: kt.h };
  }

  _rowAtCol(px, py, colLayout, rows) {
    if (!rows || !rows.length) return -1;
    if (px < colLayout.x || px > colLayout.x + colLayout.w) return -1;
    const rel = py - colLayout.y;
    const visible = Math.min(rows.length, colLayout.maxRows);
    if (rel < 0 || rel >= visible * colLayout.rowH) return -1;
    return Math.floor(rel / colLayout.rowH);
  }

  _calcMenuRect() {
    const w = 220;
    const h = 42 + (this.activeMenu ? this.activeMenu.actions.length * 36 : 0);
    return {
      x: this.box.cx - w / 2,
      y: this.box.cy - h / 2,
      w,
      h,
    };
  }

  _isRowEquipped(row) {
    if (!row || !this.unit) return false;
    if (row.kind === 'weapon') return this.unit.equippedWeapon === row.itemId;
    if (row.kind === 'armor') return (this.unit.equippedArmors || []).includes(row.itemId);
    return false;
  }

  /* ---------- 渲染呈现 ---------- */

  _renderOwner() {
    const ctx = this.ctx;
    const L = this.layout;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const face = this.unit ? avatarFaceFor(this.unit) : { img: null, fallbackName: '？' };
    drawAvatar(ctx, { ...L.avatar, ...face, faction: (this.unit && this.unit.faction) || 'player' });

    ctx.font = fontCss(18, 'bold');
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(this.unit ? (this.unit.name || '？？？') : '？？？', L.nameX, L.nameY);

    ctx.font = fontCss(13);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`持有人背包 (${this.viewCounts.unit} 件)  |  全队共享仓库 (${this.viewCounts.stash} 件)`, L.nameX, L.subY);
  }

  _renderKindTabs() {
    const ctx = this.ctx;

    // 键盘焦点在页签区时，整条页签带加金色虚线框提示当前位置
    if (this.focusArea === 'tabs') {
      const kt = this.layout.kindTabs;
      const n = this.kindTabs.length;
      ctx.strokeStyle = PALETTE.gold;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]);
      rrPath(ctx, kt.x - 8, kt.y - 6, n * kt.w + (n - 1) * kt.gap + 16, kt.h + 12, 8);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    this.kindTabs.forEach((tab, i) => {
      const rect = this._kindTabRect(i);
      if (tab.active) {
        ctx.fillStyle = PALETTE.gold;
        rrPath(ctx, rect.x, rect.y, rect.w, rect.h, 6);
        ctx.fill();
        ctx.fillStyle = '#1e1b18';
        ctx.font = fontCss(15, 'bold');
      } else {
        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        rrPath(ctx, rect.x, rect.y, rect.w, rect.h, 6);
        ctx.fill();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#cbd5e1';
        ctx.font = fontCss(14);
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = `${tab.label} (${tab.count})`;
      ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 1);
    });
  }

  _renderColumns() {
    const ctx = this.ctx;
    const L = this.layout;

    // 绘制左列（个人背包）
    this._renderOneColumn(
      L.listLeft,
      `个人背包 · ${this.unit ? this.unit.name : '主角'}`,
      this.unitRows,
      this.view === 'unit',
      this.rowIndices.unit
    );

    // 绘制右列（全队仓库）
    this._renderOneColumn(
      L.listRight,
      '全队共享仓库',
      this.stashRows,
      this.view === 'stash',
      this.rowIndices.stash
    );
  }

  _renderOneColumn(colLayout, title, rows, isActiveCol, activeRowIdx) {
    const ctx = this.ctx;
    const { x, y, w, rowH, maxRows } = colLayout;

    // 列头：普通文字（活动列金色、非活动灰），不做可点击 tab 样式
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(14, 'bold');
    ctx.fillStyle = isActiveCol ? PALETTE.gold : '#94a3b8';
    ctx.fillText(title, x + 2, y - 16);

    // 列背景底框
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    rrPath(ctx, x, y, w, maxRows * rowH, 6);
    ctx.fill();
    ctx.strokeStyle = isActiveCol ? 'rgba(250, 204, 21, 0.4)' : 'rgba(51, 65, 85, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    if (!rows.length) {
      ctx.font = fontCss(14, 'bold');
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('（空无一物）', x + w / 2, y + 40);
      return;
    }

    const visible = Math.min(rows.length, maxRows);
    for (let i = 0; i < visible; i++) {
      const row = rows[i];
      const ry = y + i * rowH;
      const cy = ry + rowH / 2;
      const isSelected = isActiveCol && i === activeRowIdx;
      const isEquipped = this._isRowEquipped(row);

      // 高亮选中行
      if (isSelected) {
        ctx.fillStyle = 'rgba(250, 204, 21, 0.22)';
        rrPath(ctx, x + 2, ry + 1, w - 4, rowH - 2, 4);
        ctx.fill();
        ctx.strokeStyle = PALETTE.gold;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 分类微标
      const size = 20;
      ctx.fillStyle = KIND_COLORS[row.kind] || '#64748b';
      rrPath(ctx, x + 8, ry + (rowH - size) / 2, size, size, 3);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = fontCss(12, 'bold');
      ctx.textAlign = 'center';
      ctx.fillText(KIND_SHORT[row.kind] || '物', x + 8 + size / 2, cy);

      // 物品名称
      ctx.textAlign = 'left';
      ctx.font = fontCss(15, isSelected ? 'bold' : 'normal');
      ctx.fillStyle = isEquipped ? PALETTE.ok : (isSelected ? '#ffffff' : '#e2e8f0');
      ctx.fillText(row.name, x + 32, cy);

      // 数量
      if (row.countText) {
        ctx.font = fontCss(13, 'bold');
        ctx.fillStyle = PALETTE.goldText;
        ctx.fillText(row.countText, x + w - 100, cy);
      }

      // 右侧状态与提示
      ctx.textAlign = 'right';
      ctx.font = fontCss(12);
      if (isEquipped) {
        ctx.fillStyle = PALETTE.ok;
        ctx.fillText('已装 · ' + (row.hint || ''), x + w - 8, cy);
      } else {
        ctx.fillStyle = row.disabled ? PALETTE.danger : '#94a3b8';
        ctx.fillText(row.disabled ? '锁死' : (row.hint || ''), x + w - 8, cy);
      }
    }
  }

  _renderDescAndFeedback() {
    const ctx = this.ctx;
    const D = this.layout.desc;

    // 底板
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    rrPath(ctx, D.x, D.y, D.w, 48, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // 优先显示即时反馈 Toast
    if (this.feedback && (Date.now() - this.feedback.time < 3000)) {
      ctx.font = fontCss(14, 'bold');
      ctx.fillStyle = this.feedback.type === 'error' ? PALETTE.danger : PALETTE.ok;
      ctx.fillText(`⚡ ${this.feedback.text}`, D.x + 12, D.y + 24);
      return;
    }

    if (!this.row) {
      ctx.font = fontCss(13);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('移动光标选中道具，按【回车】或【点击】弹出操作菜单（使用/装备/移入仓库/取出/丢弃）', D.x + 12, D.y + 24);
      return;
    }

    ctx.font = fontCss(14, 'bold');
    ctx.fillStyle = PALETTE.goldText;
    ctx.fillText(this.descBlock.title, D.x + 12, D.y + 16);

    ctx.font = fontCss(12);
    ctx.fillStyle = '#cbd5e1';
    const descText = (this.descBlock.lines && this.descBlock.lines[0]) || '（无附加说明）';
    ctx.fillText(descText, D.x + 12, D.y + 34);
  }

  _renderHelpHint() {
    const ctx = this.ctx;
    const L = this.layout;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(12);
    if (this.focusArea === 'tabs') {
      ctx.fillStyle = PALETTE.goldText;
      ctx.fillText(
        '【←/→】切换分类 | 【↓】返回道具列表 | 【ESC】关闭',
        this.box.cx,
        L.helpY
      );
    } else {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(
        '【←/→】背包↔仓库 | 【↑/↓】选道具（最上行再↑进入分类页签） | 【回车/点击】操作 | 【ESC】关闭',
        this.box.cx,
        L.helpY
      );
    }
  }

  _renderActionMenu() {
    const ctx = this.ctx;
    const menu = this.activeMenu;
    if (!menu) return;

    // 半透明遮罩
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);

    const rect = this._calcMenuRect();

    // 菜单容器
    ctx.fillStyle = 'rgba(20, 24, 33, 0.96)';
    rrPath(ctx, rect.x, rect.y, rect.w, rect.h, 8);
    ctx.fill();
    ctx.strokeStyle = PALETTE.gold;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 标题
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(14, 'bold');
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`【${menu.row.name}】`, rect.x + rect.w / 2, rect.y + 18);

    // 分隔线
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rect.x + 12, rect.y + 32);
    ctx.lineTo(rect.x + rect.w - 12, rect.y + 32);
    ctx.stroke();

    // 菜单项
    const itemH = 34;
    const startY = rect.y + 36;
    menu.actions.forEach((act, idx) => {
      const iy = startY + idx * itemH;
      const isFocused = idx === menu.focusIndex;

      if (isFocused) {
        ctx.fillStyle = PALETTE.gold;
        rrPath(ctx, rect.x + 10, iy + 2, rect.w - 20, itemH - 4, 4);
        ctx.fill();
        ctx.fillStyle = '#1e1b18';
        ctx.font = fontCss(13, 'bold');
      } else {
        ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
        rrPath(ctx, rect.x + 10, iy + 2, rect.w - 20, itemH - 4, 4);
        ctx.fill();
        ctx.fillStyle = act.id === 'cancel' ? '#94a3b8' : (act.id === 'drop' ? '#f87171' : '#e2e8f0');
        ctx.font = fontCss(13);
      }

      ctx.textAlign = 'center';
      ctx.fillText(act.label, rect.x + rect.w / 2, iy + itemH / 2);
    });
  }
}
