import { Link } from 'react-router-dom'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { useDoctorProfileLogic } from '../hooks/useDoctorProfileLogic'
import DoctorProfileHeader from '../components/DoctorProfileHeader'
import DoctorStatCards from '../components/DoctorStatCards'
import ManagedSlotsCard from '../components/ManagedSlotsCard'
import ScheduleSlotsTable from '../components/ScheduleSlotsTable'

export default function DoctorProfilePage() {
  const {
    doctor,
    doctorLoading,
    doctorId,
    slots,
    slotsLoading,
    availableSlots,
    bookedSlots,
    paginatedSlots,
    slotPage,
    totalSlotPages,
    setSlotPage,
    navigate,
  } = useDoctorProfileLogic()

  if (doctorLoading || !doctor) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto w-full flex items-center justify-center h-64">
        <LoaderCircle size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-3 mb-2">
        <Link to="/admin/doctors" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-xl font-semibold text-primary">Doctor Profile</h2>
      </div>

      <DoctorProfileHeader
        doctor={doctor}
        slotsCount={slots.length}
        availableCount={availableSlots.length}
        bookedCount={bookedSlots.length}
      />

      <DoctorStatCards
        totalSlots={slots.length}
        availableCount={availableSlots.length}
        bookedCount={bookedSlots.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ManagedSlotsCard
          slots={slots}
          doctorId={doctorId}
          onManageRecurring={() => navigate('/admin/schedule')}
          onAddSlot={() => navigate(`/admin/schedule/create?doctorId=${doctorId}`)}
        />

        <ScheduleSlotsTable
          slots={slots}
          paginatedSlots={paginatedSlots}
          isLoading={slotsLoading}
          slotPage={slotPage}
          totalSlotPages={totalSlotPages}
          onPageChange={setSlotPage}
        />
      </div>
    </div>
  )
}
