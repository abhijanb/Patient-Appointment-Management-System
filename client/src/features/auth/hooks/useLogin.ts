import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { APP_NAME } from '../../../config'
import { useLoginMutation } from '../authApi'
import { setCredentials, selectIsAuthenticated, selectAuthChecked, selectCurrentUser } from '../authSlice'
import { useAppSelector } from '../../../store/store'
import { loginSchema, type LoginFormData } from '../auth.validation'

export type LoginFormInputs = LoginFormData

export function useLogin() {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const authChecked = useAppSelector(selectAuthChecked)
  const user = useAppSelector(selectCurrentUser)

  useEffect(() => {
    if (authChecked && isAuthenticated && user) {
      navigate(user.role === 'ADMIN' ? '/admin' : '/', { replace: true })
    }
  }, [authChecked, isAuthenticated, user, navigate])

  const [showPassword, setShowPassword] = useState(false)
  const [loginMutation, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      passwordHash: '',
      remember: false,
    },
  })

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginMutation({
        email: data.email,
        password: data.passwordHash,
      }).unwrap()
      
      dispatch(setCredentials({
        user: response.data.user,
      }))
      
      toast.success(`Welcome back! Successfully logged in.`)
      if(response.data.user.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error: any) {
      toast.error(error.data?.message || 'Login failed')
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
    authChecked,
    APP_NAME,
  }
}
