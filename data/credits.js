/**
 * 素材授权登记 credits.js
 * 纪律：CC0 免署名；CC-BY 必须在游戏内 credits 界面原样署名。
 * 本文件由美术/音乐负责人维护，研发可直接读取渲染鸣谢页。
 */

export const CREDITS = {
  music: [
    {
      file: "bgm_battle_normal",
      title: "Retro Game Music Pack - Level 2",
      author: "Juhani Junkala",
      license: "CC0 1.0",
      url: "https://opengameart.org/content/5-chiptunes-action",
      note: "另转 ogg 供无缝循环"
    },
    {
      file: "bgm_battle_boss",
      title: "Chiptune Adventures - 3. Boss Fight",
      author: "Juhani Junkala",
      license: "CC0 1.0",
      url: "https://opengameart.org/content/4-chiptunes-adventure",
      note: "第三章心魔 boss 战（诡异）"
    },
    {
      file: "bgm_street",
      title: "Retro Game Music Pack - Level 1",
      author: "Juhani Junkala",
      license: "CC0 1.0",
      url: "https://opengameart.org/content/5-chiptunes-action",
      note: "P1 校外街道"
    },
    {
      file: "bgm_eerie_revelation",
      title: "JRPG Pack 3 Evil - Ancient Evil Awakens",
      author: "Juhani Junkala",
      license: "CC0 1.0",
      url: "https://opengameart.org/content/jrpg-pack-3-evil",
      note: "P1 反转高潮；原 horror 曲前导空白过长，改用诡异芯片曲替代"
    },
    {
      file: "bgm_classroom",
      title: "Exploring Town",
      author: "见 OGA 曲目页",
      license: "CC-BY 3.0/4.0（必须署名）",
      url: "https://opengameart.org/content/exploring-town"
    },
    {
      file: "bgm_suspense",
      title: "Spooky Dungeon",
      author: "Memoraphile",
      license: "CC-BY 4.0 / OGA-BY（必须署名）",
      url: "https://opengameart.org/content/spooky-dungeon"
    },
    {
      file: "bgm_victory",
      title: "Victory Fanfare（原创合成）",
      author: "本项目（豆包合成，随项目 CC0）",
      license: "CC0 1.0",
      url: ""
    },
    {
      file: "bgm_title",
      title: "JRPG Theme [Loop Ready]",
      author: "Juhani Junkala",
      license: "CC0 1.0",
      url: "https://opengameart.org/content/jrpg-trailer-theme",
      note: "标题画面主题曲"
    }
  ],
  sfx: [
    {
      file: "sfx_*（16 个）",
      title: "原创 16-bit 芯片音效（NumPy 合成）",
      author: "本项目（豆包合成，随项目 CC0）",
      license: "CC0 1.0",
      url: "",
      note: "cursor/confirm/cancel/text_blip/menu_open/step/attack_swing/hit_normal/hit_crit/miss/item_use/item_get/level_up/unit_down/phone_msg/shock_sting"
    },
    {
      file: "sfx_fanfare, sfx_suspense",
      title: "512 Sound Effects (8-bit style) - Fanfare / Weird",
      author: "Juhani Junkala",
      license: "CC0 1.0",
      url: "https://opengameart.org/content/512-sound-effects-8-bit-style",
      note: "fanfare=胜利号角；suspense=机械噪音悬疑氛围"
    },
    {
      file: "备用拟音库（未直接入包）",
      title: "Kenney RPG Audio",
      author: "Kenney",
      license: "CC0 1.0",
      url: "https://kenney.nl/assets/rpg-audio",
      note: "脚步/翻书/硬币等拟音备用，源文件存 work_ref/audio_src"
    },
    {
      file: "备用 jingle 库（未直接入包）",
      title: "Kenney Music Jingles",
      author: "Kenney",
      license: "CC0 1.0",
      url: "https://kenney.nl/assets/music-jingles"
    }
  ],
  art: [
    {
      file: "portraits/*、art/*、items/*",
      title: "全部角色头像/立绘/道具图标",
      author: "本项目（AI 生成 + 后期处理，版权随项目）",
      license: "项目内部使用",
      url: "",
      note: "Seedream 生成，洋红色键抠底；提示词与迭代记录见 docs/gdd.md §8"
    }
  ],
  fonts: [
    {
      file: "待下载",
      title: "方舟像素字体 Ark-Pixel",
      author: "Ark-Pixel 社区",
      license: "OFL 1.1",
      url: "https://github.com/TakWolf/ark-pixel-font"
    }
  ]
};
