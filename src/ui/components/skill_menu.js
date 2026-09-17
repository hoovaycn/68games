/**
 * skill_menu —— 战棋技能菜单组件
 *
 * 列出当前单位可用技能（个人技 + 职业技，由 skill_service.getUnitSkills 提供），
 * MP 不足的技能灰显；选中后回调 onSelect(skill) 进入选目标。
 * 输入自闭环（键盘/鼠标），盒外点击由外层解释为「取消技能菜单」。
 */
import { sound } from '../../engine/sound.js';
import { getUnitSkills, canCastSkill, isSkillUnlocked } from '../../systems/skill_service.js';

export const SKILL_MENU_W = 236;
export const SKILL_MENU_ITEM_H = 42;

export class SkillMenu {
  constructor({ unit, anchorRect, canvasW, canvasH, onSelect, onCancel } = {}) {
    this.unit = unit;
    this.onSelect = onSelect || null;
    this.onCancel = onCancel || null;

    this.skills = getUnitSkills(unit);
    this.items = this.skills.map(s => {
      const unlocked = isSkillUnlocked(unit, s);
      return {
        skill: s,
        unlocked,
        enabled: unlocked && canCastSkill(unit, s)
      };
    });

    this.rect = this._planBox(anchorRect, canvasW, canvasH, this.items.length);

    // 初始焦点：首个可用项；全灰时落在首行（Enter 播 cancel 音）
    this.selectedIndex = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].enabled) { this.selectedIndex = i; break; }
    }
    if (this.selectedIndex < 0) this.selectedIndex = 0;
  }

  get selected() {
    return this.items[this.selectedIndex] || null;
  }

  _planBox(anchorRect, canvasW, canvasH, count) {
    const w = SKILL_MENU_W;
    const itemH = SKILL_MENU_ITEM_H;
    const safeW = (Number.isFinite(canvasW) && canvasW > 0) ? canvasW : 960;
    const safeH = (Number.isFinite(canvasH) && canvasH > 0) ? canvasH : 540;
    const a = anchorRect || { x: 0, y: 0, w: 0, h: 0 };
    const gap = 8;
    const pad = 8;
    const margin = 6;
    const n = (Number.isFinite(count) && count > 0) ? Math.floor(count) : 1;

    const h = n * itemH + pad * 2;
    let x = a.x + a.w + gap;
    if (x + w > safeW - margin) x = a.x - gap - w;
    if (x < margin) x = margin;

    let y = a.y + a.h / 2 - h / 2;
    y = Math.max(margin, Math.min(y, safeH - margin - h));

    return { x, y, w, h, itemH, pad };
  }

  hitMenu(px, py) {
    const r = this.rect;
    return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
  }

  indexAt(py) {
    const r = this.rect;
    if (py < r.y + r.pad || py >= r.y + r.h - r.pad) return -1;
    const idx = Math.floor((py - r.y - r.pad) / r.itemH);
    return (idx >= 0 && idx < this.items.length) ? idx : -1;
  }

  moveSelection(delta) {
    const n = this.items.length;
    if (n === 0) return false;
    let i = this.selectedIndex;
    for (let k = 1; k <= n; k++) {
      const ni = ((i + delta * k) % n + n) % n;
      if (this.items[ni] && this.items[ni].enabled) {
        this.selectedIndex = ni;
        sound.playSfx('sfx_cursor');
        return true;
      }
    }
    return false;
  }

  confirm() {
    const cur = this.selected;
    if (!cur) return false;
    if (!cur.enabled) {
      sound.playSfx('sfx_cancel');
      return false;
    }
    sound.playSfx('sfx_confirm');
    if (this.onSelect) this.onSelect(cur.skill);
    return true;
  }

  cancel() {
    if (this.onCancel) this.onCancel();
  }

  handleKeyDown(e) {
    const k = e && e.key;
    if (!k) return false;
    if (k === 'ArrowUp' || k === 'w' || k === 'W') { this.moveSelection(-1); return true; }
    if (k === 'ArrowDown' || k === 's' || k === 'S') { this.moveSelection(1); return true; }
    if (k === 'Enter' || k === ' ') { this.confirm(); return true; }
    if (k === 'Escape' || k === 'Backspace') { this.cancel(); return true; }
    return false;
  }

  handleClick(px, py) {
    if (!this.hitMenu(px, py)) return false;
    const idx = this.indexAt(py);
    if (idx < 0) return true;
    this.selectedIndex = idx;
    if (!this.items[idx].enabled) {
      sound.playSfx('sfx_cancel');
      return true;
    }
    this.confirm();
    return true;
  }

  handleMouseMove(px, py) {
    if (!this.hitMenu(px, py)) return false;
    const idx = this.indexAt(py);
    if (idx >= 0 && this.items[idx].enabled && idx !== this.selectedIndex) {
      this.selectedIndex = idx;
      sound.playSfx('sfx_cursor');
    }
    return true;
  }

  render(ctx) {
    if (!ctx) return;
    const { x, y, w, h, itemH, pad } = this.rect;

    ctx.fillStyle = 'rgba(20, 20, 24, 0.96)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    this.items.forEach((item, idx) => {
      const isSel = idx === this.selectedIndex;
      const iy = y + pad + idx * itemH;
      const rowH = itemH - 4;
      const s = item.skill;

      if (isSel) {
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

      ctx.textBaseline = 'middle';

      // 技能名（左对齐）
      ctx.fillStyle = isSel ? '#1c1917' : (item.enabled ? '#f8fafc' : '#64748b');
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(s.name, x + 14, iy + rowH / 2);

      // 右侧标签：未解锁显示「Lv.X 解锁」，已解锁显示 MP 消耗
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'right';
      if (!item.unlocked) {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`Lv.${s.unlockLevel || 1} 解锁`, x + w - 12, iy + rowH / 2);
      } else {
        ctx.fillStyle = item.enabled ? '#fca5a5' : '#f87171';
        ctx.fillText(`${s.mpCost} MP`, x + w - 12, iy + rowH / 2);
      }
    });
  }
}
