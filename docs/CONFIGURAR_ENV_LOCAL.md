# 📝 Configurar .env.local con Supabase

## Paso 1: Copiar las URLs de Supabase

En la pantalla de Supabase que estás viendo:

1. **Click en "Copy"** para copiar todo el contenido
2. O copia manualmente las dos URLs que aparecen

---

## Paso 2: Crear archivo `.env.local`

1. **En la raíz del proyecto** (donde está `package.json`), crea un archivo llamado `.env.local`

2. **Pega el contenido copiado** de Supabase

3. **Importante:** Reemplaza `[YOUR-PASSWORD]` con tu contraseña real de Supabase
   - Si no la recuerdas, puedes resetearla en Supabase: Settings → Database → Reset Database Password

---

## Paso 3: Ejemplo de archivo `.env.local`

Tu archivo debería verse así:

```env
# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.btenvywgcziemfmvqmhd:TU_PASSWORD_AQUI@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.btenvywgcziemfmvqmhd:TU_PASSWORD_AQUI@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
```

**⚠️ IMPORTANTE:** 
- Reemplaza `TU_PASSWORD_AQUI` con tu contraseña real
- Mantén las comillas dobles `"` alrededor de las URLs
- No agregues espacios extra

---

## Paso 4: Verificar que está correcto

Tu archivo `.env.local` debe tener:
- ✅ `DATABASE_URL` con puerto `6543` y `pgbouncer=true`
- ✅ `DIRECT_URL` con puerto `5432`
- ✅ Ambas con tu contraseña real (no `[YOUR-PASSWORD]`)

---

## Paso 5: Agregar Resend (Opcional)

Si también quieres configurar emails, agrega:

```env
# Resend API Key (para emails)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
```

---

## ✅ Listo!

Una vez configurado el `.env.local`:
1. Ejecuta `npx prisma generate`
2. Ejecuta `npx prisma db push`
3. ¡Ya está conectado!

---

**¿Necesitas ayuda con algún paso?** 🚀

