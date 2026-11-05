import fs from 'fs';
import path from 'path';

const actFiles = [
  'story_prologue.js',
  ...Array.from({length: 19}, (_, i) => `story_chapter${i+1}.js`),
  'story_humen_origin.js'
];

const targetActors = [
  'zhangzixiao', 'shiyunuo', 'fanwenmo', 'heyanxi',
  'qinruiyi', 'zhangxizhe', 'zhuyanze', 'teacher_xu', 'xu_laoshi',
  'adult_liu', 'liu_laoshi', 'father_haifeng',
  'MC_', 'ALLY_1_', 'ALLY_2_'
];

const allLines = [];

for (const file of actFiles) {
  const modPath = path.resolve('src/data', file);
  const content = fs.readFileSync(modPath, 'utf8');
  
  // 提取各个场景和对话
  const lines = content.split('\n');
  let currentScene = '';
  let isBattleScene = false;
  
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const sceneMatch = l.match(/^\s*([a-zA-Z0-9_]+):\s*\{/);
    if (sceneMatch && !l.includes('transition') && !l.includes('dialogues')) {
      currentScene = sceneMatch[1];
    }
    if (l.includes('isBattleTrigger') || l.includes('battleId')) {
      isBattleScene = true;
    }
  }
}
