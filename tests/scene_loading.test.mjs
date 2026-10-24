import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AssetLoader, assetLoader } from '../src/engine/asset_loader.js';
import { DialogueSystem } from '../src/systems/dialogue_system.js';
import { tiledManager } from '../src/systems/tiled_map.js';
import { sound } from '../src/engine/sound.js';
import { GameApp } from '../src/main.js';
import { collectChapterAssets } from '../src/systems/chapter_assets.js';
import { CHAPTER10_STORY } from '../src/data/story_chapter10.js';
import { CHAPTER11_STORY } from '../src/data/story_chapter11.js';
import { CH10_BATTLE1 } from '../src/data/chapters/ch10_battle1.js';
import { UNITS } from '../src/data/units.js';
import { ENEMIES } from '../src/data/enemies.js';

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

test('整章沿剧情和战斗胜利路线预取图片，不跨入下一章', () => {
  const story = { ...CHAPTER10_STORY, ...CHAPTER11_STORY };
  const plans = ['male', 'female'].map(route =>
    collectChapterAssets('ch10_scene_museum_meet', story,
      { ch10_battle1: CH10_BATTLE1 },
      ['ch10_scene_museum_meet', 'ch11_scene_slum_street'],
      route, UNITS, ENEMIES));
  for (const plan of plans) {
    assert.ok(plan.scenes.has('ch10_scene_tracking'));
    assert.ok(plan.battleIds.has('ch10_battle1'));
    assert.ok(plan.images.has('assets/backgrounds/bg_museum_square@2x.png'));
    assert.ok(plan.images.has('assets/portraits/qinruiyi_default@2x.png'));
    assert.ok(plan.tilesets.length > 0);
    assert.ok(!plan.scenes.has('ch11_scene_slum_street'));
  }
  assert.ok(plans[0].images.has('assets/art/zhangzixiao_default@2x.png'));
  assert.ok(plans[1].images.has('assets/art/shiyunuo_default@2x.png'));
  assert.ok(!plans[1].images.has('assets/art/zhangzixiao_default@2x.png'));
});

test('进入章节只等待一次，后续场景复用缓存并清理上一章图片', async t => {
  const requested = mockImages(t);
  const app = Object.create(GameApp.prototype);
  app.selectedRoute = 'male';
  app.loadRequest = 0;
  app.chapterReady = null;
  app.chapterPlans = { route: 'male', plans: [{
    entry: 'ch10_scene_museum_meet',
    assets: {
      scenes: new Set(['ch10_scene_museum_meet', 'ch10_scene_tracking']),
      battleIds: new Set(['ch10_battle1']),
      images: new Set(['assets/test_chapter_bg.png', 'assets/test_chapter_face.png']),
      tilesets: []
    }
  }] };
  assetLoader.cache['assets/test_previous_chapter.png'] = { loaded: true };
  const done = [];
  assert.equal(app.prepareChapter('ch10_scene_museum_meet', () => done.push('ready')), true);
  assert.equal(requested.length, 2);
  assert.ok(app.loading);
  requested.forEach(image => image.succeed());
  await flush();
  assert.equal(app.loading, null);
  assert.equal(app.chapterReady, 'ch10_scene_museum_meet');
  assert.deepEqual(done, ['ready']);
  assert.equal(assetLoader.cache['assets/test_previous_chapter.png'], undefined);
  assert.equal(app.prepareChapter('ch10_scene_tracking', () => done.push('again')), false);
  assert.equal(requested.length, 2);
});
