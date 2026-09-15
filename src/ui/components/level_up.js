/**
 * level_up —— 升级结算弹层组件（交战确认后的数值成长明细）
 *
 * 时机（任务 #7 编排定案）：
 *   ceModal.playExp 升级横幅（"等级提升！ Lv.X → Lv.X+1"）→ 交战弹层玩家确认
 *   → 本组件弹出：九维逐行揭示 + 每项"条形增长 + 文字 +1"，未涨项灰色"——"
 *   → 本组件确认 → 掉落/回合结算照旧。
 *
 * 数值链路（与 main.js 分工）：
 *   main.js（经验段改造后）：roll gains（growth.rollLevelUp）+ apply（growth.applyLevelUp）
 *   在 apply 之前调 snapshotGrowthStats 抓旧面板快照，连同 gainsByLevel 一起喂本组件。
 *
 * 分层原则（与 ui_kit / combat_exchange 一致）：
 *   LEVEL_UP_TIMING / GROWTH_ROWS / planLevelUp / levelUpViewAt /
 *   snapshotGrowthStats / planLevelUpLayout —— 纯计算，Node 可单测；
 *   LevelUpModal.render* —— 只吃快照落笔，浏览器端才被调用。
 */
import { sound } from '../../engine/sound.js';
import {
  ModalBase, PALETTE, planBar, barRatio, clamp01, lerp, easeOutCubic,
  fontCss, drawBar, drawAvatar, avatarFaceFor,
} from './ui_kit.js';

/* ══════════════════════ 1. 时间轴节拍与文案表（纯常量） ══════════════════════ */

/** 升级揭示节拍（ms） */
export const LEVEL_UP_TIMING = {
  HEADLINE: 320,   // 首层大标题缓冲（"等级提升！"定格期）
  ROW_STAGGER: 95, // 相邻行出现间隔（九行从上往下逐行揭示）
  REVEAL: 260,     // 单行 +1 条增长时长
  TAIL: 340,       // 一层末尾停留
  SWITCH: 240,     // 连环升级层间切换
};

/** 单层时长 = 8×STAGGER + REVEAL + TAIL = 1360（推导常量，供单测锚定） */
export const LEVEL_UP_LAYER_LEN =
  LEVEL_UP_TIMING.ROW_STAGGER * 8 + LEVEL_UP_TIMING.REVEAL + LEVEL_UP_TIMING.TAIL;

/** 九维行序与中文名（对齐 consumables.js 既有用语：力量/魔力/幸运/防御/魔防） */
export const GROWTH_ROWS = [
  { key: 'hp', label: 'HP' },
  { key: 'mp', label: 'MP' },
  { key: 'str', label: '力量' },
  { key: 'mag', label: '魔力' },
  { key: 'skl', label: '技巧' },
  { key: 'spd', label: '速度' },
  { key: 'luk', label: '幸运' },
  { key: 'def', label: '防御' },
  { key: 'res', label: '魔防' },
];

/** 行条量级基准：面板 0~40 线性映射（九维各级个位数~30 区间，Lv.1~20 全程可容纳） */
export const GROWTH_BAR_MAX = 40;

/* ══════════════════════ 2. 纯计算：面板快照（main.js V1 单位 → payload） ══════════════════════ */

function numOr(v, dflt) {
  return (typeof v === 'number' && Number.isFinite(v)) ? v : dflt;
}

/**
 * 运行时单位（main.js spawn V1 形态：stats 子对象）→ 九维面板快照。
 * 供 (a) 弹层行条 barBefore 烘焙 (b) 后续 unit_detail 复用。
 * mov 不在九维成长内，不采集。缺键一律退 0，不产生 NaN。
 */
export function snapshotGrowthStats(unit) {
  const s = (unit && typeof unit.stats === 'object' && unit.stats) ? unit.stats : {};
  return {
    hp: numOr(s.maxHp, 0),
    mp: numOr(s.maxMp, 0),
    str: numOr(s.str, 0),
    mag: numOr(s.mag, 0),
    skl: numOr(s.skl, 0),
    spd: numOr(s.spd, 0),
    luk: numOr(s.luk, 0),
    def: numOr(s.def, 0),
    res: numOr(s.res, 0),
  };
}

