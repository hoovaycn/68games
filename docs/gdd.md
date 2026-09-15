# 《六 8 班异闻录》游戏设计文档（GDD）

> 版本 v0.4・2026-09-15・游戏名暂定，可改（v0.4 新增武器系统、对话写作规范、现成美术资源选型、音乐方案）
> 本 GDD 承接 
>
> `architecture.md`
>
> （工程层），本文档负责
>
> **内容与体验层**
>
> ：故事、角色、敌人、序章脚本、演出、美术与提示词库。
> 标注【代定】的项是我作为设计师的补充设计，可随时改。



***

## 1. 定位与设计支柱



| 项       | 内容                          |
| ------- | --------------------------- |
| 游戏名（暂定） | 《六 8 班异闻录》                  |
| 类型      | 剧情驱动 SRPG + 轻自由探索           |
| 核心幻想    | 小学生用文具与知识，对抗 "诱惑童年" 的神秘力量   |
| 目标情绪    | 悬疑 → 紧张 → 温暖（守护同学与童年）       |
| 游戏节奏    | 探索（自由活动 + 对话）↔ 战斗（FE 回合制）交替 |
| 单局时长    | 序章约 40–60 分钟 / 章            |

**设计支柱**（所有后续决策的依据）：



1. **悬疑先行**：信息分层披露，第一章只给 "反常"，不给 "答案"

2. **FE 式决策**：数值可见、风险可读、每回合有选择

3. **双线复玩**：男女主视角互补、线索互证，二周目有新鲜感

4. **反差恐怖**：用小学生最日常的东西（作业、零食、自习）变怪来制造氛围

5. **主题克制**：不喊口号，用故事传递 "别让学习吞噬童年"

## 2. 角色档案

### 主角

**张子骁【男主】**



| 项      | 内容                          |
| ------ | --------------------------- |
| 身份     | 人大附小六 8 班男生，正在努力练字（个人支线：书法） |
| 形象     | 寸头，圆脸但不胖（普通匀称体型），蓝色系      |
| 性格     | 讲义气、嘴贫、心里戏多，关键时刻靠得住         |
| 玩法【代定】 | 近战输出型，初始武器 = 新手铅笔，后续专属 = 练字毛笔；力量 / HP 成长高 |
| 台词风格   | 少年气旁白多 ——**心理活动是悬疑感的主要载体**  |

**石予诺【女主】**



| 项      | 内容                                 |
| ------ | ---------------------------------- |
| 身份     | 人大附小六 8 班女生，正在努力背单词（个人支线：英语）       |
| 形象     | 马尾辫，美丽女生，粉色系                       |
| 性格     | 细心、温柔但果敢，有点小洁癖                     |
| 玩法【代定】 | 均衡 / 远程型，初始武器 = 新手铅笔，后续专属 = 英语单词卡（投掷）；技巧 / 速度成长高 |
| 台词风格   | 细腻观察、善抓细节 ——**天然线索位**              |

### 教师

**徐老师【班主任】**



| 项      | 内容                                              |
| ------ | ----------------------------------------------- |
| 身份     | 班主任，北京市优秀班主任；学生都有点怕她                            |
| 形象（用户已拍板） | 30 岁上下御姐型女教师：黑发低盘髻、几缕碎发，细框眼镜，白衬衫 + 深灰西装，常握保温杯，深灰蓝系；成熟干练、不怒自威 |
| 性格     | 强势严厉，但职业敏感极强                                    |
| 定位     | 序章引路人；**伏笔**：她其实早已注意到异象（优秀班主任的直觉）；后续章节可成为强力支援单位 |

### 第一章失踪者（异变者）

**范文默【男线】**



| 项    | 内容                           |
| ---- | ---------------------------- |
| 身份   | 六 8 班男生                      |
| 形象   | 黑瘦小个，接近光头的黑色寸头，古灵精怪；蓝白运动校服（正常/异变同服装） |
| 性格   | 平时是 "皮猴子"，机灵爱玩，最讨厌作业         |
| 反差钩子 | **最不爱学习的人突然疯狂学高中理化** → 诡异感拉满 |
| 异变特征 | 黑眼圈、语速快、眼神直勾勾、笑得太用力          |

**何妍熹【女线】**



| 项    | 内容                         |
| ---- | -------------------------- |
| 身份   | 六 8 班女生                    |
| 形象   | 特别漂亮的女生，马尾辫，桃红色系，热情活泼      |
| 性格   | 平时爱笑爱闹、人缘好                 |
| 反差钩子 | **最活泼的人突然沉默，只背单词** → 诡异感拉满 |
| 异变特征 | 机械重复背单词、对社交无反应、偶尔冒出 "它们"   |

### 线索角色（后续可入队）

**张瀚瑜【男线】**：瘦小大脑门男生，绿色系。话多胆小、消息灵通（班级情报站）。

**陈品璇【女线】**：高大强壮女生，橙色系。豪爽有保护欲、体育好。

## 3. 故事与世界（悬疑分层）

