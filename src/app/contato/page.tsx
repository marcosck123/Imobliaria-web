import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a ImóvelPrime. Estamos prontos para ajudar você a encontrar o imóvel ideal.',
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    lines: ['Av. Paulista, 1000 — Conjunto 910', 'Bela Vista, São Paulo — SP'],
  },
  {
    icon: Phone,
    title: 'Telefone',
    lines: ['(11) 3000-0000', '(11) 99999-9999 (WhatsApp)'],
  },
  {
    icon: Mail,
    title: 'E-mail',
    lines: ['contato@imovelprime.com.br', 'vendas@imovelprime.com.br'],
  },
  {
    icon: Clock,
    title: 'Horário de Atendimento',
    lines: ['Segunda a Sexta: 8h às 18h', 'Sábado: 9h às 14h'],
  },
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Fale Conosco</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Nossa equipe está pronta para tirar suas dúvidas e ajudar a encontrar o imóvel perfeito para você.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Envie uma mensagem</h2>
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm text-gray-500">{line}</p>
                    ))}
                  </div>
                </div>
              )
            })}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-1 opacity-40" />
                  <p className="text-sm">Av. Paulista, 1000 — São Paulo/SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
