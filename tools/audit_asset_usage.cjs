/**
 * 判断 assets/ 里每张图是否真的被游戏引用到。
 * 除了代码里的字面量路径，还要展开模板拼接式引用
 * （assets/art/${unitId}_default@2x.png 之类）。
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

// ---- 1. 收集 src/ 下所有 js 文本
function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    const f = path.join(dir, n);
    const st = fs.statSync(f);
    if (st.isDirectory()) walk(f, out);
    else if (n.endsWith('.js')) out.push(f);
  }
  return out;
}
const jsFiles = walk(SRC);
const jsText = jsFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

// ---- 2. 字面量路径
const literal = new Set();
for (const m of jsText.matchAll(/['"`](assets\/[^'"`\s]+\.(?:png|jpg|jpeg))['"`]/g)) {
  literal.add(m[1]);
}

// ---- 3. 展开模板拼接式引用
// 3a. assets/art/${unitId}_default@2x.png  /  assets/art/${actorId}_default.png
const unitsSrc = fs.readFileSync(path.join(SRC, 'data/units.js'), 'utf8');
const unitIds = new Set();
for (const m of unitsSrc.matchAll(/^\s*id:\s*'([^']+)'/gm)) unitIds.add(m[1]);
for (const m of unitsSrc.matchAll(/unitId:\s*'([^']+)'/g)) unitIds.add(m[1]);
for (const id of unitIds) {
  literal.add(`assets/art/${id}_default@2x.png`);
  literal.add(`assets/art/${id}_default.png`);
  literal.add(`assets/art/${id}@2x.png`);
  literal.add(`assets/art/${id}.png`);
}
// 3b. 头像映射表 src/engine/avatar.js:  key: ['default', 'corrupted', ...]
const avatarSrc = fs.readFileSync(path.join(SRC, 'engine/avatar.js'), 'utf8');
for (const m of avatarSrc.matchAll(/^\s*([a-z0-9_]+)\s*:\s*\[([^\]]*)\]/gm)) {
  const key = m[1];
  for (const v of m[2].matchAll(/'([^']+)'/g)) {
    literal.add(`assets/art/${key}_${v[1]}@2x.png`);
    literal.add(`assets/art/${key}_${v[1]}.png`);
    literal.add(`assets/portraits/${key}_${v[1]}@2x.png`);
    literal.add(`assets/portraits/${key}_${v[1]}.png`);
  }
}
// 3c. 敌人 enemies.js 里的 enemyId
const enemySrc = fs.readFileSync(path.join(SRC, 'data/enemies.js'), 'utf8');
for (const m of enemySrc.matchAll(/^\s*id:\s*'([^']+)'/gm)) {
  literal.add(`assets/art/${m[1]}_default@2x.png`);
  literal.add(`assets/art/${m[1]}@2x.png`);
  literal.add(`assets/portraits/${m[1]}@2x.png`);
}
// 3d. assets/ui/ui_rank_${rank}.png
for (const r of ['ss', 's', 'a', 'b', 'c', 'd']) {
  literal.add(`assets/ui/ui_rank_${r}.png`);
}

// ---- 4. 也把 index.html / manifest 里提到的算上（有些资源在 html 里直接引用）
for (const extra of ['index.html', 'assets/ASSET_MANIFEST.md']) {
  const p = path.join(ROOT, extra);
  if (fs.existsSync(p)) {
    const t = fs.readFileSync(p, 'utf8');
    for (const m of t.matchAll(/['"`(]?(assets\/[^'"`)\s]+\.(?:png|jpg|jpeg))['"`)]?/g)) {
      literal.add(m[1]);
    }
  }
}

// ---- 5. 对比未压缩清单
let cache = {};
try { cache = JSON.parse(fs.readFileSync(path.join(ROOT, '.tinypng_cache.json'), 'utf8')); } catch (e) {}
const md5 = p => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');
const relKey = p => path.relative(ROOT, p).split(path.sep).join('/');

function walkAll(d, o = []) {
  for (const n of fs.readdirSync(d)) {
    const f = path.join(d, n);
    const st = fs.statSync(f);
    if (st.isDirectory()) walkAll(f, o);
    else if (/\.(png|jpe?g)$/i.test(n)) o.push(f);
  }
  return o;
}
const files = walkAll(path.join(ROOT, 'assets'));

const refSet = new Set();
for (const r of literal) refSet.add(r.split(path.sep).join('/'));

const rows = [];
for (const f of files) {
  const rel = relKey(f);
  const c = cache[rel];
  const state = !c ? 'never' : (c.md5 !== md5(f) ? 'stale' : 'ok');
  if (state === 'ok') continue;
  const base = rel.replace(/^assets\//, '');
  const used = refSet.has(rel) || refSet.has(base);
  rows.push({ rel, size: fs.statSync(f).size, state, used });
}

const used = rows.filter(r => r.used).sort((a, b) => b.size - a.size);
const unused = rows.filter(r => !r.used).sort((a, b) => b.size - a.size);
const sum = arr => arr.reduce((s, r) => s + r.size, 0);

console.log(`待压缩 ${rows.length} 张  共 ${(sum(rows) / 1024 / 1024).toFixed(1)} MB`);
console.log(`  ├─ 游戏实际引用 : ${used.length} 张, ${(sum(used) / 1024 / 1024).toFixed(1)} MB`);
console.log(`  └─ 未被引用      : ${unused.length} 张, ${(sum(unused) / 1024 / 1024).toFixed(1)} MB`);

console.log('\n=== 未被引用的（>200KB，可能是废弃稿/原图备份）===');
for (const r of unused.filter(r => r.size > 200 * 1024)) {
  console.log(`${(r.size / 1024).toFixed(0).padStart(6)} KB  ${r.rel}`);
}
const smallUnused = unused.filter(r => r.size <= 200 * 1024);
console.log(`（其余 ${smallUnused.length} 个为 200KB 以下的小图，共 ${(sum(smallUnused) / 1024).toFixed(0)} KB）`);

console.log('\n=== 未被引用、但 >1MB 的大图（最值得清理）===');
for (const r of unused.filter(r => r.size > 1024 * 1024)) {
  console.log(`${(r.size / 1024).toFixed(0).padStart(6)} KB  ${r.rel}`);
}
