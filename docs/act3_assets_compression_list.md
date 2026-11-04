# 《六8班异闻录》第三幕待压缩美术资源清单 (Act 3 Asset Compression List)

> **文档用途**：提交美术 Agent / 资源优化人员进行图片无损/微损压缩，以显著减少包体积、降低移动端/低配设备运行显存占用与加载时间。
> **统计概况**：第三幕涉及图片资源共 **156** 个，当前原始总大小约 **45.31 MB**。
> **核心优化目标**：
> 1. **背景图**（单张超 1MB~3MB）为头号压缩对象，使用 TinyPNG / squoosh 等工具压缩后，体积通常可减少 50%~70%；
> 2. **立绘与头像**（带 Alpha 透明通道），在保持人物边缘羽化不泛绿/泛白的前提下，使用 pngquant / oxipng 进行无损/高保真压缩；
> 3. **压缩后请保持原有文件名、相对路径、图片尺寸严格不变直接覆盖原文件**。

---

## 一、压缩规范与要求

1. **尺寸必须保持一致**：严禁改变原图像素宽高（特别是 `@2x` 必须与原先宽高严格相同，否则游戏内坐标锚点和战斗棋盘格会偏移错位）。
2. **透明通道保护**：立绘与头像（`assets/art/` 与 `assets/portraits/`）均为透明 PNG，压缩时注意保留纯净 Alpha 通道，不可产生脏黑边或杂色。
3. **推荐压缩工具与参数**：
   - **背景图**：TinyPNG、Squoosh (MozJPEG/WebP/OxiPNG)，目标大小建议控制在 **300KB ~ 600KB** 之间。
   - **立绘图**：pngquant (quality 80-95)、OxiPNG，目标大小建议控制在 **80KB ~ 180KB** 之间。
   - **头像图**：TinyPNG / pngquant，目标大小建议控制在 **20KB ~ 50KB** 之间。

---

## 二、分类待压缩清单（按单文件体积从大到小排序）

### 背景大图 (Backgrounds) (共 34 个文件，总计约 30.74 MB)

