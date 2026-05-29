import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react'

interface FiltersPanelProps {
  ratingFilter: number
  setRatingFilter: (v: number) => void
  branchFilter: string
  setBranchFilter: (v: string) => void
  consultationTypeFilter: string
  setConsultationTypeFilter: (v: string) => void
  uniqueBranches: string[]
  hasActiveFilters: boolean
  clearFilters: () => void
}

export function FiltersPanel({
  ratingFilter, setRatingFilter,
  branchFilter, setBranchFilter,
  consultationTypeFilter, setConsultationTypeFilter,
  uniqueBranches, hasActiveFilters, clearFilters,
}: FiltersPanelProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Min. Rating</label>
          <div className="flex gap-1">
            {[0, 4, 3, 2].map((r) => (
              <button
                key={r}
                onClick={() => setRatingFilter(ratingFilter === r ? 0 : r)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                  ratingFilter === r
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {r === 0 ? 'All' : `${r}+`}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Hospital Branch</label>
          <select
            className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none appearance-none cursor-pointer"
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            <option value="">All Branches</option>
            {uniqueBranches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Consultation Type</label>
          <select
            className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none appearance-none cursor-pointer"
            value={consultationTypeFilter}
            onChange={(e) => setConsultationTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="IN_PERSON">In-Person</option>
            <option value="TELEHEALTH">Telehealth</option>
          </select>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

interface DoctorSearchBarProps {
  search: string
  setSearch: (v: string) => void
  specialty: string
  setSpecialty: (v: string) => void
  allSpecialties: string[]
  showFilters: boolean
  setShowFilters: (v: boolean) => void
  hasActiveFilters: boolean
}

export function DoctorSearchBar({
  search, setSearch,
  specialty, setSpecialty,
  allSpecialties,
  showFilters, setShowFilters,
  hasActiveFilters,
}: DoctorSearchBarProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-grow w-full">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Search Doctor Name</label>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="e.g. Dr. Sarah Jenkins"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full md:w-48">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Specialty</label>
        <select
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none appearance-none cursor-pointer"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {allSpecialties.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-auto flex items-end">
        <button
          onClick={() => setShowFilters((p) => !p)}
          className={`w-full md:w-auto px-4 py-2.5 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            showFilters || hasActiveFilters
              ? 'bg-primary text-white border-primary'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-white" />}
        </button>
      </div>
    </div>
  )
}
