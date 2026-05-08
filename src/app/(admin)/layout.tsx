import Link from 'next/link'
import { Home, Building2, MessageSquare, Users, LayoutDashboard, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/imoveis', label: 'Imóveis', icon: Building2 },
  { href: '/admin/leads', label: 'Leads', icon: MessageSquare },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-primary text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-5 border-b border-primary-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold">Imóvel<span className="text-accent">Prime</span></span>
          </Link>
          <p className="text-xs text-primary-300 mt-1">Painel Admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-200 hover:bg-primary-700 hover:text-white transition-all duration-200">
                <Icon className="w-4 h-4" />{item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-primary-700">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />Sair
          </Link>
        </div>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
