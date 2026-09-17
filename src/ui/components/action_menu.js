/**
 * action_menu —— 战棋行动菜单组件（任务 #9）
 *
 * ── 设计动机（用户需求）──────────────────────────────
 * 单位移动落位后弹出的贴身浮窗菜单，四项恒定：
 *   详情（人物详情弹层）/ 攻击（进入选敌）/ 道具（背包·仓库面板）/ 待机（结束行动）
 * 暂时不可用的项（射程内无敌 / 背包为空）以灰字展示而不是隐藏——
 * 菜单结构恒定，小白玩家能预知所有可能性，这是教学友好性的核心。
 *
 * ── 组件形态 ─────────────────────────────────────────
 * 非模态浮层（无遮罩、不锁定地图渲染），与全屏 ModalBase 弹层相对：
 *   - 输入自闭环：handleKeyDown / handleClick / handleMouseMove / moveSelection
 *     main.js 事件层直接委托，菜单内命中返回 true，盒外命中返回 false
 *     （外层把 false 解释为「点外面 → 取消菜单」）
 *   - 行为回调：onSelect(id) / onCancel()，不持有任何地图状态
 *
 * ── 视觉基调 ─────────────────────────────────────────
 * 沿用 renderer 旧菜单的羊皮纸浮窗：#fffdfa 底、#292524 描边 2px、选中黑底反白；
 * 尺寸按用户「字儿和元素都大点」放大：w=136 / itemH=42 / 16px bold。
 */

import { sound } from '../../engine/sound.js';

/* ══════════════ 1. 菜单项与尺寸常量（纯数据） ══════════════ */

export const ACTION_MENU_W = 136;
export const ACTION_MENU_ITEM_H = 42;

/**
 * 五项恒定菜单计划：
 * @param {{enemiesInRange?: number, hasItems?: boolean, hasSkills?: boolean}} ctx
 *  - enemiesInRange：当前武器射程内存活敌人数（0 → 攻击灰显）
 *  - hasItems：单位背包是否非空（空 → 道具灰显）
 *  - hasSkills：单位是否有可用技能（无 → 技能灰显）
 * 详情 / 待机恒可用（看面板和结束行动不需要前置条件）。
 */
export function planActionMenuItems({ enemiesInRange = 0, hasItems = false, hasSkills = false } = {}) {
  return [
    { id: 'attack', label: '攻击', enabled: enemiesInRange > 0 },
    { id: 'skill', label: '技能', enabled: hasSkills },
    { id: 'item', label: '道具', enabled: hasItems },
    { id: 'detail', label: '详情', enabled: true },
    { id: 'wait', label: '待机', enabled: true }
  ];
}

/**
 * 下一个「启用项」索引：循环滚动，跳过 disabled 项。
 * fromIndex 为 -1 时语义退化为「找首个启用项」（构造初始化用）。
 * 所有项都 disabled 时返回 -1（调用方自行决定兜底显示）。
 */
export function planNextEnabledIndex(items, fromIndex, delta) {
  if (!Array.isArray(items) || items.length === 0) return -1;
  const n = items.length;
  const step = delta >= 0 ? 1 : -1;
  for (let k = 1; k <= n; k++) {
    const i = ((fromIndex + step * k) % n + n) % n;
    if (items[i] && items[i].enabled) return i;
  }
  return -1;
}

/* ══════════════ 2. 浮窗布局（纯计算） ══════════════ */

/**
 * 贴单位浮窗矩形计划：
 * - 水平：单位格右侧优先（+gap）；右侧放不下（溢出画布）→ 翻到左侧；
 *   左侧也放不下（超小画布）→ 贴左边距（可能压住单位，极端情况的兜底）
 * - 垂直：与单位格垂直居中对齐，整体 clamp 进画布
 * @param {{x,y,w,h}} anchorRect 单位格的像素矩形（含地图偏移）
 */
export function planActionMenuBox(anchorRect, canvasW, canvasH, itemCount, opts = {}) {
  const w = opts.w || ACTION_MENU_W;
  const itemH = opts.itemH || ACTION_MENU_ITEM_H;
  const gap = (typeof opts.gap === 'number') ? opts.gap : 8;
  const pad = (typeof opts.pad === 'number') ? opts.pad : 7;
  const margin = (typeof opts.margin === 'number') ? opts.margin : 6;
  const safeW = (Number.isFinite(canvasW) && canvasW > 0) ? canvasW : 960;
  const safeH = (Number.isFinite(canvasH) && canvasH > 0) ? canvasH : 540;
  const a = anchorRect || { x: 0, y: 0, w: 0, h: 0 };
  const count = (Number.isFinite(itemCount) && itemCount > 0) ? Math.floor(itemCount) : 1;

  const h = count * itemH + pad * 2;

  const rightX = a.x + a.w + gap;
  let x = (rightX + w <= safeW - margin) ? rightX : (a.x - gap - w);
  if (x < margin) x = margin;

  let y = a.y + a.h / 2 - h / 2;
  y = Math.max(margin, Math.min(y, safeH - margin - h));

  return { x, y, w, h, itemH, pad, count };
}

/* ══════════════ 3. 行动菜单组件 ══════════════ */

