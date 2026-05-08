import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ImóvelPrime — Encontre o Imóvel dos Seus Sonhos',
    template: '%s | ImóvelPrime',
  },
  description:
    'ImóvelPrime é a imobiliária de confiança em São Paulo. Casas, apartamentos, terrenos e imóveis comerciais para venda e aluguel. 15 anos de experiência.',
  keywords: ['imóveis', 'apartamentos', 'casas', 'São Paulo', 'aluguel', 'venda', 'imobiliária'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://imovelprime.com.br',
    siteName: 'ImóvelPrime',
    title: 'ImóvelPrime — Encontre o Imóvel dos Seus Sonhos',
    description: 'ImóvelPrime é a imobiliária de confiança em São Paulo.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
