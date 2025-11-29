import nodemailer from 'nodemailer'
import { companyConfig, notificationConfig } from '@/config/company'

// 🎯 Purpose: Configurar el transporter de nodemailer para Gmail SMTP
// 🏗️ Architecture: Singleton pattern para reutilizar la conexión SMTP
// 🔧 Support Notes: Las credenciales vienen de variables de entorno por seguridad

// Crear transporter de nodemailer con configuración de Gmail
const createTransporter = () => {
  // Validar que tenemos las credenciales necesarias
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('⚠️ GMAIL_USER o GMAIL_APP_PASSWORD no están configuradas. Emails no se enviarán.')
    return null
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.GMAIL_USER, // Tu email de Gmail completo
      pass: process.env.GMAIL_APP_PASSWORD, // Contraseña de aplicación (16 caracteres)
    },
    // Opciones adicionales para mejor compatibilidad
    tls: {
      rejectUnauthorized: false, // Útil en desarrollo, considera true en producción
    },
  })
}

// Singleton: crear transporter una sola vez y reutilizarlo
let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  transporter ??= createTransporter()
  return transporter
}

interface LeadEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  projectType: string
  message: string
  budget?: string
}

/**
 * 🎯 Purpose: Envía email de notificación al equipo cuando llega un nuevo lead
 * 🏗️ Architecture: Usa nodemailer con Gmail SMTP
 * 🔧 Support Notes: Si falla, registra el error pero no bloquea la respuesta del API
 */
export async function sendLeadNotificationEmail(leadData: LeadEmailData) {
  const mailTransporter = getTransporter()
  
  if (!mailTransporter) {
    console.warn('⚠️ Transporter de email no disponible. Email no enviado.')
    return null
  }

  try {
    const info = await mailTransporter.sendMail({
      from: `"${companyConfig.name}" <${process.env.GMAIL_USER}>`, // Remitente
      to: notificationConfig.teamEmail, // Destinatario (tu equipo)
      replyTo: leadData.email, // Para que puedas responder directamente al lead
      subject: `🎯 Nuevo Lead: ${leadData.name} - ${leadData.projectType}`,
      html: generateLeadEmailHTML(leadData),
      // Opcional: versión en texto plano para clientes de email que no soportan HTML
      text: generateLeadEmailText(leadData),
    })

    console.log('✅ Email de notificación enviado:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Error en sendLeadNotificationEmail:', error)
    throw error
  }
}

/**
 * 🎯 Purpose: Envía email de confirmación al cliente
 * 🏗️ Architecture: Usa nodemailer con Gmail SMTP
 * 🔧 Support Notes: Email automático de confirmación para mejorar UX
 */
export async function sendConfirmationEmailToLead(leadData: LeadEmailData) {
  const mailTransporter = getTransporter()
  
  if (!mailTransporter) {
    console.warn('⚠️ Transporter de email no disponible. Email no enviado.')
    return null
  }

  try {
    const info = await mailTransporter.sendMail({
      from: `"${companyConfig.name}" <${process.env.GMAIL_USER}>`,
      to: leadData.email, // Email del cliente que llenó el formulario
      subject: 'Gracias por contactarnos - DNBridge',
      html: generateConfirmationEmailHTML(leadData),
      text: generateConfirmationEmailText(leadData),
    })

    console.log('✅ Email de confirmación enviado:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Error en sendConfirmationEmailToLead:', error)
    throw error
  }
}

/**
 * 🎯 Purpose: Genera versión en texto plano del email (fallback para clientes sin HTML)
 * 💡 Learning: Siempre incluir versión texto plano mejora la compatibilidad
 */
function generateLeadEmailText(leadData: LeadEmailData): string {
  return `
🎯 Nuevo Lead Recibido

Un nuevo cliente potencial se ha contactado:

Nombre: ${leadData.name}
Email: ${leadData.email}
${leadData.phone ? `Teléfono: ${leadData.phone}` : ''}
${leadData.company ? `Empresa: ${leadData.company}` : ''}
Tipo de Proyecto: ${leadData.projectType}
${leadData.budget ? `Presupuesto: ${leadData.budget}` : ''}

Mensaje:
${leadData.message}

---
Este email fue generado automáticamente por el sistema de DNBridge.
  `.trim()
}

