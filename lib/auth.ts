import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import { Admin } from '@/lib/models'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

/**
 * JWT token payload structure
 */
export interface JWTPayload {
  username: string
  adminId: string
}

/**
 * Hashes a plain text password using bcrypt
 * @param password - Plain text password to hash
 * @returns Hashed password string
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

/**
 * Verifies a plain text password against a hashed password
 * @param password - Plain text password to verify
 * @param hashedPassword - Bcrypt hashed password to compare against
 * @returns True if passwords match, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Generates a JWT token for admin authentication
 * @param payload - Token payload containing username and adminId
 * @returns JWT token string (expires in 7 days)
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

/**
 * Verifies and decodes a JWT token
 * @param token - JWT token string to verify
 * @returns Decoded payload if valid, null if invalid or expired
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

/**
 * Retrieves an admin user from the database by username
 * @param username - Admin username to search for
 * @returns Admin object if found, null otherwise
 * @throws Error if database connection fails
 */
export async function getAdminByUsername(username: string): Promise<Admin | null> {
  let client
  try {
    console.log('[getAdminByUsername] Getting MongoDB client...')
    client = await clientPromise
    console.log('[getAdminByUsername] Client obtained successfully')
    
    // Use default database from connection string (same as all other API routes)
    const db = client.db()
    console.log(`[getAdminByUsername] Using database: ${db.databaseName}`)
    
    console.log(`[getAdminByUsername] Looking for admin with username: ${username}`)
    const admin = await db.collection<Admin>('admins').findOne({ username })
    console.log(`[getAdminByUsername] Admin found: ${admin ? 'Yes' : 'No'}`)
    if (admin) {
      console.log(`[getAdminByUsername] Admin username: ${admin.username}, has password: ${!!admin.password}`)
    }
    return admin
  } catch (error: any) {
    console.error('[getAdminByUsername] Error fetching admin from database:', error)
    console.error('[getAdminByUsername] Error type:', typeof error)
    console.error('[getAdminByUsername] Error name:', error?.name)
    console.error('[getAdminByUsername] Error message:', error?.message || String(error))
    if (error?.stack) {
      console.error('[getAdminByUsername] Error stack:', error.stack)
    }
    // Re-throw with more context
    const errorMessage = error?.message || 'Unknown database error'
    throw new Error(`Database connection error: ${errorMessage}`)
  }
}

/**
 * Creates a new admin user in the database
 * @param username - Admin username (required)
 * @param password - Plain text password (will be hashed)
 * @param email - Admin email (optional, for backward compatibility)
 * @returns Created admin object with _id
 */
export async function createAdmin(username: string, password: string, email?: string): Promise<Admin> {
  const client = await clientPromise
  const db = client.db()
  const hashedPassword = await hashPassword(password)
  
  const admin: Omit<Admin, '_id'> = {
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  const result = await db.collection<Admin>('admins').insertOne(admin as any)
  return { ...admin, _id: result.insertedId }
}

/**
 * Updates an admin user's password
 * @param username - Admin username to update
 * @param newPassword - New plain text password (will be hashed)
 */
export async function updateAdminPassword(
  username: string,
  newPassword: string
): Promise<void> {
  const client = await clientPromise
  const db = client.db()
  const hashedPassword = await hashPassword(newPassword)
  
  await db.collection<Admin>('admins').updateOne(
    { username },
    {
      $set: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    }
  )
}

/**
 * Updates an admin user's username
 * @param currentUsername - Current admin username
 * @param newUsername - New username to set
 * @throws Error if new username already exists
 */
export async function updateAdminUsername(
  currentUsername: string,
  newUsername: string
): Promise<void> {
  const client = await clientPromise
  const db = client.db()
  
  // Check if new username already exists to prevent duplicates
  const existingAdmin = await db.collection<Admin>('admins').findOne({ username: newUsername })
  if (existingAdmin) {
    throw new Error('Username already exists')
  }
  
  await db.collection<Admin>('admins').updateOne(
    { username: currentUsername },
    {
      $set: {
        username: newUsername,
        updatedAt: new Date(),
      },
    }
  )
}

