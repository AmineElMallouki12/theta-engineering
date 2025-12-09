import { NextRequest, NextResponse } from 'next/server'
import { getAdminByUsername, verifyPassword, generateToken } from '@/lib/auth'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    console.log('[Login API] Received login request for username:', username)

    if (!username || !password) {
      console.log('[Login API] Missing username or password')
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check MongoDB connection
    if (!process.env.MONGODB_URI) {
      console.error('[Login API] MONGODB_URI is not set')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      )
    }

    let admin
    try {
      console.log('[Login API] Fetching admin from database...')
      console.log('[Login API] MONGODB_URI exists:', !!process.env.MONGODB_URI)
      admin = await getAdminByUsername(username)
      console.log('[Login API] Admin fetch result:', admin ? 'Found' : 'Not found')
    } catch (dbError: any) {
      console.error('[Login API] Database error type:', typeof dbError)
      console.error('[Login API] Database error:', dbError)
      console.error('[Login API] Database error message:', dbError?.message || String(dbError))
      if (dbError?.stack) {
        console.error('[Login API] Database error stack:', dbError.stack)
      }
      const errorMsg = dbError?.message || 'Database connection error. Please check your MongoDB connection.'
      return NextResponse.json(
        { error: errorMsg },
        { status: 500 }
      )
    }

    if (!admin) {
      console.log('[Login API] Admin not found for username:', username)
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    console.log('[Login API] Verifying password...')
    const isValid = await verifyPassword(password, admin.password)
    console.log('[Login API] Password verification result:', isValid)
    
    if (!isValid) {
      console.log('[Login API] Invalid password for username:', username)
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    console.log('[Login API] Generating token...')
    const token = generateToken({
      username: admin.username,
      adminId: admin._id!.toString(),
    })

    console.log('[Login API] Login successful, setting cookie...')
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful'
    })
    
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    console.log('[Login API] Login completed successfully')
    return response
  } catch (error: any) {
    console.error('[Login API] Unexpected error:', error)
    console.error('[Login API] Error message:', error?.message || String(error))
    if (error?.stack) {
      console.error('[Login API] Error stack:', error.stack)
    }
    
    // Return a user-friendly error message
    const errorMessage = error?.message || 'Internal server error. Please try again.'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

