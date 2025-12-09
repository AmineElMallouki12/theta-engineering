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
      return NextResponse.json({ error: 'Invalid document ID' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Try contact-documents bucket first, then project-images (for backward compatibility)
    let bucket = new GridFSBucket(db, {
      bucketName: 'contact-documents',
    })

    // Find the file
    let files = await bucket.find({ _id: new ObjectId(id) }).toArray()

    // If not found, try project-images bucket (for backward compatibility)
    if (!files || files.length === 0) {
      bucket = new GridFSBucket(db, {
        bucketName: 'project-images',
      })
      files = await bucket.find({ _id: new ObjectId(id) }).toArray()
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const file = files[0]

    // Get the file stream
    const downloadStream = bucket.openDownloadStream(new ObjectId(id))

    // Set appropriate headers
    const headers = new Headers()
    headers.set('Content-Type', file.contentType || 'application/octet-stream')
    headers.set('Content-Length', file.length.toString())
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    
    // Set filename for download
    if (file.metadata?.originalName) {
      headers.set('Content-Disposition', `inline; filename="${file.metadata.originalName}"`)
    }

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
    console.error('Error serving document:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

