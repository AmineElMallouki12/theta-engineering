import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db()
    
    // Try to list collections to verify connection
    const collections = await db.listCollections().toArray()
    
    // Try to find admin
    const admin = await db.collection('admins').findOne({})
    
    return NextResponse.json({
      success: true,
      database: db.databaseName,
      collections: collections.map(c => c.name),
      hasAdmin: !!admin,
      adminEmail: admin?.email || null,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
    }, { status: 500 })
  }
}

