import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'
import clientPromise from '@/lib/mongodb'
import { Quote } from '@/lib/models'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const client = await clientPromise
    const db = client.db()

    const query: any = {}
    if (status) query.status = status
    if (type) query.type = type

    const quotes = await db
      .collection<Quote>('quotes')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(quotes)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

