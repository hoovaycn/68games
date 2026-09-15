# 《六 8 班异闻录》架构体检与 V1-V2 迭代规划

> 状态：v1.0（2026-09-15）・基于对当前全部 6164 行代码的实际审读
> 结论先行：**骨架健康、数据驱动方向正确，可直接迭代加内容；但 main.js 已成上帝类、战斗双实现分叉、无存档层，这三件事需要在加大量内容之前处理，越晚越贵。**

---

## 一、模块健康度体检（当前 6164 行）

| 模块 | 行数 | 组件化评价 | 可扩展性 | 说明 |
|------|-----:|:---:|:---:|------|
| `data/`（units/classes/weapons/items/enemies/chapters/story） | 1234 | ★★★★★ | 优 | **纯配置零逻辑，最健康的部分**。加角色/武器/道具/关卡只需改这里，方向完全正确 |
| `systems/grid.js` | 229 | ★★★★☆ | 良 | BFS/A*、地形加成、街具阻挡职责清晰，静态类无状态，可单测。默认地形字典内置是合理的兜底 |
| `systems/combat.js` | 268 | ★★★☆☆ | 中 | 公式层（predictBattle/useItem）干净；但 `executeCombat` 是**死代码**（无人调用），且经验公式与 main.js 实战版已经分叉（见 §2.2） |
| `systems/ai.js` | 115 | ★★★★☆ | 良 | 决策独立纯函数，支持 aggressive_chase / passive_guard 两型；加 AI 行为只需扩 type 分支 |
| `systems/dialogue_system.js` | 356 | ★★★★☆ | 优 | 独立类、回调通信，剧本完全数据驱动（bgm/sfx/立绘全配在 scene 里），加剧情零代码改动 |
| `ui/renderer.js` | 1165 | ★★★☆☆ | 中 | 分层绘制方法化做得好；但 `drawMapFrame` 里硬编码 HUD 文案、`drawPhaseBanner` 动画混在渲染器里，属于"系统逻辑渗入渲染层" |
| `ui/title_screen.js` / `epilogue_screen.js` | 993 | ★★★★☆ | 良 | 三状态机自管理，只暴露 enter/handleClick/handleKeyDown，与 main 低耦合 |
| `ui/components/`（victory/item modal） | 330 | ★★★★☆ | 优 | render/handleClick/handleKeyDown 统一接口模式，是新弹窗组件的正确模板 |
| `engine/`（sound/asset_loader） | 188 | ★★★★☆ | 良 | 音频自动播放解锁、色键抠图逻辑收敛 |
| **`main.js`** | **1280** | **★☆☆☆☆** | **差** | **上帝类，唯一的重灾区**（详见 §2.1） |

---

## 二、当前架构债（按修复优先级排序）

### 2.1 ★★★ main.js 上帝类（1280 行同时干 7 种事）

GameApp 一个类身上挂着：舞台状态机（title/story/battle/epilogue）、回合流转状态机（player→enemy phase）、战斗演出编排（executeCombatSequence）、动画协程（shakeUnit/lungeUnit）、全局输入分发（键盘+鼠标+滚轮）、场景切换路由、HUD 更新。

`battleState` 是 20+ 字段的可变巨型对象，所有 bug （本轮修的胜利结算死锁、黑屏、按钮失灵）全都栽在这个共享可变状态上。**每加一个新功能都会让下一个 bug 更难查。**

**修复方向（见 §3.1）**：按职责拆成 SceneManager / BattleController / InputRouter / AnimationHelper 四块，battleState 拆成持久字段（可存档）与瞬态字段（banner/动画锁）两包。

### 2.2 ★★★ 战斗双实现分叉（已经出现）

| 位置 | 状态 | 经验公式 |
|------|------|---------|
| `combat.js executeCombat()` | **死代码，无人调用** | 击杀 `30+等级差×10`（最低20）/ 参与 `10+等级差×2`（最低5） |
| `main.js executeCombatSequence()` | 实战在用 | 击杀 `35` / 参与 `12`（硬编码，无视等级差） |

两套公式已经不一致——这是双实现的经典恶果开始显形。将来调整数值、加武器特效（如必杀台词、连胜 buff）时必然只改一处漏一处。

**修复方向**：让 combat.js 成为唯一真相源——它输出"结算事件流" `[{type:'strike', who, damage, isCrit}, ...]`，main.js 只负责把事件流翻译成动画（突进/震动/飘字）。计算与演出彻底解耦后，数值怎么改都只动一个文件。

