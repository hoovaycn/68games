/**
 * 序章第 3 场战斗（第一章 Boss 战）：同学家中书房 · 唤醒异变同窗
 * 室内战（8×7 格子），地面为室内木地板与地毯
 * 参战我方：双人协同战（主角 + 破门支援的同伴）
 *   - 男线：张子骁 + 张瀚瑜
 *   - 女线：石予诺 + 陈品璇
 * 敌方 Boss：
 *   - 男线：狂暴的小默（fanwenmo_corrupted，手持厚题集，HP 高）
 *   - 女线：失常的妍熹（heyanxi_corrupted，手持竖笛，远程音波）
 * 战术目标：击败失去理智的同学（打醒唤回神智）
 */
export const CH0_BATTLE3 = {
  id: 'ch0_battle3',
  name: '第三战：同学书房 · 唤醒异变同窗',
  mapWidth: 12,
  mapHeight: 10,
  defaultTerrain: 'wood_floor',

  terrainTypes: {
    wood_floor: { name: '木地板', def: 0, avoid: 0, cost: 1, color: '#b45309', tileImg: 'assets/props/kenney/kc_brick_red@2x.png' },
    carpet: { name: '地毯', def: 0, avoid: 5, cost: 1, color: '#78350f', tileImg: 'assets/props/kenney/kc_sidewalk@2x.png' },
    tile_floor: { name: '瓷砖走道', def: 0, avoid: 0, cost: 1, color: '#e2e8f0', tileImg: 'assets/props/kenney/kc_crosswalk@2x.png' }
  },

  terrainTiles: [
    { x: 0, y: 0, type: 'tile_floor' }, { x: 1, y: 0, type: 'tile_floor' },
    { x: 0, y: 1, type: 'tile_floor' }, { x: 1, y: 1, type: 'tile_floor' },
    { x: 0, y: 2, type: 'tile_floor' }, { x: 1, y: 2, type: 'tile_floor' },
    { x: 0, y: 3, type: 'tile_floor' }, { x: 1, y: 3, type: 'tile_floor' },
    { x: 0, y: 4, type: 'tile_floor' }, { x: 1, y: 4, type: 'tile_floor' },
    { x: 0, y: 5, type: 'tile_floor' }, { x: 1, y: 5, type: 'tile_floor' },
    { x: 0, y: 6, type: 'tile_floor' }, { x: 1, y: 6, type: 'tile_floor' },
    { x: 0, y: 7, type: 'tile_floor' }, { x: 1, y: 7, type: 'tile_floor' },
    { x: 0, y: 8, type: 'tile_floor' }, { x: 1, y: 8, type: 'tile_floor' },
    { x: 0, y: 9, type: 'tile_floor' }, { x: 1, y: 9, type: 'tile_floor' },

    // 书房中央地毯区域
    { x: 5, y: 3, type: 'carpet' }, { x: 6, y: 3, type: 'carpet' }, { x: 7, y: 3, type: 'carpet' },
    { x: 5, y: 4, type: 'carpet' }, { x: 6, y: 4, type: 'carpet' }, { x: 7, y: 4, type: 'carpet' },
    { x: 5, y: 5, type: 'carpet' }, { x: 6, y: 5, type: 'carpet' }, { x: 7, y: 5, type: 'carpet' }
  ],

  props: [
    { id: 'desk_6_2', type: 'desk', x: 6, y: 2, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'bookshelf_10_2', type: 'bookshelf', x: 10, y: 2, img: 'assets/props/kenney/kc_barrier_stripe@2x.png', gridW: 1, gridH: 1, blocks: true },
    { id: 'shelf_10_7', type: 'shelf', x: 10, y: 7, img: 'assets/props/kenney/kc_crate@2x.png', gridW: 1, gridH: 1, blocks: true }
  ],

  // 玩家双人站位：主角与新加入队友并肩
  playerDeploy: [
    { unitId: 'zhangzixiao', x: 1, y: 4 },
    { unitId: 'zhanghanyu', x: 1, y: 5 }
  ],

  // 敌方部署（Boss：异变的同伴）
  enemyDeploy: [
    { enemyId: 'fanwenmo_corrupted', instanceId: 'boss_1', x: 9, y: 4 }
  ],

  objective: {
    type: 'defeat_boss',
    text: '制伏发狂的同班同学'
  },

  nextStorySceneOnWin: 'scene_home_recover',

  tutorial: {
    steps: [
      {
        title: '协同作战 · 首场双人战役',
        body: '刚刚赶到的新伙伴已经与你结成战术小队！一人吸引正面注意，另一人伺机从侧翼或远程输出，切忌单独冒进！',
        hint: '两人携手 · 互相策应'
      },
      {
        title: '唤醒目标 · 物理破除幻象',
        body: '同学被诡异力量控制神智，防御力与生命值大增。集中火力打空他的生命值，就能彻底驱散青光、唤醒神智！',
        hint: '打空生命值即可制伏唤醒'
      }
    ]
  }
};
