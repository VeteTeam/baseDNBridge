// 🎯 Purpose: Utilidades para autenticación JWT con cookies
// 🏗️ Architecture: JWT con jose (compatible con Edge Runtime)
// 🔧 Support Notes: Tokens almacenados en cookies httpOnly para seguridad
// 💡 Learning: JWT permite autenticación stateless sin necesidad de sesiones en BD

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// 🔐 Secret key para firmar JWT - DEBE estar en variables de entorno
const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
const encodedKey = new TextEncoder().encode(SECRET_KEY)

// ⏱️ Duración del token (7 días)
const TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos

export interface AuthPayload {
  username: string
  iat?: number
  exp?: number
}

/**
 * 🎯 Genera un token JWT para el usuario autenticado
 * @param username - Nombre de usuario
 * @returns Token JWT firmado
 */
export async function signToken(username: string): Promise<string> {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)

  return token
}

/**
 * 🎯 Verifica y decodifica un token JWT
 * @param token - Token JWT a verificar
 * @returns Payload del token si es válido, null si no
 */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey)
    // Verificar que el payload tenga username antes de retornarlo
    if (payload && typeof payload === 'object' && 'username' in payload) {
      return payload as unknown as AuthPayload
    }
    return null
  } catch (error) {
    console.error('Error verificando token:', error)
    return null
  }
}

/**
 * 🎯 Obtiene el token de las cookies y verifica si el usuario está autenticado
 * @returns Payload del usuario si está autenticado, null si no
 */
export async function getAuthUser(): Promise<AuthPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return null
  }

  return await verifyToken(token)
}

/**
 * 🎯 Establece el token en las cookies después del login
 * @param token - Token JWT a almacenar
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true, // 🔒 Previene acceso desde JavaScript (XSS protection)
    secure: process.env.NODE_ENV === 'production', // 🔒 Solo HTTPS en producción
    sameSite: 'strict', // 🔒 Protección CSRF
    maxAge: TOKEN_EXPIRATION / 1000, // ⏱️ 7 días en segundos
    path: '/', // 🌐 Disponible en toda la app
  })
}

/**
 * 🎯 Elimina el token de las cookies (logout)
 */
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

/**
 * 🎯 Verifica si el usuario está autenticado (helper para API routes)
 * @returns Payload del usuario si está autenticado
 * @throws Error si no está autenticado
 */
export async function requireAuth(): Promise<AuthPayload> {
  const user = await getAuthUser()
  
  if (!user) {
    throw new Error('No autenticado')
  }

  return user
}

