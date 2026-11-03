/**
 * 第二十二章《未来警徽》剧情脚本数据表（第三幕 第2章）
 *
 * 流程结构：
 * - ch22_scene_pier_confrontation: 雨夜九号码头，孩子们冒雨赶到，质问徐老师
 * - ch22_scene_smuggler_drop: 独眼蝰蛇带重装水手包抄灭口，徐老师护住孩子
 * - ch22_battle1: 九号码头接头突击战（主角团 + 徐老师NPC VS 独眼蝰蛇）
 * - ch22_scene_reverse_ambush: 警笛长鸣，海峰带特警神兵天降，苦肉计破局
 * - ch22_scene_future_badge: 开启绝密手提箱，发现2046年特警警徽与未来的带血预警信
 */

export const CHAPTER22_STORY = {
  // s1: 暴雨如注 · 九号码头栈桥对峙
  ch22_scene_pier_confrontation: {
    id: 'ch22_scene_pier_confrontation',
    title: '晚上八点前 · 九号码头风雨栈桥',
    bgType: 'pier',
    bgImg: 'assets/backgrounds/bg_pier_night_rain@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '长江岸边的九号码头，废弃塔吊在狂风中发出沉闷的金属呻吟。黑沉沉的江水裹挟着白色浪沫狠狠拍击着水泥栈桥。暴雨如注，视线不足五米。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '栈桥尽头的铁皮棚下，徐老师形单影只地伫立在风雨中，黑色风衣已被雨水彻底泡透，紧紧贴在身上。她一手提着一只银灰色的金属密码手提箱，另一只手在狂风中冻得惨白。',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（抹了一把脸上的冰冷雨水，带着众人大步冲上栈桥）徐老师！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '（猛然回头，眼中写满了不可置信与惊骇，提着手提箱的手剧烈颤抖）子骁（予诺）？！文默（妍熹）？！你们怎么会找到这里来？！谁让你们来的？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（从怀里掏出那张被雨水打湿的交割单，声音嘶哑）徐老师！您还在瞒着我们！昨晚您掉在水闸的提货单，上面的经手人签字是您的笔迹，公章是教育督导办的印！您今晚拿着这只箱子，到底是要跟三号船交割什么？！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '住口！小孩子懂什么？！你们以为这个世界就像课本上写的非黑即白吗？！大人的选择，你们根本承担不起！把棍子扔了，现在、立刻、马上滚回学校去！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（把球棒往泥水里狠狠一顿，雨水四溅）徐老师，您平时罚我抄生字我都认，但今天……您就算开除我，我也绝不退半步！我们今天要是把您一个人撂在这个鬼地方，我们一辈子都抬不起头做人！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '话音未落，码头闸口突然射来暴烈的远光灯！',
      buttonText: '【直面强光 · 迎战截胡恶煞】',
      targetScene: 'ch22_scene_smuggler_drop'
    }
  },

  // s2: 恶犬出笼 · 截胡与围攻
  ch22_scene_smuggler_drop: {
    id: 'ch22_scene_smuggler_drop',
    title: '晚上八点整 · 致命交割',
    bgType: 'pier',
    bgImg: 'assets/backgrounds/bg_pier_night_rain@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰——！！两道雪亮暴烈的远光大灯突然撕裂狂风骤雨，从码头闸口狂暴照射过来，将所有人的眼睛晃得一片惨白！一辆重型黑色皮卡伴随着刺耳的刹车声横甩在栈桥口，封死了回陆地的通道！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '独眼蝰蛇',
        leftPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（皮靴重重踏进泥水，左脸横贯着一道扭曲伤疤，单手拎着黑色战术手弩）哟……徐老师，好雅兴啊。约在暴雨夜的死水码头接头，手里还领着一串背着书包的嫩雏儿？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '（一步跨出，张开双臂将所有孩子护在身后）独眼蝰蛇！交接单上有我的保密密钥！你要的货就在3号货柜里，钥匙在我手上！放孩子们上岸，否则我当场把芯片折断沉进长江！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '独眼蝰蛇',
        leftPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '跟老子谈条件？臭教书的，上面的大老板发话了，今晚三号船的所有旧线全都要切得干干净净。这只手提箱我们要带走，而你们……全都是给这废码头垫底的烂肉！先把那几个碍事的小崽子脑袋敲碎！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '大家结阵！别退！护住徐老师两侧！跟他拼了！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '独眼蝰蛇率重装水手与高处枪手合围，徐老师以身相护！',
      buttonText: '【进入战斗 · 九号码头突击战】',
      battleId: 'ch22_battle1',
      isBattleTrigger: true,
      targetScene: 'ch22_scene_reverse_ambush'
    }
  },

  // s3: 红蓝警灯闪烁 · 苦肉计破局
  ch22_scene_reverse_ambush: {
    id: 'ch22_scene_reverse_ambush',
    title: '战后码头 · 撕开烟雾弹',
    bgType: 'pier',
    bgImg: 'assets/backgrounds/bg_pier_night_rain@2x.png',
    bgm: 'bgm_confirm',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '砰！独眼蝰蛇的重盾四分五裂，整个人倒飞出去砸在锈蚀货柜上。他眼中凶光毕露，颤抖着摸向皮带扣上的遥控引信：“想抓老子……全给老子一起上天——”',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '呜————！！！凄厉的警笛呼啸骤然撕破狂风骤雨！江面上三艘高速水警巡逻艇千瓦探照灯交叉锁定，陆地闸口五辆防暴冲锋车雷霆合围，特警如神兵天降！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        activeSide: 'left',
        text: '（一个迅猛滑铲飞身踹飞遥控器，枪口死死抵在蝰蛇太阳穴）动一下，老子立刻送你上路！市局刑警支队！三号船专案组收网！双手抱头趴在地上！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '独眼蝰蛇',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        activeSide: 'right',
        text: '海峰……？！你不是被市局停职抓进督导办了吗？！你怎么可能调得动水警和防暴队？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（踩着深水冲下车，一把扶住徐老师哭出声）徐老师！你怎么样？！刚才听见枪响我心跳都快停了……你要是有个三长两短我怎么交代？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '刘老师……别哭，我没事。孩子们都护得好好的，一个都没少……手提箱也保住了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '海峰叔叔？！刘老师？！你们不是在学校吵得不可开交吗？！海峰叔叔不是被通报停职了吗？！这到底是怎么回事啊？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '臭小子！专案组查到走私网在局里甚至有耳目！我和你们两位老师商量，唯一的破局办法就是演一出彻头彻尾的苦肉计——故意放出我违纪停职的烟雾弹，让徐老师假装因怨生隙联络三号船！只有这样，独眼蝰蛇这条深水毒蛇才会亲自带箱子冒头！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '（蹲下身替孩子们抹去泥水与泪水，眼眶通红）对不起，孩子们。只有你们表现出最真实、最痛苦的反应，眼线才不会怀疑……让你们淋雨受惊吓了，老师对不起你们。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（扑进徐老师怀里放声大哭）呜呜呜……吓死我们了！我就知道……教我们要有浩然正气的徐老师，绝不可能是坏人！呜呜呜……',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '危机解除，特警排爆小组开始现场拆解银灰色手提箱。',
      buttonText: '【开启绝密手提箱】',
      targetScene: 'ch22_scene_future_badge'
    }
  },

  // s4: 绝密手提箱 · 来自2046年的信件
  ch22_scene_future_badge: {
    id: 'ch22_scene_future_badge',
    title: '货柜脚下 · 跨越二十年的警告',
    bgType: 'pier',
    bgImg: 'assets/backgrounds/bg_pier_night_rain@2x.png',
    bgm: 'bgm_shock_sting',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '特警技术员用液压剪切开密封锁扣，白色的极冷液氮雾气喷涌而出。厚厚的减压海绵中静静嵌着两件东西，并非毒剂，也不是黑账。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（捧出一枚沉甸甸的银灰色金属警徽，瞳孔缩紧）高分子一体压铸合金……背面专属激光警号是……046-2046-SF！前缀046是我的警号传承代号，年份是二零四六年？！这是二十年后特警支队的警徽？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（眼尖地指着凹槽底）快看！警徽底下压着一张边缘焦黑的信纸！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（展开带血迹的信纸，浑身血液瞬间冻结）这字迹……每一个撇捺的起落习惯……字尾习惯性向上提勾的小动作……这分明是我自己写的字！是我未来的笔迹！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '泛黄纸片上写着绝望的血字：【千万别在9月28日登上三号船！那不是普通货轮，而是因果风暴的终结祭坛！那一夜海峰爸、徐老师、刘老师全牺牲在底舱火海里！快回学校去查神经脑波仪，那是扭转宿命的唯一钥匙！】',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（声音剧烈发颤）神经脑波仪……省脑科研究所……那是今天白天苏晚医生带进崇文楼的那台体检测试仪！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '不好！苏晚白天在全校给上百个学生做过测试，甚至给全校发了安神糖！所有特警立刻上车，拉响警报！回崇文楼！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '警笛轰鸣，所有人火速掉头赶回已被诡异青光笼罩的崇文楼。',
      buttonText: '【开启第二十三章 · 夺舍真相】',
      targetScene: 'ch23_scene_counseling_breakin'
    }
  }
};
