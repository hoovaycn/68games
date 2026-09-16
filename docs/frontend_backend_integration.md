# 前端 UI × 后端服务层对接蓝图（M1 里程碑交付物）

- **版本**：v1.0（2026-09-16）
- **基线**：commit `e6627d4`（b1-b7 六项试玩反馈收尾，selftest 345 全绿）
- **状态**：规划定稿，待用户确认后进入 M1 实施（见 §8 任务拆解）
- **完工定义（M1 DoD）**：`game_state` / `save_manager` 与 main.js 主链路完全打通并测通——人物的等级、经验、数值、背包跨战斗与跨刷新持久化；3+1 槽存档（自动+手动）可存可读；之后新增剧情/人物/战斗**只改 `src/data/`，不再动 `src/systems/` 与主流程**。

---

## 0. 文档定位

本项目是**单机架构，没有网络后端**。用户口中的「后端服务」= 本项目的**服务层 `src/systems/`**（纯函数库，无 DOM、无 UI 依赖）。它扮演后端角色：

- UI 只消费服务的**快照返回值**，不回查数据表；
- 所有可持久化状态收口到唯一载体 `gameState`（可 JSON 序列化普通对象）；
- 存储介质由 `save_manager` 单点负责（`storageLike` 注入，天然为未来换真服务器留了口）。

本文档回答三件事：

1. **现状**：哪些子系统已建、哪些已接 UI、哪些持久化断链（§2/§5）；
2. **规格**：每个子系统（数值/经验/道具/存档/剧情）的完整对接契约（§4-§6）；
3. **开工清单**：M1 具体要做什么、怎么算测通（§8/§9），完成后进入「只写内容」模式（§10）。

---

## 1. 架构总览与对接铁律

### 1.1 三层架构

```
┌─────────────────────────────────────────────────────────┐
│ UI 组件层  src/ui/ + src/main.js                        │
│   组件（combat_exchange/inventory_panel/unit_detail/）  │
│   只渲染快照；输入事件 → main.js 状态机 → 调服务        │
├─────────────────────────────────────────────────────────┤
│ 服务层（用户的"后端"）  src/systems/                    │
│   combat 战斗判定 · grid 寻路 · ai 决策 · growth 成长   │
│   loot 掉落 · stash 仓库 · game_state 进度 · save_manager│
├─────────────────────────────────────────────────────────┤
│ 数据表（静态内容）  src/data/                           │
│   units 玩家人物 · enemies 敌人 · classes 职业 ·        │
│   weapons 武器 · goods 道具 · chapters 章节 ·          │
│   story_prologue 剧情                                  │
└─────────────────────────────────────────────────────────┘
```

数据流向单向：**数据表 → 服务 → 快照 → UI**。UI 永远不直接 import 数据表（唯一历史豁免：`growth.js` 工厂读表造人，这是服务层自己的事）。

### 1.2 六条对接铁律（现已在服务层执行，M1 沿用）

| # | 铁律 | 现有范例 |
|---|------|----------|
| 1 | 服务层纯函数：不碰 DOM、不 import UI、存储介质不感知 | [growth.js](../src/systems/growth.js)、[game_state.js](../src/systems/game_state.js) |
| 2 | 随机数（rng）可注入，自测用固定 rng 走断言 | `rollLevelUp(classId, growth, rng)`、`rollDrops(u, {rng})` |
| 3 | 服务返回 UI 快照（含 name/desc/icon 等展示字段），UI 不回查表 | `loot.snapshot`、`stash.snapshotItem`、`summarizeState` |
| 4 | 序列化走白名单，战场字段（x/y/facing/anim*）永不入档 | game_state.js `ROSTER_FIELDS` |
| 5 | 时间不可逆的判定幂等（掉落重复结算返回空） | loot `rollDrops` 判定后清空 drops |
| 6 | 失败返回 `{ok:false}` 而不是抛异常，UI 直接弹提示、无需回滚 | stash `moveItems`「先校验后扣减」 |

---

## 2. 现状盘点（基线 e6627d4 照实）

### 2.1 子系统全景表

