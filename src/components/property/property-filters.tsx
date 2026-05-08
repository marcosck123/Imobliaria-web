'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { PropertyFilters as IPropertyFilters, PropertyType, PropertyStatus } from '@/types/property'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface PropertyFiltersProps {
  filters: IPropertyFilters
  onFiltersChange: (filters: IPropertyFilters) => void
  onReset: () => void
  layout?: 'sidebar' | 'horizontal'
}

export function PropertyFilters({ filters, onFiltersChange, onReset, layout = 'sidebar' }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<IPropertyFilters>(filters)
  const isSidebar = layout === 'sidebar'

  const handleApply = () => onFiltersChange(localFilters)
  const handleReset = () => { setLocalFilters({}); onReset() }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm', isSidebar ? 'p-5' : 'p-4')}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-gray-900">Filtros</h2>
        </div>
        <button onClick={handleReset} className="text-xs text-gray-500 hover:text-accent transition-colors flex items-center gap-1">
          <X className="w-3 h-3" />Limpar
        </button>
      </div>

      <div className={cn('gap-4', isSidebar ? 'flex flex-col' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6')}>
        <div className="space-y-1.5">
          <Label>Tipo</Label>
          <Select value={localFilters.type || ''} onValueChange={(v) => setLocalFilters({ ...localFilters, type: (v === 'all' ? '' : v) as PropertyType | '' })}>
            <SelectTrigger><SelectValue placeholder="Todos os tipos" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value={PropertyType.CASA}>Casa</SelectItem>
              <SelectItem value={PropertyType.APARTAMENTO}>Apartamento</SelectItem>
              <SelectItem value={PropertyType.TERRENO}>Terreno</SelectItem>
              <SelectItem value={PropertyType.COMERCIAL}>Comercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Negociação</Label>
          <Select value={localFilters.status || ''} onValueChange={(v) => setLocalFilters({ ...localFilters, status: (v === 'all' ? '' : v) as PropertyStatus | '' })}>
            <SelectTrigger><SelectValue placeholder="Venda ou Aluguel" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Venda ou Aluguel</SelectItem>
              <SelectItem value={PropertyStatus.VENDA}>Venda</SelectItem>
              <SelectItem value={PropertyStatus.ALUGUEL}>Aluguel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Cidade</Label>
          <Input placeholder="Ex: São Paulo" value={localFilters.city || ''} onChange={(e) => setLocalFilters({ ...localFilters, city: e.target.value })} />
        </div>

        <div className="space-y-1.5">
          <Label>Preço mínimo</Label>
          <Select value={localFilters.minPrice?.toString() || ''} onValueChange={(v) => setLocalFilters({ ...localFilters, minPrice: v && v !== 'none' ? Number(v) : undefined })}>
            <SelectTrigger><SelectValue placeholder="Sem mínimo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sem mínimo</SelectItem>
              <SelectItem value="200000">R$ 200.000</SelectItem>
              <SelectItem value="500000">R$ 500.000</SelectItem>
              <SelectItem value="1000000">R$ 1.000.000</SelectItem>
              <SelectItem value="2000000">R$ 2.000.000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Preço máximo</Label>
          <Select value={localFilters.maxPrice?.toString() || ''} onValueChange={(v) => setLocalFilters({ ...localFilters, maxPrice: v && v !== 'none' ? Number(v) : undefined })}>
            <SelectTrigger><SelectValue placeholder="Sem máximo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sem máximo</SelectItem>
              <SelectItem value="500000">R$ 500.000</SelectItem>
              <SelectItem value="1000000">R$ 1.000.000</SelectItem>
              <SelectItem value="2000000">R$ 2.000.000</SelectItem>
              <SelectItem value="5000000">R$ 5.000.000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Quartos</Label>
          <Select value={localFilters.bedrooms?.toString() || ''} onValueChange={(v) => setLocalFilters({ ...localFilters, bedrooms: v && v !== 'any' ? Number(v) : undefined })}>
            <SelectTrigger><SelectValue placeholder="Qualquer" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Qualquer</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleApply} className="w-full mt-5">
        <Search className="w-4 h-4 mr-2" />Buscar Imóveis
      </Button>
    </div>
  )
}
