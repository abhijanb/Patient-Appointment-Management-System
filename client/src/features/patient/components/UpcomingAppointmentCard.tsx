import { Video, XCircle } from 'lucide-react'

const avatarBgColors = [
  'bg-secondary-container text-white',
  'bg-gray-200 text-gray-500',
  'bg-blue-100 text-primary',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
]

function getInitials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatCardDate(iso: string) {
  const d = new Date(iso)
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarBgColors[Math.abs(hash) % avatarBgColors.length]
}

interface Props {
  appt: {
    id: number
    status: string
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
  onCancel: (id: number) => void
}

export default function UpcomingAppointmentCard({ appt, onCancel }: Props) {
  const isTelehealth = appt.schedule.consultationType === 'TELEHEALTH'
  const doc = appt.schedule.doctor

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 clinical-shadow relative overflow-hidden group">
      {isTelehealth && (
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <Video size={120} className="text-primary" />
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className={`w-16 h-16 rounded-full ${avatarColor(doc.name)} flex items-center justify-center font-bold text-lg shrink-0`}>
            {getInitials(doc.name)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">{doc.name}</h3>
            <p className="text-sm text-secondary font-bold">{doc.specialization}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isTelehealth ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
              {isTelehealth ? 'Telehealth' : 'In-Person'}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-xs font-semibold px-3 py-1 rounded-lg ${isTelehealth ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-500'}`}>
            {formatCardDate(appt.schedule.availableDate)}
          </p>
          <p className="text-xl font-semibold mt-1">{appt.schedule.timeSlot}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => onCancel(appt.id)} className="px-4 py-3 border border-gray-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer" title="Cancel">
          <XCircle size={16} />
        </button>
      </div>
    </div>
  )
}
