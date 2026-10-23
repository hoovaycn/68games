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

const SAFEHOUSE_BG = 'assets/backgrounds/bg_safahouse_shelter@2x.png';
const FAMILY_BOARD_BG = 'assets/backgrounds/bg_shen_family_caseboard@2x.png';

export const CHAPTER13_STORY = {
  // s1: 秘密安全屋 · 惊人案卷
  ch13_scene_safahouse: {
    id: 'ch13_scene_safahouse',
    title: '城北防空洞安全屋 · 铁皮桌上的卷宗',
    bgType: 'classroom',
    bgImg: SAFEHOUSE_BG,
    bgImgFallback: SAFEHOUSE_BG,
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '深夜十点，皮卡停在城北一处旧防空洞外。海峰拿出证件打开铁门，带大家走进省厅安排的安全屋：“先在这儿包扎，等两位老师过来。”屋里的墙上贴着他查沈家时留下的照片和人物关系图。',
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
        id: 21,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '爸，你穿成这样我真不习惯。以前墨镜金链子一戴，我看见你就想绕路；现在这么板正，感觉你下一句就要让我出示学生证。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '少贫。博物馆古罐里的鸦片膏，就是这种药最早的原料。我查到沈家的“福寿堂”在虎门销烟之后替洋商藏鸦片，那只罐子也跟这段事有关。不过他们当年怎么搭上的线，我还没查清。',
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
        text: '（海峰把三张照片摆到桌上，指着左边）学校里开家长会、博物馆里抢罐子的，就是沈崇礼。怡安基金会是他对外的招牌，背地里他管着沈家贩药的“福寿堂”。',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '中间这张是二十年前的沈万廷，沈崇礼的父亲。右边还是他，是最近拍到的。别看现在老了，沈家真正发号施令的人一直是他。',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '等等，中间和右边是同一个人？那沈崇礼在外面忙活，背后指挥他的就是他爸？',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        sfx: 'sfx_confirm'
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
    bgImg: SAFEHOUSE_BG,
    bgImgFallback: SAFEHOUSE_BG,
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
        text: '（刘老师一眼看到桌上中间的旧照片，手里的教鞭掉在地上）沈万廷！徐老师，你快看，就是二十年前开家长会、带头逼死阿瑶的那个校董家长！',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 41,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '是他。当年阿瑶出了事，我记了这张脸二十年。右边这张老人照……他竟然还活着？',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '没错。二十年前事情快败露，他假装死于车祸，逃到了国外。现在这张老人照是最近拍到的，他已经暗中回国了。',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 6,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '他现在坐着轮椅，靠呼吸机撑着，还是在背后指挥。沈崇礼在台前拿“学习补剂”骗人，你们吃过的怪味零食，就是他们父子俩弄出来的新货。',
        bgImg: FAMILY_BOARD_BG,
        hidePortraits: true,
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '害了阿瑶的沈万廷，现在还在幕后害人；他儿子沈崇礼，就是来我们学校开家长会的那个神秘家长。原来一直是这对父子！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 8,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '海峰和两位老师把旧教案、沈家的照片和货船航线摊在桌上，一边核对一边守着监听台。雨声渐渐小了；再抬头看表，已经熬到天快亮。',
        bgImg: SAFEHOUSE_BG,
        sfx: 'sfx_text_blip'
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
        text: '『滋滋……报告沈万廷和沈崇礼，博物馆的青花瓷罐已运到三号码头。半小时后开炉，就在驳船上用罐里的鸦片膏熬制新药。准备送药的学校名单也核对好了……滋滋……』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '送药名单？等等，上次家长会，他发免费样品前让家长填过领药登记，孩子名字、住址和电话都记在上面。沈崇礼那时就把六 8 班的地址拿到手了！',
        sfx: 'sfx_confirm'
      },
      {
        id: 21,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '难怪大溃败那晚，整层楼那么多同学都吃到了药……有些是家长带回去的，另一些袋上贴着“免费补送”和住址。原来是沈崇礼照着登记表送上门的！',
        highlight: true,
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
        bgImg: 'assets/backgrounds/bg_canal_dock_storm@2x.png',
        bgm: 'bgm_intense_boss',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '码头护卫头目',
        leftPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '海峰？沈先生说你可能会来。驳船半小时后开炉，这道铁闸你们别想过去。',
        bgImg: 'assets/backgrounds/bg_canal_dock_storm@2x.png',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 51,
        speaker: '沈家护卫',
        leftPortrait: 'assets/art/shen_guard_default@2x.png',
        rightPortrait: 'assets/art/father_haifeng_police@2x.png',
        activeSide: 'left',
        text: '头儿，船上的人还在搬货。咱们守住闸口，谁都别放过去！',
        bgImg: 'assets/backgrounds/bg_canal_dock_storm@2x.png',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '码头打手',
        leftPortrait: 'assets/art/punk_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '后头还带着老师和学生？头儿，咱把他们赶回去，守到船开就行！',
        bgImg: 'assets/backgrounds/bg_canal_dock_storm@2x.png',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_police@2x.png',
        rightPortrait: 'assets/art/berserker_guard_heavy@2x.png',
        activeSide: 'left',
        text: '徐老师，护住孩子。你们拿着那只罐子害学生，今天这道闸，我们非过不可！',
        bgImg: 'assets/backgrounds/bg_canal_dock_storm@2x.png',
        sfx: 'sfx_confirm'
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
