# 项目启动说明 (start_help)

本项目为纯前端战棋游戏，固定运行端口为 **8888**。

---

## 快速启动（一条命令）

在终端进入项目根目录后执行：

```bash
cd /Users/hoovay/Doubao/fx_game && python3 -m http.server 8888
```

---

## 浏览器访问地址

启动成功后，在浏览器打开：

```text
http://127.0.0.1:8888
```
或
```text
http://localhost:8888
```

---

## 常用管理命令

- **查看 8888 端口占用**：
  ```bash
  lsof -i :8888
  ```

- **关闭/停止 8888 服务**：
  ```bash
  kill $(lsof -t -i :8888)
  ```
