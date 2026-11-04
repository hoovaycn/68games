# 《六8班异闻录》第一二幕核心角色立绘多表情升级与生图需求说明书

> **文档定位**：供美术 Agent / AI 绘画团队阅读执行。指导第一幕、第二幕主要登场角色的立绘表情差分制作规范、垫图图生图工作流、提示词模板及精准文件命名规范。
> **目标效果**：使第一幕、第二幕的角色像第三幕一样具备生动的剧情表情切换能力（如震惊、悲伤、坚定、微笑、黑化等），并在保持人物脸型、发型、服装严格一致的前提下批量出图。

---

## 一、必须严格执行的文件命名与交付清单（核心重点）

为避免命名不符合程序规范导致代码找不到资源，**美术 Agent 必须 100% 按照以下预定文件名输出**，严禁自行修改拼写或使用中文命名！

### 1. 命名公式
```text
标准版(1x)： assets/art/{角色ID}_{表情英文名}.png
高清版(2x)： assets/art/{角色ID}_{表情英文名}@2x.png
```
> **注意**：每个表情**必须同时产出 1x 与 @2x 两个文件**，存放目录必须是 `assets/art/`（严禁保存到 `assets/portraits/`）。

### 2. 全量输出文件名对照一览表（直接照抄命名）

| 序号 | 角色名称 | 角色ID (`actor_id`) | 目标表情 (`state`) | 交付文件名 1（1x标准版） | 交付文件名 2（2x高清版） |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **张子骁** (男主) | `zhangzixiao` | `resolute` (坚毅) | `zhangzixiao_resolute.png` | `zhangzixiao_resolute@2x.png` |
| 2 | 张子骁 (男主) | `zhangzixiao` | `shock` (震惊) | `zhangzixiao_shock.png` | `zhangzixiao_shock@2x.png` |
| 3 | 张子骁 (男主) | `zhangzixiao` | `sad` (悲伤) | `zhangzixiao_sad.png` | `zhangzixiao_sad@2x.png` |
| 4 | 张子骁 (男主) | `zhangzixiao` | `smile` (自信微笑) | `zhangzixiao_smile.png` | `zhangzixiao_smile@2x.png` |
| 5 | **石予诺** (女主) | `shiyunuo` | `thinking` (沉思推理) | `shiyunuo_thinking.png` | `shiyunuo_thinking@2x.png` |
| 6 | 石予诺 (女主) | `shiyunuo` | `shock` (震惊错愕) | `shiyunuo_shock.png` | `shiyunuo_shock@2x.png` |
| 7 | 石予诺 (女主) | `shiyunuo` | `resolute` (果敢威严) | `shiyunuo_resolute.png` | `shiyunuo_resolute@2x.png` |
| 8 | 石予诺 (女主) | `shiyunuo` | `tearful` (动容落泪) | `shiyunuo_tearful.png` | `shiyunuo_tearful@2x.png` |
| 9 | **范文默** (死党) | `fanwenmo` | `fury` (暴怒护短) | `fanwenmo_fury.png` | `fanwenmo_fury@2x.png` |
| 10 | 范文默 (死党) | `fanwenmo` | `panic` (慌乱冷汗) | `fanwenmo_panic.png` | `fanwenmo_panic@2x.png` |
| 11 | 范文默 (死党) | `fanwenmo` | `crying` (痛哭找父亲) | `fanwenmo_crying.png` | `fanwenmo_crying@2x.png` |
| 12 | **何妍熹** (敏锐) | `heyanxi` | `resolute` (蓄势瞄准) | `heyanxi_resolute.png` | `heyanxi_resolute@2x.png` |
| 13 | 何妍熹 (敏锐) | `heyanxi` | `shock` (惊惧警惕) | `heyanxi_shock.png` | `heyanxi_shock@2x.png` |
| 14 | 何妍熹 (敏锐) | `heyanxi` | `gentle` (温柔安慰) | `heyanxi_gentle.png` | `heyanxi_gentle@2x.png` |
| 15 | **覃瑞怡** (文委) | `qinruiyi` | `crying` (害怕大哭) | `qinruiyi_crying.png` | `qinruiyi_crying@2x.png` |
| 16 | 覃瑞怡 (文委) | `qinruiyi` | `relieved` (破涕为笑) | `qinruiyi_relieved.png` | `qinruiyi_relieved@2x.png` |
| 17 | **张希哲** (机灵) | `zhangxizhe` | `smirk` (得意狡黠) | `zhangxizhe_smirk.png` | `zhangxizhe_smirk@2x.png` |
| 18 | 张希哲 (机灵) | `zhangxizhe` | `nervous` (心虚冷汗) | `zhangxizhe_nervous.png` | `zhangxizhe_nervous@2x.png` |
| 19 | **朱彦泽** (班长) | `zhuyanze` | `command` (严肃指挥) | `zhuyanze_command.png` | `zhuyanze_command@2x.png` |
| 20 | 朱彦泽 (班长) | `zhuyanze` | `shock` (失控愕然) | `zhuyanze_shock.png` | `zhuyanze_shock@2x.png` |
| 21 | **徐老师** (班主任) | `teacher_xu` | `stern` (浩然正气) | `teacher_xu_stern.png` | `teacher_xu_stern@2x.png` |
| 22 | 徐老师 (班主任) | `teacher_xu` | `warm` (慈爱宽慰) | `teacher_xu_warm.png` | `teacher_xu_warm@2x.png` |
| 23 | 徐老师 (班主任) | `teacher_xu` | `pain` (负伤剧痛) | `teacher_xu_pain.png` | `teacher_xu_pain@2x.png` |
| 24 | **刘老师** (数学) | `adult_liu` | `protective` (护生怒视) | `adult_liu_protective.png` | `adult_liu_protective@2x.png` |
| 25 | 刘老师 (数学) | `adult_liu` | `relieved` (欣慰落泪) | `adult_liu_relieved.png` | `adult_liu_relieved@2x.png` |
| 26 | **海峰警官** (队长) | `father_haifeng` | `alert` (警惕搜寻) | `father_haifeng_alert.png` | `father_haifeng_alert@2x.png` |
| 27 | 海峰警官 (队长) | `father_haifeng` | `loving` (爽朗父爱) | `father_haifeng_loving.png` | `father_haifeng_loving@2x.png` |

