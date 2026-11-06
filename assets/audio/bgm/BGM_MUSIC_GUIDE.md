# BGM 音乐指导（情绪对照表）

> 用途：后续为剧情 / 战斗选配乐时，反复参考本表。
> 存放位置：`assets/audio/bgm/`

## 文件名 → 情绪定位

| 文件名 | 情绪定位 |
| --- | --- |
| bgm_army_approaching.ogg | 宏达、阴森、悬疑 |
| bgm_battle_boss.ogg | 短促、有节奏、战斗、正义感 |
| bgm_battle_normal.mp3 | 普通常规战斗、紧凑、激情 |
| bgm_childhood.ogg | 安详、温情、煽情、感人 |
| bgm_classroom.mp3 | 剧情推进、常规带点诡异 |
| bgm_eerie_revelation.ogg | 慢节奏、阴森、恐怖 |
| bgm_evil_lair.ogg | 空间感、短促节奏感、悬疑、诡异 |
| bgm_gojira_battle.ogg | 宏大感、使命感、宏大叙事 |
| bgm_home_town.ogg | 温情、慢节奏、感人、安全、毫无战斗感 |
| bgm_intense_boss.ogg | 较为强劲的节奏、战斗感 |
| bgm_retro_level3.wav | 强劲节奏、未来科技战斗感、正义感、正义决战感 |
| bgm_street.mp3 | 较为普通的节奏感、普通战斗、剧情节奏转变 |
| bgm_suspense.mp3 | 常规铺底、带点悬疑感 |
| bgm_victory.ogg | 强力节奏、正义感、正义大反攻、援军到来、强力支援、胜利大反扑（音乐长度较短） |

## 情绪转折点 → 推荐 BGM

| 情绪节点 | 推荐 BGM |
| --- | --- |
| 援军到来 / 强力支援 / 胜利大反扑 / 终于来了 | bgm_victory.ogg |
| 惊天反转 / 大阴谋 / 阴森恐怖真相 | bgm_eerie_revelation.ogg |
| 悬疑 / 诡异（未来废墟、邪异场景） | bgm_evil_lair.ogg |
| 如释重负 / 温情感人 / 煽情 / 钩子解开（感性） | bgm_childhood.ogg |
| 宏大使命 / 正义决战（终战） | bgm_retro_level3.wav / bgm_gojira_battle.ogg |
| 常规剧情推进 | bgm_classroom.mp3 |
| 紧张逼近 / 围猎 / 军队压境 | bgm_army_approaching.ogg |
| 常规战斗 | bgm_battle_normal.mp3 |
| 常规铺底悬疑 | bgm_suspense.mp3 |
| BOSS 战 / 强敌 | bgm_intense_boss.ogg / bgm_battle_boss.ogg |

## 使用机制备忘

- 场景级：`sceneData.bgm` 在进入场景时播放。
- 行级转折：在某个 `dialogue` 对象里加 `bgm: 'xxx'`，该句出现时即切换音乐。
- 第三幕（第 21–30 章）的情绪转折点目前大多只有场景级 BGM，缺行级转折时按上表补。
