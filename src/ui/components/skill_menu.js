/**
 * skill_menu —— 战棋技能菜单组件
 *
 * 列出当前单位可用技能（个人技 + 职业技，由 skill_service.getUnitSkills 提供），
 * MP 不足的技能灰显；选中后回调 onSelect(skill) 进入选目标。
 * 输入自闭环（键盘/鼠标），盒外点击由外层解释为「取消技能菜单」。
 */
import { sound } from '../../engine/sound.js';
import { getUnitSkills, canCastSkill, isSkillUnlocked } from '../../systems/skill_service.js';
import { wrapLines } from './ui_kit.js';

export const SKILL_MENU_W = 340;
export const SKILL_MENU_ITEM_H = 84;

const STAT_NAMES = {
  str: '物攻',
  mag: '魔攻',
  skl: '技巧',
  spd: '速度',
  luk: '幸运',
  def: '物防',
  res: '魔防',
  mov: '移动',
  avoid: '回避',
  hit: '命中',
  crit: '暴击'
};

const PERCENT_STATS = new Set(['avoid', 'hit', 'crit']);

/**
 * 格式化技能作用机制（目标、射程、持续时间、数值变化）
 */
export function formatSkillMechanism(skill) {
  if (!skill) return '';
  const eff = skill.effect;

  // 1. 作用目标、射程与持续时间
  let targetTag = '';
  if (skill.target === 'self') targetTag = '自身';
  else if (skill.target === 'ally') targetTag = '友方';
  else if (skill.target === 'enemy') targetTag = '敌方';

  let rangeTag = '';
  if (skill.range && (skill.range[0] > 0 || skill.range[1] > 0)) {
    rangeTag = skill.range[0] === skill.range[1] ? `射程${skill.range[0]}` : `射程${skill.range[0]}-${skill.range[1]}`;
  }

  let durTag = '';
  if (skill.duration === 'turn') durTag = '1回合';
  else if (skill.duration === 'nextAttack') durTag = '下次攻击';
  else if (skill.duration === 'battle') durTag = '整场';

  const tagList = [targetTag, rangeTag, durTag].filter(Boolean);
  const prefix = tagList.length > 0 ? `[${tagList.join('·')}] ` : '';

  // 2. 数值机制说明
  let effectDesc = '';
  if (eff) {
    if (eff.kind === 'heal') {
      effectDesc = `恢复${eff.amount || 0}点生命`;
    } else if (eff.kind === 'damage') {
      const type = eff.power === 'mag' ? '法术' : '物理';
      effectDesc = `${type}攻击(威力+${eff.might || 0})`;
    } else if (eff.kind === 'buff' || eff.kind === 'debuff') {
      const statParts = [];
      for (const [k, v] of Object.entries(eff.stats || {})) {
        const name = STAT_NAMES[k] || k;
        const sign = v > 0 ? `+${v}` : `${v}`;
        const unit = PERCENT_STATS.has(k) ? '%' : '';
        statParts.push(`${name}${sign}${unit}`);
      }
      effectDesc = statParts.join(' ');
    }
  }

  return `${prefix}${effectDesc}`.trim();
}

/**
 * 兼容性保留原函数，返回机制与描述组合
 */
export function formatSkillSummary(skill) {
  if (!skill) return '';
  const mech = formatSkillMechanism(skill);
  const desc = (skill.desc || '').trim();
  if (mech && desc) return `${mech} · ${desc}`;
  return mech || desc || '暂无说明';
}

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
        mechanism: formatSkillMechanism(s),
        desc: (s.desc || '').trim(),
        summary: formatSkillSummary(s),
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
        ctx.roundRect(x + 5, iy, w - 10, rowH, 5);
        ctx.fill();
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.textBaseline = 'top';

      // ── 第一行：技能名（左）与 MP 消耗 / 解锁等级（右） ──
      const row1Y = iy + 8;
      ctx.textAlign = 'left';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillStyle = isSel ? '#1c1917' : (item.enabled ? '#f8fafc' : '#64748b');
      ctx.fillText(s.name, x + 14, row1Y);

      ctx.textAlign = 'right';
      ctx.font = 'bold 13px sans-serif';
      if (!item.unlocked) {
        ctx.fillStyle = isSel ? '#451a03' : '#94a3b8';
        ctx.fillText(`Lv.${s.unlockLevel || 1} 解锁`, x + w - 14, row1Y);
      } else {
        if (isSel) {
          ctx.fillStyle = item.enabled ? '#7f1d1d' : '#991b1b';
        } else {
          ctx.fillStyle = item.enabled ? '#fca5a5' : '#f87171';
        }
        ctx.fillText(`${s.mpCost} MP`, x + w - 14, row1Y);
      }

      // ── 第二行：技能机制与数值说明 ──
      const row2Y = iy + 29;
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = isSel ? '#78350f' : (item.enabled ? '#fbbf24' : '#94a3b8');
      ctx.fillText(item.mechanism || '主动技能', x + 14, row2Y);

      // ── 第三行及后续：完整风味描述（按可用宽度折行展示，绝不截断出省略号） ──
      if (item.desc) {
        ctx.font = '12px sans-serif';
        ctx.fillStyle = isSel ? '#292524' : (item.enabled ? '#cbd5e1' : '#64748b');
        const descLines = wrapLines(item.desc, str => ctx.measureText(str).width, w - 28);
        const startY = iy + 47;
        const lineH = 15;
        for (let l = 0; l < descLines.length; l++) {
          ctx.fillText(descLines[l], x + 14, startY + l * lineH);
        }
      }
    });
  }
}
