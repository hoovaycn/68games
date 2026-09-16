/**
 * combat_exchange —— 交战过程弹层组件（走位 → 交手 → 出 UI 的"出 UI"环节）
 *
 * 职责（取代地图上 -N 浮字）：
 *   1. 双方头像卡 + HP 条：A 击打 B，B 的 HP 条掉血（ghost 暖白残影标示掉落段）；
 *   2. B 反击 A：A 的 HP 条掉血；追击/反击追击同构复用；
 *   3. 我方经验条增长：普通增长 + 升级时"充能→满→横幅→回卷"动画；
 *   4. 全程时间轴驱动音效（挥击/命中/暴击/闪避/升级），main.js 只管掷骰与真实扣血。
 *
 * 挂接方式与 ItemModal / VictoryModal 完全一致：
 *   bs.combatExchangeModal = new CombatExchange(canvas, config, onClose);
 *   主循环 render()；点击/键盘路由进 modal.handleClick / handleKeyDown；
 *   时间线由 main.js 串行驱动：
 *     await modal.playStrike({...});  // 每次交手
 *     await modal.playExp({...});     // 战后经验
 *     modal.finish();                 // 出"确认"按钮，玩家确认后 onClose 触发
 *
 * 分层原则（与 ui_kit 一致）：
 *   plan* / exchangeViewAt —— 纯计算（时间轴计划 + 任意时刻视觉快照），Node 可单测；
 *   CombatExchange.render* —— 只吃快照落笔，浏览器端才被调用。
 */
import { sound } from '../../engine/sound.js';
import {
  ModalBase, PALETTE, planBar, barRatio, lerp, easeOutCubic,
  fontCss, drawBar, drawAvatar, avatarFaceFor,
} from './ui_kit.js';

/* ══════════════════════ 1. 时间轴节拍（纯常量） ══════════════════════ */

/** 单次交击节拍（ms）：出手蓄势 → 命中帧 → HP 掉落 → 定格观察 */
export const STRIKE_TIMING = {
  WINDUP: 170,       // 出手蓄势（弹层内与地图突进动画并行）
  IMPACT: 90,        // 命中帧（伤害数字弹出，HP 尚未动）
  DROP: 320,         // 普通命中 HP 条掉落
  DROP_CRIT: 400,    // 暴击 HP 条掉落（更长更重）
  SETTLE: 130,       // 命中后定格
  SETTLE_CRIT: 200,  // 暴击后定格
  DODGE: 110,        // MISS：闪避动作
  SETTLE_MISS: 220,  // MISS：停留观察
};

/** 经验条节拍（ms）：充能 → 增长 → （升级：满格横幅 → 回卷） → 定格 */
export const EXP_TIMING = {
  CHARGE: 180,       // 充能（条尚未动，文字先出）
  GROWTH: 420,       // 普通：before → after
  GROWTH_WRAP: 300,  // 升级：before → 满格
  BANNER: 480,       // 升级横幅 + 升级音效
  REFILL: 320,       // 满格 → 0 → 新等级 after
  SETTLE: 120,       // 定格
};

/* ══════════════════════ 2. 纯计算：时间轴计划（Node 可单测） ══════════════════════ */

function numOr(v, dflt) {
  return (typeof v === 'number' && Number.isFinite(v)) ? v : dflt;
}

function clampNum(v, lo, hi) {
  return Math.min(hi, Math.max(lo, numOr(v, lo)));
}

/**
 * 一次交击 → 时间轴段（kind:'strike'）。
 * info: { srcSide:'attacker'|'defender', srcName, dstName, label(先手/反击/追击…),
 *         isHit, isCrit, damage, dstHpBefore(被击者打前 HP), dstMaxHp }
 * 伤害与扣血公式必须与 main.js 保持同源：hpAfter = clamp(hpBefore - damage, 0, maxHp)
 */
