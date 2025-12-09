import { redirect } from 'next/navigation'

/**
 * Root page redirect
 * 
 * Since localePrefix is set to 'always', all routes must have a locale prefix.
 * This page ensures that accessing the root path redirects to the default locale (Dutch).
 */
export default function RootPage() {
  redirect('/nl')
}

