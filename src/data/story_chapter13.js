/**
 * 第十四章《百年老账》剧情脚本数据表（第二幕 第4章）
 *
 * 流程结构：
 * - ch13_scene_safahouse: 省厅秘密安全屋，老爸海峰展示追查15年的跨国暗网与两代神秘家长档案
 * - ch13_scene_teachers_arrive: 徐老师与语文刘老师匆匆赶到，认出二十年前毁掉同伴阿瑶的正是神秘家长的生父
 * - ch13_scene_dock_alert: 截获密电，两代神秘家长今夜将在古运河老码头举行激活古毒的原浆大典
 * - ch13_battle1: 运河老码头前哨战（主角团 + 徐老师 + 刘老师 + 老爸海峰 VS 码头巡逻黑帮与异化死士）
 * - ch13_scene_dock_entry: 突破外围防线，直面祭坛核心
 */

export const CHAPTER13_STORY = {
  // s1: 秘密安全屋 · 惊人案卷
  ch13_scene_safahouse: {
    id: 'ch13_scene_safahouse',
    title: '城北防空洞安全屋 · 铁皮桌上的卷宗',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_safahouse_shelter@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '深夜十点，老爸海峰带着少年们穿过汽修厂地窖的暗道，进入了一间隐匿在地下防空洞的省厅特勤安全屋。除了一盏摇晃的白炽灯，整面混凝土墙上贴满了发黄的旧报纸、黑白档案照和用红毛线交织的关系网。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（换上一身笔挺深蓝特警战术服，给手臂伤口消毒）你们在学校见到的怪味零食和电子烟，在省厅代号是“04号致幻制剂”。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '它的母体原浆，正是一百八十多年前虎门销烟时期，洋行大买办“福寿堂”暗中偷藏下来的那一批鸦片老膏！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '一百八十多年前的福寿堂？！那上次来我们学校开家长会、气焰嚣张的那个神秘家长，在这张网里到底是什么人？',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '他叫沈崇礼，表面上是省名校教育基金会副理事长，实际上是“福寿堂”第六代掌门人。而真正站在他背后垂帘听政的太上皇……你们看这张二十年前从档案室抢救出来的老照片。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '防空洞厚重的装甲铁门外，突然传来“三长两短”极有规律的紧急敲门声！',
      buttonText: '【拉开门栓 · 故人相会】',
      targetScene: 'ch13_scene_teachers_arrive'
    }
  },

  // s2: 老师赶到 · 两代恩怨重叠
  ch13_scene_teachers_arrive: {
    id: 'ch13_scene_teachers_arrive',
    title: '安全屋内 · 跨越二十年的宿怨合流',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_safahouse_shelter@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '铁门拉开一条缝，两个浑身被雨水浇透、风尘仆仆的身影闪了进来——竟然是徐老师和语文刘老师！徐老师怀里紧紧揣着那本泛黄的二十年前旧教案，刘老师手里握着那根从不离身的竹教鞭。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '老海！收到你的紧急传呼暗号，我和老刘直接从学校翻墙赶过来了！看到这几个孩子平安无事，我这颗心总算落地了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（摘下沾满雨水的眼镜，目光无意间扫到墙上的黑白老照片，整个人如遭雷击，手里的竹教鞭哐当落地）这……这张脸是……沈万廷？！二十年前开家长会带头逼死阿瑶、害得我们师徒流离失所的那个校董家长！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '没错，刘老师。当年逼迫你们的沈万廷，正是如今这个沈崇礼的亲生父亲！二十年前他见东窗事发，制造车祸假死逃往南洋；',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '如今他靠轮椅和呼吸机续命潜回国内，让亲儿子接班，换了层“素质教育补剂”的皮，又把黑手伸向了这一届学生！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '原来二十年前徐老师回忆里的那个恶魔家长，和现在家长会上威胁我们的神秘家长，竟然是一脉相承的父子两代毒枭！！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '安全屋角落里的警用高频无线电监听台，突然亮起刺目的红灯并发出尖锐啸叫！',
      buttonText: '【戴上耳机 · 截听加密频道】',
      targetScene: 'ch13_scene_dock_alert'
    }
  },

  // s3: 截听警报 · 老码头出击
  ch13_scene_dock_alert: {
    id: 'ch13_scene_dock_alert',
    title: '监听台前 · 运河祭典之夜',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_safahouse_shelter@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '无线电截听信号',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『滋滋……报告老太爷、六掌柜，省博的道光青花瓷罐已顺利运抵古运河三号废弃码头。今夜子时江潮大涨，可在驳船祭坛开炉熬炼百年青髓母液，全市重点中学尖子生投毒名册已核对完毕……滋滋……』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（一把攥紧桌角，指节发白）绝不能让他们开炉！二十年前我们势单力薄，眼睁睁看着阿瑶被这帮畜生毁了一辈子；今晚要是再退缩半步，我们还有什么脸面站在讲台上教书育人！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '省厅大部队集结还需要四十分钟，但开炉仪式就在半小时后，等不及了！我来打头阵撕开缺口，徐老师、刘老师断后掩护！孩子们，跟紧大人，今晚我们把这笔横跨百年的老账彻底算清！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人冲出安全屋，冒着瓢泼大雨直扑古运河三号废弃码头，码头铁闸外黑影攒动！',
      buttonText: '【打响突击战 · 强攻码头哨卡】',
      battleId: 'ch13_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 突破哨卡 · 逼近核心
  ch13_scene_dock_entry: {
    id: 'ch13_scene_dock_entry',
    title: '老运河三号码头 · 腥臭与青烟',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_canal_dock_storm@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '在老爸海峰刚猛无匹的警用擒拿术与两位老师的默契配合下，码头外围的十余名黑衣哨兵被尽数击倒。江风裹挟着暴雨扑面而来，空气中弥漫着一股令人作呕的甜腻焦糊味。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '咳咳……这股烟味闻一下就让人头重脚轻！你们快看前面停靠的那艘巨型铁壳驳船！甲板正中央立着一座快有一人高的青铜鬼面炉！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '那只从省博物馆抢走的道光古瓷罐，就被铁链悬在铜炉正上方！甲板上那两个穿唐装和西装的人影……就是沈家父子！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '铜炉下诡异的幽蓝火焰腾空而起，众人毫不迟疑跃上驳船舷梯！',
      buttonText: '【冲上驳船甲板 · 进入下一章】',
      targetScene: 'ch14_scene_dock_ritual'
    }
  }
};
