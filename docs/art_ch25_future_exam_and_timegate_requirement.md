# 第二十五章「未来死城 · 天梯考场」与「时空门送警徽」背景图美术需求

> **需求背景**：`src/data/story_chapter25.js` 的 `ch25_scene_unmasking_reunion` 中，成年主角向少年们讲述三号船爆炸之后的世界——阿瑶启动【天梯考场】把全城人变成提线木偶（未来死城），以及反抗军撕开时空门把银色手提箱（警徽+预警信）送回过去。
>
> 这段是揭示真相的核心叙事，需要 2 张**彩色未来废墟风格**背景图（区别于前面回忆段落的黑白老照片风格）。

---

## 一、交付接口

| 资源名 / Key | 交付路径 | 规格 |
| --- | --- | --- |
| `bg_future_exam_city` | `assets/backgrounds/bg_future_exam_city@2x.png` | 1920×1080，PNG，16:9 |
| `bg_future_exam_city` | `assets/backgrounds/bg_future_exam_city.png` | 960×540，PNG，16:9 |
| `bg_timegate_case_send` | `assets/backgrounds/bg_timegate_case_send@2x.png` | 1920×1080，PNG，16:9 |
| `bg_timegate_case_send` | `assets/backgrounds/bg_timegate_case_send.png` | 960×540，PNG，16:9 |

- 每张各出 **高清版（1920×1080）+ 标准版（960×540）**，构图一致。
- 命名交付到 `assets/backgrounds/` 即可，程序侧已按此文件名接入（`bgImgFallback` 回退到 `bg_future_city_ruins@2x.png`）。

---

## 二、统一风格要求（彩色未来废墟，非黑白）

- **彩色**：延续第 24 章 `bg_future_city_ruins` 的未来废墟基调——冷灰、暗紫、金属冷蓝、猩红警示光，阴郁压抑。
- **16-bit 像素复古 JRPG 密度**：延续全游像素画密度，禁止粗大像素块或写实 3D 渐变。
- **无人脸特写、无文字、无水印、无 UI 边框**：人物立绘和对话框由游戏叠加。
- 人物半身立绘遮挡左右两侧、对话框覆盖下方约三分之一，**画面主体放中上部**。

---

## 三、逐张画面要求与生图 Prompt

### 1. 天梯考场 · 未来死城 —— `bg_future_exam_city`

**画面**：2046 年的死城全景。一座高耸入云的天梯金字塔考场矗立在城市中央，满街都是戴着焊死金属面具、额头印着「100分·绝对合格」的行人（提线木偶般整齐僵直）；天空阴沉，全息屏漂浮，暗紫电弧与猩红警示光点缀在破败楼宇间。压抑、秩序森然、冰冷。

```text
Pixel art background, 2046 futuristic dystopian dead city, a towering pyramid-shaped examination tower rising into a gloomy sky, streets filled with identical masked citizens standing in rigid mechanical rows like puppets, holographic screens floating in the air, dark purple arc lightning and crimson warning lights, cold grey metal ruins, oppressive atmosphere, 16-bit retro JRPG background, no clear faces no text no watermark.
```

### 2. 时空门 · 银色手提箱传送 —— `bg_timegate_case_send`

**画面**：未来反抗军（剪影即可，不露清晰正脸）在废墟中合力撕开一道旋转的时空裂缝（金蓝交织的漩涡光门），一只银灰色金属手提箱正被推进/吸入那道裂缝，送往过去；周围是残垣断壁与跃动的能量弧。悲壮、决绝、充满希望感。

```text
Pixel art background, silhouette of resistance fighters in a ruined city tearing open a swirling space-time rift, a glowing golden-blue vortex portal, a silver-grey metallic briefcase being pushed into the portal, energy arcs and debris floating, dramatic lighting, bittersweet hopeful mood, 16-bit retro JRPG background, no clear faces no text no watermark.
```

---

## 四、构图与程序接入说明

- 主体内容（天梯金字塔 / 时空裂缝与手提箱）放在画面中上部，下方三分之一留平静区域给对话框。
- 压缩：在不模糊像素边缘的前提下压缩 PNG，高清版尽量控制在 2 MB 左右，可用 256 色调色板 + Floyd-Steinberg 抖动。
- 程序侧接入顺序：`id:11` → `bg_future_exam_city`；`id:12` → `bg_timegate_case_send`；`id:13`（释然揉头发，现实互动）切回 `bg_resistance_bunker` 防空洞背景，随后警报响起进入战斗。
