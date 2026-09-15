import { sound } from '../engine/sound.js';
import { assetLoader } from '../engine/asset_loader.js';

/**
 * 浅黄纸质极简风剧情剧场组件 (Story Visual Novel Layer)
 * 统一色调：浅暖米黄底色 (#FAF5EB) + 深炭暖黑字体 (#1C1917) + 大气名牌与大按钮
 */
export class DialogueSystem {
  constructor(canvas, onSceneComplete) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onSceneComplete = onSceneComplete;

    this.currentScene = null;
    this.dialogueIndex = 0;
    this.activeLine = null;

    this.displayedText = '';
    this.charIndex = 0;
    this.typingSpeed = 22;
    this.lastCharTime = 0;
    this.isLineComplete = false;

    this.choiceButtonRect = null;
    this.showingChoice = false;
  }

  startScene(sceneData) {
    this.currentScene = sceneData;
    this.dialogueIndex = 0;
    this.showingChoice = false;
    this.choiceButtonRect = null;

    if (sceneData.bgm) {
      sound.playBgm(sceneData.bgm);
    }

    this.loadLine(0);
  }

  loadLine(index) {
    if (!this.currentScene || !this.currentScene.dialogues) return;

    if (index >= this.currentScene.dialogues.length) {
      this.onDialoguesEnd();
      return;
    }

    this.dialogueIndex = index;
    this.activeLine = this.currentScene.dialogues[index];
    this.displayedText = '';
    this.charIndex = 0;
    this.isLineComplete = false;
    this.lastCharTime = performance.now();

    if (this.activeLine.bgm) {
      sound.playBgm(this.activeLine.bgm);
    }

    if (this.activeLine.sfx) {
      sound.playSfx(this.activeLine.sfx);
    } else {
      sound.playSfx('sfx_text_blip');
    }
  }

  onDialoguesEnd() {
    const transition = this.currentScene.transition;
    if (transition && (transition.type === 'CHOICE' || transition.type === 'SPAWN_REINFORCEMENT')) {
      this.showingChoice = true;
      sound.playSfx('sfx_menu_open');
    } else {
      if (this.onSceneComplete) {
        this.onSceneComplete(transition);
      }
    }
  }

  next() {
    if (this.showingChoice) {
      if (this.onSceneComplete) {
        this.onSceneComplete(this.currentScene.transition);
      }
      return;
    }

    if (!this.isLineComplete) {
      this.displayedText = this.activeLine.text;
      this.isLineComplete = true;
    } else {
      this.loadLine(this.dialogueIndex + 1);
    }
  }

  render() {
    if (!this.currentScene) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. 绘制场景环境背景 (外部图或内建温暖浅黄环境)
    this.drawSceneBackground(ctx, w, h);

    // 2. 绘制半身大立绘
    if (this.activeLine && !this.showingChoice) {
      this.drawPortraits(ctx, w, h);
    }

    // 3. 绘制浅黄纸质对话框
    if (!this.showingChoice) {
      this.drawDialogueBox(ctx, w, h);
    } else {
      this.drawChoicePrompt(ctx, w, h);
    }
  }

  drawSceneBackground(ctx, w, h) {
    let hasBgImg = false;
    const bgImgSrc = (this.activeLine && this.activeLine.bgImg) || (this.currentScene && this.currentScene.bgImg);
    if (bgImgSrc) {
      const externalImg = assetLoader.getImage(bgImgSrc);
      if (externalImg) {
        ctx.drawImage(externalImg, 0, 0, w, h);
        hasBgImg = true;
      }
    }

    if (!hasBgImg) {
      // 统一雅致浅黄底色背景
      ctx.fillStyle = '#f5eedf';
      ctx.fillRect(0, 0, w, h);

      // 内建柔和暖光轮廓
      ctx.fillStyle = '#eae0cb';
      ctx.fillRect(16, 16, w - 32, h - 32);

      ctx.strokeStyle = '#d6c7ac';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(16, 16, w - 32, h - 32);

      // 顶部场景标题横幅
      ctx.fillStyle = '#78716c';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`【${this.currentScene.title}】`, w / 2, 38);
    }
  }

  drawPortraits(ctx, w, h) {
    const line = this.activeLine;
    const isLeftActive = line.activeSide === 'left';

    // 立绘尺寸适配 960×540 屏幕：高 320px、宽 240px，顶部留空 80px，底部隐入对话框后
    const PORTRAIT_W = 240;
    const PORTRAIT_H = 320;

    // 左立绘 (主角)
    if (line.leftPortrait) {
      const leftImg = assetLoader.getImage(line.leftPortrait);
      if (leftImg) {
        ctx.save();
        const x = 36;
        const y = h - PORTRAIT_H - 130 + (isLeftActive ? -6 : 6);

        if (!isLeftActive) {
          ctx.filter = 'brightness(60%) contrast(90%)';
        }
        ctx.drawImage(leftImg, x, y, PORTRAIT_W, PORTRAIT_H);
        ctx.restore();
      }
    }

    // 右立绘 (NPC/同学/敌人)
    if (line.rightPortrait) {
      const rightImg = assetLoader.getImage(line.rightPortrait);
      if (rightImg) {
        ctx.save();
        const x = w - PORTRAIT_W - 36;
        const y = h - PORTRAIT_H - 130 + (!isLeftActive ? -6 : 6);

        if (isLeftActive) {
          ctx.filter = 'brightness(60%) contrast(90%)';
        }
        ctx.drawImage(rightImg, x, y, PORTRAIT_W, PORTRAIT_H);
        ctx.restore();
      }
    }
  }

  drawDialogueBox(ctx, w, h) {
    const now = performance.now();
    if (!this.isLineComplete && this.activeLine) {
      if (now - this.lastCharTime >= this.typingSpeed) {
        this.charIndex++;
        this.displayedText = this.activeLine.text.substring(0, this.charIndex);
        this.lastCharTime = now;
        if (this.charIndex >= this.activeLine.text.length) {
          this.isLineComplete = true;
        }
      }
    }

    // 对话框尺寸适配 960×540 设计分辨率
    const boxW = w - 60;
    const boxH = 180;
    const x = 30;
    const y = h - boxH - 24;

    // 浅黄暖白羊皮纸质感对话框
    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 12);
    ctx.fill();

    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 加大加宽的人物姓名牌 (宽 240, 高 50)
    if (this.activeLine) {
      const nameW = 240;
      const nameH = 50;
      const nameX = x + 20;
      const nameY = y - 24;

      ctx.fillStyle = '#292524';
      ctx.beginPath();
      ctx.roundRect(nameX, nameY, nameW, nameH, 8);
      ctx.fill();

      ctx.strokeStyle = '#d6c8b4';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.activeLine.speaker, nameX + nameW / 2, nameY + nameH / 2);
    }

    // 放大加粗的纯黑暖灰正文台词 (24px, 行高 34px)
    ctx.fillStyle = '#1c1917';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    this.wrapText(ctx, this.displayedText, x + 32, y + 36, boxW - 64, 34);

    // 底部推进提示符
    if (this.isLineComplete) {
      const pulse = Math.sin(Date.now() / 160) > 0;
      if (pulse) {
        ctx.fillStyle = '#78716c';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('点击或按空格继续 ▶', x + boxW - 28, y + boxH - 24);
      }
    }
  }

  drawChoicePrompt(ctx, w, h) {
    const tr = this.currentScene.transition;
    const boxW = 580;
    const boxH = 220;
    const x = (w - boxW) / 2;
    const y = (h - boxH) / 2 + 20;

    // 浅黄选择框
    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 12);
    ctx.fill();

    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#292524';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('—— 场景行动选择 ——', w / 2, y + 40);

    ctx.fillStyle = '#57534e';
    ctx.font = 'bold 18px sans-serif';
    // 水平居中绘制提示文案 (传入画布中轴 w / 2)
    this.wrapTextCentered(ctx, tr.prompt || '剧情告一段落，接下来是：', w / 2, y + 84, boxW - 60, 26);

    // 醒目的大按钮
    const btnW = 460;
    const btnH = 54;
    const btnX = (w - btnW) / 2;
    const btnY = y + 140;
    this.choiceButtonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 10);
    ctx.fill();

    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(tr.buttonText || '【确认行动】', w / 2, btnY + btnH / 2);
    ctx.restore();
  }

  wrapTextCentered(ctx, text, cx, y, maxWidth, lineHeight) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const chars = text.split('');
    let line = '';
    const lines = [];

    for (let n = 0; n < chars.length; n++) {
      const testLine = line + chars[n];
      if (ctx.measureText(testLine).width > maxWidth && n > 0) {
        lines.push(line);
        line = chars[n];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    let currY = y;
    for (const l of lines) {
      ctx.fillText(l, cx, currY);
      currY += lineHeight;
    }
    ctx.restore();
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let currY = y;

    for (let n = 0; n < chars.length; n++) {
      const testLine = line + chars[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currY);
        line = chars[n];
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currY);
  }
}
