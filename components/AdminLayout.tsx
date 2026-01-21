'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import AdminLanguageSwitcher from './AdminLanguageSwitcher'
import { useAdminTranslation } from '@/hooks/useAdminTranslation'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useAdminTranslation()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoginPage, setIsLoginPage] = useState(false)

  // Check if we're on login page (must be in effect to avoid hooks violation)
  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsLoginPage(true)
      router.replace('/admin/login')
    }
  }, [pathname, router])

  // If on login page, don't render admin layout
  if (isLoginPage || pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin/dashboard', label: t('dashboard') },
    { href: '/admin/quotes', label: t('quotes') },
    { href: '/admin/projects', label: t('projects') },
    { href: '/admin/settings', label: t('settings') },
  ]

  const checkAuth = async () => {
    // Don't check auth if we're on login page
    if (pathname === '/admin/login') {
      setIsLoading(false)
      return false
    }

    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include',
        method: 'GET',
        cache: 'no-store',
      })
      
      if (!response.ok || response.status === 401) {
        // Not authenticated, redirect to login immediately
        router.replace('/admin/login')
        return false
      }
      
      const data = await response.json()
      
      if (!data || !data.authenticated) {
        // Not authenticated, redirect to login immediately
        router.replace('/admin/login')
        return false
      }
      
      // Authentication successful, allow access
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Auth check error:', error)
      // On error, redirect to login for security
      router.replace('/admin/login')
      return false
    }
  }

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      if (response.ok) {
        // Clear any local state
        setNotifications([])
        // Wait a bit for cookie to be cleared
        await new Promise(resolve => setTimeout(resolve, 100))
        router.push('/admin/login')
        router.refresh()
      } else {
        // Even if logout fails, redirect to login
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, redirect to login
      router.push('/admin/login')
      router.refresh()
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    let isMounted = true
    
    const initialize = async () => {
      // Keep loading state true until auth is verified
      const isAuthenticated = await checkAuth()
      
      // Only set up notifications polling if we're authenticated and component is still mounted
      if (isAuthenticated && isMounted) {
        fetchNotifications()
        intervalId = setInterval(fetchNotifications, 30000) // Poll every 30 seconds
      }
    }
    
    initialize()
    
    return () => {
      isMounted = false
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  // Always show loading until auth is verified
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('verifyingAuth')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-primary-50">
      <nav className="bg-white shadow-md border-b-2 border-[#0000FF] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 md:space-x-8">
              <Link href="/admin/dashboard" className="text-lg md:text-xl font-bold text-[#0000FF] hover:text-[#0000FF] transition-colors">
                Theta Admin
              </Link>
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-[#0000FF] text-white shadow-md'
                        : 'text-gray-700 hover:bg-[#0000FF] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <AdminLanguageSwitcher />
              <Link
                href="/admin/quotes"
                className="relative p-2 text-gray-700 hover:text-[#0000FF] transition-colors"
              >
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-[#0000FF] hover:bg-[#0000FF] rounded-lg transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-[#0000FF] text-white'
                      : 'text-gray-700 hover:bg-[#0000FF] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white bg-[#0000FF] hover:bg-[#0000FF] transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="container mx-auto px-4 py-4 md:py-8">{children}</main>
    </div>
  )
}

