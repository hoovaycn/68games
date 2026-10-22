/**
 * 第十五章《罐子碎了》剧情脚本数据表（第二幕 第5章）
 *
 * 流程结构：
 * - ch14_scene_dock_ritual: 登上驳船甲板，直面轮椅上的老太爷沈万廷与第六代沈崇礼
 * - ch14_scene_pot_broken: 强行开炉争夺古罐，罐体碎裂引发致幻黑雾与时空异变
 * - ch14_battle1: 驳船甲板狂风暴雨阻击战（主角团 VS 异化黑衣护卫与药人体）
 * - ch14_scene_vortex_entry: 剧烈碰撞触发古瓷罐中的历史残留精神共鸣，时空涡流将主角团卷入
 */

export const CHAPTER14_STORY = {
  // s1: 登上海轮 · 邪炉恶首
  ch14_scene_dock_ritual: {
    id: 'ch14_scene_dock_ritual',
    title: '古运河驳船甲板 · 幽蓝祭坛',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_barge_altar@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '驳船在江浪里晃得厉害。铜炉旁坐着一个戴氧气面罩、身上接着输液管的老人；沈崇礼站在他身边。刘老师一眼认出来：轮椅上的就是二十年前害了阿瑶的沈万廷。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '徐老师、刘老师，还有海警督。你们来晚了！等江潮涨上来，我们就能用铜炉把罐里的老烟膏熬成新药。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '沈万廷（轮椅老人）',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（干瘪的喉咙里发出风箱般的怪笑）嗬……嗬……刘秉德，二十年了，你那根破竹教鞭还没扔呢？当年阿瑶的哀求我还记在耳朵里……今天，该轮到你们的新学生了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/shen_wanting_old@2x.png',
        activeSide: 'left',
        text: '沈万廷！人在做天在看，二十年前的账，今天我们连本带利向你讨回来！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '沈崇礼拉动绞盘，要用烧红的钢棍捅破罐口的封泥，让里面的烟膏落进炉里！',
      buttonText: '【飞身夺罐 · 阻止开炉】',
      targetScene: 'ch14_scene_pot_broken'
    }
  },

  // s2: 瓷罐碎裂 · 异象突起
  ch14_scene_pot_broken: {
    id: 'ch14_scene_pot_broken',
    title: '甲板中心 · 狂澜异变',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_barge_altar@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '老爸海峰与徐老师同时飞扑而上，一脚踹翻铁绞盘！然而烧红的钢棍依然擦过古瓷罐的腹部——只听“咔嚓”一声脆响，历经近两百年风霜的青花古罐竟当场炸裂！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '碎罐里涌出大团黑烟，烟中隐约浮出一张狰狞的脸。罐壁内侧刻着的金色纹路也亮了起来，碰到黑烟后，甲板上的人影和江岸竟开始扭曲、重叠。谁也说不清发生了什么。',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '混账！你们竟敢砸碎老祖宗的传家宝！护卫队，把所有人推下江喂鱼！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '先捂住口鼻，别吸那股黑烟！它跟学校的怪味零食一样会让人失控。打手已经围上来了，大家靠在一起！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '海峰和两位老师挡住船舷那侧的追兵；六个孩子守在铜炉旁，迎上围来的异化护卫！',
      buttonText: '【甲板血战 · 决战驳船】',
      battleId: 'ch14_battle1',
      isBattleTrigger: true
    }
  },

  // s3: 时空涡流 · 坠入百年前
  ch14_scene_vortex_entry: {
    id: 'ch14_scene_vortex_entry',
    title: '扭曲的天空 · 逆转的指针',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_barge_altar@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '护卫被打退，可碎罐上的金色纹路还在发亮，黑烟也没有散。两股光和烟缠在一起，头顶的夜空慢慢裂开一个大洞，甲板开始像纸一样卷起来。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '脚下的甲板……甲板在消失？！爸！抓紧我的手！！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '抓紧！所有人手拉着手！徐老师、刘老师，护住孩子们的头！！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '江水仿佛倒着流，白光吞没甲板。六个孩子、海峰和两位老师还抓着彼此，脚下的船却突然消失了。远处传来战鼓和炮声，他们正一起被拽离现代的江面。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '白光没有散。众人仍在往前飞，身后的江水和驳船越退越远；他们这是穿越了。',
      buttonText: '【抓紧彼此 · 穿过时空通道】',
      targetScene: 'ch15_scene_time_passage'
    }
  }
};
