import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('home')

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white py-32 md:py-48">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-primary-100">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-primary-900 px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center text-base"
              >
                {t('cta')}
                <span className="ml-2">→</span>
              </Link>
              <Link
                href={`/${locale}/about`}
                className="bg-primary-800 text-white px-10 py-4 rounded-lg font-semibold hover:bg-primary-900 transition-colors inline-flex items-center justify-center text-base border-2 border-white"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white animate-line-expand">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-900">{t('statsTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-900">10+</div>
              <div className="text-lg text-gray-600">{t('yearsExperience')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-900">500+</div>
              <div className="text-lg text-gray-600">{t('projectsCompleted')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-900">200+</div>
              <div className="text-lg text-gray-600">{t('satisfiedClients')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-900">25+</div>
              <div className="text-lg text-gray-600">{t('teamMembers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50 animate-line-expand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary-900">{t('expertise')}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                {t('expertiseMainText')}
              </p>
              <p className="text-lg">
                {t('expertiseSupportText')}
              </p>
              <div className="mt-8">
                <p className="font-semibold text-primary-900 mb-4">{t('expertiseServicesTitle')}</p>
                <ul className="space-y-2 list-disc list-inside text-lg">
                  <li>{t('services.service1.title')}</li>
                  <li>{t('services.service2.title')}</li>
                  <li>{t('services.service3.title')}</li>
                  <li>{t('services.service4.title')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white animate-line-expand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900">{t('whyChooseUs')}</h2>
            <p className="text-xl text-gray-600">{t('whyChooseUsDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg border-2 border-primary-200 hover:border-primary-900 transition-colors">
              <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">{t('reliability')}</h3>
              <p className="text-gray-600">{t('reliabilityDesc')}</p>
            </div>
            <div className="p-6 rounded-lg border-2 border-primary-200 hover:border-primary-900 transition-colors">
              <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">{t('efficiency')}</h3>
              <p className="text-gray-600">{t('efficiencyDesc')}</p>
            </div>
            <div className="p-6 rounded-lg border-2 border-primary-200 hover:border-primary-900 transition-colors">
              <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">{t('support')}</h3>
              <p className="text-gray-600">{t('supportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white animate-line-expand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900">{t('processTitle')}</h2>
            <p className="text-xl text-gray-600">{t('processDesc')}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">1</div>
              <h3 className="text-lg font-semibold mb-2 text-primary-900">{t('step1')}</h3>
              <p className="text-gray-600 text-sm">{t('step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">2</div>
              <h3 className="text-lg font-semibold mb-2 text-primary-900">{t('step2')}</h3>
              <p className="text-gray-600 text-sm">{t('step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">3</div>
              <h3 className="text-lg font-semibold mb-2 text-primary-900">{t('step3')}</h3>
              <p className="text-gray-600 text-sm">{t('step3Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">4</div>
              <h3 className="text-lg font-semibold mb-2 text-primary-900">{t('step4')}</h3>
              <p className="text-gray-600 text-sm">{t('step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-xl mb-8 text-primary-100">{t('ctaDesc')}</p>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center text-lg"
            >
              {t('ctaButton')}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

