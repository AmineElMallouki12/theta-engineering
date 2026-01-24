'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  return (
    <footer className="bg-[#051A53] text-white py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <h4 className="text-[14px] font-bold mb-3 text-white text-center">{t('servicesTitle')}</h4>
            <ul className="space-y-0 text-gray-300 leading-tight">
              <li className="-mb-0.5">
                <Link href={`/${locale}/services#constructief-advies`} className="text-[12px] hover:text-white transition-colors inline-block">
                  {tNav('expertise1')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services#managementadvies`} className="text-[12px] hover:text-white transition-colors inline-block">
                  {tNav('expertise2')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-[14px] font-bold mb-3 text-white text-center">{t('navigationTitle')}</h4>
            <div className="flex flex-col md:flex-row justify-center gap-x-3 md:gap-x-6">
              <ul className="space-y-0 text-gray-300 leading-tight">
                <li className="-mb-0.5">
                  <Link href={`/${locale}`} className="text-[12px] hover:text-white transition-colors inline-block">
                    {tNav('home')}
                  </Link>
                </li>
                <li className="-mb-0.5">
                  <Link href={`/${locale}/about`} className="text-[12px] hover:text-white transition-colors inline-block">
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/services`} className="text-[12px] hover:text-white transition-colors inline-block">
                    {tNav('expertise')}
                  </Link>
                </li>
              </ul>
              <ul className="space-y-0 text-gray-300 leading-tight">
                <li className="-mb-0.5">
                  <Link href={`/${locale}/projects`} className="text-[12px] hover:text-white transition-colors inline-block">
                    {tNav('projects')}
                  </Link>
                </li>
                <li className="-mb-0.5">
                  <Link href={`/${locale}/careers`} className="text-[12px] hover:text-white transition-colors inline-block">
                    {tNav('careers')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="text-[12px] hover:text-white transition-colors inline-block">
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-[14px] font-bold mb-3 text-white text-center">{t('practicalTitle')}</h4>
            <ul className="space-y-0 text-gray-300 text-center leading-tight">
              <li className="-mb-0.5">
                <Link href={`/${locale}/privacy`} className="text-[12px] hover:text-white transition-colors inline-block">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-[12px] hover:text-white transition-colors inline-block">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-4 md:mt-6 lg:mt-8 pt-4 md:pt-6 lg:pt-8 text-center text-gray-300">
          <p className="text-[12px]">&copy; {new Date().getFullYear()} Theta Engineering. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}

