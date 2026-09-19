/**
 * 第三章关卡：晚自习教室战役 · 破除猜疑心魔与制伏朱晏泽
 * 地图规格：9×7 教室室内战场
 * 地形包含：教室水磨石走道（tile_floor）、木讲台（wood_floor）、课桌阵列
 *
 * 机制：
 * 我方：主角 + 第一章入队同伴（男线：张子骁 + 张瀚瑜 + 范文默；女线：石予诺 + 陈品璇 + 何妍熹）
 * 敌方：反常的朱晏泽（Boss，高幸高抗，金尖钢笔突刺） + 盲从男同学 + 添油女同学
 * 战术核心：击破身旁传谣起哄的男女同学解除 Boss 坚守护甲，集火唤醒朱晏泽！
 */
export const CH2_BATTLE1 = {
  id: 'ch2_battle1',
  name: '第五战：六 8 班教室 · 破除猜疑风暴',
  bgm: 'bgm_battle_boss',
  mapWidth: 12,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '水磨石地', def: 0, avoid: 0, cost: 1, color: '#e2e8f0', tileImg: 'assets/props/kenney/kc_crosswalk@2x.png' },
    wood_floor: { name: '木质讲台', def: 1, avoid: 5, cost: 1, color: '#b45309', tileImg: 'assets/props/kenney/kc_brick_red@2x.png' }
  },

  terrainTiles: [
    // 讲台区域
    { x: 0, y: 1, type: 'wood_floor' }, { x: 0, y: 2, type: 'wood_floor' },
    { x: 0, y: 3, type: 'wood_floor' }, { x: 0, y: 4, type: 'wood_floor' },
    { x: 0, y: 5, type: 'wood_floor' }, { x: 0, y: 6, type: 'wood_floor' },
    { x: 0, y: 7, type: 'wood_floor' }, { x: 0, y: 8, type: 'wood_floor' }
  ],

  props: [
    { id: 'podium', type: 'desk', x: 1, y: 4, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_4_3', type: 'desk', x: 4, y: 3, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_4_6', type: 'desk', x: 4, y: 6, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_7_3', type: 'desk', x: 7, y: 3, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'desk_7_6', type: 'desk', x: 7, y: 6, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bookshelf_11_4', type: 'bookshelf', x: 11, y: 4, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  // 玩家 3 人站位（main.js 会根据主角线动态拉取当前主力铁三角）
  playerDeploy: [
    { unitId: 'zhangzixiao', x: 2, y: 5 },
    { unitId: 'zhanghanyu', x: 2, y: 3 },
    { unitId: 'fanwenmo', x: 2, y: 7 }
  ],

  // 敌方布阵（5 人）：朱晏泽带头挑衅，两名男同学与两名女同学在课桌间煽风点火、推波助澜
  enemyDeploy: [
    { enemyId: 'zhuyanze_corrupted', instanceId: 'boss_zhuyanze', x: 9, y: 5 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'boy_mob_1', x: 10, y: 2 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'boy_mob_2', x: 6, y: 1 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'girl_mob_1', x: 10, y: 8 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'girl_mob_2', x: 6, y: 9 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '唤醒反常被心魔操纵的朱晏泽'
  },

  nextStorySceneOnWin: 'ch2_scene_recover',

  tutorial: {
    steps: [
      {
        title: '破解谣言 · 驱散盲从',
        body: '魔化男女同学会不断制造谣言动摇军心。优先将其打醒清除，失去跟风者的 Boss 防线将瞬间瓦解！',
        hint: '先打小怪破除谣言 · 再集火打醒朱晏泽'
      },
      {
        title: '铁三角协同 · 伙伴羁绊',
        body: '同甘共苦的伙伴们此刻是你最坚实的后盾，利用前排吸引仇恨，后排走位输出，洗刷一切诬陷！',
        hint: '并肩作战 · 击碎心魔'
      }
    ]
  }
};
