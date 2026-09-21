/**
 * 将项目根目录的 assets/（图片、音频等运行时相对路径资源）复制到 dist/assets/
 * 用于 vite build 之后、electron 打包之前，保证桌面端能通过 file:// 正常加载素材
 */
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'assets');
const dest = path.resolve(__dirname, '..', 'dist', 'assets');

if (!fs.existsSync(src)) {
  console.warn('[copy-assets] 未找到 assets 目录，跳过复制');
  process.exit(0);
}

// 合并复制，不删除 dist/assets 已有文件（vite 生成的 JS/CSS bundle 也在此目录，删了会黑屏）
fs.cpSync(src, dest, { recursive: true, force: true });
console.log('[copy-assets] assets -> dist/assets 完成');
