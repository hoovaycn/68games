/**
 * 战斗界面一体化布局几何验证（无头模式）
 * 模拟 renderer.resize 的纯几何计算，校验：
 * 1. 地图区与右侧信息栏不重叠，中间留中缝
 * 2. 信息栏内容（章节名→阶段卡→提示→目标→统计）纵向不溢出面板
 * 3. 两区顶部/底部与面板对齐
 */
const CANVAS_W = 960;
const CANVAS_H = 540;
const TILE = 48;

function computeLayout(mapW, mapH) {
  const panelX = 0, panelY = 0;
  const panelW = CANVAS_W, panelH = CANVAS_H;
  const mapWidthPx = mapW * TILE, mapHeightPx = mapH * TILE;
  const offsetX = panelX + 28;
  const offsetY = panelY + Math.max(16, Math.floor((panelH - mapHeightPx) / 2));
  const hudDividerX = offsetX + mapWidthPx + 30;
  const hudX = hudDividerX + 20;
  const hudW = panelX + panelW - 28 - hudX;

  // 右栏纵向内容链
  const chapterY = panelY + 18;
  const phaseCardY = panelY + 40;
  const phaseCardH = 60;
  const tipY = phaseCardY + phaseCardH + 22;
  const tips = 4;
  const objY = tipY + 22 + tips * 20 + 16;
  const objTextH = 18; // 一行目标文案高度（"击退高年级混混" 单行）
  const statRowH = 68;
  const statsY = panelY + panelH - statRowH - 16;
  const statRowY = statsY + 22 + 24; // 统计方块底部

  return {
    panel: { x: panelX, y: panelY, w: panelW, h: panelH },
    map: { x: offsetX, y: offsetY, w: mapWidthPx, h: mapHeightPx },
    divider: hudDividerX,
    hud: { x: hudX, w: hudW },
    chain: { chapterY, phaseCardY, phaseCardH, tipY, objY, objEndY: objY + 22 + objTextH, statsY, statBottom: statsY + statRowH },
    mapRight: offsetX + mapWidthPx,
    mapBottom: offsetY + mapHeightPx
  };
}

let failures = 0;
function check(name, cond, detail) {
  if (cond) {
    console.log(`  PASS  ${name}`);
  } else {
    failures++;
    console.log(`  FAIL  ${name}  ${detail}`);
  }
}

console.log('=== 战斗界面一体化布局验证 (12x9 地图, 960x540 画布) ===');
const L = computeLayout(12, 9);

console.log('[几何参数]');
console.log(`  地图区: x=${L.map.x} y=${L.map.y} w=${L.map.w} h=${L.map.h} (右缘=${L.mapRight} 底缘=${L.mapBottom})`);
console.log(`  分隔线: x=${L.divider}`);
console.log(`  信息栏: x=${L.hud.x} w=${L.hud.w} (右缘=${L.hud.x + L.hud.w}, 画布内边距=${CANVAS_W - L.hud.x - L.hud.w})`);

console.log('[左右分区]');
check('中缝分隔线在地图右缘与信息栏之间', L.mapRight < L.divider && L.divider < L.hud.x, `mapRight=${L.mapRight} divider=${L.divider} hudX=${L.hud.x}`);
check('信息栏宽度 240~320 (合理阅读宽度)', L.hud.w >= 240 && L.hud.w <= 320, `hudW=${L.hud.w}`);
check('地图区完整落在面板内', L.map.x >= 0 && L.map.y >= 0 && L.mapRight <= CANVAS_W && L.mapBottom <= CANVAS_H);

console.log('[纵向内容链 (信息栏)]');
console.log(`  章节名 y=${L.chain.chapterY} → 阶段卡 y=${L.chain.phaseCardY}+${L.chain.phaseCardH} → 提示 y=${L.chain.tipY} → 目标 y=${L.chain.objY}~${L.chain.objEndY} → 统计 y=${L.chain.statsY}~${L.chain.statBottom}`);
check('章节名与阶段卡不重叠 (18+12 < 40)', L.chain.chapterY + 12 <= L.chain.phaseCardY);
check('目标文案结束在统计区开始之前', L.chain.objEndY <= L.chain.statsY + 22, `objEnd=${L.chain.objEndY} statsTitle=${L.chain.statsY}`);
check('统计区底部不超出面板 (≤524)', L.chain.statBottom <= CANVAS_H - 16, `statBottom=${L.chain.statBottom}`);
check('左右两区顶底同高：地图 y=54, 中心对齐面板', Math.abs((L.map.y + L.map.h / 2) - CANVAS_H / 2) <= 1, `mapCenter=${L.map.y + L.map.h / 2}`);

console.log('[无卡片外观]');
check('画布外无边距 (全出血)', L.panel.x === 0 && L.panel.y === 0 && L.panel.w === CANVAS_W && L.panel.h === CANVAS_H);

console.log(failures === 0 ? '\n=== 全部通过 ===' : `\n=== ${failures} 项失败 ===`);
process.exit(failures === 0 ? 0 : 1);
