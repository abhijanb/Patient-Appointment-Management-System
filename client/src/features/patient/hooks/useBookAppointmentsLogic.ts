import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  useGetDoctorsQuery, useGetDoctorSchedulesQuery, useBookAppointmentMutation,
} from '../patientApi'
import type { Doctor, ScheduleSlot } from '../patientApi'

export function getWeekDates() {
  const today = new Date()
  const days = []
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      day: d.getDate().toString(),
      dateStr: d.toISOString().split('T')[0],
      dateObj: d,
    })
  }
  return days
}

export function formatDateDisplay(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function to24h(timeSlot: string) {
  const [hourStr, rest] = timeSlot.split(':')
  const hour = parseInt(hourStr)
  const period = rest.replace(/\s/g, '').slice(2).toUpperCase()
  if (period === 'PM' && hour !== 12) return hour + 12
  if (period === 'AM' && hour === 12) return 0
  return hour
}

function getTimePeriod(timeSlot: string) {
  const h = to24h(timeSlot)
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export function useBookAppointmentsLogic() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [specialty, setSpecialty] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [branchFilter, setBranchFilter] = useState('')
  const [consultationTypeFilter, setConsultationTypeFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null)
  const [bookError, setBookError] = useState('')

  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery(
    {
      search: search || undefined,
      specialization: specialty || undefined,
      hospitalBranch: branchFilter || undefined,
      consultationType: consultationTypeFilter || undefined,
    },
  )

  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch && urlSearch !== search) {
      setSearch(urlSearch)
    }
  }, [])

  const { data: schedulesData, isLoading: schedulesLoading } = useGetDoctorSchedulesQuery(
    { doctorId: selectedDoctor?.id ?? 0, date: selectedDate || undefined },
    { skip: !selectedDoctor || !selectedDate },
  )

  const [bookAppointment, { isLoading: booking }] = useBookAppointmentMutation()

  const doctors = doctorsData?.data ?? []

  useEffect(() => {
    if (search) {
      setSearchParams({ search }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [search])

  const uniqueBranches = useMemo(() => {
    const s = new Set(doctors.map((d) => d.hospitalBranch))
    return Array.from(s).sort()
  }, [doctors])

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      if (ratingFilter > 0 && d.averageRating < ratingFilter) return false
      return true
    })
  }, [doctors, ratingFilter])

  const hasActiveFilters = ratingFilter > 0 || branchFilter !== '' || consultationTypeFilter !== ''

  const clearFilters = () => {
    setRatingFilter(0)
    setBranchFilter('')
    setConsultationTypeFilter('')
  }

  const schedules = schedulesData?.data ?? []
  const weekDates = useMemo(getWeekDates, [])

  const morningSlots = schedules.filter((s) => getTimePeriod(s.timeSlot) === 'morning')
  const afternoonSlots = schedules.filter((s) => getTimePeriod(s.timeSlot) === 'afternoon')
  const eveningSlots = schedules.filter((s) => getTimePeriod(s.timeSlot) === 'evening')

  const handleViewSlots = (doc: Doctor) => {
    setSelectedDate(weekDates[0].dateStr)
    setSelectedSlot(null)
    setSelectedDoctor(doc)
    setStep(2)
  }

  const handleProceed = async () => {
    if (!selectedSlot) return
    setBookError('')
    try {
      await bookAppointment({ scheduleId: selectedSlot.id }).unwrap()
      setStep(3)
    } catch (err) {
      const apiError = err as { data?: { message?: string } }
      setBookError(apiError?.data?.message || 'Failed to book appointment. The slot may no longer be available.')
    }
  }

  const allSpecialties = useMemo(() => {
    const s = new Set(doctors.map((d) => d.specialization))
    return Array.from(s)
  }, [doctors])

  return {
    step,
    setStep,
    search,
    setSearch,
    specialty,
    setSpecialty,
    ratingFilter,
    setRatingFilter,
    branchFilter,
    setBranchFilter,
    consultationTypeFilter,
    setConsultationTypeFilter,
    showFilters,
    setShowFilters,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    bookError,
    doctorsLoading,
    schedulesLoading,
    booking,
    doctors,
    filteredDoctors,
    uniqueBranches,
    allSpecialties,
    hasActiveFilters,
    clearFilters,
    weekDates,
    morningSlots,
    afternoonSlots,
    eveningSlots,
    schedules,
    handleViewSlots,
    handleProceed,
  }
}
