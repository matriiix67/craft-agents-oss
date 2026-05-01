# Permissions（权限）

> 原文：https://agents.craft.do/docs/core-concepts/permissions
>
> 本文是中文摘译版，保留原文结构与关键含义，便于在本仓库内阅读和维护。

> ## 文档索引
>
> 完整文档索引见：https://agents.craft.do/docs/llms.txt
>
> 继续阅读其他页面前，可以先用该索引了解 Craft Agents 文档的完整范围。

Craft Agents 可以代表你执行强操作，例如读取文件、运行 commands、修改 documents。为了让你保持控制，应用提供三种 permission modes，用来决定 agent 的自主程度。

你也可以直接让 agent 帮你定制权限。例如：“Allow npm build in Explore mode” 或 “Let me run pytest without prompts”。Agent 会自动更新对应配置。

## Permission Modes

Craft Agents 提供三种权限模式，可用 `SHIFT+TAB` 循环切换：

| Mode | Description | Use Case |
| ---- | ----------- | -------- |
| Explore | 只读探索 | 安全研究和调查 |
| Ask to Edit | 变更前询问 | 默认模式，适合受控工作 |
| Execute | 完全自主执行 | 可信自动化 workflow |

### Explore Mode（Safe Mode）

Explore mode 是只读安全模式，适合研究和分析。Agent 可以收集信息，但不能做变更。

允许的操作：

* `Read`：读取文件内容
* `Glob`：按模式查找文件
* `Grep`：搜索文件内容
* `WebSearch`、`WebFetch`：Web 搜索和内容抓取
* `Task`、`TaskOutput`：Sub-agent tasks
* `TodoWrite`、`SubmitPlan`：计划相关操作
* `LSP`：语言服务器查询，例如 hover、definitions
* 只读 bash commands

被阻止的操作：

* `Write`：创建或覆盖文件
* `Edit`、`MultiEdit`：修改文件内容
* `NotebookEdit`：修改 Jupyter notebooks
* Bash mutation，例如 `rm`、`mv`、`mkdir`
* MCP tool mutation，例如 create、update、delete
* API mutation，例如 POST、PUT、DELETE

当你希望 agent 只研究和分析、不产生意外变更时，使用 Explore mode。

### Ask to Edit Mode（Default）

Ask to Edit 是默认模式，采用三层权限系统：

| Command Type | Behavior |
| ------------ | -------- |
| Safe commands | 自动允许，规则与 Explore mode 相同 |
| Regular commands | 需要确认，可选择 “always allow” |
| Dangerous commands | 需要确认，且不能使用 “always allow” |

当 agent 需要运行非安全 command 时，会出现权限提示：

```text
The agent wants to run: npm install lodash

Allow? [y]es / [n]o / [a]lways allow
```

可选项：

* `y`：允许本次操作
* `n`：拒绝请求
* `a`：本 session 内始终允许该 command，dangerous commands 不支持

### Execute Mode（Allow-All Mode）

Execute mode 让 agent 拥有完整自主执行能力。操作会直接运行，不再逐步提示，适合快速、连续的可信 workflow。

该模式会绕过 permission prompts，只应在你充分信任当前任务和操作时使用。

## Switching Modes

按 `SHIFT+TAB` 可以循环切换权限模式：

```text
Explore → Ask to Edit → Execute → Explore → ...
```

当前模式会显示在界面中，方便确认 agent 当前的自主级别。

## Dangerous Commands

Dangerous commands 是需要额外谨慎的一类非安全 commands：

* Regular commands：session 内可以通过 “always allow” 自动允许
* Dangerous commands：每次都必须单独确认
* `curl` / `wget`：选择 “Always allow” 时白名单按 domain 生效

在 Execute mode 中，dangerous commands 也会自动运行。

```text
rm, rmdir               # 删除文件或目录
mv, cp                  # 移动或复制文件，可能覆盖
sudo, su                # 权限提升
chmod, chown, chgrp     # 权限修改
dd, mkfs, fdisk, parted # 磁盘操作
kill, killall, pkill    # 终止进程
reboot, shutdown, halt, poweroff # 系统控制
curl, wget              # 网络下载
ssh, scp, rsync         # 远程访问或传输
git push                # 推送到远端仓库
git reset               # 重置 git 状态
git rebase              # 重写 git history
git checkout            # 可能丢弃变更
```

## Safe Commands

Explore mode 允许一组只读 commands，这些 commands 在任意模式下都会自动放行。

### File exploration

```text
ls, ll, la, tree
cat, head, tail, less, more
file, stat, du, df, wc
bat
```

### Search tools

```text
find, locate, which, whereis, type
grep, rg, ag, ack, fd, fzf
```

### Git（read-only）

```text
git status, git log, git diff, git show
git branch, git tag, git remote
git stash list, git blame, git reflog
```

### GitHub CLI（read-only）

```text
gh pr view/list, gh issue view/list
gh repo view, gh release list
gh api（仅 GET requests）
```

### Package managers（read-only）

```text
npm ls/list/view/outdated/audit
yarn list/info/why/outdated
pnpm list/ls/why/outdated
pip list/show/freeze
cargo tree/metadata
go list/mod graph
```

### Docker & Kubernetes（read-only）

