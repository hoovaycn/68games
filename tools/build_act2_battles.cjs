/**
 * 第二幕（ch10 ~ ch19）战斗关卡一键生成器
 *
 * 职责：
 *  1. 生成 src/data/chapters/ch10_battle1.js ~ ch19_battle1.js（战斗配置 + tiledData）
 *  2. 生成 docs/map/tiled_project/ch10_battle1.tmx ~ ch19_battle1.tmx（Tiled 源工程，firstgid 与 tiled_map.js 严格一致）
 *
 * 用法： node tools/build_act2_battles.cjs
 * 说明：
 *  - 底砖为「室内房间框架」占位（边框 GID 81~147 + 地板 114），仅供用户晚上在 Tiled 中直接加工替换；
 *  - Spawns 对象层按「先玩家后敌人」顺序放置出生点，Collisions 留空由用户在 Tiled 中绘制；
 *  - 之后用户画完瓦片，用 tools/sync_tmx_levels.cjs 回写 tiledData 即可。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const JS_DIR = path.join(ROOT, 'src/data/chapters');
const TMX_DIR = path.join(ROOT, 'docs/map/tiled_project');

const TILESETS = [
  'Interiors_free_48x48.tsx',
  'Room_Builder_free_48x48.tsx',
  'Tileset_48x48_1.tsx',
  'Tileset_48x48_2.tsx',
  'Tileset_48x48_3.tsx',
  'Tileset_48x48_9.tsx',
  'Tileset_48x48_16.tsx'
];
const FIRSTGIDS = [1, 1425, 1816, 1916, 2016, 2116, 2216];

/** 生成房间框架底砖（边框 + 地板 114） */
function buildRoomBgGrid(w, h) {
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const L = x === 0;
      const R = x === w - 1;
      const T = y === 0;
      const B = y === h - 1;
      let gid = 114;
      if (T && L) gid = 81;
      else if (T && R) gid = 83;
      else if (T) gid = 82;
      else if (B && L) gid = 145;
      else if (B && R) gid = 147;
      else if (B) gid = 146;
      else if (L) gid = 113;
      else if (R) gid = 115;
      row.push(gid);
    }
    grid.push(row);
  }
  return grid;
}

/** 全零二维网格 */
function zeroGrid(w, h) {
  return Array.from({ length: h }, () => Array(w).fill(0));
}

/**
 * 第二幕 10 场战斗定义
 * players: [unitId, ...] 我方出场顺序（双主线占位由 initBattle 自动转换）
 * enemies: [{ enemyId, instanceId }, ...] 敌方出场顺序
 * spawnX/s 偏移：出生点坐标由 build 时按 map 尺寸居中计算
 */
