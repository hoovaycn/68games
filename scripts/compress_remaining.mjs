import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2';
const AUTH_HEADER = 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64');
const CACHE_FILE = path.resolve('scripts/.tinypng_cache.json');
const TARGETS_FILE = path.resolve('scripts/plan_a_targets.json');

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

function shrinkAndDownload(relPath) {
    return new Promise((resolve, reject) => {
        const absPath = path.resolve(relPath);
        if (!fs.existsSync(absPath)) {
            return reject(new Error('File not found: ' + absPath));
        }

        const fileData = fs.readFileSync(absPath);
        const origSize = fileData.length;

        // 步骤 1: POST /shrink
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
            timeout: 120000
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const parsed = JSON.parse(body);
                        const dlUrl = parsed.output.url;
                        const expectedSize = parsed.output.size;

                        // 步骤 2: 下载压缩结果
                        const chunks = [];
                        const dlReq = https.get(dlUrl, {
                            headers: {
                                'Authorization': AUTH_HEADER,
                                'User-Agent': 'curl/7.68.0'
                            },
                            timeout: 120000
                        }, (dlRes) => {
                            if (dlRes.statusCode >= 200 && dlRes.statusCode < 300) {
                                dlRes.on('data', c => chunks.push(c));
                                dlRes.on('end', () => {
                                    const compBuffer = Buffer.concat(chunks);
                                    fs.writeFileSync(absPath, compBuffer);
                                    resolve({
                                        origSize,
                                        newSize: compBuffer.length,
                                        ratio: (origSize - compBuffer.length) / origSize
                                    });
                                });
                            } else {
                                reject(new Error(`Download failed with status ${dlRes.statusCode}`));
                            }
                        });

                        dlReq.on('error', (err) => {
                            reject(err);
                        });
                        dlReq.on('timeout', () => {
                            dlReq.destroy();
                            reject(new Error('Download timeout'));
                        });
                    } catch (e) {
                        reject(new Error(`Parse shrink response error: ${body}`));
                    }
                } else {
                    reject(new Error(`Shrink HTTP ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Shrink request timeout'));
        });

        req.write(fileData);
        req.end();
    });
}

async function main() {
    const targets = JSON.parse(fs.readFileSync(TARGETS_FILE, 'utf-8'));
    const remaining = targets.filter(t => !cache[t] || cache[t].status !== 'ok');

    console.log(`开始单任务串行压制剩余 ${remaining.length} 个大背景图...`);

    for (let i = 0; i < remaining.length; i++) {
        const relPath = remaining[i];
        console.log(`[${i + 1}/${remaining.length}] 正在压制: ${relPath} ...`);

        let success = false;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const res = await shrinkAndDownload(relPath);
                cache[relPath] = {
                    status: 'ok',
                    origSize: res.origSize,
                    newSize: res.newSize,
                    ratio: res.ratio,
                    time: new Date().toISOString()
                };
                saveCache();
                console.log(`  ✓ 成功: ${(res.origSize/1024).toFixed(1)}KB -> ${(res.newSize/1024).toFixed(1)}KB (-${(res.ratio*100).toFixed(1)}%)`);
                success = true;
                break;
            } catch (e) {
                console.warn(`  ⚠️ 尝试 ${attempt} 失败: ${e.message}`);
                await new Promise(r => setTimeout(r, 2000));
            }
        }

        if (!success) {
            console.error(`  ✗ 彻底跳过: ${relPath}`);
        }
    }

    console.log('='.repeat(50));
    console.log('剩余背景大图处理流程结束！');
}

main().catch(console.error);