| 子系统 | 服务实现 | 自测 | 渲染/输入链路已接 | 跨战斗持久化 | 结论 |
|---|---|---|---|---|---|
| 战斗判定 combat | ✅ | ✅ | ✅ | 无需（战斗内即用即弃） | **完成** |
| 寻路 grid | ✅ | ✅ | ✅ | 无需 | **完成** |
| 敌方 AI | ✅ | ✅ | ✅（startEnemyPhase） | 无需 | **完成** |
| 数值工厂 growth.createPlayerUnit / createEnemyUnit | ✅ | ✅ | ❌ 见 §2.2 | — | **半成品** |
| 经验/升级 growth.gainExp | ✅ | ✅ | ✅ 战斗内已调（executeCombatSequence） | ❌ 见 §2.2 | **半成品** |
| 掉落 loot.settleLoot | ✅ | ✅ | ✅ 战斗内已调 + 胜利面板 | ❌ 见 §2.2 | **半成品** |
| 背包/仓库 stash | ✅ | ✅ | ✅ inventory_panel 存取 | ❌ 每场新建 | **半成品** |
| 游戏进度 game_state | ✅ | ✅ | ❌ 无任何调用方 | — | **休眠** |
| 存档管理 save_manager | ✅ | ✅ | ❌ 无 UI、无流程 | — | **休眠** |
| 纯展示（详情面板/简介/交战演出） | —（渲染层） | ✅ §10.10 | ✅ b1/b4 已交付 | — | **完成** |

> 除「完成」行外，其余全部是 M1 的活。**两个「休眠」是断链根因**：服务建好了，主程序不知道它们存在。

### 2.2 「战斗内已接、持久化断链」详解（本文档要修的核心问题）

当前 main.js 的生命周期：

```
选主角 → onCharacterSelected
  → initBattle(chapter)：从 UNITS/ENEMIES 模板【当场内联造单位】（不经过 game_state）
      每场独立 createStash()          ← main.js L363 注释自认："未来接 game_state 后改持久化"
  → 战斗：gainExp / settleLoot / stash 存取   ← 服务已接，操作的是本场运行时副本
      升级/装备/捡到的道具真实改到运行时单位上（当场面板、弹窗都正常）
  → 胜利 → returnToStory → 下一场 initBattle：
      【重新从模板造单位，等级/经验/背包/装备全部回出厂设置】
```

一句话：**现在打完一场，升的级、拿的经验、捡的道具，下一场全部丢失**。UI 面板显示正常造成「已接通」的错觉——数据链路在「下一场重建」处断掉。`game_state.js` 的 `serializeUnit/hydrateUnit/commitRuntimeUnit` 三个函数就是为这条链路准备的，自测全绿，**但 main.js 从未 import**。

### 2.3 标题页现状

[title_screen.js](../src/ui/title_screen.js) 流程：OPENING → TITLE（点击开始）→ CHARACTER_SELECT → 游戏内。**没有「继续游戏」按钮、没有存档界面**（grep `继续/save/load` 零命中）。M1 需补（§8 T5）。

---

## 3. 数据模型速查（对接契约的数据部分）

### 3.1 gameState（存档唯一载体，schema 2）

来自 [game_state.js](../src/systems/game_state.js) L4-L16，完整结构：

```js
{
  schema: 2,
  route: 'male' | 'female',          // 线路（决定 leadUnitId 与剧情分支）
  leadUnitId: 'zhangzixiao',
  sceneId: 'scene_classroom',        // 当前剧情节点（读档恢复点）
  chapterId: null | 'ch0_battle2',   // 正在进行 / 即将进入的战斗
  flags: {},                         // 剧情旗标（自由键值：分支判定、一次性事件、入队开关）
  clearedChapters: [],               // 已通关章节 id 列表
  roster: {                          // 队伍全员档案（成长/背包/装备全持久化）
    [unitId]: { /* 档案，见 3.2 */ }
  },
  playtimeSec: 0,
  savedAt: 0                         // 写档时间戳（save_manager 填）
}
```

