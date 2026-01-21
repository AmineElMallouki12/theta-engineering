'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expertiseDropdownOpen, setExpertiseDropdownOpen] = useState(false)

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('expertise'), isDropdown: true },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/careers`, label: t('careers') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <nav className="bg-white shadow-md border-b-2 border-[#0000FF] sticky top-0 z-50 transition-smooth backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="flex items-center transition-smooth hover:scale-105">
            <img
              src="/logo.png.png"
              alt="Theta Engineering"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => {
              if ((item as any).isDropdown) {
                return (
                  <div 
                    key={item.href} 
                    className="relative group" 
                    onMouseEnter={() => setExpertiseDropdownOpen(true)} 
                    onMouseLeave={() => setExpertiseDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-[#0000FF] transition-smooth relative inline-flex items-center"
                    >
                      {item.label}
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0000FF] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {expertiseDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 pt-2 w-64 z-50"
                        onMouseEnter={() => setExpertiseDropdownOpen(true)}
                        onMouseLeave={() => setExpertiseDropdownOpen(false)}
                      >
                        <div className="bg-white rounded-lg shadow-lg border-2 border-[#0000FF] py-2">
                          <Link
                            href={`/${locale}/services#constructief-advies`}
                            className="block px-4 py-2 text-gray-700 hover:bg-[#0000FF] hover:text-white transition-colors"
                            onClick={() => setExpertiseDropdownOpen(false)}
                          >
                            {t('expertise1')}
                          </Link>
                          <Link
                            href={`/${locale}/services#managementadvies`}
                            className="block px-4 py-2 text-gray-700 hover:bg-[#0000FF] hover:text-white transition-colors"
                            onClick={() => setExpertiseDropdownOpen(false)}
                          >
                            {t('expertise2')}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-[#0000FF] transition-smooth relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0000FF] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            })}
            <LanguageSwitcher />
            <Link
              href="/admin/login"
              className="bg-[#0000FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0000FF] transition-smooth hover-lift"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-[#0000FF] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 bg-[#0000FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0000FF] transition-colors text-center"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

