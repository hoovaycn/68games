/**
 * 消耗品配置表（V2 服务层 / goods 分类表 3/4）
 *
 * ── 分类原则（用户拍板的三大类） ─────────────────────────────
 * category: 'growth' 成长道具   —— 永久加点（permanent: true）
 * category: 'restore' 回复道具  —— 回血/回蓝/解状态
 * category: 'battle'  战斗道具 —— 战斗内增益（duration 结束回合）
 *
 * 方向映射（数值学科 ↔ 属性方向，全表统一执行）：
 *   数学 → HP / 力量(str) 方向
 *   语文 → MP / 魔力(mag) 方向
 *   英语 → 敏捷(spd) / 智慧(skl) 方向
 *
 * ── effects 声明式契约（联调轮的 ItemService 按此解释执行） ──
 * { stat, value, duration?, permanent? }
 *   stat: 'hp'|'mp'|'str'|'mag'|'skl'|'spd'|'luk'|'def'|'res'|'mov'
 *         |'avoid'|'hit'(命中被削用负值)|'crit'|'cleanse'(解除异常)
 *   value: number | 'full'（全恢复哨兵）
 *   duration: 'turn'(本回合结束) | 'battle'(本场战斗) | 'nextAttack'(下次攻击)
 *   permanent: true 表示永久成长（growth 类物品必带）
 *
 * 附带负面效果用 drawback 字段（同 effects 契约），榴莲蛋糕按用户设计：
 * HP+40 但「下回合被命中时承受伤害+10」。
 *
 * use_in_battle / use_in_field / stack 与旧 items.js 完全同构，
 * sausage / bastard_soda 数值原样收编，combat.js useItem 直接可用。
 */

