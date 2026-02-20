import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

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
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
