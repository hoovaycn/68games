/**
 * 第十一章《博物馆里的罐子》剧情脚本数据表（第二幕 第1章）
 *
 * 流程结构：
 * - ch10_scene_museum_meet: 暑假博物馆大厅集合，少年团参观虎门销烟百年特展
 * - ch10_scene_crisis: 展厅传出砸柜声，少年团赶到时玻璃已碎，封泥古罐令学生失控
 * - ch10_scene_confrontation: 基金会负责人指挥保镖趁乱运走古罐
 * - ch10_battle1: 博物馆展厅遭遇战（主角团 VS 异化保镖与狂躁保送生）
 * - ch10_scene_tracking: 击退保镖，古罐已被偷运往城南汽修街，线索直指 {ALLY_2_NAME} 老爸所在的铺子
 */

export const CHAPTER10_STORY = {
  // s1: 博物馆大厅集合 · 闲聊与新展
  ch10_scene_museum_meet: {
    id: 'ch10_scene_museum_meet',
    title: '省历史博物馆 · 百年特展大厅',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_museum_square@2x.png',
    bgm: 'bgm_classroom',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '省历史博物馆正门前，冷气从玻璃大门里丝丝冒出。{MC_NAME}、{ALLY_1_NAME}、{ALLY_2_NAME}、张希哲、覃瑞怡几个人顶着烈日站在特展巨幅海报下。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '好不容易放暑假，覃瑞怡你干嘛非拽我们来看什么《近代海防与虎门销烟出水文物展》啊！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '你懂什么！这次展出的是当年虎门销烟后从海里捞上来的文物，还是省重点中学的加分调研项目，大家中考都用得上！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '……停车场里停着几辆贴了“怡安教育慈善基金会”临时通行证的黑色金杯车。展览不是刚开吗，怎么后门还停着搬运车？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 41,
        speaker: '系统提示',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '大家想起期中考前那场家长会：那个带着怪味零食逼同学试吃的神秘家长，后来一直没查出是谁。眼下基金会又把车停在后门，难免让人起疑。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '门口的赞助牌也是“怡安教育慈善基金会”。他们出钱办展，后门还停着搬运车……进去看看他们在搬什么。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '众人刚过安检，二号展厅里猛地传来玻璃碎裂声。游客尖叫着往外跑，保安对着对讲机喊：“有学生抄起隔离栏杆砸开了主展柜！快叫人来！”',
        bgm: 'bgm_suspense',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '少年们逆着人流冲向二号展厅。等他们推开门，主展柜已经碎了。',
      buttonText: '【冲进二号展厅 · 查看骚乱】',
      targetScene: 'ch10_scene_crisis'
    }
  },

  // s2: 展厅危机 · 古罐青烟与异变
  ch10_scene_crisis: {
    id: 'ch10_scene_crisis',
    title: '二号中央展厅 · 碎裂的主展柜',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_museum_exhibition@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '主展柜的玻璃碎了一地，旁边的青铜器还立着。一只表面粘着海边贝壳的青花瓷罐歪在碎玻璃间，罐口封着的硬泥裂了条缝。倒下的铭牌写着：“道光十九年虎门海口出水；罐内检出鸦片膏。”',
        sfx: 'sfx_glass_shatter'
      },
      {
        id: 2,
        speaker: '重点班学生',
        leftPortrait: 'assets/art/senior_athlete_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '（攥着砸柜的金属栏杆，伸手去抠罐口封泥）我闻到了……和学校发的零食一个味儿！可这个更香。有人说它能让人过目不忘……让我尝一口！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '展柜已经被他砸开了！张希哲，拦住他的手，别让他把封泥也抠掉！那罐里装的不是补脑药，是一百多年前的鸦片！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '罐口的裂缝飘出一缕青灰色烟，甜腻气味和之前害同学异变的零食一模一样。离展柜最近的几个学生先是捂住鼻子，随后眼神发直，推开保安就往瓷罐扑；外围游客惊叫着往出口跑。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '侧门打开，几个佩戴“怡安基金会”工作证的黑衣人推着文物运输箱进来，径直围住碎裂的展柜。',
      buttonText: '【拦住运输箱 · 当面问清】',
      targetScene: 'ch10_scene_confrontation'
    }
  },

  // s3: 神秘家长现身 · 指挥掉包
  ch10_scene_confrontation: {
    id: 'ch10_scene_confrontation',
    title: '展柜中央 · 神秘家长的狂妄',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_museum_exhibition@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '神秘家长',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '六 8 班的孩子们？学校里的零食试验被你们搅黄了，基金会出钱办个展，你们也要来管？保安正在疏散游客，这件展品由我们的人接走。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'right',
        text: '原来怡安基金会是你在管！你们赞助展览，把那批带鸦片烟膏的古罐送进馆里；车早停在后门，现在展柜一碎，就拿运输箱来接。学校那些害人的零食，味道和罐里飘出来的一模一样！你们是想把罐子运出去，再提炼里面的东西吧？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '神秘家长',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '呵，鼻子倒灵。之前的零食只掺了一点试制品，罐里的老烟膏才是“青髓”的原料。学生一闹，馆里忙着疏散，我们正好以赞助方的名义“抢救展品”。先运去城南提炼，再送码头。动手，装箱！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '谁也别想碰展品！大伙抄家伙，把这群狗腿子打醒！',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '沈家护卫',
        leftPortrait: 'assets/art/shen_guard_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '箱子从后门走。你们几个拦住这群孩子，别让他们追上来！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '重点班学生',
        leftPortrait: 'assets/art/senior_athlete_corrupted@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（眼神发直，扑向挡在展柜前的人）别拦我……我要罐子里的东西！',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '两名黑衣人趁乱把瓷罐塞进运输箱推向后门，其余保镖拦住去路；吸入烟气的学生也失控扑了上来！',
      buttonText: '【展开战斗 · 守护博物馆】',
      battleId: 'ch10_battle1',
      isBattleTrigger: true
    }
  },

  // s4: 战后追踪 · 线索落入城南
  ch10_scene_tracking: {
    id: 'ch10_scene_tracking',
    title: '博物馆后门 · 黑色货车的去向',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_museum_square@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '最后一名保镖倒地，众人才发现运输箱早被另两人从后门推出。那辆贴着基金会临时通行证的黑色金杯车刚好发动，装着古瓷罐冲上了街！',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '该死！让他们把古董抢走了！这帮人光天化日之下也太猖狂了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '别慌，我记下了车牌尾号。他们走的是向南的高架桥，那是往城南老工业区开的。',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'right',
        text: '（脸色煞白，手指死死攥紧）……城南废弃汽修街？那地方……是我爸修车铺子所在的街区。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '疑云重重，伙伴们立即拦下出租车，直扑城南老汽修街！',
      buttonText: '【前往城南 · 开启第十二章】',
      targetScene: 'ch11_scene_slum_street'
    }
  }
};
