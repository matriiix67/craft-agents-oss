# Local Folders（本地目录）

> 原文：https://agents.craft.do/docs/sources/local-filesystems.md
>
> 本文是中文摘译版，说明如何把本机目录作为 source 使用。

## 概览

Local Folders 让 agent 快速访问 working directory 之外的本机目录。它适合连接 notes、资料库、设计素材、导出文件、归档文档等。

## 适合场景

* 访问 Obsidian vault
* 搜索个人 notes
* 引用设计 assets 或 screenshots
* 读取另一个项目的文档
* 处理导出目录中的 files

## 添加 Local Folder

通常需要：

1. 打开 sources 设置
2. 选择 Local Folder
3. 选择本机目录
4. 设置 source name
5. 按需补充说明和权限

添加后，可以在 conversation 中通过 `@source-name` 引用。

## 与 Working Directory 的区别

Working directory 是 agent 执行 bash 和文件编辑的主目录。Local Folder 更像额外书签，适合读取和引用其他位置的数据。

| 场景 | 推荐方式 |
| ---- | -------- |
| 当前项目代码开发 | Working directory |
| 偶尔读取另一个目录 | Local Folder |
| 同时访问 notes 和代码 | Working directory + Local Folder |

## 说明文件

可以为 Local Folder 提供说明，让 agent 理解该目录内容和使用边界。例如：

```markdown
# Vault Guide

This folder contains product notes and meeting summaries.
Use `Projects/` for active projects and `Archive/` only when asked.
```

## 权限建议

如果目录包含敏感或重要资料，优先使用只读权限。需要写入时，限定到特定子目录，例如 `drafts/` 或 `exports/`。

## 使用示例

```text
Search @notes for last week's planning notes.
Read @assets and find the latest product screenshots.
Use @vault to summarize notes about onboarding.
```
