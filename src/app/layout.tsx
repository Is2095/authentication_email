import NavBar from '@/components/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'autenticación-email',
  description: 'Aplicación para registrarse y enviar email',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-cyan-200">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
