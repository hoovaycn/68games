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

const rawSheet = decodePng(fs.readFileSync("work_ref/ext_pack/kenney_city/Spritesheet/roguelikeCity_transparent.png"));
console.log("Raw sheet size:", rawSheet.width, rawSheet.height);

// 看看真实的行数和列数：
// 宽 628 -> (628 + 1) / 17 = 629 / 17 = 37 列！
// 高 475 -> (475 + 1) / 17 = 476 / 17 = 28 行！

// 重点：检查 R00 和 R01。为什么刚才的脚本扫描 R01 很多都是 empty？
// 让我们看看 (col 0, row 0) 和 (col 0, row 1) 的具体像素！
for (let r = 0; r < 5; r++) {
  const sy = r * 17;
  let line = `R${r}: `;
  for (let c = 0; c < 15; c++) {
    const sx = c * 17;
    let solid = 0;
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const idx = ((sy + y) * rawSheet.width + (sx + x)) * 4;
        if (rawSheet.pixels[idx + 3] > 10) solid++;
      }
    }
    line += `C${c}:${solid} `;
  }
  console.log(line);
}
