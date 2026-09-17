/**
 * 第二章关卡：操场战役 · 迎击加测狂潮与魔化体育老师
 * 地图规格：10×8 操场开阔地形
 * 地形包含：红色塑胶跑道（track）、绿茵草坪（grass）、跳远沙坑（sand_pit）
 * 障碍物：足球门、跳箱、单杠架
 *
 * 登场单位：
 * 我方：四人参战（徐老师前排辅助血厚防高 + 当前主角 + 校队前锋张希哲 + 啦啦队长覃瑞怡）
 * 敌方：魔化体育老师（Boss，高攻铁哨） + 魔化外校体育生 ×2（哑铃冲锋）
 * 战利品：100% 掉落「可疑运动饮料」+「体育老师的脑子」
 */
export const CH1_BATTLE1 = {
  id: 'ch1_battle1',
  name: '第四战：操场加测 · 击破魔化狂潮',
  mapWidth: 10,
  mapHeight: 8,
  defaultTerrain: 'grass',

  terrainTypes: {
    grass: { name: '草坪', def: 0, avoid: 0, cost: 1, color: '#16a34a', tileImg: 'assets/props/kenney/kc_grass.png' },
    track: { name: '塑胶跑道', def: 0, avoid: 0, cost: 1, color: '#b91c1c', tileImg: null },
    sand_pit: { name: '跳远沙坑', def: 1, avoid: -10, cost: 2, color: '#d97706', tileImg: null }
  },

  terrainTiles: [
    // 外圈红色跑道
    { x: 0, y: 0, type: 'track' }, { x: 1, y: 0, type: 'track' }, { x: 2, y: 0, type: 'track' }, { x: 3, y: 0, type: 'track' }, { x: 4, y: 0, type: 'track' }, { x: 5, y: 0, type: 'track' }, { x: 6, y: 0, type: 'track' }, { x: 7, y: 0, type: 'track' }, { x: 8, y: 0, type: 'track' }, { x: 9, y: 0, type: 'track' },
    { x: 0, y: 7, type: 'track' }, { x: 1, y: 7, type: 'track' }, { x: 2, y: 7, type: 'track' }, { x: 3, y: 7, type: 'track' }, { x: 4, y: 7, type: 'track' }, { x: 5, y: 7, type: 'track' }, { x: 6, y: 7, type: 'track' }, { x: 7, y: 7, type: 'track' }, { x: 8, y: 7, type: 'track' }, { x: 9, y: 7, type: 'track' },
    { x: 0, y: 1, type: 'track' }, { x: 0, y: 2, type: 'track' }, { x: 0, y: 3, type: 'track' }, { x: 0, y: 4, type: 'track' }, { x: 0, y: 5, type: 'track' }, { x: 0, y: 6, type: 'track' },
    { x: 9, y: 1, type: 'track' }, { x: 9, y: 2, type: 'track' }, { x: 9, y: 3, type: 'track' }, { x: 9, y: 4, type: 'track' }, { x: 9, y: 5, type: 'track' }, { x: 9, y: 6, type: 'track' },

    // 沙坑区域
    { x: 4, y: 5, type: 'sand_pit' }, { x: 5, y: 5, type: 'sand_pit' }
  ],

  props: [
    { id: 'goal_post', type: 'post', x: 8, y: 3, img: 'assets/props/kenney/kc_barrier_stripe.png', gridW: 1, gridH: 2, blocks: true },
    { id: 'bench_3_2', type: 'bench', x: 3, y: 2, img: 'assets/props/kenney/kc_bench.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bush_6_5', type: 'bush', x: 6, y: 4, img: 'assets/props/kenney/kc_bush.png', gridW: 1, gridH: 1, blocks: true }
  ],

  // 我方出战（4 人）：徐老师顶在前排，主角与张希哲、覃瑞怡并肩协作
  playerDeploy: [
    { unitId: 'xu_laoshi', x: 2, y: 3 },
    { unitId: 'zhangzixiao', x: 1, y: 3 },
    { unitId: 'zhangxizhe', x: 1, y: 2 },
    { unitId: 'qinruiyi', x: 1, y: 4 }
  ],

  // 敌方布阵：魔化体育老师居中，外校体育生左右两翼包夹
  enemyDeploy: [
    { enemyId: 'teacher_pe_corrupted', instanceId: 'boss_pe_teacher', x: 7, y: 3 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_1', x: 6, y: 1 },
    { enemyId: 'senior_athlete_corrupted', instanceId: 'athlete_2', x: 6, y: 5 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '制伏魔化体育老师'
  },

  nextStorySceneOnWin: 'ch1_scene_recover',

  tutorial: {
    steps: [
      {
        title: '团队阵型 · 战术协同',
        body: '徐老师在前排拥有极其可靠的防御力与体魄；张希哲擅长中距离足球精准射门，覃瑞怡则能为团队提供宝贵的恢复与士气增益！',
        hint: '徐老师前排掩护 · 足球远程打击'
      },
      {
        title: '集火擒贼 · 制伏主考官',
        body: '敌方外校体育生移动迅猛但防御较弱，可用侧翼将其逐个击破；魔化体育老师哨音具备魔法威压，注意保持血线稳定！',
        hint: '击破魔化体育老师即可平息加测'
      }
    ]
  }
};
