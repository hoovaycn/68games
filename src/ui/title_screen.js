import { assetLoader } from '../engine/asset_loader.js';
import { sound } from '../engine/sound.js';

/**
 * 标题流程三状态机：S1 OPENING → S2 TITLE → S3 CHARACTER_SELECT
 * 设计分辨率 960×540，等比缩放由 index.html 控制，文字全部代码渲染。
 *
 * 子状态:
 *  - OPENING:        首次启动叙事开场，4 页打字机文案 + 末页白闪转场
 *  - TITLE:          标题屏，主标逐字弹入 + "点击屏幕开始" 呼吸闪烁
 *  - CHARACTER_SELECT: 双卡角色选择，键盘/鼠标均可，焦点外发光
 *
 * 验收要点:
 *  1. 每次刷新都从 OPENING 开始播放
 *  2. S1 末页播 sfx_shock_sting + 白闪一帧进 S2
 *  3. S2 主标不挡 bg_title 的铅笔主体 (y≈120)
 *  4. S3 立绘用 assets/art/{id}_default.png 色键贴入，外发光用角色色系
 */
export class TitleScreen {
  constructor(canvas, onSelectCharacter) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onSelectCharacter = onSelectCharacter;

    // 子状态: 'OPENING' | 'TITLE' | 'CHARACTER_SELECT' | 'FADE_OUT'
    this.subStage = 'OPENING';

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
    this.titleFadeWhiteStart = 0;    // 点击后白幕淡入
    this.titleBgmSwitched = false;

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
   * 进入标题流程入口：每次都从 OPENING 开始
   */
  enter() {
    this.enterOpening();
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

    // 4. 右上角 "点击跳过"
    const skipX = w - 130;
    const skipY = 24;
    const skipW = 100;
    const skipH = 28;
    ctx.fillStyle = 'rgba(20, 18, 16, 0.7)';
    ctx.beginPath();
    ctx.roundRect(skipX, skipY, skipW, skipH, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 233, 208, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(245, 233, 208, 0.85)';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('点击跳过 ▶', skipX + skipW / 2, skipY + skipH / 2);
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
  enterTitle() {
    this.subStage = 'TITLE';
    this.titleEnterTime = performance.now();
    this.titleMainCharRevealed = 0;
    this.titleSubShown = false;
    this.titleClicked = false;
    this.titleFadeWhiteStart = 0;
    this.titleBgmSwitched = false;
    if (!this.titleBgmSwitched) {
      sound.playBgm('bgm_suspense');
    }
  }

  updateTitle(now) {
    const elapsed = now - this.titleEnterTime;

    // ★ logo 图版主标：700ms 整体入场；完毕后 250ms 显示"点击屏幕开始"
    // (titleSubShown 现在只控制开始提示的出现时机；canvas 文字回退版仍走逐字节奏)
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

    // 点击后白幕淡入 0.4s 进 S3
    if (this.titleClicked && this.titleFadeWhiteStart) {
      if (now - this.titleFadeWhiteStart > 400) {
        this.enterCharacterSelect();
      }
    }
  }

  handleTitleAdvance() {
    if (this.titleClicked) return;
    this.titleClicked = true;
    this.titleFadeWhiteStart = performance.now();
    sound.playSfx('sfx_confirm');
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

      // 目标尺寸：宽 520 (画布 960 的一半以上)，等比缩放
      const targetW = 520;
      const targetH = Math.round(targetW * (logoImg.height / logoImg.width));
      const scale = 1.15 - 0.15 * eased;
      const drawW = targetW * scale;
      const drawH = targetH * scale;
      const logoX = (w - drawW) / 2;
      const logoYBase = 118;
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
      ctx.font = 'bold 64px -apple-system, "PingFang SC", "STKaiti", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const shown = this.titleMainText.substring(0, this.titleMainCharRevealed);
      const titleX = w / 2;
      const titleY = 120;

      ctx.lineWidth = 8;
      ctx.strokeStyle = '#7A1F1F';
      ctx.lineJoin = 'round';
      ctx.strokeText(shown, titleX, titleY);

      ctx.fillStyle = '#F5E9D0';
      ctx.fillText(shown, titleX, titleY);
      ctx.restore();
    }

    // ★ 副标题已移除 (美术 logo 大标题独立呈现)
    // 底部 "点击屏幕开始" 呼吸闪烁 (titleSubShown 控制: logo 动画播完后出现)
    if (this.titleSubShown && !this.titleClicked) {
      const pulse = Math.sin(now / 480) * 0.4 + 0.6;
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.fillStyle = '#f5e9d0';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('▶  点击屏幕开始  ◀', w / 2, h - 60);
      ctx.restore();
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
    sound.playBgm('bgm_classroom');
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
    ctx.fillStyle = 'rgba(245, 233, 208, 0.75)';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('← / → 切换 · 回车确认 · Esc 返回标题', w / 2, h - 24);
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
    if (this.subStage === 'OPENING') {
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
    if (this.subStage === 'OPENING') {
      // 检查是否点中跳过
      if (this.skipRect &&
          mouseX >= this.skipRect.x && mouseX <= this.skipRect.x + this.skipRect.w &&
          mouseY >= this.skipRect.y && mouseY <= this.skipRect.y + this.skipRect.h) {
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
      this.handleTitleAdvance();
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
      // 任意键开始
      this.handleTitleAdvance();
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
        // Esc 回标题
        this.subStage = 'TITLE';
        this.titleEnterTime = performance.now();
        this.titleMainCharRevealed = this.titleMainText.length;
        this.titleSubShown = true;
        this.titleClicked = false;
        this.titleFadeWhiteStart = 0;
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
