import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/contexts/ToastContext'
import { ToastContainer } from '@/components/ToastContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DNBridge - Software Factory',
  description: 'DNBridge conecta tus visiones empresariales con soluciones tecnológicas de vanguardia. Especialistas en desarrollo de software escalable.',
  icons: {
    icon: '/images/logo2.png',
    shortcut: '/images/logo2.png',
    apple: '/images/logo2.png',
  },
}

interface RootLayoutProps {
  readonly children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link rel="icon" href="/images/logo2.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  )
}
