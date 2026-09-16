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

    // 校门前红砖广场 (y=1, 2 中间区域)
    { x: 4, y: 1, type: 'brick' }, { x: 5, y: 1, type: 'brick' }, { x: 6, y: 1, type: 'brick' }, { x: 7, y: 1, type: 'brick' },
    { x: 4, y: 2, type: 'brick' }, { x: 5, y: 2, type: 'brick' }, { x: 6, y: 2, type: 'brick' }, { x: 7, y: 2, type: 'brick' },

    // 绿化草地 (顶部与底部边缘)
    { x: 0, y: 0, type: 'grass' }, { x: 1, y: 0, type: 'grass' }, { x: 2, y: 0, type: 'grass' },
    { x: 9, y: 0, type: 'grass' }, { x: 10, y: 0, type: 'grass' }, { x: 11, y: 0, type: 'grass' },
    { x: 0, y: 8, type: 'grass' }, { x: 1, y: 8, type: 'grass' },
    { x: 10, y: 8, type: 'grass' }, { x: 11, y: 8, type: 'grass' }
  ],

  // Kenney RPG Urban 街具物件装饰与碰撞阻挡
  props: [
    { id: 'lamp_3_1', type: 'street_lamp', x: 3, y: 1, img: 'assets/props/kenney/kc_streetlight.png', gridW: 1, gridH: 2, blocks: true },
    { id: 'lamp_8_1', type: 'street_lamp', x: 8, y: 1, img: 'assets/props/kenney/kc_streetlight.png', gridW: 1, gridH: 2, blocks: true },
    { id: 'tree_0_0', type: 'tree', x: 0, y: 0, img: 'assets/props/kenney/kc_tree_dark.png', gridW: 1, gridH: 3, blocks: true },
    { id: 'tree_11_0', type: 'tree', x: 11, y: 0, img: 'assets/props/kenney/kc_tree_dark.png', gridW: 1, gridH: 3, blocks: true },
    { id: 'bush_1_0', type: 'bush', x: 1, y: 0, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_10_0', type: 'bush', x: 10, y: 0, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_0_8', type: 'bush', x: 0, y: 8, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_11_8', type: 'bush', x: 11, y: 8, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bench_9_2', type: 'bench', x: 9, y: 2, img: 'assets/props/kenney/kc_bench.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'barrier_0_3', type: 'barrier', x: 0, y: 3, img: 'assets/props/kenney/kc_barrier_stripe.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'hydrant_7_6', type: 'hydrant', x: 7, y: 6, img: 'assets/props/kenney/kc_hydrant.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_4_6', type: 'crate', x: 4, y: 6, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'dumpster_11_6', type: 'dumpster', x: 11, y: 6, img: 'assets/props/kenney/kc_dumpster_green.png', gridW: 1, gridH: 2, blocks: true }
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

  // ★ 新手教学三步（任务 #9）：开场弹 TutorialPanelModal，配置驱动不硬编码进组件
  // 第一战是玩家的第一次操作，把「选中→走近→行动菜单」讲清楚再开打
  tutorial: {
    steps: [
      {
        title: '选中我方人员',
        body: '把光标移动到我方主角身上，按 Enter（或点击鼠标）选中，脚下亮起的蓝色格子就是本次可以走的范围。',
        hint: '方向键 / WASD 移动光标 · Enter 确认选中'
      },
      {
        title: '走近敌人',
        body: '沿蓝色格子移动。想发起攻击，必须走到流动商贩旁边的相邻格子——只有挨着敌人才能打他！',
        hint: '攻击 = 走到敌人旁边紧接着的格子'
      },
      {
        title: '行动菜单',
        body: '落位后弹出菜单：详情（查看数值）、攻击（交战）、道具（背包仓库）、待机（结束本轮行动）。',
        hint: '本关胜利条件：击败流动商贩'
      }
    ]
  },

  // 开场对话
  dialogueIntro: [
    { speaker: '张子骁', text: '（那就是瀚瑜说的校门口摊贩？……推车里卖的都是些什么啊，包装袋都在发光。）' },
    { speaker: '流动商贩', text: '小朋友……来一串烤肠吗？吃上一口……棋盘上步步妙手，考卷上笔笔高分哦……嘻嘻嘻……' },
    { speaker: '张子骁', text: '你果然不对劲！小默变成那样是不是你搞的鬼？！看招！' }
  ]
};
