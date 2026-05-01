# APIs Overview（API 数据源概览）

> 原文：https://agents.craft.do/docs/sources/apis/overview.md
>
> 本文是中文摘译版，说明如何把 REST API 接入 Craft Agents。

## 概览

API sources 让 agent 通过 HTTP 调用外部或内部服务。只要服务提供 REST API，就可以配置为 source，让 agent 查询、创建或更新数据。

## 适合场景

* 内部 CRM 或工单系统
* Analytics API
* 自定义业务后台
* 第三方 SaaS
* 数据服务或 webhook

## 基本配置

API source 通常包含：

| 配置 | 说明 |
| ---- | ---- |
| Base URL | API 根地址 |
| Authentication | API key、Bearer token、header 等 |
| Endpoints | 可调用路径和 method |
| Guide | 告诉 agent 如何使用该 API |
| Permissions | 限制哪些 endpoints 可用 |

## 使用方式

配置完成后，在 conversation 中 mention source：

```text
Use @crm to find the latest account notes for Acme.
Ask @analytics for yesterday's signup count.
Create a ticket in @support for this issue.
```

## Endpoint 设计建议

优先暴露清晰、稳定、语义明确的 endpoints。对 agent 来说，`GET /customers/{id}/notes` 比需要复杂参数组合的通用查询接口更容易可靠使用。

## 认证和安全

API credentials 应使用最小权限。写操作建议保留确认或限制到明确 endpoint。生产系统中尤其要避免给 agent 过宽的写权限。

## Guide 说明

为 API source 写 guide 很重要。Guide 应说明：

* API 能做什么
* 什么时候使用
* 关键 endpoint 的语义
* 常见参数和返回结构
* 禁止或高风险操作

## 与 MCP 的区别

API source 适合快速接入 REST 服务。MCP 更适合复杂工具、资源浏览和深度交互。已有 HTTP API 时，API source 通常是最快路径。
