import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'
import clientPromise from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request)

    const client = await clientPromise
    const db = client.db()

    const notifications = await db
      .collection('notifications')
      .find({ read: false })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(notifications)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

