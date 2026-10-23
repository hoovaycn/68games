# 第十四章《照片上的人》案卷画面美术需求

**方式：图生图。** 把下面三张现有立绘作为参考图一起提供给生图模型，从左到右对应画面里的三张照片：

1. `assets/art/mystery_man_corrupted@2x.png`：沈崇礼，现在的儿子，学校家长会和博物馆里出现过的人。
2. `assets/art/mystery_man_default@2x.png`：沈万廷，二十年前的父亲，阿瑶往事里出现过的人。
3. `assets/art/shen_wanting_old@2x.png`：沈万廷，现在的老年父亲。**第 2、3 张是同一个人的过去和现在。**

**场景：** 城北安全屋里，海峰把这三张档案照片并排摆在铁皮桌上。镜头贴近照片，让玩家一眼看清脸和父子关系；下方留给游戏对白框。姓名和年代由游戏对白交代，图里不需要生成文字。

**建议提示词：** `Image-to-image using the three supplied character references in order: left, the current son Shen Chongli; center, his father Shen Wanting twenty years ago; right, the same father Shen Wanting as an elderly man today. A close-up of three case-file photographs laid side by side on a metal table in a dim police safehouse, clear recognizable faces faithful to the supplied references, tense visual-novel evidence reveal, detailed JRPG pixel-art atmosphere, no text, no watermark, 16:9.`

**交付：** `assets/backgrounds/bg_shen_family_caseboard.png`（960×540）、`assets/backgrounds/bg_shen_family_caseboard@2x.png`（1920×1080）。同一张图会用于海峰说明身份、刘老师和徐老师指认旧照片。

---

## 已交付（2026-10-23）

**做法：以 `bg_safahouse_shelter@2x.png` 为图生图底图**（`input_fidelity=medium`，1536×1024，裁 16:9 后放到 1920×1080），保留安全屋的石拱墙、吊灯、通风栅和琥珀色调，镜头推进到墙面照片墙，软木板居中铺满。

**三张人物照**：直接取游戏现有立绘做精确抠图后贴进相片纸，保证形象 100% 还原（不靠模型重新生成人脸）。品红底用「四边泛洪 + 孤立污染点补色」剔除，再按片类型调色：

| 位置 | 人物 | 来源立绘 | 照片质感 |
| --- | --- | --- | --- |
| 左 | 沈崇礼（现在的儿子） | `mystery_man_corrupted@2x.png` | 中性偏冷档案照 |
| 中 | 沈万廷（二十年前） | `mystery_man_default@2x.png` | 泛黄褪色旧照 |
| 右 | 沈万廷（现在） | `shen_wanting_old@2x.png` | 偏冷高对比近期偷拍照 |

**版式：** 三张照片水平居中（2x 坐标 x=452~1468，宽 320，间距 28），头顶留白 12px；脸在 2x y=295~475 区间，**完全在对话框顶（2x y=672）和姓名条（2x y=624）之上**，不会被遮。底部三分之一已压暗作留白。红线从沈崇礼的图钉连到另外两张，直观表达父子关系。图中无文字、无水印。

**复现脚本：** `scripts/build_shen_family_caseboard.py`（Pillow 13）。

> 注意：Pillow 直接对 RGBA 做 LANCZOS 重采样会把透明像素的品红 RGB 放大成品红色环，脚本内已改为预乘 alpha 后再滤波。

