# 第三幕关键道具「金属手提箱 / 未来警徽」背景图美术需求说明书

> **文档定位**：供美术 Agent / AI 绘画团队阅读执行。本项目第三幕开篇（第21~22章）有一条贯穿全幕的核心线索链：
> **三号船水手江中网获的怪金属箱 → 箱内未来警徽 → 来自 2046 年的预警信 → 未来世界**。
> 此金属箱是第二十二章节点的“题眼”，其「密封特写」与「开箱露出警徽」两个画面是全章情绪高潮，重要性极高，需要单独产出两张高精度背景图，且两张图中箱体必须严格一致。

---

## 一、通用规格与交付标准（必须严格遵守）

1. **文件存放目录**：
   - 统一存放于项目工程目录 `assets/backgrounds/`。
2. **分辨率与命名规范**（每张图产出 2 个尺寸规格）：
   - **标准版 (1x)**：`xxx.png`，分辨率 **960 × 540**（16:9）。
   - **高清版 (2x)**：`xxx@2x.png`，分辨率 **1920 × 1080**。
3. **视觉风格与构图规范**：
   - **画风**：16-bit / 32-bit 日系现代 JRPG 像素复古与赛璐璐厚涂质感相结合的舞台场景风，带电影感镜头光影与细腻氛围。
   - **视角**：横版舞台式主视角（微俯视或平视），为底部半透明对话框与前景左右立绘留出合理展示层次。
   - **背景底色**：**禁止使用 `FF00FF` 抠像背景**，必须是完整的场景全景图。
   - **文本与水印**：画面中**绝对禁止**出现任何现代中英文字样、UI边框、商业水印或杂乱字迹。
   - **一致性**：两张图中的「银灰色金属手提箱」外观、比例、材质、锁扣结构、战损痕迹必须 100% 一致，仅视角/开合状态不同（见下文）。

---

## 二、详细清单（共 2 张场景背景图）

### 1. 暗夜雨幕中的金属手提箱特写
- **资源名/Key**：`bg_metal_case`
- **对应章节**：第二十二章《未来警徽》（`ch22_scene_pier_confrontation` / `ch22_scene_smuggler_drop`）
- **存放路径**：
  - `assets/backgrounds/bg_metal_case.png`
  - `assets/backgrounds/bg_metal_case@2x.png`
- **场景描述**：
  暴雨如注的九号码头栈桥边，画面中央是一只手提箱被雨水冲刷的**银灰色金属手提箱**，通体冰凉、反射着远处水警探照灯的冷光。箱体为高强度磨砂金属，四角有加固防撞包角，正面一道圆形/方形的高科技**生物防拆锁**（带淡淡冷蓝指示灯），表面附着几道被撬棍剐蹭后留下的细长划痕与水渍。背景是模糊的江面、昏暗的集装箱堆场与倾盆大雨，氛围冷峻、神秘、压迫。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, heavy rain at a dark riverside dock, a silver-grey metal suitcase in center stage being washed by rain, matte metal texture with reinforced corner bumpers, a high-tech round biometric lock glowing faint cold blue, thin scratches and wet droplets on surface, blurred container yard and river behind, distant cold searchlight reflection, cinematic suspenseful moody lighting, clean anime pixel art style, no characters, no text, no watermark, 16:9 widescreen.
  ```

### 2. 开箱瞬间 · 露出 2046 未来警徽与焦黑预警信
- **资源名/Key**：`bg_metal_case_open_badge`
- **对应章节**：第二十二章《未来警徽》（`ch22_scene_future_badge`）
- **存放路径**：
  - `assets/backgrounds/bg_metal_case_open_badge.png`
  - `assets/backgrounds/bg_metal_case_open_badge@2x.png`
- **场景描述**：
  同一只手提箱（与第 1 张严格一致）已被打开，白色冷雾正从箱口溢出。箱内防震海绵凹槽中央，静静躺着一枚**沉甸甸的银灰色金属警徽**，警徽背面朝上，激光蚀刻的警号泛着微光；警徽旁压着一张**边缘焦黑、带暗红血渍的泛黄信纸**。画面用一束暖色顶光打在箱口，与周围雨夜冷蓝环境形成强烈对比，象征“来自二十年后的警告”。构图聚焦箱内，警徽与信纸是绝对视觉中心。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, close-up of an opened silver-grey metal suitcase at night, cold white mist spilling out from the case, inside a foam cushion recess holds a heavy silver-grey police badge with a faintly glowing laser-engraved number on its back, beside it a charred bloodstained yellowed letter, a warm spotlight beam on the open case contrasting with the cold blue rainy night, cinematic dramatic lighting, clean anime pixel art style, no characters, no text, no watermark, 16:9 widescreen.
  ```

---

## 三、一致性与细节补充要求

1. **箱体一致性（重中之重）**：
   - 两张图中，箱体外观、四角防撞包角、锁扣位置、划痕位置、磨砂金属色必须一致。
   - 第 2 张为第 1 张的“开盖俯拍/近景”视角，箱盖开启状态，但箱体侧面与锁扣结构须能看出是同一只箱子。
2. **警徽细节**：
   - 警徽为**银灰色金属质地**，庄重、有分量感；背面刻有激光警号，可设计为 `046-2046-SF` 字样（其中 `046` 与 `SF` 为徽章刻痕，`2046` 为年份，字体要像激光蚀刻而非印刷）。
   - 警徽正面（若可见）可为盾形/徽章形，边缘做旧、带轻微磨损，体现“从未来跨越时空送回”的沧桑感。
3. **预警信细节**：
   - 焦黑、卷边、泛黄，边缘有暗红血迹，纸上可有点状血字笔触，但**不可出现可读的成句文字**（避免与游戏正文冲突）。
4. **禁止事项**：
   - 不得在画面中出现任何现代 Logo、广告牌、可读中文/英文成句。
   - 不得把警徽画成真实国家制式警徽，采用虚构徽章设计即可。

---

## 四、交付后接入说明（供研发备注）

- 资源就位后，研发将在 `src/data/story_chapter22.js` 中接入：
  - `ch22_scene_pier_confrontation` / `ch22_scene_smuggler_drop` 场景的 `bgImg` 使用 `bg_metal_case`（关键台词处切换）。
  - `ch22_scene_future_badge` 场景的 `bgImg` 使用 `bg_metal_case_open_badge`。
- 现有 `bg_pier_night_rain` 作为雨夜码头的通用背景与 `bgImgFallback` 回退继续保留。
