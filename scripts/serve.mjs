// 零依赖静态资源服务器：node scripts/serve.mjs [--port 8888] [--root <dir>]
// 用途：纯前端战棋工程的本地启动（等价于 macOS 上的 python3 -m http.server，跨平台）
import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ---- 参数解析 ----
const argv = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const PORT = Number(argOf('--port', '8888')) || 8888;
const HOST = argOf('--host', '127.0.0.1');
// root 默认 = 项目根（本脚本所在 scripts/ 的上一级），与 cwd 无关
const ROOT_DEFAULT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(argOf('--root', ROOT_DEFAULT));

// ---- MIME 表 ----
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// ---- 请求处理 ----
const server = http.createServer(async (req, res) => {
  try {
    // 去掉查询串并解码 %xx；'/' 或无扩展名 → index.html
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

    // 路径安全：resolve 后必须落在 ROOT 内（防 ../ 逃逸）
    const filePath = path.resolve(ROOT, '.' + urlPath);
    if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
      res.writeHead(403); res.end('403 Forbidden'); return;
    }

    const data = await fs.readFile(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  } catch {
    // 文件不存在或不可读 → 404
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[fx_game] 静态服务已启动`);
  console.log(`  根目录: ${ROOT}`);
  console.log(`  地址  : http://${HOST}:${PORT}`);
  console.log(`  停止  : Ctrl+C`);
});
