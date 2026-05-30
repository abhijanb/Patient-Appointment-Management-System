import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Stethoscope, Calendar,
  LogOut,
} from 'lucide-react'
import { useAppDispatch } from '../../../store/store'
import { logOut } from '../../auth/authSlice'
import { useLogoutMutation } from '../../auth/authApi'
import { deleteCookie } from '../../../utils/cookie'

const baseClass =
  'flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-xs font-semibold uppercase tracking-wider'

export default function Sidebar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch {
      // still clear local state even if network fails
    }
    deleteCookie('accessToken')
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-200 p-2 z-50">
      <div className="mb-12 px-4">
        <h1 className="text-xl font-bold text-primary">City Central Clinic</h1>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Administrator Panel
        </p>
      </div>
      <nav className="flex-1 space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${baseClass} ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/doctors"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'}`
          }
        >
          <Stethoscope size={20} />
          Doctor Management
        </NavLink>
        <NavLink
          to="/admin/schedule"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'}`
          }
        >
          <Calendar size={20} />
          Schedule Master
        </NavLink>
      </nav>
      <div className="mt-auto space-y-4">
        <div className="pt-4 border-t border-gray-200 space-y-1">
          <button onClick={handleLogout} className={`${baseClass} text-gray-500 hover:bg-gray-100 w-full`}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
