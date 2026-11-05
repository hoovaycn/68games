import fs from 'fs';

const inventory = JSON.parse(fs.readFileSync('scripts/scene_inventory.json', 'utf8'));
const battleScenes = inventory.filter(s => s.isBattle);

console.log('=== 26个战斗触发场景列表与战前主角/队友台词 ===\n');

for (const s of battleScenes) {
  console.log(`\n【${s.file}】[${s.sceneKey}] ${s.title}`);
  console.log(`  按钮: ${s.transButton} | 提示: ${s.transPrompt}`);
  for (const d of s.dialogues) {
    const l = d.leftPortrait ? d.leftPortrait.split('/').pop() : '-';
    const r = d.rightPortrait ? d.rightPortrait.split('/').pop() : '-';
    console.log(`    #${d.id} [${d.speaker}] (L:${l}, R:${r}) -> ${d.text}`);
  }
}
