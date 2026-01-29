import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import ja from '../locales/ja.json'
import ko from '../locales/ko.json'
import ru from '../locales/ru.json'
import zhCN from '../locales/zh-CN.json'
import zhTW from '../locales/zh-TW.json'

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  ja: { translation: ja },
  ko: { translation: ko },
  zh: { translation: zhCN },
  'zh-cn': { translation: zhCN },
  'zh-tw': { translation: zhTW },
  'zh-CN': { translation: zhCN },
  'zh-TW': { translation: zhTW },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})
