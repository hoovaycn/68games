/**
 * 第六章关卡：家长会散场后的教室 · 护住还没被带走的孩子
 */
export const CH5_BATTLE1 = {
  id: 'ch5_battle1',
  name: '第七战：家长会教室 · 压住异化扩散',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'wood_floor',

  terrainTypes: {
    wood_floor: { name: '教室木地板', def: 0, avoid: 0, cost: 1, color: '#a16207', tileImg: null },
    aisle: { name: '过道', def: 0, avoid: 0, cost: 1, color: '#d6d3d1', tileImg: null },
    desk_zone: { name: '课桌区', def: 1, avoid: 0, cost: 2, color: '#7c2d12', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 0, y: 9 },
    { unitId: 'zhanghanyu', x: 0, y: 7 },
    { unitId: 'fanwenmo', x: 3, y: 8 },
    { unitId: 'xu_laoshi', x: 1, y: 8 },
    { unitId: 'liu_laoshi', x: 2, y: 9 }
  ],

  enemyDeploy: [
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_a', x: 12, y: 0 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_a', x: 13, y: 1 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_b', x: 12, y: 2 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_b', x: 14, y: 2 }
  ],

  objective: {
    type: 'defeat_all',
    text: '救回先一步异化的同学'
  },

  nextStorySceneOnWin: 'ch5_scene_after',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659,
      2659
    ],
    [
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646,
      2646
    ]
  ],
  "decGrid": [
    [
      0,
      0,
      2913,
      2916,
      0,
      0,
      2915,
      2916,
      0,
      0,
      2913,
      2914,
      0,
      0,
      2854,
      2853
    ],
    [
      0,
      0,
      2929,
      2932,
      0,
      0,
      2931,
      2932,
      0,
      0,
      2929,
      2930,
      0,
      0,
      2870,
      2869
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
      2988,
      2988,
      0,
      0,
      2988,
      2988,
      0,
      0,
      2988,
      2988,
      0,
      0,
      2988,
      2988
    ],
    [
      0,
      0,
      3004,
      3004,
      0,
      0,
      3004,
      3004,
      0,
      0,
      3004,
      3004,
      0,
      0,
      3004,
      3004
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
      "y": 0
    },
    {
      "x": 3,
      "y": 0
    },
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 6,
      "y": 0
    },
    {
      "x": 7,
      "y": 0
    },
    {
      "x": 6,
      "y": 1
    },
    {
      "x": 7,
      "y": 1
    },
    {
      "x": 10,
      "y": 0
    },
    {
      "x": 11,
      "y": 0
    },
    {
      "x": 10,
      "y": 1
    },
    {
      "x": 11,
      "y": 1
    },
    {
      "x": 14,
      "y": 0
    },
    {
      "x": 15,
      "y": 0
    },
    {
      "x": 14,
      "y": 1
    },
    {
      "x": 15,
      "y": 1
    },
    {
      "x": 14,
      "y": 5
    },
    {
      "x": 15,
      "y": 5
    },
    {
      "x": 14,
      "y": 6
    },
    {
      "x": 15,
      "y": 6
    },
    {
      "x": 10,
      "y": 5
    },
    {
      "x": 11,
      "y": 5
    },
    {
      "x": 10,
      "y": 6
    },
    {
      "x": 11,
      "y": 6
    },
    {
      "x": 6,
      "y": 5
    },
    {
      "x": 7,
      "y": 5
    },
    {
      "x": 6,
      "y": 6
    },
    {
      "x": 7,
      "y": 6
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    },
    {
      "x": 3,
      "y": 6
    }
  ],
  "zones": {}
}
};
