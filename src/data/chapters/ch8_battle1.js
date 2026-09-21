/**
 * 第九章关卡：旧仓库 · 掐断供货线
 */
export const CH8_BATTLE1 = {
  id: 'ch8_battle1',
  name: '第九战：旧仓库 · 最后一车',
  bgm: 'bgm_gojira_battle',
  mapWidth: 11,
  mapHeight: 7,
  defaultTerrain: 'concrete',

  terrainTypes: {
    concrete: { name: '水泥地', def: 0, avoid: 0, cost: 1, color: '#6b7280', tileImg: null },
    box_lane: { name: '货箱区', def: 1, avoid: 0, cost: 2, color: '#92400e', tileImg: null },
    wet_floor: { name: '积水地', def: 0, avoid: 10, cost: 1, color: '#0f766e', tileImg: null }
  },

  terrainTiles: [],

  props: [],

  playerDeploy: [
    { unitId: 'young_xu', x: 1, y: 2 },
    { unitId: 'young_liu', x: 1, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'mystery_man', instanceId: 'mystery_boss', x: 7, y: 1, level: 6 },
    { enemyId: 'coach_corrupted', instanceId: 'coach_boss', x: 7, y: 5, level: 6 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 8, y: 3 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击破仓库里的供货首脑'
  },

  nextStorySceneOnWin: 'ch8_scene_after',
  tiledData: {
  "visualWidth": 11,
  "visualHeight": 7,
  "bgGrid": [
    [
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716
    ],
    [
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326
    ],
    [
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326
    ],
    [
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326
    ],
    [
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326
    ],
    [
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326,
      2326
    ],
    [
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716,
      3758098716
    ]
  ],
  "decGrid": [
    [
      0,
      0,
      0,
      0,
      0,
      937,
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
      953,
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
      1002,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      1003,
      0,
      0,
      0,
      1018,
      0,
      0,
      0,
      0
    ],
    [
      0,
      0,
      1019,
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
      904,
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
      920,
      0,
      0
    ]
  ],
  "collisions": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 5,
      "y": 0
    },
    {
      "x": 5,
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
      "x": 8,
      "y": 5
    },
    {
      "x": 8,
      "y": 6
    }
  ],
  "zones": {}
}
};
