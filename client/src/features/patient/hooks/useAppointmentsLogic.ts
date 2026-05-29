import { useGetPatientAppointmentsQuery, useCancelAppointmentMutation } from '../patientApi'

export function useAppointmentsLogic() {
  const { data, isLoading } = useGetPatientAppointmentsQuery()
  const [cancelAppointment] = useCancelAppointmentMutation()

  const allAppointments = data?.data ?? []
  const upcoming = allAppointments.filter((a) => a.status === 'UPCOMING')
  const history = allAppointments.filter((a) => a.status !== 'UPCOMING')

  return {
    isLoading,
    upcoming,
    history,
    cancelAppointment,
  }
}
