/**
 * 第七章《大溃败》剧情脚本数据表
 *
 * 核心不是“打不过这一波”，而是“眼前这波能打，抬头却发现整栋楼都快守不住了”。
 */

export const CHAPTER6_STORY = {
  ch6_scene_corridor: {
    id: 'ch6_scene_corridor',
    title: '前夜 · 整层楼都不对了',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_school_night.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大考前一天傍晚，当前主角团留在教室里补值日、发准考证，徐老师和刘老师在办公室核对考场名单。楼道本来安安静静的，可没过多久，外面就开始一阵一阵响起桌椅拖动声、脚步声，还有那股甜得发腻的怪味。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '那股味道一飘进来，我心里就猛地一沉。昨天家长会上那些偷偷把样品塞进包里的人，原来一个都没真正放手。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '门一推开，主角整个人都僵住了。走廊里站着的几乎全是熟脸：张希哲、覃瑞怡、朱晏泽，还有平时一起上课的同学、隔壁班的熟人，甚至连白天打过招呼的低年级孩子都在。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '有人手里还攥着没拆完的包装袋，有人嘴角沾着荧光糖渣，眼睛却已经一层层亮起青蓝色的光。那不是少数几个倒霉的人，是几乎整层楼都出事了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '女同学',
        leftPortrait: 'assets/art/classmate_girl_corrupted.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我妈说……就今天一晚，吃了明天就能考好……大家家里都吃了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她话还没说完，眼睛里的最后一点清明也没了。走廊另一头，朱晏泽慢慢抬起头；张希哲脚边滚着足球；覃瑞怡的花球垂在身侧，三个人的脸色都白得发青。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '朱晏泽（异化）',
        leftPortrait: 'assets/art/zhuyanze_corrupted.png',
        rightPortrait: 'assets/art/zhangxizhe_corrupted.png',
        activeSide: 'left',
        text: '我要考第一……你们，都别挡路。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '张希哲（异化）',
        leftPortrait: 'assets/art/zhuyanze_corrupted.png',
        rightPortrait: 'assets/art/zhangxizhe_corrupted.png',
        activeSide: 'right',
        text: '得赢……得更强……不然什么都护不住……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '覃瑞怡（异化）',
        leftPortrait: 'assets/art/qinruiyi_corrupted.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '考好一点……大家就都会开心了吧……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '昨天明明都亲眼看见后果了，还是有人回去喂了。为了分数，他们真敢。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '靠过来！别散！这一波先拦住再说！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '楼道尽头同时亮起一片青光，脚步声已经压过来了。',
      buttonText: '【先把眼前这波拦住】',
      targetScene: 'ch6_scene_breakthrough'
    }
  },

  ch6_scene_breakthrough: {
    id: 'ch6_scene_breakthrough',
    title: '楼道 · 先把眼前这波拦住',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_school_night.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_corrupted.png',
        activeSide: 'left',
        text: '他们全是熟人……这怎么打？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/zhangxizhe_corrupted.png',
        activeSide: 'left',
        text: '就像以前一样打。心里发抖也得先救人。要是连这一层都让开，后面整栋楼都得塌。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted.png',
        activeSide: 'left',
        text: '记住，打的是那股顶住他们的念头，不是他们本人。别愣，站位！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '张希哲（异化）',
        leftPortrait: 'assets/art/zhangxizhe_corrupted.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted.png',
        activeSide: 'left',
        text: '更强一点……就不会被甩下……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '覃瑞怡（异化）',
        leftPortrait: 'assets/art/zhangxizhe_corrupted.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted.png',
        activeSide: 'right',
        text: '只要赢……大家就会一直笑……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '朱晏泽（异化）',
        leftPortrait: 'assets/art/zhuyanze_corrupted.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '先赢的人，才有资格护别人。你们不是一直也这么想的吗？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_corrupted.png',
        activeSide: 'left',
        text: '不是。我们怕输，怕考差，怕被说，可那也不是把自己整个换掉的理由。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '五个人被逼到楼道转角，已经没有退路，只能先把最前面的熟人压住。',
      buttonText: '【顶住这一波】',
      battleId: 'ch6_battle1',
      isBattleTrigger: true
    }
  },

  ch6_scene_retreat: {
    id: 'ch6_scene_retreat',
    title: '器材室 · 赢了眼前，输了整层楼',
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
        text: '眼前这波终于被压住了。可下一秒，楼下、楼外、另一栋教学楼的窗边，又一片片亮起青蓝色的眼睛。那些刚被扶起来的同学，清醒不到两秒，脸色又被更浓的青光一点点压了回去。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/adult_liu_default.png',
        activeSide: 'left',
        text: '这不是这一层赢不了，是整栋楼都快守不住了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '别恋战，先退器材室！再往外硬顶，我们五个都会被拖死在这儿！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '几个人边退边把刚被压回神的张希哲、覃瑞怡、朱晏泽一起拖进了器材室。三个人还晕着，却总算没再往外冲。徐老师“哐当”一声反锁上门，又把沉重的器材架顶到了门后。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '门外传来一下又一下撞门的声音，闷得像直接敲在心上。器材室里一片发冷的安静，只有每个人急促的喘气声还在提醒他们，自己没有倒下。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '我们不是已经把送货的、递东西的、发样品的都揪出来了吗……为什么还是会变成这样？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '因为你们一直以为敌人在外面。可最难挡的，恰恰是每个人心里那句“为了赢，这样也值”。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她说完，慢慢从帆布包最里层摸出一个封皮磨掉漆的旧笔记本。里面夹着一张老照片：扎着高马尾的少年徐老师、齐耳短发的少年刘老师，还有一个梳双麻花辫、笑起来有梨涡的女孩，三个孩子挤在旧教学楼门口，像永远不会分开。',
        sfx: 'sfx_item_get'
      },
      {
        id: 9,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default.png',
        rightPortrait: 'assets/art/teacher_xu_default.png',
        activeSide: 'left',
        text: '很多年前，也有这么一个晚上。一模一样的灯，一模一样的青眼睛。那时候被困在教学楼里的，是我和徐老师，还有她。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '器材室的灯忽然“滋啦”闪了一下，眼前的颜色一点点泛黄老化。',
      buttonText: '【看见过去】',
      targetScene: 'ch7_scene_flashback'
    }
  }
};
