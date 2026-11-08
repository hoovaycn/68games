# 剧情立绘「角色 + 情绪 → 文件」映射表（供核对）

> 本表是 `src/engine/avatar.js` 中 `ART_EMOTION_FILES` 的人读版。
> 脚本里写 `leftPortrait: '<角色id>'` + `leftEmotion: '<情绪>'`，由系统按此表映射到真实立绘文件。
> 文件名均为 `assets/art/` 目录下、`@2x.png` 双密度版（1x 同名 `.png` 同步存在）。
> 情绪兜底规则：情绪未登记 → 回退该角色 `default`；角色未登记 → 画占位框。
>
> 统一语义情绪词表（脚本层只写这些语义情绪，具体落到哪张图由映射表决定）：
> `default` 默认 · `corrupted` 黑化 · `resolute` 决绝 · `shock` 震惊 · `sad` 悲伤哭泣（已归并 tearful/crying/weeping/tears）· `angry` 愤怒（已归并 fury/rage）· `smile` 微笑 · `gentle` 温柔 · `panic` 惊恐 · `thinking` 沉思 · `command` 号令 · `smirk` 冷笑 · `nervous` 紧张 · `stern` 严厉 · `warm` 温和 · `pain` 痛苦 · `relieved` 释然 · `concerned` 关切 · `cold` 冷峻 · `alert` 警觉 · `loving` 慈爱。其余（`old`/`police`/`machine`/`1839` 等）为非情绪的状态/装扮。

## 主角 / 双线伙伴（剧情里用 `{MC}`/`{ALLY_1}`/`{ALLY_2}` 等引用）

| 角色 id | 中文名 | 情绪 | 立绘文件 |
| :--- | :--- | :--- | :--- |
| zhangzixiao | 张子骁（男线主角） | default / corrupted / resolute / shock / sad / smile | zhangzixiao_default / _corrupted / _resolute / _shock / _sad / _smile |
| shiyunuo | 石予诺（女线主角） | default / corrupted / resolute / shock / thinking / sad | shiyunuo_default / _corrupted / _resolute / _shock / _thinking /（sad→_tearful） |
| zhanghanyu | 张瀚瑜（男线伙伴1） | default / corrupted | zhanghanyu_default / _corrupted |
| chenpinxuan | 陈品璇（女线伙伴1） | default / corrupted | chenpinxuan_default / _corrupted |
| fanwenmo | 范文默（男线伙伴2） | default / corrupted / angry / panic / sad | fanwenmo_default / _corrupted /（angry→_fury）/ _panic /（sad→_crying） |
| heyanxi | 何妍熹（女线伙伴2） | default / corrupted / resolute / shock / gentle / angry / sad | heyanxi_default / _corrupted / _resolute / _shock / _gentle /（angry→_resolute）（sad→_gentle） |
| qinruiyi | 覃瑞怡 | default / corrupted / resolute / sad / relieved | qinruiyi_default / _corrupted / _resolute /（sad→_crying）/ _relieved |
| zhangxizhe | 张希哲 | default / corrupted / smirk / nervous | zhangxizhe_default / _corrupted / _smirk / _nervous |
| zhuyanze | 朱晏泽 | default / corrupted / command / shock | zhuyanze_default / _corrupted / _command / _shock |

## 老师 / 大人

| 角色 id | 中文名 | 情绪 | 立绘文件 |
| :--- | :--- | :--- | :--- |
| teacher_xu | 徐老师 | default / stern / warm / pain | teacher_xu_default / _stern / _warm / _pain |
| adult_liu | 刘老师 | default / protective / relieved | adult_liu_default / _protective / _relieved |
| father_haifeng | 海峰警官 | default / police / police_damaged / battle_damaged / alert / loving | father_haifeng_default / _police / _police_damaged / _battle_damaged / _alert / _loving |
| teacher_xubox_stealth | 徐老师（潜行风衣） | default / pale / pain | teacher_xubox_stealth_default / _pale / _pain |
| haifeng_burnt | 海峰警官（火海生还） | default / angry / sad | haifeng_burnt_default /（angry→_rage）/（sad→_tears） |
| teacher_xu_burnt | 徐老师（火海生还） | default / choke / hug | teacher_xu_burnt_default / _choke / _hug |
| teacher_liu_burnt | 刘老师（火海生还） | default / choke / hug | teacher_liu_burnt_default / _choke / _hug |
| teacher_pe | 体育老师 | default / corrupted | teacher_pe_default / _corrupted |
| young_xu | 少年徐老师 | default | young_xu_default |
| young_liu | 少年刘老师 | default | young_liu_default |

## 第三幕 · 阿瑶体系

| 角色 id | 中文名 | 情绪 | 立绘文件 |
| :--- | :--- | :--- | :--- |
| ayao | 阿瑶（少女期） | default / corrupted | ayao_default / _corrupted |
| ayao_adult | 阿瑶（32岁真容） | default / sad / smile | ayao_adult_default /（sad→_tearful）/ _smile |
| ayao_corrupted_god | 净化裁决者·永恒阿瑶（第一形态） | default / machine | ayao_corrupted_god_default / _machine |
| ayao_aged_2046 | 未来阿瑶（2046休眠体） | default / sad | ayao_aged_2046_default /（sad→_weeping） |
| ayao_final_form | 净化主宰·阿瑶（第二形态） | default | ayao_final_form_default |
| su_wan_doctor | 苏晚医生（阿瑶伪装） | default / concerned / cold | su_wan_doctor_default / _concerned / _cold |

