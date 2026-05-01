import { describe, expect, it } from 'bun:test'
import {
  applyFontPreferenceToRoot,
  fontPreferenceToCssStack,
  normalizeLocalFontFamilies,
  normalizeStoredFont,
  quoteFontFamilyName,
  toCustomFontPreference,
} from '../font-preference'

function createRootStub() {
  const styles = new Map<string, string>()
  const root = {
    dataset: {} as Record<string, string>,
    style: {
      setProperty: (name: string, value: string) => {
        styles.set(name, value)
      },
      removeProperty: (name: string) => {
        styles.delete(name)
      },
    },
  } as unknown as HTMLElement

  return { root, styles }
}

describe('font preference helpers', () => {
  it('normalizes custom font names', () => {
    expect(toCustomFontPreference(' PingFang   SC ')).toBe('custom:PingFang SC')
    expect(toCustomFontPreference('')).toBeNull()
    expect(toCustomFontPreference('   ')).toBeNull()
  })

  it('normalizes stored font values', () => {
    expect(normalizeStoredFont('system')).toBe('system')
    expect(normalizeStoredFont('inter')).toBe('inter')
    expect(normalizeStoredFont('custom: SF Pro  Text ')).toBe('custom:SF Pro Text')
    expect(normalizeStoredFont('custom:')).toBeNull()
    expect(normalizeStoredFont('Roboto')).toBeNull()
    expect(normalizeStoredFont(null)).toBeNull()
  })

  it('escapes custom font names for CSS strings', () => {
    expect(quoteFontFamilyName('A "B" \\ C')).toBe('"A \\"B\\" \\\\ C"')
    expect(fontPreferenceToCssStack('custom:A "B"')).toContain('\\"B\\"')
  })

  it('applies system, inter, and custom fonts to the root element', () => {
    const { root, styles } = createRootStub()

    applyFontPreferenceToRoot(root, 'custom:PingFang SC')
    expect(root.dataset.font).toBe('custom')
    expect(styles.get('--font-custom')).toBe('"PingFang SC"')
    expect(styles.get('--font-default')).toBe('var(--font-sans)')

    applyFontPreferenceToRoot(root, 'inter')
    expect(root.dataset.font).toBe('inter')
    expect(styles.has('--font-custom')).toBe(false)
    expect(styles.has('--font-sans')).toBe(false)
    expect(styles.has('--font-default')).toBe(false)

    applyFontPreferenceToRoot(root, 'system')
    expect(root.dataset.font).toBeUndefined()
    expect(styles.size).toBe(0)
  })

  it('deduplicates and sorts local font families', () => {
    expect(normalizeLocalFontFamilies([
      { family: 'Inter' },
      { family: ' PingFang   SC ' },
      { family: 'inter' },
      { family: '' },
      {},
    ])).toEqual(['Inter', 'inter', 'PingFang SC'])
  })
})
