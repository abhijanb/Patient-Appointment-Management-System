import { Menu, UserCircle } from 'lucide-react'

interface Props {
  title: string
  userName: string | undefined
}

export default function PatientHeader({ title, userName }: Props) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-6 h-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-6">
          <Menu size={24} className="text-primary lg:hidden" />
          <h2 className="text-xl font-bold text-primary">{title}</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <UserCircle size={20} />
              <span className="hidden md:inline text-xs font-semibold">{userName ?? 'Patient'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
