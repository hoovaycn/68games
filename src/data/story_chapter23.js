/**
 * 第二十三章《夺舍真相》剧情脚本数据表（第三幕 第3章）
 *
 * 流程结构：
 * - ch23_scene_counseling_breakin: 深夜特警与主角团折返崇文楼，破门心理咨询室
 * - ch23_scene_ayao_revelation: 刘老师认出那双眼睛，苏晚摘眼镜露出真面目——失踪二十年的阿瑶
 * - ch23_battle1: 崇文楼诊室净化风暴战（主角团 + 海峰警官NPC VS 黑雾寄生体）
 * - ch23_scene_future_exile: 脑波仪超载撕开时空门，阿瑶割断风衣断绝旧情，六名少年坠入二十年后未来
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
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
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
        leftPortrait: 'ayao-doctor',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_counseling_room_machine@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
        text: '书桌被推在一旁，一台一人多高的复杂仪器立在正中，缠绕着不少电缆，隐隐闪烁着电火花。[next]苏晚医生正坐在桌前，平静地翻看着病历夹。',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '苏晚医生',
        leftPortrait: 'ayao-doctor',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
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
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'ayao-doctor',
        rightEmotion: 'default',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_counseling_room_machine@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
        text: '苏医生，我们在码头截获了那只手提箱，里面有一枚从没见过的警徽，还有一张带血的纸条……[next]白天体检的时候，你到底对我们做了什么？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '刘老师走上前，目光撞上苏晚那双似曾相识的眼睛，脸色煞白。',
      buttonText: '【凝视双眼 · 揭开二十年的真容】',
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
        leftPortrait: 'liu',
        leftEmotion: 'default',
        rightPortrait: 'ayao-doctor',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（死死盯着苏晚的眼睛，失声叫道）等等……这双眼睛……看人时那种冷冷地、像要把人看穿的眼神……天呐！徐博！你快看她！她是……阿瑶？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'liu',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '（摘下眼镜扔在桌上，散开长发，眼神冰冷）徐博，刘淑惠。整整二十年了。[next]你们当了二十年好老师，而我……却在泥潭里熬了整整二十年。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（踉跄退后一步，眼圈通红）阿瑶……真的是你？！当年你在老水闸出事失踪，我和淑惠找了你三年！你既然还活着……为什么会变成这样？！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '沈万廷不过是个贪婪的蠢货，他以为那口青花古罐里装的是能发横财的鸦片膏，却不知道真正可怕的是罐底沉淀的那层“净心散”——它能让人的喜怒哀乐彻底消失！[next]我把净心散喂给他们，再把这台脑波仪对准全城，用脑波把药力放大、覆盖进每个人的大脑，把贪婪、嫉妒、恐惧、背叛这些害人的情绪统统抹掉！[next]等所有人都变成不懂背叛、没有痛苦的“满分”之人，这世上就再也不会有人被逼上绝路，再也不会有人像我一样在泥潭里挣扎二十年！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '阿瑶！不管当年发生了什么，先把手里的东西放下！屋里不仅有老同学，还有无辜的孩子，别走极端！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '无辜？海峰，二十年前我被人逼上绝路、吞下那罐毒药的时候，怎么没见你们这些人站出来？！[next]这个世界之所以一遍遍害人，就是因为人心太脏！既然你们非要拦着我把它净化干净，就先过了我这一关！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶冷笑着抓起桌上的古瓷罐残片，狠狠拍进了脑波仪的能量卡槽！[next]滋啦——！一人多高的仪器剧烈轰鸣，刺目的暗紫电流像狂蛇般乱窜，电弧瞬间将两侧的窗帘引燃！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '黑雾寄生体',
        leftPortrait: 'shadow_parasite',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（仪器裂缝中黑雾翻腾，两只幽灵般的黑雾凝聚成形，发出刺耳的电子尖啸）滋……入侵者……[next]抹除……彻底抹除……留在这里变成永恒的养料吧！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '失控傀儡',
        leftPortrait: 'chronos_puppet',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（数具双眼泛着幽蓝光芒的提线人偶从阴影中踏出，手持电弧工具咔咔逼近）清除障碍……执行……阿瑶大人的封锁指令……！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（立刻双手持枪护在孩子们前方）该死！这机器里涌出来的是什么鬼东西？！特警队护住两侧窗户！千万别被那团黑雾碰到！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '大家背靠背，别慌！这些怪物是靠脑波仪供能的，只要把它们打散，就能阻止仪器！六8班，抄家伙迎战！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '脑波仪暴走喷出黑雾，失控傀儡手持电弧封锁诊室！',
      buttonText: '【进入战斗 · 诊室净化风暴战】',
      battleId: 'ch23_battle1',
      isBattleTrigger: true,
      targetScene: 'ch23_scene_future_exile'
    }
  },

  // s3: 时空门撕裂 · 坠入二十年后的深渊
  ch23_scene_future_exile: {
    id: 'ch23_scene_future_exile',
    title: '深夜十点半 · 无法逆转的时空门',
    bgType: 'quantum',
    bgImg: 'assets/backgrounds/bg_time_passage@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '黑雾消散，但那台脑波仪与古瓷罐已经彻底过载，仪表盘上的指针疯狂乱跳。[next]忽然，机房中央“轰”地一声，失控的能量竟把地面撕开了一道旋转的时空裂缝！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（脸色剧变，一把拽住阿瑶）阿瑶！快把机器关掉！这裂缝会把人吸进去，会死人的！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'ayao-adult',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '（死死盯着那道裂缝，惊骇地摇头）怎么会……我只是想净化他们，让这世上不再有背叛和痛苦，为什么会失控到这种地步？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶慌乱地反手去拽控制杆，非但没能关停，反而让过载的电流暴涨！裂缝轰然扩张，一股狂暴的吸力瞬间把离得最近的六个孩子卷了进去！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: '{ALLY_2}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（飞身扑救，却被一道电弧狠狠弹开，重重摔在地上）{ALLY_2_NAME}！{MC_NAME}！快抓住我的手——！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC}',
        leftEmotion: 'default',
        rightPortrait: 'haifeng-police',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '海峰叔叔！徐老师！刘老师——！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（呆立原地，眼睁睁看着裂缝吞噬孩子们，脸上第一次露出恐惧）不……不要……！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师和刘老师拼死冲上前，却被裂缝边缘滚烫的气浪死死挡住；海峰扑到近前，指尖离孩子们只剩一寸，却再也够不着。[next]裂缝裹着六个孩子轰然闭合，把徐老师、刘老师、海峰连同阿瑶，永远隔断在了这一头。白光吞没了一切，少年们的意识逐渐模糊，朝着未知的未来急速坠落……',
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
