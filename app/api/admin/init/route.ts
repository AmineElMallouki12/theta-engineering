import { NextResponse } from 'next/server'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

// This route is disabled - admin user already created
// Minimal implementation to prevent build errors
export const GET = async () => {
  return NextResponse.json(
    { error: 'This endpoint has been disabled' },
    { status: 404 }
  )
}

export const POST = async () => {
  return NextResponse.json(
    { error: 'This endpoint has been disabled' },
    { status: 404 }
  )
}
