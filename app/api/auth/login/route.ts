// 🎯 Purpose: Endpoint para autenticación de administradores
// 🏗️ Architecture: POST endpoint que valida credenciales y genera JWT
// 🔧 Support Notes: Rate limiting recomendado para prevenir brute force
// 💡 Learning: Autenticación stateless con JWT evita necesidad de sesiones en BD

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { signToken, setAuthCookie } from '@/lib/auth'
import { validateCredentials } from '@/lib/auth-config'

// Schema de validación
const loginSchema = z.object({
  username: z.string().min(1, 'Usuario requerido'),
  password: z.string().min(1, 'Contraseña requerida'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos
    const validatedData = loginSchema.parse(body)
    
    // Verificar credenciales
    const isValid = validateCredentials(
      validatedData.username,
      validatedData.password
    )

    if (!isValid) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Generar token JWT
    const token = await signToken(validatedData.username)

    // Establecer cookie con el token
    await setAuthCookie(token)

    return NextResponse.json(
      {
        message: 'Login exitoso',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error en login:', error)
    return NextResponse.json(
      { message: 'Error al procesar el login' },
      { status: 500 }
    )
  }
}

