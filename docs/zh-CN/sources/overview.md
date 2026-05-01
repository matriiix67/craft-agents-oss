# Sources Overview（数据源概览）

> 原文：https://agents.craft.do/docs/sources/overview.md
>
> 本文是中文摘译版，说明 sources 的类型、用途和选择方式。

## 概览

Sources 让 Craft Agents 连接外部数据和工具。通过 sources，agent 可以访问 GitHub、Linear、Slack、REST APIs、本地 folders、数据库和 MCP servers。

## Source 类型

| 类型 | 适合场景 | 示例 |
| ---- | -------- | ---- |
| MCP Servers | 已有 MCP 集成或需要深度工具能力 | GitHub、Linear、filesystem |
| APIs | 任意 REST API 或内部服务 | CRM、analytics、ticketing |
| Local Folders | 本机目录、资料库、项目文档 | Obsidian vault、notes、assets |

## Source Mentions

在消息里使用 `@source-name` 可以激活 source：

```text
Check @github for open pull requests.
Search @linear for issues assigned to me.
Read notes from @vault.
```

Agent 会获得该 source 暴露的 tools，并在当前 conversation 中使用。

## Sources 与 Working Directory

Working directory 用于本地直接文件操作。Sources 用于外部系统或额外数据访问。

| 对比项 | Working Directory | Sources |
| ------ | ----------------- | ------- |
| 访问方式 | SDK 原生 tools | MCP 或 API tools |
| 范围 | 单个本地目录 | 多个服务或路径 |
| 认证 | 通常不需要 | OAuth、API key、token |
| 典型用途 | 写代码、跑测试、git | 查 issue、读远程数据、调 API |

## 何时添加 Source

当 agent 需要访问当前 working directory 之外的数据时，就应该添加 source。例如：

* 读取 GitHub PR、issues、reviews
* 查询 Linear tickets
* 搜索团队 Slack 历史
* 访问内部 REST API
* 使用本机其他目录中的资料

## 权限与安全

每个 source 可以有独立权限配置。敏感操作可以要求确认，或通过 `permissions.json` 限定可用 tools、API endpoints 和写入路径。

## 使用建议

* 给 source 起清晰、短小、稳定的名字
* 为 source 编写说明，让 agent 知道何时使用
* 只连接当前 workflow 需要的服务
* 对可写或会产生副作用的 tools 设置更严格权限
