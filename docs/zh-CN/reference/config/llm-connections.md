# LLM Connections（LLM 连接）

> 原文：https://agents.craft.do/docs/reference/config/llm-connections.md
>
> 本文是中文摘译版，说明如何配置多个 AI provider connections。

## 概览

LLM Connections 让你为不同 provider、model 和 endpoint 建立可复用连接。不同 workspace 或 session 可以选择不同 connection。

## 为什么使用多个 Connections

* 工作任务使用强模型
* 快速草稿使用便宜模型
* 本地任务使用 Ollama
* 公司环境通过 Vercel AI Gateway 或 proxy
* 不同团队使用不同 API keys

## 常见字段

| 字段 | 说明 |
| ---- | ---- |
| Slug | 稳定连接标识 |
| Provider | Anthropic、OpenAI、OpenRouter 等 |
| Model | 默认模型 ID |
| Base URL | 自定义 endpoint |
| API key | 认证凭据 |
| Thinking level | 默认推理强度 |

## Session 绑定

Session 首条消息后，LLM connection 通常会锁定，确保同一 conversation 的模型上下文和能力稳定。

## 使用建议

* 给 connection 使用清晰 slug
* 在 workspace 默认值中选择常用 connection
* 对实验模型单独建 connection
* 记录 provider 限制，例如上下文长度、tools 支持和价格

## 故障排查

### connection 无法使用

检查 API key、provider、base URL、model ID。

### session 模型改不了

首条消息后 connection 可能已锁定。新建 session 再选择目标 connection。
