/**
 * 第二十九章《失控的净化》剧情脚本数据表（第三幕 第9章）
 *
 * 流程结构：
 * - ch29_scene_throne_reveal: 冲上三号船顶层指挥舱，32岁的阿瑶站在机器中枢前，执意要抹掉全城的喜怒哀乐
 * - ch29_scene_neural_deadlock: 阿瑶执意启动全城净化，却被自己亲手搭的机器反噬，神经锁反客为主将她困住
 * - ch29_battle1: 斩断机器锁链之战（全员 VS 被机器吞没异化的【净化裁决者·永恒阿瑶】，击碎四根死锁神经柱）
 * - ch29_scene_break_chains: 击溃狂暴装甲，死锁神经柱尽断，阿瑶虚弱倒地，机器母体芯片陷入疯狂自爆绝境
 */

export const CHAPTER29_STORY = {
  // s1: 烈火控制台 · 孤注一掷的净化
  ch29_scene_throne_reveal: {
    id: 'ch29_scene_throne_reveal',
    title: '傍晚六点十分 · 三号船顶层天台指挥舱',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_eerie_revelation',
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
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '一个穿着风衣的瘦削身影背对着众人站在栏杆前。听到脚步声，她慢慢转过身来。'
      },
      {
        id: 3,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（看到安然无恙的海峰、徐老师和刘老师，唇角勾起一抹冷笑）老徐……淑惠……海峰哥……命可真大啊，连那场爆炸都没把你们送走。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '（红着眼睛往前走了一步）阿瑶！我们全都知道了！二十年前水闸的事，孩子们都看见了！',
        highlight: true
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '当年你根本不是贪图什么好成绩……是为了不让他们把毒手伸向我和淑惠，自己硬咽下去的！[next]你为什么一个字都不告诉我们？！自己一个人扛了二十年？！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（冷笑着扯开后颈的衣领，露出深嵌脊柱、泛着红光的金属骨钉）知道了又怎样？[next]二十年前我被逼得走投无路、一口一口吞下那罐毒药的时候，你们一个个都不在！现在跑来认错？晚了！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '众人倒吸一口凉气！阿瑶的后颈和脊椎上，深嵌着数枚发红光的金属钉，几根粗黑的数据缆绳正死死连在身后的控制台上！'
      },
      {
        id: 8,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（指向身后嗡鸣的机器）这台机器能顺着每个人的脑电波，把多余的、害人的情绪一点点抹掉。[next]我已经把它调到最大功率——今晚之后，全城的人都不会再为分数、为背叛、为穷困掉一滴眼泪！',
        highlight: true
      },
      {
        id: 9,
        speaker: '刘老师',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '（红着眼摇头）可你这么做，是想把满城的人都变成没有喜怒哀乐的提线木偶啊！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 10,
        speaker: '阿瑶',
        leftPortrait: 'ayao-adult',
        leftEmotion: 'default',
        rightPortrait: 'liu',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '提线木偶又怎样？！只要有喜怒哀乐，就会有背叛、有嫉妒、有像我一样被逼上绝路的人！[next]我要抹掉所有人的情绪，让这座城市再也没有痛苦——哪怕你们恨我，我也要把这件事做完！',
        highlight: true
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '机器中枢突然传出尖锐警报！',
      buttonText: '【警惕！机器过载警报】',
      targetScene: 'ch29_scene_neural_deadlock'
    }
  },

  // s2: 机器过载 · 沦为提线木偶
  ch29_scene_neural_deadlock: {
    id: 'ch29_scene_neural_deadlock',
    title: '控制台中央 · 刺耳的警报',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_street',
    dialogues: [
      {
        id: 1,
        speaker: '系统警报广播',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '滴——！滴——！『警告：净化能量过载！核心生命体征异常！机器强制维持最高输出——无法停止！』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '外置神经死锁柱',
        leftPortrait: 'pillar_neural_lock',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（轰然从天台四周破土升起，粗壮的暗紫合金导电立柱缠绕着狂暴高压电弧，光缆直插阿瑶后颈，全场回荡着刺耳电磁啸叫）滋滋……神经锁激活！净化能量强制抽取！神经脉冲电弧覆盖全场！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '机器重装修复蛛',
        leftPortrait: 'repair_spider',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（八只多关节机械螯足在立柱周围飞速爬动，前肢高温等离子焊枪喷吐绿光，金属机械音密集咔嗒作响）检测到立柱结构震颤……修复协议就位！等离子焊枪过载维持！阻击一切靠近者！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'ayao-corrupted_god',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（被电弧托上半空，非但不惧，反而笑得愈发狰狞）来吧！把一切都拿去！只要能把这座城洗干净，我这条命又算得了什么？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'default',
        rightPortrait: 'ayao-corrupted_god',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（脸色剧变，冲上前一步）阿瑶！你疯了！这台机器在把你当燃料烧，你难道看不出来吗？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '刘老师',
        leftPortrait: 'liu',
        leftEmotion: 'default',
        rightPortrait: 'ayao-corrupted_god',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（急得直跺脚）阿瑶，快停手！再这样下去，你和全城的人都会没命的！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（咬牙举枪，手腕却在发抖）王八蛋！这台机器连造它的人都吞……！！',
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 8,
        speaker: '{MC_NAME}',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: '{MC}',
        rightEmotion: 'default',
        activeSide: 'right',
        text: '海峰叔叔别开枪！未来的我给过我控制图纸，机器靠那四根通电柱供能，修复蛛在给它供血！先拆柱子和蜘蛛，就能把阿瑶老师完好无损救出来！六8班，动手！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '斩断机器锁链之战爆发！',
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
    bgm: 'bgm_victory',
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
      buttonText: '【走向控制台残骸】',
      targetScene: 'ch29_scene_break_chains'
    }
  },

  // s3: 死锁崩解 · 更深的神格化（战斗结束的假象 → 更深异化的开端）
  ch29_scene_break_chains: {
    id: 'ch29_scene_break_chains',
    title: '战后天台残骸 · 未曾停歇的轰鸣',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_shattered@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '最后一根控制柱轰然断裂！四道冲天的紫黑电光像被剪断的琴弦，齐齐崩散，粗大的黑色缆绳寸寸崩断，悬浮半空的阿瑶重重摔回平台。',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'xu-stealth',
        leftEmotion: 'cry',
        rightPortrait: 'ayao-corrupted_god',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（和刘老师发疯般冲上前，一把将阿瑶紧紧抱在怀里，眼泪直往下掉）抓住了！我们抓住你了！阿瑶，死锁全断了，你自由了！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '海峰警官',
        leftPortrait: 'haifeng-police',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（收起枪，抹了把满脸的黑灰，刚想松口气，却猛地一僵，竖起耳朵）等等！你们听——这机器……怎么还在嗡嗡地响？！',
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'ayao-corrupted_god',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（猛地甩开伸来的手，踉跄站起，双眼暗紫更盛）别碰我！[next]你们以为拆掉几根柱子，就能让我变回以前那个窝囊的苏晚吗？！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '阿瑶',
        leftPortrait: 'ayao-corrupted_god-machine',
        leftEmotion: 'default',
        rightPortrait: 'xu-stealth',
        rightEmotion: 'default',
        activeSide: 'left',
        text: '（仰天长笑，脊柱上的骨钉重新亮起更刺眼的红光）太晚了……机器早就和我长在了一起！它不把这满城的人心吃干净，是不会停下来的！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音未落，阿瑶周身腾起滔天的暗紫气浪！她的身影在电光中急剧膨胀、扭曲，一股远比第一形态更可怕的威压，正从控制台深处缓缓苏醒。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '那威压像一只从深渊里探出的巨手，一寸寸攥紧了每个人的心口——真正的净化主宰，即将降临。',
        highlight: true,
        sfx: 'sfx_suspense'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '第二十九章 终。真正的净化主宰，即将降临！',
      buttonText: '【开启第三十章 · 跨越百年的毕业礼】',
      targetScene: 'ch30_scene_second_form'
    }
  }
};
