import { sound } from '../engine/sound.js';

/**
 * 序章/第一章终幕“未完待续”结束画面 (Epilogue Screen)
 * 简约深色风格 · 悬疑留白 · 保留官方交流群
 */
export class EpilogueScreen {
  constructor(canvas, onRestart) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onRestart = onRestart;
    this.isHovered = false;
    this.selectedRoute = 'male';
    this.restartButtonRect = null;
  }

  show(route) {
    this.selectedRoute = route || 'male';
    sound.playBgm('bgm_victory', false);
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. 深色沉浸背景渐变 (深邃蓝黑)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#05070d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 细致内边框
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(18, 18, w - 36, h - 36);

    ctx.strokeStyle = 'rgba(234, 179, 8, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(22, 22, w - 44, h - 44);

    // 2. 顶部微弱小标
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#64748b';
    ctx.font = '13px sans-serif';
    ctx.fillText('—— 《 六 8 班 异 闻 录 》 试 玩 结 算 ——', w / 2, 70);

    // 3. 核心大标题：TO BE CONTINUED
    ctx.shadowColor = 'rgba(250, 204, 21, 0.35)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#fef08a'; // 浅金黄
    ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('T O   B E   C O N T I N U E D', w / 2, 122);
    ctx.shadowBlur = 0;

    // 副标题
    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('全三章 · 试玩篇章完结', w / 2, 162);

    // 4. 简明剧情悬疑留白（简约一两句，不冗长不溢出）
    const isMale = this.selectedRoute === 'male';
    const quote = isMale
      ? '小默被暂时唤醒，但书桌抽屉里的怪味零食……似乎只是冰山一角。'
      : '妍熹的哭喊渐渐平息，但画室窗外微弱的乐音……仍在暗处回荡。';

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'italic 14px sans-serif';
    ctx.fillText(`“ ${quote} ”`, w / 2, 212);

    // 5. 简约深色 QQ 群展示卡片（清晰居中，不占过多高度）
    const cardW = 500;
    const cardH = 92;
    const cardX = (w - cardW) / 2;
    const cardY = 252;

    ctx.fillStyle = 'rgba(30, 41, 59, 0.55)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.fill();

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // QQ 群文字排版
    ctx.fillStyle = '#38bdf8'; // 天蓝高亮
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('官方交流 QQ 群 ： 875723019', w / 2, cardY + 34);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px sans-serif';
    ctx.fillText('欢迎入群交流剧情攻略、反馈问题与催更后续章节！', w / 2, cardY + 62);

    // 6. 底部返回按钮（简约深色高亮，无违和感）
    const btnW = 260;
    const btnH = 42;
    const btnX = (w - btnW) / 2;
    const btnY = 380;
    this.restartButtonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    if (this.isHovered) {
      ctx.fillStyle = '#d97706'; // 琥珀金
      ctx.strokeStyle = '#fde68a';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    }

    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 6);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(
      this.isHovered ? '▶ 返回标题界面' : '返回标题界面',
      w / 2,
      btnY + btnH / 2
    );

    // 快捷键提示
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText('[ 点击按钮 或 按 Space / Enter / Esc 返回 ]', w / 2, btnY + btnH + 28);

    ctx.restore();
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.restartButtonRect) return;
    const b = this.restartButtonRect;
    const hovered = (
      mouseX >= b.x && mouseX <= b.x + b.w &&
      mouseY >= b.y && mouseY <= b.y + b.h
    );

    if (this.isHovered !== hovered) {
      this.isHovered = hovered;
      if (hovered) sound.playSfx('sfx_cursor');
    }
  }

  handleClick(mouseX, mouseY) {
    if (!this.restartButtonRect) return false;
    const b = this.restartButtonRect;
    if (
      mouseX >= b.x && mouseX <= b.x + b.w &&
      mouseY >= b.y && mouseY <= b.y + b.h
    ) {
      sound.playSfx('sfx_confirm');
      if (this.onRestart) {
        this.onRestart();
      }
      return true;
    }
    return false;
  }
}