### 3.1 核心谜团（分层披露，绝不一口气讲完）



| 层  | 玩家知道什么                     | 披露时机       |
| -- | -------------------------- | ---------- |
| 表层 | 同学突然 "反常地爱学习"，行为怪异         | 第一章        |
| 中层 | 与校外可疑人有关（摊贩 / 混混），存在 "媒介物" | 第一章末 → 第二章 |
| 深层 | 魔物真身、为何选中六 8 班、幕后是谁        | 预留，等用户扩展   |

### 3.2 主题设定（预留方向）

魔物不直接现身，而是 \*\*"诱惑"\*\*—— 利用小学生的上进心与比较心，让他们走火入魔、脱离正常童年。第一章所有 "异常" 都指向这个主题，但不点破。

### 3.3 世界观细节



* 现代北京・人大附小・六 8 班（用户设定）

* 异变从 "校门口" 开始蔓延（第一章边界）

* 媒介物【代定】：**可疑零食**—— 被诱惑者会收到 / 吃掉摊贩给的 "三无零食"。第一章末特写伏笔。

## 4. 序章完整设计

### 4.1 男性线《小默同学》

**节奏表：**



| 节拍     | 地点       | 内容                                            | 教学点                 |
| ------ | -------- | --------------------------------------------- | ------------------- |
| 1 开场   | 教室（自由活动） | 早读点名，范文默缺席；徐老师神色异常                            | 自由活动教学              |
| 2 接任务  | 教室       | 徐老师私下给张子骁看 "奇怪消息"，委托他去范文默家看看                  | 对话系统教学              |
| 3 线索   | 走廊       | 与张瀚瑜对话：昨晚校门口神秘摊贩 + 范文默说胡话                     | 线索收集                |
| 4 出发   | 校门       | 心理活动 + 出校门转场（安全区→危险区）                         | 区域概念教学              |
| 5 战斗 1 | 街道       | 明雷遇敌：可疑流动商贩（垃圾食品车）；**击败后 100% 掉落【烤肠】**        | 移动 / 攻击教学 + 掉落教学    |
| 6 战斗 2 | 街道       | 明雷遇敌：高年级混混堵路；战前教学使用烤肠回血；**击败后 100% 掉落【混蛋汽水】** | 地形 / 道具使用 / HP 危险教学 |
| 7 反转   | 范文默家     | 门虚掩，屋内堆满高中辅导书；范文默疯狂学物理化学，眼神不对                 | 剧情高潮                |
| 8 悬念   | 范文默家     | 范文默说漏嘴 "它们不让说"；桌上可疑零食特写；第一章完                  | 钩子                  |

**徐老师收到的 "奇怪消息"（我编的）：**

> 徐老师您好，我是范小默爸爸。这孩子今晚特别不对劲，非要我给他报高三的网课，我说他听不懂，他就哭着说 "来不及了，它们要来了"。我问他 "它们" 是谁，他又不说了，光在那翻初中物理书。这孩子最近总说胡话，明天我先让他缓一天，就不送他去学校了，跟您说一声。—— 范小默爸爸 22:47

（设计意图：爸爸用最普通的语气描述最异常的事，越正常越诡异。）

**张子骁心理活动（旁白样例）：**



* "徐老师居然把家长的消息给我看？她平时可是 ' 大人的事小孩别管 ' 那一派的…… 不对，不对劲。"

* "小默？就他？他连数学作业都是抄我的，他会主动学高三物理？"

* "他说 ' 来不及了 '…… 什么来不及了？"

**与张瀚瑜对话（我编的）：**

> 张瀚瑜："子骁子骁！你听说没！范小默今天没来！他爸昨晚在群里发的消息我看了三遍，后背到现在都是凉的……"
> 张子骁："你至于吗，他不就是请个假。"
> 张瀚瑜："不是请假！是 ' 它们 '！他说 ' 它们要来了 '！你想想，咱班谁会说这种话？"
> 张子骁："…… 你小点声。"
> 张瀚瑜："还有更邪门的！昨天放学，我看见他在校门口跟一个推小车的大叔说话，那大叔笑得跟假人似的，还给了小默一包花花绿绿的零食。小默平时最讨厌那种三无零食，你知道的吧？可他接了！"
> 张子骁："……"
> 张瀚瑜："他还跟我说 ' 下周就要中考了 '。子骁，咱才六年级啊。"

**反转段（范文默家）设计：**



* 屋内：客厅地上堆满辅导书（函数、电磁学、化学方程式），草稿纸从桌上铺到门口

* 范文默背对门，戴着耳机，念念有词："…… 动量守恒…… 等效电阻……"

* 转头：黑眼圈，眼神直勾勾的，却笑得很开心："子骁！你来得正好！帮我看看这道双缝干涉！我算了一晚上，光的路程差我总觉得不对！"

* 张子骁："…… 小默？你…… 昨天不是还在抄我数学作业吗？"

