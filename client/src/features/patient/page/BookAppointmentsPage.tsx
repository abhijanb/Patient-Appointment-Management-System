import { CalendarDays } from 'lucide-react'
import { useBookAppointmentsLogic } from '../hooks/useBookAppointmentsLogic'
import BookingStepper from '../components/BookingStepper'
import { DoctorSearchBar, FiltersPanel } from '../components/DoctorSearchSection'
import DoctorCard from '../components/DoctorCard'
import DatePicker from '../components/DatePicker'
import SlotSection from '../components/SlotSection'
import BookingSummarySidebar from '../components/BookingSummarySidebar'
import BookingConfirmation from '../components/BookingConfirmation'

export default function BookAppointmentsPage() {
  const {
    step, setStep,
    search, setSearch,
    specialty, setSpecialty,
    ratingFilter, setRatingFilter,
    branchFilter, setBranchFilter,
    consultationTypeFilter, setConsultationTypeFilter,
    showFilters, setShowFilters,
    selectedDoctor, setSelectedDoctor,
    selectedDate, setSelectedDate,
    selectedSlot, setSelectedSlot,
    bookError,
    doctorsLoading, schedulesLoading, booking, schedules,
    doctors, filteredDoctors,
    uniqueBranches, allSpecialties,
    hasActiveFilters, clearFilters,
    weekDates,
    morningSlots, afternoonSlots, eveningSlots,
    handleViewSlots, handleProceed,
  } = useBookAppointmentsLogic()

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto w-full pb-32">
      <BookingStepper step={step} />

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <DoctorSearchBar
              search={search} setSearch={setSearch}
              specialty={specialty} setSpecialty={setSpecialty}
              allSpecialties={allSpecialties}
              showFilters={showFilters} setShowFilters={setShowFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {showFilters && (
              <FiltersPanel
                ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
                branchFilter={branchFilter} setBranchFilter={setBranchFilter}
                consultationTypeFilter={consultationTypeFilter} setConsultationTypeFilter={setConsultationTypeFilter}
                uniqueBranches={uniqueBranches}
                hasActiveFilters={hasActiveFilters} clearFilters={clearFilters}
              />
            )}

            {doctorsLoading ? (
              <p className="text-center text-gray-400 py-12">Loading doctors...</p>
            ) : doctors.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No doctors found.</p>
            ) : filteredDoctors.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No doctors match the current filters.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doc={doc} onViewSlots={handleViewSlots} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg sticky top-24">
              <h2 className="text-lg font-semibold text-primary mb-6">Booking Summary</h2>
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <CalendarDays size={48} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Select a doctor and time slot to preview your booking summary.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && selectedDoctor && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-2xl font-bold text-primary">Select your preferred time</h1>

            <DatePicker
              weekDates={weekDates}
              selectedDate={selectedDate}
              onSelectDate={(d) => { setSelectedDate(d); setSelectedSlot(null) }}
            />

            {schedulesLoading ? (
              <p className="text-center text-gray-400 py-8">Loading available slots...</p>
            ) : schedules.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No available slots for this date.</p>
            ) : (
              <div className="space-y-6">
                <SlotSection title="Morning Slots" icon="sun" slots={morningSlots} selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} />
                <SlotSection title="Afternoon Slots" icon="sun" slots={afternoonSlots} selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} />
                <SlotSection title="Evening Slots" icon="moon" slots={eveningSlots} selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} />
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <BookingSummarySidebar
              doctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              bookError={bookError}
              booking={booking}
              onProceed={handleProceed}
              onBack={() => setStep(1)}
            />
          </div>
        </div>
      )}

      {step === 3 && selectedDoctor && selectedSlot && (
        <BookingConfirmation
          doctor={selectedDoctor}
          slot={selectedSlot}
          selectedDate={selectedDate}
          onBookAnother={() => { setStep(1); setSelectedSlot(null); setSelectedDoctor(null) }}
        />
      )}
    </div>
  )
}
