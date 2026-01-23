'use client'

import { useState, useEffect } from 'react'

export default function AdminLanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'nl' | 'en'>('nl')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run on client side
    setMounted(true)
    // Get language from cookie or default to Dutch
    const lang = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin_lang='))
      ?.split('=')[1] || 'nl'
    setCurrentLang(lang as 'nl' | 'en')
  }, [])

  const switchLanguage = (newLang: 'nl' | 'en') => {
    if (typeof window === 'undefined') return
    
    // Set cookie for language preference
    document.cookie = `admin_lang=${newLang}; path=/; max-age=31536000` // 1 year
    setCurrentLang(newLang)
    // Trigger custom event for components to update
    window.dispatchEvent(new CustomEvent('adminLanguageChange', { detail: newLang }))
    // Small delay then reload to ensure cookie is set
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  // Don't render until mounted (prevents SSR issues)
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700">NL</div>
        <div className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700">EN</div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('nl')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLang === 'nl'
            ? 'bg-[#051A53] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        NL
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLang === 'en'
            ? 'bg-[#051A53] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  )
}

