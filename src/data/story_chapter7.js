/**
 * 第八章《从前那一班（上）》剧情脚本数据表
 *
 * 重构说明：
 * 1. 开场先铺垫三个女孩的人设与羁绊；
 * 2. 明确交代二十年前她们只能用身体硬扛；
 * 3. 强调大人们的不信任（传达室大爷），造成她们孤立无援的绝境；
 * 4. 阿瑶为了保护朋友主动吃下异化零食，推向情感高潮。
 */

export const CHAPTER7_STORY = {
  ch7_scene_flashback: {
    id: 'ch7_scene_flashback',
    title: '二十年前 · 六八班的三个女孩',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_classroom_old@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '黑板上用粉笔歪歪扭扭写着“距离毕业考还有 30 天”。这是二十年前的六八班教室。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '空荡荡的教室里，只剩下三个留下来补作业的女孩。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '那个扎着高马尾、正抓耳挠腮满脸不服输的，是少年时代的徐老师。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '坐在另一边，留着齐耳短发、正翻着课本检查答案的，是少年时代的刘老师。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '坐在她们中间，梳着双麻花辫、正笑着递钢笔的女孩叫阿瑶，是全班雷打不动的第一名。那时的她们，还只是三个再普通不过的好朋友。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '……没关系的。你们别着急，慢慢算，这道题套公式就能解出来啦。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_default@2x.png',
        activeSide: 'left',
        text: '也就你脾气好，换作是我，这破卷子我早撕了！每次都得靠你这个第一名来捞我们。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '行了你俩，快写吧。等会儿天黑了，还得让阿瑶带咱们从后门溜出去呢。不过……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '你们觉不觉得，今天阿瑶脸色有点不对劲？而且外面走廊有点太安静了，连值日生的声音都没了。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '走廊里安静得让人发毛。',
      buttonText: '【去外面看看】',
      targetScene: 'ch7_scene_outbreak'
    }
  },

  ch7_scene_outbreak: {
    id: 'ch7_scene_outbreak',
    title: '走廊里 · 孤立无援',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_corridor_old_eerie@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刚推开教室门，走廊的声控灯忽然“滋啦”闪了一下。四周黑得有些不正常。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'left',
        text: '你俩坐着别动。不对劲，我先去前面看看。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'right',
        text: '你少来，要死一起死，我跟你一起。阿瑶，你跟在我们后面。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '没走几步，她们就看到一个诡异的人影直挺挺地站在走廊尽头。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: 'assets/art/senior_student_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '那是一个穿着旧校服的高年级学长，眼睛里泛着诡异的青光。他嘴里疯狂念叨着考试公式，像野兽一样扑了过来。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'left',
        text: '阿瑶躲远点！刘，快去传达室找大爷帮忙！',
        sfx: 'sfx_confirm'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她们拼了命挣脱，带着阿瑶一路跑到一楼传达室疯狂拍门。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: 'assets/art/janitor_old@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '铁门“嘎吱”一声开了。可传达室大爷转过头时，眼睛里竟然也泛着一模一样的幽幽青光！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '异化大爷',
        leftPortrait: 'assets/art/janitor_old@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '考砸了……谁都不许出去……都给我回去背书！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '前有异化的大爷，后有追上来的学长，她们被死死堵在了旧走廊里。大人们不但帮不上忙，反而成了最可怕的怪物！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '逃无可逃，只能硬拼了！',
      buttonText: '【迎击异化者】',
      targetScene: 'ch7_scene_battle_pre'
    }
  },

  ch7_scene_battle_pre: {
    id: 'ch7_scene_battle_pre',
    title: '硬拼',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_corridor_old_eerie@2x.png',
    bgm: 'bgm_army_approaching',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '一场恶战在所难免！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitIds: ['young_xu', 'young_liu', 'ayao'],
      prompt: '二十年前的三人组：少年徐老师、少年刘老师、阿瑶结阵迎击！',
      buttonText: '【进入战斗】',
      battleId: 'ch7_battle1',
      isBattleTrigger: true
    }
  },

  ch7_scene_sacrifice: {
    id: 'ch7_scene_sacrifice',
    title: '旧走廊 · 这一次换我护着你们',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_corridor_old_eerie@2x.png',
    bgm: 'bgm_evil_lair',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '那一晚，她们跑遍了整栋教学楼，试图拦住每一个发疯的同学。天快亮时，她们被当年那个给体校生发饮料的坏教练，带着几个异化学生死死堵在了旧教室门口。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '两人已经打了一整夜，满身是伤，连抬手的力气都快没了。而在走廊尽头的阴影里，一个像老板一样的神秘男人放下几个纸箱，冷笑着说了一句：“总会有人愿意为结果买单。” 随后消失在黑暗中。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'left',
        text: '刘……你带着阿瑶从窗户翻出去……我来拖住他们。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 4,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '你们……每次打架都这么厉害。就算不靠成绩，大家也那么喜欢你们……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '一直躲在她们身后的阿瑶，忽然痛苦地捂住胸口。她口袋里掉出好几个怪味零食的空袋子。原来她早就偷偷吃了，只是一直瞒着朋友。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '阿瑶',
        leftPortrait: 'assets/art/ayao_default@2x.png',
        rightPortrait: 'assets/art/young_liu_default@2x.png',
        activeSide: 'left',
        text: '可我只有成绩了……我不能掉下去……不能……',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_default@2x.png',
        activeSide: 'left',
        text: '阿瑶？你口袋里掉出来的……是外面那些人吃的东西？！你什么时候开始吃的？！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '话音未落，青蓝色的光瞬间从阿瑶身上炸开。原本极度压抑的药效在此刻彻底发作。她猛地抬起头，那双原本温和的眼睛，已经被化不开的青光彻底吞噬。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/ayao_corrupted@2x.png',
        rightPortrait: 'assets/art/young_xu_default@2x.png',
        activeSide: 'left',
        text: '（声音变得冰冷且狂躁）不用你们管！谁也别想抢走我的第一名！',
        sfx: 'sfx_unit_down'
      },
      {
        id: 10,
        speaker: '少年徐老师',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'left',
        text: '阿瑶！你清醒一点！你为什么要吃那种东西？！我们不是说好要一起干干净净地毕业吗？！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_xu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '干干净净？（神经质地笑起来）你们打架受了处分，别人只会说你们仗义。可我只要掉下第一名，我就什么都不是了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 12,
        speaker: '少年刘老师',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'left',
        text: '谁说的？！你就算考倒数第一，你也是阿瑶，是我们最好的朋友啊！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 13,
        speaker: '异化阿瑶',
        leftPortrait: 'assets/art/young_liu_default@2x.png',
        rightPortrait: 'assets/art/ayao_corrupted@2x.png',
        activeSide: 'right',
        text: '（面目狰狞）闭嘴！别再拿你们那种恶心的施舍来可怜我！只要吃了这个……我永远都是不可替代的第一名！',
        highlight: true,
        sfx: 'sfx_unit_down'
      },
      {
        id: 14,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '黑暗中的男人冷笑了一声，挥了挥手。几个异化学生猛扑上来死死缠住了徐刘二人。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 15,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '而彻底失去理智的阿瑶，则跟着那个男人，头也不回地走进了更深的黑暗里。',
        highlight: true,
        bgm: 'bgm_childhood',
        sfx: 'sfx_unit_down'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '阿瑶跟着陌生男人走了，可徐老师和刘老师没有放弃寻找她。',
      buttonText: '【回到现实】',
      targetScene: 'ch7_scene_return'
    }
  },

  ch7_scene_return: {
    id: 'ch7_scene_return',
    title: '器材室 · 回忆还没讲完',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_school_night@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '画面抖了一下，时间线瞬间拉回了现实的器材室。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '天亮之后，我们发誓一定要把阿瑶救回来，一定要找到这东西的源头。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '我们沿着散货的线索找到城郊旧仓库，可到最后，也没能把阿瑶带回来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '所以这一次，你们无论如何也要阻止这一切，对吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '对。我们绝对不能再让当年的事，在你们身上重演。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '刘老师沉默了一会儿，接着讲起二十年前旧仓库里发生的事。',
      buttonText: '【继续听当年的事】',
      targetScene: 'ch8_scene_warehouse'
    }
  }
};
