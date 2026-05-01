export type FontPreference = 'system' | 'inter' | `custom:${string}`

const CUSTOM_PREFIX = 'custom:'
const SYSTEM_FONT_STACK = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
const INTER_FONT_STACK = `"Inter", ${SYSTEM_FONT_STACK}`

export function normalizeCustomFontName(raw: string): string | null {
  const normalized = raw.replace(/\s+/g, ' ').trim()
  return normalized.length > 0 ? normalized : null
}

export function toCustomFontPreference(raw: string): FontPreference | null {
  const name = normalizeCustomFontName(raw)
  return name ? `${CUSTOM_PREFIX}${name}` : null
}

export function normalizeStoredFont(raw: unknown): FontPreference | null {
  if (raw === 'system' || raw === 'inter') return raw
  if (typeof raw !== 'string' || !raw.startsWith(CUSTOM_PREFIX)) return null

  const name = normalizeCustomFontName(raw.slice(CUSTOM_PREFIX.length))
  return name ? `${CUSTOM_PREFIX}${name}` : null
}

export function getCustomFontName(font: FontPreference): string | null {
  if (!font.startsWith(CUSTOM_PREFIX)) return null
  return font.slice(CUSTOM_PREFIX.length)
}

export function quoteFontFamilyName(name: string): string {
  return `"${name.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

export function fontPreferenceToCssStack(font: FontPreference): string {
  if (font === 'inter') return INTER_FONT_STACK
  if (font === 'system') return SYSTEM_FONT_STACK

  const name = getCustomFontName(font)
  return name ? `${quoteFontFamilyName(name)}, ${SYSTEM_FONT_STACK}` : SYSTEM_FONT_STACK
}

export function applyFontPreferenceToRoot(root: HTMLElement, font: FontPreference): void {
  root.style.removeProperty('--font-custom')
  root.style.removeProperty('--font-sans')
  root.style.removeProperty('--font-default')

  if (font === 'inter') {
    root.dataset.font = 'inter'
    return
  }

  if (font === 'system') {
    delete root.dataset.font
    return
  }

  root.dataset.font = 'custom'
  root.style.setProperty('--font-custom', quoteFontFamilyName(getCustomFontName(font) ?? ''))
  root.style.setProperty('--font-sans', fontPreferenceToCssStack(font))
  root.style.setProperty('--font-default', 'var(--font-sans)')
}

export function normalizeLocalFontFamilies(fonts: Array<{ family?: string | null }>): string[] {
  const families = new Set<string>()

  for (const font of fonts) {
    const family = normalizeCustomFontName(font.family ?? '')
    if (family) families.add(family)
  }

  const collator = new Intl.Collator(undefined, { sensitivity: 'base' })
  return Array.from(families).sort(collator.compare)
}