* 范文默（语速飞快）："那是昨天！我今天不一样了！我找到学习的意义了！只要把这些都学完，我就能 ——"（突然卡住，眼神闪躲）"…… 不能说，它们不让说。"

* 桌上：一包没拆封的、花花绿绿的零食（特写，配诡异音效）

* 张子骁心理活动："…… 他说 ' 它们 '。小默平时最恨作业。这包零食…… 和瀚瑜说的一样。"

* 章末演出：夜色，范文默家的灯亮着，屋里传来背书声，越来越快，越来越响……"第一章 完"

### 4.2 女性线《小熹同学》

与男线完全镜像（共用骨架与战斗，替换角色 / 台词 / 线索）：

**奇怪消息（我编的）：**

> 徐老师您好，我是妍熹妈妈。妍熹昨晚有点吓人，一直说有个声音让她背单词，背到凌晨三点还不肯睡，我关灯她就哭，说 "外面有脏东西"…… 今天早上她说什么都不肯出门，把自己锁在屋里背单词。我跟您请个假，这孩子我总觉得不对劲。—— 何妍熹妈妈 23:12

**与陈品璇对话（我编的）：**

> 陈品璇："予诺，何妍熹今天没来！她妈妈昨晚在群里发消息你看了没？什么 ' 有声音让她背单词 '，也太吓人了！"
> 石予诺："…… 你小点声，别让徐老师听见。"
> 陈品璇："还有！昨天体育课，她一个人蹲在角落翻单词本，我叫她她都不理我。她平时看见我就叽叽喳喳的！予诺，我觉得她不是病了…… 是撞邪了！"

**反转段镜像：** 何妍熹屋里贴满单词便利贴（从天花板到地板），疯狂背 GRE 词汇 ——"小学生背 GRE" 本身就是最扎眼的异常。她机械地重复拼写，偶尔说漏嘴 "它们不让说"。

### 4.3 双线差异与复玩价值



| 维度   | 男线                | 女线                |
| ---- | ----------------- | ----------------- |
| 情感内核 | 兄弟情（子骁 × 小默 × 瀚瑜） | 闺蜜情（予诺 × 小熹 × 品璇） |
| 玩法   | 毛笔近战              | 单词卡远程             |
| 线索侧重 | 视觉线索：媒介物 "零食" 外观  | 听觉线索：魔物会 "说话"     |
| 独有信息 | 摊贩送零食（媒介物）        | 魔物用声音诱惑（感官）       |

→ 两线信息拼合才得完整谜团 → 天然二周目价值

## 5. 敌人设计（第一章）



| 敌人     | 外观                         | 攻击方式                  | 战斗定位         | 难度 | 叙事身份              | 掉落         |
| ------ | -------------------------- | --------------------- | ------------ | -- | ----------------- | ---------- |
| 可疑流动商贩 | 推着花花绿绿的零食车，面色青白，笑得太假       | 投掷 "可疑零食"（远程）/ 车撞（近战） | 远程怪，HP 低，移动慢 | ★  | 魔物媒介的散播者          | 100%【烤肠】   |
| 高年级混混  | 校服敞开，头发染过，叼着棒棒糖，攥着练习册卷成的棒子 | 近战猛攻，攻速快可能追击          | 近战怪，攻高防低     | ★★ | 被 "升学焦虑" 侵蚀的高年级学生 | 100%【混蛋汽水】 |

**教学安排：** 战斗 1 教 "移动→攻击→回合"；战斗 2 教 "地形回避、道具使用、HP 危险判断"。

**AI 参数：** 商贩守车不追（教玩家主动出击）；混混主动追击（教玩家利用地形走位）。

## 6. 玩法系统规格（承接架构文档）

### 6.1 自由活动



* 场景：教室（安全区）/ 走廊 / 校门 / 街道（危险区）/ 同学家

* 操作：方向键 / WASD 移动 + 交互键（空格 / 回车 / 触屏点按）

* NPC 交互：头顶气泡提示 → 靠近交互 → 对话演出

### 6.2 明雷遇敌



* 敌人以像素小人显示在地图，带警戒圈与巡逻路径

* 进入警戒圈 → 敌人追击；接触 → 进战斗；可绕行 / 逃跑

* 敌人可见强度标识；第一章允许绕开混混（给玩家选择权）

### 6.3 对话演出



* 布局：半身立绘（左 / 右站位）+ 底部对话框 + 名字标签 + 头像小框 + 打字机

* 说话方立绘高亮 / 上下浮动；情绪变化切换立绘表情

* 每个关键角色至少出 **2 套表情**（默认 / 惊讶、担心、笑、异变按角色裁剪）

* 关键时刻：全屏演出（特写、音效、画面抖动）

### 6.4 战斗接入



* 明雷接触 → 战斗地图（棋盘）→ FE 回合制 → 胜利（经验 / 掉落）→ 返回探索

* 失败：序章设计为 "回安全区重新出发"（教学友好）；正式战斗失败 = Game Over 读档

### 6.5 数值初值（承接架构文档 FE 公式）



