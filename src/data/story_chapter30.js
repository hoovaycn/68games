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
        text: '阿瑶跪倒在即将彻底崩塌的神座台阶前，泪流满面地闭上双眼，等待着最后一颗终结她痛苦生命的子弹。然而，走上前来的并不是握枪的大人，而是一双带着擦伤血痕、沾满泥土与烟灰的小手。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{MC_NAME}静静地站在她面前，伸手探入了自己校服贴心口的内兜。'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（从口袋里缓缓掏出一个被压得有些褶皱、但封口依然完好无损的透明塑料袋）阿瑶阿姨……你睁开眼睛看清楚。认识这个吗？',
        highlight: true,
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（猛地睁大泪眼，看清那个袋子的一瞬间，浑身剧烈颤抖，瞳孔放大到了极致）这……这是……第一幕沈万廷在学校小卖部偷偷塞给你们的……“超脑满分神药”荧光糖果？！整整三年了……你……你居然还把它带在身上？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（也愣住了，呆呆地看着那个包装袋）子骁（予诺）……你当年……一口都没吃吗？'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（迎着江面呼啸的夜风，当着阿瑶、两位老师和海峰叔叔的面，将那包散发着妖异荧光的零食高高举向夜空）我第一次数学考了六十二分，被叫家长、被隔壁班同学笑话的时候……我看着这包糖，确实动过歪心思；我看着别人毫不费力就能考一百分、拿着满分奖状耀武扬威的时候，我也恨过自己的笨拙和迟钝。',
        highlight: true
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '可是……我一口都没咽下去！哪怕我最难过、哭着在操场跑圈的时候，我都忍住了！因为徐老师在讲台上说过——卷子上的红叉可以重做，考砸了可以擦干眼泪再练！可人要是为了走捷径把自己的骨头和灵魂卖给魔鬼……就算你考了一万个一百分，也只是个披着人皮的冷血怪物！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '咔嚓——碎裂！{MC_NAME}五指猛然发力！伴随着一声清脆的爆裂声，那个被资本奉为神明的荧光药丸被少年狠狠捏成了漫天齑粉！幽绿色的荧光粉末在滚烫的夜风中飘散开来，彻底湮灭在滔滔江水之中！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（看着飘散在虚空中的粉末，整个人瘫软在地，二十年的压抑与悲伤如防洪堤决口般倾泻而出）不走捷径……哪怕考不及格……也绝不向魔鬼低头……原来……二十年前的我……真的走错路了……我以为我在保护所有人……可我把我自己……丢在了没有光明的下水道里……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 10,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '（伸手用力握住阿瑶冰冷颤抖的手，将她一把从台阶上拉起）不晚！阿瑶阿姨，一点都不晚！不完美的人生成绩单，才是我们活生生的答卷！今天——六8班全员，接你回家！！',
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
        text: '『核心指令遭宿主彻底背弃！判定全域意识同化失败！境外资本终极指令：引爆底舱地脉核心，将整座老城区与历史证据沉入江底！！』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '巨兽苏醒',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰隆隆隆隆——！！！神座后方的钢铁甲板轰然撕裂！一颗足有数米高的暗紫色量子主脑母体破甲而出，周身缠绕着无数条粗大的高压电缆与外星古器残片，化作一尊三头六臂、眼冒凶光的机械天梯神魔！狂暴的精神重力场如同一万座大山狠狠压下，压得所有人骨节咯咯作响！',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '就在那道灭世的暗紫激光即将扫灭众人的千钧一发之际！{MC_NAME}胸口贴着的古罐残片与林则徐手杖碎木，突然爆发出冲霄而起的纯阳烈焰！'
      },
      {
        id: 4,
        speaker: '林则徐虚影',
        leftPortrait: null,
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（漫天烈火之中，江面升腾起滚滚白色正气狂涛！百年前虎门滩头那尊头顶官帽、手握长剑的威严身影拂须长笑，洪钟般的声音回荡在天地之间）『苟利国家生死以，岂因祸福避趋之！尔等鼠辈，借夷毒祸我中华未成，复借巧术役我后生！后生莫惧！此浩然正气，绵延百载，尽付尔等！！』',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '未来覆手',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰！纯阳长风横扫而过，将狂暴的机械重力场硬生生逼退十米！与此同时，在每一个小号少年握紧刀棍棒球铲的手背上——一双双满是老茧、枪伤与血痕的成年人大手，悄无声息地温柔覆上！大号张子骁、大号范文默、大号何妍熹在虚空中并肩浮现，眼神从容、骄傲，且无怨无悔！',
        highlight: true
      },
      {
        id: 6,
        speaker: '海峰警官',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（右手单手换弹匣，咔嚓上膛，发出雷鸣般的怒吼）市公安局特警支队海峰！全员突击！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '徐老师＆刘老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（抄起断裂的铁管与教案夹，目光如矩，与全班孩子并肩而立）崇文实验小学六年级8班全体同学！人生最硬的一道大题……交卷的时刻到了！！',
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
        text: '万物天梯裁决核心彻底轰碎！三代同堂的浩然之火冲天而起，莫比乌斯环被彻底斩断！',
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
        text: '轰隆隆隆隆——！！！随着最后一记凝聚了跨越三个世纪意志的全力重击，那颗庞大扭曲的暗紫色量子核心轰然爆裂，化作无数燃烧的废铁碎片，伴随着滚滚浓烟倾泻坠入长江之中！狂暴的冲击波瞬间撕裂了货轮的天台平台，神座地基彻底塌陷！站在边缘的阿瑶脚下一空，被狂暴的逆流吸力卷向了数万米高空的万丈深渊！',
        sfx: 'sfx_disaster_fire'
      },
      {
        id: 2,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_adult_default@2x.png',
        rightPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        activeSide: 'left',
        text: '（长发在夜风中飞散，看着深不见底的滚滚江水，嘴角却露出一抹前所未有的安详微笑，缓缓闭上了眼睛）结束了……所有的噩梦……都结束了……大家……再见……',
        sfx: 'sfx_sad_melody'
      },
      {
        id: 3,
        speaker: '飞身扑救',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '呼——！两道黑影几乎同时不顾一切地狂扑而出！徐老师和刘老师死死趴在断裂的钢梁边缘，双臂向前探出，四只满是烫伤与血痕的手，凌空死死抓住了阿瑶的两只手腕！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师＆刘老师',
        leftPortrait: 'assets/art/teacher_xubox_stealth_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（手臂青筋暴起，几乎被下坠的惯性带飞出甲板，却咬着牙哭喊出声）谁准你再见了！！阿瑶！二十年前我们弄丢了你一次！今天就算把我们的肩膀扯脱臼……也休想再从我们面前跳下去！！',
        highlight: true,
        sfx: 'sfx_dialogue_important'
      },
      {
        id: 5,
        speaker: '{MC_NAME}＆文默',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '（全班七个孩子像一条锁链一样，一个个飞扑上前，抱腰的抱腰，拽腿的拽腿，小脸憋得通红）一、二——起！！六8班拔河第一名不是吹出来的！！给我——拉上来啊啊啊啊！！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '海峰警官咆哮着冲上，粗壮的手臂一把揽住所有人的腰身！十几双满是血泡、泥土与老茧的手，硬生生顶着江风的怒号，将那个在冰冷地狱里挣扎了二十年的学霸阿瑶，活生生地拉回了满是人间烟火与温热体温的甲板上！三个人抱在一起，眼泪止不住地砸在滚烫的钢板上。二十年的血泪与诅咒……在这一刻彻底灰飞烟灭。',
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
        text: '【视角一：回望一八三九年（历史的答卷）】\n省博物馆内，晨曦透过高大明亮的玻璃穹顶，静静洒在展厅中央的主展柜上。那尊由六8班师生合力寻回、经过专业文保团队修复完好的古青瓷罐，在朝阳下泛着温润而坚毅的青玉色泽。玻璃展柜上，依稀倒映出百年前虎门滩头滚滚销烟散尽后，林则徐欣慰抚须的温和笑容。百年前的先烈，未曾让鸦片亡其家国；百年后的少年，亦未曾让心魔吞其热血。这份跨越两个世纪的答卷，及格了。',
        highlight: true
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【视角二：回望二零二六年九月（当下的圆满）】\n原本在另一条凄惨时间线上应当变成冰冷烈士纪念碑的海峰警官，此刻正穿着一件并不合身的新夹克，站在学校操场的领奖台下，满脸憨笑地举着老式单反相机，对着台上的孩子们大喊：“后面的张希哲！别做鬼脸！红领巾系正点！三、二、一，茄子！”\n市中心医院阳光花房里，温暖的晨光洒在长椅上。三十多岁的阿瑶穿着整洁柔软的针织衫坐在轮椅上，头发重新梳成了二十年前清爽的双麻花辫。徐老师和刘老师把那支修好的断尖旧钢笔塞回她手里，三十多岁的三个人抱头痛哭，终于拍下了那张迟到了整整二十年的初中毕业合照。',
        highlight: true
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '【视角三：回望二零四六年（未来的挥别）】\n夕阳西下，放学铃声清脆悠扬地传遍长街。十二岁的张子骁、石予诺、范文默、何妍熹、张希哲、覃瑞怡、朱彦泽、张瀚瑜、陈品璇，勾肩搭背、嬉笑打闹着冲出校门。“张希哲！你刚才踢球把徐老师的花盆砸了，明天等着写检查吧！”“怕什么！大不了我把早饭的鸡蛋灌饼分她一半！”',
        highlight: true
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '在街角温暖的逆光微尘中，依稀浮现出2046年那群满身伤痕的32岁大号自己的虚影。他们身上带血的旧警服和战术风衣渐渐变得柔和透明。大号张子骁微笑着向十二岁的自己比了一个帅气的大拇指，随后从容、安心地化作漫天金色的蒲公英，彻底融化在温暖的晚风里。因为他们深知，那个冰冷绝望的2046年已经彻底死去了；而眼前的这群少年，正大步奔向一个所有人都在、阳光灿烂的崭新未来。',
        highlight: true
      },
      {
        id: 5,
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
