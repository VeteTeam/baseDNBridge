'use client'

import { useEffect, useRef } from 'react'
import { aboutContent } from '@/config/content'

export default function Nosotros() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-600')
        observer.observe(section)
      }
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <section id="nosotros" className="py-24 bg-color-1">
      <div className="container-custom">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-5">
            {aboutContent.mainTitle}
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto text-lg leading-relaxed">
            {aboutContent.subtitle}
          </p>
        </div>

        {/* Secciones de contenido */}
        <div className="max-w-5xl mx-auto space-y-12">
          {aboutContent.sections.map((section, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                if (el) {
                  sectionsRef.current[index] = el
                }
              }}
              className="bg-light-gray p-8 md:p-10 rounded-2xl border-2 border-transparent hover:border-primary-blue/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Título de la sección con icono */}
              <div className="flex items-center gap-4 mb-6">
                {section.icon && (
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-blue/10 to-accent-orange/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className={`${section.icon} text-primary-blue text-2xl`}></i>
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-primary-dark">
                  {section.title}
                </h3>
              </div>

              {/* Contenido - múltiples párrafos */}
              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-dark-gray leading-relaxed text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
