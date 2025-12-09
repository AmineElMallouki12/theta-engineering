import { NextResponse } from 'next/server'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// This route is disabled - admin user already created
export async function GET() {
  return NextResponse.json(
    { error: 'This endpoint has been disabled' },
    { status: 404 }
  )
}

export async function POST() {
  return NextResponse.json(
    { error: 'This endpoint has been disabled' },
    { status: 404 }
  )
}
