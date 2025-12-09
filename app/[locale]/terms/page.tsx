import { getTranslations } from 'next-intl/server'

export default async function TermsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-primary-900 pl-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-900">Terms of Service</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-primary-900 prose prose-lg max-w-none">
        
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-900">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the Theta Engineering website, you accept and agree to 
                be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-900">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access the materials on Theta Engineering's 
                website for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-gray-700">
                This license shall automatically terminate if you violate any of these restrictions 
                and may be terminated by Theta Engineering at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-900">3. Disclaimer</h2>
              <p className="text-gray-700">
                The materials on Theta Engineering's website are provided on an 'as is' basis. 
                Theta Engineering makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including, without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or 
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-900">4. Limitations</h2>
              <p className="text-gray-700">
                In no event shall Theta Engineering or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on Theta Engineering's website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-900">5. Revisions</h2>
              <p className="text-gray-700">
                Theta Engineering may revise these terms of service at any time without notice. 
                By using this website you are agreeing to be bound by the then current version 
                of these terms of service.
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

