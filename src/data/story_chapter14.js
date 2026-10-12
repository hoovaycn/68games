/**
 * 第十五章《海魂回响》剧情脚本数据表（第二幕 第5章）
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
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '铁壳驳船在江浪中剧烈颠簸。甲板中央摆着三张太师椅，中间瘫坐着一个浑身插满输液管、戴着氧气面罩的枯槁老人；右侧站着的，正是家长会上西装革履的沈崇礼。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（手扶铜炉，阴恻恻地冷笑）徐老师，刘老师……还有海警督，带着一群乳臭未干的小毛孩，动作倒是挺快。可惜，时辰已到，江潮已平！',
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
      prompt: '沈崇礼猛地拉动绞盘，将烧红的钢钎插向铜炉正上方的古瓷罐！',
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
    bgm: 'bgm_boss_intro',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '老爸海峰与徐老师同时飞扑而上，一脚踹翻铁绞盘！然而烧红的钢钎依然擦过古瓷罐的腹部——只听“咔嚓”一声脆响，历经近两百年风霜的青花古罐竟当场炸裂！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '罐中并未流出寻常的药膏，而是一团凝聚成骷髅恶鬼形态的浓黑恶气呼啸而出！更奇异的是，罐壁上附着的古代封印金光与黑气剧烈交融，整个甲板四周的天地竟开始扭曲重叠！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '混账！你们竟敢砸碎老祖宗的传家宝！护卫队，把所有人推下江喂鱼！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '黑气里混着极强的麻醉致幻成分，大家屏住呼吸！先解决眼前的打手！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '甲板上狂风呼啸，十余名服用了药剂的异化精锐死士拔出铁棍围拢上来！',
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
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '最后一批异化护卫被打翻落水。然而战斗激发的真气与瓷罐中的封印力量产生共振，天空中的阴云旋转成一个吞噬一切的巨大空洞！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'left',
        text: '脚下的甲板……甲板在消失？！爸！抓紧我的手！！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_default@2x.png',
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
        text: '江水倒流，夜空如镜面般一片片碎裂。强烈的白光与海浪的咸腥味瞬间淹没了所有人的视听意识……耳边隐隐传来震耳欲聋的战鼓声与铁炮轰鸣！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '白光消散，历史的巨轮在眼前隆隆倒转！',
      buttonText: '【时空逆流 · 梦回道光年间】',
      targetScene: 'ch15_scene_historic_prologue'
    }
  }
};
