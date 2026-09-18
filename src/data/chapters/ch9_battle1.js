/**
 * 第十章关卡：精神考场 · 六人团战异化自我
 */
export const CH9_BATTLE1 = {
  id: 'ch9_battle1',
  name: '终战：精神考场 · 面对异化自我',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'void_floor',

  terrainTypes: {
    void_floor: { name: '精神地板', def: 0, avoid: 0, cost: 1, color: '#312e81', tileImg: null },
    desk_line: { name: '考桌残影', def: 1, avoid: 5, cost: 1, color: '#1d4ed8', tileImg: null },
    crack: { name: '裂隙', def: 0, avoid: 10, cost: 1, color: '#0f172a', tileImg: null }
  },

  terrainTiles: [
    { x: 4, y: 2, type: 'desk_line' }, { x: 5, y: 2, type: 'desk_line' }, { x: 6, y: 2, type: 'desk_line' },
    { x: 9, y: 2, type: 'desk_line' }, { x: 10, y: 2, type: 'desk_line' }, { x: 11, y: 2, type: 'desk_line' },
    { x: 4, y: 7, type: 'desk_line' }, { x: 5, y: 7, type: 'desk_line' }, { x: 6, y: 7, type: 'desk_line' },
    { x: 9, y: 7, type: 'desk_line' }, { x: 10, y: 7, type: 'desk_line' }, { x: 11, y: 7, type: 'desk_line' },
    { x: 7, y: 4, type: 'crack' }, { x: 8, y: 4, type: 'crack' }, { x: 7, y: 5, type: 'crack' }, { x: 8, y: 5, type: 'crack' }
  ],

  props: [
    { id: 'desk_5_2', type: 'desk', x: 5, y: 2, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_10_2', type: 'desk', x: 10, y: 2, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_5_7', type: 'desk', x: 5, y: 7, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_10_7', type: 'desk', x: 10, y: 7, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 4 },
    { unitId: 'zhanghanyu', x: 2, y: 3 },
    { unitId: 'fanwenmo', x: 2, y: 5 },
    { unitId: 'zhangxizhe', x: 3, y: 2 },
    { unitId: 'qinruiyi', x: 3, y: 6 },
    { unitId: 'zhuyanze', x: 3, y: 4 }
  ],

  enemyDeploy: [
    { enemyId: 'zhangzixiao_corrupted', instanceId: 'shadow_mc', x: 13, y: 4 },
    { enemyId: 'zhanghanyu_corrupted', instanceId: 'shadow_ally1', x: 13, y: 2 },
    { enemyId: 'fanwenmo_corrupted', instanceId: 'shadow_ally2', x: 13, y: 6 },
    { enemyId: 'zhangxizhe_corrupted', instanceId: 'shadow_xizhe', x: 11, y: 2 },
    { enemyId: 'qinruiyi_corrupted', instanceId: 'shadow_ruiyi', x: 11, y: 6 },
    { enemyId: 'zhuyanze_corrupted', instanceId: 'shadow_yanze', x: 10, y: 4 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击败所有异化自我'
  },

  nextStorySceneOnWin: 'ch9_scene_relief'
};
