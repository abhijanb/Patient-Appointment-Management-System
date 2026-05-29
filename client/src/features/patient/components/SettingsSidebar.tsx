import { User, Shield } from 'lucide-react'

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
]

interface Props {
  activeSection: string
  setActiveSection: (id: string) => void
}

export default function SettingsSidebar({ activeSection, setActiveSection }: Props) {
  return (
    <aside className="lg:col-span-3">
      <div className="flex flex-col gap-1 sticky top-0">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all text-sm ${
              activeSection === id
                ? 'bg-white border border-gray-200 text-primary font-semibold shadow-sm'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </aside>
  )
}
