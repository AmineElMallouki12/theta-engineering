'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-[#051A53] text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[14px] font-bold mb-2 text-white">Theta Engineering</h3>
            <p className="text-[12px] text-gray-300 leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="text-[14px] font-semibold mb-2 text-white">{t('company')}</h4>
            <ul className="space-y-0 text-gray-300 leading-tight">
              <li className="leading-[1.2]">
                <Link href={`/${locale}/about`} className="text-[12px] hover:text-white transition-colors inline-block transition-smooth">
                  {t('aboutUs')}
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href={`/${locale}/services`} className="text-[12px] hover:text-white transition-colors inline-block transition-smooth">
                  {t('services')}
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href={`/${locale}/projects`} className="text-[12px] hover:text-white transition-colors inline-block transition-smooth">
                  {t('projects')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-semibold mb-2 text-white">{t('legal')}</h4>
            <ul className="space-y-0 text-gray-300 leading-tight">
              <li className="leading-[1.2]">
                <Link href={`/${locale}/privacy`} className="text-[12px] hover:text-white transition-colors inline-block transition-smooth">
                  {t('privacy')}
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href={`/${locale}/terms`} className="text-[12px] hover:text-white transition-colors inline-block transition-smooth">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[14px] font-semibold mb-2 text-white">{t('contact')}</h4>
            <ul className="space-y-0 text-gray-300 leading-tight">
              <li className="leading-[1.2]">
                <Link href={`/${locale}/contact`} className="text-[12px] hover:text-white transition-colors inline-block transition-smooth">
                  {t('getInTouch')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-4 md:mt-5 pt-4 md:pt-5 text-center text-gray-300">
          <p className="text-[12px]">&copy; {new Date().getFullYear()} Theta Engineering. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}

