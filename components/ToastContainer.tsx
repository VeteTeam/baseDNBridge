'use client'

import Toast from './Toast'
import { useToast } from '@/contexts/ToastContext'

/**
 * 🎯 Purpose: Contenedor que renderiza todos los toasts activos
 * 🏗️ Architecture: Componente que usa el contexto de Toast
 * 🔧 Support Notes: Se posiciona en la esquina superior derecha
 * 💡 Learning: Renderiza múltiples toasts con espaciado vertical
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  )
}

