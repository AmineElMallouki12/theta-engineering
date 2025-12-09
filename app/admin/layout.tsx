'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  
  // Don't wrap login page with AdminLayout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }
  
  // All other admin pages need AdminLayout with auth check
  return <AdminLayout>{children}</AdminLayout>
}

