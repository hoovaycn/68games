# 全剧情绪差分立绘补图需求（皱眉 / 哭泣）

> 审计脚本：`tools/audit_emotion_coverage.mjs`（一次性工具，不入库）
> 审计范围：`src/data/story_*.js` 全三幕剧情脚本（含序章、虎门外传）
> 映射基准：`src/engine/avatar.js` 的 `ART_EMOTION_FILES`
> 判定逻辑：剧情脚本里写了某情绪，但映射表/素材库缺对应差分图时，引擎会兜底回退到 `default`，导致角色在关键场景「表情纹丝不动」。

---

## 一、结论速览

| 情绪 | 语义 | 缺口情况 |
| :--- | :--- | :--- |
| `frown` | 皱眉 / 敌意 / 坚定 | **缺 4 个角色** |
| `cry` | 哭泣 / 悲伤 / 煽情 | **缺 5 个角色** |
| `awkward` | 尴尬 / 局促 | **无缺口**（仅张希哲使用，已有 `nervous` 图） |

合计需补 **9 张差分图**（张瀚瑜、陈品瑄、海峰·警察形态各缺 2 张；徐老师·潜行形态、张希哲、朱晏泽各缺 1 张）。

> 说明：本项目最常用的三类情绪中，`awkward`（尴尬）目前只由张希哲一人承载，其 `nervous` 图已覆盖，**本轮无需补**。重点补 `frown` 与 `cry`。

---

## 二、统一视觉与交付规范（务必遵守）

1. **同一张脸铁律**：所有差分一律**图生图自该角色现有 `default` 立绘**，只改表情与眉眼，五官、发型、服饰、配色完全一致，禁止重新设计。
2. **规格**：高精透底 PNG，透明底（`#FF00FF` 洋红键色抠底），主体避开红/粉/紫系（防止被误抠）。
3. **交付尺寸**：立绘出 `1x` + `@2x` 双密度。
4. **命名（已定死，直接照抄，勿自行改名）**：文件名见下表「交付文件名」列，每张图出两个文件：`{base}.png` 与 `{base}@2x.png`。
5. **情绪方向**（与既有角色保持一致）：
   - `frown` = 眉头紧锁、眼神锐利、嘴角下压的**敌意/坚定**表情（参考 `zhangzixiao_resolute`、`fanwenmo_fury`）。
   - `cry` = 眼眶含泪/泪痕、眉尾下垂的**悲伤**表情（参考 `zhangzixiao_sad`、`fanwenmo_crying`）。

---

## 三、逐角色补图清单（文件名已定死）

### 1. 张瀚瑜（`zhanghanyu`，男线 ALLY_1）
- **缺**：`frown`、`cry`
- **交付文件名**：
  - `zhanghanyu_resolute.png` / `zhanghanyu_resolute@2x.png`（皱眉）
  - `zhanghanyu_sad.png` / `zhanghanyu_sad@2x.png`（哭泣）
- **视觉**：皱眉时目光坚定、牙关微咬；哭泣时眼角泛红、含泪。
- **典型场景**：面对敌人围困（第21章雨夜、第22章码头）→ 皱眉；煽情离别/真相（第30章告别）→ 哭泣。

### 2. 陈品瑄（`chenpinxuan`，女线 ALLY_1）
- **缺**：`frown`、`cry`
- **交付文件名**：
  - `chenpinxuan_resolute.png` / `chenpinxuan_resolute@2x.png`（皱眉）
  - `chenpinxuan_sad.png` / `chenpinxuan_sad@2x.png`（哭泣）
- **视觉**：皱眉时抿唇、眉眼坚定；哭泣时泪光闪烁。
- **典型场景**：同张瀚瑜，男女线对称。

### 3. 海峰 · 警察形态（`haifeng-police`）
- **缺**：`frown`、`cry`
- **交付文件名**：
  - `father_haifeng_police_alert.png` / `father_haifeng_police_alert@2x.png`（皱眉）
  - `father_haifeng_police_tearful.png` / `father_haifeng_police_tearful@2x.png`（哭泣）
- **视觉**：皱眉时眼神锐利如临大敌；哭泣时（劫后余生/父子重逢）眼眶湿润。
- **典型场景**：第22章抓捕对峙、第23章破门对峙 → 皱眉；第28章抱住孩子、第30章尾声 → 哭泣。

### 4. 徐老师 · 潜行形态（`xu-stealth`）
- **缺**：`frown`
- **交付文件名**：
  - `teacher_xubox_stealth_stern.png` / `teacher_xubox_stealth_stern@2x.png`（皱眉）
