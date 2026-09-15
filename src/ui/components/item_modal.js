import { sound } from '../../engine/sound.js';
import { assetLoader } from '../../engine/asset_loader.js';

/**
 * 通用道具/战利品获得弹窗组件 (Item Reward Modal Component)
 * 采用全界面统一的浅黄羊皮纸/黑金视觉语言 (#FFFDF9 / #292524 / #FACC15)
 * 支持描述文本自动多行折行、键盘 Enter / Space 响应与全域点击捕获
 * ★ 大气版：520×330，标题/道具名/描述/按钮全面加大，折行宽度同步放大防溢出
 */
export class ItemModal {
  constructor(canvas, config, onClose) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config || {};
    this.onClose = onClose;

    this.buttonRect = null;
    sound.playSfx('sfx_item_get');
  }

  // 文本自动多行折行 (居中绘制)
  wrapTextCentered(ctx, text, x, startY, maxWidth, lineHeight) {
    if (!text) return startY;
    const chars = text.split('');
    let line = '';
    const lines = [];

    for (let n = 0; n < chars.length; n++) {
      const testLine = line + chars[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = chars[n];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    lines.forEach((l, i) => {
      ctx.fillText(l, x, startY + i * lineHeight);
    });

    return startY + lines.length * lineHeight;
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. 半透明深暖色调遮罩
    ctx.fillStyle = 'rgba(15, 12, 10, 0.72)';
    ctx.fillRect(0, 0, w, h);

    // 2. 浅黄羊皮纸卡片弹窗 (大气版 520×330)
    const boxW = 520;
    const boxH = 330;
    const x = (w - boxW) / 2;
    const y = (h - boxH) / 2;

    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 14);
    ctx.fill();

    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 内衬精细修饰线
    ctx.strokeStyle = '#e2d5bd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 6, y + 6, boxW - 12, boxH - 12, 11);
    ctx.stroke();

    // 3. 弹窗标题 (加大)
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 25px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('—— 获得战利品 ——', w / 2, y + 42);

    // 4. 战利品图标与名称 (图标加大到 64)
    const iconImg = this.config.icon ? assetLoader.getImage(this.config.icon) : null;
    const iconSize = 64;
    const iconX = (w - iconSize) / 2;
    const iconY = y + 72;

    if (iconImg) {
      ctx.drawImage(iconImg, iconX, iconY, iconSize, iconSize);
    } else {
      // 图标缺失时的醒目占位 (道具名首字居中于金色方框，绝不静默空白)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.roundRect(iconX, iconY, iconSize, iconSize, 10);
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#7c2d12';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const nameStr = this.config.itemName || '物';
      ctx.fillText(nameStr.charAt(0), iconX + iconSize / 2, iconY + iconSize / 2 + 2);
    }

    ctx.fillStyle = '#7c2d12';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(this.config.itemName || '战利品', w / 2, iconY + iconSize + 26);

    // 5. 详细描述 (自动折行，限定宽 430px 与弹窗同步放大，杜绝溢出)
    ctx.fillStyle = '#57534e';
    ctx.font = '15px sans-serif';
    const descText = this.config.desc || '战利品道具，已成功放进背包。';
    this.wrapTextCentered(ctx, descText, w / 2, iconY + iconSize + 54, 430, 22);

    // 6. 主 UI 统一风格的大确认按钮 (深暖炭黑 + 亮金描边 + 亮黄大字)
    const btnW = 360;
    const btnH = 50;
    const btnX = (w - btnW) / 2;
    const btnY = y + boxH - btnH - 22;
    this.buttonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    const grad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
    grad.addColorStop(0, '#292524');
    grad.addColorStop(1, '#1c1917');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 10);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('【 收入背包 ▶ 】', w / 2, btnY + btnH / 2);
  }

  close() {
    sound.playSfx('sfx_confirm');
    if (this.onClose) {
      const cb = this.onClose;
      this.onClose = null;
      cb();
    }
  }

  handleClick(mouseX, mouseY) {
    this.close();
    return true;
  }

  handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
      this.close();
      return true;
    }
    return false;
  }
}
