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

/* 头像登记表：角色 → 拥有的 state 列表（至少含 default）。
 * 补新图的动作序列：此处加 state → 放 png 与 @2x → 跑 selftest 守门。 */
const ACTOR_STATES = {
  /* 双主线主角 */
  zhangzixiao: ['default', 'corrupted'],
  shiyunuo: ['default', 'corrupted'],
  /* 各线伙伴 / 敌转友 */
  chenpinxuan: ['default', 'corrupted'],
  fanwenmo: ['default', 'corrupted'],
  zhanghanyu: ['default', 'corrupted'],
  heyanxi: ['default', 'corrupted'],
  qinruiyi: ['default', 'corrupted'],
  zhangxizhe: ['default', 'corrupted'],
  zhuyanze: ['default', 'corrupted'],
  xu_laoshi: ['default'],
  liu_laoshi: ['default'],
  /* 敌方（含表外剧情单位，senior_athlete / teacher_pe / teacher_xu / classmate_*等） */
  vendor: ['default', 'sad'],
  punk: ['default'],
  senior_athlete: ['default', 'corrupted'],
  senior_athlete_leader: ['corrupted'],
  teacher_pe: ['default', 'corrupted'],
  teacher_xu: ['default'],
  classmate_boy: ['default', 'corrupted'],
  classmate_girl: ['default', 'corrupted'],
  adult_liu: ['default'],
  ayao: ['default', 'corrupted'],
  coach: ['default', 'corrupted', 'sad'],
  grade1_student: ['default'],
  mystery_man: ['default', 'corrupted'],
  parent_rep: ['default'],
  shadow_woman: ['default'],
  young_liu: ['default'],
  young_xu: ['default'],
  senior_student: ['default', 'corrupted'],
  janitor: ['default', 'corrupted']
};

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
