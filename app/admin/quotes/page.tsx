'use client'

import { useEffect, useState } from 'react'
import { Quote } from '@/lib/models'
import { useAdminTranslation } from '@/hooks/useAdminTranslation'

export default function AdminQuotesPage() {
  const { t } = useAdminTranslation()
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]) // Store all quotes for counts
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuotes()
  }, [filter])

  const fetchQuotes = async () => {
    try {
      // Always fetch all quotes to get accurate counts
      const response = await fetch('/api/quotes')
      if (response.ok) {
        const data = await response.json()
        setAllQuotes(data)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter quotes based on selected filter
  const quotes = filter === 'all' 
    ? allQuotes 
    : allQuotes.filter((q) => q.status === filter)

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        fetchQuotes()
      }
    } catch (error) {
      console.error('Error updating quote:', error)
    }
  }

  const readAndArchive = async (id: string) => {
    try {
      // First mark as read, then archive
      const readResponse = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' }),
      })
      
      if (readResponse.ok) {
        // Then archive it
        const archiveResponse = await fetch(`/api/quotes/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'archived' }),
        })
        
        if (archiveResponse.ok) {
          fetchQuotes()
        }
      }
    } catch (error) {
      console.error('Error reading and archiving quote:', error)
    }
  }

  const deleteQuote = async (id: string) => {
    if (!confirm(t('deleteConfirm'))) {
      return
    }

    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchQuotes()
      } else {
        alert(t('deleteFailed'))
      }
    } catch (error) {
      console.error('Error deleting quote:', error)
      alert(t('deleteFailed'))
    }
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
                <h1 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">{t('quotesContacts')}</h1>
                <div className="w-16 h-1 bg-primary-900"></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2">
            {(['all', 'new', 'read', 'archived'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t(status)} ({allQuotes.filter((q) => status === 'all' || q.status === status).length})
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border-t-4 border-primary-900 overflow-hidden">
          {quotes.length === 0 ? (
            <div className="p-12 text-center text-gray-500">{t('noQuotesFound')}</div>
          ) : (
            <div className="divide-y">
              {quotes.map((quote) => (
                  <div key={quote._id?.toString()} className="p-4 md:p-6 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
                          <h3 className="text-base md:text-lg font-semibold">{quote.name}</h3>
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                              quote.status === 'new'
                                ? 'bg-red-100 text-red-800'
                                : quote.status === 'read'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {quote.status === 'new' ? t('new') : quote.status === 'read' ? t('read') : t('archived')}
                          </span>
                          <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {quote.type === 'quote' ? t('quote') : t('contact')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>{t('email')}:</strong> {quote.email}
                        </p>
                        {(quote.phone || (quote as any).phone) && (
                          <p className="text-sm text-gray-600">
                            <strong>{t('phone')}:</strong> {quote.phone || (quote as any).phone}
                          </p>
                        )}
                        {((quote as any).clientType || quote.company) && (
                          <p className="text-sm text-gray-600">
                            <strong>Client Type:</strong> {
                              (quote as any).clientType === 'organisatie' ? 'Organisatie' :
                              (quote as any).clientType === 'particulier' ? 'Particulier' :
                              quote.company ? 'Organisatie' : 'Particulier'
                            }
                          </p>
                        )}
                        {((quote as any).organizationName || quote.company) && (
                          <p className="text-sm text-gray-600">
                            <strong>Organization:</strong> {(quote as any).organizationName || quote.company}
                          </p>
                        )}
                        {(quote as any).projectLocation && (
                          <p className="text-sm text-gray-600">
                            <strong>Project Location:</strong> {(quote as any).projectLocation}
                          </p>
                        )}
                        {(quote as any).projectType && (
                          <p className="text-sm text-gray-600">
                            <strong>Project Type:</strong> {
                              (quote as any).projectType === 'constructief-ontwerp' ? 'Constructief ontwerp en berekeningen' :
                              (quote as any).projectType === 'beoordeling-veiligheid' ? 'Beoordeling van constructieve veiligheid' :
                              (quote as any).projectType === 'projectmanagement' ? 'Projectmanagement' :
                              (quote as any).projectType === 'inspectie-advies' ? 'Inspectie en constructief advies' :
                              (quote as any).projectType
                            }
                          </p>
                        )}
                        {(quote as any).documents && (quote as any).documents.length > 0 && (
                          <p className="text-sm text-gray-600">
                            <strong>Documents:</strong>{' '}
                            {(quote as any).documents.map((doc: string, idx: number) => (
                              <span key={idx}>
                                <a href={doc} target="_blank" rel="noopener noreferrer" className="text-primary-900 hover:underline">
                                  Document {idx + 1}
                                </a>
                                {idx < (quote as any).documents.length - 1 && ', '}
                              </span>
                            ))}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          <strong>{t('createdAt')}:</strong>{' '}
                          {new Date(quote.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{quote.message}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {quote.status === 'new' && (
                        <>
                          <button
                            onClick={() => updateQuoteStatus(quote._id!.toString(), 'read')}
                            className="px-3 md:px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {t('markAsRead')}
                          </button>
                          <button
                            onClick={() => readAndArchive(quote._id!.toString())}
                            className="px-3 md:px-4 py-2 text-sm md:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            {t('readAndArchive')}
                          </button>
                          <button
                            onClick={() => updateQuoteStatus(quote._id!.toString(), 'archived')}
                            className="px-3 md:px-4 py-2 text-sm md:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            {t('archive')}
                          </button>
                        </>
                      )}
                      {quote.status === 'read' && (
                        <button
                          onClick={() => updateQuoteStatus(quote._id!.toString(), 'archived')}
                          className="px-3 md:px-4 py-2 text-sm md:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          {t('archive')}
                        </button>
                      )}
                      {quote.status === 'archived' && (
                        <button
                          onClick={() => updateQuoteStatus(quote._id!.toString(), 'read')}
                          className="px-3 md:px-4 py-2 text-sm md:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          {t('unarchive')}
                        </button>
                      )}
                      <button
                        onClick={() => deleteQuote(quote._id!.toString())}
                        className="px-3 md:px-4 py-2 text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
    </div>
  )
}

