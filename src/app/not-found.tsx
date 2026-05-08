import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-primary-400" />
        </div>
        <h1 className="text-8xl font-bold text-primary-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-primary mb-3">Página não encontrada</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Ops! A página que você está procurando não existe ou foi movida. Verifique o endereço ou volte para a página inicial.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Página Inicial
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/imoveis">
              <Search className="w-4 h-4 mr-2" />
              Ver Imóveis
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
