# 资产交付清单 ASSET MANIFEST（美术 + 音乐）

> 维护：美术/音乐负责人　最近更新：2026-09-15
> 命名严格对齐研发《资产接入规范》的角色 ID 枚举。

## 1. 图片资产

### assets/portraits/　对话框小头 / 选人 / HUD（96×96，另附 @2x 192 高清版）
全部为约 30° 三分之四侧脸（用户硬要求，对齐 FE GBA 头像角度）。**统一 #FF00FF 纯色底**，研发按文件名直接引用即可，透明底由后期统一色键（#FF00FF）得到。

| 文件 | 角色 | 备注 |
| --- | --- | --- |
| zhangzixiao_default.png/@2x | 张子骁 男主 | 寸头、圆脸不胖（匀称体型），蓝系 |
| shiyunuo_default.png/@2x | 石予诺 女主 | 马尾粉蝴蝶结，粉系 |
| teacher_xu_default.png/@2x | 徐老师 | 女·御姐型，低盘髻、细框眼镜、深灰西装 |
| zhanghanyu_default.png/@2x | 张瀚瑜 | 大脑门、紧张眼神，绿系 |
| chenpinxuan_default.png/@2x | 陈品璇 | 短发强壮，橙运动服 |
| fanwenmo_default.png/@2x | 范文默·正常 | 古灵精怪笑脸，棕系 |
| fanwenmo_corrupted.png/@2x | 范文默·异变 | 血丝眼、狂笑、物理书 |
| heyanxi_default.png/@2x | 何妍熹·正常 | 热情活泼，桃红系 |
| heyanxi_corrupted.png/@2x | 何妍熹·异变 | 空洞发光眼、漂浮单词卡 |

### assets/art/　对话半身立绘（240×320，#FF00FF 纯色底，另附 @2x 480×640）
含上表 9 个状态 + 两个敌人：

| 文件 | 备注 |
| --- | --- |
| vendor_default.png/@2x | 流动商贩：青白脸、假笑、举发光零食 |
| punk_default.png/@2x | 高年级混混：棕乱发、棒棒糖、练习册卷棒 |

### assets/items/　道具/武器图标（16×16，#FF00FF 纯色底，另附 @2x 32）
| 文件 | 对应数据 |
| --- | --- |
| sausage.png/@2x | 烤肠（回 12HP） |
| bastard_soda.png/@2x | 混蛋汽水（回 6HP + 攻速） |
| suspicious_snack.png/@2x | 可疑零食（关键道具，不可用） |
| newbie_pencil.png/@2x | 新手铅笔（初始武器，额外补） |

### assets/items/　新增道具/武器图标（批量出图需求，16×16 + @2x 32，同上规格）
> 本次数据层新增 21 件（12 武器 + 9 消耗品），请出图 agent 一次性批量生成。
> 统一要求：单一主体居中、轮廓清晰、GBA 像素风、#FF00FF 纯色底；文件名即数据 id（研发按 id 直接引用）。

| 文件 | 名称（数据 id） | 视觉要点 |
| --- | --- | --- |
| recorder.png/@2x | 竖笛（recorder） | 米色塑料竖笛斜放，一排音孔，管身反光 |
| harmonica.png/@2x | 口琴（harmonica） | 银色金属小口琴横向，中央一排吹孔 |
| color_chalk.png/@2x | 彩色粉笔（color_chalk） | 粉/蓝/黄/绿四色粉笔斜并排，短圆柱 |
| chalk_dust.png/@2x | 粉笔灰（chalk_dust） | 一小团白色粉笔灰雾，底部散落细粉 |
| blackboard_eraser.png/@2x | 黑板擦（blackboard_eraser） | 棕色木柄黑板擦，灰白毛毡面沾粉笔灰 |
| chalk_box.png/@2x | 粉笔盒（chalk_box） | 浅绿铁皮粉笔盒，盒身印乘法口诀字样 |
| pompom_deluxe.png/@2x | 应援花球（pompom_deluxe） | 红金双色花球，长须散开，亮片反光 |
| cheer_stick.png/@2x | 啦啦棒（cheer_stick） | 两根红金充气棒交叉，鼓鼓的塑料质感 |
| eraser.png/@2x | 橡皮擦（eraser） | 白色半透明橡皮，一角磨圆，带纸屑 |
| correction_tape.png/@2x | 修正带（correction_tape） | 蓝白壳修正带，拉出一截白色胶带 |
| mop.png/@2x | 拖把（mop） | 木杆拖把，深色湿拖把头，滴水 |
| broom.png/@2x | 扫帚（broom） | 高粱扫帚，棕黄帚头，倒置立起 |
| sudoku.png/@2x | 数独九宫格（sudoku） | 翻开的题册，九宫格数字与铅笔痕迹 |
| jump_rope.png/@2x | 跳皮筋（jump_rope） | 红色弹力皮筋，松松绕成一圈 |
| eye_patch.png/@2x | 蒸汽眼罩（eye_patch） | 白色蒸汽眼罩，边缘蓬松，热气微散 |
| candied_haw.png/@2x | 冰糖葫芦（candied_haw） | 三颗红山楂串，晶亮糖壳反光 |
| honey_tea.png/@2x | 蜂蜜柚子茶（honey_tea） | 玻璃杯盛金黄柚子茶，杯壁水珠 |
| moms_lunchbox.png/@2x | 妈妈做的便当（moms_lunchbox） | 打开的双层保温饭盒，饭菜热气腾腾 |
| scream_chicken.png/@2x | 尖叫鸡（scream_chicken） | 黄色橡胶鸡，圆滚滚，捏扁的嘴 |
| cooling_oil.png/@2x | 清凉油（cooling_oil） | 小圆铁盒清凉油，绿色膏体露出 |
| earplug.png/@2x | 隔音耳塞（earplug） | 橙色泡沫耳塞两枚，捏成锥形 |

