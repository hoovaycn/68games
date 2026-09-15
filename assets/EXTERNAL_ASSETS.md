# 外部免费资产登记 EXTERNAL ASSETS（已实测下载、筛选、落盘）

> 美术侧 2026-09-15 实测下载并处理；全部为 CC0（公共领域，可商用、无需署名，保留来源备查）。
> 原始压缩包与母版在 `work_ref/ext_pack/`，切片脚本 `work_ref/extract_kenney.py` 可复跑。

## 1. Kenney - Roguelike Modern City pack（CC0，作者 Kenney Vleugels）
* 来源：https://opengameart.org/content/roguelike-modern-city-pack （作者页 www.kenney.nl）
* 原始规格：1036 个 16×16 地砖/街具，精灵表步距 17（16px + 1px 间隔），自带 #FF00FF 洋红色键，与本项目管线一致
* 完整精灵表已放：`assets/tiles/kenney/roguelikeCity_full_transparent.png`（Tiled 可直接按 16+1 导入，需要更多件自己切）
* **踩坑记录**：原包内两个文件名是反的（作者在 OGA 评论区也承认）——叫 `roguelikeCity_magenta.png` 的才是真透明版（已采用），叫 `roguelikeCity_transparent.png` 的反而是洋红底版，别拿错。

### 精选地砖 `assets/tiles/kenney/`（48×48 + @2x，16px 三倍对齐战棋网格）
| 文件 | 内容 |
| --- | --- |
| kc_asphalt | 纯柏油路面（战斗地图主地面） |
| kc_sidewalk | 灰砖人行道 |
| kc_brick_red | 红色铺装 |
| kc_grass | 草地 |
| kc_crosswalk | 斑马线片段 |

### 精选街具 `assets/props/kenney/`（已透明 PNG；基础档 + @2x）
| 文件 | 尺寸 | 占格(48px) |
| --- | --- | --- |
| kc_streetlight | 48×96 | 1×2 路灯（只底座挡路） |
| kc_trafficlight | 48×96 | 1×2 信号灯杆 |
| kc_hydrant | 48×48 | 1×1 消防栓，不可走 |
| kc_trashbag | 48×48 | 1×1 黑色垃圾袋，不可走 |
| kc_crate | 48×48 | 1×1 木箱，不可走 |
| kc_dumpster_green | 48×96 | 1×2 绿色大型垃圾箱 |
| kc_tree_dark | 48×96 | 1×2 树（只底座格挡路） |
| kc_barrier_stripe | 48×144 | 1×3 绿白施工护栏 |
| kc_bollard | 48×48 | 1×1 隔离柱 |

## 2. Walking Character Set（CC0，作者 benjaminallenfrost / OpenGameArt）
* 来源：https://opengameart.org/content/walking-character-set
* 规格：每色一张 384×512 精灵表 = **每帧 128×128，4 行（下/左/右/上）× 3 帧走路循环**，已透明
* 落盘：`assets/sprites/placeholder/walk_placeholder_{blue,red,green,black,white,pink}.png`
* 用途：**临时占位行走图**（P0 先跑通自由活动/战棋移动），蓝色可临时顶男主、粉色临时顶女主、红/黑给 vendor/punk 敌人；正式角色行走图 P1 按立绘手拆或用模块化包组装

## 3. 备用未入包（已下载验证可用，留在 work_ref/ext_pack/）
* Kenney Modular Character Pack（CC0）：425 个可拼装身体部件（发型/上衣/鞋/肤色）+ 精灵表，P1 可拼出九个具名角色的正式行走图：https://opengameart.org/content/modular-character-pack
* Kenney RPG Urban Kit（CC0，更新的城市包，itch 页 JS 渲染暂未取直链，需要时从 kenney.nl 手动下）

## 4. 风格使用说明（美术意见）
* Kenney 是扁平可爱风，和我们 GBA 浓描边角色不同源，**只用在地图层（地面/街具）和占位行走图**，剧情立绘/头像/道具图标仍用定制图，避免风格打架
* 地图层统一用 Kenney 成体系，不要混用其他包；颜色若需贴近项目色调，后期可整体调色相/饱和度，不要单件改
