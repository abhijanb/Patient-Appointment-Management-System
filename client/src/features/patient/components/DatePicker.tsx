import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DayInfo {
  label: string
  day: string
  dateStr: string
  dateObj: Date
}

interface Props {
  weekDates: DayInfo[]
  selectedDate: string
  onSelectDate: (dateStr: string) => void
}

export default function DatePicker({ weekDates, selectedDate, onSelectDate }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
        </h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 cursor-pointer"><ChevronLeft size={18} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 cursor-pointer"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDates.map((d) => {
          const isToday = d.dateObj.toDateString() === new Date().toDateString()
          return (
            <button
              key={d.dateStr}
              onClick={() => onSelectDate(d.dateStr)}
              className={`flex flex-col items-center min-w-[64px] p-3 rounded-lg transition-all cursor-pointer ${
                selectedDate === d.dateStr
                  ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className={`text-xs mb-1 ${selectedDate === d.dateStr ? 'text-white' : 'text-gray-500'}`}>{d.label}</span>
              <span className={`text-lg font-bold ${isToday && selectedDate !== d.dateStr ? 'text-primary' : ''}`}>{d.day}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
