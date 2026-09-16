/**
 * ui_kit —— 全 UI 统一视觉基座（单一真相源）
 *
 * 地位：后续所有新组件（combat_exchange 交战弹层 / level_up 升级 /
 * unit_detail 人物详情 / inventory_panel 道具仓库 / action_menu 行动菜单）
 * 的建筑块，一个组件都不许自带一套配色或折行逻辑。
 *
 * 视觉语言锚定 victory_modal / item_modal 已定稿的浅黄羊皮纸 + 黑金体系：
 *   羊皮纸底 #FFFDF9 · 深暖炭黑 #292524 · 亮金描边 #FACC15 · 亮黄大字 #fef08a
 *
 * 分层原则（★关键）：
 *   plan*  —— 纯计算/校验（clamp、布局几何、折行），不碰 canvas，Node 可单测；
 *   draw*  —— 只吃 ctx + plan 结果落笔，浏览器端才被调用，单测不覆盖；
 *   ModalBase —— 弹层基类，统一 canvas(config,onClose) 构造约定与
 *               handleClick / handleKeyDown / close(one-shot) 行为，
 *               与现有 ItemModal / VictoryModal 的挂接方式完全兼容。
 *
 * 大字大元素基调：默认字号 ≥15px、按钮 ≥52px 高、条形 ≥14px 高。
 */
import { sound } from '../../engine/sound.js';
import { assetLoader } from '../../engine/asset_loader.js';
import { portraitForUnit } from '../../engine/avatar.js';

/* ══════════════════════ 1. 调色盘 & 条形预设 ══════════════════════ */

/** 全 UI 唯一用色来源（与存量弹窗逐色锚定，改动前先跑 selftest §6.1） */
export const PALETTE = {
  paper: '#FFFDF9',                      // 羊皮纸底
  ink: '#292524',                        // 深暖炭黑（按钮/主文字）
  inkDeep: '#1c1917',                    // 按钮渐变底
  gold: '#FACC15',                       // 亮金描边
  goldText: '#fef08a',                   // 按钮亮黄大字
  frame: '#d6c8b4',                      // 弹窗外框衬线
  frameInner: '#e2d5bd',                 // 弹窗内衬修饰线
  title: '#b45309',                      // 标题琥珀
  text: '#57534e',                       // 正文冷灰
  accent: '#7c2d12',                     // 强调深红棕
  overlay: 'rgba(15, 12, 10, 0.72)',     // 半透明遮罩
  ghost: 'rgba(255, 244, 214, 0.65)',    // 条形"变动段"暖白高亮（掉血残影/获得增长）
  danger: '#ef4444',
  ok: '#22c55e',
  warn: '#f59e0b',
};

/** 条形预设：kind → label(缺省标签) + fill(垂直渐变二色) */
export const BAR_KINDS = {
  hp: { label: 'HP', fill: ['#f87171', '#b91c1c'] },    // 红：生命
  exp: { label: 'EXP', fill: ['#facc15', '#b45309'] },  // 金：经验
  stat: { label: '', fill: ['#4ade80', '#15803d'] },    // 绿：属性成长
};

/* ══════════════════════ 2. 纯计算（Node 可单测） ══════════════════════ */

/** 任意值安全夹到 [0,1]；NaN/null/undefined 一律返回 0 */
export function clamp01(v) {
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) return 0;
  return v > 1 ? 1 : v;
}

/** 生命/经验条比率：current/max 全防御（负数/除零/NaN → 0，超上限 → 1） */
export function barRatio(current, max) {
  if (typeof current !== 'number' || !Number.isFinite(current)) return 0;
  if (typeof max !== 'number' || !Number.isFinite(max) || max <= 0) return 0;
  return clamp01(current / max);
}

/**
 * 条形绘制计划：只做校验/clamp，不落笔。
 * ghostRatio 为"参照值"（掉血前的血量 / 升级前的数值），drawBar 会把
 * ratio 与 ghostRatio 之间的区段画成暖白 ghost 高亮，双向通用（增/减都对）。
 */
export function planBar(opts = {}) {
  const kind = BAR_KINDS[opts.kind] ? opts.kind : 'stat';
  return {
    x: opts.x || 0,
    y: opts.y || 0,
    w: opts.w || 100,
    h: opts.h || 16,
    kind,
    label: opts.label !== undefined ? opts.label : BAR_KINDS[kind].label,
    valueText: opts.valueText != null ? String(opts.valueText) : null,
    ratio: clamp01(opts.ratio),
    ghostRatio: (opts.ghostRatio == null || !Number.isFinite(opts.ghostRatio))
      ? null : clamp01(opts.ghostRatio),
  };
}

