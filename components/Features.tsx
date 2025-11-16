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
    <section className="py-24 bg-light-gray">
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
              ref={(el: HTMLDivElement | null) => {
                if (el) {
                  cardsRef.current[index] = el
                }
              }}
              className="text-center bg-color-1 p-10 rounded-2xl transition-all duration-400 border-2 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-primary-blue group"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-blue/10 to-accent-orange/5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-blue/20 group-hover:to-accent-orange/10">
                <i className={`${feature.icon} text-primary-blue text-4xl`}></i>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{feature.title}</h3>
              <p className="text-dark-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
