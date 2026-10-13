# 第二幕全新角色立绘与头像美术需求文档

本需求文档专门针对游戏**第二幕（第11章至第20章）**中登场的全新关键角色（包括核心盟友、反派父子、历史英雄、特化敌人形态）的美术立绘与头像制作。请美术团队/AI作画按此标准与清单进行绘制及交付。

---

## 一、通用规格与交付标准

1. **文件存放目录**：
   - 角色立绘文件：存放在 `assets/art/`
   - 角色头像文件：存放在 `assets/portraits/`
2. **每套角色需产出的 4 个标准文件**：
   - `assets/art/{char_id}.png` （标准立绘，约 360 × 480，PNG，纯 `#FF00FF` 品红抠像背景）
   - `assets/art/{char_id}@2x.png` （高清立绘，约 720 × 960，PNG，纯 `#FF00FF` 品红抠像背景）
   - `assets/portraits/{char_id}.png` （标准头像，从立绘面部裁剪特写，约 128 × 128，PNG，透明或纯色）
   - `assets/portraits/{char_id}@2x.png` （高清头像，从立绘面部裁剪特写，约 256 × 256，PNG，透明或纯色）
3. **视觉风格与构图规范**：
   - **画风**：16-bit / 32-bit 日系现代 JRPG 像素对话立绘风格，清晰整洁的黑色外描边，柔和利落的赛璐璐层次阴影。
   - **构图**：**半身胸像到腰部构图（Half-body cut to waist）**，正面微侧（三分之四视角）。
   - **底色要求**：立绘必须使用纯粹的 **`#FF00FF` (纯品红)** 单色背景，便于引擎着色器或程序直接透明抠像。
   - **头像裁切**：头像以胸部以上到头顶面部为核心，表情鲜明传神。

---

## 二、第二幕核心角色立绘清单 (共 11 套核心角色资源)

### 1. 老爸海峰 · 江湖混混态（未揭秘前伪装地头蛇）
- **角色 ID**：`father_haifeng_default`
- **身份定位**：第11~12章亮明警察底牌前的伪装形象。为了潜伏进毒枭组织底层，故意装作城南贪财好酒、混迹黑道的老流氓修车行老板，与后续特警形象形成极致反差。
- **外观特征**：
  40岁出头的中年魁梧硬汉，留着寸头胡茬，脸颊有淡疤。**戴着一副黑超墨镜，脖子上挂着显眼的大金链子，赤膊袒胸，胸口与肩膀露出粗犷的猛虎/青龙花臂纹身，外面敞怀套着一件破旧起皱、沾着油渍的暗色老式西装外套**，嘴角叼着半截香烟，神情桀骜乖张、流里流气，完全是一副市井老混混、社会大哥的派头。
- **交付文件**：
  - `assets/art/father_haifeng_default.png`
  - `assets/art/father_haifeng_default@2x.png`
  - `assets/portraits/father_haifeng_default.png`
  - `assets/portraits/father_haifeng_default@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. A 40-year-old muscular Chinese man disguised as a street gangster boss. Short buzz cut hair, stubble beard, wearing dark sunglasses, a thick flashy gold chain necklace around neck, bare muscular chest with traditional dragon tattoos on shoulder and chest, wearing an open tattered vintage dark suit jacket, cigarette in mouth, unruly and roguish street thug expression, anime sprite style with crisp black outlines, cel-shaded.
  ```

---

### 2. 老爸海峰 · 特警正气态（亮明警督底牌后）
- **角色 ID**：`father_haifeng_police`
- **身份定位**：第12章结尾亮明省厅禁毒总队二级警督身份后，在第13~16章安全屋指挥、码头行动中的正式警察形象。脱去混混伪装，恢复一身凛然正气的铁血特警本色。
- **外观特征**：
  摘掉墨镜与金链子，五官刚毅堂堂正正，双目如炬、清澈威严，充满人民警察的浩然正气。**身穿整洁干练的深藏青色中国特警战术执勤服，外披黑色警用防刺战术背心，左胸佩戴醒目的银色警号牌与“特警 SWAT / 中国警察”字样臂章，肩扣通讯对讲机，胸前挂着二级警督警官证**，身姿挺拔如松，安全感与正义感拉满。
