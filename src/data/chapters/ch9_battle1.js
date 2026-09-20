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
    { unitId: 'zhangzixiao', x: 2, y: 5 },
    { unitId: 'zhanghanyu', x: 2, y: 6 },
    { unitId: 'fanwenmo', x: 2, y: 7 },
    { unitId: 'zhangxizhe', x: 3, y: 5 },
    { unitId: 'qinruiyi', x: 3, y: 6 },
    { unitId: 'zhuyanze', x: 3, y: 7 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangzixiao_corrupted', instanceId: 'shadow_mc', x: 13, y: 2 },
    { enemyId: 'zhanghanyu_corrupted', instanceId: 'shadow_ally1', x: 13, y: 3 },
    { enemyId: 'fanwenmo_corrupted', instanceId: 'shadow_ally2', x: 13, y: 4 },
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'shadow_xizhe', x: 14, y: 2 },
    { enemyId: 'qinruiyi_corrupted', instanceId: 'shadow_ruiyi', x: 14, y: 3 },
    { enemyId: 'zhuyanze_corrupted', instanceId: 'shadow_yanze', x: 14, y: 4 }
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
      81,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      82,
      83
    ],
    [
      97,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      98,
      99
    ],
    [
      113,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      115
    ],
    [
      113,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      115
    ],
    [
      113,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      115
    ],
    [
      113,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      115
    ],
    [
      113,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      115
    ],
    [
      113,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      114,
      115
    ],
    [
      129,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      130,
      131
    ],
    [
      145,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      146,
      147
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
      458,
      0,
      0,
      0,
      0,
      0,
      458,
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
      474,
      0,
      0,
      0,
      0,
      0,
      474,
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
      458,
      0,
      0,
      0,
      0,
      0,
      458,
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
      474,
      0,
      0,
      0,
      0,
      0,
      474,
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
      458,
      0,
      0,
      0,
      0,
      0,
      458,
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
      474,
      0,
      0,
      0,
      0,
      0,
      474,
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
      458,
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
      474,
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
