/**
 * 第七章关卡：二十年前的旧走廊 · 迎击异化者
 * 地图规格：10×8 教学楼旧走廊
 * 地形包含：老旧水磨石走道（tile_floor）、杂物堆（debris）
 * 
 * 机制：
 * 我方：少年徐老师、少年刘老师、阿瑶（此时阿瑶还是正常状态，或者是受保护状态）
 * 敌方：异化学长、传达室大爷（异化）、异化男同学
 * 战术核心：硬扛异化者的攻击，或者边打边退。
 */
export const CH7_BATTLE1 = {
  id: 'ch7_battle1',
  name: '第十一战：二十年前的旧走廊 · 逃无可逃',
  bgm: 'bgm_intense_boss',
  mapWidth: 16,
  mapHeight: 10,
  defaultTerrain: 'tile_floor',

  terrainTypes: {
    tile_floor: { name: '旧水磨石地', def: 0, avoid: 0, cost: 1, color: '#9ca3af', tileImg: 'assets/props/kenney/kc_crosswalk@2x.png' },
    wood_floor: { name: '旧木地板', def: 1, avoid: 5, cost: 1, color: '#78350f', tileImg: 'assets/props/kenney/kc_brick_red@2x.png' }
  },

  terrainTiles: [
    // 杂乱的旧木地板区域
    { x: 0, y: 0, type: 'wood_floor' }, { x: 0, y: 1, type: 'wood_floor' },
    { x: 1, y: 0, type: 'wood_floor' }, { x: 1, y: 1, type: 'wood_floor' }
  ],

  props: [
    { id: 'debris_1', type: 'debris', x: 2, y: 2, img: 'assets/items/dirty_sock@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'debris_2', type: 'debris', x: 5, y: 4, img: 'assets/items/discarded_snack@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'debris_3', type: 'debris', x: 8, y: 6, img: 'assets/props/kenney/kc_trashbag@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'desk_old_1', type: 'desk', x: 3, y: 5, img: 'assets/items/chalk_dust@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true },
    { id: 'desk_old_2', type: 'desk', x: 7, y: 1, img: 'assets/props/kenney/kc_bench@2x.png', gridW: 1, gridH: 1, blocks: true, fill3x3: true }
  ],

  playerDeploy: [
    { unitId: 'young_xu', x: 2, y: 3 },
    { unitId: 'young_liu', x: 2, y: 4 },
    { unitId: 'ayao', x: 1, y: 3 }
  ],

  enemyDeploy: [
    { enemyId: 'senior_student_corrupted', instanceId: 'senior_1', x: 14, y: 3 },
    { enemyId: 'janitor_corrupted', instanceId: 'janitor_1', x: 15, y: 4 },
    { enemyId: 'classmate_boy_corrupted', instanceId: 'corrupted_boy_1', x: 13, y: 2 },
    { enemyId: 'classmate_girl_corrupted', instanceId: 'corrupted_girl_1', x: 14, y: 6 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击败所有异化者或存活5回合'
  },

  nextStorySceneOnWin: 'ch7_scene_sacrifice',

  events: [
    {
      trigger: 'TURN_START',
      turn: 1,
      dialogues: [
        { speaker: '传达室大爷（异化）', text: '考砸了……对不起……我连大门都看不好……吃下去……变聪明……', portrait: 'assets/art/janitor_old@2x.png' },
        { speaker: '少年徐老师', text: '大爷也疯了！这到底是什么鬼东西！刘，护好阿瑶，别让他们靠近！', portrait: 'assets/art/young_xu_default@2x.png' }
      ]
    },
    {
      trigger: 'UNIT_DEFEATED',
      unitId: 'senior_1',
      dialogues: [
        { speaker: '异化学长', text: '公式……全都忘了……我要……重考……', portrait: 'assets/art/senior_student_corrupted@2x.png' }
      ]
    }
  ]
};
