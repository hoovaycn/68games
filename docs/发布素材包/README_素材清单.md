# 《附小六8异闻录》发布素材包

> 本素材包面向 itch.io / Steam / Indienova / TapTap / 静态托管等平台发布，按《docs/发布指南.md》第九章「素材清单」整理。
> 生成日期：2026-09-21 ｜ 游戏版本：Demo（纯前端 HTML5 战棋）

---

## 一、目录结构一览

| 目录 | 内容 | 数量 | 对应清单项 |
| --- | --- | --- | --- |
| `01_Logo` | 游戏名标题图（带副标题预留）+ 标题界面背景 | 3 | 游戏名 Logo |
| `02_主视觉封面` | 16:9 主视觉 + Steam 页眉大图（三档尺寸） | 3 | 主视觉封面图 |
| `03_竖版封面` | 600×900 竖版封面 | 1 | 竖版封面 |
| `04_游戏截图` | 标题/对话/战斗示例截图（可自行补充替换） | 3 | 游戏截图 |
| `05_角色立绘` | 主要角色半身立绘（@2x，480×640） | 35 | 角色立绘 |
| `06_角色头像` | 主要角色头像（@2x，192×192） | 37 | 角色头像 |
| `07_场景背景` | 全部章节场景背景（@2x，960×540） | 27 | 场景素材 |

> 演示 Demo（网页包）见项目根目录 `release_web/`，发布时自行压缩为 zip 上传即可。

---

## 二、核心素材规格

| 素材 | 文件 | 尺寸 | 用途 |
| --- | --- | --- | --- |
| 游戏名 Logo | `01_Logo/游戏名Logo_标题图.png` | 1948×1004（洋红底，可抠图） | 标题/封面叠加 |
| 标题界面背景 | `01_Logo/标题界面背景_960x540.png` | 960×540 | 标题页底图 |
| 主视觉封面 | `02_主视觉封面/主视觉封面_16x9_1536x864.png` | 1536×864（16:9） | itch.io/商店主图 |
| 主视觉封面（小） | `02_主视觉封面/主视觉封面_16x9_1280x720.png` | 1280×720（16:9） | Steam 截图规格 |
| Steam 页眉大图 | `02_主视觉封面/Steam页眉大图_HeaderCapsule_616x353.png` | 616×353 | Steam 商店页 Header Capsule |
| 竖版封面 | `03_竖版封面/竖版封面_600x900.png` | 600×900（2:3） | Steam/移动商店竖版 |

> 注：Logo 与封面均沿用游戏统一的「90 年代 16-bit 像素画」风格，与游戏内美术一致。

---

## 三、角色立绘 / 头像对照表

立绘为「常态 default / 心魔异化 corrupted」双形态，部分角色另有 sad（沮丧）/ old（老年）特殊形态。文件命名规则：`中文名_形态@2x.png`。

| 中文名 | 身份 | 立绘形态 | 头像形态 |
| --- | --- | --- | --- |
| 张子骁 | 主角（男线，棋王） | default / corrupted | default / corrupted |
| 石予诺 | 主角（女线，美术课代表） | default / corrupted | default / corrupted |
| 张瀚瑜 | 男线伙伴 1（死党） | default / corrupted | default / corrupted |
| 陈品璇 | 女线伙伴 1 | default / corrupted | default / corrupted |
| 范文默 | 男线伙伴 2 | default / corrupted | default / corrupted |
| 何妍熹 | 女线伙伴 2 | default / corrupted | default / corrupted |
| 张希哲 | 体育特长生 | default / corrupted | default / corrupted |
| 覃瑞怡 | 学霸 | default / corrupted | default / corrupted |
| 朱晏泽 | 讲义气男生 | default / corrupted | default / corrupted |
| 刘老师 | 班主任 | default | default |
| 徐老师 | 体育老师 | default | default |
| 体育老师 | 外校教练 | default / corrupted | default / corrupted |
| 少年徐老师 | 二十年前徐老师 | default | default |
| 少年刘老师 | 二十年前刘老师 | default | default |
| 荧光零食商贩 | 序章 Boss | default / sad | default / sad |
| 花西装男人 | 第 9 章反派 | default / corrupted | default / corrupted |
| 混混 | 序章敌人 | default | default |
| 阿瑶 | 第 8 章关键角色 | default / corrupted | default / corrupted |
| 体训教练 | 第 5 章角色 | default / corrupted / sad | default / corrupted / sad |
| 老门卫 | 关键 NPC | old | default / old |

---

## 四、场景背景清单（全部 @2x，960×540）

| 文件名 | 场景 |
| --- | --- |
| bg_classroom / bg_classroom_eerie / bg_classroom_old | 教室（日常/异化/旧教室） |
| bg_home / bg_home_eerie / bg_home_mc | 主角家（日常/异化/房间） |
| bg_street / bg_neighborhood | 校外街道 / 街区 |
| bg_playground / bg_playground_eerie | 操场（日常/异化） |
| bg_warehouse / bg_warehouse_inner | 仓库（外观/深处据点） |
| bg_exam_realm / bg_exam_mind_realm | 精神考场（考场/异次元） |
| bg_opening / bg_title / title_logo | 开场 / 标题 / Logo |
| bg_auditorium / bg_parent_meeting(_eerie) | 礼堂 / 家长会（异化） |
| bg_corridor_old_eerie / bg_guard_room_old | 旧走廊 / 旧门卫室 |
| bg_field_relief / bg_school_night | 田野 / 深夜校园 |
| bg_office / bg_training_room | 办公室 / 训练室 |
| cg_pickup_bottle | CG：捡起饮料瓶 |

---

## 五、各平台发布贴士（摘自发布指南）

- **itch.io**：上传 `08_演示Demo` 的 zip 勾选「Play in browser」；主图用 `02_主视觉封面`。
- **Steam**：竖版封面用 `03_竖版封面`；截图补齐至 5 张以上（1280×720 规格可用 `02` 的小图参考）。
- **静态托管**：将 zip 解压后整目录拖入 Cloudflare Pages / Netlify Drop 即可即点即玩。
- **截图**：`04_游戏截图` 内为示例，正式发布前建议用浏览器打开游戏，按 F1 跳序章、空格推进对话、进入战斗后自行截取更高规格截图。

---

## 六、一句话宣传语

**小学生用橡皮、铅笔和操场家伙事儿，把“想变厉害”的邪念打回原形。**
