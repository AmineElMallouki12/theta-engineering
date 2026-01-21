import { getTranslations } from 'next-intl/server'

export default async function CareersPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('careers')

  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-[#0000FF] pl-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0000FF]">{t('title')}</h1>
            <p className="text-xl text-[#0000FF]">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#0000FF]">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                {t('description1')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('description2')}
              </p>
              <p className="text-gray-700 mb-8">
                {t('description3')}
              </p>
              
              <div className="bg-[#0000FF] border-2 border-[#0000FF] p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-white">{t('openPositions')}</h2>
                <p className="text-white mb-4">
                  {t('currentlyLooking')}
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                  <li>{t('position1')}</li>
                  <li>{t('position2')}</li>
                  <li>{t('position3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

