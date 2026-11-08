/**
 * ─────────────────────────────────────────────────────────────
 * 头像统一解析服务（Avatar Registry）· V2
 * ─────────────────────────────────────────────────────────────
 * 约定（项目钦定，全项目只此一处真相）：
 *   素材根目录   assets/portraits（所有头像只住这里）
 *   文件命名     {fileKey}_{state}.png        1x
 *               {fileKey}_{state}@2x.png     2x（双密度）
 *   state 词表   default / corrupted / …（registerActorStates 随时扩，
 *               新图 = 登记 state + 放文件，selftest 用 fs 守门）
 *   全局占位     assets/portraits/_default.png（@2x 同理）
 *               下划线开头永不与角色 id 冲突；占位图由用户按此 URL 后补
 *   缺图策略     未登记角色   → 全局占位 _default（isFallback=true）
 *               未登记 state → 回退本人 default（脸还是对的）
 *               404/加载失败 → assetLoader 标记 error，由各 UI 画占位框
 *
 * 解析优先级（portraitForUnit，战场单位 id 是 instanceId 时最关键）：
 *   ① unit.enemyId   敌方模板键（punk_1 实例的本体是 punk）
 *   ② unit.unitId/id 我方 id 即本体
 *   ③ unit.portrait  存量字符串（assets/art 与 assets/portraits 都能认，
 *                     旧 art 目录引用自动搬家到 portraits）
 *   ④ 全局占位 _default
 *
 * 用法（UI 组件层）：
 *   const url = portraitForUnit(unit, { state: 'corrupted', density: '2x' });
 *   const img = assetLoader.getImage(url);   // img 为 null 时画占位框
 *
 * 本模块零依赖（纯函数），Node 自测与浏览器共用同一实现。
 */

export const PORTRAITS_DIR = 'assets/portraits';
export const DEFAULT_STATE = 'default';
export const DENSITY_2X = '2x';
export const FALLBACK_URL = PORTRAITS_DIR + '/_default.png';
const FALLBACK_URL_2X = PORTRAITS_DIR + '/_default@2x.png';

/* 数据 id → 素材文件名（拼写不同时在此登记；键=数据 id，值=文件 key）。
 * V1 遗留：徐老师的数据键叫 xu_laoshi，画作一直叫 teacher_xu——
 * 没有这张别名表时 units.js 的 portrait 字段会静默 404。 */
const FILE_KEYS = {
  xu_laoshi: 'teacher_xu',
  liu_laoshi: 'adult_liu'
};

/**
 * 剧情半身立绘（assets/art）的「角色-形象 → 情绪 → 真实文件」显式映射表（三层：角色 + 形象 + 情绪）。
 *
 * 脚本层只写两件事：
 *   leftPortrait/rightPortrait = 角色-形象 id（如 'haifeng-police'、'ayao-adult'；单形象角色写短 id 如 'vendor'）
 *   leftEmotion/rightEmotion   = 统一情绪（6 个之一）
 * 本表负责把「角色-形象 + 情绪」映射到真实文件 basename（不含目录与密度后缀）。
 * 兜底：情绪未登记 → 回退该角色-形象的 default；角色-形象未登记 → 画占位框。
 *
 * 统一情绪词表（6 个）：default 默认 / smile 笑 / frown 皱眉 / cry 哭泣 / awkward 尴尬 / shock 惊讶
 * 形象词（组成「角色-形象」id 后半段，用 '-' 连接）：corrupted 魔化 / police 警察 /
 *   police_damaged 警察战损 / battle_damaged 战损 / machine 机械 / adult 成年 /
 *   corrupted_god 第一形态 / final_form 第二形态 / aged_2046 未来 / doctor 医生 /
 *   burnt 火海生还 / stealth 潜行 / young 少年 / dissolve 消散 / charge 冲锋 /
 *   hug 拥抱 / aim 瞄准 / choke 窒息 / pale 苍白
 */
