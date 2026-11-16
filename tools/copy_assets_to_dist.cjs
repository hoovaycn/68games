/**
 * 将项目根目录的 assets/（图片、音频等运行时相对路径资源）复制到 dist/assets/
 * 用于 vite build 之后、electron 打包之前，保证桌面端能通过 file:// 正常加载素材
 *
 * 上传瘦身：项目里每张图都同时交付了 1x 与 @2x 两版，而运行时代码统一引用 @2x。
 * 为避免 Cloudflare Pages 直传的 1000 文件上限，这里跳过「有同名 @2x 伴生文件」的
 * 1x 图，让 dist 只保留高清版。
 */
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'assets');
const dest = path.resolve(__dirname, '..', 'dist', 'assets');

if (!fs.existsSync(src)) {
  console.warn('[copy-assets] 未找到 assets 目录，跳过复制');
  process.exit(0);
}

// 上传瘦身：跳过 1x PNG（存在同名 @2x 伴生文件时）
function shouldSkip(sourcePath) {
  if (!/\.png$/i.test(sourcePath)) return false;
  if (/@2x\.png$/i.test(sourcePath)) return false;
  const base = sourcePath.replace(/\.png$/i, '');
  return fs.existsSync(base + '@2x.png');
}

/**
 * 递归镜像同步目录：将 srcDir 的内容完全同步到 destDir，
 * 同时删除 destDir 中源目录不存在、或被跳过的 1x 图（保持纯净，避免旧素材残留导致体积膨胀）
 */
function syncDirectory(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const srcEntries = fs.readdirSync(srcDir, { withFileTypes: true });
  const srcNames = new Set(srcEntries.map(e => e.name));

  // 1. 删除 destDir 中多余的文件或文件夹
  const destEntries = fs.readdirSync(destDir, { withFileTypes: true });
  for (const entry of destEntries) {
    if (!srcNames.has(entry.name)) {
      const fullDest = path.join(destDir, entry.name);
      fs.rmSync(fullDest, { recursive: true, force: true });
    }
  }

  // 2. 复制并递归同步（跳过 1x 图，并清理 dest 中已跳过的 1x 残留）
  for (const entry of srcEntries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      syncDirectory(srcPath, destPath);
    } else if (shouldSkip(srcPath)) {
      // 1x 图跳过复制，同时删除历史构建可能残留的同名 dest 文件
      fs.rmSync(destPath, { force: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 遍历 assets/ 的顶层条目逐项同步：
// 子目录（art, audio, backgrounds 等）进行镜像同步，
// 顶层文件复制，同时保护 dist/assets/ 根目录下 vite 生成的 index-*.js / css bundle 不受影响。
const topEntries = fs.readdirSync(src, { withFileTypes: true });
for (const entry of topEntries) {
  const srcItem = path.join(src, entry.name);
  const destItem = path.join(dest, entry.name);
  if (entry.isDirectory()) {
    syncDirectory(srcItem, destItem);
  } else if (!shouldSkip(srcItem)) {
    fs.copyFileSync(srcItem, destItem);
  }
}

console.log('[copy-assets] assets -> dist/assets 完成（镜像同步 + 跳过 1x 图，仅保留 @2x）');
