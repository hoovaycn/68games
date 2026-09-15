/**
 * 网格寻路与范围计算系统
 * 1. BFS 计算真实移动范围 (考虑地形消耗与敌方单位阻挡)
 * 2. 武器攻击范围扩散 (曼哈顿距离)
 * 3. A* 寻路路径追踪 (用于敌人追击移动与移动动画)
 * 4. 支持多格街具 props 的底座阻挡判定
 * 5. 自动补全 defaultTerrain 与 terrainTiles 为合法的 tiles 矩阵
 */

export const DEFAULT_TERRAIN_TYPES = {
  sidewalk: { name: '人行道', def: 0, avoid: 0, cost: 1, color: '#a8a29e', tileImg: 'assets/props/kenney/kc_sidewalk.png' },
  asphalt: { name: '柏油路', def: 0, avoid: 0, cost: 1, color: '#52525b', tileImg: 'assets/props/kenney/kc_asphalt.png' },
  crosswalk: { name: '斑马线', def: 0, avoid: 0, cost: 1, color: '#71717a', tileImg: 'assets/props/kenney/kc_crosswalk.png' },
  grass: { name: '绿化带', def: 1, avoid: 10, cost: 2, color: '#166534', label: '草地', tileImg: 'assets/props/kenney/kc_grass.png' },
  brick: { name: '红砖路', def: 0, avoid: 0, cost: 1, color: '#a16207', tileImg: 'assets/props/kenney/kc_brick_red.png' }
};

export class GridSystem {
  constructor(mapData) {
    this.map = mapData || {};
    this.width = mapData.mapWidth || mapData.width || 12;
    this.height = mapData.mapHeight || mapData.height || 9;
    this.terrainTypes = mapData.terrainTypes || DEFAULT_TERRAIN_TYPES;
    this.props = mapData.props || [];

    // 智能构建 2D 二维矩阵 tiles[y][x]
    if (mapData.tiles && Array.isArray(mapData.tiles)) {
      this.tiles = mapData.tiles;
    } else {
      const defaultType = mapData.defaultTerrain || 'sidewalk';
      this.tiles = Array.from({ length: this.height }, () => Array(this.width).fill(defaultType));

      if (mapData.terrainTiles && Array.isArray(mapData.terrainTiles)) {
        for (const t of mapData.terrainTiles) {
          if (t.x >= 0 && t.x < this.width && t.y >= 0 && t.y < this.height) {
            this.tiles[t.y][t.x] = t.type;
          }
        }
      }
    }

    // 预构建街具底座阻挡字典 (只有 blockBaseOnly 的底座格 或 blocks=true 的全部格阻挡)
    this.propBlockedCells = {};
    for (const prop of this.props) {
      if (prop.blocks) {
        // 整组阻挡 (1x1/1x2/1x3)
        for (let dy = 0; dy < prop.gridH; dy++) {
          for (let dx = 0; dx < prop.gridW; dx++) {
            this.propBlockedCells[`${prop.x + dx},${prop.y + dy}`] = true;
          }
        }
      } else if (prop.blockBaseOnly) {
        // 仅底座格阻挡 (树/路灯 1x2：只底座挡路，上层视觉)
        const baseX = prop.x;
        const baseY = prop.y + prop.gridH - 1;
        this.propBlockedCells[`${baseX},${baseY}`] = true;
      }
    }
  }

