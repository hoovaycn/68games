/**
 * 水闸暗巷突围战 战斗关卡定义
 * 地图尺寸：16×10（Tiled 源工程见 docs/map/tiled_project/ch21_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH21_BATTLE1 = {
  id: 'ch21_battle1',
  name: '雨夜暗巷突围战',
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
    { enemyId: 'enforcer_abiao', instanceId: 'boss_abiao', x: 13, y: 4 },
    { enemyId: 'porter_blueeye', instanceId: 'porter_1', x: 12, y: 3 },
    { enemyId: 'porter_blueeye', instanceId: 'porter_2', x: 12, y: 5 },
    { enemyId: 'enforcer_shadow', instanceId: 'shadow_1', x: 14, y: 2 },
    { enemyId: 'enforcer_shadow', instanceId: 'shadow_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '击溃阿彪与暗巷包夹打手'
  },

  nextStorySceneOnWin: 'ch21_scene_night_after',
  tiledData: null
};
