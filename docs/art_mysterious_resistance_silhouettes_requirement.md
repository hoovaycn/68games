# 第二十四章与第二十五章神秘人黑影立绘增补美术需求规范

> **需求背景**：
> 1. **前置登场立绘缺失**：在第24章《钢铁废墟》（`ch24_scene_abyss_cornered`）绝境救场及第25章《时空重逢》（`ch25_scene_shelter_arrival`）防空洞避难剧情中，神秘首领（成年主角）与神秘女子（成年副官）登场。此前为避免提前剧透，对话暂未配置立绘，导致长段剧情演出缺少角色视觉形象支撑。
> 2. **黑影剪影设计意图**：为了在**既保留极强神秘感、绝对不提前剧透成年身份**的前提下，让玩家清晰感知到“有两位身手老练、气质坚毅的黑斗篷反抗军救星同框现身”，需要美术专门绘制2张**暗调兜帽黑影剪影风格的半身立绘**。
> 3. 本文档明确时空归属、昼夜光影、美术规格及中英文生图 Prompt，美术完成后交付至指定路径即可生效。

---

## 一、新增黑影立绘需求（2张切片）

### 1. 战术斗篷黑影神秘人（反抗军神秘首领）
- **资源名 / Key**：`shadow_cloaked_leader`
- **对应剧本场景**：
  - `src/data/story_chapter24.js` -> `ch24_scene_abyss_cornered`（高架桥狙击破袭救场）
  - `src/data/story_chapter25.js` -> `ch25_scene_shelter_arrival`（防空洞地下避难前夕）
- **对应交付路径**：
  - `assets/art/shadow_cloaked_leader@2x.png`（高清剧情半身立绘：宽约 400~512px，高约 768~960px，透底 PNG）
- **核心时空与风格维度（重要：美术请严格核对）**：
  - **时代背景**：【未来科技废墟】2046年荒芜冰冷的未来末世城市与地下防空洞反抗军首领。
  - **昼夜时间**：【冷雨阴云 / 地下防空洞暗光】全身被深黑厚重的破损战术雨披斗篷笼罩。
  - **美术风格**：16-bit 像素复古 JRPG 风格（写实身材比例，禁止Q版，与全游统一）。
- **形象外观与神秘感呈现要求**：
  - **剪影为主、轮廓微露**：深色兜帽压得很低，大半张脸完全隐匿在浓重阴影中，**严禁露出清晰的五官，绝对禁止被玩家一眼认出是成年主角**。
  - **高光细节**：仅在兜帽阴影中隐约透出一道极其冷峻锐利的鹰隼目光（淡青灰或冷白微光），右侧露出一点饱经沧桑坚毅的下颌线条与高领战术护颈。
  - **服装与姿态**：身披边缘磨损撕裂的厚重战术黑斗篷，单手在斗篷下隐约斜握着一把大口径反器材狙击步枪枪管（枪口隐隐带有冷蓝散热微光）。身材挺拔沉稳，散发历经二十年残酷战火的冷酷特工气场。
- **参考生成 Prompt（SDXL / Midjourney）**：
  ```text
  Pixel art character bust portrait, mysterious sci-fi resistance leader shrouded in a heavy ragged dark tactical cloak and deep hooded cowl, face heavily concealed in pitch black shadows with only a glimpse of intense sharp cold glowing eyes, silhouette figure, worn weathered combat gear underneath, holding sniper rifle barrel, mysterious dark hero, 16-bit JRPG style, dramatic rim lighting, transparent background, clean edges, no watermark.
  ```

---

### 2. 阴影战术风衣神秘女子（反抗军神秘女副官）
- **资源名 / Key**：`shadow_cloaked_agent`
- **对应剧本场景**：
  - `src/data/story_chapter25.js` -> `ch25_scene_shelter_arrival`（防空洞操作台阴影中抱臂对话）
- **对应交付路径**：
  - `assets/art/shadow_cloaked_agent@2x.png`（高清剧情半身立绘：宽约 400~512px，高约 768~960px，透底 PNG）
- **核心时空与风格维度（重要：美术请严格核对）**：
  - **时代背景**：【未来科技废墟】2046年废弃防空洞内沉稳冷静的地下女特工。
  - **昼夜时间**：【地下掩体昏黄微光】倚靠在仪器控制台旁的深黑阴影中。
  - **美术风格**：16-bit 像素复古 JRPG 风格（写实比例，禁止日系二次元萌系大头）。
- **形象外观与神秘感呈现要求**：
  - **剪影为主、轮廓微露**：短发利落束在脑后，侧身抱臂而立，面庞大半沉在防空洞仪器的阴影之中，**绝对不露出具体五官**。
  - **服装与细节**：身穿洗得发白、边缘破旧但异常利落的深色战术翻领夹克（暗扣与领口隐约有旧式制服痕迹），战术腰带挂着两枚电磁脉冲手雷。
  - **姿态与神韵**：姿态从容警觉，双臂环抱胸前，虽然看不清面容，但隐隐流露出对少年们深入骨髓的熟稔与保护欲。
- **参考生成 Prompt（SDXL / Midjourney）**：
  ```text
  Pixel art character bust portrait, mysterious female resistance fighter standing in shadows, dark tactical worn field jacket with high collar, short sleek hair silhouette, face obscured in moody atmospheric darkness with subtle warm rim light on jawline and collar, arms crossed posture, calm confident posture, tactical belt with EMP pouches, 16-bit retro JRPG character portrait, transparent background, clean edges.
  ```

---

## 二、程序接入与临时降级兜底

- 脚本已在 `src/data/story_chapter24.js` 与 `src/data/story_chapter25.js` 中完成资源点位预留；
- 若美术正式图尚未落盘，程序层支持自动平滑回退，保障不阻断测试与实机运行。
