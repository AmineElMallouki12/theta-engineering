import { NextRequest, NextResponse } from 'next/server'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully'
    })
    
    // Clear the cookie by setting it to expire immediately
    response.cookies.set('admin_token', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    
    // Also try to delete it (for older browsers)
    response.cookies.delete('admin_token')
    
    return response
  } catch (error: any) {
    console.error('Logout error:', error)
    // Even if there's an error, try to clear the cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out'
    })
    response.cookies.delete('admin_token')
    return response
  }
}
