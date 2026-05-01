# Workspaces（工作区）

> 原文：https://agents.craft.do/docs/go-further/workspaces.md
>
> 本文是中文摘译版，说明如何用多个 workspaces 组织配置和 conversations。

## 概览

Workspaces 是隔离的工作环境。每个 workspace 可以拥有自己的 sessions、sources、skills、statuses、labels、permissions 和默认 working directory。

## 为什么使用多个 Workspaces

* 区分个人和工作上下文
* 按项目隔离 sources 和权限
* 为团队维护共享配置
* 连接不同 remote servers
* 避免不同客户或环境的数据混用

## Workspace 包含什么

| 内容 | 说明 |
| ---- | ---- |
| Sessions | 该 workspace 的 conversation history |
| Sources | 可用外部工具和数据 |
| Skills | 专用指令和流程 |
| Statuses | 工作流状态 |
| Labels | 分类标签 |
| Permissions | 权限规则 |
| Defaults | 默认目录、模型等配置 |

## 切换 Workspace

切换 workspace 后，inbox、sources、skills 和上下文都会切换到该 workspace。不同 workspace 的 conversation history 相互独立。

## 使用建议

* 每个重要项目使用单独 workspace
* 团队共享 workspace 要谨慎配置权限
* 为不同 workspace 设置不同主题或名称
* 定期归档不再活跃的 sessions
