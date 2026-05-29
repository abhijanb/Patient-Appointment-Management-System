import {
  TrendingUp, CheckCircle,
  CalendarCheck, Stethoscope,
} from 'lucide-react'
import { useAdminDashboard } from '../hooks/useAdminDashboard'
import MetricCard from '../components/MetricCard'
import DoctorManagementTable from '../components/DoctorManagementTable'

export default function DashboardPage() {
  const { dashboard, isLoading } = useAdminDashboard()

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-primary">Clinic Overview</h2>
          <p className="text-base text-gray-500">Real-time performance metrics and management hub.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Doctors"
          value={isLoading ? '...' : String(dashboard?.totalDoctors ?? 0)}
          sub="Active practitioners"
          icon={Stethoscope}
          iconColor="text-primary"
          subIcon={TrendingUp}
          subColor="text-[#006492]"
        />
        <MetricCard
          label="Today's Appointments"
          value={isLoading ? '...' : String(dashboard?.todayAppointments ?? 0)}
          sub="Scheduled for today"
          icon={CalendarCheck}
          iconColor="text-primary"
          subIcon={CheckCircle}
          subColor="text-[#006492]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DoctorManagementTable dashboard={dashboard} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
