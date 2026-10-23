# 安全屋关灯夜景

**图生图参考：** `assets/backgrounds/bg_safahouse_shelter@2x.png`。沿用同一间城北防空洞安全屋和画面构图。

**场景：** 深夜，安全屋的吊灯熄灭，铁皮桌、防爆箱和无线电仍在原处；只剩无线电的小红灯与微弱的门缝光。安静、有些不安，给瑞怡独自看手机的剧情留气氛。无人、无文字，下方留给对白框。

**建议提示词：** `Image-to-image from the supplied safehouse background, same room and camera angle in a 16-bit JRPG pixel-art visual novel. Late night in the underground safehouse, ceiling light turned off, metal table with a locked equipment case and radio, faint red radio light and dim light through the door, quiet uneasy atmosphere, no people, no text, no watermark, 16:9.`

**交付：** `assets/backgrounds/bg_safahouse_shelter_night.png`（960×540）、`assets/backgrounds/bg_safahouse_shelter_night@2x.png`（1920×1080）。

---

## 已交付（2026-10-23）

**做法：** 以 `assets/backgrounds/bg_safahouse_shelter@2x.png` 为 image1 参考（`input_fidelity=low`，让模型自己重新打光），提示词要求保持同一间屋子的构图与陈设，只把光改掉：吊灯熄灭、绿台灯关掉、只剩电台顶上那颗红色指示灯和通风栅漏进来的冷蓝月光。

出稿两版，交付的是 **B 版**（`generated-images/Detailed_16_bit_JRPG_pixel_art_2026-10-23T15-55-51.png`）：

| 版本 | 说明 |
| --- | --- |
| A 版（`generated-images/Keep_this_EXACT_same_undergrou_2026-10-23T15-55-20.png`） | 构图更贴原图，但**绿台灯还亮着**，不符合「只剩电台红灯与门缝光」 |
| **B 版（已交付）** | 绿台灯已灭、电台红灯独亮、通风栅透进冷蓝月光，深阴影，安静不安 ✓ |

**产出**
- `assets/backgrounds/bg_safahouse_shelter_night@2x.png`（1920×1080，2238 KB，RGB）
- `assets/backgrounds/bg_safahouse_shelter_night.png`（960×540，700 KB，RGB）
- 已同步到 `dist/assets/backgrounds/`

**已知差异：** 需求里的「门缝光」在这版表现为通风栅漏进来的冷蓝月光，画面中没有出现明确的铁门缝；如需要门缝那道光可以再出稿。照片墙上的证件照沿用了原安全屋背景的既有一笔小字（与 `bg_safahouse_shelter@2x.png` 一致）。

