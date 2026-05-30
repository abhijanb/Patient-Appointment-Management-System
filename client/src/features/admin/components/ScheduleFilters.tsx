import { ChevronDown, Calendar, X } from 'lucide-react'
import type { Doctor } from '../admin.type'

interface Props {
  doctorId: number | undefined
  dateFrom: string
  dateTo: string
  doctors: Doctor[]
  onDoctorChange: (value: string) => void
  onDateFromChange: (value: string) => void
  onDateToChange: (value: string) => void
  onClear: () => void
}

export default function ScheduleFilters({
  doctorId,
  dateFrom,
  dateTo,
  doctors,
  onDoctorChange,
  onDateFromChange,
  onDateToChange,
  onClear,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Doctor</label>
          <div className="relative">
            <select
              className="w-full bg-[#f7f9fb] border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
              value={doctorId ?? ''}
              onChange={(e) => onDoctorChange(e.target.value)}
            >
              <option value="">All Specialists</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">From Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              className="w-full bg-[#f7f9fb] border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              type="date"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">To Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              className="w-full bg-[#f7f9fb] border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              type="date"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-end">
          <button
            aria-label="Clear filters"
            className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 cursor-pointer"
            title="Clear Filters"
            onClick={onClear}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
