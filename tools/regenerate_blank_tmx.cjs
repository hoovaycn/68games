/**
 * 生成纯净空白的 48px（1:1）TMX 模板
 * 只保留 4 个必需空图层：Background / Decoration / Spawns / Collisions
 * 用法：
 *   node tools/regenerate_blank_tmx.cjs <name> [width] [height]
 * 示例：
 *   node tools/regenerate_blank_tmx.cjs ch0_battle1 11 7
 */
const fs = require('fs');
const path = require('path');

const TILESETS = [
  'Interiors_free_48x48.tsx',
  'Room_Builder_free_48x48.tsx',
  'Tileset_48x48_1.tsx',
  'Tileset_48x48_2.tsx',
  'Tileset_48x48_3.tsx',
  'Tileset_48x48_9.tsx',
  'Tileset_48x48_16.tsx'
];
const FIRSTGIDS = [1, 1425, 1816, 1916, 2016, 2116, 2216];

function buildBlankTmx(name, W, H) {
  const row = Array(W).fill(0).join(',');
  const bgData = Array(H).fill(row).join(',\n');

  const tilesetLines = TILESETS.map((src, i) =>
    ` <tileset firstgid="${FIRSTGIDS[i]}" source="${src}"/>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.12.2" orientation="orthogonal" renderorder="right-down" width="${W}" height="${H}" tilewidth="48" tileheight="48" infinite="0" nextlayerid="5" nextobjectid="1">
${tilesetLines}
 <layer id="1" name="Background" width="${W}" height="${H}">
  <data encoding="csv">
${bgData}
</data>
 </layer>
 <layer id="2" name="Decoration" width="${W}" height="${H}">
  <data encoding="csv">
${bgData}
</data>
 </layer>
 <objectgroup id="3" name="Spawns"/>
 <objectgroup id="4" name="Collisions"/>
</map>
`;
}

const name = process.argv[2] || 'ch0_battle1';
const W = parseInt(process.argv[3], 10) || 11;
const H = parseInt(process.argv[4], 10) || 7;
const outPath = path.resolve(__dirname, '..', 'docs/map/tiled_project', `${name}.tmx`);
fs.writeFileSync(outPath, buildBlankTmx(name, W, H));
console.log(`[Blank] ${outPath}  (48px 1:1, ${W}x${H})`);
