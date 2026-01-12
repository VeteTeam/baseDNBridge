// 🎯 Purpose: Componente para mostrar leads en formato tabla
// 🏗️ Architecture: Client component con paginación y filtros
// 🔧 Support Notes: Muestra todos los datos relevantes de cada lead
// 💡 Learning: Tabla responsive con ordenamiento y búsqueda

'use client'

import { useState } from 'react'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  projectType: string
  message: string
  budget: string | null
  source: string
  status: string
  createdAt: string
  updatedAt: string
}

interface LeadsTableProps {
  initialLeads: Lead[]
  initialPagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function LeadsTable({ initialLeads, initialPagination }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(initialPagination.page)
  const [isExporting, setIsExporting] = useState(false)

  // 🔍 Función para cargar leads con filtros
  const fetchLeads = async (page: number = 1, searchTerm: string = '', status: string = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      })

      if (searchTerm) params.append('search', searchTerm)
      if (status) params.append('status', status)

      const response = await fetch(`/api/admin/leads?${params.toString()}`)
      
      if (response.status === 401) {
        window.location.href = '/internal/auth'
        return
      }

      if (!response.ok) {
        throw new Error('Error al cargar leads')
      }

      const data = await response.json()
      setLeads(data.leads)
      setPagination(data.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error cargando leads:', error)
    } finally {
      setLoading(false)
    }
  }

  // 🔍 Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLeads(1, search, statusFilter)
  }

  // 🔍 Manejar cambio de filtro de status
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setStatusFilter(newStatus)
    fetchLeads(1, search, newStatus)
  }

  // 📅 Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // 🏷️ Obtener color del badge según status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // 🌐 Traducir status
  const translateStatus = (status: string) => {
    const translations: Record<string, string> = {
      new: 'Nuevo',
      contacted: 'Contactado',
      qualified: 'Calificado',
      closed: 'Cerrado',
    }
    return translations[status] || status
  }

  // 📥 Función para exportar todos los leads a Excel
  const handleExportToExcel = async () => {
    setIsExporting(true)
    try {
      // Obtener todos los leads (sin paginación) para exportar
      const params = new URLSearchParams({
        limit: '10000', // Número grande para obtener todos
        page: '1',
      })

      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)

      const response = await fetch(`/api/admin/leads?${params.toString()}`)
      
      if (response.status === 401) {
        window.location.href = '/internal/auth'
        return
      }

      if (!response.ok) {
        throw new Error('Error al obtener los leads para exportar')
      }

      const data = await response.json()
      
      // Importación dinámica de xlsx para evitar problemas de carga
      const XLSX = await import('xlsx')
      
      // Función para formatear fecha completa para Excel
      const formatDateForExcel = (dateString: string) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(date)
      }

      // Convertir leads a formato de exportación
      const exportData = data.leads.map((lead: any) => ({
        'ID': lead.id,
        'Nombre': lead.name || '',
        'Email': lead.email || '',
        'Teléfono': lead.phone || '',
        'Empresa': lead.company || '',
        'Tipo de Proyecto': lead.projectType || '',
        'Mensaje': lead.message || '',
        'Presupuesto': lead.budget || '',
        'Origen': lead.source || '',
        'Estado': translateStatus(lead.status),
        'Fecha de Creación': formatDateForExcel(lead.createdAt),
        'Última Actualización': formatDateForExcel(lead.updatedAt),
      }))

      // Crear un libro de trabajo (workbook)
      const workbook = XLSX.utils.book_new()

      // Crear una hoja de cálculo (worksheet) desde los datos
      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Ajustar el ancho de las columnas automáticamente
      const columnWidths = [
        { wch: 30 }, // ID
        { wch: 25 }, // Nombre
        { wch: 30 }, // Email
        { wch: 20 }, // Teléfono
        { wch: 25 }, // Empresa
        { wch: 20 }, // Tipo de Proyecto
        { wch: 50 }, // Mensaje
        { wch: 15 }, // Presupuesto
        { wch: 15 }, // Origen
        { wch: 15 }, // Estado
        { wch: 20 }, // Fecha de Creación
        { wch: 20 }, // Última Actualización
      ]
      worksheet['!cols'] = columnWidths

      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads')

      // Generar el archivo Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      })

      // Crear un blob y descargarlo
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      // Crear un enlace temporal y hacer clic para descargar
      const url = globalThis.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `leads_dnbridge_${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(link)
      link.click()

      // Limpiar
      link.remove()
      globalThis.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al exportar:', error)
      alert('Error al exportar los leads. Por favor intenta de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 🔍 Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
            {/* Búsqueda */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre, email o empresa..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue text-gray-900 bg-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-[#00b8e6] transition-colors"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>

            {/* Filtro de status */}
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue text-gray-900 bg-white"
            >
              <option value="">Todos los estados</option>
              <option value="new">Nuevo</option>
              <option value="contacted">Contactado</option>
              <option value="qualified">Calificado</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          {/* Botón de exportar */}
          <button
            onClick={handleExportToExcel}
            disabled={isExporting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium whitespace-nowrap"
          >
            {isExporting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Exportando...</span>
              </>
            ) : (
              <>
                <i className="fas fa-file-excel"></i>
                <span>Exportar a Excel</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 📊 Tabla de leads */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary-blue"></i>
            <p className="mt-4 text-gray-600">Cargando leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No se encontraron leads</p>
          </div>
        ) : (
          <>
            {/* Tabla responsive */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-blue">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-white">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Teléfono</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Empresa</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-900 font-medium">{lead.name}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        {lead.phone ? (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          >
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{lead.company || <span className="text-gray-400">-</span>}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm font-medium">
                          {lead.projectType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {translateStatus(lead.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            // Mostrar modal con detalles completos
                            alert(
                              `Mensaje:\n${lead.message}\n\n${
                                lead.budget ? `Presupuesto: ${lead.budget}` : ''
                              }`
                            )
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors text-lg"
                          title="Ver detalles"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📄 Paginación */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando {((currentPage - 1) * pagination.limit) + 1} -{' '}
                  {Math.min(currentPage * pagination.limit, pagination.total)} de{' '}
                  {pagination.total} leads
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchLeads(currentPage - 1, search, statusFilter)}
                    disabled={currentPage === 1 || loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium"
                  >
                    Anterior
                  </button>
                  <span className="px-4 py-2 text-gray-700 font-medium">
                    Página {currentPage} de {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchLeads(currentPage + 1, search, statusFilter)}
                    disabled={currentPage === pagination.totalPages || loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

