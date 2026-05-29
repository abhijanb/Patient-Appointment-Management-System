import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useGetDoctorsQuery, useGetDoctorScheduleQuery, useCreateScheduleMutation } from '../adminApi'
import { createScheduleSchema, type CreateScheduleFormData } from '../admin.validation'

export const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

export function useCreateScheduleLogic() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data: doctorsData } = useGetDoctorsQuery({ limit: 0 })
  const doctors = doctorsData?.data?.doctors ?? []
  const [createSchedule, { isLoading }] = useCreateScheduleMutation()

  const initialDoctorId = searchParams.get('doctorId') || ''

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateScheduleFormData>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: {
      doctorId: initialDoctorId,
      availableDate: '',
      timeSlot: '',
      consultationType: 'IN_PERSON',
    },
  })

  const selectedDoctor = watch('doctorId')
  const selectedDate = watch('availableDate')
  const selectedTime = watch('timeSlot')

  const { data: doctorSlotsData } = useGetDoctorScheduleQuery(Number(selectedDoctor), {
    skip: !selectedDoctor,
  })
  const allSlots = doctorSlotsData?.data?.schedules ?? []
  const occupiedSlots = new Set(
    selectedDate
      ? allSlots.filter((s) => s.availableDate.startsWith(selectedDate)).map((s) => s.timeSlot)
      : allSlots.map((s) => s.timeSlot),
  )

  useEffect(() => {
    setValue('timeSlot', '')
  }, [selectedDoctor, selectedDate, setValue])

  const onSubmit = async (data: CreateScheduleFormData) => {
    try {
      await createSchedule({
        doctorId: Number(data.doctorId),
        availableDate: data.availableDate,
        timeSlot: data.timeSlot,
        consultationType: data.consultationType,
      }).unwrap()
      toast.success('Schedule slot created successfully')
      navigate('/admin/schedule')
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to create schedule slot')
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    doctors,
    timeSlots,
    selectedTime,
    occupiedSlots,
    setValue,
    navigate,
  }
}
