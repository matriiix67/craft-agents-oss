# Remote Server（远程服务器）

> 原文：https://agents.craft.do/docs/server/headless.md
>
> 本文是中文摘译版，说明如何以 remote/headless server 方式运行 Craft Agents。

## 概览

Remote server 让 Craft Agents 在服务器或远程机器上运行，并通过桌面应用、浏览器或 CLI 访问。它适合长期任务、团队共享环境和远程开发工作流。

## 适合场景

* 在 Linux server 上运行 agent
* 远程访问统一 workspace
* 让长任务持续运行
* 集中管理 sources 和 credentials
* 配合 CLI 或 messaging gateway 使用

## 基本组成

| 组件 | 说明 |
| ---- | ---- |
| Headless server | 后台运行 Craft Agent 服务 |
| Workspace storage | 保存 sessions、sources、配置 |
| Browser access | 可选 Web 访问入口 |
| CLI client | 从 terminal 操作 server |
| Desktop client | 从桌面应用连接远程 server |

## 部署建议

* 使用稳定主机和持久化存储
* 配置 TLS 或可信网络访问
* 设置访问 token
* 管理好 API keys 和 credentials
* 定期备份 workspace 数据

## 验证

部署后检查：

* server 是否运行
* CLI 是否能连接
* workspace 是否能读取
* agent 是否能创建 session
* sources 和 browser 是否按需可用

## 安全建议

不要把 remote server 暴露到公网且无认证。生产环境应使用 HTTPS、强 token、网络访问控制和最小权限 credentials。