/**
 * 配置：
 *   items      planActionMenuItems 输出（或同形数组）
 *   anchorRect 单位格像素矩形 {x,y,w,h}
 *   canvasW/H  画布尺寸（布局避让用）
 *   onSelect   (id, item) => void  选中启用项并确认
 *   onCancel   () => void           Escape / Backspace（外层负责单位走位回退）
 */
export class ActionMenu {
  constructor({ items, anchorRect, canvasW, canvasH, onSelect, onCancel } = {}) {
    this.items = Array.isArray(items) ? items : planActionMenuItems({});
    this.onSelect = onSelect || null;
    this.onCancel = onCancel || null;

    this.rect = planActionMenuBox(anchorRect, canvasW, canvasH, this.items.length);

    // 初始焦点：首个启用项；全灰时落在首行（视觉上有选中态，Enter 播 cancel 音）
    this.selectedIndex = planNextEnabledIndex(this.items, -1, 1);
    if (this.selectedIndex < 0) this.selectedIndex = 0;
  }

  /** 当前选中项（越界防御返回 null） */
  get selected() {
    return this.items[this.selectedIndex] || null;
  }

  /** 点是否命中菜单盒（盒外点击由外层解释为「取消菜单」） */
  hitMenu(px, py) {
    const r = this.rect;
    return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
  }

  /** 焦点移动（循环 + 跳过 disabled）。返回 true = 焦点确实移动了 */
  moveSelection(delta) {
    const next = planNextEnabledIndex(this.items, this.selectedIndex, delta);
    if (next < 0 || next === this.selectedIndex) return false;
    this.selectedIndex = next;
    sound.playSfx('sfx_cursor');
    return true;
  }

  /** 确认当前项：启用 → onSelect 回调；灰项 → cancel 音不回调（菜单保持打开） */
  confirm() {
    const cur = this.selected;
    if (!cur) return false;
    if (!cur.enabled) {
      sound.playSfx('sfx_cancel');
      return false;
    }
    sound.playSfx('sfx_confirm');
    if (this.onSelect) this.onSelect(cur.id, cur);
    return true;
  }

  /** 取消（音效由外层 handleBattleCancel 统一播，避免双响） */
  cancel() {
    if (this.onCancel) this.onCancel();
  }

  /**
   * 键盘分发（菜单打开期间独占全部按键）：
   * ↑/W ↓/S 移动 · Enter/Space 确认 · Esc/Backspace 取消
   */
  handleKeyDown(e) {
    const k = e && e.key;
    if (!k) return false;
    if (k === 'ArrowUp' || k === 'w' || k === 'W') {
      this.moveSelection(-1);
      return true;
    }
    if (k === 'ArrowDown' || k === 's' || k === 'S') {
      this.moveSelection(1);
      return true;
    }
    if (k === 'Enter' || k === ' ') {
      this.confirm();
      return true;
    }
    if (k === 'Escape' || k === 'Backspace') {
      this.cancel();
      return true;
    }
    return false;
  }

  /** 鼠标点击分发：盒外 false（外层取消）；盒内命中行即选中并确认 */
  handleClick(px, py) {
    if (!this.hitMenu(px, py)) return false;
    const idx = this.indexAt(py);
    if (idx < 0) return true;           // 盒内上下留白缝隙：吃掉不做事
    this.selectedIndex = idx;
    const item = this.items[idx];
    if (item && !item.enabled) {
      sound.playSfx('sfx_cancel');      // 灰项：聚焦提示 + cancel 音，不触发
      return true;
    }
    this.confirm();
    return true;
  }

  /** 悬停联动：仅在启用行上生效 */
  handleMouseMove(px, py) {
    if (!this.hitMenu(px, py)) return false;
    const idx = this.indexAt(py);
    if (idx < 0) return true;
    const item = this.items[idx];
    if (item && item.enabled && idx !== this.selectedIndex) {
      this.selectedIndex = idx;
      sound.playSfx('sfx_cursor');
    }
    return true;
  }

  /** 像素 y → 行索引（-1 = 留白区） */
  indexAt(py) {
    const r = this.rect;
    if (py < r.y + r.pad || py >= r.y + r.h - r.pad) return -1;
    const idx = Math.floor((py - r.y - r.pad) / r.itemH);
    return (idx >= 0 && idx < this.items.length) ? idx : -1;
  }

  /** 自绘浮窗（深色战棋风格，黑底金框白字高对比度） */
  render(ctx) {
    if (!ctx) return;
    const { x, y, w, h, itemH, pad } = this.rect;

    // 深色半透明底板
    ctx.fillStyle = 'rgba(20, 20, 24, 0.96)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();

    // 金色细外框
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    this.items.forEach((item, idx) => {
      const isSelected = idx === this.selectedIndex;
      const iy = y + pad + idx * itemH;
      const rowH = itemH - 4;

      if (isSelected) {
        // 选中态：金黑渐变高亮
        const grad = ctx.createLinearGradient(x + 5, iy, x + w - 5, iy);
        grad.addColorStop(0, '#d97706');
        grad.addColorStop(1, '#f59e0b');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 5, iy, w - 10, rowH, 4);
        ctx.fill();

        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.save();
      if (isSelected) {
        ctx.fillStyle = '#1c1917';
      } else if (item.enabled) {
        ctx.fillStyle = '#f8fafc';
      } else {
        ctx.fillStyle = '#64748b';
      }
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, x + w / 2, iy + rowH / 2);
      ctx.restore();
    });
  }
}
