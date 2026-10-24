/**
 * 第五章关卡：废弃训练馆后厨 · 击退坏教练
 */
export const CH4_BATTLE1 = {
  id: 'ch4_battle1',
  name: '第六战：坏教练后厨 · 拦住供货线',
  bgm: 'bgm_intense_boss',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '水泥地', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null },
    storage: { name: '旧货架', def: 1, avoid: 0, cost: 2, color: '#92400e', tileImg: null },
    mat: { name: '训练垫', def: 1, avoid: 5, cost: 1, color: '#065f46', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 0, y: 4 },
    { unitId: 'zhanghanyu', x: 1, y: 1 },
    { unitId: 'fanwenmo', x: 0, y: 2 },
    { unitId: 'zhangxizhe', x: 0, y: 6 },
    { unitId: 'qinruiyi', x: 1, y: 5 },
    { unitId: 'zhuyanze', x: 1, y: 3 },
    { unitId: 'xu_laoshi', x: 2, y: 4 },
    { unitId: 'liu_laoshi', x: 2, y: 2 }
  ],

  enemyDeploy: [
    { enemyId: 'coach_corrupted', instanceId: 'coach_boss', x: 13, y: 6 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 15, y: 4 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_a', x: 15, y: 6 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_b', x: 15, y: 8 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a', x: 14, y: 5 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b', x: 14, y: 7 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击退坏教练与供货帮手'
  },

  nextStorySceneOnWin: 'ch4_scene_after',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2644,
      2644,
      2644,
      2523,
      2644,
      2644,
      2644,
      2644,
      2523,
      2644,
      2644,
      2644,
      2644,
      2644,
      2644,
      2644
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512
    ],
    [
      2512,
      2522,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2522,
      2512,
      2512
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2522
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2522,
      2512,
      2512,
      2512,
      2512,
      2522,
      2512,
      2512,
      2512,
      2512
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2522,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512
    ],
    [
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2522,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512
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
      3064,
      3065,
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
      3080,
      3081,
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
      3221,
      3221,
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
      3237,
      3237,
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
      3202,
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
      3103,
      0,
      0
    ],
    [
      0,
      0,
      3202,
      0,
      3186,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3119,
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
      "name": "nt481",
      "firstgid": 2384,
      "src": "assets/tiles/tiled_import/b25f7deed48a-a5_modern_exterior.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt482",
      "firstgid": 2512,
      "src": "assets/tiles/tiled_import/7d21016c1dcd-a5_sewer.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt483",
      "firstgid": 2640,
      "src": "assets/tiles/tiled_import/84f489ec09d4-a5_valley.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt484",
      "firstgid": 2768,
      "src": "assets/tiles/tiled_import/3c79a7c23b84-b_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt485",
      "firstgid": 3024,
      "src": "assets/tiles/tiled_import/8452e4593650-c_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    }
  ],
  "collisions": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    },
    {
      "x": 11,
      "y": 0
    },
    {
      "x": 12,
      "y": 0
    },
    {
      "x": 11,
      "y": 1
    },
    {
      "x": 12,
      "y": 1
    },
    {
      "x": 13,
      "y": 7
    },
    {
      "x": 13,
      "y": 8
    },
    {
      "x": 9,
      "y": 6
    },
    {
      "x": 4,
      "y": 8
    },
    {
      "x": 2,
      "y": 8
    }
  ],
  "zones": {}
}
};
