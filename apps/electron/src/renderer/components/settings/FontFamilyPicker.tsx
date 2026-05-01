import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown, Search } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useLocalFontFamilies } from '@/hooks/useLocalFontFamilies'
import {
  fontPreferenceToCssStack,
  getCustomFontName,
  toCustomFontPreference,
  type FontPreference,
} from '@/lib/font-preference'
import { settingsUI } from './SettingsUIConstants'

interface FontFamilyPickerProps {
  value: FontPreference
  onValueChange: (value: FontPreference) => void
}

type FontOption = {
  value: FontPreference
  label: string
  description?: string
}

export function FontFamilyPicker({ value, onValueChange }: FontFamilyPickerProps) {
  const { t } = useTranslation()
  const { families, status, refresh } = useLocalFontFamilies()
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const customName = getCustomFontName(value)

  const fixedOptions = React.useMemo<FontOption[]>(() => [
    {
      value: 'system',
      label: t("settings.appearance.fontSystem"),
      description: t("settings.appearance.fontSystemDescription"),
    },
    {
      value: 'inter',
      label: t("settings.appearance.fontInter"),
      description: t("settings.appearance.fontInterDescription"),
    },
  ], [t])

  const localOptions = React.useMemo<FontOption[]>(() => {
    return families
      .filter((family) => family.toLowerCase() !== 'inter')
      .map((family) => ({
        value: `custom:${family}` as FontPreference,
        label: family,
        description: t("settings.appearance.fontLocalDescription"),
      }))
  }, [families, t])

  const options = React.useMemo(() => [...fixedOptions, ...localOptions], [fixedOptions, localOptions])
  const selectedOption = options.find((option) => option.value === value)
  const selectedLabel = selectedOption?.label ?? customName ?? t("settings.appearance.fontCustom")
  const manualPreference = toCustomFontPreference(query)
  const hasManualMatch = manualPreference ? options.some((option) => option.value === manualPreference) : false

  const filteredOptions = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return options
    return options.filter((option) => {
      return option.label.toLowerCase().includes(normalizedQuery) ||
        option.value.toLowerCase().includes(normalizedQuery) ||
        option.description?.toLowerCase().includes(normalizedQuery)
    })
  }, [options, query])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      if (status === 'idle') void refresh()
      setTimeout(() => searchInputRef.current?.focus(), 0)
      return
    }

    setQuery('')
  }

  const handleSelect = (font: FontPreference) => {
    onValueChange(font)
    setIsOpen(false)
    setQuery('')
  }

  const statusMessage = status === 'unsupported' || status === 'error'
    ? t("settings.appearance.fontLocalUnavailable")
    : null

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center h-8 min-w-44 max-w-72 px-3 gap-1 text-sm rounded-lg',
            'bg-background shadow-minimal',
            'hover:bg-foreground/[0.02] transition-colors',
            isOpen && 'bg-foreground/[0.02]'
          )}
        >
          <span className="truncate" style={{ fontFamily: fontPreferenceToCssStack(value) }}>
            {selectedLabel}
          </span>
          <ChevronDown className="opacity-50 shrink-0 size-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={4}
        collisionPadding={8}
        className="p-1.5"
        style={{ width: 320 }}
      >
        <div className="relative mb-1.5">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("settings.appearance.fontSearchPlaceholder")}
            className={cn(
              'w-full h-8 pl-8 pr-3 text-sm rounded-md',
              'bg-foreground/5 border-0',
              'placeholder:text-muted-foreground/50',
              'focus:outline-none focus:ring-1 focus:ring-foreground/20'
            )}
          />
        </div>

        {statusMessage && (
          <div className={cn(settingsUI.descriptionSmall, 'px-2.5 py-1.5')}>
            {statusMessage}
          </div>
        )}

        <div className="space-y-0.5 max-h-64 overflow-auto">
          {filteredOptions.map((option) => {
            const isSelected = value === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full flex items-center justify-between px-2.5 py-2 rounded-lg',
                  'hover:bg-foreground/5 transition-colors text-left',
                  isSelected && 'bg-foreground/3'
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className={settingsUI.label} style={{ fontFamily: fontPreferenceToCssStack(option.value) }}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={cn(settingsUI.descriptionSmall, settingsUI.labelDescriptionGap)}>
                      {option.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <Check className="size-4 text-foreground shrink-0 ml-3" />
                )}
              </button>
            )
          })}

          {manualPreference && !hasManualMatch && (
            <button
              type="button"
              onClick={() => handleSelect(manualPreference)}
              className={cn(
                'w-full flex items-center justify-between px-2.5 py-2 rounded-lg',
                'hover:bg-foreground/5 transition-colors text-left'
              )}
            >
              <div className="flex-1 min-w-0">
                <div className={settingsUI.label} style={{ fontFamily: fontPreferenceToCssStack(manualPreference) }}>
                  {t("settings.appearance.fontUseTyped", { font: getCustomFontName(manualPreference) })}
                </div>
                <div className={cn(settingsUI.descriptionSmall, settingsUI.labelDescriptionGap)}>
                  {t("settings.appearance.fontPreviewText")}
                </div>
              </div>
            </button>
          )}

          {filteredOptions.length === 0 && !manualPreference && (
            <div className="px-2.5 py-3 text-sm text-muted-foreground text-center">
              {t("settings.appearance.fontNoResults")}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
