import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/middleware-auth'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request)
    
    if (!admin) {
      return NextResponse.json(
        { authenticated: false, error: 'No valid authentication token' },
        { status: 401 }
      )
    }

    // Double check that we have valid admin data
    if (!admin.username || !admin.adminId) {
      return NextResponse.json(
        { authenticated: false, error: 'Invalid token data' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      username: admin.username,
    })
  } catch (error: any) {
    console.error('[Auth Check API] Error:', error)
    console.error('[Auth Check API] Error message:', error?.message || String(error))
    if (error?.stack) {
      console.error('[Auth Check API] Error stack:', error.stack)
    }
    return NextResponse.json(
      { authenticated: false, error: error?.message || 'Authentication check failed' },
      { status: 401 }
    )
  }
}

