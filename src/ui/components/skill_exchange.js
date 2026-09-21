/**
 * skill_exchange —— 技能释放演出弹层组件
 *
 * 背景：普通攻击已有 CombatExchange 交战弹层（两头像互打），但技能此前只有地图浮字、
 * 没有专属 UI。本组件补齐技能 UI，让玩家明确看到「谁放技能、打/奶/强化了谁、效果多大」。
 *
 * 三态（由 skill.target + skill.effect.kind 决定）：
 *   1. 对敌技能（target='enemy'）：施法者 vs 目标 双头像，目标掉血(damage) 或 减益(debuff)；
 *   2. 对友技能（target='ally'）：施法者 vs 目标 双头像，目标回血(heal) 或 增益(buff)；
 *   3. 自身技能（target='self'）：施法者单头像居中，头顶亮增益(buff) 标记。
 *
 * 挂接方式与 CombatExchange / ItemModal 完全一致：
 *   bs.skillExchangeModal = new SkillExchange(canvas, config, onClose);
 *   主循环 render()；点击/键盘路由进 modal.handleClick / handleKeyDown；
 *   时间线由 main.js 驱动：
 *     await modal.play();   // 蓄势 → 释放 → 定格 播完
 *     modal.finish();       // 出「确认」按钮，玩家确认后 onClose 触发
 *
 * 分层原则（与 ui_kit 一致）：planCastSegment / castViewAt 纯计算（Node 可单测）；
 * SkillExchange.render* 只吃快照落笔，浏览器端才被调用。
 */
import { sound } from '../../engine/sound.js';
import {
  ModalBase, PALETTE, planBar, barRatio, lerp, easeOutCubic,
  fontCss, drawBar, drawAvatar, avatarFaceFor,
} from './ui_kit.js';

/* ══════════════════════ 1. 常量 ══════════════════════ */

/** 技能演出节拍（ms）：蓄势 → 释放（HP 变化/状态文字弹出）→ 定格 */
export const CAST_TIMING = {
  WINDUP: 460,   // 施法者蓄势（光圈亮起 + 技能名锁定）
  RELEASE: 560,  // 效果释放（HP 条变化 + 效果文字弹出）
  SETTLE: 760,   // 定格观察
};

/** 属性中文名（对齐 skill_menu 用语） */
const STAT_LABELS = {
  str: '物攻', mag: '魔攻', skl: '技巧', spd: '速度', luk: '幸运',
  def: '物防', res: '魔防', mov: '移动', avoid: '回避', hit: '命中', crit: '暴击',
};
const PERCENT_STATS = new Set(['avoid', 'hit', 'crit']);

/** 效果配色：治疗绿 / 伤害红 / 增益金 / 减益紫 */
const EFFECT_COLORS = {
  heal: '#22c55e',
  damage: '#ef4444',
  buff: '#f59e0b',
  debuff: '#a855f7',
};

/** 效果文字前缀：增益上箭头 / 减益下箭头，一眼区分正负 */
function effectPrefix(kind) {
  if (kind === 'buff') return '↑ ';
  if (kind === 'debuff') return '↓ ';
  return '';
}

function numOr(v, dflt) {
  return (typeof v === 'number' && Number.isFinite(v)) ? v : dflt;
}

/**
 * 生成效果文字：heal/damage 用 HP 变化量；buff/debuff 用属性增减。
 * @returns {{ kind: string, text: string, color: string }}
 */
export function formatSkillEffect(skill, result) {
  const eff = (skill && skill.effect) || {};
  const kind = (result && result.kind) || eff.kind || 'buff';
  const color = EFFECT_COLORS[kind] || EFFECT_COLORS.buff;

  if (kind === 'heal') {
    const n = Math.max(0, Math.floor(numOr(result.hpChange, 0)));
    return { kind, text: `HP +${n}`, color };
  }
  if (kind === 'damage') {
    const n = Math.max(0, Math.floor(Math.abs(numOr(result.hpChange, 0))));
    return { kind, text: `-${n}`, color };
  }

  // buff / debuff：列出每个属性变化
  const parts = [];
  for (const [k, v] of Object.entries(eff.stats || {})) {
    const name = STAT_LABELS[k] || k;
    const sign = v > 0 ? '+' : '';
    const unit = PERCENT_STATS.has(k) ? '%' : '';
    parts.push(`${name}${sign}${v}${unit}`);
  }
  const text = parts.length ? parts.join('  ') : (kind === 'debuff' ? '减益' : '增益');
  return { kind, text: effectPrefix(kind) + text, color };
}

