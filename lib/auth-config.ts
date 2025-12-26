// 🎯 Purpose: Configuración de credenciales de administrador
// 🏗️ Architecture: Variables de entorno para seguridad
// 🔧 Support Notes: Las credenciales deben estar en .env.local
// 💡 Learning: Nunca hardcodear credenciales en el código

/**
 * 🔐 Credenciales de administrador
 * 
 * IMPORTANTE: Configura estas variables en tu archivo .env.local:
 * - ADMIN_USERNAME=tu_usuario
 * - ADMIN_PASSWORD=tu_password_seguro
 * 
 * Para producción, usa variables de entorno del hosting (Vercel, etc.)
 */
export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // ⚠️ Cambiar en producción
}

/**
 * 🎯 Verifica si las credenciales proporcionadas son válidas
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @returns true si las credenciales son correctas
 */
export function validateCredentials(username: string, password: string): boolean {
  return (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  )
}

