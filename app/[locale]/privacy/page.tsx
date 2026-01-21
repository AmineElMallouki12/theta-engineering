import { getTranslations } from 'next-intl/server'

export default async function PrivacyPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-[#0000FF] pl-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0000FF]">Privacy Policy</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#0000FF] prose prose-lg max-w-none">
        
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">1. Introduction</h2>
              <p className="text-gray-700">
                Theta Engineering ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your personal 
                information when you visit our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Company information</li>
                <li>Messages and inquiries submitted through our contact forms</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Process quote requests</li>
                <li>Send you information about our services (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">4. GDPR Compliance</h2>
              <p className="text-gray-700">
                As a company operating in the Netherlands and EU, we comply with the General 
                Data Protection Regulation (GDPR). You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">5. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#0000FF]">6. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact us through our contact form.
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

