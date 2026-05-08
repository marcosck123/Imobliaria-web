import Link from 'next/link'
import { Home, Building, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { PropertyType } from '@/types/property'

const categories = [
  { icon: Home, label: 'Casas', count: '180 imóveis', description: 'Do aconchegante ao luxuoso', href: `/imoveis?type=${PropertyType.CASA}`, color: 'bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-white' },
  { icon: Building, label: 'Apartamentos', count: '210 imóveis', description: 'Praticidade e conforto urbano', href: `/imoveis?type=${PropertyType.APARTAMENTO}`, color: 'bg-green-50 text-green-600 group-hover:bg-primary group-hover:text-white' },
  { icon: MapPin, label: 'Terrenos', count: '65 imóveis', description: 'Construa o lar dos seus sonhos', href: `/imoveis?type=${PropertyType.TERRENO}`, color: 'bg-amber-50 text-amber-600 group-hover:bg-primary group-hover:text-white' },
  { icon: Briefcase, label: 'Comercial', count: '55 imóveis', description: 'Espaços para seu negócio', href: `/imoveis?type=${PropertyType.COMERCIAL}`, color: 'bg-purple-50 text-purple-600 group-hover:bg-primary group-hover:text-white' },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Explore por tipo</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">Categorias de Imóveis</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">Encontre exatamente o que procura filtrando por categoria de imóvel</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.label} href={category.href} className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-primary hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 ${category.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary text-lg mb-1 transition-colors duration-200">{category.label}</h3>
                <p className="text-xs text-gray-500 mb-2">{category.description}</p>
                <span className="text-accent font-medium text-sm">{category.count}</span>
                <div className="mt-3 flex items-center gap-1 text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Ver imóveis <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
