import { sound } from '../../engine/sound.js';
import { assetLoader } from '../../engine/asset_loader.js';
import { UNITS } from '../../data/units.js';
import { CLASSES } from '../../data/classes.js';
import { WEAPONS } from '../../data/weapons.js';
import { SKILLS } from '../../data/skills.js';

/**
 * 剧情阶段专属：新角色入队弹出组件 (Join Party Modal)
 * 采用全项目统一的浅黄羊皮纸 / 黑金 / 金色高光视觉语言 (#FFFDF9 / #292524 / #FACC15)
 * 具备：
 * 1. 重点强调横幅「★ 新 伙 伴 加 入 队 伍 ！ ★」
 * 2. 左侧半身精美立绘 (自动洋红底色键去色) + 柔和光盘
 * 3. 右侧人物详细信息 (姓名、班级/外号、定位标签、初始法宝、专属个人技、生动生平)
 * 4. 键盘 (Space / Enter) 或点击确认按钮关闭并继续推进剧情
 */
export class JoinPartyModal {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isOpen = false;
    this.unit = null;
    this.unitConfig = null;
    this.onConfirm = null;
    this.buttonRect = null;
    this.openTime = 0;
  }

  /**
   * 打开入队弹窗
   * @param {string|object} unitOrId - 角色 ID 或 UNITS 对象
   * @param {Function} onConfirm - 点击确认后的回调函数
   */
  show(unitOrId, onConfirm) {
    // 兼容可能传入的立绘/素材别名 (如 teacher_xu -> xu_laoshi, adult_liu -> liu_laoshi)
    const UNIT_ALIASES = {
      teacher_xu: 'xu_laoshi',
      adult_liu: 'liu_laoshi'
    };

    let resolvedId = unitOrId;
    if (typeof unitOrId === 'string' && UNIT_ALIASES[unitOrId]) {
      resolvedId = UNIT_ALIASES[unitOrId];
    }

    let unitData = null;
    if (typeof resolvedId === 'string') {
      unitData = UNITS[resolvedId];
    } else {
      unitData = resolvedId;
    }

    if (!unitData) {
      console.warn('[JoinPartyModal] 未找到角色数据:', unitOrId);
      if (onConfirm) onConfirm();
      return;
    }

    this.unit = unitData;
    this.unitConfig = {
      cls: CLASSES[unitData.classId] || null,
      weapon: WEAPONS[unitData.equippedWeapon] || null,
      skill: SKILLS[unitData.personalSkill] || null
    };

    this.onConfirm = onConfirm;
    this.isOpen = true;
    this.openTime = performance.now();
    this.buttonRect = null;

    sound.playSfx('sfx_level_up');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    sound.playSfx('sfx_confirm');
    if (this.onConfirm) {
      const cb = this.onConfirm;
      this.onConfirm = null;
      cb();
    }
  }

  render() {
    if (!this.isOpen || !this.unit) return;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const now = performance.now();
    const elapsed = now - this.openTime;

    // 1. 全屏深色半透明遮罩
    ctx.save();
    ctx.fillStyle = 'rgba(8, 10, 16, 0.82)';
    ctx.fillRect(0, 0, w, h);

    // 2. 主卡片容器 (740 × 440，居中)
    const boxW = 740;
    const boxH = 440;
    const boxX = Math.round((w - boxW) / 2);
    const boxY = Math.round((h - boxH) / 2);

    // 卡片背景：浅黄高洁羊皮纸
    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 16);
    ctx.fill();

    ctx.strokeStyle = '#d6c8b4';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 内衬金线
    ctx.strokeStyle = '#e2d5bd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX + 6, boxY + 6, boxW - 12, boxH - 12, 12);
    ctx.stroke();

    // 3. 顶部黑金横幅 Header
    const headH = 58;
    const headX = boxX + 14;
    const headY = boxY + 14;
    const headW = boxW - 28;

    const headGrad = ctx.createLinearGradient(0, headY, 0, headY + headH);
    headGrad.addColorStop(0, '#292524');
    headGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.roundRect(headX, headY, headW, headH, 10);
    ctx.fill();

    // 金色边缘微光
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 标题文字微脉冲动效
    const pulse = Math.sin(elapsed / 160) * 0.08;
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(250, 204, 21, 0.55)';
    ctx.shadowBlur = 8;
    ctx.fillText('★  新 伙 伴 加 入 队 伍 ！ ★', w / 2, headY + headH / 2);
    ctx.shadowBlur = 0;

    // 4. 左侧立绘展示区 (宽 260，高 300)
    const leftX = boxX + 24;
    const leftY = headY + headH + 14;
    const leftW = 240;
    const leftH = 320;

    // 立绘背后浅金光盘
    const haloRadius = 100;
    const haloCx = leftX + leftW / 2;
    const haloCy = leftY + 120;
    const haloGrad = ctx.createRadialGradient(haloCx, haloCy, 10, haloCx, haloCy, haloRadius);
    haloGrad.addColorStop(0, 'rgba(253, 230, 138, 0.4)');
    haloGrad.addColorStop(0.7, 'rgba(254, 240, 138, 0.15)');
    haloGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(haloCx, haloCy, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // 绘制半身立绘
    const portraitPath = this._getPortraitPath(this.unit.id);
    const portraitImg = assetLoader.getImage(portraitPath);
    const imgW = portraitImg ? (portraitImg.naturalWidth || portraitImg.width || 0) : 0;
    const imgH = portraitImg ? (portraitImg.naturalHeight || portraitImg.height || 0) : 0;

    if (portraitImg && imgW > 0 && imgH > 0) {
      // 保持比例居中
      const pw = 210;
      const ph = Math.round(pw * (imgH / imgW));
      const px = haloCx - pw / 2;
      const py = leftY + (leftH - ph) / 2 - 8;
      ctx.drawImage(portraitImg, px, py, pw, ph);
    } else {
      // 占位头像圆圈
      ctx.fillStyle = '#e2d5bd';
      ctx.beginPath();
      ctx.arc(haloCx, haloCy, 64, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#78716c';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.unit.name, haloCx, haloCy);
    }

    // 立绘下方名牌底托
    const namePlateW = 180;
    const namePlateH = 32;
    const namePlateX = haloCx - namePlateW / 2;
    const namePlateY = leftY + leftH - 38;
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.roundRect(namePlateX, namePlateY, namePlateW, namePlateH, 8);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.unit.name, haloCx, namePlateY + namePlateH / 2);

    // 5. 右侧人物档案信息区
    const rightX = leftX + leftW + 20;
    const rightY = leftY + 2;
    const rightW = boxW - (rightX - boxX) - 24;

    // 5.1 称号与战斗定位标签（分行呈现，避免称号过长导致标签与文字叠压）
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // 称号 (Title)
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillStyle = '#1c1917';
    ctx.fillText(this.unit.title || '同伴', rightX, rightY);

    // 角色定位 Tag Badge（放在称号右侧合适间距，若称号较长则换行自适应或控制在同一视觉行）
    const titleWidth = ctx.measureText(this.unit.title || '同伴').width;
    const tagText = this._getRoleTag(this.unit);
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    const tagW = ctx.measureText(tagText).width + 16;
    
    // 如果称号宽度 + 标签宽度超过了可用区域的一半以上，折到第二行显示
    let tagX = rightX + titleWidth + 14;
    let tagY = rightY + 1;
    let infoY = rightY + 36;
    if (titleWidth > 150) {
      // 另起一行排列 Tag
      tagX = rightX;
      tagY = rightY + 28;
      infoY = tagY + 30;
    }

    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.roundRect(tagX, tagY, tagW, 22, 6);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#92400e';
    ctx.textBaseline = 'middle';
    ctx.fillText(tagText, tagX + 8, tagY + 11);

    // 5.2 基础配备：初始装备与职业
    const clsName = this.unitConfig.cls ? this.unitConfig.cls.name : '普通小学生';
    const wepName = this.unitConfig.weapon ? this.unitConfig.weapon.name : '初始文具';

    ctx.font = '13px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillStyle = '#57534e';
    ctx.textBaseline = 'top';
    ctx.fillText(`职业：`, rightX, infoY);
    ctx.fillStyle = '#1c1917';
    ctx.fillText(clsName, rightX + 42, infoY);

    ctx.fillStyle = '#57534e';
    ctx.fillText(`随身法宝：`, rightX + 160, infoY);
    ctx.fillStyle = '#b45309';
    ctx.fillText(wepName, rightX + 232, infoY);

    // 5.3 专属个人技卡片 (Personal Skill)
    const skillBoxY = infoY + 26;
    const skillBoxH = 68;
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(rightX, skillBoxY, rightW, skillBoxH, 8);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 技能标题
    const skill = this.unitConfig.skill;
    const skillName = skill ? skill.name : '机智反应';
    const skillDesc = skill ? skill.desc : '在关键时刻总能想到出人意料的脱身奇策。';

    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillText(`★ 专属特长：【${skillName}】`, rightX + 12, skillBoxY + 10);

    // 技能说明
    ctx.fillStyle = '#475569';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    this._drawMultilineText(ctx, skillDesc, rightX + 12, skillBoxY + 32, rightW - 24, 18);

    // 5.4 人物背景生平 (Bio)
    const bioBoxY = skillBoxY + skillBoxH + 12;
    const bioBoxH = 92;
    ctx.fillStyle = '#fefce8';
    ctx.beginPath();
    ctx.roundRect(rightX, bioBoxY, rightW, bioBoxH, 8);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#713f12';
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillText('同学档案简记：', rightX + 12, bioBoxY + 10);

    const bioText = this.unit.bio || '六年级八班的值得信赖的伙伴，与你并肩探索校园谜团。';
    ctx.fillStyle = '#44403c';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    this._drawMultilineText(ctx, bioText, rightX + 12, bioBoxY + 30, rightW - 24, 18);

    // 6. 底部确认继续按钮
    const btnW = 280;
    const btnH = 44;
    const btnX = rightX + (rightW - btnW) / 2;
    const btnY = boxY + boxH - 58;

    this.buttonRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    const btnGrad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
    btnGrad.addColorStop(0, '#f59e0b');
    btnGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 8);
    ctx.fill();

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('【 确认入队 · 继续推进 】', btnX + btnW / 2, btnY + btnH / 2);

    ctx.restore();
  }

  _getPortraitPath(unitId) {
    const map = {
      zhanghanyu: 'assets/art/zhanghanyu_default@2x.png',
      chenpinxuan: 'assets/art/chenpinxuan_default@2x.png',
      fanwenmo: 'assets/art/fanwenmo_default@2x.png',
      heyanxi: 'assets/art/heyanxi_default@2x.png',
      zhangzixiao: 'assets/art/zhangzixiao_default@2x.png',
      shiyunuo: 'assets/art/shiyunuo_default@2x.png',
      zhangxizhe: 'assets/art/zhangxizhe_default@2x.png',
      qinruiyi: 'assets/art/qinruiyi_default@2x.png',
      zhuyanze: 'assets/art/zhuyanze_default@2x.png',
      xu_laoshi: 'assets/art/teacher_xu_default@2x.png',
      liu_laoshi: 'assets/art/adult_liu_default@2x.png',
      militia_instructor: 'assets/art/militia_instructor_1839@2x.png'
    };
    return map[unitId] || `assets/art/${unitId}_default@2x.png`;
  }

  _getRoleTag(unit) {
    if (unit.id === 'zhanghanyu') return '智囊特派 · 魔法干扰';
    if (unit.id === 'chenpinxuan') return '强力突击 · 八卦先锋';
    if (unit.id === 'fanwenmo') return '隐藏怪力 · 远程题海';
    if (unit.id === 'heyanxi') return '长笛音律 · 均衡支援';
    if (unit.classId === 'strong_boy') return '近战肉盾';
    if (unit.classId === 'study_committee') return '战术施法';
    return '团队伙伴';
  }

  _drawMultilineText(ctx, text, x, y, maxWidth, lineHeight) {
    let currentLine = '';
    let curY = y;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const testLine = currentLine + char;
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(currentLine, x, curY);
        currentLine = char;
        curY += lineHeight;
        if (curY > y + lineHeight * 3) {
          // 最多 3 行，多余截断
          ctx.fillText(currentLine + '...', x, curY);
          return;
        }
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      ctx.fillText(currentLine, x, curY);
    }
  }

  handleClick(x, y) {
    if (!this.isOpen || !this.buttonRect) return false;
    const r = this.buttonRect;
    if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
      this.close();
      return true;
    }
    // 点击卡片外遮罩也可关闭
    this.close();
    return true;
  }

  handleKeyDown(e) {
    if (!this.isOpen) return false;
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
      this.close();
      return true;
    }
    return false;
  }
}
