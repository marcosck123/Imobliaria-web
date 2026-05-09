'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  type AuthUser,
  signIn as authSignIn,
  signOut as authSignOut,
  getStoredUser,
  redirectPathForRole,
} from '@/lib/auth'

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setUser(getStoredUser())
    setLoading(false)
  }, [])

  async function signIn(email: string, password: string) {
    const result = authSignIn(email, password)
    if (!result) {
      return { success: false, error: 'E-mail ou senha incorretos.' }
    }
    setUser(result)
    router.push(redirectPathForRole(result.role))
    return { success: true }
  }

  function signOut() {
    authSignOut()
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
