/**
 * 第四章关卡：训练馆门口 · 先救回张希哲
 */
export const CH3_BATTLE1 = {
  id: 'ch3_battle1',
  name: '第五战：训练馆门口 · 护住参展名单',
  bgm: 'bgm_victory',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '馆内地砖', def: 0, avoid: 0, cost: 1, color: '#94a3b8', tileImg: null },
    track: { name: '门外空地', def: 0, avoid: 0, cost: 1, color: '#64748b', tileImg: null },
    stage_mat: { name: '软垫', def: 1, avoid: 5, cost: 1, color: '#0f766e', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 6 },
    { unitId: 'zhanghanyu', x: 2, y: 7 },
    { unitId: 'fanwenmo', x: 1, y: 6 },
    { unitId: 'qinruiyi', x: 1, y: 8 },
    { unitId: 'zhuyanze', x: 3, y: 8 },
    { unitId: 'xu_laoshi', x: 0, y: 5 },
    { unitId: 'liu_laoshi', x: 0, y: 7 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'boss_zhangxizhe', x: 13, y: 1 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 15, y: 1 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_a', x: 14, y: 2 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_b', x: 15, y: 3 }
  ],

  objective: {
    type: 'defeat_all',
    text: '救回张希哲并击退堵门外校生'
  },

  nextStorySceneOnWin: 'ch3_scene_recover',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2543,
      2543,
      2543,
      2541,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2541,
      2543
    ],
    [
      2512,
      2514,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2514,
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
      2513,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2513
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
      2513,
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
      2513,
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
      2514,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2512,
      2513,
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
      2514,
      2512,
      2514
    ],
    [
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2541,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543,
      2543
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
      2922,
      2923,
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
      2938,
      2939,
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
      3128,
      3164,
      3165,
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
      3144,
      3180,
      3181,
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
      "x": 4,
      "y": 1
    },
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 8,
      "y": 6
    },
    {
      "x": 9,
      "y": 6
    },
    {
      "x": 10,
      "y": 6
    },
    {
      "x": 8,
      "y": 7
    },
    {
      "x": 9,
      "y": 7
    },
    {
      "x": 10,
      "y": 7
    }
  ],
  "zones": {}
}
};
