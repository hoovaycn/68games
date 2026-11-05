import fs from 'fs';
import path from 'path';

const actFiles = [
  'story_prologue.js',
  ...Array.from({length: 19}, (_, i) => `story_chapter${i+1}.js`),
  'story_humen_origin.js'
];

console.log('=== 分析前两幕剧情场景与战前对白 ===\n');

for (const file of actFiles) {
  const filePath = path.join('src/data', file);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 查找各个 scene
  const sceneBlocks = content.split(/\n\s*(\w+):\s*\{/);
  // sceneBlocks[0] 是头部
  for (let i = 1; i < sceneBlocks.length; i += 2) {
    const sceneKey = sceneBlocks[i];
    const sceneBody = sceneBlocks[i+1] || '';
    if (!sceneBody.includes('dialogues:')) continue;
    
    const isBattle = sceneBody.includes('isBattleTrigger') || sceneBody.includes('battleId');
    
    // 提取 dialogues 中的每一句
    // 简单正则提取 speaker, text, leftPortrait, rightPortrait
    const dRegex = /\{\s*id:\s*(\d+)[\s\S]*?speaker:\s*['"]([^'"]+)['"][\s\S]*?(?:leftPortrait:\s*['"]([^'"]+)['"])?[\s\S]*?(?:rightPortrait:\s*['"]([^'"]+)['"])?[\s\S]*?text:\s*['"]([^'"]+)['"]/g;
    let dMatch;
    const dialogues = [];
    while ((dMatch = dRegex.exec(sceneBody)) !== null) {
      dialogues.push({
        id: dMatch[1],
        speaker: dMatch[2],
        left: dMatch[3] || 'null',
        right: dMatch[4] || 'null',
        text: dMatch[5]
      });
    }

    if (isBattle) {
      console.log(`\n【战前场景】${file} -> ${sceneKey} (对白数: ${dialogues.length})`);
      // 输出战前最后 3-5 句
      const lastFew = dialogues.slice(-4);
      for (const d of lastFew) {
        console.log(`  [${d.speaker}] (L: ${path.basename(d.left)}, R: ${path.basename(d.right)}) : ${d.text.substring(0, 40)}...`);
      }
    }
  }
}