### 2.3 ★★☆ 数据引用无校验（裸字符串 ID + 裸资源路径）

characters 的 `classId`/`equippedWeapon`/`portrait`、章节的 `enemyId`/`terrainTiles[].type`、剧本的 `battleId`/`targetScene`——全是裸字符串，拼错只有运行到那一行才炸（甚至是静默 404，比如本次地砖路径 Bug 纯色回退、无人察觉）。

**修复方向**：加一个 `tools/validate.js` 启动自检（node 一键跑，不依赖浏览器）：
- 全部跨表 ID 引用闭合检查（units→classes/weapons、chapters→enemies/units/scenes）
- 全部 assets 路径存在性检查（把 src+data 里所有 `assets/...` 路径 grep 出来对拍文件系统——本次打包校验的同款方法固化成工具）
- 章节剧情链完整性：每个 transition.targetScene / nextStorySceneOnWin 在两条线里都存在

### 2.4 ★★☆ 章节路由硬编码

`handleSceneTransition` 里 `transition.battleId === 'ch0_battle2' ? CH0_BATTLE2 : CH0_BATTLE1`——加第三章必须回来改 main.js。应改为注册表：

```js
// data/chapters/index.js
export const CHAPTERS = { ch0_battle1: CH0_BATTLE1, ch0_battle2: CH0_BATTLE2 };
// main.js
const chapterData = CHAPTERS[transition.battleId];
```

加新关卡从此零代码改动。

### 2.5 ★☆☆ 事件系统未落地

架构文档 §5.6 规划了通用触发器（`回合开始→增援 / 敌数量≤N→Boss狂暴 / 进入区域→剧情`），实际只实现了一种 `on_enemy_defeated`，且硬编码在 executeCombatSequence 里混着中段剧情切换逻辑。做多章内容前应把事件表落地进章节数据。

### 2.6 ☆☆☆ 已知未用字段与占位

- `items.js` 的 `use_in_field: true`——自由活动/明雷探索（架构 P1-1）还没做，目前全游戏只有战斗内用药
- `units.walkSprite` 字段保留但 drawUnits 已改用头像圆盘（正确的钩子保留策略，不动）
- `data/credits.js` 素材授权登记无渲染入口（公开发布前补一个 credits 场景即可）

---

## 三、V1 迭代路线（仍在纯前端内，先还架构债再加内容）

> 原则：**先花 2-3 个工作日把地基补齐，之后加角色/武器/关卡/剧本全部变成纯数据工作。**

### V1.0 可扩展性改造（内容扩展前的地基，优先级从高到低）

| # | 任务 | 工作量 | 收益 |
|---|------|--------|------|
| 1 | 章节/战斗注册表替换三元硬编码 | 0.5h | 加关卡零代码 |
| 2 | `tools/validate.js` 引用完整性校验（ID/资源路径/剧情链三合一） | 2h | 杜绝"静默 404"类 Bug（本次地砖事故的疫苗） |
| 3 | 战斗结算统一：combat.js 输出事件流，main.js 只播动画 | 1天 | 数值公式单点维护，动画随便改 |
| 4 | main.js 拆分：BattleController（回合状态机+battleState）独立成 class | 1天 | 回合类 Bug 定位成本大降 |
| 5 | 存档系统第一步：SaveSystem 抽象 + localStorage 版（见 §4.3 数据模型） | 1天 | V2 换 IndexedDB/后端时零业务改动 |
| 6 | 数值公式快照测试（combat.predictBattle + grid BFS/A* 喂固定输入比对输出） | 2h | 改数值不心虚 |

### V1.x 内容扩展（地基完成后，全部是"填表"工作）

| 内容类型 | 要动的文件 | 是否动引擎代码 |
|----------|-----------|:---:|
| 新可操作角色 | `units.js` + `classes.js` + 立绘/头像资源 | 否 |
| 新敌人 | `enemies.js` + `classes.js` | 否 |
| 新武器 | `weapons.js`（如射手程>1，AI 与目标选择已天然支持） | 否 |
| 新道具 | `items.js`（effects 支持 hp/spd 两种 stat，扩新效果才动 combat.js useItem） | 基本否 |
| 新关卡 | `chapters/chX.js` + 注册表 | 否 |
| 新剧情场景 | `story_prologue.js`（或拆成 scenes/ 单文件） | 否 |
| 组队多角色上场 | `chapters.playerDeploy` 支持多个 + initBattle 循环部署 | **小改 main.js** |
| 转职/武器克制 | classes.js 加 promote 字段 + combat.js 公式 | **是，需设计** |

