import path from 'path';
import fs from 'fs';

const actFiles = [
  'story_prologue.js',
  ...Array.from({length: 19}, (_, i) => `story_chapter${i+1}.js`),
  'story_humen_origin.js'
];

async function analyzeAllScenes() {
  const allScenes = [];
  
  for (const file of actFiles) {
    const modPath = path.resolve('src/data', file);
    try {
      const mod = await import('file:///' + modPath.replace(/\\/g, '/'));
      const expKey = Object.keys(mod)[0];
      const storyObj = mod[expKey];
      
      const fileScenes = [];
      if (storyObj.male) {
        for (const [k, v] of Object.entries(storyObj.male)) {
          if (v && v.dialogues) fileScenes.push({ key: `male.${k}`, scene: v, path: ['male', k] });
        }
        for (const [k, v] of Object.entries(storyObj.female)) {
          if (v && v.dialogues) fileScenes.push({ key: `female.${k}`, scene: v, path: ['female', k] });
        }
      } else {
        for (const [k, v] of Object.entries(storyObj)) {
          if (v && v.dialogues) fileScenes.push({ key: k, scene: v, path: [k] });
        }
      }

      for (const item of fileScenes) {
        const trans = item.scene.transition || {};
        const isBattle = !!(trans.isBattleTrigger || trans.battleId || trans.type === 'BATTLE');
        allScenes.push({
          file,
          sceneKey: item.key,
          title: item.scene.title || '',
          isBattle,
          transPrompt: trans.prompt || '',
          transButton: trans.buttonText || '',
          dialogues: item.scene.dialogues
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log(`总共统计到场景数: ${allScenes.length}`);
  const battleScenes = allScenes.filter(s => s.isBattle);
  console.log(`其中直接触发战斗的场景数: ${battleScenes.length}`);
  
  fs.writeFileSync('scripts/scene_inventory.json', JSON.stringify(allScenes, null, 2), 'utf8');
  console.log('已写入 scripts/scene_inventory.json');
}

analyzeAllScenes();
