/**
 * 第18章 班长去哪了 战斗关卡：水闸废料场截击战
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch16_battle1.tmx）
 * 我方 5 人 / 敌方 5 人，出生点见 Spawns。
 * 说明：底砖为占位房间框架，瓦片与碰撞细节请在 Tiled 中绘制后用 tools/sync_tmx_levels.cjs 回写。
 */
export const CH16_BATTLE1 = {
  id: 'ch16_battle1',
  name: '水闸废料场截击战',
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
    { unitId: 'zhangzixiao', x: 0, y: 1 },
    { unitId: 'zhanghanyu', x: 0, y: 3 },
    { unitId: 'fanwenmo', x: 1, y: 4 },
    { unitId: 'zhangxizhe', x: 2, y: 1 },
    { unitId: 'zhuyanze', x: 1, y: 2 }
  ],

  enemyDeploy: [
    { enemyId: 'shen_guard', instanceId: 'guard_a', x: 13, y: 6 },
    { enemyId: 'shen_guard', instanceId: 'guard_b', x: 14, y: 7 },
    { enemyId: 'shen_guard', instanceId: 'guard_c', x: 13, y: 8 },
    { enemyId: 'shen_guard', instanceId: 'guard_d', x: 15, y: 6 },
    { enemyId: 'berserker_guard', instanceId: 'heavy_a', x: 15, y: 8 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击退伏击的沈氏精锐死士'
  },

  nextStorySceneOnWin: 'ch16_scene_truth_unveiled',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      245,
      246,
      247,
      252,
      252,
      246,
      247,
      248,
      245,
      246,
      247,
      252,
      252,
      246,
      247,
      248
    ],
    [
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      239,
      229
    ],
    [
      239,
      229,
      229,
      239,
      229,
      229,
      241,
      239,
      229,
      229,
      229,
      239,
      229,
      229,
      229,
      239
    ],
    [
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229
    ],
    [
      239,
      229,
      229,
      229,
      229,
      229,
      239,
      229,
      238,
      229,
      229,
      229,
      229,
      229,
      229,
      229
    ],
    [
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      239,
      229,
      229,
      229,
      229,
      229,
      229
    ],
    [
      229,
      229,
      229,
      229,
      239,
      229,
      229,
      229,
      229,
      229,
      241,
      229,
      229,
      229,
      229,
      229
    ],
    [
      229,
      239,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      229,
      239,
      229,
      238,
      229,
      239,
      229
    ],
    [
      229,
      229,
      229,
      229,
      241,
      239,
      239,
      229,
      229,
      229,
      229,
      229,
      229,
      239,
      229,
      229
    ],
    [
      260,
      257,
      260,
      260,
      258,
      260,
      260,
      259,
      260,
      260,
      260,
      258,
      260,
      259,
      260,
      260
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
      820,
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
      836,
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
      827,
      828,
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
      843,
      844,
      0,
      0,
      0,
      753,
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
      819,
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
      835,
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
      "x": 9,
      "y": 1
    },
    {
      "x": 9,
      "y": 2
    },
    {
      "x": 8,
      "y": 6
    },
    {
      "x": 2,
      "y": 8
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    },
    {
      "x": 3,
      "y": 6
    },
    {
      "x": 4,
      "y": 6
    }
  ],
  "zones": {}
}
};
