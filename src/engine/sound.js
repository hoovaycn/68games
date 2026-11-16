/**
 * 现代音频管理器（真实 MP3 播放，统一组件）
 * 1. BGM 加载 assets/audio/bgm/；SFX 统一加载 assets/audio/sfx/sfx_*.mp3
 * 2. 所有音效（含战斗打击音效）统一走真实 mp3 素材，命名规范 sfx_*.mp3，
 *    由 combat_exchange 时间轴按需触发，保证战斗音效口径一致
 */

// 缺失 SFX 别名：第三幕引用了尚未交付的素材，先指向已有音效；素材交付后删掉对应行即可
const SFX_ALIASES = {
  sfx_explosion: 'sfx_glass_shatter',
  sfx_disaster_fire: 'sfx_suspense',
  sfx_dialogue_important: 'sfx_phone_msg'
};

// 各目录音频扩展名探测顺序：BGM 优先 ogg（无缝循环）；SFX 多为 mp3，优先 mp3 减少 404 往返
const EXT_PROBE_ORDER = {
  bgm: ['.ogg', '.mp3', '.wav'],
  sfx: ['.mp3', '.wav', '.ogg']
};

export class SoundManager {
  constructor() {
    this.bgmAudio = null;
    this.currentBgmName = null;
    this.sfxCache = {};
    this.bgmCache = {};
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

  // 播放或切换 BGM（自动探测扩展名）
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
    let audio = this.bgmCache[bgmName];
    if (!audio) {
      audio = new Audio();
      audio.volume = this.bgmVolume;
      this.bgmCache[bgmName] = audio;
      this._loadWithFallback(audio, 'bgm', bgmName);
    }
    audio.loop = loop;
    this.bgmAudio = audio;

    if (this.userInteracted) {
      audio.play().catch(e => console.log('BGM play deferred', e));
    }
  }

  // 依次尝试扩展名，加载失败自动回退到下一个扩展名
  _loadWithFallback(audio, dir, name, onRetryPlay) {
    const exts = EXT_PROBE_ORDER[dir] || ['.ogg', '.mp3', '.wav'];
    let i = 0;
    const loadNext = () => {
      if (i >= exts.length) return;
      audio.src = `assets/audio/${dir}/${name}${exts[i++]}`;
    };
    audio.addEventListener('error', () => {
      if (i < exts.length) {
        loadNext();
        if (onRetryPlay) onRetryPlay();
      }
    });
    loadNext();
  }

  stopBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio = null;
    }
    this.currentBgmName = null;
  }

  // 播放短促音效（自动探测扩展名）
  playSfx(sfxName) {
    // Node / 无窗口环境（selftest 引用组件层时）直接跳过，避免 Audio 未定义炸栈
    if (typeof window === 'undefined') return;

    sfxName = SFX_ALIASES[sfxName] || sfxName;
    let sound = this.sfxCache[sfxName];

    if (!sound) {
      sound = new Audio();
      sound.volume = this.sfxVolume;
      this.sfxCache[sfxName] = sound;
      this._loadWithFallback(sound, 'sfx', sfxName, () => {
        try {
          sound.currentTime = 0;
          sound.play().catch(() => {});
        } catch (e) {}
      });
    }

    try {
      sound.currentTime = 0;
      const promise = sound.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } catch (e) {}
  }

  // 静默预加载：章节切换空闲期提前拉取，避免进入场景后才开始下载
  preloadBgm(bgmName) {
    if (typeof window === 'undefined' || !bgmName) return;
    if (this.bgmCache[bgmName]) return;
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = this.bgmVolume;
    this.bgmCache[bgmName] = audio;
    this._loadWithFallback(audio, 'bgm', bgmName);
  }

  preloadSfx(sfxName) {
    if (typeof window === 'undefined' || !sfxName) return;
    sfxName = SFX_ALIASES[sfxName] || sfxName;
    if (this.sfxCache[sfxName]) return;
    const sound = new Audio();
    sound.preload = 'auto';
    sound.volume = this.sfxVolume;
    this.sfxCache[sfxName] = sound;
    this._loadWithFallback(sound, 'sfx', sfxName);
  }
}

export const sound = new SoundManager();
