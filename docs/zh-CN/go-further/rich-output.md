# Rich Output（富输出）

> 原文：https://agents.craft.do/docs/go-further/rich-output.md
>
> 本文是中文摘译版，说明 conversations 中的富媒体输出能力。

## 概览

Rich Output 让 agent 不只返回纯文本，还能在 conversation 中渲染表格、图表、HTML previews、PDF、代码 diff 和结构化内容。

## 常见输出类型

| 类型 | 用途 |
| ---- | ---- |
| Tables | 展示结构化数据 |
| Diagrams | 表达流程、架构和关系 |
| HTML previews | 预览网页或组件 |
| PDFs | 查看生成或转换后的文档 |
| Code diffs | 审阅代码变更 |
| Images | 展示截图、图像处理结果 |

## 适合场景

* 数据分析报告
* 技术方案图
* UI 原型预览
* 文档转换结果
* 代码审查
* 自动化任务摘要

## 使用建议

让 agent 输出可视化内容时，明确目标格式和读者。例如：

```text
Create a table comparing these options.
Render this architecture as a diagram.
Generate an HTML preview for this landing page.
```

## 验证

富输出生成后，应检查：

* 内容是否完整
* 表格列是否对齐
* 图表是否表达正确关系
* 文件能否打开
* 预览是否符合预期
