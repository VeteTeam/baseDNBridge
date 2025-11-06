# 🔌 Guía Rápida: Conectar Supabase

## Paso 1: Obtener Connection String de Supabase

1. **Ve a tu proyecto en Supabase:**
   - Abre [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Selecciona tu proyecto

2. **Ve a Settings → Database:**
   - En el menú lateral, click en "Settings" (⚙️)
   - Click en "Database"

3. **Busca "Connection string":**
   - Scroll hacia abajo hasta "Connection string"
   - Verás varias opciones, busca **"URI"** o **"Connection string"**

4. **Copia la connection string:**
   - Debería verse algo como:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
   - **IMPORTANTE:** Reemplaza `[YOUR-PASSWORD]` con la contraseña que configuraste al crear el proyecto
   - Si no recuerdas la contraseña, puedes resetearla en Settings → Database → Database Password

5. **Agrega el schema al final:**
   - Agrega `?schema=public` al final de la connection string
   - Resultado final:
   ```
   postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public
   ```

---

## Paso 2: Crear archivo .env.local

1. **En la raíz del proyecto**, crea un archivo llamado `.env.local`
   - Si estás en VS Code, puedes crear el archivo directamente
   - O desde terminal: `touch .env.local` (Mac/Linux) o crear manualmente en Windows

2. **Agrega la connection string:**
   ```env
   DATABASE_URL="postgresql://postgres:TU_PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public"
   ```

3. **Ejemplo completo del archivo:**
   ```env
   # Base de Datos Supabase
   DATABASE_URL="postgresql://postgres:MiPassword123@db.abcdefghijklmnop.supabase.co:5432/postgres?schema=public"
   
   # Resend (Configurar después si quieres emails)
   # RESEND_API_KEY="re_xxxxxxxxxxxxx"
   ```

---

## Paso 3: Generar Prisma Client

Ejecuta en la terminal:

```bash
npx prisma generate
```

Esto crea el cliente TypeScript de Prisma basado en tu schema.

---

## Paso 4: Crear las tablas en Supabase

Ejecuta:

```bash
npx prisma db push
```

Esto crea la tabla `leads` en tu base de datos de Supabase.

**¿Qué hace este comando?**
- Lee tu `prisma/schema.prisma`
- Crea la tabla `leads` con todos los campos
- Configura los índices
- No requiere migraciones formales (más rápido para empezar)

---

## Paso 5: Verificar que funcionó

### Opción A: Prisma Studio (Recomendado)

```bash
npx prisma studio
```

Esto abre una interfaz web en `http://localhost:5555` donde puedes:
- Ver tus leads
- Agregar datos manualmente
- Editar registros
- Ver la estructura de la tabla

### Opción B: Supabase Dashboard

1. Ve a tu proyecto en Supabase
2. Click en "Table Editor" en el menú lateral
3. Deberías ver la tabla `leads` creada

---

## Paso 6: Probar el formulario

1. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Ve a tu landing page:**
   - Abre `http://localhost:3000`
   - Completa el formulario de contacto
   - Envía el formulario

3. **Verifica que se guardó:**
   - Abre Prisma Studio: `npx prisma studio`
   - O ve a Supabase Dashboard → Table Editor
   - Deberías ver el nuevo lead en la tabla `leads`

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"

**Causas comunes:**
1. La connection string está mal
2. La contraseña está incorrecta
3. El proyecto de Supabase está pausado

**Soluciones:**
- Verifica que la connection string tenga el formato correcto
- Verifica la contraseña en Supabase Settings → Database
- Asegúrate de que el proyecto esté activo (no pausado)

### Error: "Schema does not exist"

**Solución:**
- Asegúrate de agregar `?schema=public` al final de la DATABASE_URL

### Error: "Password authentication failed"

**Solución:**
- Verifica que la contraseña en la connection string sea correcta
- Puedes resetear la contraseña en Supabase Settings → Database → Reset Database Password

### Error: "Connection pooler"

**Solución:**
- Si usas Connection Pooling, usa el connection string de "Session mode" no "Transaction mode"
- O usa el connection string directo (sin pooler)

---

## ✅ Verificación Final

Si todo funciona correctamente:
- ✅ Prisma Studio se conecta a Supabase
- ✅ Puedes ver la tabla `leads` en Supabase Dashboard
- ✅ El formulario guarda leads correctamente
- ✅ Los leads aparecen en la base de datos

---

## 📝 Próximos Pasos

Una vez conectado:
1. ✅ Configurar Resend para emails (opcional)
2. ✅ Probar el formulario completo
3. ✅ Crear dashboard admin (opcional)

---

**¿Necesitas ayuda con algún paso?** ¡Déjame saber! 🚀

