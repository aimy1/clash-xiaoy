import { locale } from 'dayjs'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { useLockFn } from '@/hooks/use-lock-fn'
import { getLocale, Locale, locales, setLocale } from '@/paraglide/runtime'
import { useSetting } from '@nyanpasu/interface'
import { changeLanguage } from 'i18next'

const LanguageContext = createContext<{
  language?: Locale
  setLanguage: (value: Locale) => Promise<void>
} | null>(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const language = useSetting('language')

  const canonicalizeLocale = (value: string) => {
    return value === 'zh' ? 'zh-cn' : value === 'zh-CN' ? 'zh-cn' : value === 'zh-TW' ? 'zh-tw' : value
  }

  const forcedLocale = useMemo(() => {
    if (!import.meta.env.DEV) {
      return null
    }
    const url = new URL(window.location.href)
    const forced = url.searchParams.get('lang')
    const canonicalForced = forced ? canonicalizeLocale(forced) : null
    return canonicalForced && locales.includes(canonicalForced as Locale)
      ? (canonicalForced as Locale)
      : null
  }, [])

  const [activeLocale, setActiveLocale] = useState<Locale>(() => {
    if (forcedLocale) {
      return 'en'
    }
    const value = language.value
    if (!value) {
      return 'en'
    }
    const canonical = canonicalizeLocale(value)
    return locales.includes(canonical as Locale) ? (canonical as Locale) : 'en'
  })

  const setLanguage = useLockFn(async (value: Locale) => {
    await language.upsert(value)
    changeLanguage(value)
    setLocale(value, { reload: false })
    setActiveLocale(value)
  })

  // sync dayjs locale
  useEffect(() => {
    locale(activeLocale)
  }, [activeLocale])

  useEffect(() => {
    if (forcedLocale) {
      changeLanguage(forcedLocale)
      setLocale(forcedLocale, { reload: false })
      setActiveLocale(forcedLocale)
      return
    }

    const value = language.value
    if (!value) {
      return
    }

    const canonical = canonicalizeLocale(value)
    changeLanguage(value)

    if (!locales.includes(canonical as Locale)) {
      return
    }

    setLocale(canonical as Locale, { reload: false })
    setActiveLocale(canonical as Locale)
  }, [forcedLocale, language.value])

  return (
    <LanguageContext.Provider
      value={{
        language: activeLocale,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
