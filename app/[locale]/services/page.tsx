import { getTranslations } from 'next-intl/server'

export default async function ServicesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('services')

  const services = [
    {
      key: 'service2',
      icon: (
        <img 
          src="/Constructief-advies.png.png" 
          alt="Constructief advies" 
          className="w-[75%] h-[75%] object-contain"
        />
      )
    },
    {
      key: 'service3b',
      icon: (
        <img 
          src="/Managementadvies.png.png" 
          alt="Managementadvies" 
          className="w-[95%] h-[95%] object-contain"
        />
      )
    }
  ]

  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-[#051A53]">{t('title')}</h1>
            <div className="w-24 h-1 bg-[#051A53] mx-auto mb-3 md:mb-4"></div>
            <p className="text-[16px] text-[#051A53] px-2">{t('subtitle')}</p>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            {services.map((service, index) => {
                const serviceData = t.raw(`${service.key}`) as any
                if (!serviceData) return null
                
                // Create ID for anchor links
                const serviceId = serviceData.title?.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '') || service.key
                
                return (
                  <div 
                    key={service.key}
                    id={serviceId}
                    className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md border-2 border-[#051A53] hover:border-[#051A53] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#051A53] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg mx-auto sm:mx-0">
                        {service.icon}
                      </div>
                      <div className="flex-1 w-full">
                        <h3 className="text-[19px] md:text-[21px] font-semibold mb-3 md:mb-4 text-[#051A53]">{serviceData.title}</h3>
                        <p className={`text-[16px] mb-3 md:mb-4 text-justify ${service.key === 'service2' ? 'text-[#051A53]' : 'text-gray-700'}`}>{serviceData.intro}</p>
                        {serviceData.services && serviceData.services.length > 0 && service.key === 'service2' && (
                          <div className="mb-3 md:mb-4">
                            <p className={`font-semibold text-[#051A53] mb-0 text-[16px]`}>{serviceData.servicesIntro || t('serviceProvides')}</p>
                            <ul className={`text-[16px] square-bullets text-[#051A53] mt-1`}>
                              {serviceData.services.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {serviceData.description && (
                          <p className={`text-[16px] leading-relaxed text-justify mb-3 md:mb-4 ${service.key === 'service2' ? 'text-[#051A53]' : 'text-gray-700'}`}>{serviceData.description}</p>
                        )}
                        {serviceData.services && serviceData.services.length > 0 && service.key === 'service3b' && (
                          <div className="mb-3 md:mb-4">
                            <p className={`font-semibold text-[#051A53] mb-0 text-[16px]`}>{serviceData.servicesIntro || t('serviceProvides')}</p>
                            <ul className={`text-[16px] square-bullets text-gray-700 mt-1`}>
                              {serviceData.services.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {serviceData.description2 && (
                          <p className={`text-[16px] leading-relaxed text-justify ${service.key === 'service2' ? 'text-[#051A53]' : 'text-gray-700'}`}>{serviceData.description2}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