| 序号 | 资源文件路径 | 当前大小 | 建议压缩目标 | 状态 |
| :---: | :--- | :---: | :---: | :---: |
| 1 | `assets/backgrounds/bg_counseling_room_machine@2x.png` | **2968.2 KB** | < 600 KB | [ ] 待压缩 |
| 2 | `assets/backgrounds/bg_chongwen_corridor_night@2x.png` | **2560.2 KB** | < 600 KB | [ ] 待压缩 |
| 3 | `assets/backgrounds/bg_chongwen_corridor_office@2x.png` | **2339.9 KB** | < 600 KB | [ ] 待压缩 |
| 4 | `assets/backgrounds/bg_reactor_core@2x.png` | **1447.7 KB** | < 400 KB | [ ] 待压缩 |
| 5 | `assets/backgrounds/bg_resistance_bunker@2x.png` | **1390.9 KB** | < 400 KB | [ ] 待压缩 |
| 6 | `assets/backgrounds/bg_future_city_ruins@2x.png` | **1350.6 KB** | < 400 KB | [ ] 待压缩 |
| 7 | `assets/backgrounds/bg_pier_night_rain@2x.png` | **1311.0 KB** | < 400 KB | [ ] 待压缩 |
| 8 | `assets/backgrounds/bg_sky_exam_core@2x.png` | **1289.0 KB** | < 400 KB | [ ] 待压缩 |
| 9 | `assets/backgrounds/bg_street_night_rain@2x.png` | **1246.4 KB** | < 400 KB | [ ] 待压缩 |
| 10 | `assets/backgrounds/bg_future_square_monument@2x.png` | **1234.0 KB** | < 400 KB | [ ] 待压缩 |
| 11 | `assets/backgrounds/bg_cargo_top_throne@2x.png` | **1199.4 KB** | < 400 KB | [ ] 待压缩 |
| 12 | `assets/backgrounds/bg_ayao_stasis_chamber@2x.png` | **1185.7 KB** | < 400 KB | [ ] 待压缩 |
| 13 | `assets/backgrounds/bg_cargo_hold_fire@2x.png` | **1163.1 KB** | < 400 KB | [ ] 待压缩 |
| 14 | `assets/backgrounds/bg_counseling_room_machine.png` | **938.4 KB** | < 400 KB | [ ] 待压缩 |
| 15 | `assets/backgrounds/bg_counseling_room@2x.png` | **916.1 KB** | < 400 KB | [ ] 待压缩 |
| 16 | `assets/backgrounds/bg_pier_sunset_cargo@2x.png` | **848.5 KB** | < 400 KB | [ ] 待压缩 |
| 17 | `assets/backgrounds/bg_chongwen_corridor_night.png` | **800.4 KB** | < 400 KB | [ ] 待压缩 |
| 18 | `assets/backgrounds/bg_time_passage@2x.png` | **787.1 KB** | < 400 KB | [ ] 待压缩 |
| 19 | `assets/backgrounds/bg_canal_dawn@2x.png` | **702.8 KB** | < 400 KB | [ ] 待压缩 |
| 20 | `assets/backgrounds/bg_chongwen_corridor_office.png` | **680.7 KB** | < 400 KB | [ ] 待压缩 |
| 21 | `assets/backgrounds/bg_reactor_core.png` | **435.4 KB** | < 400 KB | [ ] 待压缩 |
| 22 | `assets/backgrounds/bg_resistance_bunker.png` | **428.2 KB** | < 400 KB | [ ] 待压缩 |
| 23 | `assets/backgrounds/bg_future_city_ruins.png` | **416.9 KB** | < 400 KB | [ ] 待压缩 |
| 24 | `assets/backgrounds/bg_pier_night_rain.png` | **414.8 KB** | < 400 KB | [ ] 待压缩 |
| 25 | `assets/backgrounds/bg_street_night_rain.png` | **403.0 KB** | < 400 KB | [ ] 待压缩 |
| 26 | `assets/backgrounds/bg_sky_exam_core.png` | **395.8 KB** | < 400 KB | [ ] 待压缩 |
| 27 | `assets/backgrounds/bg_ayao_stasis_chamber.png` | **382.6 KB** | < 400 KB | [ ] 待压缩 |
| 28 | `assets/backgrounds/bg_cargo_hold_fire.png` | **382.3 KB** | < 400 KB | [ ] 待压缩 |
| 29 | `assets/backgrounds/bg_cargo_top_throne.png` | **377.8 KB** | < 400 KB | [ ] 待压缩 |
| 30 | `assets/backgrounds/bg_future_square_monument.png` | **376.1 KB** | < 400 KB | [ ] 待压缩 |
| 31 | `assets/backgrounds/bg_counseling_room.png` | **319.1 KB** | < 400 KB | [ ] 待压缩 |
| 32 | `assets/backgrounds/bg_pier_sunset_cargo.png` | **289.2 KB** | < 400 KB | [ ] 待压缩 |
| 33 | `assets/backgrounds/bg_canal_dawn.png` | **266.6 KB** | < 400 KB | [ ] 待压缩 |
| 34 | `assets/backgrounds/bg_time_passage.png` | **232.9 KB** | < 400 KB | [ ] 待压缩 |

### 角色全身/半身立绘 (Art) (共 92 个文件，总计约 13.53 MB)

