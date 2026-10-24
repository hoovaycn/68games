/**
 * 序章第 2 场战斗：校外巷口 · 拦截高年级混混
 * 敌人 2 个：高年级混混 ×2（正面 + 侧翼包夹）
 * 平衡目标（任务 #6/#7）：禁双击秒杀 / 围殴压力逼玩家用烤肠回血 / 战后必触发升级
 */
export const CH0_BATTLE2 = {
  id: 'ch0_battle2',
  name: '第二战：校外巷口 · 拦截高年级混混',
  mapWidth: 11,
  mapHeight: 7,
  defaultTerrain: 'sidewalk',

  // 11x7 紧凑巷口：窄马路与红砖拐角
  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: '{MC_ID}', x: 1, y: 3 }
  ],

  enemyDeploy: [
    { enemyId: 'punk', instanceId: 'punk_1', x: 9, y: 3 },
    { enemyId: 'punk', instanceId: 'punk_2', x: 7, y: 5 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击退两名高年级混混'
  },

  // ★ 新手战斗引导：双混混围殴预警 + 烤肠回血教学（任务 #15；文案随 #6/#7 平衡轮校正）
  tutorial: {
    steps: [
      {
        title: '危机警报 · 学长围殴',
        body: '两名高年级混混一前一后围了上来！练习册卷棒又沉又狠，挨一下就是 7 点血——两人轮番围攻，硬扛绝对撑不住！',
        hint: '两人围殴 · 血线过半就准备吃烤肠回血'
      },
      {
        title: '战术指令 · 趁机使用烤肠',
        body: '行动时选择【道具】，使用缴获的【淀粉烤肠】回复 16 点生命，稳住血线再反击——优先集火单个混混，别被两人轮番消耗！',
        hint: '落位后【道具】→【淀粉烤肠】→【使用】 · 优先集火'
      },
      {
        title: '胜利曙光 · 升级在望',
        body: '每个混混都要打上两三拳才能撂倒，但两名混混的击杀经验足以攒满经验槽——坚持到最后，主角将当场升级，九维全面提升！',
        hint: '全歼两名混混 · 必触发升级'
      }
    ]
  },

  nextStorySceneOnWin: 'scene_before_home',

  dialogueIntro: [
    { speaker: '高年级混混', text: '喂！看什么看？学长们今天心情不好——兄弟两个在这儿，把身上的文具和零食都交出来！' },
    { speaker: '张子骁', text: '（两个手里都卷着五年中考三年模拟，眼神狂躁……看来都是被焦虑怪异侵蚀了！）' },
    { speaker: '张子骁', text: '一个就够麻烦了，还来俩……得小心周旋，别被围着打，找机会各个击破！' }
  ],
  tiledData: {
  "visualWidth": 11,
  "visualHeight": 7,
  "bgGrid": [
    [
      2728,
      2729,
      2730,
      2728,
      2729,
      2730,
      2728,
      2729,
      2730,
      2728,
      2729
    ],
    [
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643
    ],
    [
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643
    ],
    [
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643
    ],
    [
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643
    ],
    [
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643
    ],
    [
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643,
      2643
    ]
  ],
  "decGrid": [
    [
      0,
      2922,
      2923,
      0,
      0,
      0,
      0,
      0,
      2922,
      2923,
      0
    ],
    [
      0,
      2938,
      2939,
      0,
      0,
      0,
      0,
      0,
      2938,
      2939,
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
      0
    ],
    [
      0,
      0,
      0,
      2804,
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
      "x": 1,
      "y": 1
    },
    {
      "x": 2,
      "y": 1
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
      "x": 3,
      "y": 5
    }
  ],
  "zones": {}
}
};
