# Labels（标签）

> 原文：https://agents.craft.do/docs/labels/overview.md
>
> 本文是中文摘译版，说明 labels 如何组织 sessions。

## 概览

Labels 是用于标记 sessions 的彩色标签。它们适合表达主题、优先级、领域、客户、项目或任何横向分类。

Status 表示流程阶段；label 表示属性。一个 session 通常只有一个 status，但可以拥有多个 labels。

## Labels 的用途

Labels 可以帮助你：

* 按项目或团队筛选 sessions
* 标记紧急程度
* 区分代码、文档、研究、发布等类型
* 配合 automations 触发动作
* 在大量 conversations 中快速定位相关工作

## 常见 Labels 示例

| Label | 用途 |
| ----- | ---- |
| `urgent` | 紧急任务 |
| `frontend` | 前端相关 |
| `backend` | 后端相关 |
| `docs` | 文档工作 |
| `research` | 调研任务 |
| `customer-a` | 客户或项目分类 |

## 管理 Labels

你可以创建、重命名、删除 labels，并配置颜色。使用时可以手动给 session 添加 label，也可以通过 auto-apply rules 自动打标。

## 与 Automations 配合

Label 变化可以触发 automations。例如：

* 添加 `urgent` 后发送通知
* 添加 `docs` 后把 session 计入文档周报
* 移除某个 label 后更新外部系统

常见 events：

* `LabelAdd`
* `LabelRemove`
* `LabelConfigChange`

## 使用建议

### 保持标签语义稳定

Label 名称应该稳定。频繁改名会让筛选、自动化和团队习惯变得混乱。

### 避免过度细分

标签数量太多会降低使用率。优先保留真正用于筛选和自动化的标签。

### 与 Status 分工清晰

`Needs Review`、`Done` 这类流程阶段更适合作为 status；`frontend`、`urgent`、`docs` 更适合作为 label。
