/**
 * 第二十九章《求死的神明》剧情脚本数据表（第三幕 第9章）
 *
 * 流程结构：
 * - ch29_scene_throne_reveal: 冲上三号船顶层指挥神座，32岁的阿瑶站在神经中枢前，看着全员生还的昔日老友与孩子们，露出久违的释然泪水
 * - ch29_scene_neural_deadlock: 真相大白！阿瑶假扮苏晚医生放逐少年是孤注一掷的救赎豪赌；境外主脑监测到叛逃，强行激活脊椎神经死锁并接管身躯
 * - ch29_battle1: 拯救神明之战（全员 VS 境外主脑强行接管异化的【因果裁决者·永恒阿瑶】，击碎四根死锁神经柱）
 * - ch29_scene_break_chains: 击溃狂暴装甲，死锁神经柱尽断，阿瑶虚弱倒地，主脑母体芯片陷入疯狂自爆绝境
 */

export const CHAPTER29_STORY = {
  // s1: 烈火神座 · 孤注一掷的豪赌
  ch29_scene_throne_reveal: {
    id: 'ch29_scene_throne_reveal',
    title: '傍晚六点十分 · 三号船顶层天台指挥舱',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_sad_melody',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '顺着旋转铁梯一路狂奔，众人撞开了通往货轮最高处的天台铁门。狂暴的江风卷着底舱升腾的炽热烟尘，吹拂着平台中央那张巨大的机械神座。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '神座前，那个身穿黑色长风衣的清瘦女子正背对着众人凭栏而立，夜风猎猎撕扯着她的衣角。听到身后杂乱沉重的脚步声，她缓缓转过身来。'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（当目光穿过滚滚硝烟，落在满身焦黑但活生生站着的海峰、徐老师与刘老师身上时，那双沉寂了二十年的冰冷双眸突然剧烈颤抖，眼泪毫无预兆地汹涌决堤）老徐……淑惠……海峰哥……你们……真的从底舱走出来了……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '（往前踉跄走了两步，双拳握得骨节发白，声音嘶哑哽咽）阿瑶……我们都知道了！天梯塔底下的全息录像……二十年前老街仓库的真相……孩子们全都看到了，我们也全明白了！',
        highlight: true
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '当年那包散发着荧光毒素的假药……你根本不是为了虚荣去争第一名……你是为了不让那帮畜生把药下在我和淑惠的饭盒里……自己硬生生吞下去的！！阿瑶……你为什么一个字都不跟我们说？！为什么要把我们当傻子……自己一个人在泥潭里熬了二十年？！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（惨笑着摇了摇头，反手一把扯开了自己颈后高耸的风衣领口，露出触目惊心的后背）跟你们说……？你们看这里……',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人倒吸一口凉气！在阿瑶白皙瘦削的后颈到整条脊椎上，整整齐齐地钉着七枚闪烁着幽冷红光的钛合金骨钉！数根拇指粗细的黑色神经缆绳如同吸血水蛭般深深扎入她的脊髓神经束，另一头死死锁死在货轮顶层的境外主脑核心中！'
      },
      {
        id: 8,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '这是境外资本“深红财团”在我身上烙下的“神经逆反必死锁”。他们用这套设备把我和全城地下光缆的脑波阵列绑定在一起……只要脑海中浮现出半分向警察或你们求救的念头，中枢电极就会在0.1秒内释放十万伏特高压把大脑烧成焦炭，引爆全城催化剂。老徐……淑惠……我连自杀的权力都没有……只能戴着苏晚的面具，像个孤魂野鬼一样游荡……',
        highlight: true
      },
      {
        id: 9,
        speaker: '刘老师',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'right',
        text: '（捂着嘴泪如雨下，心疼得浑身发抖）所以……在心理咨询室里……你故意泡茶试探孩子们……故意撕开时空裂隙把他们扔进二十年后的废墟……那都是你计划好的？！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 10,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '不错。这是我在这副残破躯壳里，唯一能为你们下的最后一局生死豪赌。我知道十二岁的六8班骨子里流淌着最纯粹的倔强与浩然正气；只要把他们送去那个满目疮痍的未来，未来的他们就绝不会放弃拯救大人的希望；他们会找到警徽与芯片，改写爆炸因果！我拿我这条生不如死的命当赌注……好在……孩子们赢了。老徐、淑惠、海峰哥……你们活着……我二十年的噩梦……终于可以醒了……',
        highlight: true
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '主脑中枢突然传出尖锐警报！',
      buttonText: '【警惕！防反叛协议激活】',
      targetScene: 'ch29_scene_neural_deadlock'
    }
  },

  // s2: 防反叛协议 · 沦为提线木偶
  ch29_scene_neural_deadlock: {
    id: 'ch29_scene_neural_deadlock',
    title: '神座中央 · 刺耳的警报',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_shock_sting',
    dialogues: [
      {
        id: 1,
        speaker: '系统警报广播',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '滴——！滴——！滴——！突兀至极的尖锐电子音撕裂了夜风！神座顶端的深红色全息眼球疯狂转动：『严重警告：检测到001号宿主阿瑶情感共振超标！判定行为：主动串通通缉人员，触犯资本绝对忠诚法案！激活二级死锁强制覆写协议——就地格式化宿主全部人格记忆！抹杀个体意识！【因果裁决者·永恒阿瑶】歼灭模块——启动！！』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '狂暴异化',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰隆隆隆隆！神座四周升起四根漆黑如墨的合金导电立柱，数以万计的暗紫色高压电弧如同狂暴的狂蟒，顺着神经光缆狠狠灌入阿瑶的脊椎！阿瑶整个人被凌空悬吊而起，周身腾起冲天的黑紫色煞气，眼白瞬间被深黑的数据流彻底吞噬！',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_corrupted_god_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（用残留的最后一丝清明意识，死死抠着自己被电击焦糊的双臂，眼角淌下暗红的血泪，爆发出凄厉欲绝的惨叫）快动手……！！老徐……海峰哥……子骁……动手杀了我！！主脑在改写我的脑神经……它要把我变成杀光你们的傀儡战神！！别手软……一枪打爆我的头！！让我死在这座甲板上……让我堂堂正正地作为崇文实验小学的学生去死啊啊啊啊！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（咬碎钢牙，端起手中的92式防暴手枪，手腕却在剧烈颤抖）混账东西！拿一个受尽苦难的女人当提线木偶……！！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（猛地横身拦在海峰枪口前，眼中满是不屈的烈火）海峰叔叔！不能开枪！大号文默把阿瑶的神经图纸交给我了！主脑的力量全靠那四根插在甲板上的“死锁神经柱”供能！只要把那四根死锁柱砸碎，就能切断主脑对阿瑶阿姨的控制！六8班全员——拔出武器！我们把阿瑶阿姨从魔鬼手里抢回来！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '斩断神明枷锁之战爆发！',
      buttonText: '【击碎四根死锁神经柱】',
      battleId: 'ch29_battle1',
      isBattleTrigger: true,
      targetScene: 'ch29_battle1'
    }
  },

  // 战斗过渡场景占位（战后触发）
  ch29_battle1: {
    id: 'ch29_battle1',
    title: '战局结算 · 斩断锁链',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_confirm',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '最后一根充斥着暴虐电弧的死锁神经柱在全员合力猛攻下分崩离析！神经中枢断裂，暗紫电光轰然溃散！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '上前抢救阿瑶！',
      buttonText: '【走向神座残骸】',
      targetScene: 'ch29_scene_break_chains'
    }
  },

  // s3: 死锁崩解 · 最后的执念
  ch29_scene_break_chains: {
    id: 'ch29_scene_break_chains',
    title: '战后神座残骸 · 最后的执念',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '砰！轰隆————！随着海峰精准的一枪打穿最后一根神经死锁柱的控制盒，四道冲天而起的紫黑电光如同被剪断的琴弦，轰然溃散！粗大的黑色缆绳寸寸崩断，自阿瑶后颈的骨钉中猛烈喷溅出灼热的白色冷却液！',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '悬浮在半空中的单薄身躯终于失去支撑，像一片凋零的枯叶般直直下坠。徐老师和刘老师发疯一样冲上前去，稳稳将她抱在了怀中。'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（双臂紧紧搂着满脸冷汗与泪痕的昔日同窗，眼泪砸在她灰白的嘴唇上）抓住了！我们抓住你了！阿瑶！你自由了！死锁全碎了！！',
        highlight: true,
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '（虚弱地倒在徐老师怀里，大口大口地喘息着，嘴角渗出血沫，眼神却依旧写满了深不见底的绝望）没用的……老徐……淑惠……你们别管我了……那七枚钉在我脊柱上的死芯片……连接着底舱深处的“天梯主脑母体”……',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '母体已经启动了全域自爆……哪怕死锁断了，它也会强行抽取我的生命力，引爆江底埋藏的全部精神催化剂……整座城市……几百万孩子……都会在今晚沦为没有灵魂的满分机器……子骁……海峰哥……杀了我吧……只要一枪打爆我的心脏，母体感应不到生命体征……自爆和同化就会停止……这是我……唯一能替你们所有人……做出的赎罪了……',
        highlight: true
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（一步步走到阿瑶面前，缓缓蹲下身子，单手按在自己胸口内衬口袋上，眼神坚定得像两座巍峨的山峦）赎罪？阿瑶阿姨，这二十年里，你救了老徐，救了淑惠，救了海峰叔叔，还把我们送到未来改写了一切！你从来就不是罪人！该向这座城市下跪赎罪的，是那帮藏在暗处吃人不吐骨头的资本畜生！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '想用死来当英雄？今天只要有我们六8班在……你连死的资格都没有！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '第二十九章 终。六8班准备打响终极答卷之战！',
      buttonText: '【开启全剧终章 · 跨越百年的毕业礼】',
      targetScene: 'ch30_scene_snack_crush'
    }
  }
};