- **视觉**：压低帽檐下眉头紧锁、眼神冷峻警惕。
- **典型场景**：第21章雨夜接头、第22章码头、第23章对峙 → 皱眉。

### 5. 张希哲（`zhangxizhe`）
- **缺**：`cry`
- **交付文件名**：
  - `zhangxizhe_sad.png` / `zhangxizhe_sad@2x.png`（哭泣）
- **视觉**：平时嬉皮笑脸，哭泣时鼻尖发红、强忍又忍不住落泪。
- **典型场景**：煽情真相/离别（第24章碑前、第30章尾声）→ 哭泣。

### 6. 朱晏泽（`zhuyanze`）
- **缺**：`cry`
- **交付文件名**：
  - `zhuyanze_sad.png` / `zhuyanze_sad@2x.png`（哭泣）
- **视觉**：平时拽酷，哭泣时眼眶通红、别过脸抹泪，仍强撑。
- **典型场景**：煽情真相/离别（第30章尾声）→ 哭泣。

### 7. 刘老师（`liu` / `adult_liu`）
- **缺**：`cry`（哭泣/哽咽）
- **交付文件名**：
  - `adult_liu_crying.png` / `adult_liu_crying@2x.png`（哭泣）
- **视觉**：端庄温婉的刘淑惠老师眼眶泛红、泪如雨下，神情悲痛、心疼哽咽，隐忍不舍。
- **典型场景**：第30章尾声阿瑶消散（`ch30_scene_golden_departure`，id: 19）“（把脸埋进掌心，声音哽咽）傻阿瑶……你到最后，都还在替别人扛……”

---

## 四、交付文件名总表（美术直接按此出图）

| 角色 | 情绪 | 文件 base（`{base}.png` + `{base}@2x.png`） |
| :--- | :--- | :--- |
| 张瀚瑜 | 皱眉 | `zhanghanyu_resolute` |
| 张瀚瑜 | 哭泣 | `zhanghanyu_sad` |
| 陈品瑄 | 皱眉 | `chenpinxuan_resolute` |
| 陈品瑄 | 哭泣 | `chenpinxuan_sad` |
| 海峰·警察 | 皱眉 | `father_haifeng_police_alert` |
| 海峰·警察 | 哭泣 | `father_haifeng_police_tearful` |
| 徐老师·潜行 | 皱眉 | `teacher_xubox_stealth_stern` |
| 张希哲 | 哭泣 | `zhangxizhe_sad` |
| 朱晏泽 | 哭泣 | `zhuyanze_sad` |
| 刘老师 | 哭泣 | `adult_liu_crying` |

---

## 五、研发侧落地（美术交图后执行）

美术把上表 9 张图放入 `assets/art/` 后，研发在 `src/engine/avatar.js` 的 `ART_EMOTION_FILES` 中登记对应 state（**代码已按此约定，交图后直接可接**）：

```javascript
"zhanghanyu": {
  "default": "zhanghanyu_default",
  "frown": "zhanghanyu_resolute",
  "cry": "zhanghanyu_sad"
},
"chenpinxuan": {
  "default": "chenpinxuan_default",
  "frown": "chenpinxuan_resolute",
  "cry": "chenpinxuan_sad"
},
"zhangxizhe": {
  "default": "zhangxizhe_default",
  "frown": "zhangxizhe_smirk",
  "awkward": "zhangxizhe_nervous",
  "cry": "zhangxizhe_sad"        // 新增
},
"zhuyanze": {
  "default": "zhuyanze_default",
  "frown": "zhuyanze_command",
  "shock": "zhuyanze_shock",
  "cry": "zhuyanze_sad"          // 新增
},
"haifeng-police": {
  "default": "father_haifeng_police",
  "frown": "father_haifeng_police_alert",     // 新增
  "cry": "father_haifeng_police_tearful"       // 新增
},
"xu-stealth": {
  "default": "teacher_xubox_stealth_default",
  "cry": "teacher_xubox_stealth_pain",
  "frown": "teacher_xubox_stealth_stern"      // 新增
}
```

复核：跑 `node tools/audit_emotion_coverage.mjs`，上述角色的 `frown` / `cry` 不再出现在「缺失清单」即通过。

---

## 附：已确认无缺口，无需补

- `awkward`：仅张希哲使用，`zhangxizhe_nervous` 已覆盖。
- `shock`、`smile`：现有使用角色均已有对应图（主角、范文默、何妍熹、覃瑞怡、徐老师、刘老师、海峰等）。
