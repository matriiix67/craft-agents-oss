# Conversations（会话）

> 原文：https://agents.craft.do/docs/core-concepts/conversations
>
> 本文是中文摘译版，保留原文结构与关键含义，便于在本仓库内阅读和维护。

> ## 文档索引
>
> 完整文档索引见：https://agents.craft.do/docs/llms.txt
>
> 继续阅读其他页面前，可以先用该索引了解 Craft Agents 文档的完整范围。

Craft Agents 像邮件收件箱一样组织 AI conversations。你可以同时管理多个正在进行的任务，也可以随时回到之前的工作。

## Multi-Conversation Inbox

可以把 Craft Agents 理解成 AI conversations 的邮件客户端。每个 conversation 都是一条独立 thread，你可以：

* 随时开始、暂停和恢复
* 按 status 组织，例如 Todo、In Progress、Needs Review、Done
* 搜索和筛选历史工作
* 不再需要时归档或删除

## Session ID Format

每个 conversation 都有唯一 session ID，格式如下：

```text
YYMMDD-adjective-noun
```

其中 `YY` 是两位年份，例如 `25` 表示 2025，`26` 表示 2026。

示例：

* `260121-swift-falcon`：创建于 2026 年 1 月 21 日
* `260115-gentle-river`：创建于 2026 年 1 月 15 日
* `260108-bright-mountain`：创建于 2026 年 1 月 8 日

这种格式既能按日期识别 session，也保持了可读性。

## Conversation Storage

Conversations 以 JSONL（JSON Lines）文件存放在本机：

```text
~/.craft-agent/workspaces/{id}/sessions/{session-id}/session.jsonl
```

文件结构：

* 第 1 行：session header，包含 metadata
* 第 2 行起：messages，每行一条消息

```json
{"id":"260121-swift-falcon","workspaceRootPath":"~/.craft-agent/workspaces/ws-abc123","createdAt":1737451800000,"lastUsedAt":1737451900000,"sessionStatus":"todo","permissionMode":"ask"}
{"id":"msg_1","type":"human","content":"Find my project planning document","timestamp":1737451800000}
{"id":"msg_2","type":"assistant","content":"Found \"Project Planning Q4\"...","timestamp":1737451802000}
```

Session header 常见字段：

| Field | Description |
| ----- | ----------- |
| `id` | Session ID，格式为 `YYMMDD-adjective-noun` |
| `workspaceRootPath` | Workspace 路径，使用可移植格式 |
| `createdAt` | 创建时间戳，单位毫秒 |
| `lastUsedAt` | 最近活动时间戳，单位毫秒 |
| `sessionStatus` | Status ID，例如 `todo`、`done` |
| `permissionMode` | 当前权限模式，例如 `safe`、`ask`、`allow-all` |
| `name` | 用户自定义名称，可选 |
| `isFlagged` | Session 是否已 flag |
| `model` | 当前 session 的模型覆盖配置 |
| `llmConnection` | LLM connection slug，首条消息后锁定 |
| `connectionLocked` | Connection 是否已锁定 |
| `thinkingLevel` | Thinking level：`off`、`low`、`medium`、`high`、`xhigh`、`max` |
| `workingDirectory` | Bash commands 的工作目录 |
| `enabledSourceSlugs` | 已启用 source slugs 数组 |

这种存储方式带来三个好处：

* Inbox 展示只需读取第一行，列表加载更快
* 新消息可以 append，无需重写整份文件
* 每行独立，便于解析和处理

## Status-Based Organization

Conversations 可以按 status 管理工作流：

| Status | Category | Description |
| ------ | -------- | ----------- |
| Todo | Open | 等待处理的 conversation |
| In Progress | Open | 正在处理的 conversation |
| Needs Review | Open | 完成前需要审阅 |
| Done | Closed | 已完成的 conversation |
| Cancelled | Closed | 不再需要的 conversation |

