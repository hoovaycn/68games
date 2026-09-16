import { WEAPONS } from '../data/weapons.js';
import { assetLoader } from '../engine/asset_loader.js';

/**
 * 战棋主渲染器与交互 UI
 * 统一色调：浅黄纸质极简风 (#FAF5EB / #FFFDF9) + 深暖黑字 (#1C1917)
 *
 * 核心改造：
 * 1. drawMap 用 Kenney CC0 48x48 地砖纹理贴图（柏油路/人行道/红砖/草地/斑马线）
 * 2. drawProps 渲染多格街具（1x1/1x2/1x3）— 在地砖之上、单位之下分层绘制
 * 3. drawUnits 用 384x512 占位行走图精灵表切片（128x128 单帧，4 行下/左/右/上 ×3 帧循环）
 * 4. drawPhaseBanner 全屏回合切换横幅（PLAYER_PHASE / ENEMY_PHASE 醒目切换）
 * 5. drawReinforcementNotice 援军出现提示横幅
 * 6. drawWalkSprite 支持按朝向自动选择行、按动画进度选择帧
 */
export class Renderer {
  constructor(canvas, tileSize = 48) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = tileSize;

    // 行走图精灵表规格（每张 384x512，单帧 128x128，4 行下/左/右/上 × 3 帧循环）
    this.walkFrameSize = 128;
    this.walkFramesPerRow = 3;
    this.walkFacingRow = { down: 0, left: 1, right: 2, up: 3 };
    this.walkAnimSpeed = 180; // 每帧 180ms

