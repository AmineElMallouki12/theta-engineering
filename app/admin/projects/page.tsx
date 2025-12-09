'use client'

import { useEffect, useState } from 'react'
import { Project } from '@/lib/models'
import ProjectForm from '@/components/ProjectForm'
import { useAdminTranslation } from '@/hooks/useAdminTranslation'

export default function AdminProjectsPage() {
  const { t } = useAdminTranslation()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('areYouSureDelete'))) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
    fetchProjects()
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto"></div>
      </div>
    )
  }

  return (
    <div>
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">{t('projects')}</h1>
          <div className="w-16 h-1 bg-primary-900"></div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <button
            onClick={() => {
              setEditingProject(null)
              setShowForm(true)
            }}
            className="w-full sm:w-auto px-4 md:px-6 py-2 text-sm md:text-base bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
          >
            {t('addNewProject')}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ProjectForm
              project={editingProject}
              onClose={handleFormClose}
              onSave={handleFormClose}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.filter((p) => editingProject?._id?.toString() !== p._id?.toString()).length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              {editingProject ? t('noProjects') : t('noProjects')}
            </div>
          ) : (
            projects
              .filter((p) => editingProject?._id?.toString() !== p._id?.toString())
              .map((project) => (
              <div
                key={project._id?.toString()}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {project.images && project.images.length > 0 && (
                  <div className="w-full min-h-[150px] bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title.en}
                      className="w-full h-auto max-h-[200px] object-contain"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title.en}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description.en}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
                    >
                      {t('edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(project._id!.toString())}
                      className="px-3 md:px-4 py-2 text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  )
}

