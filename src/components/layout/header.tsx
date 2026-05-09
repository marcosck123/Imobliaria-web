'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home, Shield, House, User, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import type { Role } from '@/lib/auth'

const navLinks = [
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/lancamentos', label: 'Lançamentos' },
  { href: '/simulador', label: 'Simulador' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

const roleConfig: Record<Role, { label: string; icon: typeof Shield; dashboardHref: string; color: string }> = {
  ADMIN: { label: 'Admin', icon: Shield, dashboardHref: '/admin', color: 'text-purple-600' },
  CORRETOR: { label: 'Corretor', icon: House, dashboardHref: '/corretor/dashboard', color: 'text-blue-600' },
  CLIENTE: { label: 'Cliente', icon: User, dashboardHref: '/minha-conta/favoritos', color: 'text-gray-600' },
}

export function Header() {
  const { user, signOut, loading } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const role = user ? roleConfig[user.role] : null
  const RoleIcon = role?.icon ?? User

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-200">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">
              Imóvel<span className="text-accent">Prime</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full pl-1.5 pr-3 py-1.5 transition-colors"
                >
                  {user.photo ? (
                    <Image src={user.photo} alt={user.name} width={28} height={28} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-900 leading-none">{user.name.split(' ')[0]}</p>
                    <p className={`text-[10px] font-medium leading-none mt-0.5 ${role?.color}`}>{role?.label}</p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href={role?.dashboardHref ?? '/'}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                        Meu painel
                      </Link>
                      <Link
                        href="/minha-conta/favoritos"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        Minha conta
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={() => { setIsUserMenuOpen(false); signOut() }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/cadastro">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-gray-700 hover:text-primary py-2.5 border-b border-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 mt-1 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-lg">
                  {user.photo ? (
                    <Image src={user.photo} alt={user.name} width={36} height={36} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{user.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className={`text-xs font-medium ${role?.color}`}>{role?.label}</p>
                  </div>
                </div>
                <Link href={role?.dashboardHref ?? '/'} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Meu painel
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full gap-2 text-red-600 hover:bg-red-50" onClick={() => { setIsMenuOpen(false); signOut() }}>
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/cadastro" onClick={() => setIsMenuOpen(false)}>Cadastrar</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
