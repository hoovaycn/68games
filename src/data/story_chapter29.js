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
        text: '穿过狭窄的铁梯，大家冲上了三号船顶层的控制平台。江风裹着烟火味吹过，平台中央立着一台运转中的巨型控制台。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '一个穿着风衣的瘦削身影背对着众人站在栏杆前。听到脚步声，她慢慢转过身来。'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（看到安然无恙的海峰、徐老师和刘老师，整个人愣住了，眼泪夺眶而出）老徐……淑惠……海峰哥……你们……真的活着走出来了……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '（红着眼睛往前走了一步）阿瑶！我们全都知道了！二十年前水闸的事，孩子们都看见了！',
        highlight: true
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'right',
        text: '当年你根本不是贪图什么好成绩……是为了不让他们把毒手伸向我和淑惠，自己硬咽下去的！[next]你为什么一个字都不告诉我们？！自己一个人扛了二十年？！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（苦笑着拉开后颈的风衣衣领）告诉你们……？你们看这个……',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '众人倒吸一口凉气！阿瑶的后颈和脊椎上，深嵌着数枚发红光的金属钉，几根粗黑的数据缆绳正死死连在身后的控制台上！'
      },
      {
        id: 8,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '深红财团把我的神经和整座城市的监控网络锁在一起。我只要敢向你们透露一个字，高压电流就会立刻烧毁我的脑子，引爆所有毒药。我连死的资格都没有……',
        highlight: true
      },
      {
        id: 9,
        speaker: '刘老师',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'right',
        text: '（流着泪抱住她）所以你在咨询室里把孩子们送去二十年后的废墟……是为了让他们去未来寻找真相？！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 10,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '对。六8班的孩子骨子里最不服输。只要让他们看到那个荒凉的未来，他们就一定会想尽办法回来救你们！我拿自己的命当赌注……孩子们赢了。[next]你们活着……我这二十年的噩梦，总算醒了……',
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
        text: '滴——！滴——！『警告：检测到核心宿主情感波动超标！判定行为：反叛！启动强制覆写协议——抹杀个体意识！【因果裁决者】模式启动！』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '外置神经死锁柱',
        leftPortrait: 'assets/art/pillar_neural_lock@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（轰然从天台四周破土升起，粗壮的暗紫合金导电立柱缠绕着狂暴高压电弧，吸血光缆直插阿瑶后颈，全场回荡着刺耳电磁啸叫）滋滋……神经死锁激活！因果律能量强制抽引！神经脉冲电弧覆盖全场！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '主脑重装修复蛛',
        leftPortrait: 'assets/art/repair_spider@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（八只多关节机械螯足在立柱周围飞速爬动，前肢高温等离子焊枪喷吐绿光，金属机械音密集咔嗒作响）检测到立柱结构震颤……修复协议就位！等离子焊枪过载维持！阻击一切靠近者！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_corrupted_god_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（拼命抵抗着控制，痛苦大喊）快动手……！老徐……海峰哥……杀了我！它要控制我杀了你们……别手软！快开枪杀了我啊！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（咬牙举枪，手腕却在发抖）王八蛋！拿一个吃尽苦头的女孩子当傀儡……！！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '海峰叔叔别开枪！未来的我给过我控制图纸，主脑靠那四根通电柱供能，修复蛛在给它供血！先拆柱子和蜘蛛，就能把阿瑶阿姨完好无损救出来！六8班，动手！！',
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
        text: '在全员合力围攻下，最后一根控制柱轰然断裂！紫黑色的电光瞬间消散！',
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
        text: '控制盒被海峰一枪打爆！黑色电缆噼里啪啦断成数截，阿瑶身上的电流彻底熄灭，整个人从空中摔了下来。',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师和刘老师急忙冲上去，稳稳把她抱在怀里。'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'left',
        text: '（抱紧阿瑶，声音哽咽）接住了！阿瑶，没事了！控制全被打碎了！',
        highlight: true,
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '（虚弱地靠在怀里，喘着粗气）没用的……老徐，淑惠，你们快走……我体内的芯片连着整艘船的引爆装置……',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/ayao_adult_default@2x.png',
        activeSide: 'right',
        text: '主脑要抽取我的生命力引爆全城……杀了我吧……只要打死我，自爆就会停下……这是我唯一能替大家做的赎罪了……',
        highlight: true
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（走上前蹲下身子）赎罪？这二十年里你救了老徐、刘老师和海峰叔叔，还指引我们改写了未来！你从来都不是罪人！该赎罪的是害人的坏蛋！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '想用死来当解脱？今天只要六8班在，谁也别想丢下你不管！',
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
