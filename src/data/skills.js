/**
 * 技能配置表（V2 服务层）
 *
 * ── Schema 约定 ─────────────────────────────────────────────
 * id        string 唯一（snake_case）
 * name      string 显示名
 * scope     'class'（职业技，全职业共享）| 'personal'（个人技，角色专属）
 * ownerClass  scope='class' 时必填，绑定 classId
 * ownerUnit   scope='personal' 时必填，绑定 unitId
 * mpCost    number ≥1（技能驱动力，消费 unit.currentMp）
 * target    'self' | 'ally' | 'enemy'
 * range     [min, max] 作用距离（曼哈顿距离）
 * duration  'turn'(本回合结束) | 'battle'(本场战斗) | 'nextAttack'（下次攻击）
 * effect    声明式单一效果，KindService（联调轮落地）按此解释执行：
 *   { kind: 'heal'|'buff'|'debuff'|'damage', ... }
 *     heal:    { amount: number }                  —— 回复固定值
 *     buff:    { stats: { 'str'|'mag'|'skl'|'spd'|'luk'|'def'|'res'|'mov'|'avoid'|'hit'|'crit': number } }
 *     debuff:  { stats: { ...同上, 负值允许 } }
 *     damage:  { power: 'str'|'mag', might: number } —— 伤害 = 基础属性 + might
 * desc      文案
 * ─────────────────────────────────────────────────────────────
 * 设计原则：
 *  - 拉拉操队员（奶妈）治疗/辅助技单独成组，量级对标 FE 僧侣；
 *  - MP 上限由职业表 base.mp 提供；本表只声明消耗；
 *  - 本轮只做数据+注册校验；施放 UI / MP 槽 / 动画在联调轮接入 main.js。
 */

