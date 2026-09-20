/**
 * 第九章《从前那一班（下）》剧情脚本数据表
 */

export const CHAPTER8_STORY = {
  ch8_scene_warehouse: {
    id: 'ch8_scene_warehouse',
    title: '旧仓库外 · 顺线摸过去',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶走后，两个小姑娘没有停。她们每打倒一个发狂的同学，等对方恢复神智，就抓着人家的胳膊追问一句“谁给你的、在哪拿的”，顺着那些零零碎碎的指认，一路从学校摸到了城郊旧仓库。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '清醒过来的同学',
        leftPortrait: null,
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'right',
        text: '我、我看见他们往那边搬箱子……一个破仓库，有个穿花西装、戴金链子的男的，大家都叫他哥……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'left',
        text: '走，过去看看。阿瑶肯定也在那儿。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'right',
        text: '这次不对劲。他们不是小打小闹，是成箱成箱地往各个学校送，背后肯定有个大组织。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两个人趴在仓库窗户边往里看，装满异化零食的纸箱子堆得老高，不同学校校服的学生进进出出搬货。那一刻她们第一次意识到：这根本不是一两个小贩，而是一张看不见的大网，正系统地往整个城市的毕业班送这些东西。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '如果真是这样，就算我们今晚砸了这一个仓库，外面肯定还有别的供货点。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'left',
        text: '先别管几处。阿瑶还在里头，我就先把眼前这扇门砸开。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '可她们刚摸到仓库最深处，就已经被人看见了。',
      buttonText: '【闯进仓库深处】',
      targetScene: 'ch8_scene_confront'
    }
  },

  ch8_scene_confront: {
    id: 'ch8_scene_confront',
    title: '仓库深处 · 打赢了也抓不住',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_warehouse_inner@2x.png',
    bgImgFallback: 'assets/backgrounds/bg_warehouse@2x.png',
    bgm: 'bgm_gojira_battle',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '仓库最里面站着个穿花西装、戴墨镜挂金链子的男人，半张脸都埋在阴影里。那一身江湖骗子般的打扮，透着一股让人极不舒服的市侩与凶狠。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '花西装男人',
        leftPortrait: 'assets/art/mystery_man_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '两个黄毛丫头也敢闯老子的场子？这城里多少家长排着队求我给货！只要卷子上的分是真的，谁管你怎么考出来的？识相的滚远点！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_default@2x.png',
        activeSide: 'left',
        text: '阿瑶呢？你们给她吃了什么鬼东西？！把她交出来！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '花西装男人',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_default@2x.png',
        activeSide: 'right',
        text: '交出来？那是她自己伸手拿的！等你们长大了就知道，没人会在乎你遭了什么罪，所有人只看你爬得有多高！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_default@2x.png',
        activeSide: 'left',
        text: '少拿这种鬼话骗人！把要考试的小孩当牲口灌药，今天非把你这破地方砸了不可！',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '花西装男人冷笑一声猛一挥手，周围那些神情呆滞、眼冒青光的学生立刻全扑了上来。两个小姑娘咬紧牙关，硬生生把仓库深处杀出一条路！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这一次，她们终于摸到了真正藏在后面的那只手。',
      buttonText: '【压到他逃跑】',
      battleId: 'ch8_battle1',
      isBattleTrigger: true
    }
  },

  ch8_scene_after: {
    id: 'ch8_scene_after',
    title: '仓库门口 · 她不跟你们走',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '花西装男人的异化形态刚被打崩，仓库外忽然传来警车的声音。有人报了警。等两个小姑娘想冲上去抓人时，那男人已经借乱翻窗逃了，地上只留下几包散落的异化零食。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她们顾不上追，转身就往仓库门口跑。阿瑶就站在那片晨光里，眼睛依然泛着冷幽幽的青光，神情平静得可怕。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'left',
        text: '阿瑶！架打完了，那帮坏蛋全跑了！你清醒一点，快跟我们回去找大夫！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '回去？回到那个永远只能看着你们发光的角落吗？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '你们永远那么耀眼，那么正义。可你们根本不懂，每天晚上写卷子写到吐，却还是只能垫底的感觉！我不想要你们的同情，我要的是分数！是考第一！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'left',
        text: '可是阿瑶……你说过，我们要一起毕业，一起去海边看日出的啊！分数真的比我们还重要吗？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '是！比你们重要一万倍！现在我爸妈以我为荣，老师拿我当榜样。和这些比起来，你们所谓的“朋友”游戏，简直幼稚得可笑。',
        highlight: true,
        sfx: 'sfx_unit_down'
      },
      {
        id: 8,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '别再来找我了。看到你们这副自以为是的样子，只会让我觉得恶心。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿瑶那冰冷、厌恶的眼神，像一把最钝的刀，狠狠绞碎了两个小女孩的世界。她转身走向了那片阴暗的巷子，头也不回。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（浑身是血地瘫坐在地，死死抓着衣角）……为什么……我们明明拼了命打赢了……为什么救不回她……',
        sfx: 'sfx_unit_down'
      },
      {
        id: 11,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（眼泪砸在满是淤青的手背上，声音止不住地发抖）是我没拉住她……是我们太自以为是了……如果连最好的朋友都救不了，我们打赢了又有什么用……',
        sfx: 'sfx_unit_down'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '等大人们冲进仓库时，证据早已被扫得干干净净。两个浑身是伤的小学生声嘶力竭的哭喊，被当成了打架斗殴后的狡辩，根本没有一个大人相信。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '那天清晨，她们不仅失去了最好的朋友，也永远失去了童年的天真。那道无法愈合的溃疡，逼着她们在接下来的二十年里，发疯般地追查着那条吞噬了阿瑶的黑暗产业链。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_school_night@2x.png',
        text: '回忆如同潮水般缓缓褪去。当视线再次聚焦时，昏暗的仓库已然消散，眼前是现实中被晨光唤醒的学校器材室。门外传来了急促的拍门声与喧闹的人声——大考的日子，终于到了。',
        bgm: 'bgm_suspense',
        sfx: 'sfx_confirm'
      },
      {
        id: 15,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_school_night@2x.png',
        text: '当年我们拼了命打赢了，可什么都没能真正拦住。领头给货的人翻窗跑了，而我们要救的人……用最决绝的方式刺了我们一刀。这个轮子转了二十年，还是转到了你们这一届。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 16,
        speaker: '徐老师',
        leftPortrait: 'assets/art/adult_xu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        bgImg: 'assets/backgrounds/bg_school_night@2x.png',
        text: '这二十年里，每一次闭上眼，我都还能看见阿瑶走入黑暗的背影……但这一次，你们不再是孤军奋战。把当年的遗憾……彻底做个了断吧！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '没有再喘口气的时间了。大考已经开始往眼前走。',
      buttonText: '【迎向大考】',
      targetScene: 'ch9_scene_exam'
    }
  }
};
