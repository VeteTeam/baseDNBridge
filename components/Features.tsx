'use client'

import { useEffect, useRef } from 'react'
import { features } from '@/config/content'

export default function Features() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

    cardsRef.current.forEach((card) => {
      if (card) {
        card.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-600')
        observer.observe(card)
      }
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-5">
            ¿Por qué elegir DNBridge?
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto text-lg leading-relaxed">
            Nuestro enfoque combina experiencia técnica con comprensión empresarial para ofrecer 
            soluciones que realmente importan, especialmente en el sector de la salud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-light-gray rounded-2xl p-10 transition-all duration-400 border-2 border-transparent hover:-translate-y-2 hover:shadow-xl hover:border-medium-gray relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue to-accent-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue/15 to-primary-blue/5 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <i className={`${feature.icon} text-primary-blue text-3xl`}></i>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{feature.title}</h3>
              <p className="text-dark-gray leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
