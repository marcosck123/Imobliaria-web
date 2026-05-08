import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { pendingProperties } from '@/lib/mock-data'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pendingCount = pendingProperties.filter(
    (p) => p.approvalStatus === 'Pendente'
  ).length

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar pendingCount={pendingCount} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
