# Configuration File（配置文件）

> 原文：https://agents.craft.do/docs/reference/config/config-file.md
>
> 本文是中文摘译版，说明 `~/.craft-agent/config.json` 的作用。

## 概览

`config.json` 是 Craft Agents 的主配置文件之一，用来保存应用级设置、server 连接和运行参数。具体字段会随版本演进，应以当前应用生成的配置为准。

## 常见配置范围

* Server 相关设置
* 默认 workspace
* LLM provider 或 connection 默认值
* UI 或行为偏好
* 网络和 proxy 配置引用
* 本地路径和缓存位置

## 查看配置

配置通常位于：

```text
~/.craft-agent/config.json
```

编辑前建议先备份：

```bash
cp ~/.craft-agent/config.json ~/.craft-agent/config.json.bak
```

## 修改建议

优先通过应用设置或让 agent 帮你修改。手动编辑 JSON 时，要确保语法有效，避免 trailing comma 和错误字段类型。

## 故障排查

如果配置损坏导致应用无法启动，可以恢复备份，或临时移走配置文件让应用重新生成默认配置。
