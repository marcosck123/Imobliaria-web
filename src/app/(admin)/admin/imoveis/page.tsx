import { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Admin — Imóveis' }

export default function AdminImoveisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Imóveis</h1>
            <p className="text-sm text-gray-500">{mockProperties.length} imóveis cadastrados</p>
          </div>
          <Link href="/admin/imoveis/novo" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" /> Novo Imóvel
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Imóvel</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Localização</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Preço</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-sm text-gray-900 line-clamp-1">{property.title}</p>
                      <p className="text-xs text-gray-500">{property.type}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm text-gray-600">{property.neighborhood}, {property.city}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-primary">{formatCurrency(property.price)}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <Badge variant={property.status === 'Aluguel' ? 'aluguel' : 'venda'}>{property.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/imoveis/${property.slug}`} className="p-1.5 text-gray-400 hover:text-primary rounded transition-colors" title="Ver">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/imoveis/${property.id}/editar`} className="p-1.5 text-gray-400 hover:text-accent rounded transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
