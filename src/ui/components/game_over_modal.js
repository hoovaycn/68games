import { sound } from '../../engine/sound.js';

/**
 * 通用战斗失利面板组件 (Game Over Modal)
 * 采用全界面统一的黑金/浅灰/羊皮纸视觉语言，替代浏览器原生 alert
 * 提供：【重新挑战】与【返回标题】两个选项
 */
export class GameOverModal {
  constructor(canvas, config, onRetry, onTitle) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config || {};
    this.onRetry = onRetry;
    this.onTitle = onTitle;

    this.retryBtnRect = null;
    this.titleBtnRect = null;

    // 键盘选中态：0 = 重新挑战，1 = 返回主菜单（左右方向键切换）
    this.selectedIndex = 0;
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 半透明深暗色调遮罩背景
    ctx.fillStyle = 'rgba(8, 6, 8, 0.85)';
    ctx.fillRect(0, 0, w, h);

    // 面板容器 580×360
    const boxW = 580;
    const boxH = 360;
    const x = Math.round((w - boxW) / 2);
    const y = Math.round((h - boxH) / 2);

    // 卡片底色：深暗灰
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 16);
    ctx.fill();

    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 内衬线
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 7, y + 7, boxW - 14, boxH - 14, 12);
    ctx.stroke();

    // 1. 顶部红色警告 Header
    const headH = 58;
    const headGrad = ctx.createLinearGradient(0, y + 14, 0, y + 14 + headH);
    headGrad.addColorStop(0, '#450a0a');
    headGrad.addColorStop(1, '#290707');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.roundRect(x + 14, y + 14, boxW - 28, headH, 10);
    ctx.fill();

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#fca5a5';
    ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✖  战 斗 失 利  ✖', w / 2, y + 14 + headH / 2);

    // 2. 提示内容文案
    const textY = y + 120;
    ctx.fillStyle = '#e7e5e4';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('全员体力不支……在战斗中倒下了。', w / 2, textY);

    ctx.fillStyle = '#a8a29e';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillText('可选择回到本关初始状态重新挑战，或返回主菜单。', w / 2, textY + 32);
    ctx.fillText('（本次战斗中升的级、获得的经验与掉落将不保留）', w / 2, textY + 58);

    // 3. 底部双按钮：重新挑战 / 返回标题
    const btnW = 200;
    const btnH = 46;
    const btnY = y + boxH - btnH - 28;

    const retryX = x + 60;
    const titleX = x + boxW - 60 - btnW;

    this.retryBtnRect = { x: retryX, y: btnY, w: btnW, h: btnH };
    this.titleBtnRect = { x: titleX, y: btnY, w: btnW, h: btnH };

    // 重新挑战按钮（高亮金红渐变）
    const retryGrad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
    retryGrad.addColorStop(0, '#ea580c');
    retryGrad.addColorStop(1, '#c2410c');
    ctx.fillStyle = retryGrad;
    ctx.beginPath();
    ctx.roundRect(retryX, btnY, btnW, btnH, 8);
    ctx.fill();
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⟳  重新挑战', retryX + btnW / 2, btnY + btnH / 2);

    // 返回标题按钮（深灰低调）
    const titleGrad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
    titleGrad.addColorStop(0, '#3f3f46');
    titleGrad.addColorStop(1, '#27272a');
    ctx.fillStyle = titleGrad;
    ctx.beginPath();
    ctx.roundRect(titleX, btnY, btnW, btnH, 8);
    ctx.fill();
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#e4e4e7';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillText('⌂  返回主菜单', titleX + btnW / 2, btnY + btnH / 2);

    // 4. 键盘选中态高亮外框（醒目金框 + 轻微放大描边）
    const selRect = this.selectedIndex === 0 ? this.retryBtnRect : this.titleBtnRect;
    if (selRect) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(selRect.x - 3, selRect.y - 3, selRect.w + 6, selRect.h + 6, 10);
      ctx.stroke();
    }
  }

  handleClick(mouseX, mouseY) {
    if (this.retryBtnRect && this._isInRect(mouseX, mouseY, this.retryBtnRect)) {
      sound.playSfx('sfx_confirm');
      if (this.onRetry) this.onRetry();
      return true;
    }
    if (this.titleBtnRect && this._isInRect(mouseX, mouseY, this.titleBtnRect)) {
      sound.playSfx('sfx_cancel');
      if (this.onTitle) this.onTitle();
      return true;
    }
    return false;
  }

  /** 键盘导航：←→ 切换选项 · Enter/空格确认 · Esc 返回主菜单 */
  handleKeyDown(e) {
    const k = e && e.key;
    if (!k) return false;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') {
      this.selectedIndex = 0;
      sound.playSfx('sfx_cursor');
      return true;
    }
    if (k === 'ArrowRight' || k === 'd' || k === 'D') {
      this.selectedIndex = 1;
      sound.playSfx('sfx_cursor');
      return true;
    }
    if (k === 'Enter' || k === ' ') {
      if (this.selectedIndex === 0) {
        sound.playSfx('sfx_confirm');
        if (this.onRetry) this.onRetry();
      } else {
        sound.playSfx('sfx_cancel');
        if (this.onTitle) this.onTitle();
      }
      return true;
    }
    if (k === 'Escape') {
      sound.playSfx('sfx_cancel');
      if (this.onTitle) this.onTitle();
      return true;
    }
    return false;
  }

  _isInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
  }
}
