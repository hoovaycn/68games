/**
 * 第二十六章《最后的考场》剧情脚本数据表（第三幕 第6章）
 *
 * 流程结构：
 * - ch26_scene_pyramid_ascent: 突破天梯金字塔外围防线，全息考场与抹杀情感的梦魇
 * - ch26_scene_ayao_chamber: 开启中央维生舱，阿瑶枯瘦残躯插满管线，胸口贴着2006年三人合影
 * - ch26_scene_hologram_reveal: 阿瑶微弱自述：2006年服毒替死 → 2026年机器反噬 → 2046年困在机器，逐段切黑白回忆画面
 * - ch26_battle1: 天梯核心主脑歼灭战（两代六8班联动 VS 天梯总控智脑·满分优等生）
 * - ch26_scene_paradox_truth: 智脑瓦解，枯萎阿瑶交出【古罐残片】，大人回不去，由小号承担逆流使命
 */

export const CHAPTER26_STORY = {
  // s1: 踏入神殿 · 漂浮在云端的人间考场
  ch26_scene_pyramid_ascent: {
    id: 'ch26_scene_pyramid_ascent',
    title: '云端千米 · 天梯金字塔总考场',
    bgType: 'future_exam',
    bgImg: 'assets/backgrounds/bg_sky_exam_core@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '穿过重重防护闸门，眼前是一座悬浮在云端之上的空旷大厅。数不清的全息课桌漂浮在半空中，发着冷蓝光的试卷漫天飞舞。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'default',
        rightPortrait: 'zhangxizhe',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（看着头顶密密麻麻的评分数据）这算什么啊……阿瑶把整座城市的控制中心，变成了一场永远考不完的期末考试吗？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT}',
        leftEmotion: 'default',
        rightPortrait: 'qinruiyi',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '因为在阿瑶心里，‘分数’就是一切。她觉得只要抹掉所有人不合格的情感，世界就不会再有背叛，也不会再发生三号船的惨剧。',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人握紧武器，沿着幽蓝的走廊小心翼翼地往前走。[next]这一路静得可怕，竟连一个巡逻的机械人都没撞见。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '转过最后一道防护闸门，一座巨大的中央维生舱静静立在空旷的机房正中，四周缠绕着密密麻麻的电缆。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '破译机房核心密钥，中央巨型维生舱缓缓打开。',
      buttonText: '【开启中央维生舱 · 面见阿瑶】',
      targetScene: 'ch26_scene_ayao_chamber'
    }
  },

  // s2: 核心维生舱 · 枯萎的昔日学霸
  ch26_scene_ayao_chamber: {
    id: 'ch26_scene_ayao_chamber',
    title: '中央核心舱前 · 苍白的真相',
    bgType: 'stasis',
    bgImg: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
    bgm: 'bgm_broken',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: '{ALLY_1}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-aged_2046',
        rightEmotion: 'default',
        activeSide: 'right',
        bgImg: 'assets/art/cg_grad_photo_2006@2x.png',
        text: '维生舱喷出一阵冷气。舱里没有高高在上的主宰，只有一个插满管子、白发苍苍的瘦弱女人。[next]她的胸口，还死死贴着当年那张泛黄的三人合影。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-aged_2046',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（捂住嘴巴）这……这就是阿瑶老师？！在学校心理咨询室里那么温和的苏医生……怎么会把自己折磨成这样？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: '{ALLY_1}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-aged_2046',
        rightEmotion: 'cry',
        activeSide: 'right',
        text: '受到外界的声响，舱内的女人眼皮微微颤动，枯瘦的喉咙里挤出一丝微弱的气音。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '阿瑶睁开浑浊的眼睛，断断续续地讲起四十年前的往事。',
      buttonText: '【听阿瑶讲述 · 四十年前的牺牲】',
      targetScene: 'ch26_scene_hologram_reveal'
    }
  },

  // s3: 阿瑶自述 · 四十年的噩梦
  ch26_scene_hologram_reveal: {
    id: 'ch26_scene_hologram_reveal',
    title: '维生舱前 · 四十年的自述',
    bgType: 'stasis',
    bgImg: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
    bgm: 'bgm_broken',
    dialogues: [
      {
        id: 1,
        speaker: '阿瑶',
        leftPortrait: 'ayao',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_sluice_basement_2006@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '（气若游丝，像在梦呓）四十年前……就在这座城的地下水闸里……[next]我看见沈万廷用铁链，捆着我最好的朋友徐博和淑惠……',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'ayao',
        leftEmotion: 'default',
        rightPortrait: 'mystery_man',
        rightEmotion: 'default',
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/art/cg_ayao_broken_pen@2x.png',
        text: '他要给徐博和淑惠灌毒药……我冲上去，抢过那瓶毒药，自己仰头一口喝了……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'ayao',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_sluice_basement_2006@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '又转身冲着他们吼“滚”，装成投靠沈家的叛徒……[next]只有这样，他们才肯信我是真的背叛，才肯活着离开……',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'ayao',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_sluice_basement_2006@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '可从那以后，我就被沈万廷带上了三号船。[next]毒素烂掉了我半条命，全城的人却都骂我——[next]说我是为了一个满分，连朋友都出卖的畜生……',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 5,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_counseling_machine_flashback@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '二十年前，我化名苏晚，回了崇文楼。[next]我以为，只要用那台脑波仪，把全城人的喜怒哀乐都抹掉……[next]这世上就再也不会有人背叛，再也不会有人像我一样被逼上绝路……',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_counseling_machine_flashback@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '可我把机器开到最大功率的那一刻……它反过来咬住了我……[next]我亲手搭的机器，把我也变成了它的提线木偶……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '阿瑶',
        leftPortrait: 'ayao-aged_2046',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_counseling_machine_flashback@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '这二十年来，我把自己接进这具维生舱，维持着天梯考场……[next]可我也被困死在这里，成了这具插满管子的……怪物……',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '阿瑶',
        leftPortrait: 'ayao-aged_2046',
        leftEmotion: 'cry',
        rightPortrait: null,
        activeSide: 'left',
        flashback: true,
        bgImg: 'assets/backgrounds/bg_counseling_machine_flashback@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '（浑浊的眼里流下泪）孩子们……是我对不起徐博、对不起淑惠……[next]更对不起……当年那个，只想好好读书的自己……',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 9,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-aged_2046',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
        text: '（泪水夺眶而出，声音发颤）怎么会是这样……[next]徐老师内疚了整整二十年，全校都以为阿瑶老师是背叛者……[next]原来她是替老师吞下了毒药，把自己献祭给了深渊！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '覃瑞怡',
        leftPortrait: 'qinruiyi',
        leftEmotion: 'cry',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（捂着嘴泣不成声）为了保护徐老师和刘老师……[next]她一个人背负了全世界的误解和诅咒，被困在这个地狱里煎熬了整整四十年……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT}',
        leftEmotion: 'default',
        rightPortrait: '{MC_ADULT}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '这也是为什么天梯主脑永远在强迫所有人追求“满分”——[next]因为在阿瑶被毒素折磨得支离破碎的心里，只要拿到满分，当年的一切悲剧就不会发生……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音未落，四周悬浮的全息屏幕突然齐刷刷爆出刺眼的红光！[next]整座机房的幽蓝冷光瞬间被染成猩红，头顶的穹顶传来一阵令人头皮发麻的机械嗡鸣。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 13,
        speaker: '满分优等生智脑',
        leftPortrait: 'boss_ai_topstudent',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（数万道幽蓝数据流疯狂暴走！全息巨像自穹顶威严俯瞰，发出雷霆般的机械咆哮）警报！核心净化程序被干扰！启动全域物理歼灭协议！抹除所有外来干扰源！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 14,
        speaker: '天梯巡考机械人',
        leftPortrait: 'patrol_robot_exam',
        leftEmotion: 'default',
        rightPortrait: '{MC_ADULT}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（流线型白色机甲在半空瞬移突刺，双臂高频振动光刃划破空气，胸口倒计时钟表发出急促滴答声）考场纪律违规！答卷时间结束！强制收卷，抹除违规考生！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 15,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT}',
        leftEmotion: 'default',
        rightPortrait: 'boss_ai_topstudent',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（战术斗篷迎风烈烈，合金短棍横胸一震）两代六8班都在这里！你们这台冷血的考试机器，今天休想再束缚阿瑶！把她从这四十年的噩梦里夺回来！全员拔刀！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '金色全息智脑降临，两代六8班并肩迎战暴走的天梯主脑！',
      buttonText: '【进入战斗 · 天梯核心主脑歼灭战】',
      battleId: 'ch26_battle1',
      isBattleTrigger: true,
      targetScene: 'ch26_scene_paradox_truth'
    }
  },

  // s4: 智脑瓦解 · 通往过去的逆行门
  ch26_scene_paradox_truth: {
    id: 'ch26_scene_paradox_truth',
    title: '坍塌的核心机房 · 逆转的指针',
    bgType: 'stasis',
    bgImg: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰——！智脑轰然碎裂，化作漫天飞舞的光屑，整座核心机房骤然陷入一片死寂。[next]中央那具维生舱的玻璃罩缓缓降下，喷涌出大量冰冷的白雾，无数生物导管一根根脱落，坠在地上发出细碎的声响。',
        sfx: 'sfx_explosion'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '白雾之中，一个插满管子、白发苍苍的枯瘦身影从半空中跌落——{MC_ADULT_NAME}抢先一步冲上前，将她稳稳接在怀中。',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '未来阿瑶',
        leftPortrait: 'ayao-aged_2046',
        leftEmotion: 'default',
        rightPortrait: '{MC_ADULT}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（满头白发、枯瘦苍老的面庞露出一抹如释重负的微笑，浑浊的眼中流下清泪）你们……终于打破这个冰冷的笼子了……我终于……不用再去算那些没有温度的分数了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '未来阿瑶',
        leftPortrait: 'ayao-aged_2046',
        leftEmotion: 'cry',
        rightPortrait: '{MC_ADULT}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（用颤抖枯瘦的手，从怀中摸出一枚贴着那张泛黄三人合影的古罐残片）这是最初的那片古罐残片。[next]到底层能量炉插进去，通道就会逆转……但只有十二岁的你们能回去，长大后的你们，已经被这个时代困住了……',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-aged_2046',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '我们早就不在乎能不能回去了。只要能救下当年的老爸和老师们，我们付出一切都值得！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT}',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '别耽搁了！金字塔结构正在坍塌，走！下到底层反应堆！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人冲向金字塔最底层能量炉。',
      buttonText: '【开启第二十七章 · 熔炉抉择】',
      targetScene: 'ch27_scene_reactor_run'
    }
  }
};
