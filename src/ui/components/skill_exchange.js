/**
 * skill_exchange —— 技能释放演出弹层组件（半身立绘版）
 *
 * 与普通攻击的 CombatExchange（圆形头像 + 小卡片）刻意区分：
 *   本组件用【半身立绘】（assets/art/）铺满屏幕做演出，视觉简洁、聚焦人物，
 *   三态分别呈现不同反馈动画：
 *     1. 攻击（对敌 damage/debuff）：目标立绘【水平振动】+ 受击红光 + 命中音效；
 *     2. 回复（对友 heal / 增益 buff）：目标立绘【上下跳动】+ 绿/金光 + 治疗音效；
 *     3. 自身增益（self buff）：施法者单立绘居中【微微跳动】+ 金光。
 *   所有状态施法者在蓄势阶段都有金色光晕（呼吸感），表示"正在施法"。
 *
 * 挂接方式与 CombatExchange / ItemModal 完全一致：
 *   bs.skillExchangeModal = new SkillExchange(canvas, config, onClose);
 *   主循环 render()；点击/键盘路由进 modal.handleClick / handleKeyDown；
 *   时间线由 main.js 驱动：
 *     await modal.play();   // 蓄势 → 释放 → 定格 播完
 *     modal.finish();       // 出「确认」按钮，玩家确认后 onClose 触发
 *
 * 分层原则（与 ui_kit 一致）：planCastSegment / castViewAt / planSkillStage 纯计算
 * （Node 可单测）；SkillExchange.render* 只吃快照落笔，浏览器端才被调用。
 */
import { sound } from '../../engine/sound.js';
import { assetLoader } from '../../engine/asset_loader.js';
import {
  ModalBase, PALETTE, planBar, barRatio, lerp, easeOutCubic,
  fontCss, drawBar, drawOverlay,
} from './ui_kit.js';
import { artForUnit } from '../../engine/avatar.js';

/* ══════════════════════ 1. 常量 ══════════════════════ */

/** 技能演出节拍（ms）：蓄势 → 释放（立绘动画 + 效果文字弹出）→ 定格 */
export const CAST_TIMING = {
  WINDUP: 460,   // 施法者蓄势（金色光晕呼吸）
  RELEASE: 560,  // 效果释放（目标振动/跳动 + 效果文字弹出 + HP 条变化）
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
 * targetShake：攻击振动强度（0~1，release 阶段衰减）；targetBounce：回复跳动强度。
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
    targetShake: 0,
    targetBounce: 0,
  };

  if (t < segment.releaseAt) {
    v.phase = 'windup';
    v.casterGlow = true;
  } else if (t < segment.settleAt) {
    v.phase = 'release';
    v.effectVisible = true;
    const span = Math.max(1, segment.settleAt - segment.releaseAt);
    const p = easeOutCubic((t - segment.releaseAt) / span);
    v.targetHp = lerp(segment.hpBefore, segment.hpAfter, p);
    v.targetGhost = segment.hpBefore;
    const decay = 1 - p;
    // 攻击类（damage/debuff）振动；回复类（heal/buff）跳动
    if (segment.effectKind === 'damage' || segment.effectKind === 'debuff') {
      v.targetShake = decay;
    } else {
      v.targetBounce = decay;
    }
  } else {
    v.phase = 'settle';
    v.effectVisible = true;
    v.targetHp = segment.hpAfter;
    v.targetGhost = segment.hpBefore;
  }
  return v;
}

/* ══════════════════════ 3. 纯计算：舞台布局几何 ══════════════════════ */

/**
 * 技能舞台布局（全屏 960×540 设计稿）。半身立绘沿用对话立绘 240×320 比例。
 * hasTarget 时施法者左 / 目标右；self 时施法者单立绘居中。
 */
