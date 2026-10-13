/**
 * 第十八章《孤注一掷》剧情脚本数据表（第二幕 第8章）
 *
 * 流程结构：
 * - ch17_scene_alter_breach: 破门突入洋行地下祭坛，覃瑞怡被铁链锁在石柱前，全班档案悬在毒火之上
 * - ch17_scene_father_shield: 夺回信物与档案，沈崇礼暴怒掷出剧毒钢针，老爸海峰肉身挡针中伏坠江
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
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '地下祭坛阴森刺骨，巨大的青铜血池中翻滚着墨绿色的药浆。覃瑞怡被粗铁链绑在石柱上，脸色惨白，嘴角满是咬破的血痕；沈崇礼正手持药碗，一步步逼向她！',
        sfx: 'sfx_suspense'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/shen_chongli_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_resolute@2x.png',
        activeSide: 'left',
        text: '（面目狰狞地冷笑）乖乖把药喝下去！只要你这个全省三好学生成了福寿堂的药傀儡，你们整个学校所有的重点尖子生，就全都是沈家的囊中之物！',
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
        text: '住手！沈崇礼，看看你爷爷的信物在谁手上！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '{MC_NAME}手持赤心销烟钎飞身斩断铁链，然而狂怒的沈崇礼从腰间拔出了淬了毒的连发钢弩！',
      buttonText: '【救下同伴 · 夺取档案】',
      targetScene: 'ch17_scene_father_shield'
    }
  },

  // s2: 肉身挡钎 · 坠入暗河
  ch17_scene_father_shield: {
    id: 'ch17_scene_father_shield',
    title: '祭坛崩塌处 · 悲壮的背影',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_warehouse_poison_altar@2x.png',
    bgm: 'bgm_eerie_revelation',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '徐老师飞扑而上抢回悬在火盆上的全班学生档案！被彻底逼上绝路的沈崇礼彻底发疯，按动机关，三根淬满剧毒的漆黑长针如闪电般直射向护在最前面的少年们！',
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
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '一道像堵墙一样宽厚的身影猛然横空挡在孩子们身前！“噗嗤”数声闷响，三根毒针尽数深深刺入海峰的前胸与咽喉下沿，黑血瞬间浸透了他的防刺警服！',
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
        text: '（嘴角溢着黑血，却竭尽全力挤出一丝最温暖的笑容，猛地拉响了防爆破拆索）快……带着孩子们……走！记住……老爸永远是……光荣的警察……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '轰然一声巨响，防爆索炸碎了祭坛承重柱，整个地下石窟大面积坍塌！狂涌的地下暗河激流奔腾而过，将重伤的海峰与崩塌的石桥一同卷入无底的暗河深渊……',
        sfx: 'sfx_shock_sting'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '石屑崩落，四面八方涌来上百名黑衣死士堵死退路！',
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
    bgm: 'bgm_suspense',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '在徐老师与刘老师拼死搏杀下，主角团终于护送着覃瑞怡冲出了坍塌的地下货栈。暴雨倾盆浇在每个人的脸上，分不清究竟是雨水还是血泪。',
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
        text: '（抹干脸上的泪水，紧紧攥住胸前海峰留下的金色警徽，眼神是从未有过的坚毅与冷冽）瑞怡，站起来。我爸是用命换回了你，换回了我们所有人。哭解决不了任何问题，血债……必须用胜利来偿还！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '海叔叔一定还活着！但在这之前，沈崇礼和沈万廷就藏在货栈最顶层的洋行指挥塔。我们现在就杀上去，把这盘跨越两百年的毒根连根拔起！',
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
