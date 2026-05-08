import { Metadata } from 'next'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta ImóvelPrime',
}

export default function LoginPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-1">Bem-vindo de volta</h1>
          <p className="text-gray-500 text-sm">Entre com sua conta para continuar</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-primary font-medium hover:text-accent transition-colors">Cadastre-se grátis</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
