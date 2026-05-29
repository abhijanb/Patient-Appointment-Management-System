import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Doctor {
  id: number
  name: string
  imageUrl: string | null
  specialization: string
  hospitalBranch: string
  averageRating: number
}

export interface ScheduleSlot {
  id: number
  doctorId: number
  availableDate: string
  timeSlot: string
  consultationType: 'IN_PERSON' | 'TELEHEALTH'
  status: 'AVAILABLE' | 'BOOKED'
}

export interface PatientAppointment {
  id: number
  patientId: number
  scheduleId: number
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED'
  rating: number | null
  ratedAt: string | null
  createdAt: string
  schedule: {
    id: number
    doctorId: number
    availableDate: string
    timeSlot: string
    consultationType: 'IN_PERSON' | 'TELEHEALTH'
    status: 'AVAILABLE' | 'BOOKED'
    doctor: {
      id: number
      name: string
      imageUrl: string | null
      specialization: string
      hospitalBranch: string
      averageRating: number
    }
  }
}

interface ApiResponse<T> {
  data: T
  message: string
}

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    credentials: 'include',
  }),
  tagTypes: ['PatientAppointments', 'PatientDoctors', 'DoctorSchedules'],
  endpoints: (builder) => ({
    getDoctors: builder.query<ApiResponse<Doctor[]>, { search?: string; specialization?: string; hospitalBranch?: string; consultationType?: string } | void>({
      query: (params) => ({
        url: '/patient/doctors',
        params,
      }),
      providesTags: ['PatientDoctors'],
    }),
    getDoctorSchedules: builder.query<ApiResponse<ScheduleSlot[]>, { doctorId: number; date?: string }>({
      query: ({ doctorId, date }) => ({
        url: `/patient/doctors/${doctorId}/schedules`,
        params: date ? { date } : undefined,
      }),
      providesTags: ['DoctorSchedules'],
    }),
    getPatientAppointments: builder.query<ApiResponse<PatientAppointment[]>, { status?: string } | void>({
      query: (params) => ({
        url: '/patient/appointments',
        params,
      }),
      providesTags: ['PatientAppointments'],
    }),
    getUpcomingAppointments: builder.query<ApiResponse<PatientAppointment[]>, void>({
      query: () => '/patient/appointments/upcoming',
      providesTags: ['PatientAppointments'],
    }),
    bookAppointment: builder.mutation<ApiResponse<PatientAppointment>, { scheduleId: number }>({
      query: (body) => ({
        url: '/patient/appointments/book',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PatientAppointments', 'DoctorSchedules'],
    }),
    rateAppointment: builder.mutation<ApiResponse<PatientAppointment>, { appointmentId: number; rating: number }>({
      query: ({ appointmentId, rating }) => ({
        url: `/patient/appointments/${appointmentId}/rate`,
        method: 'POST',
        body: { rating },
      }),
      invalidatesTags: ['PatientAppointments', 'PatientDoctors'],
    }),
    cancelAppointment: builder.mutation<ApiResponse<PatientAppointment>, { appointmentId: number }>({
      query: ({ appointmentId }) => ({
        url: `/patient/appointments/${appointmentId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['PatientAppointments', 'DoctorSchedules'],
    }),
  }),
})

export const {
  useGetDoctorsQuery,
  useGetDoctorSchedulesQuery,
  useGetPatientAppointmentsQuery,
  useGetUpcomingAppointmentsQuery,
  useBookAppointmentMutation,
  useRateAppointmentMutation,
  useCancelAppointmentMutation,
} = patientApi