**M1 变更 → schema 3**（§8 T1）：新增 `stash` 字段（`createStash()` 形状 `{ items: [{ id, count }] }`）。旧档迁移：migrate 里补 `blob.stash ??= createStash()`。升级理由见 §5.4。

### 3.2 roster 档案（白名单序列化）

`serializeUnit` 只拷贝 `ROSTER_FIELDS`（game_state.js L33-L39）：

```
unitId, name, title, bio, classId, themeColor, portrait, walkSprite, quotes,
level, exp, personalGrowth, personalSkill,
equippedWeapon, equippedArmor,
inventory, stats, currentHp, currentMp
```

- `hydrateUnit` 反向补回战场默认值（x/y=0、facing、isAlive、anim* 置零），产出可直接 deploy 的运行时单位；
- 白名单的意义：战场态（坐标/朝向/动画偏移/闪白）**结构上不可能**进存档，游戏随时可从中途读档，读的是「人」不是「战场」。

### 3.3 运行时单位 vs 档案——生命周期约定（最重要的契约）

```
game_state.roster[u]              ── serializeUnit ──▶  战场运行时单位（深拷贝）
        ▲                                                    │ 战斗中 mutation：
        │                                                    │  经验/等级/当前HP/背包/装备
        └────── commitRuntimeUnit（战斗结束一次性写回）◀──────┘
```

- **开战**：`getPartyUnit(state, unitId)` → hydrate 深拷贝 → deploy。战场怎么改都不污染 roster；
- **闭战**：调用方显式 `commitRuntimeUnit(state, unit)`。**全游戏只有这一处同步点**，永不出现双向绑定；
- 阵亡单位同样 commit（保留其档案与遗物，M1 不做 FE 式永久死亡，见 §6.6）。

### 3.4 数据表要点（写内容时才碰，M1 冻结）

| 表 | 形状要点 | 消费方 |
|---|---|---|
| UNITS（玩家人物） | 含 `level/exp/equippedWeapon/inventory/personalGrowth/quotes`，见 [units.js](../src/data/units.js) | growth 工厂 |
| ENEMIES | 含 `ai/drops/level/classId` | growth 工厂 |
| CLASSES | `base`（十维初始）+ `growth`（九维%） | combat / growth |
| WEAPONS | combat 只读 `WEAPONS[unit.equippedWeapon]`（[combat.js](../src/systems/combat.js) 7 处），**防具暂无战斗公式**（§6.6） | combat |
| goods | `stack/category/usage: {in_battle, in_field}/kind` | stash/loot 快照 |
| chapters | `playerDeploy/enemyDeploy/objective/nextStorySceneOnWin/tutorial/reinforcements` | main.js |

---

## 4. 存档体系完整规格

服务 [save_manager.js](../src/systems/save_manager.js) 已全部实现并自测，以下为**行为规格**（UI/流程侧按此消费）：

### 4.1 槽位

- **3+1**：`1/2/3` 手动槽 + `auto` 自动槽；
- 存储 key：`fx_save_v2_slot_{slot}`（M1 schema 3 落地时可沿用 key，`blob.schema` 字段自校验+ `migrate()`；
- 主页「继续游戏」= `mostRecentSave()`（四槽里 `savedAt` 最新的）；没有档时按钮禁用；
- 删除槽位 `deleteSlot`；导出 `exportSlot`（.json 下载）；导入 `importSaveText`（只解析校验，不落槽——写哪个槽玩家决定）。

### 4.2 自动存档时机表（M1 落地点，main.js 各处调 `autosave(this.gameState)`）

| # | 时机 | 锚点动作（先改 state 再存） |
|---|---|---|
| A1 | 章节胜利结算确认后（进缓冲剧情前） | `markChapterCleared` + `advanceTo({sceneId: next, chapterId: null})` |
| A2 | 剧情对话完一场、落定新锚点 | `advanceTo({sceneId})`（节流：同 sceneId 不重存） |
| A3 | 剧情事件触发「下一场战斗」时 | `advanceTo({chapterId})` |

约定（**关键设计决策，需用户确认**）：

