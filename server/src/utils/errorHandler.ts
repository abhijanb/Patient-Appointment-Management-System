import type { NextFunction, Request, Response } from "express";
import { ApiError, ValidationError } from "./error";
import { errorResponse } from "./response";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        return errorResponse(res, err.message, err.statusCode, err.error);
    }

    if (err instanceof ApiError) {
        return errorResponse(res, err.message, err.statusCode);
    }

    console.error("Unhandled Error:", err);
    return errorResponse(res, "Internal server error", 500);
}
export default errorHandler;