/**
 * 第三十章《跨越百年的毕业礼》剧情脚本数据表（第三幕 第10章 全剧终章）
 *
 * 流程结构：
 * - ch30_scene_snack_crush: 终战序幕！主角当面掏出第一章留白至今的荧光怪零食——包装完好、封条未动，当面捏得粉碎！
 * - ch30_scene_three_generations: 三代同堂！1839林公浩然气、2046大号金色虚影托手、2026生还大人并肩，全员连携突击！
 * - ch30_battle1: 全剧终极大决战【斩断莫比乌斯环】（六8班全员 + 大人们联合突破境外资本终极主脑母体）
 * - ch30_scene_pull_to_mortal: 击碎神座，合力将求死的阿瑶从深渊母体中活生生拽回人间，因果闭环彻底粉碎！
 * - ch30_scene_epilogue_three_views: 总结式三重视角大结局（1839历史答卷、2026当下圆满、2046未来挥别）
 */

export const CHAPTER30_STORY = {
  // s1: 完好的零食 · 我们的答卷
  ch30_scene_snack_crush: {
    id: 'ch30_scene_snack_crush',
    title: '傍晚六点二十分 · 燃烧的三号船甲板',
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
        text: '阿瑶瘫坐在台阶前闭上眼睛，以为等待她的是终结痛苦的一枪。可走上前的，却是一只带着伤痕的小手。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{MC_NAME}站在她面前，伸手掏向自己的校服内兜。'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（掏出一个有些褶皱、但封条完好的塑料袋）阿瑶阿姨，你睁开眼看看。还认得这个吗？',
        highlight: true,
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（睁大眼睛，浑身一颤）这……这是在小卖部沈万廷偷偷塞给你们的……能考满分的荧光糖果？！三年了……你居然还留着？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（也愣住了）{MC_NAME}……你一次都没吃过吗？'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '我第一次数学考六十二分、被叫家长、被同学笑话的时候，确实想过吃它。看着别人轻轻松松拿满分，我也难过过。',
        highlight: true
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '但我一口都没咽下去！因为徐老师说过，考砸了擦干眼泪再做一遍就是了！人要是为了走捷径把良心卖了，考多少个满分也是个怪物！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '咔嚓一声！{MC_NAME}手掌用力，把发光的药丸硬生生捏得粉碎，残渣随江风散入水里！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（看着随风飘走的碎屑，眼泪止不住地流）不走捷径……哪怕考不及格，也绝不低头……原来当年我真的走错了路……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（一把拉起阿瑶）不晚！不完美的成绩，才是我们真实的人生！今天，六8班全员带你回家！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '地脉异动，终极魔神降临！',
      buttonText: '【迎接终极裁决主脑】',
      targetScene: 'ch30_scene_three_generations'
    }
  },

  // s2: 跨越时空的浩然气 · 三代同堂
  ch30_scene_three_generations: {
    id: 'ch30_scene_three_generations',
    title: '崩解的主脑核心前 · 奇迹的共鸣',
    bgType: 'cargo_top',
    bgImg: 'assets/backgrounds/bg_cargo_top_throne@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统警报广播',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『宿主彻底叛离！全域同化失败！启动终极毁灭程序：引爆底舱核心，抹除所有证据！！』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '甲板猛然裂开！巨大的主脑母体破壳而出，缠绕着高压电缆与金属装甲，狂暴的压迫感瞬间笼罩了整个甲板！',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '就在暗紫激光即将射出的刹那，{MC_NAME}口袋里的古罐残片突然泛起耀眼的金光！'
      },
      {
        id: 4,
        speaker: '林公浩然气',
        leftPortrait: null,
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '火光中，江风如怒涛翻滚，隐约传来百年前掷地有声的朗笑：『苟利国家生死以，岂因祸福避趋之！百年前未曾输，百年后亦不退！少年莫惧，浩然气常在！！』',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '金光将压迫感瞬间吹散！每个孩子握着工具的手上，仿佛多了一双满是老茧的大手轻轻托住。长大后的大号虚影在虚空中浮现，微笑着注视着他们！',
        highlight: true
      },
      {
        id: 6,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（端枪上膛，大吼一声）海峰在此！全员突击！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '徐老师＆刘老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（抄起铁管与工具并肩站立）六8班全体同学！最后一关，交卷了！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '全剧终局决战爆发！',
      buttonText: '【斩断莫比乌斯环】',
      battleId: 'ch30_battle1',
      isBattleTrigger: true,
      targetScene: 'ch30_battle1'
    }
  },

  // 终局战斗过渡占位（战后触发）
  ch30_battle1: {
    id: 'ch30_battle1',
    title: '战局结算 · 斩断因果',
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
        text: '机械主脑被彻底轰碎！三代同堂的执念撕碎了一切阴霾，循环被彻底打破！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '神座地基彻底塌陷！抢救阿瑶！',
      buttonText: '【合力抓紧阿瑶的手】',
      targetScene: 'ch30_scene_pull_to_mortal'
    }
  },

  // s3: 活生生拽回人间
  ch30_scene_pull_to_mortal: {
    id: 'ch30_scene_pull_to_mortal',
    title: '傍晚六点四十分 · 神座彻底坍塌',
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
        text: '伴随着轰然巨响，崩碎的金属残骸纷纷坠入江中。平台边缘塌陷，阿瑶脚下一空，整个人向后栽倒落向江面！',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（看着下方的江水，缓缓闭上双眼）噩梦总算结束了……大家……再见……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两道身影飞扑而出！徐老师和刘老师死死趴在边缘，两双手牢牢抓住了阿瑶的手腕！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师＆刘老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（咬紧牙关大喊）谁准你说再见了！二十年前弄丢了你，今天谁也别想从我们面前掉下去！！',
        highlight: true,
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 5,
        speaker: '{MC_NAME}＆{ALLY_2_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（孩子们全扑了上去，抱腰的抱腰，拽腿的拽腿）一、二——起！六8班拔河第一名可不是白拿的！给我拉上来啊啊啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '海峰警官一把搂住所有人，合力猛拽，硬生生把阿瑶拉回了甲板上！大家抱在一起又哭又笑，二十年的梦魇，在这一刻彻底消散。',
        highlight: true
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '晨曦降临老运河！',
      buttonText: '【见证崭新的黎明】',
      targetScene: 'ch30_scene_epilogue_three_views'
    }
  },

  // s4: 尾声 · 跨越时空的三重视角
  ch30_scene_epilogue_three_views: {
    id: 'ch30_scene_epilogue_three_views',
    title: '破晓清晨 · 所有人都在的未来',
    bgType: 'canal_dawn',
    bgImg: 'assets/backgrounds/bg_canal_dawn@2x.png',
    bgm: 'bgm_sad_melody',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【博物馆 · 历史的答卷】\n阳光透过玻璃穹顶照在展柜中央。被师生们找回并修复好的古青瓷罐静静陈列着，泛着温润的光泽。百年前的先辈守住了骨气，百年后的少年守住了本心。这份跨越百年的答卷，及格了。',
        highlight: true
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【当下 · 迟到的合影】\n学校操场上，海峰警官穿着新夹克，举着相机冲领奖台上的孩子们喊道：“张希哲！红领巾系正点！三、二、一，茄子！”医院花房里，阿瑶坐在长椅上，徐老师和刘老师把修好的老钢笔递回她手里，三人笑着抹去泪水，拍下了那张迟到二十年的毕业合照。',
        highlight: true
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【放学路上 · 告别与未来】\n放学铃声响起，十二岁的{MC_NAME}、{ALLY_2_NAME}、张希哲、覃瑞怡、朱彦泽、{ALLY_1_NAME}打打闹闹跑出校门。街角的夕阳下，长大后的他们微笑着比了个大拇指，随后化作金色的微光散在晚风里。那个绝望的未来已经消失，崭新的明天正在眼前。',
        highlight: true
      },
      {
        id: 4,
        speaker: '六8班异闻录',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『谨以此片，献给所有在及格线边缘挣扎过、却从未向捷径低头的少年们。』\n\n『——《六8班异闻录》 全剧终。』',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '《六8班异闻录》全剧终。感谢游玩！',
      buttonText: '【全剧终 · 返回标题主菜单】',
      targetScene: 'title_screen'
    }
  }
};
