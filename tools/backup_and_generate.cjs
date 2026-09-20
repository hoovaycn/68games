const fs = require('fs');
const path = require('path');

const MAP_DIR = path.resolve(__dirname, '../docs/map/tiled_project');
const LOGIC_SCALE = 3;

// Backup current .tmx files and read their sizes
const files = fs.readdirSync(MAP_DIR).filter(f => f.endsWith('.tmx') && !f.includes('.backup.'));

for (const file of files) {
  const tmxPath = path.join(MAP_DIR, file);
  const backupPath = path.join(MAP_DIR, file.replace('.tmx', '.backup.tmx'));
  
  // Create backup
  fs.copyFileSync(tmxPath, backupPath);
  console.log(`Backed up ${file} to ${path.basename(backupPath)}`);
  
  // Read current logical dimensions from JS or TMX
  let content = fs.readFileSync(tmxPath, 'utf8');
  const matchW = content.match(/width="(\d+)"/);
  const matchH = content.match(/height="(\d+)"/);
  
  let currentWidth = matchW ? parseInt(matchW[1], 10) : 11;
  let currentHeight = matchH ? parseInt(matchH[1], 10) : 7;
  
  // If the file is ch0_battle1, it's already 33x21! We should use its logical size (11x7).
  // Wait, if it's already >= 33, it's already converted!
  if (currentWidth >= 33) {
    currentWidth = Math.ceil(currentWidth / LOGIC_SCALE);
    currentHeight = Math.ceil(currentHeight / LOGIC_SCALE);
  }
  
  const newWidth = currentWidth * LOGIC_SCALE;
  const newHeight = currentHeight * LOGIC_SCALE;
  
  console.log(`Map ${file}: logical ${currentWidth}x${currentHeight} -> visual ${newWidth}x${newHeight}`);
  
  // Create blank TMX with new dimensions
  const blankTmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.11.0" orientation="orthogonal" renderorder="right-down" width="${newWidth}" height="${newHeight}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="6" nextobjectid="1">
 <tileset firstgid="1" source="a5_modern_exterior.tsx"/>
 <tileset firstgid="257" source="b_interior.tsx"/>
 <tileset firstgid="513" source="b_modern_exterior.tsx"/>
 <tileset firstgid="769" source="c_interior.tsx"/>
 <tileset firstgid="1025" source="c_modern_exterior.tsx"/>
 <tileset firstgid="1281" source="tileset_32x32_3.tsx"/>
 <layer id="1" name="Background" width="${newWidth}" height="${newHeight}">
  <data encoding="csv">
${Array(newHeight).fill(Array(newWidth).fill(0).join(',')).join(',\n')}
  </data>
 </layer>
 <layer id="2" name="Decoration" width="${newWidth}" height="${newHeight}">
  <data encoding="csv">
${Array(newHeight).fill(Array(newWidth).fill(0).join(',')).join(',\n')}
  </data>
 </layer>
 <objectgroup id="3" name="Collisions"/>
 <objectgroup id="4" name="Spawns"/>
 <objectgroup id="5" name="Terrains"/>
</map>`;
  
  fs.writeFileSync(tmxPath, blankTmx);
  console.log(`Generated blank 32px map for ${file}`);
}
