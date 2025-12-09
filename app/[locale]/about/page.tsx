import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('about')

  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-900">{t('title')}</h1>
            <div className="w-24 h-1 bg-primary-900 mx-auto mb-6"></div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-primary-900">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('intro')}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-primary-900 text-center italic">
              {t('tagline')}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-primary-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900">{t('missionTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('mission')}
            </p>
          </div>

          {/* Background */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-primary-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900">{t('backgroundTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('background')}
            </p>
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-primary-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900">{t('expertiseTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('expertiseIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-4">
              <li>{t('expertise1')}</li>
              <li>{t('expertise2')}</li>
              <li>{t('expertise3')}</li>
              <li>{t('expertise4')}</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('expertiseOutro')}
            </p>
          </div>

          {/* Work Process */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-primary-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900">{t('workProcessTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('workProcessIntro')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <div className="flex items-center">
                <span className="bg-primary-900 text-white px-4 py-2 rounded-lg font-semibold">{t('step1')}</span>
                <span className="mx-2 text-primary-900 text-xl">→</span>
              </div>
              <div className="flex items-center">
                <span className="bg-primary-900 text-white px-4 py-2 rounded-lg font-semibold">{t('step2')}</span>
                <span className="mx-2 text-primary-900 text-xl">→</span>
              </div>
              <div className="flex items-center">
                <span className="bg-primary-900 text-white px-4 py-2 rounded-lg font-semibold text-sm md:text-base">{t('step3')}</span>
                <span className="mx-2 text-primary-900 text-xl">→</span>
              </div>
              <div className="flex items-center">
                <span className="bg-primary-900 text-white px-4 py-2 rounded-lg font-semibold">{t('step4')}</span>
                <span className="mx-2 text-primary-900 text-xl">→</span>
              </div>
              <div className="flex items-center">
                <span className="bg-primary-900 text-white px-4 py-2 rounded-lg font-semibold text-sm md:text-base">{t('step5')}</span>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contactTitle')}</h2>
            <p className="text-lg text-primary-100 mb-6">
              {t('contactText')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('contactButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