export function planStrikeSegment(info, startAt = 0) {
  info = info || {};
  const srcSide = info.srcSide === 'defender' ? 'defender' : 'attacker';
  const dstSide = srcSide === 'attacker' ? 'defender' : 'attacker';
  const isHit = !!info.isHit;
  const isCrit = isHit && !!info.isCrit;
  const damage = Math.max(0, Math.floor(numOr(info.damage, 0)));
  const hpBefore = Math.max(0, numOr(info.dstHpBefore, 0));
  const maxHp = numOr(info.dstMaxHp, 0) > 0 ? info.dstMaxHp : Math.max(1, hpBefore);
  const hpAfter = Math.max(0, Math.min(hpBefore - (isHit ? damage : 0), maxHp));

  let duration, impactAt, dropAt = null, settleAt = null;
  if (!isHit) {
    impactAt = STRIKE_TIMING.WINDUP + STRIKE_TIMING.DODGE;         // 280：闪避定格点
    duration = impactAt + STRIKE_TIMING.SETTLE_MISS;               // 500
  } else if (isCrit) {
    impactAt = STRIKE_TIMING.WINDUP;                               // 170
    dropAt = impactAt + STRIKE_TIMING.IMPACT;                      // 260
    settleAt = dropAt + STRIKE_TIMING.DROP_CRIT;                   // 660
    duration = settleAt + STRIKE_TIMING.SETTLE_CRIT;               // 860
  } else {
    impactAt = STRIKE_TIMING.WINDUP;                               // 170
    dropAt = impactAt + STRIKE_TIMING.IMPACT;                      // 260
    settleAt = dropAt + STRIKE_TIMING.DROP;                        // 580
    duration = settleAt + STRIKE_TIMING.SETTLE;                    // 710
  }

  return {
    kind: 'strike', start: startAt, duration, end: startAt + duration,
    impactAt, dropAt, settleAt,
    srcSide, dstSide,
    srcName: info.srcName || '攻方', dstName: info.dstName || '守方',
    label: info.label || '',
    isHit, isCrit, damage,
    hpBefore, hpAfter, maxHp,
  };
}

/**
 * 一次经验结算 → 时间轴段（kind:'exp'）。
 * info: { side, name, amount, before, after, leveledUp, levelBefore, levelAfter, maxExp }
 * leveledUp 时动画为：增长到满格 → 升级横幅 → 回卷 → 新等级值。
 */
export function planExpSegment(info, startAt = 0) {
  info = info || {};
  const maxExp = numOr(info.maxExp, 0) > 0 ? info.maxExp : 100;
  const before = clampNum(info.before, 0, maxExp);
  const after = clampNum(info.after, 0, maxExp);
  const leveledUp = !!info.leveledUp;
  const levelBefore = numOr(info.levelBefore, null);
  const levelAfter = numOr(info.levelAfter,
    levelBefore != null ? levelBefore + 1 : null);

  const growthAt = EXP_TIMING.CHARGE;
  let bannerAt = null, refillAt = null, duration;
  if (leveledUp) {
    bannerAt = growthAt + EXP_TIMING.GROWTH_WRAP;                       // 480
    refillAt = bannerAt + EXP_TIMING.BANNER;                            // 960
    duration = refillAt + EXP_TIMING.REFILL + EXP_TIMING.SETTLE;        // 1400
  } else {
    duration = growthAt + EXP_TIMING.GROWTH + EXP_TIMING.SETTLE;        // 720
  }

  return {
    kind: 'exp', start: startAt, duration, end: startAt + duration,
    growthAt, bannerAt, refillAt,
    side: info.side === 'defender' ? 'defender' : 'attacker',
    name: info.name || '我方',
    amount: Math.max(0, numOr(info.amount, 0)),
    before, after, leveledUp, levelBefore, levelAfter, maxExp,
  };
}

/* ══════════════════════ 3. 纯计算：任意时刻视觉快照（Node 可单测） ══════════════════════ */

