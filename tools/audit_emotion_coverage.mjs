/**
 * 情绪差分立绘覆盖率审计（一次性工具，不提交入库）。
 * 扫描 src/data 下所有 story_*.js 剧情脚本，提取每个 (portrait, emotion) 组合，
 * 与 avatar.js 的 ART_EMOTION_FILES 映射表对比，输出「剧情用到但缺图」的清单。
 *
 * 用法：node tools/audit_emotion_coverage.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ART_EMOTION_FILES } from '../src/engine/avatar.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, 'src/data');

// 剧情脚本里的占位符 → 男线 / 女线两个真实角色
const PLACEHOLDERS = {
  '{MC}': ['zhangzixiao', 'shiyunuo'],
  '{MC_ADULT}': ['zhangzixiao-adult', 'shiyunuo-adult'],
  '{ALLY_1}': ['zhanghanyu', 'chenpinxuan'],
  '{ALLY_2}': ['fanwenmo', 'heyanxi'],
  '{ALLY_2_ADULT}': ['fanwenmo-adult', 'heyanxi-adult']
};

const files = readdirSync(dataDir).filter(f => f.startsWith('story_') && f.endsWith('.js'));

const used = new Map();     // actor -> Set<emotion>（剧情实际用到）
const missing = new Map();  // actor -> Set<emotion>（用到但映射表无图）

function record(actor, emotion) {
  if (!actor || actor.includes('/')) return; // 完整路径直出，不走情绪映射
  const emo = emotion || 'default';
  for (const a of (PLACEHOLDERS[actor] || [actor])) {
    if (!used.has(a)) used.set(a, new Set());
    used.get(a).add(emo);
    const map = ART_EMOTION_FILES[a];
    if (!map || !map[emo]) {
      if (!missing.has(a)) missing.set(a, new Set());
      missing.get(a).add(emo);
    }
  }
}

for (const file of files) {
  const text = readFileSync(join(dataDir, file), 'utf8');
  // left/right 成对匹配：leftPortrait ... leftEmotion（backreference \1 保证同侧）
  const re = /(left|right)Portrait:\s*'([^']*)'[\s\S]{0,140}?\1Emotion:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    record(m[2], m[3]);
  }
}

const emoLabel = {
  frown: '皱眉/敌意',
  cry: '哭泣/悲伤',
  awkward: '尴尬',
  smile: '微笑',
  shock: '惊讶',
  default: '默认'
};

console.log('=== 剧情用到但缺失的情绪差分图（按角色）===');
const rows = [];
for (const [actor, emos] of [...missing.entries()].sort()) {
  const list = [...emos].sort();
  rows.push([actor, list.join(', ')]);
  console.log(`${actor}: ${list.map(e => `${e}(${emoLabel[e] || e})`).join('、')}`);
}

console.log('\n=== 仅三类高频情绪（frown/cry/awkward）缺失清单 ===');
for (const [actor, emos] of [...missing.entries()].sort()) {
  const high = [...emos].filter(e => ['frown', 'cry', 'awkward'].includes(e)).sort();
  if (high.length) console.log(`${actor}: ${high.join(', ')}`);
}

console.log('\n=== 全部角色已登记情绪（供核对）===');
for (const [actor, emos] of [...used.entries()].sort()) {
  console.log(`${actor}: ${[...emos].sort().join(', ')}`);
}
