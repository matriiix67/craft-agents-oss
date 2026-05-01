# Connecting MCP Servers（连接 MCP 服务器）

> 原文：https://agents.craft.do/docs/sources/mcp-servers/connecting-servers.md
>
> 本文是中文摘译版，说明如何把 MCP server 添加为 source。

## 概览

Craft Agents 可以连接本地或远程 MCP servers。连接成功后，server 暴露的 tools 会作为 source 能力提供给 agent。

## 添加步骤

通常流程：

1. 打开 Sources 设置
2. 选择添加 MCP Server
3. 填写 server 名称
4. 配置启动 command 或远程连接信息
5. 保存并测试连接

## 本地 MCP Server

本地 server 通常通过 command 启动：

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/folder"]
}
```

适合连接本机 filesystem、数据库客户端、CLI wrappers 或内部工具。

## 远程 MCP Server

远程 server 通过 URL 或 transport 配置连接。适合团队共享服务或托管集成。

连接前应确认：

* 网络可访问
* 认证方式已配置
* workspace 有使用该 source 的权限
* server 暴露的 tools 符合预期

## 测试连接

添加后建议测试：

* server 是否能启动
* tools 是否能列出
* 简单只读调用是否成功
* 错误日志是否清晰

## 命名建议

Source name 会用于 `@mention`，建议短且稳定：

* `github`
* `linear`
* `docs`
* `filesystem`
* `warehouse`

## 故障排查

### Server 启动失败

检查 command、args、环境变量、依赖安装和当前 PATH。

### Tools 不显示

确认 MCP server 正常返回 tool list，并查看应用日志。

### 认证失败

检查 token、OAuth、API key 和 server 所需环境变量。
