# Statuses（状态）

> 原文：https://agents.craft.do/docs/statuses/overview.md
>
> 本文是中文摘译版，说明 statuses 如何组织 conversations。

## 概览

Statuses 用来把 conversations 组织成工作流状态。它们让 inbox 更像任务看板：你可以清楚看到哪些 conversation 等待处理、正在进行、需要审阅或已经完成。

## 默认状态

常见默认 statuses 包括：

| Status | Category | 用途 |
| ------ | -------- | ---- |
| Todo | Open | 等待处理 |
| In Progress | Open | 正在推进 |
| Needs Review | Open | 需要人工审阅 |
| Done | Closed | 已完成 |
| Cancelled | Closed | 已取消或不再需要 |

Open statuses 会保留在 inbox 中；Closed statuses 通常会归档或从默认视图隐藏。

## 为什么使用 Statuses

Statuses 可以帮助你：

* 管理多个并行 conversations
* 区分等待处理和已完成工作
* 找到需要审阅的 agent 输出
* 建立团队一致的 AI 工作流
* 配合 automations 触发后续动作

## 典型工作流

一个常见 conversation 生命周期：

```text
Todo → In Progress → Needs Review → Done
```

如果任务失效，可以改成：

```text
Todo → Cancelled
```

## 在 Inbox 中使用

Sidebar 或 inbox 会按 status 展示 sessions。你可以通过筛选、排序或批量操作管理多个 sessions。

## 与 Automations 的关系

Status 变化可以触发 automations。例如：

* session 变成 `done` 时写入日志
* session 进入 `needs-review` 时发送通知
* 每周汇总所有 completed sessions

相关 event 通常是 `SessionStatusChange`。

## 使用建议

### 保持状态数量克制

状态太多会增加维护成本。优先使用少量清晰状态，再按团队需求增加。

### 区分状态和标签

Status 表示流程阶段；labels 表示属性或分类。例如 `Needs Review` 是 status，`urgent` 或 `frontend` 更适合作为 label。

### 为 Closed 状态设定明确含义

`Done` 表示已完成，`Cancelled` 表示停止推进。这样后续统计和自动化才更可靠。
