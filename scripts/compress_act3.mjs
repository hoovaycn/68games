import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const TINY_KEY = 'Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2';
const MD_PATH = path.join(ROOT, 'docs', 'act3_assets_compression_list.md');
const CACHE_PATH = path.join(ROOT, 'scripts', '.tinypng_cache.json');
const AUTH_HEADER = 'Basic ' + Buffer.from(`api:${TINY_KEY}`).toString('base64');

let cache = {};
if (fs.existsSync(CACHE_PATH)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
  } catch (e) {
    cache = {};
  }
}

function saveCache() {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
}

function getTargetFiles() {
  const content = fs.readFileSync(MD_PATH, 'utf-8');
  const lines = content.split('\n');
  const files = [];
  for (const line of lines) {
    if (line.trim().startsWith('|') && line.includes('`assets/')) {
      const m = line.match(/`(assets\/[^`]+)`/);
      if (m) {
        files.push(m[1]);
      }
    }
  }
  return files;
}

function shrinkFile(absPath, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(absPath);
    const options = {
      hostname: 'api.tinify.com',
      port: 443,
      path: '/shrink',
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileData.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              url: json.output.url,
              origSize: json.input.size,
              newSize: json.output.size,
              width: json.output.width,
              height: json.output.height,
              ratio: json.output.ratio,
              count: res.headers['compression-count']
            });
          } else {
            reject(new Error(`TinyPNG error (${res.statusCode}): ${json.message || body}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`Shrink request timed out after ${timeoutMs}ms`));
    });

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

function downloadFile(url, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`Download timed out after ${timeoutMs}ms`));
    });

    req.on('error', reject);
  });
}

async function compressSingle(relPath) {
  const absPath = path.join(ROOT, relPath);
  if (!fs.existsSync(absPath)) {
    return { path: relPath, status: 'missing' };
  }

  if (cache[relPath] && cache[relPath].status === 'ok') {
    return cache[relPath];
  }

  const origSize = fs.statSync(absPath).size;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const shrinkRes = await shrinkFile(absPath, 45000);
      const compressedBuffer = await downloadFile(shrinkRes.url, 45000);

      if (compressedBuffer.length !== shrinkRes.newSize) {
        throw new Error(`Size mismatch: expected ${shrinkRes.newSize}, got ${compressedBuffer.length}`);
      }

      const tmpPath = absPath + '.tmp';
      fs.writeFileSync(tmpPath, compressedBuffer);
      fs.renameSync(tmpPath, absPath);

      const ratio = ((origSize - shrinkRes.newSize) / origSize * 100).toFixed(1);
      const resultObj = {
        path: relPath,
        status: 'ok',
        origSize,
        newSize: shrinkRes.newSize,
        ratio,
        width: shrinkRes.width,
        height: shrinkRes.height,
        count: shrinkRes.count
      };

      cache[relPath] = resultObj;
      saveCache();
      return resultObj;
    } catch (err) {
      if (attempt === 3) {
        return { path: relPath, status: 'error', msg: err.message };
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function runQueue(files, concurrency = 2) {
  const total = files.length;
  const results = [];
  let index = 0;
  let finished = 0;

  async function worker(workerId) {
    while (index < total) {
      const currentIndex = index++;
      const file = files[currentIndex];
      const isCached = !!(cache[file] && cache[file].status === 'ok');
      const res = await compressSingle(file);
      results.push(res);
      finished++;

      if (res.status === 'ok') {
        const origKB = (res.origSize / 1024).toFixed(1);
        const newKB = (res.newSize / 1024).toFixed(1);
        const tag = isCached ? '[已缓存]' : '';
        console.log(`[${finished}/${total}] ${tag} 完成: ${res.path} (${origKB} KB -> ${newKB} KB, -${res.ratio}%)`);
      } else {
        console.error(`[${finished}/${total}] 失败: ${res.path}, 原因: ${res.msg}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i));
  await Promise.all(workers);
  return results;
}

function updateMarkdownChecklist(results) {
  const okMap = new Map();
  for (const r of results) {
    if (r.status === 'ok') {
      okMap.set(r.path, r);
    }
  }

  let content = fs.readFileSync(MD_PATH, 'utf-8');
  for (const [filePath, info] of okMap.entries()) {
    const newKB = (info.newSize / 1024).toFixed(1) + ' KB';
    const escaped = filePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(\\| \\d+ \\| \`${escaped}\` \\| [^|]+ \\| [^|]+ \\| )\\[ \\] 待压缩`);
    content = content.replace(regex, `$1[x] 已压缩 (${newKB})`);
  }
  fs.writeFileSync(MD_PATH, content, 'utf-8');
}

async function main() {
  const files = getTargetFiles();
  console.log(`准备全量压缩 ${files.length} 个美术资源（并发数: 2，带超时保护与断点缓存）...`);
  const startTime = Date.now();

  const results = await runQueue(files, 2);

  const okResults = results.filter(r => r.status === 'ok');
  const totalOrig = okResults.reduce((sum, r) => sum + r.origSize, 0);
  const totalNew = okResults.reduce((sum, r) => sum + r.newSize, 0);
  const savedMB = ((totalOrig - totalNew) / (1024 * 1024)).toFixed(2);
  const overallRatio = ((totalOrig - totalNew) / totalOrig * 100).toFixed(1);
  const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n============================================================');
  console.log(`全部压缩流程执行完毕！耗时: ${elapsedSec} 秒`);
  console.log(`成功数量: ${okResults.length} / ${files.length}`);
  console.log(`压缩前总体积: ${(totalOrig / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`压缩后总体积: ${(totalNew / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`节省空间: ${savedMB} MB (总体缩减 -${overallRatio}%)`);

  updateMarkdownChecklist(results);
  console.log('已同步更新 docs/act3_assets_compression_list.md 状态标记。');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
