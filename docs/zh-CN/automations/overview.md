# Automations（自动化）

> 原文：https://agents.craft.do/docs/automations/overview
>
> 通过应用事件和 agent 事件触发动作，自动化你的工作流。

> ## 文档索引
>
> 完整文档索引见：https://agents.craft.do/docs/llms.txt
>
> 在继续探索前，可以用这个文件发现所有可用页面。


> **提示**

  **直接告诉你的 agent 你想要什么。** 例如：“创建一个自动化，在 session 被标记时通知我”，或“设置每天早上 9 点的晨报”。agent 会为你创建并验证配置。


Automations 可以在 Craft Agent 中发生事件时自动触发动作。你可以运行 shell 命令、发送 prompt 来启动新 session，或安排周期性工作流；所有配置都集中在一个 JSON 文件中。

## 入门

设置自动化最简单的方式，是用自然语言描述你想要的结果。下面是一些可以尝试的 prompt：

| 你想要什么 | 可以这样说 |
| ---------- | ---------- |
| **定时简报** | “Set up a daily standup briefing every weekday at 9am” |
| **桌面通知** | “Notify me with a macOS notification when a session is labelled urgent” |
| **审计日志** | “Log all permission mode changes to a file” |
| **自动打标签** | “When a session starts, run a command that checks the working directory and logs it” |
| **周期报告** | “Every Friday at 5pm, create a session that summarises this week's completed tasks” |
| **Webhook 集成** | “When I flag a session, send a curl request to my webhook URL” |

### 第一个自动化

下面是最简单的自动化示例：每次给 session 添加 label 时，记录一条日志。

```json
{
  "version": 2,
  "automations": {
    "LabelAdd": [
      {
        "actions": [
          { "type": "command", "command": "echo \"Label added: $CRAFT_LABEL\" >> ~/craft-automations.log" }
        ]
      }
    ]
  }
}
```

将它保存为 `~/.craft-agent/workspaces/{workspaceId}/automations.json` 后会立即生效，无需重启。

### 定时发送 Prompt

想让 Craft Agent 按时间表为你做事？可以用带 cron 表达式的 prompt action：

```json
{
  "version": 2,
  "automations": {
    "SchedulerTick": [
      {
        "cron": "0 9 * * 1-5",
        "timezone": "America/New_York",
        "labels": ["Scheduled"],
        "actions": [
          { "type": "prompt", "prompt": "Check @github for any new issues assigned to me and summarise them" }
        ]
      }
    ]
  }
}
```

这会在每个工作日上午 9 点创建一个新 session，启用 GitHub source，并让 agent 检查分配给你的 issues。该 session 会自动加上 “Scheduled” label，方便筛选。

## Automations 如何工作

当事件触发时，例如添加 label、工具运行，或 cron 计划匹配，Craft Agent 会检查你的配置中是否有匹配项，并执行对应动作。

动作有两类：

* **Command actions**：执行 shell 命令，事件数据会作为环境变量提供
* **Prompt actions**：向 Craft Agent 发送 prompt，并创建一个新 session（仅 App events 支持）

## 配置文件

Automations 按 workspace 配置在 `automations.json` 中：

```
~/.craft-agent/workspaces/{workspaceId}/automations.json
```

### 基本结构

```json
{
  "version": 2,
  "automations": {
    "EventName": [
      {
        "matcher": "regex-pattern",
        "actions": [
          { "type": "command", "command": "echo 'Hello'" }
        ]
      }
    ]
  }
}
```

每种事件类型对应一个 matcher 数组。每个 matcher 包含一个动作数组，当 matcher 的 pattern 匹配事件值时执行。

## 管理 Automations

### 在 UI 中管理

Automations 会显示在侧边栏的 **Automations** 下。你可以在这里：

* **启用 / 禁用**：在不删除配置的情况下，打开或关闭单个自动化
* **复制**：复制已有自动化，并在名称后添加 “Copy” 后缀
* **删除**：永久删除自动化
* **测试**：手动触发自动化，确认它在真实事件发生前能正常运行。测试运行器会解析 `@mentions`、启用 sources，并使用配置的 `llmConnection`/`model`，和 scheduler 走同一套代码路径。
* **执行历史**：每个自动化都会把成功和失败记录到时间线中，可在详情页查看。历史保存在 `automations-history.jsonl`，每个自动化保留最近 20 次运行记录，总计最多 1000 条。

