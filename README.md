# 《六 8 班异闻录》— 校园悬疑战棋 SRPG Demo

纯前端 HTML5 Canvas 战棋角色扮演游戏（火焰纹章式教学关）。零框架、零构建、零 npm 运行时依赖，拷贝即可运行。

---

## 一、拷到别的电脑能用吗？—— 能，条件只有两条

| # | 条件 | 说明 |
|---|------|------|
| 1 | 现代浏览器 | Chrome / Edge / Safari / Firefox 近三年任意版本（用到 Canvas `roundRect`、ES Modules 等 API，Chrome ≥ 99 / Safari ≥ 16 / Firefox ≥ 112） |
| 2 | 一个静态 HTTP 服务 | 项目使用 ES Modules（`<script type="module">`），**浏览器安全策略禁止 file:// 协议直接双击 index.html 打开**，必须通过 HTTP 访问 |

不需要安装 Node.js、不需要 `npm install`（package.json 里的 vite 仅为可选开发工具，运行不依赖）、不需要数据库和任何后端。

---

## 二、快速启动

在项目根目录任选一条命令：

```bash
# macOS / Linux（系统自带 python3）
python3 -m http.server 8888

# Windows（装了 Python 后，注意没有 "3"）
python -m http.server 8888

# 或者用 Node（已装的话）
npx serve -p 8888

# 或者用 PHP（已装的话）
php -S 127.0.0.1:8888
```

然后浏览器打开：<http://127.0.0.1:8888>

关闭服务：`kill $(lsof -t -i :8888)`（macOS/Linux）

---

## 三、拷贝清单（哪些文件必须带）

**必须拷贝（约 29 MB）：**

```
fx_game/
├── index.html          # 唯一入口
├── src/                # 全部游戏逻辑 (ES Modules, 约 240KB)
│   ├── main.js         #   主循环、回合状态机
│   ├── engine/         #   资源加载器(色键抠图)、音频管理器
│   ├── systems/        #   网格/战斗/敌方AI/对话系统
│   ├── ui/             #   渲染器、标题屏、终幕屏、弹窗组件
│   └── data/           #   剧本、关卡、单位、武器、道具配置
└── assets/             # 全部图片与音频资源 (约 28MB)
    ├── art/            #   对话立绘 (#FF00FF 洋红底,加载时自动色键抠图)
    ├── portraits/      #   头像
    ├── backgrounds/    #   场景背景
    ├── audio/          #   BGM + 音效 (mp3/ogg)
    ├── props/kenney/   #   CC0 地砖与街具贴图
    ├── items/          #   道具图标
    └── sprites/        #   精灵图
```

**可以不带（节省约 155 MB）：**

| 目录/文件 | 体积 | 用途 |
|-----------|------|------|
| `work_ref/` | 147 MB | 素材参考页/原始资源下载存档，运行不引用 |
| `backup/` | 6.7 MB | 旧版本备份 |
| `docs/`、`start_help.md` | — | 开发文档，运行不需要 |
| `data/credits.js` | 4 KB | 素材授权登记，可选保留（推荐，见下节） |
| 根目录 `*_bust.png` | 0.5 MB | 临时立绘草稿，代码未引用 |
| `.workbuddy/` | — | 开发助手工作数据 |

一条命令打包最精简可运行包（在上级目录执行）：

```bash
tar --exclude 'fx_game/work_ref' \
    --exclude 'fx_game/backup' \
    --exclude 'fx_game/docs' \
    --exclude 'fx_game/.workbuddy' \
    --exclude 'fx_game/.DS_Store' \
    --exclude 'fx_game/*_bust.png' \
    -czf fx_game_demo.tar.gz fx_game
```

---

## 四、操作方式

| 操作 | 按键 |
|------|------|
| 选人 / 移动 / 攻击 / 确认 | 鼠标左键 |
| 撤销 / 取消（单位归位） | 鼠标右键 或 `ESC` |
| 菜单上下切换 | 滚轮 / 方向键 |
| 确认弹窗（胜利结算 / 战利品） | `回车` / `空格` / `ESC` / 点击 |
| 推进对话 | `回车` / `空格` / 点击 |

游戏流程：开场动画 → 标题 → 选男主/女主 → 剧情对话 → 战斗1（商贩）→ 中段剧情 → 战斗2（混混援军）→ 终幕异变剧情 → 未完待续结算。

---

## 五、素材授权

- 音乐 / 音效：Juhani Junkala 等作品，CC0 1.0（免署名），登记明细见 `data/credits.js`
- 地砖 / 街具贴图：Kenney (kenney.nl)，CC0
- 若公开发布，建议保留 `data/credits.js` 与 `assets/ASSET_MANIFEST.md` 备查

---

## 六、常见问题

**Q：双击 index.html 打开后黑屏/一直转圈？**
A：正常现象。ES Modules 被 file:// 协议拦截，必须按第二节起一个本地 HTTP 服务访问。

**Q：没有声音？**
A：浏览器自动播放策略要求用户先与页面交互，点击一次画面即可出声。

**Q：地图格子全是纯色、没有纹理？**
A：`assets/props/kenney/` 下的 5 个地砖贴图缺失时渲染器自动回退纯色。拷贝时确保 `assets/` 目录完整即可（包含 kc_asphalt / kc_sidewalk / kc_crosswalk / kc_grass / kc_brick_red）。

**Q：窗口太小/太大？**
A：画面按 960×540 设计分辨率自动等比缩放适配视窗，拖大浏览器窗口即可。

---

*技术栈：Vanilla JS (ES Modules) + Canvas 2D + Web Audio · 设计分辨率 960×540 · 12×9 战棋网格*
