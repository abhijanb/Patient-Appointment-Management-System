import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetDoctorByIdQuery, useGetDoctorScheduleQuery } from '../adminApi'

const PAGE_SIZE = 5

export const typeStyles: Record<string, string> = {
  TELEHEALTH: 'bg-blue-100 text-blue-700',
  IN_PERSON: 'bg-gray-100 text-gray-700',
}

export const statusStyles: Record<string, string> = {
  AVAILABLE: 'bg-green-50 text-green-700',
  BOOKED: 'bg-red-100 text-red-700',
}

export const typeLabels: Record<string, string> = {
  TELEHEALTH: 'Telehealth',
  IN_PERSON: 'In-person',
}

export function useDoctorProfileLogic() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctorId = Number(id)

  const { data: doctorData, isLoading: doctorLoading } = useGetDoctorByIdQuery(doctorId, { skip: !doctorId })
  const { data: slotsData, isLoading: slotsLoading } = useGetDoctorScheduleQuery(doctorId, { skip: !doctorId })

  const doctor = doctorData?.data
  const slots = slotsData?.data?.schedules ?? []

  const availableSlots = slots.filter((s) => s.status === 'AVAILABLE')
  const bookedSlots = slots.filter((s) => s.status === 'BOOKED')

  const [slotPage, setSlotPage] = useState(1)
  const totalSlotPages = Math.max(1, Math.ceil(slots.length / PAGE_SIZE))
  const paginatedSlots = slots.slice((slotPage - 1) * PAGE_SIZE, slotPage * PAGE_SIZE)

  useEffect(() => {
    setSlotPage(1)
  }, [doctorId])

  return {
    doctor,
    doctorLoading,
    doctorId,
    slots,
    slotsLoading,
    availableSlots,
    bookedSlots,
    paginatedSlots,
    slotPage,
    totalSlotPages,
    setSlotPage,
    navigate,
  }
}
