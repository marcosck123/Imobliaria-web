'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { PropertyFilters as IPropertyFilters, PropertyType, PropertyStatus } from '@/types/property'
import { PropertyFilters } from '@/components/property/property-filters'
import { PropertyGrid } from '@/components/property/property-grid'
import { Button } from '@/components/ui/button'

function ImoveisContent() {
  const searchParams = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState<IPropertyFilters>({
    type: (searchParams.get('type') as PropertyType) || '',
    status: (searchParams.get('status') as PropertyStatus) || '',
    city: searchParams.get('city') || '',
  })

  useEffect(() => {
    setFilters({
      type: (searchParams.get('type') as PropertyType) || '',
      status: (searchParams.get('status') as PropertyStatus) || '',
      city: searchParams.get('city') || '',
    })
  }, [searchParams])

  const filtered = useMemo(() => {
    return mockProperties.filter((p) => {
      if (filters.type && !(filters.type as string === 'all') && p.type !== filters.type) return false
      if (filters.status && !(filters.status as string === 'all') && p.status !== filters.status) return false
      if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase()) && !p.neighborhood.toLowerCase().includes(filters.city.toLowerCase())) return false
      if (filters.minPrice && p.price < filters.minPrice) return false
      if (filters.maxPrice && p.price > filters.maxPrice) return false
      if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false
      return true
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Imóveis disponíveis</h1>
          <p className="text-gray-500 mt-1">
            <span className="font-semibold text-primary">{filtered.length}</span> imóveis encontrados
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showMobileFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </Button>
        </div>

        <div className="flex gap-8">
          <aside className={`w-72 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-24">
              <PropertyFilters
                filters={filters}
                onFiltersChange={setFilters}
                onReset={() => setFilters({})}
                layout="sidebar"
              />
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold text-gray-400 mb-2">Nenhum imóvel encontrado</p>
                <p className="text-gray-400">Tente ajustar os filtros para ver mais resultados.</p>
              </div>
            ) : (
              <PropertyGrid properties={filtered} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Carregando imóveis...</p></div>}>
      <ImoveisContent />
    </Suspense>
  )
}