/**
 * 时间轴在 elapsed(ms) 处的完整视觉快照。
 * segments: planStrikeSegment / planExpSegment 产物（start 必须单调递增）。
 * initial:  { attackerHp, defenderHp, exp: null | { current, maxExp, level } }
 * 返回: {
 *   phase, activeIndex, strikingSide,
 *   attackerHp, defenderHp, attackerGhost, defenderGhost,
 *   reportText, damageText, damageKind,
 *   expVisible, expShown, expGhost, expGained, expLevel,
 *   levelUpText, timelineDone,
 * }
 */
export function exchangeViewAt(segments, elapsed, initial) {
  const init = initial || {};
  const st = {
    attackerHp: Math.max(0, numOr(init.attackerHp, 0)),
    defenderHp: Math.max(0, numOr(init.defenderHp, 0)),
    expShown: init.exp ? clampNum(init.exp.current, 0, numOr(init.exp.maxExp, 100)) : 0,
    expLevel: init.exp ? numOr(init.exp.level, 1) : null,
  };

  const view = {
    phase: 'idle', activeIndex: -1, strikingSide: null,
    attackerHp: st.attackerHp, defenderHp: st.defenderHp,
    attackerGhost: null, defenderGhost: null,
    reportText: null, damageText: null, damageKind: null,
    expVisible: !!init.exp, expShown: st.expShown, expGhost: null,
    expGained: null, expLevel: st.expLevel,
    levelUpText: null,
    timelineDone: true,
  };

  const list = Array.isArray(segments) ? segments : [];
  if (list.length) view.timelineDone = false;

  for (let i = 0; i < list.length; i++) {
    const seg = list[i];
    if (!(seg && typeof seg.start === 'number')) continue;
    if (seg.start > elapsed) break;                 // 还没轮到：维持累计快照
    const t = elapsed - seg.start;
    if (t >= seg.duration) {
      // 段已完整结束：吸收终态后继续看下一段
      if (seg.kind === 'strike') st[seg.dstSide + 'Hp'] = seg.hpAfter;
      else if (seg.kind === 'exp') {
        st.expShown = seg.after;
        st.expLevel = seg.leveledUp ? seg.levelAfter : st.expLevel;
      }
      continue;
    }
    view.activeIndex = i;
    return seg.kind === 'exp'
      ? expSegmentView(seg, t, st, view)
      : strikeSegmentView(seg, t, st, view);
  }

  // 走完所有段（或停在段间隙）：同步累计值
  view.attackerHp = st.attackerHp;
  view.defenderHp = st.defenderHp;
  view.expShown = st.expShown;
  view.expLevel = st.expLevel;
  if (list.length) {
    const last = list[list.length - 1];
    view.timelineDone = elapsed >= last.start + last.duration;
  }
  return view;
}

/** 交击段的段内视图（内聚文案生成，保证动画与文字同步） */
function strikeSegmentView(seg, t, st, base) {
  const v = { ...base, strikingSide: seg.srcSide };
  v.attackerHp = st.attackerHp;
  v.defenderHp = st.defenderHp;

  const label = seg.label ? `【${seg.label}】` : '';
  const applyHitText = () => {
    v.damageText = (seg.isCrit ? '暴击 -' : '-') + seg.damage;
    v.damageKind = seg.isCrit ? 'crit' : 'hit';
    v.reportText = `${seg.dstName}受到${seg.damage}点伤害${seg.isCrit ? '（暴击！）' : ''}`;
  };

  if (!seg.isHit) {
    if (t < seg.impactAt) {
      v.phase = 'windup';
      v.reportText = `${seg.srcName}${label}发起攻击`;
    } else {
      v.phase = 'miss';
      v.damageText = 'MISS';
      v.damageKind = 'miss';
      v.reportText = `${seg.dstName}灵巧地闪开了`;
    }
    return v;
  }

  if (t < seg.impactAt) {
    v.phase = 'windup';
    v.reportText = `${seg.srcName}${label}发起攻击`;
  } else if (t < seg.dropAt) {
    v.phase = 'impact';
    applyHitText();
  } else if (t < seg.settleAt) {
    v.phase = 'drop';
    const span = Math.max(1, seg.settleAt - seg.dropAt);
    const p = easeOutCubic((t - seg.dropAt) / span);
    v[seg.dstSide + 'Hp'] = lerp(seg.hpBefore, seg.hpAfter, p);
    v[seg.dstSide + 'Ghost'] = seg.hpBefore;
    applyHitText();
  } else {
    v.phase = 'settle';
    v[seg.dstSide + 'Hp'] = seg.hpAfter;
    v[seg.dstSide + 'Ghost'] = seg.hpBefore;
    applyHitText();
  }
  return v;
}

