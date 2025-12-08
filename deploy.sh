#!/bin/bash
# 🎯 Script de deploy para DonWeb/Ferozo
# 🔧 Support Notes: Ejecutar después de cada git pull o deploy automático

echo "🚀 Iniciando deploy de DNBridge..."

# 1. Instalar/actualizar dependencias
echo "📦 Instalando dependencias..."
npm install --production

# 2. Generar Prisma Client
echo "🗄️ Generando Prisma Client..."
npx prisma generate

# 3. Ejecutar migraciones (si es necesario)
echo "🔄 Ejecutando migraciones..."
npx prisma migrate deploy || npx prisma db push

# 4. Build del proyecto
echo "🏗️ Construyendo proyecto..."
npm run build

# 5. Verificar que el build fue exitoso
if [ -d ".next/standalone" ]; then
    echo "✅ Build completado exitosamente!"
    echo "📍 Archivos generados en: .next/standalone/"
else
    echo "❌ Error: El build no generó la carpeta .next/standalone"
    exit 1
fi

echo "✅ Deploy completado!"
echo "💡 Para iniciar la aplicación, ejecuta:"
echo "   node .next/standalone/server.js"

