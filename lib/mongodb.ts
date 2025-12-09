import { MongoClient } from 'mongodb'

/**
 * MongoDB connection utility
 * 
 * This module provides a singleton MongoDB client connection.
 * In development, it uses a global variable to prevent multiple connections
 * during Hot Module Replacement (HMR). In production, it creates a new connection.
 * 
 * Usage:
 * ```typescript
 * import clientPromise from '@/lib/mongodb'
 * const client = await clientPromise
 * const db = client.db()
 * ```
 */

// Check for MONGODB_URI - only throw error at runtime, not during build
const uri: string | undefined = process.env.MONGODB_URI

// During build time, create a dummy promise that won't fail
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.NEXT_PHASE === 'phase-development-build' ||
                    !process.env.MONGODB_URI

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (isBuildTime || !uri) {
  // During build or if URI is missing, create a promise that will fail gracefully at runtime
  clientPromise = new Promise((resolve, reject) => {
    // Don't actually connect during build
    if (isBuildTime) {
      // Return a dummy client that will fail when used
      resolve({} as MongoClient)
    } else {
      reject(new Error('MONGODB_URI is not set. Please add it to your environment variables in Vercel.'))
    }
  })
} else if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // This prevents creating multiple connections during development.
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  // Each import gets a fresh connection promise.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