/** 经验段的段内视图 */
function expSegmentView(seg, t, st, base) {
  const v = { ...base };
  v.attackerHp = st.attackerHp;
  v.defenderHp = st.defenderHp;
  v.expVisible = true;
  v.expGained = seg.amount > 0 ? seg.amount : null;
  v.reportText = `${seg.name}获得${seg.amount}点经验`;

  const levelUpText = seg.leveledUp
    ? `等级提升！ Lv.${seg.levelBefore} → Lv.${seg.levelAfter}` : null;

  if (t < seg.growthAt) {
    v.phase = 'exp-charge';
    v.expShown = seg.before;
    return v;
  }

  if (!seg.leveledUp) {
    const settleAt = seg.duration - EXP_TIMING.SETTLE;
    if (t < settleAt) {
      v.phase = 'exp-growth';
      const p = easeOutCubic((t - seg.growthAt) / Math.max(1, EXP_TIMING.GROWTH));
      v.expShown = lerp(seg.before, seg.after, p);
      v.expGhost = seg.before;
    } else {
      v.phase = 'exp-settle';
      v.expShown = seg.after;
    }
    return v;
  }

  const settleAt = seg.duration - EXP_TIMING.SETTLE;
  if (t < seg.bannerAt) {
    // 增长到满格
    v.phase = 'exp-growth';
    const p = easeOutCubic((t - seg.growthAt) / Math.max(1, EXP_TIMING.GROWTH_WRAP));
    v.expShown = lerp(seg.before, seg.maxExp, p);
    v.expGhost = seg.before;
  } else if (t < seg.refillAt) {
    // 升级横幅（满格定格）：等级行从横幅帧起就跳到新等级
    v.phase = 'exp-banner';
    v.expShown = seg.maxExp;
    v.levelUpText = levelUpText;
    v.expLevel = seg.levelAfter;
  } else if (t < settleAt) {
    // 回卷：从 0 涨到新等级经验
    v.phase = 'exp-refill';
    const p = easeOutCubic((t - seg.refillAt) / Math.max(1, EXP_TIMING.REFILL));
    v.expShown = lerp(0, seg.after, p);
    v.levelUpText = levelUpText;
    v.expLevel = seg.levelAfter;
  } else {
    v.phase = 'exp-settle';
    v.expShown = seg.after;
    v.levelUpText = levelUpText;
    v.expLevel = seg.levelAfter;
  }
  return v;
}

/* ══════════════════════ 4. 纯计算：卡片布局几何 ══════════════════════ */

/**
 * 弹层内双方交战卡 + 战报 + 经验条布局（相对 box 计算，自适应收缩画布）。
 * 垂直预算（500 高基准）：标题 → 头像行（中轴 VS 徽章）→ 名字/等级（主副分层）→
 * HP 条 → 伤害数字 → 升级横幅/战报 → +N/EXP 条区 → 确认按钮（planButtonRow 贴底）。
 * 卡内节奏统一 28：头像缘→名 / 名行→等级副行 / 名区→条 25 / 条底→伤害数字 28。
 */
