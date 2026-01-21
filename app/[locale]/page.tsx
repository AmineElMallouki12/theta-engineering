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
      <section className="relative text-white py-32 md:py-48 bg-center bg-no-repeat" style={{ backgroundImage: 'url(/hero-image.jpg.jpeg)', backgroundSize: '120%' }}>
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
                className="bg-white text-[#0000FF] px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center text-base"
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#0000FF]">{t('expertise')}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
              <p className="text-lg">
                {t('expertiseMainText')}
              </p>
              <p className="text-lg">
                {t('expertiseSupportText')}
              </p>
              <div className="mt-8">
                <p className="font-semibold text-[#0000FF] mb-4">{t('expertiseServicesTitle')}</p>
                <ul className="space-y-2 list-none text-lg">
                  <li>
                    <Link 
                      href={`/${locale}/services#constructief-advies`}
                      className="text-green-600 hover:text-green-700 hover:underline transition-colors"
                    >
                      {t('expertise1')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={`/${locale}/services#managementadvies`}
                      className="text-[#D2691E] hover:text-[#B8860B] hover:underline transition-colors"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0000FF]">{t('whyChooseUs')}</h2>
            <p className="text-xl text-gray-600">{t('whyChooseUsDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg border-2 border-[#0000FF] hover:border-[#0000FF] transition-colors bg-white">
              <div className="w-16 h-16 bg-[#0000FF] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/innovative-icon.png.png" 
                  alt="Innovatief" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0000FF]">{t('innovative')}</h3>
              <p className="text-gray-600">{t('innovativeDesc')}</p>
            </div>
            <div className="p-6 rounded-lg border-2 border-[#0000FF] hover:border-[#0000FF] transition-colors bg-white">
              <div className="w-14 h-14 bg-[#0000FF] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/toekomstgericht.png.png" 
                  alt="Toekomstgericht" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0000FF]">{t('futureFocused')}</h3>
              <p className="text-gray-600">{t('futureFocusedDesc')}</p>
            </div>
            <div className="p-6 rounded-lg border-2 border-[#0000FF] hover:border-[#0000FF] transition-colors bg-white">
              <div className="w-12 h-12 bg-[#0000FF] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/allround-icon.png.png" 
                  alt="Allround" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0000FF]">{t('allround')}</h3>
              <p className="text-gray-600">{t('allroundDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white animate-line-expand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0000FF]">{t('processTitle')}</h2>
            <p className="text-xl text-gray-600">{t('processDesc')}</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0000FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">1</div>
              <h3 className="text-lg font-semibold mb-2 text-[#0000FF]">{t('step1')}</h3>
              <p className="text-gray-600 text-sm">{t('step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0000FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">2</div>
              <h3 className="text-lg font-semibold mb-2 text-[#0000FF]">{t('step2')}</h3>
              <p className="text-gray-600 text-sm">{t('step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0000FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">3</div>
              <h3 className="text-lg font-semibold mb-2 text-[#0000FF]">{t('step3')}</h3>
              <p className="text-gray-600 text-sm">{t('step3Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0000FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">4</div>
              <h3 className="text-lg font-semibold mb-2 text-[#0000FF]">{t('step4')}</h3>
              <p className="text-gray-600 text-sm">{t('step4Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0000FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">5</div>
              <h3 className="text-lg font-semibold mb-2 text-[#0000FF]">{t('step5')}</h3>
              <p className="text-gray-600 text-sm">{t('step5Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-[#0000FF] to-[#0000FF] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-xl mb-8 text-white">{t('ctaDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-[#0000FF] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center text-lg"
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
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .96 4.534.96 10.08c0 1.792.46 3.47 1.26 4.938L0 24l9.218-2.38a11.88 11.88 0 005.832 1.52h.005c6.554 0 11.89-5.335 11.89-11.89a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {t('whatsappButton')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

