/**
 * unit_detail —— 人物详情弹层组件（任务 #8c，任务清单 #4「我方人员详情UI」）
 *
 * 用途：行动菜单「详情」入口 / 战场查看单位。敌我通用（敌方无简介/个人技自动降级）。
 * 展示：头像 + 姓名 + 称号 + 职业·等级·移动力 + 装备行 ·
 *       HP/MP/EXP 资源条 · 九维数值条（GROWTH_BAR_MAX 基准，与 level_up 同口径）·
 *       职业行 / 个人技行 / 简介（bio 折行，超限截断加「…」）。
 *
 * 分层原则（与 ui_kit / combat_exchange / level_up 一致）：
 *   DETAIL_STAT_ROWS / detailSnapshotFromUnit / planDetailStatRows /
 *   planResourceBars / clipLines / planDetailBio / planUnitDetailLayout
 *   —— 纯计算，Node 可单测；
 *   UnitDetailModal.render* —— 只吃快照落笔，浏览器端才被调用。
 */
import {
  ModalBase, PALETTE, planBar, barRatio, fontCss, wrapLines,
  drawBar, drawAvatar, avatarFaceFor, drawWrappedLines,
} from './ui_kit.js';
import { CLASSES } from '../../data/classes.js';
import { WEAPONS } from '../../data/goods/weapons.js';
import { SKILLS } from '../../data/skills.js';
import { EXP_PER_LEVEL, LEVEL_CAP } from '../../systems/growth.js';
import { GROWTH_ROWS, GROWTH_BAR_MAX, snapshotGrowthStats } from './level_up.js';

/* ══════════════════════ 1. 行序与量级（常量） ══════════════════════ */

/** 九维行序直接镜像 level_up（改一处两弹层同步联动）；mov 并入身份行不占行 */
export const DETAIL_STAT_ROWS = GROWTH_ROWS;

const numOr = (v, d) => (typeof v === 'number' && Number.isFinite(v)) ? v : d;

/* ══════════════════════ 2. 纯计算：单位 → 详情快照 ══════════════════════ */

/**
 * 运行时单位（createPlayerUnit / createEnemyUnit / main.js spawn 形态）→ 展示快照。
 * 查表三键：classId→CLASSES / equippedWeapon→WEAPONS / personalSkill→SKILLS，
 * 未知 id 一律走兜底文案，绝不抛错、绝不 NaN。
 */
export function detailSnapshotFromUnit(unit) {
  const u = (unit && typeof unit === 'object') ? unit : {};
  const stats = (u.stats && typeof u.stats === 'object') ? u.stats : {};
  const cls = u.classId ? CLASSES[u.classId] : null;
  const wpn = u.equippedWeapon ? WEAPONS[u.equippedWeapon] : null;
  const skill = u.personalSkill ? SKILLS[u.personalSkill] : null;

  const nine = snapshotGrowthStats(u);
  return {
    // —— 身份 ——
    name: u.name || '？？？',
    title: u.title || '',
    faction: u.faction || 'player',
    bio: u.bio || '',
    // —— 职业（查表） ——
    classId: u.classId || null,
    className: cls ? cls.name : '未知职业',
    classDesc: cls ? (cls.desc || '') : '',
    // —— 装备（查表） ——
    weaponName: wpn ? wpn.name : '赤手空拳',
    weaponMight: wpn ? numOr(wpn.might, 0) : 0,
    weaponLine: wpn ? `${wpn.name} · 威力 ${numOr(wpn.might, 0)}` : '赤手空拳',
    // —— 个人技（查表；敌方/无技能 → null，渲染行降级「无」） ——
    personalSkillName: skill ? skill.name : null,
    personalSkillDesc: skill ? (skill.desc || '') : null,
    // —— 成长状态 ——
    level: numOr(u.level, 1),
    exp: Math.max(0, numOr(u.exp, 0)),
    expMax: EXP_PER_LEVEL,
    // —— 移动（不成长，但详情可见） ——
    mov: numOr(stats.mov, 0),
    // —— 资源条 ——
    hp: { cur: numOr(u.currentHp, 0), max: numOr(stats.maxHp, 0) },
    mp: { cur: numOr(u.currentMp, 0), max: numOr(stats.maxMp, 0) },
    // —— 九维（maxHp/maxMp 映射口径与 level_up.snapshotGrowthStats 一致） ——
    stats: nine,
  };
}

