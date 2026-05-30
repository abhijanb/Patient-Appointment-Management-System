import { lazy } from "react"
import type { RouteObject } from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import PatientLayout from "./components/patient.layout"

const DashboardPage = lazy(() => import("./page/DashboardPage"))
const BookAppointmentsPage = lazy(() => import("./page/BookAppointmentsPage"))
const SettingsPage = lazy(() => import("./page/SettingsPage"))
const AppointmentsPage = lazy(() => import("./page/AppointmentsPage"))

const patientRoute: RouteObject[] = [
  {
    element: <ProtectedRoute role="PATIENT" />,
    children: [
      {
        element: <PatientLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          
          {
            path: "/book-appointments",
            element: <BookAppointmentsPage />,
          },
          {
            path:"/appointments",
            element: <AppointmentsPage />
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]

export default patientRoute
