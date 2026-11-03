const fs = require('fs');
const path = require('path');

const ACT3_BATTLES = [
  {
    id: 'ch21_battle1',
    name: '水闸暗巷突围战',
    bgm: 'bgm_battle_normal',
    width: 16,
    height: 10,
    objective: { type: 'defeat_boss', text: '击溃阿彪与暗巷包夹打手' },
    nextStorySceneOnWin: 'ch21_scene_night_after',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'enforcer_abiao', instanceId: 'boss_abiao' },
      { enemyId: 'porter_blueeye', instanceId: 'porter_1' },
      { enemyId: 'porter_blueeye', instanceId: 'porter_2' },
      { enemyId: 'enforcer_shadow', instanceId: 'shadow_1' },
      { enemyId: 'enforcer_shadow', instanceId: 'shadow_2' }
    ],
    // 出生点 (x, y) 逻辑格
    playerSpawns: [
      { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 },
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }
    ],
    enemySpawns: [
      { x: 13, y: 4 }, // boss
      { x: 12, y: 3 }, { x: 12, y: 5 },
      { x: 14, y: 2 }, { x: 14, y: 6 }
    ],
    obstacles: [
      { x: 7, y: 2, w: 1, h: 2 },
      { x: 7, y: 6, w: 1, h: 2 }
    ]
  },
  {
    id: 'ch22_battle1',
    name: '九号码头突击战',
    bgm: 'bgm_battle_normal',
    width: 16,
    height: 10,
    objective: { type: 'defeat_boss', text: '击破独眼蝰蛇并击退走私水手' },
    nextStorySceneOnWin: 'ch22_scene_reverse_ambush',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze', 'xu_laoshi'],
    enemyUnits: [
      { enemyId: 'boss_viper_smuggler', instanceId: 'boss_viper' },
      { enemyId: 'sailor_berserk', instanceId: 'sailor_1' },
      { enemyId: 'sailor_berserk', instanceId: 'sailor_2' },
      { enemyId: 'sniper_dock', instanceId: 'sniper_1' },
      { enemyId: 'sniper_dock', instanceId: 'sniper_2' }
    ],
    playerSpawns: [
      { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 },
      { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 1, y: 3 }, { x: 1, y: 5 }
    ],
    enemySpawns: [
      { x: 13, y: 4 }, // boss
      { x: 12, y: 3 }, { x: 12, y: 5 },
      { x: 14, y: 2 }, { x: 14, y: 6 }
    ],
    obstacles: [
      { x: 8, y: 1, w: 1, h: 2 },
      { x: 8, y: 7, w: 1, h: 2 }
    ]
  },
  {
    id: 'ch23_battle1',
    name: '诊室时空阻滞战',
    bgm: 'bgm_suspense',
    width: 16,
    height: 10,
    objective: { type: 'defeat_all', text: '清除侵蚀诊室的时空拟态体与傀儡' },
    nextStorySceneOnWin: 'ch23_scene_future_exile',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'shadow_parasite', instanceId: 'parasite_1' },
      { enemyId: 'shadow_parasite', instanceId: 'parasite_2' },
      { enemyId: 'chronos_puppet', instanceId: 'puppet_1' },
      { enemyId: 'chronos_puppet', instanceId: 'puppet_2' },
      { enemyId: 'chronos_puppet', instanceId: 'puppet_3' }
    ],
    playerSpawns: [
      { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 },
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }
    ],
    enemySpawns: [
      { x: 12, y: 3 }, { x: 12, y: 5 },
      { x: 13, y: 4 }, { x: 14, y: 2 }, { x: 14, y: 6 }
    ],
    obstacles: [
      { x: 7, y: 3, w: 2, h: 1 },
      { x: 7, y: 6, w: 2, h: 1 }
    ]
  },
  {
    id: 'ch24_battle1',
    name: '未来广场突围求生战',
    bgm: 'bgm_battle_normal',
    width: 16,
    height: 12,
    objective: { type: 'defeat_all', text: '击破外骨骼治安官与巡防探针' },
    nextStorySceneOnWin: 'ch24_scene_abyss_cornered',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_exam_captain', instanceId: 'boss_captain' },
      { enemyId: 'officer_100', instanceId: 'officer_1' },
      { enemyId: 'officer_100', instanceId: 'officer_2' },
      { enemyId: 'probe_machine', instanceId: 'probe_1' },
      { enemyId: 'probe_machine', instanceId: 'probe_2' }
    ],
    playerSpawns: [
      { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
      { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    enemySpawns: [
      { x: 13, y: 5 }, // boss
      { x: 12, y: 4 }, { x: 12, y: 6 },
      { x: 14, y: 3 }, { x: 14, y: 7 }
    ],
    obstacles: [
      { x: 8, y: 2, w: 1, h: 3 },
      { x: 8, y: 7, w: 1, h: 3 }
    ]
  },
  {
    id: 'ch25_battle1',
    name: '防空洞绝壁守护战',
    bgm: 'bgm_battle_normal',
    width: 16,
    height: 12,
    objective: { type: 'defeat_boss', text: '击溃重型追猎者阿尔法与机械猎犬' },
    nextStorySceneOnWin: 'ch25_scene_bitter_legacy',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_hunter_alpha', instanceId: 'boss_hunter' },
      { enemyId: 'patrol_robot_exam', instanceId: 'robot_1' },
      { enemyId: 'patrol_robot_exam', instanceId: 'robot_2' },
      { enemyId: 'hound_riot', instanceId: 'hound_1' },
      { enemyId: 'hound_riot', instanceId: 'hound_2' }
    ],
    playerSpawns: [
      { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
      { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    enemySpawns: [
      { x: 13, y: 5 }, // boss
      { x: 12, y: 3 }, { x: 12, y: 7 },
      { x: 14, y: 4 }, { x: 14, y: 6 }
    ],
    obstacles: [
      { x: 7, y: 3, w: 2, h: 1 },
      { x: 7, y: 7, w: 2, h: 1 }
    ]
  },
  {
    id: 'ch26_battle1',
    name: '天梯核心主脑歼灭战',
    bgm: 'bgm_retro_level3',
    width: 18,
    height: 12,
    objective: { type: 'defeat_boss', text: '歼灭天梯全息主脑·满分优等生' },
    nextStorySceneOnWin: 'ch26_scene_paradox_truth',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_ai_topstudent', instanceId: 'boss_ai' },
      { enemyId: 'boss_storm_mech', instanceId: 'storm_mech_1' },
      { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_1' },
      { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_2' },
      { enemyId: 'patrol_robot_exam', instanceId: 'robot_exam_1' }
    ],
    playerSpawns: [
      { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
      { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    enemySpawns: [
      { x: 15, y: 5 }, // boss
      { x: 13, y: 4 }, { x: 13, y: 6 },
      { x: 14, y: 3 }, { x: 14, y: 7 }
    ],
    obstacles: [
      { x: 8, y: 2, w: 2, h: 2 },
      { x: 8, y: 8, w: 2, h: 2 }
    ]
  },
  {
    id: 'ch27_battle1',
    name: '光门前最后的血肉长城',
    bgm: 'bgm_battle_normal',
    width: 16,
    height: 12,
    objective: { type: 'defeat_all', text: '全歼来犯敌军守卫时空光门' },
    nextStorySceneOnWin: 'ch27_scene_great_sacrifice',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_storm_mech', instanceId: 'mech_vanguard' },
      { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_1' },
      { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_2' },
      { enemyId: 'hound_riot', instanceId: 'hound_1' },
      { enemyId: 'hound_riot', instanceId: 'hound_2' }
    ],
    playerSpawns: [
      { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
      { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    enemySpawns: [
      { x: 13, y: 5 }, // mech
      { x: 12, y: 4 }, { x: 12, y: 6 },
      { x: 14, y: 3 }, { x: 14, y: 7 }
    ],
    obstacles: [
      { x: 7, y: 1, w: 2, h: 2 },
      { x: 7, y: 8, w: 2, h: 2 }
    ]
  },
  {
    id: 'ch28_battle1',
    name: '三号船甲板破袭战',
    bgm: 'bgm_battle_normal',
    width: 16,
    height: 10,
    objective: { type: 'defeat_boss', text: '击破强化巨汉铁蝎夺取防爆卡' },
    nextStorySceneOnWin: 'ch28_scene_disarm_destiny',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_iron_scorpion', instanceId: 'boss_scorpion' },
      { enemyId: 'fanatic_bomber', instanceId: 'bomber_1' },
      { enemyId: 'fanatic_bomber', instanceId: 'bomber_2' },
      { enemyId: 'hold_gate_guard', instanceId: 'guard_1' },
      { enemyId: 'hold_gate_guard', instanceId: 'guard_2' }
    ],
    playerSpawns: [
      { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 },
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }
    ],
    enemySpawns: [
      { x: 13, y: 4 }, // boss
      { x: 12, y: 3 }, { x: 12, y: 5 },
      { x: 14, y: 2 }, { x: 14, y: 6 }
    ],
    obstacles: [
      { x: 7, y: 2, w: 1, h: 2 },
      { x: 7, y: 6, w: 1, h: 2 }
    ]
  },
  {
    id: 'ch29_battle1',
    name: '斩断神明枷锁',
    bgm: 'bgm_retro_level3',
    width: 18,
    height: 12,
    objective: { type: 'defeat_boss', text: '击破神经死锁中枢并解救阿瑶' },
    nextStorySceneOnWin: 'ch29_battle1',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'ayao_corrupted_god', instanceId: 'ayao_god' },
      { enemyId: 'pillar_neural_lock', instanceId: 'pillar_1' },
      { enemyId: 'pillar_neural_lock', instanceId: 'pillar_2' },
      { enemyId: 'repair_spider', instanceId: 'spider_1' },
      { enemyId: 'repair_spider', instanceId: 'spider_2' }
    ],
    playerSpawns: [
      { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
      { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    enemySpawns: [
      { x: 15, y: 5 }, // ayao
      { x: 13, y: 3 }, { x: 13, y: 7 }, // pillars
      { x: 14, y: 4 }, { x: 14, y: 6 }  // spiders
    ],
    obstacles: [
      { x: 8, y: 2, w: 2, h: 2 },
      { x: 8, y: 8, w: 2, h: 2 }
    ]
  },
  {
    id: 'ch30_battle1',
    name: '终局决战 · 斩断莫比乌斯环',
    bgm: 'bgm_retro_level3',
    width: 18,
    height: 12,
    objective: { type: 'defeat_boss', text: '彻底粉碎天梯裁决者核心' },
    nextStorySceneOnWin: 'ch30_battle1',
    playerUnits: ['zhangzixiao', 'zhanghanyu', 'fanwenmo', 'zhangxizhe', 'qinruiyi', 'zhuyanze'],
    enemyUnits: [
      { enemyId: 'boss_judgement_core', instanceId: 'boss_judgement' },
      { enemyId: 'capital_guard_mech', instanceId: 'mech_guard_1' },
      { enemyId: 'capital_guard_mech', instanceId: 'mech_guard_2' },
      { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_1' },
      { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_2' }
    ],
    playerSpawns: [
      { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
      { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    enemySpawns: [
      { x: 15, y: 5 }, // boss
      { x: 13, y: 3 }, { x: 13, y: 7 },
      { x: 14, y: 4 }, { x: 14, y: 6 }
    ],
    obstacles: [
      { x: 8, y: 2, w: 2, h: 2 },
      { x: 8, y: 8, w: 2, h: 2 }
    ]
  }
];

// 1. 生成 TMX 文件
const tiledDir = path.resolve(__dirname, '../docs/map/tiled_project');
const chaptersDir = path.resolve(__dirname, '../src/data/chapters');

for (const b of ACT3_BATTLES) {
  const W = b.width;
  const H = b.height;
  
  // 生成 Background 矩阵（使用 nt483 的灰地砖 367）
  const bgRows = [];
  for (let y = 0; y < H; y++) {
    const row = [];
    for (let x = 0; x < W; x++) {
      if (y === 0 || y === H - 1 || x === 0 || x === W - 1) {
        row.push(414); // 墙/边框砖
      } else {
        row.push(367); // 平整地面
      }
    }
    bgRows.push(row.join(','));
  }
  const bgCsv = bgRows.join(',\n');
  
  // Decoration 层（全0占位）
  const decRow = Array(W).fill(0).join(',');
  const decCsv = Array(H).fill(decRow).join(',\n');

  // Spawns 层：前 N 个玩家，后 M 个敌人
  let objectId = 1;
  const spawnObjects = [];
  for (const p of b.playerSpawns) {
    spawnObjects.push(`  <object id="${objectId++}" x="${p.x * 48}" y="${p.y * 48}" width="48" height="48"/>`);
  }
  for (const e of b.enemySpawns) {
    spawnObjects.push(`  <object id="${objectId++}" x="${e.x * 48}" y="${e.y * 48}" width="48" height="48"/>`);
  }

  // Collisions 障碍物
  const collisionObjects = [];
  for (const obs of b.obstacles) {
    collisionObjects.push(`  <object id="${objectId++}" x="${obs.x * 48}" y="${obs.y * 48}" width="${obs.w * 48}" height="${obs.h * 48}"/>`);
  }

  const tmxContent = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.12.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="48" tileheight="48" infinite="0" nextlayerid="5" nextobjectid="${objectId + 1}">
 <tileset firstgid="1" source="Tileset_48x48_9.tsx"/>
 <tileset firstgid="101" source="nt481.tsx"/>
 <tileset firstgid="229" source="nt482.tsx"/>
 <tileset firstgid="357" source="nt483.tsx"/>
 <tileset firstgid="485" source="nt484.tsx"/>
 <tileset firstgid="741" source="nt485.tsx"/>
 <layer id="1" name="Background" width="${W}" height="${H}">
  <data encoding="csv">
${bgCsv}
</data>
 </layer>
 <layer id="2" name="Decoration" width="${W}" height="${H}">
  <data encoding="csv">
${decCsv}
</data>
 </layer>
 <objectgroup id="3" name="Spawns">
  <properties>
   <property name="desc" value="在此放置玩家和敌人的出生点"/>
  </properties>
${spawnObjects.join('\n')}
 </objectgroup>
 <objectgroup id="4" name="Collisions">
  <properties>
   <property name="desc" value="在此绘制碰撞盒"/>
  </properties>
${collisionObjects.join('\n')}
 </objectgroup>
</map>
`;

  const tmxPath = path.join(tiledDir, `${b.id}.tmx`);
  fs.writeFileSync(tmxPath, tmxContent, 'utf-8');
  console.log(`[TMX Created] ${b.id}.tmx (${W}x${H})`);

  // 2. 生成初始关卡 JS 文件
  const exportConstName = b.id.toUpperCase();
  const playerDeployStr = JSON.stringify(b.playerSpawns.map((s, idx) => ({
    unitId: b.playerUnits[idx],
    x: s.x,
    y: s.y
  })), null, 4);

  const enemyDeployStr = JSON.stringify(b.enemySpawns.map((s, idx) => ({
    enemyId: b.enemyUnits[idx].enemyId,
    instanceId: b.enemyUnits[idx].instanceId,
    x: s.x,
    y: s.y
  })), null, 4);

  const jsContent = `/**
 * ${b.name} 战斗关卡定义
 * 地图尺寸：${W}×${H}（Tiled 源工程见 docs/map/tiled_project/${b.id}.tmx）
 * 我方 ${b.playerUnits.length} 人 / 敌方 ${b.enemyUnits.length} 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const ${exportConstName} = {
  id: '${b.id}',
  name: '${b.name}',
  bgm: '${b.bgm}',
  mapWidth: ${W},
  mapHeight: ${H},
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],
  props: [],

  playerDeploy: ${playerDeployStr},

  enemyDeploy: ${enemyDeployStr},

  objective: {
    type: '${b.objective.type}',
    text: '${b.objective.text}'
  },

  nextStorySceneOnWin: '${b.nextStorySceneOnWin}',
  tiledData: null
};
`;

  const jsPath = path.join(chaptersDir, `${b.id}.js`);
  fs.writeFileSync(jsPath, jsContent, 'utf-8');
  console.log(`[JS Created] ${b.id}.js`);
}

console.log('Done building Act 3 battle files!');
