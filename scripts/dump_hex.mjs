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

const sheet = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Spritesheet/roguelikeCity_magenta.png'));

function dumpTileHex(c, r) {
  console.log(`=== Tile Col ${c}, Row ${r} ===`);
  const sx = c * 17;
  const sy = r * 17;
  for (let y = 0; y < 16; y++) {
    let line = '';
    for (let x = 0; x < 16; x++) {
      const idx = ((sy + y) * sheet.width + (sx + x)) * 4;
      const cr = sheet.pixels[idx];
      const cg = sheet.pixels[idx + 1];
      const cb = sheet.pixels[idx + 2];
      // 按照亮度分级显示
      const bri = Math.round(0.299 * cr + 0.587 * cg + 0.114 * cb);
      line += bri.toString(16).padStart(2, '0') + ' ';
    }
    console.log(line);
  }
}

// 检查 Row 24 的 Col 2, Col 3, Col 8 (灰色地砖)
dumpTileHex(2, 24);
dumpTileHex(3, 24);
dumpTileHex(8, 24);

// 检查 Row 24 的 Col 10 (纯黑沥青)
dumpTileHex(10, 24);

// 检查 Row 0 的 Col 6, Col 7 (红砖)
dumpTileHex(6, 0);
dumpTileHex(7, 0);

// 检查 Row 0 的 Col 14 (灰地砖)
dumpTileHex(14, 0);
