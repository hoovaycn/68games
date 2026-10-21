import { test } from 'node:test';
import assert from 'node:assert/strict';
import { replaceStoryNames } from '../src/systems/story_placeholders.js';
import { CHAPTER11_STORY } from '../src/data/story_chapter11.js';
import { CHAPTER17_STORY } from '../src/data/story_chapter17.js';

test('转场提示按男女路线替换姓名，与正文使用相同规则', () => {
  const scenes = [
    CHAPTER11_STORY.ch11_scene_slum_street,
    CHAPTER11_STORY.ch11_scene_garage_inside,
    CHAPTER17_STORY.ch17_scene_alter_breach
  ];
  for (const names of [
    { MC_NAME: '张子骁', ALLY_1_NAME: '张瀚瑜', ALLY_2_NAME: '范文默' },
    { MC_NAME: '石予诺', ALLY_1_NAME: '陈品璇', ALLY_2_NAME: '何妍熹' }
  ]) {
    for (const scene of scenes) {
      const prompt = replaceStoryNames(scene.transition.prompt, names);
      assert.doesNotMatch(prompt, /\{(?:MC|ALLY_[12])_NAME\}/);
      assert.ok(prompt.includes(names.MC_NAME) || prompt.includes(names.ALLY_2_NAME));
    }
  }
});

test('未使用的转场字段与其他占位符保持原样', () => {
  const names = { MC_NAME: '石予诺', ALLY_1_NAME: '陈品璇', ALLY_2_NAME: '何妍熹' };
  assert.equal(replaceStoryNames('{MC_NAME}和{ALLY_2_NAME} · {UNKNOWN}', names), '石予诺和何妍熹 · {UNKNOWN}');
  assert.equal(replaceStoryNames(undefined, names), undefined);
  assert.match(CHAPTER11_STORY.ch11_scene_slum_street.transition.prompt, /\{ALLY_2_NAME\}/);
});
