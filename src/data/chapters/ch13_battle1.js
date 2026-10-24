/**
 * 第14章 照片上的人 战斗关卡：运河老码头前哨战
 * 地图尺寸：16×12（Tiled 源工程见 docs/map/tiled_project/ch13_battle1.tmx）
 * 我方 9 人 / 敌方 8 人，出生点见 Spawns。
 * 说明：底砖为占位房间框架，瓦片与碰撞细节请在 Tiled 中绘制后用 tools/sync_tmx_levels.cjs 回写。
 */
export const CH13_BATTLE1 = {
  id: 'ch13_battle1',
  name: '运河老码头前哨战',
  bgm: 'bgm_intense_boss',
  mapWidth: 16,
  mapHeight: 12,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 1, y: 3 },
    { unitId: 'zhanghanyu', x: 3, y: 1 },
    { unitId: 'fanwenmo', x: 1, y: 5 },
    { unitId: 'zhangxizhe', x: 2, y: 4 },
    { unitId: 'qinruiyi', x: 3, y: 5 },
    { unitId: 'zhuyanze', x: 1, y: 1 },
    { unitId: 'xu_laoshi', x: 2, y: 2 },
    { unitId: 'liu_laoshi', x: 3, y: 3 },
    { unitId: 'father_haifeng', x: 2, y: 6 }
  ],

  enemyDeploy: [
    { enemyId: 'shen_guard', instanceId: 'guard_a', x: 12, y: 6 },
    { enemyId: 'shen_guard', instanceId: 'guard_b', x: 12, y: 8 },
    { enemyId: 'shen_guard', instanceId: 'guard_c', x: 13, y: 9 },
    { enemyId: 'shen_guard', instanceId: 'guard_d', x: 12, y: 10 },
    { enemyId: 'berserker_guard', instanceId: 'heavy_a', x: 14, y: 6 },
    { enemyId: 'berserker_guard', instanceId: 'heavy_b', x: 13, y: 7 },
    { enemyId: 'punk', instanceId: 'punk_a', x: 14, y: 8 },
    { enemyId: 'punk', instanceId: 'punk_b', x: 14, y: 10 }
  ],

  enemyTuning: {
    punk_a: { level: 9, drops: [{ itemId: 'white_rabbit_candy', chance: 1.0 }, { itemId: 'honey_tea', chance: 0.5 }] },
    punk_b: { level: 9, drops: [{ itemId: 'white_rabbit_candy', chance: 1.0 }, { itemId: 'honey_tea', chance: 0.5 }] }
  },

  objective: {
    type: 'defeat_all',
    text: '突破码头外围防线'
  },

  nextStorySceneOnWin: 'ch13_scene_dock_entry',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 12,
  "bgGrid": [
    [
      922,
      923,
      924,
      923,
      923,
      923,
      923,
      923,
      923,
      923,
      923,
      923,
      923,
      923,
      924,
      925
    ],
    [
      941,
      942,
      943,
      942,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      944
    ],
    [
      941,
      942,
      943,
      942,
      942,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      942,
      942,
      942,
      943,
      942,
      908,
      909,
      910,
      943,
      943,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      942,
      942,
      943,
      942,
      942,
      927,
      928,
      929,
      942,
      942,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      943,
      942,
      943,
      942,
      942,
      946,
      947,
      948,
      943,
      942,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      942,
      943,
      943,
      943,
      942,
      942,
      942,
      942,
      942,
      943,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      942,
      943,
      942,
      942,
      942,
      943,
      942,
      942,
      943,
      943,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      942,
      943,
      942,
      942,
      943,
      943,
      942,
      943,
      943,
      943,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      943,
      942,
      943,
      942,
      943,
      944
    ],
    [
      941,
      942,
      943,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      942,
      943,
      944
    ],
    [
      960,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      961,
      962,
      963
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
      1161,
      1162,
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
      1180,
      1181,
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
      1161,
      1162,
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
      1180,
      1181,
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
      "name": "nt481",
      "firstgid": 1,
      "src": "assets/tiles/tiled_import/b25f7deed48a-a5_modern_exterior.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt482",
      "firstgid": 129,
      "src": "assets/tiles/tiled_import/7d21016c1dcd-a5_sewer.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt483",
      "firstgid": 257,
      "src": "assets/tiles/tiled_import/84f489ec09d4-a5_valley.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt484",
      "firstgid": 385,
      "src": "assets/tiles/tiled_import/3c79a7c23b84-b_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt485",
      "firstgid": 641,
      "src": "assets/tiles/tiled_import/8452e4593650-c_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "test48",
      "firstgid": 897,
      "src": "assets/tiles/tiled_import/eda14c0cde5c-Serene_Village_48x48.png",
      "cols": 19,
      "total": 855,
      "tileW": 48,
      "tileH": 48
    }
  ],
  "collisions": [
    {
      "x": 7,
      "y": 3
    },
    {
      "x": 8,
      "y": 3
    },
    {
      "x": 9,
      "y": 3
    },
    {
      "x": 7,
      "y": 4
    },
    {
      "x": 8,
      "y": 4
    },
    {
      "x": 9,
      "y": 4
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
      "x": 9,
      "y": 5
    },
    {
      "x": 7,
      "y": 9
    },
    {
      "x": 8,
      "y": 9
    },
    {
      "x": 7,
      "y": 10
    },
    {
      "x": 8,
      "y": 10
    },
    {
      "x": 12,
      "y": 0
    },
    {
      "x": 13,
      "y": 0
    },
    {
      "x": 12,
      "y": 1
    },
    {
      "x": 13,
      "y": 1
    }
  ],
  "zones": {}
}
};
