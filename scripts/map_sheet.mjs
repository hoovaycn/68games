import fs from "fs";
import zlib from "zlib";

function decodePng(buf) {
  let pos = 8, width, height;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    if (type === "IHDR") {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === "IDAT") {
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

const sheet = decodePng(fs.readFileSync("assets/tiles/kenney/roguelikeCity_full_transparent.png"));

// 打印整张 sheet 的分类简图，帮助看清每个区域到底是什么
// 37 列 x 28 行
console.log("=== GRID MAP ===");
for (let r = 0; r < 28; r++) {
  let line = `R${r.toString().padStart(2, '0')}: `;
  for (let c = 0; c < 37; c++) {
    const sx = c * 17;
    const sy = r * 17;
    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    let isBlack = 0, isWhite = 0, isGray = 0, isGreen = 0, isBrown = 0, isRed = 0, isBlue = 0;
    for (let py = 0; py < 16; py++) {
      for (let px = 0; px < 16; px++) {
        const idx = ((sy + py) * sheet.width + (sx + px)) * 4;
        const a = sheet.pixels[idx + 3];
        if (a > 50) {
          count++;
          const cr = sheet.pixels[idx], cg = sheet.pixels[idx + 1], cb = sheet.pixels[idx + 2];
          rSum += cr; gSum += cg; bSum += cb;
          if (cr < 70 && cg < 70 && cb < 70) isBlack++;
          else if (cr > 200 && cg > 200 && cb > 200) isWhite++;
          else if (cg > cr + 30 && cg > cb + 20) isGreen++;
          else if (cr > cg + 40 && cr > cb + 40) isRed++;
          else if (cr > cb + 30 && cg > cb + 10) isBrown++;
          else if (cb > cr + 20 && cb > cg) isBlue++;
          else isGray++;
        }
      }
    }
    if (count < 50) {
      line += " . ";
    } else {
      const avgR = Math.round(rSum / count);
      const avgG = Math.round(gSum / count);
      const avgB = Math.round(bSum / count);
      if (isBlack > 150) line += " B "; // 沥青马路/纯黑
      else if (isGreen > 120) line += " G "; // 草地
      else if (isRed > 120) line += " R "; // 红砖/红顶
      else if (isBrown > 120) line += " D "; // 泥土/木
      else if (isBlue > 120) line += " L "; // 玻璃/水
      else if (isWhite > 120) line += " W "; // 纯白
      else line += " S "; // 灰色/人行道/石板
    }
  }
  console.log(line);
}
