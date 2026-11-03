/**
 * 九号码头突击战 战斗关卡定义
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch22_battle1.tmx）
 * 我方 7 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH22_BATTLE1 = {
  id: 'ch22_battle1',
  name: '九号码头突击战',
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
    { unitId: 'zhangzixiao', x: 2, y: 2 },
    { unitId: 'zhanghanyu', x: 2, y: 4 },
    { unitId: 'fanwenmo', x: 2, y: 6 },
    { unitId: 'zhangxizhe', x: 3, y: 3 },
    { unitId: 'qinruiyi', x: 3, y: 5 },
    { unitId: 'zhuyanze', x: 1, y: 3 },
    { unitId: 'xu_laoshi', x: 1, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'boss_viper_smuggler', instanceId: 'boss_viper', x: 13, y: 4 },
    { enemyId: 'sailor_berserk', instanceId: 'sailor_1', x: 12, y: 3 },
    { enemyId: 'sailor_berserk', instanceId: 'sailor_2', x: 12, y: 5 },
    { enemyId: 'sniper_dock', instanceId: 'sniper_1', x: 14, y: 2 },
    { enemyId: 'sniper_dock', instanceId: 'sniper_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '击破独眼蝰蛇并击退走私水手'
  },

  nextStorySceneOnWin: 'ch22_scene_reverse_ambush',
  tiledData: null
};
