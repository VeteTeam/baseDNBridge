'use client'

import ContactModal from './ContactModal'
import { useContactModal } from '@/hooks/useContactModal'

export default function CTA() {
  const { isOpen, openModal, closeModal, submitContact } = useContactModal()

  return (
    <section className="relative py-24 bg-gradient-to-br from-primary-dark to-[#1a365d] text-white text-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[30%] w-96 h-96 bg-primary-blue/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-[30%] w-96 h-96 bg-accent-orange/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          ¿Listo para comenzar tu próximo proyecto?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/85 leading-relaxed">
          Contáctanos hoy mismo para una reunión y descubre cómo podemos ayudar a hacer realidad tu 
          idea. Nuestro equipo está listo para transformar tu visión en realidad, especialmente si 
          trabajas en Health Tech.
        </p>
        <button
          onClick={openModal}
          className="bg-primary-blue text-primary-dark px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:bg-[#00b8e6] hover:-translate-y-1 hover:shadow-xl"
        >
          Solicitar Reunión
        </button>
      </div>

      <ContactModal isOpen={isOpen} onClose={closeModal} onSubmit={submitContact} />
    </section>
  )
}
