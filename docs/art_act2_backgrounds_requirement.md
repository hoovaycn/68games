# 第二幕全新场景背景图美术需求文档

本需求文档专门针对游戏**第二幕（第11章至第20章）**所需新绘制的场景背景图。请美术团队/AI作画按此标准与清单进行绘制及交付。

---

## 一、通用规格与交付标准

1. **文件存放目录**：
   - 所有场景背景图统一存放在项目工程目录：`assets/backgrounds/`
2. **分辨率与命名规范**（每个场景产出 2 个尺寸规格）：
   - **标准版 (1x)**：`xxx.png`，分辨率建议 **960 × 540**（16:9 像素化/赛璐璐风格清晰展示）
   - **高清版 (2x)**：`xxx@2x.png`，分辨率建议 **1920 × 1080**
3. **视觉风格与构图规范**：
   - **画风**：16-bit / 32-bit 日系现代 JRPG 像素复古与赛璐璐厚涂质感相结合的舞台场景风，带电影感镜头光影与细腻氛围。
   - **视角**：横版舞台式主视角（微俯视或平视，为底部半透明对话框与前景左右立绘留出合理展示层次）。
   - **背景底色**：**禁止使用 `FF00FF` 抠像背景**，必须是完整的场景全景图（包含完整的天空、地面、建筑物与环境光）。
   - **文本与水印**：画面中**绝对禁止**出现任何现代中英文字样、UI边框、商业水印或杂乱字迹。

---

## 二、第二幕场景背景图详细清单 (共 12 处场景)

### 1. 省历史博物馆正门特展广场
- **资源名/Key**：`bg_museum_square`
- **对应章节**：第11章《省博惊魂》
- **存放路径**：
  - `assets/backgrounds/bg_museum_square.png`
  - `assets/backgrounds/bg_museum_square@2x.png`
- **场景描述**：
  盛夏正午，省历史博物馆恢弘正门前。高大庄严的石阶、大理石罗马柱与现代玻璃幕墙相映。大门外立着一块巨大的特展海报展架，上书古风云纹与青铜瓷器剪影（海报内容：南海沉船出水文物特展）。烈日当空，地面有强烈的阳光反光，大门玻璃内隐隐透着丝丝冷气。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, exterior of a grand provincial history museum, scorching summer noon, imposing stone staircase and modern glass facade, giant exhibition billboard outside displaying ancient shipwreck relics, bright sunny lighting with crisp shadows, clean anime pixel art style, no characters, no text, no watermark, 16:9 widescreen.
  ```

---

### 2. 省博地下文物修复特展厅（警报状态）
- **资源名/Key**：`bg_museum_exhibition`
- **对应章节**：第11章《省博惊魂》
- **存放路径**：
  - `assets/backgrounds/bg_museum_exhibition.png`
  - `assets/backgrounds/bg_museum_exhibition@2x.png`
- **场景描述**：
  博物馆负一层高规格恒温恒湿特展库房。中央一座钢化玻璃展柜被暴力砸碎，玻璃碎片散落一地。冷白色的射灯与闪烁的红色防盗应急警报灯交织。周围摆放着古陶瓷修复工作台、精密仪器与木质防护栏。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, indoor antique exhibition hall in museum basement, shattered tempered glass display case in center, red flashing emergency alarm lights mixed with cold spotlight beams, scientific restoration tables and broken stands, dramatic suspenseful lighting, clean anime pixel art style, no characters, no text, no watermark, 16:9 widescreen.
  ```

---

### 3. 城南汽修街 · 海峰汽修厂外观
- **资源名/Key**：`bg_garage_exterior`
- **对应章节**：第12章《烂人老爸》
- **存放路径**：
  - `assets/backgrounds/bg_garage_exterior.png`
  - `assets/backgrounds/bg_garage_exterior@2x.png`
