# WhatsApp

> 原文：https://agents.craft.do/docs/messaging/whatsapp.md
>
> 本文是中文摘译版，说明如何通过 WhatsApp 使用 Craft Agent。

## 概览

WhatsApp 集成通常通过 QR pairing 连接账号，并由 worker 负责收发消息。连接后，你可以在 WhatsApp 中给 agent 发消息，也可以把 agent 回复同步回聊天。

## 适合场景

* 从手机快速派发 agent 任务
* 在 WhatsApp 中查看任务进度
* 通过 self-chat 模式和 agent 对话
* 接收长任务完成结果

## 连接流程

1. 启动 WhatsApp worker 或 gateway
2. 扫描 QR code 完成配对
3. 绑定 chat 与 workspace
4. 发送测试消息
5. 检查 agent 回复是否回到 WhatsApp

## Self-Chat 模式

Self-chat 模式适合个人使用。你可以把自己的 WhatsApp 聊天作为入口，让 agent 处理消息并回传结果。

## 附件支持

WhatsApp 消息可以包含图片、文档和其他附件。Agent 是否能读取取决于 gateway 下载能力、文件类型支持和权限配置。

## 运行建议

* 保持 worker 稳定运行
* 定期检查配对状态
* 对生产账号谨慎测试
* 避免在高风险群聊中开放强权限

## 故障排查

### QR 配对失败

检查 worker 日志、网络访问和 WhatsApp 客户端状态。

### 消息延迟

检查 worker 进程、网络质量和 rate limit。

### 回复没有回到聊天

确认 chat 绑定、workspace 配置和 agent session 状态。
