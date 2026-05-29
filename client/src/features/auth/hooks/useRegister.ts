import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { APP_NAME } from '../../../config'
import { useRegisterMutation } from '../authApi'
import { setCredentials } from '../authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../auth.validation'

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
      passwordHash: '',
      terms: false,
    },
  })

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerMutation({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash
      }).unwrap();
      
      dispatch(setCredentials({
        user: response.data,
      }))
      
      toast.success("Account created successfully");
    }
    catch (error: any) {
      toast.error(error.data?.message || "Registration failed");
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
