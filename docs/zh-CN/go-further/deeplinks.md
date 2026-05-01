# Deep Links（深度链接）

> 原文：https://agents.craft.do/docs/go-further/deeplinks.md
>
> 本文是中文摘译版，说明 `craftagents://` URL scheme 的用途。

## 概览

Deep links 允许从其他应用或网页直接打开 Craft Agents。它适合把外部工具、文档、自动化和 Craft Agent sessions 串起来。

## URL Scheme

Craft Agents 使用类似下面的 scheme：

```text
craftagents://...
```

具体 path 和参数取决于目标动作，例如打开 workspace、session 或创建新 conversation。

## 适合场景

* 从文档链接打开相关 session
* 从 issue tracker 跳转到 agent conversation
* 从自动化脚本启动 Craft Agents
* 在团队知识库中引用 agent 工作记录

## 使用建议

* 链接中避免放 secrets
* 只引用稳定对象，例如 workspace 或 session
* 对外部分享链接先确认权限范围
* 在团队文档中写清链接用途
