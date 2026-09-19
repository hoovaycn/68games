/**
 * 第四章《她是谁》剧情脚本数据表
 *
 * 这一章要把三件事立起来：
 * 1. 参展阵容是谁（划掉，应该是放学校外堵人，没有成果展设定）；
 * 2. 一年级小同学只是普通 NPC，但他的话把危险提前抖出来；
 * 3. 张希哲不是“以前也中过招”，而是这次第一次主动伸手，第一次被顶住。
 */

export const CHAPTER3_STORY = {
  ch3_scene_exhibition: {
    id: 'ch3_scene_exhibition',
    title: '放学 · 校外堵人',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '上周操场的事消停了没两天，放学的时候校门外人行道又堵了一群人。七八个穿别校藏青运动服的外校学生一字排开。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '领头的正是被异化的体育生队长，胳膊底下夹着一兜青蓝色的异化饮料，见本校学生出来就往人怀里塞。小伙伴们刚走到校门口，张希哲抱着足球走在最前面。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '魔化外校队长',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '免费的！体考内部特供，喝一口立定跳远多跳一米，八百米跑满分跟玩似的！不要钱，白给！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '一年级小同学',
        leftPortrait: 'assets/art/grade1_student_default@2x.png',
        rightPortrait: 'assets/art/senior_athlete_leader_corrupted@2x.png',
        activeSide: 'left',
        text: '我、我老师说不能要陌生人的东西……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '魔化外校队长',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted@2x.png',
        rightPortrait: 'assets/art/grade1_student_default@2x.png',
        activeSide: 'left',
        text: '什么陌生人，我是隔壁体校的，跟你们体育老师熟得很，让你拿着就拿着，别不识抬举。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '外校队长伸手就把饮料往小孩怀里怼。一年级小同学攥着书包带往后缩，声音发颤。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '抱着足球正要回家的张希哲看见这阵仗，几步冲上去把那个一年级小同学护在身后，伸手把饮料挡了回去。',
        sfx: 'sfx_confirm'
      },
      {
        id: 8,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/senior_athlete_leader_corrupted@2x.png',
        activeSide: 'left',
        text: '你干什么？没看见人家小孩不想要吗？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '魔化外校队长',
        leftPortrait: 'assets/art/senior_athlete_leader_corrupted@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_default@2x.png',
        activeSide: 'left',
        text: '关你屁事？给脸不要脸是吧。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '外校队长嗤笑一声推了张希哲一把，两边当场推搡起来，混乱中半瓶饮料被挤得“啪”地摔在水泥地上，青蓝色发光的液体流了一地，那股甜得发腻的怪味一下散开。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '外校人仗着人多，撸着袖子就围了上来。',
      buttonText: '【准备帮忙】',
      targetScene: 'ch3_scene_gate'
    }
  },

  ch3_scene_gate: {
    id: 'ch3_scene_gate',
    title: '校门口 · 第一次中招',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street@2x.png',
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '张希哲把那个一年级小同学死死护在身后。对面这群外校体育生又高又大，人又多，硬打绝对打不过，咬得后槽牙都紧了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '只要喝了那瓶饮料，我就能立刻变强，就能护住小同学和我的伙伴儿了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '张希哲弯腰捡起那瓶饮料，一仰头就灌了半瓶。青蓝色的光瞬间从他眼底漫上来，他两三下就把围上来的几个外校学生推倒在地，动作比平时快了整整一倍。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '可等他转过身，眼睛已经全是青光，直勾勾盯着刚冲到面前的小伙伴们，完全认不出眼前的人了。他抬脚“咚”地一脚把足球狠狠踢到这边，摆出了进攻的架势。',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '异化张希哲',
        leftPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '都别过来…… 挡我者输。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        activeSide: 'left',
        text: '张希哲！你疯了吗？为了护住大家，你竟然自己喝了那个异化饮料！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 7,
        speaker: '{ALLY_1_NAME}',
        leftPortrait: '{ALLY_1_PORTRAIT}',
        rightPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        activeSide: 'left',
        text: '快醒醒！你不是说要一起打跑这些坏人吗？别被它控制了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 8,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_default@2x.png',
        rightPortrait: 'assets/art/zhangxizhe_corrupted@2x.png',
        activeSide: 'left',
        text: '张希哲！你这个大笨蛋，谁要你用这种方式保护我们了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 9,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '覃瑞怡举着花球当场就红了眼圈，朱晏泽下意识往前一步又硬生生停住。大家举着武器瞬间僵在原地，谁都不敢真下手——那是自己同班同学。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 10,
        speaker: '系统提示',
        leftPortrait: 'assets/art/shadow_woman_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '就在两边僵住、外校人又要往上围的时候，教学楼连廊口的阴影里慢慢走出一个黑影。那黑影平时总是躲在教务处窗帘后，看不清面目，此时却一步步朝这边走来。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 11,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/shadow_woman_default@2x.png',
        activeSide: 'left',
        text: '那是谁？是敌人吗？',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 12,
        speaker: '系统提示',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '黑影现身了，大家才看清——那是平时道法课上总坐在最后一排、几乎没什么存在感的刘老师。徐老师正跟在她身边。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 13,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '都别慌！道法刘老师是自己人，我们俩背着学校查这东西，已经查了十几年了。',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 14,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '十几年？！那不是比咱们年纪还长？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 15,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '具体的事儿咱们待会再说，先应付眼前这场战斗。他是你们同学，不是怪物。记住——打醒他，别打伤他。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'JOIN_PARTY',
      unitIds: ['teacher_xu', 'adult_liu'],
      prompt: '徐老师和刘老师一前一后护住孩子们，准备先把张希哲从那股念头里拽回来。',
      buttonText: '【结阵迎敌】',
      battleId: 'ch3_battle1',
      isBattleTrigger: true
    }
  },

  ch3_scene_recover: {
    id: 'ch3_scene_recover',
    title: '校门口 · 十几年前就有的影子',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '打到张希哲站不稳、晃悠着要摔倒的时候，覃瑞怡举着花球冲上去，扯着嗓子喊他的名字。喊到第三声的时候，张希哲眼睛里的青光一下就退了，腿一软坐在了地上，满头是汗。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 2,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '我刚才…… 是不是差点踢到你们了？我脑子里就一直转着‘我要变强、不能拖大家后腿’，别的什么都记不清了。',
        sfx: 'sfx_unit_down'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'right',
        text: '没事，这次你是为了护小同学，比上次某些大傻子，稀里糊涂中招强多了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '朱晏泽',
        leftPortrait: 'assets/art/zhuyanze_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '大姐，你直接报我身份证号得了，你才是大傻子呢！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: 'assets/art/senior_athlete_leader_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '被打醒的外校队长蹲在地上，抱着头把知道的全说了。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '外校队长',
        leftPortrait: 'assets/art/senior_athlete_leader_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '饮料都是我们教练给的，他说喝了稳拿全国第一。货从来不用我们去取，隔段时间就有人悄悄放在训练室门口，我们从来没见过送货的人长什么样，问多了教练就骂。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 7,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刘老师似乎想到了什么，神色忽然凝重起来。大家瞬间安静下来。',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '刘老师似乎有话要说。',
      buttonText: '【耐心听刘老师说】',
      targetScene: 'ch3_scene_truth'
    }
  },

  ch3_scene_truth: {
    id: 'ch3_scene_truth',
    title: '校门口 · 十几年的轮子',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street@2x.png',
    bgm: 'bgm_evil_lair',
    dialogues: [
      {
        id: 1,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '这东西不是今年才冒出来的。一到大考季它就回来，为了追求好成绩，毕业班永远是重灾区。我追了它十几年，徐老师捡瓶子、锁抽屉、夜里跟我见面，都是在查这件事。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '刘老师蹲在地上，把空饮料瓶一个个捡起来塞进帆布包，她包里已经攒了厚厚一叠异化零食的包装纸，最旧的那一张已经黄得发脆，边角都磨破了。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '我们上学的时候就有这东西，我当老师了它还在。一届一届，从来没断过。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '原来这东西已经在学校里转了这么多年了……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大家愣在原地。本以为自己只是在打几个捣乱的小混混，一抬头才发现，面前是个深不见底的洞，它背后到底是什么？',
        highlight: true,
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '这一次，大家不打算再等着对方自己找上门。',
      buttonText: '【顺藤摸瓜】',
      targetScene: 'ch4_scene_team_meeting'
    }
  }
};
