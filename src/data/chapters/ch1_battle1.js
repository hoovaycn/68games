/**
 * 第二章关卡：操场战役 · 迎击加测狂潮与魔化体育老师
 * 地图规格：10×8 操场开阔地形
 * 地形包含：红色塑胶跑道（track）、绿茵草坪（grass）、跳远沙坑（sand_pit）
 * 障碍物：足球门、跳箱、单杠架
 *
 * 登场单位：
 * 我方：四人参战（徐老师前排辅助血厚防高 + 当前主角 + 校队前锋张希哲 + 啦啦队长覃瑞怡）
 * 敌方：魔化体育老师（Boss，高攻铁哨） + 魔化外校体育生 ×2（哑铃冲锋）
 * 战利品：100% 掉落「可疑运动饮料」+「体育老师的脑子」
 */
export const CH1_BATTLE1 = {
  id: 'ch1_battle1',
  name: '第四战：操场加测 · 击破魔化狂潮',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'grass',

  terrainTypes: {
    grass: { name: '草坪', def: 0, avoid: 0, cost: 1, color: '#16a34a', tileImg: 'assets/props/kenney/kc_grass@2x.png' },
    track: { name: '塑胶跑道', def: 0, avoid: 0, cost: 1, color: '#b91c1c', tileImg: null },
    sand_pit: { name: '跳远沙坑', def: 1, avoid: -10, cost: 2, color: '#d97706', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  // 我方出战（4 人）：徐老师顶在前排，主角与张希哲、覃瑞怡并肩协作
  playerDeploy: [
    { unitId: 'xu_laoshi', x: 0, y: 3 },
    { unitId: 'zhangzixiao', x: 1, y: 4 },
    { unitId: 'zhangxizhe', x: 1, y: 6 },
    { unitId: 'qinruiyi', x: 0, y: 5 }
  ],

  // 敌方布阵（5 人）：魔化体育老师在球门前压阵，外校体育生组成前锋、侧翼与掩护梯次
  enemyDeploy: [
    { enemyId: 'teacher_pe_corrupted', instanceId: 'boss_pe_teacher', x: 15, y: 3 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_1', x: 14, y: 2 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_2', x: 14, y: 4 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_3', x: 14, y: 6 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_4', x: 15, y: 5 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '制伏魔化体育老师'
  },

  nextStorySceneOnWin: 'ch1_scene_recover',

  tutorial: {
    steps: [
      {
        title: '团队阵型 · 战术协同',
        body: '徐老师在前排拥有极其可靠的防御力与体魄；张希哲擅长中距离足球精准射门，覃瑞怡则能为团队提供宝贵的恢复与士气增益！',
        hint: '徐老师前排掩护 · 足球远程打击'
      },
      {
        title: '集火擒贼 · 制伏主考官',
        body: '敌方外校体育生移动迅猛但防御较弱，可用侧翼将其逐个击破；魔化体育老师哨音具备魔法威压，注意保持血线稳定！',
        hint: '击破魔化体育老师即可平息加测'
      }
    ]
  },
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2409,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2409,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2409,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408
    ],
    [
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2408,
      2409,
      2408,
      2408,
      2408,
      2408
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
      2924,
      2925,
      2924,
      2925,
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
      2940,
      2941,
      2940,
      2941,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      2820,
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
      2820,
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
      "y": 2
    },
    {
      "x": 9,
      "y": 7
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
      "x": 8,
      "y": 1
    },
    {
      "x": 9,
      "y": 1
    },
    {
      "x": 10,
      "y": 1
    },
    {
      "x": 11,
      "y": 1
    }
  ],
  "zones": {}
}
};
