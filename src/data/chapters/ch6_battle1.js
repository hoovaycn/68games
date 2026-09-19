/**
 * 第七章关卡：教学楼夜楼道 · 暂时压住异化同伴
 */
export const CH6_BATTLE1 = {
  id: 'ch6_battle1',
  name: '第八战：夜楼道 · 先把熟人拦下来',
  bgm: 'bgm_victory',
  mapWidth: 16,
  mapHeight: 8,
  defaultTerrain: 'hall',

  terrainTypes: {
    hall: { name: '走廊', def: 0, avoid: 0, cost: 1, color: '#475569', tileImg: null },
    doorway: { name: '门口', def: 1, avoid: 0, cost: 1, color: '#1f2937', tileImg: null },
    stair: { name: '楼梯口', def: 0, avoid: 10, cost: 1, color: '#111827', tileImg: null }
  },

  terrainTiles: [
    { x: 0, y: 0, type: 'stair' }, { x: 0, y: 7, type: 'stair' }, { x: 15, y: 0, type: 'stair' }, { x: 15, y: 7, type: 'stair' },
    { x: 4, y: 1, type: 'doorway' }, { x: 4, y: 6, type: 'doorway' }, { x: 11, y: 1, type: 'doorway' }, { x: 11, y: 6, type: 'doorway' }
  ],

  props: [
    { id: 'bench_5_0', type: 'bench', x: 5, y: 0, img: 'assets/props/kenney/kc_bench@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bench_10_7', type: 'bench', x: 10, y: 7, img: 'assets/props/kenney/kc_bench@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'barrier_8_3', type: 'barrier', x: 8, y: 3, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 3 },
    { unitId: 'zhanghanyu', x: 2, y: 2 },
    { unitId: 'fanwenmo', x: 2, y: 4 },
    { unitId: 'xu_laoshi', x: 1, y: 3 },
    { unitId: 'liu_laoshi', x: 1, y: 4 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'boss_xizhe', x: 12, y: 3 },
    { enemyId: 'qinruiyi_corrupted', instanceId: 'boss_ruiyi', x: 12, y: 5 },
    { enemyId: 'zhuyanze_corrupted', instanceId: 'boss_yanze', x: 12, y: 1 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_a', x: 10, y: 2 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_a', x: 10, y: 4 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_b', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_all',
    text: '在楼道里先压住最前面的异化同伴'
  },

  nextStorySceneOnWin: 'ch6_scene_retreat'
};