/* ══════════════════════ 2. 纯计算：时间轴计划（Node 可单测） ══════════════════════ */

/**
 * 一次技能释放 → 时间轴段（kind:'cast'）。
 * info: { effectKind, effectText, effectColor, hpBefore, hpAfter }
 */
export function planCastSegment(info, startAt = 0) {
  info = info || {};
  const releaseAt = CAST_TIMING.WINDUP;
  const settleAt = releaseAt + CAST_TIMING.RELEASE;
  const duration = settleAt + CAST_TIMING.SETTLE;
  return {
    kind: 'cast',
    start: startAt,
    duration,
    end: startAt + duration,
    releaseAt,
    settleAt,
    effectKind: info.effectKind || 'buff',
    effectText: info.effectText || '',
    effectColor: info.effectColor || EFFECT_COLORS.buff,
    hpBefore: numOr(info.hpBefore, 0),
    hpAfter: numOr(info.hpAfter, 0),
  };
}

/**
 * 当前虚拟时钟 t 下的技能演出视觉快照（render 与单测共用）。
 */
export function castViewAt(segment, t) {
  const v = {
    phase: 'windup',
    casterGlow: false,
    targetHp: segment.hpBefore,
    targetGhost: null,
    effectVisible: false,
    effectText: segment.effectText,
    effectColor: segment.effectColor,
    effectKind: segment.effectKind,
  };

  if (t < segment.releaseAt) {
    v.phase = 'windup';
    v.casterGlow = true;
  } else if (t < segment.settleAt) {
    v.phase = 'release';
    v.casterGlow = true;
    v.effectVisible = true;
    const span = Math.max(1, segment.settleAt - segment.releaseAt);
    const p = easeOutCubic((t - segment.releaseAt) / span);
    v.targetHp = lerp(segment.hpBefore, segment.hpAfter, p);
    v.targetGhost = segment.hpBefore;
  } else {
    v.phase = 'settle';
    v.effectVisible = true;
    v.targetHp = segment.hpAfter;
    v.targetGhost = segment.hpBefore;
  }
  return v;
}

/* ══════════════════════ 3. 纯计算：卡片布局几何 ══════════════════════ */

/**
 * 技能弹层卡片布局。hasTarget 时双头像（施法者左 / 目标右），否则单头像居中（self）。
 */
export function planSkillCards(box, hasTarget) {
  const cardCy = box.y + Math.round(box.h * 0.34);
  const r = Math.max(34, Math.min(54, Math.round(box.w * 0.072)));
  const half = Math.round(box.w * 0.26);
  const barW = Math.min(260, Math.round(box.w * 0.34));

  const mk = (cx) => {
    const nameY = cardCy + r + 26;
    const levelY = nameY + 20;
    const hpBar = { x: cx - barW / 2, y: levelY + 22, w: barW, h: 20 };
    return {
      avatar: { cx, cy: cardCy, r },
      nameY,
      levelY,
      hpBar,
      // 效果文字挂在头像上方（释放在目标/施法者头顶弹出）
      effectY: cardCy - r - 30,
    };
  };

  if (hasTarget) {
    return {
      hasTarget: true,
      caster: mk(box.cx - half),
      target: mk(box.cx + half),
    };
  }
  return { hasTarget: false, caster: mk(box.cx), target: null };
}

/* ══════════════════════ 4. 组件（浏览器端落笔） ══════════════════════ */

const defaultNow = () => (typeof performance !== 'undefined' && typeof performance.now === 'function')
  ? performance.now()
  : Date.now();

/**
 * config: {
 *   skill: { name, target, effect },      // 技能对象
 *   caster: { name, level, hp, maxHp, faction, unit },  // 施法者快照
 *   target: { ... } | null,               // 目标快照（self 技能传 null）
 *   result: { kind, text, hpChange },     // skill_service.applySkill 的返回
 * }
 */
