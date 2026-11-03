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
    { unitId: 'zhangzixiao', x: 2, y: 3 },
    { unitId: 'zhanghanyu', x: 2, y: 4 },
    { unitId: 'fanwenmo', x: 2, y: 5 },
    { unitId: 'zhangxizhe', x: 3, y: 3 },
    { unitId: 'qinruiyi', x: 3, y: 4 },
    { unitId: 'zhuyanze', x: 3, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'boss_iron_scorpion', instanceId: 'boss_scorpion', x: 13, y: 4 },
    { enemyId: 'fanatic_bomber', instanceId: 'bomber_1', x: 12, y: 3 },
    { enemyId: 'fanatic_bomber', instanceId: 'bomber_2', x: 12, y: 5 },
    { enemyId: 'hold_gate_guard', instanceId: 'guard_1', x: 14, y: 2 },
    { enemyId: 'hold_gate_guard', instanceId: 'guard_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '击破强化巨汉铁蝎夺取防爆卡'
  },

  nextStorySceneOnWin: 'ch28_scene_disarm_destiny',
  tiledData: null
};
