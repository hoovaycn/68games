/**
 * 第九章关卡：旧仓库 · 掐断供货线
 */
export const CH8_BATTLE1 = {
  id: 'ch8_battle1',
  name: '第九战：旧仓库 · 最后一车',
  bgm: 'bgm_gojira_battle',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'concrete',

  terrainTypes: {
    concrete: { name: '水泥地', def: 0, avoid: 0, cost: 1, color: '#6b7280', tileImg: null },
    box_lane: { name: '货箱区', def: 1, avoid: 0, cost: 2, color: '#92400e', tileImg: null },
    wet_floor: { name: '积水地', def: 0, avoid: 10, cost: 1, color: '#0f766e', tileImg: null }
  },

  terrainTiles: [
    { x: 4, y: 2, type: 'box_lane' }, { x: 5, y: 2, type: 'box_lane' }, { x: 4, y: 3, type: 'box_lane' }, { x: 5, y: 3, type: 'box_lane' },
    { x: 10, y: 6, type: 'box_lane' }, { x: 11, y: 6, type: 'box_lane' }, { x: 10, y: 7, type: 'box_lane' }, { x: 11, y: 7, type: 'box_lane' },
    { x: 7, y: 4, type: 'wet_floor' }, { x: 8, y: 4, type: 'wet_floor' }, { x: 7, y: 5, type: 'wet_floor' }, { x: 8, y: 5, type: 'wet_floor' }
  ],

  props: [
    { id: 'crate_4_2', type: 'crate', x: 4, y: 2, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_5_2', type: 'crate', x: 5, y: 2, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_10_6', type: 'crate', x: 10, y: 6, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_11_6', type: 'crate', x: 11, y: 6, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'barrier_8_1', type: 'barrier', x: 8, y: 1, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'young_xu', x: 2, y: 3 },
    { unitId: 'young_liu', x: 2, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'mystery_man', instanceId: 'mystery_boss', x: 13, y: 4 },
    { enemyId: 'coach_corrupted', instanceId: 'coach_boss', x: 12, y: 2 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 12, y: 6 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a', x: 9, y: 2 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b', x: 9, y: 6 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击破仓库里的供货首脑'
  },

  nextStorySceneOnWin: 'ch8_scene_after'
};