export const ART_EMOTION_FILES = {
  "zhangzixiao": {
    "default": "zhangzixiao_default",
    "frown": "zhangzixiao_resolute",
    "shock": "zhangzixiao_shock",
    "cry": "zhangzixiao_sad",
    "smile": "zhangzixiao_smile"
  },
  "zhangzixiao-corrupted": {
    "default": "zhangzixiao_corrupted"
  },
  "shiyunuo": {
    "default": "shiyunuo_default",
    "frown": "shiyunuo_resolute",
    "shock": "shiyunuo_shock",
    "cry": "shiyunuo_tearful"
  },
  "shiyunuo-corrupted": {
    "default": "shiyunuo_corrupted"
  },
  "zhanghanyu": {
    "default": "zhanghanyu_default"
  },
  "zhanghanyu-corrupted": {
    "default": "zhanghanyu_corrupted"
  },
  "chenpinxuan": {
    "default": "chenpinxuan_default"
  },
  "chenpinxuan-corrupted": {
    "default": "chenpinxuan_corrupted"
  },
  "fanwenmo": {
    "default": "fanwenmo_default",
    "frown": "fanwenmo_fury",
    "shock": "fanwenmo_panic",
    "cry": "fanwenmo_crying"
  },
  "fanwenmo-corrupted": {
    "default": "fanwenmo_corrupted"
  },
  "heyanxi": {
    "default": "heyanxi_default",
    "frown": "heyanxi_resolute",
    "shock": "heyanxi_shock",
    "smile": "heyanxi_gentle",
    "cry": "heyanxi_gentle"
  },
  "heyanxi-corrupted": {
    "default": "heyanxi_corrupted"
  },
  "qinruiyi": {
    "default": "qinruiyi_default",
    "frown": "qinruiyi_resolute",
    "cry": "qinruiyi_crying",
    "smile": "qinruiyi_relieved"
  },
  "qinruiyi-corrupted": {
    "default": "qinruiyi_corrupted"
  },
  "zhangxizhe": {
    "default": "zhangxizhe_default",
    "frown": "zhangxizhe_smirk",
    "awkward": "zhangxizhe_nervous"
  },
  "zhangxizhe-corrupted": {
    "default": "zhangxizhe_corrupted"
  },
  "zhuyanze": {
    "default": "zhuyanze_default",
    "frown": "zhuyanze_command",
    "shock": "zhuyanze_shock"
  },
  "zhuyanze-corrupted": {
    "default": "zhuyanze_corrupted"
  },
  "xu": {
    "default": "teacher_xu_default",
    "frown": "teacher_xu_stern",
    "smile": "teacher_xu_warm",
    "cry": "teacher_xu_pain"
  },
  "liu": {
    "default": "adult_liu_default",
    "frown": "adult_liu_protective",
    "smile": "adult_liu_relieved"
  },
  "haifeng": {
    "default": "father_haifeng_default",
    "frown": "father_haifeng_alert",
    "smile": "father_haifeng_loving"
  },
  "haifeng-police": {
    "default": "father_haifeng_police"
  },
  "haifeng-police_damaged": {
    "default": "father_haifeng_police_damaged"
  },
  "haifeng-battle_damaged": {
    "default": "father_haifeng_battle_damaged"
  },
  "xu-stealth": {
    "default": "teacher_xubox_stealth_default",
    "cry": "teacher_xubox_stealth_pain"
  },
  "xu-stealth-pale": {
    "default": "teacher_xubox_stealth_pale"
  },
  "haifeng-burnt": {
    "default": "haifeng_burnt_default",
    "frown": "haifeng_burnt_rage",
    "cry": "haifeng_burnt_tears"
  },
  "xu-burnt": {
    "default": "teacher_xu_burnt_default"
  },
  "xu-burnt-choke": {
    "default": "teacher_xu_burnt_choke"
  },
  "xu-burnt-hug": {
    "default": "teacher_xu_burnt_hug"
  },
  "liu-burnt": {
    "default": "teacher_liu_burnt_default"
  },
  "liu-burnt-choke": {
    "default": "teacher_liu_burnt_choke"
  },
  "liu-burnt-hug": {
    "default": "teacher_liu_burnt_hug"
  },
  "pe": {
    "default": "teacher_pe_default"
  },
  "pe-corrupted": {
    "default": "teacher_pe_corrupted"
  },
  "xu-young": {
    "default": "young_xu_default"
  },
  "liu-young": {
    "default": "young_liu_default"
  },
  "ayao": {
    "default": "ayao_default"
  },
  "ayao-corrupted": {
    "default": "ayao_corrupted"
  },
  "ayao-adult": {
    "default": "ayao_adult_default",
    "cry": "ayao_adult_tearful",
    "smile": "ayao_adult_smile",
    "dissolve": "ayao_adult_dissolve"
  },
  "ayao-adult-dissolve": {
    "default": "ayao_adult_dissolve"
  },
  "ayao-corrupted_god": {
    "default": "ayao_corrupted_god_default"
  },
  "ayao-corrupted_god-machine": {
    "default": "ayao_corrupted_god_machine"
  },
  "ayao-aged_2046": {
    "default": "ayao_aged_2046_default",
    "cry": "ayao_aged_2046_weeping"
  },
  "ayao-final_form": {
    "default": "ayao_final_form_default"
  },
  "ayao-doctor": {
    "default": "su_wan_doctor_default",
    "frown": "su_wan_doctor_concerned"
  },
  "zhangzixiao-adult": {
    "default": "mc_adult_zixiao_default",
    "smile": "mc_adult_zixiao_gentle",
    "frown": "mc_adult_zixiao_fury"
  },
  "zhangzixiao-adult-dissolve": {
    "default": "mc_adult_zixiao_dissolve"
  },
  "zhangzixiao-adult-gold": {
    "default": "mc_adult_zixiao_gold"
  },
  "shiyunuo-adult": {
    "default": "mc_adult_yunuo_default",
    "smile": "mc_adult_yunuo_gentle"
  },
  "shiyunuo-adult-charge": {
    "default": "mc_adult_yunuo_charge"
  },
  "shiyunuo-adult-dissolve": {
    "default": "mc_adult_yunuo_dissolve"
  },
  "shiyunuo-adult-gold": {
    "default": "mc_adult_yunuo_gold"
  },
  "fanwenmo-adult": {
    "default": "fanwenmo_adult_default",
    "cry": "fanwenmo_adult_tearful"
  },
  "fanwenmo-adult-dissolve": {
    "default": "fanwenmo_adult_dissolve"
  },
  "fanwenmo-adult-gold": {
    "default": "fanwenmo_adult_gold"
  },
  "heyanxi-adult": {
    "default": "heyanxi_adult_default"
  },
  "heyanxi-adult-aim": {
    "default": "heyanxi_adult_aim"
  },
  "heyanxi-adult-hug": {
    "default": "heyanxi_adult_hug"
  },
  "heyanxi-adult-dissolve": {
    "default": "heyanxi_adult_dissolve"
  },
  "heyanxi-adult-gold": {
    "default": "heyanxi_adult_gold"
  },
  "shen_guard": {
    "default": "shen_guard_default"
  },
  "shen_wanting": {
    "default": "shen_wanting_old"
  },
  "shen_chongli": {
    "default": "shen_chongli_default"
  },
  "shen_chongli_soul": {
    "default": "shen_chongli_soul_default"
  },
  "shen_wanting_soul": {
    "default": "shen_wanting_soul_default"
  },
  "militia_instructor": {
    "default": "militia_instructor_1839"
  },
  "militia_instructor-gold": {
    "default": "militia_instructor_gold"
  },
  "militia_instructor-dissolve": {
    "default": "militia_instructor_dissolve"
  },
  "berserker_guard": {
    "default": "berserker_guard_heavy"
  },
  "boss_colossus": {
    "default": "boss_colossus_opium_god"
  },
  "lin_zexu": {
    "default": "lin_zexu_imperial_commissioner"
  },
  "lin_zexu-gold": {
    "default": "lin_zexu_gold"
  },
  "lin_zexu-dissolve": {
    "default": "lin_zexu_dissolve"
  },
  "emperor_daoguang": {
    "default": "emperor_daoguang_palace"
  },
  "foreign_sailor": {
    "default": "foreign_sailor_1839"
  },
  "comprador_assassin": {
    "default": "comprador_assassin_1839"
  },
  "fushoutang_shopkeeper": {
    "default": "fushoutang_shopkeeper_1839"
  },
  "vendor": {
    "default": "vendor_default",
    "cry": "vendor_sad"
  },
  "punk": {
    "default": "punk_default"
  },
  "senior_athlete": {
    "default": "senior_athlete_default"
  },
  "senior_athlete-corrupted": {
    "default": "senior_athlete_corrupted"
  },
  "senior_athlete_leader": {
    "default": "senior_athlete_leader_default"
  },
  "senior_athlete_leader-corrupted": {
    "default": "senior_athlete_leader_corrupted"
  },
  "senior_student-corrupted": {
    "default": "senior_student_corrupted"
  },
  "classmate_boy": {
    "default": "classmate_boy_default"
  },
  "classmate_boy-corrupted": {
    "default": "classmate_boy_corrupted"
  },
  "classmate_girl": {
    "default": "classmate_girl_default"
  },
  "classmate_girl-corrupted": {
    "default": "classmate_girl_corrupted"
  },
  "coach": {
    "default": "coach_default",
    "cry": "coach_sad"
  },
  "coach-corrupted": {
    "default": "coach_corrupted"
  },
  "grade1_student": {
    "default": "grade1_student_default"
  },
  "mystery_man": {
    "default": "mystery_man_default"
  },
  "mystery_man-corrupted": {
    "default": "mystery_man_corrupted"
  },
  "parent_rep": {
    "default": "parent_rep_default"
  },
  "shadow_woman": {
    "default": "shadow_woman_default"
  },
  "janitor": {
    "default": "janitor_old"
  },
  "enforcer_abiao": {
    "default": "enforcer_abiao"
  },
  "porter_blueeye": {
    "default": "porter_blueeye"
  },
  "boss_viper_smuggler": {
    "default": "boss_viper_smuggler"
  },
  "sailor_berserk": {
    "default": "sailor_berserk"
  },
  "boss_exam_captain": {
    "default": "boss_exam_captain"
  },
  "officer_100": {
    "default": "officer_100"
  },
  "probe_machine": {
    "default": "probe_machine"
  },
  "boss_hunter_alpha": {
    "default": "boss_hunter_alpha"
  },
  "patrol_robot_exam": {
    "default": "patrol_robot_exam"
  },
  "boss_ai_topstudent": {
    "default": "boss_ai_topstudent"
  },
  "boss_storm_mech": {
    "default": "boss_storm_mech"
  },
  "alloy_deathsworn": {
    "default": "alloy_deathsworn"
  },
  "hound_riot": {
    "default": "hound_riot"
  },
  "boss_iron_scorpion": {
    "default": "boss_iron_scorpion"
  },
  "fanatic_bomber": {
    "default": "fanatic_bomber"
  },
  "hold_gate_guard": {
    "default": "hold_gate_guard"
  },
  "pillar_neural_lock": {
    "default": "pillar_neural_lock"
  },
  "repair_spider": {
    "default": "repair_spider"
  },
  "boss_judgement_core": {
    "default": "boss_judgement_core"
  },
  "capital_guard_mech": {
    "default": "capital_guard_mech"
  },
  "sniper_dock": {
    "default": "sniper_dock"
  },
  "shadow_parasite": {
    "default": "shadow_parasite"
  },
  "chronos_puppet": {
    "default": "chronos_puppet"
  },
  "shadow_cloaked_leader": {
    "default": "shadow_cloaked_leader"
  },
  "shadow_cloaked_agent": {
    "default": "shadow_cloaked_agent"
  }
};

