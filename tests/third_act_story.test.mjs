import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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
import { CHAPTER_ENTRY_SCENES } from '../src/main.js';

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

const metalCaseBg = 'assets/backgrounds/bg_metal_case@2x.png';
const metalCaseBg1x = 'assets/backgrounds/bg_metal_case.png';
const metalCaseOpenBg = 'assets/backgrounds/bg_metal_case_open_badge@2x.png';
const metalCaseOpenBg1x = 'assets/backgrounds/bg_metal_case_open_badge.png';

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

  while (currentSceneId && currentSceneId !== 'title_screen' && currentSceneId !== 'finale_screen') {
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
  assert.ok(
    currentSceneId === 'title_screen' || currentSceneId === 'finale_screen',
    `第三幕最终应顺利过渡至主菜单或全剧终终幕画卷，实际为: ${currentSceneId}`
  );
});

test('选关菜单 LevelSelectModal 覆盖全部 30 个章节，且与 main.js 的 CHAPTER_ENTRY_SCENES 完全对齐', () => {
  const modal = new LevelSelectModal({ getContext: () => ({}) });
  assert.equal(modal.chapters.length, 30);
  assert.equal(CHAPTER_ENTRY_SCENES.length, 30);
  const act3Chapters = modal.chapters.filter(c => c.act === 3);
  assert.equal(act3Chapters.length, 10);
  for (const c of act3Chapters) {
    assert.ok(allAct3Scenes[c.sceneKey], `章节入口场景不存在: ${c.sceneKey}`);
    const entrySceneInMain = CHAPTER_ENTRY_SCENES[c.num - 1];
    assert.equal(entrySceneInMain, c.sceneKey, `第${c.num}章 main.js 入口场景(${entrySceneInMain})与选关模态框(${c.sceneKey})不一致`);
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

test('第三幕全部战斗前，实际参战敌人均有立绘展示、叫阵威慑与对应切片资源存在', () => {
  // 查找所有触发第三幕战斗的战前场景
  const battleTriggerScenes = [];
  for (const [sceneKey, scene] of Object.entries(allAct3Scenes)) {
    if (scene.transition && (scene.transition.isBattleTrigger || scene.transition.battleId)) {
      battleTriggerScenes.push({
        sceneKey,
        scene,
        battleId: scene.transition.battleId
      });
    }
  }

  assert.equal(battleTriggerScenes.length, 10, '第三幕应有 10 个战斗前置触发场景');

  for (const { sceneKey, scene, battleId } of battleTriggerScenes) {
    const battle = act3Battles[battleId];
    assert.ok(battle, `未找到对应战斗配置: ${battleId}`);

    // 获取该战斗登场的所有敌人 ID
    const enemyIdsInBattle = new Set(battle.enemyDeploy.map(e => e.enemyId));
    const enemyNamesInBattle = new Set(
      Array.from(enemyIdsInBattle).map(id => ENEMIES[id]?.name).filter(Boolean)
    );

    // 检查战前剧情对话中，是否至少有 1 位参战敌方单位以 speaker 登场且拥有非空立绘
    const enemyDialogueLines = scene.dialogues.filter(dlg => {
      const isEnemySpeaker = Array.from(enemyNamesInBattle).some(name => dlg.speaker && dlg.speaker.includes(name));
      const hasPortrait = dlg.leftPortrait || dlg.rightPortrait;
      return isEnemySpeaker && hasPortrait;
    });

    assert.ok(
      enemyDialogueLines.length > 0,
      `场景 [${sceneKey}]（触发战斗 ${battleId}）未在战前让参战敌人露面或喊话！参战敌人: ${Array.from(enemyNamesInBattle).join(', ')}`
    );

    // 验证登场敌人的立绘切片在磁盘上真实存在
    for (const line of enemyDialogueLines) {
      const portraitPath = line.activeSide === 'right' ? line.rightPortrait : (line.leftPortrait || line.rightPortrait);
      if (portraitPath && !portraitPath.startsWith('{')) {
        assert.ok(
          assetExists(portraitPath),
          `场景 [${sceneKey}] 敌人 [${line.speaker}] 的立绘资源在磁盘上不存在: ${portraitPath}`
        );
      }
    }
  }
});

test('台词对白中禁止出现未转化的剧本设定术语（如“蝴蝶翅膀”、“蝴蝶效应”）', () => {
  for (const [sceneKey, scene] of Object.entries(allAct3Scenes)) {
    if (!Array.isArray(scene.dialogues)) continue;
    scene.dialogues.forEach((dlg, idx) => {
      if (dlg.text) {
        assert.ok(
          !dlg.text.includes('蝴蝶翅膀') && !dlg.text.includes('蝴蝶效应'),
          `场景 [${sceneKey}] 对话 #${dlg.id ?? idx} 包含生硬剧本设定词: "${dlg.text}"`
        );
      }
    });
  }
});

test('第二十六章核心解密与战后剧情立绘对齐：沈万廷、少年阿瑶、未来衰老阿瑶资产准确无误', () => {
  const revealScene = CHAPTER26_STORY.ch26_scene_hologram_reveal;
  assert.ok(revealScene, '缺少 ch26_scene_hologram_reveal 场景');

  // 1. 沈万廷（投影）左立绘必须为真实沈万廷立绘，绝不能是智脑女性机甲
  const shenLines = revealScene.dialogues.filter(d => d.speaker === '沈万廷（投影）');
  assert.ok(shenLines.length >= 1, '缺少沈万廷（投影）对白');
  for (const line of shenLines) {
    assert.match(line.leftPortrait, /shen_wanting_old/, '沈万廷（投影）应使用沈万廷老态/中年走私巨贾立绘');
  }

  // 2. 少年阿瑶（投影）必须使用初中少年阿瑶立绘 ayao_default，绝不能错用成年阿瑶
  const youngAyaoLines = revealScene.dialogues.filter(d => d.speaker === '少年阿瑶（投影）');
  assert.ok(youngAyaoLines.length >= 1, '缺少少年阿瑶（投影）对白');
  for (const line of youngAyaoLines) {
    assert.match(line.leftPortrait, /ayao_default/, '少年阿瑶（投影）必须使用少年/初中阿瑶立绘 ayao_default');
    assert.ok(!line.leftPortrait.includes('ayao_adult'), '少年阿瑶不可使用成年阿瑶立绘');
  }

  // 3. 战后救出未来阿瑶（ch26_scene_paradox_truth），必须使用 2046 年白发衰老阿瑶立绘（老太婆），绝不可使用成年阿瑶
  const postBattleScene = CHAPTER26_STORY.ch26_scene_paradox_truth;
  assert.ok(postBattleScene, '缺少 ch26_scene_paradox_truth 场景');
  const futureAyaoLines = postBattleScene.dialogues.filter(d => d.speaker === '未来阿瑶');
  assert.ok(futureAyaoLines.length >= 1, '缺少未来阿瑶战后对白');
  for (const line of futureAyaoLines) {
    assert.match(line.leftPortrait, /ayao_aged_2046/, '未来阿瑶应使用白发枯萎衰老的 2046 年老态立绘');
    assert.ok(!line.leftPortrait.includes('ayao_adult'), '未来阿瑶不可使用成年阿瑶立绘');
  }
});

test('美术交付后金属箱与开箱警徽两版尺寸符合接口', {
  skip: ![metalCaseBg, metalCaseBg1x, metalCaseOpenBg, metalCaseOpenBg1x].every(assetExists)
    ? '等待美术交付 bg_metal_case 与 bg_metal_case_open_badge 四张背景图'
    : false
}, () => {
  for (const [path, expected] of [
    [metalCaseBg, [1920, 1080]],
    [metalCaseBg1x, [960, 540]],
    [metalCaseOpenBg, [1920, 1080]],
    [metalCaseOpenBg1x, [960, 540]]
  ]) {
    const png = readFileSync(resolve(rootDir, path));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
});


