import { z } from 'zod'

export const addDoctorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  averageRating: z.coerce.number().min(0).max(5, 'Rating must be between 0 and 5'),
  hospitalBranch: z.string().min(1, 'Hospital branch is required'),
})

export const updateDoctorSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  specialization: z.string().min(1, 'Specialization is required').optional(),
  hospitalBranch: z.string().min(1, 'Hospital branch is required').optional(),
})

export type AddDoctorFormData = z.infer<typeof addDoctorSchema>
export type UpdateDoctorFormData = z.infer<typeof updateDoctorSchema>

export const createScheduleSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor'),
  availableDate: z.string().min(1, 'Please select a date').refine((val) => {
    if (!val) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(val) >= today
  }, 'Cannot select a past date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  consultationType: z.enum(['IN_PERSON', 'TELEHEALTH']),
})

export type CreateScheduleFormData = z.infer<typeof createScheduleSchema>
