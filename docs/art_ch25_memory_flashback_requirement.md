# 第二十五章回忆闪回背景图美术需求（三号船爆炸 · 黑白老照片风格）

> **需求背景**：`src/data/story_chapter25.js` 的 `ch25_scene_unmasking_reunion` 中，成年副官向少年们讲述二十年前「三号船底舱爆炸、老师们牺牲、海峰推孩子们上救生筏」的往事。目前这段是纯文字叙述，缺画面支撑。
>
> 为了让这段回忆更有冲击力和年代感，需要美术出 **4 张「黑白老照片 / 褪色胶片」风格的回忆背景图**，对应回忆里的 4 个关键分镜。

---

## 一、交付接口

| 资源名 / Key | 交付路径 | 规格 |
| --- | --- | --- |
| `bg_memory_cabin_explosion` | `assets/backgrounds/bg_memory_cabin_explosion@2x.png` | 1920×1080，PNG，16:9 |
| `bg_memory_cabin_explosion` | `assets/backgrounds/bg_memory_cabin_explosion.png` | 960×540，PNG，16:9 |
| `bg_memory_teachers_hold_gate` | `assets/backgrounds/bg_memory_teachers_hold_gate@2x.png` | 1920×1080，PNG，16:9 |
| `bg_memory_teachers_hold_gate` | `assets/backgrounds/bg_memory_teachers_hold_gate.png` | 960×540，PNG，16:9 |
| `bg_memory_haifeng_lifeboat` | `assets/backgrounds/bg_memory_haifeng_lifeboat@2x.png` | 1920×1080，PNG，16:9 |
| `bg_memory_haifeng_lifeboat` | `assets/backgrounds/bg_memory_haifeng_lifeboat.png` | 960×540，PNG，16:9 |
| `bg_memory_ship_sinking` | `assets/backgrounds/bg_memory_ship_sinking@2x.png` | 1920×1080，PNG，16:9 |
| `bg_memory_ship_sinking` | `assets/backgrounds/bg_memory_ship_sinking.png` | 960×540，PNG，16:9 |

- 每张图各出 **高清版（1920×1080）+ 标准版（960×540）** 两套，构图一致。
- 按上述命名交付到 `assets/backgrounds/` 即可，剧情脚本由程序侧接入，无需临时占位图。

---

## 二、统一风格要求（重要：这是「回忆闪回」专用风格）

这 4 张与全游其它彩色背景不同，是**回忆/闪回**场景，统一做 **黑白老照片、褪色胶片**质感：

- **黑白或极低饱和**：主色调为黑白、冷灰或轻微泛黄褪色，禁用高饱和彩色。
- **胶片颗粒噪点 + 暗角（vignette）**：营造旧照片的年代感。
- **划痕 / 轻微模糊边缘**：像一张放了二十年的旧照片，边缘可带细碎划痕或轻微虚化。
- **火光可保留高亮**：爆炸、铁水、江面大火处可用高亮暖白，但整体仍是黑白基调，不要变成彩色火焰。
- **16-bit 像素复古 JRPG 密度**：延续全游像素画密度，不做粗大像素块或写实 3D 渐变。
- **无人物近景正脸、无文字、无水印、无 UI 边框**：人物立绘和对话框由游戏叠加。

---

## 三、逐张画面要求与生图 Prompt

### 1. 底舱爆炸 —— `bg_memory_cabin_explosion`
**画面**：昏暗密闭的货船底舱，烈性炸药引爆，火浪爆闪瞬间封死通路，浓烟与火星翻滚，铁皮舱壁被映得发亮。压抑、惊险。

```text
Pixel art background, interior of a dark cramped cargo ship lower hold, dynamite explosion, blinding fireball and rolling black smoke filling the narrow steel corridor, sparks and debris flying, monochrome black-and-white old photograph style, film grain, vignette, faded scratched nostalgic memory, 16-bit retro JRPG background, high contrast fire glow, no people no text no watermark.
```

### 2. 老师顶钢闸 —— `bg_memory_teachers_hold_gate`
**画面**：烧红变形的防爆钢闸正在下落，两位成年老师（一男一女）用背死死顶住，火星与铁水四处飞溅，火光勾勒出两人悲壮的背影轮廓。**不露清晰正脸**，突出牺牲感。

```text
Pixel art background, two adult teachers seen from behind pressing their backs against a red-hot deformed blast-proof steel gate sliding down, molten sparks and molten metal spraying, dim cargo hold on fire, heroic silhouettes, monochrome black-and-white old photograph style, film grain, vignette, nostalgic tragic memory, 16-bit retro JRPG background, no clear faces no text no watermark.
```

### 3. 海峰推孩子上救生筏 —— `bg_memory_haifeng_lifeboat`
**画面**：船舷边，浑身是血、一条腿受伤的成年警察（海峰）拼尽最后力气，把五个孩子推向充气救生筏，身后是火光与浓烟。动作充满张力，父亲式的舍命保护。**不露清晰正脸**。

```text
Pixel art background, a bloodied adult policeman pushing five children onto an inflatable lifeboat at the ship's railing, his leg wounded, flames and smoke behind him, desperate rescue, monochrome black-and-white old photograph style, film grain, vignette, nostalgic tragic memory, 16-bit retro JRPG background, dynamic dramatic composition, no clear faces no text no watermark.
```

### 4. 三号船沉江 + 救生筏上的孩子 —— `bg_memory_ship_sinking`
**画面**：远景货船半沉入江、江面燃起大火；近景充气救生筏上五个孩子哭喊、伸手，抓不到老师的一片衣角。悲怆、绝望、留白感强。**不露清晰正脸**。

```text
Pixel art background, distant cargo ship half sunken into a river with fire raging across the water surface, foreground five children on an inflatable lifeboat crying and reaching out, despair, monochrome black-and-white old photograph style, film grain, vignette, nostalgic tragic memory, 16-bit retro JRPG background, wide shot, no clear faces no text no watermark.
```

---

## 四、构图与程序接入说明

- 人物半身立绘会遮挡画面左右两侧，对话框覆盖下方约三分之一；**主要画面内容（火光、钢闸、救生筏、沉船轮廓）请放在画面中上部**，下方留出平静/空旷区域。
- 出图落盘后，程序侧会：把当前 `story_chapter25.js` 里一句塞了多个画面的长对白拆成多句，逐句切换对应的 `bgImg`，并已为这段回忆接入 `bgm_broken` 悲怆配乐。
- 压缩建议：在不模糊像素边缘的前提下压缩 PNG，高清版尽量控制在 2 MB 左右；与项目其它背景一致可用 256 色调色板 + Floyd-Steinberg 抖动（黑白图尤其适配）。