export class SkillExchange extends ModalBase {
  constructor(canvas, config, onClose) {
    const cfg = config || {};
    super(canvas, cfg, onClose);

    this.skill = cfg.skill || {};
    this.box = this.setupBox(760, 500);

    const c = cfg.caster || {};
    const t = cfg.target || null;
    this.hasTarget = !!t;
    this.cards = planSkillCards(this.box, this.hasTarget);

    const mkSide = (s) => ({
      name: s.name || '?',
      level: numOr(s.level, 1),
      maxHp: numOr(s.maxHp, 0) > 0 ? s.maxHp : Math.max(1, numOr(s.hp, 1)),
      hp: Math.max(0, numOr(s.hp, 0)),
      faction: s.faction || 'player',
      unit: s.unit || null,
    });
    this.caster = mkSide(c);
    this.target = t ? mkSide(t) : null;

    // 效果文字 + 配色（heal/damage 用 result.hpChange；buff/debuff 用 skill.effect）
    this.effect = formatSkillEffect(this.skill, cfg.result);

    // HP 变化量（heal 正 / damage 负）；buff/debuff 为 0，HP 条静态
    const hpChange = numOr((cfg.result && cfg.result.hpChange) || 0, 0);
    this.hpBefore = Math.max(0, Math.min(this.hasTarget ? this.target.hp : this.caster.hp,
      this.hasTarget ? this.target.maxHp : this.caster.maxHp));
    this.hpAfter = Math.max(0, Math.min(this.hpBefore + (this.effect.kind === 'heal' || this.effect.kind === 'damage' ? hpChange : 0),
      this.hasTarget ? this.target.maxHp : this.caster.maxHp));

    // 时间轴状态（虚拟时钟，由 render 推进）
    this._vm = 0;
    this._lastEnd = 0;
    this._segment = null;
    this._pending = [];
    this._sfxQueue = [];
    this._timelineEnded = false;
    this._lastRealNow = null;
    this._now = typeof cfg._now === 'function' ? cfg._now : defaultNow;
  }

  get view() {
    if (!this._segment) return null;
    return castViewAt(this._segment, this._vm);
  }

  /** 技能演出入时间轴：返回 Promise（蓄势→释放→定格播完 resolve） */
  async play() {
    const seg = planCastSegment({
      effectKind: this.effect.kind,
      effectText: this.effect.text,
      effectColor: this.effect.color,
      hpBefore: this.hpBefore,
      hpAfter: this.hpAfter,
    }, this._lastEnd);
    this._segment = seg;
    this._lastEnd = seg.end;

    // 时间轴音效：蓄势悬疑响 → 释放效果音（治疗/增益用 item_use，伤害用 hit，减益用 suspense）
    this._queueSfx(seg.start, 'sfx_shock_sting');
    const castSfx = (this.effect.kind === 'heal' || this.effect.kind === 'buff')
      ? 'sfx_item_use'
      : (this.effect.kind === 'debuff' ? 'sfx_suspense' : 'sfx_hit_normal');
    this._queueSfx(seg.start + seg.releaseAt, castSfx);
    return this._waitUntil(seg.end);
  }

  /** 时间轴播完：出「确认」按钮，此后可点击/Enter/ESC 关闭 */
  finish() {
    if (this._timelineEnded) return;
    this._timelineEnded = true;
    this.selectable = true;
    this.setButtons([{ id: 'ok', label: '确认' }]);
  }

  /** 时间轴未完时吞掉一切输入（技能演出不可跳过/不可误关） */
  handleClick(px, py) { // eslint-disable-line no-unused-vars
    if (!this._timelineEnded) return true;
    return super.handleClick(px, py);
  }

  handleKeyDown(e) {
    if (!this._timelineEnded) return true;
    return super.handleKeyDown(e);
  }

  render() {
    this._advanceReal();
    const v = this.view;
    if (!v) return;
    this.renderFrame(this.skill.name || '技能');

    if (this.hasTarget) {
      this._renderSide('caster', this.caster, this.cards.caster, v, false);
      this._renderSide('target', this.target, this.cards.target, v, true);
      this._renderTargetArrow();
    } else {
      this._renderSide('caster', this.caster, this.cards.caster, v, true);
    }

    this._renderEffect(v);
    this.renderButtons();
  }

  /* ---------- 内部：绘制 ---------- */

  /** 施法者指向目标的方向箭头（对敌红 / 对友绿） */
  _renderTargetArrow() {
    const ctx = this.ctx;
    const a = this.cards.caster.avatar;
    const b = this.cards.target.avatar;
    const midX = (a.cx + b.cx) / 2;
    const dir = (this.effect.kind === 'heal' || this.effect.kind === 'buff') ? 'ally' : 'enemy';
    const color = dir === 'ally' ? '#22c55e' : '#ef4444';

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(a.cx + a.r + 8, a.cy);
    ctx.lineTo(b.cx - b.r - 8, b.cy);
    ctx.stroke();
    // 箭头尖（指向目标）
    const tipX = b.cx - b.r - 12;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(tipX, b.cy - 9);
    ctx.lineTo(tipX + 16, b.cy);
    ctx.lineTo(tipX, b.cy + 9);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    void midX;
  }