- **交付文件**：
  - `assets/art/father_haifeng_police.png`
  - `assets/art/father_haifeng_police@2x.png`
  - `assets/portraits/father_haifeng_police.png`
  - `assets/portraits/father_haifeng_police@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. Heroic 40-year-old Chinese SWAT police commander, same face as father_haifeng_default but without sunglasses. Short buzz cut hair, clean righteous and stern expression, piercing upright eyes. Wearing dark navy blue Chinese SWAT tactical uniform shirt and black police tactical vest with official police emblem badge on chest and shoulder radio, exuding overwhelming justice and reliability, pixel art.
  ```

---

### 3. 老爸海峰 · 特警浴血战损态（肉身挡刀与破晓归来）
- **角色 ID**：`father_haifeng_battle_damaged`
- **身份定位**：第12章突围挂彩、第17章身穿特警服肉身替孩子们挡下淬毒长钎、第19章大决战后缠着绷带奇迹归来的悲壮英雄形象。
- **外观特征**：
  **身穿深蓝色特警战术执勤服与防刺背心，但特警装甲前襟已被利器撕裂破损、浸透深红血迹**，胸前缠着渗血的白色急救绷带，一枚染血的国徽警徽与红色警官证露在胸口。额头与嘴角挂着血痕，脸色苍白却挂着无比释然、自豪而温暖的慈父笑容，眼神如护崽的雄狮般坚不可摧。
- **交付文件**：
  - `assets/art/father_haifeng_battle_damaged.png`
  - `assets/art/father_haifeng_battle_damaged@2x.png`
  - `assets/portraits/father_haifeng_battle_damaged.png`
  - `assets/portraits/father_haifeng_battle_damaged@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background. Battle-damaged heroic Chinese SWAT police officer. Wearing torn dark navy SWAT tactical vest stained with blood, white medical bandages wrapped around chest, a red Chinese police badge visible at chest, bleeding forehead and bruised face, yet smiling with an incredibly warm, fearless and proud fatherly expression, pixel art.
  ```

---

### 3. 神秘家长 · 沈崇礼（福寿堂第六代掌门）
- **角色 ID**：`shen_chongli_default`
- **身份定位**：第一幕家长会幕后黑手正式揭面，第二幕常驻核心恶役。表面是温文尔雅、赞助名校的教育基金会常务副会长，实则是百年毒枭家族当代首领。
- **外观特征**：
  45岁左右，梳着一丝不苟的偏分油头，戴一副金丝无边框眼镜，面容保养得极好，鹰钩鼻。身着剪裁极其考究的深墨绿色高定三件套西装，领口系暗金真丝领结。神情永远带着一种居高临下、自命精英阶层的虚伪假笑，眼神阴狠刻薄，藏不住骨子里的病态嗜虐与傲慢。
- **交付文件**：
  - `assets/art/shen_chongli_default.png`
  - `assets/art/shen_chongli_default@2x.png`
  - `assets/portraits/shen_chongli_default.png`
  - `assets/portraits/shen_chongli_default@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background. Sinister wealthy Chinese villain, 45 years old, sleek combed-back hair, elegant gold-rimmed glasses, eagle nose, wearing an immaculate dark emerald-green tailored three-piece suit with an antique pocket watch chain. Hypocritical condescending smirk, cold calculating psychopathic eyes, corrupt educational foundation chairman, pixel art.
  ```

---

### 4. 轮椅老太爷 · 沈万廷（二十年前恶魔始作俑者）
- **角色 ID**：`shen_wanting_old`
- **身份定位**：二十年前害惨阿瑶学姐与徐刘二师的罪魁祸首，沈崇礼的生父。已近八旬，形同枯槁，靠机械与毒液强行续命的幕后魔头。
- **外观特征**：
  干瘪枯瘦的老人，眼窝凹陷如骷髅，枯发稀疏。身穿深紫色前清花纹暗纹寿衣唐装，瘫坐在一具由齿轮、青铜排气管和输液吊瓶构成的生化轮椅上。鼻孔插着透明呼吸管，喉部有金属发音器，干枯的手掌如鸟爪般抓着铜烟杆，周身隐隐散发着黑烟死气。
