'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, CheckCircle2, Loader2, Trash2 } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

const PROPERTY_TYPES = ['Casa', 'Apartamento', 'Cobertura', 'Terreno', 'Comercial', 'Studio']
const PROPERTY_STATUSES = ['Venda', 'Aluguel']
const AMENITIES = [
  'Piscina', 'Academia', 'Portaria 24h', 'Churrasqueira', 'Salão de festas',
  'Playground', 'Quadra esportiva', 'Pet friendly', 'Elevador', 'Ar-condicionado',
  'Lavanderia', 'Jardim', 'Varanda', 'Home office', 'Automação residencial',
]

export default function EditarImovelPage() {
  const params = useParams()
  const router = useRouter()
  const property = mockProperties.find((p) => p.id === params.id)

  const [form, setForm] = useState({
    title: property?.title ?? '',
    type: property?.type ?? 'Apartamento',
    status: property?.status ?? 'Venda',
    price: property?.price ?? 0,
    condominioPrice: property?.condominioPrice ?? 0,
    iptuPrice: property?.iptuPrice ?? 0,
    area: property?.area ?? 0,
    bedrooms: property?.bedrooms ?? 1,
    bathrooms: property?.bathrooms ?? 1,
    parkingSpots: property?.parkingSpots ?? 0,
    address: property?.address ?? '',
    neighborhood: property?.neighborhood ?? '',
    city: property?.city ?? '',
    state: property?.state ?? 'SP',
    zipCode: property?.zipCode ?? '',
    description: property?.description ?? '',
    amenities: [] as string[],
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)

  if (!property) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-gray-500">Imóvel não encontrado.</p>
        <Link href="/admin/imoveis">
          <Button variant="outline" className="mt-4">Voltar</Button>
        </Link>
      </div>
    )
  }

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function fetchCep(cep: string) {
    const clean = cep.replace(/\D/g, '')
    if (clean.length !== 8) return
    setCepLoading(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          address: data.logradouro ?? prev.address,
          neighborhood: data.bairro ?? prev.neighborhood,
          city: data.localidade ?? prev.city,
          state: data.uf ?? prev.state,
        }))
      }
    } catch {}
    finally { setCepLoading(false) }
  }

  function toggleAmenity(a: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }))
  }

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 1200)
  }

  const inputClass = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/imoveis" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar aos imóveis
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Editar imóvel</h1>
          <p className="text-gray-500 text-sm mt-0.5 truncate max-w-md">{property.title}</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Salvo!
            </span>
          )}
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Informações básicas</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Título do anúncio</label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Tipo</label>
                <select value={form.type} onChange={(e) => set('type', e.target.value)} className={inputClass}>
                  {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Negócio</label>
                <select value={form.status} onChange={(e) => set('status', e.target.value)} className={inputClass}>
                  {PROPERTY_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Descrição</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={4}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Preços</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Preço de venda/aluguel', field: 'price' },
              { label: 'Condomínio (mensal)', field: 'condominioPrice' },
              { label: 'IPTU (anual)', field: 'iptuPrice' },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className={labelClass}>{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">R$</span>
                  <input
                    type="number"
                    value={(form as Record<string, unknown>)[field] as number}
                    onChange={(e) => set(field, Number(e.target.value))}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Detalhes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Área (m²)', field: 'area', min: 1 },
              { label: 'Quartos', field: 'bedrooms', min: 0 },
              { label: 'Banheiros', field: 'bathrooms', min: 1 },
              { label: 'Vagas', field: 'parkingSpots', min: 0 },
            ].map(({ label, field, min }) => (
              <div key={field}>
                <label className={labelClass}>{label}</label>
                <input
                  type="number"
                  min={min}
                  value={(form as Record<string, unknown>)[field] as number}
                  onChange={(e) => set(field, Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Localização</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>CEP</label>
              <div className="flex gap-2">
                <input
                  value={form.zipCode}
                  onChange={(e) => set('zipCode', e.target.value)}
                  onBlur={(e) => fetchCep(e.target.value)}
                  placeholder="00000-000"
                  className={`${inputClass} flex-1`}
                />
                {cepLoading && <Loader2 className="w-5 h-5 animate-spin text-gray-400 self-center" />}
              </div>
            </div>
            <div>
              <label className={labelClass}>Endereço</label>
              <input value={form.address} onChange={(e) => set('address', e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Bairro</label>
                <input value={form.neighborhood} onChange={(e) => set('neighborhood', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cidade</label>
                <input value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Comodidades</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {AMENITIES.map((a) => (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors ${
                  form.amenities.includes(a)
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  form.amenities.includes(a) ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {form.amenities.includes(a) && (
                    <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-white">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h2 className="font-semibold text-red-800 mb-1">Zona de perigo</h2>
          <p className="text-sm text-red-600 mb-3">Ao excluir este imóvel, todos os dados serão removidos permanentemente.</p>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 gap-2">
            <Trash2 className="w-4 h-4" />
            Excluir imóvel
          </Button>
        </div>
      </div>
    </div>
  )
}
