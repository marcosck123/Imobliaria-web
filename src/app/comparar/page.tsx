'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Check, Minus, MapPin, Bed, Bath, Car, SquareDashedBottom, GitCompareArrows, ArrowLeft } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatArea } from '@/lib/utils'
import type { Property } from '@/types/property'

const MAX_COMPARE = 3

export default function CompararPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('compareIds')
      if (saved) {
        const ids = JSON.parse(saved) as string[]
        setSelectedIds(ids.slice(0, MAX_COMPARE))
      }
    } catch {}
  }, [])

  function toggleProperty(id: string) {
    setSelectedIds((prev) => {
      let next: string[]
      if (prev.includes(id)) {
        next = prev.filter((x) => x !== id)
      } else if (prev.length < MAX_COMPARE) {
        next = [...prev, id]
      } else {
        next = prev
      }
      try { localStorage.setItem('compareIds', JSON.stringify(next)) } catch {}
      return next
    })
  }

  function removeProperty(id: string) {
    setSelectedIds((prev) => {
      const next = prev.filter((x) => x !== id)
      try { localStorage.setItem('compareIds', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const selected = selectedIds
    .map((id) => mockProperties.find((p) => p.id === id))
    .filter(Boolean) as Property[]

  const available = mockProperties.filter((p) => !selectedIds.includes(p.id))

  const rows: Array<{ label: string; getValue: (p: Property) => React.ReactNode; key: string }> = [
    { key: 'price', label: 'Preço', getValue: (p) => <span className="font-bold text-primary">{formatCurrency(p.price)}</span> },
    { key: 'status', label: 'Tipo de negócio', getValue: (p) => <Badge variant={p.status === 'Aluguel' ? 'aluguel' : 'venda'}>{p.status}</Badge> },
    { key: 'type', label: 'Tipo de imóvel', getValue: (p) => p.type },
    { key: 'area', label: 'Área', getValue: (p) => formatArea(p.area) },
    { key: 'bedrooms', label: 'Quartos', getValue: (p) => p.bedrooms },
    { key: 'bathrooms', label: 'Banheiros', getValue: (p) => p.bathrooms },
    { key: 'parking', label: 'Vagas', getValue: (p) => p.parkingSpots },
    { key: 'neighborhood', label: 'Bairro', getValue: (p) => p.neighborhood },
    { key: 'city', label: 'Cidade', getValue: (p) => p.city },
    { key: 'condo', label: 'Condomínio', getValue: (p) => p.condominioPrice ? formatCurrency(p.condominioPrice) + '/mês' : '—' },
    { key: 'iptu', label: 'IPTU anual', getValue: (p) => p.iptuPrice ? formatCurrency(p.iptuPrice) : '—' },
    { key: 'broker', label: 'Corretor', getValue: (p) => p.brokerName ?? '—' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/imoveis" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar aos imóveis
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <GitCompareArrows className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Comparar imóveis</h1>
              <p className="text-sm text-gray-500">Compare até {MAX_COMPARE} imóveis lado a lado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Selector bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">
              {selectedIds.length} de {MAX_COMPARE} imóveis selecionados
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSelector(!showSelector)}
              disabled={selectedIds.length >= MAX_COMPARE}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar imóvel
            </Button>
          </div>

          {/* Property selector dropdown */}
          {showSelector && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 mb-3">Clique em um imóvel para adicioná-lo à comparação:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {available.map((p) => {
                  const img = p.images.find((i) => i.isPrimary) ?? p.images[0]
                  return (
                    <button
                      key={p.id}
                      onClick={() => { toggleProperty(p.id); setShowSelector(false) }}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary/50 hover:bg-primary/5 text-left transition-colors"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{p.title}</p>
                        <p className="text-xs text-gray-400">{formatCurrency(p.price)}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {selected.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <GitCompareArrows className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <p className="font-semibold text-gray-500 mb-2">Nenhum imóvel selecionado</p>
            <p className="text-sm text-gray-400 mb-4">Adicione até {MAX_COMPARE} imóveis para comparar características.</p>
            <Button onClick={() => setShowSelector(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar imóvel
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Property headers */}
            <div className={`grid border-b border-gray-100`} style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
              <div className="p-4 bg-gray-50" />
              {selected.map((p) => {
                const img = p.images.find((i) => i.isPrimary) ?? p.images[0]
                return (
                  <div key={p.id} className="p-4 border-l border-gray-100">
                    <div className="relative h-36 rounded-lg overflow-hidden mb-3">
                      <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="300px" />
                      <button
                        onClick={() => removeProperty(p.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{p.title}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {p.neighborhood}, {p.city}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{p.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{p.bathrooms}</span>
                      <span className="flex items-center gap-1"><Car className="w-3 h-3" />{p.parkingSpots}</span>
                    </div>
                    <Link href={`/imoveis/${p.slug}`} className="mt-3 block">
                      <Button size="sm" variant="outline" className="w-full text-xs">Ver imóvel</Button>
                    </Link>
                  </div>
                )
              })}
              {/* Empty slots */}
              {Array.from({ length: MAX_COMPARE - selected.length }).map((_, i) => (
                <div key={`empty-${i}`} className="p-4 border-l border-gray-100">
                  <button
                    onClick={() => setShowSelector(true)}
                    className="w-full h-36 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-300 hover:border-primary/40 hover:text-primary/40 transition-colors mb-3"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-xs">Adicionar</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison rows */}
            {rows.map((row, rowIdx) => (
              <div
                key={row.key}
                className={`grid border-b border-gray-50 ${rowIdx % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}
              >
                <div className="px-4 py-3.5 flex items-center">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{row.label}</span>
                </div>
                {selected.map((p) => (
                  <div key={p.id} className="px-4 py-3.5 border-l border-gray-100 flex items-center">
                    <span className="text-sm text-gray-800">{row.getValue(p)}</span>
                  </div>
                ))}
                {Array.from({ length: MAX_COMPARE - selected.length }).map((_, i) => (
                  <div key={`empty-cell-${i}`} className="px-4 py-3.5 border-l border-gray-100">
                    <Minus className="w-4 h-4 text-gray-200" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
