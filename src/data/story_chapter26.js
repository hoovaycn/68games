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
        text: '穿过重重防护闸门，眼前豁然开朗。这里不是冰冷的机械机房，而是一座足有三个足球场大小、悬浮在云端之上的森严大殿。数以万计的全息课桌悬浮在半空，幽蓝试卷像漫天雪花般无休止飞舞翻滚。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（仰望着穹顶流动的金色评分矩阵，呼吸停滞）这算什么……整座城市的神经元运算网络，被阿瑶打造成了一场永远不会交卷的终极期末考试吗？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '成年副官',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '因为在阿瑶心里……‘分数’是她毕生挣脱不掉的梦魇。她以为只要抹杀掉所有人不合格的情感，世界就不会再有背叛，更不会再有三号船那场吞噬一切的大火。',
        highlight: true,
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '破译机房中枢密钥，直径十余米的巨型强化玻璃维生舱缓缓开启。',
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
        text: '刺骨冷气喷涌而出。舱内没有威严的女皇，只有一个插满粗大电缆、半透明营养管与脑神经插头的女人。白发如残雪披散，面容干枯如秋叶，胸口用胶带死死贴着一张泛黄的小学六8班毕业合影！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（捂住嘴巴眼泪唰地掉落）这就是阿瑶阿姨？！那个在咨询室里优雅微笑的苏晚医生……怎么会把自己折磨成这副惨样？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '维生舱内枯瘦的身躯剧烈颤抖，太阳穴电极爆出刺耳蜂鸣。受到脑电波刺激，一段死死加密了四十年的全息记忆轰然在虚空中投射而出！',
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
        text: '敢跟踪我的货车摸到水闸？！今晚第一批高纯度神经致幻药剂试剂，先把这两个小崽子徐博和刘淑惠打成痴呆扔进江底喂鱼！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '未来虚影（投影）',
        leftPortrait: 'assets/art/ayao_corrupted_god_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '阿瑶……听着！如果不冲出去把药抢过来吃掉，徐博的脑神经今晚就会被药剂烧穿，刘淑惠会被活活溺死！你必须当着他们的面背叛，沈万廷才会放过他们把你带走当核心试验品！只有这样他们才能当上老师！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '少年阿瑶（投影）',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted_god_default@2x.png',
        activeSide: 'left',
        text: '（疯了一样往嘴里硬塞荧光药剂哭得撕心裂肺）徐博……淑惠……只要你们能平安活着当老师，我下地狱没关系……我当坏人没关系！你们一定要活下去啊！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '（双拳砸在地面泣不成声）怎么会是这样……老师们痛恨了阿瑶二十年，全校都以为她堕落……真相竟然是她用自己的一辈子换了两位老师的生路啊！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '成年副官',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '阿瑶亲手把自己逼成了全天下最孤独的恶人，锁在了一个必须永远扮演恶魔的莫比乌斯环里！整整四十年啊！！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '天梯智脑',
        leftPortrait: 'assets/art/boss_judgement_core@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '『警告！特级因果封存档案被非法激活！满分优等生激活全域物理歼灭程序！入侵者就地蒸发！』',
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
        text: '金色全息智脑寸寸龟裂轰然爆碎为蓝光！维生舱管线脱落，枯瘦的阿瑶从半空坠落，被成年主角稳稳接住。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '未来阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '（嘴角露出解脱苦涩的微笑）你们……终于打碎这个牢笼了……二十年了，我终于不用再算那些冰冷的分数了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '未来阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        activeSide: 'left',
        text: '（从胸口硬生生抠出一枚散发七彩光晕的原石芯片）这是最初的地脉核心【古罐原石密钥】。去底层反物质反应堆插入喷流口，通道就会逆转开启……但只有十二岁的纯净肉身能回去，大号的你们已经回不去了……',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '成年副官',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '我们早就不在乎能不能回去了……只要能让二十年前的老爸和老师们活着，我们粉身碎骨也心甘情愿！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '成年主角',
        leftPortrait: 'assets/art/mc_adult_zixiao_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '别磨磨唧唧的！走！下反应堆！把你们六个送回过去，拯救我们的未来！！',
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
