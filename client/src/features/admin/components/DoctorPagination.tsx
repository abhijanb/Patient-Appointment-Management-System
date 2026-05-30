import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export default function DoctorPagination({ page, totalPages, onPrev, onNext }: Props) {
  return (
    <footer className="flex items-center justify-between pt-6 border-t border-gray-200">
      <span className="text-sm text-gray-500">
        Showing page {page}
      </span>
      <div className="flex gap-1.5">
        <button
          aria-label="Previous page"
          className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
          disabled={page <= 1}
          onClick={onPrev}
        >
          <ChevronLeft size={18} />
        </button>
        <button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer">
          {page}
        </button>
        <button
          aria-label="Next page"
          className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
          disabled={page >= totalPages}
          onClick={onNext}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </footer>
  )
}
