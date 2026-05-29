import { NavLink } from 'react-router-dom'
import { Home, Search, CalendarDays } from 'lucide-react'

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 md:hidden bg-white shadow-[0px_-2px_10px_rgba(15,76,129,0.05)] rounded-t-xl">
      <NavLink to="/admin" end className={({ isActive }) => `flex flex-col items-center justify-center py-1 ${isActive ? 'bg-blue-100 text-blue-800 rounded-full px-5 active:scale-90 transition-transform' : 'text-gray-500'}`}>
        <Home size={20} />
        <span className="text-xs font-semibold uppercase tracking-wider mt-0.5">Home</span>
      </NavLink>
      <NavLink to="/admin/doctors" end className={({ isActive }) => `flex flex-col items-center justify-center py-1 ${isActive ? 'bg-blue-100 text-blue-800 rounded-full px-5 active:scale-90 transition-transform' : 'text-gray-500'}`}>
        <Search size={20} />
        <span className="text-xs font-semibold uppercase tracking-wider mt-0.5">Search</span>
      </NavLink>
      <NavLink to="/admin/schedule" end className={({ isActive }) => `flex flex-col items-center justify-center py-1 ${isActive ? 'bg-blue-100 text-blue-800 rounded-full px-5 active:scale-90 transition-transform' : 'text-gray-500'}`}>
        <CalendarDays size={20} />
        <span className="text-xs font-semibold uppercase tracking-wider mt-0.5">Appts</span>
      </NavLink>
    </nav>
  )
}
