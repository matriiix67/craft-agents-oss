# Customizing Statuses（自定义状态）

> 原文：https://agents.craft.do/docs/statuses/customizing.md
>
> 本文是中文摘译版，说明如何按团队流程调整 statuses。

## 概览

Craft Agents 支持自定义 statuses。你可以添加新状态、修改显示名称、颜色、图标和 open/closed 分类，让 conversation inbox 匹配自己的工作方式。

## 可以自定义什么

常见配置项包括：

| 配置 | 说明 |
| ---- | ---- |
| ID | 状态的稳定标识，供存储和自动化使用 |
| Label | 界面显示名称 |
| Category | Open 或 Closed |
| Color | 状态颜色 |
| Icon | 状态图标 |
| Sort order | 在 sidebar 或列表中的排序 |

## Open 与 Closed

Open 状态表示仍需关注，会出现在 inbox 中。Closed 状态表示流程结束，通常会被归档或默认隐藏。

示例：

| Status | Category |
| ------ | -------- |
| Todo | Open |
| Waiting | Open |
| Blocked | Open |
| Done | Closed |
| Cancelled | Closed |

## 推荐状态模型

轻量个人工作流：

```text
Todo → In Progress → Done
```

团队审阅工作流：

```text
Todo → In Progress → Needs Review → Done
```

带阻塞状态的项目工作流：

```text
Todo → In Progress → Blocked → In Progress → Done
```

## 与 Automations 配合

自定义 statuses 可以作为 automations 的触发条件。例如：

* 进入 `blocked` 时通知团队
* 进入 `needs-review` 时创建审阅提醒
* 进入 `done` 时写入周报素材

## 命名建议

* 使用短名称，方便在 sidebar 中扫描
* ID 使用稳定小写格式，例如 `needs-review`
* 不要频繁修改 ID，否则历史数据和 automations 可能需要同步更新
* 把流程阶段放到 status，把主题分类放到 labels

## 维护建议

先从默认状态开始。只有当重复出现明确流程需求时，再添加新的 status。每增加一个状态，都要确认团队知道它的含义和使用时机。
