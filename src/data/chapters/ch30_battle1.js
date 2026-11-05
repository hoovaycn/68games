/**
 * 终局决战 · 斩断循环 战斗关卡定义
 * 地图尺寸：18×12（Tiled 源工程见 docs/map/tiled_project/ch30_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH30_BATTLE1 = {
  id: 'ch30_battle1',
  name: '终局决战 · 斩断循环',
  bgm: 'bgm_retro_level3',
  mapWidth: 18,
  mapHeight: 12,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],
  props: [],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 4 },
    { unitId: 'zhanghanyu', x: 2, y: 5 },
    { unitId: 'fanwenmo', x: 2, y: 6 },
    { unitId: 'zhangxizhe', x: 3, y: 4 },
    { unitId: 'qinruiyi', x: 3, y: 5 },
    { unitId: 'zhuyanze', x: 3, y: 6 }
  ],

  enemyDeploy: [
    { enemyId: 'boss_judgement_core', instanceId: 'boss_judgement', x: 15, y: 5 },
    { enemyId: 'capital_guard_mech', instanceId: 'mech_guard_1', x: 13, y: 3 },
    { enemyId: 'capital_guard_mech', instanceId: 'mech_guard_2', x: 13, y: 7 },
    { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_1', x: 14, y: 4 },
    { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '彻底粉碎净化母体核心'
  },

  nextStorySceneOnWin: 'ch30_battle1',
  tiledData: null
};
