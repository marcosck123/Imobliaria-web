'use client'

import { useState, useMemo } from 'react'
import { Calculator, DollarSign, TrendingDown, Building2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

type Sistema = 'SAC' | 'PRICE'

interface Parcela {
  numero: number
  saldo: number
  amortizacao: number
  juros: number
  parcela: number
}

function calcularSAC(valorFinanciado: number, taxaMensal: number, meses: number): Parcela[] {
  const amortizacao = valorFinanciado / meses
  const parcelas: Parcela[] = []
  let saldo = valorFinanciado
  for (let i = 1; i <= meses; i++) {
    const juros = saldo * taxaMensal
    const parcela = amortizacao + juros
    saldo -= amortizacao
    parcelas.push({ numero: i, saldo: Math.max(0, saldo), amortizacao, juros, parcela })
  }
  return parcelas
}

function calcularPrice(valorFinanciado: number, taxaMensal: number, meses: number): Parcela[] {
  const parcela = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, meses)) / (Math.pow(1 + taxaMensal, meses) - 1)
  const parcelas: Parcela[] = []
  let saldo = valorFinanciado
  for (let i = 1; i <= meses; i++) {
    const juros = saldo * taxaMensal
    const amortizacao = parcela - juros
    saldo -= amortizacao
    parcelas.push({ numero: i, saldo: Math.max(0, saldo), amortizacao, juros, parcela })
  }
  return parcelas
}

const bancos = [
  { nome: 'Caixa Econômica', taxa: 10.49, obs: 'SBPE / TR' },
  { nome: 'Banco do Brasil', taxa: 10.79, obs: 'Pró-Cotista' },
  { nome: 'Bradesco', taxa: 11.20, obs: 'Taxa fixa' },
  { nome: 'Itaú', taxa: 11.49, obs: 'Taxa fixa' },
  { nome: 'Santander', taxa: 11.99, obs: 'Taxa fixa' },
]

