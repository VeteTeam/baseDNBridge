// 🎯 Purpose: Página protegida para visualizar todos los leads
// 🏗️ Architecture: Server component que verifica autenticación antes de renderizar
// 🔧 Support Notes: Redirige a login si no está autenticado
// 💡 Learning: Protección de rutas en Next.js con verificación server-side

import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import LeadsTable, { type Lead } from '@/components/LeadsTable'

/**
 * 🎯 Página de administración de leads
 * Requiere autenticación - redirige a login si no está autenticado
 */
export default async function LeadsPage() {
  // 🔐 Verificar autenticación
  const user = await getAuthUser()

  if (!user) {
    redirect('/internal/auth')
  }

  // 📊 Obtener leads iniciales (primera página)
  const leadsData = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 50, // Primeros 50 leads
  })

  // 🔄 Convertir fechas Date a strings para el componente
  const leads = leadsData.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  }))

  const total = await prisma.lead.count()

  // 🔄 Función para logout
  async function handleLogout() {
    'use server'
    
    const { removeAuthCookie } = await import('@/lib/auth')
    await removeAuthCookie()
    redirect('/internal/auth')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-dark">
                Panel de Administración - Leads
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Gestiona todos los contactos recibidos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Bienvenido, <span className="font-semibold text-gray-900">{user.username}</span>
              </span>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{total}</p>
              </div>
              <div className="bg-primary-blue/10 p-3 rounded-lg">
                <i className="fas fa-users text-primary-blue text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nuevos</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {leads.filter((l) => l.status === 'new').length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <i className="fas fa-envelope text-blue-700 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contactados</p>
                <p className="text-2xl font-bold text-yellow-700 mt-1">
                  {leads.filter((l) => l.status === 'contacted').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <i className="fas fa-phone text-yellow-700 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calificados</p>
                <p className="text-2xl font-bold text-green-700 mt-1">
                  {leads.filter((l) => l.status === 'qualified').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <i className="fas fa-check-circle text-green-700 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de leads */}
        <LeadsTable
          initialLeads={leads as Lead[]}
          initialPagination={{
            page: 1,
            limit: 50,
            total,
            totalPages: Math.ceil(total / 50),
          }}
        />
      </main>
    </div>
  )
}

