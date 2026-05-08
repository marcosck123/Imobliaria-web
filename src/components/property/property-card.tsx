'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, BedDouble, Bath, Car, Square } from 'lucide-react'
import { Property, PropertyStatus } from '@/types/property'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatArea, cn } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0]
  const isAluguel = property.status === PropertyStatus.ALUGUEL

  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border border-gray-100 flex flex-col">
      <Link href={`/imoveis/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Square className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant={isAluguel ? 'aluguel' : 'venda'}>{property.status}</Badge>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setIsFavorited(!isFavorited) }}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
            isFavorited ? 'bg-red-500 text-white shadow-md' : 'bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500 shadow-sm'
          )}
          aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={cn('w-4 h-4', isFavorited && 'fill-current')} />
        </button>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-2xl font-bold text-primary">{formatCurrency(property.price)}</span>
          {isAluguel && <span className="text-gray-500 text-sm font-normal">/mês</span>}
        </div>
        <Link href={`/imoveis/${property.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors duration-200 line-clamp-2 mb-1 leading-snug">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span className="truncate">{property.neighborhood}, {property.city}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            {property.area > 0 && (
              <div className="flex items-center gap-1.5">
                <Square className="w-4 h-4 text-gray-400" />
                <span>{formatArea(property.area)}</span>
              </div>
            )}
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-gray-400" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-gray-400" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.parkingSpots > 0 && (
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-gray-400" />
                <span>{property.parkingSpots}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
