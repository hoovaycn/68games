import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// 导入第三幕全部剧情剧本
import { CHAPTER21_STORY } from '../src/data/story_chapter21.js';
import { CHAPTER22_STORY } from '../src/data/story_chapter22.js';
import { CHAPTER23_STORY } from '../src/data/story_chapter23.js';
import { CHAPTER24_STORY } from '../src/data/story_chapter24.js';
import { CHAPTER25_STORY } from '../src/data/story_chapter25.js';
import { CHAPTER26_STORY } from '../src/data/story_chapter26.js';
import { CHAPTER27_STORY } from '../src/data/story_chapter27.js';
import { CHAPTER28_STORY } from '../src/data/story_chapter28.js';
import { CHAPTER29_STORY } from '../src/data/story_chapter29.js';
import { CHAPTER30_STORY } from '../src/data/story_chapter30.js';

// 导入第三幕全部战斗关卡
import { CH21_BATTLE1 } from '../src/data/chapters/ch21_battle1.js';
import { CH22_BATTLE1 } from '../src/data/chapters/ch22_battle1.js';
import { CH23_BATTLE1 } from '../src/data/chapters/ch23_battle1.js';
import { CH24_BATTLE1 } from '../src/data/chapters/ch24_battle1.js';
import { CH25_BATTLE1 } from '../src/data/chapters/ch25_battle1.js';
import { CH26_BATTLE1 } from '../src/data/chapters/ch26_battle1.js';
import { CH27_BATTLE1 } from '../src/data/chapters/ch27_battle1.js';
import { CH28_BATTLE1 } from '../src/data/chapters/ch28_battle1.js';
import { CH29_BATTLE1 } from '../src/data/chapters/ch29_battle1.js';
import { CH30_BATTLE1 } from '../src/data/chapters/ch30_battle1.js';

import { ENEMIES } from '../src/data/enemies.js';
import { LevelSelectModal } from '../src/ui/components/level_select_modal.js';

const rootDir = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

function assetExists(relPath) {
  if (!relPath) return false;
  return existsSync(resolve(rootDir, relPath));
}

const allAct3Scenes = {
  ...CHAPTER21_STORY,
  ...CHAPTER22_STORY,
  ...CHAPTER23_STORY,
  ...CHAPTER24_STORY,
  ...CHAPTER25_STORY,
  ...CHAPTER26_STORY,
  ...CHAPTER27_STORY,
  ...CHAPTER28_STORY,
  ...CHAPTER29_STORY,
  ...CHAPTER30_STORY
};

const act3Battles = {
  ch21_battle1: CH21_BATTLE1,
  ch22_battle1: CH22_BATTLE1,
  ch23_battle1: CH23_BATTLE1,
  ch24_battle1: CH24_BATTLE1,
  ch25_battle1: CH25_BATTLE1,
  ch26_battle1: CH26_BATTLE1,
  ch27_battle1: CH27_BATTLE1,
  ch28_battle1: CH28_BATTLE1,
  ch29_battle1: CH29_BATTLE1,
  ch30_battle1: CH30_BATTLE1
};

test('第三幕 10 场战役配置完整性：网格、部署、敌人及胜利回调', () => {
  for (const [battleId, battle] of Object.entries(act3Battles)) {
    assert.equal(battle.id, battleId, `${battleId}: ID 不一致`);
    assert.ok(battle.mapWidth >= 10 && battle.mapHeight >= 8, `${battleId}: 地图尺寸过小`);
    assert.ok(battle.playerDeploy.length >= 4, `${battleId}: 玩家部署位不足 4`);
    assert.ok(battle.enemyDeploy.length >= 3, `${battleId}: 敌人部署位不足 3`);
    assert.ok(battle.nextStorySceneOnWin, `${battleId}: 缺少胜利剧情转场`);
    assert.ok(allAct3Scenes[battle.nextStorySceneOnWin], `${battleId}: 胜利回跳场景不存在 ${battle.nextStorySceneOnWin}`);

    const allPositions = [...battle.playerDeploy, ...battle.enemyDeploy];
    for (const unit of allPositions) {
      assert.ok(unit.x >= 0 && unit.x < battle.mapWidth, `${battleId}: 坐标 x=${unit.x} 越界`);
      assert.ok(unit.y >= 0 && unit.y < battle.mapHeight, `${battleId}: 坐标 y=${unit.y} 越界`);
    }

    const posSet = new Set(allPositions.map(u => `${u.x},${u.y}`));
    assert.equal(posSet.size, allPositions.length, `${battleId}: 存在重叠部署点`);

    for (const enemy of battle.enemyDeploy) {
      assert.ok(ENEMIES[enemy.enemyId], `${battleId}: 敌人模板未注册 ${enemy.enemyId}`);
    }
  }
});

