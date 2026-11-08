import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'Ql1RT8dcJlDGfnC2ngmlSpZL0tQnNkg2';
const AUTH_HEADER = 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64');
const CACHE_FILE = path.resolve('scripts/.tinypng_cache.json');

const DEFAULT_FILES = [
    'assets/backgrounds/bg_memory_cabin_explosion.png',
    'assets/backgrounds/bg_memory_cabin_explosion@2x.png',
    'assets/backgrounds/bg_memory_teachers_hold_gate.png',
    'assets/backgrounds/bg_memory_teachers_hold_gate@2x.png',
    'assets/backgrounds/bg_memory_haifeng_lifeboat.png',
    'assets/backgrounds/bg_memory_haifeng_lifeboat@2x.png',
    'assets/backgrounds/bg_memory_ship_sinking.png',
    'assets/backgrounds/bg_memory_ship_sinking@2x.png'
];

// 支持命令行指定单文件重试：node scripts/compress_ch25_memory.mjs assets/backgrounds/xxx.png
const FILES = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_FILES;

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
    try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')); } catch (e) { cache = {}; }
}

function upload(absPath) {
    return new Promise((resolve, reject) => {
        const buf = fs.readFileSync(absPath);
        const req = https.request({
            hostname: 'api.tinify.com', port: 443, path: '/shrink', method: 'POST',
            headers: {
                'Authorization': AUTH_HEADER,
                'Content-Type': 'application/octet-stream',
                'Content-Length': buf.length,
                'User-Agent': 'curl/7.68.0'
            },
            timeout: 180000
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try { resolve(JSON.parse(body).output.url); }
                    catch (e) { reject(new Error('parse: ' + body.slice(0, 200))); }
                } else reject(new Error(`shrink ${res.statusCode}: ${body.slice(0, 200)}`));
            });
        });
        req.on('error', reject);
        req.on('timeout', () => req.destroy(new Error('upload timeout')));
        req.write(buf);
        req.end();
    });
}

function downloadTo(url, absPath, attempt = 1) {
    return new Promise((resolve, reject) => {
        const tmp = absPath + '.part';
        const start = fs.existsSync(tmp) ? fs.statSync(tmp).size : 0;
        const headers = { 'Authorization': AUTH_HEADER, 'User-Agent': 'curl/7.68.0' };
        if (start > 0) headers['Range'] = `bytes=${start}-`;

        const req = https.get(url, { headers, timeout: 180000 }, (res) => {
            if (res.statusCode !== 200 && res.statusCode !== 206) {
                return reject(new Error(`download ${res.statusCode}`));
            }
            const append = res.statusCode === 206 && start > 0;
            const ws = fs.createWriteStream(tmp, { flags: append ? 'a' : 'w' });
            res.pipe(ws);
            ws.on('finish', () => { ws.close(() => resolve(tmp)); });
            ws.on('error', reject);
            res.on('error', (e) => reject(e));
        });
        req.on('error', async (e) => {
            await new Promise(r => setTimeout(r, 1500));
            if (attempt < 5) {
                try { resolve(await downloadTo(url, absPath, attempt + 1)); }
                catch (err) { reject(err); }
            } else reject(e);
        });
        req.on('timeout', () => req.destroy(new Error('download timeout')));
    });
}

async function processFile(relPath) {
    const absPath = path.resolve(relPath);
    const origSize = fs.statSync(absPath).size;
    const url = await upload(absPath);
    const tmp = await downloadTo(url, absPath);
    const newSize = fs.statSync(tmp).size;
    if (newSize >= origSize) {
        fs.unlinkSync(tmp);
        console.log('  - 无收益，保留原图');
        return { origSize, newSize: origSize, ratio: 0, skipped: true };
    }
    fs.renameSync(tmp, absPath);
    return { origSize, newSize, ratio: (origSize - newSize) / origSize };
}

async function main() {
    console.log(`TinyPNG 压缩 ${FILES.length} 张第二十五章回忆背景...`);
    for (let i = 0; i < FILES.length; i++) {
        const p = FILES[i];
        console.log(`[${i + 1}/${FILES.length}] ${p}`);
        let done = false;
        for (let attempt = 1; attempt <= 3 && !done; attempt++) {
            try {
                const res = await processFile(p);
                cache[p] = { status: res.skipped ? 'no-gain' : 'ok', ...res, time: new Date().toISOString() };
                fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
                console.log(`  ✓ ${(res.origSize / 1024).toFixed(1)}KB -> ${(res.newSize / 1024).toFixed(1)}KB (-${(res.ratio * 100).toFixed(1)}%)`);
                done = true;
            } catch (e) {
                console.warn(`  ⚠️ 第 ${attempt} 次失败: ${e.message}`);
                if (attempt === 3) console.error(`  ✗ 跳过: ${p}`);
                await new Promise(r => setTimeout(r, 2500));
            }
        }
    }
    console.log('完成。');
}

main().catch(console.error);
