import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import PageTransition from '@/components/PageTransition'
import type { Metadata } from 'next'

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  const isDutch = locale === 'nl'
  return {
    title: isDutch 
      ? 'Theta Engineering - Professionele Engineering Oplossingen'
      : 'Theta Engineering - Professional Engineering Solutions',
    description: isDutch
      ? 'Theta Engineering biedt professionele engineering diensten aan Nederlandse en internationale klanten.'
      : 'Theta Engineering provides professional engineering services for Dutch and international clients.',
    keywords: isDutch
      ? 'engineering, engineering diensten, Nederland, technische oplossingen'
      : 'engineering, engineering services, Netherlands, technical solutions',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'nl': '/nl',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </NextIntlClientProvider>
  )
}

