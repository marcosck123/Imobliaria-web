'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { mes: 'Jan', receita: 420000, meta: 380000 },
  { mes: 'Fev', receita: 380000, meta: 400000 },
  { mes: 'Mar', receita: 510000, meta: 420000 },
  { mes: 'Abr', receita: 475000, meta: 450000 },
  { mes: 'Mai', receita: 620000, meta: 480000 },
  { mes: 'Jun', receita: 580000, meta: 500000 },
  { mes: 'Jul', receita: 695000, meta: 520000 },
  { mes: 'Ago', receita: 720000, meta: 550000 },
  { mes: 'Set', receita: 660000, meta: 580000 },
  { mes: 'Out', receita: 780000, meta: 600000 },
  { mes: 'Nov', receita: 840000, meta: 630000 },
  { mes: 'Dez', receita: 920000, meta: 650000 },
]

function formatValue(value: number) {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`
  return `R$ ${(value / 1000).toFixed(0)}K`
}

export function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-semibold text-gray-900">Receita × Meta</h2>
          <p className="text-xs text-gray-400 mt-0.5">Comparativo anual 2024</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            Receita
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            Meta
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a3c5e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1a3c5e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e8a020" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#e8a020" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatValue} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={60} />
          <Tooltip
            formatter={(value) => [formatValue(Number(value)), '']}
            contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
          />
          <Area type="monotone" dataKey="meta" stroke="#e8a020" strokeWidth={2} strokeDasharray="4 4" fill="url(#colorMeta)" dot={false} />
          <Area type="monotone" dataKey="receita" stroke="#1a3c5e" strokeWidth={2.5} fill="url(#colorReceita)" dot={false} activeDot={{ r: 4, fill: '#1a3c5e' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