/** 点是否落在矩形内（四边含边界） */
export function inRect(px, py, rect) {
  return !!rect
    && px >= rect.x && px <= rect.x + rect.w
    && py >= rect.y && py <= rect.y + rect.h;
}

/**
 * 弹窗盒子几何：居中 + 超出画布自动收缩（保留 margin）、小画布给最小可读尺寸
 * @returns {x,y,w,h,cx,cy}
 */
export function planModalBox(canvasW, canvasH, boxW, boxH, margin = 24) {
  const m = Math.max(0, margin);
  const w = Math.max(80, Math.min(boxW, canvasW - m * 2));
  const h = Math.max(120, Math.min(boxH, canvasH - m * 2));
  const x = (canvasW - w) / 2;
  const y = (canvasH - h) / 2;
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}

/**
 * 一行按钮布局：水平均布、整体在 box 中水平居中。
 * btnW 缺省时自动收缩（单个 360 封顶、多个按剩余宽均分、最小 120）。
 * anchorY 缺省 = 贴 box 底部（留 24 底衬）。
 */
export function planButtonRow(box, count, opts = {}) {
  const n = Math.max(1, Math.floor(count));
  const gap = typeof opts.gap === 'number' ? opts.gap : 16;
  const btnH = typeof opts.btnH === 'number' ? Math.max(24, opts.btnH) : 52;
  const innerW = Math.max(0, box.w - 48);
  let btnW = opts.btnW;
  if (typeof btnW !== 'number') {
    btnW = Math.min(360, Math.floor((innerW - gap * (n - 1)) / n));
  }
  btnW = Math.max(120, btnW);
  const total = btnW * n + gap * (n - 1);
  const x0 = box.x + (box.w - total) / 2;
  const y = typeof opts.anchorY === 'number' ? opts.anchorY : (box.y + box.h - btnH - 24);
  const rects = [];
  for (let i = 0; i < n; i++) {
    rects.push({ x: x0 + i * (btnW + gap), y, w: btnW, h: btnH });
  }
  return rects;
}

/**
 * 按字符折行（CJK 友好，emoji 安全）：显式 \n 分段保留，绝不丢字。
 * @param {string} text 原文
 * @param {(s: string) => number} measure 单行宽度测量（浏览器端传
 *        (s) => ctx.measureText(s).width；单测传假实现）
 */
export function wrapLines(text, measure, maxWidth) {
  if (text == null || text === '') return [];
  const mw = Math.max(1, maxWidth);
  const out = [];
  for (const para of String(text).split('\n')) {
    if (para === '') { out.push(''); continue; }
    let line = '';
    for (const ch of para) {
      const test = line + ch;
      if (line && measure(test) > mw) { out.push(line); line = ch; }
      else { line = test; }
    }
    out.push(line);
  }
  return out;
}

/** 折行后的文本块：行数组 + 行高 + 总高（绘制与布局解耦的中间产物） */
export function planWrappedBlock(text, measure, maxWidth, lineHeight = 22) {
  const lh = Math.max(12, lineHeight);
  const lines = wrapLines(text, measure, maxWidth);
  return { lines, lineHeight: lh, height: lines.length * lh };
}

/** 线性插值 */
export function lerp(a, b, t) { return a + (b - a) * t; }

