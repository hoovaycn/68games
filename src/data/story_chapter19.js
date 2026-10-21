/**
 * 第二十章《破晓钟声》剧情脚本数据表（第二幕 第10章 · 第二幕大决战与终章）
 *
 * 流程结构：
 * - ch19_scene_final_stand: 顶层钟楼巅峰对决前夕，沈崇礼与机械巨灵沈万廷狂暴合体
 * - ch19_battle1: 第二幕终极决战（少年团齐心血战 VS 福寿堂百年巨灵魔尊沈氏父子）
 * - ch19_scene_boss_destroyed: 战后纯剧情①：浩然销烟杖刺破巨灵魔核，百年鸦片原浆彻底汽化净化，沈氏父子彻底伏法
 * - ch19_scene_miracle_reunion: 战后纯剧情②：警笛轰鸣特警全线控制现场，浑身缠满绷带的老爸海峰奇迹生还归来，父子/父女深情相拥
 * - ch19_scene_dawn_epilogue: 战后纯剧情③（大结局）：破晓钟声长鸣，阴霾尽散。加密卫星电话闪烁来自公海的密电，抛出第三幕全新宏大悬念
 */

export const CHAPTER19_STORY = {
  // s1: 巅峰对决前夕 · 百年魔躯
  ch19_scene_final_stand: {
    id: 'ch19_scene_final_stand',
    title: '货栈顶层钟楼大厅 · 魔尊降世',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_intense_boss',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '控制台启动了。毒雾灌进中央的机器，外面的金属架一节节撑开，变成一具四米高的钢铁怪物。沈万廷就在机器胸口的驾驶舱里，沈崇礼站在控制台旁操纵它。',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/boss_colossus_opium_god@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '你们拦得住守卫，拦得住这台机器吗？等毒雾从钟楼散出去，城里的学校都会收到我们的新药！',
        sfx: 'sfx_shock_sting'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（握紧警徽）我爸生死未卜，我们更不能让他的努力白费。先毁机器，救城里的人！',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 4,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '六个人互相掩护！先避开它的手臂，打掉控制台，再用销烟杖去碰机器胸口的核心！',
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
    title: '残破的钟楼露台 · 圣光普照',
    bgType: 'classroom',
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: null,
        activeSide: 'left',
        text: '控制台被砸坏，怪物的手臂慢了下来。{MC_NAME}趁机爬上倒下的金属架，用销烟杖击中胸口的核心。杖上的金光一下子照亮了整个钟楼！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '系统提示',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
        rightPortrait: null,
        activeSide: 'left',
        text: '机器停止运转，黑烟被金光压了回去。金属外壳散架，驾驶舱里的沈万廷再也没有动静；沈崇礼从控制台旁跌坐到地上，已经没有人替他挡路。',
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '沈崇礼',
        leftPortrait: 'assets/art/mystery_man_corrupted@2x.png',
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
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_childhood',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '省厅增援终于赶到，带走了沈崇礼。徐老师和刘老师互相扶着走进来，身后几名医护人员还推着一副担架。担架上的人裹着大衣，胸前缠满绷带——是海峰！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 2,
        speaker: '老爸海峰',
        leftPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        rightPortrait: '{ALLY_2_PORTRAIT}',
        activeSide: 'left',
        text: '（躺在担架上，勉强扯出一点笑）哭什么，我还在呢。让医生先把我抬稳，你再扑过来。',
        highlight: true,
        sfx: 'sfx_confirm'
      },
      {
        id: 3,
        speaker: '{ALLY_2_NAME}',
        leftPortrait: '{ALLY_2_PORTRAIT}',
        rightPortrait: 'assets/art/father_haifeng_battle_damaged@2x.png',
        activeSide: 'left',
        text: '（趴到担架边，握住海峰的手）爸！你真的还活着……我以为再也见不到你了！',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 4,
        speaker: '徐老师',
        leftPortrait: 'assets/art/teacher_xu_default@2x.png',
        rightPortrait: 'assets/art/adult_liu_default@2x.png',
        activeSide: 'left',
        text: '水警在三号闸口的巡逻艇上找到了他，立刻送医。省厅已经备好针对那种毒针的解毒药，医生说他伤得很重，但救回来了。',
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
    bgImg: 'assets/backgrounds/bg_clocktower_summit@2x.png',
    bgm: 'bgm_victory',
    dialogues: [
      {
        id: 1,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '阳光洒满大地，古运河与整座繁华的都市重新沐浴在安宁祥和的晨曦中。钟楼顶部的百年大钟在微风中敲响——当、当、当……清亮激越的钟声回荡在江水之上，洗掉了百年来的风霜。',
        sfx: 'sfx_confirm'
      },
      {
        id: 2,
        speaker: '{MC_NAME}',
        leftPortrait: '{MC_PORTRAIT}',
        rightPortrait: '{ALLY_1_PORTRAIT}',
        activeSide: 'left',
        text: '暑假的阳光真暖和啊。警方已经通知了全班家长，沈崇礼那张抓人的名单也被我们拿回来了。大家都平安，总算能踏实迎接新学期了！',
        sfx: 'sfx_text_blip'
      },
      {
        id: 3,
        speaker: '张希哲',
        leftPortrait: 'assets/art/zhangxizhe_default@2x.png',
        rightPortrait: '{MC_PORTRAIT}',
        activeSide: 'left',
        text: '（伸了个懒腰）就是有点可惜，这暑假光顾着打架、穿越，作业一个字没写……开学不会被老师留堂吧？',
        sfx: 'sfx_text_blip'
      },
      {
        id: 4,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '另一边，警员清点沈崇礼的随身物品时，发现一部没登记过的卫星电话。屏幕突然亮起，一条没有署名的新消息跳了出来：',
        highlight: true,
        bgm: 'bgm_suspense',
        sfx: 'sfx_suspense'
      },
      {
        id: 5,
        speaker: '卫星加密密电',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '『崇礼，城里的据点丢了，我们知道。海上的船队还在，新的试验也已经开始。你没完成的事，会有人接着做。』',
        highlight: true,
        sfx: 'sfx_shock_sting'
      },
      {
        id: 6,
        speaker: '系统提示',
        leftPortrait: null,
        rightPortrait: null,
        activeSide: 'left',
        text: '第二幕 · 完。沈家父子被阻止了，但海上还有人继续制造那种药。',
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
