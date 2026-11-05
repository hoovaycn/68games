import fs from 'fs';
import path from 'path';

const files = [
  'story_prologue.js',
  'story_chapter1.js',
  'story_chapter2.js',
  'story_chapter3.js',
  'story_chapter4.js',
  'story_chapter5.js',
  'story_chapter6.js',
  'story_chapter7.js',
  'story_chapter8.js',
  'story_chapter9.js',
  'story_chapter10.js',
  'story_chapter11.js',
  'story_chapter12.js',
  'story_chapter13.js',
  'story_chapter14.js',
  'story_chapter15.js',
  'story_chapter16.js',
  'story_chapter17.js',
  'story_chapter18.js',
  'story_chapter19.js',
  'story_humen_origin.js'
];

let longCount = 0;
for (const f of files) {
  const filePath = path.join('e:/WorkBuddy/fx_game/src/data', f);
  const content = fs.readFileSync(filePath, 'utf8');
  // 匹配 text: '...' 或 text: "..."
  const regex = /text:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1];
    const segments = text.split('[next]');
    for (const seg of segments) {
      if (seg.length > 52) {
        longCount++;
      }
    }
  }
}

console.log(`Found ${longCount} segments longer than 52 chars across all 21 files.`);
