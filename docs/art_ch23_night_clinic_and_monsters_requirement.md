# 第二十三章夜晚场景与第三幕缺失敌人美术增补需求规范

> **需求背景**：
> 1. **场景日夜脱节**：第23章《夺舍真相》剧情明确设定在“深夜十点暴雨夜，特警与主角团折返崇文楼突袭心理咨询室”，但当前游戏画面复用了白天的心理咨询室背景图。需补充两张深夜场景：一张为**崇文楼三楼夜晚死寂走廊（门外）**，另一张为**进入室内后立有一人高脑波仪与杂乱电缆的深夜诊室**。
> 2. **战斗敌人缺席与缺图**：
>    - 第23章战斗《诊室时空阻滞战》（`ch23_battle1`）中，敌人“时空煞气寄生体”与“时空错乱傀儡”未在战前对话中正式亮相放话即突兀开战；
>    - 战斗单位头像缺失：`shadow_parasite@2x.png`（时空煞气寄生体）、`chronos_puppet@2x.png`（时空错乱傀儡）及第22章的 `sniper_dock@2x.png`（码头埋伏狙击手）均缺少美术出图。
> 3. 本文档为美术团队制定清晰的画风、规格、构图元素及生图 Prompt，美术完成后交付至指定路径即可无缝覆盖。

---

## 一、新增场景背景需求（2张）

### 1. 崇文楼夜晚幽蓝走廊（门外对质前夕）
- **资源名 / Key**：`bg_chongwen_corridor_night`
- **对应剧本场景**：`src/data/story_chapter23.js` -> `ch23_scene_counseling_breakin`（深夜十点 · 崇文楼心理咨询室门外）
- **核心时空与风格维度（重要：美术请严格核对）**：
  - **时代背景**：【现代现实】2006年中国普通初中校园教学楼（绝非未来赛博朋克，绝非古代历史）。
  - **昼夜时间**：【深夜黑夜 / 暴雨夜】约晚上 22:00，窗外暴雨狂风、雷电交加，走廊主灯全熄灭，仅门缝透出异常幽蓝电光。
  - **美术风格**：16-bit 像素复古 JRPG 风格（中写实比例，禁止Q版大头，与第一二幕统一）。
- **交付文件路径与规格**：
  - `assets/backgrounds/bg_chongwen_corridor_night.png`（标准版：960 × 540，16:9，PNG）
  - `assets/backgrounds/bg_chongwen_corridor_night@2x.png`（高清版：1920 × 1080，16:9，PNG）
- **视觉构图与氛围要求**：
  - **视角与场景**：夜晚暴雨中的崇文楼三楼走廊，窗外狂风暴雨、漆黑一片，雷电偶尔划过窗棂在水磨石地面上留下冷光。
  - **光影与色调**：以深蓝、墨灰与阴影为主色调，走廊没有开大灯，只有应急灯透出微弱惨淡的光芒。
  - **核心细节**：走廊深处的心理咨询室木门反锁紧闭，门底缝隙漏出不寻常的幽蓝色电光闪烁，门缝中隐隐升腾起一缕缕极淡的焦糊青烟，营造暴风雨前夕窒息的死寂与危险感。
  - **规范**：纯场景，无人物，底部 1/3 留白给 UI 对白框。
- **参考生成 Prompt（SDXL / Midjourney）**：
  ```text
  16-bit JRPG pixel art background, a dim Chinese middle school hallway at dark stormy night in 2006, heavy rain and lightning outside classroom windows casting cold blue highlights on wet terrazzo floor, pitch black shadows, at the end of corridor a wooden door is closed with mysterious blue electrical arcs and faint smoke leaking from the door seam, eerie suspense atmosphere, horror mystery vibe, no characters, no watermark, 16:9 aspect ratio.
  ```

---

