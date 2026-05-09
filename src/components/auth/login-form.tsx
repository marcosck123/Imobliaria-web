'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'

export function LoginForm() {
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn(email, password)
    if (!result.success) {
      setError(result.error ?? 'Erro ao entrar.')
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link href="/esqueci-senha" className="text-xs text-primary hover:underline">
            Esqueci minha senha
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading
          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Entrando...</>
          : 'Entrar'
        }
      </Button>

      <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 space-y-1.5">
        <p className="font-semibold text-gray-600">Credenciais de teste:</p>
        <p><span className="font-mono bg-white px-1 rounded border border-gray-200">admin@imovelprime.com.br</span> / <span className="font-mono bg-white px-1 rounded border border-gray-200">admin123</span></p>
        <p><span className="font-mono bg-white px-1 rounded border border-gray-200">carlos@imovelprime.com.br</span> / <span className="font-mono bg-white px-1 rounded border border-gray-200">corretor123</span></p>
        <p><span className="font-mono bg-white px-1 rounded border border-gray-200">roberto@email.com</span> / <span className="font-mono bg-white px-1 rounded border border-gray-200">cliente123</span></p>
      </div>
    </form>
  )
}
