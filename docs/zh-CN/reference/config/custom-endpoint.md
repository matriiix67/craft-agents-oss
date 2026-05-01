# API Providers（API 提供商）

> 原文：https://agents.craft.do/docs/reference/config/custom-endpoint.md
>
> 本文是中文摘译版，说明如何连接 Anthropic、OpenRouter、Ollama、Vercel AI Gateway 或兼容端点。

## 概览

Craft Agents 可以配置不同 LLM providers。除了默认 provider，也可以连接兼容 OpenAI API 风格的 endpoint 或本地模型服务。

## 常见 Provider

| Provider | 用途 |
| -------- | ---- |
| Anthropic | Claude 模型 |
| OpenAI / Codex | OpenAI 模型或 Codex 相关模型 |
| OpenRouter | 多模型路由 |
| Ollama | 本地模型 |
| Vercel AI Gateway | 统一 provider 网关 |
| Custom endpoint | 自托管或兼容 API |

## 关键配置

* Provider name
* Base URL
* API key
* Model ID
* 默认 thinking level 或其他模型参数

## Custom Endpoint

如果服务兼容 OpenAI API，可以配置 base URL 和 key：

```text
Base URL: https://api.example.com/v1
Model: provider/model-name
```

## 使用建议

* 确认模型支持 tool use
* 确认上下文长度满足任务
* 对不同 workspace 使用不同 connection
* 记录 provider 限制和计费边界

## 故障排查

### 模型不可用

检查 model ID、provider 权限和 endpoint 路径。

### Tool use 失败

确认模型和 provider 支持 tools/function calling。

### 响应慢或中断

检查网络、rate limit、proxy 和 provider 状态。
