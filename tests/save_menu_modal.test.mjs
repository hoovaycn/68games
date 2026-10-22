import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SaveMenuModal } from '../src/ui/components/save_menu_modal.js';
import { sound } from '../src/engine/sound.js';

test('存档行先显示章节标题，再显示场景和角色信息', () => {
  const texts = [];
  const ctx = {
    fillRect() {},
    beginPath() {},
    roundRect() {},
    fill() {},
    stroke() {},
    createLinearGradient() { return { addColorStop() {} }; },
    fillText(text, x, y) { texts.push({ text, x, y }); }
  };
  const canvas = { width: 960, height: 540, getContext: () => ctx };
  const meta = {
    sceneId: 'ch10_scene_crisis',
    leadName: '张子骁',
    leadLevel: 12,
    route: 'male',
    savedAt: Date.now()
  };
  const saveManager = {
    listSlots: () => [
      { slot: 'auto', label: '自动存档', exists: true, meta },
      ...[1, 2, 3].map((slot) => ({ slot, label: `存档${slot}`, exists: false, meta: null }))
    ]
  };
  const modal = new SaveMenuModal(canvas, {
    saveManager,
    describeChapter: () => '第十一章 · 博物馆里的罐子',
    describeAnchor: () => '剧情 · 二号中央展厅'
  });

  modal.render();

  const chapter = texts.find((item) => item.text === '第十一章 · 博物馆里的罐子');
  const anchor = texts.find((item) => item.text === '剧情 · 二号中央展厅');
  const character = texts.find((item) => item.text.includes('张子骁 Lv.12'));
  assert.ok(chapter && anchor && character);
  assert.ok(chapter.y < anchor.y);
  assert.equal(anchor.y, character.y);
  assert.equal(modal.rowRects.length, 4);
  assert.ok(modal.rowRects.at(-1).y + modal.rowRects.at(-1).h < 510);
  assert.equal(modal.buttonRects.switchMode, undefined);
});

test('剧情内可用按钮或 Tab 切换到读取存档，取消确认不覆盖当前进度', () => {
  const ctx = {
    fillRect() {}, beginPath() {}, roundRect() {}, fill() {}, stroke() {},
    createLinearGradient() { return { addColorStop() {} }; },
    fillText() {}
  };
  const canvas = { width: 960, height: 540, getContext: () => ctx };
  const state = { sceneId: 'ch10_scene_crisis' };
  const saved = { sceneId: 'ch5_scene_parent_meeting' };
  const slots = [
    { slot: 'auto', label: '自动存档', exists: true, meta: {} },
    { slot: 1, label: '存档1', exists: true, meta: {} },
    ...[2, 3].map((slot) => ({ slot, label: `存档${slot}`, exists: false, meta: null }))
  ];
  let loaded = null;
  const modal = new SaveMenuModal(canvas, {
    mode: 'save', allowModeSwitch: true, getState: () => state,
    saveManager: {
      listSlots: () => slots,
      loadSlot: (slot) => slot === 1 ? saved : null
    },
    onLoaded: (value) => { loaded = value; }
  });
  const originalWindow = globalThis.window;
  const originalPlaySfx = sound.playSfx;
  try {
    sound.playSfx = () => {};
    globalThis.window = { confirm: () => false };
    modal.render();
    assert.equal(modal.mode, 'save');
    assert.deepEqual(modal.slotList, [1, 2, 3]);
    const button = modal.buttonRects.switchMode;
    modal.handleClick(button.x + 1, button.y + 1);
    assert.equal(modal.mode, 'load');
    assert.deepEqual(modal.slotList, ['auto', 1, 2, 3]);
    assert.equal(modal.focusIndex, 1);
    modal.activateRow(1);
    assert.equal(loaded, null);
    assert.equal(modal.getState(), state);
    globalThis.window.confirm = () => true;
    modal.activateRow(1);
    assert.equal(loaded, saved);
    modal.handleKeyDown({ key: 'Tab', preventDefault() {} });
    assert.equal(modal.mode, 'save');
  } finally {
    globalThis.window = originalWindow;
    sound.playSfx = originalPlaySfx;
  }
});