> 多角色组队是唯一需要动到引擎假设的点（现在到处写死"单角色"：`activePlayerUnitId`、`playerDeploy[0]`、升级弹窗只看 attacker）。建议作为 V1.1 的引擎任务，与 §3.1-4 的重构一起做。

---

## 四、V2 数据层规划（存档 + 继续游玩）

### 4.1 技术选型决策：IndexedDB，不是 SQLite

| 方案 | 容量 | 优点 | 缺点 | 建议 |
|------|------|------|------|------|
| **localStorage** | ~5MB | 同步 API 最简单 | 容量小、阻塞主线程、只能存字符串 | V1 先用（存档小），V2 迁走 |
| **IndexedDB** | 数百 MB+ | 浏览器原生、异步、索引查询、事务 | API 啰嗦（可用 idb 薄封装抹平） | **V2 主选** |
| SQLite WASM（sql.js / wa-sqlite） | 无限 | 真 SQL | 3MB+ 运行时下载/AHIT、过度设计 | 否 |
| 后端数据库（MySQL 等） | — | 跨设备云存档 | 要服务器、要账号体系 | 预留接口，V3 再说 |

结论：**"本地数据库"的正确打开方式就是 IndexedDB**——浏览器内置、无需分发、无依赖，加 `idb`（1KB Promise 封装）后体验接近 localStorage。真到要跨设备云同步时（比如接你 38 服务器那套 fancy_feishu_online 的栈），因为走了 §4.3 的仓储接口抽象，后端只是换一个 Adapter。

### 4.2 存档要存什么（数据模型草案）

```
存档槽 slot（支持 3 槽位 + 双线独立）
├── meta: { route, chapterId, sceneKey, playTime, savedAt, version }
├── roster: [ { unitId, name, classId, level, exp, currentHp,
│              stats(实际成长后), equippedWeapon, inventory[] } ]
│              ↑ 关键：存"成长后的实际数值"，不存初始值，读档即玩
├── flags: { 剧情旗标: true/false, 击败过的敌将, 采集过的物品 }
├── wallet: { 金币(P1), 章节制道具仓库 }
└── settings: { 音量, 文字速度 }
```

**不存**的东西同样重要：动画/横幅/瞬态字段（animOffsetX、phaseBanner、isAnimatingCombat）——这就是 §2.1 拆分 battleState 时要做的"持久/瞬态分包"，两件事是同一件事。

### 4.3 分层设计（为将来留缝）

```
SaveUI（存档/读档界面，走 components/ 弹窗规范）
   ↓
SaveService（业务层：存什么、何时自动存档——建议：章节开始+战斗胜利后触发点存档）
   ↓
SaveRepository（接口）：save(slot, data) / load(slot) / list() / delete(slot)
   ├── LocalStorageRepo   （V1，立即可用）
   ├── IndexedDBRepo      （V2，主力）
   └── RemoteApiRepo      （V3，REST 对 38 服务器，形状先别定死）
```

写读档 UI 时不要直接 new 具体实现，main.js 只认 Repository 接口——这是唯一需要在 V1 就做对的决策，之后换存储介质对业务零冲击。

### 4.4 序章存档点建议（最小闭环）

序章流程天然有 4 个存档点：开场动画后 / 选定男女主后 / 战斗1胜利后 / 战斗2胜利后。"继续游玩"= 读 slot → 恢复 meta.sceneKey 直接进对应场景，序章阶段 roster 就是单角色，最简单，适合作为 V2.0 验收标准。

---

## 五、给下个版本的建议排期

```
V1.0 地基周（2-3 天）：§3.1 表格全部 6 项
V1.1 组队与事件（1 周）：多角色部署改造 + 通用事件表落地（§2.5）+ credits 场景
V1.2 内容填充（持续）：按 GDD 加章节/角色/武器/道具，全部填表
V2.0 存档版（3-4 天）：SaveSystem + IndexedDB + 存档 UI + 4 存档点
V3.0 可选：云同步（38 服务器 REST）/ 自由活动与明雷（架构文档 P1-1，最大的一块新玩法）
```

一句话总结：**方向是对的（数据驱动立住了，剧本/关卡/数值/演出四层分清了），现在缺的是把 main.js 的权力关进笼子、把战斗结算收敛成单点、把存储层抽象出来——做完这三件事，后面加一百个角色也只是往 data/ 里填表。**