| 序号 | 资源文件路径 | 当前大小 | 建议压缩目标 | 状态 |
| :---: | :--- | :---: | :---: | :---: |
| 1 | `assets/art/boss_judgement_core@2x.png` | **465.3 KB** | < 150 KB | [ ] 待压缩 |
| 2 | `assets/art/alloy_deathsworn@2x.png` | **396.3 KB** | < 150 KB | [ ] 待压缩 |
| 3 | `assets/art/officer_100@2x.png` | **372.4 KB** | < 150 KB | [ ] 待压缩 |
| 4 | `assets/art/ayao_aged_2046_weeping@2x.png` | **346.0 KB** | < 150 KB | [ ] 待压缩 |
| 5 | `assets/art/boss_viper_smuggler@2x.png` | **344.0 KB** | < 150 KB | [ ] 待压缩 |
| 6 | `assets/art/ayao_aged_2046_default@2x.png` | **342.7 KB** | < 150 KB | [ ] 待压缩 |
| 7 | `assets/art/boss_ai_topstudent@2x.png` | **334.4 KB** | < 150 KB | [ ] 待压缩 |
| 8 | `assets/art/boss_storm_mech@2x.png` | **319.6 KB** | < 150 KB | [ ] 待压缩 |
| 9 | `assets/art/boss_hunter_alpha@2x.png` | **317.1 KB** | < 150 KB | [ ] 待压缩 |
| 10 | `assets/art/ayao_corrupted_god_default@2x.png` | **316.2 KB** | < 150 KB | [ ] 待压缩 |
| 11 | `assets/art/shadow_cloaked_leader@2x.png` | **303.8 KB** | < 150 KB | [ ] 待压缩 |
| 12 | `assets/art/sailor_berserk@2x.png` | **289.3 KB** | < 150 KB | [ ] 待压缩 |
| 13 | `assets/art/sniper_dock@2x.png` | **289.3 KB** | < 150 KB | [ ] 待压缩 |
| 14 | `assets/art/boss_exam_captain@2x.png` | **288.3 KB** | < 150 KB | [ ] 待压缩 |
| 15 | `assets/art/capital_guard_mech@2x.png` | **284.8 KB** | < 150 KB | [ ] 待压缩 |
| 16 | `assets/art/chronos_puppet@2x.png` | **283.7 KB** | < 150 KB | [ ] 待压缩 |
| 17 | `assets/art/boss_iron_scorpion@2x.png` | **283.2 KB** | < 150 KB | [ ] 待压缩 |
| 18 | `assets/art/enforcer_abiao@2x.png` | **283.2 KB** | < 150 KB | [ ] 待压缩 |
| 19 | `assets/art/porter_blueeye@2x.png` | **266.5 KB** | < 150 KB | [ ] 待压缩 |
| 20 | `assets/art/shadow_cloaked_agent@2x.png` | **261.7 KB** | < 150 KB | [ ] 待压缩 |
| 21 | `assets/art/fanatic_bomber@2x.png` | **253.8 KB** | < 150 KB | [ ] 待压缩 |
| 22 | `assets/art/probe_machine@2x.png` | **253.5 KB** | < 150 KB | [ ] 待压缩 |
| 23 | `assets/art/ayao_adult_tearful@2x.png` | **245.0 KB** | < 100 KB | [ ] 待压缩 |
| 24 | `assets/art/ayao_adult_smile@2x.png` | **242.9 KB** | < 100 KB | [ ] 待压缩 |
| 25 | `assets/art/ayao_adult_default@2x.png` | **238.8 KB** | < 100 KB | [ ] 待压缩 |
| 26 | `assets/art/teacher_xubox_stealth_pale@2x.png` | **224.8 KB** | < 100 KB | [ ] 待压缩 |
| 27 | `assets/art/teacher_xubox_stealth_default@2x.png` | **224.1 KB** | < 100 KB | [ ] 待压缩 |
| 28 | `assets/art/su_wan_doctor_concerned@2x.png` | **218.4 KB** | < 100 KB | [ ] 待压缩 |
| 29 | `assets/art/su_wan_doctor_cold@2x.png` | **214.0 KB** | < 100 KB | [ ] 待压缩 |
| 30 | `assets/art/su_wan_doctor_default@2x.png` | **210.1 KB** | < 100 KB | [ ] 待压缩 |
| 31 | `assets/art/repair_spider@2x.png` | **199.0 KB** | < 100 KB | [ ] 待压缩 |
| 32 | `assets/art/pillar_neural_lock@2x.png` | **193.1 KB** | < 100 KB | [ ] 待压缩 |
| 33 | `assets/art/hound_riot@2x.png` | **189.4 KB** | < 100 KB | [ ] 待压缩 |
| 34 | `assets/art/patrol_robot_exam@2x.png` | **183.1 KB** | < 100 KB | [ ] 待压缩 |
| 35 | `assets/art/hold_gate_guard@2x.png` | **177.8 KB** | < 100 KB | [ ] 待压缩 |
| 36 | `assets/art/shadow_parasite@2x.png` | **163.4 KB** | < 100 KB | [ ] 待压缩 |
| 37 | `assets/art/boss_judgement_core.png` | **132.4 KB** | < 100 KB | [ ] 待压缩 |
| 38 | `assets/art/shen_wanting_old@2x.png` | **121.8 KB** | < 100 KB | [ ] 待压缩 |
| 39 | `assets/art/alloy_deathsworn.png` | **116.6 KB** | < 100 KB | [ ] 待压缩 |
| 40 | `assets/art/lin_zexu_imperial_commissioner@2x.png` | **114.5 KB** | < 100 KB | [ ] 待压缩 |
| 41 | `assets/art/father_haifeng_police@2x.png` | **109.2 KB** | < 100 KB | [ ] 待压缩 |
| 42 | `assets/art/officer_100.png` | **105.4 KB** | < 100 KB | [ ] 待压缩 |
| 43 | `assets/art/boss_ai_topstudent.png` | **100.6 KB** | < 100 KB | [ ] 待压缩 |
| 44 | `assets/art/ayao_aged_2046_default.png` | **99.4 KB** | < 100 KB | [ ] 待压缩 |
| 45 | `assets/art/ayao_aged_2046_weeping.png` | **98.5 KB** | < 100 KB | [ ] 待压缩 |
| 46 | `assets/art/boss_viper_smuggler.png` | **96.9 KB** | < 100 KB | [ ] 待压缩 |
| 47 | `assets/art/ayao_corrupted_god_default.png` | **93.8 KB** | < 100 KB | [ ] 待压缩 |
| 48 | `assets/art/sailor_berserk.png` | **93.4 KB** | < 100 KB | [ ] 待压缩 |
| 49 | `assets/art/sniper_dock.png` | **93.4 KB** | < 100 KB | [ ] 待压缩 |
| 50 | `assets/art/enforcer_abiao.png` | **92.3 KB** | < 100 KB | [ ] 待压缩 |
| 51 | `assets/art/boss_exam_captain.png` | **91.8 KB** | < 100 KB | [ ] 待压缩 |
| 52 | `assets/art/boss_hunter_alpha.png` | **90.7 KB** | < 100 KB | [ ] 待压缩 |
| 53 | `assets/art/capital_guard_mech.png` | **88.7 KB** | < 100 KB | [ ] 待压缩 |
| 54 | `assets/art/shadow_cloaked_leader.png` | **87.9 KB** | < 100 KB | [ ] 待压缩 |
| 55 | `assets/art/boss_storm_mech.png` | **85.9 KB** | < 100 KB | [ ] 待压缩 |
| 56 | `assets/art/ayao_default@2x.png` | **85.7 KB** | < 100 KB | [ ] 待压缩 |
| 57 | `assets/art/boss_iron_scorpion.png` | **85.5 KB** | < 100 KB | [ ] 待压缩 |
| 58 | `assets/art/chronos_puppet.png` | **84.1 KB** | < 100 KB | [ ] 待压缩 |
| 59 | `assets/art/porter_blueeye.png` | **83.8 KB** | < 100 KB | [ ] 待压缩 |
| 60 | `assets/art/shadow_cloaked_agent.png` | **81.7 KB** | < 100 KB | [ ] 待压缩 |
| 61 | `assets/art/fanatic_bomber.png` | **77.7 KB** | < 100 KB | [ ] 待压缩 |
| 62 | `assets/art/ayao_adult_default.png` | **74.5 KB** | < 100 KB | [ ] 待压缩 |
| 63 | `assets/art/ayao_adult_tearful.png` | **73.6 KB** | < 100 KB | [ ] 待压缩 |
| 64 | `assets/art/ayao_adult_smile.png` | **73.1 KB** | < 100 KB | [ ] 待压缩 |
| 65 | `assets/art/young_liu_default@2x.png` | **73.0 KB** | < 100 KB | [ ] 待压缩 |
| 66 | `assets/art/qinruiyi_default@2x.png` | **70.1 KB** | < 100 KB | [ ] 待压缩 |
| 67 | `assets/art/su_wan_doctor_cold.png` | **69.8 KB** | < 100 KB | [ ] 待压缩 |
| 68 | `assets/art/teacher_xubox_stealth_default.png` | **69.5 KB** | < 100 KB | [ ] 待压缩 |
| 69 | `assets/art/su_wan_doctor_concerned.png` | **69.4 KB** | < 100 KB | [ ] 待压缩 |
| 70 | `assets/art/su_wan_doctor_default.png` | **69.3 KB** | < 100 KB | [ ] 待压缩 |
| 71 | `assets/art/teacher_xubox_stealth_pale.png` | **67.9 KB** | < 100 KB | [ ] 待压缩 |
| 72 | `assets/art/probe_machine.png` | **67.6 KB** | < 100 KB | [ ] 待压缩 |
| 73 | `assets/art/zhangxizhe_default@2x.png` | **67.0 KB** | < 100 KB | [ ] 待压缩 |
| 74 | `assets/art/teacher_xu_default@2x.png` | **66.2 KB** | < 100 KB | [ ] 待压缩 |
| 75 | `assets/art/adult_liu_default@2x.png` | **62.9 KB** | < 100 KB | [ ] 待压缩 |
| 76 | `assets/art/zhuyanze_default@2x.png` | **62.6 KB** | < 100 KB | [ ] 待压缩 |
| 77 | `assets/art/patrol_robot_exam.png` | **59.8 KB** | < 100 KB | [ ] 待压缩 |
| 78 | `assets/art/hound_riot.png` | **59.3 KB** | < 100 KB | [ ] 待压缩 |
| 79 | `assets/art/repair_spider.png` | **58.5 KB** | < 100 KB | [ ] 待压缩 |
| 80 | `assets/art/hold_gate_guard.png` | **57.2 KB** | < 100 KB | [ ] 待压缩 |
| 81 | `assets/art/pillar_neural_lock.png` | **54.3 KB** | < 100 KB | [ ] 待压缩 |
| 82 | `assets/art/shen_wanting_old.png` | **39.4 KB** | < 100 KB | [ ] 待压缩 |
| 83 | `assets/art/father_haifeng_police.png` | **37.8 KB** | < 100 KB | [ ] 待压缩 |
| 84 | `assets/art/lin_zexu_imperial_commissioner.png` | **35.1 KB** | < 100 KB | [ ] 待压缩 |
| 85 | `assets/art/ayao_default.png` | **26.9 KB** | < 100 KB | [ ] 待压缩 |
| 86 | `assets/art/qinruiyi_default.png` | **24.5 KB** | < 100 KB | [ ] 待压缩 |
| 87 | `assets/art/young_liu_default.png` | **23.9 KB** | < 100 KB | [ ] 待压缩 |
| 88 | `assets/art/shadow_parasite.png` | **23.8 KB** | < 100 KB | [ ] 待压缩 |
| 89 | `assets/art/zhangxizhe_default.png` | **23.2 KB** | < 100 KB | [ ] 待压缩 |
| 90 | `assets/art/teacher_xu_default.png` | **22.3 KB** | < 100 KB | [ ] 待压缩 |
| 91 | `assets/art/zhuyanze_default.png` | **20.3 KB** | < 100 KB | [ ] 待压缩 |
| 92 | `assets/art/adult_liu_default.png` | **20.1 KB** | < 100 KB | [ ] 待压缩 |

