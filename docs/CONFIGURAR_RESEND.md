# 📧 Guía: Obtener API Key de Resend

## ¿Qué API Key necesitas?

Necesitas la **API Key de Resend** para enviar emails desde tu aplicación.

**Formato:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 📋 Paso a Paso para Obtenerla

### Paso 1: Crear cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Click en **"Sign Up"** o **"Get Started"**
3. Crea tu cuenta con:
   - Email
   - Contraseña
   - O usa Google/GitHub para registro rápido

---

### Paso 2: Verificar tu email

1. Revisa tu bandeja de entrada
2. Click en el link de verificación que te envió Resend
3. Confirma tu cuenta

---

### Paso 3: Ir a API Keys

1. Una vez dentro de Resend Dashboard
2. En el menú lateral, ve a **"API Keys"**
   - O ve directamente a: [https://resend.com/api-keys](https://resend.com/api-keys)

---

### Paso 4: Crear una nueva API Key

1. Click en **"Create API Key"** (botón verde)
2. Completa el formulario:
   - **Name:** `DNBridge Landing Page` (o el nombre que prefieras)
   - **Permission:** `Sending access` (solo enviar emails)
   - O `Full access` (si quieres más control)
3. Click en **"Add"** o **"Create"**

---

### Paso 5: Copiar la API Key

1. **⚠️ IMPORTANTE:** Resend te mostrará la API key **SOLO UNA VEZ**
2. Copia la API key completa (empieza con `re_`)
3. **Ejemplo:**
   ```
   re_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
   ```

4. **⚠️ Guárdala en un lugar seguro** porque no podrás verla de nuevo

---

### Paso 6: Agregar al archivo `.env.local`

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Agrega esta línea:
   ```env
   RESEND_API_KEY="re_tu-api-key-aqui"
   ```

3. **Ejemplo completo del archivo `.env.local`:**
   ```env
   DATABASE_URL="postgresql://postgres.btenvywgcziemfmvqmhd:dnbridge2025@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.btenvywgcziemfmvqmhd:dnbridge2025@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
   RESEND_API_KEY="re_AbCdEfGhIjKlMnOpQrStUvWxYz123456789"
   ```

4. **Guarda el archivo**

---

### Paso 7: Reiniciar el servidor

1. **Detén el servidor** si está corriendo (`Ctrl+C`)
2. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

3. Ahora las variables de entorno se cargarán correctamente

---

## ✅ Verificar que Funciona

1. Completa el formulario de contacto en tu landing page
2. Envía el formulario
3. **Deberías recibir:**
   - ✅ Email de notificación al equipo (en `info@dnbridge.com` o el email que configuraste)
   - ✅ Email de confirmación al cliente

4. **En la consola del servidor NO deberías ver:**
   - ❌ "RESEND_API_KEY no está configurada"
   - ✅ Deberías ver que el email se envió correctamente

---

## 🔍 Troubleshooting

### Error: "Invalid API key"

**Causa:** La API key está incorrecta o mal copiada

**Solución:**
- Verifica que copiaste la API key completa
- Asegúrate de que no hay espacios extra
- Verifica que las comillas `"` están correctas

### Error: "Domain not verified"

**Causa:** Estás intentando enviar desde un dominio no verificado

**Solución:**
- Resend permite enviar desde `onboarding@resend.dev` para pruebas
- O verifica tu dominio en Resend: Domains → Add Domain

### Los emails no llegan

**Causa común:** Spam o bloqueo

**Solución:**
- Revisa la carpeta de spam
- Verifica los logs en Resend Dashboard → Logs
- Asegúrate de que el email de destino es válido

---

## 📝 Configuración de Emails

En `config/company.ts`, puedes configurar:

```typescript
export const notificationConfig = {
  teamEmail: 'info@dnbridge.com', // Email donde recibes notificaciones
  autoReplyEmail: 'noreply@dnbridge.com', // Email desde el que se envían
}
```

**Nota:** Si no tienes dominio verificado, puedes usar `onboarding@resend.dev` temporalmente para pruebas.

---

## 💡 Tips

1. **Plan Gratuito:**
   - 3,000 emails/mes gratis
   - Suficiente para empezar

2. **Verificación de Dominio (Opcional pero recomendado):**
   - Agrega tu dominio en Resend
   - Configura los DNS records que te proporcionan
   - Emails más confiables y menos spam

3. **Pruebas:**
   - Usa `onboarding@resend.dev` para pruebas iniciales
   - Luego verifica tu dominio para producción

---

**¿Necesitas ayuda con algún paso?** 🚀

