import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, MeResponse, UpdateProfileRequest, UpdateProfileResponse, ChangePasswordRequest } from "./auth.type";

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
        credentials: 'include'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => {
        return {
            login: builder.mutation<LoginResponse, LoginRequest>({
                query: (body) => ({
                    url: "/auth/login",
                    method: "POST",
                    body
                })
            }),
            register: builder.mutation<RegisterResponse, RegisterRequest>({
                query: (body) => ({
                    url: "/auth/register",
                    method: "POST",
                    body
                })
            }),
            getMe: builder.query<MeResponse, void>({
                query: () => "/auth/me",
                providesTags: ['User'],
            }),
            updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
                query: (body) => ({
                    url: "/auth/profile",
                    method: "PATCH",
                    body
                }),
                invalidatesTags: ['User'],
            }),
            changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
                query: (body) => ({
                    url: "/auth/change-password",
                    method: "POST",
                    body
                }),
            }),
            deactivateAccount: builder.mutation<{ message: string }, void>({
                query: () => ({
                    url: "/auth/account",
                    method: "DELETE",
                }),
            }),
        }
    }
})

export const { useLoginMutation, useRegisterMutation, useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation, useDeactivateAccountMutation } = authApi