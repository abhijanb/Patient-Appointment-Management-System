import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useScheduleLogic } from '../hooks/useScheduleLogic'
import ScheduleFilters from '../components/ScheduleFilters'
import ScheduleTable from '../components/ScheduleTable'

export default function SchedulePage() {
  const {
    page,
    setPage,
    doctorId,
    dateFrom,
    dateTo,
    doctors,
    schedules,
    total,
    totalPages,
    isLoading,
    handleDelete,
    handleDoctorChange,
    handleDateFromChange,
    handleDateToChange,
    clearFilters,
  } = useScheduleLogic()

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Schedule Master</h1>
          <p className="text-sm text-gray-500">Orchestrate clinical availability and appointment slots.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/schedule/create"
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm hover:opacity-90 transition-all"
          >
            <Plus size={18} />
            Create New Slot
          </Link>
        </div>
      </div>

      <ScheduleFilters
        doctorId={doctorId}
        dateFrom={dateFrom}
        dateTo={dateTo}
        doctors={doctors}
        onDoctorChange={handleDoctorChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
        onClear={clearFilters}
      />

      <ScheduleTable
        schedules={schedules}
        total={total}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={setPage}
        onDelete={handleDelete}
      />
    </div>
  )
}
