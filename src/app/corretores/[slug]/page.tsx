import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Phone, Mail, MessageCircle, MapPin, Award, Clock, TrendingUp, Home, Check } from 'lucide-react'
import { mockBrokers } from '@/lib/mock-brokers'
import { mockProperties } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatArea } from '@/lib/utils'

export function generateStaticParams() {
  return mockBrokers.map((b) => ({ slug: b.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const broker = mockBrokers.find((b) => b.slug === params.slug)
  if (!broker) return {}
  return { title: `${broker.name} — Corretor | ImóvelPrime` }
}

export default function BrokerProfilePage({ params }: { params: { slug: string } }) {
  const broker = mockBrokers.find((b) => b.slug === params.slug)
  if (!broker) notFound()

  const listings = mockProperties.filter((p) => p.brokerId === broker.id).slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
              <Image
                src={broker.photo}
                alt={broker.name}
                fill
                className="object-cover rounded-2xl"
                sizes="160px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{broker.name}</h1>
                <Badge variant="outline" className="text-xs">CRECI {broker.creci}</Badge>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(broker.stats.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-700 ml-1">{broker.stats.rating}</span>
                <span className="text-sm text-gray-400">({broker.stats.reviews} avaliações)</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 max-w-2xl">{broker.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {broker.specialties.map((s) => (
                  <span key={s} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {broker.schedule}
              </div>
            </div>
            {/* Contact Card */}
            <div className="w-full md:w-72 bg-gray-50 rounded-2xl border border-gray-200 p-5 flex-shrink-0">
              <h3 className="font-semibold text-gray-900 mb-4">Falar com {broker.name.split(' ')[0]}</h3>
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/${broker.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
                <a href={`tel:${broker.phone}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    {broker.phone}
                  </Button>
                </a>
                <a href={`mailto:${broker.email}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="w-4 h-4" />
                    E-mail
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Imóveis vendidos', value: broker.stats.sold, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Imóveis alugados', value: broker.stats.rented, icon: Home, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Anos de experiência', value: broker.experience, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Avaliações', value: broker.stats.reviews, icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Listings */}
            {listings.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Imóveis de {broker.name.split(' ')[0]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listings.map((p) => {
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
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3" />
                            {p.neighborhood}, {p.city}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="font-bold text-primary">{formatCurrency(p.price)}</p>
                            <span className="text-xs text-gray-400">{formatArea(p.area)}</span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Avaliações de clientes</h2>
              <div className="space-y-4">
                {broker.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <p className="text-xs text-gray-400">{review.propertyType} · {new Date(review.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Especialidades
              </h3>
              <ul className="space-y-2">
                {broker.specialties.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Procurando um imóvel?</h3>
              <p className="text-sm text-gray-600 mb-4">
                {broker.name.split(' ')[0]} pode te ajudar a encontrar o imóvel ideal. Entre em contato agora!
              </p>
              <a href={`https://wa.me/${broker.whatsapp}?text=Olá ${broker.name.split(' ')[0]}, vi seu perfil no ImóvelPrime e gostaria de saber mais sobre os imóveis disponíveis.`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4" />
                  Iniciar conversa
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