    // 地图在画布内的居中偏移 (在 resize 中根据 canvas 实际尺寸计算)
    this.mapWidthTiles = 0;
    this.mapHeightTiles = 0;
    this.mapWidthPx = 0;
    this.mapHeightPx = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  /**
   * resize 不再直接改 canvas 尺寸
   * 只更新内部地图尺寸字段，并基于当前 canvas 实际尺寸计算一体化面板布局
   *
   * ★ 一体化面板：地图区与右侧信息栏共用同一个外框（视觉上是一整个界面）
   * 面板四边均留 16px 边距；地图贴面板左侧内边距 24px，垂直居中；
   * 信息栏在中缝分隔线右侧，与面板同高
   */
  resize(widthTiles, heightTiles) {
    const w = widthTiles || 12;
    const h = heightTiles || 9;
    this.mapWidthTiles = w;
    this.mapHeightTiles = h;

    // canvas 尺寸由 main.js 在 enterBattleMap 中统一设为 960×540
    // ★ 全出血一体化面板：面板铺满整个画布，无外部边距、无黑底外露
    //   (画布圆角由 index.html 容器 overflow:hidden + border-radius 裁切)
    this.panelX = 0;
    this.panelY = 0;
    this.panelW = this.canvas.width;
    this.panelH = this.canvas.height;

    // 中缝分隔线与右侧信息栏内容区（右侧面板适当收窄至 214px，让出视觉重心给战场）
    this.hudW = 214;
    this.hudX = this.panelX + this.panelW - 24 - this.hudW;
    this.hudDividerX = this.hudX - 18;

    // ★ 左侧战场区自适应缩放：在「面板左缘 ~ 中缝分隔线」区域内尽量铺满并居中
    //   基准 48px/格，按可用空间等比放大（封顶 64）或缩小（下限 36）
    const BASE_TILE = 48;
    const mapPad = 8;
    const availW = Math.max(120, this.hudDividerX - this.panelX - mapPad * 2);
    const availH = Math.max(120, this.panelH - mapPad * 2);
    const scale = Math.min(availW / (w * BASE_TILE), availH / (h * BASE_TILE));
    this.tileSize = Math.max(36, Math.min(64, Math.floor(BASE_TILE * scale)));
    this.mapWidthPx = w * this.tileSize;
    this.mapHeightPx = h * this.tileSize;

    // 战场区水平 + 垂直双向居中（少量边距呼吸感）
    this.offsetX = this.panelX + mapPad + Math.floor((availW - this.mapWidthPx) / 2);
    this.offsetY = this.panelY + mapPad + Math.floor((availH - this.mapHeightPx) / 2);

    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * 屏幕坐标 → 地图瓦片坐标
   * 返回 {x, y} 或 null (若点不在地图内)
   */
  screenToTile(screenX, screenY) {
    const tx = Math.floor((screenX - this.offsetX) / this.tileSize);
    const ty = Math.floor((screenY - this.offsetY) / this.tileSize);
    if (tx < 0 || tx >= this.mapWidthTiles || ty < 0 || ty >= this.mapHeightTiles) return null;
    return { x: tx, y: ty };
  }

  render(state) {
    const ctx = this.ctx;
    // 1. 画布底色与页面背景一致（一体化面板外只留极窄同色边距，视觉上无边框感）
    ctx.fillStyle = '#0e0d0c';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. 一体化底板 + 右侧信息栏
    this.drawMapFrame(state);

    // 3. 绘制地图地砖 (Kenney CC0 纹理)
    this.drawMap(state.gridSystem);

    // 3.5 地图边界细描边 (在地砖之上，界定战场范围但保持一体非卡片)
    ctx.save();
    ctx.strokeStyle = 'rgba(120, 105, 80, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.offsetX - 1, this.offsetY - 1, this.mapWidthPx + 2, this.mapHeightPx + 2);
    ctx.restore();

    // 4. 绘制移动/攻击范围高亮
    this.drawHighlights(state);

    // 5. 绘制行动轨迹虚线
    this.drawPath(state);

    // 6. 绘制街具 (在单位下层)
    this.drawProps(state);

    // 7. 绘制单位 (头像底座 + 受击震颤 + 攻击突进)
    this.drawUnits(state.units, state.selectedUnit);

    // 8. 绘制光标
    this.drawCursor(state.cursor);

    // 9. 绘制 UI 浮层 (信息卡/菜单/战前预测/浮动文字/战利品弹窗)
    this.drawUI(state);

    // 10. 绘制阶段横幅 (回合切换醒目提示，叠在所有内容之上)
    if (state.phaseBanner) {
      this.drawPhaseBanner(state.phaseBanner);
    }

    // 11. 绘制援军出现提示
    if (state.reinforcementNotice) {
      this.drawReinforcementNotice(state.reinforcementNotice);
    }
  }

  // ==================== 地图外框 + 右侧 HUD 信息栏 ====================

  drawMapFrame(state) {
    const ctx = this.ctx;

    // ★ 全出血一体化深色战棋底板（深灰碳素色调，具有专业战棋游戏质感，避免像软件UI）
    ctx.fillStyle = '#141416';
    ctx.fillRect(this.panelX, this.panelY, this.panelW, this.panelH);

    // 右侧 HUD 信息栏半透明暗色背板
    ctx.fillStyle = 'rgba(28, 28, 32, 0.75)';
    ctx.beginPath();
    ctx.roundRect(this.hudX - 10, this.panelY + 12, this.hudW + 20, this.panelH - 24, 8);
    ctx.fill();

    // ★ 阶段卡片 (信息栏顶部，章节名下方)
    const isPlayer = state.phase === 'PLAYER_PHASE';
    const phaseCardW = this.hudW;
    const phaseCardH = 56;
    const phaseCardX = this.hudX;
    const phaseCardY = this.panelY + 40;

    ctx.fillStyle = isPlayer ? '#1e3a8a' : '#991b1b';
    ctx.beginPath();
    ctx.roundRect(phaseCardX, phaseCardY, phaseCardW, phaseCardH, 6);
    ctx.fill();

    ctx.strokeStyle = isPlayer ? '#60a5fa' : '#f87171';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#93c5fd';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('当前阶段', phaseCardX + 12, phaseCardY + 16);
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(isPlayer ? '我方回合' : '敌方回合', phaseCardX + 12, phaseCardY + 38);
    ctx.textAlign = 'right';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`第 ${state.turn} 回合`, phaseCardX + phaseCardW - 12, phaseCardY + 16);

    // ★ 中缝分隔线：竖直细分隔，上下留 16px 内边距
    const divTop = this.panelY + 16;
    const divBottom = this.panelY + this.panelH - 16;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.hudDividerX, divTop);
    ctx.lineTo(this.hudDividerX, divBottom);
    ctx.stroke();

