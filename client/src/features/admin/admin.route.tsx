import { lazy } from "react"
import type { RouteObject } from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import AdminLayout from "./components/admin.layout"

const DashboardPage = lazy(() => import("./page/DashboardPage"))
const DoctorManagementPage = lazy(() => import("./page/DoctorManagementPage"))
const SchedulePage = lazy(() => import("./page/SchedulePage"))
const CreateSchedulePage = lazy(() => import("./page/CreateSchedulePage"))
const DoctorProfilePage = lazy(() => import("./page/DoctorProfilePage"))

const adminRoute: RouteObject[] = [
  {
    element: <ProtectedRoute role="ADMIN" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <DashboardPage />,
          },
          {
            path: "/admin/doctors",
            element: <DoctorManagementPage />,
          },
          {
            path: "/admin/schedule",
            element: <SchedulePage />,
          },
          {
            path: "/admin/schedule/create",
            element: <CreateSchedulePage />,
          },
          {
            path: "/admin/doctors/:id",
            element: <DoctorProfilePage />,
          },
        ],
      },
    ],
  },
]

export default adminRoute