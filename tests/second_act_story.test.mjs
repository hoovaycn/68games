import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { CHAPTER10_STORY } from '../src/data/story_chapter10.js';
import { CHAPTER11_STORY } from '../src/data/story_chapter11.js';
import { CHAPTER12_STORY } from '../src/data/story_chapter12.js';
import { CHAPTER13_STORY } from '../src/data/story_chapter13.js';
import { CHAPTER14_STORY } from '../src/data/story_chapter14.js';
import { CHAPTER15_STORY } from '../src/data/story_chapter15.js';
import { CHAPTER16_STORY } from '../src/data/story_chapter16.js';
import { CHAPTER17_STORY } from '../src/data/story_chapter17.js';
import { CHAPTER18_STORY } from '../src/data/story_chapter18.js';
import { CHAPTER19_STORY } from '../src/data/story_chapter19.js';
import { LevelSelectModal } from '../src/ui/components/level_select_modal.js';

const stories = [
  CHAPTER10_STORY, CHAPTER11_STORY, CHAPTER12_STORY, CHAPTER13_STORY, CHAPTER14_STORY,
  CHAPTER15_STORY, CHAPTER16_STORY, CHAPTER17_STORY, CHAPTER18_STORY, CHAPTER19_STORY
];
const scenes = Object.assign({}, ...stories);
const assetExists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const audioExists = (dir, name) => ['ogg', 'mp3', 'wav']
  .some((ext) => assetExists(`assets/audio/${dir}/${name}.${ext}`));
const passageBackground = 'assets/backgrounds/bg_time_passage@2x.png';
const passageBackground1x = 'assets/backgrounds/bg_time_passage.png';

test('第二幕剧情转场与已交付背景资源均可用', () => {
  for (const [id, scene] of Object.entries(scenes)) {
    assert.equal(scene.id, id);
    if (id === 'ch15_scene_time_passage') {
      assert.equal(scene.bgImg, passageBackground, `${id}: 背景资源合同不符`);
    } else {
      assert.ok(assetExists(scene.bgImg), `${id}: 背景不存在 ${scene.bgImg}`);
    }
    const transition = scene.transition;
    assert.ok(transition, `${id}: 缺少转场`);
    if (transition.targetScene && transition.targetScene !== 'title_screen') {
      assert.ok(scenes[transition.targetScene], `${id}: 目标场景不存在 ${transition.targetScene}`);
    }
    if (transition.battleId) {
      assert.ok(
        assetExists(`src/data/chapters/${transition.battleId}.js`),
        `${id}: 战斗关卡不存在 ${transition.battleId}`
      );
    }
  }
});

test('美术交付后穿越背景两版均为指定尺寸', {
  skip: !assetExists(passageBackground) || !assetExists(passageBackground1x)
    ? '等待美术交付 bg_time_passage 两张背景图'
    : false
}, () => {
  for (const [path, expected] of [
    [passageBackground, [1920, 1080]],
    [passageBackground1x, [960, 540]]
  ]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
});

test('第二幕场景及关键转折的音乐与音效文件均存在', () => {
  for (const [id, scene] of Object.entries(scenes)) {
    assert.ok(audioExists('bgm', scene.bgm), `${id}: 音乐不存在 ${scene.bgm}`);
    for (const line of scene.dialogues) {
      if (line.bgm) assert.ok(audioExists('bgm', line.bgm), `${id} #${line.id}: 音乐不存在 ${line.bgm}`);
      if (line.sfx) assert.ok(audioExists('sfx', line.sfx), `${id} #${line.id}: 音效不存在 ${line.sfx}`);
    }
  }
});

test('第二幕重要揭示与悬念对白使用加重样式', () => {
  const hooks = {
    ch10_scene_crisis: 4,
    ch11_scene_breakdown: 4,
    ch12_scene_badge_reveal: 3,
    ch13_scene_safahouse: 3,
    ch14_scene_pot_broken: 2,
    ch15_scene_righteous_seal: 3,
    ch16_scene_betrayal_note: 4,
    ch17_scene_alter_breach: 4,
    ch18_scene_tower_arrival: 2,
    ch19_scene_dawn_epilogue: 5
  };
  for (const [sceneId, lineId] of Object.entries(hooks)) {
    assert.ok(
      scenes[sceneId].dialogues.some((line) => line.id === lineId && line.highlight),
      `${sceneId} #${lineId}: 关键对白未加重`
    );
  }
});

test('驳船穿越先交代全员去向，再看历史画面，最后才落地', () => {
  const passage = CHAPTER15_STORY.ch15_scene_time_passage;
  const palace = CHAPTER15_STORY.ch15_scene_historic_prologue;
  const harbor = CHAPTER15_STORY.ch15_scene_humen_harbor_inspect;
  const beach = CHAPTER15_STORY.ch15_scene_beach_wake;

  assert.equal(CHAPTER14_STORY.ch14_scene_vortex_entry.transition.targetScene, passage.id);
  assert.match(passage.dialogues[0].text, /六个孩子、海峰和两位老师/);
  assert.match(passage.dialogues[1].text, /穿越/);
  assert.equal(passage.dialogues[1].highlight, true);
  assert.equal(passage.transition.targetScene, palace.id);
  assert.match(palace.dialogues[0].text, /还在通道里.*没有落进皇宫/);
  assert.equal(palace.transition.targetScene, harbor.id);
  assert.match(harbor.dialogues[0].text, /还在通道里/);
  assert.equal(harbor.transition.targetScene, beach.id);
  assert.match(beach.dialogues[0].text, /摔在海滩上/);

  const levelSelect = new LevelSelectModal({ getContext: () => ({}) });
  assert.equal(levelSelect.chapters.find((chapter) => chapter.num === 16).sceneKey, passage.id);
});

test('瑞怡受胁迫的前因、威胁及回收均写明', () => {
  const leadIn = CHAPTER13_STORY.ch13_scene_dock_alert.dialogues;
  const returnScene = CHAPTER16_STORY.ch16_scene_return_ruins.dialogues;
  const note = CHAPTER16_STORY.ch16_scene_betrayal_note.dialogues;
  const rescue = CHAPTER17_STORY.ch17_scene_alter_breach.dialogues;
  assert.ok(leadIn.some((line) => /基金会.*家庭联系表.*住址/.test(line.text)));
  assert.ok(returnScene.some((line) => /手机.*住址/.test(line.text)));
  assert.ok(note.some((line) => /江心旧水闸.*按地址抓同学试药/.test(line.text)));
  assert.ok(!note.some((line) => /小敏|手术捐款|资料公开/.test(line.text)));
  assert.ok(rescue.some((line) => /家庭联系表/.test(line.text)));
});
