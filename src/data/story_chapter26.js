/**
 * 第二十六章《最后的考场》剧情脚本数据表（第三幕 第6章）
 *
 * 流程结构：
 * - ch26_scene_pyramid_ascent: 突破天梯金字塔外围防线，全息考场与抹杀情感的梦魇
 * - ch26_scene_ayao_chamber: 开启中央维生舱，阿瑶枯瘦残躯插满管线，胸口贴着2006年六8班毕业照
 * - ch26_scene_hologram_reveal: 激活加密四十年的记忆投影：2006年水闸地下室阿瑶服毒替死掩护徐博与刘淑惠
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
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（看着头顶密密麻麻的评分数据）这算什么啊……阿瑶把整座城市的控制中心，变成了一场永远考不完的期末考试吗？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '因为在阿瑶心里，‘分数’就是一切。她觉得只要抹掉所有人不合格的情感，世界就不会再有背叛，也不会再发生三号船的惨剧。',
        highlight: true,
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
    bgm: 'bgm_sad_melody',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_aged_2046_default@2x.png',
        activeSide: 'right',
        text: '维生舱喷出一阵冷气。舱里没有高高在上的主宰，只有一个插满管子、白发苍苍的瘦弱女人。[next]她的胸口，还死死贴着当年六8班泛黄的毕业合影。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_aged_2046_default@2x.png',
        activeSide: 'left',
        text: '（捂住嘴巴）这……这就是阿瑶阿姨？！在学校心理咨询室里那么温和的苏医生……怎么会把自己折磨成这样？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_aged_2046_weeping@2x.png',
        activeSide: 'right',
        text: '受到外部刺激，舱内的女人微微颤抖。半空中突然弹出了二十年前水闸地下室的加密记忆投影！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '全息光幕闪烁，回到二十年前水闸地下室的那场血腥变故。',
      buttonText: '【观看记忆投影 · 二十年前的牺牲】',
      targetScene: 'ch26_scene_hologram_reveal'
    }
  },

  // s3: 投影回放 · 比死还痛的真相
  ch26_scene_hologram_reveal: {
    id: 'ch26_scene_hologram_reveal',
    title: '记忆回廊 · 二零零六年雨夜的真正录像',
    bgType: 'stasis',
    bgImg: 'assets/backgrounds/bg_ayao_stasis_chamber@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '沈万廷（投影）',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（老水闸铁门前，沈万廷阴鸷地冷笑，脚下踩着被铁链死死捆住的徐博与刘淑惠）敢摸到地下水闸坏沈家的走私大计？！把这两个多管闲事的教书匠按死，把刚出炉的毒雾全灌进喉咙，沉江喂鱼！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师（投影）',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'right',
        text: '（嘴角满是鲜血，拼死用身躯死死挡住身后的刘淑惠）沈万廷！走私账册的证据我已经托人送出去了……冲我来！放淑惠走！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '青年刘老师（投影）',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'right',
        text: '（额头流着血，含泪撕扯着铁链挣扎）徐博！要死一起死！沈万廷，你残害无辜、祸害学生，早晚遭报应！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/ayao_default@2x.png',
        activeSide: 'right',
        text: '沈家打手冷笑着拔出剧毒药剂瓶，就要强行灌入两位老师嘴里！千钧一发之际，排污通风管道轰然震响，一个瘦弱娇小的身影发了疯般扑了出来！',
        sfx: 'sfx_explosion'
      },
      {
        id: 5,
        speaker: '少年阿瑶（投影）',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（看着沈万廷把毒药瓶凑到老师嘴边，瘦弱的少女浑身发抖，眼里却燃起孤注一掷的决绝）不能……不能让他们替我去死……！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '少年阿瑶（投影）',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（瘦弱的初中少女一把抢过毒药瓶，在两位老师惊骇欲绝的目光中仰头一饮而尽！毒素瞬间灼穿五脏六腑，口吐黑血却强撑着不肯倒下）咕噜……咳咳咳！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '少年阿瑶（投影）',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（颤抖着抹去嘴角的污血，转过身用尽全身力气装出极度凶狠冰冷的眼神，对着两位老师嘶吼）滚！你们两个窝囊废穷老师，天天拿及格、前途说教，能顶什么用？！沈老板才能给我全城唯一的满分未来！从今往后我不是你们的学生！滚啊！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '沈万廷（投影）',
        leftPortrait: 'assets/art/shen_wanting_old@2x.png',
        rightPortrait: 'assets/art/ayao_default@2x.png',
        activeSide: 'left',
        text: '（哈哈狂笑）好狠绝的丫头！喝了毒药居然还能站着！真是天生扛得住毒的好苗子！把这两个昏死过去的废物教师扔到江边排污口，把这丫头带回三号船！',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '少年阿瑶（投影）',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（水闸铁门沉重闭合，少女终于脱力瘫倒在冰冷血泊中，死死抓着老师遗落的半截粉笔，满脸泪水哭泣）徐博……淑惠……你们一定要平安活着当老师……全天下都骂我是坏人没关系……你们一定要好好活着啊……',
        highlight: true,
        sfx: 'sfx_sad_melody'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（泪水夺眶而出，声音发颤）怎么会是这样……徐老师内疚了整整二十年，全校都以为阿瑶阿姨是背叛者……原来她是替老师吞下了毒药，为了保全恩师把自己献祭给了深渊！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_crying@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（捂着嘴泣不成声）为了保护徐老师和刘老师……她竟然一个人背负了全世界的误解和诅咒，被困在这个地狱里煎熬了整整四十年……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '这也是为什么天梯主脑永远在强迫所有人追求‘满分’——因为在阿瑶被毒素折磨得支离破碎的心里，只要拿到满分，当年的一切悲剧就不会发生……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '满分优等生智脑',
        leftPortrait: 'assets/art/boss_ai_topstudent@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（数万道幽蓝数据流疯狂暴走！全息巨像自穹顶威严俯瞰，发出雷霆般的机械咆哮）警报！核心净化程序被干扰！启动全域物理歼灭协议！抹除所有外来干扰源！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 14,
        speaker: '天梯巡考机械人',
        leftPortrait: 'assets/art/patrol_robot_exam@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（流线型白色机甲在半空瞬移突刺，双臂高频振动光刃划破空气，胸口倒计时钟表发出急促滴答声）考场纪律违规！答卷时间结束！强制收卷，抹除违规考生！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 15,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/boss_ai_topstudent@2x.png',
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
        leftPortrait: 'assets/art/ayao_aged_2046_default@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（满头白发、枯瘦苍老的面庞露出一抹如释重负的微笑，浑浊的眼中流下清泪）你们……终于打破这个冰冷的笼子了……我终于……不用再去算那些没有温度的分数了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '未来阿瑶',
        leftPortrait: 'assets/art/ayao_aged_2046_weeping@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（用颤抖枯瘦的手，从怀中摸出一枚贴着六8班泛黄毕业照的古罐残片）这是最初的那片古罐残片。[next]到底层能量炉插进去，通道就会逆转……但只有十二岁的你们能回去，长大后的我们，已经被这个时代困住了……',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_aged_2046_default@2x.png',
        activeSide: 'left',
        text: '我们早就不在乎能不能回去了。只要能救下当年的老爸和老师们，我们付出一切都值得！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '别耽搁了！金字塔结构正在坍塌，走！下到底层反应堆，送他们六个回去改变未来！',
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
