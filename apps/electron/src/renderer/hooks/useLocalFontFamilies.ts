import { useCallback, useState } from 'react'
import { normalizeLocalFontFamilies } from '@/lib/font-preference'

export type LocalFontFamiliesStatus = 'idle' | 'loading' | 'loaded' | 'unsupported' | 'error'

export function useLocalFontFamilies(): {
  families: string[]
  status: LocalFontFamiliesStatus
  refresh: () => Promise<void>
} {
  const [families, setFamilies] = useState<string[]>([])
  const [status, setStatus] = useState<LocalFontFamiliesStatus>('idle')

  const refresh = useCallback(async () => {
    if (typeof window === 'undefined' || typeof window.queryLocalFonts !== 'function') {
      setStatus('unsupported')
      setFamilies([])
      return
    }

    setStatus('loading')
    try {
      const fonts = await window.queryLocalFonts()
      setFamilies(normalizeLocalFontFamilies(fonts))
      setStatus('loaded')
    } catch {
      setFamilies([])
      setStatus('error')
    }
  }, [])

  return { families, status, refresh }
}
