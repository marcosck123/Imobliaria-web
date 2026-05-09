import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  UserCog,
  PlusCircle,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Search,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react'
import { mockEmployees } from '@/lib/mock-employees'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Funcionários — Admin' }

const statusColors: Record<string, string> = {
  Ativo: 'bg-green-100 text-green-700',
  Inativo: 'bg-gray-100 text-gray-600',
  Férias: 'bg-blue-100 text-blue-700',
  Desligado: 'bg-red-100 text-red-700',
}

const contractColors: Record<string, string> = {
  CLT: 'bg-purple-100 text-purple-700',
  PJ: 'bg-amber-100 text-amber-700',
  Autônomo: 'bg-cyan-100 text-cyan-700',
}

export default function FuncionariosPage() {
  const active = mockEmployees.filter((e) => e.status === 'Ativo')
  const totalMonthlyCost = mockEmployees
    .filter((e) => e.status === 'Ativo' || e.status === 'Férias')
    .reduce((acc, e) => {
      const lastPay = e.payments[0]
      return acc + (lastPay ? lastPay.netTotal : e.baseSalary)
    }, 0)
  const totalCommissions = mockEmployees.reduce(
    (acc, e) => acc + e.totalCommissionEarned,
    0
  )
  const totalRevenue = mockEmployees.reduce(
    (acc, e) => acc + e.totalRevenueGenerated,
    0
  )

  const stats = [
    {
      label: 'Total de funcionários',
      value: mockEmployees.length,
      sub: `${active.length} ativos`,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Ativos agora',
      value: active.length,
      sub: `${mockEmployees.length - active.length} inativos/férias`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Custo mensal estimado',
      value: formatCurrency(totalMonthlyCost),
      sub: 'Salários + comissões',
      icon: DollarSign,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Receita gerada (total)',
      value: formatCurrency(totalRevenue),
      sub: `${formatCurrency(totalCommissions)} em comissões`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserCog className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Funcionários</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Gerencie a equipe, comissões e pagamentos
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <PlusCircle className="w-4 h-4" />
          Adicionar funcionário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-gray-200 mb-4 p-3 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, cargo ou e-mail..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
          <option value="">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Férias">Férias</option>
          <option value="Desligado">Desligado</option>
        </select>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
          <option value="">Todos os cargos</option>
          <option value="Corretor">Corretor</option>
          <option value="Gerente">Gerente</option>
          <option value="Coordenador">Coordenador</option>
          <option value="Assistente">Assistente</option>
        </select>
      </div>

      {/* Employee table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-3">Funcionário</th>
                <th className="px-5 py-3">Cargo / Contrato</th>
                <th className="px-5 py-3">Comissão</th>
                <th className="px-5 py-3">Desempenho</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={emp.photo}
                          alt={emp.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700 font-medium">{emp.role}</p>
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${contractColors[emp.contractType]}`}
                    >
                      {emp.contractType}
                    </span>
                    {emp.creci && (
                      <p className="text-[10px] text-gray-400 mt-0.5">{emp.creci}</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {emp.commissionSalePercent > 0 ? (
                      <div className="space-y-0.5">
                        <p className="text-xs text-gray-500">
                          Venda: <span className="font-semibold text-gray-900">{emp.commissionSalePercent}%</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Aluguel: <span className="font-semibold text-gray-900">{emp.commissionRentalPercent}%</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Sem comissão</p>
                    )}
                    {emp.baseSalary > 0 && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Fixo: <span className="font-medium">{formatCurrency(emp.baseSalary)}</span>
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-gray-500">
                      {emp.propertiesSold} vendas · {emp.propertiesRented} aluguéis
                    </p>
                    <p className="text-xs font-semibold text-green-600 mt-0.5">
                      {formatCurrency(emp.totalRevenueGenerated)} gerados
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[emp.status]}`}
                    >
                      {emp.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Desde {new Date(emp.hireDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/funcionarios/${emp.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Ver detalhes">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Editar">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                        title="Desligar funcionário"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info card: what you can manage */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 text-sm mb-3 flex items-center gap-2">
          <UserCog className="w-4 h-4" />
          O que você pode gerenciar nesta seção
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Cadastro completo', desc: 'Adicione funcionários com foto, cargo, contrato, CRECI e dados de contato' },
            { title: 'Comissões individuais', desc: 'Defina % de comissão por venda e aluguel para cada corretor separadamente' },
            { title: 'Registro de pagamento', desc: 'Lance salário base, comissões, bônus e deduções mensalmente' },
            { title: 'Histórico financeiro', desc: 'Veja todos os pagamentos realizados com status (Pago / Pendente)' },
            { title: 'Métricas de desempenho', desc: 'Acompanhe imóveis vendidos, alugados, leads e receita gerada' },
            { title: 'Gestão de status', desc: 'Marque como Ativo, Inativo, Férias ou Desligado com data de entrada/saída' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-sm font-semibold text-blue-800">{item.title}</p>
              <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