/* ══════════════════════ 3. 纯计算：升级时间轴计划（Node 可单测） ══════════════════════ */

/**
 * 多层升级 → 时间轴计划。
 * payload: {
 *   fromLevel, toLevel,                    // toLevel 信任调用方（= fromLevel + n），仅回显
 *   gainsByLevel,                          // 数组：每层一 gains（九键 0/1）；空数组 = 空计划
 *   statsBefore                            // 可选：apply 前九维快照（snapshotGrowthStats 产物）
 * }                                        // 缺省时行条退化为纯数字模式（barBefore/barAfter = null）
 * 层 i start = HEADLINE + i*(LAYER_LEN + SWITCH)；plan.end = HEADLINE + n*LAYER_LEN + (n-1)*SWITCH
 */
export function planLevelUp(payload, startAt = 0) {
  const p = payload || {};
  const gainsByLevel = Array.isArray(p.gainsByLevel) ? p.gainsByLevel : [];
  const fromLevel = numOr(p.fromLevel, 1);
  const statsBefore = p.statsBefore && typeof p.statsBefore === 'object' ? p.statsBefore : null;

  // 跨层累计器：层 i 的 barBefore = 前面所有层 delta 之前的值
  const acc = statsBefore ? snapshotLike(statsBefore) : null;
  let totalGain = 0;

  const layers = gainsByLevel.map((gains, i) => {
    const g = (gains && typeof gains === 'object') ? gains : {};
    const layerStart = LEVEL_UP_TIMING.HEADLINE + i * (LEVEL_UP_LAYER_LEN + LEVEL_UP_TIMING.SWITCH);
    const rows = GROWTH_ROWS.map((row, r) => {
      const delta = g[row.key] ? 1 : 0;
      const showAt = r * LEVEL_UP_TIMING.ROW_STAGGER;
      const revealAt = showAt + LEVEL_UP_TIMING.REVEAL;
      let barBefore = null, barAfter = null;
      if (acc) {
        barBefore = numOr(acc[row.key], 0);
        barAfter = barBefore + delta;
        acc[row.key] = barAfter;
      }
      totalGain += delta;
      return { key: row.key, label: row.label, delta, showAt, revealAt, barBefore, barAfter };
    });
    return {
      index: i,
      start: layerStart,
      end: layerStart + LEVEL_UP_LAYER_LEN,
      levelFrom: fromLevel + i,
      levelTo: fromLevel + i + 1,
      rows,
    };
  });

  const n = layers.length;
  const end = n > 0
    ? LEVEL_UP_TIMING.HEADLINE + n * LEVEL_UP_LAYER_LEN + (n - 1) * LEVEL_UP_TIMING.SWITCH
    : 0;
  return {
    fromLevel,
    toLevel: numOr(p.toLevel, fromLevel + n),   // n 层连环默认升 n 级；n=0 时不动
    layers,
    totalGain,
    hasStats: !!statsBefore,
    start: startAt,
    duration: end,
    end: startAt + end,
  };
}

/** statsBefore 兼容输入：已规范对象直接透传 / 乱形状退 0（不给 bar 喂 NaN） */
function snapshotLike(s) {
  const out = {};
  for (const row of GROWTH_ROWS) out[row.key] = numOr(s[row.key], 0);
  return out;
}

/* ══════════════════════ 4. 纯计算：任意时刻视觉快照（Node 可单测） ══════════════════════ */

/**
 * 时间轴在 elapsed(ms) 处的完整视觉快照。
 * 返回: {
 *   phase: 'idle'|'head'|'layer'|'layerDone'|'done',
 *   layerIndex, levelFrom, levelTo,
 *   rows: [ { key, label, delta,
 *             state: 'pending'|'flat'|'revealing'|'revealed',
 *             barShown, ghostShown, deltaText } × 9 ],
 *   totalGain, layerCount, timelineDone,
 * }
 * barShown/ghostShown 为绝对数值（条渲染方再除 GROWTH_BAR_MAX），statsBefore 缺失时为 null。
 */
