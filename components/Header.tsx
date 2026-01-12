'use client'

import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'
import { useContactModal } from '@/hooks/useContactModal'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isOpen, openModal, closeModal, submitContact } = useContactModal()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      // Cerrar menú móvil después de hacer clic
      setIsMobileMenuOpen(false)
    }
  }

  const handleContactClick = () => {
    openModal()
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full bg-color-2 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold text-primary-dark transition-transform duration-300 hover:scale-105 cursor-pointer">
            DN<span className="text-primary-blue">Bridge</span>
          </div>

          {/* Navegación Desktop - Oculto en mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6">
              <li>
                <a
                  href="#servicios"
                  onClick={(e) => scrollToSection(e, '#servicios')}
                  className="text-primary-dark font-medium transition-all duration-300 relative hover:text-primary-blue after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  onClick={(e) => scrollToSection(e, '#proyectos')}
                  className="text-primary-dark font-medium transition-all duration-300 relative hover:text-primary-blue after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  onClick={(e) => scrollToSection(e, '#nosotros')}
                  className="text-primary-dark font-medium transition-all duration-300 relative hover:text-primary-blue after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  Nosotros
                </a>
              </li>
            </ul>
          </nav>

          {/* Botón Contactar Desktop - Oculto en mobile */}
          <button
            onClick={openModal}
            className="hidden md:block bg-accent-orange text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:bg-[#e55a2b] hover:-translate-y-0.5 hover:shadow-xl"
          >
            Contactar
          </button>

          {/* Botón Hamburger Mobile - Solo visible en mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary-dark hover:text-primary-blue transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <i className="fas fa-times text-2xl"></i>
            ) : (
              <i className="fas fa-bars text-2xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Menú Móvil - Drawer desde la derecha */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Overlay oscuro */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel del menú */}
        <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-color-2 shadow-2xl overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Header del menú móvil */}
            <div className="flex justify-between items-center p-6 border-b-2 border-medium-gray">
              <div className="text-xl font-bold text-primary-dark">
                DN<span className="text-primary-blue">Bridge</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-primary-dark hover:text-primary-blue transition-colors"
                aria-label="Cerrar menú"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Navegación móvil */}
            <nav className="flex-1 p-6">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#servicios"
                    onClick={(e) => scrollToSection(e, '#servicios')}
                    className="block py-3 px-4 text-primary-dark font-medium text-lg rounded-lg transition-all duration-300 hover:bg-primary-blue/10 hover:text-primary-blue"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#proyectos"
                    onClick={(e) => scrollToSection(e, '#proyectos')}
                    className="block py-3 px-4 text-primary-dark font-medium text-lg rounded-lg transition-all duration-300 hover:bg-primary-blue/10 hover:text-primary-blue"
                  >
                    Proyectos
                  </a>
                </li>
                <li>
                  <a
                    href="#nosotros"
                    onClick={(e) => scrollToSection(e, '#nosotros')}
                    className="block py-3 px-4 text-primary-dark font-medium text-lg rounded-lg transition-all duration-300 hover:bg-primary-blue/10 hover:text-primary-blue"
                  >
                    Nosotros
                  </a>
                </li>
              </ul>
            </nav>

            {/* Botón Contactar en el menú móvil */}
            <div className="p-6 border-t-2 border-medium-gray">
              <button
                onClick={handleContactClick}
                className="w-full bg-accent-orange text-white px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:bg-[#e55a2b] active:scale-95"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={closeModal} onSubmit={submitContact} />
    </header>
  )
}
