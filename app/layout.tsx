import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  weight: '400', // Regular
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Theta Engineering - Professional Engineering Solutions',
  description: 'Theta Engineering provides professional engineering services for Dutch and international clients.',
  keywords: 'engineering, engineering services, Netherlands, technical solutions',
  authors: [{ name: 'Theta Engineering' }],
  openGraph: {
    title: 'Theta Engineering - Professional Engineering Solutions',
    description: 'Theta Engineering provides professional engineering services for Dutch and international clients.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

