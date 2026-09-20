import fs from 'fs';
import zlib from 'zlib';

function decodePng(buf) {
  let pos = 8, width, height;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4, rowSize = width * bpp;
  const pixels = Buffer.alloc(width * height * 4);
  let srcPos = 0, dstPos = 0;
  const prevRow = Buffer.alloc(rowSize);
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++];
    for (let x = 0; x < rowSize; x++) {
      const raw = decompressed[srcPos++];
      let val = raw;
      const a = x >= bpp ? pixels[dstPos - bpp] : 0;
      const b = prevRow[x];
      const c = x >= bpp ? prevRow[x - bpp] : 0;
      if (filterType === 1) val = (raw + a) & 0xff;
      else if (filterType === 2) val = (raw + b) & 0xff;
      else if (filterType === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        let pr = a;
        if (pb <= pa && pb <= pc) pr = b;
        else if (pc <= pa && pc <= pb) pr = c;
        val = (raw + pr) & 0xff;
      }
      pixels[dstPos++] = val;
      prevRow[x] = val;
    }
  }
  return { width, height, pixels };
}

const sample = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Sample.png'));
const sheet = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Spritesheet/roguelikeCity_magenta.png'));

console.log('Sample w/h:', sample.width, sample.height);

// 提取 Sample.png 中某几个 16x16 区域并在 sheet 中查找匹配图块
// 比如中间行车道、人行道、人行道路肩
function findTileInSheet(targetPixels, w = 16, h = 16) {
  let bestMatch = null, minDiff = Infinity;
  for (let r = 0; r < 28; r++) {
    for (let c = 0; c < 37; c++) {
      const sx = c * 17;
      const sy = r * 17;
      let diff = 0;
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const sIdx = ((sy + y) * sheet.width + (sx + x)) * 4;
          const tIdx = (y * w + x) * 4;
          diff += Math.abs(sheet.pixels[sIdx] - targetPixels[tIdx]) +
                  Math.abs(sheet.pixels[sIdx+1] - targetPixels[tIdx+1]) +
                  Math.abs(sheet.pixels[sIdx+2] - targetPixels[tIdx+2]);
        }
      }
      if (diff < minDiff) {
        minDiff = diff;
        bestMatch = { col: c, row: r, diff };
      }
    }
  }
  return bestMatch;
}

// 找到 Sample.png 中人行道与马路的交界处 (比如大概在 y=200..300 处)
// 采样 5 个有代表性的 16x16 区域：
const samplesToTest = [
  { x: 160, y: 250, label: 'Road center in Sample' },
  { x: 160, y: 200, label: 'Sidewalk in Sample' },
  { x: 160, y: 232, label: 'Sidewalk curb in Sample' },
  { x: 450, y: 380, label: 'Grass in Sample' },
  { x: 500, y: 380, label: 'Dirt path in Sample' }
];

for (const s of samplesToTest) {
  const buf = Buffer.alloc(16 * 16 * 4);
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const sIdx = ((s.y + y) * sample.width + (s.x + x)) * 4;
      const dIdx = (y * 16 + x) * 4;
      buf[dIdx] = sample.pixels[sIdx];
      buf[dIdx+1] = sample.pixels[sIdx+1];
      buf[dIdx+2] = sample.pixels[sIdx+2];
      buf[dIdx+3] = sample.pixels[sIdx+3];
    }
  }
  const match = findTileInSheet(buf);
  console.log(`${s.label} (${s.x}, ${s.y}) matches Sheet: col=${match.col}, row=${match.row}, diff=${match.diff}`);
}
