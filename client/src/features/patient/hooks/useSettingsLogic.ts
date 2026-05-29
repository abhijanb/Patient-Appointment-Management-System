import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../store/store'
import { useUpdateProfileMutation, useChangePasswordMutation } from '../../auth/authApi'
import { setCredentials } from '../../auth/authSlice'

export function useSettingsLogic() {
  const user = useAppSelector((state) => state.auth.user)!
  const dispatch = useDispatch()

  const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation()
  const [changePassword, { isLoading: changingPassword }] = useChangePasswordMutation()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPwd, setShowCurrentPwd] = useState(false)
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  const isProfileDirty = name !== user.name || email !== user.email

  const handleSaveProfile = async () => {
    try {
      const res = await updateProfile({ name, email }).unwrap()
      dispatch(setCredentials({ user: res.data }))
      toast.success('Profile updated successfully')
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to update profile')
    }
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields')
      return
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    try {
      await changePassword({ currentPassword, newPassword }).unwrap()
      toast.success('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to change password')
    }
  }

  return {
    user,
    name, setName,
    email, setEmail,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    showCurrentPwd, setShowCurrentPwd,
    showNewPwd, setShowNewPwd,
    showConfirmPwd, setShowConfirmPwd,
    activeSection, setActiveSection,
    isProfileDirty,
    updatingProfile,
    changingPassword,
    handleSaveProfile,
    handleChangePassword,
  }
}