export function levelUpViewAt(plan, elapsed) {
  const pl = plan || {};
  const layers = Array.isArray(pl.layers) ? pl.layers : [];
  const n = layers.length;
  const totalGain = numOr(pl.totalGain, 0);

  const view = {
    phase: 'idle', layerIndex: -1,
    levelFrom: numOr(pl.fromLevel, 1),
    levelTo: numOr(pl.toLevel, numOr(pl.fromLevel, 1)),
    rows: GROWTH_ROWS.map(row => ({
      key: row.key, label: row.label, delta: 0,
      state: 'pending', barShown: null, ghostShown: null, deltaText: null,
    })),
    totalGain, layerCount: n, totalGainText: null, timelineDone: true,
  };
  view.totalGainText = n > 0 ? `合计 +${totalGain}` : null;
  if (n === 0) return view;

  view.timelineDone = false;

  // head 相：elapsed 未到首层 start（大标题缓冲期）
  if (elapsed < layers[0].start) {
    view.phase = 'head';
    view.levelFrom = layers[0].levelFrom;
    view.levelTo = layers[0].levelTo;
    return view;
  }

  for (let i = 0; i < n; i++) {
    const layer = layers[i];
    if (!(layer && typeof layer.start === 'number')) continue;
    if (layer.start > elapsed) break;               // 还没轮到该层
    const t = elapsed - layer.start;
    if (t >= LEVEL_UP_LAYER_LEN) {
      // 层已完整结束：吸收终态（全 revealed）继续看下一层
      absorbLayer(view, layer, true);
      continue;
    }
    view.layerIndex = i;
    view.levelFrom = layer.levelFrom;
    view.levelTo = layer.levelTo;
    view.phase = 'layer';
    layerRowsView(view, layer, t);
    return view;
  }

  // 走完所有层：定格末层终态
  view.phase = 'done';
  view.timelineDone = true;
  const last = layers[n - 1];
  view.levelFrom = last.levelFrom;
  view.levelTo = last.levelTo;
  view.totalGainText = `合计 +${totalGain}`;
  return view;
}

/** 段外吸收：整层九行定 revealed（用于跨层推进与 done 相） */
function absorbLayer(view, layer, settled) {
  view.rows = layer.rows.map(r => rowSnapshot(r, settled ? 'revealed' : 'pending', r.revealAt, r.revealAt));
}

/** 层内渲染：逐行按 showAt/revealAt 产出状态快照 */
function layerRowsView(view, layer, t) {
  view.rows = layer.rows.map(r => {
    if (t < r.showAt) return rowSnapshot(r, 'pending', t, t);
    if (r.delta === 0) return rowSnapshot(r, 'flat', t, t);
    if (t < r.revealAt) return rowSnapshot(r, 'revealing', t, r.revealAt);
    return rowSnapshot(r, 'revealed', t, r.revealAt);
  });
}

/**
 * 单行快照。revealing：条从 barBefore → barAfter 沿 easeOutCubic 插值（ghost = barBefore 残影）。
 * barBefore 为 null（纯数字模式）时 barShown/ghostShown 保持 null。
 */
function rowSnapshot(row, state, t, anchor) {
  let barShown = row.barBefore;
  let ghostShown = row.barBefore;
  if (row.barBefore != null && row.barAfter != null) {
    if (state === 'revealing') {
      const p = easeOutCubic(clamp01((t - row.showAt) / Math.max(1, row.revealAt - row.showAt)));
      barShown = lerp(row.barBefore, row.barAfter, p);
    } else if (state === 'revealed') {
      barShown = row.barAfter;
    }
    if (state === 'flat' || state === 'pending') barShown = row.barBefore;
  }
  return {
    key: row.key, label: row.label, delta: row.delta, state,
    barShown, ghostShown,
    deltaText: state === 'pending' ? null
      : (row.delta === 0 ? '——' : '+1'),
  };
}

/* ══════════════════════ 5. 纯计算：弹层布局几何 ══════════════════════ */

/**
 * 盒 760×500（与 combat_exchange 同尺寸，视觉统一）。
 * 垂直预算：标题 → 头像行（头像/名/等级行）→ 层标/合计 → 九行区 → 确认按钮贴底。
 */
