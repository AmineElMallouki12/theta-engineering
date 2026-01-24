'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey(prev => prev + 1)
  }, [pathname])

  return (
    <div key={key} className="page-content-slide">
      {children}
    </div>
  )
}
