export interface DashboardData {
  totalDoctors: number
  todayAppointments: number
  pendingRequests: number
  recentDoctors: Doctor[]
}

export interface Doctor {
  id: number
  name: string
  imageUrl: string | null
  specialization: string
  hospitalBranch: string
  averageRating: number
  createdAt: string
  updatedAt: string
}

export interface DoctorListRequest {
  page?: number
  limit?: number
  search?: string
  specialization?: string
  hospitalBranch?: string
  minRating?: number
  sortBy?: 'name' | 'specialization' | 'hospitalBranch' | 'averageRating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface AddDoctorRequest {
  name: string
  specialization: string
  averageRating: number
  hospitalBranch: string
}

export interface UpdateDoctorRequest {
  id: number
  name?: string
  specialization?: string
  hospitalBranch?: string
  imageUrl?: string
}

export interface ScheduleSlot {
  id: number
  doctorId: number
  availableDate: string
  timeSlot: string
  consultationType: 'IN_PERSON' | 'TELEHEALTH'
  status: 'AVAILABLE' | 'BOOKED'
  doctor: Doctor
}

export interface ScheduleListRequest {
  page?: number
  limit?: number
  doctorId?: number
  consultationType?: 'IN_PERSON' | 'TELEHEALTH'
  status?: 'AVAILABLE' | 'BOOKED'
  dateFrom?: string
  dateTo?: string
}

export interface PaginatedData<T> {
  schedules: T[]
  total: number
  page: number
  limit: number
}

export interface PaginatedDoctors {
  doctors: Doctor[]
  total: number
}