    // ★ 章节名 (信息栏最顶部)
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const chapterName = (state.chapter && state.chapter.name) || '';
    ctx.fillText(chapterName.replace(/^第[一二三四五六七八九十0-9]+战[：:]/, ''), this.hudX + 2, this.panelY + 18);

    // ★ 操作提示
    const tipY = phaseCardY + phaseCardH + 18;
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('操作提示', this.hudX + 2, tipY);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '12px sans-serif';
    const tips = [
      '方向键 / WASD  移动',
      'Enter / 点击  确认',
      'ESC / 右键  取消撤销',
      '滚轮  菜单切换'
    ];
    tips.forEach((t, i) => {
      ctx.fillText(t, this.hudX + 2, tipY + 22 + i * 19);
    });

    // ★ 胜利条件
    const objY = tipY + 22 + tips.length * 19 + 14;
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('胜利目标', this.hudX + 2, objY);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 13px sans-serif';
    const objText = (state.chapter && state.chapter.objective && state.chapter.objective.text) || '击败所有敌人';
    this.wrapText(ctx, objText, this.hudX + 2, objY + 22, this.hudW - 4, 18);

    // ★ 我方 / 敌方剩余单位统计 —— 锚定面板底部
    const statRowH = 64;
    const statsY = this.panelY + this.panelH - statRowH - 16;
    const alivePlayers = state.units.filter(u => u.isAlive && u.faction === 'player').length;
    const aliveEnemies = state.units.filter(u => u.isAlive && u.faction === 'enemy').length;

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('战场单位', this.hudX + 2, statsY);

