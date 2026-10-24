const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// 密钥仅从环境变量读取，禁止硬编码入库（参见 docs/art_time_passage_requirement.md）。
// 用法：TINYPNG_KEY=xxxx npm run compress:images
const TINYPNG_API_KEY = process.env.TINYPNG_KEY || '';
const ASSETS_DIR = path.resolve(__dirname, '../assets');
const DIST_ASSETS_DIR = path.resolve(__dirname, '../dist/assets');
const CACHE_FILE = path.resolve(__dirname, '../.tinypng_cache.json');

// 加载压缩缓存记录
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

function getFileMd5(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buffer).digest('hex');
}

// 统一用正斜杠记录相对路径。
// 缓存里存的是 'assets/xxx.png'，而 Windows 下 path.relative() 返回 'assets\xxx.png'，
// 不归一化会导致已压过的文件全部判定为「未压」而重复消耗 TinyPNG 额度。
function relKey(filePath) {
  return path.relative(path.resolve(__dirname, '..'), filePath).split(path.sep).join('/');
}

// 递归遍历所有 png/jpg 图片
function getAllImages(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllImages(fullPath, fileList);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// 支持命令行指定单个/多个文件，避免批量扫描烧掉 TinyPNG 月度额度
function resolveTargets() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
  if (args.length === 0) return null; // null = 全量模式
  return args.map(a => path.resolve(process.cwd(), a)).filter(p => {
    if (!fs.existsSync(p)) { console.error(`[SKIP] 文件不存在: ${p}`); return false; }
    return true;
  });
}

// 调用 TinyPNG API 压缩单个图片
function compressImage(filePath) {
  return new Promise((resolve, reject) => {
    const originalSize = fs.statSync(filePath).size;
    const fileData = fs.readFileSync(filePath);

    const auth = Buffer.from(`api:${TINYPNG_API_KEY}`).toString('base64');

    const req = https.request({
      hostname: 'api.tinify.com',
      port: 443,
      path: '/shrink',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileData.length
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const data = JSON.parse(body);
            const downloadUrl = data.output && data.output.url;
            if (!downloadUrl) return reject(new Error('未获取到压缩后的下载地址'));

            // 下载压缩后的图片并覆盖源文件
            https.get(downloadUrl, (dlRes) => {
              const chunks = [];
              dlRes.on('data', c => chunks.push(c));
              dlRes.on('end', () => {
                const compressedBuffer = Buffer.concat(chunks);
                fs.writeFileSync(filePath, compressedBuffer);
                const compressedSize = compressedBuffer.length;
                const savedRatio = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
                
                // 写入缓存记录
                const relPath = relKey(filePath);
                cache[relPath] = {
                  originalSize,
                  compressedSize,
                  md5: getFileMd5(filePath),
                  compressedAt: new Date().toISOString()
                };
                saveCache();

                console.log(`[OK] ${relPath}: ${(originalSize/1024).toFixed(1)}KB -> ${(compressedSize/1024).toFixed(1)}KB (-${savedRatio}%)`);
                resolve({ originalSize, compressedSize });
              });
            }).on('error', reject);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(`TinyPNG API 错误 [HTTP ${res.statusCode}]: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

// 批量并发控制执行
async function runCompression() {
  if (!TINYPNG_API_KEY) {
    console.error('未设置 TINYPNG_KEY 环境变量，已跳过。请这样执行：');
    console.error('  Windows(Git Bash): TINYPNG_KEY=你的key npm run compress:images');
    console.error('  PowerShell      : $env:TINYPNG_KEY="你的key"; npm run compress:images');
    return;
  }
  console.log('正在扫描 assets 原始图片并对比缓存...');
  const explicit = resolveTargets();
  const allImages = explicit || getAllImages(ASSETS_DIR);

  // 过滤出未压缩过或有变动的图片（指定文件模式下强制重压）
  const pendingImages = explicit || allImages.filter(file => {
    const relPath = relKey(file);
    if (!cache[relPath]) return true;
    const currentMd5 = getFileMd5(file);
    return cache[relPath].md5 !== currentMd5;
  });

  console.log(`总图片数: ${allImages.length} | 待压缩图片: ${pendingImages.length} | 已跳过(已压缩): ${allImages.length - pendingImages.length}`);

  if (pendingImages.length === 0) {
    console.log('所有图片已是最新压缩状态，无需重复消耗 TinyPNG 额度。');
    return;
  }

  // 按文件体积降序优先压缩大图（如背景图、CG图）
  pendingImages.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);

  const CONCURRENCY = 4;
  let currentIndex = 0;
  let totalSavedBytes = 0;

  async function worker() {
    while (currentIndex < pendingImages.length) {
      const idx = currentIndex++;
      const file = pendingImages[idx];
      try {
        const res = await compressImage(file);
        totalSavedBytes += (res.originalSize - res.compressedSize);
      } catch (err) {
        console.error(`[FAIL] ${path.relative(process.cwd(), file)}:`, err.message);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  console.log(`\n========================================`);
  console.log(`本次压缩完成！共节省体积: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`========================================\n`);
}

runCompression();
