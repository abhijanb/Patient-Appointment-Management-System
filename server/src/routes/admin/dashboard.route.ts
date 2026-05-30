import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as dashboardController from "../../controllers/admin/dashboard.controller";

const dashboardRoute: Router = Router();

dashboardRoute.get("/", asyncHandler(dashboardController.getDashboard));

export default dashboardRoute;
