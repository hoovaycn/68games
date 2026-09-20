/**
 * 第五章关卡：废弃训练馆后厨 · 击退坏教练
 */
export const CH4_BATTLE1 = {
  id: 'ch4_battle1',
  name: '第六战：坏教练后厨 · 拦住供货线',
  bgm: 'bgm_intense_boss',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '水泥地', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null },
    storage: { name: '旧货架', def: 1, avoid: 0, cost: 2, color: '#92400e', tileImg: null },
    mat: { name: '训练垫', def: 1, avoid: 5, cost: 1, color: '#065f46', tileImg: null }
  },

  terrainTiles: [
    { x: 6, y: 2, type: 'mat' }, { x: 7, y: 2, type: 'mat' }, { x: 8, y: 2, type: 'mat' }, { x: 9, y: 2, type: 'mat' },
    { x: 6, y: 3, type: 'mat' }, { x: 7, y: 3, type: 'mat' }, { x: 8, y: 3, type: 'mat' }, { x: 9, y: 3, type: 'mat' },
    { x: 3, y: 7, type: 'storage' }, { x: 4, y: 7, type: 'storage' }, { x: 11, y: 2, type: 'storage' }, { x: 12, y: 2, type: 'storage' }
  ],

  props: [
    { id: 'food_4_2', type: 'crate', x: 4, y: 2, img: 'assets/items/suspicious_drink@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'food_4_6', type: 'crate', x: 4, y: 6, img: 'assets/items/suspicious_snack@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'barrier_10_4', type: 'barrier', x: 10, y: 4, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'barrier_11_6', type: 'barrier', x: 11, y: 6, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 1, y: 4 },
    { unitId: 'zhanghanyu', x: 1, y: 3 },
    { unitId: 'fanwenmo', x: 1, y: 5 },
    { unitId: 'zhangxizhe', x: 2, y: 2 },
    { unitId: 'qinruiyi', x: 2, y: 6 },
    { unitId: 'zhuyanze', x: 2, y: 4 },
    { unitId: 'xu_laoshi', x: 3, y: 3 },
    { unitId: 'liu_laoshi', x: 3, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'coach_corrupted', instanceId: 'coach_boss', x: 15, y: 4 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 14, y: 4 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_a', x: 15, y: 2 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_b', x: 15, y: 6 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a', x: 13, y: 1 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b', x: 13, y: 7 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击退坏教练与供货帮手'
  },

  nextStorySceneOnWin: 'ch4_scene_after'
};
