import type { RouteObject } from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import PatientLayout from "./components/patient.layout"
import DashboardPage from "./page/DashboardPage"
import BookAppointmentsPage from "./page/BookAppointmentsPage"
import SettingsPage from "./page/SettingsPage"
import AppointmentsPage from "./page/AppointmentsPage"

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
