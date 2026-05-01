# Practical Examples（API 实用示例）

> 原文：https://agents.craft.do/docs/sources/apis/curl-examples.md
>
> 本文是中文摘译版，整理常见 API source 配置和使用模式。

## 概览

API source 的核心是把常见 HTTP 操作包装成 agent 可理解的工具。可以从 `curl` 示例出发，把 headers、method、path 和 body 迁移到 source 配置中。

## Bearer Token API

典型 `curl`：

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.example.com/v1/issues
```

配置时需要表达：

* Base URL：`https://api.example.com/v1`
* Header：`Authorization: Bearer ...`
* Endpoint：`GET /issues`

## API Key Header

```bash
curl -H "X-API-Key: $API_KEY" \
  https://api.example.com/data
```

适合多数内部服务或 SaaS API。API key 应放入安全 credential 配置，避免写进仓库。

## Query Parameters

```bash
curl "https://api.example.com/search?q=agent&limit=10"
```

给 agent 的说明里要写清参数含义：

| 参数 | 说明 |
| ---- | ---- |
| `q` | 搜索关键词 |
| `limit` | 返回数量上限 |

## POST JSON

```bash
curl -X POST https://api.example.com/tickets \
  -H "Content-Type: application/json" \
  -d '{"title":"Bug report","priority":"high"}'
```

写操作建议搭配权限控制和人工确认。Guide 中应说明哪些字段必填，哪些操作会产生外部副作用。

## Pagination

如果 API 使用分页，需要告诉 agent 如何翻页：

* `page` / `per_page`
* `cursor`
* `next` link
* `has_more`

示例说明：

```text
When `has_more` is true, call the same endpoint again with `cursor` set to `next_cursor`.
```

## 错误处理

Guide 中建议记录常见错误：

| 状态码 | 含义 |
| ------ | ---- |
| `401` | credential 无效或过期 |
| `403` | 权限不足 |
| `404` | 资源不存在 |
| `429` | rate limit |
| `500` | 服务端错误 |

## 使用建议

* 从只读 endpoints 开始
* 给每个 endpoint 写清输入输出
* 对写操作设置权限边界
* 用真实但脱敏的 examples 帮 agent 理解 API
* 避免把秘密写入文档或 source guide
