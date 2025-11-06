'use client'

import { useState } from 'react'
import { ContactFormData } from '@/components/ContactForm'

export function useContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const submitContact = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al enviar el formulario')
      }

      return await response.json()
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isOpen,
    openModal,
    closeModal,
    submitContact,
    isSubmitting,
  }
}

