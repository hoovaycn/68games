import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { CHAPTER5_STORY } from '../src/data/story_chapter5.js';
import { CHAPTER9_STORY } from '../src/data/story_chapter9.js';
import { CHAPTER10_STORY } from '../src/data/story_chapter10.js';
import { CHAPTER11_STORY } from '../src/data/story_chapter11.js';
import { CHAPTER12_STORY } from '../src/data/story_chapter12.js';
import { CHAPTER13_STORY } from '../src/data/story_chapter13.js';
import { CHAPTER14_STORY } from '../src/data/story_chapter14.js';
import { CHAPTER15_STORY } from '../src/data/story_chapter15.js';
import { HUMEN_ORIGIN_STORY } from '../src/data/story_humen_origin.js';
import { CHAPTER16_STORY } from '../src/data/story_chapter16.js';
import { CHAPTER17_STORY } from '../src/data/story_chapter17.js';
import { CHAPTER18_STORY } from '../src/data/story_chapter18.js';
import { CHAPTER19_STORY } from '../src/data/story_chapter19.js';
import { CH10_BATTLE1 } from '../src/data/chapters/ch10_battle1.js';
import { CH11_BATTLE1 } from '../src/data/chapters/ch11_battle1.js';
import { CH12_BATTLE1 } from '../src/data/chapters/ch12_battle1.js';
import { CH13_BATTLE1 } from '../src/data/chapters/ch13_battle1.js';
import { CH14_BATTLE1 } from '../src/data/chapters/ch14_battle1.js';
import { CH15_BATTLE1 } from '../src/data/chapters/ch15_battle1.js';
import { CH15B_BATTLE1 } from '../src/data/chapters/ch15b_battle1.js';
import { CH16_BATTLE1 } from '../src/data/chapters/ch16_battle1.js';
import { CH17_BATTLE1 } from '../src/data/chapters/ch17_battle1.js';
import { CH18_BATTLE1 } from '../src/data/chapters/ch18_battle1.js';
import { CH19_BATTLE1 } from '../src/data/chapters/ch19_battle1.js';
import { ENEMIES } from '../src/data/enemies.js';
import { GameApp } from '../src/main.js';
import { LevelSelectModal } from '../src/ui/components/level_select_modal.js';

const stories = [
  CHAPTER10_STORY, CHAPTER11_STORY, CHAPTER12_STORY, CHAPTER13_STORY, CHAPTER14_STORY,
  CHAPTER15_STORY, HUMEN_ORIGIN_STORY, CHAPTER16_STORY, CHAPTER17_STORY,
  CHAPTER18_STORY, CHAPTER19_STORY
];
const scenes = Object.assign({}, ...stories);
const assetExists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const audioExists = (dir, name) => ['ogg', 'mp3', 'wav']
  .some((ext) => assetExists(`assets/audio/${dir}/${name}.${ext}`));
const passageBackground = 'assets/backgrounds/bg_time_passage@2x.png';
const passageBackground1x = 'assets/backgrounds/bg_time_passage.png';
const dawnBackground = 'assets/backgrounds/bg_canal_dawn@2x.png';
const dawnBackground1x = 'assets/backgrounds/bg_canal_dawn.png';
const stormBackground = 'assets/backgrounds/bg_clocktower_storm@2x.png';
const stormBackground1x = 'assets/backgrounds/bg_clocktower_storm.png';
const storehouseBackground = 'assets/backgrounds/bg_humen_fushoutang_storehouse@2x.png';
const storehouseBackground1x = 'assets/backgrounds/bg_humen_fushoutang_storehouse.png';
const shopkeeperArt = 'assets/art/fushoutang_shopkeeper_1839@2x.png';
const shopkeeperArt1x = 'assets/art/fushoutang_shopkeeper_1839.png';

