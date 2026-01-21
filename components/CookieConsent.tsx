'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function CookieConsent() {
  const t = useTranslations('cookieConsent')
  const locale = useLocale()
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#0000FF] shadow-2xl">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto">
          {!showDetails ? (
            // Main banner
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-[#0000FF] mb-2">
                  {t('title')}
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-2">
                  {t('description')}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {t('moreInfo')}{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-[#0000FF] hover:text-[#0000FF] underline"
                  >
                    {t('privacyPolicy')}
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                <button
                  onClick={acceptCookies}
                  className="px-4 md:px-6 py-2 bg-[#0000FF] text-white rounded-lg font-semibold hover:bg-[#0000FF] transition-colors text-sm md:text-base whitespace-nowrap"
                >
                  {t('acceptAll')}
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 md:px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm md:text-base whitespace-nowrap"
                >
                  {t('necessaryOnly')}
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 md:px-6 py-2 border-2 border-[#0000FF] text-[#0000FF] rounded-lg font-semibold hover:bg-[#0000FF] hover:text-white transition-colors text-sm md:text-base whitespace-nowrap"
                >
                  {t('customize')}
                </button>
              </div>
            </div>
          ) : (
            // Detailed preferences
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-bold text-[#0000FF]">
                  {t('preferences')}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 mb-4">
                {/* Necessary Cookies - Always enabled */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t('necessaryTitle')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('necessaryDesc')}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm font-medium text-gray-500">
                      {t('alwaysActive')}
                    </span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t('analyticsTitle')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('analyticsDesc')}
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="sr-only peer"
                        id="analytics"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0000FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
                    </label>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t('marketingTitle')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('marketingDesc')}
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="sr-only peer"
                        id="marketing"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0000FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-end">
                <button
                  onClick={rejectCookies}
                  className="px-4 md:px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  {t('rejectAll')}
                </button>
                <button
                  onClick={() => {
                    const analytics = (document.getElementById('analytics') as HTMLInputElement)?.checked
                    const marketing = (document.getElementById('marketing') as HTMLInputElement)?.checked
                    
                    if (analytics && marketing) {
                      acceptCookies()
                    } else if (analytics || marketing) {
                      localStorage.setItem('cookieConsent', JSON.stringify({ analytics, marketing }))
                      localStorage.setItem('cookieConsentDate', new Date().toISOString())
                      setShowBanner(false)
                    } else {
                      acceptNecessary()
                    }
                  }}
                  className="px-4 md:px-6 py-2 bg-[#0000FF] text-white rounded-lg font-semibold hover:bg-[#0000FF] transition-colors text-sm md:text-base"
                >
                  {t('savePreferences')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