* 张子骁：力高、HP 中、速中 → 稳定近战输出

* 石予诺：速高、技高、力中 → 高速追击手

* 商贩：HP 低、远程、移动慢；混混：攻高、防低、会追击

### 6.6 道具系统（P0 简单版）

**设计目标：** 先做最小闭环 **"击败掉落 → 背包持有 → 战斗 / 探索使用 → 数值生效"**；P0 不做商店、不做装备、不做合成。

**道具分类（P0 只用前两类）：**



| 类型                       | 说明                    | 阶段   |
| ------------------------ | --------------------- | ---- |
| 消耗品 consumable           | 使用后消失，恢复 / 临时增益       | P0 ✅ |
| 关键道具 key\_item           | 剧情道具，不可使用、不可丢弃（如可疑零食） | P0 ✅ |
| 武器 weapon / 装备 equipment | 毛笔、单词卡等               | P1   |
| 商店 / 合成                  | 金币购买、配方合成             | P2   |

**序章道具（数值为设计初值，可调）：**



| 道具   | 来源              | 类型   | 效果                           | 战术定位           |
| ---- | --------------- | ---- | ---------------------------- | -------------- |
| 烤肠   | 击败流动商贩 100% 掉落  | 消耗品  | 恢复 12 HP                     | 大血包，战斗 2 前教学使用 |
| 混蛋汽水 | 击败高年级混混 100% 掉落 | 消耗品  | 恢复 6 HP，本回合攻速 + 3（利于追击 / 逃跑） | 小血 + 机动增益      |
| 可疑零食 | 第一章末剧情获得        | 关键道具 | 不可使用，悬疑伏笔                    | 与普通零食形成对照      |

**掉落规则：**



* 敌人数据配置 `drops: [{item, chance}]`；敌人被击败时按 chance 结算；序章两个敌人 chance=1.0（必掉，教学需要）

* 掉落时机：战斗结算时弹出 "获得道具" 提示并入背包（P0 不在棋盘上掉实体，减少工程量）

**背包与使用规则：**



* 背包：简单堆叠，同类道具计数；序章不设容量上限（P0）

* 战斗中：单位行动菜单 → 道具 → 选择目标（自己 / 相邻队友）→ 使用，**消耗该单位本回合行动**

* 自由活动：菜单 → 背包 → 使用恢复

* 数值边界：恢复量不超过 HP 上限；临时增益（如汽水攻速 + 3）在本回合结束时清除

**数据结构&#x20;**`data/items.js`**：**



```
{

&#x20; "id": "sausage",

&#x20; "name": "烤肠",

&#x20; "type": "consumable",

&#x20; "desc": "路边摊的烤肠，油乎乎的但很顶饱。使用恢复 12 HP。",

&#x20; "effects": \[{ "stat": "hp", "value": 12 }],

&#x20; "use\_in\_battle": true,

&#x20; "use\_in\_field": true,

&#x20; "stack": 9

}
```



```
{

&#x20; "id": "bastard\_soda",

&#x20; "name": "混蛋汽水",

&#x20; "type": "consumable",

&#x20; "desc": "气特别足的杂牌汽水。恢复 6 HP，本回合攻速+3。",

&#x20; "effects": \[

&#x20;   { "stat": "hp", "value": 6 },

&#x20;   { "stat": "spd", "value": 3, "duration": "turn" }

&#x20; ],

&#x20; "use\_in\_battle": true,

&#x20; "use\_in\_field": true,

&#x20; "stack": 9

}
```

敌人掉落配置（写在敌人数据里）：



```
"drops": \[{ "item": "sausage", "chance": 1.0 }]        // 流动商贩

"drops": \[{ "item": "bastard\_soda", "chance": 1.0 }]   // 高年级混混
```

**序章教学闭环：**

战斗 1 击败商贩 → 获得烤肠（教学：道具入背包）→ 战斗 2 混混攻击较痛，系统提示 "HP 不足，试试用烤肠" → 教学使用道具 → 击败混混 → 获得混蛋汽水 → 道具系统教学完成。

**叙事对照（设计意图）：** 烤肠 / 混蛋汽水是 "普通垃圾食品"（能用、补体力），"可疑零食" 是魔物媒介（不能吃、诡异）—— 同样是校门口的零食，玩家会自然产生 "差在哪" 的疑问，悬疑伏笔直接藏在道具栏里。

### 6.7 武器系统（P0 简单版）

**设计目标：** P0 只做 “装备 1 把武器 → 进战斗公式”，不做耐久、商店、战斗中切换（P1）。

**武器字段：** 名称 / 类型（近战·远程）/ 威力 / 命中 / 必杀 / 射程 / 重量。

**初始武器【新手铅笔】（双主角通用，用户设定）：**

| 项 | 值 |
| --- | --- |
| 类型 | 近战 |
| 威力 | 4 |
| 命中 | 95 |
| 必杀 | 0 |
| 射程 | 1 |
| 重量 | 1 |
| 描述 | 用得只剩半截的铅笔，橡皮头都磨平了，虽然朴素但趁手 |

