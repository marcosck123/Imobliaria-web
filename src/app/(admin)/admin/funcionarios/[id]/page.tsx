'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  UserCog,
  Pencil,
  Save,
  X,
  CalendarDays,
  BadgeCheck,
} from 'lucide-react'
import { mockEmployees, monthNames, type Payment } from '@/lib/mock-employees'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const statusColors: Record<string, string> = {
  Ativo: 'bg-green-100 text-green-700',
  Inativo: 'bg-gray-100 text-gray-600',
  Férias: 'bg-blue-100 text-blue-700',
  Desligado: 'bg-red-100 text-red-700',
}

const paymentStatusColors: Record<string, string> = {
  Pago: 'bg-green-100 text-green-700',
  Pendente: 'bg-amber-100 text-amber-700',
  Cancelado: 'bg-red-100 text-red-700',
}

type Tab = 'perfil' | 'desempenho' | 'pagamentos' | 'comissao'

export default function FuncionarioDetailPage() {
  const params = useParams()
  const emp = mockEmployees.find((e) => e.id === params.id)
  if (!emp) notFound()

  const [activeTab, setActiveTab] = useState<Tab>('perfil')
  const [editingCommission, setEditingCommission] = useState(false)
  const [commissionSale, setCommissionSale] = useState(String(emp.commissionSalePercent))
  const [commissionRental, setCommissionRental] = useState(String(emp.commissionRentalPercent))
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const [newPayment, setNewPayment] = useState({
    baseSalary: String(emp.baseSalary),
    commissionEarned: '',
    bonus: '0',
    deductions: '0',
    notes: '',
  })

  const netTotal =
    (Number(newPayment.baseSalary) || 0) +
    (Number(newPayment.commissionEarned) || 0) +
    (Number(newPayment.bonus) || 0) -
    (Number(newPayment.deductions) || 0)

  const totalPaid = emp.payments
    .filter((p) => p.status === 'Pago')
    .reduce((acc, p) => acc + p.netTotal, 0)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'perfil', label: 'Perfil' },
    { id: 'desempenho', label: 'Desempenho' },
    { id: 'pagamentos', label: 'Pagamentos' },
    { id: 'comissao', label: 'Comissão' },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Back */}
      <Link
        href="/admin/funcionarios"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Funcionários
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
            <Image src={emp.photo} alt={emp.name} fill className="object-cover" sizes="80px" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{emp.name}</h1>
                <p className="text-gray-500 text-sm">{emp.role} · {emp.contractType}</p>
                {emp.creci && (
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                    {emp.creci}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[emp.status]}`}>
                  {emp.status}
                </span>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
              <a href={`tel:${emp.phone}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary">
                <Phone className="w-3.5 h-3.5" />
                {emp.phone}
              </a>
              <a href={`mailto:${emp.email}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary">
                <Mail className="w-3.5 h-3.5" />
                {emp.email}
              </a>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <CalendarDays className="w-3.5 h-3.5" />
                Desde {new Date(emp.hireDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Perfil ── */}
      {activeTab === 'perfil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">Dados pessoais</h2>
            <div className="space-y-3">
              {[
                { label: 'Nome completo', value: emp.name },
                { label: 'E-mail', value: emp.email },
                { label: 'Telefone', value: emp.phone },
                { label: 'Cargo', value: emp.role },
                { label: 'Tipo de contrato', value: emp.contractType },
                ...(emp.creci ? [{ label: 'CRECI', value: emp.creci }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">Remuneração base</h2>
            <div className="space-y-3">
              {[
                { label: 'Salário base', value: emp.baseSalary > 0 ? formatCurrency(emp.baseSalary) : 'Sem fixo' },
                { label: 'Comissão venda', value: `${emp.commissionSalePercent}%` },
                { label: 'Comissão aluguel', value: `${emp.commissionRentalPercent}%` },
                { label: 'Total pago (histórico)', value: formatCurrency(totalPaid) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Desempenho ── */}
      {activeTab === 'desempenho' && (
        <div className="space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Vendas realizadas', value: emp.propertiesSold, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Aluguéis fechados', value: emp.propertiesRented, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Leads atendidos', value: emp.leadsAttended, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
              {
                label: 'Receita gerada',
                value: formatCurrency(emp.totalRevenueGenerated),
                icon: TrendingUp,
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
            ].map((kpi) => {
              const Icon = kpi.icon
              return (
                <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className={`w-9 h-9 ${kpi.bg} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
                </div>
              )
            })}
          </div>

          {/* Commission summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Resumo financeiro gerado
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-700">{formatCurrency(emp.totalRevenueGenerated)}</p>
                <p className="text-xs text-green-600 mt-1">Receita total gerada para a empresa</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{formatCurrency(emp.totalCommissionEarned)}</p>
                <p className="text-xs text-blue-600 mt-1">Total em comissões recebidas</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {emp.totalRevenueGenerated > 0
                    ? `${((emp.totalCommissionEarned / emp.totalRevenueGenerated) * 100).toFixed(1)}%`
                    : '—'}
                </p>
                <p className="text-xs text-purple-600 mt-1">Taxa média de comissão efetiva</p>
              </div>
            </div>
          </div>

          {/* Conversion rate */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">Taxa de conversão de leads</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: emp.leadsAttended > 0
                      ? `${Math.min(100, ((emp.propertiesSold + emp.propertiesRented) / emp.leadsAttended) * 100).toFixed(1)}%`
                      : '0%',
                  }}
                />
              </div>
              <span className="text-lg font-bold text-primary min-w-max">
                {emp.leadsAttended > 0
                  ? `${(((emp.propertiesSold + emp.propertiesRented) / emp.leadsAttended) * 100).toFixed(1)}%`
                  : '—'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {emp.propertiesSold + emp.propertiesRented} negócios fechados de {emp.leadsAttended} leads atendidos
            </p>
          </div>
        </div>
      )}

      {/* ── TAB: Pagamentos ── */}
      {activeTab === 'pagamentos' && (
        <div className="space-y-6">
          {/* Register payment */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Registrar pagamento
              </h2>
              <Button
                size="sm"
                variant={showPaymentForm ? 'outline' : 'default'}
                onClick={() => setShowPaymentForm(!showPaymentForm)}
                className="gap-1.5"
              >
                {showPaymentForm ? (
                  <><X className="w-3.5 h-3.5" /> Cancelar</>
                ) : (
                  <><DollarSign className="w-3.5 h-3.5" /> Novo pagamento</>
                )}
              </Button>
            </div>

            {showPaymentForm && (
              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <Label>Salário base (R$)</Label>
                    <Input
                      type="number"
                      value={newPayment.baseSalary}
                      onChange={(e) => setNewPayment({ ...newPayment, baseSalary: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Comissão no período (R$)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newPayment.commissionEarned}
                      onChange={(e) => setNewPayment({ ...newPayment, commissionEarned: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Bônus (R$)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newPayment.bonus}
                      onChange={(e) => setNewPayment({ ...newPayment, bonus: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Deduções / Descontos (R$)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newPayment.deductions}
                      onChange={(e) => setNewPayment({ ...newPayment, deductions: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Observações</Label>
                    <Input
                      placeholder="Ex: INSS, vale transporte..."
                      value={newPayment.notes}
                      onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="w-full bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-xs text-green-600">Total líquido</p>
                      <p className="text-xl font-bold text-green-700">{formatCurrency(netTotal)}</p>
                    </div>
                  </div>
                </div>
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Salvar pagamento
                </Button>
              </div>
            )}
          </div>

          {/* Payment history */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Histórico de pagamentos</h2>
            </div>
            {emp.payments.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">Nenhum pagamento registrado ainda.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <th className="px-5 py-3">Competência</th>
                      <th className="px-5 py-3">Salário base</th>
                      <th className="px-5 py-3">Comissão</th>
                      <th className="px-5 py-3">Bônus</th>
                      <th className="px-5 py-3">Deduções</th>
                      <th className="px-5 py-3">Líquido</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {emp.payments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3 text-sm font-medium text-gray-900">
                          {monthNames[pay.month - 1]}/{pay.year}
                          {pay.paidAt && (
                            <p className="text-[10px] text-gray-400">
                              Pago em {new Date(pay.paidAt).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-600">
                          {formatCurrency(pay.baseSalary)}
                        </td>
                        <td className="px-5 py-3 text-sm text-green-600 font-medium">
                          {pay.commissionEarned > 0 ? `+ ${formatCurrency(pay.commissionEarned)}` : '—'}
                        </td>
                        <td className="px-5 py-3 text-sm text-blue-600">
                          {pay.bonus > 0 ? `+ ${formatCurrency(pay.bonus)}` : '—'}
                        </td>
                        <td className="px-5 py-3 text-sm text-red-500">
                          {pay.deductions > 0 ? `- ${formatCurrency(pay.deductions)}` : '—'}
                        </td>
                        <td className="px-5 py-3 text-sm font-bold text-gray-900">
                          {formatCurrency(pay.netTotal)}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${paymentStatusColors[pay.status]}`}
                          >
                            {pay.status}
                          </span>
                          {pay.notes && (
                            <p className="text-[10px] text-gray-400 mt-0.5">{pay.notes}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t border-gray-200">
                      <td className="px-5 py-3 text-xs font-bold text-gray-700">Total pago</td>
                      <td colSpan={4} />
                      <td className="px-5 py-3 text-sm font-bold text-primary">{formatCurrency(totalPaid)}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: Comissão ── */}
      {activeTab === 'comissao' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <UserCog className="w-4 h-4 text-primary" />
                Configuração de comissões
              </h2>
              {!editingCommission ? (
                <Button size="sm" variant="outline" onClick={() => setEditingCommission(true)} className="gap-1.5">
                  <Pencil className="w-3.5 h-3.5" /> Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingCommission(false)} className="gap-1.5">
                    <X className="w-3.5 h-3.5" /> Cancelar
                  </Button>
                  <Button size="sm" onClick={() => setEditingCommission(false)} className="gap-1.5">
                    <Save className="w-3.5 h-3.5" /> Salvar
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm">Comissão por venda (%)</Label>
                {editingCommission ? (
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={commissionSale}
                    onChange={(e) => setCommissionSale(e.target.value)}
                    className="mt-1.5"
                  />
                ) : (
                  <div className="mt-1.5 p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{emp.commissionSalePercent}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">sobre o valor do imóvel vendido</p>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm">Comissão por aluguel (%)</Label>
                {editingCommission ? (
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="30"
                    value={commissionRental}
                    onChange={(e) => setCommissionRental(e.target.value)}
                    className="mt-1.5"
                  />
                ) : (
                  <div className="mt-1.5 p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{emp.commissionRentalPercent}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">sobre o valor do aluguel (1º mês)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Salary base */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">Salário base mensal</h2>
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex-1">
                {emp.baseSalary > 0 ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(emp.baseSalary)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Fixo mensal — regime {emp.contractType}</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-bold text-gray-400">Sem salário fixo</p>
                    <p className="text-xs text-gray-400 mt-0.5">Remuneração exclusivamente por comissão ({emp.contractType})</p>
                  </>
                )}
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 flex-shrink-0">
                <Pencil className="w-3.5 h-3.5" /> Alterar
              </Button>
            </div>
          </div>

          {/* Simulation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h2 className="font-semibold text-blue-900 mb-3 text-sm">Simulação de comissão</h2>
            <p className="text-xs text-blue-600 mb-3">
              Estimativa baseada nas taxas configuradas para {emp.name}:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Venda de R$ 500.000', value: emp.commissionSalePercent * 5000 },
                { label: 'Venda de R$ 1.000.000', value: emp.commissionSalePercent * 10000 },
                { label: 'Aluguel de R$ 3.000/mês', value: emp.commissionRentalPercent * 30 },
                { label: 'Aluguel de R$ 5.000/mês', value: emp.commissionRentalPercent * 50 },
              ].map((sim) => (
                <div key={sim.label} className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-blue-600">{sim.label}</p>
                  <p className="text-base font-bold text-blue-900">{formatCurrency(sim.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
