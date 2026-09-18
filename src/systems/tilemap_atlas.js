/**
 * Kenney City 图集与 3×3 像素级复合地形渲染系统
 * 
 * 1. 图集规格：roguelikeCity_full_transparent.png (628×475px)
 *    - 块尺寸 16×16 px
 *    - 图块间距 margin: 1 px
 *    - 采样步长 stride: 17 px
 * 2. 战棋单元格架构：
 *    - 基准单元格为 48×48 px
 *    - 内部切分为 3×3 个 16×16 px 的原生子图块
 *    - 实现 1:1 像素点对点原生采样，彻底告别单块拉伸模糊
 * 3. 自适应九宫格（Autotiling）与自然变体：
 *    - 边缘自动识别地形边界过渡
 *    - 大面积地形内部自动采用确定性伪随机变体，消除平铺机械感
 */

export const ATLAS_CONFIG = {
  sheetSrc: 'assets/tiles/kenney/roguelikeCity_full_transparent.png',
  tileSize: 16,
  margin: 1,
  stride: 17,
  cols: 37,
  rows: 28,
  subDivisions: 3 // 每个战棋单元格包含 3×3 个子图块
};

/**
 * 确定性伪随机散列函数：确保特定格子坐标与子格子索引每次渲染生成的变体完全一致，不随帧刷新跳动
 */
