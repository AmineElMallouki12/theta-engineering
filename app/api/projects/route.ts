import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'
import clientPromise from '@/lib/mongodb'
import { Project } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db()

    const projects = await db
      .collection<Project>('projects')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(request)

    const data = await request.json()

    if (!data.title?.en || !data.title?.nl || !data.description?.en || !data.description?.nl) {
      return NextResponse.json(
        { error: 'Title and description (both languages) are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const project: Omit<Project, '_id'> = {
      title: {
        en: data.title.en,
        nl: data.title.nl,
      },
      description: {
        en: data.description.en,
        nl: data.description.nl,
      },
      content: {
        en: data.content?.en || '',
        nl: data.content?.nl || '',
      },
      images: data.images || [],
      category: data.category || '',
      client: data.client || '',
      year: data.year || new Date().getFullYear(),
      featured: data.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Project>('projects').insertOne(project as any)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

