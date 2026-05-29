import { X, Upload } from 'lucide-react'
import type { UseFormRegister, FieldErrors, FormEvent } from 'react-hook-form'
import type { AddDoctorFormData } from '../admin.validation'

interface Props {
  isOpen: boolean
  isEditing: boolean
  isSubmitting: boolean
  register: UseFormRegister<AddDoctorFormData>
  errors: FieldErrors<AddDoctorFormData>
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onClose: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function DoctorFormModal({
  isOpen,
  isEditing,
  isSubmitting,
  register,
  errors,
  fileInputRef,
  onClose,
  onSubmit,
}: Props) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">{isEditing ? 'Edit Doctor' : 'Register New Doctor'}</h2>
          <button
            className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <form className="p-6 space-y-6" onSubmit={onSubmit}>
          <div className="flex justify-center mb-6">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-all overflow-hidden">
                <Upload size={28} />
                <p className="text-[10px] font-bold mt-1">Photo</p>
              </div>
              <input ref={fileInputRef} className="hidden" type="file" accept="image/*" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Full Name</label>
              <input
                className="w-full bg-white border border-gray-200 rounded-lg px-6 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Dr. Jane Smith"
                type="text"
                {...register('name')}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Hospital Branch</label>
              <select
                className="w-full bg-white border border-gray-200 rounded-lg px-6 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                {...register('hospitalBranch')}
              >
                <option value="">Select branch</option>
                <option value="Central Metro Hospital">Central Metro Hospital</option>
                <option value="Westside Medical Clinic">Westside Medical Clinic</option>
                <option value="North Summit Specialist">North Summit Specialist</option>
              </select>
              {errors.hospitalBranch && <p className="text-xs text-red-500 mt-1">{errors.hospitalBranch.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Specialization</label>
              <input
                className="w-full bg-white border border-gray-200 rounded-lg px-6 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Neurology"
                type="text"
                {...register('specialization')}
              />
              {errors.specialization && <p className="text-xs text-red-500 mt-1">{errors.specialization.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Average Rating</label>
              <input
                className="w-full bg-white border border-gray-200 rounded-lg px-6 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                max={5}
                min={0}
                placeholder="5.0"
                step={0.1}
                type="number"
                {...register('averageRating')}
              />
              {errors.averageRating && <p className="text-xs text-red-500 mt-1">{errors.averageRating.message}</p>}
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-12 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-xs font-semibold uppercase tracking-wider cursor-pointer disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Doctor Profile' : 'Save Doctor Profile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
