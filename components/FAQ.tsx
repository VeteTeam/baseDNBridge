'use client'

import { useState } from 'react'
import { faqs } from '@/config/content'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-color-3">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-5">
            Preguntas Frecuentes
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto text-lg leading-relaxed">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, especialmente 
            en el ámbito de Health Tech.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-light-gray rounded-xl mb-5 overflow-hidden transition-all duration-300 border-2 ${
                activeIndex === index
                  ? 'border-primary-blue'
                  : 'border-transparent'
              }`}
            >
              <div
                className="p-6 cursor-pointer flex justify-between items-center font-semibold text-lg text-primary-dark transition-colors hover:text-primary-blue"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <i
                  className={`fas fa-chevron-down text-primary-blue text-xl transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index
                    ? 'max-h-96 opacity-100 pb-6 px-6'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-dark-gray leading-relaxed text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
