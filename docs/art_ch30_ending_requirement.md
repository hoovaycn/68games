# 第30章 结局「重逢 · 牺牲 · 后来」美术需求文档

> **需求背景**：第30章全剧终章结局已重做为三段式——「重逢与原谅」→「金光退场与阿瑶牺牲」→「后来」。当前退场/牺牲的煽情节点主要靠文字描述 + 已有立绘兜底。为让「化作青烟/金光消散」的退场更打动人，补齐少量消散立绘与尾声背景。

---

## 通用规格

- 立绘：半身像，透明背景 `PNG`，同时导出 `@1x`（960px 高）与 `@2x`（1920px 高）两版，命名以 `_dissolve@2x.png` 收尾。
- 背景图：16:9，`960×540`（@1x）与 `1920×1080`（@2x）两版。
- 风格：延续全作 16-bit 像素 JRPG 风格；消散角色要呈**半透明**、身体边缘**化为暖金色/淡青色光屑**飘散，但仍能看清五官与表情。
- 禁止纯品红 `FF00FF` 作背景色；画面**不要出现文字、水印、UI 元素**。
- 所有图片放在 `assets/art/`（立绘）或 `assets/backgrounds/`（背景）目录，文件名严格按下方清单。

---

## A. 消散 / 退场立绘（3 张）

> 用途：第30章 `ch30_scene_golden_departure` 的退场戏份。与已就位的 `mc_adult_zixiao_dissolve` / `mc_adult_yunuo_dissolve` / `fanwenmo_adult_dissolve` / `heyanxi_adult_dissolve`（未来人消散）形成统一的「消散」视觉语言。

### 1. 阿瑶 · 化作青烟
- **文件名**：`ayao_adult_dissolve@2x.png`
- **参考原型**：现有 `ayao_adult_tearful` / `ayao_adult_smile`（成年阿瑶）。
- **画面**：成年阿瑶身体边缘开始透明，自脚尖向上化作淡青与暖金交织的光屑，像一缕被江风吹散的烟；神情释然、微微带笑，眼角仍挂着一滴泪。用于「扯断神经缆绳，身体一点点变得透明，最终化作青烟消散」的最后一幕。

### 2. 林则徐 · 金光消散
- **文件名**：`lin_zexu_dissolve@2x.png`
- **参考原型**：现有 `lin_zexu_gold`（金光林则徐）。
- **画面**：金光中的林则徐虚影自脚边开始化作暖金色光屑，身形逐渐透明，仍保持头顶官帽、按剑拂须的威严姿态，正气未散。用于金光退场的最后一刻。

### 3. 虎门民团教头 · 金光消散
- **文件名**：`militia_instructor_dissolve@2x.png`
- **参考原型**：现有 `militia_instructor_gold`（金光虎门民团教头）。
- **画面**：金色虚影的民团教头扛着那根刻「浩然正气」的木杖咧嘴朗笑，身体边缘化为暖金色光屑，豪迈地随风散去。用于金光退场的最后一刻。

---

## B. 「下船晨曦」背景（1 张，优先）

> 用途：第30章 `ch30_scene_ashore_dawn`（走下三号船的破晓过渡）。**关键约束：画面里绝对不能出现第二幕的「河畔钟楼」**，那是已经离开的旧 Boss 战场，会让玩家误以为又回去了。当前暂用 `bg_street` 兜底。

### 1. 走下三号船 · 新生晨曦
- **文件名**：`bg_ending_dawn@2x.png`
- **场景**：破晓时分，众人从江边的三号船码头走下来。江面泛着暖金色的晨光，岸上是干净明亮的街道与远处新校舍的剪影，没有钟楼、仓库废墟或暗紫毒雾。
- **画面**：暖金色朝阳、清晨薄雾、平静江面，充满新生感与生机；主要轮廓（朝阳、江面、校舍）放在画面中上部，下方三分之一留给对话框。不要文字、水印、UI。
- **英文参考 Prompt**：`pixel art JRPG background, 16-bit style, dawn by a calm riverside wharf after leaving an old cargo ship, warm golden morning light on the water, a clean bright street and distant new school building silhouette, gentle morning mist, hopeful peaceful new-beginning atmosphere, absolutely no clock tower no ruined warehouse no purple smog, no text, 16:9`

## C. 「后来」尾声背景（可选）

> 用途：第30章 `ch30_scene_epilogue_three_views` 的「三个月后」尾声。当前已简化为单一暖街景 `bg_street`，避免来回切背景造成「河畔钟楼」的串场感。以下两张为可选增强，出图后替换对应段落。

### 1. 初中校门口 · 秋日午后
- **文件名**：`bg_school_gate_afternoon@2x.png`
- **场景**：三个月后，秋日午后，初中校门口。海峰穿着新夹克，举着老相机给刚放学的孩子们拍照。暖黄光线、干净明亮的校门，桂树飘香，充满生活气息与生机。

### 2. 翻新后的老水闸
- **文件名**：`bg_watergate_renewed@2x.png`
- **场景**：三个月后，翻修一新的江边老水闸。栏杆旁放着一束花和那支修好的老钢笔。清晨或黄昏的暖光洒在江面上，安静、温柔，是留给阿瑶的「迟到的告别」。

---

## 落地方式（接口先行）

程序侧已经按这些文件名预留接口，美术出图后**替换映射即生效，不会白屏**：

- 消散立绘：在 `src/engine/avatar.js` 给对应角色加 `dissolve` state（当前用 `gold`/`adult` + 文字描述兜底）。
- 背景图：替换 `src/data/story_chapter30.js` 尾声里对应对话的 `bgImg` 即可。
