# 📋 Plan de Implementación - Sistema de Captura de Leads

## 🎯 Objetivo
Crear un sistema completo para que nuevos clientes puedan contactarse con DNBridge desde la landing page.

---

## 📊 Fase 1: Centralización de Datos (Día 1)

### ¿Qué hacemos?
Extraer todos los datos hardcoded a un archivo de configuración centralizado.

### Archivos a crear:
- `config/company.ts` - Datos de empresa (email, teléfono, ubicación, redes sociales)
- `config/content.ts` - Contenido reutilizable (testimonios, FAQs, servicios)

### Beneficios:
- ✅ Fácil mantenimiento
- ✅ Un solo lugar para actualizar datos
- ✅ Preparado para CMS en el futuro

---

## 🎨 Fase 2: Crear Formulario de Contacto (Día 1-2)

### ¿Qué hacemos?
Crear un componente de formulario de contacto profesional con:

### Campos necesarios:
- Nombre completo
- Email
- Teléfono (opcional)
- Empresa/Organización
- Tipo de proyecto (Health Tech, General, etc.)
- Mensaje/Descripción del proyecto
- Presupuesto estimado (opcional)

### Componentes a crear:
- `components/ContactForm.tsx` - Formulario principal
- `components/ContactModal.tsx` - Modal/Drawer para mostrar el formulario
- Hook personalizado: `hooks/useContactForm.ts` - Lógica del formulario

### Validación:
- Email válido
- Campos requeridos
- Sanitización de inputs
- Protección XSS

---

## 🔧 Fase 3: Backend - API Routes (Día 2-3)

### Opción A: Next.js API Routes (Recomendado para empezar)
**Ventajas:**
- ✅ Todo en un proyecto
- ✅ Sin servidor separado
- ✅ Fácil deployment
- ✅ Gratis en Vercel

**Estructura:**
```
app/
  api/
    contact/
      route.ts  # POST /api/contact
```

### Opción B: Backend Separado (Node.js/Express o Go)
**Ventajas:**
- ✅ Más escalable
- ✅ Mejor separación de concerns
- ✅ Puede servir múltiples frontends

**Cuándo usar:**
- Si planeas tener múltiples aplicaciones
- Si necesitas más control del servidor

### Recomendación inicial:
**Empezar con Next.js API Routes** - Es más rápido y suficiente para landing pages.

---

## 💾 Fase 4: Base de Datos (Día 3-4)

### Opción A: PostgreSQL + Prisma (Recomendado)
**Ventajas:**
- ✅ Type-safe con TypeScript
- ✅ Migraciones automáticas
- ✅ ORM potente
- ✅ Gratis en Supabase/Neon

**Setup:**
```bash
npm install @prisma/client prisma
npx prisma init
```

### Opción B: MongoDB + Mongoose
**Ventajas:**
- ✅ Flexible (schema-less)
- ✅ Fácil de usar
- ✅ Gratis en MongoDB Atlas

**Cuándo usar:**
- Si necesitas documentos JSON complejos
- Si prefieres NoSQL

### Opción C: Supabase (Todo-en-uno)
**Ventajas:**
- ✅ PostgreSQL + Auth + Storage
- ✅ Dashboard incluido
- ✅ API REST automática
- ✅ Gratis hasta 500MB

### Recomendación:
**Supabase** - Es la opción más completa y fácil de empezar.