export function planExchangeCards(box) {
  const cardCy = box.y + Math.round(box.h * 0.30);
  const r = Math.max(34, Math.min(52, Math.round(box.w * 0.068)));
  const half = Math.round(box.w * 0.29);
  const barW = Math.min(280, Math.round(box.w * 0.38));
  const expBar = {
    x: box.x + Math.round(box.w * 0.15),
    y: box.y + Math.round(box.h * 0.76),
    w: Math.round(box.w * 0.70),
    h: 16,
  };

  const mk = (dir) => {
    const cx = box.cx + dir * half;
    const nameY = cardCy + r + 28;
    const levelY = nameY + 21;
    const hpBar = { x: cx - barW / 2, y: levelY + 25, w: barW, h: 20 };
    return {
      avatar: { cx, cy: cardCy, r },
      nameY,
      levelY,
      hpBar,
      damageY: hpBar.y + hpBar.h + 28,
    };
  };

  return {
    attacker: mk(-1),
    defender: mk(1),
    vs: { cx: box.cx, cy: cardCy, r: Math.max(16, Math.min(24, Math.round(r * 0.48))) },
    levelUpY: box.y + Math.round(box.h * 0.60),
    reportY: box.y + Math.round(box.h * 0.66),
    expBar,
    // +N 数字几何锚（条上方 20）：与报告行拉开净空，不与 18px 战报带重叠
    expLabelY: expBar.y - 20,
  };
}

/* ══════════════════════ 5. 组件（浏览器端落笔，单测走纯函数与假时钟） ══════════════════════ */

const defaultNow = () => (typeof performance !== 'undefined' && typeof performance.now === 'function')
  ? performance.now()
  : Date.now();

/**
 * config: {
 *   attacker: { name, level, hp, maxHp, faction, unit? },  // hp = 开战时快照
 *   defender: { ... },
 *   playerSide: 'attacker' | 'defender' | null,            // 我方所在侧（经验条归属）
 *   exp: { current, max, level } | null,                   // 我方开战时经验快照
 * }
 */
export class CombatExchange extends ModalBase {
  constructor(canvas, config, onClose) {
    const cfg = config || {};
    super(canvas, cfg, onClose);
    this.box = this.setupBox(760, 500);
    this.cards = planExchangeCards(this.box);

    const a = cfg.attacker || {};
    const d = cfg.defender || {};
    const mkSide = (s) => ({
      name: s.name || '?',
      level: numOr(s.level, 1),
      maxHp: numOr(s.maxHp, 0) > 0 ? s.maxHp : Math.max(1, numOr(s.hp, 1)),
      faction: s.faction || 'player',
      unit: s.unit || null,
    });
    this.sides = { attacker: mkSide(a), defender: mkSide(d) };

    const hp0a = Math.max(0, numOr(a.hp, this.sides.attacker.maxHp));
    const hp0d = Math.max(0, numOr(d.hp, this.sides.defender.maxHp));
    this.playerSide = (cfg.playerSide === 'attacker' || cfg.playerSide === 'defender')
      ? cfg.playerSide : null;

    const ex = cfg.exp || null;
    this.expMax = ex && numOr(ex.max, 0) > 0 ? ex.max : 100;
    this.initial = {
      attackerHp: hp0a,
      defenderHp: hp0d,
      exp: (ex && this.playerSide)
        ? {
            current: clampNum(ex.current, 0, this.expMax),
            maxExp: this.expMax,
            level: numOr(ex.level, 1),
          }
        : null,
    };

    // 时间轴状态（虚拟时钟，由 render 推进；单测可直接 _advanceVirtual）
    this.segments = [];
    this.hpTrack = { attacker: hp0a, defender: hp0d };
    this._lastEnd = 0;
    this._vm = 0;
    this._pending = [];     // { until, resolve }
    this._sfxQueue = [];    // { at, sfx }
    this._timelineEnded = false;
    this._lastRealNow = null;
    this._now = typeof cfg._now === 'function' ? cfg._now : defaultNow;
  }

  /** 当前虚拟时钟下的视觉快照（render 与单测共用） */
  get view() {
    return exchangeViewAt(this.segments, this._vm, this.initial);
  }

