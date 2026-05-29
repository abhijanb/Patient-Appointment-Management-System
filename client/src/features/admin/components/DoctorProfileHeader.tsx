import { Star, MapPin, CheckCircle } from 'lucide-react'
import { getImageUrl } from '../../../utils/getImageUrl'
import type { Doctor } from '../admin.type'

interface Props {
  doctor: Doctor
  slotsCount: number
  availableCount: number
  bookedCount: number
}

export default function DoctorProfileHeader({ doctor, slotsCount, availableCount, bookedCount }: Props) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-200">
          {doctor.imageUrl ? (
            <img src={getImageUrl(doctor.imageUrl)} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-gray-400">
              {doctor.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          )}
        </div>
        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg shadow-md">
          <CheckCircle size={20} />
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-primary"> {doctor.name}</h1>
            <p className="text-lg text-gray-500 mb-1">{doctor.specialization}</p>
            <div className="flex items-center gap-1 text-gray-500 justify-center md:justify-start">
              <MapPin size={16} className="text-blue-600" />
              <span>{doctor.hospitalBranch}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 border-t border-gray-200 pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Slots</p>
            <p className="text-xl font-semibold">{slotsCount}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Rating</p>
            <div className="flex items-center gap-1">
              <span className="text-xl font-semibold">{doctor.averageRating}</span>
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Available</p>
            <p className="text-xl font-semibold text-green-600">{availableCount}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Booked</p>
            <p className="text-xl font-semibold text-red-600">{bookedCount}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
