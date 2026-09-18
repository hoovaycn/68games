/**
 * 第八章《从前那一班（上）》剧情脚本数据表
 */

export const CHAPTER7_STORY = {
  ch7_scene_flashback: {
    id: 'ch7_scene_flashback',
    title: '器材室里 · 很多年前也是这样',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_school_night.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '别以为我们小时候就比你们强。第一次见这东西的时候，我和刘老师也才快毕业，连怎么救人都不懂。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '刘老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'right',
        text: '那时候我们甚至不知道，它到底是零食的问题，还是人心里本来就有一道缝。只知道一到大考前，总有人特别容易被那句“再赢一点”勾走。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她的话音一落，器材室里那点昏黄的光像被谁一把拽远了。视线一白，再落下来时，眼前已经是一间冷得发蓝的旧教室。',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '很多年前的粉笔字，正歪歪扭扭浮在黑板上。',
      buttonText: '【看见那段过去】',
      targetScene: 'ch7_scene_old_classroom'
    }
  },

  ch7_scene_old_classroom: {
    id: 'ch7_scene_old_classroom',
    title: '很多年前 · 旧教室',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_classroom_old.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '黑板上用粉笔歪歪扭扭写着“距离毕业考还有 30 天”。画面冷得发蓝，像素颗粒粗得像老录像带。教室门口站着两个快毕业的小姑娘，手心全是汗。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default.png',
        rightPortrait: 'assets/art/young_liu_default.png',
        activeSide: 'left',
        text: '你站我后面。不对劲，我先过去看。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_xu_default.png',
        rightPortrait: 'assets/art/young_liu_default.png',
        activeSide: 'right',
        text: '你少来，每次都想一个人往前顶。要死一起死，别把我撂下。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她们俩是六八班最要好的朋友。一个最能扛，一个最机警。还有第三个人，没在门口，而是正从最后一排抱着作业本跑过来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '阿沅',
        leftPortrait: 'assets/art/ayuan_default.png',
        rightPortrait: 'assets/art/young_xu_default.png',
        activeSide: 'left',
        text: '你们俩又想丢下我？我作业都没收完呢，出什么事了？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阿沅是全班雷打不动的第一名，双麻花辫垂到胸前，笑起来有梨涡，谁忘带钢笔她都笑着递过去，脾气好得不像话。三个人平时总挤在一张桌上写卷子，像怎么都拆不开。',
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '可今晚的走廊不一样。灯一闪，一个异化学长直挺挺站在门外，眼睛泛着青光，嘴里反复念着公式，像根本看不见眼前的人。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default.png',
        rightPortrait: 'assets/art/young_liu_default.png',
        activeSide: 'left',
        text: '先把人拉开。实在不行，就先挨着打。',
        sfx: 'sfx_confirm'
      },
      {
        id: 9,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_xu_default.png',
        rightPortrait: 'assets/art/young_liu_default.png',
        activeSide: 'right',
        text: '那时候我们根本不会什么“喊醒”。打倒了，对方醒过来也只会捂着脑袋问：我怎么会在这儿。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她们打了一整晚，跑遍了整栋教学楼。见到异化的同学就试着救，一路打到楼下找大人帮忙，可传达室大爷隔着门根本不信。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '传达室大爷',
        leftPortrait: null,
        rightPortrait: 'assets/art/young_xu_default.png',
        activeSide: 'right',
        text: '去去去，两个小丫头片子复习疯了吧？什么眼睛发光，我看你们是想考试想魔怔了，快回宿舍去！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default.png',
        rightPortrait: 'assets/art/young_xu_default.png',
        activeSide: 'left',
        text: '没用的，他们不信。我们自己查。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '也是在那一晚，她们第一次在教室最后一排看见一个像家长又像老板的男人，正把一箱箱东西往窗边堆。他没解释，只在走前丢下一句：总会有人愿意为结果买单。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '天快亮的时候，当年给体校学生发饮料的教练，带着几个异化的高年级学生堵在了教室门口。两个小姑娘已经打了一整夜，连抬手的力气都快没了。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 15,
        speaker: '阿沅',
        leftPortrait: 'assets/art/ayuan_default.png',
        rightPortrait: 'assets/art/young_liu_default.png',
        activeSide: 'left',
        text: '这次……换我护着你们俩。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 16,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她从校服兜里摸出一包捡了好几天、一直没舍得扔的荧光零食，一口全吃了下去。青蓝色的光一下从她身上炸开，她的动作快得不像平时那个软乎乎的第一名，几下就把门口堵着的人全打跑了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 17,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '可等她再转过身，面对两个最好的朋友时，眼睛里已经只剩下化不开的青光，再也没有一点笑意。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 18,
        speaker: '异化阿沅',
        leftPortrait: 'assets/art/ayuan_corrupted.png',
        rightPortrait: 'assets/art/young_xu_default.png',
        activeSide: 'left',
        text: '你们快跑……我撑不了多久了，别让我伤到你们。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 19,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她说完转身顺着走廊走了，没回头。两个小姑娘瘫坐在空教室里，抱着膝盖看着天一点点亮起来，当场发誓：一定要把阿沅救回来，一定要找到这东西的源头。',
        sfx: 'sfx_unit_down'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '可誓言刚立下，现实已经往更远的地方滚过去了。',
      buttonText: '【继续往后看】',
      targetScene: 'ch7_scene_return'
    }
  },

  ch7_scene_return: {
    id: 'ch7_scene_return',
    title: '闪回尽头 · 遗憾还没结束',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_school_night.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '画面抖了一下，却没有立刻回到现在。阿沅转身之后，那两个小姑娘并没有停在原地，她们顺着零零碎碎的指认，一路摸到了城郊。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default.png',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '所以你们后来还是追下去了？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '追了。因为我们那时候真的以为，只要再往前一步，就能把阿沅和整件事一起拽回来。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '那一步，把她们带到了更大的网面前。',
      buttonText: '【去旧仓库】',
      targetScene: 'ch8_scene_warehouse'
    }
  }
};