  /** 一次交击入时间轴：返回 Promise（该段播完 resolve），期间 HP 掉血动画呈现 */
  async playStrike(info = {}) {
    const srcSide = info.srcSide === 'defender' ? 'defender' : 'attacker';
    const dstSide = srcSide === 'attacker' ? 'defender' : 'attacker';
    const seg = planStrikeSegment({
      ...info,
      srcSide,
      srcName: info.srcName || this.sides[srcSide].name,
      dstName: info.dstName || this.sides[dstSide].name,
      dstHpBefore: info.dstHpBefore != null ? info.dstHpBefore : this.hpTrack[dstSide],
      dstMaxHp: this.sides[dstSide].maxHp,
    }, this._lastEnd);
    this.segments.push(seg);
    this.hpTrack[dstSide] = seg.hpAfter;
    this._lastEnd = seg.end;

    // 时间轴音效：出手挥击 + 命中/闪避
    this._queueSfx(seg.start, 'sfx_attack_swing');
    this._queueSfx(seg.start + seg.impactAt,
      seg.isHit ? (seg.isCrit ? 'sfx_hit_crit' : 'sfx_hit_normal') : 'sfx_miss');
    return this._waitUntil(seg.end);
  }

  /** 战后经验入时间轴：普通增长 / 升级（满格→横幅→回卷） */
  async playExp(info = {}) {
    const side = info.side === 'defender' ? 'defender' : 'attacker';
    const seg = planExpSegment({
      ...info,
      side,
      name: info.name || this.sides[side].name,
      maxExp: this.expMax,
    }, this._lastEnd);
    this.segments.push(seg);
    this._lastEnd = seg.end;

    if (seg.leveledUp && seg.bannerAt != null) {
      this._queueSfx(seg.start + seg.bannerAt, 'sfx_level_up');
    }
    return this._waitUntil(seg.end);
  }

  /** 时间轴全部排完：出"确认"按钮，此后可点击/Enter/ESC 关闭 */
  finish() {
    if (this._timelineEnded) return;
    this._timelineEnded = true;
    this.selectable = true;
    this.setButtons([{ id: 'ok', label: '确认' }]);
  }

