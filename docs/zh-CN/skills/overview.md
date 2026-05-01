# Skills（技能）

> 原文：https://agents.craft.do/docs/skills/overview.md
>
> 本文是中文摘译版，说明 skills 的用途、结构、调用方式和维护建议。

## 概览

Skills 用来扩展 Craft Agents 的能力。它们本质上是可复用的专业 instructions，可以把固定流程、团队规范、领域知识和工具使用方式沉淀下来。

当你在 conversation 中 mention 某个 skill，agent 会把该 skill 的说明加入上下文，并按其中约定执行。

## Skills 适合做什么

* 固化团队代码审查标准
* 描述常用发布流程
* 封装文档生成规范
* 定义数据分析或报告模板
* 记录某个项目的操作步骤
* 为特定 source 或 API 设定使用规则

## 调用 Skills

在消息中使用 `@skill-name` 即可触发 skill。例如：

```text
Use @code-review to review this pull request.
Run @daily-standup for today.
```

输入 `@` 时，应用会展示可用 sources 和 skills。选择后会插入对应 mention。

## Skill 文件结构

一个 skill 通常包含 `SKILL.md`，也可以包含脚本、模板、示例和资产：

```text
my-skill/
  SKILL.md
  scripts/
  templates/
  examples/
  assets/
```

`SKILL.md` 是入口文件，应该说明：

* skill 的用途
* 何时使用
* 输入和输出要求
* 需要遵守的步骤
* 可用脚本或模板
* 验证和完成标准

## Frontmatter

Skill 可以使用 YAML frontmatter 声明 metadata：

```markdown
---
name: code-review
description: Review code changes for bugs, regressions, and maintainability risks.
---

# Code Review

Follow this workflow...
```

`description` 应该写清楚触发场景，帮助 agent 判断何时该使用该 skill。

## 与 Conversation Context 的关系

Skills 会带着当前 conversation history 运行。也就是说，skill 可以引用之前讨论过的文件、任务、约束和决策。

这适合串联流程：先让 agent 研究问题，再用专门 skill 生成报告或执行审查。

## 编写建议

### 保持入口清晰

`SKILL.md` 应该直接说明目标和流程，避免把关键要求分散到多个隐藏文件里。

### 使用具体步骤

把高风险或容易遗漏的步骤写成明确流程，例如：

1. 先读取配置
2. 再运行验证命令
3. 最后输出结果路径和证据

### 复用脚本和模板

如果流程需要重复执行，优先把复杂逻辑放到 `scripts/`。输出格式固定时，放到 `templates/`。

### 写清完成标准

明确什么才算完成，例如文件已落盘、测试通过、发布返回 ID、或报告已生成。

## 管理 Skills

Skills 可以按 workspace 管理。团队可以把通用 skills 放在共享目录中，也可以为单个项目维护专门 skills。

更新 skill 后，新的 sessions 会使用新内容；已有 session 是否立即感知取决于当前 context 和应用加载方式。