### 战斗单位头像 (Portraits) (共 30 个文件，总计约 1.04 MB)

| 序号 | 资源文件路径 | 当前大小 | 建议压缩目标 | 状态 |
| :---: | :--- | :---: | :---: | :---: |
| 1 | `assets/portraits/boss_hunter_alpha@2x.png` | **79.2 KB** | < 40 KB | [ ] 待压缩 |
| 2 | `assets/portraits/boss_ai_topstudent@2x.png` | **75.1 KB** | < 40 KB | [ ] 待压缩 |
| 3 | `assets/portraits/probe_machine@2x.png` | **68.8 KB** | < 40 KB | [ ] 待压缩 |
| 4 | `assets/portraits/fanatic_bomber@2x.png` | **60.9 KB** | < 40 KB | [ ] 待压缩 |
| 5 | `assets/portraits/officer_100@2x.png` | **57.7 KB** | < 40 KB | [ ] 待压缩 |
| 6 | `assets/portraits/shadow_cloaked_leader@2x.png` | **57.1 KB** | < 40 KB | [ ] 待压缩 |
| 7 | `assets/portraits/boss_iron_scorpion@2x.png` | **52.9 KB** | < 40 KB | [ ] 待压缩 |
| 8 | `assets/portraits/ayao_adult_tearful@2x.png` | **50.7 KB** | < 40 KB | [ ] 待压缩 |
| 9 | `assets/portraits/ayao_adult_default@2x.png` | **50.7 KB** | < 40 KB | [ ] 待压缩 |
| 10 | `assets/portraits/ayao_adult_smile@2x.png` | **50.2 KB** | < 40 KB | [ ] 待压缩 |
| 11 | `assets/portraits/boss_exam_captain@2x.png` | **49.6 KB** | < 40 KB | [ ] 待压缩 |
| 12 | `assets/portraits/boss_viper_smuggler@2x.png` | **47.8 KB** | < 40 KB | [ ] 待压缩 |
| 13 | `assets/portraits/hold_gate_guard@2x.png` | **44.6 KB** | < 40 KB | [ ] 待压缩 |
| 14 | `assets/portraits/hound_riot@2x.png` | **39.4 KB** | < 40 KB | [ ] 待压缩 |
| 15 | `assets/portraits/patrol_robot_exam@2x.png` | **38.2 KB** | < 40 KB | [ ] 待压缩 |
| 16 | `assets/portraits/boss_ai_topstudent.png` | **22.2 KB** | < 40 KB | [ ] 待压缩 |
| 17 | `assets/portraits/boss_hunter_alpha.png` | **21.6 KB** | < 40 KB | [ ] 待压缩 |
| 18 | `assets/portraits/probe_machine.png` | **18.9 KB** | < 40 KB | [ ] 待压缩 |
| 19 | `assets/portraits/fanatic_bomber.png` | **18.4 KB** | < 40 KB | [ ] 待压缩 |
| 20 | `assets/portraits/officer_100.png` | **16.7 KB** | < 40 KB | [ ] 待压缩 |
| 21 | `assets/portraits/boss_iron_scorpion.png` | **16.0 KB** | < 40 KB | [ ] 待压缩 |
| 22 | `assets/portraits/shadow_cloaked_leader.png` | **15.7 KB** | < 40 KB | [ ] 待压缩 |
| 23 | `assets/portraits/boss_exam_captain.png` | **15.5 KB** | < 40 KB | [ ] 待压缩 |
| 24 | `assets/portraits/ayao_adult_default.png` | **15.4 KB** | < 40 KB | [ ] 待压缩 |
| 25 | `assets/portraits/ayao_adult_tearful.png` | **15.1 KB** | < 40 KB | [ ] 待压缩 |
| 26 | `assets/portraits/ayao_adult_smile.png` | **15.1 KB** | < 40 KB | [ ] 待压缩 |
| 27 | `assets/portraits/hold_gate_guard.png` | **14.1 KB** | < 40 KB | [ ] 待压缩 |
| 28 | `assets/portraits/boss_viper_smuggler.png` | **14.0 KB** | < 40 KB | [ ] 待压缩 |
| 29 | `assets/portraits/patrol_robot_exam.png` | **12.7 KB** | < 40 KB | [ ] 待压缩 |
| 30 | `assets/portraits/hound_riot.png` | **12.6 KB** | < 40 KB | [ ] 待压缩 |

---

## 三、文件覆盖回传确认
- [ ] 所有图片已执行压缩且大小显著缩减。
- [ ] 保持原本相对路径（覆盖到 `assets/backgrounds/`、`assets/art/`、`assets/portraits/`）。
- [ ] 压缩后在本地图片查看器中抽检：透明边缘无破损，背景图无严重色阶断层或水波纹失真。
