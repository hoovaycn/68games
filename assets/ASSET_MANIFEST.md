# 资产交付清单 ASSET MANIFEST（美术 + 音乐）

> 维护：美术/音乐负责人　最近更新：2026-09-17
> 命名严格对齐研发《资产接入规范》的角色 ID 枚举。

## 0. 全局美术规格（硬约束）

* **统一底色 #FF00FF（洋红）**：portraits / art / items / ui 全部纯色底交付，研发按文件名直接引用，透明底由后期统一色键（容差 20 内抠净）。
* **色键安全（重要）**：主体配色一律避开红 / 粉 / 品红 / 紫红系，防止与键色互吃。需求里写红/粉的，美术已主动换色（见各表备注）。
* **像素风**：GBA / FE 风，硬边、低细节，不做过度精致的渲染。
* **@2x 版本**：每个图额外给 2 倍尺寸，供高清屏 / 放大演出选用，不用可忽略。

## 1. 图片资产

### assets/portraits/　对话框小头 / 选人 / HUD（96×96，另附 @2x 192）
全部约 30° 三分之四侧脸（对齐 FE GBA 头像角度），#FF00FF 纯色底。

| 文件 | 角色 | 备注 |
| --- | --- | --- |
| zhangzixiao_default.png/@2x | 张子骁 男主 | 寸头、圆脸匀称，蓝系 |
| shiyunuo_default.png/@2x | 石予诺 女主 | 马尾粉蝴蝶结，粉系（蝴蝶结小面积，安全） |
| teacher_xu_default.png/@2x | 徐老师 | 女·御姐型，低盘髻、细框眼镜、深灰西装 |
| zhanghanyu_default.png/@2x | 张瀚瑜 | 大脑门、紧张眼神，绿校服；**已改正面站立抓书包带姿势**（原弯腰撑脸易溢出） |
| chenpinxuan_default.png/@2x | 陈品璇 | 短发强壮，橙运动服 |
| fanwenmo_default.png/@2x | 范文默·正常 | 古灵精怪笑脸，棕系 |
| fanwenmo_corrupted.png/@2x | 范文默·异变 | 青光眼、狂笑、物理书 |
| heyanxi_default.png/@2x | 何妍熹·正常 | 热情活泼双眼睁开笑，白外套白裙，黑高马尾白蝴蝶结；**银竖笛竖直捧胸前**（原横吹左右溢出，已重画为竖持） |
| heyanxi_corrupted.png/@2x | 何妍熹·异变 | 苍白、空洞青蓝发光眼、冷笑、冷青调；同脸同衣，**银竖笛竖直捧胸前**（同改竖持） |
| zhangxizhe_default.png/@2x | 张希哲 | 寸头眼镜，蓝运动服，抱黑白足球 |
| qinruiyi_default.png/@2x | 覃瑞怡 | 蓝双马尾+红蝴蝶结，红白啦啦队服；**单手高举一个蓝金花球、另一手叉腰、马尾下垂**（原双手各举一花球左右溢出，已重画） |
| zhuyanze_default.png/@2x | 朱晏泽·正常 | 褐色短发、方脸小眼帅气，白+绿 polo，富二代 |
| zhuyanze_corrupted.png/@2x | 朱晏泽·异变 | 同脸同衣，青蓝发光眼、冷笑、冷青调（第三章 boss） |
| teacher_pe_default.png/@2x | 体育老师·正常 | 凯式刺猬头、中年刚毅，白蓝运动服 |
| teacher_pe_corrupted.png/@2x | 体育老师·异变 | 同脸同衣，青光眼邪笑、冷青调 |
| senior_athlete_default.png/@2x | 高年级体育生·正常 | 秃瓢寸头、普通 NPC 脸、青年感，白运动服 |
| senior_athlete_corrupted.png/@2x | 高年级体育生·异变 | 同脸同衣，青光眼邪笑、冷青调 |
| shadow_woman_default.png/@2x | 神秘女子 | 教务处窗边纯黑剪影、两点青光眼、长发职业装 |
| vendor_default.png/@2x | 流动商贩 | 青白脸、假笑、举发光零食 |
| punk_default.png/@2x | 高年级混混 | 棕乱发、棒棒糖、练习册卷棒 |
| classmate_boy_default.png/@2x | 某男同学·正常（**无名 NPC**） | 普通男同学，短碎黑发大众脸、灰蓝校服背书包，爱起哄随大流（第三章） |
| classmate_boy_corrupted.png/@2x | 某男同学·异变 | 同脸同衣，青蓝发光眼、僵硬冷笑、冷青调 |
| classmate_girl_default.png/@2x | 某女同学·正常（**无名 NPC**） | 普通女同学，齐刘海黑马尾圆脸、米黄开衫，手捂嘴传闲话（第三章） |
| classmate_girl_corrupted.png/@2x | 某女同学·异变 | 同脸同衣，青蓝空洞发光眼、嘴微张念叨、冷青调，手仍捂嘴边 |

