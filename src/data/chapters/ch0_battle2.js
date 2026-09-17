/**
 * 序章第 2 场战斗：校外巷口 · 拦截高年级混混
 * 敌人 2 个：高年级混混 ×2（正面 + 侧翼包夹）
 * 平衡目标（任务 #6/#7）：禁双击秒杀 / 围殴压力逼玩家用烤肠回血 / 战后必触发升级
 */
export const CH0_BATTLE2 = {
  id: 'ch0_battle2',
  name: '第二战：校外巷口 · 拦截高年级混混',
  mapWidth: 12,
  mapHeight: 9,
  defaultTerrain: 'sidewalk',

  terrainTiles: [
    { x: 0, y: 4, type: 'asphalt' }, { x: 1, y: 4, type: 'asphalt' }, { x: 2, y: 4, type: 'asphalt' }, { x: 3, y: 4, type: 'asphalt' },
    { x: 4, y: 4, type: 'asphalt' }, { x: 5, y: 4, type: 'asphalt' }, { x: 6, y: 4, type: 'asphalt' }, { x: 7, y: 4, type: 'asphalt' },
    { x: 8, y: 4, type: 'asphalt' }, { x: 9, y: 4, type: 'asphalt' }, { x: 10, y: 4, type: 'asphalt' }, { x: 11, y: 4, type: 'asphalt' },

    { x: 0, y: 5, type: 'asphalt' }, { x: 1, y: 5, type: 'asphalt' }, { x: 2, y: 5, type: 'asphalt' }, { x: 3, y: 5, type: 'asphalt' },
    { x: 4, y: 5, type: 'asphalt' }, { x: 5, y: 5, type: 'asphalt' }, { x: 6, y: 5, type: 'asphalt' }, { x: 7, y: 5, type: 'asphalt' },
    { x: 8, y: 5, type: 'asphalt' }, { x: 9, y: 5, type: 'asphalt' }, { x: 10, y: 5, type: 'asphalt' }, { x: 11, y: 5, type: 'asphalt' },

    { x: 4, y: 4, type: 'crosswalk' }, { x: 5, y: 4, type: 'crosswalk' },
    { x: 4, y: 5, type: 'crosswalk' }, { x: 5, y: 5, type: 'crosswalk' },

    // 巷口红砖路面
    { x: 1, y: 1, type: 'brick' }, { x: 2, y: 1, type: 'brick' }, { x: 3, y: 1, type: 'brick' },
    { x: 1, y: 2, type: 'brick' }, { x: 2, y: 2, type: 'brick' }, { x: 3, y: 2, type: 'brick' },

    // 绿化花坛
    { x: 0, y: 0, type: 'grass' }, { x: 11, y: 0, type: 'grass' },
    { x: 0, y: 8, type: 'grass' }, { x: 11, y: 8, type: 'grass' }
  ],

  props: [
    { id: 'lamp_2_1', type: 'street_lamp', x: 2, y: 1, img: 'assets/props/kenney/kc_streetlight.png', gridW: 1, gridH: 2, blocks: true },
    { id: 'barrier_7_2', type: 'barrier', x: 7, y: 2, img: 'assets/props/kenney/kc_barrier_stripe.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_6_6', type: 'crate', x: 6, y: 6, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'crate_7_6', type: 'crate', x: 7, y: 6, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'dumpster_10_6', type: 'dumpster', x: 10, y: 6, img: 'assets/props/kenney/kc_dumpster_green.png', gridW: 1, gridH: 2, blocks: true },
    { id: 'bench_1_6', type: 'bench', x: 1, y: 6, img: 'assets/props/kenney/kc_bench.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_0_0', type: 'bush', x: 0, y: 0, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_11_0', type: 'bush', x: 11, y: 0, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_0_8', type: 'bush', x: 0, y: 8, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_11_8', type: 'bush', x: 11, y: 8, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 3, y: 4 }
  ],

  enemyDeploy: [
    { enemyId: 'punk', instanceId: 'punk_1', x: 9, y: 4 },
    // 侧翼包夹：距主角曼哈顿距离恰 6，开局即进 aggro 半径，两名混混围殴形成回血压力
    { enemyId: 'punk', instanceId: 'punk_2', x: 8, y: 5 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击退两名高年级混混'
  },

  // ★ 新手战斗引导：双混混围殴预警 + 烤肠回血教学（任务 #15；文案随 #6/#7 平衡轮校正）
  tutorial: {
    steps: [
      {
        title: '危机警报 · 学长围殴',
        body: '两名高年级混混一前一后围了上来！练习册卷棒又沉又狠，挨一下就是 7 点血——两人轮番围攻，硬扛绝对撑不住！',
        hint: '两人围殴 · 血线过半就准备吃烤肠回血'
      },
      {
        title: '战术指令 · 趁机使用烤肠',
        body: '行动时选择【道具】，使用缴获的【淀粉烤肠】回复 16 点生命，稳住血线再反击——优先集火单个混混，别被两人轮番消耗！',
        hint: '落位后【道具】→【淀粉烤肠】→【使用】 · 优先集火'
      },
      {
        title: '胜利曙光 · 升级在望',
        body: '每个混混都要打上两三拳才能撂倒，但两名混混的击杀经验足以攒满经验槽——坚持到最后，主角将当场升级，九维全面提升！',
        hint: '全歼两名混混 · 必触发升级'
      }
    ]
  },

  nextStorySceneOnWin: 'scene_before_home',

  dialogueIntro: [
    { speaker: '高年级混混', text: '喂！看什么看？学长们今天心情不好——兄弟两个在这儿，把身上的文具和零食都交出来！' },
    { speaker: '张子骁', text: '（两个手里都卷着五年中考三年模拟，眼神狂躁……看来都是被焦虑怪异侵蚀了！）' },
    { speaker: '张子骁', text: '一个就够麻烦了，还来俩……得小心周旋，别被围着打，找机会各个击破！' }
  ]
};