export function planLevelUpLayout(box) {
  const rowsX = box.x + 118;
  const barX = rowsX + 92;
  const barW = 250;
  return {
    headline: { x: box.cx, y: box.y + 78 },                       // "等级提升！"
    avatar: { cx: box.x + 86, cy: box.y + 172, r: 38 },
    nameX: box.x + 152, nameY: box.y + 158,                      // 名字（左对齐）
    levelLineY: box.y + 196,                                     // "Lv.3 → Lv.4 · 合计 +5"
    layerTagX: box.cx, layerTagY: box.y + 236,                   // 层标居中（连环升级第 2/3 层切换提示）
    rows: { x: rowsX, y: box.y + 264, w: 524, rowH: 26, count: 9 },
    bar: { x: barX, w: barW, h: 12 },
    deltaTextX: barX + barW + 24,
    valueMax: GROWTH_BAR_MAX,
  };
}

/* ══════════════════════ 6. 组件（浏览器端落笔，单测走纯函数与假时钟） ══════════════════════ */

const defaultNow = () => (typeof performance !== 'undefined' && typeof performance.now === 'function')
  ? performance.now()
  : Date.now();

/**
 * config: {
 *   unit,                        // 运行时单位（V1 形态均可）：取 name/faction 画头像走 avatarFaceFor
 *   fromLevel, toLevel,          // 例：3 → 4（连环升级则是 3 → 5）
 *   gainsByLevel,                // growth.gainExp / main.js 经验段产物：每层九键 0/1
 *   statsBefore,                 // 可选：apply 前九维快照（level_up.js snapshotGrowthStats）
 * }
 * 构造即开演（虚拟时钟由 render 推进）；时间轴走完自动 finish 出"确认"；
 * main.js 可 await modal.whenDone() 后再 await 玩家确认（onClose 触发时机）。
 */
export class LevelUpModal extends ModalBase {
  constructor(canvas, config, onClose) {
    const cfg = config || {};
    super(canvas, cfg, onClose);
    this.box = this.setupBox(760, 500);
    this.layout = planLevelUpLayout(this.box);

    this.name = cfg.unit?.name || cfg.name || '升级';
    this.faction = cfg.unit?.faction || 'player';
    this.unit = cfg.unit || null;

    this.statsBefore = (cfg.statsBefore && typeof cfg.statsBefore === 'object')
      ? snapshotLike(cfg.statsBefore) : null;

    this.plan = planLevelUp({
      fromLevel: cfg.fromLevel,
      toLevel: cfg.toLevel,
      gainsByLevel: cfg.gainsByLevel,
      statsBefore: this.statsBefore,
    });

    // 时间轴状态（虚拟时钟，由 render 推进；单测可直接 _advanceVirtual）
    this._vm = 0;
    this._lastRealNow = null;
    this._lastEnd = this.plan.end;
    this._pending = [];          // { until, resolve }
    this._timelineEnded = false;
    this._now = typeof cfg._now === 'function' ? cfg._now : defaultNow;

    // 开演音效（文件型：assets/audio/sfx/sfx_level_up.mp3 缺文件时静默；后续补素材即可）
    sound.playSfx('sfx_level_up');
  }

  /** 当前虚拟时钟下的视觉快照（render 与单测共用） */
  get view() {
    return levelUpViewAt(this.plan, this._vm);
  }

  /** 整条时间轴的 Promise（main.js await 演出用；与 combat_exchange._waitUntil 同款） */
  whenDone() {
    if (this._vm >= this._lastEnd) return Promise.resolve();
    return new Promise((resolve) => this._pending.push({ until: this._lastEnd, resolve }));
  }

  /** 时间轴走完：出"确认"按钮（render 检测触发；幂等） */
  finish() {
    if (this._timelineEnded) return;
    this._timelineEnded = true;
    this.selectable = true;
    this.setButtons([{ id: 'ok', label: '确认' }]);
  }

  /** 时间轴未完时吞掉一切输入（升级演出不可跳过/不可误关） */
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

    // 时间轴走完自动出确认按钮（只触发一次；再往后时钟冻结在 _lastEnd）
    if (v.timelineDone && !this._timelineEnded) this.finish();

