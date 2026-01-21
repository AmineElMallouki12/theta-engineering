import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Simple password reset endpoint
 * POST /api/auth/reset-password
 * Body: { username: "admin", newPassword: "admin123" }
 */
export async function POST(request: NextRequest) {
  try {
    const { username, newPassword } = await request.json()

    if (!username || !newPassword) {
      return NextResponse.json(
        { error: 'Username and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()
    const adminsCollection = db.collection('admins')

    // Find the admin user
    const admin = await adminsCollection.findOne({ username })

    if (!admin) {
      return NextResponse.json(
        { error: `Admin user "${username}" not found. Check your username.` },
        { status: 404 }
      )
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the password
    const result = await adminsCollection.updateOne(
      { _id: admin._id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    )

    if (result.modifiedCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Password reset successfully for user "${username}"`,
        username: username,
        note: 'You can now login with this username and your new password',
      })
    } else {
      return NextResponse.json(
        { error: 'Password was not updated. It may already be set to this value.' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to reset password',
        details: error.message
      },
      { status: 500 }
    )
  }
}
