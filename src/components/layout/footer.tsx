import Link from 'next/link'
import { Home, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">Imóvel<span className="text-accent">Prime</span></span>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed">Há 15 anos conectando pessoas aos imóveis dos seus sonhos em todo o estado de São Paulo.</p>
            <div className="flex items-center gap-3">
              {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }, { Icon: Linkedin, label: 'LinkedIn' }].map(({ Icon, label }) => (
                <a key={label} href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary-700 hover:bg-accent rounded-lg flex items-center justify-center transition-colors duration-200" aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { href: '/imoveis', label: 'Todos os Imóveis' },
                { href: '/imoveis?status=Venda', label: 'Imóveis à Venda' },
                { href: '/imoveis?status=Aluguel', label: 'Imóveis para Alugar' },
                { href: '/sobre', label: 'Quero Vender' },
                { href: '/blog', label: 'Blog' },
                { href: '/contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-primary-200 hover:text-accent transition-colors duration-200">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base">Categorias</h3>
            <ul className="space-y-2">
              {[
                { href: '/imoveis?type=Casa', label: 'Casas' },
                { href: '/imoveis?type=Apartamento', label: 'Apartamentos' },
                { href: '/imoveis?type=Terreno', label: 'Terrenos' },
                { href: '/imoveis?type=Comercial', label: 'Comercial' },
              ].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-primary-200 hover:text-accent transition-colors duration-200">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary-200">Av. Paulista, 1000, Sala 502<br />Bela Vista — São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+551133334444" className="text-sm text-primary-200 hover:text-accent transition-colors">(11) 3333-4444</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:contato@imovelprime.com.br" className="text-sm text-primary-200 hover:text-accent transition-colors">contato@imovelprime.com.br</a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-300">© {new Date().getFullYear()} ImóvelPrime. Todos os direitos reservados. CRECI-SP: 12345-J</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="text-xs text-primary-300 hover:text-accent transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="text-xs text-primary-300 hover:text-accent transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
