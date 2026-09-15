/**
 * 预设单位配置表（V2 服务层）
 *
 * ── Schema 约定 ─────────────────────────────────────────────
 * 基础字段（V1 兼容，spawn 直接消费）：
 *   id/name/title/gender, classId(→CLASSES), level, exp,
 *   equippedWeapon(→WEAPONS), inventory[{id,count}],
 *   statBonus(保留字段，V2 起 personalGrowth 承担成长分化),
 *   portrait/walkSprite/themeColor/quotes
 * V2 新增字段（服务层消费，联调轮接入 UI）：
 *   bio            人物简介（图鉴/选人卡/支援对话用）
 *   personalGrowth 个人成长修正（%），叠加到职业 growth 后 roll
 *   personalSkill  个人技 id（→SKILLS，scope='personal'）
 *   joinsAt        入队章节钩子（story service 消费）
 *   originBonus    出身背景一次性微量加成（文档化数值典故）
 * ─────────────────────────────────────────────────────────────
 * 数值总原则：面板基调由职业表决定；个人特色全部走 personalGrowth/personalSkill，
 * 不再出现“每人一张独立职业”的 V1 写法（职业体系敌我共用的前提）。
 *
 * ── 人设定稿（用户钦定，不得擅改） ─────────────────────────
 *  张子骁：擅长国际象棋，学酥（一碰就变学渣）
 *  石予诺：擅长美术，学酥（一碰就变学渣）
 *  范文默：瘦小但力量特别大，原本是个学渣
 *  张瀚瑜：「瀚」字为正，古灵精怪
 *  何妍熹：音乐特长，长笛，学习好
 *  陈品璇：身高马大，力量强劲（兼八卦特派员，女线剧情钩子）
 *  覃瑞怡：拉拉操奶妈，学习好（替占位卡沈嘉禾上岗）
 *  张希哲：男生，体育生，踢足球，学习好
 *  朱晏泽：帅气的富二代
 *  头像规范：assets/portraits/{unitId}_default.png（缺失走默认兜底，用户统一补图）
 *
 * ── 双线入队时序（用户计划，story service 落地时按此接线） ──
 *  男线：张子骁 → 张瀚瑜(ch0_male_aid) → 击败范文默后收编
 *  女线：石予诺 → 陈品璇(ch0_female_aid) → 击败何妍熹后收编
 *  合流：双线统一后，张希哲/覃瑞怡/朱晏泽/徐老师陆续入队
 *  （占位说明：walk placeholder 现役仅 6 色，重复色属预期，素材后补）
 */

