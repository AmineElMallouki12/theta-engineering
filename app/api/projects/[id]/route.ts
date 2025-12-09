import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { Project } from '@/lib/models'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(request)

    const data = await request.json()

    const client = await clientPromise
    const db = client.db()

    const updateData: any = {
      updatedAt: new Date(),
    }

    if (data.title) updateData.title = data.title
    if (data.description) updateData.description = data.description
    if (data.content) updateData.content = data.content
    if (data.images) updateData.images = data.images
    if (data.category !== undefined) updateData.category = data.category
    if (data.client !== undefined) updateData.client = data.client
    if (data.year !== undefined) updateData.year = data.year
    if (data.featured !== undefined) updateData.featured = data.featured

    await db.collection<Project>('projects').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating project:', error)
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

    await db.collection<Project>('projects').deleteOne({
      _id: new ObjectId(params.id),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

