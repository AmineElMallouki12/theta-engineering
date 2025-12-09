import { NextRequest, NextResponse } from 'next/server'
import { createAdmin, getAdminByEmail } from '@/lib/auth'

/**
 * One-time admin initialization endpoint
 * Call this once to create the first admin user
 * DELETE this file after creating your admin account for security
 * 
 * Usage: POST /api/admin/init
 * Body: { email: "admin@example.com", password: "yourpassword" }
 */
export async function POST(request: NextRequest) {
  try {
    // Security: Only allow in development or with a secret key
    if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_INIT_SECRET) {
      return NextResponse.json(
        { error: 'Admin initialization disabled in production' },
        { status: 403 }
      )
    }

    const { email, password, secret } = await request.json()

    // Check secret if in production
    if (process.env.NODE_ENV === 'production' && secret !== process.env.ADMIN_INIT_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 403 })
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if admin already exists
    const existingAdmin = await getAdminByEmail(email)
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 400 }
      )
    }

    // Create admin
    await createAdmin(email, password)

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
    })
  } catch (error: any) {
    console.error('Error initializing admin:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

