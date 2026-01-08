import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import Technologies from '@/components/Technologies'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Services />
      <Technologies />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
