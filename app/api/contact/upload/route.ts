import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { GridFSBucket, ObjectId } from 'mongodb'

// Prevent Next.js from analyzing this route during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ]
    const allowedExtensions = ['.pdf', '.dwg', '.jpg', '.jpeg', '.png', '.docx', '.doc']
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    const isValidType = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)
    
    if (!isValidType) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DWG, JPG, DOCX files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Create GridFS bucket for contact documents
    const bucket = new GridFSBucket(db, {
      bucketName: 'contact-documents',
    })

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename with original name preserved
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 9)
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${randomStr}-${sanitizedOriginalName}`

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type || 'application/octet-stream',
      metadata: {
        originalName: file.name,
        uploadedAt: new Date(),
      },
    })

    // Return a promise that resolves when upload is complete
    const fileId = await new Promise<ObjectId>((resolve, reject) => {
      uploadStream.on('finish', () => {
        resolve(uploadStream.id as ObjectId)
      })
      uploadStream.on('error', reject)
      uploadStream.end(buffer)
    })

    // Return the URL to access the document and the original filename
    const url = `/api/documents/${fileId.toString()}`
    return NextResponse.json({ 
      url,
      filename: file.name, // Include original filename for display
      id: fileId.toString()
    })
  } catch (error: any) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
