# Environment Variables（环境变量）

> 原文：https://agents.craft.do/docs/reference/config/environment-variables.md
>
> 本文是中文摘译版，说明如何通过环境变量配置 Craft Agents。

## 概览

环境变量适合在 CLI、server、CI 或本地开发中传递配置。它们可以覆盖默认配置，或为 provider、proxy、server 提供运行参数。

## 常见变量类型

* LLM API keys
* Provider 和 model
* Server URL 和 token
* Proxy 配置
* Debug 或 logging 开关
* 工作目录或配置路径

## 示例

```bash
export LLM_PROVIDER=anthropic
export LLM_MODEL=claude-sonnet-4-5
export LLM_API_KEY=sk-...
```

CLI 连接 server：

```bash
export CRAFT_SERVER_URL=ws://127.0.0.1:9100
export CRAFT_SERVER_TOKEN=...
```

## 使用建议

* 不把 `.env` 提交到 git
* 在 CI 中使用 secret store
* 对不同 shell 或服务管理器确认变量确实传入进程
* 避免在日志中打印 secrets

## 故障排查

### 环境变量未生效

确认应用启动进程继承了变量。GUI 应用和 terminal shell 的环境可能不同。

### Provider key 找不到

检查变量名是否与 provider 匹配，或改用通用 `LLM_API_KEY`。
