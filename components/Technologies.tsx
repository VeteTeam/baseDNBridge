'use client'

import { useEffect, useRef } from 'react'
import { technologies } from '@/config/content'

export default function Technologies() {
  const badgesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    badgesRef.current.forEach((badge) => {
      if (badge) {
        badge.classList.add('opacity-0', 'translate-y-5', 'scale-95', 'transition-all', 'duration-500')
        observer.observe(badge)
      }
    })

    return () => {
      badgesRef.current.forEach((badge) => {
        if (badge) observer.unobserve(badge)
      })
    }
  }, [])

  return (
    <section id="tecnologias" className="py-24 bg-light-gray">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <i className="fas fa-paper-plane text-primary-blue text-2xl"></i>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Tecnologías que amamos
            </h2>
          </div>
          <p className="text-dark-gray max-w-2xl mx-auto text-lg leading-relaxed mt-4">
            Stack tecnológico moderno y probado para construir soluciones escalables y de alta calidad.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el: HTMLDivElement | null) => {
                if (el) {
                  badgesRef.current[index] = el
                }
              }}
              className="group relative"
            >
              <div className="bg-white px-4 py-3 rounded-xl border-2 border-medium-gray transition-all duration-300 hover:border-primary-blue hover:shadow-lg hover:-translate-y-1 cursor-default">
                <div className="text-center">
                  <span className="text-primary-dark font-bold text-sm md:text-base group-hover:text-primary-blue transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-blue/0 via-primary-blue/5 to-primary-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
