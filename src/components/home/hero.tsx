'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PropertyType } from '@/types/property'

export function Hero() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const [type, setType] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (type && type !== 'all') params.set('type', type)
    router.push(`/imoveis?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Mais de 500 imóveis disponíveis
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Encontre o imóvel{' '}
            <span className="text-accent">dos seus sonhos</span>
          </h1>

          <p className="text-lg text-primary-100 mb-8 leading-relaxed max-w-xl">
            Conectamos você ao imóvel ideal em São Paulo e região. Casas, apartamentos, terrenos e mais — com segurança e confiança há 15 anos.
          </p>

          <div className="bg-white rounded-xl shadow-2xl p-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Digite a cidade ou bairro..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-base placeholder:text-gray-400"
              />
            </div>
            <div className="w-full sm:w-44">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-0 border-l border-gray-200 rounded-none focus:ring-0 h-11 text-base">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value={PropertyType.CASA}>Casa</SelectItem>
                  <SelectItem value={PropertyType.APARTAMENTO}>Apartamento</SelectItem>
                  <SelectItem value={PropertyType.TERRENO}>Terreno</SelectItem>
                  <SelectItem value={PropertyType.COMERCIAL}>Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} size="lg" className="h-11 px-6">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {[
              { label: 'Apartamentos em SP', href: '/imoveis?type=Apartamento&city=São Paulo' },
              { label: 'Casas em Campinas', href: '/imoveis?type=Casa&city=Campinas' },
              { label: 'Imóveis para alugar', href: '/imoveis?status=Aluguel' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-primary-100 hover:text-white underline-offset-4 hover:underline transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