/* ══════════════════════ 3. 纯计算：九维行 / 资源条 / 简介折行 ══════════════════════ */

/** 快照 → 九维行数组（label/value/ratio/valueText，render 与单测共用） */
export function planDetailStatRows(snapshot, valueMax = GROWTH_BAR_MAX) {
  const s = (snapshot && snapshot.stats) || {};
  return DETAIL_STAT_ROWS.map(row => {
    const v = numOr(s[row.key], 0);
    return {
      key: row.key, label: row.label,
      value: v,
      ratio: barRatio(v, valueMax),
      valueText: String(v),
    };
  });
}

/**
 * 快照 → HP/MP/EXP 三条数据（不含几何；几何由调用方 planBar 合成）。
 * 满级（level ≥ LEVEL_CAP）EXP 显示 MAX：经验照入账但等级冻结名副其实。
 */
export function planResourceBars(snapshot) {
  const s = snapshot || {};
  const hp = s.hp || { cur: 0, max: 0 };
  const mp = s.mp || { cur: 0, max: 0 };
  const exp = numOr(s.exp, 0);
  const expMax = numOr(s.expMax, EXP_PER_LEVEL);
  const maxed = numOr(s.level, 1) >= LEVEL_CAP;
  return [
    { kind: 'hp', label: 'HP', ratio: barRatio(hp.cur, hp.max),
      valueText: `${numOr(hp.cur, 0)}/${numOr(hp.max, 0)}` },
    { kind: 'mp', label: 'MP', ratio: barRatio(mp.cur, mp.max),
      valueText: `${numOr(mp.cur, 0)}/${numOr(mp.max, 0)}` },
    { kind: 'exp', label: 'EXP', ratio: maxed ? 1 : barRatio(exp, expMax),
      valueText: maxed ? 'MAX' : `${exp}/${expMax}` },
  ];
}

/** 行裁剪：超出 maxLines 截断并给末行尾加「…」（CJK 按码元截尾，防御性不丢行） */
export function clipLines(lines, maxLines) {
  const arr = Array.isArray(lines) ? lines.filter(l => typeof l === 'string') : [];
  const n = Math.max(1, Math.floor(maxLines));
  if (arr.length <= n) return { lines: arr.slice(), clipped: false };
  const cut = arr.slice(0, n);
  const last = cut[n - 1];
  cut[n - 1] = last.length <= 1 ? '…' : last.slice(0, last.length - 1) + '…';
  return { lines: cut, clipped: true };
}

/**
 * 简介折行块：wrapLines + clipLines 的组合封装。
 * empty bio → lines: [] / height: 0（渲染层画「暂无简介」）。
 */
export function planDetailBio(snapshot, measure, maxWidth, maxLines = 5) {
  const s = snapshot || {};
  const text = (typeof s.bio === 'string' && s.bio) ? s.bio : '';
  const lh = 21;
  if (!text) return { lines: [], lineHeight: lh, height: 0, clipped: false, empty: true };
  const wrapped = wrapLines(text, measure, maxWidth);
  const clip = clipLines(wrapped, maxLines);
  return {
    lines: clip.lines,
    lineHeight: lh,
    height: clip.lines.length * lh,
    clipped: clip.clipped,
    empty: false,
  };
}

/* ══════════════════════ 4. 纯计算：弹层布局几何 ══════════════════════ */

