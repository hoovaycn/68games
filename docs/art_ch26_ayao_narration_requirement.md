# 第二十六章 阿瑶自述回忆 美术需求

> **需求背景**：`src/data/story_chapter26.js` 的 `ch26_scene_ayao_chamber`（s2）原方案是"白发阿瑶一言不发，突然弹出全息投影"，叙事割裂、玩家看不懂。
>
> **重构方向**：改为**阿瑶在维生舱里微弱开口、以第一人称自述**，把她的悲剧按时间线串起来——**2006 年服毒背叛（四十年前）→ 2026 年用机器净化（二十年前）→ 2046 年困在机器（现在）**，逐段切入对应回忆画面。
>
> **时间线铁律（防止玩家看混）**：现在是 2046 年。2006 年（阿瑶服毒）是**四十年前**；2026 年（苏晚用脑波仪）是**二十年前**。所有回忆段背景一律做成**黑白做旧**，立绘由前端代码统一做黑白处理，与 2046 年的彩色"现在"彻底区分开。

---

## 一、新出背景图（2 张，全部黑白做旧）

> 注意：这段**整个都是回忆**，2006 和 2026 都不复用彩色背景，必须重新出成黑白做旧版。

### 1. 2006 年地下水闸地下室 —— `bg_sluice_basement_2006`

| 资源名 / Key | 交付路径 | 规格 |
| --- | --- | --- |
| `bg_sluice_basement_2006` | `assets/backgrounds/bg_sluice_basement_2006@2x.png` | 1920×1080，PNG，16:9 |
| `bg_sluice_basement_2006` | `assets/backgrounds/bg_sluice_basement_2006.png` | 960×540，PNG，16:9 |

**画面**：2006 年昏暗潮湿的地下水闸地下室。生锈的半开铁门，混凝土墙壁渗着水，地面有一滩暗色血污，一盏昏黄的旧灯摇摇欲坠，气氛阴冷、压抑、绝望。**不画人物、不露正脸**（人物由立绘叠加），主体留出中上部。

```text
Pixel art background, 2006 dim damp underground sluice basement, rusty half-open iron gate, concrete walls seeping water, dark bloodstain pool on the floor, a single flickering dim lamp, cold oppressive despairing atmosphere, monochrome black-and-white old photograph style, film grain, vignette, faded scratched nostalgic memory, 16-bit retro JRPG background, no people no text no watermark.
```

### 2. 2026 年心理咨询室脑波仪（黑白做旧版） —— `bg_counseling_machine_flashback`

| 资源名 / Key | 交付路径 | 规格 |
| --- | --- | --- |
| `bg_counseling_machine_flashback` | `assets/backgrounds/bg_counseling_machine_flashback@2x.png` | 1920×1080，PNG，16:9 |
| `bg_counseling_machine_flashback` | `assets/backgrounds/bg_counseling_machine_flashback.png` | 960×540，PNG，16:9 |

**画面**：以现有彩色 `bg_counseling_room_machine@2x.png` 为构图参考（心理咨询室正中立着一台一人多高的脑波仪、缠绕电缆、指示灯亮起），但**整体做成黑白做旧**，去掉彩色。冷灰调、颗粒噪点、暗角，营造"二十年前被回忆的冰冷过去"感。**不画人物、不露正脸**，主体放中上部。

```text
Pixel art background, 2026 psychological counseling room with a tall brainwave machine standing in the center, cables and blinking indicator lights, desk pushed aside, monochrome black-and-white old photograph style, film grain, vignette, faded scratched nostalgic memory, cold grey tone, 16-bit retro JRPG background, no people no text no watermark.
```

---

## 二、复用背景图（仅 2046 年"现在"，保持彩色）

| 时间点 | 画面 | 复用资源 |
| --- | --- | --- |
| 2046 年（困在机器·现在） | 维生舱里的白发阿瑶 | `bg_ayao_stasis_chamber@2x.png`（彩色，不做黑白） |

---

## 三、立绘映射（前端黑白处理 + 沈万廷按年代换图）

**立绘黑白已由前端实现**：`dialogue_system.js` 已支持 `flashback: true` 行级标记——回忆段对白加上该标记后，左右立绘会自动套用 `grayscale(100%) sepia(18%)` 做旧滤镜，非当前说话方再降暗。**立绘本体无需美术另出黑白版**。

| 角色 | 2006 年（四十年前） | 2026 年（二十年前） |
| --- | --- | --- |
| 沈万廷 | `mystery_man_default@2x.png`（神秘/较年轻） | `shen_wanting_old@2x.png`（老年） |

> **修正说明**：原记忆投影里 2006 年的沈万廷误用了老年图 `shen_wanting_old`，需改为 `mystery_man_default`（2006 年他还未以"沈万廷"真容示人，是阿瑶记忆中的"沈老板/神秘人"）。

其余立绘复用（已存在，无需新出，靠 `flashback` 前端滤镜变黑白）：

| 角色 | 立绘资源 |
| --- | --- |
| 少年阿瑶（2006） | `ayao_default@2x.png` |
| 徐老师（2006） | `teacher_xu_default@2x.png` |
| 青年刘老师（2006） | `young_liu_default@2x.png` |
| 成年阿瑶 / 苏晚（2026） | `ayao_adult_default@2x.png` |
| 白发阿瑶（2046·现在） | `ayao_aged_2046_default@2x.png` / `ayao_aged_2046_weeping@2x.png` |

---

## 四、复用 CG（催泪高潮）

服毒后少年阿瑶瘫倒血泊、死死抓着老师遗落半截粉笔的那一刻，复用现有 CG：

- `assets/art/cg_ayao_broken_pen@2x.png`（阿瑶断笔）

---

## 五、情感基调要求（给美术与配乐统一参考）

- 整段突出阿瑶**从始至终的痛苦、悲情、悲剧**：2006 年被迫服毒的绝望 → 2026 年扭曲执念的偏执 → 2046 年油尽灯枯的解脱。
- 配乐：s2（维生舱）已用 `bgm_broken`（悲怆）；三段回忆切换时保持同一悲怆基调，不要突然转激昂。
- 画面情绪递进：水闸地下室（压抑绝望·黑白）→ 心理咨询室机器（冰冷诡异·黑白）→ 维生舱（苍凉解脱·彩色"现在"）。