* P0 无限使用（不做武器耐久）；直接代入伤害公式：物理伤害 = 力量 + 4 − 敌方防御

* 两位主角开局都装备新手铅笔，保证第一场教学战数值一致

**武器路线规划（现代校园主题，P1+）：**

| 角色 | 初始 | 专属进阶 | 风格 |
| --- | --- | --- | --- |
| 张子骁 | 新手铅笔 | 练字毛笔 | 近战高力 |
| 石予诺 | 新手铅笔 | 英语单词卡（远程 1–2 格） | 高速技巧 |
| 敌人 | — | 可疑零食（投掷）、练习册卷棒（近战） | 魔物风格 |

后续扩展池：直尺、圆规、橡皮、水壶、跳绳…… 全部来自小学生书包，保持 “现代日常武器化” 的统一趣味。

**数据：** `data/weapons.js`，单位用 `weapon` 字段引用武器 id。

## 7. 对话写作规范（幽默 × 悬疑 × 小惊悚）

### 7.1 基调配比
**70% 幽默松弛打底 + 20% 悬疑暗流 + 10% 小惊触点刺。** 日常越松弛，异常出现时越冷。

### 7.2 七条写作规则
1. **幽默来自人设，不来自段子**：子骁嘴贫爱吐槽、瀚瑜胆小夸张爱脑补、品璇大姐头式护短、徐老师冷面（严厉里漏出关心）
2. **每段日常藏一个"不对劲"**：用最平常的语气说一件异常的事，绝不当场解释
3. **小惊悚靠节奏骤停**：上一句还在搞笑 → 突然一句冷话，同时 BGM 停 / 音效轻响 / 立绘切表情
4. **单段 ≤ 3–4 句**，信息密度高；主角心理活动用（）括起并用不同颜色，承担悬疑旁白
5. **复现词"它们"**：全章每次出现都降一点温度，玩家会自己记住这个词
6. **小学生口吻**：11–12 岁的用词和比喻，不许成人腔、不许书面腔
7. **幽默不许消解悬疑**：每次笑完必须留一个"但是……"

### 7.3 示范（男线·走廊对话片段）
> 张瀚瑜："完了完了，范小默肯定是被作业精附体了！我奶说的，不爱写作业的小孩会被作业精抓走！"
> 张子骁："……你奶还说吃西瓜籽肚子里长西瓜呢。"
> 张瀚瑜："这次是真的！你看他爸发的——'它们要来了'！作业精要说也说'本座'，哪有说'它们'的！"
> 张子骁：（……"它们"。为什么是"它们"，不是"它"？）

读法：前两句笑，最后一句心理活动把温度降下来——这就是"笑完留个但是"。

### 7.4 演出配合
- 幽默段：立绘轻微晃动、对话框正常、BGM 轻松
- 悬疑句：立绘停顿 0.5 秒、打字机减速、BGM 压低
- 惊触点：全屏短暂暗下 + 音效 sting + 异变立绘闪现（≤0.8 秒；不做 jumpscare 吓人，只做"心里一凉"）

## 8. 美术规格、提示词库与资源方案

### 8.1 像素规格



| 素材   | 尺寸                    | 用途         |
| ---- | --------------------- | ---------- |
| 头像   | 96×96（绘制 128×128 再缩放） | 对话框头像、选人界面 |
| 半身立绘 | 240×320（绘制 480×640）   | 对话演出       |
| 行走图  | 24×24（4 方向 × 4 帧）     | 自由活动       |
| 战斗动画 | 32×32 多帧              | 攻击 / 受击    |
| 瓦片   | 16×16                 | 地图         |

渲染规则：`imageSmoothingEnabled = false`，整数倍放大，硬轮廓。

### 8.2 提示词通用模板（FE GBA 风格锚点）

所有角色提示词共用风格锚点，仅替换人物描述与主色：

> 16-bit pixel art, classic Fire Emblem GBA character portrait style, crisp pixel shading, bold dark outlines, **three-quarter view, face turned about 30 degrees to the side, NOT frontal（用户硬要求：禁止纯正面证件照角度）**, 【人物描述】, 【主色】color palette, game character portrait, head-and-shoulders composition, plain 【底色】background
>
> 头像母版底色：普通角色 deep royal blue；异变角色 dark desaturated teal-grey（仅母版阶段）。
>
> **最终交付统一规则（用户拍板）**：assets/ 内头像、立绘、图标全部归一为 flat solid magenta **#FF00FF 纯色底**（角色配色无此色，后期统一色键即得透明底）；立绘母版提示词必须带 "plain flat solid magenta background #FF00FF, no gradient"。

### 8.3 角色提示词库

**张子骁（蓝系）**



* 头像：

