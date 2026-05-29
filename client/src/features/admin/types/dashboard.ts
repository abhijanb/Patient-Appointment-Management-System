import type { LucideIcon } from 'lucide-react'

export interface MetricCardProps {
  label: string
  value: string
  sub: string
  icon: LucideIcon
  iconColor: string
  subIcon?: LucideIcon
  subColor?: string
}
