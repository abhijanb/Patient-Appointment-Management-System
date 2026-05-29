import { Calendar, Timer, Smile } from 'lucide-react'

interface Props {
  totalSlots: number
  availableCount: number
  bookedCount: number
}

export default function DoctorStatCards({ totalSlots, availableCount, bookedCount }: Props) {
  const bookedPercent = totalSlots > 0 ? Math.round((bookedCount / totalSlots) * 100) : 0
  const availablePercent = totalSlots > 0 ? Math.round((availableCount / totalSlots) * 100) : 0

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-primary shrink-0">
          <Calendar size={28} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Appointments</p>
          <p className="text-2xl font-semibold">{totalSlots}</p>
          <p className="text-xs text-green-600 font-bold">{availableCount} available</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <Timer size={28} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Booked Slots</p>
          <p className="text-2xl font-semibold">{bookedCount}</p>
          <p className="text-xs text-gray-500">{bookedPercent}% booked</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
          <Smile size={28} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Availability Rate</p>
          <p className="text-2xl font-semibold">{availablePercent}%</p>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1 overflow-hidden">
            <div
              className="bg-green-600 h-full rounded-full transition-all"
              style={{ width: `${availablePercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