/** 缓出曲线：动画收尾减速（交战掉血/经验增长时间轴用） */
export function easeOutCubic(t) {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

/** 统一字体串（含 PingFang SC / 微软雅黑，跨 Win/mac 中文不糊） */
export function fontCss(size, weight) {
  const px = Math.max(10, Math.floor(size));
  return (weight ? weight + ' ' : '') + px
    + 'px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
}

/* ══════════════════════ 3. 绘制（浏览器端落笔，单测不覆盖） ══════════════════════ */

/** roundRect 兼容路径：无原生 API 的环境走 arcTo 手绘 */
function pathRoundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** 全屏半透明遮罩（所有弹层的第一层） */
export function drawOverlay(ctx, w, h) {
  ctx.fillStyle = PALETTE.overlay;
  ctx.fillRect(0, 0, w, h);
}

/** 羊皮纸卡片：主体 + 外框衬线 + 内衬修饰线（视觉与存量弹窗逐层对齐） */
export function drawPaperBox(ctx, box) {
  ctx.fillStyle = PALETTE.paper;
  pathRoundRect(ctx, box.x, box.y, box.w, box.h, 14);
  ctx.fill();
  ctx.strokeStyle = PALETTE.frame;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = PALETTE.frameInner;
  ctx.lineWidth = 1;
  pathRoundRect(ctx, box.x + 6, box.y + 6, box.w - 12, box.h - 12, 11);
  ctx.stroke();
}

/**
 * 通用条形绘制（HP / EXP / Stat 共用一只函数）：
 * 暗底槽 → ghost 变动段（暖白高亮）→ 主体渐变填充 → 顶部高光 → 外框 → 左标签/右数值
 * 传入 planBar 的产物；ghostRatio=掉血前/升级前数值，ratio 为当前值。
 */
export function drawBar(ctx, plan) {
  const p = plan || {};
  const kind = BAR_KINDS[p.kind] || BAR_KINDS.stat;
  const x = p.x, y = p.y;
  const w = Math.max(2, p.w), h = Math.max(4, p.h);
  const r = Math.min(6, h / 2);
  const ratio = clamp01(p.ratio);
  const ghost = (p.ghostRatio == null) ? null : clamp01(p.ghostRatio);

  // 1. 暗底槽
  ctx.fillStyle = 'rgba(28, 25, 23, 0.85)';
  pathRoundRect(ctx, x, y, w, h, r);
  ctx.fill();

  ctx.save();
  pathRoundRect(ctx, x, y, w, h, r);
  ctx.clip();

  // 2. ghost 变动段：ratio 与 ghostRatio 之间的暖白高亮（掉血残影/获得增长双向通用）
  if (ghost != null && ghost !== ratio) {
    const lo = Math.min(ratio, ghost), hi = Math.max(ratio, ghost);
    ctx.fillStyle = PALETTE.ghost;
    ctx.fillRect(x + w * lo, y, w * (hi - lo), h);
  }

  // 3. 主体渐变填充 + 顶部高光线
  if (ratio > 0) {
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, kind.fill[0]);
    g.addColorStop(1, kind.fill[1]);
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w * ratio, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(x + 1, y + 2, Math.max(0, w * ratio - 2), 2);
  }
  ctx.restore();

  // 4. 外框
  ctx.strokeStyle = PALETTE.frame;
  ctx.lineWidth = 1.5;
  pathRoundRect(ctx, x, y, w, h, r);
  ctx.stroke();

  // 5. 左标签（条外左侧）/ 右数值（条外右侧）
  ctx.font = fontCss(16, 'bold');
  ctx.textBaseline = 'middle';
  if (p.label) {
    ctx.fillStyle = PALETTE.ink;
    ctx.textAlign = 'right';
    ctx.fillText(p.label, x - 8, y + h / 2);
  }
  if (p.valueText) {
    ctx.fillStyle = PALETTE.ink;
    ctx.textAlign = 'left';
    ctx.fillText(p.valueText, x + w + 8, y + h / 2);
  }
}

/**
 * 统一大按钮（黑底金字体系）：focused 时金色光晕 + ▶ 前缀（键盘焦点指示）。
 * rect = {x,y,w,h}（planButtonRow 的产物）。
 */
export function drawButton(ctx, rect, label, opts = {}) {
  const { x, y, w, h } = rect;
  const focused = !!opts.focused;
  const r = 10;

  if (focused) {
    // 双层光晕：外圈大而柔 + 内圈亮而实，远距离也能一眼锁定焦点
    ctx.save();
    ctx.shadowColor = 'rgba(250, 204, 21, 0.95)';
    ctx.shadowBlur = 26;
    ctx.fillStyle = 'rgba(250, 204, 21, 0.16)';
    pathRoundRect(ctx, x - 7, y - 7, w + 14, h + 14, r + 7);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.shadowColor = 'rgba(250, 204, 21, 0.65)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(250, 204, 21, 0.45)';
    pathRoundRect(ctx, x - 2, y - 2, w + 4, h + 4, r + 2);
    ctx.fill();
    ctx.restore();
  }

  // 焦点态反白配色：金底深字（常态黑底金字），选中项与未选项形成强对比
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  if (focused) {
    g.addColorStop(0, '#fde047');
    g.addColorStop(1, '#f59e0b');
  } else {
    g.addColorStop(0, PALETTE.ink);
    g.addColorStop(1, PALETTE.inkDeep);
  }
  ctx.fillStyle = g;
  pathRoundRect(ctx, x, y, w, h, r);
  ctx.fill();

  ctx.strokeStyle = focused ? '#fffbeb' : PALETTE.gold;
  ctx.lineWidth = focused ? 3 : 2;
  ctx.stroke();

  ctx.fillStyle = focused ? PALETTE.inkDeep : PALETTE.goldText;
  ctx.font = fontCss(opts.fontSize || 20, 'bold');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(focused ? '▶ ' + label : label, x + w / 2, y + h / 2 + 1);
}

