# 第二幕尾声：安全屋无线电特写

**图生图参考：** `assets/backgrounds/bg_safahouse_shelter@2x.png`。同一间城北防空洞安全屋，镜头推近铁皮桌。

**场景：** 安静的下午，桌上有警方收缴的无线电台、证物袋和登记表；无线电的小指示灯刚亮起。没人出现在画面里。气氛从平静转向一点不安，不提前画出发信人或海上的船。延续游戏细腻的 JRPG 像素风，下方留给对白框，无文字。

**建议提示词：** `Image-to-image using the supplied safehouse background as reference. Close-up of the same metal table inside the underground police safehouse on a quiet afternoon, a confiscated satellite radio with one tiny signal light glowing beside an evidence bag and a blank log sheet, subtle suspense in an otherwise ordinary room, detailed 16-bit JRPG pixel-art visual novel background, no people, no text, no watermark, 16:9.`

**交付：** `assets/backgrounds/bg_safahouse_radio.png`（960×540）、`assets/backgrounds/bg_safahouse_radio@2x.png`（1920×1080）。图片交付前，游戏暂时使用原安全屋背景。

---

## 已交付（2026-10-23）

**底图（图生图）：** 以 `assets/backgrounds/bg_safahouse_shelter@2x.png` 为 image1 参考，`input_fidelity=medium`，把镜头推近铁皮桌。跑了三版：

1. 「推近铁皮桌」版：电台居中、绿台灯在左、证物袋和登记表在桌面**前缘** —— 但这两样正好落在对话框覆盖的下三分之一，会被完全挡住。
2. 「自由构图」版：电台更大、光更戏剧，但机身上出现了模型乱写的英文标签，且质感偏写实 3D 渐变，偏离项目的像素风。
3. **采用版**：以上一版为参考、`medium` 保真度，要求「相机抬高俯视、电台上移到画面中上部、证物袋和空白登记表放在电台**后方偏右**、桌面近景留空」。结果：电台造型、像素密度、暖琥珀色调全部与原安全屋一致，**无任何乱码文字**，三样道具都在中上部。

**后期处理**（`scripts/build_bg_safahouse_radio.py`）：
- 定位电台顶板那颗红色指示灯（@2x 坐标 1173,437），加核心过曝 + 四层暖红光晕，screen 叠加让它真的"照"在桌面上 —— 对应"小指示灯刚亮起"。
- 四角轻压暗、暗部极轻偏冷，做出"平静之下一点不安"。**冷色权重刻意压得很低**：第一版给暗部叠了 40% 蓝，石墙整个变成青蓝色，跟 `bg_safahouse_shelter` 完全不像同一间屋子了，已修正。
- 不画发信人与海上船只 ✓；画面无人物、无文字、无水印（右下角水印随裁切切掉）。

**产出**
- `assets/backgrounds/bg_safahouse_radio@2x.png`（1920×1080，2659 KB，RGB）
- `assets/backgrounds/bg_safahouse_radio.png`（960×540，814 KB，RGB）
- `scripts/build_bg_safahouse_radio.py`
- 已同步到 `dist/assets/backgrounds/`

编码沿用安全屋系列其它背景的 RGB 方式（`bg_safahouse_shelter@2x.png` 是 3379 KB），没有量化成调色板，以保留指示灯光晕的平滑过渡。

