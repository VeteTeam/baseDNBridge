'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(3, 'Por favor especifica el tipo de proyecto (mínimo 3 caracteres)'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  budget: z.string().optional(),
  website: z.string().max(0, 'Este campo debe estar vacío').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  onSuccess?: () => void
}

export default function ContactForm({ onSubmit, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onFormSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)
      await onSubmit(data)
      reset()
      
      showToast(
        '¡Mensaje enviado exitosamente! Te responderemos pronto.',
        'success',
        5000
      )
      
      onSuccess?.()
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error al enviar el formulario. Por favor intenta de nuevo.'
      
      setSubmitError(errorMessage)
      
      showToast(errorMessage, 'error', 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <input
        type="text"
        {...register('website')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary-dark mb-2">
          Nombre completo <span className="text-accent-orange">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-black ${
            errors.name ? 'border-red-500' : 'border-medium-gray focus:border-primary-blue'
          } focus:outline-none focus:ring-2 focus:ring-primary-blue/20`}
          placeholder="Juan Pérez"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary-dark mb-2">
          Email <span className="text-accent-orange">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-black ${
            errors.email ? 'border-red-500' : 'border-medium-gray focus:border-primary-blue'
          } focus:outline-none focus:ring-2 focus:ring-primary-blue/20`}
          placeholder="juan@empresa.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary-dark mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="w-full px-4 py-3 rounded-lg border-2 border-medium-gray focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-black"
            placeholder="+1 (234) 567-890"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-primary-dark mb-2">
            Empresa/Organización
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="w-full px-4 py-3 rounded-lg border-2 border-medium-gray focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-black"
            placeholder="Mi Empresa S.A."
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-primary-dark mb-2">
          Tipo de proyecto <span className="text-accent-orange">*</span>
        </label>
        <input
          type="text"
          id="projectType"
          {...register('projectType')}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-black ${
            errors.projectType ? 'border-red-500' : 'border-medium-gray focus:border-primary-blue'
          } focus:outline-none focus:ring-2 focus:ring-primary-blue/20`}
          placeholder="Ej: Gestor para inmobiliaria, App móvil, Sistema de facturación..."
        />
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary-dark mb-2">
          Mensaje <span className="text-accent-orange">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none text-black ${
            errors.message ? 'border-red-500' : 'border-medium-gray focus:border-primary-blue'
          } focus:outline-none focus:ring-2 focus:ring-primary-blue/20`}
          placeholder="Cuéntanos sobre tu proyecto..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-blue text-primary-dark px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:bg-[#00b8e6] hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <i className="fas fa-spinner fa-spin"></i>
            Enviando...
          </span>
        ) : (
          'Enviar Solicitud'
        )}
      </button>
    </form>
  )
}

