import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = 'src/data';
const actFiles = {
  act1: ['story_prologue.js', 'story_chapter1.js', 'story_chapter2.js', 'story_chapter3.js', 'story_chapter4.js', 'story_chapter5.js', 'story_chapter6.js', 'story_chapter7.js', 'story_chapter8.js', 'story_chapter9.js'],
  act2: ['story_chapter10.js', 'story_chapter11.js', 'story_chapter12.js', 'story_chapter13.js', 'story_chapter14.js', 'story_chapter15.js', 'story_humen_origin.js', 'story_chapter16.js', 'story_chapter17.js', 'story_chapter18.js', 'story_chapter19.js'],
  act3: ['story_chapter21.js', 'story_chapter22.js', 'story_chapter23.js', 'story_chapter24.js', 'story_chapter25.js', 'story_chapter26.js', 'story_chapter27.js', 'story_chapter28.js', 'story_chapter29.js', 'story_chapter30.js']
};

for (const [targetAct, files] of Object.entries(actFiles)) {
  let out = `=== READING ${targetAct.toUpperCase()} (${files.length} files) ===\n\n`;

  for (const f of files) {
    const filePath = path.join(DATA_DIR, f);
    if (!fs.existsSync(filePath)) {
      out += `File not found: ${f}\n`;
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    out += `\n======================================================\n`;
    out += `FILE: ${f}\n`;
    out += `======================================================\n`;
    
    const lines = content.split('\n');
    let currentScene = 'unknown';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const sMatch = line.match(/^\s*([a-zA-Z0-9_]+):\s*\{\s*(?:\/\/.*)?$/);
      if (sMatch && !['transition', 'dialogues', 'male', 'female'].includes(sMatch[1])) {
        currentScene = sMatch[1];
      }
      const titleMatch = line.match(/title:\s*['"]([^'"]+)['"]/);
      if (titleMatch) {
        out += `\n--- Scene [${currentScene}] ${titleMatch[1]} ---\n`;
      }
      const idMatch = line.match(/id:\s*(\d+),/);
      if (idMatch && lines[i+1] && lines[i+1].includes('speaker:')) {
        const dId = idMatch[1];
        let speaker = '';
        let lp = '', le = '', rp = '', re = '', text = '';
        for (let j = i; j < Math.min(i + 15, lines.length); j++) {
          const sm = lines[j].match(/speaker:\s*['"]([^'"]+)['"]/);
          if (sm) speaker = sm[1];
          const lpm = lines[j].match(/leftPortrait:\s*['"]?([^'",\s]+)['"]?/);
          if (lpm) lp = lpm[1];
          const lem = lines[j].match(/leftEmotion:\s*['"]([^'"]+)['"]/);
          if (lem) le = lem[1];
          const rpm = lines[j].match(/rightPortrait:\s*['"]?([^'",\s]+)['"]?/);
          if (rpm) rp = rpm[1];
          const rem = lines[j].match(/rightEmotion:\s*['"]([^'"]+)['"]/);
          if (rem) re = rem[1];
          const tm = lines[j].match(/text:\s*['"]([^'"]+)['"]/);
          if (tm) text = tm[1];
          if (lines[j].includes('}') && lines[j].trim() === '},') break;
        }
        out += `  #${dId} [${speaker}] (L:${lp}.${le || 'def'} | R:${rp}.${re || 'def'})\n`;
        out += `     "${text}"\n`;
      }
    }
  }
  fs.writeFileSync(`tools/${targetAct}_dump.txt`, out, 'utf8');
  console.log(`Saved tools/${targetAct}_dump.txt, size: ${out.length}`);
}
