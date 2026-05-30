import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetDoctorByIdQuery, useGetDoctorScheduleQuery } from '../adminApi'

const PAGE_SIZE = 5

export function useDoctorProfileLogic() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctorId = Number(id)

  const [slotPage, setSlotPage] = useState(1)

  const { data: doctorData, isLoading: doctorLoading } = useGetDoctorByIdQuery(doctorId, { skip: !doctorId })
  const { data: slotsData, isLoading: slotsLoading } = useGetDoctorScheduleQuery(
    { doctorId, page: slotPage, limit: PAGE_SIZE },
    { skip: !doctorId },
  )

  const doctor = doctorData
  const slots = slotsData?.schedules ?? []
  const totalSlots = slotsData?.total ?? 0

  const availableSlots = slots.filter((s) => s.status === 'AVAILABLE')
  const bookedSlots = slots.filter((s) => s.status === 'BOOKED')

  const totalSlotPages = Math.max(1, Math.ceil(totalSlots / PAGE_SIZE))

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
    paginatedSlots: slots,
    slotPage,
    totalSlotPages,
    setSlotPage,
    navigate,
  }
}
