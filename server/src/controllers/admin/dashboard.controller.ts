import type { Response, Request } from "express";
import * as dashboardService from "../../services/admin/dashboard.service";
import { successResponse } from "../../utils/response";

async function getDashboard(req: Request, res: Response) {
    const data = await dashboardService.getDashboard();
    successResponse(res, data, 200, "Dashboard data fetched successfully");
}

export { getDashboard };