- **只在剧情安全点自动存**，绝不战斗中途存——战败时的语义就变成「回到上一锚点重打本章」，天然免存档回滚逻辑；
- 战斗内所有运行时变更不落盘，**胜利那一刻才 `commitRuntimeUnit` + autosave**——战斗中刷新页面 = 本场白打（可以接受：一场战斗 3-5 分钟，比写回滚便宜太多）。

### 4.3 手动存档

- 入口：暂停菜单/存档界面（M1 新 UI，§8 T5）；
- 玩家选槽 1/2/3 覆盖写；显示 `listSlots()` 摘要（主角名/等级/章节进度/游玩时长/savedAt）。

### 4.4 读档语义

- 读档 = 整个 `gameState` 对象替换（main.js 重新初始化），从 `sceneId` 进剧情或 `chapterId` 直接开战；
- schema 校验 fail → 视为空槽（已有实现），UI 提示「存档损坏」。

---

## 5. 核心改造：持久化链路（M1 的主菜）

### 5.1 现状 → 目标链路图

```
【现状】                                   【M1 目标】
选主角                                     选主角
   │ buildGameState(route)                    │ createNewGame(route) ← service
   ▼                                          ▼
initBattle                                  this.gameState 常驻 main.js（唯一 owner）
   │ 内联模板造单位                           │
   │ createStash()（每场丢）                  ├─ 开战：getPartyUnit hydrate
   ▼                                          │        bs.stash = this.gameState.stash
战斗（运行时单位）                            ▼
   │                                       战斗（运行时单位，同现状）
   ▼                                          │ 结束（胜利确认）
胜利 → nextStory                            ├─ commitRuntimeUnit（全队写回 roster）
   ▼                                          ├─ markChapterCleared + advanceTo
initBattle（重建 ↓ 丢失）                     ├─ autosave
                                             ▼
                                          nextStory → 下一场 hydrate（↑ 继承）
```

### 5.2 挂接点清单（main.js 方法级，§8 按 T 编号引用）

| 挂接点 | main.js 位置 | 动作 |
|---|---|---|
| 开新档 | `onCharacterSelected`（现 `buildGameState`） | 换成 `createNewGame({route})`；把结果存为 `this.gameState` |
| 开战取兵 | `initBattle` 玩家侧 | `getPartyUnit(this.gameState, id)` 替换内联 spawn（两处玩家 spawn + 援军） |
| 开战取敌 | `initBattle` 敌方侧 | 直接用 `createEnemyUnit(enemyId, {instanceId,...})` 替换内联（敌方不入档，每次出厂） |
| 仓库共享 | `initBattle` `createStash()` 处（L363） | 删掉；`bs.stash = this.gameState.stash`（引用共享，见 §5.4） |
| 战斗结束 | `checkBattleEnd` 胜利分支（returnToStory 前） | 全队存活者 `commitRuntimeUnit`；`markChapterCleared`；`advanceTo`；`autosave` |
| 剧情推进 | `handleSceneTransition` | `advanceTo` + A2 时机 autosave |
| 入队 | 剧情事件（目前无） | `joinParty(state, unitId)`（§6.5） |
| 标题页 | title_flow | 「继续游戏」按钮 + 存档界面（新 UI） |

### 5.3 两个方案取舍：stash 引用共享 vs 深拷贝写回

| | 引用共享（推荐） | 深拷贝写回 |
|---|---|---|
| 做法 | `bs.stash = this.gameState.stash`，inventory_panel 的 deposit/withdraw 实时改的就是档 | 开战深拷贝仓库，战斗结束显式写回 |
| 代价 | 几乎零改动（panel 已支持） | 多一套 commit，且「战斗中途退出」需手动同步 |
| 风险 | 战斗中刷新会留下「半场仓库」状态（可接受，§4.2 已声明战斗中不保证） | 遗漏同步点 → 仓库回档 |

单位背包继续走「hydrate 深拷贝 + 战斗结束 commit」，**不为它做引用共享**——单位是战场状态的宿主（坐标/朝向在身上），共享引用会把战场字段漏进存档；仓库没有战场态，共享是安全的。

### 5.4 schema 3 变更集

