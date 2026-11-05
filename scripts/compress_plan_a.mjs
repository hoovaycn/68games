import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2';
const AUTH_HEADER = 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64');
const TARGETS_FILE = path.resolve('scripts/plan_a_targets.json');
const CACHE_FILE = path.resolve('scripts/.tinypng_cache.json');
const MAX_CONCURRENT = 1;

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
    try {
        cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    } catch (e) {
        cache = {};
    }
}

function saveCache() {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
}

function shrinkImage(filePath) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 3;

        function tryShrink() {
            attempts++;
            const fileData = fs.readFileSync(filePath);
            const options = {
                hostname: 'api.tinify.com',
                port: 443,
                path: '/shrink',
                method: 'POST',
                headers: {
                    'Authorization': AUTH_HEADER,
                    'Content-Type': 'application/octet-stream',
                    'Content-Length': fileData.length,
                    'User-Agent': 'curl/7.68.0'
                },
                timeout: 90000
            };

            const req = https.request(options, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const parsed = JSON.parse(body);
                            resolve(parsed);
                        } catch (e) {
                            if (attempts < maxAttempts) {
                                setTimeout(tryShrink, 2000);
                            } else {
                                reject(new Error(`Invalid JSON from shrink: ${body}`));
                            }
                        }
                    } else {
                        if (attempts < maxAttempts && res.statusCode >= 500) {
                            setTimeout(tryShrink, 2000);
                        } else {
                            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                        }
                    }
                });
            });

            req.on('error', (err) => {
                if (attempts < maxAttempts) {
                    setTimeout(tryShrink, 2000);
                } else {
                    reject(err);
                }
            });

            req.on('timeout', () => {
                req.destroy();
                if (attempts < maxAttempts) {
                    setTimeout(tryShrink, 2000);
                } else {
                    reject(new Error('Shrink request timeout'));
                }
            });

            req.write(fileData);
            req.end();
        }

        tryShrink();
    });
}

function downloadImage(url, destPath, expectedSize) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 5;

        function tryDownload() {
            attempts++;
            const chunks = [];
            const req = https.get(url, {
                headers: {
                    'Authorization': AUTH_HEADER,
                    'User-Agent': 'Mozilla/5.0'
                },
                timeout: 60000
            }, (res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    res.on('data', chunk => chunks.push(chunk));
                    res.on('end', () => {
                        const buffer = Buffer.concat(chunks);
                        if (expectedSize && buffer.length !== expectedSize) {
                            if (attempts < maxAttempts) {
                                setTimeout(tryDownload, 1000);
                            } else {
                                reject(new Error(`Size mismatch: expected ${expectedSize}, got ${buffer.length}`));
                            }
                        } else {
                            fs.writeFileSync(destPath, buffer);
                            resolve(buffer.length);
                        }
                    });
                } else {
                    if (attempts < maxAttempts) {
                        setTimeout(tryDownload, 1000);
                    } else {
                        reject(new Error(`Download failed with status ${res.statusCode}`));
                    }
                }
            });

            req.on('error', (err) => {
                if (attempts < maxAttempts) {
                    setTimeout(tryDownload, 1000);
                } else {
                    reject(err);
                }
            });

            req.on('timeout', () => {
                req.destroy();
                if (attempts < maxAttempts) {
                    setTimeout(tryDownload, 1000);
                } else {
                    reject(new Error('Download timeout'));
                }
            });
        }

        tryDownload();
    });
}

async function processFile(relPath) {
    const absPath = path.resolve(relPath);
    if (!fs.existsSync(absPath)) {
        return { path: relPath, status: 'missing' };
    }

    const origSize = fs.statSync(absPath).size;

    // 如果已经在缓存中且是成功状态，跳过
    if (cache[relPath] && cache[relPath].status === 'ok') {
        return {
            path: relPath,
            status: 'cached',
            origSize: cache[relPath].origSize,
            newSize: cache[relPath].newSize
        };
    }

    try {
        const shrinkRes = await shrinkImage(absPath);
        const downloadUrl = shrinkRes.output.url;
        const expectedSize = shrinkRes.output.size;
        const newSize = await downloadImage(downloadUrl, absPath, expectedSize);

        cache[relPath] = {
            status: 'ok',
            origSize,
            newSize,
            ratio: (origSize - newSize) / origSize,
            time: new Date().toISOString()
        };
        saveCache();

        return {
            path: relPath,
            status: 'ok',
            origSize,
            newSize,
            ratio: (origSize - newSize) / origSize
        };
    } catch (e) {
        return { path: relPath, status: 'error', error: e.message };
    }
}

async function main() {
    const targets = JSON.parse(fs.readFileSync(TARGETS_FILE, 'utf-8'));
    console.log(`准备压制方案 A 的 ${targets.length} 个核心图片资源...`);
    console.log(`并发度: ${MAX_CONCURRENT}`);

    let completed = 0;
    let totalSaved = 0;
    let totalOrig = 0;
    let totalNew = 0;
    const startTime = Date.now();

    async function worker(queue) {
        while (queue.length > 0) {
            const relPath = queue.shift();
            const res = await processFile(relPath);
            completed++;

            if (res.status === 'ok') {
                const saved = res.origSize - res.newSize;
                totalSaved += saved;
                totalOrig += res.origSize;
                totalNew += res.newSize;
                console.log(`[${completed}/${targets.length}] ✓ 压缩成功: ${relPath} ` +
                    `(${(res.origSize/1024).toFixed(1)}KB -> ${(res.newSize/1024).toFixed(1)}KB, -${(res.ratio*100).toFixed(1)}%)`);
            } else if (res.status === 'cached') {
                totalOrig += res.origSize;
                totalNew += res.newSize;
                totalSaved += (res.origSize - res.newSize);
                console.log(`[${completed}/${targets.length}] ⏭ 已缓存跳过: ${relPath} ` +
                    `(${(res.origSize/1024).toFixed(1)}KB -> ${(res.newSize/1024).toFixed(1)}KB)`);
            } else {
                console.error(`[${completed}/${targets.length}] ✗ 失败: ${relPath} - ${res.error || res.status}`);
            }
        }
    }

    const queue = [...targets];
    const workers = [];
    for (let i = 0; i < MAX_CONCURRENT; i++) {
        workers.push(worker(queue));
    }

    await Promise.all(workers);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('='.repeat(60));
    console.log(`全量方案 A 压制完成！耗时: ${elapsed}秒`);
    console.log(`处理文件: ${completed}/${targets.length}`);
    console.log(`原体积: ${(totalOrig / (1024*1024)).toFixed(2)} MB`);
    console.log(`压缩后: ${(totalNew / (1024*1024)).toFixed(2)} MB`);
    console.log(`共节省空间: ${(totalSaved / (1024*1024)).toFixed(2)} MB (-${((totalSaved/totalOrig)*100).toFixed(1)}%)`);
}

main().catch(console.error);
