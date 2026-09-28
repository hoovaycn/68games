import { assetLoader } from '../engine/asset_loader.js';
import { sound } from '../engine/sound.js';

/**
 * 标题流程三状态机：S1 OPENING → S2 TITLE → S3 CHARACTER_SELECT
 * 设计分辨率 960×540，等比缩放由 index.html 控制，文字全部代码渲染。
 *
 * 子状态:
 *  - OPENING:        首次启动叙事开场，4 页打字机文案 + 末页白闪转场
 *  - TITLE:          标题屏，主标入场 + 三项主菜单（继续游戏/新的开始/存档管理）
 *  - CHARACTER_SELECT: 双卡角色选择，键盘/鼠标均可，焦点外发光
 *
 * 验收要点:
 *  1. 每次刷新都从 OPENING 开始播放
 *  2. S1 末页播 sfx_shock_sting + 白闪一帧进 S2
 *  3. S2 主标不挡 bg_title 的铅笔主体 (y≈120)
 *  4. S3 立绘用 assets/art/{id}_default.png 色键贴入，外发光用角色色系
 */
export class TitleScreen {
  constructor(canvas, onSelectCharacter, onMenuAction) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onSelectCharacter = onSelectCharacter;
    // D5 标题主菜单回调：'continue' | 'manage'（'new' 组件内部处理，走白幕进角色选择）
    this.onMenuAction = onMenuAction || null;

    // 子状态: 'DISCLAIMER' | 'OPENING' | 'TITLE' | 'CHARACTER_SELECT' | 'FADE_OUT'
    this.subStage = 'DISCLAIMER';

    // ---------- S0 DISCLAIMER 状态（游戏最前：虚构声明黑屏） ----------
    this.disclaimerLines = [
      '本故事纯属虚构。',
      '所有人物、地点与事件，均为虚构，',
      '如有雷同，纯属巧合。',
      '……至少，我们是这么被告诉的。'
    ];
    this.disclaimerLineIndex = 0;
    this.disclaimerDisplayedText = '';
    this.disclaimerCharIndex = 0;
    this.disclaimerLastCharTime = 0;
    this.disclaimerEnterTime = 0;
    this.disclaimerTypingSpeed = 45;   // ms / char
    this.disclaimerAllDone = false;    // 全文是否出完
    this.disclaimerPauseUntil = 0;     // 末行出完前的悬疑停顿时刻

    // ---------- S1 OPENING 状态 ----------
    this.openingPages = [
      '北京，海淀。人大附小，六（8）班。',
      '开学第三周，一切如常 —— 早读、默写、课间操，还有永远抢不到的乒乓球台。',
      '直到那天深夜，徐老师的手机，突然亮了。',
      '班里有几位同学，开始做一些…… 小学生不该做的事。'
    ];
    this.openingPageIndex = 0;
    this.openingDisplayedText = '';
    this.openingCharIndex = 0;
    this.openingLastCharTime = 0;
    this.openingTypingSpeed = 45;   // ms / char
    this.openingZoomStart = 0;       // 推近开始时间
    this.openingFlashStart = 0;      // 末页白闪开始时间
    this.openingFlashing = false;    // 是否触发白闪
    this.openingFadeOut = 0;         // 白闪结束淡出开始时间
    this.openingEnterTime = 0;       // 进入开场时刻

    // ---------- S2 TITLE 状态 ----------
    this.titleEnterTime = 0;
    this.titleMainText = '六（8）班异闻录';
    this.titleMainCharRevealed = 0;  // 逐字弹入进度 (canvas 回退版使用)
    this.titleSubShown = false;
    this.titleClicked = false;
    this.titleFadeWhiteStart = 0;    // 「新的开始」点选后白幕淡入
    this.titleBgmSwitched = false;
    // D5 主菜单：继续游戏 / 新的开始 / 存档管理（焦点 + 每帧刷新的命中区）
    this.titleMenuItems = [
      { id: 'continue', label: '继续游戏' },
      { id: 'new', label: '新的开始' },
      { id: 'manage', label: '存档管理' }
    ];
    this.titleMenuIndex = 0;
    this.titleMenuRects = [];
    this.hasContinue = false;   // 由 main.js setContinueAvailable 注入（无存档时置灰不可点）

    // ---------- S3 CHARACTER_SELECT 状态 ----------
    this.hoveredHero = null;
    this.focusedHero = null;         // 键盘焦点
    this.heroCards = [];

    // 通用白幕过渡
    this.whiteFadeAlpha = 0;
    this.whiteFadeStart = 0;
    this.whiteFadeTarget = null;     // 目标 subStage

