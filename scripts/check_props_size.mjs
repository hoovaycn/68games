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
  return { width, height };
}

const files = fs.readdirSync('public/assets/props/kenney').filter(f => f.endsWith('.png'));
for (const f of files) {
  const buf = fs.readFileSync('public/assets/props/kenney/' + f);
  const info = decodePng(buf);
  console.log(`${f}: ${info.width}x${info.height}`);
}
