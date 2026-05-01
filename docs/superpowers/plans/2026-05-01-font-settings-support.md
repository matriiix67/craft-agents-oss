# 设置页字体支持实现计划

> **给执行代理的要求：** 实现本计划时必须使用 `superpowers:executing-plans` 或 `superpowers:subagent-driven-development`。按下面的 checkbox 逐项推进并更新状态。

**目标：** 在 Settings > Appearance 中增加字体支持，让用户可以选择系统字体、Inter、本机可发现字体，或手动输入任意字体名。选择后应立即生效、本地持久化，并继续通过现有偏好广播同步到其他 renderer 窗口。

**架构：** 沿用当前 renderer-local 的主题偏好模型。把字体偏好从两个固定值扩展为受控字符串，再统一转换成 `<html>` 上的 CSS 变量。Chromium Local Font Access API 只作为增强能力；当 API 不可用或被拒绝时，手动输入仍然可用。

**技术栈：** Electron renderer、React、TypeScript、Bun test、Tailwind v4 CSS variables、现有 settings 组件、可选 `window.queryLocalFonts`。

---

## 当前状态

- 字体设置入口在 `apps/electron/src/renderer/pages/settings/AppearanceSettingsPage.tsx`。
- 主题状态和持久化在 `apps/electron/src/renderer/context/ThemeContext.tsx`。
- 主题偏好存储在 renderer `localStorage` 的 `storage.KEYS.theme`。
- CSS 字体变量在 `apps/electron/src/renderer/index.css`。
- 当前字体选项只有 `inter` 和 `system`。
- IPC/shared 偏好 payload 已经是 `font: string`，跨窗口广播不需要改协议结构。

## 成功标准

- Settings > Appearance 显示字体选择器，支持 System、Inter、本机字体列表和自定义输入。
- 自定义字体以 `custom:<font family>` 形式安全存储。
- 切换字体后界面立即更新，无需重启。
- 重载后字体偏好仍然保留。
- 多 renderer 窗口之间的偏好同步继续有效。
- 空白自定义字体名会被拒绝。
- 自定义字体不存在时，能回退到现有系统字体栈。
- `bun run lint:i18n:parity`、目标测试、renderer typecheck 通过。

## 实现任务

### 1. 增加字体偏好工具函数

- [x] 新建 `apps/electron/src/renderer/lib/font-preference.ts`。
- [x] 把解析、标准化、CSS 转义、DOM 应用逻辑集中到这个纯工具模块。
- [x] Inter 专属 CSS 行为只绑定到 `data-font="inter"`。

预期结构：

```ts
export type FontPreference = 'system' | 'inter' | `custom:${string}`

export function normalizeCustomFontName(raw: string): string | null
export function toCustomFontPreference(raw: string): FontPreference | null
export function getCustomFontName(font: FontPreference): string | null
export function fontPreferenceToCssStack(font: FontPreference): string
export function applyFontPreferenceToRoot(root: HTMLElement, font: FontPreference): void
```

行为要求：

- `system`：清理 `data-font` 和自定义 inline CSS 变量。
- `inter`：设置 `data-font="inter"`，并清理自定义 inline CSS 变量。
- `custom:<name>`：设置 `data-font="custom"`，写入 `--font-custom`、`--font-sans`、`--font-default`。
- 写入 CSS 字符串前，转义双引号和反斜杠。

### 2. 给工具函数补测试

- [x] 新建 `apps/electron/src/renderer/lib/__tests__/font-preference.test.ts`。
- [x] 使用 `bun:test`。
- [x] 覆盖自定义字体名标准化、空值拒绝、CSS 转义、不同模式切换时 DOM style 清理。

最低测试用例：

```ts
expect(toCustomFontPreference(' PingFang SC ')).toBe('custom:PingFang SC')
expect(toCustomFontPreference('')).toBeNull()
expect(fontPreferenceToCssStack('custom:A "B"')).toContain('\\"B\\"')
```

### 3. 增加本机字体发现

- [x] 如果 TypeScript 还不认识 `queryLocalFonts`，新增 `apps/electron/src/renderer/types/local-font-access.d.ts`。
- [x] 新建 `apps/electron/src/renderer/hooks/useLocalFontFamilies.ts`。
- [x] 按 `family` 去重，用 `Intl.Collator` 排序，并返回 loading/error/unsupported 状态。
- [x] 权限拒绝只视为非阻塞状态，不能影响手动输入。

