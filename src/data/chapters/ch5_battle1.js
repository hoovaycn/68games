/**
 * 第六章关卡：家长会散场后的教室 · 护住还没被带走的孩子
 */
export const CH5_BATTLE1 = {
  id: 'ch5_battle1',
  name: '第七战：家长会教室 · 压住异化扩散',
  mapWidth: 14,
  mapHeight: 10,
  defaultTerrain: 'wood_floor',

  terrainTypes: {
    wood_floor: { name: '教室木地板', def: 0, avoid: 0, cost: 1, color: '#a16207', tileImg: null },
    aisle: { name: '过道', def: 0, avoid: 0, cost: 1, color: '#d6d3d1', tileImg: null },
    desk_zone: { name: '课桌区', def: 1, avoid: 0, cost: 2, color: '#7c2d12', tileImg: null }
  },

  terrainTiles: [
    { x: 3, y: 1, type: 'desk_zone' }, { x: 4, y: 1, type: 'desk_zone' }, { x: 5, y: 1, type: 'desk_zone' },
    { x: 3, y: 3, type: 'desk_zone' }, { x: 4, y: 3, type: 'desk_zone' }, { x: 5, y: 3, type: 'desk_zone' },
    { x: 8, y: 1, type: 'desk_zone' }, { x: 9, y: 1, type: 'desk_zone' }, { x: 10, y: 1, type: 'desk_zone' },
    { x: 8, y: 3, type: 'desk_zone' }, { x: 9, y: 3, type: 'desk_zone' }, { x: 10, y: 3, type: 'desk_zone' }
  ],

  props: [
    { id: 'podium', type: 'desk', x: 1, y: 4, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_4_5', type: 'desk', x: 4, y: 5, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_9_5', type: 'desk', x: 9, y: 5, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bookshelf_12_4', type: 'bookshelf', x: 12, y: 4, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 1, y: 3 },
    { unitId: 'zhanghanyu', x: 1, y: 5 },
    { unitId: 'fanwenmo', x: 2, y: 4 },
    { unitId: 'xu_laoshi', x: 2, y: 3 },
    { unitId: 'liu_laoshi', x: 2, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_a', x: 10, y: 2 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_a', x: 10, y: 4 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'cm_boy_b', x: 11, y: 6 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'cm_girl_b', x: 8, y: 7 }
  ],

  objective: {
    type: 'defeat_all',
    text: '救回先一步异化的同学'
  },

  nextStorySceneOnWin: 'ch5_scene_after'
};
