import type { Response, Request } from "express";
import * as scheduleService from "../../services/admin/schedule.service"
import validateOrThrow from "../../utils/validateOrThrow";
import { successResponse } from "../../utils/response";
import { getSchedulesQuerySchema, createScheduleSchema, scheduleIdParamSchema } from "../../validations/admin/schedule.validation";

async function scheduleList(req: Request, res: Response) {
    const query = validateOrThrow(req.query, getSchedulesQuerySchema);
    const data = await scheduleService.getSchedules(query);
    successResponse(res, data, 200, "Schedules fetched successfully");
}

async function createSchedule(req: Request, res: Response) {
    const payload = validateOrThrow(req.body, createScheduleSchema);
    const schedule = await scheduleService.createSchedule(payload);
    successResponse(res, schedule, 201, "Schedule created successfully");
}

async function deleteSchedule(req: Request, res: Response) {
    const { id } = validateOrThrow(req.params, scheduleIdParamSchema);
    await scheduleService.deleteSchedule(id);
    successResponse(res, null, 200, "Schedule deleted successfully");
}

export { scheduleList, createSchedule, deleteSchedule };
