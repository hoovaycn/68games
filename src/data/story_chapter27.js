/**
 * 第二十七章《熔炉抉择》剧情脚本数据表（第三幕 第7章）
 *
 * 流程结构：
 * - ch27_scene_reactor_run: 金字塔底层能量炉，时空门开启连接2026年9月28日黄昏五点五十分
 * - ch27_scene_annihilation_horde: 时空门排斥成年人，大号将十二岁小号推入光环，独自阻击歼灭机甲暴风
 * - ch27_battle1: 光门前最后的血肉长城（大号死守4回合 VS 重装歼灭者暴风）
 * - ch27_scene_great_sacrifice: 光门稳定100%，历史修正使成年主角与副官化作漫天金色光蝶消散，少先队礼嘱托托付未来
 */

export const CHAPTER27_STORY = {
  // s1: 反应堆核心 · 逆转的金色光门
  ch27_scene_reactor_run: {
    id: 'ch27_scene_reactor_run',
    title: '底层深井 · 撕裂时空门',
    bgType: 'reactor',
    bgImg: 'assets/backgrounds/bg_reactor_core@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '反应堆中心的光门猛然展开，光芒里隐隐能看见二十年前老城区的火烧云，甚至能听到江上三号船沉闷的汽笛声！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '时间锁定了！二零二六年九月二十八日五点五十分！距离三号船爆炸……只剩十分钟！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '门开了！未来的我，还有{ALLY_2_ADULT_NAME}，大家一起跳进去！我们一起回过去救人！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{MC_ADULT_NAME}刚要跨进光门，却被一圈无形的光晕挡了回来，踉跄着退了几步。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '没用的……这道门排斥我们这些已经长大的未来人，只有十二岁的你们能进去。我们进不去。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（拉住长大后的自己大喊）我不信！你们在这儿受了二十年的苦，凭什么现在不让你们走？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（红着眼眶，拳头攥得咯咯响）你们把命都豁出去了，我们更不能怂！回去以后，一定把老师他们都救下来，一个都不少！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '防爆门被暴力破开，巨大的重装机甲手持武器冲了进来！',
      buttonText: '【面对追兵 · 誓死阻击】',
      targetScene: 'ch27_scene_annihilation_horde'
    }
  },

  // s2: 钢铁浪潮 · 无路可退
  ch27_scene_annihilation_horde: {
    id: 'ch27_scene_annihilation_horde',
    title: '反应堆大厅前沿 · 绝命防线',
    bgType: 'reactor',
    bgImg: 'assets/backgrounds/bg_reactor_core@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '歼灭机甲·暴风',
        leftPortrait: 'assets/art/boss_judgement_core@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '锁定目标，抵抗军指挥官及逆流样本。执行指令：就地物理抹杀！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（用力将少年时的自己一把推进光圈里）全都进光圈趴好！快！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '光圈通道稳定需要一分钟！在通道闭合前，谁也不准出来！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '重装歼灭者·暴风',
        leftPortrait: 'assets/art/boss_storm_mech@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（四足重型攻城战车踏碎环形光井金属甲板，双联穿甲自动炮炮口泛起炽烈红光，沉闷引擎如雷霆震颤）警报：侦测到底层时空门能量异常过载！歼灭模式全开，炮火覆盖，清除一切阻碍！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '合金自律死士',
        leftPortrait: 'assets/art/alloy_deathsworn@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（半裸露的橙红铝热剂自爆引信飞速闪烁红光，履带底盘高速轰鸣狂飙，眼中自毁倒计时只剩最后几秒）嘀……嘀……嘀……拥抱永恒光热！自爆冲锋！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（拍打着光幕大喊）大叔放我们出去！哪有让你们在前面挡枪，我们在后面躲着的道理？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/boss_storm_mech@2x.png',
        activeSide: 'left',
        text: '傻希哲，回去以后别去江边乱跑了。放学了就老老实实买个鸡蛋灌饼回家！{ALLY_2_ADULT_NAME}，准备干活，挡住他们！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '成年特警与战友死守在光门前，挡住扑来的敌军！',
      buttonText: '【进入战斗 · 光门前最后的血肉长城】',
      battleId: 'ch27_battle1',
      isBattleTrigger: true,
      targetScene: 'ch27_scene_great_sacrifice'
    }
  },

  // s3: 泯灭的光粒 · 换你们一个明天
  ch27_scene_great_sacrifice: {
    id: 'ch27_scene_great_sacrifice',
    title: '时空光门闭合前夕 · 最痛的告别',
    bgType: 'reactor',
    bgImg: 'assets/backgrounds/bg_timegate_dissolve@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_reactor_core@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '机甲轰然炸成一团烈火！通道读条完成，光芒大盛！硝烟中，两个浑身是伤的身影转过头来。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（拼命去抓他们的手）门彻底稳定了！伸手啊！我拉你们进来！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: '{MC_ADULT_DISSOLVE_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_DISSOLVE_PORTRAIT}',
        activeSide: 'left',
        text: '光门内骤然爆发出一阵嗡鸣，仿佛整条时间线都被搅动——[next]{MC_ADULT_NAME}和{ALLY_2_ADULT_NAME}的身影开始泛起金光，慢慢变得半透明。',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_DISSOLVE_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（看着自己渐渐透明的手，笑了笑）傻瓜……从你们跨进这扇门、回到过去的那一刻起，历史就已经开始改写了……[next]我们这些旧未来的人，自然要跟着一起消失。放心去吧，把老爸和老师们，都救下来。',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_SAD_PORTRAIT}',
        rightPortrait: '{MC_ADULT_DISSOLVE_PORTRAIT}',
        activeSide: 'left',
        text: '（眼泪一下涌了出来）不……！凭什么就我们走？！我们是一起从未来杀到这里的，要走一起走！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_DISSOLVE_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（隔着光芒，郑重地看着少年时的自己）回去找到我爸，告诉他，六8班的孩子一个都没少！好好替我们活下去！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_CRYING_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_DISSOLVE_PORTRAIT}',
        activeSide: 'left',
        text: '（哭得上气不接下气）我记住了……我一定亲口告诉他，六8班的孩子一个都没少！你们……一定要等着我们啊！',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 8,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_nervous@2x.png',
        rightPortrait: '{MC_ADULT_DISSOLVE_PORTRAIT}',
        activeSide: 'left',
        text: '（抹着眼泪，声音发颤）大叔！我们还没把老师他们都救回来呢……你们不能就这么散了啊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_crying@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（泣不成声）为了我们，为了徐老师和刘老师……你们把整个未来都赌上了……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 10,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_DISSOLVE_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（身形快消散时，敬了一个端端正正的少先队礼，竖起大拇指）六8班，{MC_NAME}！未来就交给你们了！快走！！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 11,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_ADULT_DISSOLVE_PORTRAIT}',
        activeSide: 'left',
        text: '（抹了把脸，嘶声大喊）六8班，出发！我们一定把徐老师、刘老师、海峰叔叔全都救回来，一个都不少！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '金色光芒呼啸旋转，将哭喊的少年们吸入通道，猛地送回二零二六年那个黄昏的长江码头！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '时空倒转，冰冷的江风与刺鼻的柴油味扑面而来！',
      buttonText: '【开启第二十八章 · 倒流的挽歌】',
      targetScene: 'ch28_scene_return_2026'
    }
  }
};
