import { useAppointmentsLogic } from '../hooks/useAppointmentsLogic'
import UpcomingAppointmentCard from '../components/UpcomingAppointmentCard'
import AppointmentHistoryTable from '../components/AppointmentHistoryTable'

export default function AppointmentsPage() {
  const { isLoading, upcoming, history, cancelAppointment } = useAppointmentsLogic()

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto w-full space-y-8 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">My Appointments</h1>
          <p className="text-base text-gray-500">Manage your upcoming visits and view your health history.</p>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-primary">Upcoming Appointments</h2>
          <span className="bg-green-800 text-green-100 px-2 py-0.5 rounded-full text-[10px] font-bold">{upcoming.length} PENDING</span>
        </div>

        {isLoading ? (
          <p className="text-gray-400 text-center py-12">Loading appointments...</p>
        ) : upcoming.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcoming.map((appt) => (
              <UpcomingAppointmentCard
                key={appt.id}
                appt={appt}
                onCancel={(id) => cancelAppointment({ appointmentId: id })}
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Appointment History</h2>
          <a className="text-secondary text-xs font-semibold uppercase tracking-wider hover:underline cursor-pointer">View All Records</a>
        </div>

        {history.length === 0 && !isLoading ? (
          <p className="text-gray-400 text-center py-12">No appointment history.</p>
        ) : (
          <AppointmentHistoryTable appointments={history} />
        )}
      </section>
    </div>
  )
}
