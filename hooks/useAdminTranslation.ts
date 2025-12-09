'use client'

import { useState, useEffect } from 'react'
import { getAdminLocale, getAdminTranslations, type AdminLocale } from '@/lib/admin-translations'

export function useAdminTranslation() {
  const [locale, setLocale] = useState<AdminLocale>('nl')
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    const currentLocale = getAdminLocale()
    setLocale(currentLocale)
    setTranslations(getAdminTranslations(currentLocale))
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const newLocale = getAdminLocale()
      setLocale(newLocale)
      setTranslations(getAdminTranslations(newLocale))
    }
    
    window.addEventListener('adminLanguageChange', handleLanguageChange as EventListener)
    
    return () => {
      window.removeEventListener('adminLanguageChange', handleLanguageChange as EventListener)
    }
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }
    
    return typeof value === 'string' ? value : key
  }

  return { t, locale }
}

