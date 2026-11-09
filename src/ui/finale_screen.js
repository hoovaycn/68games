import { sound } from '../engine/sound.js';
import { assetLoader } from '../engine/asset_loader.js';

/**
 * 《六8班异闻录》终幕画卷 · 全剧终【终 / Fin】
 * 
 * 演播时间轴规范：
 * 1. FADE_IN (2200ms)：由黑屏缓慢平滑渐显至澄澈蓝天、阿瑶微笑虚影与全员合影
 * 2. DISPLAY：稳定展示终幕画卷与烫金【 终 】/【 Fin 】，并伴随温情纯音乐
 * 3. FADE_OUT (1800ms)：玩家点击或按键后，画面与音乐缓慢平滑渐隐至纯黑屏
 * 4. DONE：触发 onComplete，安全返回标题画面
 */
export class FinaleScreen {
  constructor(canvas, onComplete) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onComplete = onComplete;

    this.state = 'IDLE'; // IDLE | FADE_IN | DISPLAY | FADE_OUT | DONE
    this.stateStartTime = 0;
    this.bgImgSrc = 'assets/backgrounds/bg_grand_finale_fin@2x.png';
    this.bgImgFallback = 'assets/backgrounds/bg_grand_finale_fin.png';

    // 预加载
    assetLoader.loadWithChromaKey(this.bgImgSrc);
    assetLoader.loadWithChromaKey(this.bgImgFallback);
  }

  show() {
    this.state = 'FADE_IN';
    this.stateStartTime = performance.now();
    sound.playBgm('bgm_childhood', false);
  }

  triggerFadeOut() {
    if (this.state !== 'DISPLAY') return;
    this.state = 'FADE_OUT';
    this.stateStartTime = performance.now();
    sound.playSfx('sfx_confirm');
  }

  handleClick() {
    if (this.state === 'DISPLAY') {
      this.triggerFadeOut();
    }
  }

  handleKeyDown(key) {
    if (['Space', 'Enter', 'Escape', ' '].includes(key)) {
      if (this.state === 'DISPLAY') {
        this.triggerFadeOut();
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const now = performance.now();
    const elapsed = now - this.stateStartTime;

    // 1. 绘制底层画面（真图或高规格唯美回退渲染）
    this.drawArtContent(ctx, w, h);

    // 2. 状态机推进与黑屏遮罩计算
    if (this.state === 'FADE_IN') {
      const progress = Math.min(1, elapsed / 2200);
      const blackAlpha = 1 - progress;
      ctx.fillStyle = `rgba(0, 0, 0, ${blackAlpha})`;
      ctx.fillRect(0, 0, w, h);

      if (progress >= 1) {
        this.state = 'DISPLAY';
        this.stateStartTime = now;
      }
    } else if (this.state === 'DISPLAY') {
      // 停留展示：2.5 秒后在底部优雅浮现提示
      if (elapsed > 2500) {
        const promptAlpha = Math.min(1, (elapsed - 2500) / 1000) * (0.6 + 0.35 * Math.sin(now / 350));
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${promptAlpha})`;
        ctx.font = '15px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fillText('—— 点击画面或按空格键 · 返回主菜单 ——', w / 2, h - 36);
        ctx.restore();
      }
    } else if (this.state === 'FADE_OUT') {
      const progress = Math.min(1, elapsed / 1800);
      ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
      ctx.fillRect(0, 0, w, h);

      // 伴随平滑淡出音乐
      if (sound.bgmAudio) {
        sound.bgmAudio.volume = Math.max(0, sound.bgmVolume * (1 - progress));
      }

      if (progress >= 1) {
        this.state = 'DONE';
        sound.stopBgm();
        if (sound.bgmAudio) {
          sound.bgmAudio.volume = sound.bgmVolume;
        }
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }
  }

  drawArtContent(ctx, w, h) {
    const img = assetLoader.getImage(this.bgImgSrc) || assetLoader.getImage(this.bgImgFallback);
    const hasImage = img && img.complete && img.naturalWidth > 0;

    if (hasImage) {
      // 美术成品图全屏铺满适配
      ctx.drawImage(img, 0, 0, w, h);
    } else {
      // 唯美高规格 Canvas 动态回退渲染（蓝天白云、金光微风与全员寄语）
      this.drawArtFallback(ctx, w, h);
    }
  }

  drawArtFallback(ctx, w, h) {
    // 1. 澄澈晴空渐变（碧蓝晴空到地平线晨曦暖金）
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#0284c7');    // 纯澈蔚蓝
    skyGrad.addColorStop(0.35, '#38bdf8'); // 明朗晴蓝
    skyGrad.addColorStop(0.68, '#bae6fd'); // 柔和水天
    skyGrad.addColorStop(0.85, '#fef08a'); // 暖金晨光
    skyGrad.addColorStop(1, '#fde047');    // 大地朝霞
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. 舒卷白云光斑与丁达尔神圣光柱
    ctx.save();
    const rayGrad = ctx.createLinearGradient(w * 0.45, 0, w * 0.65, h);
    rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    rayGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.25)');
    rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = rayGrad;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, 0);
    ctx.lineTo(w * 0.65, 0);
    ctx.lineTo(w * 0.95, h);
    ctx.lineTo(w * 0.15, h);
    ctx.closePath();
    ctx.fill();

    // 悠扬白云层
    ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.beginPath();
    ctx.arc(w * 0.25, 120, 140, 0, Math.PI * 2);
    ctx.arc(w * 0.4, 90, 170, 0, Math.PI * 2);
    ctx.arc(w * 0.58, 110, 150, 0, Math.PI * 2);
    ctx.arc(w * 0.8, 140, 160, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. 天空之上：阿瑶老师若隐若现的金色温柔虚影象征
    ctx.save();
    const spiritGrad = ctx.createRadialGradient(w / 2, 170, 20, w / 2, 170, 190);
    spiritGrad.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
    spiritGrad.addColorStop(0.4, 'rgba(253, 224, 71, 0.28)');
    spiritGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = spiritGrad;
    ctx.beginPath();
    ctx.arc(w / 2, 170, 190, 0, Math.PI * 2);
    ctx.fill();

    // 阿瑶的微笑与祝福光纹
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.font = 'italic bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.shadowColor = 'rgba(202, 138, 4, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fillText('“ 孩子们，六8班一个都不能少。向前走，别回头。 ”', w / 2, 175);
    ctx.restore();

    // 4. 地平线上：老运河新校舍与奔向未来的少年剪影层
    ctx.save();
    const groundGrad = ctx.createLinearGradient(0, h - 140, 0, h);
    groundGrad.addColorStop(0, 'rgba(253, 230, 138, 0.4)');
    groundGrad.addColorStop(0.3, 'rgba(16, 185, 129, 0.35)');
    groundGrad.addColorStop(1, 'rgba(5, 150, 105, 0.8)');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, h - 130, w, 130);
    ctx.restore();

    // 5. 核心艺术印章：典雅烫金【 终 】与【 Fin 】
    ctx.save();
    const sealX = w - 170;
    const sealY = 90;

    // 印章外框
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(220, 38, 38, 0.85)';
    ctx.beginPath();
    ctx.roundRect(sealX - 44, sealY - 44, 88, 88, 12);
    ctx.fill();
    ctx.stroke();

    // 内框细金线
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sealX - 38, sealY - 38, 76, 76);

    // 终 字
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px "STSong", "Songti SC", "SimSun", serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 4;
    ctx.fillText('终', sealX, sealY);

    // 下方 F i n
    ctx.fillStyle = '#1c1917';
    ctx.font = 'bold 22px "Georgia", serif';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 8;
    ctx.fillText('—  F i n  —', sealX, sealY + 68);
    ctx.restore();

    // 6. 终局致辞铭文（深邃暖黑 + 柔和白光投影）
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1e293b';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowBlur = 10;
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillText('『谨以此片，献给所有在及格线边缘挣扎过、却从未向捷径低头的少年们。』', w / 2, h - 96);

    ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('—— 《 六 8 班 异 闻 录 》 全剧终 ——', w / 2, h - 66);
    ctx.restore();
  }
}
