/**
 * inventory_panel —— 人物道具面板（任务 #8d，任务清单 #5「人物道具UI」+ #9 仓库概念）
 *
 * 用途：行动菜单「道具」入口 / 战场查看携带物。
 * 双视图：unit 背包（私人持有） ↔ stash 仓库（全队共享中转站 · deposit/withdraw 双向流转）；
 * 四分类页签：GOODS_KINDS（道具/武器/防具/重要）——顺序与 goods 表约定同源；
 * key_item（剧情道具）禁存入仓库：重要物件锁死在持有者身上，面板按钮对其置灰。
 *
 * 键盘模型（小白友好，一屏可说明）：
 *   ↑ ↓ 选行 · ← → 切分类 · Tab 切背包/仓库 · Enter 执行存取（×1） · Escape 关闭
 * 鼠标：点视图签/分类签/行/底部按钮等效。
 *
 * 分层原则（与 ui_kit / unit_detail 一致）：
 *   INVENTORY_VIEWS / planInventoryRows / planKindTabs / planTradeAction /
 *   planInvDesc / planInventoryLayout —— 纯计算，Node 可单测；
 *   InventoryPanelModal.render* —— 只吃快照落笔，浏览器端才被调用。
 */
import {
  ModalBase, PALETTE, fontCss, wrapLines, inRect,
  drawAvatar, avatarFaceFor, drawWrappedLines,
} from './ui_kit.js';
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

/** 列表可视行数（超过此数联调轮接滚动窗口；当前数据规模不会触顶） */
export const INV_VISIBLE_ROWS = 7;

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
 * 纵向预算：标题(42) → 持有者区(头像 r=28 y+88 / 姓名 / 副行)
 *   → 视图签(y+124 h30) → 分类签(y+162 h28)
 *   → 列表区(y+196，7 行×24=168) → 描述区(y+372，2 行×20)
 *   → 底部按钮走 ModalBase 默认 y = 盒底-76（y+424），各区不重叠。
 */