### assets/art/　对话半身立绘（240×320，#FF00FF 纯色底，另附 @2x 480×640）

> **2026-09-17 统一构图**：全部角色统一为**头顶→腰部（waist-up）半身像**，头顶留约 4% 边距、腰部落画布底沿；头身比例、头顶高度、腰部裁切位置已对齐，不再有大头胸像 / 到大腿像混用。体育老师、高年级体育生、朱晏泽异变的 normal/corrupted 原为纯胸像，已按同脸同衣重新扩画到腰部。
> **横向溢出修正（2026-09-17，均为重新生成而非缩放位移）**：持横向道具导致左右出血的角色统一改为竖向 / 收拢持握——张瀚瑜由弯腰撑脸改为正面站立抓书包带；覃瑞怡由双手各举一花球改为单手高举一个花球、另一手叉腰、马尾下垂；何妍熹 default/corrupted 由横吹竖笛改为竖笛竖直捧胸前。修正后人物高度仍占满画幅（约 0.92），左右各留边距不出血；对应头像已同步重裁。
> **第三章新增（2026-09-17）**：新增朱晏泽·异变（zhuyanze_corrupted）、**无名**某男同学（classmate_boy，正常+异变）、**无名**某女同学（classmate_girl，正常+异变）共 5 个状态，均沿用统一腰部构图与洋红纯底；两名起哄同学不起名、刻意做成"普通到记不住"的长相，不抢主角风头。
> 角色清单与 portraits 完全一致（**24 个状态**，含双形态与两个敌人）。

### assets/items/　道具/武器图标（**32×32，#FF00FF 纯色底，另附 @2x 64**）

> **2026-09-17 规格上调**：由原 16/32 放大两号到 **32/64**，主体占画布约 90%，像素硬边放大。共 27 件。

| 文件 | 名称 | 视觉 / 配色备注 |
| --- | --- | --- |
| newbie_pencil.png/@2x | 新手铅笔 | 初始武器，黄铅笔 |
| sausage.png/@2x | 烤肠 | 回 12HP，棕黄烤肠 |
| bastard_soda.png/@2x | 混蛋汽水 | 回 6HP+攻速，紫蓝罐 |
| suspicious_snack.png/@2x | 可疑零食 | 关键道具不可用，绿包装 |
| recorder.png/@2x | 竖笛 | 米色塑料竖笛 |
| harmonica.png/@2x | 口琴 | 银色金属小口琴 |
| color_chalk.png/@2x | 彩色粉笔 | 白/蓝/黄/绿四色（**去掉需求里的粉色**） |
| chalk_dust.png/@2x | 粉笔灰 | 灰白粉尘雾+散落细粉（**已重做，原误画成粉色物**） |
| blackboard_eraser.png/@2x | 黑板擦 | 棕木柄+灰毛毡 |
| chalk_box.png/@2x | 粉笔盒 | 浅绿铁皮盒，印乘法口诀 |
| pompom_deluxe.png/@2x | 应援花球 | **蓝金双色**（需求红金，改色防顺色） |
| cheer_stick.png/@2x | 啦啦棒 | 两根**蓝金**充气棒交叉（原红金改色） |
| eraser.png/@2x | 橡皮擦 | 白色半透明橡皮 |
| correction_tape.png/@2x | 修正带 | 蓝白壳 |
| mop.png/@2x | 拖把 | 木杆+深色湿拖把头滴水 |
| broom.png/@2x | 扫帚 | 高粱扫帚，棕黄 |
| sudoku.png/@2x | 数独九宫格 | **蓝封面+米黄纸**题册（原粉面顺色，已重做） |
| jump_rope.png/@2x | 跳皮筋 | **蓝色**弹力皮筋（原红色改色） |
| eye_patch.png/@2x | 蒸汽眼罩 | 白色蓬松眼罩+热气 |
| candied_haw.png/@2x | 冰糖葫芦 | 深红棕糖壳（刻意压深，远离洋红） |
| honey_tea.png/@2x | 蜂蜜柚子茶 | 玻璃杯金黄茶+柠檬片 |
| moms_lunchbox.png/@2x | 妈妈的便当 | 双层保温饭盒，饭菜冒热气 |
| scream_chicken.png/@2x | 尖叫鸡 | 黄色橡胶鸡 |
| cooling_oil.png/@2x | 清凉油 | 小圆铁盒+绿色膏体 |
| earplug.png/@2x | 隔音耳塞 | 橙色泡沫耳塞两枚 |
| dirty_sock.png/@2x | 脏袜子 | 白袜+绿渍（研发新增） |
| pe_teacher_brain.png/@2x | 体育老师的脑子 | **黄绿发光脑子**（原粉色脑子顺色，已重做；研发新增） |

