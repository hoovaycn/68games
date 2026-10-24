/**
 * 第七章关卡：教学楼夜楼道 · 暂时压住异化同伴
 */
export const CH6_BATTLE1 = {
  id: 'ch6_battle1',
  name: '第八战：夜楼道 · 先把熟人拦下来',
  bgm: 'bgm_army_approaching',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'hall',

  terrainTypes: {
    hall: { name: '走廊', def: 0, avoid: 0, cost: 1, color: '#475569', tileImg: null },
    doorway: { name: '门口', def: 1, avoid: 0, cost: 1, color: '#1f2937', tileImg: null },
    stair: { name: '楼梯口', def: 0, avoid: 10, cost: 1, color: '#111827', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 6 },
    { unitId: 'zhanghanyu', x: 0, y: 6 },
    { unitId: 'fanwenmo', x: 1, y: 7 },
    { unitId: 'xu_laoshi', x: 0, y: 8 },
    { unitId: 'liu_laoshi', x: 2, y: 8 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'boss_xizhe', x: 15, y: 1 },
    { enemyId: 'qinruiyi_corrupted', instanceId: 'boss_ruiyi', x: 15, y: 3 },
    { enemyId: 'zhuyanze_corrupted', instanceId: 'boss_yanze', x: 13, y: 1 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_a', x: 14, y: 4 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_a', x: 13, y: 3 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_b', x: 14, y: 2 }
  ],

  objective: {
    type: 'defeat_all',
    text: '在楼道里先压住最前面的异化同伴'
  },

  nextStorySceneOnWin: 'ch6_scene_retreat',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2533,
      2533,
      2533,
      2532,
      2533,
      2533,
      2532,
      2533,
      2533,
      2533,
      2532,
      2533,
      2533,
      2532,
      2533,
      2533
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
      2541,
      2543,
      2543,
      2543,
      2542,
      2543
    ]
  ],
  "decGrid": [
    [
      0,
      2924,
      2925,
      0,
      2884,
      2885,
      0,
      2886,
      2887,
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
      2940,
      2941,
      0,
      2900,
      2901,
      0,
      2902,
      2903,
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
      2920,
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
      2936,
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
      3154,
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
      3170,
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
      3253,
      3255,
      0,
      0,
      3070,
      3069,
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
      3269,
      3271,
      0,
      0,
      3086,
      3085,
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
      "x": 1,
      "y": 0
    },
    {
      "x": 2,
      "y": 0
    },
    {
      "x": 1,
      "y": 1
    },
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 4,
      "y": 0
    },
    {
      "x": 5,
      "y": 0
    },
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 7,
      "y": 0
    },
    {
      "x": 8,
      "y": 0
    },
    {
      "x": 7,
      "y": 1
    },
    {
      "x": 8,
      "y": 1
    },
    {
      "x": 11,
      "y": 3
    },
    {
      "x": 11,
      "y": 4
    },
    {
      "x": 4,
      "y": 5
    },
    {
      "x": 4,
      "y": 6
    },
    {
      "x": 7,
      "y": 7
    },
    {
      "x": 8,
      "y": 7
    },
    {
      "x": 7,
      "y": 8
    },
    {
      "x": 8,
      "y": 8
    },
    {
      "x": 11,
      "y": 7
    },
    {
      "x": 12,
      "y": 7
    },
    {
      "x": 11,
      "y": 8
    },
    {
      "x": 12,
      "y": 8
    }
  ],
  "zones": {}
}
};
