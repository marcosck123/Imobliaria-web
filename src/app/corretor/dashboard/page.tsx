'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Building2, CheckCircle2, Clock, XCircle, PlusCircle,
  MessageSquare, Star, TrendingUp, Eye,
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { mockProperties, pendingProperties } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

export default function CorretorDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'CORRETOR')) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading || !user) return null

  // Filter properties belonging to this broker
  const myApproved = mockProperties.filter((p) => p.brokerName === user.name)
  const myPending = pendingProperties.filter((p) => p.brokerName === user.name)
  const allMine = [...myApproved, ...myPending]

  const stats = [
    { label: 'Imóveis ativos', value: myApproved.length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Aguardando análise', value: myPending.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total cadastrados', value: allMine.length, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Leads recebidos', value: 7, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              {user.photo ? (
                <Image src={user.photo} alt={user.name} width={64} height={64} className="rounded-2xl object-cover" />
              ) : (
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Olá, {user.name.split(' ')[0]}!</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-500">Corretor ImóvelPrime</span>
                </div>
              </div>
            </div>
            <div className="sm:ml-auto">
              <Link href="/admin/imoveis/novo">
                <Button className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Adicionar imóvel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4.5 h-4.5 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Pending alert */}
        {myPending.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <p className="font-semibold text-amber-900 text-sm">
                {myPending.length} imóvel(is) aguardando análise do admin
              </p>
            </div>
            <p className="text-xs text-amber-700 ml-6">
              Você receberá uma notificação quando forem aprovados ou rejeitados.
            </p>
          </div>
        )}

        {/* My listings */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Meus imóveis</h2>
            <span className="text-sm text-gray-400">{allMine.length} total</span>
          </div>

          {allMine.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="font-semibold text-gray-500 mb-1">Nenhum imóvel cadastrado ainda</p>
              <p className="text-sm text-gray-400 mb-4">Adicione seu primeiro imóvel para análise.</p>
              <Link href="/admin/imoveis/novo">
                <Button className="gap-2"><PlusCircle className="w-4 h-4" />Adicionar imóvel</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {allMine.map((p) => {
                const img = p.images.find((i) => i.isPrimary) ?? p.images[0]
                const isPending = p.approvalStatus === 'Pendente'
                const isRejected = p.approvalStatus === 'Rejeitado'
                return (
                  <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.neighborhood}, {p.city} · {formatCurrency(p.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {isPending && (
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" />Pendente
                        </span>
                      )}
                      {isRejected && (
                        <span className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" />Rejeitado
                        </span>
                      )}
                      {!isPending && !isRejected && (
                        <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />Publicado
                        </span>
                      )}
                      {!isPending && !isRejected && (
                        <Link href={`/imoveis/${p.slug}`} target="_blank">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/imoveis/${p.id}/editar`}>
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Profile link */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Seu perfil público</p>
            <p className="text-sm text-gray-500 mt-0.5">Clientes podem ver seus imóveis e avaliações.</p>
          </div>
          <Link href={`/corretores/${user.name.toLowerCase().replace(' ', '-')}`}>
            <Button variant="outline" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Ver perfil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
