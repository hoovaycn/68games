/**
 * 第二十六章《最后的考场》剧情脚本数据表（第三幕 第6章）
 *
 * 流程结构：
 * - ch26_scene_pyramid_ascent: 突破天梯金字塔外围防线，全息考场与抹杀情感的梦魇
 * - ch26_scene_ayao_chamber: 开启中央维生舱，阿瑶枯瘦残躯插满管线，胸口贴着2006年六8班毕业照
 * - ch26_scene_hologram_reveal: 激活加密四十年的记忆投影：2006年水闸地下室阿瑶服毒替死掩护徐博与刘淑惠
 * - ch26_battle1: 天梯核心主脑歼灭战（两代六8班联动 VS 天梯总控智脑·满分优等生）
 * - ch26_scene_paradox_truth: 智脑瓦解，枯萎阿瑶交出【古罐原石密钥】，大人回不去，由小号承担逆流使命
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
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '维生舱喷出一阵冷气。舱里没有高高在上的主宰，只有一个插满管子、白发苍苍的瘦弱女人。她的胸口，还死死贴着当年六8班泛黄的毕业合影。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（捂住嘴巴）这……这就是阿瑶阿姨？！在学校心理咨询室里那么温和的苏医生……怎么会把自己折磨成这样？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
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

  // s3: 投影回放 · 比死还痛的因果锁链
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
        leftPortrait: 'assets/art/boss_ai_topstudent@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '敢摸到水闸坏我的事？！把这两个多管闲事的老师灌了药，扔进江里喂鱼！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '未来虚影（投影）',
        leftPortrait: 'assets/art/ayao_corrupted_god_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '阿瑶，快冲出去把药抢过来喝了！徐博和刘淑惠会被他们灭口的！你必须装作背叛他们，沈万廷才会放过他们！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '少年阿瑶（投影）',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted_god_default@2x.png',
        activeSide: 'left',
        text: '（疯了一样抢过药剂往嘴里灌，哭喊着）徐博……淑惠……只要你们能平安活着当老师，我当坏人没关系！你们一定要活下去啊！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（眼眶通红）怎么会是这样……老师们恨了她这么多年，全校都以为她变坏了……原来她是替老师们挡下了这一劫！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '她把自己逼成了恶人，困在自己设下的噩梦里整整几十年……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '天梯智脑',
        leftPortrait: 'assets/art/boss_judgement_core@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '『警告！核心封存记忆被非法激活！启动全域物理歼灭程序！』',
        sfx: 'sfx_shock_sting'
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
        text: '智脑轰然碎裂，化作无数光点！维生舱管线断开，阿瑶从半空坠落，被{MC_ADULT_NAME}稳稳接住。',
        sfx: 'sfx_explosion'
      },
      {
        id: 2,
        speaker: '未来阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（苦涩地笑了笑）你们……终于打破这个笼子了……我终于不用再去算那些冰冷的分数了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '未来阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_ADULT_PORTRAIT}',
        activeSide: 'left',
        text: '（递出一枚散发光晕的原石芯片）这是最初的地脉核心【古罐原石密钥】。到底层反应堆插进去，通道就会逆转……但只有十二岁的你们能回去，长大后的我们，已经回不去了……',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_ADULT_NAME}',
        leftPortrait: '{ALLY_2_ADULT_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '我们早就不在乎能不能回去了。只要能救下当年的老爸和老师们，我们怎样都行！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_ADULT_NAME}',
        leftPortrait: '{MC_ADULT_PORTRAIT}',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '别耽搁了！走！下到底层反应堆，送他们六个回去改变未来！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人冲向金字塔最底层反物质反应堆。',
      buttonText: '【开启第二十七章 · 熔炉抉择】',
      targetScene: 'ch27_scene_reactor_run'
    }
  }
};
