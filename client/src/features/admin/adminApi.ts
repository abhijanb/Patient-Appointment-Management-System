import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Doctor, DoctorListRequest, DashboardData, ScheduleSlot, ScheduleListRequest, PaginatedData, PaginatedDoctors, ApiResponse } from './admin.type'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    credentials: 'include',
  }),
  tagTypes: ['Doctors', 'Dashboard', 'Schedules'],
  endpoints: (builder) => ({
    getSchedules: builder.query<ApiResponse<PaginatedData<ScheduleSlot>>, ScheduleListRequest>({
      query: (params) => ({
        url: '/admin/schedules',
        params,
      }),
      providesTags: ['Schedules'],
    }),
    getDashboard: builder.query<ApiResponse<DashboardData>, void>({
      query: () => '/admin/dashboard',
      providesTags: ['Dashboard'],
    }),
    getDoctors: builder.query<ApiResponse<PaginatedDoctors>, DoctorListRequest>({
      query: (params) => ({
        url: '/admin/manage-doctors/list-doctors',
        params,
      }),
      providesTags: ['Doctors'],
    }),
    getDoctorById: builder.query<ApiResponse<Doctor>, number>({
      query: (id) => `/admin/manage-doctors/${id}`,
      providesTags: ['Doctors'],
    }),
    addDoctor: builder.mutation<ApiResponse<Doctor>, FormData>({
      query: (body) => ({
        url: '/admin/manage-doctors/add-doctor',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Doctors'],
    }),
    updateDoctor: builder.mutation<ApiResponse<Doctor>, FormData>({
      query: (body) => ({
        url: '/admin/manage-doctors/update-doctor',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Doctors'],
    }),
    createSchedule: builder.mutation<ApiResponse<ScheduleSlot>, { doctorId: number; availableDate: string; timeSlot: string; consultationType: 'IN_PERSON' | 'TELEHEALTH' }>({
      query: (body) => ({
        url: '/admin/schedules',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedules'],
    }),
    deleteDoctor: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: `/admin/manage-doctors/delete-doctor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Doctors'],
    }),
    deleteSchedule: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: `/admin/schedules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedules'],
    }),
    getDoctorSchedule: builder.query<ApiResponse<PaginatedData<ScheduleSlot>>, number>({
      query: (doctorId) => `/admin/schedules?doctorId=${doctorId}&limit=100`,
      providesTags: ['Schedules'],
    }),
  }),
})

export const { useGetSchedulesQuery, useGetDashboardQuery, useGetDoctorsQuery, useGetDoctorByIdQuery, useAddDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation, useCreateScheduleMutation, useGetDoctorScheduleQuery, useDeleteScheduleMutation } = adminApi
