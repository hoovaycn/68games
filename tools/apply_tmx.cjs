const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const tmxPath = path.join(__dirname, '../docs/map/tiled_project/ch0_battle1.tmx');
const targetJsPath = path.join(__dirname, '../src/data/chapters/ch0_battle1.js');

async function parseTmx() {
  const xml = fs.readFileSync(tmxPath, 'utf-8');
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xml);

  const map = result.map;
  const width = parseInt(map.$.width);
  const height = parseInt(map.$.height);

  // 1. Parse Layers (Background & Decoration)
  let bgCsv = '';
  let decCsv = '';
  
  const layers = Array.isArray(map.layer) ? map.layer : [map.layer];
  for (const layer of layers) {
    if (layer.$.name === 'Background') {
      bgCsv = layer.data._.trim();
    } else if (layer.$.name === 'Decoration') {
      decCsv = layer.data._.trim();
    }
  }

  // Helper to convert CSV to 2D array
  const to2D = (csv, w) => {
    const flat = csv.split(',').map(n => parseInt(n.trim(), 10));
    const arr = [];
    for (let i = 0; i < flat.length; i += w) {
      arr.push(flat.slice(i, i + w));
    }
    return arr;
  };

  const bgGrid = to2D(bgCsv, width);
  const decGrid = to2D(decCsv, width);

  // 2. Parse Objects (Collisions & Spawns)
  const collisions = [];
  const spawns = [];

  const objectGroups = Array.isArray(map.objectgroup) ? map.objectgroup : [map.objectgroup];
  for (const group of objectGroups) {
    if (!group.object) continue;
    const objects = Array.isArray(group.object) ? group.object : [group.object];
    
    for (const obj of objects) {
      const x = parseFloat(obj.$.x);
      const y = parseFloat(obj.$.y);
      const w = parseFloat(obj.$.width || 0);
      const h = parseFloat(obj.$.height || 0);

      // Convert pixel coords to grid coords (48x48)
      // For rects, we might cover multiple grids
      const gridX = Math.floor(x / 48);
      const gridY = Math.floor(y / 48);

      if (group.$.name === 'Collisions') {
        const gridW = Math.max(1, Math.ceil(w / 48));
        const gridH = Math.max(1, Math.ceil(h / 48));
        for (let i = 0; i < gridW; i++) {
          for (let j = 0; j < gridH; j++) {
            collisions.push({ x: gridX + i, y: gridY + j });
          }
        }
      } else if (group.$.name === 'Spawns') {
        spawns.push({ x: gridX, y: gridY });
      }
    }
  }

  // 3. Update the JS file
  let jsContent = fs.readFileSync(targetJsPath, 'utf-8');

  // Replace terrainTiles
  const newTerrainTiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const gid = bgGrid[y][x];
      // For now, we map all non-zero background tiles to a generic 'floor' or keep it visual only
      // Actually, we can just inject a new property 'tiledMapData' into the JS file
    }
  }

  // Since Tiled data is complex, let's inject a new 'tiledData' field into the JS object
  // so the game engine can render it directly using the Tiled IDs.
  
  const tiledDataObj = {
    bgGrid,
    decGrid,
    collisions
  };

  const tiledDataStr = JSON.stringify(tiledDataObj, null, 2);

  // We will append it to the exported object
  if (jsContent.includes('tiledData:')) {
    jsContent = jsContent.replace(/tiledData:\s*\{[\s\S]*?\},?\s*(?=\w+:|\})/, `tiledData: ${tiledDataStr},\n  `);
  } else {
    // Insert before the last closing brace
    jsContent = jsContent.replace(/\n\};$/, `,\n  tiledData: ${tiledDataStr}\n};`);
  }

  // Update Player Deploy
  if (spawns.length > 0) {
    // Player gets the first spawn (leftmost)
    spawns.sort((a, b) => a.x - b.x);
    const pSpawn = spawns[0];
    const eSpawn = spawns[spawns.length - 1];

    jsContent = jsContent.replace(/playerDeploy:\s*\[[\s\S]*?\]/, `playerDeploy: [\n    { unitId: '{MC_ID}', x: ${pSpawn.x}, y: ${pSpawn.y} }\n  ]`);
    jsContent = jsContent.replace(/enemyDeploy:\s*\[[\s\S]*?\]/, `enemyDeploy: [\n    { enemyId: 'vendor', instanceId: 'vendor_boss', x: ${eSpawn.x}, y: ${eSpawn.y} }\n  ]`);
  }

  fs.writeFileSync(targetJsPath, jsContent);
  console.log('ch0_battle1.js updated successfully!');
}

parseTmx().catch(console.error);
