import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { CHAPTER5_STORY } from '../src/data/story_chapter5.js';
import { CHAPTER6_STORY } from '../src/data/story_chapter6.js';
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
import { KEY_ITEMS } from '../src/data/goods/key_items.js';
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
const radioBackground = 'assets/backgrounds/bg_safahouse_radio@2x.png';
const radioBackground1x = 'assets/backgrounds/bg_safahouse_radio.png';
const staffBackground = 'assets/backgrounds/bg_humen_righteous_staff@2x.png';
const staffBackground1x = 'assets/backgrounds/bg_humen_righteous_staff.png';
const staffSacrificeBackground = 'assets/backgrounds/bg_clocktower_staff_sacrifice@2x.png';
const staffSacrificeBackground1x = 'assets/backgrounds/bg_clocktower_staff_sacrifice.png';
const nightSafehouseBackground = 'assets/backgrounds/bg_safahouse_shelter_night@2x.png';
const nightSafehouseBackground1x = 'assets/backgrounds/bg_safahouse_shelter_night.png';
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

test('安全屋三张照片依次说明父子身份，老师到场后再指认阿瑶旧事', () => {
  const reveal = CHAPTER13_STORY.ch13_scene_safahouse;
  const teachers = CHAPTER13_STORY.ch13_scene_teachers_arrive;
  const references = [
    'assets/art/mystery_man_corrupted@2x.png',
    'assets/art/mystery_man_default@2x.png',
    'assets/art/shen_wanting_old@2x.png'
  ];
  assert.ok(references.every(assetExists));
  const artBrief = readFileSync(new URL('../docs/art_shen_family_caseboard_requirement.md', import.meta.url), 'utf8');
  assert.ok(references.every((path) => artBrief.includes(path)));
  assert.ok(references.every((path, index) => index === 0 || artBrief.indexOf(references[index - 1]) < artBrief.indexOf(path)));
  assert.equal(reveal.transition.targetScene, teachers.id);
  assert.ok(reveal.dialogues.some((line) => line.hidePortraits && /中间.*二十年前.*右边.*他/.test(line.text)));
  assert.ok(teachers.dialogues.some((line) => line.speaker === '语文刘老师'
    && line.hidePortraits && /旧照片.*沈万廷.*阿瑶/.test(line.text)));
  assert.ok(teachers.dialogues.some((line) => line.speaker === '徐老师'
    && line.hidePortraits && /这张脸二十年.*老人照/.test(line.text)));
  assert.ok(!reveal.dialogues.some((line) => /阿瑶/.test(line.text)));
  for (const scene of [reveal, teachers]) {
    assert.ok(assetExists(scene.bgImgFallback));
    assert.ok(scene.dialogues.filter((line) => line.hidePortraits)
      .every((line) => line.bgImg === 'assets/backgrounds/bg_shen_family_caseboard@2x.png'));
  }
});

