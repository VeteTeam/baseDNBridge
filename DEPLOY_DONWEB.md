# 🚀 Guía de Deploy en DonWeb/Ferozo

## ✅ Pasos Completados

- [x] Repositorio Git configurado
- [x] Código clonado en `public_html/`
- [x] Archivo `.env` creado con variables de entorno
- [x] `next.config.js` actualizado con `output: 'standalone'`

## 📋 Próximos Pasos

### 1. Hacer Commit y Push de los Cambios

Primero, sube los cambios al repositorio:

```bash
git add next.config.js
git commit -m "Add standalone output for DonWeb hosting"
git push origin main
```

Esto activará el auto-deploy de Ferozo.

### 2. Configurar Webhook en GitHub (Si aún no lo hiciste)

1. Ve a: `https://github.com/VeteTeam/baseDNBridge`
2. **Settings** → **Webhooks** → **Add webhook**
3. Configura:
   - **Payload URL**: `https://ferozo.host/deploy/git/29fa4dbef841c71e7221aff115a7581b`
   - **Content type**: `application/json`
   - **Events**: "Just the push event"
   - **Active**: ✅ marcado
4. Click en **Add webhook**

### 3. Ejecutar Comandos de Build

Ferozo puede hacer `git pull` automáticamente, pero puede que no ejecute los comandos de build. Tienes dos opciones:

#### Opción A: Panel de Hosting (Recomendado)

1. Ve al **Panel de Hosting** en DonWeb/Ferozo
2. Ingresa con tus credenciales:
   - URL: `https://ferozo.host`
   - Usuario: `c2662035`
   - Contraseña: `vedamu35MI`
3. Busca una opción de **Terminal** o **SSH**
4. Ejecuta estos comandos:

```bash
cd public_html
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
```

#### Opción B: Contactar a Soporte de Ferozo

Pregunta si pueden configurar comandos post-deploy automáticos:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
```

### 4. Iniciar la Aplicación

Después del build, necesitas iniciar la aplicación. Opciones:

#### Con PM2 (Si está disponible):

```bash
cd public_html
npm install -g pm2
pm2 start .next/standalone/server.js --name dnbridge
pm2 save
pm2 startup
```

#### Con Node directamente:

```bash
cd public_html
node .next/standalone/server.js
```

**Nota**: Si usas Node directamente, el proceso se detendrá al cerrar la terminal. PM2 es mejor para producción.

### 5. Configurar el Dominio

En el panel de DonWeb:
1. Ve a **"Dominios configurados"**
2. Agrega `dnbridge.site`
3. Si el dominio está en Cloudflare, configura un registro **A** o **CNAME** apuntando a la IP del hosting

### 6. Verificar que Todo Funciona

- [ ] La app carga en el navegador (`dnbridge.site`)
- [ ] Las rutas API responden (`/api/contact`)
- [ ] La base de datos conecta (revisa logs)
- [ ] Los emails se envían correctamente

## 🔧 Comandos Útiles para Debugging

```bash
# Ver logs de la aplicación (si usas PM2)
pm2 logs dnbridge

# Ver estado de la aplicación
pm2 status

# Reiniciar aplicación
pm2 restart dnbridge

# Verificar conexión a BD
npx prisma db pull

# Ver variables de entorno (sin mostrar valores sensibles)
printenv | grep -E "DATABASE|GMAIL|NODE|PORT"
```

## ⚠️ Problemas Comunes

### Error: "Node.js no encontrado"
- Verifica la versión de Node.js (Next.js 15 requiere Node 18.17+)
- Contacta a soporte de DonWeb si necesitas actualizar Node.js

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` en `.env` esté correcta
- Verifica que Supabase esté activo y accesible

### Error: "Port 3000 already in use"
- Cambia el `PORT` en el `.env` a otro puerto (ej: 3001)
- O detén el proceso que está usando el puerto 3000

### La app no carga en el navegador
- Verifica que el proceso Node.js esté corriendo
- Verifica la configuración del dominio
- Revisa los logs para ver errores

## 📝 Checklist Final

- [ ] `next.config.js` actualizado con `output: 'standalone'`
- [ ] Cambios commiteados y pusheados a GitHub
- [ ] Webhook configurado en GitHub
- [ ] Comandos de build ejecutados (`npm install`, `npm run build`)
- [ ] Aplicación iniciada (PM2 o Node)
- [ ] Dominio configurado
- [ ] Todo funciona correctamente

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema, revisa:
1. Los logs del servidor
2. Los logs de la aplicación (PM2 logs)
3. El archivo `lastgit-raiz.log` en `public_html/` para ver el estado del último deploy

