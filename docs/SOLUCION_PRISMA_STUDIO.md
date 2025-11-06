# 🔧 Solución: Prisma Studio no encuentra variables de entorno

## Problema

Prisma Studio no encuentra `DATABASE_URL` aunque el archivo `.env.local` existe.

## Solución: Ejecutar Prisma Studio con variables cargadas

### Opción 1: Usar dotenv (Recomendado)

1. Instala dotenv-cli:
   ```bash
   npm install -D dotenv-cli
   ```

2. Ejecuta Prisma Studio con:
   ```bash
   npx dotenv -e .env.local -- npx prisma studio
   ```

### Opción 2: Establecer variables manualmente en PowerShell

```powershell
$env:DATABASE_URL="postgresql://postgres.btenvywgcziemfmvqmhd:dnbridge2025@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
$env:DIRECT_URL="postgresql://postgres.btenvywgcziemfmvqmhd:dnbridge2025@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
npx prisma studio
```

### Opción 3: Usar Supabase Dashboard (Más fácil)

1. Ve a tu proyecto en Supabase
2. Click en "Table Editor" en el menú lateral
3. Selecciona la tabla `leads`
4. Verás todos tus leads sin necesidad de Prisma Studio

---

## ✅ Verificación

Para verificar que los leads se están guardando:

### Opción A: Supabase Dashboard (Más fácil)
- Ve a Supabase → Table Editor → leads
- Ahí verás todos los leads guardados

### Opción B: Prisma Studio (con dotenv)
```bash
npx dotenv -e .env.local -- npx prisma studio
```

---

## Nota

Next.js **SÍ** está leyendo las variables correctamente (por eso el formulario funciona). El problema es solo con Prisma Studio que necesita ayuda para cargar las variables.

---

**¿Prefieres usar Supabase Dashboard o instalar dotenv-cli?** 🚀

