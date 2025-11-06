'use client'

import ContactModal from './ContactModal'
import { useContactModal } from '@/hooks/useContactModal'

export default function Hero() {
  const { isOpen, openModal, closeModal, submitContact } = useContactModal()

  return (
    <section className="relative bg-gradient-to-br from-primary-dark to-[#1a365d] text-white py-32 md:py-40 text-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="inline-block bg-primary-blue/15 text-primary-blue px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-primary-blue/30 animate-fade-in-down">
          <i className="fas fa-star mr-2"></i>
          Soluciones Premium de Software
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          Transformamos tus{' '}
          <span className="text-primary-blue">ideas</span> en software{' '}
          <span className="text-primary-blue">innovador</span>
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/85 leading-relaxed animate-fade-in-up delay-200">
          DNBridge conecta tus visiones empresariales con soluciones tecnológicas de vanguardia. 
          Especialistas en <strong className="text-primary-blue">Health Tech</strong> y desarrollo de software 
          escalable, seguro y de alto rendimiento diseñado para impulsar tu negocio al siguiente nivel.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12 animate-fade-in-up delay-400">
          <button
            onClick={openModal}
            className="bg-primary-blue text-primary-dark px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:bg-[#00b8e6] hover:-translate-y-1 hover:shadow-xl"
          >
            Comenzar Ahora
          </button>
          <button className="bg-transparent text-white border-2 border-white/40 px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white hover:-translate-y-1">
            Ver Proyectos
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70 animate-fade-in delay-600">
          <div className="flex items-center gap-3 text-sm text-white/80">
            <i className="fas fa-shield-alt text-primary-blue text-xl"></i>
            <span>100% Seguro</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <i className="fas fa-users text-primary-blue text-xl"></i>
            <span>+250 Clientes Satisfechos</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <i className="fas fa-award text-primary-blue text-xl"></i>
            <span>Certificados & Premiados</span>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={closeModal} onSubmit={submitContact} />
    </section>
  )
}
