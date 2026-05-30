import { Suspense, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authRoute from './features/auth/auth.route'
import adminRoute from './features/admin/admin.route'
import patientRoute from './features/patient/patient.route'
import { Toaster } from 'react-hot-toast'
import { useGetMeQuery } from './features/auth/authApi'
import { setCredentials, setAuthChecked } from './features/auth/authSlice'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingFallback from './components/LoadingFallback'

const route = createBrowserRouter([
  ...authRoute,
  ...adminRoute,
  ...patientRoute,
])

function AppContent() {
  const dispatch = useDispatch()
  const { data, isSuccess, isError } = useGetMeQuery()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data }))
    } else if (isError) {
      dispatch(setAuthChecked())
    }
  }, [isSuccess, isError, data, dispatch])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={route} />
    </Suspense>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Toaster />
      <AppContent />
    </ErrorBoundary>
  )
}

export default App
