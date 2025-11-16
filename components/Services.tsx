'use client'

import { services } from '@/config/content'

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-light-gray">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-5">
            Nuestros Servicios
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto text-lg leading-relaxed">
            Ofrecemos un enfoque integral para el desarrollo de software, especializándonos en{' '}
            <strong className="text-primary-blue">Health Tech</strong> y adaptándonos a las 
            necesidades específicas de cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center bg-color-1 p-10 rounded-2xl transition-all duration-400 border-2 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-primary-blue group"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-blue/10 to-accent-orange/5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-blue/20 group-hover:to-accent-orange/10">
                <i className={`${service.icon} text-primary-blue text-4xl`}></i>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{service.title}</h3>
              <p className="text-dark-gray leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
