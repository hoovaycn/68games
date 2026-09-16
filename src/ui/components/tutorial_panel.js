/**
 * tutorial_panel —— 新手教学面板组件（任务 #9）
 *
 * ── 设计动机（用户需求）──────────────────────────────
 * 第一关打流动商贩前，先弹教学面板，让小白玩家知道基本操作：
 *   ① 光标停在我方人员上按 Enter 选中 → 出现移动范围格
 *   ② 移动到敌方【旁边临近的单元格】（很多人不知道攻击要挨着）
 *   ③ 落位后的行动菜单四项（详情/攻击/道具/待机）与胜利条件
 *
 * ── 配置驱动 ─────────────────────────────────────────
 * 步骤内容全部来自关卡数据的 tutorial 配置块（ch0_battle1.tutorial），
 * 组件不硬编码任何文案——换关卡、换主角名都只改数据不改组件：
 *   config = { steps: [{ title, body, hint }, ...] }
 *
 * ── 组件形态 ─────────────────────────────────────────
 * 全屏模态弹层（继承 ModalBase，有遮罩）：战斗开场时挡住地图，
 * 逼玩家读完三步引导再开始操作；Escape 随时可关（跳过教学）。
 * ── 字儿和元素都大点：标题 24px / 正文 17px / 行高 28。
 */

import { ModalBase, planWrappedBlock, fontCss, PALETTE } from './ui_kit.js';
import { sound } from '../../engine/sound.js';

/* ══════════════ 1. 纯函数：步骤归一与按钮计划 ══════════════ */

/**
 * 步骤配置归一：过滤缺-title/body 的残条，hint 缺省补空串。
 * 全空 / null / 非数组 → 一条兜底步骤（组件永远有东西可展示）。
 */
export function normalizeTutorialSteps(cfg) {
  const raw = (cfg && Array.isArray(cfg.steps)) ? cfg.steps : [];
  const steps = raw
    .filter((s) => s && (s.title || s.body))
    .map((s) => ({
      title: String(s.title || '操作引导'),
      body: String(s.body || ''),
      hint: String(s.hint || '')
    }));
  if (steps.length === 0) {
    steps.push({ title: '开始行动', body: '祝你好运！', hint: '' });
  }
  return steps;
}

/**
 * 每步的按钮计划：首步无「上一步」，末步把「下一步」换成「开始行动」。
 * 单步教学只出一个按钮（没有翻页概念）。
 */
export function planTutorialButtons(stepIndex, totalSteps) {
  const last = stepIndex >= totalSteps - 1;
  const first = stepIndex <= 0;
  if (totalSteps <= 1) return [{ id: 'finish', label: '开始行动' }];
  if (first && last) return [{ id: 'finish', label: '开始行动' }];
  if (first) return [{ id: 'next', label: '下一步 ▶' }];
  if (last) return [{ id: 'prev', label: '◀ 上一步' }, { id: 'finish', label: '开始行动' }];
  return [{ id: 'prev', label: '◀ 上一步' }, { id: 'next', label: '下一步 ▶' }];
}

/* ══════════════ 2. 教学面板组件 ══════════════ */

/**
 * config.steps  三步（或 N 步）引导文案
 * render / handleClick / handleKeyDown 均走 ModalBase 挂接约定
 */
export class TutorialPanelModal extends ModalBase {
  constructor(canvas, config, onClose) {
    super(canvas, config, onClose);
    this.box = this.setupBox(680, 400);

    this.steps = normalizeTutorialSteps(config);
    this.stepIndex = 0;

    const ctx = this.ctx;
    if (ctx && typeof ctx.measureText === 'function') {
      ctx.font = fontCss(17);
      this.measure = (s) => ctx.measureText(s).width;
    } else {
      this.measure = (s) => String(s).length * 17; // 单测兜底：全角字≈字号宽
    }

    this.selectable = true;
    this._applyStep();
  }

  get step() { return this.steps[this.stepIndex] || null; }

  /** 步骤切换唯一入口：翻按钮 + 重算折行（幂等） */
  _applyStep() {
    const step = this.step || { title: '', body: '', hint: '' };
    this.setButtons(planTutorialButtons(this.stepIndex, this.steps.length));
    // 默认焦点落在「下一步/开始行动」——回车语义即"推进"，
    // 按钮序里 prev 在前导致 setButtons 的 focusIndex=0 总落在「上一步」，
    // 这里翻页/切步后统一纠偏到推进键。
    const preferIds = ['next', 'finish'];
    const prefer = this.buttons.findIndex((b) => preferIds.includes(b.id));
    if (prefer >= 0) this.focusIndex = prefer;
    this.bodyBlock = planWrappedBlock(step.body, this.measure, this.box.w - 96, 28);
  }

  _moveStep(delta) {
    const next = this.stepIndex + delta;
    if (next < 0 || next >= this.steps.length || next === this.stepIndex) return false;
    this.stepIndex = next;
    sound.playSfx('sfx_cursor');
    this._applyStep();
    return true;
  }

  /** 分支动作：翻页走组件内循环，finish 才关面板 */
  trigger(id) {
    if (id === 'next') { this._moveStep(1); return; }
    if (id === 'prev') { this._moveStep(-1); return; }
    if (id === 'finish') { this.close(); return; }
    this.close();
  }

  render() {
    this.renderFrame('新手教学');
    const ctx = this.ctx;
    const step = this.step || { title: '', hint: '' };
    const { x, y, w } = this.box;

    // 步骤指示（第 X / N 步）
    const cx = x + w / 2;
    ctx.fillStyle = '#a8a29e';
    ctx.font = fontCss(15, 'bold');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`第 ${this.stepIndex + 1} / ${this.steps.length} 步`, cx, y + 78);

    // 大标题
    ctx.fillStyle = PALETTE.title;
    ctx.font = fontCss(24, 'bold');
    ctx.fillText(step.title, cx, y + 122);

    // 步骤序号圆点
    const dotR = 5;
    const dotGap = 22;
    const dotsW = (this.steps.length - 1) * dotGap;
    this.steps.forEach((_, i) => {
      const dx = cx - dotsW / 2 + i * dotGap;
      ctx.beginPath();
      ctx.arc(dx, y + 158, dotR, 0, Math.PI * 2);
      ctx.fillStyle = i <= this.stepIndex ? '#d97706' : '#e7e5e4';
      ctx.fill();
    });

    // 正文折行块（居中逐行）
    if (this.bodyBlock && this.bodyBlock.lines.length) {
      ctx.fillStyle = PALETTE.text;
      ctx.font = fontCss(17);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      this.bodyBlock.lines.forEach((line, i) => {
        ctx.fillText(line, cx, y + 192 + i * this.bodyBlock.lineHeight);
      });
    }

    // 底部操作提示条
    if (step.hint) {
      const hw = w - 96;
      const hy = y + this.box.h - 118;
      ctx.fillStyle = 'rgba(217, 119, 6, 0.10)';
      ctx.beginPath();
      ctx.roundRect(cx - hw / 2, hy, hw, 44, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#b45309';
      ctx.font = fontCss(15, 'bold');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(step.hint, cx, hy + 22);
    }

    this.renderButtons();
  }
}
