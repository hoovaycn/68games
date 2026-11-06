import { sound } from '../engine/sound.js';
import { assetLoader } from '../engine/asset_loader.js';
import { drawLoadingScreen } from '../ui/loading_screen.js';

/**
 * 浅黄纸质极简风剧情剧场组件 (Story Visual Novel Layer)
 * 统一色调：浅暖米黄底色 (#FAF5EB) + 深炭暖黑字体 (#1C1917) + 大气名牌与大按钮
 */
export class DialogueSystem {
  constructor(canvas, onSceneComplete, onItemEvent = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onSceneComplete = onSceneComplete;
    this.onItemEvent = onItemEvent;

    this.currentScene = null;
    this.dialogueIndex = 0;
    this.activeLine = null;

    this.displayedText = '';
    this.charIndex = 0;
    this.typingSpeed = 22;
    this.lastCharTime = 0;
    this.isLineComplete = false;
    this.pages = [''];
    this.pageIndex = 0;

    this.choiceButtonRect = null;
    this.showingChoice = false;
    this.waitingForItemConfirm = false;
    this.loading = false;
    this.loadToken = 0;
  }

  startScene(sceneData) {
    this.currentScene = sceneData;
    this.dialogueIndex = 0;
    this.showingChoice = false;
    this.choiceButtonRect = null;
    this.waitingForItemConfirm = false;
    this.pages = [''];
    this.pageIndex = 0;

    if (sceneData.bgm) {
      sound.playBgm(sceneData.bgm);
    }

    this.loadLine(0);
  }

