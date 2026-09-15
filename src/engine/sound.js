/**
 * 现代音频管理器（真实 MP3/OGG 播放 + Web Audio 合成增强）
 * 1. BGM 加载 assets/audio/bgm/；SFX 优先加载 assets/audio/sfx/
 * 2. 打击类音效 (hit/attack swing) 走 Web Audio 实时合成 ——
 *    低频重击 (thump) + 全频噪声瞬态 (punch) + 呼啸层 (whoosh) 三层叠加，
 *    拥有 mp3 文件难以提供的厚实打击感
 */
export class SoundManager {
  constructor() {
    this.bgmAudio = null;
    this.currentBgmName = null;
    this.sfxCache = {};
    this.bgmVolume = 0.65;
    this.sfxVolume = 0.85;
    this.userInteracted = false;
  }

  unlock() {
    this.userInteracted = true;
    if (this.bgmAudio && this.bgmAudio.paused && this.currentBgmName) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  // 播放或切换 BGM
  playBgm(bgmName, loop = true) {
    if (this.currentBgmName === bgmName && this.bgmAudio && !this.bgmAudio.paused) {
      return;
    }

    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio = null;
    }

    this.currentBgmName = bgmName;
    const path = `assets/audio/bgm/${bgmName}.mp3`;
    const audio = new Audio(path);
    audio.loop = loop;
    audio.volume = this.bgmVolume;
    this.bgmAudio = audio;

    if (this.userInteracted) {
      audio.play().catch(e => console.log('BGM play deferred', e));
    }
  }

  stopBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio = null;
    }
    this.currentBgmName = null;
  }

  // 播放短促音效
  playSfx(sfxName) {
    // ★ 打击感增强：命中/挥击类音效优先走 Web Audio 三层合成 (thump+punch+whoosh)
    if (sfxName === 'sfx_hit_normal' || sfxName === 'sfx_hit_crit' || sfxName === 'sfx_attack_swing') {
      this.playImpactSynth(sfxName);
      return;
    }

    const path = `assets/audio/sfx/${sfxName}.mp3`;
    let sound = this.sfxCache[sfxName];

    if (!sound) {
      sound = new Audio(path);
      sound.volume = this.sfxVolume;
      this.sfxCache[sfxName] = sound;
    }

    try {
      sound.currentTime = 0;
      const promise = sound.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } catch (e) {}
  }

  // ==================== Web Audio 打击感合成 ====================

  _getCtx() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
      return this.audioCtx;
    } catch (e) {
      return null;
    }
  }

  // 噪声缓冲 (缓存在实例上，避免每次打击重新生成)
  _noiseBuffer(ctx, durationSec) {
    const key = `noise_${durationSec}`;
    if (!this._noiseCache) this._noiseCache = {};
    if (this._noiseCache[key]) return this._noiseCache[key];

    const len = Math.floor(ctx.sampleRate * durationSec);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      ch[i] = Math.random() * 2 - 1;
    }
    this._noiseCache[key] = buf;
    return buf;
  }

  /**
   * 三层打击合成：
   * Layer 1 thump  —— 低频正弦 160→45Hz 指数滑落，重而沉的"体感冲击"
   * Layer 2 punch  —— 带通噪声瞬态 (中心 1800Hz)，"啪"的打击脆度
   * Layer 3 whoosh —— 高通白噪 40ms 快速衰减，拳风呼啸
   * crit 版本全部参数加强：更低频、更响、更长尾 + 额外铃振泛音
   */
  playImpactSynth(sfxName) {
    const ctx = this._getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const isCrit = sfxName === 'sfx_hit_crit';
    const isSwing = sfxName === 'sfx_attack_swing';
    const master = ctx.createGain();
    master.connect(ctx.destination);

    if (isSwing) {
      // 挥击：只有呼啸层，无打击体感
      master.gain.value = this.sfxVolume * 0.5;
    } else {
      master.gain.value = this.sfxVolume * (isCrit ? 1.0 : 0.85);
    }

    // ---- Layer 1: thump 低频重击 ----
    if (!isSwing) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isCrit ? 200 : 150, now);
      osc.frequency.exponentialRampToValueAtTime(isCrit ? 35 : 45, now + (isCrit ? 0.22 : 0.15));
      g.gain.setValueAtTime(1.0, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + (isCrit ? 0.26 : 0.18));
      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + 0.3);
    }

    // ---- Layer 2: punch 带通噪声瞬态 ----
    if (!isSwing) {
      const src = ctx.createBufferSource();
      src.buffer = this._noiseBuffer(ctx, 0.1);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = isCrit ? 1000 : 1800;
      bp.Q.value = 0.8;
      const g = ctx.createGain();
      g.gain.setValueAtTime(isCrit ? 0.9 : 0.65, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(now);
    }

    // ---- Layer 3: whoosh 呼啸 ----
    const wsrc = ctx.createBufferSource();
    wsrc.buffer = this._noiseBuffer(ctx, 0.18);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = isSwing ? 2500 : (isCrit ? 3000 : 4000);
    const wg = ctx.createGain();
    const wDur = isSwing ? 0.16 : 0.06;
    wg.gain.setValueAtTime(isSwing ? 0.55 : 0.28, now);
    wg.gain.exponentialRampToValueAtTime(0.001, now + wDur);
    wsrc.connect(hp);
    hp.connect(wg);
    wg.connect(master);
    wsrc.start(now);

    // ---- crit 额外层：金属泛音铃振 (加长加亮) ----
    if (isCrit) {
      const ring = ctx.createOscillator();
      const rg = ctx.createGain();
      ring.type = 'square';
      ring.frequency.setValueAtTime(1100, now);
      ring.frequency.exponentialRampToValueAtTime(700, now + 0.25);
      rg.gain.setValueAtTime(0.12, now + 0.01);
      rg.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      ring.connect(rg);
      rg.connect(master);
      ring.start(now);
      ring.stop(now + 0.35);
    }
  }

  // 兼容旧接口 (供外部直接调用)
  playHitSynth(isCrit = false) {
    this.playImpactSynth(isCrit ? 'sfx_hit_crit' : 'sfx_hit_normal');
  }
}

export const sound = new SoundManager();
