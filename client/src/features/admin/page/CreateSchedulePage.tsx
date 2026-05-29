import { Stethoscope, Calendar, ChevronDown, ChevronRight, LoaderCircle } from 'lucide-react'
import { useCreateScheduleLogic, timeSlots } from '../hooks/useCreateScheduleLogic'

export default function CreateSchedulePage() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    doctors,
    selectedTime,
    occupiedSlots,
    setValue,
    navigate,
  } = useCreateScheduleLogic()

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <nav className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          <span>Schedule Master</span>
          <ChevronRight size={14} />
          <span className="text-primary">Create New Slot</span>
        </nav>
        <h1 className="text-3xl font-bold text-primary mb-1">Create New Schedule Slot</h1>
        <p className="text-sm text-gray-500">Configure a new time block for consultations in the central clinic calendar.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">Doctor Selection</label>
              <div className="relative">
                <Stethoscope size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
                  {...register('doctorId')}
                >
                  <option value="">Select a professional</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.doctorId && <p className="text-xs text-red-500 px-1 mt-1">{errors.doctorId.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">Appointment Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  type="date"
                  {...register('availableDate')}
                />
              </div>
              {errors.availableDate && <p className="text-xs text-red-500 px-1 mt-1">{errors.availableDate.message}</p>}
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">Time Slot</label>
              <div className="grid grid-cols-4 gap-1.5 mt-1">
                {timeSlots.map((time) => {
                  const isOccupied = occupiedSlots.has(time)
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isOccupied}
                      className={`py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                        isOccupied
                          ? 'bg-red-100 text-red-500 border border-red-300 cursor-not-allowed'
                          : selectedTime === time
                            ? 'bg-primary text-white border border-primary cursor-pointer'
                            : 'border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary cursor-pointer'
                      }`}
                      onClick={() => !isOccupied && setValue('timeSlot', time, { shouldValidate: true })}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
              {errors.timeSlot && <p className="text-xs text-red-500 px-1 mt-1">{errors.timeSlot.message}</p>}
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">Consultation Type</label>
              <div className="flex gap-6 py-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    value="IN_PERSON"
                    {...register('consultationType')}
                  />
                  <span className="text-sm text-gray-900 group-hover:text-primary transition-colors">In-person Visit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    value="TELEHEALTH"
                    {...register('consultationType')}
                  />
                  <span className="text-sm text-gray-900 group-hover:text-primary transition-colors">Telehealth Call</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f4f6] p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Automatic Status Assignment</p>
              <p className="text-sm text-gray-500 mt-0.5">New slots are defaulted to 'Available' for public booking.</p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Available
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 border border-secondary text-secondary rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-blue-50 transition-colors cursor-pointer"
              onClick={() => navigate('/admin/schedule')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-primary text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoaderCircle size={16} className="animate-spin inline mr-1" /> : null}
              {isLoading ? 'Creating...' : 'Create Slot'}
            </button>
          </div>
        </form>
      </div>

      
    </div>
  )
}
