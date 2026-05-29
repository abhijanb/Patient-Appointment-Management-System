import { CheckCircle, Lock, Plus } from 'lucide-react'
import type { ScheduleSlot } from '../admin.type'
import { typeLabels, statusStyles } from '../hooks/useDoctorProfileLogic'

interface Props {
  slots: ScheduleSlot[]
  doctorId: number
  onManageRecurring: () => void
  onAddSlot: () => void
}

export default function ManagedSlotsCard({ slots, doctorId, onManageRecurring, onAddSlot }: Props) {
  return (
    <section className="xl:col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-fit">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Managed Slots</h3>
        <button onClick={onManageRecurring} className="text-primary hover:underline text-xs font-semibold uppercase tracking-wider cursor-pointer">Manage Recurring</button>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {slots.slice(0, 6).map((slot) => (
            <div
              key={slot.id}
              onClick={() => slot.status === 'AVAILABLE' && onAddSlot()}
              className={`border border-gray-200 rounded-xl p-3 relative ${
                slot.status === 'AVAILABLE'
                  ? 'bg-white hover:border-primary transition-colors cursor-pointer'
                  : 'bg-gray-50 opacity-80'
              }`}
            >
              {slot.status === 'AVAILABLE' ? (
                <CheckCircle size={16} className="absolute top-1 right-1 text-green-600" />
              ) : (
                <Lock size={16} className="absolute top-1 right-1 text-gray-400" />
              )}
              <p className="text-sm font-semibold text-primary">{slot.timeSlot}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">{typeLabels[slot.consultationType] ?? slot.consultationType}</p>
              <div className={`mt-1 inline-block px-1.5 py-0.5 text-[10px] font-bold rounded uppercase ${statusStyles[slot.status]}`}>
                {slot.status}
              </div>
            </div>
          ))}
        </div>
        <button onClick={onAddSlot} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 text-xs font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 cursor-pointer">
          <Plus size={18} />
          Add One-time Slot
        </button>
      </div>
    </section>
  )
}
