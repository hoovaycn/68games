import { test } from 'node:test';
import assert from 'node:assert';
import {
  ATLAS_CONFIG,
  TERRAIN_ATLAS_MAP,
  pseudoRandom,
  getSubTileCoord
} from '../src/systems/tilemap_atlas.js';

test('ATLAS_CONFIG 规范符合 16px 图块、1px 间距与 3x3 复合架构', () => {
  assert.strictEqual(ATLAS_CONFIG.tileSize, 16);
  assert.strictEqual(ATLAS_CONFIG.margin, 1);
  assert.strictEqual(ATLAS_CONFIG.stride, 17);
  assert.strictEqual(ATLAS_CONFIG.subDivisions, 3);
  assert.strictEqual(ATLAS_CONFIG.cols, 37);
  assert.strictEqual(ATLAS_CONFIG.rows, 28);
});

test('TERRAIN_ATLAS_MAP 包含操场、教室、城市等核心地形的九宫格与变体池', () => {
  const requiredTerrains = ['grass', 'track', 'sand_pit', 'asphalt', 'sidewalk', 'tile_floor', 'wood_floor', 'carpet'];
  for (const t of requiredTerrains) {
    const conf = TERRAIN_ATLAS_MAP[t];
    assert.ok(conf, `地形 ${t} 必须存在配置`);
    assert.ok(conf.nineSlice, `地形 ${t} 必须拥有 nineSlice`);
    assert.ok(conf.nineSlice.tl && conf.nineSlice.c && conf.nineSlice.br, `地形 ${t} 的九宫格必须完备`);
    assert.ok(conf.fallbackColor, `地形 ${t} 必须有 fallbackColor`);
    assert.ok(Array.isArray(conf.centerVariations) && conf.centerVariations.length > 0, `地形 ${t} 必须有中心变体池`);
  }
});

test('pseudoRandom 满足确定性要求：相同入参返回相同结果且在 [0, 1) 区间', () => {
  const r1 = pseudoRandom(3, 4, 1, 2);
  const r2 = pseudoRandom(3, 4, 1, 2);
  assert.strictEqual(r1, r2);
  assert.ok(r1 >= 0 && r1 < 1);
  
  const rDiff = pseudoRandom(3, 5, 1, 2);
  assert.notStrictEqual(r1, rDiff);
});

test('getSubTileCoord 边界过渡与内部九宫格推导正确', () => {
  // 孤立孤岛格（上下左右全都不相同）
  const isolatedNeighbors = { t: null, b: null, l: null, r: null };
  const tl = getSubTileCoord('grass', isolatedNeighbors, 0, 0, 5, 5);
  const br = getSubTileCoord('grass', isolatedNeighbors, 2, 2, 5, 5);
  const center = getSubTileCoord('grass', isolatedNeighbors, 1, 1, 5, 5);

  assert.deepStrictEqual(tl, TERRAIN_ATLAS_MAP.grass.nineSlice.tl);
  assert.deepStrictEqual(br, TERRAIN_ATLAS_MAP.grass.nineSlice.br);
  assert.ok(center.col !== undefined && center.row !== undefined);

  // 大面积连通区域内部（四周全为草地）
  const connectedNeighbors = { t: 'grass', b: 'grass', l: 'grass', r: 'grass' };
  const innerSub = getSubTileCoord('grass', connectedNeighbors, 1, 1, 5, 5);
  assert.ok(innerSub.col !== undefined && innerSub.row !== undefined);
});