### assets/ui/　战斗 UI 图标（#FF00FF 纯色底，每张配 @2x）

**评级 / 徽章（圆形，奖牌风）**

| 文件 | 尺寸（基础/@2x） | 用途 | 规格 |
| --- | --- | --- | --- |
| ui_vs_badge.png/@2x | 64×64 / 128×128 | 交战弹层中轴 VS 徽章 | 米黄羊皮纸圆牌 #FFFDF9 + 金描边 #FACC15，中央「VS」深棕红 #7C2D12 粗衬线字，外圈淡金光晕，中轴对称 |
| ui_rank_ss.png/@2x | 96×96 / 192×192 | 胜利评级 SS（turns ≤ 2） | **金牌**：金圆牌+月桂叶+金星，「SS」鎏金大字，最华丽 |
| ui_rank_s.png/@2x | 96×96 / 192×192 | 胜利评级 S（turns ≤ 4） | **银牌**：银灰圈，「S」深蓝灰字 |
| ui_rank_a.png/@2x | 96×96 / 192×192 | 胜利评级 A（其余） | **铜牌**：棕铜圈，「A」深棕字，最朴素 |

> 评级三档为金/银/铜奖牌，同构递进。**已废弃原红蜡封方案**（红印泥与洋红键色过近）。「EVALUATION」小字与判定规则由代码叠画，图内不含小字。

**战斗飘字（横向矩形）**

| 文件 | 尺寸（基础/@2x） | 用途 | 规格 |
| --- | --- | --- | --- |
| ui_hit.png/@2x | 96×48 / 192×96 | 命中目标飘字 | 白字深蓝描边圆角牌+小金星 |
| ui_miss.png/@2x | 96×48 / 192×96 | 未命中飘字 | 灰蓝「MISS」+横向拖影，闪避感 |
| ui_crit.png/@2x | 96×48 / 192×96 | 暴击飘字 | 金黄「暴击」+橙色冲击放射线/星，金橙系（无红粉） |

### assets/backgrounds/　剧情场景背景（16:9，不透明整幅，480×270 基础 + @2x 960×540）
| 文件 | 场景 |
| --- | --- |
| bg_opening.png/@2x | 黄昏校门·压抑暮色+一扇绿光窗 |
| bg_title.png/@2x | 黄昏教室·铅笔如剑插课桌，黑板区留空 |
| title_logo.png/@2x | 标题 Logo（代码叠标题用） |
| bg_classroom.png/@2x | 六8班教室·早读暖阳 |
| bg_street.png/@2x | 校外小巷·黄昏（含流动小吃车） |
| bg_home.png/@2x | 同学家·日常暖光（男/女线共用） |
| bg_home_eerie.png/@2x | 同学家·异变（绿灯、书山、漂浮纸张） |
| bg_home_mc.png/@2x | 主角卧室·夜晚台灯 |
| bg_neighborhood.png/@2x | 老小区街道·傍晚 |
| bg_office.png/@2x | 教务处·办公桌堆文件 |
| bg_playground.png/@2x | 操场·黄昏足球场（教学楼+绿茵场） |
| cg_pickup_bottle.png/@2x | CG 特写：女老师纤细的手捡起荧光瓶子 |
| bg_auditorium.png/@2x | 学校礼堂/体育馆·全校大会（舞台+空白红横幅+排长椅+篮球架，第三章） |
| bg_school_night.png/@2x | 夜晚校园·黑灯教学楼一扇亮窗+一盏路灯+跑道剪影（第三章末密会） |

