import { MoreVertical, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../../utils/getImageUrl'
import type { DashboardData } from '../admin.type'

interface Props {
  dashboard: DashboardData | undefined
  isLoading: boolean
}

export default function DoctorManagementTable({ dashboard, isLoading }: Props) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Doctor Management</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f4f6] border-b border-gray-200">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Doctor</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Specialization</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td className="px-6 py-12 text-center text-sm text-gray-500" colSpan={4}>Loading...</td>
              </tr>
            ) : dashboard?.recentDoctors?.length === 0 ? (
              <tr>
                <td className="px-6 py-12 text-center text-sm text-gray-500" colSpan={4}>No doctors found</td>
              </tr>
            ) : (
              dashboard?.recentDoctors?.map((doc, idx) => {
                const colors = [
                  { badge: 'bg-blue-100 text-blue-800', dot: 'bg-green-500' },
                  { badge: 'bg-teal-100 text-teal-800', dot: 'bg-gray-400' },
                  { badge: 'bg-sky-100 text-sky-800', dot: 'bg-green-500' },
                ]
                const c = colors[idx % colors.length]
                return (
                  <tr key={doc.id} className="hover:bg-[#f2f4f6] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {doc.imageUrl ? (
                            <img src={getImageUrl(doc.imageUrl)} alt={doc.name} className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} className="text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-900">{doc.name}</p>
                          <p className="text-[11px] text-gray-500">#{doc.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.badge}`}>
                        {doc.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                        <span className="text-sm text-gray-500">{idx === 1 ? 'Away' : 'On Duty'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/doctors/${doc.id}`} className="text-primary hover:text-[#006492] text-xs font-semibold uppercase tracking-wider cursor-pointer">
                        Edit
                      </Link>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200 bg-[#f2f4f6] flex justify-between items-center">
        <span className="text-xs text-gray-500">Showing {dashboard?.recentDoctors?.length ?? 0} of {dashboard?.totalDoctors ?? 0} Doctors</span>
        <div className="flex gap-2">
          <button className="p-1 border border-gray-200 rounded hover:bg-gray-100 cursor-pointer">
            <ChevronLeft size={14} />
          </button>
          <button className="p-1 border border-gray-200 rounded hover:bg-gray-100 cursor-pointer">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
