import { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('heritage_lang') || 'es'
  })

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    localStorage.setItem('heritage_lang', next)
  }

  // Helper: accede a la traducción con dot-notation  → t('home.heroTitle')
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }
    return value ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, translations: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
