import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import clientPromise from '@/lib/mongodb'
import { Project } from '@/lib/models'
import { ObjectId } from 'mongodb'
import Image from 'next/image'

async function getProject(id: string): Promise<Project | null> {
  try {
    const client = await clientPromise
    const db = client.db()
    const project = await db
      .collection<Project>('projects')
      .findOne({ _id: new ObjectId(id) })
    return project ? JSON.parse(JSON.stringify(project)) : null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectDetailPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string }
}) {
  const t = await getTranslations('projects')
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const title = project.title[locale as 'en' | 'nl']
  const description = project.description[locale as 'en' | 'nl']
  const content = project.content[locale as 'en' | 'nl']

  return (
    <div className="bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-[#051A53] pl-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#051A53]">{title}</h1>
            <p className="text-[16px] text-[#051A53] text-justify">{description}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="w-full min-h-[250px] md:min-h-[300px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={image}
                      alt={`${title} - Image ${index + 1}`}
                      className="w-full h-auto max-h-[500px] object-contain rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {content && (
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#051A53] mb-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-[16px] text-gray-700 text-justify">{content}</div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#051A53]">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {project.category && (
                <div>
                  <span className="font-semibold text-[#051A53]">Category:</span>
                  <p className="text-[16px] text-gray-600">{project.category}</p>
                </div>
              )}
              {project.client && (
                <div>
                  <span className="font-semibold text-[#051A53]">Client:</span>
                  <p className="text-[16px] text-gray-600">{project.client}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <span className="font-semibold text-[#051A53]">Year:</span>
                  <p className="text-[16px] text-gray-600">{project.year}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

