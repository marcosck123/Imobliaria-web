'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { pendingProperties } from '@/lib/mock-data'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pendingCount = pendingProperties.filter(
    (p) => p.approvalStatus === 'Pendente'
  ).length
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden off-screen on mobile, always visible on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-30 lg:static lg:z-auto transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <AdminSidebar pendingCount={pendingCount} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#1a3c5e] text-white sticky top-0 z-10 shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm">ImóvelPrime</span>
          <span className="text-white/50 text-xs ml-0.5">/ Admin</span>
        </div>
        {children}
      </main>
    </div>
  )
}