### Schema de Base de Datos:
```prisma
model Lead {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  company     String?
  projectType String   // "Health Tech" | "General" | "Other"
  message     String
  budget      String?
  source      String   // "landing-page" | "contact-form" | etc.
  status      String   @default("new") // "new" | "contacted" | "qualified" | "closed"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 📧 Fase 5: Sistema de Notificaciones (Día 4-5)

### Opción A: Resend (Recomendado)
**Ventajas:**
- ✅ API simple
- ✅ Gratis hasta 3,000 emails/mes
- ✅ Diseño con React Email
- ✅ Excelente para startups

**Setup:**
```bash
npm install resend
```

### Opción B: Nodemailer + SMTP
**Ventajas:**
- ✅ Más control
- ✅ Gratis si tienes SMTP propio
- ✅ Más flexible

**Cuándo usar:**
- Si ya tienes servidor SMTP
- Si necesitas más control

### Opción C: SendGrid / Mailgun
**Ventajas:**
- ✅ Muy escalable
- ✅ Analytics avanzados
- ✅ Planes desde $15/mes

### Emails a enviar:
1. **Email al equipo** - Notificación de nuevo lead
2. **Email al cliente** - Confirmación de recepción (opcional pero recomendado)

---

## 🛡️ Fase 6: Seguridad y Protección (Día 5)

### Implementar:
1. **Rate Limiting** - Máximo X envíos por IP/hora
2. **reCAPTCHA v3** (Opcional pero recomendado)
3. **Honeypot** - Campo oculto para bots
4. **Validación en backend** - Nunca confiar solo en frontend
5. **Sanitización** - Prevenir XSS e inyección SQL

### Librerías:
```bash
npm install zod  # Validación de schemas
npm install rate-limiter-flexible  # Rate limiting
```

---

## 📊 Fase 7: Dashboard Admin (Opcional pero recomendado) (Día 6-7)

### Funcionalidades básicas:
- Ver lista de leads
- Filtrar por status
- Buscar leads
- Marcar como "contactado", "calificado", etc.
- Exportar a CSV
- Estadísticas básicas

### Opciones:
1. **Página simple en Next.js** - Más rápido
2. **Panel en `/admin`** - Protegido con autenticación
3. **Usar Shadcn UI** - Componentes bonitos y profesionales

### Autenticación:
- NextAuth.js (simple)
- Clerk (más features)
- Supabase Auth (si usas Supabase)

---

## 🚀 Plan de Implementación Recomendado

### Semana 1: MVP (Minimal Viable Product)
**Día 1-2:**
- ✅ Centralizar datos
- ✅ Crear formulario de contacto
- ✅ Implementar modal

**Día 3-4:**
- ✅ API Route básica
- ✅ Base de datos (Supabase)
- ✅ Guardar leads

**Día 5:**
- ✅ Notificaciones por email (Resend)
- ✅ Validación y seguridad básica

**Resultado:** Sistema funcional que captura leads y envía emails.

---

### Semana 2: Mejoras (Opcional)
**Día 6-7:**
- ✅ Dashboard admin básico
- ✅ Rate limiting
- ✅ reCAPTCHA
- ✅ Email de confirmación al cliente

**Día 8-9:**
- ✅ Analytics básicos
- ✅ Exportación de leads
- ✅ Mejoras UX

---

## 📦 Stack Tecnológico Recomendado

### Frontend (Ya tenemos):
- ✅ Next.js 14
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ React Hook Form (para formularios)

### Backend:
- ✅ Next.js API Routes
- ✅ Prisma ORM
- ✅ Supabase (PostgreSQL)

### Notificaciones:
- ✅ Resend (emails)

### Validación:
- ✅ Zod (validación de schemas)

### Seguridad:
- ✅ rate-limiter-flexible
- ✅ reCAPTCHA v3 (opcional)

### Dashboard (opcional):
- ✅ Shadcn UI
- ✅ NextAuth.js

---

## 🎯 Próximos Pasos Inmediatos

1. **¿Comenzamos con Fase 1?** - Centralizar datos
2. **¿O prefieres que cree el formulario primero?** - Más visual
3. **¿Qué opción de base de datos prefieres?** - Supabase (recomendado) o PostgreSQL tradicional

---

## 💡 Consideraciones Adicionales

### Para Health Tech:
- ✅ Cumplimiento GDPR/HIPAA en almacenamiento de datos
- ✅ Encriptación de datos sensibles
- ✅ Política de privacidad clara
- ✅ Consentimiento explícito

### Escalabilidad:
- Si creces mucho, puedes migrar a:
  - Backend separado (Node.js/Go)
  - Queue system para emails (Bull/BullMQ)
  - CRM profesional (HubSpot, Salesforce)

---

## ❓ Preguntas para Decidir

1. **¿Prefieres empezar rápido con Supabase o configuración más manual?**
2. **¿Quieres dashboard admin desde el inicio o después?**
3. **¿Presupuesto para servicios?** (Supabase y Resend tienen planes gratuitos buenos)
4. **¿Necesitas integración con CRM existente?** (HubSpot, Salesforce, etc.)

---

**¿Por dónde empezamos?** 🚀