---

## 二、交付规范与画质标准

1. **格式与通道**：
   - 必须为 **透明背景 PNG**（严禁带白底、黑底、灰白棋盘格伪透明底）。
   - 人物边缘轮廓干净平滑，无脏点、无绿色抠图溢色。
2. **尺寸与分辨率**：
   - **2x 高清图**（`@2x.png`）：分辨率宽高建议保持与原默认立绘完全一致（约 `960px ~ 1200px` 宽，`1600px ~ 2000px` 高）。
   - **1x 标准图**（`.png`）：分辨率为 2x 图的等比 50% 缩放（约 `480px ~ 600px` 宽，`800px ~ 1000px` 高）。
3. **存放路径**：
   - 必须且仅保存在 `assets/art/` 目录下。

---

## 三、图生图（Img2Img）核心工作流与一致性保障

为了确保角色“换表情不换人、服装发型零走样”，必须采用**ControlNet / 局部重绘（Inpainting）/ 垫图图生图**流程：

1. **底模垫图（Source Image）**：
   - 必须以项目中现有的 `assets/art/{actor_id}_default@2x.png` 作为原始垫图。
2. **重绘范围（Mask）**：
   - **强烈建议使用 Inpainting（局部重绘）仅重绘五官及面部表情区域**。
   - 身体姿态、校服红领巾、发型轮廓、站姿比例保持 100% 锁定，严禁改变。
3. **生图参数建议（SD / Midjourney / 各种工作流通用）**：
   - 重绘幅度（Denoising Strength）：`0.35 ~ 0.5`（过高会导致换脸变人，过低会导致表情无变化）。
   - 风格特征词：`chibi-anime hybrid style, visual novel character sprite, clean cel-shading, soft warm lighting, transparent background, master piece, consistent character face`。
   - 负向提示词（Negative Prompts）：`disfigured, extra limbs, bad anatomy, deformed face, inconsistent clothing, blurry, different hair style, adult looking (for kids), realistic photo, 3d render`。

---

## 四、各角色原画特征与图生图提示词（Prompt）

### 1. 双主线主角（六年级小学生，12岁）

