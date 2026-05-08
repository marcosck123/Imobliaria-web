import { Property } from '@/types/property'
import { PropertyCard } from './property-card'
import { Building2 } from 'lucide-react'

interface PropertyGridProps {
  properties: Property[]
  loading?: boolean
}

function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-7 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="border-t border-gray-100 pt-3">
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-8" />
            <div className="h-4 bg-gray-200 rounded w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PropertyGrid({ properties, loading = false }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum imóvel encontrado</h3>
        <p className="text-gray-500 text-sm max-w-sm">Não encontramos imóveis com os filtros selecionados. Tente ajustar os critérios de busca.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
    </div>
  )
}
