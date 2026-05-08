'use client'

import { useState } from 'react'
import {
  Building2,
  MapPin,
  Info,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Send,
} from 'lucide-react'
import { PropertyType, PropertyStatus } from '@/types/property'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3 | 4

interface FormData {
  // Step 1 — Básico
  title: string
  type: PropertyType | ''
  status: PropertyStatus | ''
  price: string
  condominioPrice: string
  iptuPrice: string
  // Step 2 — Localização
  address: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  // Step 3 — Detalhes
  area: string
  bedrooms: string
  bathrooms: string
  parkingSpots: string
  // Step 4 — Descrição e fotos
  description: string
  imageUrls: string
}

const INITIAL: FormData = {
  title: '',
  type: '',
  status: '',
  price: '',
  condominioPrice: '',
  iptuPrice: '',
  address: '',
  neighborhood: '',
  city: '',
  state: 'SP',
  zipCode: '',
  area: '',
  bedrooms: '',
  bathrooms: '',
  parkingSpots: '',
  description: '',
  imageUrls: '',
}

const steps = [
  { id: 1 as Step, label: 'Informações', icon: Building2 },
  { id: 2 as Step, label: 'Localização', icon: MapPin },
  { id: 3 as Step, label: 'Detalhes', icon: Info },
  { id: 4 as Step, label: 'Fotos', icon: ImageIcon },
]

