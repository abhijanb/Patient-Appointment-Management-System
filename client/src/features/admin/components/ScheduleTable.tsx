import { Layers, List, CalendarDays, Clock, Edit, Trash2, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { getImageUrl } from '../../../utils/getImageUrl'
import { statusStyles, typeStyles, typeLabels } from '../constants'
import type { ScheduleSlot } from '../admin.type'

interface Props {
  schedules: ScheduleSlot[]
  total: number
  page: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
  onDelete: (id: number) => void
}

export default function ScheduleTable({ schedules, total, page, totalPages, isLoading, onPageChange, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Scheduled Slots</h2>
          <div className="flex items-center gap-1.5 bg-[#f2f4f6] px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{total} Slot{total !== 1 ? 's' : ''} Total</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-500 text-xs font-semibold uppercase tracking-wider hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
            <Layers size={16} />
            Bulk Actions
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button aria-label="List view" className="p-2 bg-blue-100 text-blue-700 cursor-pointer">
              <List size={18} />
            </button>
            <button aria-label="Calendar view" className="p-2 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
              <CalendarDays size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f2f4f6]">
              <th className="w-12 px-4 py-4 text-left">
                <input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Doctor Name</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Time Slot</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td className="px-4 py-12 text-center text-sm text-gray-500" colSpan={7}>Loading...</td>
              </tr>
            ) : schedules.length === 0 ? (
              <tr>
                <td className="px-4 py-12 text-center text-sm text-gray-500" colSpan={7}>No schedules found</td>
              </tr>
            ) : (
              schedules.map((slot) => (
                <tr key={slot.id} className="hover:bg-white transition-colors group">
                  <td className="px-4 py-4">
                    <input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                        {slot.doctor.imageUrl ? (
                          <img src={getImageUrl(slot.doctor.imageUrl)} alt={slot.doctor.name} className="w-full h-full object-cover" />
                        ) : (
                          <User size={20} className="text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{slot.doctor.name}</p>
                        <p className="text-xs text-gray-500">{slot.doctor.specialization}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(slot.availableDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-900">{slot.timeSlot}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeStyles[slot.consultationType]}`}>
                      {typeLabels[slot.consultationType] ?? slot.consultationType}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[slot.status]}`}>
                      {slot.status.charAt(0) + slot.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button aria-label="Edit schedule" className="p-2 text-secondary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                        <Edit size={16} />
                      </button>
                      <button aria-label="Delete schedule" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" onClick={() => onDelete(slot.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-[#f2f4f6] border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Showing {schedules.length} of {total} entr{total !== 1 ? 'ies' : 'y'}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              aria-label="Previous page"
              className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg disabled:opacity-30 cursor-pointer"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            {(() => {
              const pages: (number | string)[] = []
              if (totalPages > 7) {
                pages.push(1)
                if (page > 3) pages.push('...')
                for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                  pages.push(i)
                }
                if (page < totalPages - 2) pages.push('...')
                pages.push(totalPages)
              } else {
                for (let i = 1; i <= totalPages; i++) pages.push(i)
              }
              return pages.map((p, i) =>
                p === '...' ? (
                  <span key={`dot-${i}`} className="px-2 py-1.5 text-xs text-gray-400">...</span>
                ) : (
                  <button
                    key={p}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      p === page ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    onClick={() => onPageChange(p as number)}
                  >
                    {p}
                  </button>
                ),
              )
            })()}
            <button
              aria-label="Next page"
              className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg disabled:opacity-30 cursor-pointer"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
