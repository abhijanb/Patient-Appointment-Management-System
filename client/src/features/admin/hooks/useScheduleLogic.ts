import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useGetSchedulesQuery, useGetDoctorsQuery, useDeleteScheduleMutation } from '../adminApi'

export const statusStyles: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-700',
  BOOKED: 'bg-red-100 text-red-700',
}

export const typeStyles: Record<string, string> = {
  TELEHEALTH: 'bg-blue-100 text-blue-700',
  IN_PERSON: 'bg-teal-100 text-teal-700',
}

export const typeLabels: Record<string, string> = {
  TELEHEALTH: 'Telehealth',
  IN_PERSON: 'In-person',
}

export function useScheduleLogic() {
  const [page, setPage] = useState(1)
  const [doctorId, setDoctorId] = useState<number | undefined>()
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const { data, isLoading } = useGetSchedulesQuery({ page, limit: 10, doctorId, dateFrom: dateFrom || undefined, dateTo: dateTo || undefined })
  const { data: doctorsData } = useGetDoctorsQuery({ limit: 0 })
  const doctors = doctorsData?.data?.doctors ?? []
  const schedules = data?.data?.schedules ?? []
  const total = data?.data?.total ?? 0
  const totalPages = Math.ceil(total / 10)
  const [deleteSchedule] = useDeleteScheduleMutation()

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this schedule slot?')) return
    try {
      await deleteSchedule(id).unwrap()
      toast.success('Schedule slot deleted successfully')
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to delete schedule slot')
    }
  }

  const handleDoctorChange = (value: string) => {
    setDoctorId(value ? Number(value) : undefined)
    setPage(1)
  }

  const handleDateFromChange = (value: string) => {
    setDateFrom(value)
    setPage(1)
  }

  const handleDateToChange = (value: string) => {
    setDateTo(value)
    setPage(1)
  }

  const clearFilters = () => {
    setDoctorId(undefined)
    setDateFrom('')
    setDateTo('')
    setPage(1)
  }

  return {
    page,
    setPage,
    doctorId,
    dateFrom,
    dateTo,
    doctors,
    schedules,
    total,
    totalPages,
    isLoading,
    handleDelete,
    handleDoctorChange,
    handleDateFromChange,
    handleDateToChange,
    clearFilters,
  }
}