### 2. 深夜心理咨询室 · 脑波仪与电缆交错（室内真相与决战）
- **资源名 / Key**：`bg_counseling_room_machine`
- **对应剧本场景**：`src/data/story_chapter23.js` -> `ch23_scene_ayao_revelation` 及破门后室内对质
- **核心时空与风格维度（重要：美术请严格核对）**：
  - **时代背景**：【现代现实中混入复古异质实验装置】2006年普通初中心理咨询室内部，但中央被改造成了粗暴拼凑的脑波共鸣仪（偏早期疯狂科学家/显像管示波器质感，带时代工业杂乱感，绝非光鲜整洁的未来高科技飞船）。
  - **昼夜时间**：【深夜黑夜 / 室内暗光】窗外是漆黑暴雨夜，室内不开顶灯，全靠仪器上的荧光绿示波屏和紫红警告灯映照。
  - **美术风格**：16-bit 像素复古 JRPG 风格（与第一二幕保持一致）。
- **交付文件路径与规格**：
  - `assets/backgrounds/bg_counseling_room_machine.png`（标准版：960 × 540，16:9，PNG）
  - `assets/backgrounds/bg_counseling_room_machine@2x.png`（高清版：1920 × 1080，16:9，PNG）
- **视觉构图与氛围要求**：
  - **视角与场景**：深夜破门后的心理咨询室全貌。原先温馨的心理茶室布局已被粗暴破坏，原本的书桌被推挤到房间墙角，地面上散乱堆放着掀开的病历档案与碎片。
  - **核心焦点道具**：**房间中央赫然矗立着一台一人多高的复杂仪器（早期脑波共鸣仪）**。金属机柜外壳剥开，露出杂乱繁复的红蓝电缆、真空电子管、示波器荧光绿屏幕，机体周围环绕着缠绕地面的粗黑电源线。
  - **光影与氛围**：窗外是漆黑雨夜，室内主要光源来自仪器面板上跳动的幽绿波形、闪烁的紫红警报灯，以及仪器核心缝隙中偶尔爆裂出的蓝白电火花。光影斑驳怪诞，充满疯狂科学实验与时空扭曲的悬疑压迫感。
  - **规范**：纯场景，无人物角色，底部 1/3 留白给 UI 对白框。
- **参考生成 Prompt（SDXL / Midjourney）**：
  ```text
  16-bit JRPG pixel art background, interior of a retro Chinese school psychology counseling room at stormy night in 2006, desks pushed to corners, room center dominated by a tall retro-futuristic mind machine apparatus standing over 2 meters high, glowing vacuum tubes, oscilloscope green screen displaying brain waves, chaotic tangle of cables on the floor, occasional blue sparks and eerie purple warning glow, dark storm outside rain-streaked window, ominous psychological thriller atmosphere, no characters, no text, 16:9 aspect ratio.
  ```

---

## 二、缺失敌人立绘与头像需求（3个单位，共6张切片）

### 1. 时空煞气寄生体（`shadow_parasite`）
- **所属章节**：第23章《诊室时空阻滞战》（`ch23_battle1`）
- **核心时空与身份定义**：
  - **时代与来源**：【时空乱流超自然怪物】古瓷罐残片煞气与失控脑波仪共鸣激发的能量幻影，虚无漂浮，不属于具体时代的人类。
  - **美术风格**：16-bit 像素风，暗黑悬疑超自然生物。
- **交付路径**：
  - `assets/portraits/shadow_parasite.png`（1x 头像：64 × 64 或 128 × 128，透底 PNG）
  - `assets/portraits/shadow_parasite@2x.png`（2x 头像：256 × 256，透底 PNG）
  - （可选立绘切片）`assets/art/shadow_parasite@2x.png`（剧情对话半身立绘，高约 512~768px）
- **形象外观描述**：
  - 由古瓷药罐残片与超载脑波仪能量交织激发的拟态虚影。
  - 没有具体的五官，面部呈深紫黑色翻滚的雾气旋涡，只有两道极度冰冷的苍白幽火充当眼睛。
  - 躯体如破烂的幽暗斗篷在半空漂浮聚散，周围环绕着滋滋作响的时空碎屑与暗紫电流，散发森然的压迫与死意。
