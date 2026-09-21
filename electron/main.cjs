/**
 * Electron 主进程：内置本地静态 HTTP 服务，游戏跑在 http://127.0.0.1 下
 * 与开发环境（vite http server）一致，规避 file:// 协议下的 CORS/localStorage 等全部坑。
 * 只监听 127.0.0.1 回环地址，不对外网暴露。
 */
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

// 常见静态资源 MIME 表（游戏用到 png/ogg/mp3/wav/json 等）
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.md': 'text/plain; charset=utf-8',
};

let server = null;

/**
 * 启动静态文件服务器，root 为 dist 目录。
 * 监听 127.0.0.1 + 随机端口，返回实际端口。
 */
function startServer(rootDir) {
  if (server) return Promise.resolve(server.address().port);

  return new Promise((resolve) => {
    server = http.createServer((req, res) => {
      try {
        const url = new URL(req.url, 'http://127.0.0.1');
        let pathname = decodeURIComponent(url.pathname);
        if (pathname === '/') pathname = '/index.html';

        // 用 '.' + pathname 强制相对，再 resolve，防止 ../ 目录穿越
        const filePath = path.resolve(rootDir, '.' + pathname);
        if (!filePath.startsWith(path.resolve(rootDir) + path.sep) && filePath !== path.resolve(rootDir)) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not Found');
            return;
          }
          const ext = path.extname(filePath).toLowerCase();
          res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            // 关键：允许 CORS，配合 assetLoader 的 crossOrigin 做 Canvas 去色键
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
          });
          res.end(data);
        });
      } catch (e) {
        res.writeHead(500);
        res.end('Server Error');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      resolve(server.address().port);
    });
  });
}

async function createWindow() {
  const distDir = path.join(__dirname, '..', 'dist');
  const port = await startServer(distDir);

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    autoHideMenuBar: true,
    resizable: true,
    backgroundColor: '#0e0d0c',
    title: '《六 8 班异闻录》- 校园悬疑战棋',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);
  await win.loadURL(`http://127.0.0.1:${port}/index.html`);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (server) {
    server.close();
    server = null;
  }
});