预期 hook：

```ts
export function useLocalFontFamilies(): {
  families: string[]
  status: 'idle' | 'loading' | 'loaded' | 'unsupported' | 'error'
  refresh: () => Promise<void>
}
```

### 4. 实现字体选择组件

- [x] 新建 `apps/electron/src/renderer/components/settings/FontFamilyPicker.tsx`。
- [x] Props：

```ts
interface FontFamilyPickerProps {
  value: FontPreference
  onValueChange: (value: FontPreference) => void
}
```

- [x] 复用现有 settings 视觉风格。
- [x] 固定提供 System 和 Inter。
- [x] 可用时展示可搜索的本机字体列表。
- [x] 始终提供手动输入任意字体名的路径。
- [x] 用 `fontPreferenceToCssStack` 展示短 preview。
- [x] Local Font Access 报错时不要阻塞 UI，保留手动输入。

### 5. 接入 ThemeContext

- [x] 修改 `apps/electron/src/renderer/context/ThemeContext.tsx`。
- [x] 用导入的 `FontPreference` 替换当前 `FontFamily = 'inter' | 'system'`。
- [x] 加载 `stored.font` 时做校验，非法值回退到 `system`。
- [x] 用 `applyFontPreferenceToRoot(root, font)` 替换当前 DOM effect。
- [x] 保持 `setFont` 持久化和 `broadcastThemePreferences` 行为不变。

关键规则：

```ts
const safeFont = normalizeStoredFont(stored.font) ?? 'system'
```

### 6. 接入 Appearance 设置页

- [x] 修改 `apps/electron/src/renderer/pages/settings/AppearanceSettingsPage.tsx`。
- [x] 用 `FontFamilyPicker` 替换当前两个选项的 `SettingsSegmentedControl`。
- [x] 保持 row label 仍使用 `settings.appearance.font`。
- [x] 不改其他外观设置。

预期替换：

```tsx
<SettingsRow label={t("settings.appearance.font")}>
  <FontFamilyPicker value={font} onValueChange={setFont} />
</SettingsRow>
```

### 7. 更新 CSS

- [x] 按需修改 `apps/electron/src/renderer/index.css`。
- [x] 如果 helper 没有完全通过 inline CSS variables 覆盖，则增加非常窄的 `html[data-font="custom"]` 规则。
- [x] 保持现有 `html[data-font="inter"]` 行为不变。

推荐 custom 规则：

```css
html[data-font="custom"] {
  font-optical-sizing: auto;
}
```

### 8. 更新 i18n

- [x] 给 `packages/shared/src/i18n/locales/` 下所有 locale JSON 增加对应文案。
- [x] 修改后跑 i18n parity。

建议 key：

- `settings.appearance.fontCustom`
- `settings.appearance.fontSearchPlaceholder`
- `settings.appearance.fontCustomPlaceholder`
- `settings.appearance.fontLocalUnavailable`
- `settings.appearance.fontPreviewText`
- `settings.appearance.fontUseTyped`

### 9. 验证

- [x] 跑目标测试：

```bash
bun test apps/electron/src/renderer/lib/__tests__/font-preference.test.ts
```

- [x] 跑 renderer typecheck：

```bash
cd apps/electron && bun run typecheck
```

- [x] 跑 i18n parity：

```bash
bun run lint:i18n:parity
```

- [x] 跑完整 Electron build，不启动 App：

```bash
bun run electron:build
```

- [ ] 轻量手测，不打完整安装包：

```bash
cd apps/electron && bun run electron:start
```

手测项：

- 分别选择 System、Inter、自定义字体，比如 `PingFang SC`。
- 重载后确认选择仍然保留。
- 输入一个不存在的字体，确认界面回退到系统字体栈。
- 如果应用支持打开第二个 renderer 窗口，确认字体偏好广播仍然生效。

## 风险点

- `queryLocalFonts` 会受 Chromium/Electron 版本和权限影响，手动输入路径必须保留。
- 任意字体名写入 CSS 前必须转义。
- 历史存储值 `system` 和 `inter` 必须继续兼容。
- 本功能不需要修改 main process、package scripts 或 Electron Builder 配置。
