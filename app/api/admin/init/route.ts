import { NextResponse } from 'next/server'

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
