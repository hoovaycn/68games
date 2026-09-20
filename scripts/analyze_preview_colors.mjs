import fs from 'fs';
import zlib from 'zlib';

function decodePng(buf) {
  let pos = 8, width, height, colorType;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      colorType = buf[pos + 17];
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = colorType === 6 ? 4 : (colorType === 2 ? 3 : 1);
  const rowSize = width * bpp;
  const pixels = Buffer.alloc(width * height * 4);
  let srcPos = 0, dstPos = 0;
  const prevRow = Buffer.alloc(rowSize);
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++];
    const currentRow = Buffer.alloc(rowSize);
    for (let x = 0; x < rowSize; x++) {
      const raw = decompressed[srcPos++];
      let val = raw;
      const a = x >= bpp ? currentRow[x - bpp] : 0;
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
      currentRow[x] = val;
    }
    for (let x = 0; x < width; x++) {
      pixels[dstPos++] = currentRow[x * bpp];
      pixels[dstPos++] = currentRow[x * bpp + 1];
      pixels[dstPos++] = currentRow[x * bpp + 2];
      pixels[dstPos++] = (bpp === 4) ? currentRow[x * bpp + 3] : 255;
    }
    currentRow.copy(prevRow);
  }
  return { width, height, pixels };
}

const preview = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Preview.png'));
console.log('Preview center pixel at (600, 300):', [
  preview.pixels[(300 * preview.width + 600) * 4],
  preview.pixels[(300 * preview.width + 600) * 4 + 1],
  preview.pixels[(300 * preview.width + 600) * 4 + 2],
  preview.pixels[(300 * preview.width + 600) * 4 + 3]
]);

// 统计 Preview 里的主色调分布
const colorCounts = {};
for (let y = 0; y < preview.height; y += 4) {
  for (let x = 0; x < preview.width; x += 4) {
    const idx = (y * preview.width + x) * 4;
    const key = `${preview.pixels[idx]},${preview.pixels[idx+1]},${preview.pixels[idx+2]}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }
}
const sorted = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 10);
console.log('Top 10 colors in Preview.png:');
for (const [k, v] of sorted) {
  console.log(`RGB(${k}): count ${v}`);
}
