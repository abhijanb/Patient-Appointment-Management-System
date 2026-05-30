import type { Response } from "express";


function successResponse<T>(res: Response, data: T, statusCode: number, _message?: string) {
    return res.status(statusCode).json(data);
}

function errorResponse(res: Response, message: string, statusCode: number, error?: unknown) {
    return res.status(statusCode).json({ message, ...(error !== undefined ? { error } : {}) });
}


export { successResponse, errorResponse };