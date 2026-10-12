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
        text: '夜里八点，暴雨如注。狂风将仓库顶棚的铁皮吹得哐当作响。少年们顺着白天的电路图，悄然摸入堆满报废集装箱的后院。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我爸留了字条让我们找警察……但我必须亲眼看清楚他到底在干什么！如果他真被逼着销赃，我绝不能留他一个人！',
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
        text: '就是白天那个青花古瓷罐！他们竟然在集装箱里用离心机提纯古毒？！',
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
        leftPortrait: null,
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
        text: '老板料得一点没错，海峰那个粗胚果然心软放水了。不过没关系，抓了这几个碍事的小崽子当祭品，他今晚就更跑不出手掌心了。',
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
    bgm: 'bgm_fanfare',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '“轰隆————！！”一辆爆改的重型清障皮卡如同出膛炮弹般直接撞穿了混凝土砖墙！砖石碎瓦漫天崩飞，当场将两名死士碾飞在地！',
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
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '老爸海峰跃下皮卡车斗，手里一柄一米长的锻造钢制管钳在空中抡出破风呼啸！一套利落至极的警用格斗反关节擒拿，瞬间打断当头死士的腕骨！',
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
        text: '傻看什么！结阵站在老子背后！看老子怎么把这帮孙子收拾干净！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '老爸海峰在前开路如入无人之境，少年团立刻结阵迎击合围之敌！',
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
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
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
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{ALLY_2_NAME} 慌乱地撕开老爸浸透机油的背心止血。然而背心扯开的瞬间，贴身防刺马甲内衬里的一件东西赫然滑落——一枚被擦得锃光发亮的国徽警徽，以及一本写着【省公安厅禁毒总队特勤处 · 二级警督 海峰】的深红警官证！',
        highlight: true,
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
      prompt: '老爸海峰擦去孩子的眼泪，面色凝重地收拢现场缴获的账册与通讯器。',
      buttonText: '【前往安全屋 · 开启第十四章】',
      targetScene: 'ch13_scene_safahouse'
    }
  }
};
