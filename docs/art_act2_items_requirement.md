# 第二幕新增道具（剧情信物/关键物品）美术需求文档

本需求文档专门针对游戏**第二幕（第11章至第20章）**中新增的**剧情信物与关键物品**的美术图标制作。请美术团队/AI作画按此标准与清单进行绘制及交付。

> **背景说明**：第二幕的**战斗掉落道具**（烤肠、混蛋汽水、蜂蜜柚子茶、大白兔奶糖等）全部**复用第一幕已有图标**，无需重画。本清单只涉及第二幕剧情里反复出现、需要视觉呈现的**关键信物与物品**，用于剧情特写、背包展示或关键道具图标。

---

## 一、通用规格与交付标准

1. **文件存放目录**：`assets/items/`
2. **每个道具需产出 2 个标准文件**：
   - `assets/items/{item_id}.png` （标准图标，约 128 × 128，PNG）
   - `assets/items/{item_id}@2x.png` （高清图标，约 256 × 256，PNG）
3. **视觉风格与背景规范**：
   - **画风**：16-bit / 32-bit 日系现代 JRPG 像素道具图标风格，清晰黑色外描边，柔和赛璐璐层次阴影。
   - **构图**：单件道具居中特写，轮廓完整、辨识度高，俯视/四分之三视角皆可。
   - **底色要求**：使用**纯 `#FF00FF`（纯品红）单色背景**，便于引擎直接透明抠像（与角色立绘同一抠像约定）。
4. **命名**：文件名即下方清单中的 `item_id`，严禁随意改动。

---

## 二、第二幕新增道具清单（共 4 件）

### 1. 浩然销烟杖（核心信物 · 必出）
- **物品 ID**：`righteous_staff`
- **名称**：浩然销烟杖
- **用途/出现**：第16章（ch15）林则徐御赐的「浩然信物」，贯穿第17~20章，是少年团对抗百年鸦片黑气的核心武器与象征，最终刺破巨灵魔核。
- **外观特征**：
  一柄约一米五的赤红色沉香木长棍，通体温润如玉，棍身刻有暗金色的「浩然正气」微雕铭文，两端包着古朴的黄铜箍，隐隐泛着暖金色圣光。整体刚正、庄重、透着一股涤荡污浊的浩然之气。
- **交付文件**：
  - `assets/items/righteous_staff.png`
  - `assets/items/righteous_staff@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art item icon, single prop centered, solid #FF00FF magenta background, no watermark. A sacred ceremonial staff of dark red agarwood, about one and a half meters long, smooth and jade-like, engraved with faint gold Chinese characters meaning "Righteous Spirit", capped with antique brass ferrules at both ends, radiating a warm golden holy glow, solemn and heroic, anime sprite style with crisp black outlines, cel-shaded.
  ```

### 2. 青花古瓷罐（母体原浆容器 · 必出）
- **物品 ID**：`opium_porcelain_jar`
- **名称**：青花古瓷罐（虎门销烟遗存）
- **用途/出现**：第11章（ch10）省博物馆核心展品，是「古毒/青髓原浆」的母体容器，贯穿第11~15章，第15章（ch14）被沈崇礼砸裂引发时空异变。
- **外观特征**：
  一只道光年间的青花瓷罐，罐身绘有缠枝莲花纹，表面附着斑驳的黑红色封泥与海蛎壳，罐口用多层油纸封裹，隐隐渗出一丝阴甜的冷光。古朴中透着诡异。
- **交付文件**：
  - `assets/items/opium_porcelain_jar.png`
  - `assets/items/opium_porcelain_jar@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art item icon, single prop centered, solid #FF00FF magenta background, no watermark. A Qing dynasty blue-and-white porcelain jar painted with twining lotus patterns, covered in mottled dark-red wax seal and seashell fragments, mouth sealed with layers of oiled paper, faint eerie cold light seeping from the cracks, antique yet ominous, anime sprite style with crisp black outlines, cel-shaded.
  ```

### 3. 警官证与金徽（卧底身份铁证 · 建议出）
- **物品 ID**：`police_badge`
- **名称**：警官证与国徽金徽
- **用途/出现**：第13章（ch12）海峰血衣内衬滑落、真相大白的核心道具，代表父亲卧底缉毒警察的真实身份。
- **外观特征**：
  一本深红色皮革封面的警官证，翻开内页露出烫金警徽与「省公安厅禁毒总队特勤处」字样，旁边配一枚锃亮发光的国徽金徽。庄重、可信、透着正义感。
- **交付文件**：
  - `assets/items/police_badge.png`
  - `assets/items/police_badge@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art item icon, single prop centered, solid #FF00FF magenta background, no watermark. A dark-red leather police badge case opened to reveal a gilded police emblem and Chinese text, next to a polished shiny golden national emblem badge, solemn and trustworthy, anime sprite style with crisp black outlines, cel-shaded.
  ```

### 4. 古毒原浆/青髓（反派核心毒物 · 可选）
- **物品 ID**：`opium_essence_vial`
- **名称**：古毒原浆（青髓）
- **用途/出现**：第二幕反派的「母体原浆」——虎门销烟时期被「福寿堂」暗中偷藏的鸦片老膏，是一切异化的源头，多次以青黑黏液形态出现。
- **外观特征**：
  一只透明玻璃试剂瓶，内装黏稠发亮的青黑色液体，瓶口渗出青绿色毒烟，瓶身贴着泛黄的「福寿堂」封条。危险、神秘、令人不适。
- **交付文件**：
  - `assets/items/opium_essence_vial.png`
  - `assets/items/opium_essence_vial@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art item icon, single prop centered, solid #FF00FF magenta background, no watermark. A transparent glass vial filled with thick glossy black-green liquid, greenish toxic smoke seeping from the cork, an aged yellowed paper seal pasted on the vial, dangerous and mysterious, anime sprite style with crisp black outlines, cel-shaded.
  ```

---

## 三、复用说明（无需新出图）

以下第二幕战斗相关道具**直接复用第一幕已有图标**，无需美术重新绘制：

- **所有战斗掉落消耗品**：烤肠 `sausage`、混蛋汽水 `bastard_soda`、蜂蜜柚子茶 `honey_tea`、大白兔奶糖 `white_rabbit_candy`、可疑零食 `suspicious_snack` 等。
- **所有已登场武器**：铁哑铃 `dumbbell`、扫帚 `broom`、练习册卷棒 `exercise_bat`、教鞭 `teaching_pointer`、铁哨子 `whistle`、竖笛 `recorder`、拖把 `mop` 等。