/**
 * 盒 760×500（与 combat_exchange / level_up 同尺寸，视觉统一）。
 * 整齐化契约（改动几何时同步 selftest §10.10）：
 *   - 身份四行等距 30：姓名90 / 称号120 / 信息一150 / 信息二180，头像 cy=135 居中共轴；
 *   - 双列条身右缘一列：资源条 x+w === 九维条 x+w（=box.x+662），
 *     条右数值（drawBar 条外右侧）与九维数值右缘（statValueRight）都收在 box.x+720 内；
 *   - 左右栏首行同高：statRows 首行中心 === classLineY（=box.y+210）；
 *   - dividerH（y=196，40→720）分隔身份区与主区，dividerV（x=430，206→416）分隔左栏与九维列。
 * 垂直预算：标题(42) → 身份区(72~187：头像/名/称号/两行信息 + 右侧三条资源条)
 *   → 分隔线(196) → 左栏文字(210~403：职业/个人技/简介 + bio 折行区) + 九维列(198~414)
 *   → 「关闭」按钮贴底（planButtonRow 默认贴底）。
 */
export function planUnitDetailLayout(box) {
  return {
    avatar: { cx: box.x + 84, cy: box.y + 135, r: 46 },
    nameX: box.x + 146, nameY: box.y + 90,        // 姓名（23b，themeColor 优先）
    titleY: box.y + 120,                          // 称号（15 title 色）
    infoLine1Y: box.y + 150,                       // 「学酥 · Lv.1 · 移动力 5」
    infoLine2Y: box.y + 180,                       // 「装备：新手铅笔 · 威力 6」
    bars: { x: box.x + 490, w: 172, h: 15, firstY: box.y + 72, step: 36 }, // HP/MP/EXP
    dividerH: { y: box.y + 196, x0: box.x + 40, x1: box.x + 720 }, // 身份区/主区分隔
    dividerV: { x: box.x + 430, y0: box.y + 206, y1: box.y + 416 }, // 左栏/九维列分隔
    classLineY: box.y + 210,                       // 「职业 · 学酥」（=九维首行中心）
    skillLineY: box.y + 240,                       // 「个人技 · 弃兵争先」
    bioTitleY: box.y + 272,                        // 「简介」
    bio: { x: box.x + 40, y: box.y + 298, w: 344, lineH: 21, maxLines: 5 },
    statRows: { labelRightX: box.x + 534, y: box.y + 198, rowH: 24, count: DETAIL_STAT_ROWS.length },
    statBar: { x: box.x + 544, w: 118, h: 11 },    // 右缘 662 与资源条右缘对齐
    statValueRight: box.x + 720,                   // 数值右对齐锚点（与盒右距 40 对称）
    valueMax: GROWTH_BAR_MAX,                      // 与 level_up 九维条同基准
  };
}

/* ══════════════════════ 5. 组件（浏览器端落笔，单测走纯函数 + 可构造性） ══════════════════════ */

/** 假 canvas / 无 measureText 环境的字宽估算（CJK 每字≈1em，浏览器端不走这条） */
function fallbackMeasure(s) { return String(s).length * 15; }

/**
 * config: { unit } —— 运行时单位（V1/V2 形态均可；null 生成「？？？」占位详情）。
 * 静态信息弹层：无时间轴，构造即完整，唯一按钮「关闭」。
 */
export class UnitDetailModal extends ModalBase {
  constructor(canvas, config, onClose) {
    const cfg = config || {};
    super(canvas, cfg, onClose);
    this.box = this.setupBox(760, 500);
    this.layout = planUnitDetailLayout(this.box);

    this.unit = cfg.unit || null;
    this.snapshot = detailSnapshotFromUnit(this.unit);
    this.statRows = planDetailStatRows(this.snapshot, this.layout.valueMax);
    this.bars = planResourceBars(this.snapshot);

    // bio 折行按正文字号测量（浏览器 measureText；测试/降级环境走字宽估算）
    const ctx = this.ctx;
    if (typeof ctx.measureText === 'function') {
      ctx.font = fontCss(14);
      this.measure = (s) => ctx.measureText(s).width;
    } else {
      this.measure = fallbackMeasure;
    }
    this.bioBlock = planDetailBio(
      this.snapshot, this.measure, this.layout.bio.w, this.layout.bio.maxLines);

    this.selectable = true;
    this.setButtons([{ id: 'close', label: '关闭' }]);
  }

  render() {
    this.renderFrame('人物详情');
    this._renderIdentity();
    this._renderBars();
    this._renderDividers();
    this._renderInfoLines();
    this._renderStatRows();
    this.renderButtons();
  }