    // 我方 (左) / 敌方 (右) 并排
    const statRowY = statsY + 22;
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.roundRect(this.hudX + 2, statRowY, 22, 22, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('我', this.hudX + 13, statRowY + 11);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${alivePlayers} 人`, this.hudX + 30, statRowY + 11);

    const enemyStatX = this.hudX + Math.floor(this.hudW / 2) + 6;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.roundRect(enemyStatX, statRowY, 22, 22, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('敌', enemyStatX + 11, statRowY + 11);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${aliveEnemies} 人`, enemyStatX + 28, statRowY + 11);
  }

  // ==================== 地砖层 ====================

  drawMap(gridSystem) {
    const ctx = this.ctx;
    const ts = this.tileSize;
    const ox = this.offsetX;
    const oy = this.offsetY;

    // 旧版的纯色 fallback 调色板（仅当纹理图未加载时使用）
    const terrainPalette = {
      road: '#52525b',
      crosswalk: '#71717a',
      sidewalk: '#a8a29e',
      brick: '#a16207',
      flowerbed: '#166534',
      bench: '#854d0e',
      lamppost: '#44403c'
    };

    for (let y = 0; y < gridSystem.height; y++) {
      for (let x = 0; x < gridSystem.width; x++) {
        const terrainKey = gridSystem.tiles[y][x];
        const terrain = gridSystem.getTerrain(x, y);

        const px = x * ts + ox;
        const py = y * ts + oy;

        // 先铺底色作为 fallback
        ctx.fillStyle = terrainPalette[terrainKey] || terrain.color || '#a8a29e';
        ctx.fillRect(px, py, ts, ts);

        // 若该地形配置了 Kenney 地砖纹理，叠加绘制
        const tileImgSrc = terrain.tileImg;
        if (tileImgSrc) {
          const tileImg = assetLoader.getImage(tileImgSrc);
          if (tileImg) {
            ctx.drawImage(tileImg, px, py, ts, ts);
          }
        }

        // 细网格线
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.10)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, ts, ts);

        // 地形标签（仅在草地等特殊地形显示）
        if (terrain.label) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(terrain.label, px + ts / 2, py + ts - 7);
        }
      }
    }
  }

  // ==================== 街具层 ====================

  drawProps(state) {
    const ctx = this.ctx;
    const ts = this.tileSize;
    const ox = this.offsetX;
    const oy = this.offsetY;
    const props = state.chapter && state.chapter.props;
    if (!props || props.length === 0) return;

    for (const prop of props) {
      const img = assetLoader.getImage(prop.img);
      if (!img) continue;

      const px = prop.x * ts + ox;
      const py = prop.y * ts + oy;

      // 多格街具的图像高度 = gridH * ts，宽度 = gridW * ts
      const drawW = prop.gridW * ts;
      const drawH = prop.gridH * ts;

      ctx.drawImage(img, px, py, drawW, drawH);
    }
  }

  // ==================== 单位层（圆形头像底座） ====================

  drawUnits(units, selectedUnit) {
    const ctx = this.ctx;
    const ts = this.tileSize;
    const ox = this.offsetX;
    const oy = this.offsetY;

    for (const u of units) {
      if (!u.isAlive) continue;

      // 结合受击抖动偏移与攻击突进偏移
      const shakeX = u.animOffsetX || 0;
      const shakeY = u.animOffsetY || 0;
      const px = u.x * ts + ox + shakeX;
      const py = u.y * ts + oy + shakeY;

      // 1. 阴影投影 (椭圆半透明)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.beginPath();
      ctx.ellipse(px + ts / 2, py + ts - 4, ts / 2 - 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. 选中光晕 (脉动黄圈)
      if (selectedUnit && selectedUnit.id === u.id) {
        const pulse = Math.sin(Date.now() / 140) * 3;
        ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
        ctx.beginPath();
        ctx.arc(px + ts / 2, py + ts / 2 + 2, (ts / 2) + pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. 圆形头像底座 + portrait 头像 (替代 walk_placeholder 切片)
      this.drawUnitToken(u, px, py, ts);

      // 4. 已行动指示 (变灰外框)
      if (u.hasActed) {
        ctx.fillStyle = 'rgba(28, 25, 23, 0.45)';
        ctx.beginPath();
        ctx.roundRect(px + 2, py + 2, ts - 4, ts - 4, 6);
        ctx.fill();
      }

      // 5. 血条
      const hpPct = Math.max(0, u.currentHp / u.stats.maxHp);
      const barW = ts - 10;
      const barH = 5;
      const barX = px + 5;
      const barY = py + ts - 9;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);

      ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : (hpPct > 0.25 ? '#f59e0b' : '#ef4444');
      ctx.fillRect(barX, barY, barW * hpPct, barH);

      // 6. 阵营角标 (我方蓝/敌方红)
      const isPlayer = u.faction === 'player';
      ctx.fillStyle = isPlayer ? '#2563eb' : '#dc2626';
      ctx.beginPath();
      ctx.arc(px + 8, py + 8, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  /**
   * 绘制圆形头像底座 + portrait 头像
   * 取代 walk_placeholder 切片，给玩家更精致的视觉
   * 同时保留 u.walkSprite 字段不删除，作为后续正式小人形象接入钩子
   */
  drawUnitToken(u, px, py, ts) {
    const ctx = this.ctx;
    const isPlayer = u.faction === 'player';

    // 圆形底座 (玩家蓝/敌人红渐变)
    const cx = px + ts / 2;
    const cy = py + ts / 2 + 2;
    const r = ts / 2 - 5;

    const grad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, r);
    if (isPlayer) {
      grad.addColorStop(0, '#60a5fa');
      grad.addColorStop(1, '#1e3a8a');
    } else {
      grad.addColorStop(0, '#f87171');
      grad.addColorStop(1, '#7f1d1d');
    }

    ctx.save();
    if (u.isFlashing) ctx.filter = 'brightness(260%) contrast(160%)';

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 白色外环
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 内圈裁剪绘制头像
    ctx.beginPath();
    ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
    ctx.clip();

    const img = assetLoader.getImage(u.portrait);
    if (img) {
      // 头像填满内圈 (保留面部为中心)
      ctx.drawImage(img, cx - r + 2, cy - r + 2, (r - 2) * 2, (r - 2) * 2);
    } else {
      // 无头像 fallback：首字两字
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(u.name.substring(0, 2), cx, cy);
    }

    ctx.restore();
  }

  // ==================== 阶段切换横幅 ====================

  drawPhaseBanner(banner) {
    if (!banner) return;
    const ctx = this.ctx;
    const now = Date.now();
    const elapsed = now - banner.startTime;

    const turnDuration = banner.showTurn ? 750 : 0;
    const phaseDuration = 850;
    const totalDuration = turnDuration + phaseDuration;

    if (elapsed > totalDuration) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    // ----------------- 1. 一级标题：【第 X 回合】 -----------------
    if (elapsed < turnDuration) {
      const p = elapsed / turnDuration;
      let alpha = 1;
      if (p < 0.18) {
        alpha = p / 0.18;
      } else if (p > 0.82) {
        alpha = (1 - p) / 0.18;
      }

      ctx.save();
      ctx.globalAlpha = alpha;

      // 全屏暗沉深色背景
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      ctx.fillRect(0, 0, w, h);

      const bandH = 76;
      const bandY = (h - bandH) / 2 - 10;

      // 一级标题背景条：金黑尊贵渐变
      const grad = ctx.createLinearGradient(0, bandY, 0, bandY + bandH);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      grad.addColorStop(0.5, 'rgba(30, 41, 59, 0.98)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, bandY, w, bandH);

      // 黄金双线装饰
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, bandY);
      ctx.lineTo(w, bandY);
      ctx.moveTo(0, bandY + bandH);
      ctx.lineTo(w, bandY + bandH);
      ctx.stroke();

      // 一级主标题大字：第 X 回合
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(234, 179, 8, 0.6)';
      ctx.shadowBlur = 12;
      ctx.fillText(`第 ${banner.turn} 回合`, w / 2, bandY + 30);

      // 一级副标题小字：— TURN X —
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`— TURN ${banner.turn} —`, w / 2, bandY + 56);

      ctx.restore();
      return;
    }

    // ----------------- 2. 二级标题：【我方行动 / 敌方行动】 -----------------
    const phaseElapsed = elapsed - turnDuration;
    const p = phaseElapsed / phaseDuration;
    let alpha = 1;
    if (p < 0.15) {
      alpha = p / 0.15;
    } else if (p > 0.80) {
      alpha = (1 - p) / 0.20;
    }

    const isPlayer = banner.phase === 'PLAYER_PHASE';
    const bandH = 50;
    const bandY = (h - bandH) / 2 - 10;

    ctx.save();
    ctx.globalAlpha = alpha;

    // 全屏轻微调色遮罩
    ctx.fillStyle = isPlayer ? 'rgba(30, 58, 138, 0.22)' : 'rgba(153, 27, 27, 0.22)';
    ctx.fillRect(0, 0, w, h);

    // 二级横幅背景
    const grad = ctx.createLinearGradient(0, bandY, 0, bandY + bandH);
    if (isPlayer) {
      grad.addColorStop(0, '#1e3a8a');
      grad.addColorStop(1, '#2563eb');
    } else {
      grad.addColorStop(0, '#991b1b');
      grad.addColorStop(1, '#dc2626');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, bandY, w, bandH);

    // 亮彩边框
    ctx.strokeStyle = isPlayer ? '#93c5fd' : '#fca5a5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, bandY);
    ctx.lineTo(w, bandY);
    ctx.moveTo(0, bandY + bandH);
    ctx.lineTo(w, bandY + bandH);
    ctx.stroke();

    // 二级标题文字
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.fillText(isPlayer ? '▶ 我方行动 ◀' : '⚡ 敌方行动 ⚡', w / 2, bandY + bandH / 2);

    ctx.restore();
  }

  // ==================== 援军出现提示 ====================

  drawReinforcementNotice(notice) {
    const ctx = this.ctx;
    const now = Date.now();
    const elapsed = now - notice.startTime;

    if (elapsed > notice.duration) return;

    const w = this.canvas.width;
    const bandH = 56;
    const bandY = 70;

    // 入场 200ms 滑入，末段 200ms 淡出
    const fadeIn = 200;
    const fadeOut = 220;
    let alpha = 1;
    let slideY = 0;

    if (elapsed < fadeIn) {
      const p = elapsed / fadeIn;
      alpha = p;
      slideY = (1 - p) * -50;
    } else if (elapsed > notice.duration - fadeOut) {
      const p = (elapsed - (notice.duration - fadeOut)) / fadeOut;
      alpha = 1 - p;
      slideY = p * -20;
    }

    ctx.save();
    ctx.globalAlpha = alpha;

    // 红色警告横幅
    const gradient = ctx.createLinearGradient(0, bandY + slideY, 0, bandY + bandH + slideY);
    gradient.addColorStop(0, '#dc2626');
    gradient.addColorStop(1, '#991b1b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, bandY + slideY, w, bandH);

    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, bandY + slideY);
    ctx.lineTo(w, bandY + slideY);
    ctx.moveTo(0, bandY + bandH + slideY);
    ctx.lineTo(w, bandY + bandH + slideY);
    ctx.stroke();

    // 警告三角图标
    const iconX = 28;
    const iconY = bandY + slideY + bandH / 2;
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.moveTo(iconX - 12, iconY + 10);
    ctx.lineTo(iconX + 12, iconY + 10);
    ctx.lineTo(iconX, iconY - 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#7f1d1d';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', iconX, iconY + 3);

    // 标题
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(notice.text, w / 2, bandY + slideY + bandH / 2);

    ctx.restore();
  }

  // ==================== 范围高亮 / 路径 / 光标 ====================

  drawHighlights(state) {
    const ctx = this.ctx;
    const ts = this.tileSize;
    const ox = this.offsetX;
    const oy = this.offsetY;

    if (state.reachableTiles && state.reachableTiles.length > 0) {
      ctx.fillStyle = 'rgba(37, 99, 235, 0.32)';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;

      for (const t of state.reachableTiles) {
        ctx.fillRect(t.x * ts + ox + 2, t.y * ts + oy + 2, ts - 4, ts - 4);
        ctx.strokeRect(t.x * ts + ox + 2, t.y * ts + oy + 2, ts - 4, ts - 4);
      }
    }

    if (state.attackableTiles && state.attackableTiles.length > 0) {
      ctx.fillStyle = 'rgba(220, 38, 38, 0.38)';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;

      for (const t of state.attackableTiles) {
        ctx.fillRect(t.x * ts + ox + 2, t.y * ts + oy + 2, ts - 4, ts - 4);
        ctx.strokeRect(t.x * ts + ox + 2, t.y * ts + oy + 2, ts - 4, ts - 4);
      }
    }
  }

  drawPath(state) {
    if (!state.currentPath || state.currentPath.length < 2) return;
    const ctx = this.ctx;
    const ts = this.tileSize;
    const ox = this.offsetX;
    const oy = this.offsetY;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();

    for (let i = 0; i < state.currentPath.length; i++) {
      const p = state.currentPath[i];
      const px = p.x * ts + ts / 2 + ox;
      const py = p.y * ts + ts / 2 + oy;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawCursor(cursor) {
    const ctx = this.ctx;
    const ts = this.tileSize;
    const ox = this.offsetX;
    const oy = this.offsetY;
    const x = cursor.x * ts + ox;
    const y = cursor.y * ts + oy;

    const cornerSize = 10;
    const offset = Math.sin(Date.now() / 120) * 1.5;

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x - offset, y - offset + cornerSize);
    ctx.lineTo(x - offset, y - offset);
    ctx.lineTo(x - offset + cornerSize, y - offset);

    ctx.moveTo(x + ts + offset - cornerSize, y - offset);
    ctx.lineTo(x + ts + offset, y - offset);
    ctx.lineTo(x + ts + offset, y - offset + cornerSize);

    ctx.moveTo(x - offset, y + ts + offset - cornerSize);
    ctx.lineTo(x - offset, y + ts + offset);
    ctx.lineTo(x - offset + cornerSize, y + ts + offset);

    ctx.moveTo(x + ts + offset - cornerSize, y + ts + offset);
    ctx.lineTo(x + ts + offset, y + ts + offset);
    ctx.lineTo(x + ts + offset, y + ts + offset - cornerSize);
    ctx.stroke();
  }

  // ==================== UI 浮层 ====================

  drawUI(state) {
    this.drawTileInfoCard(state);

    // ★ ACTION_MENU / ITEM_MENU 两分支已删除：
    //   行动菜单迁移为 ActionMenu 组件（src/ui/components/action_menu.js）、
    //   背包操作迁移为 InventoryPanelModal（src/ui/components/inventory_panel.js），
    //   均由 main.js loop 在 renderer.render 之后调用其 render()，renderer 不再持有这两块 UI

    if (state.battlePreview) {
      this.drawBattlePreview(state.battlePreview);
    }

    this.drawFloatingTexts(state.floatingTexts);

    // ★ 战利品弹窗已由 ItemModal 组件在主循环 (main.js loop) 中渲染
    //   此处不再重复绘制，避免新旧两套弹窗叠加导致"两场战斗 UI 不一致"
  }


  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let currY = y;

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
  }

  /** 迷你资源条（光标信息卡内）：圆角底槽 + 按比例填充，数值显示在条右侧 */
  drawMiniBar(ctx, x, y, w, h, ratio, fillColor) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, h / 2);
    ctx.fill();
    const r = Math.max(0, Math.min(1, ratio || 0));
    if (r > 0) {
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(h, w * r), h, h / 2);
      ctx.fill();
      // 高光提亮线，增加战棋质感
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.roundRect(x + 1, y + 1, Math.max(2, w * r - 2), Math.max(2, h / 3), h / 4);
      ctx.fill();
    }
  }

  drawTileInfoCard(state) {
    const ctx = this.ctx;
    const terrain = state.gridSystem.getTerrain(state.cursor.x, state.cursor.y);
    const unit = state.units.find(u => u.isAlive && u.x === state.cursor.x && u.y === state.cursor.y);

    const maxMp = (unit && unit.stats && unit.stats.maxMp) || 0;
    const hasMp = maxMp > 0;
    const w = 232;
    const h = unit ? (hasMp ? 122 : 100) : 42;

    // ★ 智能避让：光标在上半屏 → 面板放底部；下半屏 → 面板放顶部
    const cursorPy = state.cursor.y * this.tileSize + this.offsetY;
    const isCursorLower = cursorPy > this.canvas.height / 2;
    const x = this.offsetX + 4;
    const y = isCursorLower ? this.offsetY + 4 : (this.offsetY + this.mapHeightPx - h - 4);

    // 深色战棋悬浮框底色
    ctx.fillStyle = 'rgba(20, 20, 24, 0.92)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();

    ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${terrain.name} (防+${terrain.def || 0} 避+${terrain.avoid || 0}%)`, x + 12, y + 18);

    if (unit) {
      const isPlayer = unit.faction === 'player';
      ctx.fillStyle = isPlayer ? '#60a5fa' : '#f87171';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`${unit.name} Lv.${unit.level}`, x + 12, y + 38);

      // ★ HP / MP 条状展示（条 + 右侧数值，替代纯文本数字）
      const maxHp = (unit.stats && unit.stats.maxHp) || 1;
      const hpRatio = (unit.currentHp || 0) / maxHp;
      const hpColor = hpRatio > 0.5 ? '#22c55e' : (hpRatio > 0.25 ? '#facc15' : '#ef4444');
      const barX = x + 44;
      const barW = w - 128;

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('HP', x + 12, y + 60);
      this.drawMiniBar(ctx, barX, y + 54, barW, 11, hpRatio, hpColor);
      ctx.textAlign = 'right';
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`${unit.currentHp}/${maxHp}`, x + w - 12, y + 60);

      if (hasMp) {
        const mpRatio = Math.max(0, Math.min(1, (unit.currentMp || 0) / maxMp));
        ctx.textAlign = 'left';
        ctx.fillStyle = '#bae6fd';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('MP', x + 12, y + 82);
        this.drawMiniBar(ctx, barX, y + 76, barW, 11, mpRatio, '#38bdf8');
        ctx.textAlign = 'right';
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#bae6fd';
        ctx.fillText(`${unit.currentMp || 0}/${maxMp}`, x + w - 12, y + 82);
      }

      const weapon = WEAPONS[unit.equippedWeapon] || { name: '无' };
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`武器: ${weapon.name}`, x + 12, y + (hasMp ? 104 : 84));
    }
  }

  // ★ 以下四方法已删除（任务 #9 组件化迁移）：
  //   getActionMenuRect / drawActionMenu  → ActionMenu 组件（ui/components/action_menu.js）
  //   getItemMenuRect / drawItemMenu      → InventoryPanelModal（ui/components/inventory_panel.js）
  //   菜单布局（贴单位 + 智能避让）也一并迁走，由 main.js loop 渲染。

  drawBattlePreview(preview) {
    const ctx = this.ctx;
    const atk = preview.attacker;
    const def = preview.defender;

    const w = 380;
    const h = 138;
    const x = (this.canvas.width - w) / 2;

    // ★ 智能避让：守方在上半屏 → 面板放底部；下半屏 → 面板放顶部
    const defPy = def.unit.y * this.tileSize + this.offsetY;
    const isDefLower = defPy > this.offsetY + this.mapHeightPx / 2;
    const y = isDefLower ? this.offsetY + 4 : (this.offsetY + this.mapHeightPx - h - 4);

    // 深色战棋半透明面板底色
    ctx.fillStyle = 'rgba(18, 18, 22, 0.95)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 10);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('—— 战前预测 (点击/Enter攻击 · ESC/右键撤销) ——', x + w / 2, y + 22);

    // 攻方
    ctx.textAlign = 'left';
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(atk.unit.name, x + 18, y + 48);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`HP: ${atk.unit.currentHp} -> ${Math.max(0, atk.unit.currentHp - (def.canCounter ? def.damage : 0))}`, x + 18, y + 70);
    ctx.fillText(`伤害: ${atk.damage} ${atk.isDouble ? '×2(追击)' : ''}`, x + 18, y + 90);
    ctx.fillText(`命中: ${atk.hit}%  必杀: ${atk.crit}%`, x + 18, y + 110);

    // VS
    ctx.fillStyle = '#ef4444';
    ctx.font = 'italic bold 22px serif';
    ctx.textAlign = 'center';
    ctx.fillText('VS', x + w / 2, y + 80);

    // 守方
    ctx.textAlign = 'right';
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(def.unit.name, x + w - 18, y + 48);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`HP: ${def.unit.currentHp} -> ${Math.max(0, def.unit.currentHp - atk.damage)}`, x + w - 18, y + 70);
    if (def.canCounter) {
      ctx.fillText(`反击: ${def.damage} ${def.isDouble ? '×2' : ''}`, x + w - 18, y + 90);
      ctx.fillText(`命中: ${def.hit}%  必杀: ${def.crit}%`, x + w - 18, y + 110);
    } else {
      ctx.fillStyle = '#64748b';
      ctx.fillText(`(无法反击)`, x + w - 18, y + 90);
      ctx.fillText(`-`, x + w - 18, y + 110);
    }
  }

  drawFloatingTexts(floatingTexts) {
    if (!floatingTexts || floatingTexts.length === 0) return;
    const ctx = this.ctx;
    const now = Date.now();

    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      const elapsed = now - ft.startTime;
      if (elapsed > ft.duration) {
        floatingTexts.splice(i, 1);
        continue;
      }

      const progress = elapsed / ft.duration;
      const alpha = 1 - progress;
      const currentY = ft.y - (progress * 30);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = ft.color || '#facc15';
      ctx.font = ft.font || 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      // 浮动文字位置加上地图偏移
      ctx.fillText(ft.text, ft.x + this.offsetX, currentY + this.offsetY);
      ctx.restore();
    }
  }
}
