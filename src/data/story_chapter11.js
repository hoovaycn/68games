/**
 * 第十二章《烂人老爸》剧情脚本数据表（第二幕 第2章）
 *
 * 流程结构：
 * - ch11_scene_slum_street: 阴暗燥热的城南汽修街，伙伴们徒步摸排寻找金杯货车
 * - ch11_scene_garage_inside: 潜入海峰汽修铺，目睹 {ALLY_2_NAME} 老爸正和神秘家长分赃交易
 * - ch11_scene_confrontation: {ALLY_2_NAME} 当面质问，老爸粗暴扇飞奖状并绝情赶人
 * - ch11_battle1: 汽修厂院内冲突战（主角团 VS 汽修厂打手混混）
 * - ch11_scene_breakdown: 打退混混但被老爸强行轰出门外，{ALLY_2_NAME} 信念跌入谷底，暗中埋下疑点
 */

export const CHAPTER11_STORY = {
  // s1: 城南破旧街区 · 摸排寻车
  ch11_scene_slum_street: {
    id: 'ch11_scene_slum_street',
    title: '城南汽修街 · 烈日下的机油味',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_garage_exterior@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '下午三点，窄巷子里飘着一股铁锈和废机油的刺鼻味。破旧的红砖墙上贴满了小广告，头顶的电线乱糟糟地搭着，把灰蒙蒙的天空切成了几块。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '咳咳……这什么破地方，路坑坑洼洼的。{ALLY_2_NAME}，你平时放假就在这种地方帮你爸看店？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '……少废话。看前面那家“海峰汽修”，门口卷帘门半拉着，刚才博物馆那辆黑色金杯车就停在院子角落里！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '天哪，后备箱开着，那只带封泥的青花古瓷罐真的被搬进去了！{ALLY_2_NAME}……你爸他……该不会真的和那些人是一伙的吧？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '不可能！他虽然脾气臭、整天凶巴巴的，但他绝不会干伤天害理的事！我不信！跟我进去看清楚！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '{ALLY_2_NAME} 咬牙猫下身子，带着众人悄悄钻进半开的汽修厂铁门。',
      buttonText: '【潜入汽修车间 · 查明真相】',
      targetScene: 'ch11_scene_garage_inside'
    }
  },

  // s2: 车间深处 · 目睹分赃
  ch11_scene_garage_inside: {
    id: 'ch11_scene_garage_inside',
    title: '海峰汽修厂内 · 昏暗车间的分赃',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_garage_exterior@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '车间内光线昏暗，几台吊起的发动机投下狰狞的阴影。在一辆拆得只剩骨架的越野车旁，两个身影正相对而立。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'right',
        text: '其中一人是家长会上的神秘家长；另一人戴着墨镜、挂着金链子，花臂外罩着件旧西装，嘴里叼着烟。{ALLY_2_NAME}认出来了：那是自己的父亲海峰。',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '神秘家长',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'left',
        text: '老海峰，古罐已经送到你店里。今晚先从罐里提炼出“青髓”，再由你开车运去码头。这三十万是你的报酬，往后你的二手车生意也由我罩着。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'right',
        text: '（粗暴地颠了颠皮箱里的钞票，冷笑一口浓痰吐在地上）爽快。管他什么害人不害人的药，有老子的酒钱和赌资就行。今晚八点前，我亲自开货车送下运河！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '听到父亲口中说出的冰冷恶言，{ALLY_2_NAME} 浑身颤抖，理智瞬间被怒火点燃！',
      buttonText: '【冲出阴影 · 厉声质问】',
      targetScene: 'ch11_scene_confrontation'
    }
  },

  // s3: 决裂对峙 · 扇飞奖状
  ch11_scene_confrontation: {
    id: 'ch11_scene_confrontation',
    title: '车间正中 · 父女/父子决裂的耳光',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_garage_exterior@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'left',
        text: '爸！！你刚才说的都是真的？！你居然为了几个臭钱，帮着这帮害我们学校的坏蛋倒卖毒品？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'right',
        text: '（眼神微微一缩，随即眉毛倒竖，恶狠狠抓起手边的扳手）死孩子？！谁让你跟过来的？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'left',
        text: '我以为你只是穷，只是嘴硬……我这次期末大考考进了班级前列，我把奖状带在身上想给你看啊！你为什么偏偏要当人渣？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '老爸海峰',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'right',
        text: '（一巴掌打掉{ALLY_2_NAME}手里的奖状，又踩了一脚）读书有什么用！老子做什么轮不到你管！二秃子，把他们赶出去，别让他们再进后仓！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '二秃子',
        leftPortrait: 'assets/art/punk_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（拎着铁管从车底钻出来）老海让你们走，没听见？后仓里那批货，谁敢多看一眼，我就敲谁的腿。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '沈家护卫',
        leftPortrait: 'assets/art/shen_guard_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '门我堵上了。货还在里面，不能让这几个孩子回头拍照。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/punk_default@2x.png',
        activeSide: 'left',
        text: '{ALLY_2_NAME}，先把奖状捡起来！他们已经围过来了，咱们得打出去！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '汽修厂里的七八个凶恶混混抄起铁管和扳手，怪笑着朝少年团包抄过来！',
      buttonText: '【背水一战 · 迎战打手】',
      battleId: 'ch11_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 战后被逐 · 冰雨与心碎
  ch11_scene_breakdown: {
    id: 'ch11_scene_breakdown',
    title: '汽修厂大门外 · 紧闭的铁闸门',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_garage_exterior@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '打退混混后，海峰亲手把孩子们推到门外，连踩破的奖状也扔了出来。“咣当”一声，卷帘门落下，上了锁。{ALLY_2_NAME}捡起那张沾满油污的纸。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '（跌坐在泥水里，双手死死抠着地砖，眼泪大颗大颗砸在碎裂的奖状上）为什么……为什么是这样……我爸真的是个烂人……他是个无可救药的坏蛋……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '{ALLY_2_NAME}，先别哭。你爸刚才推你出门的时候，好像往你外套口袋里塞了张纸。',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '这是汽修厂后门的线路图，连断电开关都画出来了。背面还有字：【后仓有埋伏，别回来，找警察】……这是你爸写的？',
        highlight: true,
        bgm: 'bgm_eerie_revelation',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '残酷表象下的惊人纸条让众人呼吸一窒，老爸的真实目的究竟是什么？！',
      buttonText: '【夜探后仓 · 开启第十三章】',
      targetScene: 'ch12_scene_night_ambush'
    }
  }
};
