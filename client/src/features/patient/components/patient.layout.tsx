import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import PatientHeader from './PatientHeader'
import PatientMobileNav from './PatientMobileNav'
import { useAppSelector } from '../../../store/store'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/appointments': 'My Appointments',
  '/book-appointments': 'Book Appointment',
  '/settings': 'Settings',
}

export default function PatientLayout() {
  const location = useLocation()
  const user = useAppSelector((state) => state.auth.user)
  const pageTitle = pageTitles[location.pathname] ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Sidebar />
      <main className="lg:ml-64 flex flex-col min-h-screen">
        <PatientHeader title={pageTitle} userName={user?.name} />
        <Outlet />
      </main>
      <PatientMobileNav />
    </div>
  )
}