/* 头像登记表：角色 → 拥有的 state 列表（至少含 default）。
 * 补新图的动作序列：此处加 state → 放 png 与 @2x → 跑 selftest 守门。 */
const ACTOR_STATES = {
  /* 双主线主角 */
  zhangzixiao: ['default', 'corrupted', 'resolute', 'shock', 'sad', 'smile'],
  shiyunuo: ['default', 'corrupted', 'thinking', 'shock', 'resolute', 'tearful'],
  /* 各线伙伴 / 敌转友 */
  chenpinxuan: ['default', 'corrupted'],
  fanwenmo: ['default', 'corrupted', 'fury', 'panic', 'crying'],
  zhanghanyu: ['default', 'corrupted'],
  heyanxi: ['default', 'corrupted', 'resolute', 'shock', 'gentle'],
  qinruiyi: ['default', 'corrupted', 'resolute', 'crying', 'relieved'],
  zhangxizhe: ['default', 'corrupted', 'smirk', 'nervous'],
  zhuyanze: ['default', 'corrupted', 'command', 'shock'],
  xu_laoshi: ['default', 'stern', 'warm', 'pain'],
  liu_laoshi: ['default', 'protective', 'relieved'],
  /* 敌方（含表外剧情单位，senior_athlete / teacher_pe / teacher_xu / classmate_*等） */
  vendor: ['default', 'sad'],
  punk: ['default'],
  senior_athlete: ['default', 'corrupted'],
  senior_athlete_leader: ['corrupted'],
  teacher_pe: ['default', 'corrupted'],
  teacher_xu: ['default', 'stern', 'warm', 'pain'],
  classmate_boy: ['default', 'corrupted'],
  classmate_girl: ['default', 'corrupted'],
  adult_liu: ['default', 'protective', 'relieved'],
  ayao: ['default', 'corrupted'],
  coach: ['default', 'corrupted', 'sad'],
  grade1_student: ['default'],
  mystery_man: ['default', 'corrupted'],
  parent_rep: ['default'],
  shadow_woman: ['default'],
  young_liu: ['default'],
  young_xu: ['default'],
  senior_student: ['default', 'corrupted'],
  janitor: ['default', 'corrupted'],
  /* 第二幕核心角色 */
  father_haifeng: ['default', 'battle_damaged', 'police', 'police_damaged', 'alert', 'loving'],
  shen_chongli: ['default'],
  shen_wanting: ['old'],
  militia_instructor: ['1839'],
  berserker_guard: ['heavy'],
  boss_colossus: ['opium_god'],
  lin_zexu: ['imperial_commissioner'],
  emperor_daoguang: ['palace'],
  /* 第二幕普通杂兵敌人 */
  shen_guard: ['default'],
  foreign_sailor: ['1839'],
  comprador_assassin: ['1839'],
  /* 第三幕核心角色立绘 */
  shadow_cloaked_leader: ['default'],
  shadow_cloaked_agent: ['default'],
  su_wan_doctor: ['default', 'concerned', 'cold'],
  ayao_adult: ['default', 'tearful', 'smile'],
  ayao_corrupted_god: ['default', 'machine'],
  ayao_aged_2046: ['default', 'weeping'],
  mc_adult_zixiao: ['default', 'gentle', 'fury', 'dissolve'],
  mc_adult_yunuo: ['default', 'gentle', 'charge', 'dissolve'],
  fanwenmo_adult: ['default', 'tearful', 'dissolve'],
  heyanxi_adult: ['default', 'aim', 'hug', 'dissolve'],
  haifeng_burnt: ['default', 'rage', 'tears'],
  teacher_xu_burnt: ['default', 'choke', 'hug'],
  teacher_liu_burnt: ['default', 'choke', 'hug'],
  teacher_xubox_stealth: ['default', 'pale', 'pain'],
  /* 第三幕战斗单位 / Boss / 杂兵 */
  enforcer_abiao: ['default'],
  porter_blueeye: ['default'],
  boss_viper_smuggler: ['default'],
  sailor_berserk: ['default'],
  sniper_dock: ['default'],
  shadow_parasite: ['default'],
  chronos_puppet: ['default'],
  boss_exam_captain: ['default'],
  officer_100: ['default'],
  probe_machine: ['default'],
  boss_hunter_alpha: ['default'],
  patrol_robot_exam: ['default'],
  boss_ai_topstudent: ['default'],
  boss_storm_mech: ['default'],
  alloy_deathsworn: ['default'],
  hound_riot: ['default'],
  boss_iron_scorpion: ['default'],
  fanatic_bomber: ['default'],
  hold_gate_guard: ['default'],
  pillar_neural_lock: ['default'],
  repair_spider: ['default'],
  boss_judgement_core: ['default'],
  capital_guard_mech: ['default']
};

