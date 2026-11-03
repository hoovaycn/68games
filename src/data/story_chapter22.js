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
        text: '九号码头风大雨急，江水猛烈拍打着栈桥，暴雨中几乎看不清前路。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '栈桥尽头的铁皮棚下，徐老师一个人站在风雨中，浑身湿透。她紧紧攥着一只银灰色的金属手提箱，冻得脸色发白。',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（抹了一把脸上的雨水，快步冲上栈桥）徐老师！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '（猛然回头，满脸震惊）{MC_NAME}？！{ALLY_2_NAME}？！你们怎么找到这儿来的？！谁让你们来的？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（拿出那张湿透的交割单，声音发颤）徐老师！您还在瞒着我们！昨晚您掉在水闸的提货单，签字分明是您的笔迹！我爸天天为了案子发愁，您今晚拿着这箱子，到底要干什么？！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '住口！你们什么都不知道！把棍子扔了，现在立刻回学校去！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（把球棒往地上一顿）徐老师，您平时罚我抄生字我都认，但今天我们绝不走！把您一个人扔在这儿，我们一辈子都抬不起头！',
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
        text: '刺眼的远光大灯突然撕裂雨夜！一辆黑色重型皮卡带着刺耳刹车声甩在栈桥口，直接堵死了退路！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '独眼蝰蛇',
        leftPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（皮靴重重踏进泥水，手里拎着战术手弩冷笑）哟，徐老师，挺有兴致啊。暴雨天接头，还顺带捎上了几个背书包的小崽子？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '（立刻挡在孩子们身前）独眼蝰蛇！交接单上有我的密钥，货在3号柜里！放孩子们走，否则我立刻把芯片折断扔进江里！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '独眼蝰蛇',
        leftPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '跟我谈条件？上面的大老板发话了，今晚三号船的所有旧线全都要切干净。箱子我们带走，至于你们……全都沉江喂鱼！先把那几个小崽子收拾了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '大家别慌！护住徐老师两侧，跟他们拼了！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '独眼蝰蛇率重装水手合围，徐老师以身相护！',
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
        text: '砰！独眼蝰蛇被击退重重撞在货柜上。他凶狠地摸向遥控引信：“想抓老子……全给老子一起死——”',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '呜——！！凄厉的警笛声骤然撕破雨幕！水警巡逻艇探照灯齐刷刷锁定栈桥，多辆防暴冲锋车雷霆合围，特警队员迅速封控现场！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        activeSide: 'left',
        text: '（飞身一脚踹飞遥控器，枪口稳稳抵住蝰蛇）别动！市局刑警队！双手抱头趴下！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '独眼蝰蛇',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/boss_viper_smuggler@2x.png',
        activeSide: 'right',
        text: '海峰……？！你不是被市局停职抓起来了吗？！怎么还能带队？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（踩着积水跑下车，一把扶住徐老师）徐老师！你怎么样？！刚才听到动静吓死我了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '刘老师，我没事。孩子们都好好的，手提箱也保住了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '海峰叔叔？！刘老师？！你们白天不是在学校吵翻了吗？海峰叔叔不是被通报停职了吗？！这到底是怎么回事啊？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '专案组查到走私团伙在局里安插了眼线！我们商量之后只能演一出苦肉计——故意放风说我被停职，让徐老师假装有二心去联络三号船。只有这样，独眼蝰蛇这条大鱼才会露头！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（给孩子们抹去脸上的雨水，眼眶通红）对不起，让你们跟着担惊受怕了。只有你们表现出不知情的真实反应，眼线才不会起疑心……老师对不起你们。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（一下子红了眼眶，拉住老爸的手）爸！徐老师！真的吓死我了……我就知道我爸是好警察，徐老师也绝对不会害我们！',
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
        text: '特警技术员撬开密封锁扣，白色的冷雾散去。厚厚的防震海绵里，放着两样东西。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（捧出一枚沉甸甸的银灰色金属警徽，脸色骤变）这警徽材质……背面的激光警号是046-2046-SF！前缀046是我的专属警号，年份怎么会是二零四六年？！这是二十年后的警徽？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '（眼尖地指着凹槽底）快看！警徽底下压着一张焦黑的信纸！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（展开带血迹的信纸，手不住颤抖）这字迹……还有末尾向上勾的小动作……这分明是我自己的笔迹！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '泛黄纸片上写着凌乱的血字：【千万别在9月28日登上三号船！那一夜海峰爸、徐老师、刘老师全牺牲在底舱火海里！快回学校查神经脑波仪，那是改变一切的唯一线索！】',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（猛地一震）神经脑波仪……那是今天白天苏晚医生带进崇文楼的那台体检仪器！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '不好！苏晚白天给全校不少学生做过检测，还发了糖！特警队立刻上车，拉响警报，马上回崇文楼！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '警笛轰鸣，所有人火速赶回崇文楼。',
      buttonText: '【开启第二十三章 · 夺舍真相】',
      targetScene: 'ch23_scene_counseling_breakin'
    }
  }
};
