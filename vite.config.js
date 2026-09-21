import { defineConfig } from 'vite';
import { exec } from 'child_process';
import path from 'path';

// 自定义 Tiled 地图即时热同步插件
function tiledSyncPlugin() {
  let syncing = false;
  return {
    name: 'tiled-sync-plugin',
    configureServer(server) {
      const projectRoot = process.cwd();
      const tmxDir = path.resolve(projectRoot, 'docs/map/tiled_project');

      server.watcher.add(tmxDir);
      server.watcher.on('change', (filePath) => {
        if (filePath.endsWith('.tmx')) {
          if (syncing) return;
          syncing = true;
          console.log(`\n[Tiled Watcher] 检测到地图变更: ${path.basename(filePath)}，正在同步...`);
          exec('node tools/sync_tmx_levels.cjs', { cwd: projectRoot }, (err, stdout) => {
            syncing = false;
            if (err) {
              console.error('[Tiled Watcher] 同步出错:', err);
            } else {
              console.log('[Tiled Watcher] 地图已同步完成并热生效！');
            }
          });
        }
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [tiledSyncPlugin()],
  server: {
    port: 6868,
    strictPort: true,
  },
});
