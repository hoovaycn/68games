# 剧情立绘「角色-形象-情绪」三层架构设计稿（待确认）

> 目标：把现在混在一起的「形象」（警察/战损/魔化/机械）从「情绪」里拆出来，并把情绪精简到 6 个，做到「情绪与美术文件彻底解耦」。

---

## 一、统一情绪词表（6 个，脚本层只写这些）

| 情绪 id | 中文 | 归并掉的旧词 |
| :--- | :--- | :--- |
| `default` | 默认 | default |
| `smile` | 笑 | smile / gentle / loving / warm / relieved |
| `frown` | 皱眉 | resolute / stern / command / smirk / cold / alert / angry / thinking / concerned / protective |
| `cry` | 哭泣 | sad / pain |
| `awkward` | 尴尬 | nervous |
| `shock` | 惊讶 | shock / panic |

> 说明：`corrupted`、`police`、`machine`、`battle_damaged`、`1839`、`imperial_commissioner` 等**不是情绪，是「形象」**，从情绪里拆出去。

---

## 二、形象词（作为「角色-形象」id 的后半段）

`default`（默认）· `corrupted`（魔化/黑化）· `police`（警察）· `police_damaged`（警察战损）· `battle_damaged`（战损）· `machine`（机械）· `old`（苍老）· `heavy`（重甲）· `1839`（清末）· `opium_god`（鸦片神）· `imperial_commissioner`（钦差）· `palace`（宫殿）· `dissolve`（光粒消散）· `charge`（冲锋）· `hug`（拥抱）· `aim`（瞄准）· `choke`（窒息）· `pale`（苍白）· `burnt`（火海生还）· `stealth`（潜行风衣）· `young`（少年）

---

## 三、角色-形象 id 完整清单

> 组合规则：`{基础角色}-{形象}`，用 `-` 连接。基础角色名沿用现有角色 id 主体。

### 主角 / 双线伙伴

| 角色-形象 id | 中文 | 形象来源（旧） |
| :--- | :--- | :--- |
| `zhangzixiao-default` | 张子骁·默认 | zhangzixiao |
| `zhangzixiao-corrupted` | 张子骁·魔化 | zhangzixiao + corrupted |
| `zhangzixiao-adult` | 张子骁·成年 | mc_adult_zixiao |
| `shiyunuo-default` | 石予诺·默认 | shiyunuo |
| `shiyunuo-corrupted` | 石予诺·魔化 | shiyunuo + corrupted |
| `shiyunuo-adult` | 石予诺·成年 | mc_adult_yunuo |
| `zhanghanyu-default` / `-corrupted` | 张瀚瑜 | zhanghanyu |
| `chenpinxuan-default` / `-corrupted` | 陈品璇 | chenpinxuan |
| `fanwenmo-default` / `-corrupted` / `-adult` | 范文默 | fanwenmo / fanwenmo_adult |
| `heyanxi-default` / `-corrupted` / `-adult` | 何妍熹 | heyanxi / heyanxi_adult |
| `qinruiyi-default` / `-corrupted` | 覃瑞怡 | qinruiyi |
| `zhangxizhe-default` / `-corrupted` | 张希哲 | zhangxizhe |
| `zhuyanze-default` / `-corrupted` | 朱晏泽 | zhuyanze |

### 老师 / 大人

| 角色-形象 id | 中文 | 形象来源（旧） |
| :--- | :--- | :--- |
| `teacher_xu-default` | 徐老师·默认 | teacher_xu |
| `teacher_xu-stealth` | 徐老师·潜行风衣 | teacher_xubox_stealth |
| `teacher_xu-burnt` | 徐老师·火海生还 | teacher_xu_burnt |
| `teacher_xu-young` | 少年徐老师 | young_xu |
| `adult_liu-default` | 刘老师·默认 | adult_liu |
| `adult_liu-burnt` | 刘老师·火海生还 | teacher_liu_burnt |
| `adult_liu-young` | 少年刘老师 | young_liu |
| `father_haifeng-default` | 海峰·默认 | father_haifeng |
| `father_haifeng-police` | 海峰·警察 | father_haifeng + police |
| `father_haifeng-police_damaged` | 海峰·警察战损 | father_haifeng + police_damaged |
| `father_haifeng-battle_damaged` | 海峰·战损 | father_haifeng + battle_damaged |
| `father_haifeng-burnt` | 海峰·火海生还 | haifeng_burnt |
| `teacher_pe-default` / `-corrupted` | 体育老师 | teacher_pe |

### 阿瑶体系

| 角色-形象 id | 中文 | 形象来源（旧） |
| :--- | :--- | :--- |
| `ayao-default` | 阿瑶·少女 | ayao |
| `ayao-corrupted` | 阿瑶·魔化少女 | ayao + corrupted |
| `ayao-adult` | 阿瑶·32岁真容 | ayao_adult |
| `ayao-corrupted_god` | 阿瑶·第一形态 | ayao_corrupted_god |
| `ayao-corrupted_god-machine` | 阿瑶·第一形态·机械 | ayao_corrupted_god + machine |
| `ayao-final_form` | 阿瑶·第二形态 | ayao_final_form |
| `ayao-aged_2046` | 阿瑶·2046休眠体 | ayao_aged_2046 |
| `su_wan_doctor` | 苏晚医生（独立） | su_wan_doctor |

