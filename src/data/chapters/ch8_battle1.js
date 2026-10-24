/**
 * 第九章关卡：旧仓库 · 掐断供货线
 */
export const CH8_BATTLE1 = {
  id: 'ch8_battle1',
  name: '第九战：旧仓库 · 最后一车',
  bgm: 'bgm_gojira_battle',
  mapWidth: 11,
  mapHeight: 7,
  defaultTerrain: 'concrete',

  terrainTypes: {
    concrete: { name: '水泥地', def: 0, avoid: 0, cost: 1, color: '#6b7280', tileImg: null },
    box_lane: { name: '货箱区', def: 1, avoid: 0, cost: 2, color: '#92400e', tileImg: null },
    wet_floor: { name: '积水地', def: 0, avoid: 10, cost: 1, color: '#0f766e', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'young_xu', x: 0, y: 2 },
    { unitId: 'young_liu', x: 0, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'mystery_man', instanceId: 'mystery_boss', x: 10, y: 1 },
    { enemyId: 'coach_corrupted', instanceId: 'coach_boss', x: 10, y: 2 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 10, y: 3 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a', x: 10, y: 4 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b', x: 10, y: 5 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击破仓库里的供货首脑'
  },

  nextStorySceneOnWin: 'ch8_scene_after',
  tiledData: {
  "visualWidth": 11,
  "visualHeight": 7,
  "bgGrid": [
    [
      2518,
      2518,
      2518,
      2518,
      2518,
      2518,
      2518,
      2518,
      2518,
      2518,
      2518
    ],
    [
      2516,
      2516,
      2516,
      2517,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2517
    ],
    [
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516
    ],
    [
      2516,
      2516,
      2516,
      2516,
      2517,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516
    ],
    [
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516
    ],
    [
      2516,
      2516,
      2516,
      2516,
      2516,
      2517,
      2516,
      2516,
      2516,
      2516,
      2516
    ],
    [
      2516,
      2516,
      2516,
      2517,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516,
      2516
    ]
  ],
  "decGrid": [
    [
      0,
      0,
      0,
      0,
      0,
      2524,
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
      2524,
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
      3069,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      3225,
      0,
      0,
      0,
      3085,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      3241,
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
      2524,
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
      2524,
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
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 5,
      "y": 0
    },
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 6,
      "y": 3
    },
    {
      "x": 8,
      "y": 5
    },
    {
      "x": 8,
      "y": 6
    }
  ],
  "zones": {}
}
};