export default function NovoImovelPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (step === 1) {
      if (!form.title.trim()) newErrors.title = 'Título obrigatório'
      if (!form.type) newErrors.type = 'Tipo obrigatório'
      if (!form.status) newErrors.status = 'Status obrigatório'
      if (!form.price || isNaN(Number(form.price))) newErrors.price = 'Preço inválido'
    }
    if (step === 2) {
      if (!form.address.trim()) newErrors.address = 'Endereço obrigatório'
      if (!form.neighborhood.trim()) newErrors.neighborhood = 'Bairro obrigatório'
      if (!form.city.trim()) newErrors.city = 'Cidade obrigatória'
      if (!form.zipCode.trim()) newErrors.zipCode = 'CEP obrigatório'
    }
    if (step === 3) {
      if (!form.area || isNaN(Number(form.area))) newErrors.area = 'Área inválida'
    }
    if (step === 4) {
      if (!form.description.trim()) newErrors.description = 'Descrição obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (!validateStep()) return
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s))
  }

  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))

  const submit = () => {
    if (!validateStep()) return
    setSubmitted(true)
  }

  const reset = () => {
    setForm(INITIAL)
    setStep(1)
    setSubmitted(false)
    setErrors({})
  }

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Imóvel enviado para análise!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            <strong className="text-gray-700">&ldquo;{form.title}&rdquo;</strong> foi enviado com sucesso e está aguardando aprovação de um administrador.
          </p>
          <p className="text-gray-400 text-xs mb-8">
            Você será notificado assim que o imóvel for revisado. Imóveis aprovados ficam visíveis no site imediatamente.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={reset} className="w-full">
              Adicionar outro imóvel
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/imoveis/pendentes'}>
              Ver imóveis pendentes
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Adicionar novo imóvel</h1>
        <p className="text-gray-500 text-sm mt-1">
          Preencha as informações. O imóvel ficará em análise até a aprovação do administrador.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, idx) => {
          const Icon = s.icon
          const isActive = s.id === step
          const isDone = s.id < step
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all',
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : isDone
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-200 bg-white text-gray-400'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={cn(
                    'text-xs font-medium whitespace-nowrap',
                    isActive ? 'text-primary' : isDone ? 'text-green-600' : 'text-gray-400'
                  )}
                >
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 mb-5 transition-all',
                    isDone ? 'bg-green-400' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Step 1 — Informações básicas */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-base mb-4">Informações básicas</h2>
            <div className="space-y-1.5">
              <Label htmlFor="title">Título do imóvel *</Label>
              <Input
                id="title"
                placeholder="Ex: Apartamento 3 quartos no Jardins"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                className={errors.title ? 'border-red-400' : ''}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="type">Tipo *</Label>
                <select
                  id="type"
                  value={form.type}
                  onChange={(e) => set('type', e.target.value)}
                  className={cn(
                    'w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring',
                    errors.type ? 'border-red-400' : 'border-input'
                  )}
                >
                  <option value="">Selecione...</option>
                  {Object.values(PropertyType).map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status">Finalidade *</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => set('status', e.target.value)}
                  className={cn(
                    'w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring',
                    errors.status ? 'border-red-400' : 'border-input'
                  )}
                >
                  <option value="">Selecione...</option>
                  {Object.values(PropertyStatus).map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="price">
                  Preço (R$) * {form.status === 'Aluguel' ? '/mês' : ''}
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="350000"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  className={errors.price ? 'border-red-400' : ''}
                />
                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="condominioPrice">Condomínio (R$/mês)</Label>
                <Input
                  id="condominioPrice"
                  type="number"
                  placeholder="800"
                  value={form.condominioPrice}
                  onChange={(e) => set('condominioPrice', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="iptuPrice">IPTU (R$/ano)</Label>
                <Input
                  id="iptuPrice"
                  type="number"
                  placeholder="3600"
                  value={form.iptuPrice}
                  onChange={(e) => set('iptuPrice', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Localização */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-base mb-4">Localização</h2>
            <div className="space-y-1.5">
              <Label htmlFor="address">Endereço completo *</Label>
              <Input
                id="address"
                placeholder="Rua das Flores, 123, Apto 42"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                className={errors.address ? 'border-red-400' : ''}
              />
              {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  placeholder="Jardins"
                  value={form.neighborhood}
                  onChange={(e) => set('neighborhood', e.target.value)}
                  className={errors.neighborhood ? 'border-red-400' : ''}
                />
                {errors.neighborhood && <p className="text-xs text-red-500">{errors.neighborhood}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  placeholder="01426-001"
                  value={form.zipCode}
                  onChange={(e) => set('zipCode', e.target.value)}
                  className={errors.zipCode ? 'border-red-400' : ''}
                />
                {errors.zipCode && <p className="text-xs text-red-500">{errors.zipCode}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  placeholder="São Paulo"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  className={errors.city ? 'border-red-400' : ''}
                />
                {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state">Estado</Label>
                <select
                  id="state"
                  value={form.state}
                  onChange={(e) => set('state', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'DF', 'CE', 'PE', 'AM'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Detalhes */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-base mb-4">Características do imóvel</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="area">Área total (m²) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="120"
                  value={form.area}
                  onChange={(e) => set('area', e.target.value)}
                  className={errors.area ? 'border-red-400' : ''}
                />
                {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bedrooms">Quartos</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  placeholder="3"
                  value={form.bedrooms}
                  onChange={(e) => set('bedrooms', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="bathrooms">Banheiros</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  placeholder="2"
                  value={form.bathrooms}
                  onChange={(e) => set('bathrooms', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="parkingSpots">Vagas de garagem</Label>
                <Input
                  id="parkingSpots"
                  type="number"
                  min="0"
                  placeholder="1"
                  value={form.parkingSpots}
                  onChange={(e) => set('parkingSpots', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
              <strong>Dica:</strong> Para terrenos e imóveis comerciais, deixe quartos e banheiros em 0.
            </div>
          </div>
        )}

        {/* Step 4 — Descrição e fotos */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-base mb-4">Descrição e fotos</h2>
            <div className="space-y-1.5">
              <Label htmlFor="description">Descrição completa *</Label>
              <textarea
                id="description"
                rows={5}
                placeholder="Descreva o imóvel em detalhes: acabamentos, diferenciais, localização, pontos de referência..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                className={cn(
                  'w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none',
                  errors.description ? 'border-red-400' : 'border-input'
                )}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
              <p className="text-xs text-gray-400">{form.description.length}/1000 caracteres</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imageUrls">URLs das fotos</Label>
              <textarea
                id="imageUrls"
                rows={3}
                placeholder="Cole aqui as URLs das fotos, uma por linha:&#10;https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg"
                value={form.imageUrls}
                onChange={(e) => set('imageUrls', e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
              <p className="text-xs text-gray-400">
                A primeira URL será a foto principal. Em breve: upload direto de imagens.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
              <strong>Importante:</strong> Ao enviar, este imóvel ficará em{' '}
              <strong>análise</strong> até aprovação de um administrador. Você receberá uma notificação com o resultado.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={back}
            disabled={step === 1}
            className="gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>

          <span className="text-xs text-gray-400">
            Etapa {step} de {steps.length}
          </span>

          {step < 4 ? (
            <Button onClick={next} className="gap-1.5">
              Próximo
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={submit} className="gap-1.5 bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" />
              Enviar para análise
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
