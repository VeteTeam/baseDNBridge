import { testimonials } from '@/config/content'
import type { Testimonial } from '@/config/content'

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-5">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto text-lg leading-relaxed">
            Miles de empresas confían en DNBridge para sus soluciones de software, especialmente en 
            el sector de la salud. Aquí está lo que tienen que decir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-light-gray rounded-2xl p-8 transition-all duration-300 border-2 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-primary-blue"
            >
              <div className="text-accent-orange text-lg mb-5">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>

              <p className="text-primary-dark text-base leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-blue to-accent-orange flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-primary-dark mb-1">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-dark-gray">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
