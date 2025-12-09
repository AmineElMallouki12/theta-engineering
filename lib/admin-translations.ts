// Admin panel translations
// Since admin routes are not under [locale], we use a cookie-based approach

import nlMessages from '@/messages/nl.json'
import enMessages from '@/messages/en.json'

export type AdminLocale = 'nl' | 'en'

export function getAdminLocale(): AdminLocale {
  if (typeof window === 'undefined') return 'nl' // Default to Dutch on server
  
  const lang = document.cookie
    .split('; ')
    .find(row => row.startsWith('admin_lang='))
    ?.split('=')[1] || 'nl'
  
  return (lang === 'en' ? 'en' : 'nl') as AdminLocale
}

export function getAdminTranslations(locale: AdminLocale = 'nl') {
  const messages = locale === 'en' ? enMessages : nlMessages
  return messages.admin || {}
}

export function t(key: string, locale?: AdminLocale): string {
  const lang = locale || getAdminLocale()
  const translations = getAdminTranslations(lang)
  const keys = key.split('.')
  let value: any = translations
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) return key
  }
  
  return typeof value === 'string' ? value : key
}

