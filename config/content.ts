/**
 * Contenido centralizado de la landing page
 * Facilita la actualización y mantenimiento del contenido
 */

export interface Testimonial {
  stars: number
  text: string
  author: string
  role: string
  company: string
  initials: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Technology {
  name: string
}

// Testimonios
export const testimonials: Testimonial[] = [
  {
    stars: 5,
    text: 'DNBridge transformó completamente nuestra operación digital. Su equipo entendió nuestras necesidades desde el primer día y entregó una solución que superó nuestras expectativas. La implementación de nuestro sistema de telemedicina fue impecable.',
    author: 'María Rodríguez',
    role: 'CEO',
    company: 'MedTech Solutions',
    initials: 'MR',
  },
  {
    stars: 5,
    text: 'La calidad del código y la atención al detalle son excepcionales. Trabajar con DNBridge ha sido una experiencia fluida y profesional de principio a fin. Nuestra plataforma de gestión de pacientes ahora es el estándar en nuestra clínica.',
    author: 'Jorge García',
    role: 'CTO',
    company: 'HealthCare Innovations',
    initials: 'JG',
  },
  {
    stars: 5,
    text: 'Increíble rapidez y eficiencia. El equipo de DNBridge no solo cumplió con los plazos, sino que también aportó ideas valiosas que mejoraron nuestro producto final. Su expertise en Health Tech es evidente.',
    author: 'Laura Pérez',
    role: 'Founder',
    company: 'Digital Health Hub',
    initials: 'LP',
  },
]

// FAQs
export const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tiempo toma desarrollar un proyecto?',
    answer:
      'El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede tomar 2-4 semanas, mientras que una aplicación más compleja de Health Tech puede requerir 2-6 meses. Después de la consulta inicial, te proporcionaremos un cronograma detallado.',
  },
  {
    question: '¿Ofrecen soporte después del lanzamiento?',
    answer:
      'Sí, la mayoría de los proyectos incluyen soporte post-lanzamiento. Dependiendo del proyecto que sea, ofrecemos desde 30 días hasta soporte continuo 24/7 para proyectos Enterprise. También ofrecemos contratos de mantenimiento mensual.',
  },
  {
    question: '¿Qué tecnologías utilizan?',
    answer:
      'Trabajamos con las últimas tecnologías incluyendo React, Angular, Vue.js para frontend; Node.js, Python, Java para backend; y servicios cloud como AWS, Azure y Google Cloud. Para Health Tech, manejamos HL7/FHIR, integración con dispositivos médicos y sistemas EHR. Seleccionamos la stack tecnológica más adecuada para cada proyecto.',
  },
  {
    question: '¿Puedo solicitar cambios durante el desarrollo?',
    answer:
      'Absolutamente. Utilizamos metodología ágil que permite iteraciones y ajustes continuos. Mantenemos comunicación constante y realizamos revisiones periódicas para asegurarnos de que el proyecto va en la dirección correcta.',
  },
  {
    question: '¿Ofrecen garantía en sus servicios?',
    answer:
      'Sí, ofrecemos garantía de satisfacción. Si encuentras bugs o problemas dentro del período de soporte, los solucionamos sin costo adicional. También garantizamos que el código cumple con los estándares de calidad y mejores prácticas de la industria, incluyendo cumplimiento normativo para Health Tech.',
  },
  {
    question: '¿Tienen experiencia en cumplimiento normativo para Health Tech?',
    answer:
      'Sí, tenemos experiencia en implementar soluciones que cumplen con regulaciones como HIPAA, GDPR, y normativas locales de salud. Trabajamos con seguridad de datos, encriptación, y auditorías para garantizar el cumplimiento normativo.',
  },
]

// Servicios
export const services: Service[] = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Desarrollo Web',
    description:
      'Aplicaciones web modernas, progresivas y responsivas con las últimas tecnologías. Especializados en plataformas de salud digital.',
  },
  {
    icon: 'fas fa-mobile-screen-button',
    title: 'Apps Móviles',
    description:
      'Desarrollo nativo e híbrido para iOS y Android con experiencias de usuario excepcionales. Apps de telemedicina y gestión de salud.',
  },
  {
    icon: 'fas fa-heartbeat',
    title: 'Health Tech Solutions',
    description:
      'Sistemas especializados en salud: EHR, telemedicina, gestión de pacientes, integración con dispositivos médicos y más.',
  },
  {
    icon: 'fas fa-pencil-ruler',
    title: 'UI/UX Design',
    description:
      'Diseño de interfaces intuitivas y experiencias de usuario centradas en el cliente, con enfoque en accesibilidad y usabilidad.',
  },
  {
    icon: 'fas fa-server',
    title: 'Backend & APIs',
    description:
      'APIs robustas y escalables, integración con sistemas legacy, HL7/FHIR para interoperabilidad en salud.',
  },
  {
    icon: 'fas fa-cloud',
    title: 'DevOps & Cloud',
    description:
      'Infraestructura cloud, CI/CD, monitoreo y despliegues automatizados. Cumplimiento con HIPAA y normativas de salud.',
  },
]

// Características
export const features: Feature[] = [
  {
    icon: 'fas fa-rocket',
    title: 'Desarrollo Ágil',
    description:
      'Utilizamos metodologías ágiles para entregar valor rápidamente, con iteraciones constantes y retroalimentación continua.',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Seguridad Integrada',
    description:
      'Implementamos prácticas de seguridad desde el diseño inicial, protegiendo tus datos y los de tus clientes, especialmente crítico en Health Tech.',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Experiencias Multiplataforma',
    description:
      'Desarrollamos aplicaciones nativas y web responsivas que funcionan perfectamente en todos los dispositivos.',
  },
  {
    icon: 'fas fa-cloud',
    title: 'Arquitecturas Escalables',
    description:
      'Diseñamos sistemas que crecen con tu negocio, utilizando las mejores prácticas de arquitectura de software.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Análisis y Optimización',
    description:
      'Integramos analytics y herramientas de monitoreo para medir el rendimiento y optimizar continuamente.',
  },
  {
    icon: 'fas fa-headset',
    title: 'Soporte Continuo',
    description:
      'Ofrecemos mantenimiento y soporte post-lanzamiento para garantizar el funcionamiento óptimo de tus aplicaciones.',
  },
]

// Tecnologías
export const technologies: Technology[] = [
  { name: 'JAVA' },
  { name: 'FLUTTER' },
  { name: 'NEXT.JS' },
  { name: 'KAFKA' },
  { name: 'SANITY' },
  { name: 'ANGULAR' },
  { name: 'BEDROCK' },
  { name: 'OPENAI' },
  { name: 'PYTHON' },
  { name: 'REACT' },
  { name: 'GOLANG' },
  { name: 'DOCKER' },
  { name: 'NODE.JS' },
  { name: '.NET' },
  { name: 'CANVAS' },
  { name: 'AWS' },
  { name: 'GITHUB' },
]