const BATTLES = [
  {
    id: 'ch10_battle1', exportName: 'CH10_BATTLE1',
    name: '省博展厅遭遇战 · 守护国宝',
    chapter: '第11章 省博惊魂',
    bgm: 'bgm_battle_normal', w: 16, h: 10,
    objective: { type: 'defeat_all', text: '击退入侵省博的黑衣死士与狂暴保送生' },
    next: 'ch10_scene_tracking',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemies: [
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'],
      ['senior_athlete_corrupted', 'push_a'], ['senior_athlete_corrupted', 'push_b']
    ]
  },
  {
    id: 'ch11_battle1', exportName: 'CH11_BATTLE1',
    name: '汽修厂院内冲突战',
    chapter: '第12章 烂人老爸',
    bgm: 'bgm_battle_normal', w: 16, h: 10,
    objective: { type: 'defeat_all', text: '打退汽修厂的打手与混混' },
    next: 'ch11_scene_breakdown',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemies: [
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'],
      ['punk', 'punk_a'], ['punk', 'punk_b']
    ]
  },
  {
    id: 'ch12_battle1', exportName: 'CH12_BATTLE1',
    name: '仓库后仓突围保卫战',
    chapter: '第13章 夜袭汽修厂',
    bgm: 'bgm_intense_boss', w: 16, h: 10,
    objective: { type: 'defeat_all', text: '与老爸海峰并肩杀出重围' },
    next: 'ch12_scene_badge_reveal',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'father_haifeng'],
    enemies: [
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'],
      ['berserker_guard', 'heavy_a'], ['berserker_guard', 'heavy_b']
    ]
  },
  {
    id: 'ch13_battle1', exportName: 'CH13_BATTLE1',
    name: '运河老码头前哨战',
    chapter: '第14章 避难所疑云',
    bgm: 'bgm_intense_boss', w: 16, h: 12,
    objective: { type: 'defeat_all', text: '突破码头外围防线' },
    next: 'ch13_scene_dock_entry',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'xu_laoshi', 'liu_laoshi', 'father_haifeng'],
    enemies: [
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'], ['shen_guard', 'guard_d'],
      ['berserker_guard', 'heavy_a'], ['berserker_guard', 'heavy_b'],
      ['punk', 'punk_a'], ['punk', 'punk_b']
    ]
  },
  {
    id: 'ch14_battle1', exportName: 'CH14_BATTLE1',
    name: '驳船甲板狂风暴雨阻击战',
    chapter: '第15章 海魂回响',
    bgm: 'bgm_intense_boss', w: 16, h: 10,
    objective: { type: 'defeat_all', text: '在风暴中击退异化黑衣护卫与药人体' },
    next: 'ch14_scene_vortex_entry',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemies: [
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'], ['shen_guard', 'guard_d'],
      ['berserker_guard', 'heavy_a'], ['berserker_guard', 'heavy_b']
    ]
  },
  {
    id: 'ch15_battle1', exportName: 'CH15_BATTLE1',
    name: '1839虎门滩头保卫战',
    chapter: '第16章 浩然正气',
    bgm: 'bgm_intense_boss', w: 18, h: 12,
    objective: { type: 'defeat_all', text: '与虎门民团教头携手击退走私水手与买办死士' },
    next: 'ch15_scene_lin_commends',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'militia_instructor'],
    enemies: [
      ['foreign_sailor', 'sailor_a'], ['foreign_sailor', 'sailor_b'], ['foreign_sailor', 'sailor_c'], ['foreign_sailor', 'sailor_d'],
      ['comprador_assassin', 'assassin_a'], ['comprador_assassin', 'assassin_b']
    ]
  },
  {
    id: 'ch16_battle1', exportName: 'CH16_BATTLE1',
    name: '水闸废料场截击战',
    chapter: '第17章 破碎的奖状',
    bgm: 'bgm_intense_boss', w: 16, h: 10,
    objective: { type: 'defeat_all', text: '击退伏击的沈氏精锐死士' },
    next: 'ch16_scene_truth_unveiled',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'zhuyanze'],
    enemies: [
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'], ['shen_guard', 'guard_d'],
      ['berserker_guard', 'heavy_a']
    ]
  },
  {
    id: 'ch17_battle1', exportName: 'CH17_BATTLE1',
    name: '地下祭坛绝境突围战',
    chapter: '第18章 孤注一掷',
    bgm: 'bgm_intense_boss', w: 16, h: 12,
    objective: { type: 'defeat_all', text: '悲愤突围，杀出地下祭坛' },
    next: 'ch17_scene_tearful_retreat',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'xu_laoshi', 'liu_laoshi'],
    enemies: [
      ['berserker_guard', 'heavy_a'], ['berserker_guard', 'heavy_b'], ['berserker_guard', 'heavy_c'],
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'], ['shen_guard', 'guard_c'], ['shen_guard', 'guard_d']
    ]
  },
  {
    id: 'ch18_battle1', exportName: 'CH18_BATTLE1',
    name: '货栈中庭旋转楼梯强袭战',
    chapter: '第19章 逆行攻坚',
    bgm: 'bgm_intense_boss', w: 16, h: 10,
    objective: { type: 'defeat_all', text: '击破沈氏中枢生化狂战士与重装卫队' },
    next: 'ch18_scene_tower_arrival',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemies: [
      ['berserker_guard', 'heavy_a'], ['berserker_guard', 'heavy_b'], ['berserker_guard', 'heavy_c'],
      ['shen_guard', 'guard_a'], ['shen_guard', 'guard_b'],
      ['shen_chongli', 'shen_chongli']
    ]
  },
  {
    id: 'ch19_battle1', exportName: 'CH19_BATTLE1',
    name: '钟楼之巅终极决战',
    chapter: '第20章 破晓钟声',
    bgm: 'bgm_intense_boss', w: 18, h: 12,
    objective: { type: 'defeat_boss', text: '终结百年巨灵魔尊与沈氏父子' },
    next: 'ch19_scene_boss_destroyed',
    players: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemies: [
      ['boss_colossus', 'boss_colossus'],
      ['shen_wanting', 'shen_wanting'],
      ['shen_chongli', 'shen_chongli']
    ]
  }
];

/** 计算我方出生点（左侧两列整齐排列，垂直居中） */
function playerSpawns(battle) {
  const n = battle.players.length;
  const h = battle.h;
  const half = Math.ceil(n / 2);
  const startY = Math.floor((h - half) / 2);
  return battle.players.map((unitId, i) => {
    const col = i < half ? 2 : 3;
    const rowIndex = i < half ? i : i - half;
    return { unitId, x: col, y: Math.max(1, Math.min(h - 2, startY + rowIndex)) };
  });
}

