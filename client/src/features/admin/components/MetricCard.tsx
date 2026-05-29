import type { MetricCardProps } from '../types/dashboard'

export default function MetricCard({ label, value, sub, icon: Icon, iconColor, subIcon: SubIcon, subColor }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-primary">{value}</p>
        <p className={`text-xs flex items-center gap-1 mt-1 ${subColor ?? 'text-gray-500'}`}>
          {SubIcon && <SubIcon size={12} />}
          {sub}
        </p>
      </div>
    </div>
  )
}
