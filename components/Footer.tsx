'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-[#0000FF] text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Theta Engineering</h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-2 text-white">{t('company')}</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <Link href={`/${locale}/about`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('projects')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-2 text-white">{t('legal')}</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm md:text-base font-semibold mb-2 text-white">{t('contact')}</h4>
            <ul className="space-y-1 text-gray-300">
              <li>
                <Link href={`/${locale}/contact`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('getInTouch')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-4 md:mt-5 pt-4 md:pt-5 text-center text-gray-300">
          <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} Theta Engineering. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}

