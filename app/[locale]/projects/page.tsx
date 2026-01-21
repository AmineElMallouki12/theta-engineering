import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import clientPromise from '@/lib/mongodb'
import { Project } from '@/lib/models'

async function getProjects(): Promise<Project[]> {
  try {
    const client = await clientPromise
    const db = client.db()
    const projects = await db
      .collection<Project>('projects')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('projects')
  const projects = await getProjects()

  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0000FF]">{t('title')}</h1>
            <div className="w-24 h-1 bg-[#0000FF] mx-auto mb-4"></div>
            <p className="text-xl text-[#0000FF]">{t('subtitle')}</p>
          </div>
          
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md border-2 border-[#0000FF]">
              <p className="text-gray-500">{t('noProjects')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project._id?.toString()}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#0000FF] hover:border-[#0000FF] transition-colors"
                >
                  {project.images && project.images.length > 0 && (
                    <div className="w-full min-h-[200px] md:min-h-[250px] bg-gray-100 relative flex items-center justify-center overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title[locale as 'en' | 'nl']}
                        className="w-full h-auto max-h-[400px] object-contain"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#0000FF]">
                      {project.title[locale as 'en' | 'nl']}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-justify">
                      {project.description[locale as 'en' | 'nl']}
                    </p>
                    <Link
                      href={`/${locale}/projects/${project._id}`}
                      className="text-[#0000FF] hover:text-[#0000FF] font-medium inline-flex items-center group"
                    >
                      {t('viewDetails')} 
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

