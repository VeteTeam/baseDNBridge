# 🗄️ Guía de Configuración - Base de Datos y Emails

## 📋 Paso 1: Configurar Supabase (Base de Datos)

### Opción A: Supabase (Recomendado - Gratis)

1. **Crear cuenta en Supabase:**
   - Ve a [https://supabase.com](https://supabase.com)
   - Crea una cuenta gratuita

2. **Crear un nuevo proyecto:**
   - Click en "New Project"
   - Elige un nombre (ej: "dnbridge")
   - Elige una contraseña para la base de datos
   - Selecciona una región cercana
   - Click en "Create new project"

3. **Obtener la connection string:**
   - Ve a Settings → Database
   - Busca "Connection string" → "URI"
   - Copia la connection string (formato: `postgresql://postgres:[password]@[host]:5432/postgres`)

4. **Configurar variables de entorno:**
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Agrega:
   ```env
   DATABASE_URL="tu-connection-string-de-supabase"
   ```

### Opción B: PostgreSQL Local (Desarrollo)

Si prefieres usar PostgreSQL local:

```bash
# Instalar PostgreSQL (si no lo tienes)
# Windows: Descarga de https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# Crear base de datos
createdb dnbridge

# Connection string local
DATABASE_URL="postgresql://postgres:password@localhost:5432/dnbridge?schema=public"
```

---

## 📧 Paso 2: Configurar Resend (Emails)

### 1. Crear cuenta en Resend

- Ve a [https://resend.com](https://resend.com)
- Crea una cuenta gratuita (hasta 3,000 emails/mes gratis)

### 2. Verificar dominio (opcional pero recomendado)

- Ve a Domains → Add Domain
- Agrega tu dominio (ej: `dnbridge.com`)
- Configura los DNS records que te proporcionan
- Espera a que se verifique (puede tomar unos minutos)

### 3. Obtener API Key

- Ve a API Keys → Create API Key
- Elige un nombre (ej: "DNBridge Landing Page")
- Copia la API key (empieza con `re_`)

### 4. Configurar variables de entorno

- Agrega a tu `.env.local`:
```env
RESEND_API_KEY="re_tu-api-key-aqui"
```

### 5. Configurar email de origen

En `config/company.ts`, actualiza:
```typescript
export const notificationConfig = {
  teamEmail: 'info@dnbridge.com', // Email donde recibes notificaciones
  autoReplyEmail: 'noreply@dnbridge.com', // Email desde el que se envían (debe estar verificado en Resend)
}
```

**Nota:** Si no tienes dominio verificado, puedes usar el email de prueba de Resend temporalmente.

---

## 🚀 Paso 3: Ejecutar Migraciones de Prisma

Una vez configurada la base de datos:

```bash
# Generar Prisma Client
npx prisma generate

# Crear las tablas en la base de datos
npx prisma db push

# (Opcional) Ver la base de datos en Prisma Studio
npx prisma studio
```

---

## ✅ Paso 4: Verificar que Todo Funcione

1. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Prueba el formulario de contacto:**
   - Ve a `http://localhost:3000`
   - Completa el formulario
   - Envía el formulario

3. **Verifica:**
   - ✅ El lead se guarda en la base de datos
   - ✅ Recibes un email de notificación
   - ✅ El cliente recibe un email de confirmación

---

## 🔍 Verificar Base de Datos

### Con Prisma Studio (Recomendado):
```bash
npx prisma studio
```
Esto abre una interfaz web en `http://localhost:5555` donde puedes ver todos los leads.

### Con Supabase Dashboard:
- Ve a tu proyecto en Supabase
- Click en "Table Editor"
- Verás la tabla `leads` con todos los registros

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- Verifica que la `DATABASE_URL` sea correcta
- Asegúrate de que la base de datos esté corriendo (si es local)
- Verifica que tu IP esté permitida en Supabase (Settings → Database → Connection Pooling)

### Error: "RESEND_API_KEY is not defined"
- Verifica que hayas creado el archivo `.env.local`
- Asegúrate de que el archivo esté en la raíz del proyecto
- Reinicia el servidor de desarrollo después de agregar variables de entorno

### Error: "Email sending failed"
- Verifica que tu API key de Resend sea correcta
- Si usas dominio personalizado, asegúrate de que esté verificado
- Revisa los logs en Resend Dashboard → Logs

---

## 📝 Próximos Pasos

Una vez configurado:
- ✅ Los leads se guardan automáticamente
- ✅ Recibes notificaciones por email
- ✅ Los clientes reciben confirmación

**Siguiente paso opcional:** Crear dashboard admin para gestionar leads.

---

## 💡 Tips

- **Supabase es gratis hasta 500MB** de base de datos
- **Resend es gratis hasta 3,000 emails/mes**
- Puedes usar ambos servicios sin costo para empezar
- Cuando crezcas, ambos tienen planes flexibles

---

¿Necesitas ayuda con algún paso? ¡Déjame saber! 🚀

