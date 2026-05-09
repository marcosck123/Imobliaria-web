'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome completo *</Label>
        <Input id="name" placeholder="Seu nome" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" placeholder="seu@email.com" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Telefone / WhatsApp</Label>
        <Input id="phone" placeholder="(11) 99999-9999" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Senha *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 8 caracteres"
            required
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
      <p className="text-xs text-gray-400">
        Ao criar conta você concorda com os{' '}
        <a href="#" className="text-primary hover:underline">Termos de Uso</a> e a{' '}
        <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
      </p>
      <Button type="submit" className="w-full">
        Criar conta gratuita
      </Button>
    </form>
  )
}
