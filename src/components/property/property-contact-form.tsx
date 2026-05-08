'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PropertyContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">Nome completo</Label>
        <Input id="contact-name" placeholder="Seu nome" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">E-mail</Label>
        <Input id="contact-email" type="email" placeholder="seu@email.com" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-phone">Telefone / WhatsApp</Label>
        <Input id="contact-phone" placeholder="(11) 99999-9999" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Mensagem (opcional)</Label>
        <textarea
          id="contact-message"
          rows={3}
          placeholder="Gostaria de agendar uma visita..."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>
      <Button type="submit" className="w-full">Enviar mensagem</Button>
    </form>
  )
}
