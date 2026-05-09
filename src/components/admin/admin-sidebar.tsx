'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Clock,
  PlusCircle,
  ChevronDown,
  LogOut,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AdminSidebarProps {
  pendingCount: number
}

export function AdminSidebar({ pendingCount }: AdminSidebarProps) {
  const pathname = usePathname()
  const [imoveisOpen, setImoveisOpen] = useState(
    pathname.startsWith('/admin/imoveis')
  )

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-64 bg-[#1a3c5e] text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#e8a020] rounded-lg flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">ImóvelPrime</p>
            <p className="text-white/50 text-xs">Painel Admin</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {/* Dashboard */}
        <Link
          href="/admin"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            isActive('/admin')
              ? 'bg-white/15 text-white'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          )}
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          Dashboard
        </Link>

        {/* Imóveis (collapsible) */}
        <div>
          <button
            onClick={() => setImoveisOpen(!imoveisOpen)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname.startsWith('/admin/imoveis')
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            )}
          >
            <span className="flex items-center gap-3">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              Imóveis
            </span>
            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <span className="bg-[#e8a020] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {pendingCount}
                </span>
              )}
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform',
                  imoveisOpen && 'rotate-180'
                )}
              />
            </div>
          </button>

          {imoveisOpen && (
            <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-0.5">
              <Link
                href="/admin/imoveis"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/admin/imoveis')
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                Todos os imóveis
              </Link>
              <Link
                href="/admin/imoveis/pendentes"
                className={cn(
                  'flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/admin/imoveis/pendentes')
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Aguardando análise
                </span>
                {pendingCount > 0 && (
                  <span className="bg-[#e8a020] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
              <Link
                href="/admin/imoveis/novo"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/admin/imoveis/novo')
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Adicionar imóvel
              </Link>
            </div>
          )}
        </div>

        {/* Leads */}
        <Link
          href="/admin/leads"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            isActive('/admin/leads')
              ? 'bg-white/15 text-white'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          )}
        >
          <MessageSquare className="w-4 h-4 flex-shrink-0" />
          Leads
        </Link>

        {/* Usuários */}
        <Link
          href="/admin/usuarios"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            isActive('/admin/usuarios')
              ? 'bg-white/15 text-white'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          )}
        >
          <Users className="w-4 h-4 flex-shrink-0" />
          Usuários
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sair do painel
        </Link>
      </div>
    </aside>
  )
}