1. `game_state.js`：`STATE_SCHEMA = 3`；`createNewGame` 产 `stash: createStash()`；`migrate`（save_manager）给缺 `stash` 的旧 blob 补一个空仓；
2. `ROSTER_FIELDS` 不变（inventory 早已在白名单内）；
3. 受影响自测：save_manager/game_state 现有用例改 schema 值；新增「legacy v2 档读入自动补仓」断言。

---

## 6. 各子系统对接规格

### 6.1 人物数值体系

- **来源**：CLASSES.base（十维）+ UNITS.personalGrowth（成长%）两层；面板基调=职业表，个人特色=personalGrowth/personalSkill（数据表注释已声明此原则）；
- **服务**：`computeBaseStats(classId)`、`createPlayerUnit`（growth.js，字段超集兼容现有 spawn，b1 加的 bio/quotes/themeColor 全在工厂里）；
- **UI 消费**：unit_detail 九维条读运行时 `u.stats`；交战演出读 `stats/currentHp`（不变）；
- **M1 动作**：仅 spawn 换工厂（§5.2 行 2-3）。**改装备换数值**：换装时重算 `stats`？——不重算：M1 沿用现状「stats 是职业基线」，武器加成在 combat 公式内查 WEAPONS 表（combat.js 现行做法），防具见 §6.6。

### 6.2 经验值与成长升级

- **曲线（已定案，用户拍板）**：击杀 `30+(敌等-我等)×10` 下限 10；参与 12；升级恒 100；满级 20；
- **服务**：`gainExp`（连锁升多级，返回 `gainsByLevel`）——战斗内已接；升级画面 `LevelUpModal` 已有；
- **M1 动作**：零改动战斗链路，只加 §5.2 的 commit（经验是运行时单位字段，commit 自动带上）；
- **测试要点**：下一场开局等级/经验数值 == 上一场结束时（断言见 §9）。

### 6.3 道具体系（私人背包 + 全队仓库）

- **模型**：`unit.inventory: [{id, count}]`（人各一份，ROSTER 已持久）；`gameState.stash: {items}`（全队共享中转站，存放=A→仓库，取=仓库→B）；
- **装备位**：`unit.equippedWeapon`（单件）；`equippedArmor` 字段已入白名单但**尚无数据与公式**（§6.6 裁定 M2）；
- **服务**：`stash.deposit/withdraw/summarizeItems`；inventory_panel（b6 已交付的操作组）零改动继续用；
- **M1 动作**：§5.2 行 3（stash 挂档）；掉落进包链路（settleLoot→unit.inventory 运行时）靠 commit 自动持久；
- **测试要点**：战斗 1 把「烤肠」存仓库 → 战斗 2 换人来取；刷新页面仍在（§9 场景 4）。

### 6.4 存档体系

规格本体在 §4；实现已在 save_manager 全绿。M1 动作 = §5.2 挂接 + T5 的 UI。

### 6.5 剧情进度与旗标（用户没点名但必须接，否则读档回不去）

- `sceneId`（锚）+ `flags`（分支/一次性事件）+ `clearedChapters`；
- `joinParty`：剧情事件入队——**当前 story_prologue 没有发入队事件**，M1 至少把管道接好（`handleSceneTransition` 里 `transition.joinUnit` 之类的字段约定），实际剧情在 M2 写内容时使用；
- 现有 `handleSceneTransition` 只按 `transition.battleId` 开战——M1 加 `advanceTo({chapterId})`（A3 时机）。

### 6.6 其他需要对接的（盘点 + 裁定，防 M1 范围蔓延）

