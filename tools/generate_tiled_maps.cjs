const fs = require('fs');
const path = require('path');

const srcDataDir = path.join(__dirname, '../src/data/chapters');
const tiledDir = path.join(__dirname, '../docs/map/tiled_project');
const summaryPath = path.join(__dirname, '../docs/map/Tiled_Map_Summary.md');

// Define the exact files we want to include based on user input
const allowedFiles = [
  path.join(__dirname, '../docs/map/Modern tiles_Free/Interiors_free/48x48/Interiors_free_48x48.png'),
  path.join(__dirname, '../docs/map/Modern tiles_Free/Interiors_free/48x48/Room_Builder_free_48x48.png'),
  path.join(__dirname, '../docs/map/Modern tiles_Free/Old/Tileset_48x48_1.png'),
  path.join(__dirname, '../docs/map/Modern tiles_Free/Old/Tileset_48x48_2.png'),
  path.join(__dirname, '../docs/map/Modern tiles_Free/Old/Tileset_48x48_3.png'),
  path.join(__dirname, '../docs/map/Modern tiles_Free/Old/Tileset_48x48_9.png'),
  path.join(__dirname, '../docs/map/Modern tiles_Free/Old/Tileset_48x48_16.png')
];

// Clean up old .tsx files to prevent clutter
const existingFiles = fs.readdirSync(tiledDir);
for (const file of existingFiles) {
  if (file.endsWith('.tsx')) {
    fs.unlinkSync(path.join(tiledDir, file));
  }
}

const tilesets = [];
let firstgid = 1;

for (const pngPath of allowedFiles) {
  if (!fs.existsSync(pngPath)) {
    console.warn(`Warning: File not found: ${pngPath}`);
    continue;
  }

  // User only requested 48x48 files, so we hardcode 48
  const tileSize = 48; 

  const relPathToPng = path.relative(tiledDir, pngPath).replace(/\\/g, '/');
  const baseName = path.basename(pngPath, '.png');
  const tsxName = `${baseName}.tsx`;
  const tsxPath = path.join(tiledDir, tsxName);

  const tsxContent = `<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.1" name="${baseName}" tilewidth="${tileSize}" tileheight="${tileSize}">
 <image source="${relPathToPng}" />
</tileset>`;
  
  fs.writeFileSync(tsxPath, tsxContent);
  
  tilesets.push({
    tsxName,
    firstgid
  });
  
  // Assign 5000 ids per tileset to avoid collision
  firstgid += 5000; 
}

console.log(`Generated ${tilesets.length} filtered tilesets.`);

// 2. Read all battles and generate .tmx
const files = fs.readdirSync(srcDataDir).filter(f => f.endsWith('.js') && f.includes('battle'));

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDataDir, file), 'utf-8');
  
  const idMatch = content.match(/id:\s*'([^']+)'/);
  const widthMatch = content.match(/mapWidth:\s*(\d+)/);
  const heightMatch = content.match(/mapHeight:\s*(\d+)/);

  if (idMatch && widthMatch && heightMatch) {
    const id = idMatch[1];
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    
    const tmxFilename = `${id}.tmx`;
    const tilesetTags = tilesets.map(ts => ` <tileset firstgid="${ts.firstgid}" source="${ts.tsxName}"/>`).join('\n');

    const tmxContent = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.10.1" orientation="orthogonal" renderorder="right-down" width="${width}" height="${height}" tilewidth="48" tileheight="48" infinite="0" nextlayerid="5" nextobjectid="100">
${tilesetTags}
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

console.log('All TMX maps updated with the filtered tilesets!');
