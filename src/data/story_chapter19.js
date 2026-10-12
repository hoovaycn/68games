/**
 * 第二十章《破晓钟声》剧情脚本数据表（第二幕 第10章 · 第二幕大决战与终章）
 *
 * 流程结构：
 * - ch19_scene_final_stand: 顶层钟楼巅峰对决前夕，沈崇礼与机械巨灵沈万廷狂暴合体
 * - ch19_battle1: 第二幕终极决战（少年团齐心血战 VS 福寿堂百年巨灵魔尊沈氏父子）
 * - ch19_scene_boss_destroyed: 战后纯剧情①：赤心木钎刺破巨灵魔核，百年鸦片原浆彻底汽化净化，沈氏父子彻底伏法
 * - ch19_scene_miracle_reunion: 战后纯剧情②：警笛轰鸣特警全线控制现场，浑身缠满绷带的老爸海峰奇迹生还归来，父子/父女深情相拥
 * - ch19_scene_dawn_epilogue: 战后纯剧情③（大结局）：破晓钟声长鸣，阴霾尽散。加密卫星电话闪烁来自公海的密电，抛出第三幕全新宏大悬念
 */

export const CHAPTER19_STORY = {
  // s1: 巅峰对决前夕 · 百年魔躯
  ch19_scene_final_stand: {
    id: 'ch19_scene_final_stand',
    title: '货栈顶层钟楼大厅 · 魔尊降世',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_auditorium@2x.png',
    bgm: 'bgm_boss_intro',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '钟楼顶层的钢铁穹顶在雷电中剧烈颤抖。悬浮的青黑巨心猛烈收缩，化作一具高达四米、缠绕着黑气与高压蒸汽的钢铁巨灵骸骨！沈万廷那具干瘪的残躯赫然嵌在魔躯的心脏正中，双眼闪烁着猩红凶光！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/adult_villain_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（操纵着神经连接器，歇斯底里地嘶吼）见识一下两百年洋行积累的无上神威吧！任何妄图对抗沈家的人，都将被碾碎成这钟楼上的残渣骨灰！！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（双手紧握老爸留下的警徽，眼神坚如磐石）我爸用生命守护的公道，今天由我们亲手讨回来！！',
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '大家结成七星破邪阵！把所有的正气与信念注入赤心木钎，彻底粉碎两百年的罪恶宿命！！',
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '钢铁巨灵挥舞着带有剧毒倒刺的百吨重拳狂暴砸下！终极决战打响！',
      buttonText: '【决战开始 · 终结百年罪恶】',
      battleId: 'ch19_battle1',
      isBattleTrigger: true
    }
  },

  // s2: 决战胜利 · 巨灵崩解
  ch19_scene_boss_destroyed: {
    id: 'ch19_scene_boss_destroyed',
    title: '残破的钟楼露台 · 圣光涤荡',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_auditorium@2x.png',
    bgm: 'bgm_battle_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '{MC_NAME}高高跃起，将燃烧着浩然烈火的“赤心销烟钎”精准无误地刺入了巨灵魔核的心脏！耀眼的金芒如同一千个太阳般在黑夜中骤然绽放！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '在刺耳凄厉的惨叫声中，翻滚的百年鸦片黑气在浩然正气金焰的灼烧下迅速汽化瓦解。钢铁巨灵四分五裂轰然坍塌，沈万廷的残躯随之化为灰烬，沈崇礼瘫软在废墟中，面如死灰，双目失神。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/adult_villain_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（颤抖着看着自己的双手，喃喃自语）输了……福寿堂两百年的基业……竟然输在了一帮中学生手里……',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: 'assets/art/qinruiyi_default@2x.png',
        activeSide: 'left',
        text: '我们赢了……我们真的打赢了不可战胜的魔王！！',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '楼下突然响起了震耳欲聋的警笛长鸣，刺目的红蓝警灯划破夜空！',
      buttonText: '【望向楼下 · 奇迹重逢】',
      targetScene: 'ch19_scene_miracle_reunion'
    }
  },

  // s3: 警灯耀夜 · 英雄归来
  ch19_scene_miracle_reunion: {
    id: 'ch19_scene_miracle_reunion',
    title: '钟楼大厅废墟门前 · 铁汉柔情',
    bgType: 'street',
    bgImg: 'assets/backgrounds/bg_street_dusk@2x.png',
    bgm: 'bgm_battle_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '数十名全副武装的省公安厅特警破门而入，迅速将现场封锁并扣押了沈崇礼。负伤包扎的徐老师和刘老师相互搀扶着快步走来，而走在最前方的……竟然是一个裹着厚厚军大衣、胸前缠满急救绷带的高大身影！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/teacher_pe_default@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（虽然脸色苍白、步履蹒跚，但嘴角依然挂着那抹标志性大大咧咧的笑容）臭孩子，哭什么鼻子呢？老子好歹是省厅连续五年格斗比武第一名，这点小阴沟还能翻了老子的船？',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/teacher_pe_default@2x.png',
        activeSide: 'left',
        text: '（呆愣了半秒，随即不顾一切地扑进海峰怀里，眼泪决堤般倾泻而出）爸——！！！你没死！你真的没死！！呜呜呜……',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '（眼角湿润，拍着海峰完好的右肩）老海命大，被暗河冲出三号闸口时，正好撞在水警巡逻艇的防撞网上，军医及时推注了抗毒血清！',
        sfx: 'sfx_confirm'
      },
      {
        id: 5,
        speaker: '语文刘老师',
        leftPortrait: 'assets/art/adult_liu_default@2x.png',
        rightPortrait: 'assets/art/teacher_xu_default@2x.png',
        activeSide: 'left',
        text: '二十年前被夺走的公道与尊严……今天，终于在这一届孩子手中彻底夺回来了。阿瑶，你看到了吗……',
        sfx: 'sfx_text_blip'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '东方地平线上，第一缕金色的朝阳穿透重重阴霾，破晓降临！',
      buttonText: '【迎接破晓 · 第二幕大结局】',
      targetScene: 'ch19_scene_dawn_epilogue'
    }
  },

  // s4: 破晓钟声 · 未完的公海暗流（第二幕尾声与第三幕悬念）
  ch19_scene_dawn_epilogue: {
    id: 'ch19_scene_dawn_epilogue',
    title: '钟楼最高处 · 破晓时分的钟声',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_auditorium@2x.png',
    bgm: 'bgm_battle_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阳光洒满大地，古运河与整座繁华的都市重新沐浴在安宁祥和的晨曦中。钟楼顶部的百年大钟在微风中敲响——当、当、当……清亮激越的钟声回荡在江水之上，洗尽了百年沧桑铅华。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_NAME}',
        activeSide: 'left',
        text: '暑假的阳光真暖和啊。家长会的威胁消失了，全班同学的档案保住了，我们终于可以堂堂正正迎接新学期了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '然而，在被特警带上警车的沈崇礼口袋里，一部从未登记过的加密卫星电话悄然亮起蓝光屏幕。屏幕上跳出一条没有发信人地址的冰冷密电：',
        highlight: true,
        sfx: 'sfx_suspense'
      },
      {
        id: 4,
        speaker: '卫星加密密电',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『崇礼，岸上内陆据点失守在预料之中，不必挂怀。福寿堂真正的远洋母体船队已在东海公海集结，“新世纪深海繁育试验场”已进入最后测试阶段……真正的游戏，才刚刚拉开序幕。』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 5,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '第二幕 · 完【百年宿怨虽已终，公海波涛意未平。敬请期待第三幕：公海决战篇！】',
        highlight: true,
        sfx: 'sfx_confirm'
      }
    ],
    transition: {
      type: 'CHOICE',
      prompt: '第二幕全篇落幕。',
      buttonText: '【重返主菜单】',
      targetScene: 'title_screen'
    }
  }
};
