import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SaveMenuModal } from '../src/ui/components/save_menu_modal.js';

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
    describeChapter: () => '第十一章 · 博物馆惊魂',
    describeAnchor: () => '剧情 · 二号中央展厅'
  });

  modal.render();

  const chapter = texts.find((item) => item.text === '第十一章 · 博物馆惊魂');
  const anchor = texts.find((item) => item.text === '剧情 · 二号中央展厅');
  const character = texts.find((item) => item.text.includes('张子骁 Lv.12'));
  assert.ok(chapter && anchor && character);
  assert.ok(chapter.y < anchor.y);
  assert.equal(anchor.y, character.y);
  assert.equal(modal.rowRects.length, 4);
  assert.ok(modal.rowRects.at(-1).y + modal.rowRects.at(-1).h < 510);
});
