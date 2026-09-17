# 音频配乐规范（BGM / SFX 选曲规则与素材池）

> 目的：把「配乐」从**每章临场发挥**变成**查表即用**。未来剧本写到多长，配乐只做一件事——判断场景情绪 → 取对应槽位的默认曲（需要变化时从备选池换）。
> 配套文件：
> - 素材库台账：[docs/music_pool/MANIFEST.md](music_pool/MANIFEST.md)
> - 授权登记：`data/credits.js`
> - 播放引擎：`src/engine/sound.js`（已支持 `.ogg` / `.mp3` / `.wav` 多格式自动探测）

---

## 1. 核心概念：情绪槽位（Slot）

一个「槽位」= 一种稳定的情绪/功能语义。**场景是无限的，情绪是有限的**——这就是一劳永逸的关键：把无限的新场景，收敛到有限的槽位上。

写剧本配乐只做两步：

1. 判断这段剧情的**情绪**（日常 / 悬疑 / 诡异 / 战斗 / 胜利 …）。
2. 在 [§2 槽位总表](#2-bgm-槽位总表查表核心) 里对号入座，填 `bgm: 'bgm_xxx'` 即可。

槽位默认曲**允许无限重复**（听感一致、零维护）。只有两种情况下才去备选池换：
- 同一章节内**同一槽位连续出现多个场景**，想避免听觉疲劳；
- 某个**高潮 / 特殊时刻**想用专属变体。

---

## 2. BGM 槽位总表（查表核心）

| # | 槽位 | 情绪 | 现有文件 | 典型场景 | 未来可覆盖 |
|---|------|------|----------|----------|------------|
| 1 | **TITLE** | 主题 / 片头 | `bgm_title` | 标题画面 | 标题、OP 动画 |
| 2 | **CALM** | 平静 / 日常 | `bgm_classroom` | 教室、家、操场日常、温馨对话 | 食堂、图书馆、放学 |
| 3 | **STREET** | 轻悬疑 / 探查 | `bgm_street` | 校外街道、流动商贩、街角探查 | 夜市、巷子 |
| 4 | **SUSPENSE** | 重悬疑 / 压抑 | `bgm_suspense` | 全校大会、猜疑、异常迹象、加测前 | 审讯、对峙、伏笔 |
| 5 | **EERIE** | 诡异 / 恐怖 / 反转 | `bgm_eerie_revelation` | 异变爆发、眼睛变青、夜晚密会、黑影 | 心魔、梦境、真相揭露 |
| 6 | **BATTLE** | 常规战斗 | `bgm_battle_normal` | 普通遭遇战 | 杂兵战、竞技 |
| 7 | **BOSS** | Boss 战 | `bgm_battle_boss` | 关键强敌、心魔战 | 最终 Boss、宿敌 |
| 8 | **VICTORY** | 胜利 / 结算 | `bgm_victory` | 战斗胜利、章节完结 | 通关、结算 |

**扩展槽位**（当前未接，未来做「地图探索 / 城镇闲逛」时直接启用，无需再想）：

| 槽位 | 情绪 | 备选池 |
|------|------|--------|
| **EXPLORE** | 探索 / 行进 | `jrpg_pack1_exploration`（6 首） |
| **TOWN** | 城镇 / 闲逛 | `jrpg_pack2_towns`（4 首） |

> 槽位语义是「情绪」，不是「地点名」。例如未来新增「食堂」场景，它不叫 `bgm_canteen`，而是判断情绪为「平静日常」→ 用 `bgm_classroom`（CALM）。这样地点再多，槽位也不用增加。

---

## 3. BGM 素材池（按槽位，✅=已入项目）

> 完整原始素材在 `docs/music_pool/unpacked/`。下表只列「槽位 → 可选曲」，方便直接从池子里换。

### 1) TITLE 主题
- ✅ `bgm_title` ← `00_singles/jrpg_theme.ogg`
- 备选：`12_music_loops/379 bgm_menu_title_1_relaxed.ogg`、`384 bgm_menu_title_6_sporty.ogg`、`5_action_chiptunes/Title Screen.wav`

### 2) CALM 平静日常
- ✅ `bgm_classroom` ← 外部 `Exploring Town`（CC-BY，须署名）
- 备选池（`jrpg_pack4_calm`，全 ogg）：`Peaceful Days`、`A Place I Call Home`、`Innocence`、`Summer Memories`、`Sand Castles`、`Childhood Friends`

### 3) STREET 轻悬疑 / 探查
- ✅ `bgm_street` ← `5_action_chiptunes/Level 1`（CC0）
- 备选：`12_music_loops/399 bgm_storytime.ogg`、`jrpg_pack1_exploration/Exploration5 Sneaking Around.ogg`

### 4) SUSPENSE 重悬疑 / 压抑
- ✅ `bgm_suspense` ← 外部 `Spooky Dungeon`（CC-BY，须署名）
- 备选池（`jrpg_pack3_evil`）：`Evil5 Whispers From Beyond`、`Evil2 Catacombs`

### 5) EERIE 诡异 / 恐怖 / 反转
- ✅ `bgm_eerie_revelation` ← `jrpg_pack3_evil/Evil1 Ancient Evil Awakens`（CC0）
- 备选池（`jrpg_pack3_evil`）：`Evil3 Apocalypse`、`Evil4 Witch's Lair`、`Evil2 Catacombs`
- 备选：`00_singles/horror_atmosphere.ogg`（**前导空白过长，用前需裁剪**）

### 6) BATTLE 常规战斗
- ✅ `bgm_battle_normal` ← `5_action_chiptunes/Level 2`（CC0）
- 备选池：`jrpg_pack5_action`（`Encounter With The Witches` / `Army Approaching` / `Preparing For Battle`）、`5_action_chiptunes/Level 1 / Level 3`、`chiptunes_adventure_ogg/Stage 1 / Stage 2`

### 7) BOSS Boss 战
- ✅ `bgm_battle_boss` ← `chiptunes_adventure_ogg/3. Boss Fight`（CC0，偏诡异）
- 备选池：`00_singles/boss_battle.wav`（史诗，wav 需转 ogg/mp3）、`12_music_loops/373 bgm_gojira_battle_A.ogg`、`316 bgm_dangerous_encounter_A.ogg`

### 8) VICTORY 胜利 / 结算
- ✅ `bgm_victory` ← 原创 Victory Fanfare（随项目 CC0）
- 备选：`5_action_chiptunes/Ending.wav`、`512_sound_effects/Fanfares/sfx_sounds_fanfare*.wav`

---

## 4. BGM 选曲规则（硬规则）

1. **默认复用**：同一槽位永远先用「✅ 默认曲」，不做无谓替换。
2. **换曲需理由**：仅当「同章连续同槽位」或「高潮专属」时，才从备选池换；换完记得在 `data/credits.js` 补登记。
3. **Boss 与高潮专属**：`BOSS` 槽位（`bgm_battle_boss`）只给关键强敌 / 心魔 / 宿敌，普通杂兵战一律用 `BATTLE`。
4. **惊悚节点靠「骤停」**：剧情里「BGM 停 + sting」比换歌更有冲击力（见 [§5](#5-sfx-节点规范) 的 `shock_sting`），不必为每个反转新写一首。
5. **章节主题情绪**：每章可有一个主导情绪（例：第三章=「猜疑」），该章相关场景优先用对应槽位，其余槽位按需复用。
6. **授权纪律**：CC0 免署名；CC-BY 必须在 credits 署名。新曲入项目前先看 `data/credits.js` 现有登记，不要用来源不明的 MIDI/免费站曲目。

---

## 5. SFX 节点规范

SFX 按「触发语义」分类，写剧本时在 `line.sfx` 里填固定音效名即可（`src/engine/sound.js` 自动探测扩展名）。

| 语义 | 音效名 | 触发场景 |
|------|--------|----------|
| 对话打字机 | `sfx_text_blip` | 每句对白逐字播放 |
| 光标移动 | `sfx_cursor` | 菜单/格子光标移动 |
| 确认 | `sfx_confirm` | 确认、选择、进入 |
| 取消/返回 | `sfx_cancel` | 取消、关闭、Esc |
| 菜单打开 | `sfx_menu_open` | 打开行动/道具/存档菜单 |
| 脚步 | `sfx_step` | 单位移动、行走 |
| 攻击挥击 | `sfx_attack_swing` | 发起攻击动作 |
| 普通命中 | `sfx_hit_normal` | 命中反馈 |
| 暴击 | `sfx_hit_crit` | 暴击反馈 |
| 未命中 | `sfx_miss` | 闪避/Miss |
| 道具获得 | `sfx_item_get` | 拾取、掉落、物证到手 |
| 道具使用 | `sfx_item_use` | 使用道具 |
| 升级 | `sfx_level_up` | 升级 |
| 单位倒下 | `sfx_unit_down` | 敌人被击倒 |
| 手机消息 | `sfx_phone_msg` | 来消息、线索推送 |
| 惊悚 sting | `sfx_shock_sting` | 异变瞬间、反转、BGM 骤停后 |
| 胜利号角 | `sfx_fanfare` | 成绩公布、阶段达成、好消息 |
| 悬疑氛围 | `sfx_suspense` | 深夜、死寂、压抑氛围铺垫 |

**使用纪律**：
- `sfx_text_blip` 是对话默认音，绝大多数对白都用它；`shock_sting` 只在「反转 / 异变 / 惊吓」时刻用，滥用了会失去冲击力。
- `sfx_suspense` / `sfx_fanfare` 是「氛围 / 号角」类，用在场景开场或关键节点，不叠在逐字对白上。

**SFX 素材池**：`512_sound_effects`（512 个 8-bit wav，按 `General Sounds / Movement / Weapons / Explosions / Death Screams` 分类）。未来要加新 SFX，从对应分类选，命名 `sfx_<语义>`，复制到 `assets/audio/sfx/`，再补 `credits.js`。

---

## 6. 命名与文件规范

- **BGM**：`bgm_<槽位语义>`，例 `bgm_battle_boss`、`bgm_eerie_revelation`。
- **SFX**：`sfx_<语义>`，例 `sfx_confirm`、`sfx_shock_sting`。
- **存放**：BGM → `assets/audio/bgm/`；SFX → `assets/audio/sfx/`。
- **格式**：BGM 优先 **ogg**（无缝循环、体积小）；SFX 短音效可用 **wav** 或 **mp3**。引擎 `sound.js` 会按 `.ogg → .mp3 → .wav` 顺序自动探测，**无需手动转格式**。
- **引用**：剧情 `scene.bgm` / `line.bgm` / `line.sfx` 里**只填不带扩展名的名字**（如 `bgm_classroom`、`sfx_text_blip`），引擎自动补扩展名。

---

## 7. 新素材入池流程（一劳永逸的关键）

以后每次「拿到新音乐素材」，按固定流程走，不再重新琢磨：

1. **入库**：下载 → 解压到 `docs/music_pool/unpacked/<包名>/` → 在 `MANIFEST.md` 补一行（作者 / 协议 / 来源 URL / 用途）。
2. **归类**：按情绪把新曲归入 [§2 槽位](#2-bgm-槽位总表查表核心) 的「备选池」（写进对应槽位）。
3. **入项目（如需直接使用）**：复制到 `assets/audio/bgm/` 或 `sfx/`，命名 `bgm_<语义>` / `sfx_<语义>`，在 `data/credits.js` 补登记。
4. **写剧本**：查 [§2 表](#2-bgm-槽位总表查表核心) 填 `bgm` / `sfx`。

> 一句话：**新场景先归情绪槽位，新曲子先进备选池，用到的才进 `assets/audio/` 并登记**。池子负责「有什么可选」，槽位负责「该选哪个」。

---

## 8. 速查表（写剧本时贴在手边）

| 剧情情绪 | 填 `bgm` | 填 `sfx`（关键节点） |
|----------|----------|----------------------|
| 标题/片头 | `bgm_title` | — |
| 日常对话/温馨 | `bgm_classroom` | `sfx_text_blip` |
| 街道/探查 | `bgm_street` | `sfx_text_blip` |
| 压抑/猜疑/大会 | `bgm_suspense` | `sfx_suspense` / `sfx_shock_sting` |
| 异变/反转/夜晚 | `bgm_eerie_revelation` | `sfx_shock_sting` |
| 常规战斗 | `bgm_battle_normal` | `sfx_attack_swing` / `sfx_hit_*` / `sfx_unit_down` |
| Boss/心魔战 | `bgm_battle_boss` | 同上 + `sfx_shock_sting` |
| 胜利/好消息/成绩 | `bgm_victory` | `sfx_fanfare` |
| 拾取/物证到手 | 沿用当前场景 BGM | `sfx_item_get` |
| 手机来消息 | 沿用当前场景 BGM | `sfx_phone_msg` |
