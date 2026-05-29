import type { RouteObject } from "react-router-dom"
import ProtectedRoute from "../../components/ProtectedRoute"
import DashboardPage from "./page/DashboardPage"
import DoctorManagementPage from "./page/DoctorManagementPage"
import SchedulePage from "./page/SchedulePage"
import CreateSchedulePage from "./page/CreateSchedulePage"
import DoctorProfilePage from "./page/DoctorProfilePage"
import AdminLayout from "./components/admin.layout"

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