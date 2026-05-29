import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { usePatientDashboardLogic } from '../hooks/usePatientDashboardLogic'
import AppointmentCard from '../components/AppointmentCard'
import RatingModal from '../components/RatingModal'

export default function DashboardPage() {
  const {
    user,
    isLoading,
    appointments,
    count,
    unratedAppointment,
    dismissRatingModal,
  } = usePatientDashboardLogic()

  return (
    <div className="p-6 lg:p-12 max-w-[1200px] w-full mx-auto space-y-6 lg:space-y-12">
      {unratedAppointment && (
        <RatingModal
          key={unratedAppointment.id}
          appointmentId={unratedAppointment.id}
          doctorName={unratedAppointment.schedule.doctor.name}
          onClose={dismissRatingModal}
          onSuccess={dismissRatingModal}
        />
      )}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Welcome back, {user?.name ?? 'Patient'}</h1>
          <p className="text-gray-500 text-base mt-1">
            {isLoading ? 'Loading...' : `You have ${count} appointment${count !== 1 ? 's' : ''} scheduled for this week.`}
          </p>
        </div>
        <Link to="/book-appointments" className="flex items-center gap-1.5 px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.08)] hover:opacity-90 transition-opacity text-xs font-semibold uppercase tracking-wider">
          <Plus size={18} />
          New Appointment
        </Link>
      </section>

      <div className="bg-white border border-gray-200 rounded-xl shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.05)] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/50">
          <h3 className="text-xl font-semibold text-primary">Upcoming Appointments</h3>
          <Link to="/appointments" className="text-secondary text-xs font-semibold uppercase tracking-wider hover:underline">
            View All
          </Link>
        </div>
        <div className="p-6 space-y-6 flex-grow">
          {isLoading ? (
            <p className="text-gray-400 text-center py-8">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No upcoming appointments.</p>
          ) : (
            appointments.map((appt) => (
              <AppointmentCard key={appt.id} appt={appt} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