#### (1) 张子骁 (`zhangzixiao`) —— 男主角
- **基准原画**：`assets/art/zhangzixiao_default@2x.png`
- **外貌特征**：12岁少年，寸头略带自然卷，圆眼有神，校服蓝白短袖衬衫系红领巾，神情机敏勇敢。
- **表情生图提示词**：
  - `resolute` (坚毅专注 / 咬牙对峙)：`gritted teeth, determined glare, focused furrowed brows, intense eyes, brave expression`
  - `shock` (震惊惊愕 / 目瞪口呆)：`wide open eyes, dilated pupils, slightly parted mouth in gasping, astonished expression, sweat drop`
  - `sad` (悲伤低落 / 强忍眼泪)：`sad expression, downcast eyes, trembling lips, biting lower lip, tears welling up in eyes`
  - `smile` (自信微笑 / 少年意气)：`confident grin, cheerful sparkling eyes, bright boyish smile, proud expression`

#### (2) 石予诺 (`shiyunuo`) —— 女主角
- **基准原画**：`assets/art/shiyunuo_default@2x.png`
- **外貌特征**：12岁少女，齐肩利落短发，清澈灵动的杏眼，少先队员红领巾，透着学霸与侦探气质。
- **表情生图提示词**：
  - `thinking` (手托下巴 / 沉思推理)：`thoughtful expression, hand near chin, analytical focused gaze, slightly tilted head, intelligent`
  - `shock` (震惊错愕 / 瞳孔地震)：`shocked face, wide eyes, raised eyebrows, small gasp, disbelieving expression`
  - `resolute` (果敢威严 / 怒斥)：`determined serious expression, sharp piercing gaze, confident clenched fist, dignified`
  - `tearful` (心碎落泪 / 动容)：`tears streaming down cheeks, emotional heartfelt look, pained tender expression, red eyes`

---

### 2. 六8班死党小队（六年级学生）

#### (3) 范文默 (`fanwenmo`) —— 义气死党 / 警二代
- **基准原画**：`assets/art/fanwenmo_default@2x.png`
- **外貌特征**：身材结实，圆脸虎头虎脑，有些倔强与憨厚，极重义气，崇拜警察父亲海峰。
- **表情生图提示词**：
  - `fury` (暴怒怒吼 / 护短挺身)：`angry shout, furious furrowed eyebrows, burning protective glare, aggressive teeth grit`
  - `panic` (慌乱害怕 / 满头大汗)：`panicked expression, sweating heavily, pale face, nervous wide eyes, stammering mouth`
  - `crying` (痛哭流涕 / 寻找父亲)：`crying out loud, sobbing, streaming tears, overwhelmed boy, sniffing nose`

#### (4) 何妍熹 (`heyanxi`) —— 敏锐女搭档
- **基准原画**：`assets/art/heyanxi_default@2x.png`
- **外貌特征**：利落单马尾，性格要强爽朗，眼神敏锐如鹰。
- **表情生图提示词**：
  - `resolute` (专注瞄准 / 蓄势待发)：`sharp focused look, confident fierce smirk, keen eyes narrowing, resolute combat ready`
  - `shock` (惊惧警惕)：`startled gaze, alert, defensive expression, tense jaw`
  - `gentle` (安慰微笑 / 欣慰)：`soft gentle smile, warm comforting eyes, friendly, reassuring expression`

#### (5) 覃瑞怡 (`qinruiyi`) —— 胆小善良的文艺委员
- **基准原画**：`assets/art/qinruiyi_default@2x.png`
- **外貌特征**：戴圆眼镜，齐刘海双麻花辫，性格文静胆小容易受惊。
- **表情生图提示词**：
  - `crying` (害怕大哭 / 捂脸啜泣)：`crying timid girl, hands trembling, streaming tears behind round glasses, terrified sobbing`
  - `relieved` (破涕为笑 / 抚胸庆幸)：`sigh of relief, soft shy smile, patting chest, tear stains on cheeks but smiling`

