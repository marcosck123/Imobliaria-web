'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ContactForm() {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nome completo *</Label>
          <Input id="name" placeholder="Seu nome" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefone *</Label>
          <Input id="phone" placeholder="(11) 99999-9999" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" placeholder="seu@email.com" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="subject">Assunto</Label>
        <Input id="subject" placeholder="Sobre o que você quer falar?" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Mensagem *</Label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="Descreva como podemos ajudá-lo..."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Enviar mensagem
      </Button>
    </form>
  )
}
