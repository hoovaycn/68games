/**
 * 列出「被游戏引用 + 尚未压缩」的图，限定在指定目录内。
 * 用法：node tools/list_pending_assets.cjs assets/backgrounds assets/art
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIRS = process.argv.slice(2).length ? process.argv.slice(2)
  : ['assets/backgrounds', 'assets/art'];

let cache = {};
try { cache = JSON.parse(fs.readFileSync(path.join(ROOT, '.tinypng_cache.json'), 'utf8')); } catch (e) {}
const md5 = p => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');
const relKey = p => path.relative(ROOT, p).split(path.sep).join('/');

// ---- 收集代码里引用的资源路径（含模板拼接展开）
function walkJs(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    const f = path.join(dir, n);
    if (fs.statSync(f).isDirectory()) walkJs(f, out);
    else if (n.endsWith('.js')) out.push(f);
  }
  return out;
}
const jsText = walkJs(SRC).map(f => fs.readFileSync(f, 'utf8')).join('\n');
const refs = new Set();
for (const m of jsText.matchAll(/['"`](assets\/[^'"`\s]+\.(?:png|jpg|jpeg))['"`]/g)) refs.add(m[1]);

const unitsSrc = fs.readFileSync(path.join(SRC, 'data/units.js'), 'utf8');
for (const m of unitsSrc.matchAll(/^\s*id:\s*'([^']+)'/gm)) {
  for (const s of ['_default', '']) {
    refs.add(`assets/art/${m[1]}${s}@2x.png`);
    refs.add(`assets/art/${m[1]}${s}.png`);
  }
}
const avatarSrc = fs.readFileSync(path.join(SRC, 'engine/avatar.js'), 'utf8');
for (const m of avatarSrc.matchAll(/^\s*([a-z0-9_]+)\s*:\s*\[([^\]]*)\]/gm)) {
  for (const v of m[2].matchAll(/'([^']+)'/g)) {
    for (const d of ['', '@2x']) {
      refs.add(`assets/art/${m[1]}_${v[1]}${d}.png`);
      refs.add(`assets/portraits/${m[1]}_${v[1]}${d}.png`);
    }
  }
}
const enemySrc = fs.readFileSync(path.join(SRC, 'data/enemies.js'), 'utf8');
for (const m of enemySrc.matchAll(/^\s*id:\s*'([^']+)'/gm)) {
  refs.add(`assets/art/${m[1]}_default@2x.png`);
  refs.add(`assets/art/${m[1]}@2x.png`);
  refs.add(`assets/portraits/${m[1]}@2x.png`);
}
for (const r of ['ss', 's', 'a', 'b', 'c', 'd']) refs.add(`assets/ui/ui_rank_${r}.png`);

const pending = [];
for (const dir of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  const walk = d => {
    for (const n of fs.readdirSync(d)) {
      const f = path.join(d, n);
      if (fs.statSync(f).isDirectory()) walk(f);
      else if (/\.(png|jpe?g)$/i.test(n)) {
        const rel = relKey(f);
        const c = cache[rel];
        const state = !c ? 'never' : (c.md5 !== md5(f) ? 'stale' : 'ok');
        if (state === 'ok') continue;
        const base = rel.replace(/^assets\//, '');
        if (!refs.has(rel) && !refs.has(base)) continue;   // 没被引用就不管
        pending.push(rel);
      }
    }
  };
  walk(abs);
}

pending.sort((a, b) => fs.statSync(path.join(ROOT, b)).size - fs.statSync(path.join(ROOT, a)).size);
const total = pending.reduce((s, r) => s + fs.statSync(path.join(ROOT, r)).size, 0);
console.error(`待压 ${pending.length} 个，合计 ${(total / 1024 / 1024).toFixed(1)} MB`);
pending.forEach(r => console.log(r));
