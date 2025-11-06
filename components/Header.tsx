'use client'

import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'
import { useContactModal } from '@/hooks/useContactModal'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { isOpen, openModal, closeModal, submitContact } = useContactModal()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    }
  }

  return (
    <header
      className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-primary-dark transition-transform duration-300 hover:scale-105 cursor-pointer">
            DN<span className="text-primary-blue">Bridge</span>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-6">
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
                  href="#tecnologias"
                  onClick={(e) => scrollToSection(e, '#tecnologias')}
                  className="text-primary-dark font-medium transition-all duration-300 relative hover:text-primary-blue after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  Tecnologías
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
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => scrollToSection(e, '#contacto')}
                  className="text-primary-dark font-medium transition-all duration-300 relative hover:text-primary-blue after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={openModal}
            className="bg-accent-orange text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:bg-[#e55a2b] hover:-translate-y-0.5 hover:shadow-xl"
          >
            Contactar
          </button>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={closeModal} onSubmit={submitContact} />
    </header>
  )
}