## 第三幕 · 成年大号（`{MC_ADULT}`/`{ALLY_2_ADULT}` 引用）

| 角色 id | 中文名 | 情绪 | 立绘文件 |
| :--- | :--- | :--- | :--- |
| mc_adult_zixiao | 成年张子骁 | default / gentle / angry / dissolve | mc_adult_zixiao_default / _gentle /（angry→_fury）/ _dissolve |
| mc_adult_yunuo | 成年石予诺 | default / gentle / charge / dissolve | mc_adult_yunuo_default / _gentle / _charge / _dissolve |
| fanwenmo_adult | 成年范文默 | default / sad / dissolve | fanwenmo_adult_default /（sad→_tearful）/ _dissolve |
| heyanxi_adult | 成年何妍熹 | default / aim / hug / dissolve | heyanxi_adult_default / _aim / _hug / _dissolve |

## 第二幕 · 虎门相关

| 角色 id | 中文名 | 情绪 | 立绘文件 |
| :--- | :--- | :--- | :--- |
| shen_guard | 黑衣死士 | default | shen_guard_default |
| shen_wanting | 沈万廷 | old | shen_wanting_old |
| shen_chongli | 沈崇礼 | default | shen_chongli_default |
| shen_chongli_soul | 沈崇礼之魂 | default | shen_chongli_soul_default |
| shen_wanting_soul | 沈万廷之魂 | default | shen_wanting_soul_default |
| militia_instructor | 民团教头 | 1839 | militia_instructor_1839 |
| berserker_guard | 重装狂暴死士 | heavy | berserker_guard_heavy |
| boss_colossus | 百年巨灵魔尊 | opium_god | boss_colossus_opium_god |
| lin_zexu | 林则徐 | imperial_commissioner | lin_zexu_imperial_commissioner |
| emperor_daoguang | 道光帝 | palace | emperor_daoguang_palace |
| foreign_sailor | 武装水手 | 1839 | foreign_sailor_1839 |
| comprador_assassin | 初代买办死士 | 1839 | comprador_assassin_1839 |
| fushoutang_shopkeeper | 福寿堂掌柜 | 1839 | fushoutang_shopkeeper_1839 |

## 第一幕 · 杂兵 / NPC

| 角色 id | 中文名 | 情绪 | 立绘文件 |
| :--- | :--- | :--- | :--- |
| vendor | 流动商贩 | default / sad | vendor_default / _sad |
| punk | 高年级混混 | default | punk_default |
| senior_athlete | 外校体育生 | default / corrupted | senior_athlete_default / _corrupted |
| senior_athlete_leader | 外校队长 | default / corrupted | senior_athlete_leader_default / _corrupted |
| senior_student | 学长 | corrupted | senior_student_corrupted |
| classmate_boy | 男同学 | default / corrupted | classmate_boy_default / _corrupted |
| classmate_girl | 女同学 | default / corrupted | classmate_girl_default / _corrupted |
| coach | 坏教练 | default / corrupted / sad | coach_default / _corrupted / _sad |
| grade1_student | 一年级学生 | default | grade1_student_default |
| mystery_man | 幻境坏家长 | default / corrupted | mystery_man_default / _corrupted |
| parent_rep | 家长代表 | default | parent_rep_default |
| shadow_woman | 神秘女子 | default | shadow_woman_default |
| janitor | 传达室大爷 | default / old | janitor_old（default 与 old 均指向此文件） |

## 第三幕 · 战斗单位（无情绪差分，统一 default）

| 角色 id | 中文名 | 立绘文件 |
| :--- | :--- | :--- |
| enforcer_abiao | 盯梢头目·阿彪 | enforcer_abiao |
| porter_blueeye | 青眼搬运工 | porter_blueeye |
| boss_viper_smuggler | 走私头目·独眼蝰蛇 | boss_viper_smuggler |
| sailor_berserk | 狂化重装水手 | sailor_berserk |
| boss_exam_captain | 满分治安官·执行队长 | boss_exam_captain |
| officer_100 | 机械化满分治安官 | officer_100 |
| probe_machine | 情绪清扫探针机甲 | probe_machine |
| boss_hunter_alpha | 天梯追猎者·阿尔法 | boss_hunter_alpha |
| patrol_robot_exam | 天梯巡考机械人 | patrol_robot_exam |
| boss_ai_topstudent | 满分优等生智脑 | boss_ai_topstudent |
| boss_storm_mech | 重装歼灭者·暴风 | boss_storm_mech |
| alloy_deathsworn | 合金自律死士 | alloy_deathsworn |
| hound_riot | 防暴歼灭猎犬 | hound_riot |
| boss_iron_scorpion | 引信守卫长·铁蝎 | boss_iron_scorpion |
| fanatic_bomber | 狂化引爆死士 | fanatic_bomber |
| hold_gate_guard | 底舱重型水闸守卫 | hold_gate_guard |
| pillar_neural_lock | 外置神经死锁柱 | pillar_neural_lock |
| repair_spider | 机器重装修复蛛 | repair_spider |
| boss_judgement_core | 净化母体核心 | boss_judgement_core |
| capital_guard_mech | 净化机械守卫 | capital_guard_mech |
| sniper_dock | 码头埋伏狙击手 | sniper_dock |
| shadow_parasite | 黑雾寄生体 | shadow_parasite |
| chronos_puppet | 失控傀儡 | chronos_puppet |
| shadow_cloaked_leader | 黑袍首领 | shadow_cloaked_leader |
| shadow_cloaked_agent | 黑袍密探 | shadow_cloaked_agent |
