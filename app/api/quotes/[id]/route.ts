import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(request)

    const { status } = await request.json()
    if (!status || !['new', 'read', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const updateData: any = { status }
    if (status === 'read') {
      updateData.readAt = new Date()
    } else if (status === 'archived') {
      updateData.archivedAt = new Date()
    }

    await db.collection('quotes').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    )

    // Update notification if marking as read
    if (status === 'read') {
      await db.collection('notifications').updateOne(
        { quoteId: new ObjectId(params.id) },
        { $set: { read: true } }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(request)

    const client = await clientPromise
    const db = client.db()

    // Delete the quote
    await db.collection('quotes').deleteOne({
      _id: new ObjectId(params.id),
    })

    // Also delete associated notification if it exists
    await db.collection('notifications').deleteMany({
      quoteId: new ObjectId(params.id),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