> 16-bit pixel art portrait in classic GBA Fire Emblem style, three-quarter view 30 degrees, an 11-year-old Chinese elementary school boy with a round face but average slim healthy build (NOT chubby, NOT fat), short black crew cut hair, bright confident eyes, cheeky grin, blue school uniform jacket with white collar, blue color palette, crisp pixel shading, bold dark outlines, deep royal blue background



* 立绘：

> 16-bit pixel art dialogue bust in GBA Fire Emblem style, three-quarter pose, 11-year-old Chinese schoolboy with round face but average slim build (NOT chubby), crew cut, blue school uniform, cheeky brave expression, blue color palette, detailed pixel shading, bold outlines, flat solid magenta background #FF00FF

**石予诺（粉系）**



* 头像：

> 16-bit pixel art portrait in Fire Emblem GBA style, a pretty 11-year-old Chinese elementary school girl, high ponytail black hair with pink ribbon, bright gentle eyes, pink school uniform with white collar, pink color palette, crisp pixel shading, bold dark outlines, head-and-shoulders composition, plain soft pink background



* 立绘：

> 16-bit pixel art half-body character in Fire Emblem GBA style, pretty 11-year-old Chinese schoolgirl with ponytail and pink ribbon, pink school uniform, holding a stack of vocabulary flashcards, soft determined smile, pink color palette, detailed pixel shading, bold outlines, half-body composition, plain light pink background

**徐老师（深灰蓝系，女·御姐型，用户已拍板）**



* 头像：

> 16-bit pixel art portrait in classic GBA Fire Emblem style, three-quarter view 30 degrees, a confident elegant mature Chinese female school teacher around 30, poised onee-san beauty, sleek black hair in a neat low bun with a few loose strands, sharp intelligent eyes behind thin-frame glasses, refined light makeup with subtle red lips, composed strict expression with faint confident smile, white blouse under dark grey blazer, deep grey-blue palette, crisp pixel shading, bold outlines, deep royal blue background



* 立绘：

> 16-bit pixel art dialogue bust in GBA Fire Emblem style, three-quarter pose, same female teacher (low bun, thin-frame glasses, white blouse and dark grey blazer), one hand holding a stainless steel thermos cup, strict composed aura, deep grey-blue palette, crisp pixel shading, bold outlines, flat solid magenta background #FF00FF

**范文默（蓝白校服 / 黑瘦寸头；两状态同人设同服装，只换表情动作）**

* 固定形象（两版通用）：个子瘦小、皮肤黝黑，特别短的寸头、接近光头的黑色发茬，古灵精怪；统一穿蓝白拼色运动校服（白主体、蓝领蓝袖口）。

* 头像（正常）：

> 16-bit pixel art portrait in Fire Emblem GBA style, skinny dark-skinned 11-year-old Chinese schoolboy, very short buzz cut nearly shaved black hair, clever mischievous smirk with one raised eyebrow, blue-and-white tracksuit uniform, three-quarter view, crisp pixel shading, bold outlines, head-and-shoulders, flat solid magenta background #FF00FF

* 立绘（正常）：挠后脑勺坏笑、背双肩包，站姿放松。

* 立绘/头像（异变版，第一章关键；阴森但仍是活人，不做鬼化）：

> same skinny dark-skinned Chinese schoolboy with buzz cut and the SAME blue-and-white tracksuit, eerily calm stiff expression, vacant stare, slight dark circles, faintly pale, a trace of cold green reflected in the pupils, holding an open high-school physics/chemistry textbook, rigid posture, suspenseful uncanny mood, NOT a ghost or monster, no glow/distortion/tentacles, Fire Emblem GBA pixel style, three-quarter view, flat solid magenta background #FF00FF

**何妍熹（桃红系）**



* 头像：

> 16-bit pixel art portrait in Fire Emblem GBA style, a very pretty 11-year-old Chinese elementary school girl, high ponytail peach-pink hair, bright lively sparkling eyes, cheerful smile, peach-pink school uniform, peach color palette, crisp pixel shading, bold dark outlines, head-and-shoulders composition, plain peach background



* 立绘（异变版，第一章关键）：

> 16-bit pixel art half-body character in Fire Emblem GBA style, pretty Chinese schoolgirl with peach ponytail, mechanical hollow expression, glowing eyes, surrounded by floating vocabulary notes with English words, peach color palette with cold blue tint, detailed pixel shading, bold outlines, half-body composition, dark background

**张瀚瑜（绿系）**



* 头像：

> 16-bit pixel art portrait in Fire Emblem GBA style, a skinny small 11-year-old Chinese elementary school boy with big forehead and large round eyes, nervous gossipy expression, green school uniform, green color palette, crisp pixel shading, bold dark outlines, head-and-shoulders composition, plain light green background



* 立绘：

> 16-bit pixel art half-body character in Fire Emblem GBA style, skinny small Chinese schoolboy with big forehead, wide anxious eyes, leaning forward as if sharing a secret, green school uniform, green color palette, detailed pixel shading, bold outlines, half-body composition, plain light green background

**陈品璇（橙系）**



* 头像：

