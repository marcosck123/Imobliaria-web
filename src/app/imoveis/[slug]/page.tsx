import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, BedDouble, Bath, Car, Ruler, DollarSign, Receipt, ChevronRight, Phone, Mail } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { formatCurrency, formatArea } from '@/lib/utils'
import { PropertyImageGallery } from '@/components/property/property-image-gallery'
import { PropertyCard } from '@/components/property/property-card'
import { PropertyContactForm } from '@/components/property/property-contact-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PropertyStatus } from '@/types/property'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return mockProperties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = mockProperties.find((p) => p.slug === params.slug)
  if (!property) return {}
  return { title: property.title, description: property.description.slice(0, 160) }
}

export default function PropertyDetailPage({ params }: PageProps) {
  const property = mockProperties.find((p) => p.slug === params.slug)
  if (!property) notFound()

  const isAluguel = property.status === PropertyStatus.ALUGUEL
  const related = mockProperties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3)

  const details = [
    { label: 'Área total', value: formatArea(property.area), icon: Ruler },
    ...(property.bedrooms > 0 ? [{ label: 'Quartos', value: `${property.bedrooms} quarto${property.bedrooms > 1 ? 's' : ''}`, icon: BedDouble }] : []),
    ...(property.bathrooms > 0 ? [{ label: 'Banheiros', value: `${property.bathrooms} banheiro${property.bathrooms > 1 ? 's' : ''}`, icon: Bath }] : []),
    ...(property.parkingSpots > 0 ? [{ label: 'Vagas', value: `${property.parkingSpots} vaga${property.parkingSpots > 1 ? 's' : ''}`, icon: Car }] : []),
    ...(property.condominioPrice ? [{ label: 'Condomínio', value: formatCurrency(property.condominioPrice) + '/mês', icon: DollarSign }] : []),
    ...(property.iptuPrice ? [{ label: 'IPTU', value: formatCurrency(property.iptuPrice) + '/ano', icon: Receipt }] : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/imoveis" className="hover:text-primary transition-colors">Imóveis</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0 space-y-6">
            <PropertyImageGallery images={property.images} title={property.title} />

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={isAluguel ? 'aluguel' : 'venda'}>{property.status}</Badge>
                    <Badge variant="outline">{property.type}</Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{property.address} — {property.neighborhood}, {property.city}/{property.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{formatCurrency(property.price)}</p>
                  {isAluguel && <p className="text-gray-500 text-sm">/mês</p>}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Características</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {details.map((detail) => {
                  const Icon = detail.icon
                  return (
                    <div key={detail.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{detail.label}</p>
                        <p className="font-semibold text-gray-900 text-sm">{detail.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Localização</h2>
              <div className="flex items-start gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{property.address}, {property.neighborhood} — {property.city}/{property.state} — CEP {property.zipCode}</span>
              </div>
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-1 opacity-40" />
                  <p className="text-sm">Mapa disponível em breve</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Tenho interesse</h2>
                <p className="text-sm text-gray-500 mb-5">Preencha seus dados e entraremos em contato.</p>
                <PropertyContactForm />
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                    <Phone className="w-4 h-4" />(11) 99999-9999 — WhatsApp
                  </a>
                  <a href="mailto:contato@imovelprime.com.br" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />contato@imovelprime.com.br
                  </a>
                </div>
              </div>
              <div className="bg-primary text-white rounded-lg p-5">
                <p className="font-semibold mb-1">Precisa de financiamento?</p>
                <p className="text-sm text-white/70 mb-4">Simule agora e descubra as melhores condições para você.</p>
                <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">Simular financiamento</Button>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Imóveis similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
