/**
 * 第二十一章《神医的茶香》剧情脚本数据表（第三幕 第1章）
 *
 * 流程结构：
 * - ch21_scene_clinic_warmth: 新学期开学，崇文楼心理健康普查，初见苏晚医生，茶香与安神糖
 * - ch21_scene_dock_suspicion: 走廊转角撞见徐老师与刘老师争执，海峰突击水闸扑空受处分，徐老师疑点重重
 * - ch21_scene_alley_ambush: 雨夜尾随至废弃水闸，阿彪率众合围，徐老师闪入排洪道，暗巷死斗
 * - ch21_battle1: 水闸暗巷突围战（主角团 VS 阿彪与青眼搬运工）
 * - ch21_scene_night_after: 战后泥水中发现带血提货单与徐老师签字，相约夜探九号码头
 */

export const CHAPTER21_STORY = {
  // s1: 崇文楼回廊 · 茶香与安神糖
  ch21_scene_clinic_warmth: {
    id: 'ch21_scene_clinic_warmth',
    title: '开学第一周 · 崇文楼心理咨询室',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_counseling_room@2x.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '新学期伊始，崇文楼三楼走廊格外喧闹，毕业班各班排成歪歪扭扭的长队。[next]学校以“小升初考前身心减压普查”为由，专程从市脑科康复研究所请来了一位知名专家。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（趴在走廊栏杆上揉着后颈）喂，{MC_NAME}，你们听说了吗？今天来坐诊的专家可神了，聊两句、看你画两笔，就能知道你晚上几点做梦。[next]上学期钟楼折腾得我天天半夜抽筋，正好让她给瞧瞧。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '张希哲你少道听途说，那是现代认知神经心理学，不是街头算命！全班几十号人都要排队过筛，哪轮得到你第一个进去？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（紧紧攥着铅笔，嘴唇发白）可是……我昨晚又失眠了。自从从钟楼回来，我总觉得耳边有钟表滴答声……[next]而且我爸为了查钟楼的可疑药粉天天通宵，昨晚还把样品送去市脑科所化验……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（拍拍{ALLY_2_NAME}肩膀）别自己吓自己，海峰叔叔是老刑警了，肯定没事的。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（推开门，朝两人招手）大家安静排队。{MC_NAME}、{ALLY_2_NAME}，你们俩先跟我进来，苏医生特意先给你们做疏导。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '两人跟着徐老师迈进咨询室，木门在身后掩上。屋里没有消毒水味，反而飘散着清雅温润的药草茶香。[next]宽大的原木书桌后坐着一位三十岁上下的女医生，身穿整洁白大褂，眼神温润如水。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '咨询室靠窗的角落里，立着一台一人多高的仪器，被一块白布严严实实地罩着。白布下透出几点幽蓝的指示灯，偶尔“嘀”地轻响一声。',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 9,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（放下钢笔微笑着推过两杯热茶）请进，两位同学请坐。手这么凉，先捧着热茶暖暖身子。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '谢谢苏医生……其实我们身体挺好的，就是徐老师非让我们来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_concerned@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '徐老师是关心你们。刚才我看你们交上来的心理画测，画上的天空都涂了厚厚的乌云，还有一座很高很黑的钟楼。[next]最近夜里……是不是老睡不踏实，总能听见滴答滴答像钟表一样的声响？',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 12,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: 'assets/art/su_wan_doctor_concerned@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '（猛地抬头，看清了桌上的研究所桌签，手微微发抖）苏医生，您怎么看出来的？！我爸海峰警官送检的那批药粉样本……原来就是送到您这儿吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_cold@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '样本我看了，只是普通的有机酯类，没有毒性，别自己吓唬自己。大人的事有大人顶着，你们安心读书就好。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '苏晚医生拉开抽屉，取出一只古朴的青瓷罐，倒出两枚淡绿色的草本安神糖，轻轻递到两人掌心。[next]薄荷的微凉伴着一股幽香散开，让人紧绷的神经瞬间放松了下来。',
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '来，把安神糖含着，回去上自习吧。记住，如果哪天觉得心里太累了，随时来找我。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '走出心理咨询室，两人准备回班，却听见前方教务处隐隐传来争吵声。',
      buttonText: '【前往走廊转角查看】',
      targetScene: 'ch21_scene_dock_suspicion'
    }
  },

  // s2: 走廊转角 · 老师们的裂痕
  ch21_scene_dock_suspicion: {
    id: 'ch21_scene_dock_suspicion',
    title: '崇文楼三楼转角 · 争执与重压',
    bgType: 'corridor',
    bgImg: 'assets/backgrounds/bg_chongwen_corridor_office@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '走廊尽头的教务处半掩着门。里面没有备课的翻书声，反倒传出了压抑而痛苦的争吵，那是刘老师的声音。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（眼眶通红，把通报文件拍在桌上）徐老师，我只问你一句，昨晚海峰抓捕行动走漏风声的事，到底是不是你干的？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'right',
        text: '（避开目光，手指紧扣口袋，里面露出一角写着“九号码头”的硬纸）……刘老师，你别问了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '海峰刚带队摸到现场外围，走私团伙提前十分钟就撤干净了！现场路口监控拍得清清楚楚，行动前通风报信的人影分明就是你！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'right',
        text: '事情不是你想的那样。我做的一切，都是为了保住大家的命。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（眼泪掉下来）可海峰已经被停职配合调查了！二十年前阿瑶出事你也是这样什么都不说，你到底还要瞒到什么时候？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'right',
        text: '（声音发颤）如果停职能保住海峰的命，那是好事。上课铃响了，去班里看着孩子们吧。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师快步离开走廊。躲在墙后的张希哲和朱晏泽倒吸一口凉气，赶紧把{MC_NAME}拉回阴影里。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_nervous@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '海峰叔叔被停职了？！徐老师怎么可能去给坏人报信啊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '但昨晚海峰叔叔的抓捕行动确实走漏了风声。如果不是内部关键消息泄露，对方绝不可能跑得这么干净。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '我不信徐老师会害海峰叔叔！从旧仓库到虎门大桥，哪次不是徐老师拼命护着我们？这里面肯定有天大的误会！[next]放学后大家别走，我们去那条老街看看！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '放学后初春细雨如织，大家尾随身穿风衣的徐老师来到城西老巷。',
      buttonText: '【雨夜追踪 · 尾随徐老师】',
      targetScene: 'ch21_scene_alley_ambush'
    }
  },

  // s3: 雨夜尾随 · 水闸铁门外的恶煞
  ch21_scene_alley_ambush: {
    id: 'ch21_scene_alley_ambush',
    title: '晚上八点半 · 城西雨夜小巷',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_night_rain@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '晚自习结束后，初春的细雨下得又急又凉。大家顶着书包，悄悄跟在徐老师身后。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '雨幕深处，徐老师戴着鸭舌帽，脚步匆忙，拐进了城西一条偏僻冷清的泥泞小巷。',
        sfx: 'sfx_suspense'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（压低身子踩在碎石上）{MC_NAME}……看前面！徐老师停下了，前面是一扇生锈的防汛铁门！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_metal_case@2x.png',
        bgImgFallback: 'assets/backgrounds/bg_street_night_rain@2x.png',
        text: '昏暗的冷雨中，一个身材魁梧的雨衣男人推开生锈的铁门，将一个沉甸甸的银灰色金属手提箱递给徐老师——正是她前夜通风报信、害海峰扑空的那伙人。这个手提箱是前几日在江边网获、谁也撬不开的神秘箱子。[next]上头的人起了疑，让徐老师先把它带走，试试能否打开。[next]徐老师压低声音交谈了两句，又把一张折叠的白纸塞回对方手里，跟害海峰停职的那份密报如出一辙。',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: 'assets/art/enforcer_abiao@2x.png',
        activeSide: 'left',
        text: '就在男人准备缩回铁门的一刹那，朱晏泽脚下一滑，踩瘪了泥水里的废易拉罐——咔嚓一声脆响！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '阿彪',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（从雨衣下抽出一柄沉重撬棍，三角眼里透出凶光）谁在墙根底下装神弄鬼？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/enforcer_abiao@2x.png',
        activeSide: 'left',
        text: '（脸色煞白，急忙拦在巷口）阿彪！那是路过的野猫！东西我已经给你了，你赶紧撤！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '阿彪',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '野猫？踩水声当老子听不出来？！后面有人跟过来了是吧？兄弟们，出来把人堵住！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音刚落，围墙后猛地跳下三个双眼泛着凶光的打手，身后也窜出两个拿钢管的混混，把狭窄的小巷前后彻底堵死！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '徐老师快退后！这帮人是三号船的亡命徒！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师看着被围困的孩子们，眼眶泛红。她死死攥紧纸袋，竟然转身拉开防汛铁门，跃入了排洪道的黑影中！',
        sfx: 'sfx_suspense'
      },
      {
        id: 12,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '徐老师怎么往里跑了？！这帮家伙围上来了，大家背靠背，别被冲散！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '阿彪',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '哪来的毛孩子也敢坏三号船的大事？给我往死里打，扔进臭水沟喂鱼！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 14,
        speaker: '青眼搬运工',
        leftPortrait: 'assets/art/porter_blueeye@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（双眼泛着诡异的幽绿青光，面部肌肉僵硬如铁，沉重地拖着带血迹的铁撬棍砸在积水坑里，发出低沉闷吼）嗬……闯入禁区者……死……！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 15,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_command@2x.png',
        rightPortrait: 'assets/art/enforcer_abiao@2x.png',
        activeSide: 'left',
        text: '动我六8班的人，先问问小爷答不答应！抄家伙突围！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 16,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（捡起半截砖头掂了掂，声音发紧却半步不退）五个打手又怎样？咱们六8班六个人，还怕他们？！抄家伙上！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '恶煞阿彪率领手下前后包夹，唯有奋力突围！',
      buttonText: '【进入战斗 · 雨夜暗巷突围战】',
      battleId: 'ch21_battle1',
      isBattleTrigger: true,
      targetScene: 'ch21_scene_night_after'
    }
  },

  // s4: 泥泞雨水 · 遗落的交割单
  ch21_scene_night_after: {
    id: 'ch21_scene_night_after',
    title: '战后暗巷 · 冰冷的事实',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_night_rain@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿彪捂着被张希哲砸骨折的胳膊，在手下掩护下翻过铁栅栏狼狈逃走。混战后的小巷里，只剩下大家的喘息声。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（揉着青肿的手腕）哎哟……这帮家伙力气真大。{MC_NAME}，大伙儿都没受伤吧？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '我没事，多亏你刚才挡在前面。{ALLY_2_NAME}，你怎么了？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（手发抖，从积水里捡起一张硬纸）{MC_NAME}……看这个！刚才阿彪和徐老师交接时掉在地上的！',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（抹掉泥水辨认）这是……特种货柜提货单！船名是‘三号货轮’！时间是明晚八点，九号码头！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '等等！经手人签名……真是徐老师的字迹！那个徐字的回勾我绝不会认错！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（眼眶泛红）为什么会是徐老师？我爸为了这案子被停职……徐老师为什么要给走私船签字？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（按住{ALLY_2_NAME}的肩膀）别急，单凭一张纸不能定罪！[next]徐老师刚才看我们的眼神全是痛苦，她要是坏人，刚才直接让阿彪抓我们了！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '{MC_NAME}说得对，徐老师引开他们是在保我们。但明晚八点三号船靠岸，这是唯一能查清真相的机会。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '明晚八点，九号码头！我们去找徐老师问个水落石出！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '夜幕渐深，众人约定明晚齐聚江边九号码头。',
      buttonText: '【开启第二十二章 · 未来警徽】',
      targetScene: 'ch22_scene_pier_confrontation'
    }
  }
};
