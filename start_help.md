# 项目启动说明 (start_help)

本项目为纯前端战棋游戏，固定运行端口为 **8888**。
零依赖：不需要 npm install，只要本机装有 Node.js（`node -v` 能出版本号即可）。

---

## 快速启动（一条命令）

在终端进入项目根目录 `E:\WorkBuddy\fx_game` 后执行：

```powershell
node scripts/serve.mjs
```

可选参数：`node scripts/serve.mjs --port 8888 --root <目录>`（默认端口 8888，根目录=项目根）。

> macOS / Linux 备选（需装 Python3）：
> ```bash
> cd /path/to/fx_game && python3 -m http.server 8888
> ```
> 注意把路径换成本机实际路径；本工程在 Windows 上没有 Python，请一律用上面的 node 方式。

---

## 浏览器访问地址

启动成功后在浏览器打开：

```text
http://127.0.0.1:8888
```

终端看到 `[fx_game] 静态服务已启动` 即为成功。

---

## 常用管理命令（Windows PowerShell）

- **查看 8888 端口占用**：
  ```powershell
  netstat -ano | findstr :8888
  ```

- **关闭/停止 8888 服务**：
  - 方式一：在运行服务的终端窗口按 `Ctrl+C`（推荐）
  - 方式二：先用上面 netstat 找到 PID（最后一列），再：
    ```powershell
    taskkill /PID <找到的PID> /F
    ```
