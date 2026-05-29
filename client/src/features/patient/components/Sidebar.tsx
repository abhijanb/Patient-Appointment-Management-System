import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Calendar,
  Settings, LogOut, UserCircle,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { logOut } from '../../auth/authSlice'

const baseClass =
  'flex items-center gap-4 p-3 rounded-lg transition-all text-sm font-bold'

export default function Sidebar() {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    document.cookie = 'accessToken=; path=/; max-age=0'
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <aside className="h-screen fixed left-0 top-0 w-64 flex flex-col bg-gray-50 border-r border-gray-200 p-6 gap-6 justify-between z-40 hidden lg:flex">
      <div>
        <div className="mb-12">
          <h1 className="text-2xl font-semibold font-bold text-primary">HealthSync Pro</h1>
        </div>
        <div className="mb-6 flex flex-col gap-1.5">
          <div className="flex items-center gap-3 p-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <UserCircle size={24} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-900 font-bold">{user?.name ?? 'Patient'}</p>
              <p className="text-[10px] text-gray-500">Patient ID: {user?.id ? `HS-${user.id}` : '---'}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1.5">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseClass} ${isActive ? 'bg-blue-900 text-white' : 'text-gray-500 hover:bg-gray-200'}`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? 'bg-blue-900 text-white' : 'text-gray-500 hover:bg-gray-200'}`
              }
            >
              <Calendar size={20} />
              Appointments
            </NavLink>

          </nav>
        </div>
        <NavLink to="/book-appointments" className="block w-full py-3 px-6 bg-primary text-white font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity text-xs font-semibold uppercase tracking-wider text-center">
          Book Appointment
        </NavLink>
      </div>
      <div className="flex flex-col gap-1.5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? 'bg-blue-900 text-white' : 'text-gray-500 hover:bg-gray-200'}`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>
        <button onClick={handleSignOut} className={`${baseClass} text-gray-500 hover:bg-gray-200 w-full text-left cursor-pointer`}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