test('第三幕从 Ch21 到 Ch30 结局全线贯通可达，无断流或死循环', () => {
  const visited = new Set();
  const foughtBattles = new Set();
  let currentSceneId = 'ch21_scene_clinic_warmth';

  while (currentSceneId && currentSceneId !== 'title_screen') {
    assert.ok(!visited.has(currentSceneId), `${currentSceneId}: 剧情链路出现循环`);
    visited.add(currentSceneId);

    const scene = allAct3Scenes[currentSceneId];
    assert.ok(scene, `场景未找到: ${currentSceneId}`);
    assert.ok(scene.dialogues && scene.dialogues.length > 0, `${currentSceneId}: 缺少对话`);

    const transition = scene.transition;
    assert.ok(transition, `${currentSceneId}: 缺少转场配置`);

    if (transition.isBattleTrigger || transition.battleId) {
      const bId = transition.battleId;
      assert.ok(act3Battles[bId], `${currentSceneId}: 引用的战斗未定义 ${bId}`);
      foughtBattles.add(bId);
      currentSceneId = act3Battles[bId].nextStorySceneOnWin;
    } else if (transition.targetScene) {
      currentSceneId = transition.targetScene;
    } else {
      break;
    }
  }

  assert.equal(foughtBattles.size, 10, '第三幕每章均有一场主线战役参战');
  assert.equal(currentSceneId, 'title_screen', '第三幕最终应顺利过渡至主菜单 title_screen');
});

test('选关菜单 LevelSelectModal 覆盖全部 30 个章节', () => {
  const modal = new LevelSelectModal({ getContext: () => ({}) });
  assert.equal(modal.chapters.length, 30);
  const act3Chapters = modal.chapters.filter(c => c.act === 3);
  assert.equal(act3Chapters.length, 10);
  for (const c of act3Chapters) {
    assert.ok(allAct3Scenes[c.sceneKey], `章节入口场景不存在: ${c.sceneKey}`);
  }
});

test('第三幕所有剧情脚本无双线角色名或立绘硬编码，严格遵循占位符规范', () => {
  const forbiddenPatterns = [
    /张子骁/,
    /石予诺/,
    /范文默/,
    /何妍熹/,
    /张瀚瑜/,
    /陈品璇/,
    /子骁/,
    /予诺/,
    /文默/,
    /妍熹/,
    /（予诺）/,
    /（妍熹）/,
    /成年主角/,
    /成年副官/,
    /mc_adult_zixiao/,
    /mc_adult_yunuo/,
    /fanwenmo_adult/,
    /heyanxi_adult/
  ];

  for (const [sceneKey, scene] of Object.entries(allAct3Scenes)) {
    if (!Array.isArray(scene.dialogues)) continue;
    scene.dialogues.forEach((dlg, idx) => {
      // 检查 speaker
      if (dlg.speaker) {
        for (const pattern of forbiddenPatterns) {
          assert.ok(
            !pattern.test(dlg.speaker),
            `场景 [${sceneKey}] 对话 #${dlg.id ?? idx} speaker 包含硬编码: ${dlg.speaker} 匹配 ${pattern}`
          );
        }
      }
      // 检查 text
      if (dlg.text) {
        for (const pattern of forbiddenPatterns) {
          assert.ok(
            !pattern.test(dlg.text),
            `场景 [${sceneKey}] 对话 #${dlg.id ?? idx} text 包含硬编码: "${dlg.text}" 匹配 ${pattern}`
          );
        }
      }
      // 检查立绘占位符（不应直接写具体男女主角的特定立绘文件名）
      const specificPortraits = [
        'assets/art/zhangzixiao_default@2x.png',
        'assets/art/shiyunuo_default@2x.png',
        'assets/art/zhanghanyu_default@2x.png',
        'assets/art/chenpinxuan_default@2x.png',
        'assets/art/fanwenmo_default@2x.png',
        'assets/art/heyanxi_default@2x.png',
        'assets/art/mc_adult_zixiao_default@2x.png',
        'assets/art/mc_adult_yunuo_default@2x.png',
        'assets/art/fanwenmo_adult_default@2x.png',
        'assets/art/heyanxi_adult_default@2x.png'
      ];
      for (const p of specificPortraits) {
        assert.notEqual(dlg.leftPortrait, p, `场景 [${sceneKey}] leftPortrait 应使用占位符而非写死: ${p}`);
        assert.notEqual(dlg.rightPortrait, p, `场景 [${sceneKey}] rightPortrait 应使用占位符而非写死: ${p}`);
      }
    });
  }
});
