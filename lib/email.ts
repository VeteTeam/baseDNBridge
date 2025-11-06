import { Resend } from 'resend'
import { companyConfig, notificationConfig } from '@/config/company'

// Inicializar Resend solo si hay API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

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
 * Envía email de notificación al equipo cuando llega un nuevo lead
 */
export async function sendLeadNotificationEmail(leadData: LeadEmailData) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY no está configurada. Email no enviado.')
    return null
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `DNBridge <${notificationConfig.autoReplyEmail || 'noreply@dnbridge.com'}>`,
      to: [notificationConfig.teamEmail],
      subject: `🎯 Nuevo Lead: ${leadData.name} - ${leadData.projectType}`,
      html: generateLeadEmailHTML(leadData),
      reply_to: leadData.email,
    })

    if (error) {
      console.error('Error al enviar email de notificación:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error en sendLeadNotificationEmail:', error)
    throw error
  }
}

/**
 * Envía email de confirmación al cliente
 */
export async function sendConfirmationEmailToLead(leadData: LeadEmailData) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY no está configurada. Email no enviado.')
    return null
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${companyConfig.name} <${notificationConfig.autoReplyEmail || 'noreply@dnbridge.com'}>`,
      to: [leadData.email],
      subject: 'Gracias por contactarnos - DNBridge',
      html: generateConfirmationEmailHTML(leadData),
    })

    if (error) {
      console.error('Error al enviar email de confirmación:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error en sendConfirmationEmailToLead:', error)
    throw error
  }
}

/**
 * Genera el HTML del email de notificación para el equipo
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
            <div class="field-value">${leadData.message.replace(/\n/g, '<br>')}</div>
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
 * Genera el HTML del email de confirmación para el cliente
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

