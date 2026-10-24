/**
 * 第七章关卡：二十年前的旧走廊 · 迎击异化者
 * 地图规格：10×8 教学楼旧走廊
 * 地形包含：老旧水磨石走道（tile_floor）、杂物堆（debris）
 * 
 * 机制：
 * 我方：少年徐老师、少年刘老师、阿瑶（此时阿瑶还是正常状态，或者是受保护状态）
 * 敌方：异化学长、传达室大爷（异化）、异化男同学
 * 战术核心：硬扛异化者的攻击，或者边打边退。
 */
export const CH7_BATTLE1 = {
  id: 'ch7_battle1',
  name: '第十一战：二十年前的旧走廊 · 逃无可逃',
  bgm: 'bgm_intense_boss',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '旧水磨石地', def: 0, avoid: 0, cost: 1, color: '#9ca3af', tileImg: 'assets/props/kenney/kc_crosswalk@2x.png' },
    wood_floor: { name: '旧木地板', def: 1, avoid: 5, cost: 1, color: '#78350f', tileImg: 'assets/props/kenney/kc_brick_red@2x.png' }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'young_xu', x: 0, y: 3 },
    { unitId: 'young_liu', x: 0, y: 5 },
    { unitId: 'ayao', x: 0, y: 7 }
  ],

  enemyDeploy: [
    { enemyId: 'senior_student_corrupted', instanceId: 'senior_1', x: 15, y: 2 },
    { enemyId: 'janitor_corrupted', instanceId: 'janitor_1', x: 15, y: 4 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'corrupted_boy_1', x: 15, y: 6 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'corrupted_girl_1', x: 15, y: 8 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击败所有异化者或存活5回合'
  },

  nextStorySceneOnWin: 'ch7_scene_sacrifice',

  events: [
    {
      trigger: 'TURN_START',
      turn: 1,
      dialogues: [
        { speaker: '传达室大爷（异化）', text: '考砸了……对不起……我连大门都看不好……吃下去……变聪明……', portrait: 'assets/art/janitor_old@2x.png' },
        { speaker: '少年徐老师', text: '大爷也疯了！这到底是什么鬼东西！刘，护好阿瑶，别让他们靠近！', portrait: 'assets/art/young_xu_default@2x.png' }
      ]
    },
    {
      trigger: 'UNIT_DEFEATED',
      unitId: 'senior_1',
      dialogues: [
        { speaker: '异化学长', text: '公式……全都忘了……我要……重考……', portrait: 'assets/art/senior_student_corrupted@2x.png' }
      ]
    }
  ],
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2528,
      2529,
      2535,
      2531,
      2528,
      2529,
      2535,
      2531,
      2528,
      2529,
      2535,
      2531,
      2528,
      2529,
      2535,
      2531
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
      2516,
      2516,
      2516,
      2516,
      2516,
      2516
    ],
    [
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
      0,
      0,
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
      3035,
      3036,
      0,
      0,
      0,
      3036,
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
      3035,
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
      3035,
      0,
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
      3036,
      0,
      0,
      0,
      3036,
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
      3035,
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
      "x": 0,
      "y": 0
    },
    {
      "x": 1,
      "y": 0
    },
    {
      "x": 2,
      "y": 0
    },
    {
      "x": 3,
      "y": 0
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
      "x": 6,
      "y": 0
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
      "x": 9,
      "y": 0
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
      "x": 12,
      "y": 0
    },
    {
      "x": 13,
      "y": 0
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
      "x": 6,
      "y": 3
    },
    {
      "x": 7,
      "y": 3
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
      "x": 8,
      "y": 6
    },
    {
      "x": 8,
      "y": 7
    },
    {
      "x": 4,
      "y": 5
    },
    {
      "x": 4,
      "y": 6
    }
  ],
  "zones": {}
}
};
