# Opening / 标题 / 角色选择 —— 界面流程与文案交付（美术+策划 → 研发）

版本 v1.0（2026-09-15）。设计分辨率统一 **960×540（16:9）**，等比缩放适配窗口；高清屏用 `@2x` 图。所有文字都由代码渲染，不烤进图片。

## 一、状态流总览

```
BOOT
 └─► S1 OPENING 开场叙事（仅首次进游戏自动播放，可点击跳过）
       └─ 任意键/点击逐页推进，末页结束 ─► S2 TITLE
S2 TITLE 标题画面
 └─ 点击屏幕 / 按任意键（sfx_confirm）─► S3 CHAR_SELECT
S3 CHAR_SELECT 角色选择
 ├─ 选中张子骁 ─► 全局 state.protagonist='zhangzixiao' ─► 序章·男线
 ├─ 选中石予诺 ──► state.protagonist='shiyunuo'         ─► 序章·女线
 └─ Esc/取消 ─► 回 S2
```

非首次进游戏：BOOT 直接到 S2（用 localStorage 标记 `seen_opening`，标题菜单保留"开场回放"入口，P1 再做也行）。

---

## 二、S1 OPENING 开场叙事

* 背景：`assets/backgrounds/bg_opening@2x.png`（黄昏校门，楼上一扇绿光窗）
* 动效：背景缓慢放大（Ken Burns，20s 从 100%→106%），叠 35% 黑色压暗 + 轻微暗角；文字打完后整页淡入下一页
* BGM：`bgm_suspense.mp3` 淡入循环；末页结束瞬间播 `sfx_shock_sting.mp3`，画面白闪 1 帧→快速淡出到 S2
* 文字：底部对话框（复用剧情对话 UI），打字机逐字，配 `sfx_text_blip.mp3`；点击/空格/Z 推进，首击若当前页未打完则先补全文字
* 右上角小字："点击跳过 ▶"（点击跳过直接进 S2）

### 文案（共 4 页，逐页出现，别合并）

1. 「北京，海淀。人大附小，六（8）班。」
2. 「开学第三周，一切如常——早读、默写、课间操，还有永远抢不到的乒乓球台。」
3. 「直到那天深夜，徐老师的手机，突然亮了。」
4. 「班里有几位同学，开始做一些……小学生不该做的事。」

> 设计意图：只给异常、不给解释；"不该做的事"是什么，留到序章范文默/何妍熹段落揭晓。第 2 页的轻松日常和第 3、4 页形成落差。

---

## 三、S2 TITLE 标题画面

* 背景：`assets/backgrounds/bg_title@2x.png`（黄昏教室，铅笔如剑插在课桌上，黑板区域留空给标题）
* 元素与位置（960×540 坐标系）：
  * 主标题：**六（8）班异闻录**，居中偏上（y≈120，落在黑板区域），像素风粗体大字，暖白 `#F5E9D0` + 深红 `#7A1F1F` 4px 描边 + 轻微投影；建议做 1s 逐字弹入
  * 副标题：**——文具，即是武器。**，主标题下方 y≈200，小一号，色 `#E8C98A`
  * 底部提示："点击屏幕开始"，y≈480，1.2s 周期呼吸闪烁（透明度 40%↔100%）
  * 右下角极小字版本号 `v0.1`
* BGM：延续 `bgm_suspense`（开场→标题无缝，不切歌）；点击开始时 `sfx_confirm.mp3`，0.4s 白幕过渡到 S3，同时淡出 bgm_suspense
* P0 只做"点击开始"；"继续游戏 / 设置 / 制作名单"位置预留，不实现

---

## 四、S3 CHAR_SELECT 角色选择

* 背景：`assets/backgrounds/bg_classroom@2x.png`，高斯模糊 2px + 40% 黑压暗
* BGM：进入时淡入 `bgm_classroom.mp3`（回到"日常安全区"听感，和开场悬疑形成切换）
* 布局：顶部小标题"选择你的主角"（y≈40）；下方左右两张角色卡（卡片宽 360、高 420，水平居中分布，间距 40）
* 卡片内容（自上而下）：
  * 半身立绘 `assets/art/{id}_default@2x.png`（240×320，色键后贴入，居中）
  * 姓名（像素粗体 28px）
  * 一行灰色人设小字（16px）
  * 一句台词（16px，引号包裹，斜体感可用色 `#E8C98A`）
* 交互：鼠标点击卡片直接选中；键盘 ←/→ 或 A/D 移动焦点，回车/A 键确认；焦点卡片放大 1.04 + 蓝色外发光（男主蓝 `#4A7FD1`、女主粉 `#D16FA0` 跟随角色色系），切换播 `sfx_cursor`，确认播 `sfx_confirm`
* 底部操作提示："←/→ 选择　回车 确认　Esc 返回标题"
* 确认后 0.5s：选中卡放大淡出、其余隐去，进入对应序章；`state.protagonist` 全程决定支线文本与立绘替换

### 两张卡片的文案

| | 男主 | 女主 |
|---|---|---|
| id | zhangzixiao | shiyunuo |
| 姓名 | 张子骁 | 石予诺 |
| 人设 | 六（8）班男生，最近在苦练硬笔书法 | 六（8）班女生，最近在狂背英语单词 |
| 台词 | 「横平竖直，一笔一画——魔物也一样。」 | 「abandon？放弃？我字典里没这个词。」 |
| 初始武器 | 新手铅笔（pencil_novice） | 新手铅笔（pencil_novice） |

---

## 五、资源清单（本次新增）

| 文件 | 用途 |
| --- | --- |
| assets/backgrounds/bg_opening.png / @2x.png | S1 开场背景（480×270 / 960×540，整幅不透明） |
| assets/backgrounds/bg_title.png / @2x.png | S2 标题背景，同上 |
| assets/backgrounds/bg_classroom@2x.png | S3 复用已有教室背景 |
| assets/art/zhangzixiao_default@2x.png、shiyunuo_default@2x.png | S3 立绘（#FF00FF 色键，复用已有管线） |
| assets/portraits/zhangzixiao_default.png 等 | 卡片角标可选复用 96 头像 |
| audio/bgm/bgm_suspense.mp3、bgm_classroom.mp3 | 已有 |
| audio/sfx/sfx_text_blip、sfx_confirm、sfx_cursor、sfx_shock_sting | 已有 |

## 六、验收点
1. 首次进游戏：S1 四页文案逐页推进、可跳过；末页 sting+白闪过 S2。
2. S2 标题文字叠在黑板留白区不遮铅笔主体；点击/按键进 S3，BGM 从悬疑切到教室日常。
3. S3 两卡立绘色键干净、焦点/选中音效齐全；两条线进入的序章剧情对象正确（男→范文默，女→何妍熹）。
4. Esc 从 S3 回 S2；第二次进游戏不再自动播 S1。
