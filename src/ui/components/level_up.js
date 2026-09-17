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
import { assetLoader } from '../../engine/asset_loader.js';
import {
  ModalBase, PALETTE, planBar, barRatio, clamp01, lerp, easeOutCubic,
  fontCss, drawBar, drawAvatar, avatarFaceFor, drawOverlay, pathRoundRect,
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

/* ══════════════════════ 5. 纯计算：全屏布局几何 ══════════════════════ */

/**
 * 全屏布局（960×540 设计画布；box 需为全屏盒，即 setupBox(canvas.w, canvas.h, 0)）。
 *   左侧 ~57%：LEVEL UP 大标题 + 副题 + 数值面板卡（单列九行，行更宽更高档）；
 *   右侧 ~35%：336px 大立绘（金色描边圆角裁切）+ 径向金色光晕 + 姓名名牌；
 *   中间竖向双金线分区；底部"确认"按钮由 finish() 落位到左面板中轴。
 * 几何全部由 box 原点推导（box.x/box.y 位移即可整体平移），offset 为 960×540 基准。
 */
export function planLevelUpLayout(box) {
  const x0 = box.x, y0 = box.y;
  return {
    // 左侧仪式区（标题块 + 数值面板卡）
    panel: {
      x: x0 + 44, y: y0 + 176, w: 548, h: 294,          // 数值面板卡 176~470
      cx: x0 + 318,
      titleX: x0 + 318, titleY: y0 + 74,                 // LEVEL UP 大标题
      subY: y0 + 114, gainY: y0 + 144, tagY: y0 + 166,   // 中文副题 / 合计 / 层标
      rowsTop: y0 + 190, rowH: 30,                       // 九行 190~460
      labelX: x0 + 146, barX: x0 + 158, barW: 236,       // 属性名右缘 / 条 / 条宽
      deltaX: x0 + 406, valueRightX: x0 + 568,           // +1 徽章左缘 / 数值右缘
    },
    // 右侧立绘区
    stage: {
      cx: x0 + 778, cy: y0 + 204,
      y: y0 + 36, size: 336,                             // 立绘 610~946 × 36~372
      nameY: y0 + 410, lvY: y0 + 438, subY: y0 + 460,
    },
    dividerX: x0 + 597,
    glowR: 330,
    btn: { w: 200, h: 40 },
    valueMax: GROWTH_BAR_MAX,
  };
}

/* ══════════════════════ 6. 组件（浏览器端落笔，单测走纯函数与假时钟） ══════════════════════ */

/** 模块级小工具：一笔线段（自带色/宽，避免反复设置 stroke 样式） */
function line(ctx, x1, y1, x2, y2, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/** 屏幕四角切角饰：sx/sy ∈ {1,-1} 控制朝向 */
function drawCorner(ctx, x, y, sx, sy) {
  line(ctx, x, y, x + 22 * sx, y, PALETTE.gold, 2);
  line(ctx, x, y, x, y + 22 * sy, PALETTE.gold, 2);
}

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
    // 全屏弹层：margin 0 即占满画布（背景自绘夜幕渐变，不走 renderFrame 纸盒）
    this.box = this.setupBox(this.canvas.width, this.canvas.height, 0);
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
    this.setButtons([{ id: 'ok', label: '确认' }], {
      btnW: this.layout.btn.w,
      btnH: this.layout.btn.h,
      anchorY: this.box.y + this.box.h - 48,
    });
    // 全屏盒下自动布局会居中到整幅画面：手动挪回左面板中轴（避开右侧立绘名牌）
    const btn = this.buttons[0];
    if (btn) btn.rect.x = this.layout.panel.cx - btn.rect.w / 2;
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

    this._renderBackdrop();   // 全屏夜幕 + 金色光晕 + 分隔线 + 角饰
    this._renderStage(v);     // 右侧大立绘 + 姓名名牌
    this._renderTitle(v);     // 左侧 LEVEL UP 标题块
    this._renderRows(v);      // 左侧数值面板卡（九维单列）
    this.renderButtons();
  }

  /* ---------- 内部：绘制 ---------- */

  /** 全屏背景：暗金夜幕渐变 + 立绘径向金晕 + 左右分隔双金线 + 四角切角饰 */
  _renderBackdrop() {
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    const L = this.layout, S = L.stage;

    drawOverlay(ctx, W, H);   // 先压暗下方战场
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#281e12');
    g.addColorStop(0.55, '#181207');
    g.addColorStop(1, '#0f0c07');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // 立绘身后径向金晕（视线焦点推向右侧）
    const rg = ctx.createRadialGradient(S.cx, S.cy, 30, S.cx, S.cy, L.glowR);
    rg.addColorStop(0, 'rgba(253,224,71,0.32)');
    rg.addColorStop(0.55, 'rgba(180,130,40,0.12)');
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    // 分隔双金线（主亮 + 副暗，衬层次）
    line(ctx, L.dividerX, 36, L.dividerX, H - 36, 'rgba(251,191,36,0.75)', 2);
    line(ctx, L.dividerX + 5, 44, L.dividerX + 5, H - 44, 'rgba(251,191,36,0.28)', 1);

    drawCorner(ctx, 18, 18, 1, 1);
    drawCorner(ctx, W - 18, 18, -1, 1);
    drawCorner(ctx, 18, H - 18, 1, -1);
    drawCorner(ctx, W - 18, H - 18, -1, -1);
  }

  /** 右侧立绘：入场浮起 + 微缩放；金边圆角裁切大图（无素材退大号圆形头像）。 */
  _renderStage(v) {
    const ctx = this.ctx;
    const S = this.layout.stage;

    const p = clamp01(this._vm / 420);          // 入场 420ms
    const e = easeOutCubic(p);
    const dy = (1 - e) * 26;
    const size = S.size * (0.94 + 0.06 * e);
    const px = S.cx - size / 2, py = S.y + (S.size - size) / 2 + dy;

    // 半身立绘为 240×320（3:4 竖幅）：按高度占满原立绘区，宽度收窄为 3/4，避免被拉成正方形而纵向压扁
    const artW = size * 3 / 4;
    const artPx = S.cx - artW / 2;

    ctx.save();
    ctx.globalAlpha = p;
    // 右侧优先用半身立绘（assets/art/{id}_default.png），缺失再退回头像
    const actorId = this.unit?.unitId || this.unit?.enemyId || this.unit?.id;
    const artImg = actorId ? assetLoader.getImage(`assets/art/${actorId}_default.png`) : null;
    const face = avatarFaceFor(this.unit || { name: this.name, faction: this.faction }, { density: '2x' });
    if (artImg) {
      ctx.save();
      pathRoundRect(ctx, artPx, py, artW, size, 18);
      ctx.clip();
      ctx.drawImage(artImg, artPx, py, artW, size);
      ctx.restore();
      ctx.strokeStyle = PALETTE.gold;
      ctx.lineWidth = 3;
      pathRoundRect(ctx, artPx, py, artW, size, 18);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,251,235,0.35)';
      ctx.lineWidth = 1;
      pathRoundRect(ctx, artPx + 6, py + 6, artW - 12, size - 12, 13);
      ctx.stroke();
    } else if (face.img) {
      ctx.save();
      pathRoundRect(ctx, px, py, size, size, 18);
      ctx.clip();
      ctx.drawImage(face.img, px, py, size, size);
      ctx.restore();
      ctx.strokeStyle = PALETTE.gold;
      ctx.lineWidth = 3;
      pathRoundRect(ctx, px, py, size, size, 18);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,251,235,0.35)';
      ctx.lineWidth = 1;
      pathRoundRect(ctx, px + 6, py + 6, size - 12, size - 12, 13);
      ctx.stroke();
    } else {
      drawAvatar(ctx, { cx: S.cx, cy: S.cy + dy, r: size / 2 - 12, ...face, faction: this.faction });
    }
    ctx.restore();

    // 姓名名牌：名字 + 等级跨度（连升时附合计行）
    ctx.save();
    ctx.globalAlpha = p;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = fontCss(24, 'bold');
    ctx.fillStyle = '#fef3c7';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 4;
    ctx.fillText(this.name, S.cx, S.nameY);
    ctx.shadowBlur = 0;
    ctx.font = fontCss(18, 'bold');
    ctx.fillStyle = PALETTE.gold;
    ctx.fillText(`Lv.${v.levelFrom} → Lv.${v.levelTo}`, S.cx, S.lvY);
    if (v.layerCount > 1) {
      ctx.font = fontCss(14, 'normal');
      ctx.fillStyle = 'rgba(251,191,36,0.75)';
      ctx.fillText(`连升 ${v.layerCount} 级 · 合计 +${v.totalGain}`, S.cx, S.subY);
    }
    ctx.restore();
  }

  /** 左侧标题块：LEVEL UP 渐变大字（金辉描罩）+ 中文副题 + 合计与层标。 */
  _renderTitle(v) {
    const ctx = this.ctx;
    const P = this.layout.panel;
    const p = clamp01(this._vm / 380);          // 入场 380ms：自上落下
    const e = easeOutCubic(p);

    ctx.save();
    ctx.globalAlpha = p;
    ctx.translate(0, (1 - e) * -22);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const g = ctx.createLinearGradient(0, P.titleY - 26, 0, P.titleY + 26);
    g.addColorStop(0, '#fff7d6');
    g.addColorStop(0.55, '#fbbf24');
    g.addColorStop(1, '#b45309');
    ctx.font = fontCss(46, 'bold');
    ctx.shadowColor = 'rgba(251,191,36,0.65)';
    ctx.shadowBlur = 26;
    ctx.fillStyle = g;
    ctx.fillText('L E V E L  U P', P.titleX, P.titleY);
    ctx.shadowBlur = 0;

    ctx.font = fontCss(19, 'bold');
    ctx.fillStyle = PALETTE.gold;
    ctx.fillText('—— 等级提升 ——', P.titleX, P.subY);

    if (v.phase !== 'head' && v.totalGainText) {
      ctx.font = fontCss(15, 'normal');
      ctx.fillStyle = '#fde68a';
      ctx.fillText(`九维合计 +${v.totalGain}`, P.titleX, P.gainY);
    }
    if (v.layerCount > 1 && v.phase !== 'head') {
      ctx.font = fontCss(14, 'bold');
      ctx.fillStyle = PALETTE.warn;
      ctx.fillText(`第 ${Math.min(v.layerIndex + 1, v.layerCount)}/${v.layerCount} 次升级`, P.titleX, P.tagY);
    }
    ctx.restore();
  }

  /** 左侧数值面板：半透明暗金边卡片 + 九维单列宽行（条 236px、+1 徽章、右缘数值滚动）。 */
  _renderRows(v) {
    const ctx = this.ctx;
    const P = this.layout.panel;
    const barW = P.barW, barH = 11;

    // 面板卡淡入（比标题迟 100ms，错落登场）
    const cp = clamp01((this._vm - 100) / 360);
    if (cp <= 0) return;
    ctx.save();
    ctx.globalAlpha = cp;

    pathRoundRect(ctx, P.x, P.y, P.w, P.h, 12);
    ctx.fillStyle = 'rgba(22,17,11,0.78)';
    ctx.fill();
    ctx.strokeStyle = PALETTE.frame;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(251,191,36,0.30)';
    ctx.lineWidth = 1;
    pathRoundRect(ctx, P.x + 5, P.y + 5, P.w - 10, P.h - 10, 9);
    ctx.stroke();

    for (let i = 0; i < v.rows.length; i++) {
      const row = v.rows[i];
      if (row.state === 'pending') continue;   // 未到揭示时刻：整行不出现

      const rowY = P.rowsTop + i * P.rowH + P.rowH / 2;
      const isFlat = row.state === 'flat';     // 未涨项：整体灰、条不画、delta 位"——"

      // 属性名（右对齐到进度条左侧）
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = fontCss(15, isFlat ? 'normal' : 'bold');
      ctx.fillStyle = isFlat ? PALETTE.ghost : '#fef3c7';
      ctx.fillText(row.label, P.labelX, rowY);

      // 数值条（涨项 reveal：ghost 残影在左端 = 旧值，新值缓动盖上去）
      if (!isFlat && row.barShown != null && row.ghostShown != null) {
        drawBar(ctx, planBar({
          kind: 'stat',
          x: P.barX, y: rowY - barH / 2, w: barW, h: barH,
          ratio: barRatio(row.barShown, this.layout.valueMax),
          ghostRatio: barRatio(row.ghostShown, this.layout.valueMax),
        }));
      } else if (!isFlat) {
        // 纯数字模式（statsBefore 缺失）：画一条静止细线占位
        line(ctx, P.barX, rowY, P.barX + barW * 0.6, rowY, PALETTE.ghost, 2);
      }

      if (isFlat) {
        // 未涨项：灰色"——"占位
        ctx.textAlign = 'center';
        ctx.font = fontCss(14, 'normal');
        ctx.fillStyle = PALETTE.ghost;
        ctx.fillText('——', P.deltaX + 20, rowY);
      } else {
        // +1 金徽章（小圆角框内金字，凸显成长）
        pathRoundRect(ctx, P.deltaX, rowY - 11, 40, 22, 6);
        ctx.fillStyle = 'rgba(251,191,36,0.14)';
        ctx.fill();
        ctx.strokeStyle = PALETTE.gold;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.font = fontCss(13, 'bold');
        ctx.fillStyle = PALETTE.gold;
        ctx.fillText('+1', P.deltaX + 20, rowY + 1);
      }

      // 右缘数值：revealing 实时滚动，revealed 定格"旧 → 新"
      if (!isFlat && row.barShown != null) {
        ctx.textAlign = 'right';
        ctx.font = fontCss(15, 'bold');
        ctx.fillStyle = PALETTE.gold;
        const txt = row.state === 'revealed'
          ? `${Math.round(row.ghostShown)} → ${Math.round(row.barShown)}`
          : `${Math.round(row.barShown)}`;
        ctx.fillText(txt, P.valueRightX, rowY);
      }
    }
    ctx.restore();
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
