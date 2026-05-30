import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const RegisterPage = lazy(() => import("./page/RegisterPage"));
const LoginPage = lazy(() => import("./page/LoginPage"));
const ForbiddenPage = lazy(() => import("./page/ForbiddenPage"));

const authRoute:RouteObject[] = [{
    path:"/register",
    element:<RegisterPage />
},
{
    path:"/login",
    element:<LoginPage />
},
{
    path:"/forbidden",
    element:<ForbiddenPage />
}]

export default authRoute;