  // 坐标合法性
  isValid(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  // 某格子是否为不可通过障碍 (含地形 + 街具)
  isBlockedTerrain(x, y) {
    if (!this.isValid(x, y)) return true;
    const typeKey = this.tiles[y] && this.tiles[y][x];
    const terrain = typeKey ? this.terrainTypes[typeKey] : null;
    if (terrain && terrain.obstacle) return true;
    // 检查街具阻挡
    if (this.propBlockedCells[`${x},${y}`]) return true;
    return false;
  }

  // 获取地形数据
  getTerrain(x, y) {
    if (!this.isValid(x, y)) return { name: '未知', def: 0, avoid: 0, cost: 1 };
    const typeKey = this.tiles[y] && this.tiles[y][x];
    return (typeKey && this.terrainTypes[typeKey]) || { name: '平地', def: 0, avoid: 0, cost: 1 };
  }

  // 计算单位的有效可移动格 (BFS)
  getReachableTiles(startX, startY, movePoints, unitFaction, allUnits) {
    const reachable = [];
    const costSoFar = {};
    const queue = [{ x: startX, y: startY, cost: 0 }];
    const startKey = `${startX},${startY}`;
    costSoFar[startKey] = 0;

    // 建立单位占位字典
    const unitMap = {};
    for (const u of allUnits) {
      if (u.isAlive) {
        unitMap[`${u.x},${u.y}`] = u;
      }
    }

    const dirs = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];

    while (queue.length > 0) {
      const current = queue.shift();
      reachable.push({ x: current.x, y: current.y, cost: current.cost });

      for (const d of dirs) {
        const nx = current.x + d.dx;
        const ny = current.y + d.dy;
        const nKey = `${nx},${ny}`;

        if (!this.isValid(nx, ny) || this.isBlockedTerrain(nx, ny)) continue;

        // 敌对单位形成阻挡 (不可穿过敌方单位)
        const occUnit = unitMap[nKey];
        if (occUnit && occUnit.faction !== unitFaction) {
          continue;
        }

        const tileCost = this.getTerrain(nx, ny).cost || 1;
        const newCost = current.cost + tileCost;

        if (newCost <= movePoints) {
          if (costSoFar[nKey] === undefined || newCost < costSoFar[nKey]) {
            costSoFar[nKey] = newCost;
            queue.push({ x: nx, y: ny, cost: newCost });
          }
        }
      }
    }

    // 过滤掉终点已被队友或自己占据的格子（但起始点除外）
    return reachable.filter(t => {
      const u = unitMap[`${t.x},${t.y}`];
      if (!u) return true;
      return t.x === startX && t.y === startY;
    });
  }

  // 计算攻击范围 (从指定位置出发，按武器 minRange-maxRange 辐射)
  getAttackableTiles(fromX, fromY, minRange = 1, maxRange = 1) {
    const tiles = [];
    for (let dy = -maxRange; dy <= maxRange; dy++) {
      for (let dx = -maxRange; dx <= maxRange; dx++) {
        const dist = Math.abs(dx) + Math.abs(dy);
        if (dist >= minRange && dist <= maxRange) {
          const tx = fromX + dx;
          const ty = fromY + dy;
          if (this.isValid(tx, ty)) {
            tiles.push({ x: tx, y: ty });
          }
        }
      }
    }
    return tiles;
  }

  // A* 寻路算法（从起点到目标点的最短连通路径）
  findPath(startX, startY, targetX, targetY, unitFaction, allUnits) {
    if (startX === targetX && startY === targetY) return [];

    const unitMap = {};
    for (const u of allUnits) {
      if (u.isAlive) {
        unitMap[`${u.x},${u.y}`] = u;
      }
    }

    const openSet = [{ x: startX, y: startY, g: 0, f: Math.abs(startX - targetX) + Math.abs(startY - targetY) }];
    const cameFrom = {};
    const gScore = {};
    const startKey = `${startX},${startY}`;
    gScore[startKey] = 0;

    const dirs = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];

    while (openSet.length > 0) {
      // 取 fScore 最低的点
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      const currKey = `${current.x},${current.y}`;

      if (current.x === targetX && current.y === targetY) {
        // 重构路径
        const path = [];
        let curr = currKey;
        while (cameFrom[curr]) {
          const [px, py] = curr.split(',').map(Number);
          path.unshift({ x: px, y: py });
          curr = cameFrom[curr];
        }
        return path;
      }

      for (const d of dirs) {
        const nx = current.x + d.dx;
        const ny = current.y + d.dy;
        const nKey = `${nx},${ny}`;

        if (!this.isValid(nx, ny) || this.isBlockedTerrain(nx, ny)) continue;

        // 终点允许被目标单位占据，但中间过程不能穿过敌人
        const occUnit = unitMap[nKey];
        if (occUnit && occUnit.faction !== unitFaction && !(nx === targetX && ny === targetY)) {
          continue;
        }

        const tentativeG = current.g + (this.getTerrain(nx, ny).cost || 1);
        if (gScore[nKey] === undefined || tentativeG < gScore[nKey]) {
          cameFrom[nKey] = currKey;
          gScore[nKey] = tentativeG;
          const h = Math.abs(nx - targetX) + Math.abs(ny - targetY);
          openSet.push({ x: nx, y: ny, g: tentativeG, f: tentativeG + h });
        }
      }
    }

    return []; // 无路可通
  }
}
