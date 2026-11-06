/**
 * 光门前最后的血肉长城 战斗关卡定义
 * 地图尺寸：16×12（Tiled 源工程见 docs/map/tiled_project/ch27_battle1.tmx）
 * 我方 2 人（大号死守）/ 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH27_BATTLE1 = {
  id: 'ch27_battle1',
  name: '光门前最后的血肉长城',
  bgm: 'bgm_battle_normal',
  mapWidth: 16,
  mapHeight: 12,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '地面', def: 0, avoid: 0, cost: 1, color: '#78716c', tileImg: null }
  },

  terrainTiles: [],
  props: [],

  playerDeploy: [
    { unitId: 'mc_adult_zixiao', x: 2, y: 5 },
    { unitId: 'fanwenmo_adult', x: 3, y: 5 }
  ],

  enemyDeploy: [
    { enemyId: 'boss_storm_mech', instanceId: 'mech_vanguard', x: 13, y: 5 },
    { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_1', x: 12, y: 4 },
    { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_2', x: 12, y: 6 },
    { enemyId: 'hound_riot', instanceId: 'hound_1', x: 14, y: 3 },
    { enemyId: 'hound_riot', instanceId: 'hound_2', x: 14, y: 7 }
  ],

  objective: {
    type: 'defeat_all',
    text: '全歼来犯敌军守卫时空光门'
  },

  nextStorySceneOnWin: 'ch27_scene_great_sacrifice',
  tiledData: null
};