  /* ---------- 内部：分隔线（横：身份区/主区 · 纵：左栏/九维列） ---------- */

  _renderDividers() {
    const ctx = this.ctx;
    const { dividerH: h, dividerV: v } = this.layout;
    ctx.strokeStyle = PALETTE.frameInner;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(h.x0, h.y);
    ctx.lineTo(h.x1, h.y);
    ctx.moveTo(v.x, v.y0);
    ctx.lineTo(v.x, v.y1);
    ctx.stroke();
  }

  /* ---------- 内部：身份区（头像/姓名/称号/两行信息） ---------- */

  _renderIdentity() {
    const ctx = this.ctx;
    const L = this.layout;
    const s = this.snapshot;

    const face = avatarFaceFor(this.unit || { name: s.name, faction: s.faction });
    drawAvatar(ctx, { ...L.avatar, ...face, faction: s.faction });

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.font = fontCss(23, 'bold');
    ctx.fillStyle = (this.unit && this.unit.themeColor) || PALETTE.ink;
    ctx.fillText(s.name, L.nameX, L.nameY);

    ctx.font = fontCss(15);
    ctx.fillStyle = PALETTE.title;
    ctx.fillText(s.title || '—', L.nameX, L.titleY);

    ctx.font = fontCss(14);
    ctx.fillStyle = PALETTE.text;
    ctx.fillText(`${s.className} · Lv.${s.level} · 移动力 ${s.mov}`, L.nameX, L.infoLine1Y);
    ctx.fillText(`装备：${s.weaponLine}`, L.nameX, L.infoLine2Y);
  }

  /* ---------- 内部：HP / MP / EXP 资源条 ---------- */

  _renderBars() {
    const ctx = this.ctx;
    const L = this.layout;
    this.bars.forEach((bar, i) => {
      const y = L.bars.firstY + i * L.bars.step;
      drawBar(ctx, planBar({
        kind: bar.kind,
        x: L.bars.x, y, w: L.bars.w, h: L.bars.h,
        ratio: bar.ratio,
        label: bar.label,
        valueText: bar.valueText,
      }));
    });
  }

  /* ---------- 内部：左栏（职业 / 个人技 / 简介） ---------- */

  _renderInfoLines() {
    const ctx = this.ctx;
    const L = this.layout;
    const s = this.snapshot;
    const X = L.bio.x;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.font = fontCss(16, 'bold');
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText(`职业 · ${s.className}`, X, L.classLineY);
    ctx.fillText(`个人技 · ${s.personalSkillName || '无'}`, X, L.skillLineY);

    ctx.fillStyle = PALETTE.title;
    ctx.fillText('简介', X, L.bioTitleY);

    if (this.bioBlock.empty) {
      ctx.font = fontCss(14);
      ctx.fillStyle = PALETTE.text;
      ctx.fillText('（暂无简介）', X, L.bio.y + L.bio.lineH / 2);
      return;
    }
    drawWrappedLines(ctx, this.bioBlock, X, L.bio.y, {
      font: fontCss(14),
      color: PALETTE.text,
      align: 'left',
      lineHeight: L.bio.lineH,
    });
  }

  /* ---------- 内部：右栏九维条 ---------- */

  _renderStatRows() {
    const ctx = this.ctx;
    const L = this.layout;
    const R = L.statRows;
    ctx.textBaseline = 'middle';
    for (let i = 0; i < this.statRows.length; i++) {
      const row = this.statRows[i];
      const rowY = R.y + i * R.rowH + R.rowH / 2;

      ctx.textAlign = 'right';
      ctx.font = fontCss(16);
      ctx.fillStyle = PALETTE.ink;
      ctx.fillText(row.label, R.labelRightX, rowY);

      drawBar(ctx, planBar({
        kind: 'stat',
        x: L.statBar.x, y: rowY - L.statBar.h / 2, w: L.statBar.w, h: L.statBar.h,
        ratio: row.ratio,
      }));

      ctx.textAlign = 'right';
      ctx.font = fontCss(15, 'bold');
      ctx.fillStyle = PALETTE.ink;
      ctx.fillText(row.valueText, L.statValueRight, rowY);
    }
  }
}
