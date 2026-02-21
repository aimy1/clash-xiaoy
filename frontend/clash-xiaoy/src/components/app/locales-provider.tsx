import { locale } from 'dayjs'
import { changeLanguage } from 'i18next'
import { useEffect } from 'react'
import { useSetting } from '@nyanpasu/interface'

export const LocalesProvider = () => {
  const { value } = useSetting('language')

  useEffect(() => {
    if (value) {
      const dayjsLocale =
        value === 'zh'
          ? 'zh-cn'
          : value === 'zh-CN'
            ? 'zh-cn'
            : value === 'zh-TW'
              ? 'zh-tw'
              : value
      locale(dayjsLocale)

      changeLanguage(value)
    }
  }, [value])

  return null
}

export default LocalesProvider