- **交付文件**：
  - `assets/art/shen_wanting_old.png`
  - `assets/art/shen_wanting_old@2x.png`
  - `assets/portraits/shen_wanting_old.png`
  - `assets/portraits/shen_wanting_old@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background. Creepy 78-year-old skeletal Chinese patriarch villain, sunken hollow eyes, sparse grey hair, dressed in a dark purple Qing-style traditional brocade burial gown. Medical breathing tubes hooked to his nose, seated on a steampunk medical wheelchair with bubbling flasks, withered claw-like hands holding a long brass opium pipe, sinister aura, pixel art.
  ```

---

### 5. 虎门民团教头（1839年历史英雄义勇）
- **角色 ID**：`militia_instructor_1839`
- **身份定位**：第16章时空穿越至虎门销烟滩头结识的民族英雄。林则徐麾下沙角守卫团总教头，代表浩然正气与赤心传承。
- **外观特征**：
  30多岁的清末广东海防壮士。头扎红巾英雄结，皮肤呈健康赤铜色。身穿对襟深蓝粗布无袖短打武僧服，腰系宽红布带。手持一柄赤红沉香木化烟钎，眉如利剑，目如朗星，一身凛然不可侵犯的浩然正气与豪迈血性。
- **交付文件**：
  - `assets/art/militia_instructor_1839.png`
  - `assets/art/militia_instructor_1839@2x.png`
  - `assets/portraits/militia_instructor_1839.png`
  - `assets/portraits/militia_instructor_1839@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background. Brave Chinese militia martial arts master from 1839 Humen. Bronzed skin, determined heroic facial features, red cloth headband, wearing a traditional sleeveless indigo martial artist tunic with a scarlet sash. Holding an antique consecrated crimson wooden baton, passionate righteous warrior spirit, clean pixel lines.
  ```

---

### 6. 覃瑞怡 · 决绝受胁态（班长牺牲自赎）
- **角色 ID**：`qinruiyi_resolute`
- **身份定位**：第17~19章，覃瑞怡为了保全班级同学档案、拿回被扣资金独自去换人质，受尽折磨后归队反击的特化立绘。
- **外观特征**：
  在原有覃瑞怡外貌基础上。校服领口被扯破，额头贴着创可贴，眼眶泛红但不再哭泣软弱，眼神中展现出破釜沉舟的决绝与觉醒。发丝微乱，手里紧紧攥着记录敌人弱点的密码手帕。
- **交付文件**：
  - `assets/art/qinruiyi_resolute.png`
  - `assets/art/qinruiyi_resolute@2x.png`
  - `assets/portraits/qinruiyi_resolute.png`
  - `assets/portraits/qinruiyi_resolute@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background. High school female class monitor, short neat hair slightly disheveled with a bandage on her forehead, disheveled school uniform jacket, red rimmed eyes but filled with fierce remorse, unwavering courage and defiance, gripping a secret map, anime pixel art.
  ```

---

### 7. 沈氏生化重装狂战士（洋行精英护卫）
- **角色 ID**：`berserker_guard_heavy`
- **身份定位**：第18、19章货栈中庭防线的精英重装敌兵，大口吞服原浆药剂后的恐怖人形兵器。
- **外观特征**：
  身高过两米的人形巨汉，身着重型工业防暴装甲与防毒过滤面具。面具眼部透着血红凶光，双臂肌肉如岩石般暴胀，手臂上嵌装着重型气动圆锯与淬毒合金盾牌，背上背着咕嘟冒泡的生化储液罐。
- **交付文件**：
  - `assets/art/berserker_guard_heavy.png`
  - `assets/art/berserker_guard_heavy@2x.png`
  - `assets/portraits/berserker_guard_heavy.png`
  - `assets/portraits/berserker_guard_heavy@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background. Heavy biochemical shock-trooper juggernaut enemy. Massive hulking frame wearing armored industrial blast suit and a fearsome full-face gas mask with glowing crimson visor, hydraulic combat gauntlets and a toxic vat backpack with hoses, menacing heavy boss minion, pixel art.
  ```

---

### 8. 林则徐 · 钦差大臣（道光十九年 · 民族脊梁）
- **角色 ID**：`lin_zexu_imperial_commissioner`
- **身份定位**：第15章宫廷溯源、第16章时空穿越至虎门滩头的核心灵魂导师与民族英雄。受命于危难之际，力排众议督办两广海防与虎门销烟。
- **外观特征**：
  50余岁的清代重臣形象。头戴清代红顶花翎凉帽（文官一品顶戴），身穿绣有仙鹤补子的藏青色织锦官服朝袍，胸前垂挂深色沉香木朝珠。颌下留着修剪整齐的花白长须，面容端肃威严，目光如炬，透着忧国忧民的深邃沉郁与“苟利国家生死以”的钢铁意志。手中握着一柄御赐朱砂批红笔或卷起的销烟告示。
