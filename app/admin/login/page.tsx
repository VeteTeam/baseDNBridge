// 🎯 Purpose: Página de login para administradores
// 🏗️ Architecture: Client component con formulario de autenticación
// 🔧 Support Notes: Ruta oculta, solo conocida por el equipo
// 💡 Learning: Formulario controlado con manejo de errores y estados de carga

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schema de validación
const loginSchema = z.object({
  username: z.string().min(1, 'Usuario requerido'),
  password: z.string().min(1, 'Contraseña requerida'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Error al iniciar sesión')
      }

      // ✅ Login exitoso, redirigir a la página de leads
      router.push('/admin/leads')
      router.refresh() // Refrescar para actualizar el estado de autenticación
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue via-[#00a8cc] to-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              Panel de Administración
            </h1>
            <p className="text-medium-gray">Acceso restringido</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-primary-dark mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                {...register('username')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  errors.username
                    ? 'border-red-500'
                    : 'border-medium-gray focus:border-primary-blue'
                } focus:outline-none focus:ring-2 focus:ring-primary-blue/20`}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-dark mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-medium-gray focus:border-primary-blue'
                } focus:outline-none focus:ring-2 focus:ring-primary-blue/20`}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Error general */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-blue text-primary-dark px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:bg-[#00b8e6] hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 mt-6 text-sm">
          DNBridge - Panel Administrativo
        </p>
      </div>
    </div>
  )
}

