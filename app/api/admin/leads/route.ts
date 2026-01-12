
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'


export async function GET(request: NextRequest) {
  try {
    // 🔐 Verificar autenticación
    await requireAuth()

    // 📊 Obtener parámetros de query para paginación y filtros
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status') // Filtro opcional por status
    const search = searchParams.get('search') // Búsqueda en nombre, email, empresa

    // 🎯 Construir condiciones de filtro
    const where: any = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ]
    }

    // 📊 Obtener leads con paginación
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: {
          createdAt: 'desc', // Más recientes primero
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    // 📈 Calcular información de paginación
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      {
        leads,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    // 🔐 Si el error es de autenticación, retornar 401
    if (error instanceof Error && error.message === 'No autenticado') {
      return NextResponse.json(
        { message: 'No autorizado. Por favor inicia sesión.' },
        { status: 401 }
      )
    }

    console.error('Error obteniendo leads:', error)
    return NextResponse.json(
      { message: 'Error al obtener los leads' },
      { status: 500 }
    )
  }
}

