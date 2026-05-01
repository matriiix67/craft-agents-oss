# Messaging（消息集成）

> 原文：https://agents.craft.do/docs/messaging/overview.md
>
> 本文是中文摘译版，说明如何从聊天应用驱动 Craft Agent sessions。

## 概览

Messaging 让你从 Telegram、WhatsApp 或 Lark / Feishu 等聊天工具中使用 Craft Agent。你可以从手机发送消息，agent 在 Craft Agent 中处理，并把回复发回聊天窗口。

## 适合场景

* 移动端快速创建任务
* 在外部聊天里继续 agent session
* 接收长任务完成通知
* 把团队消息转成 agent 工作项
* 从私聊或群聊触发自动化流程

## 支持渠道

| 渠道 | 说明 |
| ---- | ---- |
| Telegram | 通过 bot token 连接，支持附件和 inline buttons |
| WhatsApp | 通过 QR pairing 连接，支持 self-chat 模式 |
| Lark / Feishu | 通过 bot 连接，支持富文本、卡片和附件 |

## 工作方式

消息渠道通常会映射到 Craft Agent session。用户在聊天工具里发送消息后，gateway 会把消息转发给 agent，并把 agent 输出再发回对应 chat。

## 配置重点

* 绑定聊天渠道和 workspace
* 配置 bot token、webhook 或长连接
* 确认 gateway 正常运行
* 设置允许访问的 sources 和权限
* 测试文本消息和附件消息

## 安全建议

* 只把 bot 加到可信 chat
* 谨慎开放 Execute mode
* 对群聊中的命令设置边界
* 避免把 secrets 直接发进聊天
* 给高风险操作保留人工确认