/**
 * 圆形头像底座 + 头像/首字兜底（与 renderer.drawUnitToken 同一视觉，抽出为组件用）。
 * faction: 'player' 蓝系 / 'enemy' 红系 / 'neutral' 金系。
 * img 为 null 时用 fallbackName 前两字占位（素材缺失绝不静默空白）。
 */
export function drawAvatar(ctx, avatar) {
  const { cx, cy, r } = avatar;
  const faction = avatar.faction || 'player';
  const img = avatar.img || null;
  if (typeof cx !== 'number' || typeof cy !== 'number' || !(r > 0)) return;

  const grad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.3, r * 0.1, cx, cy, r);
  if (faction === 'enemy') {
    grad.addColorStop(0, '#f87171'); grad.addColorStop(1, '#7f1d1d');
  } else if (faction === 'neutral') {
    grad.addColorStop(0, '#fbbf24'); grad.addColorStop(1, '#92400e');
  } else {
    grad.addColorStop(0, '#60a5fa'); grad.addColorStop(1, '#1e3a8a');
  }

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.max(2, r * 0.06);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
  ctx.clip();
  if (img) {
    ctx.drawImage(img, cx - r + 2, cy - r + 2, (r - 2) * 2, (r - 2) * 2);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.font = fontCss(Math.max(16, Math.floor(r * 0.85)), 'bold');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fb = typeof avatar.fallbackName === 'string' ? avatar.fallbackName : '??';
    ctx.fillText(fb.slice(0, 2), cx, cy + 1);
  }
  ctx.restore();
}

/**
 * 战场单位 → 头像绘制入参的桥（统一走 avatar.js 解析 + assetLoader 取图）：
 *   const face = avatarFaceFor(unit);
 *   drawAvatar(ctx, { cx, cy, r, ...face, faction });
 * @returns {{img: HTMLImageElement|Canvas|null, fallbackName: string}}
 */
export function avatarFaceFor(unit, opts = {}) {
  const url = portraitForUnit(unit, opts);
  return {
    img: assetLoader.getImage(url),
    fallbackName: (unit && unit.name) ? unit.name : '??',
  };
}

/** 绘制折行文本块（planWrappedBlock 产物；也直接吃 lines 数组） */
export function drawWrappedLines(ctx, block, x, startY, opts = {}) {
  const isArray = Array.isArray(block);
  const lines = isArray ? block : (block && block.lines) || [];
  const lh = (isArray ? opts.lineHeight : (block && block.lineHeight)) || opts.lineHeight || 22;
  ctx.font = opts.font || fontCss(16);
  ctx.fillStyle = opts.color || PALETTE.text;
  ctx.textAlign = opts.align || 'center';
  ctx.textBaseline = 'top';
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lh));
  return startY + lines.length * lh;
}

/* ══════════════════════ 4. ModalBase 弹层基类 ══════════════════════ */

/**
 * 所有弹层组件的基类，与存量 ItemModal / VictoryModal 的挂接约定 100% 兼容：
 *   const modal = new XxxModal(canvas, config, onClose);  // onClose 只会被调一次
 *   主循环里： modal.render(); modal.handleClick(x, y); modal.handleKeyDown(e);
 *
 * 子类职责：
 *   - 构造后先 this.setupBox(w, h) 拿 this.box；
 *   - 有按钮时 this.setButtons([{id, label}, ...])（可选 this.selectable = true 开键盘焦点）；
 *   - 实现 render()（建议：this.renderFrame(title) → 自绘内容 → this.renderButtons()）；
 *   - 需要分支行为时覆写 trigger(id)（默认 = close）。
 */
