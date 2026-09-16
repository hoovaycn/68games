import { sound } from '../../engine/sound.js';
import { assetLoader } from '../../engine/asset_loader.js';

/**
 * 通用战斗胜利与结算面板组件 (Victory & Result Modal)
 * 采用全界面统一的浅黄羊皮纸/黑金视觉语言 (#FFFDF9 / #292524 / #FACC15)
 * 展示：战斗评级 (SS/S/A)、所用回合数、击败敌方数、战利品获得、确认下一步按钮
 * ★ 大气版：整体 620×400，全面加大字号与留白，信息行宽松舒展
 */
export class VictoryModal {
  constructor(canvas, config, onConfirm) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config || {};
    this.onConfirm = onConfirm;

    this.buttonRect = null;
    sound.playBgm('bgm_victory', false);
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 半透明深暖色调遮罩背景
    ctx.fillStyle = 'rgba(15, 12, 10, 0.72)';
    ctx.fillRect(0, 0, w, h);

    // 浅黄纸质极简面板 (大气版 620×400)
    const boxW = 620;
    const boxH = 400;
    const x = (w - boxW) / 2;
    const y = (h - boxH) / 2;

    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 16);
    ctx.fill();

    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 内衬线
    ctx.strokeStyle = '#e2d5bd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 7, y + 7, boxW - 14, boxH - 14, 12);
    ctx.stroke();

    // 1. 胜利黑金 Header
    const headH = 66;
    const headGrad = ctx.createLinearGradient(0, y + 14, 0, y + 14 + headH);
    headGrad.addColorStop(0, '#292524');
    headGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.roundRect(x + 14, y + 14, boxW - 28, headH, 10);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★  战 斗 胜 利  ★', w / 2, y + 14 + headH / 2);

    // 2. 评级印章 (SS / S / A)：优先贴图，缺失回落程序绘制
    const turns = this.config.turns || 1;
    const rankText = turns <= 2 ? 'SS' : (turns <= 4 ? 'S' : 'A');
    const stampX = x + boxW - 92;
    const stampY = y + 150;

    const rankImg = assetLoader.getImage(`assets/ui/ui_rank_${rankText.toLowerCase()}.png`);
    if (rankImg) {
      // 贴图 96×96 内主体直径 68 居中（≈ 原 arc r=34）
      const stampSize = 96;
      ctx.drawImage(rankImg, stampX - stampSize / 2, stampY - stampSize / 2, stampSize, stampSize);
    } else {
      ctx.save();
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(stampX, stampY, 34, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(rankText, stampX, stampY - 3);
      ctx.font = '11px sans-serif';
      ctx.fillText('EVALUATION', stampX, stampY + 19);
      ctx.restore();
    }

    // 3. 统计数据列 (左对齐大字)
    ctx.fillStyle = '#44403c';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'left';

    const infoX = x + 48;
    let currY = y + 118;

    ctx.fillText(`关卡目标：${this.config.objectiveText || '击败目标敌方单位'}`, infoX, currY);
    currY += 38;

    ctx.fillText(`通关回合：第 ${turns} 回合`, infoX, currY);
    currY += 38;

    const enemyName = this.config.enemyName || '敌方单位';
    ctx.fillText(`击败单位：${enemyName}`, infoX, currY);
    currY += 44;

    // 4. 战利品展示区 (加高内衬卡)
    if (this.config.lootName) {
      ctx.fillStyle = '#f5eedf';
      ctx.beginPath();
      ctx.roundRect(infoX, currY, boxW - 210, 54, 9);
      ctx.fill();

      ctx.strokeStyle = '#e2d5bd';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#7c2d12';
      ctx.font = 'bold 18px sans-serif';
      // 战利品过多时按卡宽截断，尾部省略号，避免文字溢出面板
      const lootMaxW = (boxW - 210) - 40;   // 卡内可用文字宽度（左右各留 20）
      let lootText = `获得战利品：【${this.config.lootName}】`;
      if (ctx.measureText(lootText).width > lootMaxW) {
        while (lootText.length > 1 && ctx.measureText(lootText + '…').width > lootMaxW) {
          lootText = lootText.slice(0, -1);
        }
        lootText += '…';
      }
      ctx.fillText(lootText, infoX + 20, currY + 27);
      currY += 54;
    }

    // 5. 统一主 UI 黑金风格的大确认按钮 (360×52)
    const btnW = 360;
    const btnH = 52;
    const btnX = (w - btnW) / 2;
    const btnY = y + boxH - btnH - 24;
    this.buttonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    const btnGrad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
    btnGrad.addColorStop(0, '#292524');
    btnGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 10);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 21px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.config.buttonText || '【 确认并继续剧情 ▶ 】', w / 2, btnY + btnH / 2);
  }

  confirm() {
    sound.playSfx('sfx_confirm');
    if (this.onConfirm) {
      const cb = this.onConfirm;
      this.onConfirm = null;
      cb();
    }
  }

  handleClick(mouseX, mouseY) {
    this.confirm();
    return true;
  }

  handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
      this.confirm();
      return true;
    }
    return false;
  }
}
