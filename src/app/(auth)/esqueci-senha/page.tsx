import { Metadata } from 'next'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Recuperar Senha',
}

export default function EsqueciSenhaPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">Imóvel<span className="text-accent">Prime</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-1">Recuperar senha</h1>
          <p className="text-gray-500 text-sm">Enviaremos um link de redefinição para seu e-mail</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <ForgotPasswordForm />
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mt-6">
            <ArrowLeft className="w-4 h-4" /> Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}
