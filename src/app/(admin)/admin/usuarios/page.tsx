import { Metadata } from 'next'
import { Mail, Phone, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Usuários — Admin' }

type Role = 'ADMIN' | 'CORRETOR' | 'CLIENTE'

const mockUsers = [
  { id: '1', name: 'Admin Principal', email: 'admin@imovelprime.com.br', phone: '(11) 3000-0000', role: 'ADMIN' as Role, createdAt: '2024-01-01' },
  { id: '2', name: 'Carlos Mendes', email: 'carlos@imovelprime.com.br', phone: '(11) 97777-2222', role: 'CORRETOR' as Role, createdAt: '2024-01-10' },
  { id: '3', name: 'Ana Lima', email: 'ana@imovelprime.com.br', phone: '(11) 98888-1111', role: 'CORRETOR' as Role, createdAt: '2024-01-12' },
  { id: '4', name: 'Pedro Costa', email: 'pedro@imovelprime.com.br', phone: '(11) 95555-4444', role: 'CORRETOR' as Role, createdAt: '2024-01-15' },
  { id: '5', name: 'Fernanda Rocha', email: 'fernanda@imovelprime.com.br', phone: '(11) 96666-3333', role: 'CORRETOR' as Role, createdAt: '2024-02-01' },
  { id: '6', name: 'Roberto Alves', email: 'roberto@email.com', phone: '(11) 98765-4321', role: 'CLIENTE' as Role, createdAt: '2024-03-10' },
  { id: '7', name: 'Camila Ferreira', email: 'camila@email.com', phone: '(11) 97654-3210', role: 'CLIENTE' as Role, createdAt: '2024-03-15' },
  { id: '8', name: 'Lucas Souza', email: 'lucas@email.com', phone: '(11) 96543-2109', role: 'CLIENTE' as Role, createdAt: '2024-04-01' },
]

const roleConfig: Record<Role, { label: string; className: string }> = {
  ADMIN: { label: 'Admin', className: 'bg-purple-100 text-purple-700' },
  CORRETOR: { label: 'Corretor', className: 'bg-blue-100 text-blue-700' },
  CLIENTE: { label: 'Cliente', className: 'bg-gray-100 text-gray-600' },
}

export default function AdminUsuariosPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-500 text-sm mt-1">{mockUsers.length} usuários cadastrados</p>
        </div>
        <Button className="gap-2"><Shield className="w-4 h-4" />Convidar corretor</Button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-5 py-3">Usuário</th>
              <th className="px-5 py-3 hidden md:table-cell">Contato</th>
              <th className="px-5 py-3">Perfil</th>
              <th className="px-5 py-3 hidden lg:table-cell">Cadastro</th>
              <th className="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockUsers.map((user) => {
              const cfg = roleConfig[user.role]
              return (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600"><Mail className="w-3.5 h-3.5 text-gray-400" />{user.email}</div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600"><Phone className="w-3.5 h-3.5 text-gray-400" />{user.phone}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.className}`}>{cfg.label}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <p className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button size="sm" variant="outline" className="text-xs">Editar</Button>
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
