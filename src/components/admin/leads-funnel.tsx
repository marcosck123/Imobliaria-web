'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const data = [
  { stage: 'Visitas', value: 1240, color: '#3b82f6' },
  { stage: 'Contatos', value: 387, color: '#8b5cf6' },
  { stage: 'Leads', value: 142, color: '#e8a020' },
  { stage: 'Visitas ag.', value: 64, color: '#f97316' },
  { stage: 'Propostas', value: 28, color: '#22c55e' },
  { stage: 'Fechados', value: 12, color: '#1a3c5e' },
]

export function LeadsFunnel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="mb-5">
        <h2 className="font-semibold text-gray-900">Funil de leads</h2>
        <p className="text-xs text-gray-400 mt-0.5">Últimos 30 dias</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={72} />
          <Tooltip
            contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Total">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Taxa de conversão:</span>
          <span className="font-semibold text-green-600">
            {((data[data.length - 1].value / data[0].value) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}
