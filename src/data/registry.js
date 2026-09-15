/**
 * 配置注册中心 + 启动自检（V2 服务层）
 *
 * 职责（本轮只做校验，不做任何运行时改写）：
 *  1. 跨表引用完整性（units/enemies → classes/weapons/skills/skills 双向绑定）
 *  2. 参数范围与结构合法性（武器/防具/消耗品/关键道具/技能/职业/单位）
 *  3. 术语表一致性（武器 family ↔ 职业白名单；个人技 ↔ 单位卡互指）
 *  4. 占位内容提醒（拉拉操队员占位名 / pending_ 章节钩子 / 计划剧情道具）
 *
 * 使用方式：
 *  - 浏览器：任何模块 import 本文件即自动跑一次（见文件尾部 autorun 哨兵，
 *    联调轮接 main.js 时零额外调用，控制台直接看到全部问题）
 *  - Node 自测：scripts/selftest_foundation.mjs 调 runStartupCheck({ silent: true })
 *    拿结构化结果断言，不产生控制台输出
 *
 * 设计约定：
 *  - 只 console.*，绝不 throw（一次性看到全部问题，不中断启动）
 *  - legacy 相关引用只 warn 不 error（V1 遗留：旧章节模板引用是预期内，新内容禁止）
 *  - 返回值 { ok, counts, errors, warnings }，供自测脚本断言
 */

import { WEAPONS, ARMORS, CONSUMABLES, KEY_ITEMS } from './goods/index.js';
import { CLASSES } from './classes.js';
import { SKILLS } from './skills.js';
import { UNITS } from './units.js';
import { ENEMIES } from './enemies.js';

/* ══════════ 术语白名单（与各表 Schema 注释一一对应） ══════════ */
const WEAPON_FAMILIES       = ['笔', '球', '乐器', '杂物', '投掷', '粉笔', '教具', '彩球', '钝器'];
const GROWTH_STATS          = ['hp', 'mp', 'str', 'mag', 'skl', 'spd', 'luk', 'def', 'res'];
const BASE_STATS            = [...GROWTH_STATS, 'mov'];
const CONSUMABLE_CATEGORIES = ['growth', 'restore', 'battle'];
const EFFECT_STATS          = ['hp', 'mp', 'str', 'mag', 'skl', 'spd', 'luk', 'def', 'res', 'mov', 'avoid', 'hit', 'crit', 'cleanse', 'all'];
const DRAWBACK_STATS        = ['damageTaken'];
const ITEM_DURATIONS        = ['turn', 'battle', 'nextAttack'];
const SKILL_DURATIONS       = ['turn', 'battle', 'nextAttack', null];
const SKILL_TARGETS         = ['self', 'ally', 'enemy'];
const SKILL_EFFECT_KINDS    = ['heal', 'buff', 'debuff', 'damage'];
const SKILL_BUFF_STATS      = ['str', 'mag', 'skl', 'spd', 'luk', 'def', 'res', 'mov', 'avoid', 'hit', 'crit'];

/** 拉拉操队员占位名清单（已定稿清空：覃瑞怡替沈嘉禾上岗，林一诺删除） */
const PENDING_NAME_UNITS = [];

/** 数值工具：isNum(x) = 有限数 */
const isNum = (x) => typeof x === 'number' && Number.isFinite(x);

/**
 * 启动自检主入口。纯函数：不修改任何表，重复调用结果一致。
 * @param {{ silent?: boolean }} opts  silent=true 时不做 console 输出（Node 断言用）
 */
