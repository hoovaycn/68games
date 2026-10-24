/**
 * 序章第 3 场战斗（第一章 Boss 战）：同学家中书房 · 唤醒异变同窗
 * 室内战（8×7 格子），地面为室内木地板与地毯
 * 参战我方：双人协同战（主角 + 破门支援的同伴）
 *   - 男线：张子骁 + 张瀚瑜
 *   - 女线：石予诺 + 陈品璇
 * 敌方 Boss：
 *   - 男线：狂暴的小默（fanwenmo_corrupted，手持厚题集，HP 高）
 *   - 女线：失常的妍熹（heyanxi_corrupted，手持竖笛，远程音波）
 * 战术目标：击败失去理智的同学（打醒唤回神智）
 */
export const CH0_BATTLE3 = {
  id: 'ch0_battle3',
  name: '第三战：同学书房 · 唤醒异变同窗',
  mapWidth: 11,
  mapHeight: 7,
  defaultTerrain: 'wood_floor',

  terrainTypes: {
    wood_floor: { name: '木地板', def: 0, avoid: 0, cost: 1, color: '#b45309', tileImg: 'assets/props/kenney/kc_brick_red@2x.png' },
    carpet: { name: '地毯', def: 0, avoid: 5, cost: 1, color: '#78350f', tileImg: 'assets/props/kenney/kc_sidewalk@2x.png' },
    tile_floor: { name: '瓷砖走道', def: 0, avoid: 0, cost: 1, color: '#e2e8f0', tileImg: 'assets/props/kenney/kc_crosswalk@2x.png' }
  },

  terrainTiles: [],

  props: [],

  // 玩家双人站位：主角与新加入队友并肩
  playerDeploy: [
    { unitId: '{MC_ID}', x: 2, y: 3 },
    { unitId: '{ALLY_ID}', x: 3, y: 5 }
  ],

  // 敌方部署（Boss：异变的同伴）
  enemyDeploy: [
    { enemyId: '{BOSS_ID}', instanceId: 'boss_1', x: 8, y: 2 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '制伏发狂的同班同学'
  },

  nextStorySceneOnWin: 'scene_home_recover',

  tutorial: {
    steps: [
      {
        title: '协同作战 · 首场双人战役',
        body: '刚刚赶到的新伙伴已经与你结成战术小队！一人吸引正面注意，另一人伺机从侧翼或远程输出，切忌单独冒进！',
        hint: '两人携手 · 互相策应'
      },
      {
        title: '唤醒目标 · 物理破除幻象',
        body: '同学被诡异力量控制神智，防御力与生命值大增。集中火力打空他的生命值，就能彻底驱散青光、唤醒神智！',
        hint: '打空生命值即可制伏唤醒'
      }
    ]
  },
  tiledData: {
  "visualWidth": 11,
  "visualHeight": 7,
  "bgGrid": [
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
      2659
    ]
  ],
  "decGrid": [
    [
      0,
      0,
      2913,
      2914,
      0,
      0,
      0,
      2775,
      2787,
      2788,
      2789
    ],
    [
      0,
      0,
      2929,
      2930,
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
      0,
      0,
      0,
      0,
      0,
      3158,
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
      3141,
      3174,
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
      3157,
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
      "x": 7,
      "y": 5
    },
    {
      "x": 8,
      "y": 5
    },
    {
      "x": 8,
      "y": 4
    }
  ],
  "zones": {}
}
};
