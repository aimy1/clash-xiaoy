import { defineCustomClientStrategy, locales } from '@/paraglide/runtime'

export const languageOptions = {
  en: 'English',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
<<<<<<< HEAD
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
  id: 'Bahasa Indonesia',
  el: 'Ελληνικά',
  sr: 'Srpski',
  sk: 'Slovenčina',
  sl: 'Slovenščina',
  lv: 'Latviešu',
  lt: 'Lietuvių',
  fa: 'فارسی',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  ml: 'മലയാളം',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  pa: 'ਪੰਜਾਬੀ',
  ne: 'नेपाली',
  si: 'සිංහල',
  lo: 'ລາວ',
  km: 'ខ្មែរ',
  my: 'မြန်မာ',
  ka: 'ქართული',
  hy: 'Հայերեն',
  az: 'Azərbaycan',
  kk: 'Қазақша',
  mn: 'Монгол',
  mk: 'Македонски',
  sq: 'Shqip',
  eu: 'Euskara',
  ca: 'Català',
  gl: 'Galego',
  is: 'Íslenska',
  ga: 'Gaeilge',
  cy: 'Cymraeg',
  af: 'Afrikaans',
  sw: 'Kiswahili'
=======
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
}

export const languageQuirks: {
  [key: string]: {
    drawer: {
      minWidth: number
      itemClassNames?: string
    }
  }
} = {
  en: {
    drawer: {
      minWidth: 240,
    },
  },
  ru: {
    drawer: {
      minWidth: 240,
    },
  },
  ja: {
    drawer: {
      minWidth: 240,
    },
  },
  ko: {
    drawer: {
      minWidth: 240,
    },
  },
<<<<<<< HEAD
  'zh-cn': {
=======
  'zh-CN': {
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
    drawer: {
      minWidth: 180,
    },
  },
<<<<<<< HEAD
  'zh-tw': {
=======
  'zh-TW': {
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
    drawer: {
      minWidth: 180,
    },
  },
}

<<<<<<< HEAD
// Default quirks for new languages
Object.keys(languageOptions).forEach(key => {
  if (!languageQuirks[key]) {
    languageQuirks[key] = {
      drawer: {
        minWidth: 240,
      },
    }
  }
})

=======
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
export type Language = (typeof locales)[number]

export const LANGUAGE_STORAGE_KEY = 'paraglide-language-cache'

export const DEFAULT_LANGUAGE = 'en'

// encode the language storage key to avoid special characters
const CACHED_LANGUAGE_STORAGE_KEY = btoa(LANGUAGE_STORAGE_KEY)

export const setCachedLanguage = (locale: Language) => {
  localStorage.setItem(CACHED_LANGUAGE_STORAGE_KEY, locale)
}

export const getCachedLanguage = () => {
  const value = localStorage.getItem(CACHED_LANGUAGE_STORAGE_KEY)

  return value && locales.includes(value as Language)
    ? (value as Language)
    : DEFAULT_LANGUAGE
}

defineCustomClientStrategy('custom-extension', {
  getLocale: () => {
    return getCachedLanguage()
  },
  setLocale: (locale) => {
    setCachedLanguage(locale as Language)
  },
})
