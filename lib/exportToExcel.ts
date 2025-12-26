// 🎯 Purpose: Utilidad para exportar leads a archivo Excel (XLSX)
// 🏗️ Architecture: Usa la librería xlsx para generar archivos Excel
// 🔧 Support Notes: Exporta todos los datos de leads en formato estructurado
// 💡 Learning: Generación de archivos Excel desde el cliente usando SheetJS

import * as XLSX from 'xlsx'

export interface LeadExport {
  'ID': string
  'Nombre': string
  'Email': string
  'Teléfono': string
  'Empresa': string
  'Tipo de Proyecto': string
  'Mensaje': string
  'Presupuesto': string
  'Origen': string
  'Estado': string
  'Fecha de Creación': string
  'Última Actualización': string
}

/**
 * 🎯 Convierte un lead a formato de exportación
 */
function formatLeadForExport(lead: any): LeadExport {
  return {
    'ID': lead.id,
    'Nombre': lead.name || '',
    'Email': lead.email || '',
    'Teléfono': lead.phone || '',
    'Empresa': lead.company || '',
    'Tipo de Proyecto': lead.projectType || '',
    'Mensaje': lead.message || '',
    'Presupuesto': lead.budget || '',
    'Origen': lead.source || '',
    'Estado': getStatusLabel(lead.status),
    'Fecha de Creación': formatDate(lead.createdAt),
    'Última Actualización': formatDate(lead.updatedAt),
  }
}

/**
 * 🎯 Traduce el estado al español
 */
function getStatusLabel(status: string): string {
  const translations: Record<string, string> = {
    new: 'Nuevo',
    contacted: 'Contactado',
    qualified: 'Calificado',
    closed: 'Cerrado',
  }
  return translations[status] || status
}

/**
 * 🎯 Formatea una fecha a formato legible
 */
function formatDate(dateString: string): string {
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

/**
 * 🎯 Exporta un array de leads a un archivo Excel
 * @param leads - Array de leads a exportar
 * @param filename - Nombre del archivo (sin extensión)
 */
export function exportLeadsToExcel(leads: any[], filename: string = 'leads_dnbridge'): void {
  try {
    // Convertir leads a formato de exportación
    const exportData = leads.map(formatLeadForExport)

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
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(link)
    link.click()

    // Limpiar
    link.remove()
    globalThis.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al exportar a Excel:', error)
    throw new Error('Error al generar el archivo Excel')
  }
}

