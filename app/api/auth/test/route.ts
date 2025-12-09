import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

/**
 * Diagnostic endpoint to test MongoDB connection and admin user
 * Access: GET /api/auth/test
 */
export async function GET(request: NextRequest) {
  try {
    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      mongodb: {
        uri_set: !!process.env.MONGODB_URI,
        uri_preview: process.env.MONGODB_URI ? 
          process.env.MONGODB_URI.substring(0, 30) + '...' : 
          'NOT SET',
      },
      jwt_secret: {
        set: !!process.env.JWT_SECRET,
        preview: process.env.JWT_SECRET ? 
          process.env.JWT_SECRET.substring(0, 10) + '...' : 
          'NOT SET',
      },
    }

    // Test MongoDB connection
    try {
      const client = await clientPromise
      const db = client.db()
      diagnostics.mongodb.connected = true
      diagnostics.mongodb.database = db.databaseName
      
      // Check for admin user
      const admin = await db.collection('admins').findOne({ username: 'admin' })
      diagnostics.mongodb.admin_exists = !!admin
      diagnostics.mongodb.admin_username = admin?.username || null
      diagnostics.mongodb.admin_has_password = !!admin?.password
      
      // Count all admins
      const adminCount = await db.collection('admins').countDocuments()
      diagnostics.mongodb.total_admins = adminCount
    } catch (dbError: any) {
      diagnostics.mongodb.connected = false
      diagnostics.mongodb.error = dbError.message
    }

    return NextResponse.json(diagnostics, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