test('第二幕章节标题直白且在选关与存档中一致', () => {
  const expected = [
    '博物馆里的罐子', '烂人老爸', '汽修厂的后仓', '照片上的人', '罐子碎了',
    '我们穿越了', '福寿堂留下的罐子', '班长去哪了', '去救覃瑞怡', '钟楼里的最后一战'
  ];
  const levelSelect = new LevelSelectModal({ getContext: () => ({}) });
  const chapters = levelSelect.chapters.filter((chapter) => chapter.act === 2);
  assert.deepEqual(chapters.map((chapter) => chapter.title), expected);
  for (const [index, chapter] of chapters.entries()) {
    assert.equal(
      GameApp.prototype.describeSaveChapter({ sceneId: chapter.sceneKey }),
      `第${['十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'][index]}章 · ${chapter.title}`
    );
  }
  for (const [sceneId, expectedTitle] of [
    ['ch15_scene_lin_commends', '第十六章 · 我们穿越了'],
    ['ch15b_scene_smuggler_storehouse', '第十七章 · 福寿堂留下的罐子'],
    ['ch15b_scene_storehouse_aftermath', '第十七章 · 福寿堂留下的罐子'],
    ['ch15_scene_righteous_seal', '第十七章 · 福寿堂留下的罐子'],
    ['ch16_scene_betrayal_note', '第十八章 · 班长去哪了'],
    ['ch17_scene_tearful_retreat', '第十九章 · 去救覃瑞怡'],
    ['ch18_scene_tower_arrival', '第十九章 · 去救覃瑞怡'],
    ['ch19_scene_final_stand', '第二十章 · 钟楼里的最后一战']
  ]) {
    assert.equal(GameApp.prototype.describeSaveChapter({ sceneId }), expectedTitle, sceneId);
  }
  assert.equal(
    GameApp.prototype.describeSaveChapter({ chapterId: 'ch18_battle1' }),
    '第十九章 · 去救覃瑞怡',
    '旧版中庭战斗存档仍显示当前章号'
  );
});

test('基金会线索从邀请函到展厅揭示，再到福寿堂身份说明', () => {
  const meeting = CHAPTER5_STORY.ch5_scene_parent_meeting;
  const invitation = CHAPTER9_STORY.ch9_scene_ending.transition;
  const museum = CHAPTER10_STORY.ch10_scene_museum_meet.dialogues;
  const confrontation = CHAPTER10_STORY.ch10_scene_confrontation.dialogues;
  const reveal = CHAPTER13_STORY.ch13_scene_safahouse.dialogues;

  assert.ok(meeting.dialogues.some((line) => /神秘家长/.test(line.speaker)));
  assert.ok(!meeting.dialogues.some((line) => /怡安|基金会/.test(line.text)));
  assert.match(invitation.prompt, /怡安教育慈善基金会/);
  assert.ok(museum.some((line) => /期中考前.*没查出是谁/.test(line.text)));
  assert.ok(confrontation.some((line) => /原来怡安基金会是你在管/.test(line.text) && line.highlight));
  assert.ok(reveal.some((line) => /怡安基金会.*对外的招牌.*福寿堂/.test(line.text)));
});

test('沈崇礼在第二幕对白和战斗中始终使用同一张立绘', () => {
  const art = 'assets/art/mystery_man_corrupted@2x.png';
  const portrait = 'assets/portraits/mystery_man_corrupted@2x.png';
  assert.ok(assetExists(art));
  assert.ok(assetExists(portrait));
  assert.equal(ENEMIES.shen_chongli.portrait, portrait);
  for (const [sceneId, scene] of Object.entries(scenes)) {
    for (const line of scene.dialogues) {
      assert.notEqual(line.leftPortrait, 'assets/art/shen_chongli_default@2x.png', `${sceneId} #${line.id}`);
      assert.notEqual(line.rightPortrait, 'assets/art/shen_chongli_default@2x.png', `${sceneId} #${line.id}`);
      if (line.speaker === '沈崇礼') {
        assert.equal(line.leftPortrait, art, `${sceneId} #${line.id}: 人物与姓名不一致`);
      }
    }
  }
  assert.equal(CHAPTER17_STORY.ch17_scene_alter_breach.dialogues[2].rightPortrait, art);
  assert.equal(CHAPTER17_STORY.ch17_scene_alter_breach.dialogues[3].rightPortrait, art);
  assert.equal(
    CHAPTER18_STORY.ch18_scene_tower_arrival.dialogues.find((line) => line.speaker === '沈崇礼').leftPortrait,
    art
  );
});

