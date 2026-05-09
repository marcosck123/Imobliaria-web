'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Ruler,
  User,
  Phone,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react'
import { pendingProperties as initialPending } from '@/lib/mock-data'
import { Property, ApprovalStatus } from '@/types/property'
import { formatCurrency, formatArea } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type LocalStatus = 'PENDENTE' | 'APROVADO' | 'REJEITADO'

interface PropertyState {
  property: Property
  localStatus: LocalStatus
  rejectionReason: string
  showRejectForm: boolean
  showDetails: boolean
}

export default function PendentesPage() {
  const [items, setItems] = useState<PropertyState[]>(
    initialPending.map((p) => ({
      property: p,
      localStatus: 'PENDENTE',
      rejectionReason: '',
      showRejectForm: false,
      showDetails: false,
    }))
  )
  const [filter, setFilter] = useState<'TODOS' | LocalStatus>('TODOS')

  const update = (id: string, patch: Partial<PropertyState>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.property.id === id ? { ...item, ...patch } : item
      )
    )
  }

  const approve = (id: string) => {
    update(id, { localStatus: 'APROVADO', showRejectForm: false })
  }

  const startReject = (id: string) => {
    update(id, { showRejectForm: true })
  }

  const confirmReject = (id: string, reason: string) => {
    if (!reason.trim()) return
    update(id, { localStatus: 'REJEITADO', showRejectForm: false })
  }

  const cancelReject = (id: string) => {
    update(id, { showRejectForm: false, rejectionReason: '' })
  }

  const counts = {
    TODOS: items.length,
    PENDENTE: items.filter((i) => i.localStatus === 'PENDENTE').length,
    APROVADO: items.filter((i) => i.localStatus === 'APROVADO').length,
    REJEITADO: items.filter((i) => i.localStatus === 'REJEITADO').length,
  }

  const filtered =
    filter === 'TODOS' ? items : items.filter((i) => i.localStatus === filter)

  const tabs: { key: 'TODOS' | LocalStatus; label: string; count: number }[] = [
    { key: 'TODOS', label: 'Todos', count: counts.TODOS },
    { key: 'PENDENTE', label: 'Pendentes', count: counts.PENDENTE },
    { key: 'APROVADO', label: 'Aprovados', count: counts.APROVADO },
    { key: 'REJEITADO', label: 'Rejeitados', count: counts.REJEITADO },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Imóveis aguardando análise</h1>
        <p className="text-gray-500 text-sm mt-1">
          Revise os imóveis enviados pelos corretores antes de publicar no site.
        </p>
      </div>

      {/* Info banner */}
      {counts.PENDENTE > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {counts.PENDENTE} imóvel(is) aguardando sua aprovação
            </p>
            <p className="text-sm text-amber-700 mt-0.5">
              Os imóveis aprovados ficam visíveis imediatamente no site. Os rejeitados voltam para o corretor com o motivo.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                filter === tab.key ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhum imóvel nesta categoria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const p = item.property
            const primaryImage = p.images.find((img) => img.isPrimary) ?? p.images[0]

            return (
              <div
                key={p.id}
                className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                  item.localStatus === 'APROVADO'
                    ? 'border-green-200'
                    : item.localStatus === 'REJEITADO'
                    ? 'border-red-200'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-52 h-40 md:h-auto flex-shrink-0">
                    {primaryImage && (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 208px"
                      />
                    )}
                    <div className="absolute top-2 left-2">
                      {item.localStatus === 'PENDENTE' && (
                        <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pendente
                        </span>
                      )}
                      {item.localStatus === 'APROVADO' && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Aprovado
                        </span>
                      )}
                      {item.localStatus === 'REJEITADO' && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Rejeitado
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="outline">{p.type}</Badge>
                          <Badge variant={p.status === 'Aluguel' ? 'aluguel' : 'venda'}>
                            {p.status}
                          </Badge>
                        </div>
                        <h2 className="text-base font-bold text-gray-900">{p.title}</h2>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span>{p.neighborhood}, {p.city}/{p.state}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-primary">{formatCurrency(p.price)}</p>
                        {p.status === 'Aluguel' && (
                          <p className="text-gray-400 text-xs">/mês</p>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5 text-gray-400" />
                        {formatArea(p.area)}
                      </span>
                      {p.bedrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-gray-400" />
                          {p.bedrooms} quarto{p.bedrooms > 1 ? 's' : ''}
                        </span>
                      )}
                      {p.bathrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-gray-400" />
                          {p.bathrooms} banheiro{p.bathrooms > 1 ? 's' : ''}
                        </span>
                      )}
                      {p.parkingSpots > 0 && (
                        <span className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-gray-400" />
                          {p.parkingSpots} vaga{p.parkingSpots > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {/* Broker info */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-medium">{p.brokerName}</span>
                      </div>
                      {p.brokerPhone && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{p.brokerPhone}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">
                        Enviado em {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    {/* Expandable description */}
                    <div className="mt-3">
                      <button
                        onClick={() => update(p.id, { showDetails: !item.showDetails })}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {item.showDetails ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" /> Ocultar descrição
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" /> Ver descrição completa
                          </>
                        )}
                      </button>
                      {item.showDetails && (
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    {item.localStatus === 'PENDENTE' && !item.showRejectForm && (
                      <div className="flex items-center gap-3 mt-4">
                        <Button
                          size="sm"
                          onClick={() => approve(p.id)}
                          className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Aprovar e publicar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startReject(p.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          Rejeitar
                        </Button>
                      </div>
                    )}

                    {/* Rejection form */}
                    {item.showRejectForm && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" />
                          Motivo da rejeição
                        </p>
                        <p className="text-xs text-red-700 mb-3">
                          O corretor receberá este motivo para poder corrigir e reenviar o imóvel.
                        </p>
                        <textarea
                          rows={3}
                          placeholder="Descreva o motivo (ex: fotos com baixa qualidade, descrição incompleta, endereço incorreto...)"
                          value={item.rejectionReason}
                          onChange={(e) =>
                            update(p.id, { rejectionReason: e.target.value })
                          }
                          className="w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                        />
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => confirmReject(p.id, item.rejectionReason)}
                            disabled={!item.rejectionReason.trim()}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Confirmar rejeição
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelReject(p.id)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Approved feedback */}
                    {item.localStatus === 'APROVADO' && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>
                          Imóvel aprovado e publicado no site com sucesso.
                        </span>
                      </div>
                    )}

                    {/* Rejected feedback */}
                    {item.localStatus === 'REJEITADO' && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        <div className="flex items-center gap-2 text-sm text-red-700 mb-1">
                          <XCircle className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">Imóvel rejeitado. O corretor será notificado.</span>
                        </div>
                        {item.rejectionReason && (
                          <p className="text-xs text-red-600 ml-6">
                            Motivo: &quot;{item.rejectionReason}&quot;
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
