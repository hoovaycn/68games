/**
 * 斩断机器锁链 战斗关卡定义
 * 地图尺寸：18×12（Tiled 源工程见 docs/map/tiled_project/ch29_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH29_BATTLE1 = {
  id: 'ch29_battle1',
  name: '斩断机器锁链',
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
    { enemyId: 'ayao_corrupted_god', instanceId: 'ayao_god', x: 15, y: 5 },
    { enemyId: 'pillar_neural_lock', instanceId: 'pillar_1', x: 13, y: 3 },
    { enemyId: 'pillar_neural_lock', instanceId: 'pillar_2', x: 13, y: 7 },
    { enemyId: 'repair_spider', instanceId: 'spider_1', x: 14, y: 4 },
    { enemyId: 'repair_spider', instanceId: 'spider_2', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '击破神经死锁中枢并解救阿瑶'
  },

  nextStorySceneOnWin: 'ch29_battle1',
  tiledData: null
};
