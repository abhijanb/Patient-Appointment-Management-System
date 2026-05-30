import { useState } from 'react'
import { toast } from 'react-hot-toast'
import type { ApiError } from '../../../utils/apiError'
import { useGetSchedulesQuery, useGetDoctorsQuery, useDeleteScheduleMutation } from '../adminApi'

export function useScheduleLogic() {
  const [page, setPage] = useState(1)
  const [doctorId, setDoctorId] = useState<number | undefined>()
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const { data, isLoading } = useGetSchedulesQuery({ page, limit: 10, doctorId, dateFrom: dateFrom || undefined, dateTo: dateTo || undefined })
  const { data: doctorsData } = useGetDoctorsQuery({ limit: 0 })
  const doctors = doctorsData?.doctors ?? []
  const schedules = data?.schedules ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / 10)
  const [deleteSchedule] = useDeleteScheduleMutation()

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this schedule slot?')) return
    try {
      await deleteSchedule(id).unwrap()
      toast.success('Schedule slot deleted successfully')
    } catch (error: unknown) {
      toast.error((error as ApiError).data?.message || 'Failed to delete schedule slot')
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
