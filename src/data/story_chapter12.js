/**
 * 第十三章《暗夜合围》剧情脚本数据表（第二幕 第3章）
 *
 * 流程结构：
 * - ch12_scene_night_ambush: 雨夜重返汽修厂后仓，少年团试图寻找走私藏毒铁证
 * - ch12_scene_trap: 触发后仓陷阱，神秘组织高级死士与强化保镖封死退路
 * - ch12_scene_hero_entry: 生死攸关之际，重型皮卡撞碎铁墙，老爸海峰提扳手暴怒杀入救场
 * - ch12_battle1: 仓库后仓突围保卫战（主角团 + 强力援军老爸海峰 VS 异化黑衣死士）
 * - ch12_scene_badge_reveal: 战后包扎，血衣内衬赫然亮出警官证与金徽，卧底真相大白
 */

export const CHAPTER12_STORY = {
  // s1: 雨夜潜入后仓 · 昏暗的集装箱
  ch12_scene_night_ambush: {
    id: 'ch12_scene_night_ambush',
    title: '海峰汽修厂后仓 · 雷雨交加的夜探',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_garage_backyard_rain@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '夜里八点，雨下得特别大。狂风把仓库顶棚的铁皮吹得哐当作响。少年们顺着白天的电路图，悄悄摸进了堆满报废集装箱的后院。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我按纸条上的号码报了警，可还没人赶到。我爸今晚就要运货，万一他被发现给我们递纸条，会有危险。我们只在外面看一眼，不往里闯。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '小声点。看那个红色的冷藏集装箱，插座指示灯亮着，排气扇在排出一股古怪的冷甜雾气。',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '排气扇旁边有个小窗口！白天那只青花瓷罐就在里面，几个人正把罐里的黑膏刮进机器里。这就是他们说的提炼？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人正欲靠近，四周的探照灯突然刺目爆亮，警报声撕裂雨夜！',
      buttonText: '【警惕四周 · 陷入陷阱】',
      targetScene: 'ch12_scene_trap'
    }
  },

  // s2: 中伏被围 · 绝望死局
  ch12_scene_trap: {
    id: 'ch12_scene_trap',
    title: '探照灯下 · 冰冷的绝杀网',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_garage_backyard_rain@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '十数道白亮刺目的光束死死钉在孩子们身上。集装箱顶上，数名身披夜行雨衣、眼瞳泛着森绿毒光的蒙面黑衣人悄无声息地拔出了短棍与甩刀。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '黑衣死士头领',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '老板说得没错，海峰放你们走，肯定还会给你们留线索。我们守在后仓，就是等你们回来。抓了你们当人质，他今晚还敢不听话？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '他们眼里的光……比学校里异化的体育老师还要深！大家小心，退路全被封死了！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '可恶……要死在这了吗……我还没跟我爸道过歉……！',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '黑衣死士刀锋逼近眉心，千钧一发之际，仓库后方突然爆发出震耳欲聋的引擎轰鸣！',
      buttonText: '【抬头看去 · 雷霆一击】',
      targetScene: 'ch12_scene_hero_entry'
    }
  },

  // s3: 老爸杀入 · 极强救场
  ch12_scene_hero_entry: {
    id: 'ch12_scene_hero_entry',
    title: '仓库废墟 · 咆哮而来的神兵天降',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_garage_backyard_rain@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '墙外猛地传来引擎声。一辆加固过车头的清障皮卡撞开后仓的旧砖墙，车灯照得黑衣人睁不开眼；两名堵路的守卫被撞翻，其余人急忙后退。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '敢动我家孩子？！老子今天活剥了你们这群吃人骨髓的杂种！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: 'assets/art/father_haifeng_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '海峰跳下车，拿着修车用的长管钳挡开刀，反手把领头的黑衣人按倒在地。{ALLY_2_NAME}愣住了：老爸打架的动作不像街头混混，倒像专门练过。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_default@2x.png',
        activeSide: 'left',
        text: '爸……？！你……好厉害？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '傻看什么！躲到老子背后！看老子怎么把这帮孙子收拾干净！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitId: 'father_haifeng',
      prompt: '老爸海峰在前开路如入无人之境，少年团立刻聚到他身边迎击合围之敌！',
      buttonText: '【并肩作战 · 突围歼敌】',
      battleId: 'ch12_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 战后揭秘 · 染血警徽
  ch12_scene_badge_reveal: {
    id: 'ch12_scene_badge_reveal',
    title: '静止的仓库 · 染血的誓言',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_garage_backyard_rain@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '满地翻滚哀嚎的黑衣死士被一一捆缚。老爸海峰捂着流血的右肋靠在皮卡轮胎上，大口喘着粗气，豆大的汗珠混着血水滚落。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        activeSide: 'left',
        text: '爸！你流血了！你别动，我书包里有覃瑞怡带的纱布！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '{ALLY_2_NAME}掀开海峰的外衣包扎伤口，一本警官证从防刺背心里滑了出来。证件上印着他的照片和名字：【省公安厅禁毒总队 · 海峰】。原来他一直是卧底警察！',
        highlight: true,
        bgm: 'bgm_eerie_revelation',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（抬起染着油污的手，有些颤抖地揉了揉自家孩子的头发，眼眶微红）对不起……老爸装了十五年的混混流氓，让你在学校抬不起头。但老爸……从来不是个烂人。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        activeSide: 'left',
        text: '（死死抱住父亲，嚎啕大哭）爸……！你是我见过的……最伟大的警察！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '海峰收起账册和通讯器，通知省厅增援，又给徐老师和刘老师发去集合消息，随后带大家去安全屋。',
      buttonText: '【前往安全屋 · 开启第十四章】',
      targetScene: 'ch13_scene_safahouse'
    }
  }
};
