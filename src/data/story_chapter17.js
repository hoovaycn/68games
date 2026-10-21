/**
 * 第十八章《孤注一掷》剧情脚本数据表（第二幕 第8章）
 *
 * 流程结构：
 * - ch17_scene_alter_breach: 破门突入洋行地下祭坛，覃瑞怡被铁链锁在石柱前，桌上摆着全班的送药名单
 * - ch17_scene_father_shield: 夺回信物与名单，沈崇礼暴怒掷出剧毒钢针，老爸海峰肉身挡针中伏坠江
 * - ch17_battle1: 祭坛绝境突围战（主角团 + 两位老师悲愤爆发 VS 暴走死士狂潮）
 * - ch17_scene_tearful_retreat: 杀出地窟，绝境中擦干眼泪，誓灭百年魔巢
 */

export const CHAPTER17_STORY = {
  // s1: 突入祭坛 · 救赎与决断
  ch17_scene_alter_breach: {
    id: 'ch17_scene_alter_breach',
    title: '洋行仓库地下核心 · 毒池祭台',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse_poison_altar@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        activeSide: 'left',
        text: '众人从检修通道冲进仓库地下室。覃瑞怡被锁在柱子上，沈崇礼端着一碗绿药逼她喝；销烟杖放在毒池旁，桌上还摊着六 8 班的家庭联系表，每户地址旁都画了记号。',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        activeSide: 'left',
        text: '喝下去！你是班长，又是优秀学生，只要连你都替我们说这药好，学校里还会有多少人相信你、跟着吃？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: 'assets/art/shen_chongli_default@2x.png',
        activeSide: 'left',
        text: '（奋力将药碗撞翻在地，声嘶力竭地怒喊）做梦！！我死也不会把灵魂卖给你们这帮恶魔！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: 'assets/art/shen_chongli_default@2x.png',
        activeSide: 'left',
        text: '住手！海叔叔去挡住保镖，我去拿池边的销烟杖，先把瑞怡救下来！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '{MC_NAME}趁海峰挡住保镖，抢回池边的销烟杖，敲开锁住覃瑞怡的旧锁。沈崇礼见状，掏出藏在腰间的毒针发射器！',
      buttonText: '【救下同伴 · 抢回名单】',
      targetScene: 'ch17_scene_father_shield'
    }
  },

  // s2: 肉身挡针 · 坠入暗河
  ch17_scene_father_shield: {
    id: 'ch17_scene_father_shield',
    title: '祭坛崩塌处 · 悲壮的背影',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse_poison_altar@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '徐老师趁乱抢走桌上标了住址的送药单，塞进怀里。沈崇礼按动机关，三根淬着毒的长针射向护在最前面的孩子们！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '小心——！！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '海峰冲到孩子们身前，用身体挡下三根毒针。针扎进他脖子和胸前的衣服，毒性很快发作，他站都站不稳了。',
        bgm: 'bgm_eerie_revelation',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        activeSide: 'left',
        text: '（瞳孔骤缩，整个人撕心裂肺地哭喊）爸——！！！爸你醒醒啊！！！不要！！不要扔下我！！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（从腰间摸出警用破拆索，拴向身后的承重柱）带着孩子们走……地下出口快塌了，我给你们挡住后面的人。记住，老爸是警察。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '破拆索炸断了柱子，石桥塌进地下暗河，堵住追来的守卫，却也把海峰卷进水里。他胸前的警徽掉在岸边，{ALLY_2_NAME}捡起它，被徐老师拉向另一侧的出口。',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '主桥塌了，另一侧维修楼梯却被赶来的黑衣守卫堵住。想逃到地面，必须先打通这条路！',
      buttonText: '【悲愤化作力量 · 绝境杀出重围】',
      battleId: 'ch17_battle1',
      isBattleTrigger: true
    }
  },

  // s3: 杀出重围 · 誓灭妖魔
  ch17_scene_tearful_retreat: {
    id: 'ch17_scene_tearful_retreat',
    title: '货栈雨夜出口 · 废墟中的誓言',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_warehouse_grand_hall@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '大家沿另一侧的维修楼梯逃到地面，徐老师和刘老师挡住追兵，终于把覃瑞怡带出地下室。海峰被暗河冲走，谁也不知道他是否还活着。',
        sfx: 'sfx_text_blip'
      },
      {
        id: 2,
        speaker: '覃瑞怡',
        leftPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（扑倒在泥泞中，双手捂着脸痛哭流涕）都是我的错……是我害了海叔叔……如果我没有擅自跑出来……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '（握紧刚捡起的警徽）瑞怡，先站起来。我爸拼命让我们逃出来，不是要我们再回去送死。先找到沈家，把他和其他人都救回来。',
        highlight: true,
        bgm: 'bgm_army_approaching',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '海叔叔被水冲走了，也许还有救。沈家父子就在这栋仓库顶层；我们先和警方保持联系，再从地面绕上去堵住他们，不能让他们带着毒药跑了。',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '众人重整阵型，覃瑞怡擦干眼泪重新归队，手指指向货栈顶层的探照灯！',
      buttonText: '【重整旗鼓 · 开启第十九章】',
      targetScene: 'ch18_scene_warehouse_breach'
    }
  }
};