export function planInventoryLayout(box) {
  return {
    avatar: { cx: box.x + 66, cy: box.y + 88, r: 28 },
    nameX: box.x + 106, nameY: box.y + 78,
    subY: box.y + 106,
    viewTabs: { x: box.x + 40, y: box.y + 124, w: 150, h: 30, gap: 14 },
    kindTabs: { x: box.x + 40, y: box.y + 162, w: 164, h: 28, gap: 8 },
    list: { x: box.x + 24, y: box.y + 196, w: box.w - 48, rowH: 24, maxRows: INV_VISIBLE_ROWS },
    iconSize: 18,
    desc: { x: box.x + 40, y: box.y + 372, w: box.w - 80, lineH: 20, maxLines: 2 },
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
 * 存取动作每按一次 ×1 件，成功即刷新全快照（行消失自动 clamp 选中态）。
 */
export class InventoryPanelModal extends ModalBase {
  constructor(canvas, config, onClose) {
    super(canvas, config, onClose);
    this.box = this.setupBox(760, 500);
    this.layout = planInventoryLayout(this.box);

    const cfg = config || {};
    this.unit = cfg.unit || null;
    this.stash = (cfg.stash && Array.isArray(cfg.stash.items)) ? cfg.stash : createStash();

    this.view = 'unit';                 // 'unit' | 'stash'
    this.kind = INV_DEFAULT_KIND;       // GOODS_KINDS 之一
    this.rowIndex = 0;                  // 当前分类内的选中行

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

  render() {
    this.renderFrame('道具与仓库');
    this._renderOwner();
    this._renderTabs();
    this._renderList();
    this._renderDesc();
    this.renderButtons();
  }

  /* ---------- 视图 / 分类 / 行（状态变更唯一入口 _refresh） ---------- */

  /** 双侧清单 + 分类行 + 选中行 + 描述块，一次算齐（幂等，可反复调用） */
  _refresh() {
    const unitEntries = summarizeItems(this.unit && this.unit.inventory);
    const stashEntries = stashSummary(this.stash);
    this.viewCounts = { unit: unitEntries.length, stash: stashEntries.length };
    this.entries = this.view === 'stash' ? stashEntries : unitEntries;
    this.kindTabs = planKindTabs(this.entries, this.kind);
    this.rows = planInventoryRows(this.entries, this.kind);
    if (this.rowIndex >= this.rows.length) {
      this.rowIndex = Math.max(0, this.rows.length - 1);
    }
    this.row = this.rows[this.rowIndex] || null;
    this.descBlock = planInvDesc(
      this.row, this.measure, this.layout.desc.w, this.layout.desc.maxLines);
  }

  /** 主操作按钮随视图翻转：背包=存入仓库 / 仓库=取出；关闭恒在 */
  _applyButtons() {
    const main = this.view === 'unit'
      ? { id: 'deposit', label: '存入仓库 ×1' }
      : { id: 'withdraw', label: '取出 ×1' };
    this.setButtons([main, { id: 'close', label: '关闭' }]);
  }

  _setView(view) {
    if (this.view === view) return;
    this.view = view;
    this.rowIndex = 0;
    this._applyButtons();
    this._refresh();
  }

  _setKind(kind) {
    if (this.kind === kind) return;
    this.kind = kind;
    this.rowIndex = 0;
    this._refresh();
  }

  _moveRow(delta) {
    if (!this.rows.length) return false;
    const n = this.rows.length;
    this.rowIndex = ((this.rowIndex + delta) % n + n) % n;
    this._refresh();
    return true;
  }

  _cycleKind(delta) {
    const kinds = GOODS_KINDS.map((k) => k.kind);
    const i = kinds.indexOf(this.kind);
    this.kind = kinds[((i + delta) % kinds.length + kinds.length) % kinds.length];
    this.rowIndex = 0;
    this._refresh();
    return true;
  }

  /** 存/取 1 件（失败/禁存静默返回，绝不关面板——关面板只有 close/Escape 两条路） */
  _trade(isDeposit) {
    const row = this.rows[this.rowIndex];
    if (!row) return;
    if (isDeposit && row.disabled) return;
    const result = isDeposit
      ? deposit(this.unit, this.stash, row.itemId, 1)
      : withdraw(this.stash, this.unit, row.itemId, 1);
    if (!result.ok) return;
    this._refresh();
  }

  /* ---------- ModalBase 覆写：分支动作 + 列表键盘 ---------- */

  trigger(id) {
    if (id === 'deposit') { this._trade(true); return; }
    if (id === 'withdraw') { this._trade(false); return; }
    this.close();
  }

  handleKeyDown(e) {
    const k = e && e.key;
    if (!k) return false;
    if (k === 'ArrowUp') return this._moveRow(-1);
    if (k === 'ArrowDown') return this._moveRow(1);
    if (k === 'ArrowLeft') return this._cycleKind(-1);
    if (k === 'ArrowRight') return this._cycleKind(1);
    if (k === 'Tab') {
      this._setView(this.view === 'unit' ? 'stash' : 'unit');
      return true;
    }
    if (k === 'Enter' || k === ' ') {
      // 空列表不误关：吞掉按键但不动数据；有行则执行当前视图的主操作
      this.trigger(this.view === 'unit' ? 'deposit' : 'withdraw');
      return true;
    }
    if (k === 'Escape') {
      this.close();
      return true;
    }
    return false;
  }

  handleClick(px, py) {
    // 1) 底部按钮（ModalBase 原生行为 + 焦点联动）
    const btn = this.hitButton(px, py);
    if (btn) {
      if (this.selectable) {
        this.focusIndex = this.buttons.findIndex((b) => b.id === btn.id);
      }
      this.trigger(btn.id);
      return true;
    }
    // 2) 视图签
    for (let i = 0; i < INVENTORY_VIEWS.length; i++) {
      if (inRect(px, py, this._tabRect(this.layout.viewTabs, i))) {
        this._setView(INVENTORY_VIEWS[i].view);
        return true;
      }
    }
    // 3) 分类签
    for (let i = 0; i < this.kindTabs.length; i++) {
      if (inRect(px, py, this._tabRect(this.layout.kindTabs, i))) {
        this._setKind(this.kindTabs[i].kind);
        return true;
      }
    }
    // 4) 列表行（点选中行暂不动作；双击存取留给联调轮）
    const idx = this._rowAt(px, py);
    if (idx >= 0) {
      if (idx !== this.rowIndex) {
        this.rowIndex = idx;
        this._refresh();
      }
      return true;
    }
    return false;
  }

  /* ---------- 几何小工具 ---------- */

  _tabRect(meta, i) {
    return { x: meta.x + i * (meta.w + meta.gap), y: meta.y, w: meta.w, h: meta.h };
  }

  _rowAt(px, py) {
    const R = this.layout.list;
    if (!this.rows.length) return -1;
    if (px < R.x || px > R.x + R.w) return -1;
    const rel = py - R.y;
    const visible = Math.min(this.rows.length, R.maxRows);
    if (rel < 0 || rel >= visible * R.rowH) return -1;
    return Math.floor(rel / R.rowH);
  }

  /* ---------- 渲染 ---------- */

  _renderOwner() {
    const ctx = this.ctx;
    const L = this.layout;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    if (this.view === 'unit') {
      const face = this.unit ? avatarFaceFor(this.unit) : { img: null, fallbackName: '？' };
      drawAvatar(ctx, { ...L.avatar, ...face, faction: (this.unit && this.unit.faction) || 'player' });
      ctx.font = fontCss(20, 'bold');
      ctx.fillStyle = PALETTE.ink;
      ctx.fillText(this.unit ? (this.unit.name || '？？？') : '？？？', L.nameX, L.nameY);
      ctx.font = fontCss(14);
      ctx.fillStyle = PALETTE.text;
      ctx.fillText(`私人持有 · ${this.viewCounts.unit} 类道具`, L.nameX, L.subY);
    } else {
      drawAvatar(ctx, { ...L.avatar, faction: 'neutral', fallbackName: '仓库' });
      ctx.font = fontCss(20, 'bold');
      ctx.fillStyle = PALETTE.ink;
      ctx.fillText('全队仓库', L.nameX, L.nameY);
      ctx.font = fontCss(14);
      ctx.fillStyle = PALETTE.text;
      ctx.fillText(`全队共享 · 存放 ${this.viewCounts.stash} 类道具`, L.nameX, L.subY);
    }
  }

  _drawTab(rect, label, active, color) {
    const ctx = this.ctx;
    if (active) {
      ctx.fillStyle = color || PALETTE.gold;
      rrPath(ctx, rect.x, rect.y, rect.w, rect.h, 7);
      ctx.fill();
      ctx.fillStyle = PALETTE.paper;
      ctx.font = fontCss(15, 'bold');
    } else {
      ctx.fillStyle = 'rgba(28, 26, 25, 0.55)';
      rrPath(ctx, rect.x, rect.y, rect.w, rect.h, 7);
      ctx.fill();
      ctx.strokeStyle = color || PALETTE.gold;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = PALETTE.goldText;
      ctx.font = fontCss(15);
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 1);
  }

  _renderTabs() {
    // 视图签（背包/仓库）——当前视图金底反白
    INVENTORY_VIEWS.forEach((v, i) => {
      const n = v.view === 'unit' ? this.viewCounts.unit : this.viewCounts.stash;
      this._drawTab(this._tabRect(this.layout.viewTabs, i), `${v.label} ${n}`, v.view === this.view);
    });
    // 分类签（道具/武器/防具/重要）——当前分类金底反白
    this.kindTabs.forEach((t, i) => {
      this._drawTab(this._tabRect(this.layout.kindTabs, i), t.label + (t.count > 0 ? ' ' + t.count : ''),
        t.active);
    });
  }

  _renderList() {
    const ctx = this.ctx;
    const R = this.layout.list;
    const B = this.box;

    if (!this.rows.length) {
      ctx.font = fontCss(15);
      ctx.fillStyle = PALETTE.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('（这一类没有道具）', B.cx, R.y + R.rowH * 2);
      return;
    }

    const visible = Math.min(this.rows.length, R.maxRows);
    for (let i = 0; i < visible; i++) {
      const row = this.rows[i];
      const y = R.y + i * R.rowH;
      const cy = y + R.rowH / 2;

      // 选中行：金色底 + 金框（与按钮焦点同语言）
      if (i === this.rowIndex) {
        ctx.fillStyle = 'rgba(250, 204, 21, 0.18)';
        rrPath(ctx, R.x, y, R.w, R.rowH, 6);
        ctx.fill();
        ctx.strokeStyle = PALETTE.gold;
        ctx.lineWidth = 2;
        rrPath(ctx, R.x, y, R.w, R.rowH, 6);
        ctx.stroke();
      }

      // 分类 icon 色块 + 单字（真图标联调轮替换）
      const size = this.layout.iconSize;
      ctx.fillStyle = KIND_COLORS[row.kind] || '#888888';
      rrPath(ctx, R.x + 18, y + (R.rowH - size) / 2, size, size, 4);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = fontCss(11, 'bold');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(KIND_SHORT[row.kind] || '？', R.x + 18 + size / 2, y + R.rowH / 2);

      // 名称（禁存行降灰提示「剧情」定位）
      ctx.textAlign = 'left';
      ctx.font = fontCss(16, 'bold');
      ctx.fillStyle = row.disabled ? PALETTE.title : PALETTE.ink;
      ctx.fillText(row.name, R.x + 48, cy);

      // 数量徽标
      if (row.countText) {
        ctx.font = fontCss(14, 'bold');
        ctx.fillStyle = PALETTE.goldText;
        ctx.fillText(row.countText, R.x + R.w - 176, cy);
      }

      // 右侧短提示
      ctx.textAlign = 'right';
      ctx.font = fontCss(13);
      ctx.fillStyle = row.disabled ? PALETTE.danger : PALETTE.title;
      ctx.fillText(row.hint || (row.disabled ? '不可存入' : ''), R.x + R.w - 14, cy);
      ctx.textAlign = 'left';
    }
  }

  _renderDesc() {
    const ctx = this.ctx;
    const D = this.layout.desc;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    if (!this.row) {
      ctx.font = fontCss(14);
      ctx.fillStyle = PALETTE.text;
      ctx.fillText('（↑ ↓ 选行 · ← → 切换分类 · Tab 切换背包/仓库 · Enter 存取）', D.x, D.y + 10);
      return;
    }

    ctx.font = fontCss(16, 'bold');
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText(this.descBlock.title, D.x, D.y + 10);

    if (!this.descBlock.lines.length) {
      ctx.font = fontCss(14);
      ctx.fillStyle = PALETTE.text;
      ctx.fillText(this.row.disabled ? '（剧情道具，锁在持有者身上，不可存入仓库）' : '（暂无描述）',
        D.x, D.y + 34);
      return;
    }
    drawWrappedLines(ctx, this.descBlock.lines, D.x, D.y + 24, {
      font: fontCss(14),
      color: PALETTE.text,
      align: 'left',
      lineHeight: D.lineH,
    });
  }
}
