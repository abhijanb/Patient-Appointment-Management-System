import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import authenticate from "../../middleware/authenticate";
import { authorize, Role } from "../../middleware/authorize";
import manageDoctorRoute from "./doctor.route";
import dashboardRoute from "./dashboard.route";
import scheduleRoute from "./schedule.route";

const adminRouter:Router = Router();
adminRouter.use(asyncHandler(authenticate));
adminRouter.use(authorize(Role.ADMIN));
adminRouter.use('/dashboard',dashboardRoute);
adminRouter.use('/manage-doctors',manageDoctorRoute);
adminRouter.use('/schedules',scheduleRoute);

export default adminRouter;