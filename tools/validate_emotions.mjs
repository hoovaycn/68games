import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ART_EMOTION_FILES } from '../src/engine/avatar.js';

// 与 main.js 的 actorRefs 完全一致的占位符展开（男女两条线）
const ACTOR_REFS = {
  '{MC}': ['zhangzixiao', 'shiyunuo'],
  '{MC}-corrupted': ['zhangzixiao-corrupted', 'shiyunuo-corrupted'],
  '{MC_ADULT}': ['zhangzixiao-adult', 'shiyunuo-adult'],
  '{MC_ADULT}-dissolve': ['zhangzixiao-adult-dissolve', 'shiyunuo-adult-dissolve'],
  '{MC_ADULT}-gold': ['zhangzixiao-adult-gold', 'shiyunuo-adult-gold'],
  '{ALLY_1}': ['zhanghanyu', 'chenpinxuan'],
  '{ALLY_1}-corrupted': ['zhanghanyu-corrupted', 'chenpinxuan-corrupted'],
  '{ALLY_2}': ['fanwenmo', 'heyanxi'],
  '{ALLY_2}-corrupted': ['fanwenmo-corrupted', 'heyanxi-corrupted'],
  '{ALLY_2_ADULT}': ['fanwenmo-adult', 'heyanxi-adult'],
  '{ALLY_2_ADULT}-dissolve': ['fanwenmo-adult-dissolve', 'heyanxi-adult-dissolve'],
  '{ALLY_2_ADULT}-gold': ['fanwenmo-adult-gold', 'heyanxi-adult-gold'],
};

const FILES = [
  'story_prologue.js',
  'story_chapter1.js', 'story_chapter2.js', 'story_chapter3.js', 'story_chapter4.js', 'story_chapter5.js',
  'story_chapter6.js', 'story_chapter7.js', 'story_chapter8.js', 'story_chapter9.js',
  'story_chapter10.js', 'story_chapter11.js', 'story_chapter12.js', 'story_chapter13.js', 'story_chapter14.js',
  'story_chapter15.js', 'story_humen_origin.js', 'story_chapter16.js', 'story_chapter17.js', 'story_chapter18.js', 'story_chapter19.js',
  'story_chapter21.js', 'story_chapter22.js', 'story_chapter23.js', 'story_chapter24.js', 'story_chapter25.js',
  'story_chapter26.js', 'story_chapter27.js', 'story_chapter28.js', 'story_chapter29.js', 'story_chapter30.js'
];

const DATA_DIR = path.resolve('src/data');
const issues = [];
const stats = { dialogues: 0, nonDefault: 0, illegal: 0, unknown: 0 };

function checkPortraitEmotion(portrait, emotion) {
  if (!portrait || portrait === 'null' || portrait === null) return null;
  if (!emotion || emotion === 'default') return null;
  const actors = ACTOR_REFS[portrait] || [portrait];
  const probs = [];
  for (const actor of actors) {
    const map = ART_EMOTION_FILES[actor];
    if (!map) {
      probs.push(`未知角色/形象「${actor}」`);
      continue;
    }
    if (!map[emotion]) {
      probs.push(`角色「${actor}」无情绪「${emotion}」(可用: ${Object.keys(map).join('/')})`);
    }
  }
  return probs.length ? probs : null;
}

for (const file of FILES) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) { issues.push(`${file}: 文件不存在`); continue; }
  const mod = await import(pathToFileURL(filePath).href + '?t=' + Date.now());
  const story = Object.values(mod).find(v => v && typeof v === 'object' && !Array.isArray(v));
  if (!story) { issues.push(`${file}: 未找到导出的剧情对象`); continue; }

  for (const [sceneId, scene] of Object.entries(story)) {
    if (!scene || !Array.isArray(scene.dialogues)) continue;
    scene.dialogues.forEach((dlg, idx) => {
      stats.dialogues++;
      for (const side of ['left', 'right']) {
        const portrait = dlg[side + 'Portrait'];
        const emotion = dlg[side + 'Emotion'];
        if (!portrait || portrait === 'null' || portrait === null) continue;
        if (emotion && emotion !== 'default') stats.nonDefault++;
        const probs = checkPortraitEmotion(portrait, emotion);
        if (probs) {
          for (const p of probs) {
            issues.push(`${file} :: ${sceneId} #${dlg.id ?? idx + 1} [${dlg.speaker}] ${side}(${portrait}.${emotion || 'default'}) => ${p}`);
            if (p.startsWith('未知')) stats.unknown++; else stats.illegal++;
          }
        }
      }
    });
  }
}

console.log(`\n=== 全剧立绘表情合法性校验 ===`);
console.log(`对白节点: ${stats.dialogues} | 非 default 情绪引用: ${stats.nonDefault}`);
console.log(`非法情绪(回退default): ${stats.illegal} | 未知角色(画占位框): ${stats.unknown}\n`);
if (issues.length) {
  console.log(issues.join('\n'));
  console.log(`\n共 ${issues.length} 处问题`);
} else {
  console.log('全部合法，无问题。');
}
