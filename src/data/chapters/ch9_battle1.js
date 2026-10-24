/**
 * 第十章关卡：精神考场 · 六人团战异化自我
 */
export const CH9_BATTLE1 = {
  id: 'ch9_battle1',
  name: '终战：精神考场 · 面对异化自我',
  bgm: 'bgm_retro_level3',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'void_floor',

  terrainTypes: {
    void_floor: { name: '精神地板', def: 0, avoid: 0, cost: 1, color: '#312e81', tileImg: null },
    desk_line: { name: '考桌残影', def: 1, avoid: 5, cost: 1, color: '#1d4ed8', tileImg: null },
    crack: { name: '裂隙', def: 0, avoid: 10, cost: 1, color: '#0f172a', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 0, y: 7 },
    { unitId: 'zhanghanyu', x: 1, y: 6 },
    { unitId: 'fanwenmo', x: 2, y: 7 },
    { unitId: 'zhangxizhe', x: 1, y: 8 },
    { unitId: 'qinruiyi', x: 0, y: 9 },
    { unitId: 'zhuyanze', x: 2, y: 9 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangzixiao_corrupted', instanceId: 'shadow_mc', x: 15, y: 0 },
    { enemyId: 'zhanghanyu_corrupted', instanceId: 'shadow_ally1', x: 15, y: 2 },
    { enemyId: 'fanwenmo_corrupted', instanceId: 'shadow_ally2', x: 13, y: 0 },
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'shadow_xizhe', x: 14, y: 1 },
    { enemyId: 'qinruiyi_corrupted', instanceId: 'shadow_ruiyi', x: 13, y: 2 },
    { enemyId: 'zhuyanze_corrupted', instanceId: 'shadow_yanze', x: 14, y: 3 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击败所有异化自我'
  },

  nextStorySceneOnWin: 'ch9_scene_relief',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ],
    [
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438,
      2438
    ]
  ],
  "decGrid": [
    [
      2421,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2422,
      2147486069
    ],
    [
      2437,
      0,
      0,
      2824,
      0,
      0,
      0,
      0,
      0,
      2824,
      0,
      0,
      0,
      0,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      2840,
      0,
      0,
      0,
      0,
      0,
      2840,
      0,
      0,
      0,
      0,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      0,
      0,
      2824,
      0,
      0,
      0,
      0,
      0,
      2824,
      0,
      0,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      0,
      0,
      2840,
      0,
      0,
      0,
      0,
      0,
      2840,
      0,
      0,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      0,
      0,
      0,
      0,
      2824,
      0,
      0,
      0,
      0,
      0,
      2824,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      0,
      0,
      0,
      0,
      2840,
      0,
      0,
      0,
      0,
      0,
      2840,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2824,
      0,
      0,
      0,
      0,
      0,
      2147486085
    ],
    [
      2437,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2840,
      0,
      0,
      0,
      0,
      0,
      2147486085
    ],
    [
      1073744245,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      1073744246,
      3221227893
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
      "x": 3,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    },
    {
      "x": 7,
      "y": 5
    },
    {
      "x": 7,
      "y": 6
    },
    {
      "x": 9,
      "y": 7
    },
    {
      "x": 9,
      "y": 8
    },
    {
      "x": 13,
      "y": 5
    },
    {
      "x": 13,
      "y": 6
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
      "x": 9,
      "y": 1
    },
    {
      "x": 9,
      "y": 2
    }
  ],
  "zones": {}
}
};
