import { Link } from 'react-router-dom'
import { CheckCircle, CalendarDays, MapPin, Info, User, LayoutDashboard, PlusCircle } from 'lucide-react'
import type { Doctor, ScheduleSlot } from '../patientApi'
import { formatDate as formatDateDisplay } from '../../../utils/date'

interface Props {
  doctor: Doctor
  slot: ScheduleSlot
  selectedDate: string
  onBookAnother: () => void
}

export default function BookingConfirmation({ doctor, slot, selectedDate, onBookAnother }: Props) {
  return (
    <div className="max-w-[800px] mx-auto w-full">
      <section className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 shadow-sm">
          <CheckCircle size={48} className="text-green-700" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
        <p className="text-base text-gray-500">We've sent a confirmation email and SMS with all the details.</p>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-gray-200 pb-6 mb-6">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-100">
                <User size={28} className="text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{doctor.name}</h2>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
              {slot.consultationType === 'TELEHEALTH' ? 'Telehealth Visit' : 'In-Person Visit'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-primary">
                <CalendarDays size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Date & Time</p>
                <p className="text-lg text-gray-900 font-semibold">{formatDateDisplay(selectedDate)}</p>
                <p className="text-base text-gray-500">{slot.timeSlot} (EST)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Location / Link</p>
                <p className="text-lg text-gray-900 font-semibold">{slot.consultationType === 'TELEHEALTH' ? 'Video Consultation' : 'In-Person Visit'}</p>
                <a className="text-blue-600 text-base hover:underline cursor-pointer">Link sent to email</a>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex gap-2">
            <Info size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              Please join the virtual waiting room 5 minutes before your scheduled time. Ensure your camera and microphone are working correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link to="/" className="w-full border border-secondary text-secondary py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            <LayoutDashboard size={18} />
            View My Dashboard
          </Link>
          <button className="w-full border border-gray-300 text-gray-500 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer" onClick={onBookAnother}>
            <PlusCircle size={18} />
            Book Another
          </button>
        </div>
      </section>

      <p className="text-center mt-8 text-sm text-gray-500">
        Need to reschedule? You can manage your appointment from the <Link to="/appointments" className="text-primary underline">Dashboard</Link> up to 24 hours before the visit.
      </p>
    </div>
  )
}