- **场景描述**：
  城市老旧城中村边缘的修车街。街道狭窄杂乱，路面残留着机油污渍与积水洼。海峰汽修厂门头是一扇生锈卷帘门，旁边搭着褪色帆布雨棚。门口堆叠着废旧轮胎、破旧电瓶、机油铁桶和一辆掀开引擎盖的旧皮卡车，充满市井混混地痞盘踞的气息。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, dingy auto repair shop in urban fringe alley, rusty roller shutter door with faded canvas canopy, stacks of old tires, greasy motor oil barrels, worn tools and a battered pickup truck, gritty realistic anime pixel art style, daytime, gloomy weathered atmosphere, no characters, no text, no watermark, 16:9 widescreen.
  ```

---

### 4. 汽修厂后仓集装箱堆场（雷暴雨夜）
- **资源名/Key**：`bg_garage_backyard_rain`
- **对应章节**：第13章《暗夜合围》
- **存放路径**：
  - `assets/backgrounds/bg_garage_backyard_rain.png`
  - `assets/backgrounds/bg_garage_backyard_rain@2x.png`
- **场景描述**：
  狂风暴雨中的汽修厂后院废弃集装箱堆场。瓢泼大雨倾盆而下，闪电划破乌云密布的夜空。几个锈蚀的工业集装箱错落堆放，中间一个鲜红色的改装冷藏集装箱正亮着幽蓝指示灯，排风扇正呼呼向外喷出诡异的甜腻白烟。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, industrial scrapyard behind auto shop at midnight, torrential rainstorm with lightning flashes, stacked rusty shipping containers, a suspicious red refrigerated container emitting eerie glowing blue vapor from exhaust fan, dark dramatic puddles reflecting lightning, anime pixel art, no characters, no text, 16:9.
  ```

---

### 5. 城北防空洞秘密特勤安全屋
- **资源名/Key**：`bg_safahouse_shelter`
- **对应章节**：第14章《百年老账》、第17章《破碎的奖状》
- **存放路径**：
  - `assets/backgrounds/bg_safahouse_shelter.png`
  - `assets/backgrounds/bg_safahouse_shelter@2x.png`
- **场景描述**：
  隐匿在旧地下防空洞内部的省公安厅秘密据点。坚固斑驳的混凝土拱形墙面，头顶吊着一盏摇晃的暖黄色裸露白炽灯。整面墙壁上贴满了发黄的旧报纸、黑白档案通缉照片和交错复杂的红色连线网。桌上摆着军绿色铁皮电台、无线电耳机和摊开的泛黄卷宗。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, clandestine safehouse inside a vintage underground air raid shelter, rough concrete arched walls covered with detective investigation corkboard, black and white evidence photos connected by red strings, single hanging bulb illuminating steel military desk with vintage radio transmitter, no characters, no text, 16:9.
  ```

---

### 6. 古运河三号废弃老码头（暴雨狂潮）
- **资源名/Key**：`bg_canal_dock_storm`
- **对应章节**：第14章《百年老账》
- **存放路径**：
  - `assets/backgrounds/bg_canal_dock_storm.png`
  - `assets/backgrounds/bg_canal_dock_storm@2x.png`
- **场景描述**：
  暴风雨夜下的古运河荒废码头。波涛翻滚的江水拍打着长满青苔的石砌岸堤，江面上一片漆黑。码头闸口拉着警戒铁丝网，岸边立着几盏昏黄防爆探照灯。远处泊位上系着一艘庞大黑沉的旧工业铁壳驳船。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, abandoned ancient canal cargo dock during nighttime hurricane, turbulent murky river waves crashing against mossy stone quay, heavy rain and wind, yellow security floodlights piercing the darkness, silhouette of a massive dark industrial barge moored in distance, no characters, no text, 16:9.
  ```

---

### 7. 运河铁壳驳船甲板祭坛
- **资源名/Key**：`bg_barge_altar`
- **对应章节**：第15章《海魂回响》
- **存放路径**：
  - `assets/backgrounds/bg_barge_altar.png`
  - `assets/backgrounds/bg_barge_altar@2x.png`
- **场景描述**：
  晃动颠簸的巨型驳船甲板。甲板正中央立着一座两人高的青铜鬼面古香炉，炉膛中燃烧着诡异的幽蓝色毒火，黑烟缭绕。炉火上方由四根粗铁链悬吊着被撬开的道光年间青花瓷罐，周围画着邪门法阵与祭台。夜空乌云剧烈旋转，带有超现实漩涡异象。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, open deck of a rust-eaten cargo barge on stormy river, an ominous tall bronze demon-faced incense cauldron in center burning with ethereal blue flames, swirling black toxic fumes, ancient porcelain jar suspended by chains above the altar, swirling supernatural cloud vortex in dark sky, no characters, no text, 16:9.
  ```

---

### 8. 道光十九年 · 广东虎门沙角海滩（时空穿越）
- **资源名/Key**：`bg_humen_beach_1839`
- **对应章节**：第16章《浩然正气》
- **存放路径**：
  - `assets/backgrounds/bg_humen_beach_1839.png`
  - `assets/backgrounds/bg_humen_beach_1839@2x.png`
- **场景描述**：
  1839年夏季的历史名场面。开阔浩瀚的珠江口沙角海滩，炽烈的日光照耀在碧蓝波涛上。海滩中央开凿了两个巨大的方形“化烟池”，生石灰遇水沸腾，滚滚纯白浓烟冲上蓝天。池畔立着书写“钦差大臣”的迎风帅旗。远方海面上停泊着数艘高耸的英国三桅帆船战舰。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, historic 1839 Humen beach during the destruction of opium, wide sandy seashore under intense tropical summer sun, massive square earthen pits boiling with white lime vapor rising into blue sky, Qing dynasty imperial banner fluttering, 19th-century British three-masted tall ships anchored in distant sea, epic historical anime style, no characters, no text, 16:9.
  ```

