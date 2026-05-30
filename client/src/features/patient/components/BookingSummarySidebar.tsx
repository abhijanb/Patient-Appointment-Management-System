import { ArrowRight, Star as StarIcon, User } from 'lucide-react'
import type { Doctor, ScheduleSlot } from '../patientApi'
import { formatDate as formatDateDisplay } from '../../../utils/date'

interface Props {
  doctor: Doctor
  selectedDate: string
  selectedSlot: ScheduleSlot | null
  bookError: string
  booking: boolean
  onProceed: () => void
  onBack: () => void
}

export default function BookingSummarySidebar({
  doctor, selectedDate, selectedSlot, bookError, booking, onProceed, onBack,
}: Props) {
  return (
    <aside className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User size={28} className="text-gray-400" />
        </div>
        <div>
          <h3 className="font-bold text-primary">{doctor.name}</h3>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
          <div className="flex items-center mt-1 bg-green-50 rounded px-2 py-0.5 w-fit">
            <StarIcon size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-xs font-semibold">{Number(doctor.averageRating).toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Selected Date</span>
          <span className="text-sm font-bold text-primary">{selectedDate ? formatDateDisplay(selectedDate) : '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Selected Time</span>
          <span className="text-sm font-bold text-primary">{selectedSlot?.timeSlot ?? '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Consultation</span>
          <span className={`text-sm font-bold ${selectedSlot?.consultationType === 'TELEHEALTH' ? 'text-purple-600' : 'text-green-600'}`}>
            {selectedSlot
              ? selectedSlot.consultationType === 'TELEHEALTH' ? 'Telehealth' : 'In-Person'
              : '-'}
          </span>
        </div>
      </div>
      {bookError && (
        <p className="text-red-600 text-sm mt-3">{bookError}</p>
      )}
      <div className="mt-6 space-y-3">
        <button
          className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedSlot || booking}
          onClick={onProceed}
        >
          {booking ? 'Booking...' : 'Proceed to Details'}
          {!booking && <ArrowRight size={18} />}
        </button>
        <button
          className="w-full py-4 bg-transparent text-primary font-bold hover:bg-gray-50 transition-colors rounded-xl cursor-pointer"
          onClick={onBack}
        >
          Go Back
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">Free cancellation up to 24 hours before the appointment.</p>
    </aside>
  )
}
