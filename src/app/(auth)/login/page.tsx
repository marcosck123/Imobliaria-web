import { Metadata } from 'next'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = { title: 'Entrar — ImóvelPrime' }

export default function LoginPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
          <p className="text-gray-500 text-sm mt-1">Entre na sua conta para continuar</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
          <LoginForm />
        </div>
        <p className="text-center text-sm text-gray-500 mt-5">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-primary font-medium hover:underline">
            Criar conta gratuita
          </Link>
        </p>
      </div>
    </div>
  )
}