> 16-bit pixel art portrait in Fire Emblem GBA style, a tall strong 11-year-old Chinese elementary school girl, short bob haircut, bold confident expression, athletic build, orange school uniform, orange color palette, crisp pixel shading, bold dark outlines, head-and-shoulders composition, plain warm orange background



* 立绘：

> 16-bit pixel art half-body character in Fire Emblem GBA style, tall athletic Chinese schoolgirl with short bob, hands on hips, protective confident stance, orange school uniform, orange color palette, detailed pixel shading, bold outlines, half-body composition, plain warm orange background

### 8.4 提示词使用说明



* 头像与立绘分开生成；生成后按 8.1 尺寸裁剪缩放即可入包

* 表情扩展：在人物描述后追加表情词（surprised /worried/angry /laughing…）即可出多表情立绘

* 背景建议统一纯色，方便对话演出时做去底 / 描边处理

### 8.5 道具像素图标提示词（16×16 背包图标风）

**烤肠：**

> 16-bit pixel art game inventory item icon, a grilled sausage on a wooden stick, glossy oily texture, brown and red colors, crisp pixel shading, bold dark outline, 16x16 retro game item, plain dark background

**混蛋汽水：**

> 16-bit pixel art game inventory item icon, a glass soda bottle with fizzy orange drink and bubbles, green label, crisp pixel shading, bold dark outline, 16x16 retro game item, plain dark background

**可疑零食（关键道具）：**

> 16-bit pixel art game inventory item icon, a suspicious crinkled colorful snack bag glowing faintly sickly green, eerie aura, crisp pixel shading, bold dark outline, 16x16 retro game item, dark background

### 8.6 现成素材库选型（2026-09-15 联网核实）

**总策略：场景瓦片用现成现代素材包（省工时），7 个具名角色用 AI 定制（保人设），行走图先用免费包占位再按人设精修。**

| 用途 | 资源 | 授权 | 说明 |
| --- | --- | --- | --- |
| 现代室内（教室/同学家） | LimeZu · Modern Interiors（itch.io，16×16） | 免费版可商用，完整包约 $1–2 | 评分 4.9，top-down 现代室内首选 |
| 现代室外（校门/街道） | LimeZu · Modern Exteriors | 署名可商用 | 与室内同一画风，拼接无违和 |
| 完整校园 | Verdant 21 School Tileset（csaf.itch.io） | 付费 | 783 瓦片：教室/走廊/体育馆/图书馆/食堂/操场 |
| 教室小物（免费） | Seoul School Mini（glowcompany.itch.io） | 免费 | 黑板/储物柜/课本图标 + 上课铃音效，16/32/48/96px |
| 城市街道 | Cozy City（maygetsu.itch.io，16×16） | 免费/付费 | 现代街道、车辆、街景道具 |
| 行走图占位 | gegx · WALK PACK PIXEL（19 角色 4 方向行走）；kettoman · 3 Free Pixel Characters 32×32 | 免费 | 自由活动主角/NPC 占位，后续替换 |
| CC0 兜底 | OpenGameArt（按 CC0 筛选）、Kenney.nl | CC0 | 道具/特效/UI/音效补全 |
| 制作工具 | Tiled（地图编辑，免费，导出 JSON）；Aseprite（像素画，付费）/ LibreSprite（免费替代） | — | 地图与像素绘制管线 |

> 选型纪律：这是**现代故事**，不下载中世纪/奇幻素材包（LPC 等），避免画风和题材打架；所有素材入包前在 `data/credits.js` 登记来源与授权。

### 8.7 中文像素字体
| 字体 | 协议 | 说明 |
| --- | --- | --- |
| 方舟像素字体 Ark-Pixel | OFL 开源 | 简繁日全覆盖，**简体中文首选** |
| Cubic 11 俐方體11號 | OFL 开源 | 11×11 点阵，字形偏繁体，备选 |
| Zpix 最像素 | 个人/教育免费，**单个商业产品需授权** | 字符最全但商用要付费，本项目暂不用于商业发布 |

渲染规则：CSS `image-rendering: pixelated`；Canvas `imageSmoothingEnabled = false`；字号取整数倍（12/16/24px）。

### 8.8 首批资产生产记录（2026-09-15 已交付）

**图片（全部 30° 三分之四侧脸，已入 assets/，清单见 `assets/ASSET_MANIFEST.md`）：**

