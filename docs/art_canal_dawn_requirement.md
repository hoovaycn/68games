# 第二幕结局背景：古运河破晓

用于 `src/data/story_chapter19.js` 的 `ch19_scene_dawn_epilogue`。海峰被医护人员从钟楼抬下去后，众人来到旧洋行仓库外的古运河岸边，天刚亮；远处能看到钟楼，但这里**不是**最终 Boss 战的钟楼室内背景。

## 交付接口

- `assets/backgrounds/bg_canal_dawn@2x.png`：1920 x 1080，PNG，16:9。
- `assets/backgrounds/bg_canal_dawn.png`：960 x 540，PNG，16:9；构图与高清版一致。
- 剧情的 `bgImg` 已指向高清版正式路径。两张图按此命名交付即可，不用修改脚本或增加临时占位图。
- 参考现有 `bg_clocktower_summit@2x.png` 的钟楼外观，以及 `bg_canal_dock_storm@2x.png` 的运河环境；延续项目细腻的 JRPG 像素画密度，不要粗大像素块或写实 3D 渐变。
- 在不模糊像素边缘的前提下压缩 PNG；高清版尽量控制在 2 MB 左右。无须透明底。

## 画面要求

古运河岸边的清晨：水面映着第一道暖金色晨光，远处能辨认出昨夜的旧洋行仓库和钟楼剪影；雨停了，天空从深蓝向浅金过渡。昨夜的黑色毒雾已经散去，保留一点湿漉漉的石岸和灯光余韵，让人一眼认出是**走出仓库后的同一地点**，不是换到陌生城市。

画面要能承接两种情绪：前半段是孩子们终于平安后的松口气，后半段一通来自公海的密电让故事重新悬起来。不要在画面里提前画出卫星电话、船队、敌人或下一幕剧情；悬念由对白和音乐完成。

人物立绘会遮挡左右两边，对话框会覆盖下方约三分之一；运河、朝阳和远处钟楼的主要轮廓放在画面中上部。不要人物、文字、水印、UI 边框。交付前该场景会显示游戏默认剧情底色，不使用钟楼战斗图冒充新场景。

---

## 已交付（2026-10-23，含氛围重做）

**氛围重做原因：** 第一版整体太阴暗（平均亮度只有 91/255，天空是压得很重的深蓝灰、仓库全在阴影里、水面发灰），不符合「走出仓库后的松口气」，也不够安详。

**重做提示词（生图）：** 以旧版 `bg_canal_dawn@2x.png` 为 image1 参考，提示词核心是把「光和情绪」整体换成明亮希望版 —— 天空改成通透高调的淡青蓝→蜜桃→灿金渐变、太阳刚破云而出、暖金阳光斜照仓库砖墙让砖头发亮、水面雾气变成逆光的透明白金、水面映出明亮的金色光路与闪烁高光、湿石岸接住暖琥珀色反光而不是灰浊、钟楼在亮天空前轮廓清晰、路灯仍留暖黄余韵；同时保留一点冷蓝与薄云在画面高处，让后半段公海密电的悬念还能接得住。

**成品（已替换）**

| 文件 | 规格 |
| --- | --- |
| `assets/backgrounds/bg_canal_dawn@2x.png` | 1920×1080，826 KB，256 色调色板 |
| `assets/backgrounds/bg_canal_dawn.png` | 960×540，274 KB，256 色调色板 |

- 与项目其它背景一致用 **256 色调色板 + Floyd-Steinberg 抖动** 压缩（天空/水面渐变不出色带），高清版 826 KB，远低于 2 MB 目标。
- 平均亮度 91 → **138**，天空上部 84 → 148，砖墙 63 → 93，水面 122 → 170；蓝色分量反而下降（77 → 118 → 更暖更通透）。
- 构图不变：同一排旧洋行仓库 + 同一座石砌钟楼 + 同一条运河与石岸，一眼可认是同一地点。
- 钟楼与仓库、朝阳都在画面中上部；下方三分之一留给对话框。

**旧版已备份：** `backup/bg_canal_dawn_v1_dark/`（两张原图）。

**复现脚本：** `scripts/build_bg_canal_dawn.py`（Pillow 13，参数为生图源文件路径）。

---

## 已交付 v3（2026-10-23，构图再调整）

**问题：** v2 虽然把氛围改亮，但**地平线偏低** —— 仓库和钟楼的下半截、以及日出在地平线上的那道金色光带，正好落在对话框覆盖的下三分之一里，画面最出彩的部分全被挡掉了。

**新提示词关键句：** 以 v2 成图为参考（`input_fidelity=medium`，保构图），明确要求 **「raise the horizon so the far bank with the warehouses and the clocktower sits HIGH in the frame, in the upper third, with the sunrise sun just clearing the rooftops」**，并要求前景运河水面「calm, simple, smooth open water with only very gentle even ripples and one broad soft golden reflection that fades out toward the bottom edge, absolutely uncluttered, low contrast, quiet and empty, so a dialogue box can cover the bottom third without hiding anything」。

**成品（已替换）**

| 文件 | 规格 |
| --- | --- |
| `assets/backgrounds/bg_canal_dawn@2x.png` | 1920×1080，816 KB，256 色调色板 |
| `assets/backgrounds/bg_canal_dawn.png` | 960×540，266 KB，256 色调色板 |

**构图验证**（叠加对话框区与左右立绘区实测）：
- 地平线抬到画面约 61% 高，仓库整排立面、门、窗、木架结构**完整露出**在对话框顶边之上。
- 钟楼从尖顶到基座**全貌可见**，且正好落在左右立绘之间的空档里（1x x≈490~550）。
- 日出的金色光带横贯整个地平线，完整可见。
- 对话框现在只盖住**平静的水面**，画面主体一点不损失；左右立绘区遮住的是最左/最右的边缘仓库，无碍。
- 氛围保持 v2 的明亮希望感：青蓝→蜜桃→灿金的天空、逆光晨雾、暖阳下的红砖、湿地反光、路灯余韵。

**历史版本备份**
- `backup/bg_canal_dawn_v1_dark/` —— 初版，阴暗
- `backup/bg_canal_dawn_v2_lowhorizon/` —— v2，地平线偏低