- **交付文件**：
  - `assets/art/lin_zexu_imperial_commissioner.png`
  - `assets/art/lin_zexu_imperial_commissioner@2x.png`
  - `assets/portraits/lin_zexu_imperial_commissioner.png`
  - `assets/portraits/lin_zexu_imperial_commissioner@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. Historical Chinese imperial commissioner Lin Zexu in 1839 Qing Dynasty. Dignified 50-year-old high official with neatly trimmed grey beard, wearing traditional navy-blue Qing official robe with crane rank insignia badge (Buzi) and mandarin court necklace, wearing an official conical summer hat with red coral finial and peacock feather. Stern, profoundly patriotic and uncompromising righteous gaze, holding an official imperial proclamation scroll, clean anime pixel art style, cel-shaded.
  ```

---

### 9. 道光皇帝 · 旻宁（养心殿御前 · 忧患深重）
- **角色 ID**：`emperor_daoguang_palace`
- **身份定位**：第15章时空画外音与御殿召见回忆中的大清君主。目睹白银外流与国民躯体残破，八次召见林则徐并赐予钦差关防，下定断绝祸患的最后决心。
- **外观特征**：
  50余岁的大清皇帝。身材消瘦，面容清癯憔悴，双颊微陷，眉宇间凝结着深重的帝国焦虑与忧患。头戴清帝金龙东珠朝冠或暖帽，身穿明黄色十二章刺绣金龙江崖海水龙袍，外罩玄色暗金龙纹马褂。眼神在威严之下透露出面对未有之变局的沉重与孤注一掷的决断。
- **交付文件**：
  - `assets/art/emperor_daoguang_palace.png`
  - `assets/art/emperor_daoguang_palace@2x.png`
  - `assets/portraits/emperor_daoguang_palace.png`
  - `assets/portraits/emperor_daoguang_palace@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, half-body cut to waist, three-quarters view, solid #FF00FF magenta background, no watermark. Qing Dynasty Emperor Daoguang in Forbidden City palace. Slender and gaunt 50-year-old monarch with solemn weathered facial features, wearing traditional imperial bright yellow dragon robe intricately embroidered with golden coiled dragons and ocean wave hem, topped with dark embroidered surcoat and royal pearl necklace. Anxious yet resolute authoritative gaze, carrying the immense weight of an empire, cinematic historical anime pixel art style, cel-shaded.
  ```

---

### 10. 百年鸦片巨灵神 · 机械生化魔躯（第20章大决战最终 BOSS）
- **角色 ID**：`boss_colossus_opium_god`
- **身份定位**：第二幕最终大决战关底 BOSS。百年鸦片原浆聚合体与蒸汽工业齿轮结合的终极怪物，沈万廷残躯嵌在巨灵胸口核心。
- **外观特征**：
  庞大狰狞的半机械半怨灵魔尊。由焦黑的龙骨钢铁齿轮架、翻滚蒸腾的漆黑毒雾、以及上百条青铜排气管扭曲缠绕而成。魔躯胸口是一颗散发着腐烂绿光的透明巨眼魔核，枯槁的沈万廷残影在核心中哀嚎咆哮，双臂化为带有毒刺倒钩的巨大铁锚巨拳。
- **交付文件**：
  - `assets/art/boss_colossus_opium_god.png`
  - `assets/art/boss_colossus_opium_god@2x.png`
  - `assets/portraits/boss_colossus_opium_god.png`
  - `assets/portraits/boss_colossus_opium_god@2x.png`
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG pixel art character portrait, massive final boss creature, half-body waist cut framing, three-quarters view, solid #FF00FF magenta background. A colossal bio-mechanical demon deity forged from a century of toxic opium miasma and gothic clockwork machinery. Black smokey ethereal body interwoven with corroded bronze gears and pipes, a glowing virulent green core on chest revealing a screaming skeletal visage, terrifying imposing JRPG final boss, pixel art.
  ```
