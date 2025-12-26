// 🎯 Purpose: Endpoint para cerrar sesión
// 🏗️ Architecture: POST endpoint que elimina la cookie de autenticación
// 🔧 Support Notes: Simple pero efectivo para logout
// 💡 Learning: Eliminar la cookie invalida el token automáticamente

import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export async function POST() {
  try {
    await removeAuthCookie()

    return NextResponse.json(
      {
        message: 'Logout exitoso',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en logout:', error)
    return NextResponse.json(
      { message: 'Error al procesar el logout' },
      { status: 500 }
    )
  }
}

