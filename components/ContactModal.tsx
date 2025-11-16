'use client'

import { useEffect } from 'react'
import ContactForm, { ContactFormData } from './ContactForm'

interface ContactModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (data: ContactFormData) => Promise<void>
}

export default function ContactModal({ isOpen, onClose, onSubmit }: ContactModalProps) {
  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSuccess = () => {
    // Mostrar mensaje de éxito y cerrar después de un delay
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity border-0 p-0 cursor-pointer"
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        aria-label="Cerrar modal"
      />

      {/* Modal */}
      <div className="relative bg-color-1 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-color-1 border-b-2 border-medium-gray px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Contactanos</h2>
            <p className="text-sm text-dark-gray mt-1">
              Completa el formulario y nos pondremos en contacto contigo pronto
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-light-gray hover:bg-medium-gray transition-colors flex items-center justify-center text-primary-dark hover:text-primary-blue"
            aria-label="Cerrar modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <ContactForm onSubmit={onSubmit} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}

