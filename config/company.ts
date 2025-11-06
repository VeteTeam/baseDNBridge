/**
 * Configuración centralizada de datos de la empresa
 * Actualiza estos valores para reflejar la información real de DNBridge
 */

export interface CompanyConfig {
  name: string
  email: string
  phone: string
  address: string
  socialMedia: {
    linkedin?: string
    twitter?: string
    github?: string
    instagram?: string
  }
}

export const companyConfig: CompanyConfig = {
  name: 'DNBridge',
  email: 'info@dnbridge.com',
  phone: '+1 (234) 567-890',
  address: 'Ciudad, País',
  socialMedia: {
    linkedin: 'https://linkedin.com/company/dnbridge',
    twitter: 'https://twitter.com/dnbridge',
    github: 'https://github.com/dnbridge',
    instagram: 'https://instagram.com/dnbridge',
  },
}

/**
 * Configuración de notificaciones
 */
export const notificationConfig = {
  // Email donde llegan las notificaciones de nuevos leads
  teamEmail: 'info@dnbridge.com',
  // Email de respuesta automática (opcional)
  autoReplyEmail: 'noreply@dnbridge.com',
}

