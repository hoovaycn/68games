import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2';
const AUTH_HEADER = 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64');
const CACHE_FILE = path.resolve('scripts/.tinypng_cache.json');

const FILES = [
    'assets/backgrounds/bg_metal_case.png',
    'assets/backgrounds/bg_metal_case@2x.png',
    'assets/backgrounds/bg_metal_case_open_badge.png',
    'assets/backgrounds/bg_metal_case_open_badge@2x.png'
];

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
    try {
        cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    } catch (e) {
        cache = {};
    }
}

function shrinkAndDownload(relPath) {
    return new Promise((resolve, reject) => {
        const absPath = path.resolve(relPath);
        const fileData = fs.readFileSync(absPath);
        const origSize = fileData.length;

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
                                reject(new Error(`Download failed: ${dlRes.statusCode}`));
                            }
                        });
                        dlReq.on('error', reject);
                    } catch (e) {
                        reject(new Error(`Parse error: ${body}`));
                    }
                } else {
                    reject(new Error(`Shrink HTTP ${res.statusCode}: ${body}`));
                }
            });
        });
        req.on('error', reject);
        req.write(fileData);
        req.end();
    });
}

async function main() {
    console.log(`准备使用 TinyPNG 压缩 ${FILES.length} 个新交付背景图...`);
    for (let i = 0; i < FILES.length; i++) {
        const p = FILES[i];
        console.log(`[${i+1}/${FILES.length}] 正在压缩: ${p} ...`);
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const res = await shrinkAndDownload(p);
                cache[p] = {
                    status: 'ok',
                    origSize: res.origSize,
                    newSize: res.newSize,
                    ratio: res.ratio,
                    time: new Date().toISOString()
                };
                fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
                console.log(`  ✓ 成功: ${(res.origSize/1024).toFixed(1)}KB -> ${(res.newSize/1024).toFixed(1)}KB (-${(res.ratio*100).toFixed(1)}%)`);
                break;
            } catch (e) {
                console.warn(`  ⚠️ 尝试 ${attempt} 失败: ${e.message}`);
                if (attempt === 3) console.error(`  ✗ 彻底跳过: ${p}`);
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }
    console.log('压缩流程结束！');
}

main().catch(console.error);
