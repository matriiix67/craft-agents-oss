# Lark / Feishu

> 原文：https://agents.craft.do/docs/messaging/lark.md
>
> 本文是中文摘译版，说明如何连接 Lark 或飞书 bot。

## 概览

Lark / Feishu 集成通过 bot 把飞书消息连接到 Craft Agent。它适合团队环境，支持富文本回复、interactive cards 和附件。

## 前置条件

* Lark / Feishu 应用或 bot
* App ID 和 App Secret
* 可运行 gateway 的环境
* 已配置 Craft Agent workspace

## 连接模式

常见方式包括：

* 长连接模式
* 事件订阅 / webhook
* Bot 被拉入群聊后响应 mention

具体选择取决于部署环境和飞书应用配置。

## 能力

* 文本消息收发
* 富文本回复
* Interactive cards
* 附件处理
* 群聊和私聊绑定

## 配置建议

* Bot 名称要清晰，方便团队 mention
* 限定可用 workspace
* 明确群聊中哪些消息会触发 agent
* 对写操作和外部系统操作保留权限确认

## 测试

在绑定的群聊或私聊发送：

```text
hello
```

如果收到 agent 回复，说明 bot 事件、gateway 和 workspace 绑定正常。

## 故障排查

### Bot 收不到消息

检查事件订阅、长连接状态、bot 权限和群聊可见性。

### 回复格式异常

检查富文本或 card payload 是否符合飞书格式。

### 附件不可用

检查文件下载权限、token scope 和 gateway 日志。
