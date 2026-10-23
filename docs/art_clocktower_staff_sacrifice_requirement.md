# 终战：浩然正气杖与巨魔核心一同碎裂

**用途：** 击败巨魔后，主角把杖插进核心。先展示这张特写和完整对白，下一次确认才弹出“失去【浩然正气杖】”。

**图生图参考：** `assets/backgrounds/bg_humen_righteous_staff@2x.png`（木杖外形及杖身金字）、`assets/art/boss_colossus_opium_god@2x.png`（胸口绿色核心）、`assets/backgrounds/bg_clocktower_storm@2x.png`（钟楼光色）。

**场景：** 特写聚焦嵌在巨魔胸口核心里的浩然正气杖：核心裂开，杖身也从中间碎成木屑；杖上的**“浩然正气”四个金字**最后亮起，金光压过绿雾。让玩家一眼看出这根杖无法再取回。延续已有剧情 CG 的细腻 JRPG 像素风，下方留给对白框；不要把字做成程序叠字，也不要另画悬浮的道具提示。

**建议提示词：** `Image-to-image using the supplied righteous staff close-up, colossus portrait and stormy clocktower as references. Cinematic 16-bit JRPG pixel-art story CG close-up: the same dark red wooden staff embedded in a fractured glowing green core on the colossal creature's chest, staff splintering together with the core, the four engraved golden Chinese characters 浩然正气 glowing on the wood for the last time, warm gold light cutting through dissipating toxic green mist, poignant decisive finale, important action in the upper two-thirds, no UI, no watermark, 16:9.`

**验收与交付：** 四个字必须刻在杖上且无错字。`assets/backgrounds/bg_clocktower_staff_sacrifice.png`（960×540）、`assets/backgrounds/bg_clocktower_staff_sacrifice@2x.png`（1920×1080）；交付前游戏回退阴云钟楼背景。

---

## 已交付（2026-10-23）

**做法：** 图生图，三张参考一起给模型 —— `bg_humen_righteous_staff@2x.png`（杖身木料与形状）、`boss_colossus_opium_god@2x.png`（胸口绿色核心、紫袍金饰）、`bg_clocktower_storm@2x.png`（钟楼冷蓝石墙与黄铜金）。跑了 6 版，选出「胸口特写 + 木杖几乎水平横置 + 断口居中嵌在正在炸开的绿核里」那版。

**最终画面不刻字（按美术要求定稿）。** 杖身就是干净的木头，不带任何题字 —— 「浩然正气」四字由剧情对白交代（`'浩然正气'四个金字最后亮了一下`），画面里不出现文字反而更干净，也不会出现字形歪斜或错字。

**产出**
- `assets/backgrounds/bg_clocktower_staff_sacrifice@2x.png`（1920×1080，2926 KB，RGB）
- `assets/backgrounds/bg_clocktower_staff_sacrifice.png`（960×540，913 KB，RGB）
- 备选收紧特写版：`generated-images/_sacrifice_tight@2x.png`（绿核爆光更大、断裂感更强，但杖的两端出画）
- 已同步到 `dist/assets/backgrounds/`

**校验：** 对话框覆盖区与左右立绘区叠加检查通过 —— 木杖与绿核的断裂动作完整位于对话框顶边之上；剧情里用这张图的那一句（`story_chapter19.js` id:11）带 `hidePortraits: true`，立绘不会遮挡。画面无人物、无悬浮道具提示、无水印。

> 备注：钟面上的罗马数字属于钟楼本体，与 `bg_clocktower_storm@2x.png` 保持一致，不是新增文字。


