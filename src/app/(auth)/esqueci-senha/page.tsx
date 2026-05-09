import { Metadata } from 'next'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = { title: 'Recuperar senha — ImóvelPrime' }

export default function EsqueciSenhaPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">ImóvelPrime</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
          <p className="text-gray-500 text-sm mt-1">
            Digite seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
          <ForgotPasswordForm />
        </div>
        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mt-5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para o login
        </Link>
      </div>
    </div>
  )
}
