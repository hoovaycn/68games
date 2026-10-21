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
    bgImg: 'assets/backgrounds/bg_playground@2x.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '第二天上午大课间，六年级同学在操场上集合练操。阳光把跑道晒得发白，昨夜那场怪事仿佛只是一场梦。跑道边，体育委员张希哲正颠着足球——他性子直，就是太爱逞强。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '一旁，拉拉操队长覃瑞怡带着队员压腿热身，她成绩好得没边儿，是全班公认的「别人家孩子」，嘴上也从不饶人。这俩天生八字不合，一见面就掐。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '覃瑞怡，你们拉拉队今天喊得跟蚊子哼似的！待会儿看我暴射入网！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '切！张希哲你少得意，没有我们加油，你早踢隔壁幼儿园去了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '我摸了摸书包兜，昨晚带回来的零食仿佛正透着丝丝寒意。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '只是阳光亮得有些刺眼，跑道尽头却像蒙着一层化不开的灰。空气里，隐约飘来一股发甜的怪味——和昨晚那包零食一模一样。',
        sfx: 'sfx_shock_sting'
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
    bgImg: 'assets/backgrounds/bg_playground@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_pe_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '全体立正！今天临时抽测，所有人达标前不准吃午饭！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_pe_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '张希哲！把这副五十公斤铁哑铃推举一百次！不然取消校运会资格！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '外校体育生',
        leftPortrait: 'assets/art/senior_athlete_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '就这胳膊还想当校队？我们体校的六年级，抱着五十公斤哑铃能绕操场跑三圈！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/teacher_pe_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'right',
        text: '老师……这是成年人的器械，胳膊会拉伤的！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/teacher_pe_default@2x.png',
        activeSide: 'left',
        text: '住手！他们才六年级。',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/teacher_pe_corrupted@2x.png',
        activeSide: 'right',
        bgImg: 'assets/backgrounds/bg_playground_eerie@2x.png',
        text: '六年级怎么了？！不喝特训饮料怎么冲第一？！——给我滚开！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_pe_corrupted@2x.png',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_playground_eerie@2x.png',
        text: '体育老师双眼泛起青黑凶光，外校生也僵硬地举着哑铃逼近！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitIds: ['zhangxizhe', 'qinruiyi'],
      prompt: '张希哲与覃瑞怡挺身加入队伍，结阵迎击加测狂潮！',
      buttonText: '【结成小队 · 击破加测狂潮】',
      battleId: 'ch1_battle1',
      isBattleTrigger: true
    }
  },

  // s3: 战后打醒恢复 · 二人入队 · 徐老师捡瓶子
  ch1_scene_recover: {
    id: 'ch1_scene_recover',
    title: '操场草坪 · 恢复神智与可疑空瓶',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_playground@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '外校体育生',
        leftPortrait: 'assets/art/senior_athlete_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（捂肚子痛哭）是我们教练给的！说喝了这种发光饮料就能跑第一……',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '体育老师',
        leftPortrait: 'assets/art/teacher_pe_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '咳咳……头好痛。这饮料瓶……上周王主任桌上也摆着一模一样的……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/cg_pickup_bottle@2x.png',
        text: '……',
        sfx: 'sfx_item_get'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/cg_pickup_bottle@2x.png',
        text: '徐老师弯下腰，悄悄把空饮料瓶塞进了自己的公文包，并未上交。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '刚才多亏大家！学校肯定被脏东西盯上了，查怪事算我一个！',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '我也加入！拉拉队创可贴管够！绝不能让歪门邪道欺负咱们班！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '战后大家重新聚拢，一起朝教学楼走去。',
      buttonText: '【整队回航 · 望向教务处】',
      targetScene: 'ch1_scene_office_shadow'
    }
  },

  // s4: 办公楼黑影女子 · 第二章悬疑完结
  ch1_scene_office_shadow: {
    id: 'ch1_scene_office_shadow',
    title: '行政楼三楼 · 教务处的逆光长发',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_office@2x.png',
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
        leftPortrait: 'assets/art/shadow_woman_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '呵……真是几个精力充沛的小家伙呢。不过，当恐惧与猜疑在他们心底生根发芽的时候……',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '神秘女子',
        leftPortrait: 'assets/art/shadow_woman_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '真正的宴席……才刚刚开场。',
        highlight: true,
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
