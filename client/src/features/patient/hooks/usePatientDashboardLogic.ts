import { useState } from 'react'
import { useGetUpcomingAppointmentsQuery, useGetPatientAppointmentsQuery } from '../patientApi'
import { useAppSelector } from '../../../store/store'

export function usePatientDashboardLogic() {
  const user = useAppSelector((state) => state.auth.user)
  const { data, isLoading } = useGetUpcomingAppointmentsQuery()
  const { data: completedData } = useGetPatientAppointmentsQuery({ status: 'COMPLETED' })

  const [dismissed, setDismissed] = useState(false)
  const appointments = Array.isArray(data) ? data : []
  const count = appointments.length
  const unratedAppointment = !dismissed
    ? (Array.isArray(completedData) ? completedData : []).find((a) => a.rating === null) ?? null
    : null

  return {
    user,
    isLoading,
    appointments,
    count,
    unratedAppointment,
    dismissRatingModal: () => setDismissed(true),
  }
}
