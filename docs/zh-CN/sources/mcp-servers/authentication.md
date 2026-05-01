# MCP Authentication（MCP 认证）

> 原文：https://agents.craft.do/docs/sources/mcp-servers/authentication.md
>
> 本文是中文摘译版，说明 MCP server 认证方式和安全建议。

## 概览

MCP servers 访问外部服务时，经常需要 credentials。Craft Agents 支持通过环境变量、OAuth、tokens 或 server 自身配置完成认证。

## 常见认证方式

| 方式 | 适合场景 |
| ---- | -------- |
| Environment variables | 本地 server 使用 API key 或 token |
| OAuth | GitHub、Google、Slack 等用户授权 |
| Personal access token | 开发者工具和内部系统 |
| Service account | 团队共享或自动化服务 |

## 环境变量

本地 MCP server 常用环境变量传入 credentials：

```json
{
  "command": "node",
  "args": ["server.js"],
  "env": {
    "GITHUB_TOKEN": "...",
    "API_KEY": "..."
  }
}
```

敏感值应保存在安全配置或 credential store 中，避免写入公开仓库。

## OAuth

支持 OAuth 的 source 通常会引导你完成浏览器授权。授权完成后，token 会安全保存，并限定在对应 workspace/source 使用。

## 权限范围

配置 token 时，尽量使用最小权限：

* 只读任务使用 read-only scope
* 写入评论只给 comment/write 权限
* 避免给 agent 不需要的 admin 权限

## 轮换与撤销

如果 token 泄露、人员变动或权限变更，应及时轮换或撤销 credentials。团队共享 source 尤其需要定期检查。

## 故障排查

### 认证提示反复出现

检查 token 是否过期、OAuth refresh 是否失败、source 配置是否指向正确 workspace。

### Tool 返回 unauthorized

确认 credential scope 覆盖该操作。例如读取 issue 和写评论可能需要不同权限。

### 本地 server 找不到环境变量

确认变量传给了 MCP server 进程，而不只是当前 shell。
