# craft-cli CLI 参考

Craft Agent server 的终端客户端。它通过 WebSocket（`ws://` 或 `wss://`）连接到正在运行的 headless server。

## 前置条件

- 已安装 [Bun](https://bun.sh/) 运行时
- 对于 `run` 和 `--validate-server`：需要通过 `--api-key`、`$LLM_API_KEY` 或供应商专用环境变量（例如 `$ANTHROPIC_API_KEY`）提供 API key
- 对于其他所有命令：需要一个正在运行的 Craft Agent headless server，并提供 URL 和 token

## 安装

```bash
# 克隆仓库
git clone https://github.com/anthropics/craft-agents.git
cd craft-agents

# 安装依赖
bun install

# 方式 A：直接运行
bun run apps/cli/src/index.ts <command>

# 方式 B：全局 link（把 craft-cli 加入 PATH）
cd apps/cli && bun link
craft-cli <command>
```

### 快速开始

最快的试用方式，无需手动配置 server：

```bash
# 自包含运行（自动启动 server）
ANTHROPIC_API_KEY=sk-... bun run apps/cli/src/index.ts run "Hello, world!"
```

## 连接选项

| Flag | 环境变量 | 默认值 | 说明 |
|------|----------|--------|------|
| `--url <ws[s]://...>` | `CRAFT_SERVER_URL` | — | Server WebSocket URL |
| `--token <secret>` | `CRAFT_SERVER_TOKEN` | — | 认证 token |
| `--workspace <id>` | — | 自动检测 | Workspace ID |
| `--timeout <ms>` | — | `10000` | 请求超时时间 |
| `--tls-ca <path>` | `CRAFT_TLS_CA` | — | 自签名 TLS 使用的自定义 CA 证书 |
| `--json` | — | `false` | 输出原始 JSON，便于脚本处理 |
| `--send-timeout <ms>` | — | `300000` | `send` 命令超时时间（5 分钟） |

命令行 flag 优先级高于环境变量。如果省略 `--workspace`，CLI 会自动检测第一个可用 workspace。

## 命令

### 信息与健康检查

```bash
craft-cli ping              # 验证连接（clientId + 延迟）
craft-cli health            # 检查凭据存储健康状态
craft-cli versions          # 显示 server 运行时版本
```

### 资源列表

```bash
craft-cli workspaces        # 列出所有 workspaces
craft-cli sessions          # 列出 workspace 内的 sessions
craft-cli connections       # 列出 LLM connections
craft-cli sources           # 列出已配置的 sources
```

### Session 操作

```bash
craft-cli session create [--name <n>] [--mode <m>]  # 创建 session
craft-cli session messages <id>                     # 打印消息历史
craft-cli session delete <id>                       # 删除 session
craft-cli cancel <id>                               # 取消处理中任务
```

### 发送消息（Streaming）

```bash
# 发送消息，并实时流式输出 AI 回复
craft-cli send <session-id> <message>

# 从 stdin 管道输入文本
echo "Summarize this file" | craft-cli send <session-id>

# 显式从 stdin 读取
cat document.txt | craft-cli send <session-id> --stdin
```

`send` 命令会订阅 session events，并把它们流式输出到 stdout：

- `text_delta`：内联流式文本
- `tool_start`：`[tool: name]` 标记
- `tool_result`：工具输出（截断到 200 个字符）
- `error`：打印到 stderr，退出码为 1
- `complete`：退出码为 0
- `interrupted`：退出码为 130

### 高级用法

```bash
# 原始 RPC 调用：发送任意 channel 和 JSON args
craft-cli invoke <channel> [json-args...]

# 订阅 push events（Ctrl+C 停止）
craft-cli listen <channel>
```

示例：

```bash
craft-cli invoke system:homeDir
craft-cli invoke sessions:get '"workspace-123"'
craft-cli listen session:event
```

### Run（自包含）

```bash
craft-cli run <prompt>
craft-cli run --workspace-dir ./project --source github "List open PRs"
```

`run` 命令是完整自包含流程：它会启动 headless server、创建 session、发送 prompt、流式输出回复，然后退出。无需单独配置 server。API key 会从 `--api-key`、`$LLM_API_KEY` 或供应商专用环境变量（例如 `$ANTHROPIC_API_KEY`、`$OPENAI_API_KEY`）解析。

| Flag | 默认值 | 说明 |
|------|--------|------|
| `--workspace-dir <path>` | — | 运行前注册 workspace 目录 |
| `--source <slug>` | — | 启用 source（可重复传入） |
| `--output-format <fmt>` | `text` | 输出格式：`text` 或 `stream-json` |
| `--mode <mode>` | `allow-all` | session 的权限模式 |
| `--no-cleanup` | `false` | 退出时跳过 session 删除 |
| `--server-entry <path>` | — | 自定义 server 入口 |

**LLM 配置：**

| Flag | 环境变量回退 | 默认值 | 说明 |
|------|--------------|--------|------|
| `--provider <name>` | `LLM_PROVIDER` | `anthropic` | 供应商：`anthropic`、`openai`、`google`、`openrouter`、`groq`、`mistral`、`xai` 等 |
| `--model <id>` | `LLM_MODEL` | 供应商默认值 | 模型 ID（例如 `claude-sonnet-4-5-20250929`、`gpt-4o`、`gemini-2.0-flash`） |
| `--api-key <key>` | `LLM_API_KEY` | 供应商环境变量 | API key；也会检查 `$OPENAI_API_KEY` 等供应商专用变量 |
| `--base-url <url>` | `LLM_BASE_URL` | — | 代理、OpenRouter 或自托管模型使用的自定义 endpoint |

```bash
# 多供应商示例
craft-cli run --provider openai --model gpt-4o "Summarize this repo"
GOOGLE_API_KEY=... craft-cli run --provider google --model gemini-2.0-flash "Hello"
craft-cli run --provider anthropic --base-url https://openrouter.ai/api/v1 --api-key $OR_KEY "Hello"
```

Prompt 也可以通过 stdin 管道传入：

```bash
echo "Summarize this file" | craft-cli run
cat error.log | craft-cli run "What's causing these errors?"
```

### Validate Server

```bash
# 针对正在运行的 server
craft-cli --validate-server --url ws://127.0.0.1:9100 --token <token>

# 自包含运行（自动启动 server）
craft-cli --validate-server
```

未提供 `--url` 时，`--validate-server` 会自动启动本地 headless server（与 `run` 命令相同），执行验证，然后关闭。

它会运行一套 21 步集成测试，覆盖完整 server 生命周期，包括 source 和 skill 创建：

1. 连接 + handshake
2. `credentials:healthCheck`
3. `system:versions`
4. `system:homeDir`
5. `workspaces:get`
6. `sessions:get`
7. `LLM_Connection:list`
8. `sources:get`
9. `sessions:create`（临时 `__cli-validate-*` session）
10. `sessions:getMessages`
11. 发送消息 + stream（文本回复）
12. 发送消息 + tool use（Bash tool）
13. `sources:create`（临时 Cat Facts API source）
14. 发送消息 + source mention（使用刚创建的 source）
15. 发送消息 + skill create（通过 Bash 写入 SKILL.md）
16. `skills:get`（验证 skill 出现）
17. 发送消息 + skill mention（调用刚创建的 skill）
18. `skills:delete`（清理）
19. `sources:delete`（清理）
20. `sessions:delete`（清理）
21. 断开连接

**注意：** 该测试会修改 workspace 状态：它会创建并删除一个临时 session、source 和 skill。所有资源会在完成后清理。测试会在失败时继续执行并输出摘要。可使用 `--json` 获取机器可读输出。

## 脚本模式

```bash
# 获取 workspace IDs
WORKSPACES=$(craft-cli --json workspaces | jq -r '.[].id')

# 统计每个 workspace 的 session 数量
for ws in $WORKSPACES; do
  COUNT=$(craft-cli --json --workspace "$ws" sessions | jq length)
  echo "$ws: $COUNT sessions"
done

# 创建 session 并捕获 ID
SESSION_ID=$(craft-cli --json session create --name "CI Run" | jq -r '.id')

# 发送消息并等待完成
craft-cli send "$SESSION_ID" "Run the test suite and report results"

# 清理
craft-cli session delete "$SESSION_ID"
```

## TLS / wss://

远程 server 使用 TLS 时：

```bash
# 受信任证书（Let's Encrypt 等）
craft-cli --url wss://server.example.com:9100 ping

# 自签名证书
craft-cli --url wss://server.example.com:9100 --tls-ca /path/to/ca.pem ping
```

`--tls-ca` flag 会在连接前设置 `NODE_EXTRA_CA_CERTS`。也可以在环境中设置 `CRAFT_TLS_CA`。

## 故障排查

| 现象 | 原因 | 修复 |
|------|------|------|
| `Connection timeout` | Server 未运行或无法访问 | 检查 server 是否已启动，确认 URL |
| `AUTH_FAILED` | token 错误 | 检查 `CRAFT_SERVER_TOKEN` 是否与 server 匹配 |
| `PROTOCOL_VERSION_UNSUPPORTED` | 版本不匹配 | 将 CLI 和 server 更新到相同版本 |
| `WebSocket connection error` | 网络问题或 TLS 问题 | 对自签名证书使用 `--tls-ca` |
| `No workspace available` | 尚未创建 workspace | 通过桌面应用或 API 创建 workspace |
