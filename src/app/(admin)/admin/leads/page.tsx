import { Metadata } from 'next'
import { MessageSquare, Phone, Mail, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Admin — Leads' }

type LeadStatus = 'novo' | 'em_atendimento' | 'convertido' | 'perdido'

const mockLeads = [
  { id: '1', name: 'Ana Paula Silva', email: 'ana@email.com', phone: '(11) 98765-4321', message: 'Tenho interesse na Casa de Luxo no Jardins. Gostaria de agendar uma visita.', property: 'Casa de Luxo no Jardins', status: 'novo' as LeadStatus, createdAt: '2024-03-10T14:30:00Z' },
  { id: '2', name: 'Carlos Mendes', email: 'carlos@email.com', phone: '(11) 91234-5678', message: 'Quero mais informações sobre o apartamento em Pinheiros.', property: 'Apartamento Moderno em Pinheiros', status: 'em_atendimento' as LeadStatus, createdAt: '2024-03-09T10:15:00Z' },
  { id: '3', name: 'Fernanda Costa', email: 'fernanda@email.com', phone: '(11) 99876-5432', message: 'Interesse no terreno em Campinas para construção de casa.', property: 'Terreno em Alphaville Campinas', status: 'convertido' as LeadStatus, createdAt: '2024-03-08T16:45:00Z' },
  { id: '4', name: 'Roberto Lima', email: 'roberto@email.com', phone: '(11) 94567-8901', message: 'Gostaria de saber se o apartamento em Moema ainda está disponível.', property: 'Apartamento para Alugar em Moema', status: 'perdido' as LeadStatus, createdAt: '2024-03-07T09:00:00Z' },
  { id: '5', name: 'Juliana Rocha', email: 'juliana@email.com', phone: '(19) 98877-6655', message: 'Interesse na sala comercial de Santos. Pode enviar mais fotos?', property: 'Sala Comercial em Santos', status: 'novo' as LeadStatus, createdAt: '2024-03-10T11:20:00Z' },
  { id: '6', name: 'Marcelo Santos', email: 'marcelo@email.com', phone: '(19) 93344-5566', message: 'Quero visitar a casa em Barão Geraldo este fim de semana.', property: 'Casa em Barão Geraldo', status: 'em_atendimento' as LeadStatus, createdAt: '2024-03-09T14:00:00Z' },
]

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  novo: { label: 'Novo', className: 'bg-blue-100 text-blue-700' },
  em_atendimento: { label: 'Em Atendimento', className: 'bg-yellow-100 text-yellow-700' },
  convertido: { label: 'Convertido', className: 'bg-green-100 text-green-700' },
  perdido: { label: 'Perdido', className: 'bg-red-100 text-red-700' },
}

const counts = {
  total: mockLeads.length,
  novo: mockLeads.filter((l) => l.status === 'novo').length,
  em_atendimento: mockLeads.filter((l) => l.status === 'em_atendimento').length,
  convertido: mockLeads.filter((l) => l.status === 'convertido').length,
}

export default function AdminLeadsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500">{counts.total} contatos recebidos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: counts.total, className: 'border-gray-200' },
            { label: 'Novos', value: counts.novo, className: 'border-blue-200 bg-blue-50' },
            { label: 'Em Atendimento', value: counts.em_atendimento, className: 'border-yellow-200 bg-yellow-50' },
            { label: 'Convertidos', value: counts.convertido, className: 'border-green-200 bg-green-50' },
          ].map((item) => (
            <div key={item.label} className={`bg-white rounded-xl border p-4 text-center shadow-sm ${item.className}`}>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          {mockLeads.map((lead) => {
            const status = statusConfig[lead.status]
            const date = new Date(lead.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
            return (
              <div key={lead.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="font-medium text-gray-700">{lead.property}</span>
                    </p>
                    <p className="text-sm text-gray-600 italic mb-3">&quot;{lead.message}&quot;</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Mail className="w-3.5 h-3.5" />{lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Phone className="w-3.5 h-3.5" />{lead.phone}
                      </a>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />{date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                      <Phone className="w-3 h-3" /> WhatsApp
                    </a>
                    <a href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                      <Mail className="w-3 h-3" /> E-mail
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