test('海峰亮明警察身份后受伤镜头沿用警察战损立绘', () => {
  const oldArt = 'assets/art/father_haifeng_battle_damaged@2x.png';
  const policeArt = 'assets/art/father_haifeng_police_damaged@2x.png';
  assert.ok(assetExists(policeArt));
  assert.ok(assetExists('assets/portraits/father_haifeng_police_damaged@2x.png'));
  assert.equal(CHAPTER12_STORY.ch12_scene_badge_reveal.dialogues[0].leftPortrait, oldArt);
  for (const scene of [CHAPTER17_STORY.ch17_scene_father_shield, CHAPTER19_STORY.ch19_scene_miracle_reunion]) {
    const haifengPortraits = scene.dialogues.flatMap(({ leftPortrait, rightPortrait }) =>
      [leftPortrait, rightPortrait].filter((portrait) => portrait?.includes('father_haifeng_')));
    assert.ok(haifengPortraits.length > 0, `${scene.id}: 缺少海峰立绘`);
    assert.ok(haifengPortraits.every((portrait) => portrait === policeArt), `${scene.id}: 海峰立绘与身份不符`);
  }
  for (const scene of [
    CHAPTER13_STORY, CHAPTER14_STORY, CHAPTER15_STORY, HUMEN_ORIGIN_STORY, CHAPTER16_STORY,
    CHAPTER17_STORY, CHAPTER18_STORY, CHAPTER19_STORY
  ]) {
    for (const entry of Object.values(scene)) {
      for (const line of entry.dialogues) {
        assert.notEqual(line.leftPortrait, oldArt, `${entry.id} #${line.id}: 沿用混混战损图`);
        assert.notEqual(line.rightPortrait, oldArt, `${entry.id} #${line.id}: 沿用混混战损图`);
      }
    }
  }
});

