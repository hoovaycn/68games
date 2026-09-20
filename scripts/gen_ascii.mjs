import fs from 'fs';
import zlib from 'zlib';

function decodePng(buf) {
  let pos = 8;
  let width, height;
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
  const bpp = 4;
  const rowSize = width * bpp;
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
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
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

const sheet = decodePng(fs.readFileSync('assets/tiles/kenney/roguelikeCity_full_transparent.png'));

// 打印一张 37 列 x 28 行的 ASCII 类别图
// G: Grass (绿), A: Asphalt (深灰路), S: Sidewalk (浅灰步道), W: Wood/Sand (木质/黄土), R: Red brick/Roof (红砖), P: Prop/Furniture (物件), .: Empty
let mapStr = '';
for (let r = 0; r < 28; r++) {
  let line = `R${r.toString().padStart(2, '0')}: `;
  for (let c = 0; c < 37; c++) {
    const sx = c * 17;
    const sy = r * 17;
    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const idx = ((sy + y) * sheet.width + (sx + x)) * 4;
        if (sheet.pixels[idx + 3] > 30) {
          rSum += sheet.pixels[idx];
          gSum += sheet.pixels[idx + 1];
          bSum += sheet.pixels[idx + 2];
          count++;
        }
      }
    }
    if (count < 15) {
      line += ' . ';
    } else {
      const avgR = rSum / count;
      const avgG = gSum / count;
      const avgB = bSum / count;
      if (avgG > avgR + 25 && avgG > avgB + 20) line += ' G ';
      else if (avgR > avgG + 25 && avgR > avgB + 20) line += ' R ';
      else if (avgR > 160 && avgG > 140 && avgB < 150) line += ' W ';
      else if (avgR < 110 && avgG < 110 && avgB < 110) line += ' A ';
      else if (avgR >= 110 && avgR <= 180 && avgG >= 110 && avgG <= 180) line += ' S ';
      else line += ' P ';
    }
  }
  mapStr += line + '\n';
}

fs.writeFileSync('sheet_ascii.txt', mapStr);
console.log('Written sheet_ascii.txt');
