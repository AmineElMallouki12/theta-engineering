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

// Lazy MongoDB connection - only connects when actually needed
// This prevents build-time connection attempts

let client: MongoClient
let clientPromise: Promise<MongoClient> | null = null

function getClientPromise(): Promise<MongoClient> {
  // Check if we're in build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || 
      process.env.NEXT_PHASE === 'phase-development-build') {
    // During build, return a promise that will fail gracefully at runtime
    return Promise.reject(new Error('MongoDB connection not available during build'))
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    return Promise.reject(new Error('MONGODB_URI is not set. Please add it to your environment variables in Vercel.'))
  }

  // Return existing promise if available
  if (clientPromise) {
    return clientPromise
  }

  // Create new connection
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
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

  return clientPromise
}

// Create a proxy promise that only connects when actually awaited
// This prevents connection attempts during build
const proxyPromise = new Proxy({} as Promise<MongoClient>, {
  get(target, prop) {
    const promise = getClientPromise()
    return (promise as any)[prop]
  },
  apply(target, thisArg, argumentsList) {
    const promise = getClientPromise()
    return (promise as any).then(...argumentsList)
  }
})

export default proxyPromise as Promise<MongoClient>

