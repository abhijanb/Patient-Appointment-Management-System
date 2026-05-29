import { CalendarDays, Star, User } from 'lucide-react'
import type { Doctor } from '../patientApi'

interface Props {
  doc: Doctor
  onViewSlots: (doc: Doctor) => void
}

export default function DoctorCard({ doc, onViewSlots }: Props) {
  return (
    <div className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-secondary transition-all cursor-pointer" onClick={() => onViewSlots(doc)}>
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border-2 border-gray-100">
          <User size={32} className="text-gray-400" />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors">{doc.name}</h3>
          <p className="text-sm text-gray-500">{doc.specialization}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold">{doc.averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <button
        className="w-full border-2 border-secondary text-secondary py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onViewSlots(doc) }}
      >
        View Slots
        <CalendarDays size={16} />
      </button>
    </div>
  )
}
