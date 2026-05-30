import { useGetDashboardQuery } from '../adminApi'

export function useAdminDashboard() {
  const { data, isLoading, isFetching } = useGetDashboardQuery()

  return {
    dashboard: data,
    isLoading: isLoading || isFetching,
  }
}
