# Colors（颜色）

> 原文：https://agents.craft.do/docs/customisation/colors.md
>
> 本文是中文摘译版，说明 labels、statuses 和 smart labels 的颜色系统。

## 概览

Craft Agents 使用 EntityColor 系统为 labels、statuses 和其他实体配置颜色。颜色帮助用户快速识别类别、优先级和流程状态。

## 常见使用对象

* Labels
* Statuses
* Smart labels
* Badges
* Workflow indicators

## 颜色配置原则

* 同一语义使用同一颜色
* 警告或阻塞状态使用更醒目的颜色
* 完成状态使用稳定、低干扰颜色
* 避免让太多实体共享同一颜色
* 保证亮色和暗色模式下都可读

## 示例语义

| 语义 | 颜色倾向 |
| ---- | -------- |
| Done | 绿色或中性成功色 |
| Needs Review | 黄色或橙色 |
| Blocked | 红色 |
| Research | 蓝色 |
| Docs | 紫色或青色 |

## 与 Themes 的关系

Entity colors 应与主题协调，但不应完全依赖主题主色。这样切换主题后，labels 和 statuses 仍能保持稳定语义。

## 使用建议

先确定团队工作流中的关键状态，再分配颜色。不要为临时标签过度设计颜色体系。