> 场景为无人空镜，人物用立绘/行走图叠加；日常家与异变家构图同源，切换做 0.3s 闪白/暗场。礼堂横幅文字留空，由代码叠字。场景为不透明整幅、不做色键，可用红/粉。

### assets/props/　战棋地图散件/障碍物（#FF00FF 纯色底，48px/格，含 @2x）
| 文件 | 尺寸（基础/@2x） | 占格 | 备注 |
| --- | --- | --- | --- |
| prop_school_gate | 144×96 / 288×192 | 3×2 | 不锈钢伸缩校门栏杆，正俯视 |
| prop_snack_cart | 96×96 / 192×192 | 2×2 | 红白遮阳伞流动小吃车（轻微 3/4 俯视） |
| prop_streetlight | 48×96 / 96×192 | 1×2 | 锈蚀路灯，自带暖黄圆形光晕 |
| prop_trash_bin | 48×48 / 96×96 | 1×1 | 老式绿色铁皮垃圾桶 |
| prop_bicycle | 48×48 / 96×96 | 1×1 | 倒地二八大杠，正俯视 |

### assets/tiles/　地面平铺素材（整幅不透明，48×48 + @2x 96，代码 repeat 平铺）
| 文件 | 用途 |
| --- | --- |
| tile_pavement | 校外水泥/柏油路面（第 1 战 校门外） |
| tile_brick | 红砖人字铺小巷（第 2 战 巷内） |

> 方案裁决（用户拍板用散件方案 B）：不出整张 AI 战棋底图（透视/网格不可控、无法高亮格子）；地面代码平铺、散件按格摆放，色键规则同角色图。脚本 `work_ref/make_props.py` 可复跑。

### 外部 CC0 素材（已实测下载、筛选、对齐 48px 网格；详见 EXTERNAL_ASSETS.md）
* `assets/tiles/kenney/`：Kenney《Roguelike Modern City》CC0 精选地砖 5 张（柏油路/人行道/红砖/草地/斑马线，48+@2x）+ 完整精灵表 roguelikeCity_transparent_full.png（Tiled 可直接导入）
* `assets/props/kenney/`：同包精选街具 9 件（路灯/信号灯/消防栓/垃圾袋/木箱/大垃圾箱/树/护栏/隔离柱，按占格输出，已透明）
* `assets/sprites/placeholder/`：CC0 四方向走路占位表 6 色（384×512，帧 128²，4 方向×3 帧）
* 风格纪律：外部包只用在地图层和占位，剧情角色/道具/场景仍用定制图；地图层内部保持同一包不混包。

## 2. 音频资产

### assets/audio/bgm/（mp3 160k；战斗曲另附 ogg 无缝循环版）
| 文件 | 时长 | 情绪 | 来源/协议 | 优先级 |
| --- | --- | --- | --- | --- |
| bgm_classroom.mp3 | 4:26 loop | 教室日常轻松 | Exploring Town，CC-BY（须署名） | P0 |
| bgm_suspense.mp3 | 0:31 loop | 悬疑不安 | Spooky Dungeon / Memoraphile，CC-BY（须署名） | P0 |
| bgm_battle_normal.mp3/.ogg | 1:13 loop | 轻快热血战斗 | Juhani Junkala Level 2，CC0 | P0 |
| bgm_victory.mp3 | 0:06.5 不循环 | 胜利号角 | 原创合成，随项目 CC0 | P0 |
| bgm_street.mp3 | 1:14 loop | 校外街道探险 | Juhani Junkala Level 1，CC0 | P1 |
| bgm_eerie_revelation.mp3 | 5:24 loop | 机械压抑惊悚 | Juhani Junkala Wastelands，CC0 | P1 |

