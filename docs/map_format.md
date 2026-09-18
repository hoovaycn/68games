# 战棋地图数据格式与关卡 JSON 交付（美术 → 研发）

版本 v1.0（2026-09-18）。战棋盘固定 **12 列 × 9 行，每格 48px（画布 576×432，高清屏用 @2x 资源即 1152×864）**。

## 一、你拿到的文件

| 文件 | 作用 |
| --- | --- |
| `assets/tiles/tileset_ground_48.png` | 地面图集，横向 7 个 48×48 图块，索引 0 起：0 kc_asphalt 柏油路、1 kc_sidewalk 灰砖人行道、2 kc_brick_red 红铺装、3 kc_grass 草地、4 kc_crosswalk 斑马线、5 tile_pavement 水泥板（AI）、6 tile_brick 红砖人字铺（AI） |
| `assets/maps/battle_01_schoolgate.json` | 第一战·校门外（敌：vendor 流动商贩，掉落 sausage 烤肠） |
| `assets/maps/battle_02_alley.json` | 第二战·红砖小巷（敌：punk 高年级混混，掉落 bastard_soda 混蛋汽水） |
| `assets/props/*.png`、`assets/props/kenney/kc_*.png` | 物件图，按 JSON 里的 name 直接拼路径加载（根目录优先，再找 kenney/ 子目录）；AI 散件是 #FF00FF 纯色底需色键，kenney/ 下已透明 |

## 二、JSON 结构（游戏原生格式，坐标全部用"格子"不是像素）

```jsonc
{
  "id": "battle_01_schoolgate",
  "name": "第一战·校门外",
  "width": 12, "height": 9, "tileSize": 48,
  "bgm": "bgm_battle_normal",        // 进战斗播的 BGM
  "background": "bg_street",         // 远景背景图 id（assets/backgrounds/）
  "tilesets": [{ "firstgid": 1, "image": "../tiles/tileset_ground_48.png",
                 "tileNames": ["kc_asphalt", "..."] }],
  "layers": [
    { "name": "ground", "type": "tilelayer",
      "data": [ /* 9 行 ×12 列，值=gid（图集索引+1），0 表示空 */ ] },
    { "name": "props", "type": "objectgroup", "objects": [
      { "name": "prop_snack_cart",   // = 图片文件名（assets/props 下找）
        "x": 8, "y": 4, "w": 2, "h": 2,           // 左上角格坐标与占格宽高
        "cells": [[0,0],[1,0],[0,1],[1,1]] }      // 实际不可走格（相对左上的偏移）
    ]},
    { "name": "spawns", "type": "objectgroup", "objects": [
      { "name": "player", "type": "unit",  "x": 1, "y": 7, "facing": "right" },
      { "name": "vendor", "type": "enemy", "x": 9, "y": 6, "facing": "left",
        "drop": "sausage" }
    ]},
    { "name": "exits", "type": "objectgroup", "objects": [
      { "name": "gate_exit", "x": 5, "y": 2 } ] }
  ]
}
```

要点：
* **地面层**：纯 gid 二维数组，平铺即可，不挡路。
* **物件层**：`x/y/w/h` 决定贴图矩形（像素 = 格坐标×48）；`cells` 才是碰撞/不可走格——路灯、树这类高物件只占底座一格，视觉占两格，已在 cells 里标好，直接用，别自己按 w×h 全挡。
* **spawns**：玩家/敌人出生格与朝向；敌人带 `drop`（击败掉落道具 id，对应 assets/items/）。
* **exits**：清场后可离开的触发格。
* 想加新关：复制一个 JSON 改 ground 数组和 objects 即可，不用改代码结构。

## 三、最小加载示例（JS 伪代码）

```js
const T = map.tileSize;
// 地面
map.layers.find(l => l.name === 'ground').data.forEach((row, y) =>
  row.forEach((gid, x) => {
    if (!gid) return;
    ctx.drawImage(atlas, (gid - 1) * T, 0, T, T, x * T, y * T, T, T);
  }));
// 物件（AI 散件先色键 #FF00FF，kenney/ 下已透明）
const blocked = new Set();
for (const o of map.layers.find(l => l.name === 'props').objects) {
  ctx.drawImage(images[o.name], o.x * T, o.y * T, o.w * T, o.h * T);
  o.cells.forEach(([dx, dy]) => blocked.add(`${o.x + dx},${o.y + dy}`));
}
```

## 四、想用 Tiled 编辑器摆关？
可以：新建正交地图 12×9、图块 48×48，把 `tileset_ground_48.png` 作为图块集导入（图块宽高 48、间距 0、边距 0）；物件层放 48×N 的道具图并在自定义属性里写 `cells`。导出 JSON 后写个 10 行适配把像素坐标除以 48 即可对上本格式。P0 直接手写/改我给的 JSON 更快。

## 五、已验证
两张 JSON 已用脚本按同一套规则渲染过预览（work_ref/map_preview_battle_*.png）：地面无缝、物件色键干净、占格红框与出生点不重叠、可走区域连通（玩家到敌人/出口路径成立）。
