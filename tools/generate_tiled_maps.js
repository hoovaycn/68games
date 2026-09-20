const fs = require('fs');
const path = require('path');

const srcDataDir = path.join(__dirname, '../src/data/chapters');
const tiledDir = path.join(__dirname, '../docs/map/tiled_project');
const summaryPath = path.join(__dirname, '../docs/map/Tiled_Map_Summary.md');

// Create tiled directory if not exists
if (!fs.existsSync(tiledDir)) {
  fs.mkdirSync(tiledDir, { recursive: true });
}

// 1. Generate Tileset (.tsx)
const tsxContent1 = `<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.1" name="Interiors_48x48" tilewidth="48" tileheight="48" tilecount="1024" columns="16">
 <image source="../Modern tiles_Free/Interiors_free/48x48/Interiors_free_48x48.png" />
</tileset>`;
fs.writeFileSync(path.join(tiledDir, 'Interiors_48x48.tsx'), tsxContent1);

const tsxContent2 = `<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.1" name="Room_Builder_48x48" tilewidth="48" tileheight="48" tilecount="1024" columns="16">
 <image source="../Modern tiles_Free/Interiors_free/48x48/Room_Builder_free_48x48.png" />
</tileset>`;
fs.writeFileSync(path.join(tiledDir, 'Room_Builder_48x48.tsx'), tsxContent2);

// 2. Read all battles and generate .tmx
const files = fs.readdirSync(srcDataDir).filter(f => f.endsWith('.js') && f.includes('battle'));
let summaryMarkdown = '# 游戏战斗地图汇总 (Tiled手工精调占位版)\n\n';
summaryMarkdown += '| 关卡文件 | 战斗名称 | 地图尺寸 | 我方人数 | 敌方人数 | TMX文件 |\n';
summaryMarkdown += '| --- | --- | --- | --- | --- | --- |\n';

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDataDir, file), 'utf-8');
  
  // Extract info using regex
  const idMatch = content.match(/id:\s*'([^']+)'/);
  const nameMatch = content.match(/name:\s*'([^']+)'/);
  const widthMatch = content.match(/mapWidth:\s*(\d+)/);
  const heightMatch = content.match(/mapHeight:\s*(\d+)/);
  
  // Count players and enemies by finding blocks
  const playersBlock = content.match(/playerDeploy:\s*\[([\s\S]*?)\]/);
  const enemiesBlock = content.match(/enemyDeploy:\s*\[([\s\S]*?)\]/);
  
  const playersCount = playersBlock ? (playersBlock[1].match(/\{/g) || []).length : 0;
  const enemiesCount = enemiesBlock ? (enemiesBlock[1].match(/\{/g) || []).length : 0;

  if (idMatch && widthMatch && heightMatch) {
    const id = idMatch[1];
    const name = nameMatch ? nameMatch[1] : id;
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    
    const tmxFilename = `${id}.tmx`;
    
    summaryMarkdown += `| ${file} | ${name} | ${width}x${height} | ${playersCount} | ${enemiesCount} | \`${tmxFilename}\` |\n`;
    
    // Generate TMX XML
    const tmxContent = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.10.1" orientation="orthogonal" renderorder="right-down" width="${width}" height="${height}" tilewidth="48" tileheight="48" infinite="0" nextlayerid="5" nextobjectid="100">
 <tileset firstgid="1" source="Interiors_48x48.tsx"/>
 <tileset firstgid="1025" source="Room_Builder_48x48.tsx"/>
 <layer id="1" name="Background" width="${width}" height="${height}">
  <data encoding="csv">
${Array(height).fill(Array(width).fill('0').join(',')).join(',\n')}
  </data>
 </layer>
 <layer id="2" name="Decoration" width="${width}" height="${height}">
  <data encoding="csv">
${Array(height).fill(Array(width).fill('0').join(',')).join(',\n')}
  </data>
 </layer>
 <objectgroup id="3" name="Spawns">
  <properties>
   <property name="desc" value="在此放置玩家和敌人的出生点"/>
  </properties>
 </objectgroup>
 <objectgroup id="4" name="Collisions">
  <properties>
   <property name="desc" value="在此绘制碰撞盒"/>
  </properties>
 </objectgroup>
</map>`;
    
    fs.writeFileSync(path.join(tiledDir, tmxFilename), tmxContent);
  }
}

fs.writeFileSync(summaryPath, summaryMarkdown);
console.log('Tiled maps and summary generated successfully!');
