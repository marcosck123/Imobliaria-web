import { NextRequest, NextResponse } from 'next/server'

const SESSION_KEY = 'imovelprime_session'

const PROTECTED: Array<{ path: string; roles: string[] }> = [
  { path: '/admin', roles: ['ADMIN'] },
  { path: '/corretor', roles: ['CORRETOR'] },
  { path: '/minha-conta', roles: ['ADMIN', 'CORRETOR', 'CLIENTE'] },
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const role = request.cookies.get(SESSION_KEY)?.value

  const rule = PROTECTED.find((r) => pathname.startsWith(r.path))
  if (!rule) return NextResponse.next()

  if (!role || !rule.roles.includes(role)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/corretor/:path*', '/minha-conta/:path*'],
}