export class ModalBase {
  constructor(canvas, config, onClose) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config || {};
    this.onClose = onClose || null;
    this.buttons = [];        // [{id, label, rect}]
    this.selectable = false;  // 子类置 true：开启 ↑↓ 焦点导航 + ▶ 指示
    this.focusIndex = -1;
    this.finished = false;    // close 后为 true，主循环据此丢弃实例
  }

  get isDone() { return this.finished; }

  /** 计算并暂存弹窗盒子（居中 + 自适应收缩） */
  setupBox(boxW, boxH, margin = 24) {
    this.box = planModalBox(this.canvas.width, this.canvas.height, boxW, boxH, margin);
    return this.box;
  }

  /** 注册一行按钮（自动布局）；selectable 时焦点初始落在第一个 */
  setButtons(defs, opts = {}) {
    const list = (defs || []).filter((d) => d && d.id);
    const rects = planButtonRow(this.box, list.length, opts);
    this.buttons = list.map((d, i) => ({ id: d.id, label: d.label || d.id, rect: rects[i] }));
    if (this.selectable && this.buttons.length) this.focusIndex = 0;
    return this.buttons;
  }

  hitButton(px, py) {
    const hit = this.buttons.find((b) => inRect(px, py, b.rect));
    return hit ? hit : null;
  }

  /** 键盘焦点移动（循环滚动） */
  moveFocus(delta) {
    if (!this.selectable || !this.buttons.length) return false;
    const n = this.buttons.length;
    this.focusIndex = ((this.focusIndex + delta) % n + n) % n;
    sound.playSfx('sfx_cursor');
    return true;
  }

  /** 按钮触发入口：子类覆写做分支行为，默认直接关闭 */
  trigger(id) { // eslint-disable-line no-unused-vars
    this.close();
  }

  /** 关闭（one-shot）：播音效 + onClose 只回调一次 */
  close(sfx = 'sfx_confirm') {
    if (this.finished) return;
    this.finished = true;
    sound.playSfx(sfx);
    if (this.onClose) {
      const cb = this.onClose;
      this.onClose = null;
      cb();
    }
  }

  /**
   * 鼠标点击分发：命中按钮 → 联动焦点（selectable 时）→ trigger；
   * 空白处返回 false 交还给外层（子类可覆写实现"点任意处关闭"等）。
   */
  handleClick(px, py) {
    const idx = this.buttons.findIndex((b) => inRect(px, py, b.rect));
    if (idx < 0) return false;
    if (this.selectable) this.focusIndex = idx;
    this.trigger(this.buttons[idx].id);
    return true;
  }

  /**
   * 键盘分发：↑↓←→ 移动焦点（selectable）· Enter/Space 触发焦点按钮或关闭 ·
   * Escape 关闭。返回 true = 事件已消费。
   */
  handleKeyDown(e) {
    const k = e && e.key;
    if (!k) return false;
    if (this.selectable && (k === 'ArrowUp' || k === 'ArrowLeft')) return this.moveFocus(-1);
    if (this.selectable && (k === 'ArrowDown' || k === 'ArrowRight')) return this.moveFocus(1);
    if (k === 'Enter' || k === ' ') {
      if (this.selectable && this.buttons[this.focusIndex]) {
        this.trigger(this.buttons[this.focusIndex].id);
        return true;
      }
      this.close();
      return true;
    }
    if (k === 'Escape') {
      this.close();
      return true;
    }
    return false;
  }

  /** 遮罩 + 羊皮纸盒 + 居中大标题（render() 的头三件事） */
  renderFrame(title) {
    drawOverlay(this.ctx, this.canvas.width, this.canvas.height);
    drawPaperBox(this.ctx, this.box);
    if (title) {
      const ctx = this.ctx;
      ctx.fillStyle = PALETTE.title;
      ctx.font = fontCss(25, 'bold');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('—— ' + title + ' ——', this.box.cx, this.box.y + 42);
    }
  }

  /** 绘制全部按钮（selectable 时焦点项带光晕 + ▶） */
  renderButtons() {
    this.buttons.forEach((b, i) => {
      drawButton(this.ctx, b.rect, b.label, {
        focused: this.selectable && i === this.focusIndex,
      });
    });
  }

  /** 子类必须实现（忘了实现就在第一帧得到明确报错，而不是白屏） */
  render() {
    throw new Error('ModalBase 子类必须实现 render()');
  }
}