export function runStartupCheck(opts = {}) {
  const silent = opts.silent === true;
  const errors = [];
  const warnings = [];
  const err = (cat, msg) => errors.push(`[${cat}] ${msg}`);
  const warn = (cat, msg) => warnings.push(`[${cat}] ${msg}`);

  const goodsTables = { weapons: WEAPONS, armors: ARMORS, consumables: CONSUMABLES, key_items: KEY_ITEMS };

  /* ══════ 0. 结构一致性：map 键名 === 条目 id，kind 归属正确 ══════ */
  const idMaps = { classes: CLASSES, skills: SKILLS, units: UNITS, enemies: ENEMIES, ...goodsTables };
  for (const [ns, map] of Object.entries(idMaps)) {
    for (const [key, entry] of Object.entries(map)) {
      if (!entry.id || entry.id !== key) {
        err('结构', `「${ns}.${key}」条目 id 字段（${JSON.stringify(entry.id)}）与键名不一致，运行时按 id 检索会失败`);
      }
    }
  }
  const kindExpect = { weapons: 'weapon', armors: 'armor', consumables: 'consumable', key_items: 'key_item' };
  for (const [tbl, map] of Object.entries(goodsTables)) {
    for (const key of Object.keys(map)) {
      if (map[key].kind !== kindExpect[tbl]) {
        err('结构', `「goods/${tbl}.${key}」kind 应为「${kindExpect[tbl]}」，实际「${map[key].kind}」`);
      }
    }
  }

  /* ══════ 1. id 唯一性：goods 四表跨表（指数展开会静默覆盖）；单位/敌人命名空间互撞 ══════ */
  const goodsIdSource = new Map(); // id -> 来源表名（检测跨表撞车）
  for (const [tbl, map] of Object.entries(goodsTables)) {
    for (const key of Object.keys(map)) {
      if (goodsIdSource.has(key)) {
        err('id唯一', `「${key}」在 goods/${goodsIdSource.get(key)} 与 goods/${tbl} 中重复定义（GOODS_INDEX 展开时后者会静默覆盖前者）`);
      } else {
        goodsIdSource.set(key, tbl);
      }
    }
  }
  for (const uid of Object.keys(UNITS)) {
    if (ENEMIES[uid]) warn('id唯一', `单位「${uid}」与敌人模板「${uid}」同名，存档花名册与敌方波次共用一套 id 时将无法区分，请改名`);
  }

  /* ══════ 2. 武器表参数 ══════ */
  for (const [id, w] of Object.entries(WEAPONS)) {
    const where = `武器「${id}」`;
    if (!WEAPON_FAMILIES.includes(w.family)) err('武器', `${where} family「${w.family}」不在九大武器族白名单内`);
    if (!['melee', 'ranged', 'magic'].includes(w.type)) err('武器', `${where} type 非法：${w.type}`);
    if (!['phys', 'magic'].includes(w.damageType)) err('武器', `${where} damageType 非法：${w.damageType}`);
    if ((w.type === 'magic') !== (w.damageType === 'magic')) {
      err('武器', `${where} type=${w.type} 与 damageType=${w.damageType} 语义冲突（combat.js 按 type==='magic' 走 mag 进攻）`);
    }
    if (!isNum(w.might) || w.might < 0) err('武器', `${where} might 非法：${w.might}`);
    if (!isNum(w.hit) || w.hit < 0 || w.hit > 100) err('武器', `${where} hit 应在 0~100：${w.hit}`);
    if (!isNum(w.crit) || w.crit < 0 || w.crit > 100) err('武器', `${where} crit 应在 0~100：${w.crit}`);
    if (!isNum(w.weight) || w.weight < 0) err('武器', `${where} weight 非法：${w.weight}`);
    if (!isNum(w.uses) || w.uses < 1) err('武器', `${where} uses 耐久应 ≥1：${w.uses}`);
    if (!isNum(w.levelReq) || w.levelReq < 1) err('武器', `${where} levelReq 应 ≥1：${w.levelReq}`);
    if (!isNum(w.stack) || w.stack < 1) err('武器', `${where} stack 应 ≥1：${w.stack}`);
    if (!Array.isArray(w.range) || w.range.length !== 2 || w.range[0] < 1 || w.range[0] > w.range[1] || w.range[1] > 5) {
      err('武器', `${where} range 应为 [min,max] 且 1 ≤ min ≤ max ≤ 5：${JSON.stringify(w.range)}`);
    }
  }

  /* ══════ 3. 防具表参数 ══════ */
  for (const [id, a] of Object.entries(ARMORS)) {
    const where = `防具「${id}」`;
    if (!isNum(a.def) || a.def < 0) err('防具', `${where} def 应 ≥0：${a.def}`);
    if (!isNum(a.res) || a.res < 0) err('防具', `${where} res 应 ≥0：${a.res}`);
    if (!isNum(a.weight) || a.weight < 0) err('防具', `${where} weight 应 ≥0：${a.weight}`);
    if (!isNum(a.movPenalty) || a.movPenalty < 0) err('防具', `${where} movPenalty 应 ≥0：${a.movPenalty}`);
    if (!isNum(a.avoid) || Math.abs(a.avoid) > 30) err('防具', `${where} avoid 幅度建议 |≤30|（当前 ${a.avoid}）`);
    if (!isNum(a.levelReq) || a.levelReq < 1) err('防具', `${where} levelReq 应 ≥1：${a.levelReq}`);
    if (!isNum(a.stack) || a.stack < 1) err('防具', `${where} stack 应 ≥1：${a.stack}`);
  }

  /* ══════ 4. 消耗品表（三分类 + effects 声明式契约） ══════ */
  for (const [id, c] of Object.entries(CONSUMABLES)) {
    const where = `消耗品「${id}」`;
    if (!CONSUMABLE_CATEGORIES.includes(c.category)) { err('消耗品', `${where} category 非法：${c.category}`); continue; }

    const effectRows = [...(c.effects || [])];
    if (effectRows.length === 0) { err('消耗品', `${where} effects 为空（无任何效果却可使用）`); continue; }
    for (const e of effectRows) {
      if (!EFFECT_STATS.includes(e.stat)) { err('消耗品', `${where} effects.stat 非法：${e.stat}`); continue; }
      if (e.value !== 'full' && (!isNum(e.value) || e.value === 0)) err('消耗品', `${where} effects ${e.stat} 的 value 非法：${e.value}`);
      if (e.value === 'full' && !(c.category === 'restore' && (e.stat === 'hp' || e.stat === 'mp'))) {
        err('消耗品', `${where} 「${e.stat}:full」全恢复哨兵仅限 restore 类的 hp/mp`);
      }
      if (e.duration !== undefined && !ITEM_DURATIONS.includes(e.duration)) err('消耗品', `${where} effects ${e.stat} 的 duration 非法：${e.duration}`);
      if (e.permanent !== undefined && e.permanent !== true && !(e.stat === 'cleanse')) err('消耗品', `${where} 声明了 permanent 却非 true（permanent 是 growth 专用标记）`);
    }
    for (const d of (c.drawback || [])) {
      if (!DRAWBACK_STATS.includes(d.stat)) err('消耗品', `${where} drawback.stat 非法：${d.stat}`);
      if (!isNum(d.value) || d.value <= 0) err('消耗品', `${where} drawback ${d.stat} 的 value 应为正数：${d.value}`);
      if (!ITEM_DURATIONS.includes(d.duration)) err('消耗品', `${where} drawback 的 duration 非法：${d.duration}（负面效果必须限期）`);
    }

    if (c.category === 'growth') {
      if (!effectRows.every((e) => e.permanent === true)) err('消耗品', `${where} growth 类的所有 effects 必须带 permanent:true`);
      if (c.use_in_field !== true) err('消耗品', `${where} growth 类必须 use_in_field（永久加点只能在大地图/整备界面用）`);
      if (c.use_in_battle !== false) warn('消耗品', `${where} growth 类建议 use_in_battle:false（战斗内永久加点节奏失控）`);
    } else {
      if (effectRows.some((e) => e.permanent === true)) err('消耗品', `${where} ${c.category} 类不允许 permanent:true（那是 growth 专属）`);
    }
    if (c.category === 'battle') {
      if (c.use_in_battle !== true) err('消耗品', `${where} battle 类必须 use_in_battle:true`);
      if (!effectRows.some((e) => e.duration !== undefined)) warn('消耗品', `${where} battle 类没有任何限时效果，分类存疑（更像 restore）`);
    }
    if (!isNum(c.stack) || c.stack < 1) err('消耗品', `${where} stack 应 ≥1：${c.stack}`);
    if (typeof c.use_in_battle !== 'boolean' || typeof c.use_in_field !== 'boolean') err('消耗品', `${where} use_in_battle / use_in_field 必须为布尔值`);
  }

  /* ══════ 5. 关键道具表（不可使用、恒空效果、剧情钩子非空） ══════ */
  for (const [id, k] of Object.entries(KEY_ITEMS)) {
    const where = `关键道具「${id}」`;
    if (k.use_in_battle !== false || k.use_in_field !== false) err('关键道具', `${where} 不可使用道具两项 use 标志必须恒 false`);
    if (k.stack !== 1) err('关键道具', `${where} stack 必须恒 1（不可叠加）`);
    if ((k.effects || []).length !== 0) err('关键道具', `${where} effects 必须恒空`);
    if (!k.storyTag || typeof k.storyTag !== 'string') err('关键道具', `${where} 缺少 storyTag 剧情钩子`);
  }

  /* ══════ 6. 职业表（base 十维 + growth 九维 + families ↔ 武器族双向覆盖） ══════ */
  const weaponFamilySet = new Set(Object.values(WEAPONS).map((w) => w.family));
  const classFamilySet = new Set();
  for (const [id, cls] of Object.entries(CLASSES)) {
    const where = `职业「${id}」`;
    for (const stat of BASE_STATS) {
      const v = cls.base?.[stat];
      if (!isNum(v)) { err('职业', `${where} base.${stat} 缺失或非法`); continue; }
      if (stat === 'hp' && v < 1) err('职业', `${where} base.hp 应 ≥1：${v}`);
      if (stat === 'mov' && (v < 1 || v > 8)) err('职业', `${where} base.mov 应在 1~8：${v}`);
      if (stat !== 'hp' && stat !== 'mov' && v < 0) err('职业', `${where} base.${stat} 应 ≥0：${v}`);
    }
    for (const stat of GROWTH_STATS) {
      const v = cls.growth?.[stat];
      if (!isNum(v) || v < 0 || v > 100) err('职业', `${where} growth.${stat} 应在 0~100：${v}`);
    }
    if (!Array.isArray(cls.families) || cls.families.length === 0) {
      err('职业', `${where} families 白名单为空（该职业将无任何武器可用）`);
    } else {
      for (const fam of cls.families) {
        classFamilySet.add(fam);
        if (!weaponFamilySet.has(fam)) err('职业', `${where} 声明武器族「${fam}」在武器表中不存在任何一把（families ↔ weapons 失配）`);
      }
    }
    if (typeof cls.legacy !== 'boolean') warn('职业', `${where} 缺少 legacy 布尔标记（V2 表约定必填）`);
    if (cls.legacy === true && !['calligrapher', 'english_scholar', 'vendor_mob', 'school_punk'].includes(id)) {
      err('职业', `${where} legacy=true 但不在 V1 遗留名单内——新内容禁止造 legacy 职业`);
    }
  }
  for (const fam of weaponFamilySet) {
    if (!classFamilySet.has(fam)) warn('职业', `武器族「${fam}」有武器但没有职业声明它——目前无人能装备，确认是否为预留`);
  }

  /* ══════ 7. 技能表（scope 绑定 + 声明式 effect） ══════ */
  for (const [id, s] of Object.entries(SKILLS)) {
    const where = `技能「${id}」`;
    if (!['class', 'personal'].includes(s.scope)) { err('技能', `${where} scope 非法：${s.scope}`); continue; }
    if (!SKILL_TARGETS.includes(s.target)) err('技能', `${where} target 非法：${s.target}`);
    if (!isNum(s.mpCost) || s.mpCost < 1) err('技能', `${where} mpCost 应 ≥1：${s.mpCost}`);
    if (!SKILL_DURATIONS.includes(s.duration)) err('技能', `${where} duration 非法：${JSON.stringify(s.duration)}`);
    if (!Array.isArray(s.range) || s.range.length !== 2) { err('技能', `${where} range 非法：${JSON.stringify(s.range)}`); }
    else if (s.target === 'self') {
      if (s.range[0] !== 0 || s.range[1] !== 0) err('技能', `${where} self 技 range 必须为 [0,0]：${JSON.stringify(s.range)}`);
    } else if (s.range[0] < 1 || s.range[0] > s.range[1] || s.range[1] > 3) {
      err('技能', `${where} ${s.target} 技 range 应为 1 ≤ min ≤ max ≤ 3：${JSON.stringify(s.range)}`);
    }

    const ef = s.effect || {};
    if (!SKILL_EFFECT_KINDS.includes(ef.kind)) { err('技能', `${where} effect.kind 非法：${ef.kind}`); continue; }
    if (ef.kind === 'heal' && (!isNum(ef.amount) || ef.amount < 1)) err('技能', `${where} heal.amount 非法：${ef.amount}`);
    if (ef.kind === 'damage' && (!['str', 'mag'].includes(ef.power) || !isNum(ef.might) || ef.might < 0)) {
      err('技能', `${where} damage 需要 power∈{str,mag} 与 might≥0`);
    }
    if (ef.kind === 'buff' || ef.kind === 'debuff') {
      const stats = ef.stats || {};
      if (Object.keys(stats).length === 0) err('技能', `${where} ${ef.kind} 的 stats 为空`);
      for (const [stat, v] of Object.entries(stats)) {
        if (!SKILL_BUFF_STATS.includes(stat)) { err('技能', `${where} buff 白名单外的属性：${stat}`); continue; }
        if (!isNum(v) || v === 0) err('技能', `${where} stats.${stat} 数值非法：${v}`);
        if (Math.abs(v) > 30) warn('技能', `${where} stats.${stat}=${v} 幅度超过 30，战力通胀风险，确认设计意图`);
      }
      if (ef.kind === 'debuff' && Object.values(stats).every((v) => v >= 0)) {
        warn('技能', `${where} debuff 全为非负值——debuff 应写负数（如 skl:-3）或换成 buff`);
      }
    }

    if (s.scope === 'class') {
      const cls = CLASSES[s.ownerClass];
      if (!cls) { err('技能', `${where} ownerClass「${s.ownerClass}」在职业表中不存在`); }
      else if (cls.legacy === true) warn('技能', `${where} 引用了 legacy 职业「${s.ownerClass}」——legacy 数值冻结，新技能请绑 V2 职业`);
    } else {
      const unit = UNITS[s.ownerUnit];
      if (!unit) { err('技能', `${where} ownerUnit「${s.ownerUnit}」在单位表中不存在`); }
      else if (unit.personalSkill !== id) err('技能', `${where} 与单位「${s.ownerUnit}」的 personalSkill（${unit.personalSkill}）互指失败——个人技必须双向一致`);
    }
  }

  /* ══════ 8. 单位表（职业引用 + 佩戴校验 + 成长修正 + 章节钩子） ══════ */
  for (const [id, u] of Object.entries(UNITS)) {
    const where = `单位「${id}」`;
    const cls = CLASSES[u.classId];
    if (!cls) { err('单位', `${where} classId「${u.classId}」不存在`); continue; }
    if (cls.legacy === true) warn('单位', `${where} 使用 legacy 职业「${u.classId}」——仅限 V1 收编角色，新角色一律用 V2 七大职业`);

    // 佩戴武器：存在性 → 类型 → 家族白名单 → 等级门槛
    const w = WEAPONS[u.equippedWeapon];
    if (!w) { err('单位', `${where} equippedWeapon「${u.equippedWeapon}」在武器表中不存在`); }
    else {
      if (w.levelReq > u.level) err('单位', `${where} 等级 ${u.level} 佩戴不动 levelReq=${w.levelReq} 的「${w.name}」`);
      const famOk = cls.families?.includes(w.family);
      if (!famOk) {
        const msg = `${where}（${cls.name}）佩戴了族外武器「${w.name}」（${w.family} 族，白名单：${(cls.families || []).join('/') || '无'}）`;
        cls.legacy === true ? warn('单位', `${msg}【legacy 冻结数据，保留原样】`) : err('单位', msg);
      }
    }

    // 背包：条目存在 + 数量合法
    for (const slot of u.inventory || []) {
      if (!goodsIdSource.has(slot.id)) { err('单位', `${where} inventory「${slot.id}」在 goods 四表中不存在`); continue; }
      const def = CONSUMABLES[slot.id] || KEY_ITEMS[slot.id] || ARMORS[slot.id] || WEAPONS[slot.id];
      if (!isNum(slot.count) || slot.count < 1) err('单位', `${where} inventory「${slot.id}」count 非法：${slot.count}`);
      if (def && isNum(slot.count) && slot.count > def.stack) warn('单位', `${where} inventory「${slot.id}」count=${slot.count} 超过叠加数 stack=${def.stack}`);
    }

    // 个人技（若声明）：校验交给技能表第 7 块的双向互指；这里只兜底存在性
    if (u.personalSkill === undefined) err('单位', `${where} 缺少 personalSkill 字段（V2 约定必填；确无个人技请显式写 null）`);
    else if (u.personalSkill !== null && !SKILLS[u.personalSkill]) err('单位', `${where} personalSkill「${u.personalSkill}」在技能表中不存在`);

    // personalGrowth：键白名单（mov 不参与成长）+ 与职业成长叠加后的总率提醒
    for (const [stat, v] of Object.entries(u.personalGrowth || {})) {
      if (stat === 'mov') { err('单位', `${where} personalGrowth 含 mov——移动力不参与成长，删掉该键`); continue; }
      if (!GROWTH_STATS.includes(stat)) { err('单位', `${where} personalGrowth.${stat} 非法键`); continue; }
      if (!isNum(v) || v < 0) err('单位', `${where} personalGrowth.${stat} 应 ≥0：${v}`);
      const combined = (cls.growth?.[stat] ?? 0) + v;
      if (combined > 100) warn('单位', `${where} ${stat} 总成长率 ${combined}%（职业${cls.growth?.[stat]}+个人${v}）——简单 roll 模型下等效必涨，确认设计意图`);
    }

    if (!isNum(u.level) || u.level < 1) err('单位', `${where} level 非法：${u.level}`);
    if (!u.bio) warn('单位', `${where} 缺少 bio 人物简介`);
    if (!u.joinsAt) warn('单位', `${where} 缺少 joinsAt 章节钩子`);
    else if (String(u.joinsAt).startsWith('pending')) warn('章节', `${where}（${u.name}）joinsAt=${u.joinsAt} 尚未接入任何章节，进场时机待定`);
  }

  /* ══════ 9. 敌人表（legacy 预期 + 掉落引用） ══════ */
  for (const [id, e] of Object.entries(ENEMIES)) {
    const where = `敌人「${id}」`;
    const cls = CLASSES[e.classId];
    if (!cls) { err('敌人', `${where} classId「${e.classId}」不存在`); continue; }
    if (cls.legacy === true) warn('敌人', `${where} 使用 legacy 职业「${e.classId}」（V1 兼容预期）——新敌人模板请改用 V2 职业（如 street_loafer）`);

    const w = WEAPONS[e.equippedWeapon];
    if (!w) { err('敌人', `${where} equippedWeapon「${e.equippedWeapon}」不存在`); }
    else {
      const famOk = cls.families?.includes(w.family);
      if (!famOk) {
        const msg = `${where}（${cls.name}）佩戴族外武器「${w.name}」（${w.family}）`;
        cls.legacy === true ? warn('敌人', `${msg}【legacy 冻结数据，保留原样】`) : err('敌人', msg);
      }
    }

    for (const d of e.drops || []) {
      if (!goodsIdSource.has(d.itemId)) { err('敌人', `${where} drops「${d.itemId}」在 goods 四表中不存在`); continue; }
      if (!isNum(d.chance) || d.chance <= 0 || d.chance > 1) {
        err('敌人', `${where} drops「${d.itemId}」chance 应在 (0,1]：${JSON.stringify(d.chance)}`);
      }
    }
    if (!isNum(e.level) || e.level < 1) err('敌人', `${where} level 非法：${e.level}`);
  }

  /* ══════ 10. 占位内容提醒（设计定稿监控项） ══════ */
  for (const uid of PENDING_NAME_UNITS) {
    if (UNITS[uid]) warn('定稿', `单位「${uid}」（${UNITS[uid].name}）是拉拉操队员占位名，待用户定稿后请同步 units.js 注释与本清单`);
  }
  for (const [id, k] of Object.entries(KEY_ITEMS)) {
    if (String(k.storyTag).startsWith('pending')) warn('章节', `关键道具「${id}」storyTag=${k.storyTag} 为计划项，对应章节落地前不会出现在任何掉落/商店里`);
  }

  /* ══════════ 汇总输出 ══════════ */
  const counts = {
    weapons: Object.keys(WEAPONS).length,
    armors: Object.keys(ARMORS).length,
    consumables: Object.keys(CONSUMABLES).length,
    key_items: Object.keys(KEY_ITEMS).length,
    classes: Object.keys(CLASSES).length,
    skills: Object.keys(SKILLS).length,
    units: Object.keys(UNITS).length,
    enemies: Object.keys(ENEMIES).length
  };
  const ok = errors.length === 0;

  if (!silent) {
    for (const msg of errors) console.error(`【registry】${msg}`);
    for (const msg of warnings) console.warn(`【registry】${msg}`);
    const line = `V2 配置自检：${ok ? '通过' : '失败'} | goods ${counts.weapons}/${counts.armors}/${counts.consumables}/${counts.key_items} | 职业 ${counts.classes} | 技能 ${counts.skills} | 单位 ${counts.units} | 敌人 ${counts.enemies} | 错误 ${errors.length} · 提醒 ${warnings.length}`;
    ok ? console.info(`【registry】${line}`) : console.error(`【registry】${line}`);
    console.assert(ok, '【registry】配置存在硬错误，上述条目必须修复后才能进入联调');
  }

  return { ok, counts, errors: [...errors], warnings: [...warnings] };
}

/* ══════ 浏览器自动执行哨兵（联调轮 main.js import 本文件即触发，只跑一次） ══════ */
if (typeof window !== 'undefined') {
  if (!window.__FX_REGISTRY_CHECKED__) {
    window.__FX_REGISTRY_CHECKED__ = true;
    runStartupCheck();
  }
}