export const UNITS = {
  /* ══════════ 双主角（学酥 · 男线） ══════════ */
  zhangzixiao: {
    id: 'zhangzixiao',
    name: '张子骁',
    title: '六 8 班棋王',
    gender: 'male',
    classId: 'xuesu',
    level: 1,
    exp: 0,
    equippedWeapon: 'pencil',
    inventory: [
      { id: 'paper_plane', count: 1 },
      { id: 'white_rabbit_candy', count: 2 }
    ],
    bio: '开学第一周就把全班拖进「放学杀一盘」的死循环。算棋的时候眼里只有六十四个格子，考试的时候草稿纸比谁都白。一看是学霸，一碰全是渣——但没人敢小看他：能同时算三步之后的人，掀棋盘都比你快。',
    personalGrowth: { skl: 10, luk: 10 },   // 棋手底子：算度 + 棋运
    personalSkill: 'chess_gambit',
    joinsAt: 'prologue_male',
    portrait: 'assets/portraits/zhangzixiao_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_blue.png',
    themeColor: '#2563eb',
    quotes: {
      move: '让我算算这步棋……',
      attack: '将军（Check）！',
      death: '等等……我还没算完这步……'
    }
  },

  /* ══════════ 双主角（学酥 · 女线） ══════════ */
  shiyunuo: {
    id: 'shiyunuo',
    name: '石予诺',
    title: '六 8 班美术课代表',
    gender: 'female',
    classId: 'xuesu',
    level: 1,
    exp: 0,
    equippedWeapon: 'pencil',
    inventory: [
      { id: 'water_bottle', count: 1 },
      { id: 'white_rabbit_candy', count: 2 }
    ],
    bio: '美术教室的钉子户，速写本上全是同学的后脑勺。外号「人形打印机」——看一眼就能画个七八分像。可惜文化课也是照着画的：看着像会了，一上手全是渣。铅笔是她的武器，画得越像，挨得越准。',
    personalGrowth: { skl: 15, spd: 10 },    // 画手底子：观察 + 手速
    personalSkill: 'art_vision',
    joinsAt: 'prologue_female',
    portrait: 'assets/portraits/shiyunuo_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_pink.png',
    themeColor: '#db2777',
    quotes: {
      move: '这个角度的光线不错。',
      attack: '别动！就这么站着！',
      death: '画歪了……让我重来……'
    }
  },

  /* ══════════ 怪力少年（女线援军 · 八卦特派员） ══════════ */
  chenpinxuan: {
    id: 'chenpinxuan',
    name: '陈品璇',
    title: '六 8 班情报部长',
    gender: 'female',
    classId: 'strong_boy',
    level: 2,
    exp: 0,
    equippedWeapon: 'basketball',
    inventory: [
      { id: 'sausage', count: 1 }
    ],
    bio: '六 8 班个子最高的女生，校运动会铅球纪录保持者，兼职全班情报中心。谁家有事她第一个知道，谁想瞒事先过她这一关。力气大、嗓门大、消息灵——「八卦特派员」这名号，是她自己封的。',
    personalGrowth: { spd: 15, luk: 10 },    // 大块头反向灵敏：追人追得快
    personalSkill: 'gossip_report',
    joinsAt: 'ch0_female_aid',
    portrait: 'assets/portraits/chenpinxuan_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red.png',
    themeColor: '#ea580c',
    quotes: {
      move: '最新的消息我全都知道。',
      attack: '喊出来就不怕了！',
      death: '这个消息……是真的吗……'
    }
  },

  /* ══════════ 怪力少年（男线谜底 · 击败后收编） ══════════ */
  fanwenmo: {
    id: 'fanwenmo',
    name: '范文默',
    title: '六 8 班沉默怪力',
    gender: 'male',
    classId: 'strong_boy',
    level: 2,
    exp: 0,
    equippedWeapon: 'exercise_bat',
    inventory: [
      { id: 'sausage', count: 2 },
      { id: 'white_rabbit_candy', count: 1 }
    ],
    bio: '全班个子最小的男生，校服像挂在衣架上。但开学搬书大战里，他一个人摞起了全班的新课本。话少、作业本常年空白——力气都替脑子长了。瘦小是伪装，掰手腕没输过。',
    personalGrowth: { str: 15, def: 10 },    // 怪力本力
    personalSkill: 'hidden_might',
    joinsAt: 'ch0_male_boss_defeat',
    portrait: 'assets/portraits/fanwenmo_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black.png',
    themeColor: '#7c3aed',
    quotes: {
      move: '……',
      attack: '对不起。',
      death: '……疼。'
    }
  },

  /* ══════════ 学习委员（男线援军 · 古灵精怪） ══════════ */
  zhanghanyu: {
    id: 'zhanghanyu',
    name: '张瀚瑜',
    title: '六 8 班学习委员',
    gender: 'male',
    classId: 'study_committee',
    level: 2,
    exp: 0,
    equippedWeapon: 'chalk_head',
    inventory: [
      { id: 'cheat_sheet', count: 1 }
    ],
    bio: '成绩单干净得像刚洗过的黑板，脑子却比谁都野。笔记本里三分是笔记、七分是歪点子：谁的糗事、哪的漫画、怎么躲课间操，全都门儿清。古灵精怪，鬼主意比作业多——而且鬼主意从来不扣分。',
    personalGrowth: { mag: 15, skl: 10 },    // 脑子活：学得杂、用得刁
    personalSkill: 'witty_notes',
    joinsAt: 'ch0_male_aid',
    portrait: 'assets/portraits/zhanghanyu_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_green.png',
    themeColor: '#059669',
    quotes: {
      move: '跟我来，我熟路。',
      attack: '这招我在漫画里见过！',
      death: '啊——暴露了！'
    }
  },

  /* ══════════ 学习委员（女线谜底 · 击败后收编） ══════════ */
  heyanxi: {
    id: 'heyanxi',
    name: '何妍熹',
    title: '六 8 班首席长笛',
    gender: 'female',
    classId: 'study_committee',
    level: 2,
    exp: 0,
    equippedWeapon: 'flute',
    inventory: [
      { id: 'white_rabbit_candy', count: 2 }
    ],
    bio: '校乐队首席长笛，成绩常年班级前五，琴声和成绩单一样漂亮。头发永远一丝不苟，说话永远客客气气——连给你挖坑的时候都带着礼貌的微笑。学习好是真的，不好惹也是真的。',
    personalGrowth: { mag: 10, res: 15 },    // 学霸心防：稳得住
    personalSkill: 'flute_serenade',
    joinsAt: 'ch0_female_boss_defeat',
    portrait: 'assets/portraits/heyanxi_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_white.png',
    themeColor: '#0891b2',
    quotes: {
      move: '请跟上我的节奏。',
      attack: '这一个音，送给你的耳朵。',
      death: '音准……怎么偏了……'
    }
  },

  /* ══════════ 人民教师（后期敌转友） ══════════ */
  xu_laoshi: {
    id: 'xu_laoshi',
    name: '徐老师',
    title: '六 8 班班主任',
    gender: 'male',
    classId: 'teacher',
    level: 8,
    exp: 0,
    equippedWeapon: 'teaching_pointer',
    inventory: [
      { id: 'teacher_thermos', count: 1 }
    ],
    bio: '教了三十年数学的老班主任。讲台是他的城堡，粉笔头是他的狙击枪，教室后门玻璃上的那双眼睛是全班公敌。口头禅：「这道题我讲过没有？讲过没有？」——讲过，真讲过。',
    personalGrowth: { str: 10, mag: 10 },    // 三十年教龄，文武双修
    personalSkill: 'authoritative_gaze',
    joinsAt: 'merged_route_ch1',
    portrait: 'assets/portraits/teacher_xu_default.png', // 画作键是 teacher_xu（见 engine/avatar.js FILE_KEYS）
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_black.png',
    themeColor: '#57534e',
    quotes: {
      move: '都坐好，我要讲了。',
      attack: '上课不许睡觉！',
      death: '下课……这次真的下课了……'
    }
  },

  /* ══════════ 拉拉操队员（奶妈 · 合流后入队） ══════════ */
  qinruiyi: {
    id: 'qinruiyi',
    name: '覃瑞怡',
    title: '六 8 班拉拉操队长',
    gender: 'female',
    classId: 'cheerleader',
    level: 3,
    exp: 0,
    equippedWeapon: 'pom_pom',
    inventory: [
      { id: 'white_rabbit_candy', count: 3 }
    ],
    bio: '拉拉操队长，成绩好得让体育老师都意外——训练间隙永远抱着课本。嗓门能穿透整个操场，队友摔倒第一个冲过去，书包里创可贴和单词本一样多。学习好、体力好、心眼好，全班的「编外班主任」。',
    personalGrowth: { mp: 15, luk: 10 },     // 奶妈底子：蓝条厚、手气好
    personalSkill: 'full_energy',
    joinsAt: 'merged_route_join',
    portrait: 'assets/portraits/qinruiyi_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_red.png',
    themeColor: '#e11d48',
    quotes: {
      move: '预备——跑！',
      attack: '加油加油加油！',
      death: '再撑一下，支援马上到……'
    }
  },

  /* ══════════ 体育健将（合流后入队） ══════════ */
  zhangxizhe: {
    id: 'zhangxizhe',
    name: '张希哲',
    title: '校队前锋',
    gender: 'male',
    classId: 'sports_star',
    level: 3,
    exp: 0,
    equippedWeapon: 'football',
    inventory: [
      { id: 'bastard_soda', count: 2 }
    ],
    bio: '校队前锋，期末成绩单和比赛获奖证书并排贴在冰箱上。老师口中「别人家的孩子」：球踢得进、题解得开，体育课后从不喊累。唯一的烦恼是——借作业的同学从教室排到走廊。',
    personalGrowth: { str: 10, spd: 10 },    // 体育生：又快又硬
    personalSkill: 'bicycle_kick',
    joinsAt: 'merged_route_join',
    portrait: 'assets/portraits/zhangxizhe_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_blue.png',
    themeColor: '#16a34a',
    quotes: {
      move: '球场见！',
      attack: '射门——走你！',
      death: '下半场……我们能翻盘……'
    }
  },

  /* ══════════ 普通小学生（合流后入队 · 富二代） ══════════ */
  zhuyanze: {
    id: 'zhuyanze',
    name: '朱晏泽',
    title: '六 8 班金主同学',
    gender: 'male',
    classId: 'primary_student',
    level: 3,
    exp: 0,
    equippedWeapon: 'fountain_pen',
    inventory: [
      { id: 'sausage', count: 3 }
    ],
    bio: '全班最帅的富二代，限量球鞋一周一换，笑起来没心没肺。出手阔绰到小卖部老板见了都鞠躬，那支笔帽镶金尖的钢笔是他最不心疼的「小玩意」。口头禅：「放学别走，今天我请。」',
    personalGrowth: { luk: 15, res: 5 },     // 含着金汤匙出生：运气好、皮实
    personalSkill: 'pocket_treat',
    joinsAt: 'merged_route_join',
    portrait: 'assets/portraits/zhuyanze_default.png',
    walkSprite: 'assets/sprites/placeholder/walk_placeholder_white.png',
    themeColor: '#ca8a04',
    quotes: {
      move: '都让让，今天我请客。',
      attack: '这可是限量款！',
      death: '账单……怎么这么长……'
    }
  }
};