test('第二幕剧情转场与已交付背景资源均可用', () => {
  for (const [id, scene] of Object.entries(scenes)) {
    assert.equal(scene.id, id);
    if (id === 'ch15_scene_time_passage' || id === 'ch19_scene_dawn_epilogue' || id === 'ch15b_scene_smuggler_storehouse') {
      assert.equal(
        scene.bgImg,
        id === 'ch15_scene_time_passage' ? passageBackground
          : id === 'ch19_scene_dawn_epilogue' ? dawnBackground : storehouseBackground,
        `${id}: 背景资源合同不符`
      );
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

test('终章中沈万廷、巨魔与沈崇礼依次登场，决战后都得到交代', () => {
  const arrival = CHAPTER18_STORY.ch18_scene_tower_arrival;
  const finalStand = CHAPTER19_STORY.ch19_scene_final_stand;
  const aftermath = CHAPTER19_STORY.ch19_scene_boss_destroyed;
  const elderArt = 'assets/art/shen_wanting_old@2x.png';
  const bossArt = 'assets/art/boss_colossus_opium_god@2x.png';
  assert.ok(assetExists(elderArt));
  assert.ok(assetExists(bossArt));
  assert.ok(arrival.dialogues.some((line) => line.speaker === '沈万廷' && line.leftPortrait === elderArt));
  const elderIndex = finalStand.dialogues.findIndex((line) => line.speaker === '沈万廷');
  const bossIndex = finalStand.dialogues.findIndex((line) => line.leftPortrait === bossArt);
  assert.ok(elderIndex >= 0 && bossIndex > elderIndex, '沈万廷应先露面，再让巨魔亮相');
  assert.equal(finalStand.dialogues[bossIndex].bgm, 'bgm_retro_level3');
  assert.equal(CH19_BATTLE1.bgm, 'bgm_retro_level3');
  assert.ok(finalStand.dialogues.some((line) => line.speaker === '沈崇礼'));
  assert.ok(['boss_colossus', 'shen_wanting', 'shen_chongli']
    .every((id) => CH19_BATTLE1.enemyDeploy.some((enemy) => enemy.enemyId === id)));
  assert.equal(ENEMIES.shen_wanting.name, '沈万廷');
  assert.ok(aftermath.dialogues.some((line) => /核心碎了.*沈万廷.*沈崇礼/.test(line.text)));
  assert.ok(CHAPTER19_STORY.ch19_scene_miracle_reunion.dialogues.some((line) => /带走了沈家父子/.test(line.text)));
});

test('巨魔登场前阴云遮住钟楼，胜利后恢复原背景和音乐', () => {
  const stand = CHAPTER19_STORY.ch19_scene_final_stand;
  const aftermath = CHAPTER19_STORY.ch19_scene_boss_destroyed;
  const normalBackground = 'assets/backgrounds/bg_clocktower_summit@2x.png';
  const bossIndex = stand.dialogues.findIndex((line) =>
    line.leftPortrait === 'assets/art/boss_colossus_opium_god@2x.png');
  assert.equal(CHAPTER18_STORY.ch18_scene_tower_arrival.bgImg, normalBackground);
  assert.equal(stand.bgImg, normalBackground);
  assert.equal(stand.dialogues[0].bgImg, undefined);
  assert.match(stand.dialogues[1].text, /阳光.*乌云.*暗了下来/);
  assert.ok(bossIndex > 2, '巨魔立绘不能在天气变化和轮廓铺垫前出现');
  assert.ok(stand.dialogues.slice(1).every((line) => line.bgImg === stormBackground));
  assert.equal(stand.dialogues[bossIndex].bgm, 'bgm_retro_level3');
  assert.equal(aftermath.bgm, 'bgm_retro_level3');
  assert.equal(aftermath.dialogues[0].bgImg, stormBackground);
  assert.equal(aftermath.dialogues[0].bgm, undefined);
  assert.equal(aftermath.dialogues[1].bgImg, undefined);
  assert.equal(aftermath.dialogues[1].bgm, 'bgm_victory');
  assert.equal(aftermath.bgImg, normalBackground);
  assert.match(aftermath.dialogues[1].text, /乌云.*阳光重新照进钟楼/);
});

test('美术交付后阴云钟楼两版尺寸符合接口', {
  skip: !assetExists(stormBackground) || !assetExists(stormBackground1x)
    ? '等待美术交付 bg_clocktower_storm 两张背景图'
    : false
}, () => {
  for (const [path, expected] of [
    [stormBackground, [1920, 1080]],
    [stormBackground1x, [960, 540]]
  ]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
});

test('结局从钟楼来到运河岸边，密电后留下第三幕钩子', () => {
  const reunion = CHAPTER19_STORY.ch19_scene_miracle_reunion;
  const dawn = CHAPTER19_STORY.ch19_scene_dawn_epilogue;
  assert.match(reunion.transition.prompt, /抬下钟楼.*运河岸边/);
  assert.equal(dawn.bgImg, dawnBackground);
  assert.equal(dawn.bgm, 'bgm_childhood');
  assert.match(dawn.dialogues[0].text, /运河岸边.*晨光/);
  assert.equal(dawn.dialogues.find((line) => /卫星电话/.test(line.text)).bgm, 'bgm_suspense');
  assert.match(dawn.dialogues.at(-1).text, /第三幕.*敬请期待/);
  assert.equal(dawn.dialogues.at(-1).highlight, true);
  assert.equal(dawn.transition.targetScene, 'title_screen');
});

test('结局返回主菜单使用标题状态，不再尝试加载剧情场景', () => {
  const app = Object.create(GameApp.prototype);
  const calls = [];
  app.canvas = {};
  app.topBar = { style: {} };
  app.titleScreen = {
    enter: () => calls.push('enter'),
    enterTitle: () => calls.push('title'),
    setContinueAvailable: () => calls.push('refresh')
  };
  app.saveManager = { hasAnySave: () => true };
  app.startStoryScene = () => { throw new Error('结局不能加载 title_screen 剧情'); };
  app.handleSceneTransition(CHAPTER19_STORY.ch19_scene_dawn_epilogue.transition);
  assert.equal(app.stage, 'STAGE_TITLE');
  assert.equal(app.topBar.style.display, 'none');
  assert.deepEqual(calls, ['enter', 'refresh', 'title']);
});

test('美术交付后运河破晓背景双尺寸符合接口', {
  skip: !assetExists(dawnBackground) || !assetExists(dawnBackground1x)
    ? '等待美术交付 bg_canal_dawn 两张背景图'
    : false
}, () => {
  for (const [path, expected] of [
    [dawnBackground, [1920, 1080]],
    [dawnBackground1x, [960, 540]]
  ]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
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

test('海峰撞墙救场时切入热血战斗音乐', () => {
  assert.equal(CHAPTER12_STORY.ch12_scene_trap.bgm, 'bgm_suspense');
  assert.equal(CHAPTER12_STORY.ch12_scene_hero_entry.bgm, 'bgm_battle_normal');
});

test('穿越通道切到皇宫时更换威严的配乐', () => {
  assert.equal(CHAPTER15_STORY.ch15_scene_time_passage.bgm, 'bgm_eerie_revelation');
  assert.equal(CHAPTER15_STORY.ch15_scene_historic_prologue.bgm, 'bgm_gojira_battle');
  assert.equal(CHAPTER15_STORY.ch15_scene_humen_harbor_inspect.bgm, 'bgm_gojira_battle');
});

test('虎门相见与木杖发光写明古今接力', () => {
  const meeting = CHAPTER15_STORY.ch15_scene_lin_commends;
  const seal = HUMEN_ORIGIN_STORY.ch15_scene_righteous_seal;
  assert.match(meeting.dialogues[2].text, /课本.*亲眼看见.*警察、老师和普通人/);
  assert.match(meeting.dialogues[3].text, /两百年后.*没白毁/);
  assert.match(seal.dialogues[0].text, /白灰.*浩然正气.*教头.*两百年后的孩子.*碎罐内壁/);
});

test('第二幕重要揭示与悬念对白使用加重样式', () => {
  const hooks = {
    ch10_scene_crisis: 4,
    ch11_scene_breakdown: 4,
    ch12_scene_badge_reveal: 3,
    ch13_scene_safahouse: 3,
    ch14_scene_pot_broken: 2,
    ch15_scene_righteous_seal: 3,
    ch15b_scene_smuggler_storehouse: 2,
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

test('虎门新增章节交代福寿堂旧账和古罐沉海，赠杖后才回现代', () => {
  const lead = HUMEN_ORIGIN_STORY.ch15b_scene_missing_jar;
  const hold = HUMEN_ORIGIN_STORY.ch15b_scene_smuggler_storehouse;
  const aftermath = HUMEN_ORIGIN_STORY.ch15b_scene_storehouse_aftermath;
  const report = HUMEN_ORIGIN_STORY.ch15b_scene_lin_report;
  const seal = HUMEN_ORIGIN_STORY.ch15_scene_righteous_seal;
  assert.equal(CH15_BATTLE1.nextStorySceneOnWin, 'ch15_scene_lin_commends');
  assert.equal(CHAPTER15_STORY.ch15_scene_lin_commends.transition.targetScene, lead.id);
  assert.match(lead.dialogues[0].text, /青花罐少了一只/);
  assert.ok(lead.dialogues.some((line) => /沈家.*福寿堂|福寿堂.*沈家/.test(line.text) && line.highlight));
  assert.equal(lead.transition.targetScene, hold.id);
  assert.equal(hold.bgImg, storehouseBackground);
  assert.ok(hold.dialogues.some((line) => line.speaker === '福寿堂沈掌柜'
    && line.leftPortrait === shopkeeperArt && /洋商.*烟膏/.test(line.text) && line.highlight));
  assert.ok(hold.dialogues.some((line) => /本子.*哪家铺子.*免费给穷人/.test(line.text)));
  assert.equal(hold.transition.battleId, CH15B_BATTLE1.id);
  assert.equal(CH15B_BATTLE1.nextStorySceneOnWin, aftermath.id);
  assert.ok(aftermath.dialogues.some((line) => /青花罐.*沉进虎门海口/.test(line.text)));
  assert.ok(aftermath.dialogues.some((line) => /博物馆.*铭牌/.test(line.text) && line.highlight));
  assert.equal(aftermath.transition.targetScene, report.id);
  assert.ok(report.dialogues.some((line) => /教头.*木杖.*带回去/.test(line.text)));
  assert.equal(report.transition.targetScene, seal.id);
  assert.equal(seal.transition.targetScene, CHAPTER16_STORY.ch16_scene_return_ruins.id);
  const levelSelect = new LevelSelectModal({ getContext: () => ({}) });
  assert.equal(levelSelect.chapters.find((chapter) => chapter.num === 17).sceneKey, lead.id);
});

test('福寿堂起初免费发药，掌柜听见未来后才决定投奔洋商', () => {
  const warning = CHAPTER13_STORY.ch13_scene_safahouse.dialogues.find((line) => /福寿堂.*虎门销烟之后/.test(line.text));
  const lead = HUMEN_ORIGIN_STORY.ch15b_scene_missing_jar.dialogues;
  const before = HUMEN_ORIGIN_STORY.ch15b_scene_smuggler_storehouse.dialogues;
  const after = HUMEN_ORIGIN_STORY.ch15b_scene_storehouse_aftermath.dialogues;
  assert.ok(warning, '海峰先前查到的是虎门销烟后的福寿堂');
  assert.ok(lead.some((line) => /福寿堂.*走私.*先别猜/.test(line.text)));
  assert.match(before[0].text, /免费给穷人发过药.*青花罐/);
  assert.ok(before.some((line) => line.speaker === '福寿堂沈掌柜' && /洋商.*藏烟膏.*没答应/.test(line.text)));
  assert.ok(before.some((line) => line.speaker === '走私水手' && /铺子.*运货.*银子/.test(line.text)));
  const future = before.find((line) => /两百年后的福寿堂.*害学生/.test(line.text));
  assert.equal(future?.highlight, true);
  assert.ok(before.some((line) => line.speaker === '福寿堂沈掌柜' && /两百年后.*福寿堂/.test(line.text)));
  assert.ok(before.some((line) => line.speaker === '走私水手' && /把账本烧了.*罐子带走/.test(line.text)));
  assert.match(after[1].text, /免费给穷人发药.*接着做.*不会算在你头上/);
  assert.equal(after[2].highlight, true);
  assert.match(after[2].text, /两百年后.*洋商刚才开的价/);
  assert.match(after[3].text, /抱起青花罐.*洋商的船/);
  assert.match(after[4].text, /青花罐.*沉进虎门海口/);
  assert.match(after[6].text, /我说了两百年后的事.*我不说/);
  assert.match(after[7].text, /不知道咱们没来会怎样.*洋商早就在拉他入伙.*他自己选的/);
  assert.ok(!HUMEN_ORIGIN_STORY.ch15_scene_righteous_seal.dialogues.some((line) => /从一开始就在藏烟膏/.test(line.text)));
  assert.ok(!Object.values(HUMEN_ORIGIN_STORY).flatMap((scene) => scene.dialogues).some((line) => /赊药|欠款|赊的药/.test(line.text)));
  const returnScene = CHAPTER16_STORY.ch16_scene_return_ruins.dialogues;
  assert.equal(returnScene[1].speaker, '{MC_NAME}');
  assert.equal(returnScene[1].highlight, true);
  assert.match(returnScene[1].text, /没穿越回虎门.*免费给穷人发药.*告诉了他未来.*跟洋商走/);
  assert.equal(returnScene[2].speaker, '{ALLY_2_NAME}');
  assert.equal(returnScene[2].highlight, true);
  assert.match(returnScene[2].text, /福寿堂后来变坏.*跟我们穿越回去有关.*洋商早就找上他了/);
});

test('福寿堂暗仓有可玩的 Tiled 战斗，胜利后才发生逃船', () => {
  const battle = CH15B_BATTLE1;
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  const tmx = readFileSync(new URL('../docs/map/tiled_project/ch15b_battle1.tmx', import.meta.url), 'utf8');
  assert.match(main, /ch15b_battle1:\s*CH15B_BATTLE1/);
  assert.equal(battle.objective.type, 'defeat_all');
  assert.ok(audioExists('bgm', battle.bgm));
  assert.equal(battle.playerDeploy.length, 7);
  assert.equal(battle.enemyDeploy.length, 6);
  assert.ok(battle.playerDeploy.some(({ unitId }) => unitId === 'father_haifeng'));
  assert.ok(!battle.enemyDeploy.some(({ enemyId }) => enemyId.includes('shopkeeper')));
  assert.ok(battle.enemyDeploy.every(({ enemyId }) => ENEMIES[enemyId]));
  assert.deepEqual([battle.tiledData.visualWidth, battle.tiledData.visualHeight], [battle.mapWidth, battle.mapHeight]);
  assert.equal(battle.tiledData.bgGrid.length, battle.mapHeight);
  assert.ok(battle.tiledData.bgGrid.every((row) => row.length === battle.mapWidth));
  assert.equal((tmx.match(/<object id=/g) || []).length, 13);
  const spawns = [...battle.playerDeploy, ...battle.enemyDeploy];
  assert.equal(new Set(spawns.map(({ x, y }) => `${x},${y}`)).size, spawns.length);
  assert.ok(spawns.every(({ x, y }) => x > 0 && x < battle.mapWidth - 1 && y > 0 && y < battle.mapHeight - 1));
  assert.ok(!HUMEN_ORIGIN_STORY.ch15b_scene_smuggler_storehouse.dialogues.some((line) => /沉进虎门海口/.test(line.text)));
  assert.match(HUMEN_ORIGIN_STORY.ch15b_scene_storehouse_aftermath.dialogues[0].text, /水手被打退.*账本和烟膏都保住/);
  assert.equal(HUMEN_ORIGIN_STORY.ch15b_scene_smuggler_storehouse.transition.battleId, battle.id);
  assert.equal(GameApp.prototype.describeSaveChapter({ chapterId: battle.id }), '第十七章 · 福寿堂留下的罐子');
});

test('新虎门背景与沈掌柜立绘交付后符合资源接口', {
  skip: ![storehouseBackground, storehouseBackground1x, shopkeeperArt, shopkeeperArt1x].every(assetExists)
    ? '等待美术交付虎门福寿堂暗仓和沈掌柜立绘'
    : false
}, () => {
  for (const [path, expected] of [
    [storehouseBackground, [1920, 1080]],
    [storehouseBackground1x, [960, 540]]
  ]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
  for (const [path, expected] of [[shopkeeperArt, [480, 640]], [shopkeeperArt1x, [240, 320]]]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
});

test('救出瑞怡后沿仓库内部追到钟楼，不再走旧版二次突入', () => {
  const retreat = CHAPTER17_STORY.ch17_scene_tearful_retreat;
  const arrival = CHAPTER18_STORY.ch18_scene_tower_arrival;
  assert.equal(CH17_BATTLE1.nextStorySceneOnWin, retreat.id);
  assert.match(retreat.dialogues[0].text, /仓库里.*沈家父子.*货梯上了顶楼/);
  assert.ok(retreat.dialogues.some((line) => /水警沿暗河找他/.test(line.text)));
  assert.equal(retreat.transition.targetScene, arrival.id);
  assert.match(arrival.dialogues[0].text, /楼梯.*钟楼门.*沈万廷.*沈崇礼/);
  assert.equal(arrival.transition.targetScene, CHAPTER19_STORY.ch19_scene_final_stand.id);

  const levelSelect = new LevelSelectModal({ getContext: () => ({}) });
  assert.equal(levelSelect.chapters.length, 20);
  assert.ok(!levelSelect.chapters.some((chapter) => chapter.sceneKey === 'ch18_scene_warehouse_breach'));
  assert.equal(CH18_BATTLE1.nextStorySceneOnWin, arrival.id, '旧存档仍能从旧版战斗续玩');

  const battles = {
    ch15_battle1: CH15_BATTLE1, ch15b_battle1: CH15B_BATTLE1, ch16_battle1: CH16_BATTLE1,
    ch17_battle1: CH17_BATTLE1, ch18_battle1: CH18_BATTLE1, ch19_battle1: CH19_BATTLE1
  };
  const visited = new Set();
  let sceneId = CHAPTER15_STORY.ch15_scene_time_passage.id;
  while (sceneId !== 'title_screen') {
    assert.ok(!visited.has(sceneId), `${sceneId}: 剧情形成循环`);
    visited.add(sceneId);
    const transition = scenes[sceneId]?.transition;
    assert.ok(transition, `${sceneId}: 新主线断裂`);
    sceneId = transition.targetScene || battles[transition.battleId]?.nextStorySceneOnWin;
    assert.ok(sceneId, `${scenes[sceneId]?.id}: 转场没有下一站`);
  }
  assert.ok(visited.has('ch15b_scene_missing_jar'));
  assert.ok(visited.has('ch15b_scene_storehouse_aftermath'));
  assert.ok(visited.has('ch18_scene_tower_arrival'));
  assert.ok(visited.has('ch19_scene_final_stand'));
  assert.ok(!visited.has('ch18_scene_warehouse_breach'));
  assert.ok(!visited.has('ch18_scene_teacher_stand'));
});

test('第二幕从博物馆到结局全程可达，战斗回跳与主要角色立绘正确', () => {
  const battles = Object.fromEntries([
    CH10_BATTLE1, CH11_BATTLE1, CH12_BATTLE1, CH13_BATTLE1, CH14_BATTLE1,
    CH15_BATTLE1, CH15B_BATTLE1, CH16_BATTLE1, CH17_BATTLE1, CH19_BATTLE1
  ].map((battle) => [battle.id, battle]));
  const speakerArt = new Map([
    ['{MC_NAME}', '{MC_PORTRAIT}'],
    ['{ALLY_1_NAME}', '{ALLY_1_PORTRAIT}'],
    ['{ALLY_2_NAME}', '{ALLY_2_PORTRAIT}'],
    ['老爸海峰', 'assets/art/father_haifeng_'],
    ['沈崇礼', 'assets/art/mystery_man_'],
    ['沈万廷', 'assets/art/shen_wanting_'],
    ['林则徐', 'assets/art/lin_zexu_'],
    ['福寿堂沈掌柜', 'assets/art/fushoutang_shopkeeper_'],
    ['走私水手', 'assets/art/foreign_sailor_'],
    ['覃瑞怡', 'assets/art/qinruiyi_'],
    ['张希哲', 'assets/art/zhangxizhe_'],
    ['徐老师', 'assets/art/teacher_xu_'],
    ['语文刘老师', 'assets/art/adult_liu_']
  ]);
  const visited = new Set();
  const fought = new Set();
  let sceneId = CHAPTER10_STORY.ch10_scene_museum_meet.id;
  while (sceneId !== 'title_screen') {
    assert.ok(!visited.has(sceneId), `${sceneId}: 主线重复或形成循环`);
    const scene = scenes[sceneId];
    assert.ok(scene, `${sceneId}: 场景未注册`);
    visited.add(sceneId);
    assert.equal(new Set(scene.dialogues.map((line) => line.id)).size, scene.dialogues.length, `${sceneId}: 对白 ID 重复`);
    for (const line of scene.dialogues) {
      for (const portrait of [line.leftPortrait, line.rightPortrait]) {
        if (portrait?.startsWith('assets/')) {
          assert.ok(assetExists(portrait), `${sceneId} #${line.id}: 立绘缺失 ${portrait}`);
        }
      }
      const expected = speakerArt.get(line.speaker);
      if (expected) {
        const activePortrait = line.activeSide === 'right' ? line.rightPortrait : line.leftPortrait;
        assert.ok(activePortrait?.startsWith(expected), `${sceneId} #${line.id}: ${line.speaker}说话却显示${activePortrait}`);
      }
    }
    const { targetScene, battleId } = scene.transition;
    if (battleId) {
      const battle = battles[battleId];
      assert.ok(battle, `${sceneId}: 战斗未注册 ${battleId}`);
      assert.ok(audioExists('bgm', battle.bgm), `${battleId}: 战斗音乐缺失`);
      const units = [...battle.playerDeploy, ...battle.enemyDeploy];
      assert.ok(battle.playerDeploy.length > 0 && battle.enemyDeploy.length > 0, `${battleId}: 缺少参战单位`);
      assert.ok(battle.enemyDeploy.every(({ enemyId }) => ENEMIES[enemyId]), `${battleId}: 敌人 ID 未注册`);
      assert.ok(units.every(({ x, y }) => x >= 0 && x < battle.mapWidth && y >= 0 && y < battle.mapHeight),
        `${battleId}: 单位出生点越界`);
      assert.equal(new Set(units.map(({ x, y }) => `${x},${y}`)).size, units.length, `${battleId}: 单位出生点重叠`);
      fought.add(battleId);
      sceneId = battle.nextStorySceneOnWin;
    } else {
      sceneId = targetScene;
    }
    assert.ok(sceneId, `${scene.id}: 转场没有下一站`);
  }
  const chapters = new LevelSelectModal({ getContext: () => ({}) }).chapters.filter((chapter) => chapter.act === 2);
  assert.equal(chapters.length, 10);
  for (const chapter of chapters) assert.ok(visited.has(chapter.sceneKey), `${chapter.title}: 章节入口未经过`);
  assert.equal(fought.size, 10, '第二幕每章都有一场主线战斗');
  assert.ok(!visited.has('ch18_scene_warehouse_breach'), '不再走旧版二次突入');
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
