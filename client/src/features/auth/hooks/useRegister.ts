import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { APP_NAME } from '../../../config'
import { useRegisterMutation } from '../authApi'
import { setCredentials } from '../authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../auth.validation'
import type { ApiError } from '../../../utils/apiError'

export type RegisterFormInputs = RegisterFormData

export function useRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [registerMutation, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  })

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerMutation({
        name: data.name,
        email: data.email,
        password: data.password
      }).unwrap();
      
      dispatch(setCredentials({
        user: response,
      }))
      
      toast.success("Account created successfully");
    }
    catch (error: unknown) {
      toast.error((error as ApiError).data?.message || "Registration failed");
    }
  }

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    showPassword,
    toggleShowPassword,
    isLoading,
    APP_NAME,
  }
}
