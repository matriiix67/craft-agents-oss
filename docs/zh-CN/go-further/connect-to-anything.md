# Connect to Anything（连接任何服务）

> 原文：https://agents.craft.do/docs/go-further/connect-to-anything.md
>
> 本文是中文摘译版，说明如何通过 API aggregators 和 sources 连接更多服务。

## 概览

Craft Agents 可以通过 MCP、REST APIs、本地目录和 API aggregators 连接大量服务。很多情况下，你只需要告诉 agent 想连接什么，它就能帮助你配置 source。

## 适合场景

* 连接内部系统
* 查询 SaaS 数据
* 自动创建工单或记录
* 读取数据库或表格服务
* 把 agent 接入团队 workflow

## 连接方式

| 方式 | 适合 |
| ---- | ---- |
| MCP | 已有 MCP server 或复杂工具集成 |
| REST API Source | 有明确 HTTP API 的服务 |
| Local Folder | 本机文件和资料库 |
| API Aggregator | 覆盖大量 SaaS 的统一接入层 |

## Chat-first 配置

你可以直接让 agent 帮你配置：

```text
Connect my workspace to our support API.
Set up a source for the CRM endpoint.
Help me connect GitHub and Linear.
```

Agent 会询问必要信息、生成配置，并帮助测试连接。

## 安全建议

* 使用最小权限 token
* 写操作保留确认
* 给 source 编写清楚的 guide
* 避免把 secrets 写入仓库
* 定期审查连接和权限
