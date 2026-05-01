# Preferences（偏好设置）

> 原文：https://agents.craft.do/docs/reference/config/preferences.md
>
> 本文是中文摘译版，说明 `~/.craft-agent/preferences.json` 的用途。

## 概览

`preferences.json` 保存用户偏好，例如 UI、输入行为、默认显示、快捷键或其他本地设置。它与 workspace 配置分工不同，通常更偏个人使用习惯。

## 常见偏好

* 主题或显示选项
* 输入框行为
* 默认排序或筛选
* 快捷键设置
* 最近使用路径
* UI 面板状态

## 文件位置

```text
~/.craft-agent/preferences.json
```

具体路径可能因平台和版本不同而变化。

## 修改建议

优先通过应用设置修改。手动编辑时先备份，并保持 JSON 语法有效。

```bash
cp ~/.craft-agent/preferences.json ~/.craft-agent/preferences.json.bak
```

## 与 Workspace 配置的区别

Preferences 更偏用户个人体验；workspace 配置更偏项目和团队共享上下文，例如 sources、skills、statuses、permissions。

## 故障排查

如果 UI 偏好异常，可以恢复备份或临时移走 preferences 文件，让应用重新生成默认设置。
