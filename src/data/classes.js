/**
 * 职业配置表（V2 服务层）
 * 基础九维 + MP 十维：hp / mp / str / mag / skl / spd / luk / def / res（+mov 移动，不参与成长）
 * growth 为 FE 随机成长率（%），升级时逐项 roll；个人修正见 units.js 的 personalGrowth。
 *
 * ── Schema 约定 ─────────────────────────────────────────────
 * base     初始面板（含 mp 初始蓝量；mov 不成长）
 * growth   升级成长率 0~100（每级每项按概率 +1）
 * families 该职业可用武器族白名单（联调轮接佩戴校验；见 goods/weapons.js 的 family）
 * legacy   true = V1 遗留职业，数值冻结，仅旧章节模板引用；新内容一律用 V2 职业
 * ─────────────────────────────────────────────────────────────
 * 双主角迁移说明（学酥线，用户定稿）：
 *  张子骁（擅长国际象棋）/ 石予诺（擅长绘画）均为「学酥」——看着像学霸，一碰全是渣。
 *  两主 classId 迁入 xuesu，靠 personalGrowth + personalSkill 分化棋手 / 画手人设。
 *  xuesu.base 十维刻意对齐 primary_student（str 锁 7），保证两大回归关卡不被打破：
 *  [回归1] 男线第二战：张子骁 str 7 + 铅笔 6 − 混混 def 2 = 11 伤/击，三击 ≥ 混混 HP 24（spd 抬升后无双击秒杀；attacker 位击杀弹窗路径保留）
 *  [回归2] 女线第一战：石予诺 str 7 + 铅笔 6 − 商贩 def 1 = 12 ≥ 商贩 HP 11（one-shot 守位击杀路径保留）
 *  xuesu.growth 是全表第一梯队（潜力型：学酥前期突飞猛进，后期露馅）——用户定稿：
 *  双主都是学酥，成长值要高，升级正反馈拉满。
 * 另：范文默（瘦小学渣怪力）/ 陈品璇（身高马大力强）共用 strong_boy 怪力少年。
 */

