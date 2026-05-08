'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { PropertyImage } from '@/types/property'
import { cn } from '@/lib/utils'

interface PropertyImageGalleryProps {
  images: PropertyImage[]
  title: string
}

export function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Sem imagens disponíveis</span>
      </div>
    )
  }

  const activeImage = images[activeIndex]
  const goToPrev = () => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goToNext = () => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <>
      <div className="space-y-3">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 group">
          <Image src={activeImage.url} alt={activeImage.alt || title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" priority />
          {images.length > 1 && (
            <>
              <button onClick={goToPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goToNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <button onClick={() => setIsLightboxOpen(true)} className="absolute top-3 right-3 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
            <ZoomIn className="w-4 h-4" />
          </button>
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button key={image.id} onClick={() => setActiveIndex(index)} className={cn('relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all duration-200', activeIndex === index ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-80')}>
                <Image src={image.url} alt={image.alt || `Imagem ${index + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsLightboxOpen(false)}>
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video">
              <Image src={activeImage.url} alt={activeImage.alt || title} fill className="object-contain" sizes="100vw" />
            </div>
            {images.length > 1 && (
              <>
                <button onClick={goToPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={goToNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <button onClick={() => setIsLightboxOpen(false)} className="absolute -top-12 right-0 text-white/80 hover:text-white text-sm">Fechar ✕</button>
          </div>
        </div>
      )}
    </>
  )
}
