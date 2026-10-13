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
        text: '大考开考，监考老师发卷的瞬间，考场所有电灯齐刷刷闪了三下。笔尖刚碰到答题卡，周围的喧闹声像被抽水机抽走一样，瞬间死寂。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '我一抬头，监考老师和别的同学全不见了！整间教室空荡荡的，就剩下我们几个，还有那股压得人喘不过气的恐惧感。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '我懂了……刘老师说过，那玩意儿就在咱们自己心里！这里根本不是考场，是它把咱们心里最怕考砸的念头给活生生拽出来了！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这片精神考场里，谁也别想当逃兵。',
      buttonText: '【看清这片精神考场】',
      targetScene: 'ch9_scene_realm'
    }
  },

  ch9_scene_realm: {
    id: 'ch9_scene_realm',
    title: '精神考场 · 面对异化自我',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_exam_mind_realm@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_exam_realm@2x.png',
    bgm: 'bgm_retro_level3',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大家猛地站起身。眼前的黑板与考桌被无形的力量扭曲，六道浑身散发着冰冷幽光的身影，悄然从虚空中浮现——那是完完全全由每个人内心最深处的恐惧与心魔滋生出的异化自我！',
        sfx: 'sfx_shock_sting'
      },
      // 1. 张希哲 vs 张希哲影子
      {
        id: 2,
        speaker: '张希哲的心魔',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '喝了它，你就能永远跑在最前面！你不是最怕体测被淘汰、最怕看着兄弟倒下自己却是个帮不上忙的累赘吗？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'right',
        text: '累赘？老子平时在球场上哪怕跑到抽筋，也是靠这两条腿硬蹬下来的！靠吃药算什么真本事？那不是保护同伴，那是连自己都看不起！',
        sfx: 'sfx_confirm'
      },
      // 2. 覃瑞怡 vs 覃瑞怡影子
      {
        id: 4,
        speaker: '覃瑞怡的心魔',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted@2x.png',
        activeSide: 'right',
        text: '只要永远拿第一，所有人就都得看着你、夸奖你。你不是最怕从红榜跌下来，看着爸妈眼里的光熄灭吗？你输得起吗？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted@2x.png',
        activeSide: 'left',
        text: '我以前是怕！我怕哪怕少考一分大家就不喜欢我了！可是今天走过这一路我才明白——大家并肩作战不是因为我考了多少分，而是因为我是覃瑞怡！虚假的第一名，我不要！',
        sfx: 'sfx_confirm'
      },
      // 3. 朱晏泽 vs 朱晏泽影子
      {
        id: 6,
        speaker: '朱晏泽的心魔',
        leftPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '你不是整天装大方讲义气吗？赢家才配谈义气！输光了分数被踩在脚下，你的义气在别人眼里就是个笑话！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'right',
        text: '你少侮辱‘义气’这两个字！老子就算考倒数第一挨揍，也绝不出卖良心、出卖朋友！跟你们这种冷血木偶混在一起才叫真丢人！',
        sfx: 'sfx_confirm'
      },
      // 4. 伙伴 2（范文默/何妍熹） vs 心魔
      {
        id: 8,
        speaker: '{ALLY_2_SHADOW_NAME}',
        leftPortrait: '{ALLY_2_CORRUPTED_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '你总觉得自己平平无奇、什么都争不过别人……只要伸手接受这股力量，全班都会羡慕你的聪明，你再也不用缩在角落里了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_CORRUPTED_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '缩在角落里怎么了？只要有这帮朋友在，哪怕我再普通也是独一无二的！我绝不把自己的灵魂卖给怪物！',
        sfx: 'sfx_confirm'
      },
      // 5. 伙伴 1（张瀚瑜/陈品璇） vs 心魔
      {
        id: 10,
        speaker: '{ALLY_1_SHADOW_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_1_CORRUPTED_PORTRAIT}',
        activeSide: 'right',
        text: '别自欺欺人了，你心底里难道没有动摇过？只要一次，就这一次大考走个捷径，未来多轻松啊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_1_CORRUPTED_PORTRAIT}',
        activeSide: 'left',
        text: '滚你娘的蛋！捷径的尽头就是变成像你们这样没有心跳的死人！这一卷子到底能得几分，老子自己算说了算！',
        sfx: 'sfx_confirm'
      },
      // 6. 主角（张子骁/石予诺） vs 心魔（压轴爆发）
      {
        id: 12,
        speaker: '{MC_SHADOW_NAME}',
        leftPortrait: '{MC_CORRUPTED_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '你看看你自己，一路扛着所有人走到这里，你不累吗？承认吧，面对这场足以改变命运的大考，你比谁都害怕考砸，你比谁都渴望这股无所不能的力量！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 13,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_CORRUPTED_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '我是怕！谁大考前不紧张害怕？！可那绝不是把自己变成怪物的理由！',
        sfx: 'sfx_confirm'
      },
      {
        id: 14,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_CORRUPTED_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '刘老师和徐老师花了整整二十年都没能解开的死结，今天——就由我们六个人彻底砸烂！想要夺走我们的人生，先问问我们手里的拳头答不答应！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '六颗炽热的心彻底挣脱了恐惧的枷锁！精神考场的气息轰然暴涨，与六个冷酷的心魔轰然相撞，终局之战全面爆发！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这一仗打的不是分数，而是我们心里那个想走捷径、想靠吃零食作弊的软弱自己！',
      buttonText: '【决战！击溃心魔】',
      battleId: 'ch9_battle1',
      isBattleTrigger: true
    }
  },

  ch9_scene_relief: {
    id: 'ch9_scene_relief',
    title: '交卷之后 · 田野傍晚',
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
        bgImg: 'assets/backgrounds/bg_exam_realm@2x.png',
        text: '随着最后一击落下，六个影子化作碎光消散。青蓝色的幻境考场如镜面般彻底崩裂，刺眼的白光吞没了一切……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_classroom@2x.png',
        text: '等耳边的轰鸣渐渐平息，大家猛然睁开眼——日光灯平静地照着考场，监考老师正不紧不慢地走过过道，周围只有同学们沙沙的翻卷声。那场凶险万分的精神心魔战，在现实中不过是短短一瞬。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_classroom@2x.png',
        text: '几个人远远地对视了一眼，眼里的慌乱与恐惧已经荡然无存。握紧手中的笔，没有捷径，没有荧光，一笔一划，坦坦荡荡地写下了属于自己的每一个答案。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_classroom@2x.png',
        text: '清脆的交卷铃声在整个校园上空回荡。最后一门考完，交卷，走出校门——那个被焦虑和异化阴影笼罩的夏天，终于在欢呼声中被彻底甩在身后。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_field_relief@2x.png',
        text: '不知不觉，几个人一路晃晃悠悠走到了校外的田野。夕阳把草坡染成暖融融的金黄，晚风吹起衣角，大家并肩走着，大口大口呼吸着真正属于夏天的自由空气。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '没有广播催促，也没有人再逼着背公式。风吹过草地，大家终于踏踏实实活过来了。',
      buttonText: '【听听大家说什么】',
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
        text: '呼——考完了！不管考多少分，反正卷子是我自己一笔一划写完的！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'right',
        text: '我最后两道大题全空着……不过算了！能活着走出来，没变成满嘴公式的怪物就烧高香了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '就是！反正我也没觉得自己变聪明。大不了回家挨顿男女混合双打，天还能塌下来不成？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '考砸了再补呗！手脚好好的，脑子也没丢。走啊，明天放假，球场见！看我不把你突成筛子！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '少吹牛了你，上次是谁踢野球把鞋踢飞的？……不过，我今天好像还是头一回觉得，就算考不了第一，其实也没什么大不了的。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '那可不，第一名能当下饭菜吃啊？脑子在，哥们儿在，比啥都强！哎，周末谁去我家？我搞到张新卡带！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '什么卡带？是不是最近传得特别神的那款《六8异闻录》？听说贼难通关，打不赢怪还会被同桌嘲笑那种！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '带我一个带我一个！这回谁输了谁请校门口大碗馄饨，加两勺辣油不许耍赖！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '打闹声随着晚风飘得很远。二十年前徐老师和刘老师没能护住的夏天，在这一届孩子们手里，终于稳稳当当地落下了帷幕。',
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '那些发光的怪味零食，也被徐老师尽数封存了起来。只是，所有人心头的那块巨石，其实并没有真正落地。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '在谁也未曾留意的城市阴影深处，那些散落的青蓝色荧光正悄悄换上新的伪装，等待着下一个渴望走捷径的灵魂。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '还记得学期末那场让人喘不过气的家长会吗？那个西装革履、目光阴鸷、在暗处操控全班精神异化的“神秘家长”，至今就像一团挥之不去的阴影。',
        sfx: 'sfx_suspense'
      },
      {
        id: 13,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '二十年前，在徐老师和语文刘老师的记忆里，毁掉他们同伴的那个幕后黑手也和他有着千丝万缕的联系。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '躲在零食和保送名额背后的黑手，不仅没有收手，反而正在省城更深处酝酿着更大的阴谋……',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '七月盛夏，全班收到了一份由教育基金会特别赞助的暑期博物馆参观邀请函。',
      buttonText: '【前往博物馆 · 开启第二幕】',
      targetScene: 'ch10_scene_museum_meet'
    }
  }
};
