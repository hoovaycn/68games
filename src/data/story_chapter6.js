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
    bgImg: 'assets/backgrounds/bg_school_night@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大考前一天傍晚，小伙伴们留在教室里补值日、发准考证，徐老师和刘老师在办公室核对考场名单。楼道本来安安静静的，可没过多久，外面就开始一阵一阵响起桌椅拖动声、脚步声，还有那股甜得发腻的怪味。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '怎么回事？外面怎么那么吵？张希哲他们不是被家长接走了吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '这味道……跟之前咱们缴获的异化零食一模一样！大家小心点，我先去门口看看。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '那股味道一飘进来，我心里就猛地一沉。难不成又是……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '门一推开，让人大吃一惊。走廊里站着的几乎全是熟脸：张希哲、覃瑞怡、朱晏泽，还有平时一起上课的同学、隔壁班的熟人，甚至连白天打过招呼的低年级孩子都在。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '有人手里还攥着没拆完的包装袋，袋上贴着“免费补送”的字条和家庭住址；有人嘴角沾着荧光糖渣，眼睛却已经一层层亮起青蓝色的光。那不是少数几个倒霉的人，是几乎整层楼都出事了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '女同学',
        leftPortrait: 'assets/art/classmate_girl_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '我妈说……就今天一晚，吃了明天就能考好……大家家里都吃了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '她话还没说完，眼睛里的最后一点清明也没了。走廊另一头，朱晏泽慢慢抬起头；张希哲脚边滚着足球；覃瑞怡的花球垂在身侧，三个人的脸色都白得发青。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 9,
        speaker: '张希哲（异化）',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted@2x.png',
        activeSide: 'left',
        text: '更强一点……就不会被甩下……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '覃瑞怡（异化）',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_corrupted@2x.png',
        activeSide: 'right',
        text: '只要赢……大家就会一直笑……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '朱晏泽（异化）',
        leftPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '先赢的人，才有资格护别人。你们不是一直也这么想的吗？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        activeSide: 'left',
        text: '放屁！我们是怕考砸，怕被家长骂，但再怕也不能吃这种怪东西变成怪物啊！',
        sfx: 'sfx_confirm'
      },
      {
        id: 13,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhuyanze_corrupted@2x.png',
        activeSide: 'left',
        text: '可是……他们全是熟人……这怎么打？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 14,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '昨天家长们都看到吃异化零食的后果了，为了分数，竟然还是给孩子吃了，天啊！就像以前一样打，必须把他们揍醒！咱们不能让全班都异化！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 15,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '靠过来！别散！记住，打的是那股控制他们的执念，别往死了打啊~ 准备站位！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '五个人被逼到楼道转角，已经没有退路。必须把这几个最难缠的同学拦下来！',
      buttonText: '【准备战斗】',
      battleId: 'ch6_battle1',
      isBattleTrigger: true
    }
  },

  ch6_scene_retreat: {
    id: 'ch6_scene_retreat',
    title: '器材室 · 赢了眼前，输了整层楼',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_school_night@2x.png',
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
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '这不是这一层赢不了，是整栋楼都快守不住了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
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
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '因为你们总觉得坏人都在外面。可最难防的，是大家自己心里觉得“只要能考第一，吃点零食变怪点也无所谓”。',
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
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '很多年前，也有这么一个晚上。一模一样的灯，一模一样的青眼睛。那时候被困在教学楼里的，是我和徐老师，还有她。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '旧笔记本散发着微弱的荧光。刘老师伸出手，指尖刚碰到那发黄的纸页，周围器材室昏暗的光线就像被谁一把拽远了。时间仿佛在这个瞬间被强行拉回了二十年前——',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '那一年的粉笔字，正歪歪扭扭浮在黑板上。',
      buttonText: '【翻开那段过去】',
      targetScene: 'ch7_scene_flashback'
    }
  }
};
