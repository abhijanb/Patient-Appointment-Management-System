import type { NextFunction, Request, Response } from "express";
import { ApiError, ValidationError } from "./error";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            message: err.message,
            error: err.error
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    console.error("Unhandled Error:", err);
    return res.status(500).json({
        message: "Internal server error"
    });
}
export default errorHandler;