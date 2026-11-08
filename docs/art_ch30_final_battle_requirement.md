# 第30章 最终战「跨越百年的毕业礼」美术需求文档

> **需求背景**：第30章是全剧终章。当前反派侧「阿瑶第二形态 + 沈家父子黑气怨念」已有黑气缠身的单独立绘，但正派侧的「三代同堂精神赋能」（林则徐 + 虎门义士 + 2046未来人）没有对应的「金光/光芒万丈」立绘，导致正反对仗在画面上失衡。
> 本需求用于补齐最终战的视觉呈现，让「反派召唤黑气 VS 正派召唤金光」的对仗被玩家直观看到。

---

## 通用规格

- 立绘：半身像，透明背景 `PNG`，同时导出 `@1x`（960px 高）与 `@2x`（1920px 高）两版，命名以 `_default@2x.png` 收尾。
- 背景图：16:9，`960×540`（@1x）与 `1920×1080`（@2x）两版。
- 风格：延续全作 16-bit 像素 JRPG 风格；**金色虚影/金光效果**要明显，但不能遮住角色脸部和辨识特征。
- 禁止使用纯品红 `FF00FF` 作为背景色；画面中**不要出现文字、水印、UI 元素**。
- 所有图片放在 `assets/art/`（立绘）或 `assets/backgrounds/`（背景）目录下，文件名严格按下方清单。

---

## A. 正派「金光/光芒万丈」立绘（6 张）

> 用途：第30章 `ch30_scene_three_generations` 正派召唤时使用。与反派 `shen_chongli_soul` / `shen_wanting_soul`（黑气）形成「黑 vs 金」的对仗。
> 共性要求：角色全身覆盖柔和而耀眼的**纯阳金光**，边缘泛白金色光晕，整体呈**半透明金色虚影**感（像灵魂从历史/未来穿越而来），但仍能清楚辨认五官与服装轮廓。

### 1. 林则徐 · 光芒万丈
- **文件名**：`lin_zexu_gold@2x.png`
- **参考原型**：现有 `lin_zexu_imperial_commissioner`（头顶官帽、手握长剑的威严身影）。
- **画面**：林则徐头戴清代官帽，身披官服，右手按剑、左手拂须，昂首而立；全身笼罩耀眼的纯阳金光，背后仿佛有金色长风升腾，正气凛然。

### 2. 虎门民团教头 · 金色虚影
- **文件名**：`militia_instructor_gold@2x.png`
- **参考原型**：现有 `militia_instructor_1839`（虎门民团教头，扛着斑驳木杖）。
- **画面**：粗布短打、腰间束带、扛着那根刻「浩然正气」四字的木杖，咧嘴朗笑；全身呈金色半透明虚影，脚下有金光波纹，热血豪迈。

### 3. 成年主角（男线）· 金色虚影
- **文件名**：`mc_adult_zixiao_gold@2x.png`
- **参考原型**：现有 `mc_adult_zixiao_default`（32 岁张子骁）。
- **画面**：成年张子骁作战斗装扮，面带温和而坚定的微笑；全身金色半透明虚影，右手向前伸出（像要托住少年的手），金光流转。

### 4. 成年主角（女线）· 金色虚影
- **文件名**：`mc_adult_yunuo_gold@2x.png`
- **参考原型**：现有 `mc_adult_yunuo_default`（32 岁石予诺）。
- **画面**：成年石予诺，眼神坚定，微笑中带着释然；全身金色半透明虚影，同样作向前伸手的姿态，金光缭绕。

### 5. 成年范文默（男线副官）· 金色虚影
- **文件名**：`fanwenmo_adult_gold@2x.png`
- **参考原型**：现有 `fanwenmo_adult_default`（成年范文默，身穿海峰遗留的旧警服）。
- **画面**：成年范文默穿着磨损的旧警服，胸前警徽处空着一块（对应送回过去的警徽）；全身金色虚影，神色坚毅。

### 6. 成年何妍熹（女线副官）· 金色虚影
- **文件名**：`heyanxi_adult_gold@2x.png`
- **参考原型**：现有 `heyanxi_adult_default`（成年何妍熹，同样穿旧警服）。
- **画面**：成年何妍熹身穿旧警服，胸前警徽处空着一块；全身金色虚影，马尾在金光中扬起，英气坚定。

---

## B. 背景图（2 张）

### 1. 正派召唤 · 金光普照天台
- **文件名**：`bg_cargo_top_divine_light@2x.png`
- **场景**：三号船顶层天台，正派「浩然气」召唤的瞬间。
- **画面**：暗紫黑雾仍盘踞在画面边缘，但正中央上空撕开一道裂缝，**万道纯阳金光如瀑布般倾泻而下**，洒满整座天台，把地面和人物映成暖金色；金光中隐约浮现古代武将、虎门义士与未来战士的轮廓剪影。整体「天光破邪」的救赎感。
- **英文参考 Prompt**：`pixel art JRPG background, 16-bit style, cargo ship rooftop at dusk, dark purple evil fog at edges, a tear in the sky pouring down radiant golden holy light like a waterfall, golden light bathing the whole deck, faint silhouettes of an ancient official, militia fighters and future warriors standing in the golden glow, hopeful triumphant atmosphere, no text, 16:9`

### 2. 第二形态崩解 · 战后残骸
- **文件名**：`bg_cargo_top_aftermath@2x.png`
- **场景**：第30章终局战斗结束后，阿瑶从半空跌落、机器核心崩解的天台。
- **画面**：天台满地是崩碎的光缆、断裂的神经柱与焦黑金属残骸，暗紫电光几乎熄灭，只剩零星火花；漫天暗紫光屑如雪花飘落，江风把余烬吹散。画面中央空出人物站位，氛围是「大战后的寂静与一丝悲凉」，但天边透出一点破晓前的微光。
- **英文参考 Prompt**：`pixel art JRPG background, 16-bit style, cargo ship rooftop after a great battle, shattered cables and broken metal pillars scattered on the deck, faint purple sparks and falling ash, dark purple energy dissolving into the night wind, a faint glimmer of dawn on the horizon, quiet mournful aftermath atmosphere, no text, 16:9`

---

## 落地方式（接口先行）

程序侧已经用这些文件名/角色 id 接入，当前默认回退到已有资源，**美术出图后替换映射即生效，不会白屏**：

- 金光立绘当前回退到对应普通立绘（见 `src/engine/avatar.js` 的 `*-gold` 条目），出图后把 `default` 指向新的 `xxx_gold` 即可。
- 背景图已配 `bgImgFallback`（金光图回退到 `bg_cargo_top_second_form`，战后图回退到 `bg_cargo_top_throne`），出图后自动切到新图。