export function planSkillStage(canvasW, canvasH, hasTarget) {
  const PORTRAIT_W = 210;
  const PORTRAIT_H = 280;
  const topY = 108;
  const gapX = 80;

  const mk = (cx) => ({
    cx,
    x: cx - PORTRAIT_W / 2,
    y: topY,
    w: PORTRAIT_W,
    h: PORTRAIT_H,
    nameY: topY + PORTRAIT_H + 22,
    hpBar: { x: cx - 110, y: topY + PORTRAIT_H + 44, w: 220, h: 16 },
  });

  return {
    hasTarget,
    titleY: 36,
    effectY: 88,
    caster: mk(hasTarget ? gapX + PORTRAIT_W / 2 : canvasW / 2),
    target: hasTarget ? mk(canvasW - gapX - PORTRAIT_W / 2) : null,
  };
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
    this.box = this.setupBox(canvas.width, canvas.height, 0);

    const c = cfg.caster || {};
    const t = cfg.target || null;
    this.hasTarget = !!t;
    this.stage = planSkillStage(this.canvas.width, this.canvas.height, this.hasTarget);

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

    this.effect = formatSkillEffect(this.skill, cfg.result);

    const hpChange = numOr((cfg.result && cfg.result.hpChange) || 0, 0);
    const hpBase = this.hasTarget ? this.target.hp : this.caster.hp;
    const hpMax = this.hasTarget ? this.target.maxHp : this.caster.maxHp;
    this.hpBefore = Math.max(0, Math.min(hpBase, hpMax));
    const isHpEff = this.effect.kind === 'heal' || this.effect.kind === 'damage';
    this.hpAfter = Math.max(0, Math.min(this.hpBefore + (isHpEff ? hpChange : 0), hpMax));

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
    this.setButtons([{ id: 'ok', label: '确认' }], { anchorY: this.box.y + this.box.h - 78, btnH: 44 });
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

    // 全屏遮罩（保留地图若隐若现）+ 技能名标题
    drawOverlay(this.ctx, this.canvas.width, this.canvas.height);
    this._renderTitle();

    // 立绘：施法者（左/居中）+ 目标（右）
    this._renderArt(this.caster, this.stage.caster, v, false, true);
    if (this.hasTarget) {
      this._renderArt(this.target, this.stage.target, v, true, false);
      this._renderLink();
    }

    this._renderEffect(v);
    this.renderButtons();
  }

  /* ---------- 内部：绘制 ---------- */

  _renderTitle() {
    const ctx = this.ctx;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(30, 'bold');
    ctx.fillStyle = PALETTE.goldText;
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 8;
    ctx.fillText('✦ ' + (this.skill.name || '技能') + ' ✦', this.box.cx, this.stage.titleY);
    ctx.shadowBlur = 0;
  }

  /** 施法者 → 目标的连线（对敌红 / 对友绿），强化"谁对谁"的方向感 */
  _renderLink() {
    const ctx = this.ctx;
    const a = this.stage.caster;
    const b = this.stage.target;
    const isAlly = this.effect.kind === 'heal' || this.effect.kind === 'buff';
    const color = isAlly ? '#22c55e' : '#ef4444';
    const y = a.y + Math.round(a.h * 0.45);

    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(a.cx + a.w / 2 + 6, y);
    ctx.lineTo(b.cx - b.w / 2 - 6, y);
    ctx.stroke();
    ctx.restore();
  }

  /** 半身立绘 + 状态描边（蓄势金光 / 受击红光 / 回复绿金光）+ 名字/HP */
  _renderArt(side, card, v, isEffectSide, isCaster) {
    const ctx = this.ctx;
    const artUrl = artForUnit(side.unit);
    const img = artUrl ? assetLoader.getImage(artUrl) : null;

    let ox = 0, oy = 0;
    let ringColor = null, ringAlpha = 0;

    // 施法者蓄势金色光晕（呼吸）
    if (isCaster && v && v.casterGlow) {
      const pulse = 0.5 + 0.5 * Math.sin(this._vm / 90);
      ringColor = PALETTE.gold;
      ringAlpha = 0.45 + 0.35 * pulse;
    }
    // 目标动画：攻击振动 / 回复跳动 + 对应光环
    if (isEffectSide && v) {
      if (v.targetShake > 0) {
        ox = Math.round(v.targetShake * 9 * Math.sin(this._vm / 11));
        ringColor = '#ef4444';
        ringAlpha = v.targetShake * 0.55;
      }
      if (v.targetBounce > 0) {
        oy = -Math.round(v.targetBounce * 14 * Math.abs(Math.sin(this._vm / 75)));
        ringColor = this.effect.kind === 'heal' ? '#22c55e' : '#f59e0b';
        ringAlpha = v.targetBounce * 0.55;
      }
    }

    const px = card.x + ox;
    const py = card.y + oy;

    // 立绘本体（缺失时画占位框）
    if (img) {
      ctx.drawImage(img, px, py, card.w, card.h);
    } else {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, card.w, card.h);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = fontCss(48, 'bold');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(side.name.slice(0, 2), px + card.w / 2, py + card.h / 2);
      ctx.restore();
    }

    // 状态描边光环
    if (ringColor && ringAlpha > 0) {
      ctx.save();
      ctx.strokeStyle = ringColor;
      ctx.globalAlpha = ringAlpha;
      ctx.lineWidth = 5;
      ctx.shadowColor = ringColor;
      ctx.shadowBlur = 18;
      ctx.strokeRect(px - 3, py - 3, card.w + 6, card.h + 6);
      ctx.restore();
    }

    // 名字 + 等级 + HP 条
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(20, 'bold');
    ctx.fillStyle = '#fef3c7';
    ctx.fillText(`${side.name}  Lv.${side.level}`, card.cx, card.nameY);

    const hp = (isEffectSide && v && (this.effect.kind === 'heal' || this.effect.kind === 'damage'))
      ? v.targetHp
      : side.hp;
    const ghost = (isEffectSide && v && v.targetGhost != null) ? v.targetGhost : null;
    drawBar(ctx, planBar({
      kind: 'hp',
      x: card.hpBar.x, y: card.hpBar.y, w: card.hpBar.w, h: card.hpBar.h,
      ratio: barRatio(hp, side.maxHp),
      ghostRatio: ghost != null ? barRatio(ghost, side.maxHp) : null,
      label: '',
    }));
    ctx.font = fontCss(15, 'bold');
    ctx.fillStyle = '#fef3c7';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(hp)}/${side.maxHp}`, card.hpBar.x + card.hpBar.w / 2, card.hpBar.y + card.hpBar.h / 2);
  }

  /** 效果文字（释放阶段在顶部弹出，带缩放脉冲 + 颜色区分） */
  _renderEffect(v) {
    if (!v || !v.effectVisible) return;
    const ctx = this.ctx;
    const pulse = Math.sin(this._vm / 85);
    const scale = 1 + 0.05 * pulse;

    ctx.save();
    ctx.font = fontCss(Math.round(34 * scale), 'bold');
    ctx.fillStyle = v.effectColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.fillText(v.effectText, this.box.cx, this.stage.effectY);
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
