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
  // s1: 雨夜突袭 · 崇文楼咨询室对质
  ch23_scene_counseling_breakin: {
    id: 'ch23_scene_counseling_breakin',
    title: '深夜十点 · 崇文楼心理咨询室门外',
    bgType: 'corridor',
    bgImg: 'assets/backgrounds/bg_counseling_room@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '雨夜的崇文楼一片死寂。平时明亮整洁的走廊，此刻笼罩在一层肉眼可见的诡异蓝紫色微光中。空气中弥漫的不是粉笔灰的味道，而是浓烈刺鼻的臭氧与古朴药香混杂的气息。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（抬手示意所有人贴墙隐蔽，右手拔出手枪卡入战术握把，左手握着那枚二十年后的未来警徽）门锁从里面被反锁了，里面有高压电流的蜂鸣声。{MC_NAME}，待会儿破门所有人站在防弹盾后面，别乱动！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '砰——！！两名特警队员持破门锤重重砸开厚重木门，木屑四溅！强光战术手电瞬间将室内照得雪亮。然而，屋内的情景让所有人倒吸一口冷气。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '原本整洁的书桌被推到墙角，一台足有一人多高、周身缠绕着无数幽蓝电缆的复杂仪器伫立在房间中央。仪器上方悬浮着六支连接神经导线的银色头盔，正发出微弱的电弧！苏晚医生正从容地坐在仪器前翻阅档案。',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（合上文件夹，嘴角带着云淡风轻的笑意）海峰警官，带了这么多人深夜来查房，动静未免太大了吧？白天送你们的草本安神糖，难道还没让你们睡个安稳觉吗？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        activeSide: 'left',
        text: '苏医生，我们在九号码头截获了手提箱！里面有二十年后的警徽和预警信，指明了神经脑波仪就在这里！你在白天体检的时候，到底在全校同学身上动了什么手脚？！',
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
    bgImg: 'assets/backgrounds/bg_counseling_room@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        activeSide: 'left',
        text: '（死死盯着苏晚拿钢笔的手腕，声音尖锐发颤）等一下……你的右手腕内侧！那道暗红色的陈旧烫伤疤痕……还有你倒茶时食指轻敲杯托的小动作……天呐……你不是苏晚医生……徐博！你快看她！她是……阿瑶？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '（摘下金丝眼镜扔在桌上，取下发夹，如瀑长发披散而下，眼神瞬间化作刺骨坚冰）徐博，刘淑惠。整整二十年了。你们当了二十年受人敬仰的人民教师，而我……在泥潭与罪孽里替你们背负了二十年的诅咒。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（整个人如遭雷击退撞在书柜上，泪如雨下）阿瑶……真的是你？！当年旧水闸坍塌你掉进江水里，我和刘老师找了你整整三年！我们每天都在自责当年为什么没拽住你！你既然活着，为什么会变成走私网的幕后黑手？！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '沈万廷一条野狗也配做我的上线？从旧仓库到虎门滩头，他掘地三尺想找的【聚魂古罐】，本来就是我故意扔的饵！只有借他的走私船队，我才能从长江地脉深处提炼出足够开启时空隧道的因果能量！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '阿瑶！不管你经历了什么，现在立刻放下危险晶体！这屋里不仅有你当年的同窗，还有六个无辜的孩子！不要走上绝路！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '无辜？海峰，在既定的因果闭环面前，没有一个人是无辜的！如果我不把三号船的因果撕开，9月28日一过，你们全都会化作焦炭！既然你们这么想探寻真相，那就先过了古罐封印的这道坎吧！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '阿瑶将古瓷罐残片狠狠拍在脑波仪插槽中，煞气拟态体与时空傀儡破空而出！',
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
        text: '随着海峰警官最后一发穿甲弹，沈万廷的煞气残影轰然爆裂！但古瓷罐残片与脑波仪的超载共鸣彻底失控，狂暴的蓝黑色量子光束将地板整层掀翻，旋转的黑洞在屋中央疯狂扩张！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（顶着狂暴飞射的碎木扑上去，死死抓紧阿瑶风衣下摆）阿瑶！把机器关了！跟我走！不管犯了多大的错，我和淑惠替你担着！我们一起自首，回学校重新开始啊！！',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '（眼中掠过撕裂般的极度痛苦，但她狠狠闭上眼，拔出合金短刃毫不犹豫割断了风衣下摆）重新开始？徐博，回不去了！早在二十年前我坠入深渊的那一刻起，我们就回不到那个洒满阳光的操场了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶将短刃插进核心控制板向下猛拉！狂暴的时空引力波呈圆环状炸裂，脚下地面彻底瓦解，六个孩子瞬间被狂卷入深不见底的旋转黑洞！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '（双目赤红飞身扑救，伸直手臂想要抓住孩子们）{ALLY_2_NAME}！{MC_NAME}！抓住我的手！！快抓紧！！',
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
        text: '去吧……去亲眼看看二十年后的大地！看看你们引以为傲的正义到底换来了什么！如果你们能在那个绝望死寂的废墟里活下来……再来告诉我，你们当年的浩然正气究竟救得了谁！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '炽烈灼目的白光彻底吞噬了视线。震耳欲聋的时空雷暴声中，六名少年的意识在无尽的时空交错中迅速模糊，朝着未知的未来深渊急速坠落……',
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
