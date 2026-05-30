import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'
import MobileBottomNav from './MobileBottomNav'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Sidebar />
      <main id="main-content" className="md:ml-64 pb-24 md:pb-12">
        <AdminHeader />
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  )
}
