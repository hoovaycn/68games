# 第三十章 最终决战美术需求（净化主宰·阿瑶 第二形态 + 沈家父子怨念残魂）

> **需求背景**：终章 `story_chapter30.js` 把阿瑶改成了被机器彻底异化支配的最终大 Boss，分两个形态：
> - 第一形态（第29章，已有资源 `ayao_corrupted_god_*`，本次无需新出）；
> - **第二形态（第30章，本次需要新出）**——「净化主宰·阿瑶」终极变异大 Boss。
>
> 同时，第30章战斗还引入了 **沈家父子怨念残魂**（沈崇礼、沈万廷），用于借战斗回顾沈家这条线。这两类立绘/头像目前缺失，需美术补齐。

---

## 一、交付接口

### 1. 净化主宰·阿瑶（第二形态 · 终极变异大 Boss）

| 资源用途 | 交付路径 | 规格 |
| --- | --- | --- |
| 对话立绘 | `assets/art/ayao_final_form_default@2x.png` | 立绘高清版 |
| 对话立绘 | `assets/art/ayao_final_form_default.png` | 立绘标准版 |
| 战斗头像 | `assets/portraits/ayao_final_form_default@2x.png` | 头像高清版 |
| 战斗头像 | `assets/portraits/ayao_final_form_default.png` | 头像标准版 |

### 2. 沈崇礼之魂

| 资源用途 | 交付路径 | 规格 |
| --- | --- | --- |
| 对话立绘 | `assets/art/shen_chongli_soul_default@2x.png` | 立绘高清版 |
| 对话立绘 | `assets/art/shen_chongli_soul_default.png` | 立绘标准版 |
| 战斗头像 | `assets/portraits/shen_chongli_soul@2x.png` | 头像高清版 |
| 战斗头像 | `assets/portraits/shen_chongli_soul.png` | 头像标准版 |

### 3. 沈万廷之魂

| 资源用途 | 交付路径 | 规格 |
| --- | --- | --- |
| 对话立绘 | `assets/art/shen_wanting_soul_default@2x.png` | 立绘高清版 |
| 对话立绘 | `assets/art/shen_wanting_soul_default.png` | 立绘标准版 |
| 战斗头像 | `assets/portraits/shen_wanting_soul@2x.png` | 头像高清版 |
| 战斗头像 | `assets/portraits/shen_wanting_soul.png` | 头像标准版 |

- 命名直接交付到上述路径即可，程序已按此文件名接入（对话立绘走 `assets/art/`，战斗头像走 `assets/portraits/`）。
- 战斗精灵当前用占位符（`walk_placeholder_*`），本轮可先不出，后续需要再单独排。

### 4. 已有资源（无需新出，仅核对）

- **林则徐「林公浩然气」** 对话立绘已存在：`assets/art/lin_zexu_imperial_commissioner@2x.png`，**无需出图**。
- **场景背景** 已存在：`bg_cargo_top_throne`（三号船顶层天台，第二形态/三代同堂/结局共用）、`bg_canal_dawn`（尾声破晓运河），**均无需新出**。
- **其他角色立绘**（徐老师、刘老师、海峰、覃瑞怡、主角团等）与 **机械守卫 `capital_guard_mech`** 头像均已存在，无需出图。

---

## 二、画面要求

### 1. 净化主宰·阿瑶（第二形态）

**核心定位**：阿瑶与净化机器彻底融合后的终极形态，压迫感要压倒第一形态。

- **半人半机器**：上半身保留阿瑶（成年苏晚）的面容与轮廓，但眼神已无温度、呈冰冷的暗紫色机械复眼；下半身/背部与机器融合，脊柱沿线的金属骨钉刺出，连接数根粗黑神经缆绳。
- **光缆与试卷**：数万根暗紫色光缆如巨蟒般缠绕周身，无数破碎的试卷纸片在四周高速飞舞，营造「被考试/净化吞噬」的意象。
- **色调**：整体暗紫 + 深黑，间或闪烁刺眼的电芒；不要暖色，突出「绝对理性、抹除情感」的冰冷感。
- **风格**：延续项目 16-bit 像素复古 JRPG 密度，禁止粗大像素块或写实 3D 渐变；无文字、无水印、无 UI 边框。

```text
Pixel art, final boss form of a female character fused with a giant machine, upper body keeps the woman's face with cold purple mechanical compound eyes, spine pierced by metal bone nails connected to thick black neural cables, countless dark purple fiber cables wrapping around like pythons, shattered exam papers flying around, dark purple and black palette with electric sparks, oppressive cold rational atmosphere, 16-bit retro JRPG style, no clear text no watermark.
```

### 2. 沈崇礼之魂

- **形象基准**：基于既有沈崇礼立绘 `assets/art/mystery_man_corrupted@2x.png`（2026年「神秘家长」/名流精英的腐化形象，含墨镜、文明杖等识别要素）做怨念残魂化，脸型与配件保持一致，只做「半透明怨念」处理。
- **定位**：黑色怨念凝聚成的执文明杖人形，阴冷狡诈，是沈家「规则/分数收割」的化身。
- **元素**：半透明的黑色/暗红怨念轮廓，名流精英的残影，手持合金文明杖，周身飘散细碎的黑色怨气。
- **风格**：同上，像素风；无文字、无水印。

```text
Pixel art, ghostly vengeful spirit of a young elegant man in a suit, semi-transparent black and dark red smoke silhouette, holding an alloy cane, cold cunning expression, wispy black resentment smoke drifting around, 16-bit retro JRPG style, no clear text no watermark.
```

### 3. 沈万廷之魂

- **形象基准**：基于既有沈万廷立绘 `assets/art/shen_wanting_old@2x.png`（2026年苍老坐轮椅、戴呼吸机的老家主形象）做怨念残魂化，苍老轮廓与轮椅/呼吸机要素保持一致。
- **定位**：更浑浊、更苍老的百年怨念残魂，是沈家「百年提线木偶王国」的根源。
- **元素**：苍老佝偻的黑色怨念身影，浑浊如浓烟，面庞模糊，透出百年贪婪的阴森；可带一点若有若无的呼吸机/轮椅轮廓暗示（但以怨念烟雾为主，不必写实）。
- **风格**：同上，像素风；无文字、无水印。

```text
Pixel art, ancient ghostly spirit of a decrepit old man, murky black resentment smoke body, hunched and withered, blurred face with cold greed, faint shadow of a wheelchair or breathing mask hinted in the smoke, ominous century-old malice, 16-bit retro JRPG style, no clear text no watermark.
```

---

## 三、程序接入说明（已完成的配套）

- `story_chapter30.js` 已把第二形态接入 `ch30_scene_second_form` / `ch30_scene_three_generations`，对话立绘 key 分别为：
  - 阿瑶第二形态：`ayao_final_form_default`
  - 沈崇礼之魂：`shen_chongli_soul_default`
  - 沈万廷之魂：`shen_wanting_soul_default`
- `enemies.js` 已新增三个敌人定义：`ayao_final_form`、`shen_chongli_soul`、`shen_wanting_soul`，战斗头像分别指向 `assets/portraits/` 下同名文件。
- `ch30_battle1.js` 终局战敌方阵容已改为：`ayao_final_form`（Boss）+ `shen_wanting_soul` + `shen_chongli_soul` + 2 台 `capital_guard_mech`（机械守卫，已有资源）。
- 这段战斗配乐为 `bgm_gojira_battle`（决战感），立绘/头像请保持冷峻压迫，与配乐情绪一致。