/**
 * 🎯 Purpose: Genera versión en texto plano del email de confirmación
 */
function generateConfirmationEmailText(leadData: LeadEmailData): string {
  return `
¡Gracias por contactarnos!

Hola ${leadData.name},

Gracias por contactar a DNBridge. Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.

Tipo de proyecto: ${leadData.projectType}
Mensaje: ${leadData.message}

Nuestro equipo revisará tu solicitud y te contactará en las próximas 24-48 horas.

Si tienes alguna pregunta urgente, no dudes en contactarnos directamente:
Email: ${companyConfig.email}
Teléfono: ${companyConfig.phone}

Saludos cordiales,
El equipo de DNBridge
  `.trim()
}

/**
 * 🎯 Purpose: Genera el HTML del email de notificación para el equipo
 * 💡 Learning: Mantenemos el mismo diseño visual que tenías con Resend
 */
function generateLeadEmailHTML(leadData: LeadEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #0a2540 0%, #1a365d 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f6f9fc;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #00d4ff;
        }
        .field-label {
          font-weight: 600;
          color: #0a2540;
          margin-bottom: 5px;
        }
        .field-value {
          color: #425466;
        }
        .badge {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          background: #00d4ff;
          color: #0a2540;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Nuevo Lead Recibido</h1>
          <p>Un nuevo cliente potencial se ha contactado</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Nombre</div>
            <div class="field-value">${leadData.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${leadData.email}">${leadData.email}</a></div>
          </div>
          
          ${leadData.phone ? `
          <div class="field">
            <div class="field-label">Teléfono</div>
            <div class="field-value"><a href="tel:${leadData.phone}">${leadData.phone}</a></div>
          </div>
          ` : ''}
          
          ${leadData.company ? `
          <div class="field">
            <div class="field-label">Empresa</div>
            <div class="field-value">${leadData.company}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Tipo de Proyecto</div>
            <div class="field-value"><span class="badge">${leadData.projectType}</span></div>
          </div>
          
          ${leadData.budget ? `
          <div class="field">
            <div class="field-label">Presupuesto Estimado</div>
            <div class="field-value">${leadData.budget}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Mensaje</div>
            <div class="field-value">${leadData.message.replaceAll('\n', '<br>')}</div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e6ebf1; text-align: center;">
            <p style="color: #425466; font-size: 14px;">
              Este email fue generado automáticamente por el sistema de DNBridge.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * 🎯 Purpose: Genera el HTML del email de confirmación para el cliente
 */
function generateConfirmationEmailHTML(leadData: LeadEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #0a2540 0%, #1a365d 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f6f9fc;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .message {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #00d4ff;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #00d4ff;
          color: #0a2540;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Gracias por contactarnos!</h1>
          <p>Hemos recibido tu solicitud</p>
        </div>
        <div class="content">
          <p>Hola <strong>${leadData.name}</strong>,</p>
          
          <p>Gracias por contactar a <strong>DNBridge</strong>. Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.</p>
          
          <div class="message">
            <p><strong>Tipo de proyecto:</strong> ${leadData.projectType}</p>
            <p><strong>Mensaje:</strong> ${leadData.message}</p>
          </div>
          
          <p>Nuestro equipo revisará tu solicitud y te contactará en las próximas 24-48 horas.</p>
          
          <p>Si tienes alguna pregunta urgente, no dudes en contactarnos directamente:</p>
          <ul>
            <li>Email: <a href="mailto:${companyConfig.email}">${companyConfig.email}</a></li>
            <li>Teléfono: <a href="tel:${companyConfig.phone.replace(/\s/g, '')}">${companyConfig.phone}</a></li>
          </ul>
          
          <p style="margin-top: 30px;">
            Saludos cordiales,<br>
            <strong>El equipo de DNBridge</strong>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