```text
docker ps, images, logs, inspect, stats
kubectl get, describe, logs, top, explain
```

### System info

```text
pwd, whoami, id, uname, hostname
date, uptime, env, ps, free
```

### Text processing

```text
jq, yq, xq, xmllint
sort, uniq, cut, tr, column
sed -n（仅打印模式）
```

### Network diagnostics

```text
ping, traceroute, dig, nslookup
netstat, ss, ip addr/link/route
```

### Version checks

```text
node --version, python --version
npm --version, cargo --version
```

## Customizing Explore Mode

最简单的方式是直接告诉 agent 你的需求：

* “Allow npm build in Explore mode”
* “Let Linear comments work in safe mode”
* “Add bun run test to allowed commands”

Agent 会自动处理配置文件。你也可以手动扩展 Explore mode，允许特定 bash commands、MCP tool patterns、API endpoints，甚至指定可写 paths。

### Permission Configuration

Permissions 通过多层 `permissions.json` 配置：

```text
~/.craft-agent/permissions/default.json
~/.craft-agent/workspaces/{id}/permissions.json
~/.craft-agent/workspaces/{id}/sources/{slug}/permissions.json
```

更具体的配置会扩展通用配置。Source-level patterns 会自动限定在该 source 的 tools 范围内。

### Configuration Schema

```json
{
  "allowedBashPatterns": [
    { "pattern": "^npm run build\\b", "comment": "Allow npm build" },
    { "pattern": "^make\\s+test\\b", "comment": "Allow make test" }
  ],
  "allowedMcpPatterns": [
    { "pattern": "create_draft", "comment": "Allow creating drafts" }
  ],
  "allowedApiEndpoints": [
    { "method": "POST", "path": "/api/drafts", "comment": "Create drafts" }
  ],
  "allowedWritePaths": [
    "tmp/**",
    "*.draft.md"
  ]
}
```

### Pattern Types

`allowedBashPatterns`：匹配 bash commands 的 regex patterns。

```json
{ "pattern": "^npm run (build|test|lint)\\b", "comment": "npm scripts" }
```

`allowedMcpPatterns`：匹配 MCP tool names。Source-level patterns 会自动限定 source，例如在 `linear` source 的 `permissions.json` 中写 `create_comment`，内部会扩展为匹配 `mcp__linear__.*create_comment`。

```json
{ "pattern": "linear_create_comment", "comment": "Allow Linear comments" }
```

`allowedApiEndpoints`：匹配 HTTP method + path。Method 必须是 `GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD` 或 `OPTIONS`，path 使用 regex。

```json
{ "method": "POST", "path": "/api/comments", "comment": "Create comments" }
```

`allowedWritePaths`：允许 Explore mode 写入的 file path glob patterns。

```json
["plans/**", "drafts/**", "*.tmp"]
```

### Example: Allow npm Scripts in Explore Mode

创建 `~/.craft-agent/permissions/default.json`：

```json
{
  "allowedBashPatterns": [
    { "pattern": "^npm run\\b", "comment": "All npm scripts" },
    { "pattern": "^yarn\\b", "comment": "All yarn commands" },
    { "pattern": "^bun run\\b", "comment": "All bun scripts" }
  ]
}
```

### Example: Allow Linear Comments in Explore Mode

创建 `~/.craft-agent/workspaces/{id}/sources/linear/permissions.json`：

```json
{
  "allowedMcpPatterns": [
    { "pattern": "create_comment", "comment": "Allow posting comments" }
  ]
}
```

## Blocked Shell Constructs

即便 command 本身被允许，只要包含潜在危险 shell constructs，也会被阻止。

Command chaining 可能串联危险命令：

```text
&&  ||  ;  |  &  |&
```

Redirects 可能覆盖文件：

```text
>  >>  >&
```

Substitution 可能执行嵌入命令：

```text
$()  `backticks`  <()  >()
```

Control characters 也会被视为 command separators，例如 newlines 和 carriage returns。

对于复合 command，如果每个部分都安全，系统会通过 AST parsing 分别验证。安全 command 与 shell constructs 组合后也可能被拦截，例如 `ls | grep foo` 在 Explore mode 会被阻止。可拆成多个简单 command 分别运行。

## API and MCP Credentials

外部服务 credentials 会被安全处理：

* 加密存放在 `~/.craft-agent/credentials.enc`
* 输入后不会再以明文显示
* 按 workspace 和 source 限定范围
* 由你控制每个 agent 可访问哪些服务

当 agent 需要使用新的 API 时，会提示你提供 credentials。之后这些 credentials 会被安全保存，供后续使用。

## Best Practices

### Start in Explore mode

研究不熟悉的代码或系统时，先用 Explore mode 安全分析，再决定是否修改。

### Use Ask to Edit for normal work

默认 Ask to Edit mode 在效率和控制之间提供了较好的平衡，适合大多数任务。

### Reserve Execute for trusted workflows

Execute mode 适合明确、可重复、你信任 agent 操作的 workflow。

### Customize Explore mode for your workflow

把常用 build commands、test runners 和安全 MCP operations 加到 `permissions.json`，让它们能在 Explore mode 中运行。

### Review before approving

在 Ask to Edit mode 中，批准前先看清楚将要执行的操作，尤其是你不熟悉的变更。
