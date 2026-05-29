import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as scheduleController from "../../controllers/admin/schedule.controller";

const scheduleRoute: Router = Router();

scheduleRoute.get('/', asyncHandler(scheduleController.scheduleList));
scheduleRoute.post('/', asyncHandler(scheduleController.createSchedule));
scheduleRoute.delete('/:id', asyncHandler(scheduleController.deleteSchedule));

export default scheduleRoute;