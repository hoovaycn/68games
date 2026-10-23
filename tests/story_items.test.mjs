import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { HUMEN_ORIGIN_STORY } from '../src/data/story_humen_origin.js';
import { CHAPTER16_STORY } from '../src/data/story_chapter16.js';
import { CHAPTER17_STORY } from '../src/data/story_chapter17.js';
import { CHAPTER19_STORY } from '../src/data/story_chapter19.js';
import { KEY_ITEMS } from '../src/data/goods/key_items.js';
import { DialogueSystem } from '../src/systems/dialogue_system.js';
import { applyStoryItemEvent } from '../src/systems/story_items.js';
import { ItemModal } from '../src/ui/components/item_modal.js';
import { GameApp } from '../src/main.js';

const staffId = 'righteous_staff';
const events = [
  [HUMEN_ORIGIN_STORY.ch15_scene_righteous_seal, 1, 'gain', '获得【浩然正气杖】'],
  [CHAPTER16_STORY.ch16_scene_betrayal_note, 0, 'lose', '失去【浩然正气杖】'],
  [CHAPTER17_STORY.ch17_scene_alter_breach, 4, 'gain', '获得【浩然正气杖】'],
  [CHAPTER19_STORY.ch19_scene_boss_destroyed, 1, 'lose', '失去【浩然正气杖】']
];

test('四处剧情道具事件按初获、失窃、抢回、终战损毁排列', () => {
  for (const [scene, index, action] of events) {
    assert.deepEqual(scene.dialogues[index].itemEvent, { itemId: staffId, action });
  }
  assert.ok(existsSync(new URL(`../${KEY_ITEMS[staffId].icon}`, import.meta.url)));
});

test('先看完关键台词，再确认弹出道具提示；关闭后才进入下一句', () => {
  const canvas = { width: 960, height: 540, getContext: () => ({}) };
  const state = { leadUnitId: 'hero', roster: { hero: { inventory: [] } } };
  const saves = [];
  const app = Object.create(GameApp.prototype);
  app.canvas = canvas;
  app.gameState = state;
  app.storyItemModal = null;
  app.saveManager = { autosave: (value) => saves.push(structuredClone(value)) };
  const dialogue = new DialogueSystem(canvas, () => {}, (event) => app.handleStoryItemEvent(event));
  app.dialogueSystem = dialogue;

  for (const [scene, index, , title] of events) {
    dialogue.startScene(scene);
    if (index) dialogue.loadLine(index);
    assert.equal(app.storyItemModal, null, '台词刚出现时不能遮住画面');
    const previousInventory = structuredClone(state.roster.hero.inventory);
    const saveCount = saves.length;
    dialogue.next();
    assert.equal(dialogue.isLineComplete, true);
    assert.equal(dialogue.displayedText, scene.dialogues[index].text);
    assert.equal(app.storyItemModal, null, '展开完整台词时也不能抢先弹窗');
    assert.deepEqual(state.roster.hero.inventory, previousInventory);
    assert.equal(saves.length, saveCount);

    dialogue.next();
    const modal = app.storyItemModal;
    assert.ok(modal instanceof ItemModal);
    assert.equal(dialogue.dialogueIndex, index, '弹窗期间保留关键画面与台词');
    assert.equal(dialogue.activeLine, scene.dialogues[index]);
    assert.equal(modal.config.title, title);
    assert.equal(modal.config.itemName, KEY_ITEMS[staffId].name);
    assert.equal(modal.config.icon, KEY_ITEMS[staffId].icon);
    assert.deepEqual(state.roster.hero.inventory, title.startsWith('获得')
      ? [{ id: staffId, count: 1 }]
      : []);
    assert.deepEqual(saves.at(-1).roster.hero.inventory, state.roster.hero.inventory);

    dialogue.next();
    assert.equal(app.storyItemModal, modal, '提示未确认前不能推进对白或重开提示');
    assert.equal(saves.length, saveCount + 1);
    assert.equal(dialogue.dialogueIndex, index);
    if (title.startsWith('失去')) {
      assert.equal(modal.handleClick(50, 50), true);
    } else {
      assert.equal(modal.handleKeyDown({ key: 'Enter' }), true);
    }
    assert.equal(app.storyItemModal, null);
    if (index === scene.dialogues.length - 1) {
      assert.equal(dialogue.showingChoice, true, '末句确认后才展示转场选项');
    } else {
      assert.equal(dialogue.dialogueIndex, index + 1, '确认弹窗后再进入下一句');
    }
  }
  assert.equal(saves.length, 4);
  assert.deepEqual(saves.map((save) => save.roster.hero.inventory.length), [1, 0, 1, 0]);
  assert.deepEqual(saves.map((save) => save.flags['storyItem:righteous_staff']),
    ['gain', 'lose', 'gain', 'lose']);

  dialogue.startScene(CHAPTER19_STORY.ch19_scene_boss_destroyed);
  dialogue.loadLine(1);
  dialogue.next();
  dialogue.next();
  assert.equal(app.storyItemModal, null, '终战损毁后重复进入不应再弹失去提示');
  assert.equal(dialogue.dialogueIndex, 2, '重复进入场景可正常继续剧情');
  assert.equal(saves.length, 4);
});

test('读档后仍保持状态，点击关闭提示不会修改背包；非法事件不会产生道具', () => {
  const state = { leadUnitId: 'hero', roster: { hero: { inventory: [] } } };
  assert.equal(applyStoryItemEvent(state, { itemId: 'unknown', action: 'gain' }), null);
  assert.equal(applyStoryItemEvent(state, { itemId: staffId, action: 'gain' }), KEY_ITEMS[staffId]);
  const restored = JSON.parse(JSON.stringify(state));
  assert.equal(applyStoryItemEvent(restored, { itemId: staffId, action: 'gain' }), null);
  assert.equal(applyStoryItemEvent(restored, { itemId: staffId, action: 'lose' }), KEY_ITEMS[staffId]);
  assert.deepEqual(restored.roster.hero.inventory, []);
  assert.equal(applyStoryItemEvent(restored, { itemId: staffId, action: 'gain' }), KEY_ITEMS[staffId]);
  assert.deepEqual(restored.roster.hero.inventory, [{ id: staffId, count: 1 }]);

  let closed = 0;
  const modal = new ItemModal({ getContext: () => ({}) }, { sfx: null }, () => { closed++; });
  assert.equal(modal.handleClick(50, 50), true);
  assert.equal(modal.handleKeyDown({ key: 'Enter' }), true);
  assert.equal(closed, 1);
  assert.deepEqual(restored.roster.hero.inventory, [{ id: staffId, count: 1 }]);
});

test('旧存档没有木杖背包记录时，失窃提示也只出现一次', () => {
  const legacy = { leadUnitId: 'hero', roster: { hero: { inventory: [] } } };
  const event = { itemId: staffId, action: 'lose' };
  assert.equal(applyStoryItemEvent(legacy, event), KEY_ITEMS[staffId]);
  assert.deepEqual(legacy.roster.hero.inventory, []);
  const restored = JSON.parse(JSON.stringify(legacy));
  assert.equal(applyStoryItemEvent(restored, event), null);
  assert.equal(applyStoryItemEvent(restored, { itemId: staffId, action: 'gain' }), KEY_ITEMS[staffId]);
  assert.deepEqual(restored.roster.hero.inventory, [{ id: staffId, count: 1 }]);
});
