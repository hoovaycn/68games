/**
 * 第13章 汽修厂的后仓 战斗关卡：仓库后仓突围保卫战
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch12_battle1.tmx）
 * 我方 7 人 / 敌方 5 人，出生点见 Spawns。
 * 说明：底砖为占位房间框架，瓦片与碰撞细节请在 Tiled 中绘制后用 tools/sync_tmx_levels.cjs 回写。
 */
export const CH12_BATTLE1 = {
  id: 'ch12_battle1',
  name: '仓库后仓突围保卫战',
  bgm: 'bgm_intense_boss',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 1, y: 2 },
    { unitId: 'zhanghanyu', x: 3, y: 0 },
    { unitId: 'fanwenmo', x: 3, y: 2 },
    { unitId: 'zhangxizhe', x: 2, y: 3 },
    { unitId: 'qinruiyi', x: 1, y: 0 },
    { unitId: 'zhuyanze', x: 2, y: 1 },
    { unitId: 'father_haifeng', x: 1, y: 4 }
  ],

  enemyDeploy: [
    { enemyId: 'shen_guard', instanceId: 'guard_a', x: 12, y: 8 },
    { enemyId: 'shen_guard', instanceId: 'guard_b', x: 13, y: 7 },
    { enemyId: 'shen_guard', instanceId: 'guard_c', x: 13, y: 9 },
    { enemyId: 'berserker_guard', instanceId: 'heavy_a', x: 14, y: 6 },
    { enemyId: 'berserker_guard', instanceId: 'heavy_b', x: 14, y: 8 }
  ],

  objective: {
    type: 'defeat_all',
    text: '与老爸海峰并肩杀出重围'
  },

  nextStorySceneOnWin: 'ch12_scene_badge_reveal',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      536871076,
      359,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      359,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      359,
      360,
      360,
      359,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      359,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      359,
      360,
      360,
      360,
      359,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      359,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      2684354724
    ],
    [
      536871076,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      360,
      359,
      360,
      2684354724
    ]
  ],
  "decGrid": [
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      639,
      640,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      655,
      656,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      641,
      642,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      657,
      658,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  ],
  "tilesets": [
    {
      "name": "Tileset_48x48_9",
      "firstgid": 1,
      "src": "assets/tiles/modern_free/Tileset_48x48_9.png",
      "cols": 10,
      "total": 100,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt481",
      "firstgid": 101,
      "src": "assets/tiles/tiled_import/b25f7deed48a-a5_modern_exterior.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt482",
      "firstgid": 229,
      "src": "assets/tiles/tiled_import/7d21016c1dcd-a5_sewer.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt483",
      "firstgid": 357,
      "src": "assets/tiles/tiled_import/84f489ec09d4-a5_valley.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt484",
      "firstgid": 485,
      "src": "assets/tiles/tiled_import/3c79a7c23b84-b_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt485",
      "firstgid": 741,
      "src": "assets/tiles/tiled_import/8452e4593650-c_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    }
  ],
  "collisions": [
    {
      "x": 10,
      "y": 1
    },
    {
      "x": 11,
      "y": 1
    },
    {
      "x": 10,
      "y": 2
    },
    {
      "x": 11,
      "y": 2
    },
    {
      "x": 7,
      "y": 5
    },
    {
      "x": 8,
      "y": 5
    },
    {
      "x": 7,
      "y": 6
    },
    {
      "x": 8,
      "y": 6
    }
  ],
  "zones": {}
}
};