Open statuses 会显示在 inbox 中；Closed statuses 会被归档。你也可以自定义 statuses，例如添加 “Blocked” 或 “Waiting”。

## Batch Operations

选择多个 sessions 后，可以批量执行操作。按住 `⌘ Click`（macOS）或 `Ctrl+Click`（Windows/Linux）切换单个选择，使用 `⇧ Click` 选择范围。

| Action | Description |
| ------ | ----------- |
| Change Status | 给所有选中的 sessions 设置同一 status |
| Set Labels | 批量切换 labels |
| Flag / Unflag | 批量 flag 或取消 flag |
| Archive | 批量归档 |
| Delete | 批量永久删除 |

按 `Esc` 可以清除选择。对多选内容右键，也可以通过 context menu 访问同类操作。

## Conversation Continuity

返回某个 conversation 时，Craft Agents 会恢复完整上下文：

* 之前的所有 messages 都可用
* Agent 会记住已经讨论过的内容
* 可以从离开的地方继续
* 已引用的 documents 和 files 仍然可访问

```text
> Resuming session 250121-swift-falcon...

Last message: "I've identified the auth module dependencies"
> Great, let's start refactoring
Continuing from where we left off. I'll begin with the AuthProvider component...
```

## How Conversations Work

每个 conversation 都绑定到一个 workspace。与 Craft Agents 对话时：

* Agent 会记住同一 session 中较早讨论过的内容
* 你可以引用之前的话题，例如 “summarize that document”
* Context 会随着工作自然积累

```text
> Find my project planning document
Found "Project Planning Q4" - here's an overview...

> Add a new section called "Timeline"
Added "Timeline" section to Project Planning Q4.
> Now add three tasks to that section
Added 3 tasks to the Timeline section:
1. Define milestones
2. Set deadlines
3. Assign owners
```

## Starting New Conversations

点击侧边栏的 New Chat，或使用键盘快捷键，即可创建新的 conversation。新 chat 会获得新的 ID，之前的 conversations 仍保留在 inbox 中。

## Using Skills in Conversations

Skills 是可通过 mention 触发的专门能力。提到某个 skill 后，它会带着完整 conversation history 运行。

```text
> Find my project planning document
Found "Project Planning Q4" - here's an overview...

> [skill:research] Find background research on our Q4 goals
Activating research skill...
[The skill can reference the project planning document from the previous exchange]
```

这意味着：

* Skills 可以引用 earlier conversation 中的 documents 和 context
* 使用 skills 时，完整 conversation history 会保留
* 你可以串联多个 skills，让每个 skill 基于前面的工作继续推进

## Long Conversations

对于较长的工作 session，Craft Agents 会自动管理 context：

* 大型 tool results（超过 15,000 tokens）会自动摘要，节省 context 空间
* Claude Agent SDK 会处理 context window 管理
* 最近 context 始终可用于引用

通常不需要手动管理这些细节。

## Conversation Across Workspaces

每个 workspace 都有独立 conversation history：

| Workspace | Conversation |
| --------- | ------------ |
| Personal Notes | 独立历史 |
| Work Projects | 独立历史 |
| Shared Team Space | 独立历史 |

切换 workspace 时，也会切到该 workspace 对应的 conversation context。

## Transferring Sessions

可以通过 session menu 中的 Send to Workspace，把 session 发送到 remote workspace。目标 workspace 会得到一份独立副本，并附带 conversation summary 作为上下文。

## Tips for Effective Conversations

### Use references

可以说 “that document” 或 “the task we just created”，不用反复输入完整名称。Agent 会跟踪你正在讨论的对象。

### Build on previous actions

创建内容后，可以马上继续修改，例如 “now add a due date” 或 “change the title”。

### Ask for clarification

如果 agent 理解错了，直接澄清即可，例如 “no, I meant the other project” 或 “the one from last week”。

### Use statuses to stay organized

把 conversations 标记为 Todo、Needs Review 或 Done，有助于跨多个 threads 跟踪工作。