export const SKILLS = {
  /* ══════════ 职业技：普通小学生（学生通用） ══════════ */
  morning_reading: {
    id: 'morning_reading',
    name: '早读的力量',
    scope: 'class',
    ownerClass: 'primary_student',
    mpCost: 2,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { skl: 2 } },
    desc: '放声朗读十分钟。声音越哑，脑子越清楚。'
  },
  review_notes: {
    id: 'review_notes',
    name: '考前划重点',
    scope: 'class',
    ownerClass: 'primary_student',
    mpCost: 3,
    target: 'ally',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'buff', stats: { avoid: 10 } } ,
    desc: '递给同桌自己整理的重点小抄。看一眼，躲老师的粉笔头就有数了。'
  },

  /* ══════════ 职业技：体育健将（战士） ══════════ */
  full_sprint: {
    id: 'full_sprint',
    name: '全力冲刺',
    scope: 'class',
    ownerClass: 'sports_star',
    mpCost: 4,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { spd: 3, mov: 1 } },
    desc: '起跑器蹬出去的那一下。四百米能追回来，一个操场算什么。'
  },
  blood_rally: {
    id: 'blood_rally',
    name: '热血宣言',
    scope: 'class',
    ownerClass: 'sports_star',
    mpCost: 5,
    target: 'self',
    range: [0, 0],
    duration: 'nextAttack',
    effect: { kind: 'buff', stats: { str: 4 } },
    desc: '当着全班的面喊出「下一球一定进」。喊出去的话，泼出去的水。'
  },

  /* ══════════ 职业技：学习委员（魔法师） ══════════ */
  dictation_storm: {
    id: 'dictation_storm',
    name: '默写风暴',
    scope: 'class',
    ownerClass: 'study_committee',
    mpCost: 5,
    target: 'enemy',
    range: [1, 2],
    duration: null,
    effect: { kind: 'damage', power: 'mag', might: 6 },
    desc: '把整页单词表砸向目标。会拼的疼在身上，不会拼的疼在心里。'
  },
  evening_lullaby: {
    id: 'evening_lullaby',
    name: '晚自习催眠曲',
    scope: 'class',
    ownerClass: 'study_committee',
    mpCost: 4,
    target: 'enemy',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'debuff', stats: { skl: -3, spd: -3 } },
    desc: '一段能让趴倒一片的旋律。被点中的人眼皮当场变四斤重。'
  },

  /* ══════════ 职业技：学酥（弓箭手） ══════════ */
  quick_peek: {
    id: 'quick_peek',
    name: '快速抄袭',
    scope: 'class',
    ownerClass: 'xuesu',
    mpCost: 3,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { crit: 25 } },
    desc: '眯眼一瞥三行答案。抄得快的人，运气也是实力。'
  },
  cram_prayer: {
    id: 'cram_prayer',
    name: '临时抱佛脚',
    scope: 'class',
    ownerClass: 'xuesu',
    mpCost: 2,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { skl: 3, spd: 3 } },
    desc: '考前一晚把整本书翻出响。头悬梁锥刺股，就管这一回合。'
  },

  /* ══════════ 职业技：拉拉操队员（奶妈 · 治疗组） ══════════ */
  cheer_song: {
    id: 'cheer_song',
    name: '啦啦队之歌',
    scope: 'class',
    ownerClass: 'cheerleader',
    mpCost: 5,
    target: 'ally',
    range: [1, 2],
    duration: null,
    effect: { kind: 'heal', amount: 15 },
    desc: '卡在半空的声线稳稳落下来。被喊到名字的人，伤口好像没那么疼了。'
  },
  wave_cheer: {
    id: 'wave_cheer',
    name: '人浪加油',
    scope: 'class',
    ownerClass: 'cheerleader',
    mpCost: 3,
    target: 'ally',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'buff', stats: { spd: 3, avoid: 15 } },
    desc: '一排人跟着节拍起伏。踩着浪的人，脚步都轻。'
  },
  spirit_burst: {
    id: 'spirit_burst',
    name: '元气大爆发',
    scope: 'class',
    ownerClass: 'cheerleader',
    mpCost: 6,
    target: 'ally',
    range: [1, 2],
    duration: 'nextAttack',
    effect: { kind: 'buff', stats: { str: 2, mag: 2 } },
    desc: '彩球哗啦一声甩上天。受到声援的人，下一击带着全场的分贝。'
  },

  /* ══════════ 职业技：人民教师（boss 型） ══════════ */
  chalk_sniper: {
    id: 'chalk_sniper',
    name: '粉笔狙击',
    scope: 'class',
    ownerClass: 'teacher',
    mpCost: 5,
    target: 'enemy',
    range: [1, 2],
    duration: null,
    effect: { kind: 'damage', power: 'mag', might: 7 },
    desc: '从讲台上不动声色地出手。三十年的教龄，三十年的准头。'
  },
  sudden_rollcall: {
    id: 'sudden_rollcall',
    name: '突然点名',
    scope: 'class',
    ownerClass: 'teacher',
    mpCost: 4,
    target: 'enemy',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'debuff', stats: { skl: -3, spd: -3, luk: -3 } },
    desc: '「最后一排那位同学，你来回答。」被点名者当机三秒。'
  },

  /* ══════════ 职业技：社会闲散人员（敌方共用） ══════════ */
  shake_down: {
    id: 'shake_down',
    name: '敲竹杠',
    scope: 'class',
    ownerClass: 'street_loafer',
    mpCost: 3,
    target: 'enemy',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'debuff', stats: { def: -3 } },
    desc: '围着人转两圈，啧啧两声。被盯上的人下意识抱紧了书包。'
  },
  wall_hugger: {
    id: 'wall_hugger',
    name: '溜墙根',
    scope: 'class',
    ownerClass: 'street_loafer',
    mpCost: 2,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { avoid: 20 } },
    desc: '贴着墙根走，影子都懒得跟。想逮住他先蹲下。'
  },

  /* ══════════ 个人技：单位卡专属 ══════════ */
  // ★ 招牌技与人设绑定（skills ↔ units.personalSkill 双向互指，registry 校验）
  chess_gambit: {
    id: 'chess_gambit',
    name: '王车易位',
    scope: 'personal',
    ownerUnit: 'zhangzixiao',
    mpCost: 3,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { def: 4, avoid: 10 } },
    desc: '棋盘上保命的第一手。王先躲进安全角——想将死我？再算三步。'
  },
  art_vision: {
    id: 'art_vision',
    name: '一眼速写',
    scope: 'personal',
    ownerUnit: 'shiyunuo',
    mpCost: 4,
    target: 'enemy',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'debuff', stats: { hit: -15, skl: -2 } },
    desc: '盯你三秒，破绽全被画进写生本。被看穿的人，出手都是慢半拍的败笔。'
  },
  gossip_report: {
    id: 'gossip_report',
    name: '课后八卦',
    scope: 'personal',
    ownerUnit: 'chenpinxuan',
    mpCost: 3,
    target: 'enemy',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'debuff', stats: { hit: -20 } },
    desc: '「你们还不知道吧——」一句话让对面当场走神。六 8 班特派员的独家武器。'
  },
  hidden_might: {
    id: 'hidden_might',
    name: '沉默怪力',
    scope: 'personal',
    ownerUnit: 'fanwenmo',
    mpCost: 4,
    target: 'self',
    range: [0, 0],
    duration: 'nextAttack',
    effect: { kind: 'buff', stats: { str: 4 } },
    desc: '平时连书包带都懒得系紧的瘦小个子，攥拳的那一刻全班突然安静。'
  },
  witty_notes: {
    id: 'witty_notes',
    name: '鬼点子笔记',
    scope: 'personal',
    ownerUnit: 'zhanghanyu',
    mpCost: 4,
    target: 'ally',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'buff', stats: { mag: 3, skl: 2 } },
    desc: '笔记本里三分笔记、七分歪点子。被借阅的人成绩没涨，主意倒是多了一堆。'
  },
  flute_serenade: {
    id: 'flute_serenade',
    name: '长笛小夜曲',
    scope: 'personal',
    ownerUnit: 'heyanxi',
    mpCost: 3,
    target: 'ally',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'buff', stats: { def: 3, res: 3 } },
    desc: '校乐队首席的一段温柔旋律。听到的人心定了，肩膀也硬了。'
  },
  authoritative_gaze: {
    id: 'authoritative_gaze',
    name: '权威凝视',
    scope: 'personal',
    ownerUnit: 'xu_laoshi',
    mpCost: 5,
    target: 'enemy',
    range: [1, 2],
    duration: 'turn',
    effect: { kind: 'debuff', stats: { hit: -25 } },
    desc: '扶了扶眼镜，看过来一眼。对面的准头当场矮了半截。'
  },
  full_energy: {
    id: 'full_energy',
    name: '元气满满',
    scope: 'personal',
    ownerUnit: 'qinruiyi',
    mpCost: 2,
    target: 'self',
    range: [0, 0],
    duration: 'turn',
    effect: { kind: 'buff', stats: { mov: 2 } },
    desc: '原地蹦了两下，拍拍手上的粉笔灰。跑起来像一阵小旋风。'
  },
  bicycle_kick: {
    id: 'bicycle_kick',
    name: '倒挂金钩',
    scope: 'personal',
    ownerUnit: 'zhangxizhe',
    mpCost: 4,
    target: 'self',
    range: [0, 0],
    duration: 'nextAttack',
    effect: { kind: 'buff', stats: { str: 3, spd: 2 } },
    desc: '禁区里腾空倒勾的招牌动作。作业写得完的人，球也踢得进。'
  },
  pocket_treat: {
    id: 'pocket_treat',
    name: '请大家吃大餐',
    scope: 'personal',
    ownerUnit: 'zhuyanze',
    mpCost: 4,
    target: 'ally',
    range: [1, 2],
    duration: null,
    effect: { kind: 'heal', amount: 12 },
    desc: '「放学都别走，今天我请！」钱包一拍，伤口都好得快了三分。'
  }
};
