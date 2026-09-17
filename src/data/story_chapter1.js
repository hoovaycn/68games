/**
 * 第二章《操场上来的人》剧情脚本数据表
 *
 * 流程结构（按 GDD §6 定稿）：
 * - ch1_scene_playground: 第二天操场集合，双线合流，张希哲与覃瑞怡登场热身拌嘴
 * - ch1_scene_pe_test: 体育老师带外校生粗暴加测，徐老师挺身护犊，体育老师眼露青光开战
 * - ch1_battle1: 操场四人战役（徐老师 + 主角 + 张希哲 + 覃瑞怡 VS 魔化体育老师 + 外校生）
 * - ch1_scene_recover: 战后清醒，发现可疑饮料瓶，徐老师默默捡起瓶子收包（cg_pickup_bottle），二人入队
 * - ch1_scene_office_shadow: 教务处三楼黑影女子（shadow_woman）冷笑拉帘，第二章结案留白
 */

export const CHAPTER1_STORY = {
  // s1: 操场集合 · 轻松日常与新伙伴亮相
  ch1_scene_playground: {
    id: 'ch1_scene_playground',
    title: '第二天上午 · 阳光操场',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_playground.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '第二天上午，阳光洒满操场，昨夜书房里的惊悚与荧光仿佛只是一场幻梦。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'left',
        text: '覃瑞怡，你们拉拉队今天这口号喊得怎么跟蚊子哼似的？待会儿对抗赛我射门可不留情啊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'right',
        text: '切！张希哲你少得意，你那脚法要不是我带着全班喊加油，早踢到隔壁幼儿园去了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'left',
        text: '看着绿茵场上打闹的大家，我下意识摸了摸书包侧兜。昨晚从小默家带回来的那包零食，仿佛正透着一股冰凉的冷意。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '操场入口突然传来一阵整齐划一、极其沉重且反常的脚步声！',
      buttonText: '【前往跑道 · 查看反常情况】',
      targetScene: 'ch1_scene_pe_test'
    }
  },

  // s2: 体育老师带人来加测 · 异变爆发
  ch1_scene_pe_test: {
    id: 'ch1_scene_pe_test',
    title: '操场跑道 · 突如其来的超负荷加测',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_playground.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_pe_default.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '全体立正！都给我听好了！今天区里临时抽测体能，全体加练，所有人达标前不准吃午饭！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_pe_default.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'left',
        text: '张希哲！你，把这副五十公斤铁哑铃推举一百次！达不到不准参加校运会！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/teacher_pe_default.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'right',
        text: '老师……我们才六年级啊！这是成年举重队的器械，胳膊会拉伤的！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/teacher_pe_default.png',
        activeSide: 'left',
        text: '住手！他们才六年级。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/teacher_pe_corrupted.png',
        activeSide: 'right',
        text: '六年级怎么了？！外校的体校生早就在练了！不喝特训饮料、不达极限怎么冲第一？！——给我滚开！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_pe_corrupted.png',
        activeSide: 'left',
        text: '体育老师的双眼忽然爆发出青黑色的凶光，身后的外校体育生也举着铁哑铃僵硬地逼近过来！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '魔化体育老师吹响了刺耳的铁哨！全体同伴准备迎战！',
      buttonText: '【展开战斗 · 击破加测狂潮】',
      battleId: 'ch1_battle1',
      isBattleTrigger: true
    }
  },

  // s3: 战后打醒恢复 · 二人入队 · 徐老师捡瓶子
  ch1_scene_recover: {
    id: 'ch1_scene_recover',
    title: '操场草坪 · 恢复神智与可疑空瓶',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_playground.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '外校体育生',
        leftPortrait: 'assets/art/senior_athlete_default.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（铁哑铃哐当砸地，捂着肚子痛哭）……是我们教练给的……说喝了这种发荧光的运动饮料，体测就能跑全区第一……',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_pe_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '咳咳……我的头好炸……这空饮料瓶……上周教育处王主任桌上就摆着一模一样的……说是外面赞助的……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/cg_pickup_bottle.png',
        text: '……',
        sfx: 'sfx_item_get'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/cg_pickup_bottle.png',
        text: '徐老师一言不发，弯下腰，将滚落在草皮上的可疑饮料空瓶捡了起来，紧紧塞进了自己的黑色公文包里，并未上交学校。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'left',
        text: '刚才真的多亏了大家！这所学校肯定被什么脏东西盯上了，查探怪事，算我一个！我的足球随叫随到！',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'right',
        text: '我也加入！拉拉队的创可贴和活力应援管够！我们绝不让那些歪门邪道欺负咱们班同学！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitId: 'zhangxizhe',
      prompt: '校队前锋张希哲与拉拉操队长覃瑞怡加入队伍！',
      buttonText: '【整队回航 · 望向教务处】',
      targetScene: 'ch1_scene_office_shadow'
    }
  },

  // s4: 办公楼黑影女子 · 第二章悬疑完结
  ch1_scene_office_shadow: {
    id: 'ch1_scene_office_shadow',
    title: '行政楼三楼 · 教务处的逆光长发',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_office.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '跟着队伍走回教学楼时，我忍不住抬头望向行政楼三楼的教务处。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '深红色的天鹅绒窗帘突然微微晃动了一下……逆光中，伫立着一个留着长发的女人倒影。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '神秘女子',
        leftPortrait: 'assets/art/shadow_woman_default.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '呵……真是几个精力充沛的小家伙呢。不过，当恐惧与猜疑在他们心底生根发芽的时候……',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '神秘女子',
        leftPortrait: 'assets/art/shadow_woman_default.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '真正的宴席……才刚刚开场。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '第二章《操场上来的人》完结！猜疑与阴云正悄然笼罩整个六年级！',
      buttonText: '【开启第三章 · 全校大会】',
      targetScene: 'ch2_scene_auditorium'
    }
  }
};
