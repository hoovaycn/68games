// 校验工具：① 映射表里每个 basename 是否真实存在；② story 里每个立绘引用能否解析到存在的图片。
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ART_EMOTION_FILES, artForEmotion } from '../src/engine/avatar.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ART_DIR = join(ROOT, 'assets/art');
const DATA_DIR = join(ROOT, 'src/data');

const refs = {
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
  '{ALLY_2_ADULT}-gold': ['fanwenmo-adult-gold', 'heyanxi-adult-gold']
};

let problems = 0;
const report = (msg) => { problems++; console.log('  ✗ ' + msg); };

// ① 映射表 basename 全部存在
for (const [actor, emotions] of Object.entries(ART_EMOTION_FILES)) {
  for (const [emotion, base] of Object.entries(emotions)) {
    const f = join(ART_DIR, base + '@2x.png');
    if (!existsSync(f)) report(`映射表缺文件: ${actor}.${emotion} -> ${base}@2x.png`);
  }
}

// ② story 引用可解析
const files = readdirSync(DATA_DIR).filter((f) => /^story_.*\.js$/.test(f));
const re = /(leftPortrait|rightPortrait):\s*'([^']*)'[\s\S]*?(?:leftEmotion|rightEmotion):\s*'([^']*)'/g;
// 上面跨行不可靠，改用逐行配对
const reP = /(leftPortrait|rightPortrait):\s*'([^']*)'/;
const reE = /(leftEmotion|rightEmotion):\s*'([^']*)'/;

for (const f of files) {
  const src = readFileSync(join(DATA_DIR, f), 'utf8');
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const pm = reP.exec(lines[i]);
    if (!pm) continue;
    const field = pm[1];
    const actor = pm[2];
    if (!actor || actor === 'null') continue;
    // 找紧随其后的 emotion 行
    const em = reE.exec(lines[i + 1]);
    const emotion = em ? em[2] : 'default';

    const actors = refs[actor] ?? [actor];
    for (const a of actors) {
      const url = artForEmotion(a, emotion, '2x');
      if (!url) {
        report(`${f}: ${a} 未登记（actor 或情绪缺失）(${actor}/${emotion})`);
        continue;
      }
      const p = join(ROOT, url);
      if (!existsSync(p)) report(`${f}: 解析文件不存在 ${url}`);
    }
  }
}

if (problems === 0) {
  console.log('校验通过：映射表文件齐全，story 立绘引用全部可解析。');
} else {
  console.log(`\n共 ${problems} 个问题。`);
}
