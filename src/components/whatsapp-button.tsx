'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '5511999999999'
const DEFAULT_MESSAGE = 'Olá! Tenho interesse em um imóvel. Podem me ajudar?'

export function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={cn(
          'bg-white rounded-lg shadow-lg p-3 text-sm text-gray-700 max-w-[200px] text-center transition-all duration-300 relative',
          isTooltipVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <p className="font-medium text-primary">Fale conosco!</p>
        <p className="text-xs text-gray-500 mt-0.5">Atendimento via WhatsApp</p>
        <button
          onClick={() => setIsTooltipVisible(false)}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          aria-label="Fechar tooltip"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
        onMouseEnter={() => setIsTooltipVisible(true)}
        aria-label="Contato pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        <span className="absolute right-16 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
          Fale pelo WhatsApp
        </span>
      </a>
    </div>
  )
}
