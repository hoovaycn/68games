/**
 * 第三章关卡：晚自习教室战役 · 破除猜疑心魔与制伏朱晏泽
 * 地图规格：9×7 教室室内战场
 * 地形包含：教室水磨石走道（tile_floor）、木讲台（wood_floor）、课桌阵列
 *
 * 机制：
 * 我方：主角 + 第一章入队同伴（男线：张子骁 + 张瀚瑜 + 范文默；女线：石予诺 + 陈品璇 + 何妍熹）
 * 敌方：反常的朱晏泽（Boss，高幸高抗，金尖钢笔突刺） + 盲从男同学 + 添油女同学
 * 战术核心：击破身旁传谣起哄的男女同学解除 Boss 坚守护甲，集火唤醒朱晏泽！
 */
export const CH2_BATTLE1 = {
  id: 'ch2_battle1',
  name: '第五战：六 8 班教室 · 破除猜疑风暴',
  bgm: 'bgm_battle_boss',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '水磨石地', def: 0, avoid: 0, cost: 1, color: '#e2e8f0', tileImg: 'assets/props/kenney/kc_crosswalk@2x.png' },
    wood_floor: { name: '木质讲台', def: 1, avoid: 5, cost: 1, color: '#b45309', tileImg: 'assets/props/kenney/kc_brick_red@2x.png' }
  },

  terrainTiles: [],

  props: [],

  // 玩家 3 人站位（main.js 会根据主角线动态拉取当前主力铁三角）
  playerDeploy: [
    { unitId: 'zhangzixiao', x: 1, y: 4 },
    { unitId: 'zhanghanyu', x: 1, y: 6 },
    { unitId: 'fanwenmo', x: 0, y: 5 }
  ],

  // 敌方布阵（5 人）：朱晏泽带头挑衅，两名男同学与两名女同学在课桌间煽风点火、推波助澜
  enemyDeploy: [
    { enemyId: 'zhuyanze_corrupted', instanceId: 'boss_zhuyanze', x: 13, y: 7 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'boy_1', x: 15, y: 5 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'girl_1', x: 13, y: 3 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'boy_2', x: 14, y: 4 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'girl_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '唤醒反常被心魔操纵的朱晏泽'
  },

  nextStorySceneOnWin: 'ch2_scene_recover',

  tutorial: {
    steps: [
      {
        title: '破解谣言 · 驱散盲从',
        body: '魔化男女同学会不断制造谣言动摇军心。优先将其打醒清除，失去跟风者的 Boss 防线将瞬间瓦解！',
        hint: '先打小怪破除谣言 · 再集火打醒朱晏泽'
      },
      {
        title: '铁三角协同 · 伙伴羁绊',
        body: '同甘共苦的伙伴们此刻是你最坚实的后盾，利用前排吸引仇恨，后排走位输出，洗刷一切诬陷！',
        hint: '并肩作战 · 击碎心魔'
      }
    ]
  },
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2653,
      2654,
      2654,
      2655,
      2653,
      2654,
      2654,
      2655,
      2653,
      2654,
      2654,
      2655,
      2653,
      2654,
      2654,
      2655
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
      2880,
      2881,
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
      2800,
      2801,
      0,
      0,
      2896,
      2897,
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
      0,
      0,
      0,
      2988,
      0,
      0,
      0,
      2988,
      0,
      0,
      0,
      2988,
      0
    ],
    [
      0,
      0,
      3004,
      0,
      0,
      0,
      3004,
      0,
      0,
      0,
      3004,
      0,
      0,
      0,
      3004,
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
      2893,
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
      0,
      0,
      0,
      2988,
      0,
      0,
      2909,
      2988,
      0,
      0,
      0,
      2988,
      0
    ],
    [
      0,
      0,
      3004,
      0,
      0,
      0,
      3004,
      0,
      0,
      0,
      3004,
      0,
      0,
      0,
      3004,
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
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 4,
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
      "x": 10,
      "y": 2
    },
    {
      "x": 10,
      "y": 3
    },
    {
      "x": 14,
      "y": 2
    },
    {
      "x": 14,
      "y": 3
    },
    {
      "x": 2,
      "y": 7
    },
    {
      "x": 2,
      "y": 8
    },
    {
      "x": 6,
      "y": 7
    },
    {
      "x": 6,
      "y": 8
    },
    {
      "x": 9,
      "y": 6
    },
    {
      "x": 9,
      "y": 7
    },
    {
      "x": 10,
      "y": 7
    },
    {
      "x": 10,
      "y": 8
    },
    {
      "x": 14,
      "y": 7
    },
    {
      "x": 14,
      "y": 8
    }
  ],
  "zones": {}
}
};
