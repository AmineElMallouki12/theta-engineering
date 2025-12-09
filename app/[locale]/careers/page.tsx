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
          <div className="border-l-4 border-primary-900 pl-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-900">{t('title')}</h1>
            <p className="text-xl text-primary-700">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-primary-900">
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
              
              <div className="bg-primary-50 border-2 border-primary-200 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-primary-900">{t('openPositions')}</h2>
                <p className="text-gray-600 mb-4">
                  {t('currentlyLooking')}
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
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

