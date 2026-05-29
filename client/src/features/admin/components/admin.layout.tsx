import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'
import MobileBottomNav from './MobileBottomNav'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Sidebar />
      <main className="md:ml-64 pb-24 md:pb-12">
        <AdminHeader />
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  )
}