/* 战斗单位直接命名（无 state 后缀）集合 */
const DIRECT_FILE_ACTORS = new Set([
  'enforcer_abiao',
  'porter_blueeye',
  'boss_viper_smuggler',
  'sailor_berserk',
  'sniper_dock',
  'shadow_parasite',
  'chronos_puppet',
  'boss_exam_captain',
  'officer_100',
  'probe_machine',
  'boss_hunter_alpha',
  'patrol_robot_exam',
  'boss_ai_topstudent',
  'boss_storm_mech',
  'alloy_deathsworn',
  'hound_riot',
  'boss_iron_scorpion',
  'fanatic_bomber',
  'hold_gate_guard',
  'pillar_neural_lock',
  'repair_spider',
  'boss_judgement_core',
  'capital_guard_mech'
]);

/* ───────────── 内部工具 ───────────── */

function densityOf(d) {
  return d === DENSITY_2X ? DENSITY_2X : '1x';
}

function densitySuffix(density) {
  return density === DENSITY_2X ? '@2x' : '';
}

function fallbackUri(density) {
  return density === DENSITY_2X ? FALLBACK_URL_2X : FALLBACK_URL;
}

function uriOf(actor, state, density) {
  const key = FILE_KEYS[actor] ?? actor;
  if (DIRECT_FILE_ACTORS.has(actor) && state === 'default') {
    return PORTRAITS_DIR + '/' + key + densitySuffix(density) + '.png';
  }
  return PORTRAITS_DIR + '/' + key + '_' + state + densitySuffix(density) + '.png';
}

