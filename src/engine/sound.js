/**
 * 现代音频管理器（真实 MP3 播放，统一组件）
 * 1. BGM 加载 assets/audio/bgm/；SFX 统一加载 assets/audio/sfx/sfx_*.mp3
 * 2. 所有音效（含战斗打击音效）统一走真实 mp3 素材，命名规范 sfx_*.mp3，
 *    由 combat_exchange 时间轴按需触发，保证战斗音效口径一致
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
    // Node / 无窗口环境（selftest 引用组件层时）直接跳过，避免 Audio 未定义炸栈
    if (typeof window === 'undefined') return;

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
    // Node / 无窗口环境（selftest 引用组件层时）直接跳过，避免 Audio 未定义炸栈
    if (typeof window === 'undefined') return;

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
}

export const sound = new SoundManager();
