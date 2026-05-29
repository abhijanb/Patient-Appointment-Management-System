import { useNavigate } from 'react-router-dom'
import { Search, UserCircle } from 'lucide-react'
import { APP_NAME } from '../../../config'
import { useState } from 'react'

export default function AdminHeader() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/admin/doctors?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <span className="md:hidden text-xl font-bold text-primary">
          {APP_NAME}
        </span>
        <div className="hidden md:flex items-center bg-[#f2f4f6] px-4 py-2 rounded-full border border-gray-200 w-80">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            className="bg-transparent border-none text-sm w-full ml-2 outline-none"
            placeholder="Search doctors"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-px h-6 bg-gray-300" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Admin User
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
              Super Admin
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border border-gray-200 bg-gray-200 flex items-center justify-center overflow-hidden">
            <UserCircle size={28} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  )
}