test('进入破碎展柜场景时播放玻璃碎裂音效', () => {
  const crisis = CHAPTER10_STORY.ch10_scene_crisis;
  assert.match(crisis.dialogues[0].text, /主展柜的玻璃碎了一地/);
  assert.equal(crisis.dialogues[0].sfx, 'sfx_glass_shatter');
  assert.ok(audioExists('sfx', crisis.dialogues[0].sfx));
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

test('海峰换上战术服后孩子吐槽旧造型，随后才继续讲案情', () => {
  const lines = CHAPTER13_STORY.ch13_scene_safahouse.dialogues;
  const uniform = lines.findIndex((line) => line.text.includes('换上一身笔挺深蓝特警战术服'));
  const joke = lines[uniform + 1];
  assert.ok(uniform >= 0);
  assert.equal(joke.speaker, '{ALLY_2_NAME}');
  assert.equal(joke.leftPortrait, '{ALLY_2_PORTRAIT}');
  assert.equal(joke.rightPortrait, 'assets/art/father_haifeng_police@2x.png');
  assert.match(joke.text, /墨镜金链子.*学生证/);
  assert.match(lines[uniform + 2].text, /^少贫。博物馆古罐/);
});

test('第二幕剧情转场与已交付背景资源均可用', () => {
  for (const [id, scene] of Object.entries(scenes)) {
    assert.equal(scene.id, id);
    if (id === 'ch15_scene_time_passage' || id === 'ch19_scene_dawn_epilogue'
      || id === 'ch15b_scene_smuggler_storehouse' || id === 'ch19_scene_radio_signal') {
      assert.equal(
        scene.bgImg,
        id === 'ch15_scene_time_passage' ? passageBackground
          : id === 'ch19_scene_dawn_epilogue' ? dawnBackground
            : id === 'ch19_scene_radio_signal' ? radioBackground : storehouseBackground,
        `${id}: 背景资源合同不符`
      );
      if (id === 'ch19_scene_radio_signal') {
        assert.ok(assetExists(scene.bgImgFallback), `${id}: 缺少交付前的后备背景`);
      }
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
  const bossLines = finalStand.dialogues.filter((line) => line.speaker === '巨魔');
  assert.equal(bossLines.length, 2, '巨魔现身后应亲自开口威胁');
  assert.ok(bossLines.every((line) => line.leftPortrait === bossArt && line.activeSide === 'left'));
  assert.ok(bossLines.every((line) => finalStand.dialogues.indexOf(line) > bossIndex));
  assert.match(bossLines[0].text, /沈万廷的声音/, '巨魔的声音应与沈万廷的操纵关系一致');
  assert.equal(CH19_BATTLE1.bgm, 'bgm_retro_level3');
  assert.ok(finalStand.dialogues.some((line) => line.speaker === '沈崇礼'));
  assert.ok(['boss_colossus', 'shen_wanting', 'shen_chongli']
    .every((id) => CH19_BATTLE1.enemyDeploy.some((enemy) => enemy.enemyId === id)));
  assert.equal(ENEMIES.shen_wanting.name, '沈万廷');
  assert.ok(aftermath.dialogues.some((line) => /核心碎了.*沈万廷.*沈崇礼/.test(line.text)));
  assert.ok(CHAPTER19_STORY.ch19_scene_miracle_reunion.dialogues.some((line) => /带走了沈家父子/.test(line.text)));
});

test('终战前巨魔先震慑队伍，六名队员各自回应后才开战', () => {
  const scene = CHAPTER19_STORY.ch19_scene_final_stand;
  const lines = scene.dialogues;
  const impact = lines.findIndex((line) => line.speaker === '系统提示' && /巨魔一拳.*栏杆.*螺栓/.test(line.text));
  assert.ok(impact > lines.findIndex((line) => line.speaker === '巨魔'));
  const party = ['朱晏泽', '覃瑞怡', '张希哲', '{ALLY_1_NAME}', '{ALLY_2_NAME}', '{MC_NAME}'];
  const reactions = party.map((speaker) => lines.findIndex((line) => line.speaker === speaker));
  assert.ok(reactions.every((index) => index > impact), '队员要先见识巨魔的力量');
  assert.match(lines[impact + 1].text, /黑气.*举起木杖.*浩然正气.*逼得散开/);
  assert.equal(new Set(reactions).size, party.length, '六人都应有独立对白');
  assert.match(lines[reactions[0]].text, /腿都不听使唤.*真能打过/);
  assert.match(lines[reactions[1]].text, /我也怕.*药送进学校/);
  assert.match(lines[reactions[2]].text, /阀门.*绿光.*管子/);
  assert.match(lines[reactions[3]].text, /别走散.*六个.*一起下去/);
  assert.match(lines[reactions[4]].text, /警徽.*我爸.*药罐不能离开钟楼/);
  assert.equal(reactions.at(-1), lines.length - 1, '由主角收束决战前的部署');
  assert.match(lines.at(-1).text, /我也怕.*黑气碰上这根杖就散.*供气管.*浩然正气杖插进核心/);
  assert.equal(scene.transition.battleId, 'ch19_battle1');
});

test('决战后主角回应虎门旧事，再进入省厅增援场景', () => {
  const aftermath = CHAPTER19_STORY.ch19_scene_boss_destroyed;
  const lines = aftermath.dialogues;
  const first = lines.findIndex((line) => line.speaker === '{MC_NAME}' && /林大人/.test(line.text));
  const second = lines.findIndex((line) => line.speaker === '{MC_NAME}' && /沈掌柜/.test(line.text));
  const support = lines.findIndex((line) => line.speaker === '张希哲');
  assert.ok(first > lines.findIndex((line) => line.speaker === '沈崇礼'));
  assert.ok(second > first && support > second);
  assert.ok(lines.slice(first, second + 1).every((line) => line.leftPortrait === '{MC_PORTRAIT}' && line.highlight));
  assert.match(lines[first].text, /别停下.*没能送进学校.*没白毁/);
  assert.match(lines[second].text, /免费发药.*青花罐.*洋商的船.*拦下/);
  assert.equal(aftermath.transition.targetScene, 'ch19_scene_miracle_reunion');
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
  assert.equal(aftermath.dialogues[1].bgImg, staffSacrificeBackground);
  assert.equal(aftermath.bgImgFallback, stormBackground);
  assert.equal(aftermath.dialogues[2].bgImg, undefined);
  assert.equal(aftermath.dialogues[2].bgm, 'bgm_victory');
  assert.equal(aftermath.bgImg, normalBackground);
  assert.match(aftermath.dialogues[2].text, /乌云.*阳光重新照进钟楼/);
});

test('浩然正气杖随核心碎裂，失去提示在特写看完后出现', () => {
  const lines = CHAPTER19_STORY.ch19_scene_boss_destroyed.dialogues;
  const sacrifice = lines[1];
  assert.match(lines[0].text, /浩然正气杖插进.*核心/);
  assert.match(sacrifice.text, /浩然正气杖.*核心裂开.*木杖.*碎屑.*四个金字/);
  assert.match(sacrifice.text, /金光压住核心.*黑气/);
  assert.deepEqual(sacrifice.itemEvent, { itemId: 'righteous_staff', action: 'lose' });
  assert.equal(sacrifice.hidePortraits, true);
  assert.match(lines[2].text, /核心碎了.*巨魔塌成满地废铁/);
  assert.match(lines.find((line) => line.speaker === '{MC_NAME}').text, /木屑.*杖留在这里了/);
  assert.doesNotMatch(lines.slice(2).map((line) => line.text).join('\n'), /握紧浩然正气杖/);
  const brief = readFileSync(new URL('../docs/art_clocktower_staff_sacrifice_requirement.md', import.meta.url), 'utf8');
  assert.ok(brief.includes(staffSacrificeBackground));
  assert.ok(brief.includes(staffBackground));
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

test('结局先交代每个人的去向，等人散去才切到安全屋密电', () => {
  const reunion = CHAPTER19_STORY.ch19_scene_miracle_reunion;
  const dawn = CHAPTER19_STORY.ch19_scene_dawn_epilogue;
  const radio = CHAPTER19_STORY.ch19_scene_radio_signal;
  assert.match(reunion.transition.prompt, /海峰.*走出货栈.*运河岸边/);
  assert.equal(dawn.bgImg, dawnBackground);
  assert.equal(dawn.bgm, 'bgm_childhood');
  assert.match(dawn.dialogues[0].text, /运河岸边.*晨光/);
  const speakers = [
    '{MC_NAME}', '{ALLY_1_NAME}', '{ALLY_2_NAME}',
    '张希哲', '覃瑞怡', '朱晏泽', '徐老师', '语文刘老师', '老爸海峰'
  ];
  for (const speaker of speakers) {
    assert.ok(dawn.dialogues.some((line) => line.speaker === speaker),
      `尾声缺少${speaker}的对白`);
  }
  const departure = dawn.dialogues.findIndex((line) => /救护车开走/.test(line.text));
  assert.ok(dawn.dialogues.findIndex((line) => line.speaker === '老爸海峰') < departure);
  assert.ok(dawn.dialogues.findIndex((line) => line.speaker === '语文刘老师') > departure);
  assert.ok(dawn.dialogues.findIndex((line) => line.speaker === '朱晏泽') < dawn.dialogues.length - 1);
  assert.match(dawn.dialogues.find((line) => line.speaker === '老爸海峰').text, /养伤.*回家/);
  assert.match(dawn.dialogues.find((line) => line.speaker === '徐老师').text, /送你们回家.*学校/);
  assert.match(dawn.dialogues.find((line) => line.speaker === '语文刘老师').text, /回学校批卷子/);
  assert.match(dawn.dialogues.find((line) => line.speaker === '朱晏泽').text, /回家开一局.*打游戏/);
  const spoken = dawn.dialogues.filter((line) => line.speaker !== '系统提示');
  assert.equal(spoken.filter((line) => line.speaker === '{MC_NAME}').length, 1,
    '主角要等大家说完才开口');
  assert.equal(spoken.at(-1).speaker, '{MC_NAME}', '最后发言的人应是主角');
  assert.match(spoken.at(-1).text, /昨晚.*天亮.*作业.*游戏.*早饭.*回家.*校门口见/);
  assert.equal(spoken.at(-1).highlight, true);
  assert.ok(dawn.dialogues.some((line) => /数学作业还是拦不住/.test(line.text)));
  assert.ok(dawn.dialogues.some((line) => /手柄没鞋带/.test(line.text)));
  assert.match(dawn.dialogues.at(-1).text, /警车.*辖区.*早餐铺.*河岸渐渐空下来/);
  assert.ok(dawn.dialogues.every((line) => !/卫星|三号船|新名单/.test(line.text)),
    '告别场景不应提前泄露密电钩子');
  assert.deepEqual(dawn.dialogues.map((line) => line.id),
    dawn.dialogues.map((_, index) => index + 1));
  assert.equal(dawn.transition.targetScene, radio.id);
  assert.equal(radio.bgImg, radioBackground);
  assert.equal(radio.bgm, 'bgm_suspense');
  assert.match(radio.dialogues[0].text, /当天下午.*城北安全屋.*值班警员/);
  assert.match(radio.dialogues[2].text, /三号船.*名单/);
  assert.equal(radio.dialogues[2].highlight, true);
  assert.doesNotMatch(radio.dialogues[2].text, /新的试验.*开始|你没完成的事/);
  assert.match(radio.dialogues.at(-1).text, /第三幕.*敬请期待/);
  assert.equal(radio.dialogues.at(-1).highlight, true);
  assert.equal(radio.transition.targetScene, 'title_screen');
});

test('老师在钟楼报海峰平安，众人下到一楼大厅才见到担架', () => {
  const aftermath = CHAPTER19_STORY.ch19_scene_boss_destroyed;
  const reunion = CHAPTER19_STORY.ch19_scene_miracle_reunion;
  const grandHall = 'assets/backgrounds/bg_warehouse_grand_hall@2x.png';
  assert.equal(CHAPTER18_STORY.ch18_scene_teacher_stand.bgImg, grandHall);
  assert.match(aftermath.dialogues.at(-1).text, /沿楼梯赶上来.*海峰.*一楼大厅.*跟我们下去/);
  assert.match(aftermath.transition.prompt, /沿螺旋楼梯下到一楼/);
  assert.match(aftermath.transition.buttonText, /跟老师下楼/);
  assert.equal(reunion.bgImg, grandHall);
  assert.ok(assetExists(grandHall));
  assert.equal(reunion.bgm, 'bgm_childhood');
  assert.match(reunion.dialogues[0].text, /下到一楼大厅.*带走了沈家父子.*大厅门口.*担架.*海峰/);
  assert.doesNotMatch(reunion.dialogues.map((line) => line.text).join('\n'), /把海峰抬上钟楼/);
  assert.match(reunion.transition.buttonText, /走出货栈/);
  assert.equal(reunion.transition.targetScene, 'ch19_scene_dawn_epilogue');
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
  app.handleSceneTransition(CHAPTER19_STORY.ch19_scene_radio_signal.transition);
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

test('美术交付后安全屋无线电特写双尺寸符合接口', {
  skip: !assetExists(radioBackground) || !assetExists(radioBackground1x)
    ? '等待美术交付安全屋无线电特写'
    : false
}, () => {
  for (const [path, expected] of [
    [radioBackground, [1920, 1080]],
    [radioBackground1x, [960, 540]]
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

test('美术交付后浩然正气杖特写两版均为指定尺寸', {
  skip: !assetExists(staffBackground) || !assetExists(staffBackground1x)
    ? '等待美术交付浩然正气杖特写背景'
    : false
}, () => {
  for (const [path, expected] of [
    [staffBackground, [1920, 1080]],
    [staffBackground1x, [960, 540]]
  ]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
});

test('美术交付后终战断杖特写两版均为指定尺寸', {
  skip: !assetExists(staffSacrificeBackground) || !assetExists(staffSacrificeBackground1x)
    ? '等待美术交付终战断杖特写'
    : false
}, () => {
  for (const [path, expected] of [
    [staffSacrificeBackground, [1920, 1080]],
    [staffSacrificeBackground1x, [960, 540]]
  ]) {
    const png = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: 不是 PNG`);
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], expected, `${path}: 尺寸不符`);
  }
});

test('美术交付后关灯安全屋两版均为指定尺寸', {
  skip: !assetExists(nightSafehouseBackground) || !assetExists(nightSafehouseBackground1x)
    ? '等待美术交付关灯安全屋背景'
    : false
}, () => {
  for (const [path, expected] of [
    [nightSafehouseBackground, [1920, 1080]],
    [nightSafehouseBackground1x, [960, 540]]
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

test('海峰说明去安全屋的原因，坐皮卡到城北后才进入防空洞场景', () => {
  const reveal = CHAPTER12_STORY.ch12_scene_badge_reveal;
  const entry = CHAPTER13_STORY.ch13_scene_safahouse;
  assert.match(reveal.dialogues.at(-1).text, /先上车.*省厅.*城北.*安全屋.*开车/);
  assert.match(reveal.transition.prompt, /皮卡.*离开后仓/);
  assert.equal(reveal.transition.targetScene, entry.id);
  assert.match(entry.dialogues[0].text, /皮卡.*旧防空洞.*证件.*铁门.*省厅安排的安全屋/);
  assert.doesNotMatch(entry.dialogues[0].text, /地窖的暗道|后仓找到的账册/);
});

test('回到安全屋后先锁杖、联络家长和关灯，天亮才发现失窃', () => {
  const boat = CHAPTER16_STORY.ch16_scene_return_ruins;
  const night = CHAPTER16_STORY.ch16_scene_safahouse_night;
  const morning = CHAPTER16_STORY.ch16_scene_betrayal_note;
  assert.equal(boat.transition.targetScene, night.id);
  assert.match(boat.dialogues.at(-1).text, /瑞怡.*没回答.*皮卡/);
  assert.doesNotMatch(boat.transition.prompt, /睡了一会儿|防爆箱被打开/);
  assert.equal(boat.transition.prompt, '皮卡就停在码头外。');
  assert.match(night.dialogues[0].text, /皮卡开回城北.*打开安全屋铁门/);
  assert.ok(night.dialogues.some((line) => /浩然正气杖.*防爆箱.*上锁.*钥匙.*口袋/.test(line.text)));
  assert.ok(night.dialogues.some((line) => /联系家长.*守住.*几户/.test(line.text)));
  assert.ok(night.dialogues.some((line) => line.speaker === '覃瑞怡' && /手机屏幕扣在桌上.*我没事/.test(line.text)));
  assert.match(night.dialogues.at(-1).text, /关了吊灯.*无线电.*覃瑞怡.*手机/);
  assert.equal(night.dialogues.at(-1).bgImg, nightSafehouseBackground);
  assert.ok(assetExists(night.bgImgFallback));
  assert.equal(night.transition.targetScene, morning.id);
  assert.match(morning.dialogues[0].text, /防爆箱.*不见了.*覃瑞怡.*不在/);
  assert.ok(morning.dialogues.some((line) => /外套里拿了钥匙.*杖是我自己拿的/.test(line.text)));
});

test('离开安全屋抵达码头时，战前对白切换为码头背景', () => {
  const scene = CHAPTER13_STORY.ch13_scene_dock_alert;
  const arrivalIndex = scene.dialogues.findIndex((line) => /众人赶到码头/.test(line.text));
  assert.ok(arrivalIndex >= 0);
  const arrival = scene.dialogues[arrivalIndex];
  assert.match(arrival.text, /众人赶到码头/);
  assert.ok(scene.dialogues.slice(arrivalIndex)
    .every((line) => line.bgImg === CHAPTER13_STORY.ch13_scene_dock_entry.bgImg));
  assert.ok(assetExists(arrival.bgImg));
  assert.equal(scene.transition.battleId, 'ch13_battle1');
});

test('驳船开炉倒计时不再误写成涨潮才能熬药', () => {
  const radio = CHAPTER13_STORY.ch13_scene_dock_alert.dialogues[0].text;
  const ship = CHAPTER14_STORY.ch14_scene_dock_ritual.dialogues
    .find((line) => line.speaker === '沈崇礼').text;
  assert.match(radio, /半小时后开炉/);
  assert.match(ship, /炉火已经烧起来了/);
  assert.doesNotMatch(`${radio}${ship}`, /涨潮|江潮/);
});

test('码头夜雨过渡到驳船晨光，先交代时间再切换背景', () => {
  const safehouse = CHAPTER13_STORY.ch13_scene_teachers_arrive;
  const dock = CHAPTER13_STORY.ch13_scene_dock_entry;
  const ship = CHAPTER14_STORY.ch14_scene_dock_ritual;
  assert.match(CHAPTER13_STORY.ch13_scene_safahouse.dialogues[0].text, /深夜十点/);
  assert.match(safehouse.dialogues.at(-1).text, /核对.*监听台.*天快亮/);
  assert.equal(safehouse.transition.targetScene, 'ch13_scene_dock_alert');
  assert.equal(dock.transition.targetScene, ship.id);
  assert.match(dock.dialogues.at(-1).text, /甲板.*沈家父子/);
  assert.equal(dock.bgImg, 'assets/backgrounds/bg_canal_dock_storm@2x.png');
  assert.equal(ship.bgImg, 'assets/backgrounds/bg_barge_altar@2x.png');
  assert.equal(ship.dialogues[0].speaker, '系统提示');
  assert.match(ship.dialogues[0].text, /天边已经泛白.*雨势渐小.*漩涡卷开.*晨光/);
  assert.match(ship.dialogues[1].text, /沈万廷/);
  assert.equal(new Set(ship.dialogues.map((line) => line.id)).size, ship.dialogues.length);
});

test('穿越通道切到皇宫时更换威严的配乐', () => {
  assert.equal(CHAPTER15_STORY.ch15_scene_time_passage.bgm, 'bgm_eerie_revelation');
  assert.equal(CHAPTER15_STORY.ch15_scene_historic_prologue.bgm, 'bgm_gojira_battle');
  assert.equal(CHAPTER15_STORY.ch15_scene_humen_harbor_inspect.bgm, 'bgm_gojira_battle');
});

test('虎门民团教头先交代身份与守池任务，洋人水手和打手再亮相开战', () => {
  const landing = CHAPTER15_STORY.ch15_scene_beach_wake;
  const stand = CHAPTER15_STORY.ch15_scene_militia_stand;
  const sailor = stand.dialogues.find((line) => line.speaker === '洋人走私水手');
  const guide = stand.dialogues.find((line) => line.speaker === '带路的中国打手');
  const instructorLines = stand.dialogues.filter((line) => line.speaker === '虎门民团教头');
  const instructor = stand.dialogues.indexOf(instructorLines[0]);
  const challenge = stand.dialogues.indexOf(instructorLines[1]);
  const orders = stand.dialogues.indexOf(instructorLines[2]);
  assert.match(landing.dialogues.at(-1).text, /小帆船.*鸦片箱/);
  assert.equal(stand.dialogues[0].rightPortrait, 'assets/art/militia_instructor_1839@2x.png');
  assert.match(stand.dialogues[0].text, /民团教头.*鸦片箱/);
  assert.equal(instructorLines.length, 3);
  assert.match(instructorLines[0].text, /林大人.*没销毁的鸦片.*往后站.*有枪/);
  assert.match(stand.dialogues[instructor + 1].text, /海滩那头.*帮忙.*怎么守/);
  assert.equal(sailor?.leftPortrait, 'assets/art/foreign_sailor_1839@2x.png');
  assert.equal(guide?.leftPortrait, 'assets/art/comprador_assassin_1839@2x.png');
  assert.ok(instructor < stand.dialogues.indexOf(sailor) && instructor < stand.dialogues.indexOf(guide));
  assert.ok(challenge > stand.dialogues.indexOf(sailor) && challenge > stand.dialogues.indexOf(guide));
  assert.ok(orders > stand.dialogues.findIndex((line) => line.speaker === '老爸海峰'));
  assert.match(instructorLines[1].text, /先过我这一关/);
  assert.match(instructorLines[2].text, /跟紧我.*先护住人，再护住货/);
  assert.match(sailor.text, /搬回船上/);
  assert.match(guide.text, /绕过官兵/);
  assert.ok(!stand.dialogues.some((line) => /福寿堂/.test(line.text)));
  assert.equal(stand.transition.battleId, CH15_BATTLE1.id);
  assert.equal(stand.transition.unitId, 'militia_instructor');
  assert.ok(CH15_BATTLE1.enemyDeploy.some(({ enemyId }) => enemyId === 'foreign_sailor'));
  assert.ok(CH15_BATTLE1.enemyDeploy.some(({ enemyId }) => enemyId === 'comprador_assassin'));
});

test('虎门相见与木杖发光写明古今接力', () => {
  const meeting = CHAPTER15_STORY.ch15_scene_lin_commends;
  const seal = HUMEN_ORIGIN_STORY.ch15_scene_righteous_seal;
  const setup = seal.dialogues[0];
  const reveal = seal.dialogues[1];
  assert.match(meeting.dialogues[2].text, /课本.*亲眼看见.*警察、老师和普通人/);
  assert.match(meeting.dialogues[3].text, /两百年后.*没白毁/);
  assert.match(setup.text, /白灰.*遮住了上面的字/);
  assert.equal(setup.bgImg, undefined);
  assert.match(reveal.text, /白烟散开.*四个金色大字.*浩然正气.*教头.*两百年后的孩子.*被沈家毒药害过的同学/);
  assert.equal(reveal.bgImg, staffBackground);
  assert.equal(seal.bgImgFallback, seal.bgImg);
  assert.equal(reveal.revealTitle, undefined, '四个金字应直接在美术图里，而非程序叠字');
  assert.equal(reveal.hidePortraits, true);
  assert.match(seal.dialogues[2].text, /林大人.*守住.*学校.*沈家/);
  assert.equal(KEY_ITEMS.righteous_staff.name, '浩然正气杖');
  assert.match(CHAPTER19_STORY.ch19_scene_final_stand.dialogues.at(-1).text, /黑气碰上这根杖就散.*浩然正气杖插进核心/);
  assert.match(CHAPTER19_STORY.ch19_scene_boss_destroyed.dialogues[0].text, /插进.*核心.*浩然正气/);
});

test('碎罐穿越不依赖未回收的罐内金纹，回程也不由杖光触发', () => {
  const broken = CHAPTER14_STORY.ch14_scene_pot_broken.dialogues[1].text;
  const vortex = CHAPTER14_STORY.ch14_scene_vortex_entry.dialogues[0].text;
  const seal = HUMEN_ORIGIN_STORY.ch15_scene_righteous_seal.dialogues;
  const finalStand = CHAPTER19_STORY.ch19_scene_final_stand.dialogues.at(-1).text;
  assert.match(broken, /碎罐.*黑烟.*扭曲、重叠.*号子和炮声/);
  assert.match(vortex, /碎罐.*黑烟.*号子和炮声.*白光/);
  assert.match(seal.at(-1).text, /白烟.*脚下再次亮起.*白光.*现代的驳船/);
  assert.doesNotMatch([broken, vortex, seal[1].text, seal.at(-1).text, finalStand].join('\n'),
    /罐壁内侧|碎罐内壁|金色纹路|金纹|一模一样|杖上的金光照向众人脚下/);
});

test('浩然正气杖亮相后，剧情与美术需求不再使用旧称', () => {
  for (const story of [CHAPTER16_STORY, CHAPTER17_STORY, CHAPTER18_STORY, CHAPTER19_STORY]) {
    const text = Object.values(story)
      .flatMap((scene) => [...scene.dialogues.map((line) => line.text), scene.transition?.prompt || ''])
      .join('\n');
    assert.match(text, /浩然正气杖/);
    assert.doesNotMatch(text, /销烟杖|浩然销烟杖/);
  }
  for (const path of ['docs/art_act2_items_requirement.md', 'docs/art_act2_characters_requirement.md']) {
    const text = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(text, /浩然正气杖/);
    assert.doesNotMatch(text, /销烟杖|浩然销烟杖/);
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
    ch15b_scene_smuggler_storehouse: 2,
    ch16_scene_betrayal_note: 4,
    ch17_scene_alter_breach: 4,
    ch18_scene_tower_arrival: 2
  };
  for (const [sceneId, lineId] of Object.entries(hooks)) {
    assert.ok(
      scenes[sceneId].dialogues.some((line) => line.id === lineId && line.highlight),
      `${sceneId} #${lineId}: 关键对白未加重`
    );
  }
  assert.ok(CHAPTER19_STORY.ch19_scene_radio_signal.dialogues
    .some((line) => line.speaker === '卫星加密密电' && line.highlight),
  '尾声密电应使用加重样式');
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
  assert.ok(hold.dialogues.some((line) => /免费发给穷人的药材箱.*青花罐/.test(line.text)));
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
  assert.match(before[0].text, /免费发给穷人的药材箱.*青花罐/);
  assert.ok(before.some((line) => line.speaker === '福寿堂沈掌柜' && /洋商.*藏烟膏.*没答应/.test(line.text)));
  assert.ok(before.some((line) => line.speaker === '走私水手' && /铺子.*运货.*银子/.test(line.text)));
  const future = before.find((line) => /两百年后的福寿堂.*害学生/.test(line.text));
  assert.equal(future?.highlight, true);
  assert.ok(before.some((line) => line.speaker === '福寿堂沈掌柜' && /两百年后.*福寿堂/.test(line.text)));
  assert.ok(before.some((line) => line.speaker === '走私水手' && /抢回罐子和烟膏.*搬上船/.test(line.text)));
  assert.ok(!before.some((line) => /账本|查账/.test(line.text)));
  assert.match(after[1].text, /免费给穷人发药.*接着做.*不会算在你头上/);
  assert.equal(after[2].highlight, true);
  assert.match(after[2].text, /两百年后.*靠帮洋商运烟膏发财/);
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
  assert.match(battle.objective.text, /青花罐和烟膏/);
  assert.ok(audioExists('bgm', battle.bgm));
  assert.equal(battle.playerDeploy.length, 7);
  assert.equal(battle.enemyDeploy.length, 6);
  assert.ok(battle.playerDeploy.some(({ unitId }) => unitId === 'father_haifeng'));
  assert.ok(!battle.enemyDeploy.some(({ enemyId }) => enemyId.includes('shopkeeper')));
  assert.ok(battle.enemyDeploy.every(({ enemyId }) => ENEMIES[enemyId]));
  assert.deepEqual([battle.tiledData.visualWidth, battle.tiledData.visualHeight], [battle.mapWidth, battle.mapHeight]);
  assert.equal(battle.tiledData.bgGrid.length, battle.mapHeight);
  assert.ok(battle.tiledData.bgGrid.every((row) => row.length === battle.mapWidth));
  const spawnGroup = tmx.match(/<objectgroup[^>]*name="Spawns"[^>]*>[\s\S]*?<\/objectgroup>/)?.[0];
  assert.equal((spawnGroup?.match(/<object id=/g) || []).length, 13);
  const spawns = [...battle.playerDeploy, ...battle.enemyDeploy];
  assert.equal(new Set(spawns.map(({ x, y }) => `${x},${y}`)).size, spawns.length);
  assert.ok(spawns.every(({ x, y }) => x > 0 && x < battle.mapWidth - 1 && y > 0 && y < battle.mapHeight - 1));
  assert.ok(!HUMEN_ORIGIN_STORY.ch15b_scene_smuggler_storehouse.dialogues.some((line) => /沉进虎门海口/.test(line.text)));
  assert.match(HUMEN_ORIGIN_STORY.ch15b_scene_storehouse_aftermath.dialogues[0].text, /水手被打退.*搬走烟膏.*青花罐/);
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
    ['洋人走私水手', 'assets/art/foreign_sailor_'],
    ['带路的中国打手', 'assets/art/comprador_assassin_'],
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

test('石桥塌落后切至暗河与维修楼梯画面，战前保持同一空间', () => {
  const scene = CHAPTER17_STORY.ch17_scene_father_shield;
  const lines = scene.dialogues;
  const collapse = lines.findIndex((line) => line.id === 6);
  const background = 'assets/backgrounds/bg_warehouse_collapsed_bridge@2x.png';
  assert.ok(collapse > 0);
  assert.ok(lines.slice(0, collapse).every((line) => !line.bgImg));
  assert.ok(lines.slice(collapse).every((line) => line.bgImg === background));
  assert.equal(scene.bgImgFallback, scene.bgImg);
  assert.ok(assetExists(scene.bgImgFallback));
  assert.equal(CHAPTER17_STORY.ch17_scene_tearful_retreat.bgImg,
    'assets/backgrounds/bg_warehouse_grand_hall@2x.png');
  const brief = readFileSync(new URL('../docs/art_warehouse_collapsed_bridge_requirement.md', import.meta.url), 'utf8');
  assert.ok(brief.includes(background));
  assert.ok(brief.includes('bg_warehouse_poison_altar@2x.png'));
});

test('第二幕全部战斗前，实际参战敌人均有立绘和当面喊话', () => {
  const expected = new Map([
    ['ch10_scene_confrontation', [['沈家护卫', 'shen_guard_default'], ['重点班学生', 'senior_athlete_corrupted']]],
    ['ch11_scene_confrontation', [['二秃子', 'punk_default'], ['沈家护卫', 'shen_guard_default']]],
    ['ch12_scene_hero_entry', [['黑衣死士头领', 'berserker_guard_heavy'], ['沈家护卫', 'shen_guard_default']]],
    ['ch13_scene_dock_alert', [['码头护卫头目', 'berserker_guard_heavy'], ['沈家护卫', 'shen_guard_default'], ['码头打手', 'punk_default']]],
    ['ch14_scene_pot_broken', [['沈崇礼', 'mystery_man_corrupted'], ['沈家护卫', 'shen_guard_default'], ['重装护卫', 'berserker_guard_heavy']]],
    ['ch15_scene_militia_stand', [['洋人走私水手', 'foreign_sailor_1839'], ['带路的中国打手', 'comprador_assassin_1839']]],
    ['ch15b_scene_smuggler_storehouse', [['走私水手', 'foreign_sailor_1839'], ['带路的中国打手', 'comprador_assassin_1839']]],
    ['ch16_scene_rainy_chase', [['沈氏死士头目', 'berserker_guard_heavy'], ['沈家护卫', 'shen_guard_default']]],
    ['ch17_scene_father_shield', [['重装守卫', 'berserker_guard_heavy'], ['沈家护卫', 'shen_guard_default']]],
    ['ch18_scene_teacher_stand', [['重装守卫', 'berserker_guard_heavy'], ['沈家护卫', 'shen_guard_default'], ['沈崇礼', 'mystery_man_corrupted']]],
    ['ch19_scene_final_stand', [['沈万廷', 'shen_wanting_old'], ['沈崇礼', 'mystery_man_corrupted'], ['巨魔', 'boss_colossus_opium_god']]]
  ]);
  const encounters = Object.values(scenes).filter((scene) => scene.transition?.battleId);
  assert.equal(encounters.length, expected.size, '所有主线和旧存档战斗都应纳入检查');
  for (const scene of encounters) {
    const opponents = expected.get(scene.id);
    assert.ok(opponents, `${scene.id}: 未登记战前对手`);
    assert.ok(scene.dialogues.length >= 4, `${scene.id}: 战前铺垫过短`);
    assert.equal(new Set(scene.dialogues.map((line) => line.id)).size, scene.dialogues.length, `${scene.id}: 对白 ID 重复`);
    for (const [speaker, art] of opponents) {
      const line = scene.dialogues.find((entry) => entry.speaker === speaker
        && (entry.activeSide === 'right' ? entry.rightPortrait : entry.leftPortrait) === `assets/art/${art}@2x.png`);
      assert.ok(line, `${scene.id}: ${speaker} 未带正确立绘当面开口`);
      assert.ok(line.text.length >= 12, `${scene.id}: ${speaker} 没说清楚意图`);
      assert.ok(assetExists(`assets/art/${art}@2x.png`));
    }
  }
  const dock = CHAPTER13_STORY.ch13_scene_dock_alert.dialogues;
  assert.ok(dock.slice(-4).every((line) => line.bgImg === CHAPTER13_STORY.ch13_scene_dock_entry.bgImg),
    '抵达码头后的连续对白不能切回安全屋');
});

test('瑞怡受胁迫的前因、威胁及回收均写明', () => {
  const meeting = CHAPTER5_STORY.ch5_scene_parent_meeting.dialogues;
  const collapse = CHAPTER6_STORY.ch6_scene_corridor.dialogues;
  const leadIn = CHAPTER13_STORY.ch13_scene_dock_alert.dialogues;
  const returnScene = CHAPTER16_STORY.ch16_scene_return_ruins.dialogues;
  const note = CHAPTER16_STORY.ch16_scene_betrayal_note.dialogues;
  const rescue = CHAPTER17_STORY.ch17_scene_alter_breach.dialogues;
  assert.ok(meeting.some((line) => /领药登记表.*姓名、住址和电话/.test(line.text)));
  assert.ok(collapse.some((line) => /免费补送.*家庭住址/.test(line.text)));
  assert.ok(leadIn.some((line) => /上次家长会.*领药登记.*住址和电话/.test(line.text)));
  assert.ok(leadIn.some((line) => /大溃败.*家长带回去.*免费补送.*登记表送上门/.test(line.text)));
  assert.ok(!leadIn.some((line) => /借着基金会赞助学校活动/.test(line.text)));
  assert.ok(returnScene.some((line) => /手机.*住址/.test(line.text)));
  assert.ok(note.some((line) => /江心旧水闸.*按地址抓同学试药/.test(line.text)));
  assert.ok(!note.some((line) => /小敏|手术捐款|资料公开/.test(line.text)));
  assert.ok(rescue.some((line) => /家庭联系表/.test(line.text)));
});
