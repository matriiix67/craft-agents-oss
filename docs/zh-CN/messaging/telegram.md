# Telegram

> 原文：https://agents.craft.do/docs/messaging/telegram.md
>
> 本文是中文摘译版，说明如何连接 Telegram bot。

## 概览

Telegram 集成通过 bot token 把 Telegram chat 连接到 Craft Agent。连接后，你可以从 Telegram 给 agent 发消息、接收回复，并按配置处理附件和按钮交互。

## 前置条件

* 一个 Telegram bot
* Bot token
* 可运行 Craft Agent gateway 的环境
* 已配置 workspace 和模型连接

## 创建 Bot

通常通过 Telegram 的 BotFather 创建：

1. 打开 BotFather
2. 使用 `/newbot`
3. 设置 bot 名称和 username
4. 保存返回的 bot token

## 连接方式

把 bot token 配置到 Craft Agent messaging gateway。启动后，gateway 会监听 Telegram updates，并把消息转发到对应 workspace/session。

## 常见能力

* 文本消息
* 文件和图片附件
* Inline buttons
* 私聊或群聊使用
* 将 Telegram thread 映射到 Craft Agent session

## 测试

配置完成后，向 bot 发送：

```text
hello
```

如果 agent 返回回复，说明 bot、gateway 和 workspace 绑定已经生效。

## 故障排查

### Bot 没有回复

检查 token、gateway 是否运行、网络是否能访问 Telegram API、chat 是否已绑定 workspace。

### 附件无法读取

检查 bot 文件权限、下载路径、gateway 日志和文件大小限制。

### 群聊中无法触发

确认 bot 已加入群聊，且隐私模式、mention 规则和绑定配置符合预期。
