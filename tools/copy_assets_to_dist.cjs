/**
 * 将项目根目录的 assets/（图片、音频等运行时相对路径资源）复制到 dist/assets/
 * 用于 vite build 之后、electron 打包之前，保证桌面端能通过 file:// 正常加载素材
 *
 * 上传瘦身：项目里每张图都同时交付了 1x 与 @2x 两版，而运行时代码统一引用 @2x。
 * 为避免 Cloudflare Pages 直传的 1000 文件上限，这里跳过「有同名 @2x 伴生文件」的
 * 1x 图，并在复制后清理历史构建可能残留的 1x 图，让 dist 只保留高清版。
 */
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'assets');
const dest = path.resolve(__dirname, '..', 'dist', 'assets');

if (!fs.existsSync(src)) {
  console.warn('[copy-assets] 未找到 assets 目录，跳过复制');
  process.exit(0);
}

function shouldSkip(sourcePath) {
  // 只处理 PNG：跳过 1x 版（存在同名 @2x 伴生文件时）
  if (!/\.png$/i.test(sourcePath)) return false;
  if (/@2x\.png$/i.test(sourcePath)) return false;
  const base = sourcePath.replace(/\.png$/i, '');
  return fs.existsSync(base + '@2x.png');
}

// 合并复制，不删除 dist/assets 已有文件（vite 生成的 JS/CSS bundle 也在此目录，删了会黑屏）
fs.cpSync(src, dest, { recursive: true, force: true, filter: (s) => !shouldSkip(s) });

// 清理历史构建残留：若 vite 未清空 dist，这里把已跳过的 1x 图从 dest 中删掉
function cleanStale(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanStale(p);
    } else if (shouldSkip(p)) {
      fs.rmSync(p, { force: true });
    }
  }
}
cleanStale(dest);

console.log('[copy-assets] assets -> dist/assets 完成（已跳过 1x 图，仅保留 @2x）');
