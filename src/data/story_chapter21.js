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
        text: '新学期伊始，崇文楼三楼走廊格外喧闹，毕业班各班排成歪歪扭扭的长队。学校以“小升初考前身心减压普查”为由，专程从省脑科康复研究所请来了一位知名专家。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（趴在走廊栏杆上揉着后颈）喂，子骁（予诺），你们听说了吗？今天来坐诊的专家可神了，聊两句、看你画两笔，就能知道你晚上几点做梦。上学期钟楼折腾得我天天半夜抽筋，正好让她给瞧瞧。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（推眼镜冷哼）张希哲你少道听途说，那是现代认知神经心理学，不是街头算命！全班几十号人都要排队过筛，哪轮得到你第一个进去？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（紧紧攥着铅笔，嘴唇微微发白）可是……我昨晚又失眠了。自从从省城回来，我总觉得耳边有钟表滴答声……而且我爸最近天天在局里加班，昨晚打电话连声音都在发抖……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（伸手拍拍副官肩膀）别自己吓自己，海峰叔叔是老刑警了，肯定没事的。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（推开咨询室木门，目光停在两人身上）大家按学号安静排队。子骁（予诺）、文默（妍熹），你们俩上学期在省城受的心理应激反应最重，苏医生特意安排先给你们俩做疏导，跟我进来吧。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两人跟着徐老师迈进咨询室，木门在身后掩上。屋里没有消毒水味，反而飘散着清雅温润的药草茶香。宽大的原木书桌后坐着一位三十岁上下的女医生，身穿整洁白大褂，眼神温润如水。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（放下钢笔微笑着推过两杯热茶）请进，两位同学请坐。手这么凉，先捧着热茶暖暖身子。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '谢谢苏医生……其实我们身体挺好的，就是徐老师非让我们来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_concerned@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '徐老师是关心你们。刚才我看你们交上来的心理画测，画上的天空都涂了厚厚的乌云，还有一座很高很黑的钟楼。最近夜里……是不是老睡不踏实，总能听见滴答滴答像钟表一样的声响？',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 11,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: 'assets/art/su_wan_doctor_concerned@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'right',
        text: '（猛地抬头，手微微发抖）苏医生，您……您怎么看出来的？！我爸海峰警官最近又天天夜不归宿，说城北安全屋截获的电台老有怪杂音。上次我爸送检的那些化验样本，也是送到你们研究所吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_cold@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '样本的数据我已经看过了，残留成分只是些常见的有机酯类，没有毒性，别自己吓唬自己。大人的事情，交给我们这些大人来顶着。你们现在的任务，是踏踏实实读书、健健康康升学。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '苏晚医生拉开抽屉，取出一只古朴的青瓷罐，倒出两枚淡绿色的草本安神糖，轻轻递到两人掌心。薄荷的微凉伴着一股幽香散开，让人紧绷的神经瞬间放松了下来。',
        sfx: 'sfx_confirm'
      },
      {
        id: 14,
        speaker: '苏晚医生',
        leftPortrait: 'assets/art/su_wan_doctor_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '来，把安神糖含着，回去上自习吧。记住，如果哪天觉得心里太累了，这扇门随时为你们留着。',
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
    bgImg: 'assets/backgrounds/bg_counseling_room@2x.png',
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
        text: '（眼眶通红，捏着通报文件）徐老师！昨晚海峰带队封锁城西废弃水闸，那是省厅保密的收网行动！为什么海峰的人刚到外围，水闸里的走私贩提前整整十分钟全撤空了？！昨晚七点半有人用街角公用电话发了‘快走’，那个电话亭，就在你每天下班买菜经过的街口！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'right',
        text: '（脸色苍白，手指紧扣口袋）……刘老师，有些事情不是你想的那样。你不要再问了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（泪水夺眶而出）我不要再问？！二十年前阿瑶出事的时候，你也是这样一句话都不肯说！现在海峰因为这次行动扑空，已经被市局勒令停职配合调查了！那个电台里一直说的‘城里的新收件人’……到底和你有没有关系？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'right',
        text: '（眼底翻涌着极度痛苦与绝望，良久低哑开口）如果停职能保住海峰的命……那未尝不是一件好事。刘老师，上课铃要响了，去班里看着孩子们吧。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师没有回头，快步拉开门走向楼梯间。躲在转角墙后的张希哲和朱彦泽倒吸了一口冷气，赶紧把主角拉回阴影里。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '海峰叔叔被停职了？！刘老师刚才说……徐老师给坏人报信？！这怎么可能啊！徐老师平常连我们少写一个标点符号都要改，她怎么可能去干走私的勾当？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '但昨晚水闸的行动确实出了大漏子。市局上下雷霆大怒，说那是截获无线电后唯一一次抓现行的机会。如果不是绝对核心的内部路线泄露，对方绝不可能撤得那么干净。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '我不信徐老师会害海峰叔叔！从第一幕旧仓库到第二幕虎门，哪次不是徐老师拼了命护着我们？这里面肯定有天大的隐情！放学后大家别散，我们去徐老师每天走的那条老街看个究竟！',
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
    title: '晚上八点半 · 潮湿的水闸旧泥巷',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_night_rain@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '晚自习结束后，初春的细雨下得又急又凉。孩子们顶着书包，悄无声息地跟在徐老师身后。徐老师戴着深色鸭舌帽，风衣领口立得极高，脚步匆忙异常，一头扎进了通往城西废弃水闸的旧巷子。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（压低身子踩在碎石上）子骁（予诺）……看前面！徐老师停下了！那是通往水闸配电房的防汛铁门！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '昏暗的雨幕中，生锈的防汛铁门缓缓被推开一道缝隙。一个身材极魁梧、披着油布黑雨衣的男人探出半边身子，将一个厚重牛皮纸袋递给徐老师。徐老师低声交谈，将折叠的白纸塞回对方手里。',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '就在男人准备缩回铁门的一刹那，朱彦泽脚下一滑，踩瘪了一只半掩在泥水里的废易拉罐——咔嚓！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '阿彪',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（从雨衣下抽出一柄满是锯齿的沉重撬棍，三角眼里透出凶光）谁在墙根底下装神弄鬼？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/enforcer_abiao@2x.png',
        activeSide: 'left',
        text: '（脸色煞白，下意识挡住巷口）阿彪！那是路过的野猫！东西我已经给你了，按规矩你该撤了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '阿彪',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '野猫？老子在道上混了二十年，还分不清猫叫和球鞋踩水声？！带尾巴过来了是吧？兄弟们，出来清场！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音未落，围墙后翻下三个双眼泛着骇人青光的苦力，身后更窜出两个手持强光手电与钢管的黑衣暗哨，刺眼光柱瞬间将狭窄逼仄的小巷彻底堵死！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '徐老师！快过来！这帮人是三号船的亡命徒！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师站在铁门与巷口的交叉点，看着被围困的孩子们，眼眶泛红。她死死攥紧怀里的牛皮纸袋，竟然猛地一转身，拉开防汛铁门跃入了深不见底的水闸排洪道黑影中！',
        sfx: 'sfx_suspense'
      },
      {
        id: 11,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '靠！徐老师怎么真往里跑了？！这帮杂碎围上来了，大家背靠背，千万别被他们冲散了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '阿彪',
        leftPortrait: 'assets/art/enforcer_abiao@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '哪来的几个乳臭未干的毛孩子，也敢坏三号船的大事？今晚这水闸底下正好缺几个垫脚的冤魂，给我往死里打，扔进排洪渠喂鱼！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 13,
        speaker: '朱彦泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: 'assets/art/enforcer_abiao@2x.png',
        activeSide: 'left',
        text: '想动我六8班的同学？先问问老子答不答应！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '恶煞阿彪率领青眼苦力与暗哨前后包夹，唯有奋力突围！',
      buttonText: '【进入战斗 · 水闸暗巷突围战】',
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
        text: '阿彪捂着被张希哲砸骨折的右臂，咳着血在手下的掩护下狼狈翻过水闸铁栅栏逃窜。雨水哗哗冲刷着泥地，混战后的巷子里只剩下孩子们粗重的喘息声。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '朱彦泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（揉着青肿的手腕）哎哟我的妈呀……这帮家伙力气怎么跟牛一样大，手电筒晃得我眼睛到现在还发黑……子骁，你们都没挂彩吧？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_default@2x.png',
        activeSide: 'left',
        text: '我没事，多亏你刚才顶在前面。文默（妍熹），你脸色怎么这么难看？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（手指发抖，从积水里捡起一张硬卡纸）子骁……你们快过来看这个。这是刚才阿彪跟徐老师交接时掉在地上的。',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（擦掉泥浆辨认字迹）这是……长江内河集装箱特种货柜提货单！船名一栏写着‘三号货轮’！时间是……明天晚上八点，江边九号码头3号深水泊位！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '等等！收货人和放行签名那一栏……怎么会盖着‘崇文区教育督导办公室’的公章？！后面的经手人手签……那字迹……分明就是徐老师的笔迹！那个‘徐’字的最后一笔回勾，我天天在作业本上看见！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（眼泪在眼眶里打转）真的是徐老师……为什么会是她？我爸为了这起案子连家都不回，甚至被纪律处分停职……徐老师为什么要给走私的毒船签字背书？！她到底隐瞒了什么？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（按住副官颤抖的肩膀）不，不能只看一张纸就下结论！你们刚才看见徐老师看我们的眼神了吗？那不是做贼心虚，而是痛苦！如果她真的投靠了三号船，刚才大可以叫阿彪把我们全部抓起来！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '子骁说得对。徐老师把阿彪引开，反而是救了我们。但这张交割单就是铁证，明天晚上八点，三号船就会进港接货。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '明天晚上八点，九号码头！无论前面是刀山火海，我们都必须找到徐老师，把一切当面问个水落石出！',
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
