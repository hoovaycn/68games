/**
 * 诊室净化风暴战 战斗关卡定义
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch23_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH23_BATTLE1 = {
  id: 'ch23_battle1',
  name: '诊室净化风暴战',
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
    { enemyId: 'shadow_parasite', instanceId: 'parasite_1', x: 12, y: 3 },
    { enemyId: 'shadow_parasite', instanceId: 'parasite_2', x: 12, y: 5 },
    { enemyId: 'chronos_puppet', instanceId: 'puppet_1', x: 13, y: 4 },
    { enemyId: 'chronos_puppet', instanceId: 'puppet_2', x: 14, y: 2 },
    { enemyId: 'chronos_puppet', instanceId: 'puppet_3', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_all',
    text: '清除侵蚀诊室的时空拟态体与傀儡'
  },

  nextStorySceneOnWin: 'ch23_scene_future_exile',
  tiledData: null
};
