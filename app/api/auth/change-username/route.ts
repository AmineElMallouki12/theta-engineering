import { NextRequest, NextResponse } from 'next/server'
import { getAdminByUsername, verifyPassword, updateAdminUsername } from '@/lib/auth'
import { verifyToken, generateToken } from '@/lib/auth'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { currentPassword, newUsername } = await request.json()

    if (!currentPassword || !newUsername) {
      return NextResponse.json(
        { error: 'Current password and new username are required' },
        { status: 400 }
      )
    }

    if (newUsername.length < 3) {
      return NextResponse.json(
        { error: 'New username must be at least 3 characters' },
        { status: 400 }
      )
    }

    if (newUsername === payload.username) {
      return NextResponse.json(
        { error: 'New username must be different from current username' },
        { status: 400 }
      )
    }

    const admin = await getAdminByUsername(payload.username)
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 })
    }

    const isValid = await verifyPassword(currentPassword, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    try {
      await updateAdminUsername(payload.username, newUsername)
    } catch (error: any) {
      if (error.message === 'Username already exists') {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    // Generate new token with updated username
    const newToken = generateToken({
      username: newUsername,
      adminId: payload.adminId,
    })

    // Create response with updated cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Change username error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

