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

const sample = decodePng(fs.readFileSync('work_ref/ext_pack/kenney_city/Sample.png'));
console.log('Sample decoded successfully: width =', sample.width, 'height =', sample.height);

// 提取 sample 里的地面图块并在 16x16 晶格上寻找精确特征
// Sample.png 里的格子大小是多少？
// 让我们在 Sample.png 中扫描垂直和水平重复周期
for (let step = 8; step <= 32; step++) {
  let matchX = 0, total = 0;
  for (let y = 200; y < 250; y++) {
    for (let x = 100; x < 300; x++) {
      const idx1 = (y * sample.width + x) * 4;
      const idx2 = (y * sample.width + (x + step)) * 4;
      if (Math.abs(sample.pixels[idx1] - sample.pixels[idx2]) < 5 &&
          Math.abs(sample.pixels[idx1+1] - sample.pixels[idx2+1]) < 5 &&
          Math.abs(sample.pixels[idx1+2] - sample.pixels[idx2+2]) < 5) {
        matchX++;
      }
      total++;
    }
  }
  console.log(`Step ${step}: ${(matchX/total*100).toFixed(1)}% match`);
}