/* 存量字符串解析：assets/{art|portraits}/{actor}_{state}{@2x}.png */
const REF_RE = /^assets\/(art|portraits)\/([A-Za-z0-9_]+)_([a-z0-9]+?)(@2x)?\.png$/;

/* ───────────── 查询 API ───────────── */

export function hasActor(actorId) {
  return !!actorId && typeof actorId === 'string' && !!ACTOR_STATES[actorId];
}

export function listActors() {
  return Object.keys(ACTOR_STATES);
}

export function listStates(actorId) {
  return ACTOR_STATES[actorId] ? [...ACTOR_STATES[actorId]] : [];
}

/** 登记新角色 / 给既有角色追加 state（幂等去重，default 恒在） */
export function registerActorStates(actorId, states = []) {
  if (!actorId || typeof actorId !== 'string') return [];
  const merged = [...new Set([DEFAULT_STATE, ...states])];
  ACTOR_STATES[actorId] = merged;
  return [...merged];
}

/* ───────────── 核心解析 ───────────── */

/**
 * 富信息解析：{ uri, actor, state, density, isFallback, reason, requestedState, substitutedState }
 *   reason ∈ null | 'unknown_actor' | 'state'
 *   isFallback=true 仅发生在未登记角色（走全局占位）；
 *   state 已知但未登记 → isFallback=false + substitutedState=原请求（画面用本人 default 顶上）
 */