    this.renderFrame('等级提升');
    this._renderHeader(v);
    this._renderLayerTag(v);
    this._renderRows(v);
    this.renderButtons();
  }

  /* ---------- 内部：绘制 ---------- */

  _renderHeader(v) {
    const ctx = this.ctx;
    const L = this.layout;
    const face = avatarFaceFor(this.unit || { name: this.name, faction: this.faction });
    drawAvatar(ctx, { ...L.avatar, ...face, faction: this.faction });

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(24, 'bold');
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText(this.name, L.nameX, L.nameY);

    // 等级行 + 合计（连环升级展示 from → to 全跨度）
    ctx.font = fontCss(17, 'bold');
    ctx.fillStyle = PALETTE.title;
    const lv = v.layerCount > 1 ? `（连升 ${v.layerCount} 级）` : '';
    ctx.fillText(`Lv.${v.levelFrom} → Lv.${v.levelTo}${lv}`, L.nameX, L.levelLineY);
    if (v.totalGainText) {
      ctx.textAlign = 'right';
      ctx.fillStyle = PALETTE.warn;
      ctx.fillText(v.totalGainText, this.box.x + this.box.w - 40, L.levelLineY);
    }
  }

  _renderLayerTag(v) {
    if (v.phase === 'head') return;
    const ctx = this.ctx;
    const L = this.layout;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tag = v.layerCount > 1
      ? `第 ${Math.min(v.layerIndex + 1, v.layerCount)} 次升级 · Lv.${v.levelFrom} → Lv.${v.levelTo}`
      : `Lv.${v.levelFrom} → Lv.${v.levelTo}`;
    ctx.font = fontCss(16, 'bold');
    ctx.fillStyle = PALETTE.text;
    ctx.fillText(tag, L.layerTagX, L.layerTagY);
  }

  _renderRows(v) {
    const ctx = this.ctx;
    const L = this.layout;
    const R = L.rows;
    for (let i = 0; i < v.rows.length; i++) {
      const row = v.rows[i];
      if (row.state === 'pending') continue;   // 未到揭示时刻：整行不出现

      const rowY = R.y + i * R.rowH + R.rowH / 2;
      const isFlat = row.state === 'flat';     // 未涨项：整体灰、条不画、delta 位"——"

      // 行名（右对齐条头）
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = fontCss(17, isFlat ? 'normal' : 'bold');
      ctx.fillStyle = isFlat ? PALETTE.ghost : PALETTE.ink;
      ctx.fillText(row.label, L.bar.x - 14, rowY);

      // 数值条（涨项 reveal：ghost 残影在左端 = 旧值，新值缓动盖上去）
      if (!isFlat && row.barShown != null && row.ghostShown != null) {
        drawBar(ctx, planBar({
          kind: 'stat',
          x: L.bar.x, y: rowY - L.bar.h / 2, w: L.bar.w, h: L.bar.h,
          ratio: barRatio(row.barShown, L.valueMax),
          ghostRatio: barRatio(row.ghostShown, L.valueMax),
        }));
      } else if (!isFlat && row.barShown == null) {
        // 纯数字模式（statsBefore 缺失）：画一条静止细线占位
        ctx.strokeStyle = PALETTE.ghost;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(L.bar.x, rowY);
        ctx.lineTo(L.bar.x + L.bar.w * 0.6, rowY);
        ctx.stroke();
      }

      // +1 / "——"
      ctx.textAlign = 'left';
      ctx.font = fontCss(21, 'bold');
      ctx.fillStyle = isFlat ? PALETTE.ghost : PALETTE.gold;
      ctx.fillText(row.deltaText || '', L.deltaTextX, rowY);
    }
  }

  /* ---------- 内部：虚拟时钟（与 combat_exchange 同款机制） ---------- */

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

  /** 单测直调：推进虚拟时钟，兑现到期的 whenDone Promise */
  _advanceVirtual(dtMs) {
    const dt = (typeof dtMs === 'number' && dtMs > 0) ? dtMs : 0;
    if (this._vm < this._lastEnd) {
      this._vm = Math.min(this._vm + dt, this._lastEnd);
    }
    if (this._pending.length) {
      const ready = this._pending.filter(p => this._vm >= p.until);
      if (ready.length) {
        this._pending = this._pending.filter(p => this._vm < p.until);
        ready.forEach(p => p.resolve());
      }
    }
  }
}
