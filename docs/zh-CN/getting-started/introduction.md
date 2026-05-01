# Introduction（简介）

> 原文：https://agents.craft.do/docs/getting-started/introduction
>
> 本文是中文摘译版，保留原文结构与关键含义，便于在本仓库内阅读和维护。

> ## 文档索引
>
> 完整文档索引见：https://agents.craft.do/docs/llms.txt
>
> 继续阅读其他页面前，可以先用该索引了解 Craft Agents 文档的完整范围。

Craft Agents 将 Claude Code 一类的编码能力扩展到更完整的数字工作流。它基于 Claude Agent SDK 构建，在编码之外，也面向审阅、自动执行、多工具协作和日常知识工作。Agent 可以连接 GitHub、Linear、Slack、Craft 文档、本地文件，以及你接入的任意 API。

## Craft Agents 的不同之处

### 熟悉的界面

Craft Agents 的收件箱体验接近邮件和任务管理器的组合。每个 conversation 都有状态，可以跨 session 保留，也能按你的工作方式组织。Agent 执行前的计划可以像文档一样被审阅，体验接近审阅同事交付的工作。

### 连接任何工具

Sources 让 agent 访问外部工具，包括 MCP servers、REST APIs 和本地文件。

| Source 类型 | 示例 | 能做什么 |
| ----------- | ---- | -------- |
| MCP servers | GitHub、Linear、Craft | 深度集成 issue、文档和代码仓库 |
| REST APIs | 任意带 API 的服务 | 查询和修改内部工具数据 |
| Local files | Obsidian vault、代码仓库 | 处理本机文件 |

一个 conversation 可以同时读取 Linear issue、引用 GitHub 代码、查看 Slack 讨论，并把结果整理成 Craft 文档。

### 自然地多任务

你可以同时启动多个任务，在不同 conversation 之间切换，并保留完整上下文。长任务也可以在后台运行，不阻塞你继续处理其他工作。

### 先探索，再执行

Explore mode 默认只读，适合研究、分析和拟定计划。确认方案后，再切到 Execute mode，让 agent 更自主地完成后续工作。

### Session 变成文档

每段 conversation 都会记录关键决策、取舍和实现细节。你可以把 session 分享给团队，或关联到 Linear issue、GitHub PR、Confluence 页面，让其他人了解变更内容和变更原因。

### 从任何地方工作

你可以运行 remote server，并通过桌面应用、浏览器或 CLI 访问 workspace。Local 和 remote workspace 之间也支持迁移 session。独立 server 可在 Linux 或 macOS 上通过安装脚本部署。

### 完全可定制

主题、skills、statuses、permissions 都可以通过配置文件调整。很多行为可以直接通过对话修改，减少复杂设置界面的负担。

| 可定制项 | 工作方式 | 范围 |
| -------- | -------- | ---- |
| Skills | YAML frontmatter + Markdown | 用 `@mention` 调用可复用指令 |
| Themes | 6 色语义系统 | App 或 workspace 级别，支持暗色模式和场景背景 |
| Statuses | 工作流状态配置 | 自定义 labels、colors、icons、inbox/archive 分类 |
| Permissions | 分层规则 | App、workspace、source 逐层生效 |

## Craft Agents 与 Claude Code

Craft Agents 和 Claude Code 共享同一基础能力，但产品定位不同：

| 维度 | Claude Code | Craft Agents |
| ---- | ----------- | ------------ |
| 界面 | Terminal CLI | 更易用的桌面应用 |
| 数据源 | MCP servers | MCP、REST APIs、本地文件 |
| Session 组织 | 通过 `-c` 继续 | 带自定义工作流状态的 inbox |
| 配置范围 | 单项目 `.claude/` | 多 workspace 隔离 |
| 权限 | 固定模式行为 | workspace/source 级别可配置规则 |
| 远程访问 | SSH + terminal | Remote server，支持桌面、浏览器和 CLI |

共同点包括：Claude 模型、核心工具（Read、Write、Edit、Bash、Glob、Grep）、MCP 支持、skills 格式，以及 thinking level 控制。

## 核心概念

Sources 用来连接外部数据，例如 GitHub 仓库、Linear 项目、Craft spaces 或本地文件系统。Workspaces 是隔离环境，每个 workspace 都有自己的 sources、skills 和 sessions，适合按项目或上下文拆分。

Permission modes 控制 agent 能做什么，可用 `SHIFT+TAB` 切换：

| Mode | 行为 |
| ---- | ---- |
| Explore | 只读，用于低风险研究和分析 |
| Ask to Edit | 变更前询问，逐步审阅动作 |
| Execute | 更高自主度，agent 可连续执行 |

Sessions 是持久化 conversation，组织方式类似 inbox。Skills 是定义专业 agent 行为的自定义指令，例如代码审查流程或内容生成模板，格式与 Claude Code skills 一致。

## 开源

Craft Agents 使用 Apache 2.0 开源协议。代码仓库位于：https://github.com/lukilabs/craft-agents-oss

## 下一步

### 安装 Craft Agents

安装适用于 macOS、Windows 和 Linux 的桌面应用。

### 添加 Sources

连接 GitHub、Linear、APIs 和本地文件，开始把 agent 接入实际工作流。
