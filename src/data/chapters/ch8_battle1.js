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

  terrainTiles: [
    { x: 3, y: 1, type: 'box_lane' }, { x: 4, y: 1, type: 'box_lane' },
    { x: 3, y: 2, type: 'box_lane' }, { x: 4, y: 2, type: 'box_lane' },
    { x: 7, y: 4, type: 'box_lane' }, { x: 8, y: 4, type: 'box_lane' },
    { x: 7, y: 5, type: 'box_lane' }, { x: 8, y: 5, type: 'box_lane' },
    { x: 5, y: 3, type: 'wet_floor' }, { x: 6, y: 3, type: 'wet_floor' }
  ],

  props: [
    { id: 'crate_3_1', type: 'crate', x: 3, y: 1, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_4_1', type: 'crate', x: 4, y: 1, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_7_4', type: 'crate', x: 7, y: 4, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_8_4', type: 'crate', x: 8, y: 4, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'dumpster_8_1', type: 'dumpster', x: 8, y: 1, img: 'assets/props/kenney/kc_dumpster_green@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'barrier_5_0', type: 'barrier', x: 5, y: 0, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'young_xu', x: 1, y: 2 },
    { unitId: 'young_liu', x: 1, y: 4 }
  ],

  enemyDeploy: [
    { enemyId: 'mystery_man', instanceId: 'mystery_boss', x: 9, y: 3 },
    { enemyId: 'coach_corrupted', instanceId: 'coach_boss', x: 8, y: 2 },
    { enemyId: 'senior_athlete_leader_corrupted', instanceId: 'athlete_leader', x: 8, y: 5 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'runner_a', x: 6, y: 1 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'runner_b', x: 6, y: 6 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击破仓库里的供货首脑'
  },

  nextStorySceneOnWin: 'ch8_scene_after'
};