### assets/ui/　战斗 UI 装饰图标（#FF00FF 纯色底，同全局色键规则；每张配 @2x）

新增目录（战斗 UI 美术轮需求）。两套图标当前均为代码程序绘制，出图后研发替换为贴图、失败自动回落程序绘制。

| 文件 | 尺寸（基础/@2x） | 用途（接入点） | 规格 |
| --- | --- | --- | --- |
| ui_vs_badge.png/@2x | 64×64 / 128×128 | 交战弹层中轴 VS 徽章（`combat_exchange.js` _renderVs，渲染位 r=24 圆 + r=30 外环光晕） | 正圆徽章居中主体直径 48，四周留 8px 光晕余量；羊皮纸底圆牌 #FFFDF9 + 金描边 #FACC15，中央「VS」艺术字（粗衬线/金属质感，可掺深红棕 #7C2D12）；外圈一圈淡金光环。无方向性（中轴对称锚点，不可歪） |
| ui_rank_ss.png/@2x | 96×96 / 192×192 | 胜利结算评级印章 SS（turns ≤ 2） | 圆形印章/蜡封质感，主体直径 68 居中；印泥红 #DC2626 双圈描边，中央「SS」大字；**SS 顶格**：鎏金渐变字 + 金色星光点缀，与 S 拉开档次 |
| ui_rank_s.png/@2x | 96×96 / 192×192 | 胜利结算评级印章 S（turns ≤ 4） | 同上壳形；「S」大字朱红实心，外圈加一道金色环（红金双圈） |
| ui_rank_a.png/@2x | 96×96 / 192×192 | 胜利结算评级印章 A（其余） | 同上壳形；「A」大字素红单圈，最朴素一档 |

> 印章统一要求：粗衬线字居中；「EVALUATION」小字与评级规则（SS/S/A 判定）由代码叠画，**出图不含小字**；三档壳形同构、仅质感与配饰递进，摆在一起要有明确强度阶梯。
> 色键安全：#DC2626 印泥红与键色 #FF00FF 距离充足，色键容差 20 内无互吃风险。

### assets/backgrounds/　剧情场景背景（16:9，不透明整幅，无需抠图；480×270 基础档 + @2x 960×540）
| 文件 | 场景 | 剧本用途 / 配套 BGM |
| --- | --- | --- |
| bg_opening.png/@2x | 黄昏校门·压抑暮色+一扇绿光窗（无文字） | S1 开场叙事四页文案背景；bgm_suspense |
| bg_title.png/@2x | 黄昏教室·铅笔如剑插课桌，黑板区留空 | S2 标题画面（标题文字代码叠在黑板处）；bgm_suspense |
| bg_classroom.png/@2x | 六8班教室·早读暖阳 | 序章开场、S3 角色选择（虚化压暗）、自由活动安全区；bgm_classroom / bgm_suspense |
| bg_street.png/@2x | 校外小巷·黄昏（含流动小吃车） | 出校门明雷探索、商贩/混混战斗；bgm_street / bgm_battle_normal |
| bg_home.png/@2x | 同学家·日常暖光（男线范文默家/女线何妍熹家共用） | 进门初段，正常氛围 |
| bg_home_eerie.png/@2x | 同学家·异变（绿灯、书山、漂浮纸张） | 反转高潮：发现走火入魔瞬间切换；bgm_eerie_revelation + sfx_shock_sting |

