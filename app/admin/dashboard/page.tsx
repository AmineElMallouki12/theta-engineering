'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAdminTranslation } from '@/hooks/useAdminTranslation'

interface DashboardStats {
  totalQuotes: number
  newQuotes: number
  archivedQuotes: number
  totalProjects: number
}

export default function AdminDashboard() {
  const { t } = useAdminTranslation()
  const [stats, setStats] = useState<DashboardStats>({
    totalQuotes: 0,
    newQuotes: 0,
    archivedQuotes: 0,
    totalProjects: 0,
  })
  const [recentQuotes, setRecentQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [quotesRes, projectsRes] = await Promise.all([
        fetch('/api/quotes'),
        fetch('/api/projects'),
      ])

      if (quotesRes.ok && projectsRes.ok) {
        const quotes = await quotesRes.json()
        const projects = await projectsRes.json()

        setStats({
          totalQuotes: quotes.length,
          newQuotes: quotes.filter((q: any) => q.status === 'new').length,
          archivedQuotes: quotes.filter((q: any) => q.status === 'archived').length,
          totalProjects: projects.length,
        })

        setRecentQuotes(quotes.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#051A53] mx-auto"></div>
      </div>
    )
  }

  return (
    <div>
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#051A53] mb-2">{t('dashboard')}</h1>
          <div className="w-16 h-1 bg-[#051A53]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#051A53] hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t('totalQuotes')}</h3>
            <p className="text-3xl font-bold text-[#051A53]">{stats.totalQuotes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500 hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t('newQuotes')}</h3>
            <p className="text-3xl font-bold text-red-600">{stats.newQuotes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-400 hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t('archived')}</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.archivedQuotes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t('projects')}</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalProjects}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#051A53]">
          <div className="p-4 md:p-6 border-b border-[#051A53]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-lg md:text-xl font-semibold text-[#051A53]">{t('recentQuotes')}</h2>
              <Link
                href="/admin/quotes"
                className="text-[#051A53] hover:text-[#051A53] font-medium text-sm md:text-base transition-colors"
              >
                {t('viewAll')} →
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {recentQuotes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">{t('noQuotes')}</div>
            ) : (
              recentQuotes.map((quote) => (
                <div key={quote._id} className="p-4 md:p-6 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm md:text-base">{quote.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{quote.email}</p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                        {quote.message}
                      </p>
                    </div>
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                        quote.status === 'new'
                          ? 'bg-red-100 text-red-800'
                          : quote.status === 'read'
                          ? 'bg-primary-100 text-[#051A53]'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    </div>
  )
}

