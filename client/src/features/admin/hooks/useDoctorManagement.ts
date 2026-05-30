import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoctorSchema, type AddDoctorFormData } from '../admin.validation'
import type { Doctor } from '../admin.type'
import { useGetDoctorsQuery, useAddDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation } from '../adminApi'
import type { ApiError } from '../../../utils/apiError'
import { handleServerFormError } from '../../../utils/handleServerError'

export function useDoctorManagement() {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const [search, setSearch] = useState(initialSearch)
  const [selectedBranch, setSelectedBranch] = useState('All Branches')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specialities')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    if (urlSearch !== search) {
      setSearch(urlSearch)
      setPage(1)
    }
  }, [searchParams])

  const queryParams = {
    page,
    limit: 10,
    ...(search ? { search } : {}),
    ...(selectedBranch !== 'All Branches' ? { hospitalBranch: selectedBranch } : {}),
    ...(selectedSpecialization !== 'All Specialities' ? { specialization: selectedSpecialization } : {}),
  }

  const { data, isLoading, isFetching } = useGetDoctorsQuery(queryParams)
  const [addDoctor, { isLoading: isAdding }] = useAddDoctorMutation()
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation()
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<AddDoctorFormData>({
    resolver: zodResolver(addDoctorSchema) as Resolver<AddDoctorFormData>,
    defaultValues: {
      name: '',
      specialization: '',
      averageRating: 5,
      hospitalBranch: '',
    },
  })

  const isEditing = editingDoctor !== null

  const onSubmit = async (data: AddDoctorFormData) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('specialization', data.specialization)
      formData.append('averageRating', data.averageRating.toString())
      formData.append('hospitalBranch', data.hospitalBranch)

      if (fileInputRef.current?.files?.[0]) {
        formData.append('doctor', fileInputRef.current.files[0])
      }

      if (isEditing) {
        await updateDoctor({ id: editingDoctor.id, body: formData }).unwrap()
        toast.success('Doctor updated successfully')
      } else {
        await addDoctor(formData).unwrap()
        toast.success('Doctor added successfully')
      }

      reset()
      setIsModalOpen(false)
      setEditingDoctor(null)
    } catch (error: unknown) {
      if (!handleServerFormError<AddDoctorFormData>(error, setError)) {
        toast.error((error as ApiError).data?.message || `Failed to ${isEditing ? 'update' : 'add'} doctor`)
      }
    }
  }

  const openAddModal = () => {
    setEditingDoctor(null)
    reset()
    setIsModalOpen(true)
  }

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    reset({
      name: doctor.name,
      specialization: doctor.specialization,
      averageRating: doctor.averageRating,
      hospitalBranch: doctor.hospitalBranch,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return
    try {
      await deleteDoctor(id).unwrap()
      toast.success('Doctor deleted successfully')
    } catch (error: unknown) {
      toast.error((error as ApiError).data?.message || 'Failed to delete doctor')
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingDoctor(null)
    reset()
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return handleSubmit(onSubmit)(e)
  }

  return {
    doctors: data?.doctors ?? [],
    totalCount: data?.total ?? 0,
    isLoading: isLoading || isFetching,
    isSubmitting: isAdding || isUpdating || isDeleting,
    search,
    setSearch: (value: string) => {
      setSearch(value)
      setPage(1)
    },
    selectedBranch,
    setSelectedBranch: (value: string) => {
      setSelectedBranch(value)
      setPage(1)
    },
    selectedSpecialization,
    setSelectedSpecialization: (value: string) => {
      setSelectedSpecialization(value)
      setPage(1)
    },
    page,
    setPage,
    isModalOpen,
    setIsModalOpen: closeModal,
    isEditing,
    editingDoctor,
    openAddModal,
    openEditModal,
    closeModal,
    register,
    handleSubmit: handleFormSubmit,
    errors,
    reset,
    fileInputRef,
    handleDelete,
  }
}
