import { Sun, Moon } from 'lucide-react'
import type { ScheduleSlot } from '../patientApi'

interface Props {
  title: string
  icon: 'sun' | 'moon'
  slots: ScheduleSlot[]
  selectedSlot: ScheduleSlot | null
  onSelectSlot: (slot: ScheduleSlot) => void
}

export default function SlotSection({ title, icon, slots, selectedSlot, onSelectSlot }: Props) {
  if (slots.length === 0) return null
  const Icon = icon === 'sun' ? Sun : Moon
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon size={18} />
        <h3 className="text-xs font-semibold uppercase tracking-wider">{title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onSelectSlot(slot)}
            className={`py-3 px-4 border rounded-lg text-sm text-center transition-all cursor-pointer ${
              selectedSlot?.id === slot.id
                ? 'bg-blue-100 text-blue-700 border-blue-300 font-bold'
                : 'border-gray-200 hover:border-secondary hover:text-secondary'
            }`}
          >
            {slot.timeSlot}
          </button>
        ))}
      </div>
    </div>
  )
}
