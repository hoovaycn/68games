import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTER1_STORY } from '../src/data/story_chapter1.js';
import { CHAPTER2_STORY } from '../src/data/story_chapter2.js';

const line = (scene, id) => scene.dialogues.find((dialogue) => dialogue.id === id);

test('第一幕保留主角是否吃零食的悬念', () => {
  const thought = line(CHAPTER1_STORY.ch1_scene_playground, 5).text;
  assert.match(thought, /昨晚带回来的零食/);
  assert.doesNotMatch(thought, /没吃|没拆|忍住|交给徐老师/);

  const result = line(CHAPTER2_STORY.ch2_scene_exam_result, 2);
  assert.match(result.text, /今天上午.*满分/);
  assert.equal(result.highlight, true);
});

test('徐老师收瓶子的动机暂不揭晓', () => {
  const pickup = line(CHAPTER1_STORY.ch1_scene_recover, 4);
  assert.match(pickup.text, /悄悄.*公文包.*并未上交/);
  assert.doesNotMatch(pickup.text, /证物|保管|查案|怕.*拿走/);
  assert.equal(pickup.highlight, true);
});

test('满分引发的猜疑保留到冲突之后', () => {
  assert.match(line(CHAPTER2_STORY.ch2_scene_auditorium, 4).text, /成绩.*突然好/);
  const accusation = CHAPTER2_STORY.ch2_scene_confrontation.dialogues
    .some((dialogue) => dialogue.text.includes('满分全是作弊'));
  assert.equal(accusation, true);
});
