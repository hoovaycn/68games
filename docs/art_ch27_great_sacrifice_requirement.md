# 第二十七章 最痛告别背景图美术需求（时空门 · 爆炸 + 两人影 + 穿越感）

> **需求背景**：`src/data/story_chapter27.js` 的 `ch27_scene_great_sacrifice`（s3「时空光门闭合前夕 · 最痛的告别」）中，光门稳定、成年主角与副官化作金光消散、向少年们做最后的少先队礼嘱托。这是全剧最催泪的高潮之一，需要一张有**爆炸余烬、两个消散人影、时空扭曲穿越感**的背景图撑住氛围。
>
> 现有背景 `bg_reactor_core`（反应堆）过于平淡，需替换为下方新图；立绘已由程序接入消散版（dissolve），无需美术再出。

---

## 一、交付接口

| 资源名 / Key | 交付路径 | 规格 |
| --- | --- | --- |
| `bg_timegate_dissolve` | `assets/backgrounds/bg_timegate_dissolve@2x.png` | 1920×1080，PNG，16:9 |
| `bg_timegate_dissolve` | `assets/backgrounds/bg_timegate_dissolve.png` | 960×540，PNG，16:9 |

- 每张各出高清版（1920×1080）+ 标准版（960×540），构图一致。
- 命名交付到 `assets/backgrounds/` 即可，程序已按此文件名接入（`bgImgFallback` 回退到 `bg_reactor_core@2x.png`）。

---

## 二、画面要求

**核心元素（三样都要有）**：

1. **爆炸余烬**：画面中后景是刚被击毁的机甲残骸、翻涌的烈火与硝烟、飘散的金属碎屑与火星，营造"刚打完一场惨烈战斗"的余烬感。
2. **两个帅气人影（剪影）**：前景或中景有两个并肩而立的高大人影，**轮廓帅气挺拔，但不要有明显性别特征**（不露脸、不强调男女身形曲线），正逐渐化作点点金光消散、半透明，透出悲壮感。
3. **时空扭曲 / 穿越感**：画面中心有一道旋转的金色时空裂缝/光门漩涡，周围光线被扭曲、时间感被拉长，有金色的光粒向上飘散，营造"跨越时空的告别"氛围。

**风格与构图**：

- **彩色**（这是 2046 年"现在"，不是回忆黑白），延续项目 16-bit 像素复古 JRPG 密度，禁止粗大像素块或写实 3D 渐变。
- **无人脸特写、无文字、无水印、无 UI 边框**：人物立绘和对话框由游戏叠加。
- 人物立绘遮挡左右两侧、对话框覆盖下方约三分之一；**爆炸残骸、时空裂缝、两个消散人影请放在画面中上部**，下方留平静空旷区域。

```text
Pixel art background, aftermath of a fierce battle, burning mech wreckage with rolling smoke and embers, two tall heroic silhouettes standing side by side turning into floating golden particles and becoming translucent, gender-neutral heroic silhouettes without facial features, a swirling golden space-time rift portal in the center distorting the light, golden light motes drifting upward, tragic farewell mood, 16-bit retro JRPG background, no clear faces no text no watermark.
```

---

## 三、程序接入说明（已完成的配套）

- 背景 `bg_timegate_dissolve` 已接入 `ch27_scene_great_sacrifice`，`bgImgFallback` 回退到 `bg_reactor_core`。
- 消散立绘已接入，按男女线自动映射：
  - 成年主角：`mc_adult_zixiao_dissolve@2x.png`（男）/ `mc_adult_yunuo_dissolve@2x.png`（女）
  - 成年副官：`fanwenmo_adult_dissolve@2x.png`（男）/ `heyanxi_adult_dissolve@2x.png`（女）
- 这段配乐为 `bgm_childhood`（温情/煽情），与"最痛的告别"情绪一致。
