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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#051A53]">{t('title')}</h1>
            <div className="w-24 h-1 bg-[#051A53] mx-auto mb-6"></div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#051A53]">
            <p className="text-[16px] text-gray-700 leading-relaxed mb-6 text-justify">
              {t('intro')}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#051A53] text-center italic">
              {t('tagline')}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#051A53]">
            <h2 className="text-[19px] md:text-[21px] font-bold mb-4 text-[#051A53]">{t('missionTitle')}</h2>
            <p className="text-[16px] text-gray-700 leading-relaxed text-justify">
              {t('mission')}
            </p>
          </div>

          {/* Background */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#051A53]">
            <h2 className="text-[19px] md:text-[21px] font-bold mb-4 text-[#051A53]">{t('backgroundTitle')}</h2>
            <p className="text-[16px] text-gray-700 leading-relaxed text-justify">
              {t('background')}
            </p>
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#051A53]">
            <h2 className="text-[19px] md:text-[21px] font-bold mb-4 text-[#051A53]">{t('expertiseTitle')}</h2>
            <p className="text-[16px] text-gray-700 leading-relaxed mb-4 text-justify">
              {t('expertiseIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-[16px] text-gray-700 mb-4">
              <li>{t('expertise1')}</li>
              <li>{t('expertise2')}</li>
            </ul>
            <p className="text-[16px] text-gray-700 leading-relaxed text-justify">
              {t('expertiseOutro')}
            </p>
          </div>

          {/* Work Process */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 border-t-4 border-[#051A53]">
            <h2 className="text-[19px] md:text-[21px] font-bold mb-2 text-[#051A53]">{t('workProcessTitle')}</h2>
            <p className="text-[16px] text-gray-700 leading-relaxed mb-4 text-justify">
              {t('workProcessIntro')}
            </p>
            <ul className="square-bullets text-[16px] text-gray-700 space-y-4">
              <li>
                <span className="font-bold">{t('step1')}</span>
                <p className="font-normal mt-0 mb-0">{t('step1Desc')}</p>
              </li>
              <li>
                <span className="font-bold">{t('step2')}</span>
                <p className="font-normal mt-0 mb-0">{t('step2Desc')}</p>
              </li>
              <li>
                <span className="font-bold">{t('step3')}</span>
                <p className="font-normal mt-0 mb-0">{t('step3Desc')}</p>
              </li>
              <li>
                <span className="font-bold">{t('step4')}</span>
                <p className="font-normal mt-0 mb-0">{t('step4Desc')}</p>
              </li>
              <li>
                <span className="font-bold">{t('step5')}</span>
                <p className="font-normal mt-0 mb-0">{t('step5Desc')}</p>
              </li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-[#051A53] to-[#051A53] text-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <h2 className="text-[19px] md:text-[21px] font-bold mb-4">{t('contactTitle')}</h2>
            <p className="text-[16px] text-white mb-6">
              {t('contactText')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-[#051A53] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('contactButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

