# CLI Client（CLI 客户端）

> 原文：https://agents.craft.do/docs/server/cli.md
>
> 本文是中文摘译版，说明如何通过 CLI 与 Craft Agent server 交互。

## 概览

CLI client 让你从 terminal 操作 Craft Agent server。它适合脚本化、CI、远程 server 验证和快速发送 prompt。

## 常见用途

* 检查 server health
* 列出 workspaces 和 sessions
* 创建 session
* 向 session 发送消息
* 监听事件
* 执行自包含 run

## 连接信息

CLI 通常需要：

* Server URL
* Auth token
* Workspace ID
* 可选 TLS CA

这些值可以通过 flags 或环境变量传入。

## 示例

```bash
craft-cli ping
craft-cli workspaces
craft-cli sessions
craft-cli session create --name "CLI test"
craft-cli send <session-id> "Summarize this repo"
```

## 自包含运行

`run` 命令可以自动启动 server、创建 session、发送 prompt、输出结果并退出。

```bash
craft-cli run "Hello"
craft-cli run --workspace-dir ./project "List the files"
```

## 脚本化建议

* 使用 `--json` 获取机器可读输出
* 在 CI 中显式传入 workspace
* 对长任务设置合理 timeout
* 避免把 token 写入脚本