- **参考 Prompt**：
  ```text
  Pixel art character bust portrait, dark ethereal void ghost monster, made of swirling purple-black smoke and temporal static glitch, no facial features except two piercing pale glowing eyes, surrounded by faint purple lightning sparks, menacing and mysterious, dark sci-fi horror, transparent background, clean edges.
  ```

---

### 2. 时空错乱傀儡（`chronos_puppet`）
- **所属章节**：第23章《诊室时空阻滞战》（`ch23_battle1`）
- **核心时空与身份定义**：
  - **时代与来源**：【现代受害宿主 / 提线木偶】2006年中学生或人偶被脑波仪与时空煞气神经覆写控制的异变体（保留2006年代普通初中校服或常服底色，但全身缠满发光杂乱电缆与时空电弧，并非赛博义体改造人）。
  - **美术风格**：16-bit 像素风，带有恐怖谷效应的失常傀儡。
- **交付路径**：
  - `assets/portraits/chronos_puppet.png`（1x 头像：64 × 64 或 128 × 128，透底 PNG）
  - `assets/portraits/chronos_puppet@2x.png`（2x 头像：256 × 256，透底 PNG）
  - （可选立绘切片）`assets/art/chronos_puppet@2x.png`（剧情对话半身立绘）
- **形象外观描述**：
  - 被失控时空乱流与脑波仪强行操控的虚幻投影人形（类似被精神覆写的学生/人偶）。
  - 动作僵硬不自然，头颅微偏，双眼翻白并闪烁微弱的幽蓝电子光芒。
  - 脖颈与手腕缠绕着发光的半透明数据电缆，双手握着带电弧的金属教具或测量仪器，宛如没有灵魂的提线发条玩偶。
- **参考 Prompt**：
  ```text
  Pixel art character bust portrait, corrupted human puppet controlled by temporal anomaly, mechanical twitching posture, blank white glowing eyes, faint cyan cybernetic circuits and cables tangled around neck and arms, retro 2006 school attire glitched by spacetime distortion, eerie uncanny valley expression, transparent background, clean edges.
  ```

---

### 3. 码头埋伏狙击手（`sniper_dock`）
- **所属章节**：第22章《九号码头突击战》（`ch22_battle1`）
- **核心时空与身份定义**：
  - **时代与身份**：【现代现实】2006年沿海走私码头地下雇佣兵（现实写实警匪风格，非未来科幻，手持复合短弩与夜视瞄具，身穿现代雨天战术冲锋衣）。
  - **美术风格**：16-bit 像素风，冷酷写实。
- **交付路径**：
  - `assets/portraits/sniper_dock.png`（1x 头像：64 × 64 或 128 × 128，透底 PNG）
  - `assets/portraits/sniper_dock@2x.png`（2x 头像：256 × 256，透底 PNG）
- **形象外观描述**：
  - 独眼蝰蛇手下的冷血雇佣兵。
  - 身穿墨绿色深色连帽防雨冲锋衣，面部遮有黑色战术防尘面罩，仅露出一双锐利阴鸷的鹰隼双眼。
  - 右肩架设带战术红外瞄准镜的紧凑型复合短弩，雨滴顺着兜帽帽檐不断滴落。
- **参考 Prompt**：
  ```text
  Pixel art character bust portrait, professional mercenary sniper at rainy harbor, wearing dark waterproof hooded jacket, black tactical face mask covering mouth and nose, sharp cold piercing eyes, holding a tactical mini crossbow with glowing red laser sight, gritty action thriller style, transparent background, clean edges.
  ```

---

## 三、技术一号位接入说明（无需美术关注）

1. **背景兼容降级**：
   - 剧本 `src/data/story_chapter23.js` 中已完成双背景挂载与 `bgImgFallback` 配置，若美术暂未交付，系统自动使用白天原版背景平稳运行，绝不中断白屏。
2. **头像平稳过渡**：
   - 当前在 `assets/portraits/` 中已挂载同画风高清近义图作为兜底占位，避免游戏报错 404；美术产出新图后直接覆盖对应文件即可生效。