export const CONSUMABLES = {
  /* ══════════ 成长道具（permanent） ══════════ */
  math_exam: {
    id: 'math_exam',
    name: '数学卷子',
    kind: 'consumable',
    category: 'growth',
    desc: '一张写满红叉的期末数学卷。把每道错题重算一遍，胳膊和脑子都结实了一点。永久 力量+1、HP上限+2。',
    effects: [
      { stat: 'str', value: 1, permanent: true },
      { stat: 'hp', value: 2, permanent: true }
    ],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  chinese_exam: {
    id: 'chinese_exam',
    name: '语文卷子',
    kind: 'consumable',
    category: 'growth',
    desc: '背面印着「背诵全文」的语文卷。背完之后胸口发烫，词汇像咒语一样往外冒。永久 魔力+1、MP上限+3。',
    effects: [
      { stat: 'mag', value: 1, permanent: true },
      { stat: 'mp', value: 3, permanent: true }
    ],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  english_exam: {
    id: 'english_exam',
    name: '英语卷子',
    kind: 'consumable',
    category: 'growth',
    desc: '密密麻麻的完形填空。做到第三篇时眼睛变尖、手变快，连橡皮落地都能接住。永久 敏捷+1、智慧+1。',
    effects: [
      { stat: 'spd', value: 1, permanent: true },
      { stat: 'skl', value: 1, permanent: true }
    ],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  teacher_thermos: {
    id: 'teacher_thermos',
    name: '徐老师的保温杯',
    kind: 'consumable',
    category: 'growth',
    desc: '不锈钢杯身磕出好几个坑，里面泡着枸杞。握一会儿，那种稳当的烫传到掌心。永久 防御+1、魔防+1。',
    effects: [
      { stat: 'def', value: 1, permanent: true },
      { stat: 'res', value: 1, permanent: true }
    ],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  olympiad_medal: {
    id: 'olympiad_medal',
    name: '奥数奖牌',
    kind: 'consumable',
    category: 'growth',
    desc: '华罗庚金杯赛铜牌，缎带都褪色了。挂在脖子上沉甸甸的，是熬过三十道应用题的勋章。永久 力量+2、幸运+1。',
    effects: [
      { stat: 'str', value: 2, permanent: true },
      { stat: 'luk', value: 1, permanent: true }
    ],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  sudoku: {
    id: 'sudoku',
    name: '数独九宫格',
    kind: 'consumable',
    category: 'growth',
    desc: '一本越涂越厚的数独题册。填满九个格子的时候，脑子里像装了台小电脑。永久 智慧+2。',
    effects: [{ stat: 'skl', value: 2, permanent: true }],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  jump_rope: {
    id: 'jump_rope',
    name: '跳皮筋',
    kind: 'consumable',
    category: 'growth',
    desc: '女生跳皮筋时扯到后脑勺的那根红绳。跟着节奏跳三天，腿脚利索得能躲粉笔头。永久 敏捷+2。',
    effects: [{ stat: 'spd', value: 2, permanent: true }],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },
  eye_patch: {
    id: 'eye_patch',
    name: '蒸汽眼罩',
    kind: 'consumable',
    category: 'growth',
    desc: '午休时敷上的发热眼罩。蒸汽散尽，眼前和心头都亮堂堂的。永久 HP上限+3、魔防+1。',
    effects: [
      { stat: 'hp', value: 3, permanent: true },
      { stat: 'res', value: 1, permanent: true }
    ],
    use_in_battle: false,
    use_in_field: true,
    stack: 9
  },

  /* ══════════ 回复道具 ══════════ */
  sausage: {
    id: 'sausage',
    name: '烤肠',
    kind: 'consumable',
    category: 'restore',
    desc: '路边摊的淀粉烤肠，滋滋冒油，虽然不健康但能立刻恢复体力。恢复 16 HP。',
    effects: [{ stat: 'hp', value: 16 }],
    use_in_battle: true,
    use_in_field: true,
    stack: 9
  },
  white_rabbit_candy: {
    id: 'white_rabbit_candy',
    name: '大白兔奶糖',
    kind: 'consumable',
    category: 'restore',
    desc: '半透明米纸包着的那颗甜。含在嘴里慢慢化掉，力气和话都回来了。恢复 8 HP、5 MP。',
    effects: [
      { stat: 'hp', value: 8 },
      { stat: 'mp', value: 5 }
    ],
    use_in_battle: true,
    use_in_field: true,
    stack: 9,
    icon: 'assets/items/milk_candy.png'
  },
  durian_cake: {
    id: 'durian_cake',
    name: '榴莲蛋糕',
    kind: 'consumable',
    category: 'restore',
    desc: '放学路上买的整块榴莲千层。吃完满血复活，但气味太冲，容易被敌人精准照顾。恢复 40 HP；下回合被命中时承受伤害 +10。',
    effects: [{ stat: 'hp', value: 40 }],
    drawback: [{ stat: 'damageTaken', value: 10, duration: 'turn' }],
    use_in_battle: true,
    use_in_field: true,
    stack: 9
  },
  sanitary_pad: {
    id: 'sanitary_pad',
    name: '崭新的姨妈巾',
    kind: 'consumable',
    category: 'restore',
    desc: '书包夹层常备的日用型。翅膀展开的时候特别有安全感。恢复 25 HP，并解除当前负面状态。',
    effects: [
      { stat: 'hp', value: 25 },
      { stat: 'cleanse', value: 1 }
    ],
    use_in_battle: true,
    use_in_field: true,
    stack: 9
  },
  grandmas_chicken: {
    id: 'grandmas_chicken',
    name: '姥姥炖的大鸡腿',
    kind: 'consumable',
    category: 'restore',
    desc: '酱色的老卤炖出来的整只鸡腿，油亮亮地反光。从指尖暖到脚后跟。HP/MP 全恢复。',
    effects: [
      { stat: 'hp', value: 'full' },
      { stat: 'mp', value: 'full' }
    ],
    use_in_battle: true,
    use_in_field: true,
    stack: 3
  },
  candied_haw: {
    id: 'candied_haw',
    name: '冰糖葫芦',
    kind: 'consumable',
    category: 'restore',
    desc: '裹着亮晶晶糖壳的山楂串。咬开糖衣，酸甜的汁水顺着喉咙往下淌。恢复 20 HP。',
    effects: [{ stat: 'hp', value: 20 }],
    use_in_battle: true,
    use_in_field: true,
    stack: 9
  },
  honey_tea: {
    id: 'honey_tea',
    name: '蜂蜜柚子茶',
    kind: 'consumable',
    category: 'restore',
    desc: '保温杯里泡开的蜂蜜柚子茶，甜里带一点苦。嗓子润了，念咒也顺了。恢复 25 MP。',
    effects: [{ stat: 'mp', value: 25 }],
    use_in_battle: true,
    use_in_field: true,
    stack: 9
  },
  moms_lunchbox: {
    id: 'moms_lunchbox',
    name: '妈妈做的便当',
    kind: 'consumable',
    category: 'restore',
    desc: '早上出门前妈妈塞进书包的保温饭盒。饭菜还热着，是那种不会让你输的味道。恢复 30 HP、15 MP。',
    effects: [
      { stat: 'hp', value: 30 },
      { stat: 'mp', value: 15 }
    ],
    use_in_battle: true,
    use_in_field: true,
    stack: 3
  },

  /* ══════════ 战斗道具（增益） ══════════ */
  bastard_soda: {
    id: 'bastard_soda',
    name: '混蛋汽水',
    kind: 'consumable',
    category: 'battle',
    desc: '气特别足的杂牌玻璃瓶汽水。恢复 6 HP，本回合攻速 +3。',
    effects: [
      { stat: 'hp', value: 6 },
      { stat: 'spd', value: 3, duration: 'turn' }
    ],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  grandpas_dentures: {
    id: 'grandpas_dentures',
    name: '爷爷的假牙',
    kind: 'consumable',
    category: 'battle',
    desc: '咬上去咔哒作响的口簧。含着它说话漏风，但出拳格外带劲。下次攻击 力量 +4。',
    effects: [{ stat: 'str', value: 4, duration: 'nextAttack' }],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  snot_paper: {
    id: 'snot_paper',
    name: '鼻涕纸',
    kind: 'consumable',
    category: 'battle',
    desc: '揉成一团的餐巾纸，脏但管用。往地上一撒对方就下不去手。本回合回避 +20。',
    effects: [{ stat: 'avoid', value: 20, duration: 'turn' }],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  merit_certificate: {
    id: 'merit_certificate',
    name: '三好学生证书',
    kind: 'consumable',
    category: 'battle',
    desc: '烫金红本本，校长签发。展开举起的一瞬间，浑身都端正了。本场战斗全属性 +2。',
    effects: [{ stat: 'all', value: 2, duration: 'battle' }],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  cheat_sheet: {
    id: 'cheat_sheet',
    name: '作弊小抄',
    kind: 'consumable',
    category: 'battle',
    desc: '掌心大小、六号字排版的密写小抄。看一眼答案，出手格外笃定。本回合命中 +15。',
    effects: [{ stat: 'hit', value: 15, duration: 'turn' }],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  scream_chicken: {
    id: 'scream_chicken',
    name: '尖叫鸡',
    kind: 'consumable',
    category: 'battle',
    desc: '一捏就发出凄厉尖叫的橡胶鸡。它一嗓子，对面的破绽全露出来了。本回合 暴击+20。',
    effects: [{ stat: 'crit', value: 20, duration: 'turn' }],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  cooling_oil: {
    id: 'cooling_oil',
    name: '清凉油',
    kind: 'consumable',
    category: 'battle',
    desc: '小铁盒里的绿色药膏，抹在太阳穴凉得发颤。脑子一激灵，咒语格外狠。下次攻击 魔力+4。',
    effects: [{ stat: 'mag', value: 4, duration: 'nextAttack' }],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  },
  earplug: {
    id: 'earplug',
    name: '隔音耳塞',
    kind: 'consumable',
    category: 'battle',
    desc: '橙色的泡沫耳塞，捏扁塞进耳朵，世界瞬间安静。听不见吼声，就只剩自己稳稳的心跳。本回合 防御+3、魔防+3。',
    effects: [
      { stat: 'def', value: 3, duration: 'turn' },
      { stat: 'res', value: 3, duration: 'turn' }
    ],
    use_in_battle: true,
    use_in_field: false,
    stack: 9
  }
};