export function resolvePortrait(actorId, opts = {}) {
  const density = densityOf(opts.density);
  const requestedState = opts.state || DEFAULT_STATE;
  const info = {
    uri: '', actor: null, state: null, density,
    isFallback: false, reason: null,
    requestedState, substitutedState: null
  };

  if (!hasActor(actorId)) {
    info.isFallback = true;
    info.reason = 'unknown_actor';
    info.state = DEFAULT_STATE;
    info.uri = fallbackUri(density);
    return info;
  }

  if (listStates(actorId).includes(requestedState)) {
    info.actor = actorId;
    info.state = requestedState;
    info.uri = uriOf(actorId, requestedState, density);
    return info;
  }

  info.actor = actorId;
  info.state = DEFAULT_STATE;
  info.substitutedState = requestedState;
  info.reason = 'state';
  info.uri = uriOf(actorId, DEFAULT_STATE, density);
  return info;
}

/** 字符串糖：UI 直接喂 assetLoader 的 URL */
export function getPortraitUrl(actorId, opts = {}) {
  return resolvePortrait(actorId, opts).uri;
}

/**
 * 剧情立绘解析：角色 id + 语义情绪 → assets/art 真实文件（含密度）。
 * 兜底：角色未登记返回 null（由 UI 画占位框）；情绪未登记回退 default；
 *       default 也没有则取该角色第一张图兜底。
 */
