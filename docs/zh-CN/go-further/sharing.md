# Sharing Conversations（分享会话）

> 原文：https://agents.craft.do/docs/go-further/sharing.md
>
> 本文是中文摘译版，说明如何分享 conversations。

## 概览

Craft Agents 支持分享 conversations，让团队成员查看 agent 的上下文、过程和结果。分享适合代码审查、方案讨论、交付记录和问题复盘。

## 分享内容

分享通常包含：

* 用户消息
* Agent 回复
* 关键工具调用摘要
* 生成的文档或结果
* Conversation summary

## 适合场景

* 把调查结果发给团队
* 解释某次代码变更来源
* 分享 agent 生成的方案
* 给 reviewer 提供完整上下文
* 把完成的 session 归档为知识记录

## 注意事项

分享前检查是否包含：

* API keys 或 tokens
* 客户敏感数据
* 内部链接
* 未公开代码
* 私人消息或附件

## 发送到 Workspace

Session 可以发送到另一个 workspace。目标 workspace 会收到一份独立副本，并带有 summary，便于继续工作。

## 使用建议

分享前先让 agent 总结 conversation，去掉不必要细节。对外分享时，优先使用清晰、脱敏、可复查的版本。