export default function SimuladorPage() {
  const [valorImovel, setValorImovel] = useState(500000)
  const [entrada, setEntrada] = useState(100000)
  const [prazo, setPrazo] = useState(360)
  const [taxa, setTaxa] = useState(10.49)
  const [sistema, setSistema] = useState<Sistema>('SAC')
  const [mostrarTabela, setMostrarTabela] = useState(false)
  const [paginaTabela, setPaginaTabela] = useState(1)

  const valorFinanciado = Math.max(0, valorImovel - entrada)
  const taxaMensal = taxa / 100 / 12

  const parcelas = useMemo(() => {
    if (valorFinanciado <= 0 || taxaMensal <= 0 || prazo <= 0) return []
    return sistema === 'SAC'
      ? calcularSAC(valorFinanciado, taxaMensal, prazo)
      : calcularPrice(valorFinanciado, taxaMensal, prazo)
  }, [valorFinanciado, taxaMensal, prazo, sistema])

  const primeiraParcela = parcelas[0]?.parcela ?? 0
  const ultimaParcela = parcelas[parcelas.length - 1]?.parcela ?? 0
  const totalPago = parcelas.reduce((s, p) => s + p.parcela, 0)
  const totalJuros = totalPago - valorFinanciado
  const percentualEntrada = valorImovel > 0 ? ((entrada / valorImovel) * 100).toFixed(0) : '0'

  const itensPorPagina = 24
  const totalPaginas = Math.ceil(parcelas.length / itensPorPagina)
  const parcelasPagina = parcelas.slice((paginaTabela - 1) * itensPorPagina, paginaTabela * itensPorPagina)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Simulador de Financiamento</h1>
          </div>
          <p className="text-gray-500 ml-13">Calcule parcelas pelo sistema SAC ou Tabela Price e compare bancos.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Dados do imóvel</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Valor do imóvel</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">R$</span>
                    <input
                      type="number"
                      value={valorImovel}
                      onChange={(e) => setValorImovel(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Entrada — {percentualEntrada}%
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">R$</span>
                    <input
                      type="number"
                      value={entrada}
                      onChange={(e) => setEntrada(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={valorImovel}
                    step={5000}
                    value={entrada}
                    onChange={(e) => setEntrada(Number(e.target.value))}
                    className="w-full mt-2 accent-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prazo — {prazo / 12} anos ({prazo} meses)
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={420}
                    step={12}
                    value={prazo}
                    onChange={(e) => setPrazo(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 ano</span><span>35 anos</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Taxa de juros — {taxa}% a.a.
                  </label>
                  <input
                    type="range"
                    min={6}
                    max={18}
                    step={0.1}
                    value={taxa}
                    onChange={(e) => setTaxa(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>6%</span><span>18%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sistema de amortização</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['SAC', 'PRICE'] as Sistema[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSistema(s)}
                        className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                          sistema === s
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-200 text-gray-600 hover:border-primary/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-5">
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary text-white rounded-xl p-5">
                <p className="text-sm opacity-75 mb-1">1ª parcela</p>
                <p className="text-2xl font-bold">{formatCurrency(primeiraParcela)}</p>
                {sistema === 'SAC' && (
                  <p className="text-xs opacity-60 mt-1">Última: {formatCurrency(ultimaParcela)}</p>
                )}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">Valor financiado</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(valorFinanciado)}</p>
                <p className="text-xs text-gray-400 mt-1">de {formatCurrency(valorImovel)}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">Total pago</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalPago + entrada)}</p>
                <p className="text-xs text-gray-400 mt-1">incluindo entrada</p>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                <p className="text-sm text-amber-700 mb-1">Total de juros</p>
                <p className="text-xl font-bold text-amber-800">{formatCurrency(totalJuros)}</p>
                <p className="text-xs text-amber-600 mt-1">{((totalJuros / valorFinanciado) * 100).toFixed(0)}% do financiado</p>
              </div>
            </div>

            {/* SAC vs Price info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                {sistema === 'SAC' ? 'Sistema SAC — parcelas decrescentes' : 'Tabela Price — parcelas fixas'}
              </h3>
              <p className="text-sm text-gray-600">
                {sistema === 'SAC'
                  ? 'No SAC, a amortização é constante. As parcelas iniciais são maiores, mas reduzem mês a mês. Você paga menos juros no total.'
                  : 'Na Tabela Price, todas as parcelas têm o mesmo valor. A amortização cresce e os juros diminuem com o tempo.'}
              </p>
            </div>

            {/* Bank comparison */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Comparativo de bancos
              </h3>
              <div className="space-y-2">
                {bancos.map((banco) => {
                  const tm = banco.taxa / 100 / 12
                  let p1 = 0
                  if (sistema === 'SAC') {
                    p1 = calcularSAC(valorFinanciado, tm, prazo)[0]?.parcela ?? 0
                  } else {
                    p1 = calcularPrice(valorFinanciado, tm, prazo)[0]?.parcela ?? 0
                  }
                  const isSelected = Math.abs(banco.taxa - taxa) < 0.01
                  return (
                    <button
                      key={banco.nome}
                      onClick={() => setTaxa(banco.taxa)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{banco.nome}</p>
                        <p className="text-xs text-gray-400">{banco.obs}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">{formatCurrency(p1)}/mês</p>
                        <p className="text-xs text-gray-500">{banco.taxa}% a.a.</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Amortization table */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setMostrarTabela(!mostrarTabela)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">Tabela de amortização completa ({prazo} meses)</span>
            {mostrarTabela ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          {mostrarTabela && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                      <th className="px-4 py-3 text-left">Mês</th>
                      <th className="px-4 py-3 text-right">Parcela</th>
                      <th className="px-4 py-3 text-right">Amortização</th>
                      <th className="px-4 py-3 text-right">Juros</th>
                      <th className="px-4 py-3 text-right">Saldo devedor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {parcelasPagina.map((p) => (
                      <tr key={p.numero} className="hover:bg-gray-50/50">
                        <td className="px-4 py-2.5 text-gray-600">{p.numero}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-900">{formatCurrency(p.parcela)}</td>
                        <td className="px-4 py-2.5 text-right text-green-700">{formatCurrency(p.amortizacao)}</td>
                        <td className="px-4 py-2.5 text-right text-amber-700">{formatCurrency(p.juros)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-500">{formatCurrency(p.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPaginas > 1 && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                  <Button size="sm" variant="outline" onClick={() => setPaginaTabela(Math.max(1, paginaTabela - 1))} disabled={paginaTabela === 1}>
                    Anterior
                  </Button>
                  <span className="text-sm text-gray-500">Página {paginaTabela} de {totalPaginas}</span>
                  <Button size="sm" variant="outline" onClick={() => setPaginaTabela(Math.min(totalPaginas, paginaTabela + 1))} disabled={paginaTabela === totalPaginas}>
                    Próxima
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
