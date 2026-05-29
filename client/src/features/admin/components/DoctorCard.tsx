import { useNavigate } from 'react-router-dom'
import { Star, Edit, Trash2, User } from 'lucide-react'
import { getImageUrl } from '../../../utils/getImageUrl'
import type { Doctor } from '../admin.type'

interface DoctorCardProps {
  doctor: Doctor
  onEdit: (doctor: Doctor) => void
  onDelete: (id: number) => void
}

export default function DoctorCard({ doctor, onEdit, onDelete }: DoctorCardProps) {
  const navigate = useNavigate()
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary transition-colors group relative overflow-hidden cursor-pointer"
      onClick={() => navigate(`/admin/doctors/${doctor.id}`)}
    >
      <div className="flex gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
            {doctor.imageUrl ? (
              <img src={getImageUrl(doctor.imageUrl)} alt={doctor.name} className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-gray-400" />
            )}
          </div>
          <div className="absolute -bottom-2 right-0 bg-teal-700 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
            <Star size={10} className="fill-current" />
            {doctor.averageRating}
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition-colors truncate">{doctor.name}</h3>
          <p className="text-sm text-gray-500 font-semibold">{doctor.specialization}</p>
          <p className="text-sm text-gray-400 mt-1">{doctor.hospitalBranch}</p>
        </div>
      </div>
      <div className="mt-6 pt-3 border-t border-gray-200 flex justify-end gap-3">
        <button
          className="text-primary hover:bg-gray-100 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-bold cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onEdit(doctor) }}
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-bold cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onDelete(doctor.id) }}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  )
}
