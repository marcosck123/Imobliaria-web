'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart, Search, Calendar, MapPin, Bed, Bath, Car,
  User, Settings, Bell, LogOut, Clock, Trash2, Eye
} from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatArea } from '@/lib/utils'

const mockFavorites = mockProperties.slice(0, 4).map((p) => p.id)

const mockSavedSearches = [
  { id: 's1', label: 'Apartamentos em Pinheiros', filters: '3 quartos · até R$ 1,5M', date: '2024-05-01', results: 12 },
  { id: 's2', label: 'Casas em condomínio em Alphaville', filters: '4+ quartos · piscina', date: '2024-04-22', results: 7 },
]

const mockVisitHistory = [
  { id: 'v1', title: 'Casa de Luxo no Jardins', date: '2024-05-04T14:30:00Z', slug: 'casa-luxo-jardins-sao-paulo' },
  { id: 'v2', title: 'Apartamento Moderno em Pinheiros', date: '2024-05-03T10:00:00Z', slug: 'apartamento-moderno-pinheiros' },
  { id: 'v3', title: 'Cobertura Duplex Moema', date: '2024-05-02T16:45:00Z', slug: 'cobertura-duplex-vista-panoramica-moema' },
]

const sidebarLinks = [
  { href: '/minha-conta', icon: User, label: 'Minha conta' },
  { href: '/minha-conta/favoritos', icon: Heart, label: 'Favoritos', active: true },
  { href: '/minha-conta/buscas', icon: Search, label: 'Buscas salvas' },
  { href: '/minha-conta/alertas', icon: Bell, label: 'Alertas' },
  { href: '/minha-conta/configuracoes', icon: Settings, label: 'Configurações' },
]

type Tab = 'favoritos' | 'buscas' | 'historico'

export default function FavoritosPage() {
  const [tab, setTab] = useState<Tab>('favoritos')
  const [favorites, setFavorites] = useState<string[]>(mockFavorites)

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((f) => f !== id))
  }

  const favoriteProperties = mockProperties.filter((p) => favorites.includes(p.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-primary/5">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <p className="font-semibold text-gray-900">Roberto Alves</p>
                <p className="text-sm text-gray-500">roberto@email.com</p>
              </div>
              <nav className="p-2">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        link.active
                          ? 'bg-primary text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="p-2 border-t border-gray-100">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Minha conta</h1>
              <p className="text-gray-500 text-sm mt-0.5">Gerencie seus imóveis favoritos e buscas salvas</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
              {([
                { key: 'favoritos', label: 'Favoritos', count: favorites.length },
                { key: 'buscas', label: 'Buscas salvas', count: mockSavedSearches.length },
                { key: 'historico', label: 'Histórico', count: mockVisitHistory.length },
              ] as { key: Tab; label: string; count: number }[]).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === t.key ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    tab === t.key ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Favorites tab */}
            {tab === 'favoritos' && (
              <div>
                {favoriteProperties.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="font-semibold text-gray-500 mb-2">Nenhum favorito ainda</p>
                    <p className="text-sm text-gray-400 mb-4">Explore os imóveis e salve os que mais gostar.</p>
                    <Link href="/imoveis">
                      <Button>Ver imóveis</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteProperties.map((p) => {
                      const img = p.images.find((i) => i.isPrimary) ?? p.images[0]
                      return (
                        <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative h-44">
                            <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="400px" />
                            <button
                              onClick={() => removeFavorite(p.id)}
                              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors group"
                            >
                              <Heart className="w-4 h-4 fill-red-500 text-red-500 group-hover:fill-red-600" />
                            </button>
                            <div className="absolute top-2 left-2">
                              <Badge variant={p.status === 'Aluguel' ? 'aluguel' : 'venda'}>{p.status}</Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="font-semibold text-gray-900 text-sm truncate">{p.title}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 mb-2">
                              <MapPin className="w-3 h-3" />
                              {p.neighborhood}, {p.city}
                            </div>
                            <div className="flex gap-3 text-xs text-gray-500 mb-3">
                              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{p.bedrooms}</span>
                              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{p.bathrooms}</span>
                              <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{p.parkingSpots}</span>
                              <span>{formatArea(p.area)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-primary">{formatCurrency(p.price)}</p>
                              <Link href={`/imoveis/${p.slug}`}>
                                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                                  <Eye className="w-3.5 h-3.5" />
                                  Ver imóvel
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Saved searches tab */}
            {tab === 'buscas' && (
              <div className="space-y-3">
                {mockSavedSearches.map((s) => (
                  <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{s.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{s.filters}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Salvo em {new Date(s.date).toLocaleDateString('pt-BR')} · {s.results} imóveis encontrados
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Search className="w-3.5 h-3.5" />
                        Buscar
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* History tab */}
            {tab === 'historico' && (
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-50">
                {mockVisitHistory.map((v) => (
                  <div key={v.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{v.title}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(v.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Link href={`/imoveis/${v.slug}`}>
                      <Button size="sm" variant="ghost" className="text-xs text-primary">Ver</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
