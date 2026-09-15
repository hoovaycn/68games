/**
 * 序章第 1 场战斗：校外街道 · 遭遇流动商贩
 * 敌人只有 1 个：流动商贩
 */
export const CH0_BATTLE1 = {
  id: 'ch0_battle1',
  name: '第一战：校外街道 · 遭遇流动商贩',
  mapWidth: 12,
  mapHeight: 9,
  defaultTerrain: 'sidewalk',

  // 特殊地形覆盖
  terrainTiles: [
    // 柏油马路 (中间两条横向车道 y=4,5)
    { x: 0, y: 4, type: 'asphalt' }, { x: 1, y: 4, type: 'asphalt' }, { x: 2, y: 4, type: 'asphalt' }, { x: 3, y: 4, type: 'asphalt' },
    { x: 4, y: 4, type: 'asphalt' }, { x: 5, y: 4, type: 'asphalt' }, { x: 6, y: 4, type: 'asphalt' }, { x: 7, y: 4, type: 'asphalt' },
    { x: 8, y: 4, type: 'asphalt' }, { x: 9, y: 4, type: 'asphalt' }, { x: 10, y: 4, type: 'asphalt' }, { x: 11, y: 4, type: 'asphalt' },

    { x: 0, y: 5, type: 'asphalt' }, { x: 1, y: 5, type: 'asphalt' }, { x: 2, y: 5, type: 'asphalt' }, { x: 3, y: 5, type: 'asphalt' },
    { x: 4, y: 5, type: 'asphalt' }, { x: 5, y: 5, type: 'asphalt' }, { x: 6, y: 5, type: 'asphalt' }, { x: 7, y: 5, type: 'asphalt' },
    { x: 8, y: 5, type: 'asphalt' }, { x: 9, y: 5, type: 'asphalt' }, { x: 10, y: 5, type: 'asphalt' }, { x: 11, y: 5, type: 'asphalt' },

    // 斑马线 (跨越马路 x=5,6)
    { x: 5, y: 4, type: 'crosswalk' }, { x: 6, y: 4, type: 'crosswalk' },
    { x: 5, y: 5, type: 'crosswalk' }, { x: 6, y: 5, type: 'crosswalk' },

    // 绿化草地 (顶部与底部边缘)
    { x: 0, y: 0, type: 'grass' }, { x: 1, y: 0, type: 'grass' }, { x: 7, y: 0, type: 'grass' }, { x: 8, y: 0, type: 'grass' }, { x: 9, y: 0, type: 'grass' },
    { x: 7, y: 8, type: 'grass' }, { x: 8, y: 8, type: 'grass' }, { x: 9, y: 8, type: 'grass' }
  ],

  // Kenney 街具物件装饰与碰撞阻挡
  props: [
    { id: 'lamp_3_2', type: 'street_lamp', x: 3, y: 2, img: 'assets/props/kenney/kc_streetlight.png', gridW: 1, gridH: 3, blocks: true },
    { id: 'lamp_8_6', type: 'street_lamp', x: 8, y: 6, img: 'assets/props/kenney/kc_streetlight.png', gridW: 1, gridH: 3, blocks: true },
    { id: 'tree_0_1', type: 'tree', x: 0, y: 1, img: 'assets/props/kenney/kc_tree_dark.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'tree_1_1', type: 'tree', x: 1, y: 1, img: 'assets/props/kenney/kc_tree_dark.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'tree_8_1', type: 'tree', x: 8, y: 1, img: 'assets/props/kenney/kc_tree_dark.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'hydrant_6_8', type: 'hydrant', x: 6, y: 8, img: 'assets/props/kenney/kc_hydrant.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_4_6', type: 'crate', x: 4, y: 6, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'dumpster_11_7', type: 'dumpster', x: 11, y: 7, img: 'assets/props/kenney/kc_dumpster_green.png', gridW: 1, gridH: 2, blocks: true }
  ],

  // 我方出场点
  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 4 }
  ],

  // 敌方部署（只有 1 个流动商贩）
  enemyDeploy: [
    { enemyId: 'vendor', instanceId: 'vendor_1', x: 8, y: 4 }
  ],

  // 胜利条件
  objective: {
    type: 'defeat_all',
    text: '击败流动商贩'
  },

  // 胜利后接续的缓冲剧情场景 Key
  nextStorySceneOnWin: 'scene_after_vendor',

  // 开场对话
  dialogueIntro: [
    { speaker: '张子骁', text: '（那就是瀚瑜说的校门口摊贩？……推车里卖的都是些什么啊，包装袋都在发光。）' },
    { speaker: '流动商贩', text: '小朋友……来一串烤肠吗？吃上一口……就能倒背如流高考物理大题哦……嘻嘻嘻……' },
    { speaker: '张子骁', text: '你果然不对劲！小默变成那样是不是你搞的鬼？！看招！' }
  ]
};
