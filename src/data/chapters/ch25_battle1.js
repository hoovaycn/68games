/**
 * 防空洞绝壁守护战 战斗关卡定义
 * 地图尺寸：16×12（Tiled 源工程见 docs/map/tiled_project/ch25_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH25_BATTLE1 = {
  id: 'ch25_battle1',
  name: '防空洞绝壁守护战',
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
    { unitId: 'zhangzixiao', x: 2, y: 4 },
    { unitId: 'zhanghanyu', x: 2, y: 5 },
    { unitId: 'fanwenmo', x: 2, y: 6 },
    { unitId: 'zhangxizhe', x: 3, y: 4 },
    { unitId: 'qinruiyi', x: 3, y: 5 },
    { unitId: 'zhuyanze', x: 3, y: 6 }
  ],

  enemyDeploy: [
    { enemyId: 'boss_hunter_alpha', instanceId: 'boss_hunter', x: 13, y: 5 },
    { enemyId: 'patrol_robot_exam', instanceId: 'robot_1', x: 12, y: 3 },
    { enemyId: 'patrol_robot_exam', instanceId: 'robot_2', x: 12, y: 7 },
    { enemyId: 'hound_riot', instanceId: 'hound_1', x: 14, y: 4 },
    { enemyId: 'hound_riot', instanceId: 'hound_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '击溃重型追猎者阿尔法与机械猎犬'
  },

  nextStorySceneOnWin: 'ch25_scene_bitter_legacy',
  tiledData: null
};
