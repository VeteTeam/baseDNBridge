import { companyConfig } from '@/config/company'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary-blue">{companyConfig.name}</h3>
            <p className="text-white/70 mb-5 leading-relaxed">
              Conectamos tus ideas con soluciones tecnológicas innovadoras. Transformando visiones 
              en realidad digital, especializados en Health Tech.
            </p>
            <div className="flex gap-4 mt-5">
              {companyConfig.socialMedia.linkedin && (
                <a
                  href={companyConfig.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-primary-blue hover:-translate-y-1"
                >
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
              )}
              {companyConfig.socialMedia.twitter && (
                <a
                  href={companyConfig.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-primary-blue hover:-translate-y-1"
                >
                  <i className="fab fa-twitter text-white"></i>
                </a>
              )}
              {companyConfig.socialMedia.github && (
                <a
                  href={companyConfig.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-primary-blue hover:-translate-y-1"
                >
                  <i className="fab fa-github text-white"></i>
                </a>
              )}
              {companyConfig.socialMedia.instagram && (
                <a
                  href={companyConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-primary-blue hover:-translate-y-1"
                >
                  <i className="fab fa-instagram text-white"></i>
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-primary-blue">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Desarrollo Web
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Apps Móviles
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Health Tech Solutions
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Backend & APIs
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  DevOps & Cloud
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-primary-blue">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#nosotros"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Equipo
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#tecnologias"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Tecnologías
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-primary-blue">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${companyConfig.email}`}
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-flex items-center gap-2"
                >
                  <i className="fas fa-envelope"></i>
                  {companyConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyConfig.phone.replace(/\s/g, '')}`}
                  className="text-white/70 hover:text-primary-blue transition-all duration-300 inline-flex items-center gap-2"
                >
                  <i className="fas fa-phone"></i>
                  {companyConfig.phone}
                </a>
              </li>
              <li className="text-white/70 flex items-center gap-2 mt-4">
                <i className="fas fa-map-marker-alt"></i>
                {companyConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-white/50 text-sm">
          <p>
            &copy; 2025 DNBridge. Todos los derechos reservados. |{' '}
            <a href="#" className="hover:text-white/70 transition-colors">
              Política de Privacidad
            </a>{' '}
            |{' '}
            <a href="#" className="hover:text-white/70 transition-colors">
              Términos de Servicio
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
