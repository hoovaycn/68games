/**
 * 第三章《谁是下一个》剧情脚本数据表
 *
 * 流程结构（按 GDD §7 定稿）：
 * - ch2_scene_auditorium: 全校大会，徐老师举物证警告荧光食品，全校人心惶惶、互猜互疑
 * - ch2_scene_exam_result: 教室发成绩，主角超常发挥，全班起哄质疑吃了荧光零食
 * - ch2_scene_confrontation: 朱晏泽反常带头诬陷，同伴挺身护短，心魔爆发开战
 * - ch2_battle1: 教室 3v3 战役（主角 + 两位第一章同伴 VS 魔化朱晏泽 + 起哄男女生）
 * - ch2_scene_recover: 打醒朱晏泽，反常印证中邪，垃圾桶找到未拆封零食彻底洗清冤屈，朱晏泽入队
 * - ch2_scene_school_night: 深夜校园密会，徐老师手提物证对峙黑影女子，第三章留白完结
 */

export const CHAPTER2_STORY = {
  // s1: 全校大会 · 人心惶惶
  ch2_scene_auditorium: {
    id: 'ch2_scene_auditorium',
    title: '校大礼堂 · 紧急全校食品安全大会',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_auditorium@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '午后的大礼堂里，全校学生排排坐，空气里飘着淡淡的消毒水味。徐老师攥着一只贴着封条的证物袋，大步走上讲台。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '全体注意！最近校外出现了一种会发荧光的怪异零食和饮料！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '食用后精神会狂暴失控，还会像发了疯一样学习，做出远超自己能力的事！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '记住——谁的成绩要是突然好得离谱，那才是最危险的信号！任何人见到，一律严禁碰触，立刻上交！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '台下一片哗然。人群窃窃私语，看彼此的眼神第一次带上了提防。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '男同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '这么说……昨天我同桌抽屉里那包发着光的零食，就是这种东西？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '女同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: 'assets/art/classmate_girl_default@2x.png',
        activeSide: 'right',
        text: '你同桌？我还想问你呢，昨天课间你把什么偷偷塞进书包里了？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '男同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: 'assets/art/classmate_girl_default@2x.png',
        activeSide: 'left',
        text: '胡说什么，那是我妈塞的早餐！倒是你，这两天突然抱着初中课本看得起劲……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '女同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: 'assets/art/classmate_girl_default@2x.png',
        activeSide: 'right',
        text: '我、我那是自己买来预习的，关你什么事！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '你一言我一语，越来越多的人插进来，互相指着鼻子。刚才还挨着坐的同学，一下子谁都不敢离谁太近。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '全校大会解散，大家神色凝重地走回六 8 班教室。',
      buttonText: '【回到教室 · 准备突击小测发卷】',
      targetScene: 'ch2_scene_exam_result'
    }
  },

  // s2: 教室发成绩 · 起哄与猜疑
  ch2_scene_exam_result: {
    id: 'ch2_scene_exam_result',
    title: '六 8 班教室 · 突击小测与猜忌目光',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_classroom@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '下午第一节课，教室里安静得反常。每个人的成绩单都攥得发皱，眼神在卷子和同桌之间来回瞟。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '下面公布今天上午突击小测的成绩。第一名……{MC_NAME}，满分！',
        highlight: true,
        sfx: 'sfx_fanfare'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '（咦？！我昨晚因为调查的事折腾到半夜，根本没复习……怎么可能考满分？！）',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '男同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '哟呵，平时六十多分的学酥，突然考满分？太阳从西边出来了？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '女同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: 'assets/art/classmate_girl_default@2x.png',
        activeSide: 'right',
        text: '该不会……是吃了徐老师刚才说的那个荧光零食吧？！为了成绩居然碰那种东西！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '后排，朱晏泽却一言不发。这帅气的富二代平日里最爱起哄护短，零花钱多到能把小卖部包圆，谁被欺负了他第一个拍桌子；如今却低着头，指节捏得发白。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '教室后排的桌椅被粗暴掀开，最令人意想不到的人竟然带头走了出来！',
      buttonText: '【面对指责 · 抬头对质】',
      targetScene: 'ch2_scene_confrontation'
    }
  },

  // s3: 朱晏泽反常带头诬陷 · 同伴护短
  ch2_scene_confrontation: {
    id: 'ch2_scene_confrontation',
    title: '教室走道 · 义气富二代的反常指控',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_classroom@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '老师！昨晚就是{MC_NAME}偷偷从小贩手里拿了荧光零食！满分全是作弊来的！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '朱晏泽你吃错药了吧？！上周你抄我英语作业时还说我是你亲哥，今天转头就往我身上泼脏水？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '你有什么证据？昨天我和{MC_NAME}一起去救中招的同学，今天你倒说我们偷偷吃了零食？',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '我自己中过招，最清楚中邪的样子！{MC_NAME} 眼神清澈，倒是你们眼里在冒青光！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_classroom_eerie@2x.png',
        text: '话音刚落，朱晏泽猛地瞪圆双眼，瞳仁深处泛起诡异的荧绿青光，语气陡然狰狞！',
        bgm: 'bgm_eerie_revelation',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_classroom_eerie@2x.png',
        text: '闭嘴！今天我就替全班把你们这些作弊的家伙赶出学校！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '男同学',
        leftPortrait: 'assets/art/classmate_boy_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_classroom_eerie@2x.png',
        text: '对！就是他偷吃了徐老师说的怪零食！他满分全是作弊来的，把他赶出去！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '女同学',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/classmate_girl_corrupted@2x.png',
        activeSide: 'right',
        bgImg: 'assets/backgrounds/bg_classroom_eerie@2x.png',
        text: '大家一起上，别让这个作弊的家伙跑了！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '朱晏泽掏出了昂贵的金尖钢笔狂暴挥舞！伙伴们立刻结阵迎战！',
      buttonText: '【展开战斗 · 击破猜疑心魔】',
      battleId: 'ch2_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 战后打醒 · 洗清冤屈 · 朱晏泽入队
  ch2_scene_recover: {
    id: 'ch2_scene_recover',
    title: '教室讲台 · 真相大白与义气同盟',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_classroom@2x.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（揉着头）头好痛……我刚才在胡扯什么？我怎么可能诬陷同学？！',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '男同学',
        leftPortrait: 'assets/art/classmate_boy_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '对不起！我们刚才也是脑子一热跟着瞎喊的……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '零食我确实从小贩手里收缴了，但我没吃，直接扔进了楼下垃圾桶！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '走！为师亲自陪你们去取证。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '十分钟后，徐老师当众从垃圾桶底层翻出了那袋未拆封的积灰零食，真相大白！',
        sfx: 'sfx_item_get'
      },
      {
        id: 6,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '好哥们！以后查案我出钱出力，零花钱和装备我全包了！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitId: 'zhuyanze',
      prompt: '重获清醒的义气大少朱晏泽加入队伍！',
      buttonText: '【全员集结 · 窥探夜晚校园】',
      targetScene: 'ch2_scene_school_night'
    }
  },

  // s5: 夜晚校园密会 · 第三章深色完结留白
  ch2_scene_school_night: {
    id: 'ch2_scene_school_night',
    title: '深夜校园 · 阴影中的密谈',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_school_night@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '深夜十一点，校园里一片死寂。教学楼黑黢黢的剪影如同一头潜伏在夜色中的巨兽。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'left',
        text: '零食和饮料瓶，我都扣下了。可孩子们已经开始互相猜忌，比那怪味零食扩散得还快。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '黑影女子',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'right',
        text: '呵呵……徐老师，你还是这么心软。当年那件事，你到现在还没放下。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'left',
        text: '放不下。就是因为放不下，我才不能让他们重走我们的老路。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '黑影女子',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'right',
        text: '光靠你一个人，护得住几个？它们……已经醒了。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'left',
        text: '那也得护，能护一个是一个。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '黑影女子',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'right',
        text: '你还是老样子。那就照我们当年说好的，继续把这出戏演下去。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '夜风猛地灌进走廊，路灯剧烈摇晃。那团黑影在墙上拉成一道扭曲的长影，随即像水一样，慢慢渗进了黑暗里……',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '第四章《她是谁》即将开启！',
      buttonText: '【继续：放学后的危机】',
      targetScene: 'ch3_scene_exhibition'
    }
  }
};
