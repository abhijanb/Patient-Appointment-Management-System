import { Check } from 'lucide-react'

interface Props {
  step: number
}

export default function BookingStepper({ step }: Props) {
  return (
    <section className="mb-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>{step >= 2 ? <Check size={18} /> : '1'}</div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Doctor</span>
        </div>
        <div className={`h-1 flex-1 -mt-6 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>{step >= 3 ? <Check size={18} /> : '2'}</div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Date & Time</span>
        </div>
        <div className={`h-1 flex-1 -mt-6 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>Details</span>
        </div>
      </div>
    </section>
  )
}
