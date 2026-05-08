import { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Eye,
  PlusCircle,
  ArrowRight,
} from 'lucide-react'
import { mockProperties, pendingProperties } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Dashboard — Admin' }

const statCards = [
  {
    label: 'Imóveis ativos',
    value: String(mockProperties.length),
    icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    href: '/admin/imoveis',
  },
  {
    label: 'Aguardando análise',
    value: String(pendingProperties.length),
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    href: '/admin/imoveis/pendentes',
    alert: true,
  },
  {
    label: 'Leads este mês',
    value: '38',
    icon: MessageSquare,
    color: 'text-green-600',
    bg: 'bg-green-50',
    href: '/admin/leads',
  },
  {
    label: 'Usuários cadastrados',
    value: '124',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    href: '/admin/usuarios',
  },
]

export default function AdminDashboardPage() {
  const recentApproved = mockProperties.slice(0, 5)
  const firstPending = pendingProperties.slice(0, 3)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Visão geral da plataforma</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                {card.alert && (
                  <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">
                    Ação necessária
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Pending Alert */}
        <div className="lg:col-span-2 space-y-6">
          {pendingProperties.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-amber-600" />
                <h2 className="font-semibold text-amber-900 text-sm">
                  {pendingProperties.length} imóvel(is) aguardando análise
                </h2>
              </div>
              <div className="space-y-3">
                {firstPending.map((p) => (
                  <div key={p.id} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100">
                    <div
                      className="w-10 h-10 rounded-lg bg-gray-100 bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${p.images[0]?.url})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.brokerName} · {formatCurrency(p.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/admin/imoveis/pendentes"
                className="mt-3 flex items-center gap-1.5 text-sm text-amber-700 font-medium hover:text-amber-900 transition-colors"
              >
                Ver todos os pendentes
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Ações rápidas</h2>
            <div className="space-y-2">
              <Link
                href="/admin/imoveis/novo"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <PlusCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Adicionar novo imóvel</span>
              </Link>
              <Link
                href="/admin/imoveis/pendentes"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Revisar pendentes</span>
              </Link>
              <Link
                href="/admin/leads"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Ver novos leads</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Properties */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Imóveis recentes (aprovados)</h2>
            <Link href="/admin/imoveis" className="text-xs text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {recentApproved.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div
                  className="w-10 h-10 rounded-lg bg-gray-100 bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${p.images[0]?.url})` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.city} · {p.brokerName ?? '—'}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-primary">{formatCurrency(p.price)}</p>
                  <Badge variant={p.status === 'Aluguel' ? 'aluguel' : 'venda'} className="text-[10px]">
                    {p.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
