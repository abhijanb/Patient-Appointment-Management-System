import { formatDate } from '../../../utils/date'

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

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarBgColors[Math.abs(hash) % avatarBgColors.length]
}

interface Props {
  appointments: Array<{
    id: number
    status: string
    schedule: {
      availableDate: string
      doctor: {
        name: string
        specialization: string
      }
    }
  }>
}

export default function AppointmentHistoryTable({ appointments }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl clinical-shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Doctor</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appt) => {
            const doc = appt.schedule.doctor
            return (
              <tr key={appt.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${avatarColor(doc.name)} flex items-center justify-center font-bold text-xs`}>
                      {getInitials(doc.name)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{doc.specialization}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{formatDate(appt.schedule.availableDate)}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-gray-200 text-gray-500">
                    {appt.status}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
