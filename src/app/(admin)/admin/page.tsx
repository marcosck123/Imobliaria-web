import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Users, MessageSquare, TrendingUp, Eye, Plus, ArrowUpRight } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Admin — Painel' }

const stats = [
  { label: 'Imóveis Ativos', value: '9', icon: Building2, change: '+2 este mês', color: 'bg-blue-50 text-blue-600' },
  { label: 'Leads Recebidos', value: '34', icon: MessageSquare, change: '+8 esta semana', color: 'bg-green-50 text-green-600' },
  { label: 'Usuários Cadastrados', value: '128', icon: Users, change: '+12 este mês', color: 'bg-purple-50 text-purple-600' },
  { label: 'Visualizações', value: '1.2k', icon: TrendingUp, change: '+18% vs mês anterior', color: 'bg-amber-50 text-amber-600' },
]

export default function AdminDashboardPage() {
  const recent = mockProperties.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-sm text-gray-500">Bem-vindo de volta, Admin</p>
          </div>
          <Link href="/admin/imoveis/novo" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" /> Novo Imóvel
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Properties */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Imóveis Recentes</h2>
              <Link href="/admin/imoveis" className="text-sm text-primary hover:text-accent transition-colors">Ver todos</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recent.map((property) => (
                <div key={property.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{property.title}</p>
                    <p className="text-xs text-gray-500">{property.neighborhood}, {property.city}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-sm font-semibold text-primary">{formatCurrency(property.price)}</span>
                    <Badge variant={property.status === 'Aluguel' ? 'aluguel' : 'venda'} className="text-xs">{property.status}</Badge>
                    <Link href={`/admin/imoveis/${property.id}`} className="text-gray-400 hover:text-primary transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="space-y-2">
              {[
                { href: '/admin/imoveis/novo', label: 'Cadastrar Imóvel', icon: Building2, color: 'bg-blue-50 text-blue-600' },
                { href: '/admin/leads', label: 'Ver Leads', icon: MessageSquare, color: 'bg-green-50 text-green-600' },
                { href: '/admin/usuarios', label: 'Gerenciar Usuários', icon: Users, color: 'bg-purple-50 text-purple-600' },
                { href: '/admin/imoveis', label: 'Todos os Imóveis', icon: Building2, color: 'bg-amber-50 text-amber-600' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
