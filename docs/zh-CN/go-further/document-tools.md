# Document Tools（文档工具）

> 原文：https://agents.craft.do/docs/go-further/document-tools.md
>
> 本文是中文摘译版，说明 Craft Agents 的文档处理能力。

## 概览

Document Tools 让 agent 能处理 Word、Excel、PDF、PowerPoint、images 等文件。它适合总结、转换、生成和批量整理文档。

## 支持任务

* 提取 PDF 文本
* 总结 Word 文档
* 分析 Excel 表格
* 生成 PowerPoint 或报告
* 转换文件格式
* 从图片中读取或描述内容
* 批量整理文件

## 常见文件类型

| 类型 | 示例 | 能力 |
| ---- | ---- | ---- |
| Word | `.docx` | 读取、编辑、生成 |
| Excel | `.xlsx`、`.csv` | 分析、清洗、图表 |
| PowerPoint | `.pptx` | 生成、修改、导出 |
| PDF | `.pdf` | 提取、总结、转换 |
| Images | `.png`、`.jpg` | 查看、描述、处理 |

## 使用方式

可以直接上传文件，或让 agent 从 working directory / source 中读取：

```text
Summarize this PDF.
Convert this spreadsheet into a clean report.
Create slides from these meeting notes.
```

## 建议

* 明确输出格式
* 对重要文档要求渲染检查
* 保留源文件路径和生成文件路径
* 对敏感文档注意权限和分享范围
