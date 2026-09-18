/**
 * 第十章《大考》（第一幕 终）剧情脚本数据表
 */

export const CHAPTER9_STORY = {
  ch9_scene_exam: {
    id: 'ch9_scene_exam',
    title: '大考开始 · 灯闪了三下',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_exam_realm.png',
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
        text: '我再一抬头，眼前还是桌椅、试卷、黑板，可四周空得没有边，像是整个考场被谁掏空了，只剩下我们最怕输的那部分还被摊在这里。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刘老师之前说过的那句“它不只在零食里，它也在你心里等你自己伸手”，到这一刻才真正落地。这里不是外面的战场，是一次被摊开来的精神对话。',
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
    bgImg: 'assets/backgrounds/bg_exam_realm.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '按当前游玩路线进入终章：当前主角团、张希哲、覃瑞怡、朱晏泽六个人抬起头，正对面都站着一个和自己一模一样、却更冷、更空、更像“只剩结果”的异化自我。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲的影子',
        leftPortrait: 'assets/art/zhangxizhe_corrupted.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted.png',
        activeSide: 'left',
        text: '喝了就能一直护住别人。你不是最怕看着别人往前冲，自己却拦不住吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡的影子',
        leftPortrait: 'assets/art/zhangxizhe_corrupted.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted.png',
        activeSide: 'right',
        text: '只要你一直赢，大家就会一直喜欢你、一直围着你转。你不是最怕他们失望吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '朱晏泽的影子',
        leftPortrait: 'assets/art/zhuyanze_corrupted.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '你不是最讲义气吗？那你就更该赢。赢的人才有资格护别人，输的人连说话都像借口。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_corrupted.png',
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
        text: '少挨两句说、少丢一点脸、少让爸妈失望，这些想法谁没有？可真把它当成天条，就只剩一副壳了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '你们不就是想让我们自己承认：只要能赢，怎么换掉自己都值吗？我不认。',
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
      prompt: '这一仗打的不是分数，是每个人心里那个最想抄近道、最想拿结果换掉自己的影子。',
      buttonText: '【团战异化自我】',
      battleId: 'ch9_battle1',
      isBattleTrigger: true
    }
  },

  ch9_scene_relief: {
    id: 'ch9_scene_relief',
    title: '白屏之后 · 田野傍晚',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_field_relief.png',
    bgm: 'bgm_classroom',
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
    bgImg: 'assets/backgrounds/bg_field_relief.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '反正写成啥样都写完了。至少这回不是拿别的东西换来的。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'right',
        text: '我这次估计也就那样。算了，我还是我就行。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我也没突然开窍到飞起来。可没飞起来就没飞起来吧，天又不会因为这次分数低一点就塌下来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'left',
        text: '考差就补呗。球还能踢，腿还能跑，天也没塌。说到底，能站在这儿就挺好了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'right',
        text: '没一直赢也没关系。大家都还在，比什么都强。要是真为了一个名次把人弄丢了，那才亏大了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '第一名又不会替你过日子。人没丢，脑子没丢，朋友也没丢，已经赚了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '对。成绩当然重要，可比成绩更要紧的，不是“赢”，是自己还完整，身边的人也还在。',
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
        text: '这一次，他们没有让轮子顺着惯性再转下去。哪怕只是让这一届的孩子都保住了自己的魂，也已经好过一代代人跟着上一辈的轨迹，伸手、接下、再递给下一个人，永远循环下去。',
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
