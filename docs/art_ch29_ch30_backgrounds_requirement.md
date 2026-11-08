# 第三幕 第29/30章 新增场景背景图美术需求文档

> **需求背景**：第29章战斗结束后与第30章「净化主宰」第二形态降临，需要**场景切换**来强化「以为赢了 → 其实还有更深的第二形态」的叙事冲击。当前这两处仍复用 `bg_cargo_top_throne`（三号船顶层天台），视觉上没有拉开阶段感，故新增 2 张背景图。

---

## 一、通用规格与交付标准

1. **文件存放目录**：统一存放于 `assets/backgrounds/`
2. **分辨率与命名**（每张产出 2 个尺寸）：
   - 标准版 (1x)：`xxx.png`，建议 **960 × 540**
   - 高清版 (2x)：`xxx@2x.png`，建议 **1920 × 1080**
3. **视觉风格与构图**：
   - 画风：16-bit / 32-bit 日系现代 JRPG 像素复古 + 赛璐璐厚涂质感，电影感镜头光影与细腻氛围。
   - 视角：横版舞台式主视角（微俯视或平视），为底部对话框与前景左右立绘留出层次。
   - 背景底色：**禁止 `FF00FF` 抠像底色**，必须是完整场景全景图（含天空、地面、建筑、环境光）。
   - 文本与水印：画面中**绝对禁止**现代中英文字样、UI 边框、商业水印或杂乱字迹。

---

## 二、场景背景图详细清单（共 2 处）

### 1. 三号船顶层天台 · 死锁崩解残骸

- **资源名 / Key**：`bg_cargo_top_shattered`
- **对应章节**：第29章战斗结束（`ch29_scene_break_chains`）
- **存放路径**：
  - `assets/backgrounds/bg_cargo_top_shattered.png`
  - `assets/backgrounds/bg_cargo_top_shattered@2x.png`
- **场景描述**：
  三号货轮最高处的露天天台，战斗刚刚结束。四根粗壮的暗紫合金死锁立柱**全部崩断**，断裂的柱体歪斜倒地，粗黑神经缆绳寸寸崩断、如死蛇般垂落。甲板被战斗撕出多处裂缝，电光残骸与碎金属散落一地。平台中央的半球形量子神座尚未熄灭，核心深处透出**更深的暗紫红光**，像一颗还在搏动的巨大心脏，昭示着危机远未结束。黄昏已尽，江风呼啸，暗紫电芒在残骸间明明灭灭，气氛压抑、紧绷、山雨欲来。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, top deck of a giant cargo ship after a battle, four broken dark-purple alloy lock pillars collapsed and toppled, thick black neural cables snapped and hanging like dead snakes, cracked metal deck with scattered debris and sparks, a hemispherical quantum throne core in the center still glowing deep purple like a beating heart, dusk fading into night, howling river wind, tense ominous atmosphere, clean anime pixel art style, no characters, no text, no watermark, 16:9 widescreen.
  ```

---

### 2. 三号船顶层天台 · 净化主宰第二形态降临

- **资源名 / Key**：`bg_cargo_top_second_form`
- **对应章节**：第30章第二形态降临（`ch30_scene_second_form`）
- **存放路径**：
  - `assets/backgrounds/bg_cargo_top_second_form.png`
  - `assets/backgrounds/bg_cargo_top_second_form@2x.png`
- **场景描述**：
  比第一形态**更宏大、更恐怖、更邪恶**的终局舞台。阿瑶已与机器彻底融合，化作半人半机器的巨大轮廓悬浮半空（本图以环境/氛围为主，人物主体仍由前景立绘承担，可只给出剪影或能量轮廓），数万根暗紫色光缆如巨蟒般缠绕舞动，无数破碎试卷纸片在四周高速飞旋。两团纠缠不散的**黑色怨念**（沈家父子之魂）在光缆间若隐若现。滔天暗紫气浪几乎吞没整个天台，机械重力场让空间都仿佛扭曲，背景的江面与城市灯火被压得黯淡无光。整体为「绝对理性、抹除情感」的冰冷邪恶感，压迫感要压倒第一形态。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, apocalyptic final stage on the top deck of a giant cargo ship, a colossal half-human half-machine silhouette fused with a woman suspended in the air, countless dark purple fiber cables writhing like pythons, shattered exam papers flying wildly, two black vengeful spirit smokes entangled among the cables, surging dark purple energy waves engulfing the deck, distorted oppressive gravity field, dim city lights far below, cold rational evil atmosphere, clean anime pixel art style, no clear text, no watermark, 16:9 widescreen.
  ```

---

## 三、程序接入说明（已完成）

- `story_chapter29.js` 的 `ch29_scene_break_chains` 已引用 `bg_cargo_top_shattered`，并保留 `bg_cargo_top_throne` 作为缺图回退。
- `story_chapter30.js` 的 `ch30_scene_second_form` 已引用 `bg_cargo_top_second_form`，同样保留 `bg_cargo_top_throne` 作为缺图回退。
- 命名按上述路径直接交付即可，程序已按文件名接入；出图前缺图不会报错，会自动回退到现有神座背景。
