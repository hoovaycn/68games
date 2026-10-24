/**
 * 第11章 博物馆里的罐子 战斗关卡：博物馆展厅遭遇战 · 守护国宝
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch10_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 说明：底砖为占位房间框架，瓦片与碰撞细节请在 Tiled 中绘制后用 tools/sync_tmx_levels.cjs 回写。
 */
export const CH10_BATTLE1 = {
  id: 'ch10_battle1',
  name: '博物馆展厅遭遇战 · 守护国宝',
  bgm: 'bgm_battle_normal',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 0, y: 0 },
    { unitId: 'zhanghanyu', x: 0, y: 2 },
    { unitId: 'fanwenmo', x: 1, y: 3 },
    { unitId: 'zhangxizhe', x: 1, y: 1 },
    { unitId: 'qinruiyi', x: 2, y: 0 },
    { unitId: 'zhuyanze', x: 2, y: 2 }
  ],

  enemyDeploy: [
    { enemyId: 'shen_guard', instanceId: 'guard_a', x: 13, y: 6 },
    { enemyId: 'shen_guard', instanceId: 'guard_b', x: 14, y: 7 },
    { enemyId: 'shen_guard', instanceId: 'guard_c', x: 15, y: 8 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'push_a', x: 15, y: 6 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'push_b', x: 13, y: 8 }
  ],

  enemyTuning: {
    push_a: { level: 8 },
    push_b: { level: 8 }
  },

  objective: {
    type: 'defeat_all',
    text: '击退入侵博物馆的黑衣死士与狂暴保送生'
  },

  nextStorySceneOnWin: 'ch10_scene_tracking',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501,
      3501
    ],
    [
      3554,
      3555,
      3556,
      3554,
      3555,
      3556,
      3554,
      3555,
      3556,
      3554,
      3554,
      3555,
      3556,
      3554,
      3554,
      3555
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
      3890,
      3891,
      3890,
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
      4081,
      4081,
      4081,
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
      4097,
      4097,
      4097,
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
      3775,
      3775,
      3775,
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
      3791,
      3791,
      3791,
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
      "name": "Interiors_free_48x48",
      "firstgid": 1,
      "src": "assets/tiles/modern_free/Interiors_free_48x48.png",
      "cols": 16,
      "total": 1424,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "Room_Builder_free_48x48",
      "firstgid": 1425,
      "src": "assets/tiles/modern_free/Room_Builder_free_48x48.png",
      "cols": 17,
      "total": 391,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "Tileset_48x48_1",
      "firstgid": 1816,
      "src": "assets/tiles/modern_free/Tileset_48x48_1.png",
      "cols": 10,
      "total": 100,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "Tileset_48x48_2",
      "firstgid": 1916,
      "src": "assets/tiles/modern_free/Tileset_48x48_2.png",
      "cols": 10,
      "total": 100,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "Tileset_48x48_3",
      "firstgid": 2016,
      "src": "assets/tiles/modern_free/Tileset_48x48_3.png",
      "cols": 10,
      "total": 100,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "Tileset_48x48_9",
      "firstgid": 2116,
      "src": "assets/tiles/modern_free/Tileset_48x48_9.png",
      "cols": 10,
      "total": 100,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "Tileset_48x48_16",
      "firstgid": 2216,
      "src": "assets/tiles/modern_free/Tileset_48x48_16.png",
      "cols": 12,
      "total": 168,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "test48",
      "firstgid": 2384,
      "src": "assets/tiles/tiled_import/eda14c0cde5c-Serene_Village_48x48.png",
      "cols": 19,
      "total": 855,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt481",
      "firstgid": 3239,
      "src": "assets/tiles/tiled_import/b25f7deed48a-a5_modern_exterior.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt482",
      "firstgid": 3367,
      "src": "assets/tiles/tiled_import/7d21016c1dcd-a5_sewer.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt483",
      "firstgid": 3495,
      "src": "assets/tiles/tiled_import/84f489ec09d4-a5_valley.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt484",
      "firstgid": 3623,
      "src": "assets/tiles/tiled_import/3c79a7c23b84-b_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt485",
      "firstgid": 3879,
      "src": "assets/tiles/tiled_import/8452e4593650-c_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    }
  ],
  "collisions": [
    {
      "x": 7,
      "y": 2
    },
    {
      "x": 8,
      "y": 2
    },
    {
      "x": 9,
      "y": 2
    },
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
      "y": 6
    },
    {
      "x": 8,
      "y": 6
    },
    {
      "x": 9,
      "y": 6
    }
  ],
  "zones": {}
}
};
