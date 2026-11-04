/**
 * 第二十三章《夺舍真相》剧情脚本数据表（第三幕 第3章）
 *
 * 流程结构：
 * - ch23_scene_counseling_breakin: 深夜特警与主角团折返崇文楼，破门心理咨询室
 * - ch23_scene_ayao_revelation: 刘老师认出手腕伤疤与习惯，苏晚摘眼镜露出真面目——失踪二十年的阿瑶
 * - ch23_battle1: 崇文楼诊室时空阻滞战（主角团 + 海峰警官NPC VS 古罐煞气拟态体）
 * - ch23_scene_future_exile: 脑波仪超载引发时空黑洞，阿瑶割断风衣断绝旧情，六名少年坠入二十年后未来
 */

export const CHAPTER23_STORY = {
  // s1: 雨夜突袭 · 崇文楼走廊破门
  ch23_scene_counseling_breakin: {
    id: 'ch23_scene_counseling_breakin',
    title: '深夜十点 · 崇文楼心理咨询室门外',
    bgType: 'corridor',
    bgImg: 'assets/backgrounds/bg_chongwen_corridor_night@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_chongwen_corridor_office@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '雨夜的崇文楼一片死寂。整条走廊泛着微弱的幽蓝荧光，空气里飘着刺鼻的焦糊味。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（示意大家贴墙隐蔽，拔出手枪）门被反锁了，里面有电流声。待会儿破门，你们全都躲在防暴盾后面，千万别乱跑！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '砰——！！特警队员持破门锤重重砸开木门，强光手电瞬间将室内照得雪亮。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_counseling_room_machine@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
        text: '书桌被推在一旁，一台一人多高的复杂仪器立在正中，缠绕着不少电缆，隐隐闪烁着电火花。[next]苏晚医生正坐在桌前，平静地翻看着病历夹。',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_counseling_room_machine@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
        text: '（合上文件夹，淡淡一笑）海峰警官，带这么多人深更半夜查房，阵仗挺大啊。白天送你们的安神糖，难道没管用吗？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_counseling_room_machine@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
        text: '苏医生，我们在码头截获了手提箱，找到了未来的预警信！白天体检的时候，你到底在全校同学身上动了什么手脚？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '刘老师走上前，目光落在了苏晚的手腕上，脸色煞白。',
      buttonText: '【凝视手腕 · 揭开二十年的真容】',
      targetScene: 'ch23_scene_ayao_revelation'
    }
  },

  // s2: 撕碎伪装 · 二十年前的阿瑶
  ch23_scene_ayao_revelation: {
    id: 'ch23_scene_ayao_revelation',
    title: '深夜十点一刻 · 尘封二十年的故人',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_counseling_room_machine@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        activeSide: 'left',
        text: '（死死盯着苏晚的手腕，失声叫道）等等……你右手腕上的烫伤……还有倒茶敲杯沿的习惯……天呐！徐博！你快看她！她是……阿瑶？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '（摘下眼镜扔在桌上，散开长发，眼神冰冷）徐博，刘淑惠。整整二十年了。[next]你们当了二十年好老师，而我……却在泥潭里熬了整整二十年。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（踉跄退后一步，眼圈通红）阿瑶……真的是你？！当年你在老水闸出事失踪，我和淑惠找了你三年！你既然还活着……为什么会变成这样？！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '沈万廷不过是个棋子。他千方百计想找的古罐，本来就是我放出去的饵！[next]没有他的走私船队，我怎么从地脉深处提炼能量开启通道？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '阿瑶！不管当年发生了什么，先把手里的东西放下！屋里不仅有老同学，还有无辜的孩子，别走极端！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '无辜？海峰，在注定的命运面前，没有谁是无辜的！不把三号船的祸根斩断，过不了几天，你们所有人都会葬身火海！想拦我，就先过了这一关！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶冷笑着抓起桌上的古瓷罐残片，狠狠拍进了脑波仪的能量卡槽！[next]滋啦——！一人多高的仪器剧烈轰鸣，刺目的暗紫电流像狂蛇般乱窜，电弧瞬间将两侧的窗帘引燃！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '时空煞气寄生体',
        leftPortrait: 'assets/art/shadow_parasite@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（仪器裂缝中黑雾翻腾，两只幽灵般的煞气虚影凝聚成形，发出刺耳的电子尖啸）滋……因果律入侵者……[next]抹除……彻底抹除……留在这里变成永恒的养料吧！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '时空错乱傀儡',
        leftPortrait: 'assets/art/chronos_puppet@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（数具双眼泛着幽蓝光芒的提线人偶从阴影中踏出，手持电弧工具咔咔逼近）清除障碍……执行……阿瑶大人的封锁指令……！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（立刻双手持枪护在孩子们前方）该死！这机器里涌出来的是什么鬼东西？！特警队护住两侧窗户！千万别被那团黑雾碰到！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '大家背靠背，别慌！这些怪物是靠脑波仪供能的，只要把它们打散，就能阻止仪器！六8班，抄家伙迎战！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '脑波仪暴走喷出煞气虚影，错乱傀儡手持电弧封锁诊室！',
      buttonText: '【进入战斗 · 诊室时空阻滞战】',
      battleId: 'ch23_battle1',
      isBattleTrigger: true,
      targetScene: 'ch23_scene_future_exile'
    }
  },

  // s3: 裂隙撕裂 · 坠入二十年后的深渊
  ch23_scene_future_exile: {
    id: 'ch23_scene_future_exile',
    title: '深夜十点半 · 无法逆转的时空漩涡',
    bgType: 'quantum',
    bgImg: 'assets/backgrounds/bg_time_passage@2x.png',
    bgm: 'bgm_shock_sting',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '煞气残影消散，但古瓷罐与脑波仪彻底过载，狂暴的光芒在地面撕开了一道旋转的时空裂隙！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（冒着气浪扑上去抓紧阿瑶的衣角）阿瑶！把机器停下！跟我走！不管做错了什么，我和淑惠陪你一起担，我们回学校重新开始！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '（狠心拔出短刃割断衣角）重新开始？徐博，回不去了！从二十年前我被逼上绝路、陷进这片泥潭的那天起，我们就再也回不去了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶猛地拉下控制扳手！强烈的引力骤然爆发，地面轰然塌陷，孩子们瞬间被卷入旋转的时空旋涡！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（飞身扑救，拼命伸出手臂）{ALLY_2_NAME}！{MC_NAME}！快抓住我的手！快抓紧！！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '海峰叔叔！徐老师！刘老师——！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_NAME}',
        activeSide: 'left',
        text: '去二十年后的世界亲眼看一看吧！看看你们所谓的浩然正气，到底能保得住谁！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '白光吞没了一切。雷鸣般的轰鸣声中，少年们的意识逐渐模糊，朝着未知的未来急速坠落……',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '意识陷入漫长下坠与黑暗，当眼睛再次睁开时，耳边传来的却是机械冰冷的蜂鸣。',
      buttonText: '【开启第二十四章 · 钢铁废墟】',
      targetScene: 'ch24_scene_ruins_arrival'
    }
  }
};