  /**
   * 将一段文本按照最大像素宽度拆分为多行
   */
  splitIntoLines(text, maxWidth, font = 'bold 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif') {
    const rawParagraphs = (text || '').split('\n');
    const lines = [];

    const measure = (str) => {
      if (this.ctx && typeof this.ctx.measureText === 'function') {
        const m = this.ctx.measureText(str);
        if (m && typeof m.width === 'number' && m.width > 0) {
          return m.width;
        }
      }
      let w = 0;
      for (let i = 0; i < str.length; i++) {
        w += str.charCodeAt(i) > 255 ? 22 : 12;
      }
      return w;
    };

    if (this.ctx && typeof this.ctx.save === 'function') {
      this.ctx.save();
      this.ctx.font = font;
    }

    for (let pIdx = 0; pIdx < rawParagraphs.length; pIdx++) {
      const p = rawParagraphs[pIdx];
      if (p === '') {
        lines.push('');
        continue;
      }
      const chars = p.split('');
      let currentLine = '';
      for (let i = 0; i < chars.length; i++) {
        const testLine = currentLine + chars[i];
        if (measure(testLine) > maxWidth && i > 0 && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = chars[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
    }

    if (this.ctx && typeof this.ctx.restore === 'function') {
      this.ctx.restore();
    }

    return lines;
  }

  /**
   * 剧情文本分页：
   * 1. 支持显式断句标记：[next] / [NEXT] / | / ｜ / \n\n，按作者节奏分段
   * 2. 对超长文本（测量超过 maxLinesPerPage，默认 3 行）自动截断分页，每 3 行一页兜底
   */
  paginateText(text, maxLinesPerPage = 3) {
    if (!text) return [''];
    // 显式分隔符正则
    const explicitSegments = text.split(/\s*\[(?:next|NEXT)\]\s*|\s*[|｜]\s*|\n\n+/);
    const boxW = (this.canvas?.width || 960) - 60;
    const maxWidth = boxW - 64;
    const pages = [];

    // 若整段文本既没有显式断句符号，总行数也在限制内，保持原样单页
    if (explicitSegments.length <= 1) {
      const lines = this.splitIntoLines(text, maxWidth);
      if (lines.length <= maxLinesPerPage) {
        return [text];
      }
      for (let i = 0; i < lines.length; i += maxLinesPerPage) {
        pages.push(lines.slice(i, i + maxLinesPerPage).join('\n'));
      }
      return pages.length ? pages : [text];
    }

    for (const segment of explicitSegments) {
      const trimmed = segment.trim();
      if (!trimmed) continue;
      const lines = this.splitIntoLines(trimmed, maxWidth);
      if (lines.length <= maxLinesPerPage) {
        pages.push(trimmed);
      } else {
        for (let i = 0; i < lines.length; i += maxLinesPerPage) {
          pages.push(lines.slice(i, i + maxLinesPerPage).join('\n'));
        }
      }
    }

    return pages.length ? pages : [text];
  }

  loadLine(index) {
    if (!this.currentScene || !this.currentScene.dialogues) return;

    if (index >= this.currentScene.dialogues.length) {
      this.onDialoguesEnd();
      return;
    }

    this.dialogueIndex = index;
    this.activeLine = this.currentScene.dialogues[index];
    this.waitingForItemConfirm = false;
    this.pages = this.paginateText(this.activeLine.text);
    this.pageIndex = 0;
    this.displayedText = '';
    this.charIndex = 0;
    this.isLineComplete = false;
    this.lastCharTime = performance.now();
    this.prepareLineImages();
    if (!this.loading) this.playLineAudio();
  }

  playLineAudio() {
    if (this.activeLine.bgm) {
      sound.playBgm(this.activeLine.bgm);
    }

    if (this.activeLine.sfx) {
      sound.playSfx(this.activeLine.sfx);
    } else {
      sound.playSfx('sfx_text_blip');
    }
  }

  prepareLineImages() {
    const token = ++this.loadToken;
    this.loading = false;
    if (typeof window === 'undefined') return;

    const line = this.activeLine;
    const bg = line?.bgImg || this.currentScene?.bgImg;
    const fallback = bg && this.currentScene?.bgImgFallback;
    const portraits = line?.hidePortraits ? [] : [line?.leftPortrait, line?.rightPortrait].filter(Boolean);
    const paths = [...new Set([bg, ...portraits].filter(Boolean))];
    if (!paths.length) return;

    // 先发起请求，加载完成之前不显示这一句，避免特写/立绘晚于台词出现。
    const pending = paths.some(src => {
      const resource = assetLoader.loadWithChromaKey(src);
      return resource && !resource.loaded && !resource.error;
    });
    const bgFallbackPending = bg && fallback && assetLoader.cache[bg]?.error
      && !assetLoader.cache[fallback]?.loaded;
    if (!pending && !bgFallbackPending) return;
    this.loading = true;
    if (fallback) assetLoader.loadWithChromaKey(fallback);
    const bgReady = bg ? assetLoader.waitFor(bg).then(ok => ok || !fallback
      ? ok : assetLoader.waitFor(fallback)) : Promise.resolve(true);
    Promise.all([bgReady, ...portraits.map(src => assetLoader.waitFor(src))]).then(() => {
      if (token !== this.loadToken) return;
      this.loading = false;
      this.lastCharTime = performance.now();
      this.playLineAudio();
    });
  }

  onDialoguesEnd() {
    const transition = this.currentScene.transition;
    if (transition && (transition.type === 'CHOICE' || transition.type === 'SPAWN_REINFORCEMENT' || transition.type === 'JOIN_PARTY')) {
      this.showingChoice = true;
      sound.playSfx('sfx_menu_open');
    } else {
      if (this.onSceneComplete) {
        this.onSceneComplete(transition);
      }
    }
  }

  next() {
    if (this.waitingForItemConfirm || this.loading) return;

    if (this.showingChoice) {
      if (this.onSceneComplete) {
        this.onSceneComplete(this.currentScene.transition);
      }
      return;
    }

    const currentTargetText = this.pages[this.pageIndex] || '';

    if (!this.isLineComplete) {
      this.displayedText = currentTargetText;
      this.isLineComplete = true;
    } else if (this.pageIndex < this.pages.length - 1) {
      // 存在下一页（断句分页或超长分页），切入子页
      this.pageIndex++;
      this.displayedText = '';
      this.charIndex = 0;
      this.isLineComplete = false;
      this.lastCharTime = performance.now();
      sound.playSfx('sfx_text_blip');
    } else {
      // 本句所有分页均已播放完毕
      if (this.activeLine.itemEvent && this.onItemEvent?.(this.activeLine.itemEvent)) {
        this.waitingForItemConfirm = true;
        return;
      }
      this.loadLine(this.dialogueIndex + 1);
    }
  }

  continueAfterItemEvent() {
    if (!this.waitingForItemConfirm) return;
    this.waitingForItemConfirm = false;
    this.loadLine(this.dialogueIndex + 1);
  }

  render() {
    if (!this.currentScene) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    if (this.loading) {
      drawLoadingScreen(ctx, w, h, '正在准备剧情画面');
      return;
    }

    // 1. 绘制场景环境背景 (外部图或内建温暖浅黄环境)
    this.drawSceneBackground(ctx, w, h);

    // 2. 照片特写时由场景图呈现人物，不再盖上对白立绘。
    if (this.activeLine && !this.showingChoice && !this.activeLine.hidePortraits) {
      this.drawPortraits(ctx, w, h);
    }

    // 3. 绘制对话框或全屏字幕
    if (!this.showingChoice) {
      if (this.currentScene && this.currentScene.displayMode === 'fullscreen') {
        this.drawFullscreenText(ctx, w, h);
      } else {
        this.drawDialogueBox(ctx, w, h);
      }
    } else {
      this.drawChoicePrompt(ctx, w, h);
    }
  }

  drawFullscreenText(ctx, w, h) {
    const currentTargetText = this.pages[this.pageIndex] || '';
    const now = performance.now();
    if (!this.isLineComplete && this.activeLine) {
      if (now - this.lastCharTime >= this.typingSpeed) {
        this.charIndex++;
        this.displayedText = currentTargetText.substring(0, this.charIndex);
        this.lastCharTime = now;
        if (this.charIndex >= currentTargetText.length) {
          this.isLineComplete = true;
        }
      }
    }

    // 全屏居中字幕
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "PingFang SC", "Microsoft YaHei", sans-serif';
    
    // 支持多行居中
    const maxWidth = w - 160;
    const lineHeight = 40;
    this.wrapTextCentered(ctx, this.displayedText, w / 2, h / 2, maxWidth, lineHeight);

    // 底部推进提示符
    if (this.isLineComplete) {
      const pulse = Math.sin(Date.now() / 160) > 0;
      if (pulse) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        const hasMorePages = this.pageIndex < this.pages.length - 1;
        const pageLabel = this.pages.length > 1 ? ` (${this.pageIndex + 1}/${this.pages.length})` : '';
        const promptText = hasMorePages
          ? `点击或按空格翻页${pageLabel} ▶`
          : `点击或按空格继续${pageLabel} ▶`;
        ctx.fillText(promptText, w / 2, h - 60);
      }
    }
  }

  drawSceneBackground(ctx, w, h) {
    let hasBgImg = false;
    let bgImgSrc = (this.activeLine && this.activeLine.bgImg) || (this.currentScene && this.currentScene.bgImg);
    if (bgImgSrc) {
      let externalImg = assetLoader.getImage(bgImgSrc);
      if (!externalImg && this.currentScene && this.currentScene.bgImgFallback) {
        externalImg = assetLoader.getImage(this.currentScene.bgImgFallback);
      }
      if (externalImg) {
        ctx.drawImage(externalImg, 0, 0, w, h);
        hasBgImg = true;
      }
    }

    if (!hasBgImg) {
      if (this.currentScene && this.currentScene.bgType === 'black') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
      } else {
        // 统一雅致浅黄底色背景
        ctx.fillStyle = '#f5eedf';
        ctx.fillRect(0, 0, w, h);

        // 内建柔和暖光轮廓
        ctx.fillStyle = '#eae0cb';
        ctx.fillRect(16, 16, w - 32, h - 32);

        ctx.strokeStyle = '#d6c7ac';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(16, 16, w - 32, h - 32);
      }

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
    // 回忆闪回段：立绘统一做黑白做旧处理，便于区分时间线（现在 vs 回忆）
    const isFlashback = !!line.flashback;

    // 立绘尺寸适配 960×540 屏幕：高 320px、宽 240px，顶部留空 80px，底部隐入对话框后
    const PORTRAIT_W = 240;
    const PORTRAIT_H = 320;

    // 回忆段滤镜：黑白 + 轻微泛黄做旧；非活跃方更暗
    const flashbackActiveFilter = 'grayscale(100%) sepia(18%) brightness(88%) contrast(92%)';
    const flashbackInactiveFilter = 'grayscale(100%) sepia(18%) brightness(38%) contrast(92%)';
    const inactiveFilter = 'brightness(30%) grayscale(50%)';

    // 左立绘 (主角)
    if (line.leftPortrait) {
      const leftImg = assetLoader.getImage(line.leftPortrait);
      if (leftImg) {
        ctx.save();
        const x = 36;
        const y = h - PORTRAIT_H - 130 + (isLeftActive ? -6 : 6);

        if (isFlashback) {
          ctx.filter = isLeftActive ? flashbackActiveFilter : flashbackInactiveFilter;
        } else if (!isLeftActive) {
          ctx.filter = inactiveFilter;
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

        if (isFlashback) {
          ctx.filter = !isLeftActive ? flashbackActiveFilter : flashbackInactiveFilter;
        } else if (isLeftActive) {
          ctx.filter = inactiveFilter;
        }
        ctx.drawImage(rightImg, x, y, PORTRAIT_W, PORTRAIT_H);
        ctx.restore();
      }
    }
  }

  drawDialogueBox(ctx, w, h) {
    const currentTargetText = this.pages[this.pageIndex] || '';
    const now = performance.now();
    if (!this.isLineComplete && this.activeLine) {
      if (now - this.lastCharTime >= this.typingSpeed) {
        this.charIndex++;
        this.displayedText = currentTargetText.substring(0, this.charIndex);
        this.lastCharTime = now;
        if (this.charIndex >= currentTargetText.length) {
          this.isLineComplete = true;
        }
      }
    }

    // 对话框尺寸适配 960×540 设计分辨率
    const boxW = w - 60;
    const boxH = 180;
    const x = 30;
    const y = h - boxH - 24;
    const isBlackBg = this.currentScene && this.currentScene.bgType === 'black';

    // 浅黄暖白羊皮纸质感对话框 (黑屏模式下用纯黑半透明)
    ctx.fillStyle = isBlackBg ? 'rgba(0, 0, 0, 0.7)' : '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 12);
    ctx.fill();

    ctx.strokeStyle = isBlackBg ? '#333333' : '#d6c8b4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 加大加宽的人物姓名牌 (宽 240, 高 50)
    if (this.activeLine) {
      let speakerName = this.activeLine.speaker || '';
      // 支持动态变量替换
      if (speakerName && window.app && window.app.gameState && window.app.gameState.mcName) {
        speakerName = speakerName.replace('{MC_NAME}', window.app.gameState.mcName);
      }

      const nameW = 240;
      const nameH = 50;
      const nameX = x + 20;
      const nameY = y - 24;
      const isSystem = speakerName === '系统提示';

      ctx.fillStyle = isSystem ? (isBlackBg ? '#333333' : '#8a7d6b') : (isBlackBg ? '#1a1a1a' : '#292524');
      ctx.beginPath();
      ctx.roundRect(nameX, nameY, nameW, nameH, 8);
      ctx.fill();

      ctx.strokeStyle = isBlackBg ? '#333333' : '#d6c8b4';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = isSystem ? (isBlackBg ? '#aaaaaa' : '#ffffff') : (isBlackBg ? '#e5e5e5' : '#ffffff');
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(speakerName, nameX + nameW / 2, nameY + nameH / 2);
    }

    // 正文台词：钩子句（highlight）用红色大字突出，普通句用纯黑暖灰
    // 每页保证不超过 3 行，字号统一为 22px，行高 34px，排版舒展呼吸感充足
    const isHighlight = !!(this.activeLine && this.activeLine.highlight);
    ctx.fillStyle = isHighlight ? (isBlackBg ? '#ef4444' : '#b91c1c') : (isBlackBg ? '#cccccc' : '#1c1917');
    ctx.font = isHighlight
      ? 'bold 24px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif'
      : 'bold 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    this.wrapText(ctx, this.displayedText, x + 32, y + 36, boxW - 64, 34);

    // 剧情存档入口：键盘 Esc、手柄 Start 或触屏按钮。
    if (!this.showingChoice) {
      ctx.save();
      ctx.fillStyle = 'rgba(120, 113, 108, 0.85)';
      ctx.font = '13px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText('Esc / 手柄 Start / 触屏存档：打开存读档菜单', x + 28, y + boxH - 12);
      ctx.restore();
    }

    // 底部推进提示符
    if (this.isLineComplete) {
      const pulse = Math.sin(Date.now() / 160) > 0;
      if (pulse) {
        ctx.fillStyle = '#78716c';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'right';
        const hasMorePages = this.pageIndex < this.pages.length - 1;
        const pageLabel = this.pages.length > 1 ? ` (${this.pageIndex + 1}/${this.pages.length})` : '';
        const promptText = hasMorePages
          ? `点击或按空格翻页${pageLabel} ▶`
          : `点击或按空格继续${pageLabel} ▶`;
        ctx.fillText(promptText, x + boxW - 28, y + boxH - 24);
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
    const titleText = tr.type === 'JOIN_PARTY' ? '—— 伙伴同行与前路 ——' : '—— 场景行动选择 ——';
    ctx.fillText(titleText, w / 2, y + 40);

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
    const rawParagraphs = (text || '').split('\n');
    let currY = y;

    for (let pIdx = 0; pIdx < rawParagraphs.length; pIdx++) {
      const paragraph = rawParagraphs[pIdx];
      const chars = paragraph.split('');
      let line = '';

      for (let n = 0; n < chars.length; n++) {
        const testLine = line + chars[n];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, currY);
          line = chars[n];
          currY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currY);
      if (pIdx < rawParagraphs.length - 1) {
        currY += lineHeight;
      }
    }
  }
}
