# Credentials（凭据）

> 原文：https://agents.craft.do/docs/reference/config/credentials.md
>
> 本文是中文摘译版，说明 Craft Agents 如何保存敏感数据。

## 概览

Credentials 包括 API keys、tokens、OAuth 信息和其他敏感访问凭据。Craft Agents 会尽量以安全方式保存和使用这些数据。

## 常见凭据类型

* LLM provider API keys
* Source tokens
* OAuth access / refresh tokens
* MCP server secrets
* API source credentials

## 存储位置

凭据通常保存在 Craft Agent 的 credential store 中，例如加密文件：

```text
~/.craft-agent/credentials.enc
```

实际存储方式可能因平台和版本不同而变化。

## 安全原则

* 不把 secrets 写入 git
* 不把 token 粘贴到共享 conversation
* 使用最小权限 credentials
* 定期轮换高权限 token
* 离职或权限变更时撤销旧凭据

## 故障排查

### API key 无效

检查 provider、base URL、key 是否过期，以及 key 是否拥有对应模型权限。

### Source 认证失败

重新授权 source，或检查 token scope。

### 需要清理凭据

优先通过应用设置删除。手动删除 credential store 前先备份，并确认影响范围。