### assets/audio/sfx/（16 个，mp3 128k，0.03–0.6s，原创合成随项目 CC0）
sfx_cursor / sfx_confirm / sfx_cancel / sfx_text_blip / sfx_menu_open /
sfx_step / sfx_attack_swing / sfx_hit_normal / sfx_hit_crit / sfx_miss /
sfx_item_use / sfx_item_get / sfx_level_up / sfx_unit_down /
sfx_phone_msg / sfx_shock_sting

授权明细统一登记在 `data/credits.js`，游戏鸣谢页直接读取；CC-BY 两首必须在鸣谢中署名。

### 目录规则（唯一来源，避免研发混淆）
* **`assets/` 是唯一交付目录**：portraits/art/items/ui 里的图片全部统一为 **#FF00FF 纯色底**，文件名与尺寸不变，研发直接按 ID 引用；后期统一色键 #FF00FF 即得透明底。
* **`backup/`**：历史版本 / 早期透明底留档，研发不要引用。
* 全部纯色底均从高清母版直接生成（头像边缘泛洪、立绘/道具/UI 按主体包围盒贴洋红画布），处理脚本在 `work_ref/`（make_solid.py 等）可复跑。

## 3. 与研发规范的差异说明（美术主观决策）

1. **头像角度**：全部 30° 三分之四侧脸，不出纯正面（用户硬要求）。
2. **底色策略**：assets 内统一交付 #FF00FF 纯色底图，透明底由后期统一色键完成。AI 无法直出 alpha，洋红是选定的标准键色。
3. **主体禁用红粉系**：为防色键互吃，所有道具/UI 主体避开红、粉、品红；需求中的红色一律改蓝/金/深棕等（花球、啦啦棒、跳皮筋、数独封面、脑子等均已改色）。
4. **立绘构图统一（2026-09-17）**：19 个角色全部头顶→腰部半身像，比例/头顶/腰线对齐；张瀚瑜改为正面站立姿势，体育老师与体育生胸像重扩到腰。持横向道具会左右出血的角色（覃瑞怡、何妍熹两版）一律**重新生成**为竖向 / 收拢持握（单手高举花球、竖笛竖捧胸前），不靠缩放位移，人物高度保持占满画幅。
5. **道具图标放大两号（2026-09-17）**：16/32 → **32/64**，主体占比提到 90%，高清屏更清晰。
6. **评级徽章改奖牌风**：金/银/铜奖牌替代原红蜡封，三档强度递进且色键安全。
7. **双形态立绘**：范文默、何妍熹、体育老师、高年级体育生、朱晏泽、某男同学（classmate_boy）、某女同学（classmate_girl）各有 default + corrupted 两套，同脸同衣、只改神态与色调（青蓝发光眼、冷笑/空洞、冷青调），反转瞬间切换反差最大化；异化不做怪物化、不长异物。两名起哄同学**不起名**，剧情里就叫"那个男生/女生"。
8. **第三章场景与 NPC（2026-09-17）**：新增 bg_auditorium（礼堂全校大会）、bg_school_night（夜晚校园密会）两张无人空镜；两名起哄同学（classmate_boy / classmate_girl）**不起名**、刻意普通化。场景不做色键、可用红粉；角色仍守洋红键色与主体避红粉。
9. **行走图 assets/sprites/ 暂缺（刻意）**：AI 直出四方向多帧 spritesheet 帧对齐不可靠，先用免费包占位（gegx WALK PACK PIXEL、kettoman 32×32 三人包）；定制行走图排 P1 用 Aseprite 按立绘拆帧。
10. **BGM 协议**：classroom/suspense 为 CC-BY（已在 credits 登记署名），其余全部 CC0 或原创。
11. **原始母版**：高清 AI 原图存在 `work_ref/raw/`，音频下载源与合成脚本在 `work_ref/audio_src/`，需要重裁切/换格式不用重新生成。

## 4. 后续待补（不阻塞当前版本）
- 表情扩展（worried/angry/laughing/surprised）：同一提示词追加表情词即可批量出。
- 各角色更多异变阶段；vendor/punk 已有头像，可按需补表情差分。
- 定制行走 spritesheet（P1）。
- 章节通关曲（可用 Junkala《Ending》备选，源文件在 work_ref）。
- 后续新场景（更多校园/异化地图）的 props 与 tiles 随章节补。
