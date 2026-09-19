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
        text: '阿瑶走后，两个小姑娘没有停。她们每救醒一个异化同学，就抓着人家的胳膊追问一句“谁给你的、在哪拿的”，顺着那些零零碎碎的指认，一路从学校摸到了城郊旧仓库。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '被救醒的同学',
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
    bgImg: 'assets/backgrounds/bg_warehouse@2x.png',
    bgm: 'bgm_gojira_battle',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '仓库最里面站着个穿旧西装、戴墨镜挂金链子的男人，半张脸都埋在阴影里。那张脸和今天家长会带头起哄的人像得让人头皮发麻，像是同一种表情隔了二十年又长回来了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '幻境坏家长',
        leftPortrait: 'assets/art/mystery_man_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '分数就是一切！考不上重点，你们这辈子就完了！吃吧，吃了就能拿第一！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_default@2x.png',
        activeSide: 'left',
        text: '阿瑶呢？你们给她吃了什么？',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '幻境坏家长',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_default@2x.png',
        activeSide: 'right',
        text: '你们懂什么？只要能把分数提上去，这点代价算什么？等你们长大了就知道，没人会问你分数是怎么来的，他们只看你站得有多高！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        activeSide: 'left',
        text: '你把一群要考试的小孩当货架前的客人，还说不是逼？',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '幻境坏家长抬了抬手，周围那些异化学生立刻全扑了上来。两个小姑娘拼着一整夜剩下的最后一点劲，硬生生把仓库深处打出一条路。',
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
        text: '幻境坏家长的异化形态刚被打崩，仓库外忽然传来警车的声音。有人报了警。等两个小姑娘想冲上去抓人时，那男人已经借乱翻窗逃了，地上只留下几包散落的异化零食。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她们顾不上追，转身就往仓库门口跑。阿瑶就站在那片天光里，眼睛还是青的，却没有失控，站得很稳，表情甚至平静得有些可怕。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'left',
        text: '阿瑶！我们打赢了！快跟我们走，我们能把你喊醒！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '我没疯，我清醒得很。我本来就想变成这样。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '我考了第一，我爸妈终于不骂我了，老师都夸我，所有人都喜欢我。我不需要你们救。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'left',
        text: '你看看我们！你以前不是这样的！你说过要跟我们一起毕业的！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '那是以前的我不懂事。你们别再来找我了。',
        highlight: true,
        sfx: 'sfx_unit_down'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她说完就顺着仓库后面的小路走了，没回头。等大人冲进仓库时，证据已经被扫得差不多了，两个小姑娘说的话，没人信。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她们打赢了架，放跑了坏人，连最好的朋友，都主动选择留在了那边。这就是刘老师和徐老师记了二十年的遗憾。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '画面一抖，器材室的门外又传来“咚咚咚”的撞门声。天亮了，外头是大考当天的太阳光，那些夜里还眼冒青光的同学，正揉着眼睛，迷迷糊糊地往各自考场走。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '当年我们打赢了架，可什么都没拦住。Boss 跑了，我们要救的人，自己不想回来。这个轮子转了二十年，还是转到了你们这一届。这一次……换你们。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '这一次……换你们。',
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