支持批量操作：选择多个 automations 后，可以一起启用、禁用或删除。列表按最近执行时间排序，便于快速访问活跃自动化。

### 在配置文件中管理

你也可以直接编辑 `automations.json` 管理自动化。修改会立即生效，无需重启。

**启用和禁用：** 在任意 matcher 上设置 `"enabled": false`，即可临时禁用它且不移除配置。省略该字段或设置为 `true` 会重新启用。

```json
{
  "matcher": "^urgent$",
  "enabled": false,
  "actions": [
    { "type": "command", "command": "notify-send 'Urgent!'" }
  ]
}
```

**删除：** 从 `automations.json` 中移除 matcher 条目。如果某个事件类型下没有剩余 matcher，也可以删除整个事件 key。


> **提示**

  **让你的 agent** 帮你管理 automations：例如“disable all my scheduled automations”或“remove the urgent notification automation”。agent 会直接读取并更新 `automations.json`。


## Events

### App Events

由 Craft Agent 自身触发。支持 command 和 prompt 两类动作。

| Event | 触发时机 | 匹配值 |
| ----- | -------- | ------ |
| `LabelAdd` | 给 session 添加 label | Label ID（例如 `urgent`） |
| `LabelRemove` | 从 session 移除 label | Label ID |
| `LabelConfigChange` | Label 配置变更 | 总是匹配 |
| `PermissionModeChange` | 权限模式变更 | 新模式名称 |
| `FlagChange` | Session 被 flag / 取消 flag | `true` 或 `false` |
| `SessionStatusChange` | Session 状态变更 | 新状态（例如 `done`） |
| `SchedulerTick` | 每分钟运行一次 | 使用 cron 匹配 |


> **说明**

  **已重命名：** `TodoStateChange` 已重命名为 `SessionStatusChange`。旧名称仍可作为 deprecated alias 使用，但会显示验证警告。请更新自动化配置，改用 `SessionStatusChange`。



> **提示**

  **状态变化：** 若要响应状态/工作流状态变化，例如 session 切换到 “done” 或 “in-progress”，请使用 `SessionStatusChange` event。匹配值是新的状态名称，因此可以使用 `"^done$"` 这样的 matcher，只在特定状态转换时触发。


### Agent Events

传给 Claude SDK。只支持 command actions，不支持 prompt actions。

| Event | 触发时机 | 匹配值 |
| ----- | -------- | ------ |
| `PreToolUse` | 工具执行前 | Tool name |
| `PostToolUse` | 工具成功后 | Tool name |
| `PostToolUseFailure` | 工具失败后 | Tool name |
| `UserPromptSubmit` | 用户提交 prompt | Event data JSON |
| `SessionStart` | Session 启动 | Event data JSON |
| `SessionEnd` | Session 结束 | Event data JSON |
| `Stop` | Agent 停止 | Event data JSON |
| `SubagentStart` | Subagent 被创建 | Event data JSON |
| `SubagentStop` | Subagent 完成 | Event data JSON |
| `Notification` | 收到通知 | Event data JSON |
| `PreCompact` | 上下文压缩前 | Event data JSON |
| `PermissionRequest` | 请求权限时 | Event data JSON |
| `Setup` | Agent setup / initialization | Event data JSON |

## Action Types

### Command Actions

事件触发时执行 shell 命令。事件数据会通过环境变量提供。

```json
{
  "type": "command",
  "command": "echo \"Label $CRAFT_LABEL was added\" >> ~/automation-log.txt",
  "timeout": 60000
}
```

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `type` | `"command"` | Required | Action type |
| `command` | string | Required | 要执行的 shell 命令 |
| `timeout` | number | `60000` | 超时时间，单位毫秒 |

### Prompt Actions

向 Craft Agent 发送 prompt，并创建一个新 session。仅 App events 支持。

