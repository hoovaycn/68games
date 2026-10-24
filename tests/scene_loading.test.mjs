import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AssetLoader, assetLoader } from '../src/engine/asset_loader.js';
import { DialogueSystem } from '../src/systems/dialogue_system.js';
import { tiledManager } from '../src/systems/tiled_map.js';
import { sound } from '../src/engine/sound.js';
import { GameApp } from '../src/main.js';

function mockImages(t) {
  const original = {
    window: globalThis.window,
    document: globalThis.document,
    location: globalThis.location,
    Image: globalThis.Image,
    sfx: sound.playSfx
  };
  const requested = [];
  globalThis.window = {};
  globalThis.location = { protocol: 'https:' };
  globalThis.document = {
    createElement: () => ({
      getContext: () => ({
        drawImage() {},
        getImageData: () => ({ data: new Uint8ClampedArray(16) }),
        putImageData() {}
      })
    })
  };
  globalThis.Image = class {
    naturalWidth = 2;
    naturalHeight = 2;
    complete = false;
    set src(value) {
      this.url = value;
      requested.push(this);
    }
    succeed() { this.complete = true; this.onload(); }
    fail() { this.complete = true; this.naturalWidth = 0; this.onerror(); }
  };
  sound.playSfx = () => {};
  t.after(() => {
    for (const key of ['window', 'document', 'location', 'Image']) {
      if (original[key] === undefined) delete globalThis[key];
      else globalThis[key] = original[key];
    }
    sound.playSfx = original.sfx;
  });
  return requested;
}

const flush = () => new Promise(resolve => setImmediate(resolve));

test('图片加载去重、失败和超时都能结束等待', async t => {
  const requested = mockImages(t);
  const loader = new AssetLoader();
  const a = loader.waitFor('assets/a.png');
  const b = loader.waitFor('assets/a.png');
  assert.equal(requested.length, 1);
  requested[0].succeed();
  assert.deepEqual(await Promise.all([a, b]), [true, true]);
  assert.ok(loader.getImage('assets/a.png'));

  const missing = loader.waitFor('assets/missing.png');
  requested[1].fail();
  assert.equal(await missing, false);
  assert.equal(await loader.waitFor('assets/missing.png'), false);

  assert.equal(await loader.waitFor('assets/slow.png', 5), false);
  requested[2].succeed();
  assert.equal(await loader.waitFor('assets/slow.png'), true);
});

test('对白等背景与立绘就绪，旧场景加载结果不能放行新场景', async t => {
  const requested = mockImages(t);
  const canvas = { width: 960, height: 540, getContext: () => ({}) };
  const dialogue = new DialogueSystem(canvas, () => {});
  dialogue.startScene({
    bgImg: 'assets/test_story_a.png',
    dialogues: [{ text: '第一句', leftPortrait: 'assets/test_face_a.png' }]
  });
  assert.equal(dialogue.loading, true);
  dialogue.next();
  assert.equal(dialogue.displayedText, '');
  assert.deepEqual(requested.map(img => img.url),
    ['assets/test_story_a.png', 'assets/test_face_a.png']);

  dialogue.startScene({
    bgImg: 'assets/test_story_b.png',
    dialogues: [{ text: '第二句' }]
  });
  requested[0].succeed();
  requested[1].succeed();
  await flush();
  assert.equal(dialogue.loading, true);
  requested[2].succeed();
  await flush();
  assert.equal(dialogue.loading, false);
  dialogue.next();
  assert.equal(dialogue.displayedText, '第二句');
  assert.ok(assetLoader.getImage('assets/test_story_b.png'));
});

test('背景加载失败后等待后备图片，随后允许推进对白', async t => {
  const requested = mockImages(t);
  const dialogue = new DialogueSystem({ getContext: () => ({}) }, () => {});
  dialogue.startScene({
    bgImg: 'assets/test_broken.png',
    bgImgFallback: 'assets/test_fallback.png',
    dialogues: [{ text: '看清画面之后说话' }]
  });
  assert.equal(dialogue.loading, true);
  requested.find(img => img.url === 'assets/test_broken.png').fail();
  await flush();
  assert.equal(dialogue.loading, true);
  requested.find(img => img.url === 'assets/test_fallback.png').succeed();
  await flush();
  assert.equal(dialogue.loading, false);
  assert.ok(assetLoader.getImage('assets/test_fallback.png'));
});

test('关键音效等画面就绪后才播放', async t => {
  const requested = mockImages(t);
  const played = [];
  sound.playSfx = name => played.push(name);
  const dialogue = new DialogueSystem({ getContext: () => ({}) }, () => {});
  dialogue.startScene({
    bgImg: 'assets/test_breaking_glass.png',
    dialogues: [{ text: '玻璃碎裂', sfx: 'sfx_glass_break' }]
  });
  assert.deepEqual(played, []);
  requested[0].succeed();
  await flush();
  assert.deepEqual(played, ['sfx_glass_break']);
});

test('战斗只加载地图实际使用的图集', async t => {
  const requested = mockImages(t);
  const ready = tiledManager.preloadTilesets({
    bgGrid: [[1, 0]], decGrid: [[0, 0]],
    tilesets: [
      { firstgid: 1, total: 10, src: 'assets/test_tiles_used.png' },
      { firstgid: 11, total: 10, src: 'assets/test_tiles_unused.png' }
    ]
  });
  assert.deepEqual(requested.map(img => img.url), ['assets/test_tiles_used.png']);
  requested[0].succeed();
  assert.deepEqual(await ready, [true]);
});

test('连续切换画面时旧加载请求不能清掉新加载提示', async t => {
  const requested = mockImages(t);
  const app = Object.create(GameApp.prototype);
  app.loadRequest = 0;
  const ready = [];
  app.prepareScreen('正在准备标题', ['assets/test_title_late.png'], [], () => ready.push('标题'));
  app.prepareScreen('正在准备战斗', ['assets/test_battle_late.png'], [], () => ready.push('战斗'));
  requested[0].succeed();
  await flush();
  assert.equal(app.loading.label, '正在准备战斗');
  assert.deepEqual(ready, []);
  requested[1].succeed();
  await flush();
  assert.equal(app.loading, null);
  assert.deepEqual(ready, ['战斗']);
});
