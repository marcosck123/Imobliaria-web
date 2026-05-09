export type Role = 'ADMIN' | 'CORRETOR' | 'CLIENTE'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
  photo?: string
}

const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@imovelprime.com.br',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    email: 'carlos@imovelprime.com.br',
    password: 'corretor123',
    role: 'CORRETOR',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
  },
  {
    id: '3',
    name: 'Ana Lima',
    email: 'ana@imovelprime.com.br',
    password: 'corretor123',
    role: 'CORRETOR',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
  },
  {
    id: '4',
    name: 'Pedro Costa',
    email: 'pedro@imovelprime.com.br',
    password: 'corretor123',
    role: 'CORRETOR',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    id: '6',
    name: 'Roberto Alves',
    email: 'roberto@email.com',
    password: 'cliente123',
    role: 'CLIENTE',
  },
  {
    id: '7',
    name: 'Camila Ferreira',
    email: 'camila@email.com',
    password: 'cliente123',
    role: 'CLIENTE',
  },
]

const SESSION_KEY = 'imovelprime_session'

export function redirectPathForRole(role: Role): string {
  if (role === 'ADMIN') return '/admin'
  if (role === 'CORRETOR') return '/corretor/dashboard'
  return '/minha-conta/favoritos'
}

export function signIn(email: string, password: string): AuthUser | null {
  const found = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!found) return null
  const { password: _, ...user } = found
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    document.cookie = `${SESSION_KEY}=${found.role}; path=/; max-age=86400`
  }
  return user
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY)
    document.cookie = `${SESSION_KEY}=; path=/; max-age=0`
  }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}
