/**
 * 第十章《大考》（第一幕 终）剧情脚本数据表
 */

export const CHAPTER9_STORY = {
  ch9_scene_exam: {
    id: 'ch9_scene_exam',
    title: '大考开始 · 灯闪了三下',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_exam_realm@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大考开场，监考老师发卷的瞬间，考场所有灯同时闪了三下。笔尖刚碰到卷纸，所有人的耳边都像被什么东西轻轻拽了一下，周围的声音一下远了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '我再一抬头，还是在考场里，但周围空荡荡的，就好像整个世界只剩下我们这几个人，还有我们心里最怕考砸的那种感觉。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '我这才明白刘老师说的“它也在你心里等你自己伸手”是什么意思。这里根本不是现实，这是在我们自己的精神世界里！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '而这场对话，谁也别想躲过去。',
      buttonText: '【看清这片精神考场】',
      targetScene: 'ch9_scene_realm'
    }
  },

  ch9_scene_realm: {
    id: 'ch9_scene_realm',
    title: '精神考场 · 面对异化自我',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_exam_realm@2x.png',
    bgm: 'bgm_retro_level3',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '小伙伴们、张希哲、覃瑞怡、朱晏泽六个人抬起头，正对面都站着一个和自己一模一样、却更冷、更空、更像“只剩结果”的异化自我。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲的影子',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted@2x.png',
        activeSide: 'left',
        text: '喝了就能一直保护别人。你不是最怕看着同伴受伤，自己却帮不上忙吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡的影子',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted@2x.png',
        activeSide: 'right',
        text: '只要你一直考第一，大家就会一直围着你转。你不是最怕让大家失望吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '朱晏泽的影子',
        leftPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '你不是最讲义气吗？那你就更该赢。赢的人才有资格护别人，输的人连说话都像借口。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        activeSide: 'left',
        text: '你说得像是全懂，可你根本不是答案。我们怕输，怕考差，怕被说不行，可那也不是把自己整个换掉的理由。',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '谁不想少挨几句骂、少丢点脸、不让爸妈失望？可要是为了这些连命都不要了，那活着还有什么意思！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '你们不就是想逼我们承认，只要能赢，变成怪物也无所谓吗？我呸！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '六个异化自我同时从考桌后站了起来。没有谁先动，可那股“只要赢就够了”的气，已经一起压了过来。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这一仗打的不是分数，而是我们心里那个想走捷径、想靠吃零食拿高分的自己。',
      buttonText: '【团战异化自我】',
      battleId: 'ch9_battle1',
      isBattleTrigger: true
    }
  },

  ch9_scene_relief: {
    id: 'ch9_scene_relief',
    title: '白屏之后 · 田野傍晚',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_field_relief@2x.png',
    bgm: 'bgm_home_town',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '六个异化自我一齐碎开之后，青蓝色的精神考场像玻璃一样裂开。画面猛地一白，屏上只留下很轻的一句字：等大家回过神来，那一天已经过去了。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '白屏淡出后，直接就是傍晚的田野。风吹过草地，天很高，几个人并肩走着，谁都没有先开口，像刚把整口气慢慢喘回来。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '没有成绩单，没有广播，也没有谁站出来宣布“从此以后皆大欢喜”。只有人还在，风也还在。',
      buttonText: '【听大家说两句】',
      targetScene: 'ch9_scene_ending'
    }
  },

  ch9_scene_ending: {
    id: 'ch9_scene_ending',
    title: '田野尽头 · 第一幕终',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_field_relief@2x.png',
    bgm: 'bgm_home_town',
    dialogues: [
      {
        id: 1,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '反正考都考完了。至少这次的分数是咱们自己凭本事考的。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'right',
        text: '我这次估计考得也就那样。算了，没变成怪物就行。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我也没觉得自己突然变聪明了。没考好就没考好吧，天又不会塌下来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '考差了再补呗。球还能踢，人还好好的。能平平安安站在这儿就比什么都强。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '没考第一也没关系。只要大家都没事，比什么都强。要是为了个名次变成怪物，那才亏大了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '第一名又不能当饭吃。脑子还在，朋友还在，咱们已经赚了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '对。成绩固然重要，但只要咱们还好好的，比什么考第一都强。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '画面慢慢变黑，现有的未完待续画面浮了上来。白字一点点显出来：第一幕 终。第二幕：它换了个壳，又回来了。未完待续。',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '这一次，大家终于没有重蹈覆辙。能保住咱们这一届的人，也总比像以前那样，一代代人都为了分数变成怪物要强得多。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHAPTER_CLEAR',
      prompt: '第一幕到这里结束。',
      buttonText: '【未完待续】'
    }
  }
};
