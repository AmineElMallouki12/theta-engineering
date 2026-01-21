import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('contact')

  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0000FF]">{t('title')}</h1>
            <div className="w-24 h-1 bg-[#0000FF] mx-auto mb-4"></div>
            <p className="text-xl text-[#0000FF]">{t('subtitle')}</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#0000FF]">
            <h2 className="text-2xl font-semibold mb-6 text-[#0000FF] text-center">{t('formTitle')}</h2>
            <ContactForm type="contact" locale={locale} />
          </div>

          <div className="mt-12 text-center bg-white p-6 rounded-lg shadow-md border-l-4 border-[#0000FF]">
            <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">{t('requestQuote')}</h2>
            <p className="text-gray-600 mb-6">
              {t('needQuote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

