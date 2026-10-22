/**
 * 第十四章《照片上的人》剧情脚本数据表（第二幕 第4章）
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
        text: '深夜十点，海峰带大家沿汽修厂地窖的暗道，来到省厅设在地下防空洞的安全屋。墙上贴满了旧报纸、照片和人物关系图。他拿出在后仓找到的账册，终于能把这些线索连起来。',
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
        text: '博物馆古罐里的鸦片膏，就是这种药最早的原料。我查到沈家的“福寿堂”在虎门销烟之后替洋商藏鸦片，那只罐子也跟这段事有关。不过他们当年怎么搭上的线，我还没查清。',
        highlight: true,
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
        text: '他叫沈崇礼。怡安基金会是他对外的招牌：赞助学校和博物馆，方便送药、运货；背地里，他管着沈家贩药的组织“福寿堂”。不过真正发号施令的还有一个人。看这张老照片：中间是他父亲沈万廷。',
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
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
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
        text: '老海！收到你的紧急传呼暗号，我和老刘直接从学校翻墙赶过来了！看到这几个孩子平安无事，总算放心了。（目光扫到海峰肋下的血迹和包扎，神色一凝）你这伤……又是替孩子们挡下的吧？',
        highlight: true,
        sfx: 'sfx_text_blip'
      },
      {
        id: 21,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'right',
        text: '（摆摆手，粗声粗气）大老爷们受点皮外伤算什么，别大惊小怪的。倒是你们，一把年纪了还大半夜翻墙过来，也不怕路上出事。',
        sfx: 'sfx_confirm'
      },
      {
        id: 22,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（从口袋里掏出干净的碘伏棉签和创可贴递过去）少逞强，先把伤口消炎了再谈正事。孩子们都平平安安的，我们这一趟就值了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '（在一旁戳了戳覃瑞怡，压低声音）诶，徐老师跟海叔叔，听起来是老相识啊。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 31,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '（压低声音）别打岔，好好听。这里面肯定还有我们不知道的往事。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '（摘下沾满雨水的眼镜，目光无意间扫到墙上的黑白老照片，整个人如遭雷击，手里的竹教鞭哐当落地）这……这张脸是……沈万廷？！二十年前开家长会带头逼死阿瑶、害得我们师徒流离失所的那个校董家长！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '没错。沈万廷就是沈崇礼的父亲。二十年前事情快败露时，他假装死于车祸，逃到了国外。',
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '现在他坐着轮椅、靠呼吸机续命，暗中回了国。儿子在台前用“学习补剂”骗人，父亲在背后指挥。你们吃过的怪味零食就是他们的新货。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '原来二十年前徐老师回忆里的那个恶魔家长，和现在家长会上威胁我们的神秘家长，竟然是如出一辙的父子两代毒枭！！',
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
        text: '『滋滋……报告沈万廷和沈崇礼，博物馆的青花瓷罐已运到三号码头。半小时后涨潮，就在驳船上用罐里的鸦片膏熬制新药。准备送药的学校名单也核对好了……滋滋……』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '他们连送药的学校名单都有？沈崇礼借着基金会赞助学校活动，拿到了六 8 班的家庭联系表，上面有每个孩子的住址和家长电话。他要是把新药做出来，甚至能直接找上门！',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '我已经把名单报给警方，请他们尽快联系家长。可省厅增援还要四十分钟，他们半小时后就要开炉。我们先去阻止他们；我走最前面，两位老师护住孩子，谁都别单独行动！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: 'assets/art/shen_guard_default@2x.png',
        activeSide: 'left',
        text: '众人赶到码头，唯一的入口被黑衣护卫和持棍打手堵住。两名带盾牌的守卫挡在最前面，探照灯一转，所有人的位置都暴露了。',
        highlight: true,
        bgm: 'bgm_intense_boss',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '敌人堵死铁闸，一场恶战一触即发！',
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
        text: '在老爸海峰刚猛无匹的警用擒拿术与两位老师的默契配合下，码头外围的十余名黑衣哨兵被尽数击倒。江风裹挟着暴雨扑面而来，空气中弥漫着一股让人想吐的甜腻焦糊味。',
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
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（咽了咽口水）好家伙，这炉子长得比沈崇礼那张脸还吓人……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '那只从博物馆抢走的道光古瓷罐，就被铁链悬在铜炉正上方！甲板上那两个穿唐装和西装的人影……就是沈家父子！',
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