    // 开场每次刷新都播放（不做跳过记忆）
  }

  /**
   * 进入标题流程入口：每次都从 DISCLAIMER（虚构声明黑屏）开始
   */
  enter() {
    this.enterDisclaimer();
  }

  // ============================================================
  // S0 DISCLAIMER（游戏最前的虚构声明黑屏）
  // ============================================================
  enterDisclaimer() {
    this.subStage = 'DISCLAIMER';
    this.disclaimerLineIndex = 0;
    this.disclaimerDisplayedText = '';
    this.disclaimerCharIndex = 0;
    this.disclaimerLastCharTime = performance.now();
    this.disclaimerEnterTime = performance.now();
    this.disclaimerAllDone = false;
    this.disclaimerPauseUntil = 0;
    this.hoveredSkip = false;
    this.skipRect = null;
    // 黑屏声明静默开场（不播 BGM）：进入 OPENING 后再切 bgm_suspense，营造悬疑迟疑
  }

  updateDisclaimer(now) {
    if (this.disclaimerAllDone) return;

    // 如果处于最后一行出现前的悬疑停顿中（1 秒）
    if (this.disclaimerPauseUntil > 0) {
      if (now < this.disclaimerPauseUntil) {
        return;
      }
      // 停顿结束，开始打最后一行
      this.disclaimerPauseUntil = 0;
      this.disclaimerLastCharTime = now;
    }

    const line = this.disclaimerLines[this.disclaimerLineIndex];
    if (!line) return;

    // 当前行逐字打印
    if (this.disclaimerCharIndex < line.length) {
      if (now - this.disclaimerLastCharTime > this.disclaimerTypingSpeed) {
        this.disclaimerCharIndex += 1;
        this.disclaimerDisplayedText = line.substring(0, this.disclaimerCharIndex);
        this.disclaimerLastCharTime = now;
        if (this.disclaimerCharIndex % 2 === 0) {
          sound.playSfx('sfx_text_blip');
        }
      }
    } else {
      // 当前行已打印完毕，判断是否翻到下一行
      if (this.disclaimerLineIndex < this.disclaimerLines.length - 1) {
        const nextIdx = this.disclaimerLineIndex + 1;
        // 如果即将出现最后一行，停顿 1 秒营造悬疑感
        if (nextIdx === this.disclaimerLines.length - 1) {
          this.disclaimerLineIndex = nextIdx;
          this.disclaimerDisplayedText = '';
          this.disclaimerCharIndex = 0;
          this.disclaimerPauseUntil = now + 1000;
        } else {
          // 普通行切换，自然连贯（停顿 250ms）
          if (now - this.disclaimerLastCharTime > 250) {
            this.disclaimerLineIndex = nextIdx;
            this.disclaimerDisplayedText = '';
            this.disclaimerCharIndex = 0;
            this.disclaimerLastCharTime = now;
          }
        }
      } else {
        // 全部行已完全打印完毕
        this.disclaimerAllDone = true;
      }
    }
  }

  handleDisclaimerAdvance() {
    // 若文字未全出完 → 点击/按键直接快速展示全部文字
    if (!this.disclaimerAllDone) {
      this.disclaimerLineIndex = this.disclaimerLines.length - 1;
      this.disclaimerDisplayedText = this.disclaimerLines[this.disclaimerLineIndex];
      this.disclaimerCharIndex = this.disclaimerDisplayedText.length;
      this.disclaimerPauseUntil = 0;
      this.disclaimerAllDone = true;
      return;
    }
    // 文字已全部出完 → 点击进入下一个画面（OPENING）
    this.enterOpening();
  }

  handleDisclaimerSkip() {
    this.enterOpening();
  }

  renderDisclaimer() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const now = performance.now();

    // 1. 纯黑背景
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // 2. 边缘暗红晕（悬疑氛围，不破坏"黑屏"基调）
    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.18, w / 2, h / 2, h * 0.9);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(120, 18, 18, 0.22)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // 3. 文字逐行打字机 + 整体入场淡入
    const fadeIn = Math.min(1, (now - this.disclaimerEnterTime) / 500);
    ctx.save();
    ctx.globalAlpha = fadeIn;

    const lineHeight = 44;
    const startY = h / 2 - (this.disclaimerLines.length * lineHeight) / 2 + lineHeight / 2;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px -apple-system, "PingFang SC", sans-serif';

    for (let i = 0; i < this.disclaimerLines.length; i++) {
      let text;
      if (i < this.disclaimerLineIndex) {
        text = this.disclaimerLines[i];
      } else if (i === this.disclaimerLineIndex) {
        text = this.disclaimerDisplayedText;
      } else {
        break; // 尚未到达的行不显示
      }
      // 末行悬疑句用更冷更暗的色调，制造"到底是不是真的"的迟疑感
      const isLast = i === this.disclaimerLines.length - 1;
      ctx.fillStyle = isLast ? 'rgba(196, 186, 170, 0.95)' : 'rgba(236, 229, 214, 0.95)';
      ctx.fillText(text, w / 2, startY + i * lineHeight);

      // 当前行打字中的闪烁光标
      if (i === this.disclaimerLineIndex
          && this.disclaimerCharIndex < this.disclaimerLines[i].length
          && Math.floor(now / 450) % 2 === 0) {
        const textW = ctx.measureText(text).width;
        ctx.fillStyle = 'rgba(236, 229, 214, 0.85)';
        ctx.fillText('|', w / 2 + textW / 2 + 10, startY + i * lineHeight);
      }
    }
    ctx.restore();

    // 4. 右上角跳过提示（复用 skipRect / hoveredSkip，与 OPENING 同款）
    const skipX = w - 144;
    const skipY = 18;
    const skipW = 124;
    const skipH = 46;
    ctx.fillStyle = this.hoveredSkip ? 'rgba(64, 52, 36, 0.92)' : 'rgba(20, 18, 16, 0.7)';
    ctx.beginPath();
    ctx.roundRect(skipX, skipY, skipW, skipH, 17);
    ctx.fill();
    ctx.strokeStyle = this.hoveredSkip ? 'rgba(245, 233, 208, 0.95)' : 'rgba(245, 233, 208, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(245, 233, 208, 0.9)';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('点击跳过 ▶', skipX + skipW / 2, skipY + 17);
    ctx.fillStyle = 'rgba(245, 233, 208, 0.45)';
    ctx.font = '10px sans-serif';
    ctx.fillText('或按 Esc', skipX + skipW / 2, skipY + 35);
    this.skipRect = { x: skipX, y: skipY, w: skipW, h: skipH };

    // 5. 底部操作提示（根据打字是否完成呈现不同文案，全部出完后突出"点击进入下一个画面"）
    ctx.fillStyle = this.disclaimerAllDone
      ? 'rgba(245, 233, 208, 0.85)'
      : 'rgba(245, 233, 208, 0.45)';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.disclaimerAllDone ? '点击任意处 / 回车 进入下一个画面 ▶' : '点击 / 回车 快速显示', w / 2, h - 30);
  }

  // ============================================================
  // S1 OPENING
  // ============================================================
  enterOpening() {
    this.subStage = 'OPENING';
    this.openingPageIndex = 0;
    this.openingDisplayedText = '';
    this.openingCharIndex = 0;
    this.openingLastCharTime = performance.now();
    this.openingZoomStart = performance.now();
    this.openingEnterTime = performance.now();
    this.openingFlashing = false;
    this.openingFlashStart = 0;
    this.openingFadeOut = 0;
    sound.playBgm('bgm_suspense');
  }

  updateOpening(now) {
    const page = this.openingPages[this.openingPageIndex];

    // 打字机逐字
    if (this.openingCharIndex < page.length) {
      if (now - this.openingLastCharTime > this.openingTypingSpeed) {
        this.openingCharIndex += 1;
        this.openingDisplayedText = page.substring(0, this.openingCharIndex);
        this.openingLastCharTime = now;
        // 每 2 字一个 blip
        if (this.openingCharIndex % 2 === 0) {
          sound.playSfx('sfx_text_blip');
        }

        // ★ 当末页末字自动播完时，自动设置 openingPageCompleteAt 触发白闪
        if (this.openingCharIndex === page.length
            && this.openingPageIndex === this.openingPages.length - 1
            && !this.openingPageCompleteAt) {
          this.openingPageCompleteAt = now;
        }
      }
    }

    // 末页触发白闪
    if (this.openingPageIndex === this.openingPages.length - 1
        && this.openingCharIndex === page.length
        && !this.openingFlashing) {
      // 等用户推进到末页末字后延迟 600ms 触发
      if (this.openingPageCompleteAt && now - this.openingPageCompleteAt > 600) {
        this.openingFlashing = true;
        this.openingFlashStart = now;
        sound.playSfx('sfx_shock_sting');
      }
    }

    // 白闪结束后切到 TITLE
    if (this.openingFlashing) {
      const flashElapsed = now - this.openingFlashStart;
      if (flashElapsed > 180 && !this.openingFadeOut) {
        this.openingFadeOut = now;
      }
      if (this.openingFadeOut && now - this.openingFadeOut > 240) {
        this.enterTitle();
      }
    }
  }

  handleOpeningAdvance() {
    const page = this.openingPages[this.openingPageIndex];

    // 打字未完 → 直接显示全句
    if (this.openingCharIndex < page.length) {
      this.openingDisplayedText = page;
      this.openingCharIndex = page.length;
      return;
    }

    // 已在末页 → 不前进，等白闪自动触发
    if (this.openingPageIndex === this.openingPages.length - 1) {
      if (!this.openingPageCompleteAt) {
        this.openingPageCompleteAt = performance.now();
      }
      return;
    }

    // 翻到下一页
    this.openingPageIndex += 1;
    this.openingDisplayedText = '';
    this.openingCharIndex = 0;
    this.openingLastCharTime = performance.now();
    this.openingPageCompleteAt = 0;
  }

  handleOpeningSkip() {
    // 直接跳到 TITLE，不播放白闪
    this.enterTitle();
  }

  renderOpening() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const now = performance.now();

    // 1. 背景图 + 缓慢推近 100% → 106% (20s)
    const zoomProgress = Math.min(1, (now - this.openingZoomStart) / 20000);
    const scale = 1.0 + zoomProgress * 0.06;

    const bgImg = assetLoader.getImage('assets/backgrounds/bg_opening@2x.png');
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(scale, scale);
    ctx.translate(-w / 2, -h / 2);

    if (bgImg) {
      // 保持 16:9 等比铺满
      ctx.drawImage(bgImg, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);
    }
    ctx.restore();

    // 2. 35% 黑压暗
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 0, w, h);

    // 3. 底部对话框 (复用剧情对话样式)
    const boxY = h - 110;
    const boxH = 90;
    ctx.fillStyle = 'rgba(20, 18, 16, 0.85)';
    ctx.beginPath();
    ctx.roundRect(40, boxY, w - 80, boxH, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 233, 208, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 主文
    ctx.fillStyle = '#f5e9d0';
    ctx.font = 'bold 22px -apple-system, "PingFang SC", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    this.wrapAndDraw(ctx, this.openingDisplayedText, 60, boxY + 20, w - 120, 28);

    // 进度指示
    ctx.fillStyle = 'rgba(245, 233, 208, 0.5)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${this.openingPageIndex + 1} / ${this.openingPages.length}`, w - 60, boxY + 12);

    // 4. 右上角 "点击跳过"（hover 高亮 + Esc 提示；命中区与视觉框同一来源）
    const skipX = w - 144;
    const skipY = 18;
    const skipW = 124;
    const skipH = 46;
    ctx.fillStyle = this.hoveredSkip ? 'rgba(64, 52, 36, 0.92)' : 'rgba(20, 18, 16, 0.7)';
    ctx.beginPath();
    ctx.roundRect(skipX, skipY, skipW, skipH, 17);
    ctx.fill();
    ctx.strokeStyle = this.hoveredSkip ? 'rgba(245, 233, 208, 0.95)' : 'rgba(245, 233, 208, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(245, 233, 208, 0.9)';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('点击跳过 ▶', skipX + skipW / 2, skipY + 17);
    ctx.fillStyle = 'rgba(245, 233, 208, 0.45)';
    ctx.font = '10px sans-serif';
    ctx.fillText('或按 Esc', skipX + skipW / 2, skipY + 35);
    this.skipRect = { x: skipX, y: skipY, w: skipW, h: skipH };

    // 5. 末页 sting 白闪
    if (this.openingFlashing) {
      const flashElapsed = now - this.openingFlashStart;
      // 白闪一帧 + 缓慢淡出
      let alpha;
      if (flashElapsed < 80) {
        alpha = flashElapsed / 80;            // 0 → 1
      } else if (flashElapsed < 180) {
        alpha = 1;                              // 保持白
      } else if (this.openingFadeOut) {
        const fadeElapsed = now - this.openingFadeOut;
        alpha = Math.max(0, 1 - fadeElapsed / 240);
      } else {
        alpha = 1;
      }
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // ============================================================
  // S2 TITLE
  // ============================================================
  /** 外部注入「有无存档」——决定「继续游戏」是否可点（回标题/删档后都会刷新） */
  setContinueAvailable(v) {
    this.hasContinue = !!v;
    if (!this.hasContinue && this.titleMenuIndex === 0) {
      this.titleMenuIndex = 1; // 焦点停在灰项上时顺移到「新的开始」
    }
  }

  enterTitle() {
    this.subStage = 'TITLE';
    this.titleEnterTime = performance.now();
    this.titleMainCharRevealed = 0;
    this.titleSubShown = false;
    this.titleClicked = false;
    this.titleFadeWhiteStart = 0;
    this.titleBgmSwitched = false;
    this.titleMenuIndex = this.hasContinue ? 0 : 1;
    this.titleMenuRects = [];
    if (!this.titleBgmSwitched) {
      sound.playBgm('bgm_title');
    }
  }

  updateTitle(now) {
    const elapsed = now - this.titleEnterTime;

    // ★ logo 图版主标：700ms 整体入场；完毕后 250ms 出现三项主菜单
    // (titleSubShown = 菜单就绪标志；canvas 文字回退版仍走逐字节奏)
    const logoReady = assetLoader.getImage('assets/backgrounds/title_logo@2x.png');
    if (logoReady) {
      if (!this.titleSubShown && elapsed > 700 + 250) {
        this.titleSubShown = true;
      }
    } else if (this.titleMainCharRevealed < this.titleMainText.length) {
      // 主标逐字弹入 (每字 90ms)
      if (elapsed > this.titleMainCharRevealed * 90) {
        this.titleMainCharRevealed += 1;
        if (this.titleMainCharRevealed % 1 === 0) sound.playSfx('sfx_text_blip');
      }
    } else if (!this.titleSubShown) {
      // 主标弹入完 + 200ms 显示副标
      if (elapsed > this.titleMainText.length * 90 + 200) {
        this.titleSubShown = true;
      }
    }

    // 「新的开始」点选后白幕淡入 0.4s 进 S3
    if (this.titleClicked && this.titleFadeWhiteStart) {
      if (now - this.titleFadeWhiteStart > 400) {
        this.enterCharacterSelect();
      }
    }
  }

  /** 焦点项是否不可用（无存档时的「继续游戏」） */
  isTitleMenuDisabled(index) {
    const item = this.titleMenuItems[index];
    return !!item && item.id === 'continue' && !this.hasContinue;
  }

  /** 键盘 ↑↓ 循环导航，自动跳过灰显项 */
  moveTitleMenu(dir) {
    if (!this.titleSubShown || this.titleClicked) return;
    const n = this.titleMenuItems.length;
    let idx = this.titleMenuIndex;
    for (let step = 0; step < n; step++) {
      idx = (idx + dir + n) % n;
      if (!this.isTitleMenuDisabled(idx)) break;
    }
    if (idx !== this.titleMenuIndex) {
      this.titleMenuIndex = idx;
      sound.playSfx('sfx_cursor');
    }
  }

  /**
   * 激活主菜单项：
   *  - new     → 白幕转场进角色选择（组件内自闭环）
   *  - continue / manage → 交 onMenuAction 由 main.js 分发（读最新档 / 打开存档界面）
   */
  activateTitleMenu(index) {
    if (!this.titleSubShown || this.titleClicked) return;
    const item = this.titleMenuItems[index];
    if (!item) return;
    if (this.isTitleMenuDisabled(index)) {
      sound.playSfx('sfx_cancel');
      return;
    }
    sound.playSfx('sfx_confirm');
    if (item.id === 'new') {
      this.titleClicked = true;
      this.titleFadeWhiteStart = performance.now();
    } else if (this.onMenuAction) {
      this.onMenuAction(item.id);
    }
  }

  handleTitleMouseMove(mouseX, mouseY) {
    for (let i = 0; i < this.titleMenuRects.length; i++) {
      const r = this.titleMenuRects[i];
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
        if (this.titleMenuIndex !== i && !this.isTitleMenuDisabled(i)) {
          this.titleMenuIndex = i;
          sound.playSfx('sfx_cursor');
        }
        return;
      }
    }
  }

  handleTitleClick(mouseX, mouseY) {
    for (let i = 0; i < this.titleMenuRects.length; i++) {
      const r = this.titleMenuRects[i];
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
        this.activateTitleMenu(i);
        return;
      }
    }
    // logo 未入场完（菜单未出现）或点空白 → 不做事，防止误触开局
  }

  handleTitleKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      this.moveTitleMenu(-1);
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      this.moveTitleMenu(1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      this.activateTitleMenu(this.titleMenuIndex);
    }
    // 其它按键不再触发「任意键开始」—— 回车/点击才生效，防止误触开局
  }

  renderTitle() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const now = performance.now();

    const bgImg = assetLoader.getImage('assets/backgrounds/bg_title@2x.png');

    if (bgImg) {
      ctx.drawImage(bgImg, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#1a1410';
      ctx.fillRect(0, 0, w, h);
    }

    // 顶部柔和暗角 (让标题区文字更清晰)
    const grad = ctx.createLinearGradient(0, 0, 0, 240);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, 240);

    // ★ 主标题：美术 title_logo 图 (洋红底已由 assetLoader 色键抠图为透明)
    // 入场动画：缩放 1.15→1.0 + 淡入 + 全显后轻微上浮定格 (替代原 canvas 逐字弹入)
    const logoImg = assetLoader.getImage('assets/backgrounds/title_logo@2x.png');
    if (logoImg) {
      const elapsed = now - this.titleEnterTime;
      const animDur = 700;
      const animT = Math.min(1, elapsed / animDur);
      // easeOutCubic 缓动
      const eased = 1 - Math.pow(1 - animT, 3);

      // 目标尺寸：宽 380，等比缩小并置于画面上半部，与下方菜单留出充裕空间
      const targetW = 380;
      const targetH = Math.round(targetW * (logoImg.height / logoImg.width));
      const scale = 1.12 - 0.12 * eased;
      const drawW = targetW * scale;
      const drawH = targetH * scale;
      const logoX = (w - drawW) / 2;
      const logoYBase = 68;
      const logoY = logoYBase - eased * 6;

      ctx.save();
      ctx.globalAlpha = animT < 1 ? Math.max(0.05, animT) : 1;
      ctx.drawImage(logoImg, logoX, logoY, drawW, drawH);
      ctx.restore();

      // 入场完成闪光 (对应原 canvas 版的入场白闪)
      if (animT === 1) {
        const flashT = (elapsed - animDur) / 500;
        if (flashT >= 0 && flashT < 1) {
          ctx.save();
          ctx.globalAlpha = (1 - flashT) * 0.35;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }
      }

      // ★ 逐字弹入节奏保留给副标: 打字音效随入场播放
      if (this.titleMainCharRevealed < this.titleMainText.length) {
        this.titleMainCharRevealed = this.titleMainText.length;
      }
    } else {
      // 回退: 无 logo 图时沿用 canvas 文字版标题
      ctx.save();
      ctx.font = 'bold 50px -apple-system, "PingFang SC", "STKaiti", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const shown = this.titleMainText.substring(0, this.titleMainCharRevealed);
      const titleX = w / 2;
      const titleY = 100;

      ctx.lineWidth = 6;
      ctx.strokeStyle = '#7A1F1F';
      ctx.lineJoin = 'round';
      ctx.strokeText(shown, titleX, titleY);

      ctx.fillStyle = '#F5E9D0';
      ctx.fillText(shown, titleX, titleY);
      ctx.restore();
    }

    // ★ 三项主菜单（D5）：logo 入场完成后出现，取代旧版「点击屏幕开始」
    //   「继续游戏」无存档时置灰不可点；焦点项金色描边 + 呼吸光晕 + ▶ 前缀
    this.titleMenuRects = [];
    if (this.titleSubShown && !this.titleClicked) {
      const menuW = 280;
      const menuH = 46;
      const menuGap = 12;
      const menuX = (w - menuW) / 2;
      const menuY0 = 310;

      for (let i = 0; i < this.titleMenuItems.length; i++) {
        const item = this.titleMenuItems[i];
        const by = menuY0 + i * (menuH + menuGap);
        const focused = i === this.titleMenuIndex;
        const disabled = this.isTitleMenuDisabled(i);
        this.titleMenuRects.push({ x: menuX, y: by, w: menuW, h: menuH });

        ctx.save();
        if (focused && !disabled) {
          ctx.shadowColor = 'rgba(250, 204, 21, 0.45)';
          ctx.shadowBlur = 16 + Math.sin(now / 300) * 6;
        }
        ctx.fillStyle = disabled ? 'rgba(20, 18, 16, 0.55)' : 'rgba(20, 18, 16, 0.88)';
        ctx.beginPath();
        ctx.roundRect(menuX, by, menuW, menuH, 10);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = focused && !disabled
          ? '#facc15'
          : (disabled ? 'rgba(214, 200, 180, 0.22)' : 'rgba(214, 200, 180, 0.55)');
        ctx.lineWidth = focused && !disabled ? 2.5 : 1.5;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = disabled
          ? 'rgba(245, 233, 208, 0.32)'
          : (focused ? '#fef08a' : '#f5e9d0');
        ctx.font = (focused && !disabled
          ? 'bold 20px' : 'bold 18px') + ' -apple-system, "PingFang SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = disabled ? `${item.label}（暂无存档）` : item.label;
        const prefix = focused && !disabled ? '▶ ' : '';
        ctx.fillText(prefix + label, menuX + menuW / 2, by + menuH / 2);
      }

      // 底部操作提示：写明上下左右操作，回车/点击确认，ESC取消
      ctx.fillStyle = 'rgba(245, 233, 208, 0.8)';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('↑ ↓ 选择 · 回车 / 点击 确认 · ESC 取消  |  支持手柄', w / 2, h - 22);
    }

    // 点击后白幕淡入
    if (this.titleFadeWhiteStart) {
      const elapsed = now - this.titleFadeWhiteStart;
      const alpha = Math.min(1, elapsed / 400);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // ============================================================
  // S3 CHARACTER_SELECT
  // ============================================================
  enterCharacterSelect() {
    this.subStage = 'CHARACTER_SELECT';
    this.focusedHero = 'male';
    sound.stopBgm(); // 选人界面静音
  }

  renderCharacterSelect() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. bg_classroom 虚化压暗
    const bgImg = assetLoader.getImage('assets/backgrounds/bg_classroom@2x.png');
    if (bgImg) {
      ctx.save();
      ctx.filter = 'blur(4px) brightness(0.55)';
      ctx.drawImage(bgImg, 0, 0, w, h);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1a1410';
      ctx.fillRect(0, 0, w, h);
    }

    // 顶部柔和暗角
    const grad = ctx.createLinearGradient(0, 0, 0, 140);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, 140);

    // 2. 标题
    ctx.fillStyle = '#F5E9D0';
    ctx.font = 'bold 28px -apple-system, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('选择调查视角', w / 2, 50);

    ctx.fillStyle = '#E8C98A';
    ctx.font = 'italic 14px sans-serif';
    ctx.fillText('双线互补拼凑完整真相', w / 2, 80);

    // 3. 双卡布局
    const cardW = 380;
    const cardH = 380;
    const gap = 40;
    const leftX = (w - (cardW * 2 + gap)) / 2;
    const rightX = leftX + cardW + gap;
    const cardY = (h - cardH) / 2 + 30;

    this.heroCards = [
      { id: 'male', x: leftX, y: cardY, w: cardW, h: cardH },
      { id: 'female', x: rightX, y: cardY, w: cardW, h: cardH }
    ];

    // 重置本帧的视觉边界与按钮判定区
    this.lastCardVisualRects = {};
    this.lastCardConfirmRects = {};

    const maleCfg = {
      id: 'male',
      name: '张子骁',
      tag: '六（8）班男生 · 课间棋王',
      line: '走一步，看三步 —— 魔物也一样。',
      portraitSrc: 'assets/art/zhangzixiao_default.png',
      themeColor: '#3B82F6',
      themeGlow: 'rgba(59, 130, 246, 0.55)',
      rect: this.heroCards[0],
      isFocused: this.focusedHero === 'male' || this.hoveredHero === 'male'
    };
    this.drawCharacterCard(maleCfg);
    this.lastCardVisualRects['male'] = maleCfg.visualRect;
    this.lastCardConfirmRects['male'] = maleCfg.confirmButtonRect;

    const femaleCfg = {
      id: 'female',
      name: '石予诺',
      tag: '六（8）班女生 · 美术课代表',
      line: '画不下去？我的速写本没有这一页。',
      portraitSrc: 'assets/art/shiyunuo_default.png',
      themeColor: '#DB2777',
      themeGlow: 'rgba(219, 39, 119, 0.55)',
      rect: this.heroCards[1],
      isFocused: this.focusedHero === 'female' || this.hoveredHero === 'female'
    };
    this.drawCharacterCard(femaleCfg);
    this.lastCardVisualRects['female'] = femaleCfg.visualRect;
    this.lastCardConfirmRects['female'] = femaleCfg.confirmButtonRect;

    // 4. 底部操作提示
    ctx.fillStyle = 'rgba(245, 233, 208, 0.85)';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('← → 切换 · 回车 / 点击 确认 · ESC 取消返回  |  支持手柄', w / 2, h - 24);
  }

  drawCharacterCard(cfg) {
    const ctx = this.ctx;
    const isFocus = cfg.isFocused;
    const { x, y, w, h } = cfg.rect;

    // 焦点卡 1.04 倍 + 外发光
    let scale = 1;
    if (isFocus) {
      scale = 1.04;
    }
    const drawW = w * scale;
    const drawH = h * scale;
    const drawX = x - (drawW - w) / 2;
    const drawY = y - (drawH - h) / 2;

    // 焦点卡视觉边界（用于点击判定，跟随视觉放大）
    cfg.visualRect = { x: drawX, y: drawY, w: drawW, h: drawH };

    if (isFocus) {
      // 角色色系外发光 (多层柔光晕)
      ctx.save();
      ctx.shadowColor = cfg.themeGlow;
      ctx.shadowBlur = 32;
      ctx.fillStyle = cfg.themeGlow;
      ctx.beginPath();
      ctx.roundRect(drawX, drawY, drawW, drawH, 14);
      ctx.fill();
      ctx.restore();
    }

    // 卡片底
    ctx.fillStyle = isFocus ? '#fffdf7' : 'rgba(254, 252, 247, 0.92)';
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawW, drawH, 12);
    ctx.fill();

    // 边框
    ctx.strokeStyle = isFocus ? cfg.themeColor : 'rgba(214, 200, 180, 0.6)';
    ctx.lineWidth = isFocus ? 3 : 1.5;
    ctx.stroke();

    // 立绘展示区 (完整展示人物，不裁切头部)
    const PAD = 16;
    const RESERVE_BOTTOM = 118; // 底部留给 姓名+标签+台词+按钮
    const portraitAreaY = drawY + PAD;
    const portraitAreaH = drawH - PAD * 2 - RESERVE_BOTTOM;
    const portraitAreaX = drawX + PAD;
    const portraitAreaW = drawW - PAD * 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(portraitAreaX, portraitAreaY, portraitAreaW, portraitAreaH, 8);
    ctx.clip();

    // 卡片色键底
    const pg = ctx.createLinearGradient(0, portraitAreaY, 0, portraitAreaY + portraitAreaH);
    pg.addColorStop(0, cfg.themeColor);
    pg.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
    ctx.fillStyle = pg;
    ctx.fillRect(portraitAreaX, portraitAreaY, portraitAreaW, portraitAreaH);

    // 立绘 (色键贴入，等比 contain 完整显示、底部对齐)
    const img = assetLoader.getImage(cfg.portraitSrc);
    if (img && img.width > 0) {
      // 注意：色键处理后 img 是 canvas，只有 width/height，没有 naturalWidth
      const imgAspect = img.width / img.height;
      const areaAspect = portraitAreaW / portraitAreaH;
      let dw, dh;
      if (imgAspect > areaAspect) {
        dw = portraitAreaW;
        dh = dw / imgAspect;
      } else {
        dh = portraitAreaH;
        dw = dh * imgAspect;
      }
      const dx = portraitAreaX + (portraitAreaW - dw) / 2;
      const dy = portraitAreaY + (portraitAreaH - dh); // 底部对齐，人物站在卡内地面
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    ctx.restore();

    // 立绘框边
    ctx.strokeStyle = isFocus ? cfg.themeColor : 'rgba(214, 200, 180, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(portraitAreaX, portraitAreaY, portraitAreaW, portraitAreaH, 8);
    ctx.stroke();

    // 信息区开始 y（立绘区下方，自上而下排布，与按钮留出间隙）
    const infoY = portraitAreaY + portraitAreaH + 8;

    // 姓名大字
    ctx.fillStyle = '#1c1917';
    ctx.font = 'bold 22px -apple-system, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cfg.name, drawX + drawW / 2, infoY + 14);

    // 标签
    ctx.fillStyle = cfg.themeColor;
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(cfg.tag, drawX + drawW / 2, infoY + 35);

    // 角色台词 (单行小字)
    ctx.fillStyle = '#7c4a21';
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText(`「${cfg.line}」`, drawX + drawW / 2, infoY + 54);

    // 底部确认按钮 (始终显示，焦点卡更亮)
    const btnW = drawW - 28;
    const btnH = 36;
    const btnX = drawX + 14;
    const btnY = drawY + drawH - btnH - 12;
    cfg.confirmButtonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    ctx.fillStyle = isFocus ? cfg.themeColor : 'rgba(120, 113, 108, 0.5)';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isFocus ? '▶ 点击确认启程' : '点击此卡聚焦', btnX + btnW / 2, btnY + btnH / 2);
  }

  // ============================================================
  // 公共：渲染入口
  // ============================================================
  render() {
    const now = performance.now();
    if (this.subStage === 'DISCLAIMER') {
      this.updateDisclaimer(now);
      this.renderDisclaimer();
    } else if (this.subStage === 'OPENING') {
      this.updateOpening(now);
      this.renderOpening();
    } else if (this.subStage === 'TITLE') {
      this.updateTitle(now);
      this.renderTitle();
    } else if (this.subStage === 'CHARACTER_SELECT') {
      this.renderCharacterSelect();
    }
  }

  // ============================================================
  // 事件分发
  // ============================================================
  handleMouseMove(mouseX, mouseY) {
    if (this.subStage === 'DISCLAIMER' || this.subStage === 'OPENING') {
      // 跳过按钮 hover 高亮（视觉反馈：让用户确认按钮"活着"可点）
      const r = this.skipRect;
      const hit = !!(r && mouseX >= r.x && mouseX <= r.x + r.w
        && mouseY >= r.y && mouseY <= r.y + r.h);
      if (hit !== this.hoveredSkip) {
        this.hoveredSkip = hit;
        if (hit) sound.playSfx('sfx_cursor');
      }
      return;
    }
    if (this.subStage === 'TITLE') {
      this.handleTitleMouseMove(mouseX, mouseY);
      return;
    }
    if (this.subStage !== 'CHARACTER_SELECT') return;
    let hovered = null;
    for (const c of this.heroCards) {
      // 使用视觉边界 (跟随焦点放大) 而非原始 rect
      const r = this.lastCardVisualRects?.[c.id] || c;
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
        hovered = c.id;
        break;
      }
    }
    if (this.hoveredHero !== hovered) {
      this.hoveredHero = hovered;
      if (hovered) {
        this.focusedHero = hovered;
        sound.playSfx('sfx_cursor');
      }
    }
  }

  handleClick(mouseX, mouseY) {
    if (this.subStage === 'DISCLAIMER') {
      // 检查是否点中跳过
      if (this.skipRect &&
          mouseX >= this.skipRect.x && mouseX <= this.skipRect.x + this.skipRect.w &&
          mouseY >= this.skipRect.y && mouseY <= this.skipRect.y + this.skipRect.h) {
        console.info(`[disclaimer] skip hit @(${mouseX|0},${mouseY|0}) -> OPENING`);
        this.handleDisclaimerSkip();
        return true;
      }
      // 点击空白处推进文案
      this.handleDisclaimerAdvance();
      return true;
    }

    if (this.subStage === 'OPENING') {
      // 检查是否点中跳过
      if (this.skipRect &&
          mouseX >= this.skipRect.x && mouseX <= this.skipRect.x + this.skipRect.w &&
          mouseY >= this.skipRect.y && mouseY <= this.skipRect.y + this.skipRect.h) {
        // DevTools 可见日志：用户报障时可直接把这条贴回来定位链路
        console.info(`[opening] skip hit @(${mouseX|0},${mouseY|0}) -> TITLE`);
        this.handleOpeningSkip();
        return true;
      }
      // 点击空白处推进文案
      this.handleOpeningAdvance();
      // 记录末页完成时刻
      if (this.openingPageIndex === this.openingPages.length - 1
          && this.openingCharIndex === this.openingPages[this.openingPageIndex].length) {
        if (!this.openingPageCompleteAt) {
          this.openingPageCompleteAt = performance.now();
        }
      }
      return true;
    }

    if (this.subStage === 'TITLE') {
      this.handleTitleClick(mouseX, mouseY);
      return true;
    }

    if (this.subStage === 'CHARACTER_SELECT') {
      // 优先检查"确认按钮"区域：点中按钮才真正触发选择
      for (const c of this.heroCards) {
        const btn = this.lastCardConfirmRects?.[c.id];
        if (btn &&
            mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
          if (this.focusedHero !== c.id) {
            this.focusedHero = c.id;
          }
          sound.playSfx('sfx_confirm');
          if (this.onSelectCharacter) this.onSelectCharacter(c.id);
          return true;
        }
      }

      // 否则检查"卡片其他区域"：只切换焦点，不触发选择
      for (const c of this.heroCards) {
        const r = this.lastCardVisualRects?.[c.id] || c;
        if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
          if (this.focusedHero !== c.id) {
            this.focusedHero = c.id;
            sound.playSfx('sfx_cursor');
          }
          return true;
        }
      }
    }
    return false;
  }

  handleKeyDown(e) {
    if (this.subStage === 'DISCLAIMER') {
      // 空格/回车推进，Esc 跳过
      if (e.key === ' ' || e.key === 'Enter') {
        this.handleDisclaimerAdvance();
        return true;
      }
      if (e.key === 'Escape') {
        this.handleDisclaimerSkip();
        return true;
      }
      return false;
    }

    if (this.subStage === 'OPENING') {
      // 空格/回车推进，Esc 跳过
      if (e.key === ' ' || e.key === 'Enter') {
        this.handleOpeningAdvance();
        if (this.openingPageIndex === this.openingPages.length - 1
            && this.openingCharIndex === this.openingPages[this.openingPageIndex].length) {
          if (!this.openingPageCompleteAt) this.openingPageCompleteAt = performance.now();
        }
        return true;
      }
      if (e.key === 'Escape') {
        this.handleOpeningSkip();
        return true;
      }
      return false;
    }

    if (this.subStage === 'TITLE') {
      this.handleTitleKeyDown(e);
      return true;
    }

    if (this.subStage === 'CHARACTER_SELECT') {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.focusedHero = 'male';
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.focusedHero = 'female';
        sound.playSfx('sfx_cursor');
        return true;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        if (this.focusedHero) {
          sound.playSfx('sfx_confirm');
          if (this.onSelectCharacter) this.onSelectCharacter(this.focusedHero);
          return true;
        }
      }
      if (e.key === 'Escape') {
        // Esc 回标题（菜单直接就绪，不重播 logo 入场）
        this.subStage = 'TITLE';
        this.titleEnterTime = performance.now();
        this.titleMainCharRevealed = this.titleMainText.length;
        this.titleSubShown = true;
        this.titleClicked = false;
        this.titleFadeWhiteStart = 0;
        this.titleMenuIndex = this.hasContinue ? 0 : 1;
        return true;
      }
    }
    return false;
  }

  // ============================================================
  // 工具
  // ============================================================
  wrapAndDraw(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let currY = y;
    for (let n = 0; n < chars.length; n++) {
      const testLine = line + chars[n];
      if (ctx.measureText(testLine).width > maxWidth && n > 0) {
        ctx.fillText(line, x, currY);
        line = chars[n];
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currY);
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    return this.wrapAndDraw(ctx, text, x, y, maxWidth, lineHeight);
  }
}
