# 崇文楼三楼转角与教务处门外（第三幕美术增量补齐需求）

> **需求背景**：对应《六8班异闻录》第三幕第21章第2幕（`ch21_scene_dock_suspicion`）剧情。孩子们走出心理咨询室后，在崇文楼走廊转角停下，偷听半掩门的教务处内刘老师与徐老师关于海峰停职的激烈争吵。现有总表遗漏该转折场景，导致代码临时复用了心理咨询室室内图，需补充独立背景。

---

## 一、待补齐场景信息

- **资源名 / Key**：`bg_chongwen_corridor_office`
- **对应剧本场景**：`src/data/story_chapter21.js` -> `ch21_scene_dock_suspicion`（崇文楼三楼转角 · 争执与重压）
- **核心时空与风格维度（重要：美术请严格核对）**：
  - **时代背景**：【现代现实】2006年中国普通初中校园走廊（绝非未来赛博朋克，绝非古代历史）。
  - **昼夜时间**：【白天下午 / 室内微暗阴冷】走廊自然光昏暗，仅半掩的教务处门缝透出暖黄光束切在地面。
  - **美术风格**：16-bit 像素复古 JRPG 风格（中写实比例，禁止Q版，与第一二幕保持一致）。
- **交付路径与规格**：
  - `assets/backgrounds/bg_chongwen_corridor_office.png`（标准版：960 × 540，16:9，PNG）
  - `assets/backgrounds/bg_chongwen_corridor_office@2x.png`（高清版：1920 × 1080，16:9，PNG）

---

## 二、场景画面视觉描述与构图要求

1. **构图机位**：
   - 视角位于崇文楼三楼走廊拐角处的阴影边缘（具有第一人称偷听/窥视感）。
   - 走廊向画面深处延伸，尽头斜前方为半掩着木门的教务处/教师办公室。
2. **光影与氛围**：
   - 白天但光线微暗，走廊里透着旧式学校的阴冷；
   - 半掩的教务处门缝透出一束暖黄但刺眼的室内光线，斜切在走廊的水磨石地面上，营造压抑、矛盾激化与重压之下的争执感。
3. **细节要素**：
   - 墙面为两截式（上白石灰、下绿油漆墙裙），挂着学校黑板报栏与红旗评比栏；
   - 半掩门内隐约可见办公桌一角，桌上散乱摆放着教案、备课本以及散开的通报文件纸页；
   - 门缝外的走廊阴影处适宜安放学生们躲避视线的暗部。
4. **硬性规范**：
   - **画面纯场景，严禁包含任何人物角色或水印**；
   - 16:9 宽屏，画面底部 1/3 预留给 UI 对白框，关键视线聚焦点在画面中上方。

---

## 三、参考生图提示词（Prompt）

### 英文生成 Prompt（SDXL / Midjourney 适用）
```text
16-bit JRPG pixel art background, a corner of an old Chinese middle school corridor on the third floor in 2006, dim indoor lighting, retro terrazzo floor reflecting a beam of warm light through a half-open office door, green-painted lower wall wainscot, cork bulletin board on the wall, glimpse of a messy teacher's desk inside the half-open door with scattered papers, eavesdropping perspective from hallway shadow, tense and suspenseful atmosphere, no characters, no text, no watermark, 16:9 aspect ratio.
```

---

## 四、美术交付后技术接入说明

1. 资源存入：`assets/backgrounds/bg_chongwen_corridor_office@2x.png` 及 1x 版本。
2. 同步拷贝至：`dist/assets/backgrounds/`（Web 运行时环境）。
3. 剧本代码 `src/data/story_chapter21.js` 已完成场景绑定：
   ```javascript
   ch21_scene_dock_suspicion: {
     id: 'ch21_scene_dock_suspicion',
     title: '崇文楼三楼转角 · 争执与重压',
     bgType: 'corridor',
     bgImg: 'assets/backgrounds/bg_chongwen_corridor_office@2x.png',
     bgImgFallback: 'assets/backgrounds/bg_counseling_room@2x.png',
     ...
   }
   ```
