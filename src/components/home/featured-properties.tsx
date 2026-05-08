import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Property } from '@/types/property'
import { PropertyCard } from '@/components/property/property-card'
import { Button } from '@/components/ui/button'

interface FeaturedPropertiesProps {
  properties: Property[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Selecionados para você</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1">Imóveis em Destaque</h2>
            <p className="text-gray-500 mt-2 max-w-md">Propriedades selecionadas pela nossa equipe com as melhores oportunidades do mercado.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/imoveis">Ver todos os imóveis <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
