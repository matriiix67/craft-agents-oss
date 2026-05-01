# MCP Servers Overview（MCP 服务器概览）

> 原文：https://agents.craft.do/docs/sources/mcp-servers/overview.md
>
> 本文是中文摘译版，说明 MCP servers 在 Craft Agents 中的角色。

## 概览

MCP（Model Context Protocol）让 agent 通过标准协议连接外部工具和数据源。一个 MCP server 可以暴露 tools、resources 和 prompts，供 agent 在 conversation 中调用。

## 为什么使用 MCP

MCP 适合需要深度集成的服务：

* GitHub repositories、issues、pull requests
* Linear projects 和 issues
* Filesystem 或 cloud storage
* Databases
* 内部业务系统
* 自定义工具链

## MCP Source 的工作方式

添加 MCP server 后，Craft Agents 会把它作为 source。你可以用 `@source-name` mention 它，agent 会获得该 server 暴露的工具。

工具名称通常类似：

```text
mcp__github__search_issues
mcp__linear__create_comment
```

## MCP 与 REST API Source 的选择

| 需求 | 推荐 |
| ---- | ---- |
| 已有 MCP server | MCP |
| 需要复杂工具能力和资源浏览 | MCP |
| 只是调用少量 HTTP endpoints | API source |
| 需要快速接入内部 REST 服务 | API source |

## 安全与权限

MCP tools 可能具有写入或修改外部系统的能力。建议：

* 明确 source 权限
* 对 mutation tools 保持确认
* 为 source 编写 guide
* 避免给不必要的 workspace 暴露敏感工具

## 使用示例

```text
Use @github to list open PRs waiting for review.
Ask @linear for issues assigned to me this week.
Search @filesystem for deployment docs.
```
