# 第二幕新增缺失美术素材补齐需求单（仅增量 4 项）

> **说明**：第一波第二幕素材（12 张场景背景 + 8 套角色立绘/头像）已在工程目录中就位。
> 本需求单**仅包含第 16 章《1839·虎门浩气》历史穿越桥段最新追加、当前工程中尚缺的 4 项增量资产**（**2 张背景图 + 2 套历史人物立绘/头像**）。请只生成以下 4 项！

---

## 一、待补齐场景背景图（仅 2 张）

### 通用规格要求
- **存放目录**：`assets/backgrounds/`
- **每张场景需产出 2 个文件**：
  - `{bg_key}.png`（标准版：960 × 540，16:9，PNG）
  - `{bg_key}@2x.png`（高清版：1920 × 1080，16:9，PNG）
- **画风规范**：16-bit / 32-bit 经典 JRPG 像素美术风格，**严禁在画面中出现任何人物角色或文字水印**。

---

### 1. 1839年紫禁城乾清宫暖阁（道光帝召见林则徐）
- **资源名 / Key**：`bg_forbidden_city_palace`
- **应生成文件**：
  - `assets/backgrounds/bg_forbidden_city_palace.png`
  - `assets/backgrounds/bg_forbidden_city_palace@2x.png`
- **场景画面描述**：
  道光十八年冬，庄严肃穆的清代紫禁城乾清宫东暖阁。黑亮的皇家金砖地面倒映着摇曳的宫灯烛火，大殿上方高悬“正大光明”金丝楠木牌匾，盘龙金漆巨柱高耸。御案上堆满奏折，铜鹤香炉青烟袅袅，高窗外隐约可见大清山河暗夜阴霾。
- **参考生图 Prompt**：
  ```text
  16-bit JRPG visual novel background, Qing dynasty Forbidden City imperial palace hall interior at night in 1839, golden dragon-carved pillars, polished dark floor tiles reflecting flickering palace lanterns, grand imperial throne desk stacked with memorials, bronze crane incense burner with rising smoke, solemn and majestic historical atmosphere, no characters, no text, 16:9.
  ```

---

### 2. 1839年虎门沙角炮台古海港（林则徐督师收缴鸦片）
- **资源名 / Key**：`bg_humen_harbor_1839`
- **应生成文件**：
  - `assets/backgrounds/bg_humen_harbor_1839.png`
  - `assets/backgrounds/bg_humen_harbor_1839@2x.png`
- **场景画面描述**：
  道光十九年（1839年）初夏，广东东莞虎门海口沙角古炮台与水师军港。巍峨的花岗岩石砌海防城墙上排列着千斤青铜红夷大炮，大清广东水师战船在波涛汹涌的伶仃洋海面上列阵，“钦差大臣林”帅字大旗迎着海风猎猎作响。远处海面上停泊着被迫缴烟的三桅西洋鸦片趸船，码头木栈桥上堆满贴着封条的鸦片木箱。
- **参考生图 Prompt**：
  ```text
  16-bit JRPG visual novel background, 1839 Qing dynasty Humen coastal fortress harbor, stone artillery battery wall with bronze cannons overlooking the sea, traditional Chinese warships with fluttering imperial banners, three-masted Western opium clipper ships anchored in the distance, wooden dock stacked with sealed opium chests, bright sunlit historical epic atmosphere, no characters, no text, 16:9.
  ```

---

## 二、待补齐角色立绘与头像（仅 2 套）

### 通用规格要求
- **存放目录**：
  - 立绘存放于：`assets/art/`
  - 头像存放于：`assets/portraits/`
- **每套角色需产出 4 个文件**：
  - `assets/art/{char_id}.png`（标准立绘，约 360 × 480，PNG，**纯 `#FF00FF` 品红单色抠像背景**）
  - `assets/art/{char_id}@2x.png`（高清立绘，约 720 × 960，PNG，**纯 `#FF00FF` 品红单色抠像背景**）
  - `assets/portraits/{char_id}.png`（标准头像，从立绘面部特写裁剪，约 128 × 128，PNG）
  - `assets/portraits/{char_id}@2x.png`（高清头像，从立绘面部特写裁剪，约 256 × 256，PNG）
