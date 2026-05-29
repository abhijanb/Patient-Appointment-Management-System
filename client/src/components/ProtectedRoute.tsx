import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../store/store"
import { selectCurrentUser, selectIsAuthenticated, selectAuthChecked } from "../features/auth/authSlice"

export default function ProtectedRoute({role}: {role: string}) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const authChecked = useAppSelector(selectAuthChecked)
  const user = useAppSelector(selectCurrentUser)

  if (!authChecked) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== role.toUpperCase()) {
    return <Navigate to="/forbidden" replace />
  }

  return <Outlet />
}