  /** 时间轴未完时吞掉一切输入（战斗演出不可跳过/不可误关） */
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
    this.renderFrame(`${this.sides.attacker.name} VS ${this.sides.defender.name}`);
    this._renderVs();
    this._renderSide('attacker', v);
    this._renderSide('defender', v);
    this._renderReport(v);
    this._renderExp(v);
    this.renderButtons();
  }

  /* ---------- 内部：绘制 ---------- */

  /** 中轴 VS 徽章：外环淡金 + 纸底金框圆 + accent 大字（整卡界面中轴对称锚） */
  _renderVs() {
    const ctx = this.ctx;
    const vs = this.cards.vs;
    ctx.save();
    ctx.beginPath();
    ctx.arc(vs.cx, vs.cy, vs.r + 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(vs.cx, vs.cy, vs.r, 0, Math.PI * 2);
    ctx.fillStyle = PALETTE.paper;
    ctx.fill();
    ctx.strokeStyle = PALETTE.gold;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.font = fontCss(18, 'bold');
    ctx.fillStyle = PALETTE.accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VS', vs.cx, vs.cy + 1);
    ctx.restore();
  }

  _renderSide(side, v) {
    const ctx = this.ctx;
    const cfg = this.sides[side];
    const card = this.cards[side];
    const hp = v[side + 'Hp'];
    const ghost = v[side + 'Ghost'];

    // 出招方金色光圈（进攻指示）
    if (v.strikingSide === side) {
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

    const face = avatarFaceFor(cfg.unit || { name: cfg.name, faction: cfg.faction });
    drawAvatar(ctx, { ...card.avatar, ...face, faction: cfg.faction });

    // 名字（主 21 深）/ 等级（副 14 琥珀，经验段升级后实时跟走）—— 主大副小分层
    const lv = (this.playerSide === side && v.expLevel != null) ? v.expLevel : cfg.level;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(21, 'bold');
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText(cfg.name, card.avatar.cx, card.nameY);
    ctx.font = fontCss(14, 'bold');
    ctx.fillStyle = PALETTE.title;
    ctx.fillText(`Lv.${lv}`, card.avatar.cx, card.levelY);

    // HP 条（ghost = 掉血前残影）。条身不带条外文字，避免两卡文字顶出弹框边线
    drawBar(ctx, planBar({
      kind: 'hp',
      x: card.hpBar.x, y: card.hpBar.y, w: card.hpBar.w, h: card.hpBar.h,
      ratio: barRatio(hp, cfg.maxHp),
      ghostRatio: ghost != null ? barRatio(ghost, cfg.maxHp) : null,
      label: '',
    }));

    // 数值镜像面向中轴：攻方画条右外（朝中）、守方画条左外（朝中），整行对称
    ctx.font = fontCss(16, 'bold');
    ctx.fillStyle = PALETTE.ink;
    if (side === 'attacker') {
      ctx.textAlign = 'left';
      ctx.fillText(`${Math.round(hp)}/${cfg.maxHp}`,
        card.hpBar.x + card.hpBar.w + 8, card.hpBar.y + card.hpBar.h / 2);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(hp)}/${cfg.maxHp}`,
        card.hpBar.x - 8, card.hpBar.y + card.hpBar.h / 2);
    }

    // 伤害数字（只画在被击侧）
    const seg = this.segments[v.activeIndex];
    if (seg && seg.kind === 'strike' && seg.dstSide === side && v.damageText) {
      ctx.font = fontCss(26, 'bold');
      ctx.fillStyle = v.damageKind === 'crit' ? PALETTE.danger
        : (v.damageKind === 'miss' ? PALETTE.text : PALETTE.warn);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(v.damageText, card.avatar.cx, card.damageY);
    }
  }

  _renderReport(v) {
    const ctx = this.ctx;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (v.levelUpText) {
      ctx.font = fontCss(24, 'bold');
      ctx.fillStyle = PALETTE.warn;
      ctx.fillText(v.levelUpText, this.box.cx, this.cards.levelUpY);
    } else if (v.reportText) {
      ctx.font = fontCss(18, 'bold');
      ctx.fillStyle = PALETTE.ink;
      ctx.fillText(v.reportText, this.box.cx, this.cards.reportY);
    }
  }

  _renderExp(v) {
    if (!v.expVisible || !this.playerSide) return;
    const ctx = this.ctx;
    const eb = this.cards.expBar;

    if (v.expGained) {
      ctx.font = fontCss(16, 'bold');
      ctx.fillStyle = PALETTE.warn;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+${v.expGained}`, this.box.cx, this.cards.expLabelY);
    }
    drawBar(ctx, planBar({
      kind: 'exp',
      x: eb.x, y: eb.y, w: eb.w, h: eb.h,
      ratio: barRatio(v.expShown, this.expMax),
      ghostRatio: v.expGhost != null ? barRatio(v.expGhost, this.expMax) : null,
      label: '经验',
      valueText: `${Math.round(v.expShown)}/${this.expMax}`,
    }));
  }

  /* ---------- 内部：虚拟时钟 ---------- */

  /** 由 render() 每帧调用：真实时钟 dt → 虚拟时钟（单帧上限 250ms 防切后台跳帧） */
  _advanceReal() {
    const now = this._now();
    if (this._lastRealNow == null) {
      this._lastRealNow = now;
      return;
    }
    let dt = now - this._lastRealNow;
    this._lastRealNow = now;
    if (dt < 0) dt = 0;
    if (dt > 250) dt = 250;
    this._advanceVirtual(dt);
  }

  /** 虚拟时钟推进核心（单测直调）：上限 = 已提交段末尾（段间冻结） */
  _advanceVirtual(dtMs) {
    const dt = (typeof dtMs === 'number' && dtMs > 0) ? dtMs : 0;
    if (this._vm < this._lastEnd) {
      this._vm = Math.min(this._vm + dt, this._lastEnd);
    }
    // 到期音效
    if (this._sfxQueue.length) {
      const due = this._sfxQueue.filter(s => s.at <= this._vm);
      if (due.length) {
        this._sfxQueue = this._sfxQueue.filter(s => s.at > this._vm);
        due.forEach(s => sound.playSfx(s.sfx));
      }
    }
    // 到期 Promise
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
