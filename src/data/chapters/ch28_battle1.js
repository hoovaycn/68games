/**
 * 三号船甲板破袭战 战斗关卡定义
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch28_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH28_BATTLE1 = {
  id: 'ch28_battle1',
  name: '三号船甲板破袭战',
  bgm: 'bgm_battle_normal',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],
  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 0, y: 2 },
    { unitId: 'zhanghanyu', x: 0, y: 4 },
    { unitId: 'fanwenmo', x: 0, y: 6 },
    { unitId: 'zhangxizhe', x: 1, y: 3 },
    { unitId: 'qinruiyi', x: 1, y: 7 },
    { unitId: 'zhuyanze', x: 1, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'boss_iron_scorpion', instanceId: 'boss_scorpion', x: 15, y: 8 },
    { enemyId: 'fanatic_bomber', instanceId: 'bomber_1', x: 15, y: 2 },
    { enemyId: 'fanatic_bomber', instanceId: 'bomber_2', x: 15, y: 4 },
    { enemyId: 'hold_gate_guard', instanceId: 'guard_1', x: 15, y: 0 },
    { enemyId: 'hold_gate_guard', instanceId: 'guard_2', x: 15, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '击破强化巨汉铁蝎夺取防爆卡'
  },

  nextStorySceneOnWin: 'ch28_scene_disarm_destiny',
  tiledData: {
  "visualWidth": 16,
  "visualHeight": 10,
  "bgGrid": [
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401,
      401
    ],
    [
      440,
      441,
      440,
      441,
      440,
      441,
      440,
      441,
      440,
      441,
      440,
      441,
      440,
      441,
      440,
      441
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
      605,
      0,
      0,
      0,
      0,
      0,
      532,
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
      621,
      0,
      0,
      0,
      0,
      0,
      532,
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
      532,
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
      605,
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
      621,
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
      526,
      605,
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
      526,
      621,
      0,
      0,
      0,
      0
    ],
    [
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526,
      526
    ]
  ],
  "tilesets": [
    {
      "name": "Tileset_48x48_9",
      "firstgid": 1,
      "src": "assets/tiles/modern_free/Tileset_48x48_9.png",
      "cols": 10,
      "total": 100,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt481",
      "firstgid": 101,
      "src": "assets/tiles/tiled_import/b25f7deed48a-a5_modern_exterior.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt482",
      "firstgid": 229,
      "src": "assets/tiles/tiled_import/7d21016c1dcd-a5_sewer.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt483",
      "firstgid": 357,
      "src": "assets/tiles/tiled_import/84f489ec09d4-a5_valley.png",
      "cols": 8,
      "total": 128,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt484",
      "firstgid": 485,
      "src": "assets/tiles/tiled_import/3c79a7c23b84-b_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    },
    {
      "name": "nt485",
      "firstgid": 741,
      "src": "assets/tiles/tiled_import/8452e4593650-c_interior.png",
      "cols": 16,
      "total": 256,
      "tileW": 48,
      "tileH": 48
    }
  ],
  "collisions": [
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 8,
      "y": 4
    },
    {
      "x": 8,
      "y": 5
    },
    {
      "x": 11,
      "y": 7
    },
    {
      "x": 11,
      "y": 8
    },
    {
      "x": 0,
      "y": 9
    },
    {
      "x": 1,
      "y": 9
    },
    {
      "x": 2,
      "y": 9
    },
    {
      "x": 3,
      "y": 9
    },
    {
      "x": 4,
      "y": 9
    },
    {
      "x": 5,
      "y": 9
    },
    {
      "x": 6,
      "y": 9
    },
    {
      "x": 7,
      "y": 9
    },
    {
      "x": 8,
      "y": 9
    },
    {
      "x": 9,
      "y": 9
    },
    {
      "x": 10,
      "y": 9
    },
    {
      "x": 11,
      "y": 9
    },
    {
      "x": 12,
      "y": 9
    },
    {
      "x": 13,
      "y": 9
    },
    {
      "x": 14,
      "y": 9
    },
    {
      "x": 15,
      "y": 9
    }
  ],
  "zones": {}
}
};
