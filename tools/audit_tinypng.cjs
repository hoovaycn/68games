/**
 * 只读审计：对比 .tinypng_cache.json，统计哪些美术资源还没过 TinyPNG。
 * 不修改任何文件。
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'assets');
const CACHE_FILE = path.join(ROOT, '.tinypng_cache.json');

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); } catch (e) { cache = {}; }
}
const md5 = (p) => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g)$/i.test(name)) out.push(full);
  }
  return out;
}

const files = walk(ASSETS_DIR);
const rows = [];
for (const f of files) {
  // 缓存里存的是正斜杠路径，Windows 下 path.relative 给的是反斜杠，统一一下
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  const size = fs.statSync(f).size;
  const c = cache[rel];
  let state;
  if (!c) state = 'never';
  else if (c.md5 !== md5(f)) state = 'stale';
  else state = 'ok';
  rows.push({ rel, size, state, orig: c ? c.originalSize : null, at: c ? c.compressedAt : null });
}

const kb = (b) => (b / 1024).toFixed(0).padStart(6);
const never = rows.filter(r => r.state === 'never').sort((a, b) => b.size - a.size);
const stale = rows.filter(r => r.state === 'stale').sort((a, b) => b.size - a.size);
const ok = rows.filter(r => r.state === 'ok');

const total = rows.reduce((s, r) => s + r.size, 0);
const neverTotal = never.reduce((s, r) => s + r.size, 0);
const staleTotal = stale.reduce((s, r) => s + r.size, 0);

console.log(`素材总数 ${rows.length}  总体积 ${(total / 1024 / 1024).toFixed(1)} MB`);
console.log(`  已压且最新 : ${ok.length} 个, ${(ok.reduce((s,r)=>s+r.size,0)/1024/1024).toFixed(1)} MB`);
console.log(`  未压过      : ${never.length} 个, ${(neverTotal / 1024 / 1024).toFixed(1)} MB`);
console.log(`  压过但已改动: ${stale.length} 个, ${(staleTotal / 1024 / 1024).toFixed(1)} MB`);

console.log('\n=== 未压过（按体积降序，前 30）===');
for (const r of never.slice(0, 30)) console.log(`${kb(r.size)} KB  ${r.rel}`);
if (never.length > 30) console.log(`... 其余 ${never.length - 30} 个`);

console.log('\n=== 压过但文件已改动（需重压，前 30）===');
for (const r of stale.slice(0, 30)) console.log(`${kb(r.size)} KB  ${r.rel}`);
if (stale.length > 30) console.log(`... 其余 ${stale.length - 30} 个`);
