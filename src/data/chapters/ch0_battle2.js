/**
 * 序章第 2 场战斗：校外巷口 · 拦截高年级混混
 * 敌人只有 1 个：高年级混混
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
    { x: 4, y: 5, type: 'crosswalk' }, { x: 5, y: 5, type: 'crosswalk' }
  ],

  props: [
    { id: 'lamp_2_2', type: 'street_lamp', x: 2, y: 2, img: 'assets/props/kenney/kc_streetlight.png', gridW: 1, gridH: 3, blocks: true },
    { id: 'crate_6_6', type: 'crate', x: 6, y: 6, img: 'assets/props/kenney/kc_crate.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'dumpster_9_7', type: 'dumpster', x: 9, y: 7, img: 'assets/props/kenney/kc_dumpster_green.png', gridW: 1, gridH: 2, blocks: true }
  ],

  playerDeploy: [
    { unitId: 'zhangzixiao', x: 3, y: 4 }
  ],

  enemyDeploy: [
    { enemyId: 'punk', instanceId: 'punk_1', x: 9, y: 4 }
  ],

  objective: {
    type: 'defeat_all',
    text: '击退高年级混混'
  },

  nextStorySceneOnWin: 'scene_before_home',

  dialogueIntro: [
    { speaker: '高年级混混', text: '喂！看什么看？学长今天心情不好，把身上的文具和零食都交出来！' },
    { speaker: '张子骁', text: '（这家伙手里卷着五年中考三年模拟，眼神狂躁……看来也是被焦虑怪异侵蚀了！）' },
    { speaker: '张子骁', text: '别挡道！我还要去救失踪的同学呢！' }
  ]
};