export const CLASSES = {
  /* ══════════════════ V2 七大职业体系（敌我共用） ══════════════════ */

  // 1. 普通小学生 —— 均衡型（男主女主起步职业，后续剧情可分流）
  primary_student: {
    id: 'primary_student',
    name: '普通小学生',
    desc: '成绩中游、体育中游、存在感中游。但六年级的孩子，哪有真正的“普通”。',
    base: { hp: 23, mp: 12, str: 7, mag: 3, skl: 7, spd: 7, luk: 6, def: 5, res: 4, mov: 5 },
    growth: { hp: 60, mp: 30, str: 40, mag: 30, skl: 40, spd: 40, luk: 35, def: 30, res: 25 },
    families: ['笔', '投掷'],
    legacy: false
  },

  // 2. 体育健将 —— 战士型（陈品璇 / 范文默）
  sports_star: {
    id: 'sports_star',
    name: '体育健将',
    desc: '校运会的主力队员。课堂上的能量没处使，全攒在了操场上。',
    base: { hp: 26, mp: 8, str: 8, mag: 0, skl: 5, spd: 7, luk: 4, def: 6, res: 1, mov: 6 },
    growth: { hp: 80, mp: 20, str: 55, mag: 10, skl: 35, spd: 50, luk: 30, def: 40, res: 15 },
    families: ['球'],
    legacy: false
  },

  // 3. 学习委员 —— 魔法师型（张瀚瑜 / 何妍熹）
  study_committee: {
    id: 'study_committee',
    name: '学习委员',
    desc: '收作业时气场两米八。知识点在他们嘴里都是现成的武器。',
    base: { hp: 18, mp: 16, str: 3, mag: 8, skl: 7, spd: 5, luk: 6, def: 2, res: 8, mov: 5 },
    growth: { hp: 45, mp: 50, str: 15, mag: 60, skl: 45, spd: 30, luk: 40, def: 15, res: 55 },
    families: ['乐器', '粉笔'],
    legacy: false
  },

  // 4. 学酥 —— 潜力型（双主角职业：国际象棋 · 绘画；前期突飞猛进，后期露馅）
  xuesu: {
    id: 'xuesu',
    name: '学酥',
    desc: '看着像学霸，一碰全是渣。但潜力是真的——抄得快、手气好、升级猛，前中期谁也比不过。',
    base: { hp: 23, mp: 12, str: 7, mag: 3, skl: 7, spd: 7, luk: 6, def: 5, res: 4, mov: 5 },
    growth: { hp: 65, mp: 35, str: 45, mag: 35, skl: 65, spd: 60, luk: 60, def: 25, res: 30 },
    families: ['笔', '杂物'],
    legacy: false
  },

  // 5. 怪力少年 —— 重战士型（范文默：瘦小学渣怪力 / 陈品璇：身高马大力强）
  strong_boy: {
    id: 'strong_boy',
    name: '怪力少年',
    desc: '个头骗不了题目，但骗得了对手。写作业手抖的人，掰手腕全班投降。',
    base: { hp: 28, mp: 8, str: 10, mag: 0, skl: 5, spd: 6, luk: 5, def: 7, res: 1, mov: 5 },
    growth: { hp: 75, mp: 15, str: 60, mag: 5, skl: 30, spd: 40, luk: 25, def: 45, res: 10 },
    families: ['球', '钝器'],
    legacy: false
  },

  // 6. 拉拉操队员 —— 奶妈型（治疗/辅助，参照 FE 僧侣定位）
  cheerleader: {
    id: 'cheerleader',
    name: '拉拉操队员',
    desc: '运动会必到场的颜值担当。嗓子就是治疗术，节拍就是增益术。',
    base: { hp: 20, mp: 14, str: 4, mag: 6, skl: 6, spd: 7, luk: 8, def: 3, res: 9, mov: 5 },
    growth: { hp: 55, mp: 45, str: 20, mag: 45, skl: 40, spd: 45, luk: 50, def: 20, res: 60 },
    families: ['彩球'],
    legacy: false
  },

  // 7. 人民教师 —— boss 型（徐老师；中后期敌线也会出现被侵蚀的教师）
  teacher: {
    id: 'teacher',
    name: '人民教师',
    desc: '讲台就是高地，粉笔就是射程。一个眼神沉默一个班级。',
    base: { hp: 30, mp: 18, str: 9, mag: 6, skl: 8, spd: 6, luk: 7, def: 8, res: 8, mov: 5 },
    growth: { hp: 70, mp: 40, str: 50, mag: 40, skl: 45, spd: 35, luk: 40, def: 50, res: 50 },
    families: ['粉笔', '教具'],
    legacy: false
  },

  // 8. 社会闲散人员 —— 敌方共用（校门口混混 / 流动商贩等，中后期我方剧情俘虏可转正）
  street_loafer: {
    id: 'street_loafer',
    name: '社会闲散人员',
    desc: '在校门口和街角晃荡的散人。不好好上课，日子照样过得很凶。',
    base: { hp: 16, mp: 6, str: 6, mag: 1, skl: 4, spd: 5, luk: 3, def: 3, res: 1, mov: 5 },
    growth: { hp: 55, mp: 15, str: 40, mag: 10, skl: 30, spd: 35, luk: 20, def: 25, res: 15 },
    families: ['钝器', '杂物'],
    legacy: false
  },

  /* ══════════════════ legacy 职业（V1 遗留，数值冻结） ══════════════════ */
  // 说明：旧章节模板（ENEMIES.vendor/punk）仍引用，保留原数值不动仅补 mp 基线
  //   （唯一例外：school_punk 经男线第二战平衡轮解封微调，见该条目内注释）；
  // 新内容禁止再引用 legacy 职业，注册中心仅告警不报错。

  calligrapher: {
    id: 'calligrapher',
    name: '书法生',
    desc: '张子骁 V1 专属遗产职业。已由 xuesu（学酥）+ personalGrowth 取代。',
    base: { hp: 24, mp: 10, str: 7, mag: 0, skl: 6, spd: 6, luk: 5, def: 6, res: 2, mov: 5 },
    growth: { hp: 75, mp: 25, str: 45, mag: 10, skl: 40, spd: 40, luk: 35, def: 35, res: 15 },
    families: ['笔'],
    legacy: true
  },
  english_scholar: {
    id: 'english_scholar',
    name: '词汇生',
    desc: '石予诺 V1 专属遗产职业。已由 xuesu（学酥）+ personalGrowth 取代。',
    base: { hp: 21, mp: 12, str: 5, mag: 3, skl: 8, spd: 8, luk: 7, def: 4, res: 5, mov: 5 },
    growth: { hp: 60, mp: 30, str: 30, mag: 35, skl: 55, spd: 50, luk: 45, def: 25, res: 35 },
    families: ['杂物'],
    legacy: true
  },
  vendor_mob: {
    id: 'vendor_mob',
    name: '流动商贩',
    desc: '旧章节模板 enemy:vendor 引用中。新敌人请用 street_loafer。',
    base: { hp: 11, mp: 4, str: 3, mag: 0, skl: 3, spd: 2, luk: 1, def: 1, res: 0, mov: 3 },
    growth: { hp: 50, mp: 10, str: 25, mag: 5, skl: 25, spd: 20, luk: 10, def: 20, res: 5 },
    families: ['杂物'],
    legacy: true
  },
  school_punk: {
    id: 'school_punk',
    name: '高年级混混',
    desc: '旧章节模板 enemy:punk 引用中（男线第二战平衡轮解封调整）。新敌人请用 street_loafer。',
    // ★ 平衡纪要（任务 #6/#7，男线第二战）：
    //  hp 24 → 张子骁 11 伤/击需三击收头（攻速克制后 22 追击双击也秒不掉）
    //  spd 7 → AS 2→4，封死张子骁追击（旧值 AS 差恰踩 5 双击秒杀）
    //  str 8 + skl 8 → 反击 7 伤 / 62% 命中，两名混混围殴总伤越线，
    //  逼玩家用烤肠（+16）回血才赢；双击杀经验保底 128 ≥ 100，战后必升级
    base: { hp: 24, mp: 6, str: 8, mag: 0, skl: 8, spd: 7, luk: 2, def: 2, res: 0, mov: 4 },
    growth: { hp: 65, mp: 15, str: 45, mag: 5, skl: 35, spd: 40, luk: 20, def: 25, res: 10 },
    families: ['钝器'],
    legacy: true
  }
};
