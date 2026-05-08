'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Rocket, MapPin, Bed, Bath, Car, ChevronRight, Clock, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

const TARGET_DATE = new Date('2025-09-01T00:00:00Z')

const lancamentos = [
  {
    id: 'l1',
    title: 'Residencial Jardim das Artes',
    developer: 'MRV Engenharia',
    neighborhood: 'Vila Madalena',
    city: 'São Paulo',
    price: 980000,
    priceUnit: 'A partir de',
    delivery: 'Dezembro 2025',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    progress: 65,
    units: 120,
    unitsSold: 78,
    status: 'Em obras',
    tags: ['Piscina', 'Academia', 'Rooftop', 'Coworking'],
    featured: true,
  },
  {
    id: 'l2',
    title: 'Alphaville Natura Residences',
    developer: 'Tegra Incorporadora',
    neighborhood: 'Alphaville',
    city: 'Barueri',
    price: 1450000,
    priceUnit: 'A partir de',
    delivery: 'Março 2026',
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    progress: 30,
    units: 64,
    unitsSold: 19,
    status: 'Pré-lançamento',
    tags: ['Condomínio fechado', 'Área verde', 'Playground', 'Pet friendly'],
    featured: false,
  },
  {
    id: 'l3',
    title: 'Moema Prime Tower',
    developer: 'Cyrela',
    neighborhood: 'Moema',
    city: 'São Paulo',
    price: 2100000,
    priceUnit: 'A partir de',
    delivery: 'Junho 2026',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    progress: 10,
    units: 48,
    unitsSold: 5,
    status: 'Pré-lançamento',
    tags: ['Alto padrão', 'Varanda gourmet', 'Spa', 'Concierge'],
    featured: false,
  },
  {
    id: 'l4',
    title: 'Santos Beira-Mar Exclusive',
    developer: 'Even Construtora',
    neighborhood: 'Gonzaga',
    city: 'Santos',
    price: 850000,
    priceUnit: 'A partir de',
    delivery: 'Agosto 2025',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    progress: 85,
    units: 96,
    unitsSold: 81,
    status: 'Últimas unidades',
    tags: ['Vista para o mar', 'Infraestrutura completa', 'Piscina'],
    featured: false,
  },
]

function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function update() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}

export default function LancamentosPage() {
  const countdown = useCountdown(TARGET_DATE)
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const featured = lancamentos[0]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero countdown banner */}
      <div className="bg-gradient-to-r from-[#1a3c5e] to-[#0f2743] text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Novos empreendimentos esperando por você
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Lançamentos ImóvelPrime</h1>
          <p className="text-blue-200 mb-8">Cadastre-se e garanta condições exclusivas de pré-venda</p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { label: 'dias', value: countdown.days },
              { label: 'horas', value: countdown.hours },
              { label: 'min', value: countdown.minutes },
              { label: 'seg', value: countdown.seconds },
            ].map((unit, i) => (
              <div key={unit.label}>
                <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 min-w-[64px] text-center">
                  <p className="text-3xl font-bold tabular-nums">{String(unit.value).padStart(2, '0')}</p>
                  <p className="text-xs text-blue-300 mt-0.5">{unit.label}</p>
                </div>
                {i < 3 && <span className="text-blue-300 font-bold ml-4">:</span>}
              </div>
            ))}
          </div>

          {/* Pre-registration form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Button type="submit" className="bg-[#e8a020] hover:bg-[#d4901c] text-white border-0 whitespace-nowrap">
                Quero saber mais
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-300 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Cadastro realizado! Entraremos em contato em breve.
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Featured */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Destaque da semana</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden md:flex">
            <div className="relative md:w-1/2 h-64 md:h-auto">
              <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="600px" />
              <div className="absolute top-3 left-3">
                <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {featured.status}
                </span>
              </div>
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{featured.developer}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{featured.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  {featured.neighborhood}, {featured.city}
                </div>
                <div className="flex gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{featured.bedrooms} quartos</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{featured.bathrooms} banheiros</span>
                  <span className="flex items-center gap-1"><Car className="w-4 h-4" />{featured.parking} vagas</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Obra: {featured.progress}%</span>
                    <span>Entrega: {featured.delivery}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${featured.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {featured.unitsSold} de {featured.units} unidades vendidas
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-400">{featured.priceUnit}</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(featured.price)}</p>
                </div>
                <Button className="gap-2">
                  Tenho interesse
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* All launches grid */}
        <h2 className="text-xl font-bold text-gray-900 mb-5">Todos os lançamentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lancamentos.slice(1).map((l) => (
            <div key={l.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src={l.image} alt={l.title} fill className="object-cover" sizes="400px" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    l.status === 'Últimas unidades'
                      ? 'bg-red-500 text-white'
                      : l.status === 'Pré-lançamento'
                      ? 'bg-amber-500 text-white'
                      : 'bg-primary text-white'
                  }`}>
                    {l.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-0.5">{l.developer}</p>
                <h3 className="font-bold text-gray-900 mb-1">{l.title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  {l.neighborhood}, {l.city}
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Obra: {l.progress}%</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{l.delivery}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${l.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">{l.priceUnit}</p>
                    <p className="font-bold text-primary">{formatCurrency(l.price)}</p>
                  </div>
                  <Button size="sm" variant="outline">Saiba mais</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
