/**
 * 第十一章《省博惊魂》剧情脚本数据表（第二幕 第1章）
 *
 * 流程结构：
 * - ch10_scene_intro: 第二幕引子 · 第一幕风波平息但神秘家长与暗流未解
 * - ch10_scene_museum_meet: 暑假省博物馆大厅集合，少年团参观虎门销烟百年特展
 * - ch10_scene_crisis: 核心展厅，清代封泥古瓷罐渗出诡异青烟，保送生狂暴发狂
 * - ch10_scene_confrontation: 家长会上的神秘家长作为荣誉赞助人现身，指挥保镖强行掉包古罐
 * - ch10_battle1: 博物馆展厅遭遇战（主角团 VS 异化保镖与狂躁保送生）
 * - ch10_scene_tracking: 击退保镖，古罐已被偷运往城南汽修街，线索直指 {ALLY_2_NAME} 老爸所在的铺子
 */

export const CHAPTER10_STORY = {
  // s0: 第二幕序引 · 阳光下的潜流
  ch10_scene_intro: {
    id: 'ch10_scene_intro',
    title: '暑期之初 · 阳光下的未解之谜',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_field_relief@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '期末大考的硝烟随着盛夏的蝉鸣渐渐散去。六 8 班的孩子们凭借自己的汗水守住了卷子，那些发光的怪味零食也被徐老师尽数封存。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '然而，所有人心头的那块巨石并未真正落地。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/shen_chongli_default@2x.png',
        activeSide: 'left',
        text: '【上集回忆】还记得学期末那场让人喘不过气的家长会吗？那个西装革履、目光阴鸷、在暗处操控全班精神异化的“神秘家长”——沈崇礼，至今就像一团挥之不去的阴影。',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '二十年前，在徐老师和语文刘老师的记忆里，毁掉他们同伴的那个幕后黑手也和他有着千丝万缕的联系。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
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
      prompt: '七月盛夏，全班收到了一份由教育基金会特别赞助的暑期省博参观邀请函。',
      buttonText: '【前往省博物馆 · 开启第二幕】',
      targetScene: 'ch10_scene_museum_meet'
    }
  },

  // s1: 省博大厅集合 · 闲聊与新展
  ch10_scene_museum_meet: {
    id: 'ch10_scene_museum_meet',
    title: '省历史博物馆 · 百年特展大厅',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_museum_square@2x.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '省历史博物馆正门前，冷气从玻璃大门里丝丝冒出。{MC_NAME}、{ALLY_1_NAME}、{ALLY_2_NAME}、张希哲、覃瑞怡几个人顶着烈日站在特展巨幅海报下。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '好不容易放暑假，覃瑞怡你干嘛非拽我们来看什么《近代海防与虎门销烟出水文物展》啊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '你懂什么！这次展出的是当年林则徐销烟沉江的一手海捞古物，而且是省重点中学的加分调研项目，大家中考评级都用得上！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '……我总觉得今天博物馆周围不对劲。停车场那边停了好几辆没挂牌的黑玻璃面包车。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 41,
        speaker: '系统提示',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '【闪回回忆】大家脑海中瞬间浮现出期末家长会上那个居高临下、逼迫全班妥协的恐怖身影——没错，就是那个神秘家长！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '你看展馆顶上的赞助铭牌——“怡安教育慈善基金会”。当时家长会上扇动大家的那个神秘家长，正是这基金会的总干事！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '察觉到异常的少年们对视一眼，迅速通过安检闸机步入二号核心展厅。',
      buttonText: '【步入二号展厅 · 查探古物】',
      targetScene: 'ch10_scene_crisis'
    }
  },

  // s2: 展厅危机 · 古罐青烟与异变
  ch10_scene_crisis: {
    id: 'ch10_scene_crisis',
    title: '二号中央展厅 · 出水古瓷罐的异芒',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_museum_exhibition@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '展厅中央的防弹玻璃展柜内，陈列着一只布满海蛎壳与黑红色封泥的青花古瓷罐。铭牌赫然写着：道光十九年虎门镇口销烟遗存。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '重点班学生',
        leftPortrait: 'assets/art/senior_athlete_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（死死趴在展柜上，眼珠外凸泛着诡异青光）好香……这就是古书里能让人过目不忘的开窍圣水……给我……让我吸一口！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '喂！同学你清醒点！你在干什么？！展柜不能砸！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '古瓷罐的封泥缝隙中，竟丝丝缕缕飘出一股与第一幕怪异零食完全一致、但浓烈百倍的阴甜冷香！围观的学生们纷纷抱头狂躁嘶吼！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '展厅后方的侧门被重重推开，一群穿黑西装的冷酷保镖快步将展柜包围！',
      buttonText: '【迎面对质 · 阻止暴行】',
      targetScene: 'ch10_scene_confrontation'
    }
  },

  // s3: 神秘家长现身 · 指挥掉包
  ch10_scene_confrontation: {
    id: 'ch10_scene_confrontation',
    title: '展柜中央 · 神秘家长的狂妄',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_museum_exhibition@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '神秘家长（沈崇礼）',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '六 8 班的孩子们？还真是阴魂不散啊。学校里的小实验被你们搅黄了，竟然还能追到省博来？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '果然是你！你在借文物特展的名义，把百年前沉江的古毒提炼出来偷偷换走！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '神秘家长（沈崇礼）',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '毒？愚蠢的庸才才叫它毒，我们称之为“青髓”。当年林则徐烧不尽它，今天这满城渴望成才的家长与学生，更拒绝不了它！动手，装箱带走！把这几个小鬼扔进地下室！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '谁也别想碰展品！大伙抄家伙，把这群狗腿子打醒！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '黑衣保镖与被青烟蛊惑的狂暴学生挥舞警棍扑了上来！',
      buttonText: '【展开战斗 · 守护省博】',
      battleId: 'ch10_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 战后追踪 · 线索落入城南
  ch10_scene_tracking: {
    id: 'ch10_scene_tracking',
    title: '省博后门 · 黑色货车的去向',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_playground@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '随着最后一记直拳，领头的黑衣保镖重重倒地。但主展柜已被暴力砸碎，古瓷罐已被一辆贴着深黑车膜的金杯车抢运逃窜！',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '该死！让他们把古董抢走了！这帮人光天化日之下也太猖狂了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '别慌，我记下了车牌尾号。他们走的是向南的高架桥，那是往城南老工业区开的。',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '（脸色煞白，手指死死攥紧）……城南废弃汽修街？那地方……是我爸修车铺子所在的街区。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '疑云重重，伙伴们立即拦下出租车，直扑城南老汽修街！',
      buttonText: '【前往城南 · 开启第十二章】',
      targetScene: 'ch11_scene_slum_street'
    }
  }
};
