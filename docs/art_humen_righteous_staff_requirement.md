# 浩然正气杖亮相画面

**用途：** 林则徐交杖后，杖身“浩然正气”四个金字的关键剧情特写。

**图生图参考：** `assets/items/righteous_staff@2x.png`（木杖造型）；`assets/backgrounds/bg_humen_beach_1839@2x.png`（虎门海滩的光线与氛围）。

**场景：** 木杖的大特写，杖身占据画面中上部，刻在木头上的**“浩然正气”四个金字**是绝对视觉中心：够大、够亮、一眼能读清。手只在边缘扶着杖，虎门销烟池和白烟退到背景。沿用游戏的像素风剧情 CG，下方留给对白框。

**建议提示词：** `Image-to-image using the supplied staff item and Humen beach as references. 16-bit JRPG pixel-art story CG, extreme close-up of the historical wooden staff filling the upper and central frame. The four large, brilliant golden Chinese characters 浩然正气 are carved directly into the staff and are the unmistakable focal point, crisp and legible. A hand holds the staff at the edge of frame, with 1839 Humen smoke and warm light softly in the background. Solemn, uplifting, no other words, no watermark, 16:9.`

**验收：** 放进游戏前核对四个字确实是“浩然正气”，不要出现错字或模型乱写的笔画；不需要程序另叠字。

**交付：** `assets/backgrounds/bg_humen_righteous_staff.png`（960×540）和 `assets/backgrounds/bg_humen_righteous_staff@2x.png`（1920×1080）。

---

## 已交付（2026-10-23）

**底图（图生图）：** 以 `assets/items/righteous_staff@2x.png` + `assets/backgrounds/bg_humen_beach_1839@2x.png` 为 image1/image2 参考，生成「一根完整赤红沉香木杖横贯画面」的特写（1536×1024，裁 16:9）。选了这一版而不是「斜握」和「竖握」版，因为需求写的是「杖身占据画面中上部」+「手只在边缘扶着杖」，横置最贴合；竖置版在 16:9 里没法放下四个大字。

**刻字做法（关键）：** **没有让模型写汉字**。扩散模型写中文必然出现错字乱笔画，验收项「四个字确实是浩然正气」不可能达标。改为：底图让模型只画**干净的空白木面**，再用 Windows 楷体 `simkai.ttf` 程序化渲染「浩然正气」，按「圆柱高光」做竖向金属渐变 + 凹槽上壁阴影 + 下壁吃光 + 笔芯高光 + 金光外溢，刻进木头里。四个字由字体渲染，**笔画绝对正确**。

**版式（@2x 1920×1080）：**
- 杖身：源图实测 y=355~581（厚 226px，倾角 0.51°），成图 y=369~651，占画面中上部；右手在右缘 x=1690~1920。
- 刻字：字体高 214，整行 1088×224，位于 x=412~1500、y=386~610。
- **刻字底边 610 < 姓名牌顶边 624**，左下角姓名牌不会压住第一个字；也远高于对话框顶边 672。
- 底部三分之一压暗留白，销烟池与白烟退到背景。

**产出**
- `assets/backgrounds/bg_humen_righteous_staff@2x.png`（1920×1080，2103 KB）
- `assets/backgrounds/bg_humen_righteous_staff.png`（960×540，666 KB）
- `scripts/build_humen_righteous_staff.py`（合成，Pillow 13）
- `scripts/verify_humen_righteous_staff.py`（自检：尺寸 + 笔画亮度对比 + 遮挡判定，排版参数与合成共用 `compute_layout()` 保证掩膜对齐）
- 已同步到 `dist/assets/backgrounds/`

**验收核对：** 刻字区截图逐字确认为「浩」「然」「正」「气」，笔画完整无错字；笔画区平均亮度 184.8 vs 木面 68.7（对比 2.69），笔画区 89.2% 为亮像素，960×540 实机缩放后依然一眼可读。

> 注意：底图每一张生图右下角都带「AI生成 WORKBUDDY」水印，成图用裁切避开（本图裁掉源图底部 100 行，水印落在画面外）。