### 第二幕 · 虎门

| 角色-形象 id | 中文 | 形象来源（旧） |
| :--- | :--- | :--- |
| `shen_guard-default` | 黑衣死士 | shen_guard |
| `shen_wanting-old` | 沈万廷·苍老 | shen_wanting |
| `shen_chongli-default` | 沈崇礼 | shen_chongli |
| `shen_chongli_soul-default` | 沈崇礼之魂 | shen_chongli_soul |
| `shen_wanting_soul-default` | 沈万廷之魂 | shen_wanting_soul |
| `militia_instructor-1839` | 民团教头 | militia_instructor |
| `berserker_guard-heavy` | 重装狂暴死士 | berserker_guard |
| `boss_colossus-opium_god` | 百年巨灵 | boss_colossus |
| `lin_zexu-imperial_commissioner` | 林则徐·钦差 | lin_zexu |
| `emperor_daoguang-palace` | 道光帝 | emperor_daoguang |
| `foreign_sailor-1839` | 武装水手 | foreign_sailor |
| `comprador_assassin-1839` | 初代买办死士 | comprador_assassin |
| `fushoutang_shopkeeper-1839` | 福寿堂掌柜 | fushoutang_shopkeeper |

### 第一幕 · NPC

| 角色-形象 id | 中文 | 形象来源（旧） |
| :--- | :--- | :--- |
| `vendor-default` | 流动商贩 | vendor |
| `punk-default` | 高年级混混 | punk |
| `senior_athlete-default` / `-corrupted` | 外校体育生 | senior_athlete |
| `senior_athlete_leader-default` / `-corrupted` | 外校队长 | senior_athlete_leader |
| `senior_student-corrupted` | 学长 | senior_student |
| `classmate_boy-default` / `-corrupted` | 男同学 | classmate_boy |
| `classmate_girl-default` / `-corrupted` | 女同学 | classmate_girl |
| `coach-default` / `-corrupted` | 坏教练 | coach |
| `grade1_student-default` | 一年级学生 | grade1_student |
| `mystery_man-default` / `-corrupted` | 幻境坏家长 | mystery_man |
| `parent_rep-default` | 家长代表 | parent_rep |
| `shadow_woman-default` | 神秘女子 | shadow_woman |
| `janitor-default` | 传达室大爷 | janitor |

### 第三幕 · 战斗单位（单形象 default）

`enforcer_abiao` · `porter_blueeye` · `boss_viper_smuggler` · `sailor_berserk` · `boss_exam_captain` · `officer_100` · `probe_machine` · `boss_hunter_alpha` · `patrol_robot_exam` · `boss_ai_topstudent` · `boss_storm_mech` · `alloy_deathsworn` · `hound_riot` · `boss_iron_scorpion` · `fanatic_bomber` · `hold_gate_guard` · `pillar_neural_lock` · `repair_spider` · `boss_judgement_core` · `capital_guard_mech` · `sniper_dock` · `shadow_parasite` · `chronos_puppet` · `shadow_cloaked_leader` · `shadow_cloaked_agent`

> 这些战斗单位无形象/情绪差分，脚本写 `leftPortrait: 'xxx'`（不加 `-default` 也行，系统兜底按 default 处理）。

---

## 四、配置表结构（代码层最终形态）

```js
// key = 角色-形象 id；value = { 情绪 → 文件 basename }
const ART_EMOTION_FILES = {
  'father_haifeng-police': {
    default: 'father_haifeng_police',
    frown: 'father_haifeng_police',      // 缺 frown 图时回退 default
    smile: 'father_haifeng_loving'
  },
  'ayao-adult': {
    default: 'ayao_adult_default',
    smile: 'ayao_adult_smile',
    cry: 'ayao_adult_tearful'
  }
  // ...
};
```

脚本用法：

```js
{
  speaker: '海峰警官',
  leftPortrait: 'father_haifeng-police',   // 角色-形象
  leftEmotion: 'frown',                     // 6 情绪之一
  ...
}
```

兜底：情绪没图 → 回退该角色-形象的 `default`；角色-形象没登记 → 画占位框。

---

## 五、待你确认的命名点

1. 海峰基础角色名用 `father_haifeng`（沿用现有 id）还是简化成你例子里写的 `haifeng`？
2. 单形象角色（如 `vendor`、`punk`）要不要统一也带 `-default` 后缀，还是保持短 id `vendor` 由系统兜底？
3. `su_wan_doctor`（苏晚医生）作为独立角色保留，还是并入阿瑶的形象（`ayao-doctor`）？
4. 情绪 id 用英文（`frown`/`cry`/`awkward`）还是中文拼音？我暂定英文。