---

### 9. 江心旧水闸废料场
- **资源名/Key**：`bg_watergate_ruins`
- **对应章节**：第17章《破碎的奖状》
- **存放路径**：
  - `assets/backgrounds/bg_watergate_ruins.png`
  - `assets/backgrounds/bg_watergate_ruins@2x.png`
- **场景描述**：
  江心孤岛上的巨型防洪泄洪旧水闸。高耸锈蚀的水闸铁栅栏在雨夜中宛如巨兽肋骨，地面堆满报废钢筋水泥管与碎石瓦砾。暴雨倾盆，闸口下是湍急奔涌的浑浊泄洪瀑布，四周被两道冰冷惨白的强光探照灯来回巡视。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, abandoned river sluice gate and industrial scrapyard on an isolated islet, massive rusted iron water gates towering under stormy night rain, piles of concrete rubble and scrap metal, roaring waterfall beneath the spillway, harsh searchlights cutting through pouring rain, atmospheric suspense, no characters, no text, 16:9.
  ```

---

### 10. 洋行货栈地下毒池祭坛
- **资源名/Key**：`bg_warehouse_poison_altar`
- **对应章节**：第18章《孤注一掷》
- **存放路径**：
  - `assets/backgrounds/bg_warehouse_poison_altar.png`
  - `assets/backgrounds/bg_warehouse_poison_altar@2x.png`
- **场景描述**：
  欧式洋行货栈地下数十米深处的石窟魔窟。巨型青铜药池中咕嘟咕嘟翻滚着墨绿色的生化毒浆，石窟四周刻满了毒蝠图腾。几根粗大的青石柱上垂着沉重的铁锁链。右侧是一座摇摇欲坠的石桥，桥下连通着黑暗湍急的地下暗河激流。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, subterranean evil altar cavern beneath an old colonial warehouse, giant bronze vat boiling with glowing dark green poisonous liquid, ominous stone pillars wrapped with heavy iron chains, crumbling stone bridge over a roaring pitch-black underground subterranean river, eerie green ambient glow, no characters, no text, 16:9.
  ```

---

### 11. 洋行货栈挑空中庭大堂
- **资源名/Key**：`bg_warehouse_grand_hall`
- **对应章节**：第19章《逆行攻坚》
- **存放路径**：
  - `assets/backgrounds/bg_warehouse_grand_hall.png`
  - `assets/backgrounds/bg_warehouse_grand_hall@2x.png`
- **场景描述**：
  二十世纪初哥特复兴风格的巨型洋行货栈挑空中庭。层高四层楼高的开阔大厅，粗大红砖柱、挑空铸铁栏杆、直通穹顶的黑色旋转铸铁楼梯。大门后方降下了厚重的液压防暴铁闸，大厅各处架设着高压电弧防御装置与铁丝网工事。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, grand gothic atrium interior of a century-old European-style mercantile warehouse, four-story tall ceiling with red brick arches, spiral cast-iron staircase leading up, heavy hydraulic blast doors sealed shut, electrified barricades with blue spark arcs, dramatic battle-ready atmosphere, no characters, no text, 16:9.
  ```

---

### 12. 货栈顶层钟楼大厅 / 破晓天台（大决战与终章）
- **资源名/Key**：`bg_clocktower_summit`
- **对应章节**：第19/20章《破晓钟声》
- **存放路径**：
  - `assets/backgrounds/bg_clocktower_summit.png`
  - `assets/backgrounds/bg_clocktower_summit@2x.png`
- **场景描述**：
  货栈顶端四面通风的露天巨型钟楼内部。中央是高大的百年机械铜钟与复杂咬合的咬齿齿轮组。外侧是破碎的彩色玻璃窗与观景天台。远方夜空正由最深沉的漆黑暴雨，逐渐撕裂出一抹耀眼辉煌的金色金色晨曦破晓，雨过天晴，光芒万丈。
- **参考提示词 (Prompt)**：
  ```text
  16-bit JRPG visual novel background, top-floor clocktower chamber of old gothic warehouse, massive brass mechanical clock gears and pendulum in center, shattered stained-glass arches opening to scenic skyline, dramatic transition from dark storm clouds to radiant golden dawn sunlight bursting through, triumphant cinematic feel, no characters, no text, 16:9.
  ```
