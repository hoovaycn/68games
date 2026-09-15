import { sound } from '../engine/sound.js';
import { assetLoader } from '../engine/asset_loader.js';

/**
 * 序章终幕结算与“未完待续”结束画面 (Epilogue Screen)
 * 浅黄纸质极简复古风 + 校园悬疑调查手账风格
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
    this.selectedRoute = route;
    sound.playBgm('bgm_victory', false);
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. 柔和浅米黄背景
    ctx.fillStyle = '#f5eedf';
    ctx.fillRect(0, 0, w, h);

    // 双层古典内框
    ctx.strokeStyle = '#dfd2bc';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // 2. 顶部徽章标题
    ctx.save();
    ctx.fillStyle = '#78716c';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('—— 校园奇幻悬疑战棋 · 垂直切片试玩 ——', w / 2, 38);

    ctx.fillStyle = '#1c1917';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillText('《 六 8 班 异 闻 录 》', w / 2, 66);
    ctx.restore();

    // 3. 核心未完待续大横幅 (To Be Continued)
    ctx.save();
    const bannerW = 320;
    const bannerH = 40;
    const bannerX = (w - bannerW) / 2;
    const bannerY = 88;

    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 6);
    ctx.fill();

    ctx.fillStyle = '#fef08a'; // 浅金黄
    ctx.font = 'bold 18px "Courier New", Courier, monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★  T O   B E   C O N T I N U E D  ★', w / 2, bannerY + bannerH / 2);
    ctx.restore();

    // 4. 调查档案纸质手账 (中间卡片)
    const cardW = 500;
    const cardH = 246;
    const cardX = (w - cardW) / 2;
    const cardY = 138;

    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.fill();

    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 档案手账内容
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('【调查初报 · 异常事件收拢】', cardX + 20, cardY + 24);

    const isMale = this.selectedRoute === 'male';
    const heroName = isMale ? '张子骁 (书法特长 · 男主)' : '石予诺 (词汇敏锐 · 女主)';
    const victimName = isMale ? '范文默 (同桌 / 物理狂热)' : '何妍熹 (闺蜜 / 英语狂热)';

    ctx.fillStyle = '#292524';
    ctx.font = '13px sans-serif';
    ctx.fillText(`• 本期调查视角：${heroName}`, cardX + 20, cardY + 52);
    ctx.fillText(`• 异化核心目标：${victimName}`, cardX + 20, cardY + 74);

    // 战利品展示栏 (标签一行 + 证物两行两列：烤肠 / 混蛋汽水 / 臭袜子 / 体育老师的脑子)
    ctx.fillStyle = '#57534e';
    ctx.fillText('• 截获全部证物：', cardX + 20, cardY + 104);

    const evidences = [
      { img: 'sausage.png', name: '淀粉烤肠×1', color: '#b45309' },
      { img: 'bastard_soda.png', name: '混蛋汽水×1', color: '#2563eb' },
      { img: 'dirty_sock.png', name: '张子骁的臭袜子×1', color: '#b45309' },
      { img: 'pe_teacher_brain.png', name: '体育老师的脑子×1', color: '#dc2626' }
    ];
    ctx.font = 'bold 12px sans-serif';
    evidences.forEach((ev, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ex = cardX + 30 + col * 235;
      const ey = cardY + 118 + row * 28;
      const evImg = assetLoader.getImage('assets/items/' + ev.img);
      if (evImg) {
        ctx.drawImage(evImg, ex, ey, 22, 22);
      }
      ctx.fillStyle = ev.color;
      ctx.textAlign = 'left';
      ctx.fillText(ev.name, ex + 27, ey + 11);
    });

    // 总结文案
    ctx.fillStyle = '#44403c';
    ctx.font = '12px sans-serif';
    const summaryText = isMale
      ? '书桌上的三无荧光零食只是冰山一角，操纵小默做题的神秘意志仍在蔓延。'
      : '背词便利贴下隐藏着不可名状的催促声，妍熹的哭喊揭示了更深的阴谋。';
    ctx.fillText(`• 案件侦查进展：${summaryText}`, cardX + 20, cardY + 186);

    ctx.fillStyle = '#78716c';
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText('下回预告：第一章《晚自习的第 25 个座位》敬请期待！', cardX + 20, cardY + 216);
    ctx.restore();

    // 5. 底部大按钮 (重新开始 · 体验另一角色视角)
    const btnW = 340;
    const btnH = 44;
    const btnX = (w - btnW) / 2;
    const btnY = cardY + cardH + 16;
    this.restartButtonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    ctx.fillStyle = this.isHovered ? '#b45309' : '#292524';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 8);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.isHovered ? '▶ 点击重新开始 · 体验另一线视角' : '【 重新开始 · 体验另一视角 】',
      w / 2,
      btnY + btnH / 2
    );
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
