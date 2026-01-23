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
      <section className="relative text-white py-32 md:py-52 bg-center bg-no-repeat hero-bg-no-borders" style={{ backgroundImage: 'url(/hero-image.jpg.jpg)' }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Theta Engineering
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white italic">
              where vision meets precision!
            </p>
            <div className="flex justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-[#051A53] px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center text-base"
              >
                {t('cta')}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Expertise Section */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50 animate-line-expand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#051A53]">{t('expertise')}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
              <p className="text-[16px]">
                {t('expertiseMainText')}
              </p>
              <p className="text-[16px]">
                {t('expertiseSupportText')}
              </p>
              <div className="mt-8">
                <p className="font-semibold text-[#051A53] mb-0">{t('expertiseServicesTitle')}</p>
                <ul className="space-y-0 list-none text-[16px]">
                  <li>
                    <Link 
                      href={`/${locale}/services#constructief-advies`}
                      className="text-gray-700 hover:text-[#051A53] hover:underline transition-colors"
                    >
                      {t('expertise1')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={`/${locale}/services#managementadvies`}
                      className="text-gray-700 hover:text-[#051A53] hover:underline transition-colors"
                    >
                      {t('expertise2')}
                    </Link>
                  </li>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#051A53]">{t('whyChooseUs')}</h2>
            <p className="text-[16px] text-gray-600">{t('whyChooseUsDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg border-2 border-[#051A53] hover:border-[#051A53] transition-colors bg-white">
              <div className="w-16 h-16 bg-[#051A53] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/innovative-icon.png.png" 
                  alt="Innovatief" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#051A53]">{t('innovative')}</h3>
              <p className="text-[16px] text-gray-600">{t('innovativeDesc')}</p>
            </div>
            <div className="p-6 rounded-lg border-2 border-[#051A53] hover:border-[#051A53] transition-colors bg-white">
              <div className="w-14 h-14 bg-[#051A53] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/toekomstgericht.png.png" 
                  alt="Toekomstgericht" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#051A53]">{t('futureFocused')}</h3>
              <p className="text-[16px] text-gray-600">{t('futureFocusedDesc')}</p>
            </div>
            <div className="p-6 rounded-lg border-2 border-[#051A53] hover:border-[#051A53] transition-colors bg-white">
              <div className="w-12 h-12 bg-[#051A53] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/allround-icon.png.png" 
                  alt="Allround" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#051A53]">{t('allround')}</h3>
              <p className="text-[16px] text-gray-600">{t('allroundDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white animate-line-expand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#051A53]">{t('processTitle')}</h2>
            <p className="text-[16px] text-gray-600">{t('processDesc')}</p>
          </div>
          <div className="grid md:grid-cols-5 gap-14 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#051A53] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg leading-none">1</div>
              <h3 className="text-lg font-semibold mb-4 text-[#051A53] whitespace-nowrap">{t('step1')}</h3>
              <p className="text-[16px] text-gray-600">{t('step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#051A53] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg leading-none">2</div>
              <h3 className="text-lg font-semibold mb-4 text-[#051A53] whitespace-nowrap">{t('step2')}</h3>
              <p className="text-[16px] text-gray-600">{t('step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#051A53] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg leading-none">3</div>
              <h3 className="text-lg font-semibold mb-4 text-[#051A53] whitespace-nowrap">{t('step3')}</h3>
              <p className="text-[16px] text-gray-600">{t('step3Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#051A53] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg leading-none">4</div>
              <h3 className="text-lg font-semibold mb-4 text-[#051A53] whitespace-nowrap">{t('step4')}</h3>
              <p className="text-[16px] text-gray-600">{t('step4Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#051A53] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg leading-none">5</div>
              <h3 className="text-lg font-semibold mb-4 text-[#051A53] whitespace-nowrap">{t('step5')}</h3>
              <p className="text-[16px] text-gray-600">{t('step5Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-[#051A53] to-[#051A53] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-[16px] mb-8 text-white">{t('ctaDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-[#051A53] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center text-lg"
              >
                {t('cta')}
                <span className="ml-2">→</span>
              </Link>
              <a
                href={t('whatsappLink')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors inline-flex items-center justify-center text-lg gap-2"
              >
                <img 
                  src="/whatsapp-icon.png.png" 
                  alt="WhatsApp" 
                  className="w-7 h-7 object-contain"
                />
                {t('whatsappButton')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

