import Link from 'next/link'
import { Home, Search, Building2, Calculator, Newspaper } from 'lucide-react'
import { Button } from '@/components/ui/button'

const quickLinks = [
  { href: '/imoveis', icon: Building2, label: 'Ver imóveis' },
  { href: '/simulador', icon: Calculator, label: 'Simular financiamento' },
  { href: '/blog', icon: Newspaper, label: 'Blog imobiliário' },
]

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg w-full">
        {/* SVG House illustration */}
        <div className="flex justify-center mb-8">
          <svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* House */}
            <path d="M80 15L145 65H15L80 15Z" fill="#1a3c5e" opacity="0.15" />
            <path d="M80 20L140 65H20L80 20Z" stroke="#1a3c5e" strokeWidth="2.5" fill="none" />
            {/* Roof */}
            <path d="M80 20L140 65" stroke="#1a3c5e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M80 20L20 65" stroke="#1a3c5e" strokeWidth="2.5" strokeLinecap="round" />
            {/* Body */}
            <rect x="25" y="65" width="110" height="65" fill="#e8f0f7" stroke="#1a3c5e" strokeWidth="2" />
            {/* Door */}
            <rect x="65" y="95" width="30" height="35" rx="3" fill="#1a3c5e" opacity="0.3" stroke="#1a3c5e" strokeWidth="1.5" />
            <circle cx="90" cy="113" r="2" fill="#1a3c5e" />
            {/* Windows */}
            <rect x="33" y="76" width="25" height="20" rx="2" fill="white" stroke="#1a3c5e" strokeWidth="1.5" />
            <line x1="33" y1="86" x2="58" y2="86" stroke="#1a3c5e" strokeWidth="1" />
            <line x1="45.5" y1="76" x2="45.5" y2="96" stroke="#1a3c5e" strokeWidth="1" />
            <rect x="102" y="76" width="25" height="20" rx="2" fill="white" stroke="#1a3c5e" strokeWidth="1.5" />
            <line x1="102" y1="86" x2="127" y2="86" stroke="#1a3c5e" strokeWidth="1" />
            <line x1="114.5" y1="76" x2="114.5" y2="96" stroke="#1a3c5e" strokeWidth="1" />
            {/* Chimney */}
            <rect x="108" y="28" width="14" height="22" fill="#1a3c5e" opacity="0.2" stroke="#1a3c5e" strokeWidth="1.5" />
            {/* Smoke */}
            <path d="M112 25 Q110 18 114 13 Q118 8 115 2" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Question mark */}
            <text x="80" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a3c5e" opacity="0.4">?</text>
          </svg>
        </div>

        <h1 className="text-7xl font-black text-primary/20 mb-2 tabular-nums">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Página não encontrada</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          O endereço que você tentou acessar não existe ou foi movido. Verifique o URL ou explore o site abaixo.
        </p>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar imóveis, bairros..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white shadow-sm"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Página inicial
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/imoveis">
              <Search className="w-4 h-4 mr-2" />
              Ver imóveis
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Acesso rápido</p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
