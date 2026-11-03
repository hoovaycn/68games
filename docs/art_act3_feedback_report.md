# 《六8班异闻录》第三幕美术资源对接审计与补充需求报告

> **致美术团队 / 美术 Agent：**  
> 技术团队已完成第三幕（第21章至第30章）的全部剧情脚本架构、战棋关卡逻辑打通与全流程自动化自测。  
> 经代码静态分析与本地素材库比对，绝大部分美术资源（背景、关键道具CG、主角立绘及表情差分、核心Boss）均已完美对接并实装。  
> 现将**已就位资源确认表**以及**需补充/精化的 3 项敌人切片与个别建议**汇总如下，供美术同学跟进与增补。

---

## 一、美术资源现状总览

| 资源类别 | 规划总数 | 已就位数量 | 待补充/优化数量 | 对齐状态 |
| :--- | :---: | :---: | :---: | :---: |
| **场景横屏背景图** | 13 | 13 | 0 | **100% 完美就位** |
| **核心道具与剧情特写CG** | 8 | 8 | 0 | **100% 完美就位** |
| **核心角色立绘与表情差分** | 11角色/35张 | 35 | 0 | **100% 完美就位** |
| **战斗单位切片（敌人/Boss）** | 23 | 20 | 3 | **87% 就位（3项暂用兜底）** |

---

## 二、需要美术 Agent 补充的资源清单（共 3 项）

代码中为保证战斗正常可玩，目前对以下 3 个关卡特定敌人使用了**临时兜底头像**。为达到极致的视觉体验，请美术同学按以下文件名和规格补充切片：

| 编号 | 建议交付文件名 | 存放路径 | 规格尺寸 | 对应敌人名称 / 登场关卡 | 视觉设计描述与细节要求 |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | `sniper_dock@2x.png`<br>`sniper_dock.png` | `assets/portraits/` | 192×192 (2x)<br>96×96 (1x) 透底PNG | **码头埋伏狙击手**<br>（第22章九号码头） | **外观**：身穿深色防水雨衣，伏在集装箱顶部的狙击手，佩戴夜视战术目镜（泛微红光），手持加装消音器与瞄准镜的重型改装连发短弩或特种步枪。神情冰冷。 |
| **2** | `shadow_parasite@2x.png`<br>`shadow_parasite.png` | `assets/portraits/` | 192×192 (2x)<br>96×96 (1x) 透底PNG | **时空煞气寄生体**<br>（第23章咨询室破门） | **外观**：由破损古瓷罐泄露的时空黑煞与暗紫色电磁凝聚成的无形寄生怪，外形似扭曲的人形阴影，内部有闪烁的幽暗青光与碎瓷片虚影。 |
| **3** | `chronos_puppet@2x.png`<br>`chronos_puppet.png` | `assets/portraits/` | 192×192 (2x)<br>96×96 (1x) 透底PNG | **时空错乱傀儡**<br>（第23章咨询室暗门） | **外观**：被阿瑶时空法阵操控的傀儡人偶，身体由旧课桌木板、生锈铁丝与黑色缆线拼接而成，头部为无面具木偶，胸口镶嵌发光的时钟齿轮装置。 |

---

## 三、已就位且完成代码实装的资源对照表（验收确认）

### 1. 场景横屏背景图（13/13 全部就位，位于 `assets/backgrounds/`）
- `bg_counseling_room@2x.png`（崇文楼心理咨询室）
- `bg_street_night_rain@2x.png`（废弃水闸泥泞雨巷）
- `bg_pier_night_rain@2x.png`（江边九号码头暴雨夜）
- `bg_future_city_ruins@2x.png`（2046年未来都市废墟）
- `bg_future_square_monument@2x.png`（旧校址烈士纪念广场）
- `bg_resistance_bunker@2x.png`（反抗军地下防空洞基地）
- `bg_sky_exam_core@2x.png`（天梯考场核心层）
- `bg_ayao_stasis_chamber@2x.png`（阿瑶中央休眠维生舱）
- `bg_reactor_core@2x.png`（底层时空喷流反应堆）
- `bg_pier_sunset_cargo@2x.png`（三号船黄昏登船栈桥）
- `bg_cargo_hold_fire@2x.png`（三号船底舱烈火走廊）
- `bg_cargo_top_throne@2x.png`（三号船顶层神座天台）
- `bg_canal_dawn@2x.png`（老运河破晓清晨·大结局）

### 2. 剧情道具与特写 CG（8/8 全部就位，位于 `assets/art/`）
- `cg_future_badge@2x.png`（2046年未来特警警徽）
- `cg_blood_warning_note@2x.png`（泛黄带血的时空预警纸条）
- `cg_mask_100score@2x.png`（满分笑脸神经面具）
- `cg_ayao_broken_pen@2x.png`（阿瑶的断尖旧钢笔）
- `cg_folding_shovel@2x.png`（淬火碳钢折叠工兵铲）
- `cg_snack_crushed@2x.png`（完好无损的怪零食袋/捏碎CG）
- `cg_grad_photo_2006@2x.png`（2006年初中毕业泛黄旧合照）
- `cg_repaired_humen_jar@2x.png`（修补完好的虎门古青瓷罐）

### 3. 战斗小兵与 Boss 切片（20/23 已就位，位于 `assets/portraits/`）
- `enforcer_abiao@2x.png`（三号船盯梢头目·阿彪）
- `porter_blueeye@2x.png`（青眼搬运工）
- `boss_viper_smuggler@2x.png`（走私头目·独眼蝰蛇）
- `sailor_berserk@2x.png`（狂化重装水手）
- `boss_exam_captain@2x.png`（满分治安官·执行队长）
- `officer_100@2x.png`（机械化满分治安官）
- `probe_machine@2x.png`（情绪清扫探针机甲）
- `boss_hunter_alpha@2x.png`（天梯追猎者·阿尔法）
- `patrol_robot_exam@2x.png`（天梯巡考机械人）
- `boss_ai_topstudent@2x.png`（满分优等生智脑）
- `boss_storm_mech@2x.png`（境外重装歼灭者·暴风）
- `alloy_deathsworn@2x.png`（合金自律死士）
- `hound_riot@2x.png`（防暴歼灭猎犬）
- `boss_iron_scorpion@2x.png`（引信守卫长·铁蝎）
- `fanatic_bomber@2x.png`（狂化引爆死士）
- `hold_gate_guard@2x.png`（底舱重型水闸守卫）
- `pillar_neural_lock@2x.png`（外置神经死锁柱）
- `repair_spider@2x.png`（主脑重装修复蛛）
- `boss_judgement_core@2x.png`（万物天梯裁决核心）
- `capital_guard_mech@2x.png`（境外资本重装护卫机甲）

### 4. 角色立绘及差分（全部就位并实装至 `src/engine/avatar.js`）
- `su_wan_doctor`: default, concerned, cold
- `ayao_adult`: default, tearful, smile
- `ayao_corrupted_god`: default, machine
- `ayao_aged_2046`: default, weeping
- `mc_adult_zixiao`: default, gentle, fury, dissolve
- `mc_adult_yunuo`: default, charge, gentle, dissolve
- `fanwenmo_adult`: default, tearful, dissolve
- `heyanxi_adult`: default, aim, hug, dissolve
- `haifeng_burnt`: default, rage, tears
- `teacher_xu_burnt`: default, choke, hug
- `teacher_liu_burnt`: default, choke, hug
- `teacher_xubox_stealth`: default, pale, pain

---
*报告生成完毕，请直接转交美术 Agent。技术团队已预留切片替换接口，素材放入对应目录后即可无缝生效。*
