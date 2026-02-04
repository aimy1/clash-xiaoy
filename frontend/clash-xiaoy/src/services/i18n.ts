import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
<<<<<<< HEAD

// Import all JSON files from the locales directory dynamically
const locales = import.meta.glob('../locales/*.json', { eager: true })

const resources: Record<string, { translation: any }> = {}

Object.entries(locales).forEach(([path, content]: [string, any]) => {
  const fileName = path.split('/').pop()?.replace('.json', '')
  if (fileName) {
    resources[fileName] = { translation: content.default || content }
  }
})

// Special mappings for zh and legacy support
if (resources['zh-cn']) {
  resources['zh'] = resources['zh-cn']
  resources['zh-CN'] = resources['zh-cn']
}
if (resources['zh-tw']) {
  resources['zh-TW'] = resources['zh-tw']
=======
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
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
<<<<<<< HEAD
  fallbackLng: 'en',
=======
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
  interpolation: {
    escapeValue: false,
  },
})
<<<<<<< HEAD

export default i18n
=======
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
