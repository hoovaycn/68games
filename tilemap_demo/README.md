# 瓦片素材交付说明（研发用）

## 1. 目录结构

```
tilemap_demo/
├── README.md                     ← 本文件
├── tileset_annotated.json        ← 核心数据：每张图的语义标注 + props 矩形
├── tileset_manifest.json         ← 每个 gid 的图集坐标（脚本自动生成）
├── props_index.json              ← 18 个家具 props 的文件名 + 碰撞格
├── index.html                    ← 渲染示例（双击可跑，参考用）
│
├── tiles/                        ← 原始图集
│   ├── a5_modern_exterior.png    256×512, 8列×16行, firstgid=1
│   ├── a5_sewer.png              256×512, 8列×16行, firstgid=129
│   ├── a5_valley.png             256×512, 8列×16行, firstgid=257
│   ├── b_interior.png             512×512, 16列×16行, firstgid=385
│   ├── c_interior.png             512×512, 16列×16行, firstgid=641
│   └── _cut/<atlas>/gid_NNN.png  ← 按 32px 切好的独立瓦片（非空）
│
├── props/                        ← 18 个家具独立 PNG（已去背景）
│   ├── bed_double.png            双人床 32×96
│   ├── bed_single.png            单人床 64×64
│   ├── chair.png                  椅子 32×32
│   ├── desk.png                  书桌 64×32
│   ├── tv_stand.png              电视柜 96×64
│   ├── piano.png                 钢琴 96×64
│   ├── supermarket_shelf.png     超市货架 160×32
│   ├── checkout_counter.png      收银台 128×64
│   ├── fridge.png                冰箱 64×96
│   ├── bookshelf.png             书架 96×64
│   ├── bathtub.png               浴缸 96×32
│   ├── toilet.png                马桶 32×32
│   ├── plant_pot.png             盆栽 32×32
│   ├── blackboard.png            黑板 64×32
│   ├── whiteboard.png            白板 64×32
│   ├── window_small.png          小窗 32×32
│   ├── window_curtain_large.png  大窗帘窗 160×32
│   └── cash_register.png         收银机 32×32
│
└── work_ref/                     ← 参考图（带 gid 编号的 contact sheet）
    ├── a5_modern_exterior_index.png
    ├── a5_sewer_index.png
    ├── a5_valley_index.png
    ├── b_interior_index.png
    └── c_interior_index.png
```

## 2. 关键参数（已验证）

| 项 | 值 |
|---|---|
| 瓦片尺寸 | **32×32 px** |
| 图集边距 margin | **0** |
| 瓦片间距 spacing | **0** |
| 渲染缩放 | `image-rendering: pixelated`，不要开平滑 |

## 3. 地面层：gid 二维数组

地图地面就是一个二维 `int[][]`，值为 gid，**0 表示空（透明）**。

### gid → 图集像素坐标换算

```js
// gid 落在哪个图集：按 firstgid 区间查 tileset_annotated.json
const atlas = findAtlasForGid(gid);   // 得到 { columns, file, firstgid }
const idx   = gid - atlas.firstgid;
const col   = idx % atlas.columns;
const row   = Math.floor(idx / atlas.columns);
const sx    = col * 32;
const sy    = row * 32;
ctx.drawImage(atlas.img, sx, sy, 32, 32, x*32, y*32, 32, 32);
```

### 推荐地面填充块（已在 tileset_annotated.json 标注）

| 图集 | 地形 | 推荐 gid |
|---|---|---|
| a5_modern_exterior | 水泥地 | 9, 13 |
| a5_modern_exterior | 草地 | 25 |
| a5_modern_exterior | 瓷砖 | 29, 30, 31, 32 |
| a5_modern_exterior | 沙地 | 33, 41-45 |
| a5_valley | 草地 | 257 |
| a5_valley | 木板路 | 268 |
| a5_valley | 榻榻米 | 284, 285, 291, 292 |
| a5_valley | 砖墙（当墙） | 313-419 范围内 |
| a5_sewer | 下水道地 | 129, 137 |

**选填充块原则**：用纯色色块平铺，不要用带边缘的块。边缘过渡块（草丛石地、草边、土坡）只在地形交界处手动摆。

## 4. 物件层（props）

家具不要从图集现切——已经裁好放在 `props/` 下。

```js
// props_index.json 里每条：
// { name, file, w, h, cells: [[dx,dy],...], desc }
// cells 是不可走格（相对左上角的偏移），其余格视觉占但可走
const img = loadImage(p.file);
ctx.drawImage(img, o.x*32, o.y*32, o.w, o.h);
for (const [dx,dy] of o.cells) blocked.add(`${o.x+dx},${o.y+dy}`);
```

**注意**：props 里的 `w/h` 是像素尺寸（不是格数）。比如床 32×96 = 1列×3行。

## 5. 已知坑

1. **a5_sewer 下半部分全空**（gid 177 以后），别引用。
2. **B/C 图集是家具不是 tile**：它们跨多格、大小不一，当 tile 平铺会错位。必须走 props 层。
3. **a5_valley 的砖墙是竖墙**：gid 313 开始一整列一列的，摆围墙时用同列连续 gid，别跳格。
4. **props 坐标是人工标注的**：个别 prop 的源矩形可能需要微调（特别是高度），用 `work_ref/*_index.png` 对照黄色数字（gid）核对。
5. **多图集 firstgid 区间**：gid 1-128 是 a5_modern_exterior，129-256 是 a5_sewer，257-384 是 a5_valley，385-640 是 b_interior，641-896 是 c_interior。写渲染器时按这个区间路由。

## 6. 参考

- 带 gid 编号的视觉对照表：`work_ref/*_index.png`（黄色数字就是 gid）
- 可运行的最小示例：`index.html`（双击在浏览器打开，鼠标移动显示格子坐标和 gid）
- 切图脚本：`scripts_cut_tiles.py`（重新生成 _cut/）、`scripts_cut_props.py`（重新生成 props/）
