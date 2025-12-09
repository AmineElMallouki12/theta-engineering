import { NextRequest } from 'next/server'
import { verifyToken } from './auth'

export async function getAdminFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return null
    }

    const payload = verifyToken(token)
    if (!payload) {
      return null
    }

    return payload
  } catch (error: any) {
    console.error('[getAdminFromRequest] Error verifying token:', error)
    console.error('[getAdminFromRequest] Error message:', error?.message || String(error))
    return null
  }
}

export async function requireAuth(request: NextRequest) {
  const admin = await getAdminFromRequest(request)
  if (!admin) {
    throw new Error('Unauthorized')
  }
  return admin
}

