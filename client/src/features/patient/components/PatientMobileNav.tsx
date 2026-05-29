import { NavLink } from 'react-router-dom'
import { Home, Calendar, User } from 'lucide-react'

export default function PatientMobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-1.5 flex justify-around items-center z-50">
      <NavLink to="/" end className={({ isActive }) => `flex flex-col items-center p-3 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <Home size={20} />
        <span className="text-[10px] font-bold">Home</span>
      </NavLink>
      <NavLink to="/appointments" className={({ isActive }) => `flex flex-col items-center p-3 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <Calendar size={20} />
        <span className="text-[10px]">Appts</span>
      </NavLink>
      <NavLink to="/book-appointments" className={({ isActive }) => `flex flex-col items-center p-3 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <Calendar size={20} />
        <span className="text-[10px]">Book</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center p-3 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        <User size={20} />
        <span className="text-[10px]">Profile</span>
      </NavLink>
    </nav>
  )
}
