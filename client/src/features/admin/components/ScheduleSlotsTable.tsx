import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react'
import type { ScheduleSlot } from '../admin.type'
import { typeStyles, statusStyles, typeLabels } from '../constants'

interface Props {
  slots: ScheduleSlot[]
  paginatedSlots: ScheduleSlot[]
  isLoading: boolean
  slotPage: number
  totalSlotPages: number
  onPageChange: (page: number) => void
}

export default function ScheduleSlotsTable({ slots, paginatedSlots, isLoading, slotPage, totalSlotPages, onPageChange }: Props) {
  return (
    <section className="xl:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Schedule Slots</h3>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <LoaderCircle size={24} className="animate-spin text-primary" />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {slots.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-sm text-gray-500" colSpan={4}>No slots found</td>
                </tr>
              ) : (
                paginatedSlots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-4">
                      <p className="text-sm">{new Date(slot.availableDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold">{slot.timeSlot}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${typeStyles[slot.consultationType]}`}>
                        {typeLabels[slot.consultationType] ?? slot.consultationType}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusStyles[slot.status]}`}>
                        {slot.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {slots.length > 0 && (
        <div className="p-4 bg-gray-50 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Showing {paginatedSlots.length} of {slots.length} slot{slots.length !== 1 ? 's' : ''}</p>
          <div className="flex gap-1.5">
            <button
              aria-label="Previous page"
              className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
              disabled={slotPage <= 1}
              onClick={() => onPageChange(slotPage - 1)}
            >
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer">
              {slotPage}
            </button>
            <button
              aria-label="Next page"
              className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
              disabled={slotPage >= totalSlotPages}
              onClick={() => onPageChange(slotPage + 1)}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