- **画风与构图规范**：
  - 16-bit / 32-bit 日系 JRPG 像素对话立绘风，清晰黑色外描边，赛璐璐分层阴影。
  - **半身胸像到腰部构图（Half-body cut to waist）**，三分之四正面微侧视角。
  - 立绘背景必须为纯粹的 **`#FF00FF`（纯品红）** 单色背景，以便程序自动抠除。

---

### 1. 钦差大臣 · 林则徐（虎门销烟主帅）
- **角色 ID**：`lin_zexu_imperial_commissioner`
- **应生成文件**：
  - `assets/art/lin_zexu_imperial_commissioner.png`
  - `assets/art/lin_zexu_imperial_commissioner@2x.png`
  - `assets/portraits/lin_zexu_imperial_commissioner.png`
  - `assets/portraits/lin_zexu_imperial_commissioner@2x.png`
- **角色外观描述**：
  54岁的清代一品大员林则徐。头戴红顶花翎清代官帽，身着石青色仙鹤一品文官补服，项挂朝珠。面容清癯端方，额庭饱满，三绺黑白相间的长须垂于胸前，双目炯炯有神，眉宇间既有忧国忧民的悲悯，更有“苟利国家生死以，岂因祸福避趋之”的凛然浩气。
- **参考生图 Prompt**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. Lin Zexu, historical Chinese Imperial Commissioner in 1839. Wearing authentic Qing-dynasty official first-rank mandarin robe with embroidered crane patch, official court hat with peacock feather and red coral jewel. Wise majestic face, neat grey beard, solemn and profoundly resolute eyes exuding overwhelming upright integrity, pixel art.
  ```

---

### 2. 大清天子 · 道光皇帝（紫禁城宣宗成皇帝）
- **角色 ID**：`emperor_daoguang_palace`
- **应生成文件**：
  - `assets/art/emperor_daoguang_palace.png`
  - `assets/art/emperor_daoguang_palace@2x.png`
  - `assets/portraits/emperor_daoguang_palace.png`
  - `assets/portraits/emperor_daoguang_palace@2x.png`
- **角色外观描述**：
  57岁的道光皇帝。面容清瘦刚毅，法令纹深邃，蓄着修剪整齐的八字清须。头戴镶东珠金龙冬朝冠，身穿明黄色十二章纹金龙皇袍，胸前挂明黄丝绦东珠朝珠。手握一管朱批御笔，神情凝重威严，眼神中交织着大清帝国白银外流、兵微将寡的深沉忧虑与痛下决心严旨禁烟的帝王决断。
- **参考生图 Prompt**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. Emperor Daoguang of the Qing dynasty, age 57. Gaunt ascetic face with melancholic solemn dignity, wearing an authentic bright yellow imperial dragon court robe with pearl necklace and imperial winter court hat. Holding an imperial red vermilion brush, majestic yet burdened sovereign expression, pixel art.
  ```

---

## 三、交付核对清单（共 12 个文件）

| 序号 | 类别 | 资源 ID | 待交付文件路径 |
| :--- | :--- | :--- | :--- |
| 1 | 场景背景 | `bg_forbidden_city_palace` | `assets/backgrounds/bg_forbidden_city_palace.png`<br>`assets/backgrounds/bg_forbidden_city_palace@2x.png` |
| 2 | 场景背景 | `bg_humen_harbor_1839` | `assets/backgrounds/bg_humen_harbor_1839.png`<br>`assets/backgrounds/bg_humen_harbor_1839@2x.png` |
| 3 | 角色立绘+头像 | `lin_zexu_imperial_commissioner` | `assets/art/lin_zexu_imperial_commissioner.png`<br>`assets/art/lin_zexu_imperial_commissioner@2x.png`<br>`assets/portraits/lin_zexu_imperial_commissioner.png`<br>`assets/portraits/lin_zexu_imperial_commissioner@2x.png` |
| 4 | 角色立绘+头像 | `emperor_daoguang_palace` | `assets/art/emperor_daoguang_palace.png`<br>`assets/art/emperor_daoguang_palace@2x.png`<br>`assets/portraits/emperor_daoguang_palace.png`<br>`assets/portraits/emperor_daoguang_palace@2x.png` |