```json
{
  "type": "prompt",
  "prompt": "Run the @weather skill and summarize today's forecast"
}
```

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `type` | `"prompt"` | Required | Action type |
| `prompt` | string | Required | 要发送的 prompt 文本 |
| `llmConnection` | string | Workspace default | LLM connection slug（在 AI Settings 中配置） |
| `model` | string | Workspace default | 创建 session 使用的 model ID |
| `thinkingLevel` | `"off"` \| `"low"` \| `"medium"` \| `"high"` \| `"xhigh"` \| `"max"` | Workspace default | 新 session 的 thinking level |

**功能：**

* 使用 `@mentions` 引用 sources 或 skills，例如 `@github`、`@linear`
* 会展开环境变量，例如 `$CRAFT_LABEL`、`${CRAFT_SESSION_NAME}`
* 被 mention 的 sources 会自动为新 session 启用

**单个 Action 的覆盖配置：** 你可以覆盖 prompt action 创建 session 时使用的 AI provider、model 和 thinking level。每个字段相互独立；省略任意字段就会继承 workspace 默认值。

```json
{
  "type": "prompt",
  "prompt": "Quick code review of recent changes",
  "llmConnection": "my-copilot-connection",
  "model": "gemini-2.5-flash",
  "thinkingLevel": "high"
}
```

`llmConnection` 的值是在 AI Settings 中配置的 LLM connection slug。`model` 的值是该 provider 支持的 model ID。如果任一值无效或找不到，会优雅回退到 workspace 默认值。

**Thinking level 解析：** action 上的 `thinkingLevel` 优先级最高；如果省略，则使用 workspace 默认值；如果两者都未设置，session 默认使用 `"medium"`。旧配置中的 `"think"` 会静默迁移为 `"medium"`。后端会优雅地限制不支持的值，例如 Anthropic 会在不支持的模型上把 `xhigh` 自动降级为 `high`，Pi 会把 `max` 限制到 `xhigh`。

## Matchers

### Regex Matching

大多数事件使用 regex 匹配事件的匹配值：

```json
{
  "matcher": "^urgent$",
  "actions": [
    { "type": "command", "command": "notify-send 'Urgent!'" }
  ]
}
```

省略 `matcher` 字段会匹配该类型的所有事件。

**示例：**

| Pattern | Matches |
| ------- | ------- |
| `^urgent$` | 精确匹配 “urgent” |
| `bug\|feature` | 匹配 “bug” 或 “feature” |
| `^prod-` | 匹配任何以 “prod-” 开头的值 |
| *（省略）* | 匹配该类型的所有事件 |

### Cron Matching

对于 `SchedulerTick` events，使用 cron 表达式而非 regex：

```json
{
  "cron": "0 9 * * 1-5",
  "timezone": "Europe/Budapest",
  "actions": [
    { "type": "prompt", "prompt": "Give me a morning briefing" }
  ]
}
```

**Cron 格式：** `minute hour day-of-month month day-of-week`

| Field | Range | Examples |
| ----- | ----- | -------- |
| Minute | 0–59 | `0`, `*/15` |
| Hour | 0–23 | `9`, `14` |
| Day of month | 1–31 | `1`, `15` |
| Month | 1–12 | `1`, `*/3` |
| Day of week | 0–6（0 = Sunday） | `1-5`, `0,6` |

**常见模式：**

| Cron | Schedule |
| ---- | -------- |
| `*/15 * * * *` | 每 15 分钟 |
| `0 9 * * *` | 每天上午 9:00 |
| `0 9 * * 1-5` | 工作日上午 9:00 |
| `30 14 1 * *` | 每月 1 日下午 2:30 |
| `0 */6 * * *` | 每 6 小时 |

