'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchLanguage('en')}
        className={`p-0.5 rounded transition-all ${
          locale === 'en'
            ? 'opacity-100'
            : 'opacity-70 hover:opacity-100'
        }`}
        title="English"
      >
        <img 
          src="https://flagcdn.com/w40/gb.png" 
          srcSet="https://flagcdn.com/w80/gb.png 2x"
          alt="English" 
          className="w-6 h-4 object-cover rounded-sm shadow-sm"
        />
      </button>
      <button
        onClick={() => switchLanguage('nl')}
        className={`p-0.5 rounded transition-all ${
          locale === 'nl'
            ? 'opacity-100'
            : 'opacity-70 hover:opacity-100'
        }`}
        title="Nederlands"
      >
        <img 
          src="https://flagcdn.com/w40/nl.png" 
          srcSet="https://flagcdn.com/w80/nl.png 2x"
          alt="Nederlands" 
          className="w-6 h-4 object-cover rounded-sm shadow-sm"
        />
      </button>
    </div>
  )
}

