import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { GridFSBucket, ObjectId } from 'mongodb'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Create GridFS bucket
    const bucket = new GridFSBucket(db, {
      bucketName: 'project-images',
    })

    // Find the file
    const files = await bucket.find({ _id: new ObjectId(id) }).toArray()

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    const file = files[0]

    // Get the file stream
    const downloadStream = bucket.openDownloadStream(new ObjectId(id))

    // Set appropriate headers
    const headers = new Headers()
    headers.set('Content-Type', file.contentType || 'image/jpeg')
    headers.set('Content-Length', file.length.toString())
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    // Convert stream to response
    const chunks: Buffer[] = []
    downloadStream.on('data', (chunk) => chunks.push(chunk))
    
    await new Promise<void>((resolve, reject) => {
      downloadStream.on('end', resolve)
      downloadStream.on('error', reject)
    })

    const buffer = Buffer.concat(chunks)

    return new NextResponse(buffer, {
      status: 200,
      headers,
    })
  } catch (error: any) {
    console.error('Error serving image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