  /** 单侧头像卡：头像 + 名字/等级 + HP 条 + （受击震动） */
  _renderSide(sideKey, side, card, v, isEffectSide) {
    const ctx = this.ctx;
    const hp = (isEffectSide && v && (this.effect.kind === 'heal' || this.effect.kind === 'damage'))
      ? v.targetHp
      : side.hp;
    const ghost = (isEffectSide && v && v.targetGhost != null) ? v.targetGhost : null;

    // 施法者金色光圈（蓄势/释放期间亮起）
    const glow = (sideKey === 'caster') && v && v.casterGlow;
    if (glow) {
      ctx.save();
      ctx.strokeStyle = PALETTE.gold;
      ctx.lineWidth = 5;
      ctx.shadowColor = 'rgba(250, 204, 21, 0.9)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(card.avatar.cx, card.avatar.cy, card.avatar.r + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const face = avatarFaceFor(side.unit || { name: side.name, faction: side.faction });
    drawAvatar(ctx, { ...card.avatar, ...face, faction: side.faction });

    // 名字 + 等级
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(21, 'bold');
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText(side.name, card.avatar.cx, card.nameY);
    ctx.font = fontCss(14, 'bold');
    ctx.fillStyle = PALETTE.title;
    ctx.fillText(`Lv.${side.level}`, card.avatar.cx, card.levelY);

    // HP 条（heal/damage 时变化段残影随 release 缓动；buff/debuff 静态）
    drawBar(ctx, planBar({
      kind: 'hp',
      x: card.hpBar.x, y: card.hpBar.y, w: card.hpBar.w, h: card.hpBar.h,
      ratio: barRatio(hp, side.maxHp),
      ghostRatio: ghost != null ? barRatio(ghost, side.maxHp) : null,
      label: '',
    }));
    ctx.font = fontCss(16, 'bold');
    ctx.fillStyle = PALETTE.ink;
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(hp)}/${side.maxHp}`, card.hpBar.x + card.hpBar.w / 2, card.hpBar.y + card.hpBar.h / 2);
  }

  /** 效果文字（释放阶段在受效侧头像上方弹出，带缩放脉冲） */
  _renderEffect(v) {
    if (!v || !v.effectVisible) return;
    const ctx = this.ctx;
    const card = this.hasTarget ? this.cards.target : this.cards.caster;

    // 释放阶段缩放脉冲（用虚拟时钟，与受击同源，不受帧率抖动影响）
    const pulse = Math.sin(this._vm / 85);
    const scale = 1 + 0.06 * pulse;

    ctx.save();
    ctx.font = fontCss(Math.round(30 * scale), 'bold');
    ctx.fillStyle = v.effectColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 6;
    ctx.fillText(v.effectText, card.avatar.cx, card.effectY);
    ctx.restore();
  }

  /* ---------- 内部：虚拟时钟 ---------- */

  _advanceReal() {
    const now = this._now();
    if (this._lastRealNow == null) { this._lastRealNow = now; return; }
    let dt = now - this._lastRealNow;
    this._lastRealNow = now;
    if (dt < 0) dt = 0;
    if (dt > 250) dt = 250;
    this._advanceVirtual(dt);
  }

  _advanceVirtual(dtMs) {
    const dt = (typeof dtMs === 'number' && dtMs > 0) ? dtMs : 0;
    if (this._vm < this._lastEnd) {
      this._vm = Math.min(this._vm + dt, this._lastEnd);
    }
    if (this._sfxQueue.length) {
      const due = this._sfxQueue.filter(s => s.at <= this._vm);
      if (due.length) {
        this._sfxQueue = this._sfxQueue.filter(s => s.at > this._vm);
        due.forEach(s => sound.playSfx(s.sfx));
      }
    }
    if (this._pending.length) {
      const ready = this._pending.filter(p => this._vm >= p.until);
      if (ready.length) {
        this._pending = this._pending.filter(p => this._vm < p.until);
        ready.forEach(p => p.resolve());
      }
    }
  }

  _queueSfx(atMs, sfxName) {
    this._sfxQueue.push({ at: atMs, sfx: sfxName });
  }

  _waitUntil(untilMs) {
    if (this._vm >= untilMs) return Promise.resolve();
    return new Promise((resolve) => this._pending.push({ until: untilMs, resolve }));
  }
}
