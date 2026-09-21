/**
 * Tiled 地图渲染与图块集管理系统
 * 负责 Modern tiles_Free 贴图的高效加载、GID 坐标解析与 Canvas 瓦片绘制
 */

export const TILED_TILESETS = [
  {
    name: 'Interiors_free_48x48',
    firstgid: 1,
    src: 'assets/tiles/modern_free/Interiors_free_48x48.png',
    cols: 16,
    total: 1424,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Room_Builder_free_48x48',
    firstgid: 1425,
    src: 'assets/tiles/modern_free/Room_Builder_free_48x48.png',
    cols: 17,
    total: 391,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Tileset_48x48_1',
    firstgid: 1816,
    src: 'assets/tiles/modern_free/Tileset_48x48_1.png',
    cols: 10,
    total: 100,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Tileset_48x48_2',
    firstgid: 1916,
    src: 'assets/tiles/modern_free/Tileset_48x48_2.png',
    cols: 10,
    total: 100,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Tileset_48x48_3',
    firstgid: 2016,
    src: 'assets/tiles/modern_free/Tileset_48x48_3.png',
    cols: 10,
    total: 100,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Tileset_48x48_9',
    firstgid: 2116,
    src: 'assets/tiles/modern_free/Tileset_48x48_9.png',
    cols: 10,
    total: 100,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Tileset_48x48_16',
    firstgid: 2216,
    src: 'assets/tiles/modern_free/Tileset_48x48_16.png',
    cols: 12,
    total: 168,
    tileW: 48,
    tileH: 48
  },
  {
    name: 'Room_Builder',
    firstgid: 2384,
    src: 'assets/tiles/modern_free/Room_Builder_free_48x48.png',
    cols: 17,
    total: 391,
    tileW: 48,
    tileH: 48
  }
];

class TiledManager {
  constructor() {
    this.images = {};
    this.loaded = false;
    this.preload();
  }

  preload() {
    if (typeof window === 'undefined') return;
    let pending = TILED_TILESETS.length;
    TILED_TILESETS.forEach(ts => {
      const img = new Image();
      img.src = ts.src;
      img.onload = () => {
        this.images[ts.name] = img;
        pending--;
        if (pending === 0) {
          this.loaded = true;
        }
      };
      img.onerror = () => {
        console.warn(`[TiledManager] Failed to load tileset: ${ts.src}`);
        pending--;
      };
    });
  }

  /**
   * 根据 GID 找到对应的图块集及切片区域（支持水平/垂直镜像与对角线旋转）
   */
  getTileInfo(gid) {
    if (!gid || gid <= 0) return null;

    // Tiled 翻转/旋转掩码常量 (高 3 位)
    // 0x80000000 = 水平镜像 (X 翻转)
    // 0x40000000 = 垂直镜像 (Y 翻转)
    // 0x20000000 = 对角线翻转 (Z / 顺时针旋转90°时结合 X/Y 翻转)
    const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
    const FLIPPED_VERTICALLY_FLAG   = 0x40000000;
    const FLIPPED_DIAGONALLY_FLAG   = 0x20000000;

    const flipH = (gid & FLIPPED_HORIZONTALLY_FLAG) !== 0;
    const flipV = (gid & FLIPPED_VERTICALLY_FLAG) !== 0;
    const flipD = (gid & FLIPPED_DIAGONALLY_FLAG) !== 0;

    // 提取纯净的原始瓦片 ID
    const cleanGid = (gid & ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG)) >>> 0;
    if (cleanGid <= 0) return null;

    for (let i = TILED_TILESETS.length - 1; i >= 0; i--) {
      const ts = TILED_TILESETS[i];
      if (cleanGid >= ts.firstgid) {
        const localId = cleanGid - ts.firstgid;
        if (localId < ts.total) {
          const col = localId % ts.cols;
          const row = Math.floor(localId / ts.cols);
          return {
            img: this.images[ts.name],
            sx: col * ts.tileW,
            sy: row * ts.tileH,
            sw: ts.tileW,
            sh: ts.tileH,
            flipH,
            flipV,
            flipD
          };
        }
      }
    }
    return null;
  }

  /**
   * 绘制 2D 瓦片网格到 Canvas（完美支持 Tiled 的旋转与翻转变换）
   */
  renderLayer(ctx, grid, ox, oy, tileSize) {
    if (!grid || !Array.isArray(grid)) return;

    for (let y = 0; y < grid.length; y++) {
      const row = grid[y];
      if (!row) continue;
      for (let x = 0; x < row.length; x++) {
        const gid = row[x];
        if (!gid) continue;

        const tile = this.getTileInfo(gid);
        if (tile && tile.img) {
          const dx = ox + x * tileSize;
          const dy = oy + y * tileSize;

          // 若瓦片没有经过旋转或镜像，走最快的原生绘制
          if (!tile.flipH && !tile.flipV && !tile.flipD) {
            ctx.drawImage(
              tile.img,
              tile.sx, tile.sy, tile.sw, tile.sh,
              dx, dy, tileSize, tileSize
            );
          } else {
            // 支持 Tiled 矩阵变换 (Z-旋转 / X-水平镜像 / Y-垂直镜像)
            ctx.save();
            ctx.translate(dx + tileSize / 2, dy + tileSize / 2);

            if (tile.flipD) {
              // 对角线翻转等价于顺时针旋转90°并水平翻转
              ctx.rotate(Math.PI / 2);
              ctx.scale(-1, 1);
            }
            ctx.scale(tile.flipH ? -1 : 1, tile.flipV ? -1 : 1);

            ctx.drawImage(
              tile.img,
              tile.sx, tile.sy, tile.sw, tile.sh,
              -tileSize / 2, -tileSize / 2, tileSize, tileSize
            );
            ctx.restore();
          }
        }
      }
    }
  }
}

export const tiledManager = new TiledManager();
