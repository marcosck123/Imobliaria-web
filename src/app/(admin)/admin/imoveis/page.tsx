import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, Eye, Pencil, Trash2, MapPin } from 'lucide-react'
import { mockProperties } from '@/lib/mock-data'
import { formatCurrency, formatArea } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Imóveis — Admin' }

export default function AdminImoveisPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Imóveis publicados</h1>
          <p className="text-gray-500 text-sm mt-1">{mockProperties.length} imóveis ativos no site</p>
        </div>
        <Link href="/admin/imoveis/novo">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Adicionar imóvel
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-5 py-3">Imóvel</th>
              <th className="px-5 py-3 hidden md:table-cell">Localização</th>
              <th className="px-5 py-3">Preço</th>
              <th className="px-5 py-3 hidden lg:table-cell">Corretor</th>
              <th className="px-5 py-3 hidden lg:table-cell">Status</th>
              <th className="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockProperties.map((p) => {
              const primary = p.images.find((i) => i.isPrimary) ?? p.images[0]
              return (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {primary && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image src={primary.url} alt={primary.alt} fill className="object-cover" sizes="48px" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{p.title}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="outline" className="text-[10px] py-0">{p.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">{p.neighborhood}, {p.city}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatArea(p.area)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-primary">{formatCurrency(p.price)}</p>
                    <Badge variant={p.status === 'Aluguel' ? 'aluguel' : 'venda'} className="text-[10px]">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <p className="text-sm text-gray-600">{p.brokerName ?? '—'}</p>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                      Publicado
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/imoveis/${p.slug}`} target="_blank">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
