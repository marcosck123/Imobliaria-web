'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, List, Map, SlidersHorizontal, Bed, Bath, Car, X, Search } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatArea } from '@/lib/utils'
import type { Property } from '@/types/property'

const PIN_POSITIONS: Record<string, { top: string; left: string }> = {
  '1': { top: '28%', left: '48%' },
  '2': { top: '45%', left: '38%' },
  '3': { top: '38%', left: '55%' },
  '4': { top: '20%', left: '60%' },
  '5': { top: '55%', left: '30%' },
  '6': { top: '62%', left: '52%' },
  '7': { top: '32%', left: '70%' },
  '8': { top: '48%', left: '62%' },
  '9': { top: '22%', left: '33%' },
}

const statusOptions = ['Todos', 'Venda', 'Aluguel']
const typeOptions = ['Todos', 'Casa', 'Apartamento', 'Terreno', 'Comercial']

export default function MapaPage() {
  const [view, setView] = useState<'mapa' | 'lista'>('mapa')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [typeFilter, setTypeFilter] = useState('Todos')
  const [maxPrice, setMaxPrice] = useState(5000000)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = mockProperties.filter((p) => {
    if (statusFilter !== 'Todos' && p.status !== statusFilter) return false
    if (typeFilter !== 'Todos' && p.type !== typeFilter) return false
    if (p.price > maxPrice) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0 z-10">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por bairro ou imóvel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {(statusFilter !== 'Todos' || typeFilter !== 'Todos') && (
            <span className="w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('mapa')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === 'mapa' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Map className="w-4 h-4" />
            Mapa
          </button>
          <button
            onClick={() => setView('lista')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === 'lista' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List className="w-4 h-4" />
            Lista
          </button>
        </div>
        <span className="text-sm text-gray-500 hidden sm:block">{filtered.length} imóveis</span>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap gap-4 items-end flex-shrink-0">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Negócio</label>
            <div className="flex gap-1">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    statusFilter === s ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Tipo</label>
            <div className="flex flex-wrap gap-1">
              {typeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    typeFilter === t ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-48">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Preço máximo: {formatCurrency(maxPrice)}
            </label>
            <input
              type="range"
              min={200000}
              max={5000000}
              step={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => { setStatusFilter('Todos'); setTypeFilter('Todos'); setMaxPrice(5000000) }}
            className="text-xs text-gray-400"
          >
            Limpar
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {view === 'mapa' ? (
          <div className="h-full flex">
            {/* Map area */}
            <div className="flex-1 relative bg-[#e8eff5] overflow-hidden">
              {/* Simplified SVG map background */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3c5e" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Roads */}
                <line x1="0" y1="40%" x2="100%" y2="38%" stroke="#94a3b8" strokeWidth="4" />
                <line x1="0" y1="65%" x2="100%" y2="62%" stroke="#94a3b8" strokeWidth="3" />
                <line x1="45%" y1="0" x2="43%" y2="100%" stroke="#94a3b8" strokeWidth="4" />
                <line x1="70%" y1="0" x2="68%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
                {/* Blocks */}
                <rect x="20%" y="25%" width="15%" height="10%" fill="#cbd5e1" rx="4" />
                <rect x="50%" y="30%" width="12%" height="8%" fill="#cbd5e1" rx="4" />
                <rect x="30%" y="50%" width="18%" height="12%" fill="#cbd5e1" rx="4" />
                <rect x="55%" y="55%" width="10%" height="8%" fill="#cbd5e1" rx="4" />
                <rect x="65%" y="22%" width="14%" height="9%" fill="#cbd5e1" rx="4" />
              </svg>

              {/* Map labels */}
              <div className="absolute top-[22%] left-[17%] text-xs font-semibold text-gray-500 bg-white/70 px-2 py-0.5 rounded">Jardins</div>
              <div className="absolute top-[42%] left-[35%] text-xs font-semibold text-gray-500 bg-white/70 px-2 py-0.5 rounded">Pinheiros</div>
              <div className="absolute top-[58%] left-[50%] text-xs font-semibold text-gray-500 bg-white/70 px-2 py-0.5 rounded">Moema</div>
              <div className="absolute top-[18%] left-[62%] text-xs font-semibold text-gray-500 bg-white/70 px-2 py-0.5 rounded">Itaim Bibi</div>

              {/* Property pins */}
              {filtered.map((p) => {
                const pos = PIN_POSITIONS[p.id] ?? { top: '50%', left: '50%' }
                const isSelected = selectedProperty?.id === p.id
                return (
                  <button
                    key={p.id}
                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -100%)' }}
                    className="absolute transition-all duration-200 group"
                    onClick={() => setSelectedProperty(isSelected ? null : p)}
                  >
                    <div className={`flex flex-col items-center ${isSelected ? 'scale-125' : 'hover:scale-110'} transition-transform`}>
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-md whitespace-nowrap ${
                        isSelected ? 'bg-primary text-white' : 'bg-white text-primary border border-primary/20'
                      }`}>
                        {formatCurrency(p.price)}
                      </div>
                      <div className={`w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent ${
                        isSelected ? 'border-t-primary' : 'border-t-white'
                      }`} />
                    </div>
                  </button>
                )
              })}

              {/* Selected property popup */}
              {selectedProperty && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                  <div className="relative h-36">
                    <Image
                      src={(selectedProperty.images.find((i) => i.isPrimary) ?? selectedProperty.images[0]).url}
                      alt={selectedProperty.title}
                      fill
                      className="object-cover"
                      sizes="288px"
                    />
                    <button
                      onClick={() => setSelectedProperty(null)}
                      className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant={selectedProperty.status === 'Aluguel' ? 'aluguel' : 'venda'}>{selectedProperty.status}</Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-gray-900 text-sm mb-1 truncate">{selectedProperty.title}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {selectedProperty.neighborhood}, {selectedProperty.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-primary">{formatCurrency(selectedProperty.price)}</p>
                      <Link href={`/imoveis/${selectedProperty.slug}`}>
                        <Button size="sm" className="text-xs">Ver imóvel</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Side list */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 hidden lg:block">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700">{filtered.length} imóveis encontrados</p>
              </div>
              <div className="divide-y divide-gray-50">
                {filtered.map((p) => {
                  const img = p.images.find((i) => i.isPrimary) ?? p.images[0]
                  const isSelected = selectedProperty?.id === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProperty(isSelected ? null : p)}
                      className={`w-full flex items-start gap-3 p-3 text-left transition-colors ${
                        isSelected ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.neighborhood}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-0.5"><Bed className="w-3 h-3" />{p.bedrooms}</span>
                          <span className="flex items-center gap-0.5"><Bath className="w-3 h-3" />{p.bathrooms}</span>
                          <span>{formatArea(p.area)}</span>
                        </div>
                        <p className="text-xs font-bold text-primary mt-1">{formatCurrency(p.price)}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          /* List view */
          <div className="h-full overflow-y-auto bg-gray-50 p-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => {
                const img = p.images.find((i) => i.isPrimary) ?? p.images[0]
                return (
                  <Link
                    key={p.id}
                    href={`/imoveis/${p.slug}`}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-44">
                      <Image src={img.url} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="400px" />
                      <div className="absolute top-2 left-2">
                        <Badge variant={p.status === 'Aluguel' ? 'aluguel' : 'venda'}>{p.status}</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {p.neighborhood}, {p.city}
                      </p>
                      <div className="flex gap-3 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{p.bedrooms}</span>
                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{p.bathrooms}</span>
                        <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{p.parkingSpots}</span>
                        <span>{formatArea(p.area)}</span>
                      </div>
                      <p className="font-bold text-primary mt-2">{formatCurrency(p.price)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