/** 计算敌方出生点（右侧两列整齐排列，垂直居中） */
function enemySpawns(battle) {
  const n = battle.enemies.length;
  const w = battle.w;
  const h = battle.h;
  const half = Math.ceil(n / 2);
  const startY = Math.floor((h - half) / 2);
  return battle.enemies.map(([enemyId, instanceId], i) => {
    const col = i < half ? w - 3 : w - 2;
    const rowIndex = i < half ? i : i - half;
    return { enemyId, instanceId, x: col, y: Math.max(1, Math.min(h - 2, startY + rowIndex)) };
  });
}

/** 生成 JS 文件内容 */
function buildJs(battle, players, enemies, bgGrid, decGrid) {
  const tiledData = {
    visualWidth: battle.w,
    visualHeight: battle.h,
    bgGrid,
    decGrid,
    collisions: [],
    zones: {}
  };

  const playerLines = players.map(p => `    { unitId: '${p.unitId}', x: ${p.x}, y: ${p.y} }`).join(',\n');
  const enemyLines = enemies.map(e => `    { enemyId: '${e.enemyId}', instanceId: '${e.instanceId}', x: ${e.x}, y: ${e.y} }`).join(',\n');

  return `/**
 * ${battle.chapter} 战斗关卡：${battle.name}
 * 地图尺寸：${battle.w}×${battle.h}（Tiled 源工程见 docs/map/tiled_project/${battle.id}.tmx）
 * 我方 ${players.length} 人 / 敌方 ${enemies.length} 人，出生点见 Spawns。
 * 说明：底砖为占位房间框架，瓦片与碰撞细节请在 Tiled 中绘制后用 tools/sync_tmx_levels.cjs 回写。
 */
export const ${battle.exportName} = {
  id: '${battle.id}',
  name: '${battle.name}',
  bgm: '${battle.bgm}',
  mapWidth: ${battle.w},
  mapHeight: ${battle.h},
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
${playerLines}
  ],

  enemyDeploy: [
${enemyLines}
  ],

  objective: {
    type: '${battle.objective.type}',
    text: '${battle.objective.text}'
  },

  nextStorySceneOnWin: '${battle.next}',
  tiledData: ${JSON.stringify(tiledData, null, 2)}
};
`;
}

/** 生成 TMX 文件内容 */
function buildTmx(battle, players, enemies, bgGrid, decGrid) {
  const tilesetTags = TILESETS.map((src, i) =>
    ` <tileset firstgid="${FIRSTGIDS[i]}" source="${src}"/>`
  ).join('\n');

  const toCsv = (grid) => grid.map(row => row.join(',')).join(',\n');

  // Spawns 对象：先玩家后敌人，像素坐标 = 格坐标 × 48
  let objId = 1;
  const spawnObjs = [];
  for (const p of players) {
    spawnObjs.push(`  <object id="${objId++}" x="${p.x * 48}" y="${p.y * 48}" width="48" height="48"/>`);
  }
  for (const e of enemies) {
    spawnObjs.push(`  <object id="${objId++}" x="${e.x * 48}" y="${e.y * 48}" width="48" height="48"/>`);
  }
  const spawnsXml = spawnObjs.join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.12.2" orientation="orthogonal" renderorder="right-down" width="${battle.w}" height="${battle.h}" tilewidth="48" tileheight="48" infinite="0" nextlayerid="5" nextobjectid="${objId + 1}">
${tilesetTags}
 <layer id="1" name="Background" width="${battle.w}" height="${battle.h}">
  <data encoding="csv">
${toCsv(bgGrid)}
</data>
 </layer>
 <layer id="2" name="Decoration" width="${battle.w}" height="${battle.h}">
  <data encoding="csv">
${toCsv(decGrid)}
</data>
 </layer>
 <objectgroup id="3" name="Spawns">
  <properties>
   <property name="desc" value="在此放置玩家和敌人的出生点"/>
  </properties>
${spawnsXml}
 </objectgroup>
 <objectgroup id="4" name="Collisions">
  <properties>
   <property name="desc" value="在此绘制碰撞盒"/>
  </properties>
 </objectgroup>
</map>
`;
}

function main() {
  fs.mkdirSync(JS_DIR, { recursive: true });
  fs.mkdirSync(TMX_DIR, { recursive: true });

  for (const b of BATTLES) {
    const players = playerSpawns(b);
    const enemies = enemySpawns(b);
    const bgGrid = buildRoomBgGrid(b.w, b.h);
    const decGrid = zeroGrid(b.w, b.h);

    const jsPath = path.join(JS_DIR, `${b.id}.js`);
    const tmxPath = path.join(TMX_DIR, `${b.id}.tmx`);

    fs.writeFileSync(jsPath, buildJs(b, players, enemies, bgGrid, decGrid));
    fs.writeFileSync(tmxPath, buildTmx(b, players, enemies, bgGrid, decGrid));

    console.log(`[OK] ${b.id}  我方 ${players.length} / 敌方 ${enemies.length}  (${b.w}x${b.h})`);
  }
  console.log('\n全部第二幕战斗关卡与 TMX 工程生成完成。');
}

main();
