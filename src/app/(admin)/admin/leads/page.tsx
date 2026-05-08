import { Metadata } from 'next'
import { MessageSquare, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Leads — Admin' }

type LeadStatus = 'novo' | 'em_atendimento' | 'convertido' | 'perdido'

const mockLeads = [
  { id: '1', name: 'Roberto Alves', email: 'roberto@email.com', phone: '(11) 98765-4321', property: 'Casa de Luxo no Jardins', message: 'Gostaria de agendar uma visita para o final de semana.', status: 'novo' as LeadStatus, date: '2024-05-04T09:30:00Z' },
  { id: '2', name: 'Camila Ferreira', email: 'camila@email.com', phone: '(11) 97654-3210', property: 'Apartamento Moderno em Pinheiros', message: 'Tenho interesse em comprar. Qual o valor mínimo aceito?', status: 'em_atendimento' as LeadStatus, date: '2024-05-03T14:20:00Z' },
  { id: '3', name: 'Lucas Souza', email: 'lucas@email.com', phone: '(11) 96543-2109', property: 'Apartamento para Alugar em Moema', message: 'Preciso do imóvel para agosto. Aceita animais domésticos?', status: 'em_atendimento' as LeadStatus, date: '2024-05-02T11:00:00Z' },
  { id: '4', name: 'Patrícia Lima', email: 'patricia@email.com', phone: '(11) 95432-1098', property: 'Casa em Condomínio Barão Geraldo', message: 'Fechei negócio! Enviarei os documentos amanhã.', status: 'convertido' as LeadStatus, date: '2024-04-30T16:45:00Z' },
  { id: '5', name: 'Marcos Nunes', email: 'marcos@email.com', phone: '(11) 94321-0987', property: 'Terreno em Alphaville Campinas', message: 'Não tenho mais interesse. Achei algo melhor.', status: 'perdido' as LeadStatus, date: '2024-04-28T10:15:00Z' },
  { id: '6', name: 'Juliana Costa', email: 'juliana@email.com', phone: '(11) 93210-9876', property: 'Apartamento Beira-Mar em Santos', message: 'Posso visitar no sábado às 10h? Moro em SP mas posso ir.', status: 'novo' as LeadStatus, date: '2024-05-04T08:00:00Z' },
]

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  novo: { label: 'Novo', className: 'bg-blue-100 text-blue-700' },
  em_atendimento: { label: 'Em atendimento', className: 'bg-amber-100 text-amber-700' },
  convertido: { label: 'Convertido', className: 'bg-green-100 text-green-700' },
  perdido: { label: 'Perdido', className: 'bg-gray-100 text-gray-500' },
}

export default function AdminLeadsPage() {
  const novos = mockLeads.filter((l) => l.status === 'novo').length
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{mockLeads.length} contatos recebidos · {novos} novo{novos !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="space-y-4">
        {mockLeads.map((lead) => {
          const cfg = statusConfig[lead.status]
          return (
            <div key={lead.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{lead.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-900">{lead.name}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.className}`}>{cfg.label}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">Interesse em: <span className="text-gray-700 font-medium">{lead.property}</span></p>
                    <p className="text-sm text-gray-600 mt-2 italic">&ldquo;{lead.message}&rdquo;</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{lead.email}</span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{lead.phone}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{new Date(lead.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="gap-1.5 border-green-200 text-green-700 hover:bg-green-50"><MessageSquare className="w-3.5 h-3.5" />WhatsApp</Button>
                  </a>
                  <a href={`mailto:${lead.email}`}>
                    <Button size="sm" variant="outline" className="gap-1.5"><Mail className="w-3.5 h-3.5" />E-mail</Button>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