* 头像 9 组（96×96 + @2x 192）：7 个具名角色 default + 范文默 / 何妍熹各一套 corrupted
* 立绘 11 组（240×320 + @2x 480×640，统一 #FF00FF 纯色底）：上述 9 状态 + vendor、punk
* 图标 4 组（16×16 + @2x 32，统一 #FF00FF 纯色底）：sausage、bastard_soda、suspicious_snack、newbie_pencil
* 场景背景 4 组（assets/backgrounds/，16:9 整幅不透明，480×270 + @2x 960×540，无人空镜）：bg_classroom 教室、bg_street 校外小巷（含小吃车）、bg_home 同学家日常、bg_home_eerie 同学家异变；男线/女线共用同学家场景，日常→异变在反转瞬间切换
* 战棋地图素材走散件方案（用户拍板）：assets/props/ 5 个障碍物散件（校门 3×2、小吃车 2×2、路灯 1×2、垃圾桶/自行车 1×1，48px/格，#FF00FF 底）+ assets/tiles/ 两张 48×48 地面平铺（水泥路面/红砖巷），地面代码平铺、散件按格摆放
* **目录唯一原则（用户拍板）**：assets/ 是研发唯一引用目录，全部纯色底、文件名不变；早期透明底版本移至 `backup/transparent_v1/` 留档，禁止并行目录
* **双形态原则（用户拍板）**：范文默、何妍熹剧情前段一律用 default 正常形象，反转环节才切 corrupted；禁止一上来就是怪物样
* 管线：AI 出 1024 母版（`work_ref/raw/`）→ 头像边缘泛洪换底 / 立绘道具归一洋红并裁切留边 → 缩放落盘到 assets/，脚本 `work_ref/make_solid.py` 可复跑
* 行走图刻意不 AI 出（四方向帧对齐不可靠），P0 用 gegx/kettoman 免费包占位，P1 按立绘手拆

**音乐（已入 assets/audio/，授权登记 `data/credits.js`）：**

* P0：bgm_classroom / bgm_suspense（CC-BY 须署名）、bgm_battle_normal（CC0，附 ogg）、bgm_victory（原创合成 6.5s）
* P1 一并交付：bgm_street、bgm_eerie_revelation（均 CC0）
* SFX 16 个全部原创 NumPy 合成（16-bit 芯片风，非刺耳 8-bit 蜂鸣），脚本 `work_ref/audio_src/synth_sfx.py` 可复调

## 9. 音乐与音效方案（现成免费资源 + MIDI 备选）

### 9.1 技术方案（两档）
- **推荐档：音频文件 + AudioManager。** CC0 芯片音乐下载为 ogg，用 HTMLAudioElement 循环播放，统一封装 AudioManager：场景切换淡入淡出、BGM/SFX 分轨音量、静音设置、首次点击后解锁音频（浏览器自动播放策略）
- **MIDI 档（体积极小）：** Tone.js（MIT 开源）+ @tonejs/midi 解析 .mid，用合成器发声；或 timidity（WASM + libtimidity）直接播 .mid。适合后续想做"MIDI 感复古音质"时切换
- SFX：优先 CC0 音效包，短音也可用 Web Audio 程序合成

### 9.2 BGM 场景配置表
| 场景 | 情绪 | 现成曲目来源（免费 / CC0 / 署名可用） |
| --- | --- | --- |
| 标题界面 | 轻松、怀旧 | Juhani Junkala《G&T RPG soundtrack》（署名免费，OpenGameArt） |
| 教室·安全区 | 日常、轻松 | RPG town 类芯片曲（同上 / Eric Skiff《Resistor Anthems》免费 8-bit） |
| 街道·危险区 | 悬疑、不安、低速 | OpenGameArt《CC0 8Bit Chiptune》合辑中的 Spooky Dungeon 类 |
| 战斗 | 紧张、快节奏 | Juhani Junkala《5 Chiptunes (Action)》CC0；《16-bit Battle Theme I》CC0 |
| 反转·同学家 | 压抑、小惊悚 | spooky / ambient 类芯片曲（同 CC0 合辑） |
| 胜利 / 获得道具 | 短 jingle | Kenney Music Jingles（CC0） |

### 9.3 首批音效（SFX）清单
选中单位 / 移动确认 / 攻击挥击 / 命中 / 暴击 / 受击 / 获得道具 / 对话翻页 / 开门 / 诡异 sting。
来源：Juhani Junkala《512 Sound Effects (8-bit)》CC0、Kenney《RPG Audio》CC0。

### 9.4 授权纪律
- 每首入包音频在 `data/credits.js` 登记：名称 / 作者 / 协议（CC0 免署名，CC-BY 必须署名）/ 来源 URL
- OpenGameArt 访问慢时用国内镜像爱给网（aigei.com）CC0 合辑
- 不用来源不明的"免费 MIDI 站"曲目，避免版权风险

## 10. 待确认清单（下次对话请拍板）

1. 游戏名《六 8 班异闻录》是否 OK？

2. ~~徐老师形象~~ 已拍板：女老师、30 岁上下御姐型（低盘髻 / 细框眼镜 / 深灰西装）

3. 武器路线：新手铅笔开局 → 子骁毛笔 / 予诺单词卡，是否 OK？

4. 媒介物 = 可疑零食，是否 OK？

5. 章节规模：后续每章一个场景？还想到哪些地点？

6. 队伍规模：后续章节是否组队多角色出战？

7. 美术路线：场景用现成现代素材包 + 具名角色 AI 定制，是否 OK？

8. BGM 风格：8-bit 芯片音乐（轻松/悬疑/战斗分场景）是否对味？