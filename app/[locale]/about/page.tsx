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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0000FF]">{t('title')}</h1>
            <div className="w-24 h-1 bg-[#0000FF] mx-auto mb-6"></div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#0000FF]">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
              {t('intro')}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#0000FF] text-center italic">
              {t('tagline')}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#0000FF]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0000FF]">{t('missionTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {t('mission')}
            </p>
          </div>

          {/* Background */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#0000FF]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0000FF]">{t('backgroundTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {t('background')}
            </p>
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#0000FF]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0000FF]">{t('expertiseTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
              {t('expertiseIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-4">
              <li>{t('expertise1')}</li>
              <li>{t('expertise2')}</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {t('expertiseOutro')}
            </p>
          </div>

          {/* Work Process */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#0000FF]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0000FF]">{t('workProcessTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
              {t('workProcessIntro')}
            </p>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <span className="bg-[#0000FF] text-white px-3 py-2 sm:px-4 rounded-lg font-semibold flex-shrink-0 text-sm sm:text-base w-fit">{t('step1')}</span>
                <p className="text-gray-700 text-justify flex-1">We bespreken uw wensen, uitgangspunten en de scope van het project.</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <span className="bg-[#0000FF] text-white px-3 py-2 sm:px-4 rounded-lg font-semibold flex-shrink-0 text-sm sm:text-base w-fit">{t('step2')}</span>
                <p className="text-gray-700 text-justify flex-1">We analyseren de technische randvoorwaarden, risico's en mogelijkheden.</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <span className="bg-[#0000FF] text-white px-3 py-2 sm:px-4 rounded-lg font-semibold flex-shrink-0 text-sm sm:text-base w-fit">{t('step3')}</span>
                <p className="text-gray-700 text-justify flex-1">We werken het constructief ontwerp uit en geven onderbouwd advies.</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <span className="bg-[#0000FF] text-white px-3 py-2 sm:px-4 rounded-lg font-semibold flex-shrink-0 text-sm sm:text-base w-fit">{t('step4')}</span>
                <p className="text-gray-700 text-justify flex-1">We stemmen het ontwerp en de adviezen zorgvuldig met u af.</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <span className="bg-[#0000FF] text-white px-3 py-2 sm:px-4 rounded-lg font-semibold flex-shrink-0 text-sm sm:text-base w-fit">{t('step5')}</span>
                <p className="text-gray-700 text-justify flex-1">We leveren duidelijke documentatie en begeleiden waar nodig de uitvoering.</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-[#0000FF] to-[#0000FF] text-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contactTitle')}</h2>
            <p className="text-lg text-white mb-6">
              {t('contactText')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-[#0000FF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('contactButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

