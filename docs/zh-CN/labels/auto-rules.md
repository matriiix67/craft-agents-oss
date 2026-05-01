# Auto-Apply Rules（自动打标规则）

> 原文：https://agents.craft.do/docs/labels/auto-rules.md
>
> 本文是中文摘译版，说明如何用规则自动给 sessions 添加 labels。

## 概览

Auto-apply rules 可以根据 session 内容、标题或其他 metadata 自动应用 labels。它适合把重复的人工分类交给系统处理。

## 适用场景

* 包含 “PR” 或 “pull request” 的 session 自动标记为 `code-review`
* 包含 “docs” 或 “documentation” 的 session 自动标记为 `docs`
* 涉及特定客户名称时自动加客户 label
* 命中特定错误关键字时自动加 `urgent`

## 规则结构

一条规则通常包含：

| 字段 | 说明 |
| ---- | ---- |
| Label | 命中后要添加的 label |
| Pattern | 用于匹配的 regex pattern |
| Target | 匹配 session 的哪个字段或文本 |
| Enabled | 是否启用 |

## Regex Patterns

Auto-apply rules 通常使用 regex。建议从简单规则开始：

```text
docs|documentation|readme
```

更精确的规则：

```text
\b(PR|pull request|code review)\b
```

## 使用建议

### 先观察，再自动化

先手动使用 labels 一段时间，确认分类稳定后再写 auto rules。

### 避免过宽匹配

过宽 regex 会给不相关 sessions 打标。可以使用单词边界、明确关键词和大小写策略降低误命中。

### 定期检查命中效果

定期查看被自动标记的 sessions，确认规则仍符合实际工作流。

## 与 Automations 配合

Auto-apply rules 添加 label 后，可以继续触发 label 相关 automations。例如命中 `urgent` 后发送通知，命中 `docs` 后加入文档汇总。