**Timezone：** 使用 IANA timezone 名称，例如 `Europe/Budapest`、`America/New_York`。如果未指定，则默认使用系统 timezone。可用 [crontab.guru](https://crontab.guru/) 验证。

## Conditions

Conditions 是可选过滤器，会在 matcher/cron 匹配之后、actions 触发之前运行。数组中的所有 conditions 都必须通过（隐式 AND）。如果数组为空或省略，则无条件触发 actions。


> **提示**

  Conditions 可以组合使用：你可以组合时间窗口、工作日过滤和状态检查，构建精确的自动化触发条件，而不必写复杂 cron 表达式。


```json
{
  "cron": "0 9 * * *",
  "timezone": "Europe/Budapest",
  "conditions": [
    {
      "condition": "time",
      "weekday": ["mon", "tue", "wed", "thu", "fri"]
    }
  ],
  "actions": [
    { "type": "prompt", "prompt": "Good morning! Here's your daily briefing." }
  ]
}
```

### Time Conditions

检查指定 timezone 中的日内时间和星期。

```json
{
  "condition": "time",
  "after": "09:00",
  "before": "17:00",
  "weekday": ["mon", "tue", "wed", "thu", "fri"],
  "timezone": "Europe/Budapest"
}
```

| Property | Type | Description |
| -------- | ---- | ----------- |
| `after` | `"HH:MM"` | 时间窗口开始（包含） |
| `before` | `"HH:MM"` | 时间窗口结束（不包含） |
| `weekday` | `string[]` | 允许的星期：`mon`、`tue`、`wed`、`thu`、`fri`、`sat`、`sun` |
| `timezone` | string | IANA timezone。回退顺序为 matcher timezone，再到系统本地 timezone |


> **说明**

  **跨夜范围：** 如果 `after` 晚于 `before`，例如 `"after": "22:00", "before": "06:00"`，该时间范围会跨越午夜。


### State Conditions

检查 event payload 中的字段。适合按特定状态转换或字段值过滤。

```json
{
  "condition": "state",
  "field": "permissionMode",
  "from": "safe",
  "to": "allow-all"
}
```

| Property | Type | Description |
| -------- | ---- | ----------- |
| `field` | string | Payload 字段名，例如 `permissionMode`、`sessionStatus`、`labels`、`isFlagged` |
| `value` | any | 精确匹配 |
| `from` | any | 之前的值（用于 transition events） |
| `to` | any | 新值（用于 transition events） |
| `contains` | string | 数组成员检查，例如检查某个 label 是否存在 |
| `not_value` | any | 匹配除该值之外的任何值 |


> **说明**

  **Transition fields：** 对于 `permissionMode` 和 `sessionStatus`，`from`/`to` 会自动解析到正确的 payload keys（`oldMode`/`newMode`、`oldState`/`newState`）。


### 逻辑组合

使用 `and`、`or` 和 `not` 组合 conditions：

```json
{
  "condition": "and",
  "conditions": [
    { "condition": "time", "weekday": ["mon", "tue", "wed", "thu", "fri"] },
    { "condition": "time", "after": "09:00", "before": "17:00" }
  ]
}
```

```json
{
  "condition": "or",
  "conditions": [
    { "condition": "state", "field": "permissionMode", "value": "allow-all" },
    { "condition": "state", "field": "isFlagged", "value": true }
  ]
}
```

```json
{
  "condition": "not",
  "conditions": [
    { "condition": "time", "weekday": ["sat", "sun"] }
  ]
}
```

| Type | Behaviour |
| ---- | --------- |
| `and` | 所有子条件都必须通过 |
| `or` | 至少一个子条件必须通过 |
| `not` | 所有子条件都不能通过 |

<Warning>
  Conditions 最多可嵌套 8 层。深度达到 4 时会发出简化警告。尽量保持 conditions 扁平。未知 condition 类型会 fail closed（评估为 false）。
</Warning>

## Matcher Options

每个 matcher 条目支持以下可选字段：

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `matcher` | string | Match all | 用于事件过滤的 regex pattern |
| `cron` | string | — | Cron expression（仅 `SchedulerTick`） |
| `timezone` | string | System TZ | cron 使用的 IANA timezone |
| `conditions` | array | `[]` | actions 触发前必须全部通过的 conditions（见 [Conditions](#conditions)） |
| `permissionMode` | string | `"safe"` | command 的安全模式 |
| `labels` | string[] | `[]` | 应用于 prompt 创建 session 的 labels |
| `telegramTopic` | string | — | 将生成的 session 路由到 Telegram forum topic，见 [Telegram Topic Routing](#telegram-topic-routing) |
| `enabled` | boolean | `true` | 设置为 `false` 可禁用但不删除 |
| `actions` | array | Required | command/prompt actions 数组 |

## Telegram Topic Routing

当你已经在 **Settings → Messaging → Telegram** 中配对 Telegram supergroup 后，可以通过设置 `telegramTopic` 字段，把 matcher 生成的 sessions 路由到专用 forum topic。

```json
{
  "automations": {
    "LabelAdd": [
      {
        "matcher": "^urgent$",
        "telegramTopic": "Urgent Alerts",
        "permissionMode": "ask",
        "actions": [
          { "type": "prompt", "prompt": "Look at the urgent issue: $LABEL" }
        ]
      }
    ]
  }
}
```

matcher 触发后，生成的 session 会绑定到指定名称的 forum topic。该 topic 会在**首次使用时创建**，之后会被**复用**，因此同一个 matcher 后续运行，以及其他使用相同 `telegramTopic` 值的 matcher，都会发到同一个 topic。

### 激活要求

以下条件都必须满足；否则该字段会被**静默忽略**，session 会在没有 Telegram binding 的情况下运行，就像该字段不存在一样：

* 已在 **Settings → Messaging → Telegram** 中配对 Telegram supergroup
* Telegram bot 已连接
* Bot 在 supergroup 中具有 **Manage Topics** admin 权限

### 设置 Telegram supergroup

如果你还没有配对 supergroup，请按以下步骤操作。整个流程大约需要一分钟。

#### 1. 创建启用 topics 的 supergroup

普通 Telegram group 不能承载 topics；你需要一个**启用 “Topics” 模式的 supergroup**。

* **新建 group**：Telegram → New Group → 添加任意成员（或只添加自己，用于个人 workspace）→ 设置名称。Telegram 会在成员数超过阈值或你打开 Topics 后，自动把 group 转为 supergroup。
* **启用 Topics**：打开 group → 点击 group 名称 → **Edit**（移动端为铅笔图标，桌面端为 ⋯）→ 打开 **Topics** → **Save**。该 group 现在就是 forum supergroup；你会看到一个 “General” topic 和一个用于创建更多 topic 的 “+” 按钮。

#### 2. 将 bot 添加到 supergroup

打开 supergroup → 点击 group 名称 → **Add members** → 搜索你的 bot username（例如 `@CraftAgentsBot`）→ 添加它。

#### 3. 将 bot 设为 admin，并授予 “Manage Topics”

这是大多数人容易漏掉的一步：bot 需要显式权限才能创建新 topics，否则 topic 创建调用会返回 `400: Bad Request: not enough rights to create a topic`。

1. 在 supergroup 中，点击 group 名称 → **Edit** → **Administrators**。
2. 点击 **Add Administrator** → 选择 bot。
3. 在权限列表中，**打开 Manage Topics**。其他权限，例如 Delete Messages 或 Pin Messages，是可选项，topic routing 功能不要求。
4. 点击 **Save** / **Done**。


> **提示**

  **配对后验证：** 在 Craft Agent app 中打开 Settings → Messaging → Telegram，检查 “Supergroup” 行是否显示 group title。第一次自动化运行时，如果 bot 仍缺少 “Manage Topics”，错误会出现在 `~/.craft-agent/logs/messaging-gateway.log` 中；查找 `automation_topic_bind_failed`。


#### 4. 将 supergroup 与 workspace 配对

1. 在 Craft Agent app 中：**Settings → Messaging → Telegram → Pair Supergroup**。
2. 对话框会显示一个 6 位 code、一个指向 bot 的 deep link，以及 5 分钟倒计时。
3. 在 Telegram 中，在你的 supergroup 的**任意 topic** 中输入 `/pair <code>`，将 `<code>` 替换为对话框中的数字。
4. Bot 会回复确认消息。对话框会自动关闭，Settings 行会更新为 supergroup 的 title 和 chat ID。

完成后，设置了 `telegramTopic` 的 automations 就会在这个 supergroup 中创建 topics。

### 说明

* Topic names 长度为 1–128 个字符，并且**区分大小写**（`"Reports"` 和 `"reports"` 是不同 topics）。
* 两个 matcher 使用相同 `telegramTopic` 值时会共享同一个 topic，适合把相关 automations 分组。
* 如果修改某个 matcher 的 `telegramTopic` 值，下次运行会使用或创建新 topic；旧 topic 会保留在 Telegram 中，历史记录不受影响。
* 在 Telegram 中重命名 topic 不会同步回来；binding 跟随 topic ID，而不是显示名称。

## 环境变量

### 通用变量

所有 command actions 都可使用：

| Variable | Description |
| -------- | ----------- |
| `CRAFT_EVENT` | Event name（例如 `LabelAdd`、`PreToolUse`） |
| `CRAFT_EVENT_DATA` | 完整 event payload，JSON 格式 |
| `CRAFT_SESSION_ID` | 当前 session ID |
| `CRAFT_SESSION_NAME` | 当前 session 名称 |
| `CRAFT_WORKSPACE_ID` | 当前 workspace ID |

### App Event 变量

由 event payload 动态生成：

**Label events**（`LabelAdd`、`LabelRemove`）：

* `CRAFT_LABEL`：正在添加/移除的 Label ID

**PermissionModeChange：**

* `CRAFT_OLD_MODE`：之前的 permission mode
* `CRAFT_NEW_MODE`：新的 permission mode

**FlagChange：**

* `CRAFT_IS_FLAGGED`：`true` 或 `false`

**SessionStatusChange：**

* `CRAFT_OLD_STATE`：之前的 session status
* `CRAFT_NEW_STATE`：新的 session status

**SchedulerTick：**

* `CRAFT_LOCAL_TIME`：当前时间（HH:MM）
* `CRAFT_LOCAL_DATE`：当前日期（YYYY-MM-DD）

### Agent Event 变量

**Tool events**（`PreToolUse`、`PostToolUse`、`PostToolUseFailure`）：

* `CRAFT_TOOL_NAME`：正在使用的工具
* `CRAFT_TOOL_INPUT`：工具参数，JSON 格式
* `CRAFT_TOOL_RESPONSE`：工具输出（仅 `PostToolUse`）
* `CRAFT_ERROR`：错误消息（仅 `PostToolUseFailure`）

**Session events**（`SessionStart`）：

* `CRAFT_SOURCE`：Session source（例如 `startup`、`resume`）
* `CRAFT_MODEL`：Model name

**Subagent events**（`SubagentStart`、`SubagentStop`）：

* `CRAFT_AGENT_ID`：Subagent ID
* `CRAFT_AGENT_TYPE`：Subagent type

## Permission Modes

Command actions 默认会经过安全检查。你可以针对每个 matcher 调整：

| Mode | Behaviour | Use Case |
| ---- | --------- | -------- |
| `safe` | 根据 allowlist 检查命令 | 默认值，推荐 |
| `allow-all` | 跳过安全检查 | 仅用于可信自动化 |

<Warning>
  仅对完全信任的命令使用 `allow-all`。它允许执行任意 shell。
</Warning>

```json
{
  "matcher": "^urgent$",
  "permissionMode": "allow-all",
  "actions": [
    { "type": "command", "command": "osascript -e 'display notification \"Urgent!\" with title \"Craft Agent\"'" }
  ]
}
```

## Prompt Actions 的 Labels

Prompt actions 可以给它们创建的 sessions 添加 labels。这让筛选和组织定时 sessions 更方便：

```json
{
  "cron": "0 9 * * *",
  "labels": ["Scheduled", "morning-briefing"],
  "actions": [
    { "type": "prompt", "prompt": "Give me today's priorities" }
  ]
}
```

Labels 也支持环境变量展开：`"priority::${CRAFT_LABEL}"`。

## Rate Limits

为防止失控循环，例如自动化间接触发自身，event bus 会强制执行 rate limits：

| Event | Max fires / minute |
| ----- | ------------------ |
| `SchedulerTick` | 60（1/sec） |
| 所有其他 events | 10 |

超出的 events 会在剩余的 60 秒窗口内被静默丢弃。

## 示例

### 每日晨报

每个工作日上午 9 点定时发送 prompt：

```json
{
  "version": 2,
  "automations": {
    "SchedulerTick": [
      {
        "cron": "0 9 * * 1-5",
        "timezone": "Europe/Budapest",
        "labels": ["Scheduled", "briefing"],
        "actions": [
          { "type": "prompt", "prompt": "Run the @daily-standup skill" }
        ]
      }
    ]
  }
}
```

### 仅工作日 AI 新闻（带 Conditions）

使用 `time` condition 将每日计划限制在工作日：

```json
{
  "version": 2,
  "automations": {
    "SchedulerTick": [
      {
        "name": "Morning AI news",
        "cron": "0 9 * * *",
        "timezone": "Europe/Budapest",
        "conditions": [
          {
            "condition": "time",
            "weekday": ["mon", "tue", "wed", "thu", "fri"],
            "timezone": "Europe/Budapest"
          }
        ],
        "labels": ["Scheduled", "ai-news"],
        "actions": [
          { "type": "prompt", "prompt": "Run the @ai-news skill and summarize today's AI developments" }
        ]
      }
    ]
  }
}
```

### Permission Mode Gate（带 Conditions）

仅在 permission mode 从 `safe` 变为 `allow-all` 时通知：

```json
{
  "version": 2,
  "automations": {
    "PermissionModeChange": [
      {
        "conditions": [
          {
            "condition": "state",
            "field": "permissionMode",
            "from": "safe",
            "to": "allow-all"
          }
        ],
        "actions": [
          { "type": "command", "command": "osascript -e 'display notification \"Permission escalated to allow-all\" with title \"Craft Agent\"'" }
        ]
      }
    ]
  }
}
```

### 记录 Label 变化

跟踪 labels 的添加和移除：

```json
{
  "version": 2,
  "automations": {
    "LabelAdd": [
      {
        "permissionMode": "allow-all",
        "actions": [
          { "type": "command", "command": "echo \"[$(date)] Added: $CRAFT_LABEL\" >> ~/label-log.txt" }
        ]
      }
    ],
    "LabelRemove": [
      {
        "permissionMode": "allow-all",
        "actions": [
          { "type": "command", "command": "echo \"[$(date)] Removed: $CRAFT_LABEL\" >> ~/label-log.txt" }
        ]
      }
    ]
  }
}
```

### Urgent Label 的 macOS 通知

```json
{
  "version": 2,
  "automations": {
    "LabelAdd": [
      {
        "matcher": "^urgent$",
        "permissionMode": "allow-all",
        "actions": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Urgent session flagged\" with title \"Craft Agent\"'"
          }
        ]
      }
    ]
  }
}
```

### 审计 Permission Mode 变化

```json
{
  "version": 2,
  "automations": {
    "PermissionModeChange": [
      {
        "permissionMode": "allow-all",
        "actions": [
          {
            "type": "command",
            "command": "echo \"$(date): $CRAFT_OLD_MODE -> $CRAFT_NEW_MODE\" >> ~/mode-audit.log"
          }
        ]
      }
    ]
  }
}
```

### 多个 Schedule 与启用/禁用

在不同时间运行不同 automations，并在不删除的情况下禁用部分自动化：

```json
{
  "version": 2,
  "automations": {
    "SchedulerTick": [
      {
        "cron": "0 9 * * 1-5",
        "timezone": "Europe/Budapest",
        "labels": ["Scheduled"],
        "actions": [
          { "type": "prompt", "prompt": "Give me a morning briefing" }
        ]
      },
      {
        "cron": "0 17 * * 5",
        "timezone": "Europe/Budapest",
        "enabled": false,
        "labels": ["Scheduled"],
        "actions": [
          { "type": "prompt", "prompt": "Summarise this week's completed tasks" }
        ]
      }
    ]
  }
}
```

第二个自动化（周五总结）已被禁用，在 `"enabled"` 设置为 `true` 或被移除前不会运行。

### 使用自定义 Connection、Model 和 Thinking Level 的 Prompt

为某个具体自动化覆盖 provider、model 和 thinking level：

```json
{
  "version": 2,
  "automations": {
    "SchedulerTick": [
      {
        "cron": "0 8 * * 1-5",
        "timezone": "Europe/Budapest",
        "labels": ["Scheduled"],
        "actions": [
          {
            "type": "prompt",
            "prompt": "Review overnight @github pull requests",
            "llmConnection": "openrouter",
            "model": "anthropic/claude-sonnet-4.6",
            "thinkingLevel": "high"
          }
        ]
      }
    ]
  }
}
```

## Validation

让 Craft Agent 验证你的 automations：

```
Validate my automations configuration
```

或使用 `config_validate` tool，并设置 `target: "all"`。

Validator 会检查：

* JSON 语法无效
* 未知 event names
* 空 actions arrays
* 无效 cron expressions 或 timezones
* 无效或不安全的 regex patterns（ReDoS 防护）
* 引用了不存在的 labels
* 无效 condition types、field names 或 weekday values
* Condition 嵌套深度超限
* 缺失 `llmConnection` slugs（error，运行时会失败）
* 同时指定 `llmConnection` 和 `model` 时出现 model/provider 不匹配（warning）
* 无效 `thinkingLevel` values（旧的 `"think"` 会静默迁移为 `"medium"`）

## Security

Automations 包含多项内置安全措施：

* **Shell injection prevention**：环境变量中的用户可控值（session names、labels、prompts）会自动转义
* **ReDoS protection**：Regex patterns 限制为 500 个字符，并检查灾难性回溯模式
* **Rate limiting**：防止 automations 触发其他 automations 造成无限循环
* **Permission modes**：Commands 默认会根据 allowlist 检查
* **Timeouts**：Commands 会在超时后被终止（带 SIGKILL fallback）

## Best Practices

* **从简单开始**：编写复杂脚本前，先用 `echo` 命令测试
* **使用 labels**：给定时 sessions 打标签，方便筛选
* **设置 timeouts**：用 `timeout` 字段防止命令失控
* **记录 failures**：重定向 stderr 追踪问题：`command 2>> ~/automation-errors.log`
* **保持具体**：使用 matchers，避免每个 event 都触发
* **测试 cron**：使用 [crontab.guru](https://crontab.guru/) 验证表达式
* **使用 `enabled: false`**：调试时临时禁用 automations，而不是删除

## Troubleshooting

### Automation not firing

1. **检查 event name**：必须完全匹配，例如 `LabelAdd`，不能写成 `labeladd`
2. **检查 matcher**：Regex 必须匹配 event 的 match value
3. **检查 cron**：对于 SchedulerTick，验证你的 cron expression
4. **检查 enabled**：确认 matcher 没有设置 `"enabled": false`
5. **检查 logs**：在应用日志中查找 `[automations]`

### Command blocked

如果看到 “Bash command blocked” 错误：

1. 给 matcher 添加 `"permissionMode": "allow-all"`
2. 或简化命令，避免 `$()` 这类 shell constructs

### Prompt not creating session

1. 确保 event 是 **App event**，因为 prompt actions 不适用于 Agent events
2. 检查 prompt text 非空
3. 验证 `@mentions` 引用了有效 sources 或 skills

### Condition not matching

1. **检查 weekday 拼写**：必须是 3 个字母的小写形式：`mon`、`tue`、`wed`、`thu`、`fri`、`sat`、`sun`
2. **检查 timezone**：使用 IANA 名称，例如 `Europe/Budapest`。无效 timezones 会静默回退到系统本地 timezone
3. **检查时间格式**：必须是 24 小时制 `HH:MM`，例如 `09:00`，不能写成 `9:00 AM`
4. **检查 state field names**：使用 `permissionMode`、`sessionStatus`、`labels`、`isFlagged`
5. **检查嵌套深度**：Conditions 嵌套超过 8 层时始终评估为 false
6. **检查 logs**：查找提到 condition evaluation 的 `[automations]` 条目
