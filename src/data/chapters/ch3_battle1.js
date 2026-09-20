/**
 * 第四章关卡：训练馆门口 · 先救回张希哲
 */
export const CH3_BATTLE1 = {
  id: 'ch3_battle1',
  name: '第五战：训练馆门口 · 护住参展名单',
  bgm: 'bgm_victory',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '馆内地砖', def: 0, avoid: 0, cost: 1, color: '#94a3b8', tileImg: null },
    track: { name: '门外空地', def: 0, avoid: 0, cost: 1, color: '#64748b', tileImg: null },
    stage_mat: { name: '软垫', def: 1, avoid: 5, cost: 1, color: '#0f766e', tileImg: null }
  },

  terrainTiles: [
    { x: 0, y: 0, type: 'track' }, { x: 0, y: 1, type: 'track' }, { x: 0, y: 2, type: 'track' }, { x: 0, y: 3, type: 'track' }, { x: 0, y: 4, type: 'track' }, { x: 0, y: 5, type: 'track' }, { x: 0, y: 6, type: 'track' }, { x: 0, y: 7, type: 'track' }, { x: 0, y: 8, type: 'track' }, { x: 0, y: 9, type: 'track' },
    { x: 1, y: 0, type: 'track' }, { x: 1, y: 1, type: 'track' }, { x: 1, y: 2, type: 'track' }, { x: 1, y: 3, type: 'track' }, { x: 1, y: 4, type: 'track' }, { x: 1, y: 5, type: 'track' }, { x: 1, y: 6, type: 'track' }, { x: 1, y: 7, type: 'track' }, { x: 1, y: 8, type: 'track' }, { x: 1, y: 9, type: 'track' },
    { x: 7, y: 3, type: 'stage_mat' }, { x: 8, y: 3, type: 'stage_mat' }, { x: 9, y: 3, type: 'stage_mat' },
    { x: 7, y: 4, type: 'stage_mat' }, { x: 8, y: 4, type: 'stage_mat' }, { x: 9, y: 4, type: 'stage_mat' }
  ],

  props: [
    { id: 'equipment_3_2', type: 'crate', x: 3, y: 2, img: 'assets/items/dumbbell@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'equipment_3_7', type: 'crate', x: 3, y: 7, img: 'assets/items/jump_rope@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bench_6_1', type: 'bench', x: 6, y: 1, img: 'assets/props/kenney/kc_bench@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bench_6_8', type: 'bench', x: 6, y: 8, img: 'assets/props/kenney/kc_bench@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 4, y: 4 },
    { unitId: 'zhanghanyu', x: 4, y: 3 },
    { unitId: 'fanwenmo', x: 4, y: 5 },
    { unitId: 'qinruiyi', x: 5, y: 2 },
    { unitId: 'zhuyanze', x: 5, y: 6 },
    { unitId: 'xu_laoshi', x: 5, y: 4 },
    { unitId: 'liu_laoshi', x: 5, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'boss_zhangxizhe', x: 11, y: 4 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 13, y: 4 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_a', x: 12, y: 2 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_b', x: 12, y: 6 }
  ],

  objective: {
    type: 'defeat_all',
    text: '救回张希哲并击退堵门外校生'
  },

  nextStorySceneOnWin: 'ch3_scene_recover'
};