#### (6) 张希哲 (`zhangxizhe`) —— 调皮机灵鬼 / 技术达人
- **基准原画**：`assets/art/zhangxizhe_default@2x.png`
- **外貌特征**：微翘发梢，戴运动护腕，鬼点子多，紧张时会下意识死抠指甲/胶带。
- **表情生图提示词**：
  - `smirk` (得意狡黠 / 灵光一闪)：`playful mischievous smirk, winking or clever spark in eyes, confident cheeky expression`
  - `nervous` (心虚紧张 / 冷汗直流)：`nervous sweat, anxious eyes looking sideways, awkward forced smile, fidgety expression`

#### (7) 朱彦泽 (`zhuyanze`) —— 班长 / 沉稳学霸
- **基准原画**：`assets/art/zhuyanze_default@2x.png`
- **外貌特征**：端正中分，戴黑框眼镜，身姿挺拔，班干部气场，责任感极强。
- **表情生图提示词**：
  - `command` (严肃指挥 / 眉头深锁)：`serious authoritative look, adjusting glasses with finger, commanding stern frown`
  - `shock` (失控愕然 / 扶眼镜)：`disbelief, shocked eyes widening behind black-rimmed glasses, shaken composure`

---

### 3. 核心成年人角色（老师与警察家长）

#### (8) 徐老师 (`teacher_xu`) —— 六8班班主任兼语文老师
- **基准原画**：`assets/art/teacher_xu_default@2x.png`
- **外貌特征**：30岁出头温润儒雅男教师，戴金丝细边眼镜，穿米白衬衫与针织背心。
- **表情生图提示词**：
  - `stern` (浩然正气 / 严厉训诫)：`stern righteous aura, sharp piercing eyes, protective frown, dignified teacher`
  - `warm` (慈爱宽慰 / 温暖微笑)：`gentle warm teacher smile, kind crinkled eyes, comforting, compassionate look`
  - `pain` (负隅顽抗 / 忍痛守护)：`pained face, grimacing, holding back agony, protecting students with desperate will`

#### (9) 刘老师 (`adult_liu`) —— 数学兼思想品德老师
- **基准原画**：`assets/art/adult_liu_default@2x.png`
- **外貌特征**：30岁端庄干练女教师，低马尾，知性而护犊心切。
- **表情生图提示词**：
  - `protective` (张臂护生 / 愤怒对峙)：`fierce protective motherly gaze, angry defensive glare at enemies, standing tall`
  - `relieved` (欣慰落泪 / 温柔抚慰)：`gentle relieved smile, tear of joy in eye, proud look at brave students`

#### (10) 海峰警官 (`father_haifeng`) —— 刑警支队长、范文默父亲
- **基准原画**：`assets/art/father_haifeng_default@2x.png` / `father_haifeng_police@2x.png`
- **外貌特征**：40岁左右资深硬汉刑警，国字脸，下巴胡茬，目光如炬，刚正不阿。
- **表情生图提示词**：
  - `alert` (警惕拔枪 / 鹰隼搜寻)：`veteran police officer, tactical alert glare, vigilant, ready for danger, hardened look`
  - `loving` (父爱摸头 / 爽朗大笑)：`broad hearty laugh, affectionate fatherly smile, affectionate crinkles around eyes`

---

## 五、美术 Agent 交付核对 Checklist（请在交付前逐一打钩）

- [ ] **命名 100% 对齐一览表**：所有文件完全符合表格中的 1x 和 @2x 文件名，无大小写错漏，无中文。
- [ ] **透明通道完好**：人物轮廓干净，没有边缘脏色、绿色抠图溢色或灰白杂边。
- [ ] **双规格齐全**：共 27 款新表情 × 2（1x + 2x）= 54 个 PNG 文件。
- [ ] **五官锚点稳定**：重绘表情没有造成眼距失调、人物五官换代变脸、发色改变或服装红领巾缺失。
- [ ] **目录提交准确**：文件全部保存在 `assets/art/` 目录中。

---

> **给制作人的后续流转说明**：
> 当美术 Agent 将上述资源交付进仓库后，通知研发助手，我们将自动执行：
> 1. 在 `src/engine/avatar.js` 的 `ACTOR_STATES` 登记表中扩展新表情；
> 2. 编写全自动测试用例验证资源加载；
> 3. 在第一幕（Ch1~Ch10）和第二幕（Ch11~Ch20）剧情对白中，根据情境为 `leftPortrait` / `rightPortrait` 注入更细腻生动的表情差分。

