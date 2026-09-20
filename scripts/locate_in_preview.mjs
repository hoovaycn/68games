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

const preview = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Preview.png'));
const sheet = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Spritesheet/roguelikeCity_magenta.png'));

// 在 Preview.png 寻找跟 sheet 大小完全一致的内嵌区域
// sheet 628 x 475，preview 918 x 515
console.log('Searching sheet position inside Preview.png...');
for (let py = 0; py <= preview.height - 475; py++) {
  for (let px = 0; px <= preview.width - 628; px++) {
    let match = true;
    for (let dy = 0; dy < 20; dy += 5) {
      for (let dx = 0; dx < 20; dx += 5) {
        const pIdx = ((py + dy) * preview.width + (px + dx)) * 4;
        const sIdx = (dy * sheet.width + dx) * 4;
        // 如果不是洋红
        if (sheet.pixels[sIdx] > 240 && sheet.pixels[sIdx+1] < 20 && sheet.pixels[sIdx+2] > 240) continue;
        if (Math.abs(preview.pixels[pIdx] - sheet.pixels[sIdx]) > 10) {
          match = false;
          break;
        }
      }
      if (!match) break;
    }
    if (match) {
      console.log(`Sheet found inside Preview at X=${px}, Y=${py}!`);
      break;
    }
  }
}
