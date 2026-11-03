/**
 * 天梯核心主脑歼灭战 战斗关卡定义
 * 地图尺寸：18×12（Tiled 源工程见 docs/map/tiled_project/ch26_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH26_BATTLE1 = {
  id: 'ch26_battle1',
  name: '天梯核心主脑歼灭战',
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
    { enemyId: 'boss_ai_topstudent', instanceId: 'boss_ai', x: 15, y: 5 },
    { enemyId: 'boss_storm_mech', instanceId: 'storm_mech_1', x: 13, y: 4 },
    { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_1', x: 13, y: 6 },
    { enemyId: 'alloy_deathsworn', instanceId: 'deathsworn_2', x: 14, y: 3 },
    { enemyId: 'patrol_robot_exam', instanceId: 'robot_exam_1', x: 14, y: 7 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '歼灭天梯全息主脑·满分优等生'
  },

  nextStorySceneOnWin: 'ch26_scene_paradox_truth',
  tiledData: null
};
