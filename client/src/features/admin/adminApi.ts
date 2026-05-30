import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Doctor, DoctorListRequest, DashboardData, ScheduleSlot, ScheduleListRequest, PaginatedData, PaginatedDoctors } from './admin.type'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    credentials: 'include',
  }),
  tagTypes: ['Doctors', 'Dashboard', 'Schedules'],
  endpoints: (builder) => ({
    getSchedules: builder.query<PaginatedData<ScheduleSlot>, ScheduleListRequest>({
      query: (params) => ({
        url: '/admin/schedules',
        params,
      }),
      providesTags: ['Schedules'],
    }),
    getDashboard: builder.query<DashboardData, void>({
      query: () => '/admin/dashboard',
      providesTags: ['Dashboard'],
    }),
    getDoctors: builder.query<PaginatedDoctors, DoctorListRequest>({
      query: (params) => ({
        url: '/admin/manage-doctors',
        params,
      }),
      providesTags: ['Doctors'],
    }),
    getDoctorById: builder.query<Doctor, number>({
      query: (id) => `/admin/manage-doctors/${id}`,
      providesTags: ['Doctors'],
    }),
    addDoctor: builder.mutation<Doctor, FormData>({
      query: (body) => ({
        url: '/admin/manage-doctors',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Doctors'],
    }),
    updateDoctor: builder.mutation<Doctor, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/admin/manage-doctors/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Doctors'],
    }),
    createSchedule: builder.mutation<ScheduleSlot, { doctorId: number; availableDate: string; timeSlot: string; consultationType: 'IN_PERSON' | 'TELEHEALTH' }>({
      query: (body) => ({
        url: '/admin/schedules',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedules'],
    }),
    deleteDoctor: builder.mutation<null, number>({
      query: (id) => ({
        url: `/admin/manage-doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Doctors'],
    }),
    deleteSchedule: builder.mutation<null, number>({
      query: (id) => ({
        url: `/admin/schedules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedules'],
    }),
    getDoctorSchedule: builder.query<PaginatedData<ScheduleSlot>, { doctorId: number; page?: number; limit?: number }>({
      query: ({ doctorId, ...params }) => ({
        url: `/admin/schedules`,
        params: { doctorId, ...params },
      }),
      providesTags: ['Schedules'],
    }),
  }),
})

export const { useGetSchedulesQuery, useGetDashboardQuery, useGetDoctorsQuery, useGetDoctorByIdQuery, useAddDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation, useCreateScheduleMutation, useGetDoctorScheduleQuery, useDeleteScheduleMutation } = adminApi
