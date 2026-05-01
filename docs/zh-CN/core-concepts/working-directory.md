# Working Directory（工作目录）

> 原文：https://agents.craft.do/docs/core-concepts/working-directory
>
> 本文是中文摘译版，保留原文结构与关键含义，便于在本仓库内阅读和维护。

> ## 文档索引
>
> 完整文档索引见：https://agents.craft.do/docs/llms.txt
>
> 继续阅读其他页面前，可以先用该索引了解 Craft Agents 文档的完整范围。

Working directory 是 agent 执行命令时使用的当前工作目录，也就是 terminal 中的 `cwd`。默认情况下，文件操作和 bash commands 都以该目录为相对路径起点。

当你让 agent “read the config file” 或 “run the tests” 时，它会从 working directory 开始。你也可以在 conversation 过程中随时切换该目录。

## What Is the Working Directory?

可以把它理解为在 terminal 中运行：

```bash
cd /path/to/project
```

Agent 的下列操作都会从该位置开始：

* 读取文件及其内容
* 创建新文件或覆盖已有文件
* 使用精确文本替换编辑文件
* 通过 Glob 搜索文件名模式
* 通过 Grep 搜索文件内容
* 在该目录上下文中执行 bash commands

Working directory 负责本地直接文件系统访问；Sources 负责通过 MCP tools 连接外部服务。

## Setting Your Working Directory

### Per-Session

点击 chat input 区域的 folder badge，可以设置或修改当前 conversation 的 cwd。Badge 会显示：

* Folder icon 和当前目录名
* 如果目录是 git repository，也会显示 git branch

你可以随时点击 badge 修改 cwd：

* 从 recent directories 中选择
* 浏览并选择新 folder
* 重置为 session 默认 folder

修改会立即生效，之后的 commands 会从新目录运行。

### Workspace Default

可以为 workspace 中的所有新 sessions 设置默认 working directory：

1. 打开 Settings → Workspace Settings
2. 找到 Default Working Directory
3. 点击并选择 folder

此 workspace 下新 sessions 会默认使用该目录。

## Available Tools

以下 SDK-native tools 默认从 cwd 运行：

| Tool | Purpose | Example |
| ---- | ------- | ------- |
| Read | 查看文件内容 | 读取配置文件 |
| Write | 创建或覆盖文件 | 写入新组件 |
| Edit | 精确文本替换 | 修复已有代码中的 bug |
| Glob | 按模式查找文件 | 找出所有 `*.tsx` 文件 |
| Grep | 搜索文件内容 | 查找函数引用 |
| Bash | 执行 shell commands | 运行 tests、git 操作 |

这些 tools 直接操作本地文件系统，不经过 MCP。

## Project Context with CLAUDE.md

如果 working directory 中包含 `CLAUDE.md`，其内容会自动注入 agent context。它适合说明：

* 项目结构和约定
* Build 和 test commands
* 关键文件及用途
* 团队特定 guidelines

示例：

```markdown
# CLAUDE.md

This is a Next.js application with TypeScript.

## Commands

- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run build` - Production build

## Structure

- `src/components/` - React components
- `src/lib/` - Utility functions
- `src/app/` - Next.js app router pages
```

当你用该 working directory 启动 conversation 时，agent 会自动读取此文件。

## Working Directory vs Sources

| Aspect | Working Directory | Sources |
| ------ | ----------------- | ------- |
| Access method | 直接使用 SDK tools，例如 `Read`、`Write`、`Bash` | MCP tools，例如 `mcp__slug__toolname` |
| Scope | 单个本地 folder | 多个 services 或 paths |
| Authentication | 无需认证 | OAuth、API keys、tokens |
| Permission control | SDK permission modes | 每个 source 的 `permissions.json` |
| Project context | `CLAUDE.md` 注入 | `guide.md` instructions |
| Typical use | Coding、本地文件 | 外部服务、远程数据 |

## When to Use Each

### Use Working Directory for...

* 编写和编辑代码
* 运行 build scripts 和 tests
* Git operations，例如 commit、branch、diff
* 读取项目文件和 configs
* 任何涉及本地文件的任务

### Use Sources for...

* 访问 GitHub、Linear、Slack 等外部服务
* 读取 remote APIs
* 连接 cloud databases
* 通过 MCP filesystem server 访问其他位置的文件
* 需要外部服务认证的任务

### Use Both Together

很多 workflow 会同时使用两者：

* 从 Linear 拉取 issues（source），再在代码里修复（working directory）
* 从 web API 读取文档（source），再写本地实现（working directory）
* 从 database 获取数据（source），再在本地生成 reports（working directory）

## Best Practices

### Keep CLAUDE.md updated

维护良好的 `CLAUDE.md` 可以帮助 agent 理解项目结构、约定和常见任务。项目演进时，也要同步更新。

### Use specific directories

Working directory 尽量指向当前项目目录，避免设置为 home folder。这样能让 agent 更聚焦，也能提升性能。

### Leverage git integration

当 working directory 是 git repository 时，agent 可以看到当前 branch，并更有效地使用 git commands。提交前可以用 Explore mode 安全审阅变更。

### Combine with Local Folders

需要偶尔访问多个位置的文件时，可以把 working directory 设置为主项目，并通过 Local Folders 添加其他目录。