> 场景为无人空镜，人物一律用立绘/行走图叠加；日常家与异变家构图同源，切换时做 0.3s 闪白/暗场即可。

### assets/props/　战棋地图散件/障碍物（#FF00FF 纯色底，48px/格，含 @2x）
| 文件 | 尺寸（基础/@2x） | 占格 | 备注 |
| --- | --- | --- | --- |
| prop_school_gate | 144×96 / 288×192 | 3×2 | 不锈钢伸缩校门栏杆，正俯视 |
| prop_snack_cart | 96×96 / 192×192 | 2×2 | 红白遮阳伞流动小吃车（轻微 3/4 俯视，GBA 惯例，可读性优先） |
| prop_streetlight | 48×96 / 96×192 | 1×2 | 锈蚀路灯，自带暖黄圆形光晕 |
| prop_trash_bin | 48×48 / 96×96 | 1×1 | 老式绿色铁皮垃圾桶 |
| prop_bicycle | 48×48 / 96×96 | 1×1 | 倒地二八大杠，正俯视 |

### assets/tiles/　地面平铺素材（整幅不透明，48×48 + @2x 96，代码 repeat 平铺）
| 文件 | 用途 |
| --- | --- |
| tile_pavement | 校外水泥/柏油路面（第 1 战 校门外） |
| tile_brick | 红砖人字铺小巷（第 2 战 巷内） |

> 方案裁决（用户拍板用散件方案 B，美术附议）：不出整张 AI 战棋底图（透视/网格不可控、无法高亮格子）；地面代码平铺、散件按格摆放，色键规则同角色图。脚本 `work_ref/make_props.py` 可复跑。

### 外部 CC0 素材（已实测下载、筛选、对齐 48px 网格；详见 EXTERNAL_ASSETS.md）
* `assets/tiles/kenney/`：Kenney《Roguelike Modern City》CC0 精选地砖 5 张（柏油路/人行道/红砖/草地/斑马线，48+@2x）+ 完整精灵表 roguelikeCity_transparent_full.png（16+1 步距，Tiled 可直接导入）
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
* **`assets/` 是唯一交付目录**：portraits/art/items/ui 里的图片全部统一为 **#FF00FF 纯色底**，文件名与尺寸不变，研发直接按 ID 引用；后期统一色键 #FF00FF 即得透明底（角色配色中无此色，容差 20 内即可抠净）
* **`backup/transparent_v1/`**：早期色键透明底版本，仅留档备份，研发不要引用
* 不再保留任何并行图片目录；全部纯色底均从 1024 母版直接生成（头像边缘泛洪、立绘/道具按主体包围盒贴洋红画布），脚本 `work_ref/make_solid.py` 可复跑

## 3. 与研发规范的差异说明（美术主观决策）

1. **头像角度**：全部 30° 三分之四侧脸，不出纯正面（用户硬要求）。
2. **底色策略（按用户要求）**：assets/ 内统一交付 #FF00FF 纯色底图，透明底由后期统一色键完成；早期透明版已移至 `backup/transparent_v1/` 留档。AI 无法直出 alpha，洋红是选定的标准键色。
3. **@2x 版本**：每个图额外给 2 倍尺寸，供高清屏/放大演出选用，不用可忽略。
4. **敌人头像**：vendor/punk 只出立绘未出 96 头像（P0 敌人不进对话/选人）；需要半天可补。
5. **双形态立绘**：范文默、何妍熹各有 default（正常）+ corrupted（异变）两套，剧情前段用 default，反转瞬间切 corrupted，反差最大化（用户明确要求）。
6. **行走图 assets/sprites/ 暂缺（刻意）**：AI 直接生成四方向多帧 spritesheet 帧对齐不可靠，建议先用免费包占位：gegx WALK PACK PIXEL、kettoman 32×32 三人包；角色定制行走图排到 P1 用 Aseprite 按立绘拆帧。
7. **道具补了 newbie_pencil**：武器系统需要图标，规范清单里没有，主动补齐。
8. **BGM 协议**：classroom/suspense 为 CC-BY（OGA 上同情绪的 CC0 备选较少，这两首最对味），已在 credits 登记署名；其余全部 CC0 或原创。
9. **原始母版**：1024 级 AI 原图存在 `work_ref/raw/`，音频下载源与合成脚本在 `work_ref/audio_src/`，需要重裁切/换格式不用重新生成。

## 4. 后续待补（不阻塞 P0）
- 表情扩展（worried/angry/laughing/surprised）：同一提示词追加表情词即可批量出
- vendor/punk 头像、两位异变同学的更多异变阶段
- 定制行走 spritesheet（P1）
- 章节通关曲（可用 Junkala《Ending》备选，源文件已在 work_ref）
