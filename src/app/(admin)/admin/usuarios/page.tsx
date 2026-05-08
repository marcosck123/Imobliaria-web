import { Metadata } from 'next'
import { UserCheck, UserX, Shield, User } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — Usuários' }

const mockUsers = [
  { id: '1', name: 'Carlos Eduardo Ribeiro', email: 'carlos@imovelprime.com.br', role: 'ADMIN', active: true, createdAt: '2024-01-01' },
  { id: '2', name: 'Fernanda Oliveira', email: 'fernanda@imovelprime.com.br', role: 'BROKER', active: true, createdAt: '2024-01-10' },
  { id: '3', name: 'Rodrigo Almeida', email: 'rodrigo@imovelprime.com.br', role: 'BROKER', active: true, createdAt: '2024-01-15' },
  { id: '4', name: 'Ana Paula Silva', email: 'ana@email.com', role: 'CLIENT', active: true, createdAt: '2024-02-01' },
  { id: '5', name: 'Carlos Mendes', email: 'carlos.m@email.com', role: 'CLIENT', active: true, createdAt: '2024-02-05' },
  { id: '6', name: 'Roberto Lima', email: 'roberto@email.com', role: 'CLIENT', active: false, createdAt: '2024-02-10' },
]

const roleConfig = {
  ADMIN: { label: 'Admin', icon: Shield, className: 'bg-red-100 text-red-700' },
  BROKER: { label: 'Corretor', icon: User, className: 'bg-blue-100 text-blue-700' },
  CLIENT: { label: 'Cliente', icon: User, className: 'bg-gray-100 text-gray-700' },
}

export default function AdminUsuariosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Usuários</h1>
          <p className="text-sm text-gray-500">{mockUsers.length} usuários cadastrados</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Usuário</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">E-mail</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Perfil</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockUsers.map((user) => {
                const role = roleConfig[user.role as keyof typeof roleConfig]
                const Icon = role.icon
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="font-medium text-sm text-gray-900">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${role.className}`}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {user.active
                        ? <span className="inline-flex items-center gap-1 text-xs text-green-700"><UserCheck className="w-3.5 h-3.5" />Ativo</span>
                        : <span className="inline-flex items-center gap-1 text-xs text-red-600"><UserX className="w-3.5 h-3.5" />Inativo</span>
                      }
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <p className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
