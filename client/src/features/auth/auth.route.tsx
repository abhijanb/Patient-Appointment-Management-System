import type { RouteObject } from "react-router-dom";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import ForbiddenPage from "./page/ForbiddenPage";

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