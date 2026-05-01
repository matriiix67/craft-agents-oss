# Interactions（交互）

> 原文：https://agents.craft.do/docs/core-concepts/interactions
>
> 本文是中文摘译版，保留原文结构与关键含义，便于在本仓库内阅读和维护。

> ## 文档索引
>
> 完整文档索引见：https://agents.craft.do/docs/llms.txt
>
> 继续阅读其他页面前，可以先用该索引了解 Craft Agents 文档的完整范围。

除了输入消息，Craft Agent 还支持多种与 conversation 交互的方式，包括 mentions、file attachments、session management 和 keyboard shortcuts。

## Mentions

在消息中使用 `@` mentions，可以内联激活 sources 和 skills。

### Source Mentions

输入 `@` 加 source name，即可让 agent 使用该 source：

```text
"Check @linear for my open issues"
"Search @slack for messages about the deployment"
"Read my latest emails from @gmail"
```

提到 source 后，它会自动在当前 conversation 中激活。Agent 会获得该 source 的 tools，无需你手动配置。

### Skill Mentions

同样可以用 `@` 提到 skills：

```text
"Run @daily-standup"
"Use the @code-review skill on this PR"
```

输入 `@` 时，会出现 autocomplete menu，展示可用 sources 和 skills。选择后即可插入 mention。

## File Attachments

你可以通过以下方式把文件交给 agent：

* Drag and drop：把 files 直接拖到 chat input
* Paste：从 clipboard 粘贴 images 或 files
* File picker：点击 attachment icon 浏览并选择 files

Agent 可以读取和处理大多数常见文件类型：

| Type | Examples | What the agent can do |
| ---- | -------- | --------------------- |
| Code | `.py`、`.ts`、`.js`、`.go`、`.rs` | 读取、审阅、重构、解释 |
| Documents | `.pdf`、`.docx`、`.xlsx`、`.pptx` | 提取文本、总结、转换 |
| Images | `.png`、`.jpg`、`.svg`、`.webp` | 查看、描述、resize、转换 |
| Data | `.json`、`.csv`、`.xml`、`.yaml` | 解析、分析、转换 |
| Notebooks | `.ipynb` | 读取 cells、outputs、visualisations |

## Session Management

Craft Agent 中的每个 conversation 都是一个 session。你可以从 sidebar 管理 sessions。

### Flagging

Flag 重要 sessions，表示后续需要跟进。Flagged sessions 会显示 flag icon，也可以在 sidebar 中筛选。

### Archiving

完成或暂时不用的 sessions 可以归档，让 sidebar 保持清爽。Archived sessions 默认隐藏，可通过 filter 重新访问。

### Batch Operations

选择多个 sessions 后，可以批量操作：

* 一次归档多个 sessions
* 删除不再需要的 sessions
* 跨 sessions 应用 labels

### Read / Unread

当 agent 产生新 output 时，session 会标记为 unread。点击 session 后会标记为 read。

## Keyboard Shortcuts

Craft Agent 提供常见操作的 keyboard shortcuts。可以通过以下方式打开快捷键参考：

* macOS：`Cmd + /`
* 点击右下角的 `?` icon

常用快捷键：

| Shortcut | Action |
| -------- | ------ |
| `Cmd + N` | New conversation |
| `Cmd + K` | Quick search / command palette |
| `Shift + Tab` | Cycle permission modes |
| `Cmd + Enter` | Send message |
| `Escape` | Stop the agent’s current response |
| `Cmd + /` | Show keyboard shortcuts |

Keyboard shortcuts 可以自定义。你可以让 agent 帮忙修改，例如：“Help me customise my keyboard shortcuts”。
