import { Search, UserPlus } from 'lucide-react'

const branches = ['All Branches', 'City General Hospital', 'Westside Medical Center', 'Northside Health Clinic', 'Eastside Medical Plaza', 'Southside Wellness Center'] as const
const specializations = ['All Specialities', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Ophthalmology', 'Psychiatry', 'Pulmonology', 'Endocrinology', 'Gastroenterology', 'Rheumatology', 'Urology', 'Oncology', 'ENT', 'Allergy & Immunology', 'Nephrology', 'Gynecology', 'Hematology', 'Infectious Disease', 'Physical Medicine'] as const

interface Props {
  search: string
  onSearchChange: (value: string) => void
  selectedBranch: string
  onBranchChange: (value: string) => void
  selectedSpecialization: string
  onSpecializationChange: (value: string) => void
  onAdd: () => void
}

export default function DoctorFilters({
  search,
  onSearchChange,
  selectedBranch,
  onBranchChange,
  selectedSpecialization,
  onSpecializationChange,
  onAdd,
}: Props) {
  return (
    <>
      <div className="relative lg:hidden mb-2">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Search doctors by name..."
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Hospital Branch
            </label>
            <select
              className="bg-white border border-gray-200 rounded-lg px-6 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none min-w-[200px]"
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value)}
            >
              {branches.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Specialization
            </label>
            <select
              className="bg-white border border-gray-200 rounded-lg px-6 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none min-w-[200px]"
              value={selectedSpecialization}
              onChange={(e) => onSpecializationChange(e.target.value)}
            >
              {specializations.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="bg-primary text-white px-12 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap text-xs font-semibold uppercase tracking-wider cursor-pointer"
          onClick={onAdd}
        >
          <UserPlus size={18} />
          Add New Doctor
        </button>
      </section>
    </>
  )
}