| 项 | 裁定 | 理由 |
|---|---|---|
| 战败语义 | M1 实现＝「回上一锚点重打本章」（战败即不 commit、不存档） | 免存档回滚，成本最低 |
| 防具 equippedArmor | **M1 外**（M2）：数据表无条目、combat 无公式，接了也是空转 | 不给 M1 加死字段 |
| 单位永久死亡（FE 经典） | **M1 外**：本作基调轻松+队友会剧情强制在场 | 阵亡照常 commit（留 M2 讨论战败减员） |
| 求增援（reinforcements） | **M1 内**：chapters 表预留字段已有，走 `createPlayerUnit`（§5.2 行 2 覆盖） | spawn 统一工厂顺带解决 |
| 音量/画质设置 | M1 外：独立小任务（localStorage 单 key，不进 gameState） | 玩家偏好≠游戏进度 |
| 成就/图鉴 | M1 外 | 依赖 flags 管道，M2 排期 |
| 账号/云存档/防作弊 | 见 §7：save_manager 换实现即可，M1 不做 | 单机优先，先好玩 |

---

## 7. 本地服务层 vs 真服务器（未来路径，非 M1）

### 7.1 替换点已预埋

`createSaveManager(storageLike)` 的注入式设计（save_manager.js L66）意味着真实后端只需**一个文件**：写一个 `remote_save_manager`（同签名、Promise 化），`saveToSlot/loadSlot/listSlots/mostRecentSave` 改走 HTTP。**game_state / growth / stash / loot / UI 全部零改动**——因为它们从不感知存储介质。

### 7.2 架构建议（届时再拍板）

- 服务端只做**存档仓库**（CRUD + 账号），不做战斗校验：校验成本 >> 收益（单机付费制无经济系统）；
- 数据表（UNITS/chapters/…）不上服务器，除非出现「热更剧情/开运营活动」需求——触发条件出现时再议，现阶段内容热更无必要；
- Promise 化注意点：UI 侧只需在存/读档两个按钮上加 loading 态，其余流程已经同步设计好（读档=换 gameState 重进）。

---

## 8. M1 任务拆解（下一任务的开工清单，按依赖排序）

| # | 任务 | 改动文件 | 验收点 |
|---|---|---|---|
| T1 | schema 3：`createNewGame` 加 stash、migrate 补旧档 | game_state.js、save_manager.js、selftest | 自测：v2 旧档读入自动补空仓 |
| T2 | main.js 接管状态：`this.gameState = createNewGame(...)`；initBattle 三处 spawn 换工厂；stash 挂档 | main.js | 断链修复：两场连续战之间等级/经验/背包/仓库不变（§9 断言组） |
| T3 | 剧情链路：`handleSceneTransition` 加 `advanceTo`；A1/A2/A3 自动存时机 | main.js | 存档 sceneId/chapterId 正确推进 |
| T4 | 胜利链路：`checkBattleEnd` → commit 全队 → markChapterCleared → autosave | main.js | 两场战斗间数据保真 |
| T5 | 标题页「继续游戏」+ 存档界面 UI（读 `listSlots`/`mostRecentSave`，写 `saveToSlot`，含导出/导入） | title_screen.js（或新 save_menu 组件）、main.js | 手动存读档全流程可用 |
| T6 | 战败语义：不 commit、提示后回本章锚点重打 | main.js | 战败后属性/背包 = 战前值 |
| T7 | selftest 断言扩充（§9 全部三条断言组进 selftest_foundation.mjs） | selftest_foundation.mjs | 全绿 |
| T8 | 手动 QA 走 §9.2 场景表 | — | 8 场景过 |

改动面预估：main.js ~150 行、UI ~200 行、系统层 <30 行、自测 +100 行。**renderer / combat / grid / ai / 既有 UI 组件不动。**

---

## 9. 验收标准（「测通」的定义）

### 9.1 selftest 断言组（进 selftest_foundation.mjs）

1. **持久化组**：createNewGame → hydrate 两场战斗（T2 单元级）：Battle1 中 gainExp + settleLoot + 装备/存仓 → commit → Battle2 spawn 后逐字段比对（level/exp/stats/inventory/currentHp 等于 Battle1 结束值）；
2. **存档组**：save→load 往返逐字段相等（schema 3 含 stash）；v2 旧档 migrate 补仓；损坏 JSON → null；listSlots 序 `[auto,1,2,3]`；mostRecentSave 取 savedAt 最大；
3. **不回退组**：战败路径不 commit（mock checkBattleEnd 失败分支）。

### 9.2 手动 QA 场景表