export function pseudoRandom(x, y, subX, subY, seed = 1337) {
  let h = seed + x * 374761393 + y * 668265263 + subX * 3628273 + subY * 7919;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/**
 * 地形九宫格与图块池字典配置
 * 每个地形包含：
 * - fallbackColor: 图片未加载时的底色
 * - nineSlice: [TL, T, TR, L, C, R, BL, B, BR] 边缘过渡子图块 (col, row)
 * - centerVariations: 内部主纹理的变体候选池，用于消除单调感
 */
export const TERRAIN_ATLAS_MAP = {
  // 1. 绿茵草坪 / 绿化带
  grass: {
    fallbackColor: '#16a34a',
    nineSlice: {
      tl: { col: 32, row: 2 },
      t:  { col: 33, row: 2 },
      tr: { col: 34, row: 2 },
      l:  { col: 0,  row: 24 },
      c:  { col: 1,  row: 24 },
      r:  { col: 3,  row: 25 },
      bl: { col: 4,  row: 25 },
      b:  { col: 3,  row: 26 },
      br: { col: 4,  row: 26 }
    },
    centerVariations: [
      { col: 1,  row: 24, weight: 10 }, // 经典纯草坪
      { col: 0,  row: 24, weight: 1 }  // 极少量的细微草尖变体
    ]
  },

  // 2. 红色塑胶跑道 / 红砖地面 (使用纯净无接缝的红砖地块)
  track: {
    fallbackColor: '#9c6257',
    nineSlice: {
      tl: { col: 6, row: 0 }, t:  { col: 6, row: 0 }, tr: { col: 6, row: 0 },
      l:  { col: 6, row: 0 }, c:  { col: 6, row: 0 }, r:  { col: 6, row: 0 },
      bl: { col: 6, row: 0 }, b:  { col: 6, row: 0 }, br: { col: 6, row: 0 }
    },
    centerVariations: [ { col: 6, row: 0, weight: 1 } ]
  },

  brick: {
    fallbackColor: '#885247',
    nineSlice: {
      tl: { col: 6, row: 0 }, t:  { col: 6, row: 0 }, tr: { col: 6, row: 0 },
      l:  { col: 6, row: 0 }, c:  { col: 6, row: 0 }, r:  { col: 6, row: 0 },
      bl: { col: 6, row: 0 }, b:  { col: 6, row: 0 }, br: { col: 6, row: 0 }
    },
    centerVariations: [ { col: 6, row: 0, weight: 1 } ]
  },

  // 3. 跳远沙坑 / 细沙地 (纯净无接缝沙地)
  sand_pit: {
    fallbackColor: '#c1b191',
    nineSlice: {
      tl: { col: 30, row: 0 }, t:  { col: 30, row: 0 }, tr: { col: 30, row: 0 },
      l:  { col: 30, row: 0 }, c:  { col: 30, row: 0 }, r:  { col: 30, row: 0 },
      bl: { col: 30, row: 0 }, b:  { col: 30, row: 0 }, br: { col: 30, row: 0 }
    },
    centerVariations: [ { col: 30, row: 0, weight: 1 } ]
  },

  // 4. 柏油马路 / 深灰沥青路 (纯深灰色，不带白线杂质)
  asphalt: {
    fallbackColor: '#65676a',
    nineSlice: {
      tl: { col: 10, row: 24 }, t:  { col: 10, row: 24 }, tr: { col: 10, row: 24 },
      l:  { col: 10, row: 24 }, c:  { col: 10, row: 24 }, r:  { col: 10, row: 24 },
      bl: { col: 10, row: 24 }, b:  { col: 10, row: 24 }, br: { col: 10, row: 24 }
    },
    centerVariations: [ { col: 10, row: 24, weight: 1 } ]
  },
  road: {
    // 别名，指向 asphalt
    fallbackColor: '#65676a',
    nineSlice: {
      tl: { col: 10, row: 24 }, t:  { col: 10, row: 24 }, tr: { col: 10, row: 24 },
      l:  { col: 10, row: 24 }, c:  { col: 10, row: 24 }, r:  { col: 10, row: 24 },
      bl: { col: 10, row: 24 }, b:  { col: 10, row: 24 }, br: { col: 10, row: 24 }
    },
    centerVariations: [ { col: 10, row: 24, weight: 1 } ]
  },

  // 5. 浅灰人行道 / 室内浅色大理石走道 (纯净浅灰)
  sidewalk: {
    fallbackColor: '#a6a9ae',
    nineSlice: {
      tl: { col: 22, row: 0 }, t:  { col: 22, row: 0 }, tr: { col: 22, row: 0 },
      l:  { col: 22, row: 0 }, c:  { col: 22, row: 0 }, r:  { col: 22, row: 0 },
      bl: { col: 22, row: 0 }, b:  { col: 22, row: 0 }, br: { col: 22, row: 0 }
    },
    centerVariations: [ { col: 22, row: 0, weight: 1 } ]
  },

  // 6. 教室水磨石地砖 / 瓷砖走道 (纯净深灰)
  tile_floor: {
    fallbackColor: '#787a7e',
    nineSlice: {
      tl: { col: 14, row: 0 }, t:  { col: 14, row: 0 }, tr: { col: 14, row: 0 },
      l:  { col: 14, row: 0 }, c:  { col: 14, row: 0 }, r:  { col: 14, row: 0 },
      bl: { col: 14, row: 0 }, b:  { col: 14, row: 0 }, br: { col: 14, row: 0 }
    },
    centerVariations: [ { col: 14, row: 0, weight: 1 } ]
  },

  // 7. 讲台木地板 / 书房木质地面 (均匀木色)
  wood_floor: {
    fallbackColor: '#b5a589',
    nineSlice: {
      tl: { col: 26, row: 0 }, t:  { col: 26, row: 0 }, tr: { col: 26, row: 0 },
      l:  { col: 26, row: 0 }, c:  { col: 26, row: 0 }, r:  { col: 26, row: 0 },
      bl: { col: 26, row: 0 }, b:  { col: 26, row: 0 }, br: { col: 26, row: 0 }
    },
    centerVariations: [ { col: 26, row: 0, weight: 1 } ]
  },

  // 8. 室内地毯 (用红砖同色代替)
  carpet: {
    fallbackColor: '#885247',
    nineSlice: {
      tl: { col: 6, row: 0 }, t:  { col: 6, row: 0 }, tr: { col: 6, row: 0 },
      l:  { col: 6, row: 0 }, c:  { col: 6, row: 0 }, r:  { col: 6, row: 0 },
      bl: { col: 6, row: 0 }, b:  { col: 6, row: 0 }, br: { col: 6, row: 0 }
    },
    centerVariations: [ { col: 6, row: 0, weight: 1 } ]
  },

  // 9. 斑马线 (用纯白图块)
  crosswalk: {
    fallbackColor: '#71717a',
    nineSlice: {
      tl: { col: 6, row: 15 }, t:  { col: 6, row: 15 }, tr: { col: 6, row: 15 },
      l:  { col: 6, row: 15 }, c:  { col: 6, row: 15 }, r:  { col: 6, row: 15 },
      bl: { col: 6, row: 15 }, b:  { col: 6, row: 15 }, br: { col: 6, row: 15 }
    },
    centerVariations: [ { col: 6, row: 15, weight: 1 } ]
  }
};

/**
 * 随机选出候选图块池中的一个
 */
function pickVariation(variations, randVal) {
  if (!variations || variations.length === 0) return null;
  let totalWeight = 0;
  for (const v of variations) {
    totalWeight += v.weight || 1;
  }
  let target = randVal * totalWeight;
  for (const v of variations) {
    const w = v.weight || 1;
    if (target < w) {
      return { col: v.col, row: v.row };
    }
    target -= w;
  }
  return { col: variations[0].col, row: variations[0].row };
}

/**
 * 获取 3×3 单元格子块的采样坐标 (col, row)
 * @param {string} terrainKey 地形标识
 * @param {object} neighbors 邻近格子地形 { t, b, l, r }
 * @param {number} subX 子图块横坐标 0, 1, 2
 * @param {number} subY 子图块纵坐标 0, 1, 2
 * @param {number} gridX 单元格 X
 * @param {number} gridY 单元格 Y
 */
export function getSubTileCoord(terrainKey, neighbors, subX, subY, gridX, gridY) {
  const conf = TERRAIN_ATLAS_MAP[terrainKey] || TERRAIN_ATLAS_MAP.sidewalk;
  const ns = conf.nineSlice;

  // 检查四方邻居连通性（是否为同一地形）
  const sameT = neighbors.t === terrainKey;
  const sameB = neighbors.b === terrainKey;
  const sameL = neighbors.l === terrainKey;
  const sameR = neighbors.r === terrainKey;

  // 1. 如果上方不同且处于最顶行 (subY == 0)
  if (!sameT && subY === 0) {
    if (!sameL && subX === 0) return ns.tl;
    if (!sameR && subX === 2) return ns.tr;
    return ns.t;
  }

  // 2. 如果下方不同且处于最底行 (subY == 2)
  if (!sameB && subY === 2) {
    if (!sameL && subX === 0) return ns.bl;
    if (!sameR && subX === 2) return ns.br;
    return ns.b;
  }

  // 3. 如果左方不同且处于最左列 (subX == 0)
  if (!sameL && subX === 0) {
    return ns.l;
  }

  // 4. 如果右方不同且处于最右列 (subX == 2)
  if (!sameR && subX === 2) {
    return ns.r;
  }

  // 5. 内部或大面积连通区域：从多样性池子中基于伪随机散列选取变体
  if (conf.centerVariations && conf.centerVariations.length > 0) {
    const rnd = pseudoRandom(gridX, gridY, subX, subY);
    return pickVariation(conf.centerVariations, rnd);
  }

  return ns.c;
}

/**
 * 在 Canvas 上渲染单个 48×48 战棋格的 3×3 复合子图块
 */
export function renderCell3x3(ctx, sheetImg, terrainKey, neighbors, gridX, gridY, px, py, cellSize = 48) {
  const subSize = cellSize / ATLAS_CONFIG.subDivisions; // 48 / 3 = 16px

  for (let subY = 0; subY < ATLAS_CONFIG.subDivisions; subY++) {
    for (let subX = 0; subX < ATLAS_CONFIG.subDivisions; subX++) {
      const coord = getSubTileCoord(terrainKey, neighbors, subX, subY, gridX, gridY);
      if (!coord) continue;

      const sx = coord.col * ATLAS_CONFIG.stride;
      const sy = coord.row * ATLAS_CONFIG.stride;
      const dx = px + subX * subSize;
      const dy = py + subY * subSize;

      ctx.drawImage(
        sheetImg,
        sx, sy, ATLAS_CONFIG.tileSize, ATLAS_CONFIG.tileSize,
        dx, dy, subSize, subSize
      );
    }
  }
}
