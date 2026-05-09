'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-semibold text-gray-900 mb-1">E-mail enviado!</p>
        <p className="text-sm text-gray-500">
          Enviamos um link de recuperação para <strong>{email}</strong>. Verifique sua caixa de entrada.
        </p>
      </div>
    )
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail cadastrado</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Enviar link de recuperação
      </Button>
    </form>
  )
}