| # | 场景 | 判定 |
|---|---|---|
| 1 | 新档 → 第一战 → 升 1 级 → 下一战开局还是那个等级 | 跨战保真 |
| 2 | 第一战捡「烤肠」存仓库 → 刷新页面 → 继续 → 仓库还在 | 落盘保真 |
| 3 | 换人来取烤肠 → 出战单位面包显示正确 | 仓库流转 |
| 4 | 存档一存档 → 刷新 → 主页「继续游戏」直达存档点 | 读档链路 |
| 5 | 战斗中途刷新 → 回上一锚点重打，无脏状态 | 战败/中断语义 |
| 6 | 导出 .json → 删除槽 → 导入回去 → 成功读 | 备份闭环 |
| 7 | 男/女两条线各一档并存，切换读档 roster 不串 | 双线路隔离 |
| 8 | 全部 8 个挂接点打点 console 一遍，无「本场重建」 | 链路确认 |

### 9.3 门槛

selftest 345 存量断言 + 新增断言**全绿**；8 个 QA 场景全过；`git tag m1-service-integration`。

---

## 10. M1 完成后：进入「只写内容」模式

### 10.1 冻结清单（M1 后不再改动）

`src/systems/`（七件服务全冻结）、main.js 状态机与 8 个挂接点、renderer 快照通道、既有 UI 组件。后续需求只在数据层加内容。

### 10.2 加内容 = 只改 `src/data/`

| 想加什么 | 做法 | 不需要做的 |
|---|---|---|
| 新人物（可入队） | UNITS 加条目（含 portrait/quotes/personalGrowth），剧情脚本 joinParty | 不改 spawn/存档/UI |
| 新敌人 | ENEMIES 加条目（含 ai/drops） | 不改 AI/战斗判定 |
| 新章节/战斗 | chapters 新建文件 + story transition 指向它 | spawn/持久化全自动 |
| 新道具 | goods 加条目（category/usage 驱动面板操作组，b6 起 UI 语义化） | 不改 inventory_panel |
| 新职业 | CLASSES 加条目 | 数值工厂自动生效 |

**这就是 M1 的最终目标**：程序逻辑一次测通、整体冻结；之后的开发工作量全部转移到策划内容（写剧情、写人物、排战斗），不产生基础逻辑的返工试错。

---

## 附录 A：现有服务 API 一览（供 M1 实施时速查）

| 类别 | 函数 | 用途 |
|---|---|---|
| 进度 | `createNewGame / joinParty / serializeUnit / hydrateUnit / getPartyUnit / commitRuntimeUnit / setFlag / getFlag / markChapterCleared / advanceTo / tickPlaytime / summarizeState / isInParty` | 主链路 |
| 存档 | `createSaveManager → { saveToSlot / autosave / loadSlot / deleteSlot / listSlots / mostRecentSave / hasAnySave / exportSlot / importSaveText / clearAll }` | 全部实现 |
| 成长 | `gainExp / expForKill / expForAction / rollLevelUp / applyLevelUp / expToNext / computeBaseStats / createPlayerUnit / createEnemyUnit` | 战斗内已接前 3 个消费 |
| 掉落 | `settleLoot / rollDrops / grantItems / summarizeLoots` | 战斗内已接 |
| 仓库 | `deposit / withdraw / createStash / summarizeItems / stashSummary / countItem / moveItems` | 战斗内已接 |
| 战斗/寻路/AI | combat/grid/ai 现行即用即弃 | 不在 M1 范围 |

## 附录 B：M1 待用户拍板决策点

| # | 决策 | 文档默认方案 |
|---|---|---|
| D1 | 战败/中断语义 | 战斗中不落盘，回上一锚点重打（§4.2） |
| D2 | 单位阵亡是否永久退场 | M1 不退场，照常 commit（§6.6） |
| D3 | stash 引用共享 vs 拷贝写回 | 引用共享（§5.3） |
| D4 | schema key 是否换 | 沿用 `fx_save_v2_` 前缀，blob.schema 自校验（§4.1） |
| D5 | 继续游戏入口 | 标题页新增按钮 + 独立存档界面（§8 T5） |
