'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { ToastType } from '@/components/Toast'

// 🎯 Purpose: Define la estructura de un toast en el estado
interface ToastState {
  id: string
  message: string
  type: ToastType
  duration?: number
}

// 🎯 Purpose: Define el tipo del contexto
interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  toasts: ToastState[]
  removeToast: (id: string) => void
}

// Crear el contexto
const ToastContext = createContext<ToastContextType | undefined>(undefined)

/**
 * 🎯 Purpose: Provider del contexto de Toast
 * 🏗️ Architecture: Context API de React para estado global
 * 🔧 Support Notes: Permite usar toast desde cualquier componente
 * 💡 Learning: Context API para compartir estado sin prop drilling
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback(
    (message: string, type: ToastType = 'success', duration?: number) => {
      const id = Math.random().toString(36).substring(7)
      setToasts((prev) => [...prev, { id, message, type, duration }])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

/**
 * 🎯 Purpose: Hook para usar el contexto de Toast
 * 💡 Learning: Custom hook que valida que el contexto esté disponible
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast debe usarse dentro de un ToastProvider')
  }
  return context
}