export function artForEmotion(actorId, emotion = 'default', density = '2x') {
  if (!actorId || typeof actorId !== 'string') return null;
  const key = FILE_KEYS[actorId] ?? actorId;
  const map = ART_EMOTION_FILES[key];
  if (!map) return null;
  const base = map[emotion] || map.default || map[Object.keys(map)[0]];
  if (!base) return null;
  return 'assets/art/' + base + densitySuffix(density) + '.png';
}

/* ───────────── 存量引用归一 ───────────── */

/** assets/(art|portraits)/{actor}_{state}{@2x}.png → { dir, actor, state, density } */
export function parsePortraitRef(raw) {
  if (typeof raw !== 'string') return null;
  const m = REF_RE.exec(raw);
  if (!m) return null;
  return { dir: m[1], actor: m[2], state: m[3], density: m[4] ? DENSITY_2X : '1x' };
}

/**
 * 旧引用搬家 + 表驱动归一：
 *   assets/art/heyanxi_corrupted.png  →  assets/portraits/heyanxi_corrupted.png
 *   已登记角色走 resolve（未登记 state 自动降落 default）
 *   未登记角色仅换目录、保留原命名（存量为王，不打占位）
 */
export function normalizePortraitRef(raw) {
  const p = parsePortraitRef(raw);
  if (!p) return typeof raw === 'string' ? raw : '';

  if (hasActor(p.actor)) {
    const r = resolvePortrait(p.actor, { state: p.state, density: p.density });
    return r.uri;
  }
  return PORTRAITS_DIR + '/' + p.actor + '_' + p.state + densitySuffix(p.density) + '.png';
}

/* ───────────── 战场单位入口（组件层主用） ───────────── */

/**
 * 战场单位 → 头像 URL。优先级：
 *   enemyId（敌方模板键，实例 id 是 instanceId）→ unitId/id → portrait 存量字段 → 全局占位
 * opts.state 显式请求；opts.density 指定 '2x' 时连存量字段也会重打双密度。
 */
export function portraitForUnit(u, opts = {}) {
  const density = densityOf(opts.density);

  if (u && typeof u === 'object') {
    for (const key of [u.enemyId, u.unitId, u.id]) {
      if (hasActor(key)) {
        return resolvePortrait(key, { state: opts.state, density }).uri;
      }
    }
    const p = typeof u.portrait === 'string' ? parsePortraitRef(u.portrait) : null;
    if (p) {
      if (hasActor(p.actor)) {
        const wanted = opts.state || p.state;
        return resolvePortrait(p.actor, { state: wanted, density }).uri;
      }
      // 未登记角色但带了合法形状的 portrait：保留原 actor/state，仅按 opts 重打密度
      return PORTRAITS_DIR + '/' + p.actor + '_' + p.state + densitySuffix(density) + '.png';
    }
  }

  return fallbackUri(density);
}

/**
 * 战场单位 → 半身立绘 URL（assets/art/，对话式半身立绘）。
 * 区别于 portraitForUnit（assets/portraits/ 圆形头像）：技能演出等需要
 * 大幅立绘的界面用本函数。命名与头像同源 {fileKey}_{state}{@2x}.png，
 * 只是目录换成 art。art 目录 state 可能不全（如 janitor 仅 old），缺图时
 * assetLoader.getImage 返回 null，由 UI 层画占位框。
 */
export function artForUnit(u, opts = {}) {
  const density = densityOf(opts.density);
  const state = opts.state || DEFAULT_STATE;

  if (u && typeof u === 'object') {
    for (const key of [u.enemyId, u.unitId, u.id]) {
      if (hasActor(key)) {
        const fileKey = FILE_KEYS[key] ?? key;
        return 'assets/art/' + fileKey + '_' + state + densitySuffix(density) + '.png';
      }
    }
    const p = typeof u.portrait === 'string' ? parsePortraitRef(u.portrait) : null;
    if (p) {
      const fileKey = FILE_KEYS[p.actor] ?? p.actor;
      return 'assets/art/' + fileKey + '_' + (opts.state || p.state) + densitySuffix(density) + '.png';
    }
  }
  return null;
}
