import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'nl',
  localePrefix: 'always',
  localeDetection: false // Always use default locale (Dutch), ignore stored preferences
})

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Handle root path - redirect to default locale
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/nl'
    return NextResponse.redirect(url)
  }
  
  // Exclude admin routes from locale routing (both /admin and /nl/admin, /en/admin)
  if (pathname.startsWith('/admin') || pathname.startsWith('/nl/admin') || pathname.startsWith('/en/admin')) {
    // If accessing /nl/admin or /en/admin, redirect to /admin
    if (pathname.startsWith('/nl/admin') || pathname.startsWith('/en/admin')) {
      const newPath = pathname.replace(/^\/(nl|en)\/admin/, '/admin')
      const url = request.nextUrl.clone()
      url.pathname = newPath
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }
  
  // Exclude reset-password route from locale routing
  if (pathname.startsWith('/reset-password') || pathname.startsWith('/nl/reset-password') || pathname.startsWith('/en/reset-password')) {
    // If accessing /nl/reset-password or /en/reset-password, redirect to /reset-password
    if (pathname.startsWith('/nl/reset-password') || pathname.startsWith('/en/reset-password')) {
      const newPath = pathname.replace(/^\/(nl|en)\/reset-password/, '/reset-password')
      const url = request.nextUrl.clone()
      url.pathname = newPath
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }
  
  // Exclude API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }
  
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}

