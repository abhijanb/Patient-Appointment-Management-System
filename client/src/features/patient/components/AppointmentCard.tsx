import { Video, MapPin } from 'lucide-react'

interface Props {
  appt: {
    id: number
    schedule: {
      availableDate: string
      timeSlot: string
      consultationType: string
      doctor: {
        name: string
        specialization: string
      }
    }
  }
}

export default function AppointmentCard({ appt }: Props) {
  const date = new Date(appt.schedule.availableDate)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate().toString()
  const isTelehealth = appt.schedule.consultationType === 'TELEHEALTH'
  const BadgeIcon = isTelehealth ? Video : MapPin
  const isUpcoming = date >= new Date()

  return (
    <div className="flex items-center justify-between p-6 bg-[#f7f9fb] border border-gray-200 rounded-lg hover:border-secondary transition-all group">
      <div className="flex gap-6 items-center">
        <div className={`w-12 h-12 rounded-lg ${isUpcoming ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'} flex flex-col items-center justify-center font-bold shrink-0`}>
          <span className="text-[10px] uppercase">{month}</span>
          <span className="text-[18px] leading-tight">{day}</span>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-900">{appt.schedule.doctor.name}</p>
          <p className="text-gray-500 text-sm">{appt.schedule.doctor.specialization} &bull; {appt.schedule.timeSlot}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isTelehealth ? 'bg-sky-100 text-sky-700' : 'bg-green-50 text-green-700'}`}>
          <BadgeIcon size={14} />
          {isTelehealth ? 'Telehealth' : 'In-Person'}
        </span>
        <button className="text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          Details
        </button>
      </div>
    </div>
  )
}
