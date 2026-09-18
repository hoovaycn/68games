/**
 * 第四章《参展名单》剧情脚本数据表
 *
 * 这一章要把三件事立起来：
 * 1. 参展阵容是谁，张希哲此刻不在场；
 * 2. 一年级小同学只是普通 NPC，但他的话把危险提前抖出来；
 * 3. 张希哲不是“以前也中过招”，而是这次第一次主动伸手，第一次被顶住。
 */

export const CHAPTER3_STORY = {
  ch3_scene_exhibition: {
    id: 'ch3_scene_exhibition',
    title: '区训练馆 · 参展名单',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_training_room.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '周五中午，学校把参加区里成果展的人都叫到了区训练馆彩排。馆里一股胶垫和灰尘混在一起的味道，老师们正拿着名单来回点人。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '这一场到的人很清楚：当前主角团、覃瑞怡、朱晏泽、徐老师、刘老师。张希哲被派去门口领参展胸卡和队旗，还没回来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default.png',
        rightPortrait: 'assets/art/zhuyanze_default.png',
        activeSide: 'left',
        text: '张希哲怎么还没回来？就领个胸卡而已，他不会又顺路去踢球了吧？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/qinruiyi_default.png',
        rightPortrait: 'assets/art/zhuyanze_default.png',
        activeSide: 'right',
        text: '他今天不敢。昨天才挨了徐老师一顿眼神杀，再摸鱼，队旗都得给他没收了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '别贫。今天人多眼杂，都把眼睛放亮点。尤其是来路不明的吃的喝的，谁递都不许接。',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '一年级小同学',
        leftPortrait: 'assets/art/grade1_student_default.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '那、那个……学长学姐……门口有个外校的大哥哥在发饮料，说喝了上台就不紧张，还说成绩也会变好……我没敢拿。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/grade1_student_default.png',
        activeSide: 'left',
        text: '你做得很对。现在就回教室，路上谁叫你都别停。把这件事当成没听过，知道吗？',
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '一年级小同学',
        leftPortrait: 'assets/art/grade1_student_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '知、知道了！那个大哥哥脸色好白，看着怪吓人的……我先走了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'left',
        text: '又是饮料。它们盯着的已经不只是我们学校了，是连这种区里活动都要往里钻。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default.png',
        rightPortrait: 'assets/art/zhuyanze_default.png',
        activeSide: 'left',
        text: '我去把张希哲拽回来。那人最好别正好碰上他，不然他那脾气，准得先顶上去。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音刚落，训练馆外忽然传来一声极闷的足球落地声，像有人把整口气都砸在了地上。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '那一声太重了，重得不像平时闹着玩。',
      buttonText: '【冲向门口】',
      targetScene: 'ch3_scene_gate'
    }
  },

  ch3_scene_gate: {
    id: 'ch3_scene_gate',
    title: '训练馆门口 · 第一次中招',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_training_room.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人冲出门口，只见训练馆台阶下围着几个穿外校校服的体育生。领头的那个人把一箱泛着冷光的饮料推到门边，笑得像在做好事。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '张希哲已经先一步拦在了他们前面，脚边压着足球，胸卡绳还斜斜挂在脖子上，像是刚领完东西转身就撞见了这一幕。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '魔化外校队长',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'left',
        text: '兄弟，别这么紧张。你们学校今天不是要参展吗？拿着，喝了上场不腿软，发力也稳。想护着队友的人，更该先把自己练硬一点。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'right',
        text: '少来这套。我们学校前阵子出事，就是因为这种鬼东西。你拿远点。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '魔化外校队长',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'left',
        text: '你真不想要？可你刚才不是还在想，自己要是能再强一点，就不用每次都等别人扑上来救场了吗？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '那句话像针一样扎进耳朵里。张希哲手指一僵，目光不自觉地落到了那瓶饮料上。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '张希哲',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'right',
        text: '上次我眼看着大家往前冲，自己却只能在后头干着急……如果我再强一点，是不是就能先护住别人了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'left',
        text: '张希哲！你发什么愣！那人就是在拱火，你别听！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/zhangxizhe_default.png',
        activeSide: 'left',
        text: '张希哲，后退！现在立刻！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '可等他再转过来时，眼睛里已经全是青光。他直勾勾盯着刚冲出来的众人，脸上一点认人的神情都没有，像是只剩下一个念头还在撑着他。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '他抬脚“咚”地一脚，把足球狠狠踢到主角脚边，自己则慢慢压低重心，摆出了进攻的架势。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_corrupted.png',
        activeSide: 'left',
        text: '不好，他这是第一次被顶住，整个人都还没学会往回挣。先把他按下来，再堵那箱饮料！',
        sfx: 'sfx_confirm'
      },
      {
        id: 13,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default.png',
        rightPortrait: 'assets/art/zhangxizhe_corrupted.png',
        activeSide: 'left',
        text: '我去盯那群外校的，别让他们拖着箱子跑。你们先救人！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitIds: ['xu_laoshi', 'liu_laoshi'],
      prompt: '徐老师和刘老师一前一后护住孩子们，准备先把张希哲从那股念头里拽回来。',
      buttonText: '【结阵迎敌】',
      battleId: 'ch3_battle1',
      isBattleTrigger: true
    }
  },

  ch3_scene_recover: {
    id: 'ch3_scene_recover',
    title: '训练馆门口 · 十几年前就有的影子',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_training_room.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '最后一个外校生被逼退后，门口终于安静下来。那箱饮料碎了一地，甜得发腻的味道从台阶一直漫到馆门口。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'left',
        text: '我……我刚才是不是冲你们来了？我只记得有人一直在我耳边说，只要我再强一点，就谁都不用再替我挡了。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/qinruiyi_default.png',
        activeSide: 'right',
        text: '你先闭嘴歇会儿吧。刚恢复就想逞能，真是一秒都不带停的。人回来就行，别的以后再算。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '那帮外校的嘴也够死，打成那样还只会念“教练说的”“赢了就值”。到底是谁先把这套话灌给他们的？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '这种话术我不是第一次听见。我们顺着这条线查，已经查了十几年了。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '十几年？这玩意儿不是最近才往学校里冒的吗？你是说，它以前就有？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/coach_sad.png',
        activeSide: 'left',
        text: '有。只是以前它不长这样，不叫这个名字。有人小时候靠它赢过，长大了没被拉回来，就会觉得那次赢是自己唯一的活路。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '所以现在站在门口递东西的人，可能以前也是被递东西的那一个。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刘老师没接话，只是弯腰从破掉的纸箱底下抽出一张旧得发黄的集训合照。照片角落里，一个神情阴郁的教练站在最边上，手里还拎着同样的饮料箱。',
        sfx: 'sfx_item_get'
      },
      {
        id: 10,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default.png',
        rightPortrait: 'assets/art/coach_sad.png',
        activeSide: 'left',
        text: '这人我见过。昨天那个外校队长被打醒的时候，嘴里一直念“教练”“旧训练馆”“每周五发货”。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '照片背面写着一个熟得刺眼的地址：城郊旧训练馆。那正是明天下午全员彩排前，会顺路经过的地方。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这一次，他们不打算再等着对方自己找上门。',
      buttonText: '【继续追查】',
      targetScene: 'ch4_scene_team_meeting'
    }
  }
};
