# 第二幕敌人（战斗杂兵）立绘与头像补充需求文档

本需求文档专门针对游戏**第二幕（第11章至第20章）**中登场的**战斗杂兵级敌人**的美术立绘与头像制作。请美术团队/AI作画按此标准与清单进行绘制及交付。

> **背景说明**：第二幕剧情对白中出现的核心反派（沈崇礼、沈万廷、重装药人头目 `berserker_guard_heavy`、终极 BOSS `boss_colossus_opium_god`）立绘已齐备；但战斗关卡中的**普通杂兵敌人**尚缺 3 类，需补齐，用于战场棋子的头像与战斗演出。

---

## 一、通用规格与交付标准

1. **文件存放目录**：
   - 敌人立绘文件：存放在 `assets/art/`
   - 敌人头像文件：存放在 `assets/portraits/`
2. **每套敌人需产出的 4 个标准文件**：
   - `assets/art/{enemy_id}.png` （标准立绘，约 360 × 480，PNG，纯 `#FF00FF` 品红抠像背景）
   - `assets/art/{enemy_id}@2x.png` （高清立绘，约 720 × 960，PNG，纯 `#FF00FF` 品红抠像背景）
   - `assets/portraits/{enemy_id}.png` （标准头像，从立绘面部裁剪特写，约 128 × 128，PNG，透明或纯色）
   - `assets/portraits/{enemy_id}@2x.png` （高清头像，从立绘面部裁剪特写，约 256 × 256，PNG，透明或纯色）
3. **视觉风格与构图规范**：
   - **画风**：16-bit / 32-bit 日系现代 JRPG 像素对话立绘风格，清晰整洁的黑色外描边，柔和利落的赛璐璐层次阴影。
   - **构图**：**半身胸像到腰部构图（Half-body cut to waist）**，正面微侧（三分之四视角）。
   - **底色要求**：立绘必须使用纯粹的 **`#FF00FF` (纯品红)** 单色背景，便于引擎着色器或程序直接透明抠像。
   - **头像裁切**：头像以胸部以上到头顶面部为核心，表情鲜明传神。

---

## 二、第二幕敌人补充清单 (共 3 套)

### 1. 沈氏黑衣死士（普通杂兵）
- **角色 ID**：`shen_guard_default`
- **名称**：沈氏黑衣死士 / 黑衣暴徒
- **身份定位**：第二幕中大量反复出现的沈家底层打手，遍布博物馆、汽修厂后仓、码头、水闸、洋行货栈各处（第11、13、14、15、16、17、18章）。精英重装头目 `berserker_guard_heavy` 之外的普通喽啰，通常成群结队出现。
- **外观特征**：
  精瘦而凶悍的中青年男性，身穿紧身黑色夜行战术服或黑色西装，头戴黑色面罩或防毒面罩，只露出泛着幽绿毒光的双眼。手持金属短棍、甩刀或高压电棍，姿态阴鸷，一副亡命之徒的狠劲。
- **交付文件**：
  - `assets/art/shen_guard_default.png`
  - `assets/art/shen_guard_default@2x.png`
  - `assets/portraits/shen_guard_default.png`
  - `assets/portraits/shen_guard_default@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. A lean menacing Chinese gang enforcer in tight black tactical night suit, black face mask covering lower face, glowing toxic green eyes, holding a metal baton and a folding knife, sinister henchman of a drug cartel, anime sprite style with crisp black outlines, cel-shaded.
  ```

### 2. 异国武装水手（1839年历史敌人）
- **角色 ID**：`foreign_sailor_1839`
- **名称**：异国武装水手
- **身份定位**：第16章时空穿越至虎门销烟滩头时，勾结初代买办偷袭化烟池的西洋鸦片船武装水手。代表历史语境下外部势力对销烟壮举的武装挑衅。
- **外观特征**：
  19 世纪西洋鸦片帆船上的武装水手，络腮胡、皮肤黝黑，头扎红巾，身穿蓝白相间海魂衫，腰间别着弯刀，手持老式火绳枪，神情凶悍蛮横，透着一股殖民冒险家的粗野。
- **交付文件**：
  - `assets/art/foreign_sailor_1839.png`
  - `assets/art/foreign_sailor_1839@2x.png`
  - `assets/portraits/foreign_sailor_1839.png`
  - `assets/portraits/foreign_sailor_1839@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. A 19th-century Western armed sailor from an 1839 opium clipper ship. Dark tanned skin, thick beard, red bandana on head, navy blue and white striped sailor shirt, holding an old matchlock musket and a curved cutlass at his belt, aggressive brutish seafarer expression, Qing dynasty historical era, anime sprite style with crisp black outlines, cel-shaded.
  ```

### 3. 初代买办死士（1839年历史敌人）
- **角色 ID**：`comprador_assassin_1839`
- **名称**：初代买办死士
- **身份定位**：第16章穿越篇中，福寿堂前身的洋行大买办所豢养的本土死士，配合异国水手偷袭化烟池、企图夺回鸦片。代表「卖国求荣」的内部叛徒形象。
- **外观特征**：
  清末广东本土打手，头戴瓜皮帽，身穿暗色长袍马褂，腰间束布带，一手持短火铳、一手持淬毒匕首，面色阴狠，眼神透着一股见利忘义、甘为洋人鹰犬的冷漠。
- **交付文件**：
  - `assets/art/comprador_assassin_1839.png`
  - `assets/art/comprador_assassin_1839@2x.png`
  - `assets/portraits/comprador_assassin_1839.png`
  - `assets/portraits/comprador_assassin_1839@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. A late Qing dynasty Chinese comprador assassin from 1839. Wearing a black skullcap and dark mandarin jacket robe with cloth sash belt, holding a short matchlock pistol and a poisoned dagger, cold ruthless traitorous expression serving the opium trading house, Qing dynasty historical era, anime sprite style with crisp black outlines, cel-shaded.
  ```

---

## 三、复用说明（无需新出图）

以下第二幕战斗敌人可**直接复用第一幕已有立绘**，无需美术重新绘制：
- **狂暴保送生 / 重点班学生** → 复用 `senior_athlete_corrupted`
- **汽修厂打手混混** → 复用 `punk`
- **重装药人 / 生化狂战士（精英）** → 复用 `berserker_guard_heavy`
- **百年鸦片巨灵神（终极 BOSS）** → 复用 `boss_colossus_opium_god`
