'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-primary-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Theta Engineering</h3>
            <p className="text-sm md:text-base text-primary-200 leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-white">{t('company')}</h4>
            <ul className="space-y-2 text-primary-200">
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
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-white">{t('legal')}</h4>
            <ul className="space-y-2 text-primary-200">
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
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-white">{t('contact')}</h4>
            <ul className="space-y-2 text-primary-200">
              <li>
                <Link href={`/${locale}/contact`} className="text-sm md:text-base hover:text-white transition-colors inline-block transition-smooth">
                  {t('getInTouch')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-primary-200">
          <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} Theta Engineering. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}

