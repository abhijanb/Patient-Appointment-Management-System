import { useGetDashboardQuery } from '../adminApi'

export function useAdminDashboard() {
  const { data, isLoading, isFetching } = useGetDashboardQuery()

  return {
    dashboard: data?.data,
    isLoading: isLoading || isFetching,
  }
}
