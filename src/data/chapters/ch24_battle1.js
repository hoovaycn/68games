/**
 * 未来广场突围求生战 战斗关卡定义
 * 地图尺寸：16×12（Tiled 源工程见 docs/map/tiled_project/ch24_battle1.tmx）
 * 我方 6 人 / 敌方 5 人，出生点见 Spawns。
 * 瓦片与碰撞细节支持在 Tiled 中绘制后通过 tools/sync_tmx_levels.cjs 回写。
 */
export const CH24_BATTLE1 = {
  id: 'ch24_battle1',
  name: '未来广场突围求生战',
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
    { enemyId: 'boss_exam_captain', instanceId: 'boss_captain', x: 13, y: 5 },
    { enemyId: 'officer_100', instanceId: 'officer_1', x: 12, y: 4 },
    { enemyId: 'officer_100', instanceId: 'officer_2', x: 12, y: 6 },
    { enemyId: 'probe_machine', instanceId: 'probe_1', x: 14, y: 3 },
    { enemyId: 'probe_machine', instanceId: 'probe_2', x: 14, y: 7 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击破外骨骼治安官与巡防探针'
  },

  nextStorySceneOnWin: 'ch24_scene_abyss_cornered',
  tiledData: null
};
